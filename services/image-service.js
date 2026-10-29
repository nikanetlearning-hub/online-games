/* ================================================================
   image-service.js (نسخه بهبودیافته)
   - اولویت ۱: Wikipedia API (سریع، پایدار، بدون کلید)
   - اولویت ۲: Pixabay (اگر کلید داشته باشید - اختیاری)
   - اولویت ۳: Picsum (برای پاداش)
   - کش در localStorage برای جلوگیری از درخواست تکراری
   ================================================================ */
const ImageService = (() => {

    const CACHE_KEY = 'edu_image_cache_v1';
    const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // ۷ روز

    /* ============================================================
       مدیریت کش
       ============================================================ */
    function loadCache() {
        try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); }
        catch { return {}; }
    }
    function saveCache(cache) {
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); }
        catch (e) { console.warn('کش پر است:', e); }
    }
    function getCached(key) {
        const cache = loadCache();
        const item = cache[key];
        if (item && (Date.now() - item.t) < CACHE_MAX_AGE) return item.url;
        return null;
    }
    function setCached(key, url) {
        const cache = loadCache();
        cache[key] = { url, t: Date.now() };
        // اگر کش بیش از ۵۰۰ آیتم شد، قدیمی‌ترین‌ها را حذف کن
        const keys = Object.keys(cache);
        if (keys.length > 500) {
            keys.sort((a, b) => cache[a].t - cache[b].t);
            keys.slice(0, 100).forEach(k => delete cache[k]);
        }
        saveCache(cache);
    }

    /* ============================================================
       fetch با تایمر
       ============================================================ */
    async function fetchWithTimeout(url, ms = 4000, options = {}) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), ms);
        try {
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timer);
            return response;
        } catch (error) {
            clearTimeout(timer);
            throw error;
        }
    }

    /* ============================================================
       نرمال‌سازی کلیدواژه برای Wikipedia
       - حرف اول را بزرگ می‌کند
       - فاصله‌ها را با _ جایگزین می‌کند
       ============================================================ */
    function normalizeForWiki(keyword) {
        if (!keyword) return '';
        return keyword.trim()
            .split(/\s+/)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join('_');
    }

    /* ============================================================
       دریافت تصویر از Wikipedia (انگلیسی)
       ============================================================ */
    async function getWikipediaImage(keywordEn) {
        if (!keywordEn) return null;
        const title = normalizeForWiki(keywordEn);

        try {
            const res = await fetchWithTimeout(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
                4000
            );
            if (!res.ok) return null;
            const data = await res.json();
            // اولویت: originalimage > thumbnail
            if (data.originalimage && data.originalimage.source) {
                return data.originalimage.source;
            }
            if (data.thumbnail && data.thumbnail.source) {
                return data.thumbnail.source;
            }
        } catch (e) {
            console.warn('Wikipedia failed for:', keywordEn, e);
        }
        return null;
    }

    /* ============================================================
       جستجوی Wikipedia (اگر عنوان دقیق وجود نداشت)
       ============================================================ */
    async function searchWikipediaImage(keywordEn) {
        if (!keywordEn) return null;
        try {
            // جستجو در ویکی‌پدیا
            const searchRes = await fetchWithTimeout(
                `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(keywordEn)}&format=json&origin=*&srlimit=1`,
                4000
            );
            if (!searchRes.ok) return null;
            const searchData = await searchRes.json();
            if (!searchData.query || !searchData.query.search || searchData.query.search.length === 0) return null;

            const firstTitle = searchData.query.search[0].title;
            return await getWikipediaImage(firstTitle);
        } catch (e) {
            console.warn('Wiki search failed:', e);
        }
        return null;
    }

    /* ============================================================
       دریافت تصویر کلمه
       ============================================================ */
    async function getWordImage(keyword, size = 500) {
        if (!keyword) return null;

        // ۱) بررسی کش
        const cached = getCached('word_' + keyword);
        if (cached) return cached;

        let url = null;

        // ۲) Wikipedia (مستقیم)
        url = await getWikipediaImage(keyword);

        // ۳) جستجوی Wikipedia (اگر مستقیم پیدا نشد)
        if (!url) {
            url = await searchWikipediaImage(keyword);
        }

        // ۴) fallback به Picsum با seed ثابت
        if (!url) {
            const seed = hashString(keyword);
            url = `https://picsum.photos/seed/${seed}/600/400`;
        }

        // ذخیره در کش
        if (url) setCached('word_' + keyword, url);
        return url;
    }

    /* ============================================================
       دریافت تصویر پاداش (ماشین راه‌سازی)
       ============================================================ */
    const REWARD_WIKI_TOPICS = [
    'Bulldozer', 'Excavator', 'Road_roller', 'Backhoe_loader',
    'Grader', 'Loader_(equipment)', 'Crane_(machine)',
    'Tiger', 'Lion', 'Elephant', 'Dolphin', 'Butterfly',
    'Cat', 'Dog', 'Horse', 'Parrot', 'Peacock',
    'Rainbow', 'Waterfall', 'Flower', 'Sunset',
    'Strawberry', 'Watermelon', 'Orange', 'Banana',
    'Football', 'Basketball', 'Airplane', 'Rocket',
    'Train', 'Ship', 'Bicycle', 'Motorcycle'
];

    async function getRewardImage() {
        // ۱) بررسی کش
        const cached = getCached('reward_pool');
        if (cached && Array.isArray(cached) && cached.length > 0) {
            return cached[Math.floor(Math.random() * cached.length)];
        }

        // ۲) جمع‌آوری تصاویر از Wikipedia
        const imageUrls = [];
        const shuffled = [...REWARD_WIKI_TOPICS].sort(() => Math.random() - 0.5).slice(0, 4);

        for (const topic of shuffled) {
            try {
                const res = await fetchWithTimeout(
                    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`,
                    4000
                );
                if (res.ok) {
                    const data = await res.json();
                    const imgUrl = data.originalimage?.source || data.thumbnail?.source;
                    if (imgUrl) imageUrls.push(imgUrl);
                }
            } catch (e) {
                console.warn('Reward fetch failed for:', topic, e);
            }
            if (imageUrls.length >= 3) break; // به ۳ تصویر بسنده کن
        }

        // ۳) اگر هیچ تصویری نیامد، Picsum
        if (imageUrls.length === 0) {
            imageUrls.push(`https://picsum.photos/seed/reward${Date.now()}/1200/800`);
        }

        // ذخیره در کش
        setCached('reward_pool', imageUrls);
        return imageUrls[Math.floor(Math.random() * imageUrls.length)];
    }

    /* ============================================================
       ابزار کمکی
       ============================================================ */
    function hashString(s) {
        let h = 0;
        for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
        return Math.abs(h);
    }

    return { getWordImage, getRewardImage };
})();
