/* ================================================================
   services/image-service.js
   ================================================================ */
const ImageService = (function () {
    'use strict';

    const CACHE_KEY = 'edu_image_cache_v1';
    const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

    function loadCache() {
        try {
            return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        } catch (e) {
            return {};
        }
    }

    function saveCache(cache) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        } catch (e) {
            console.warn('Cache full:', e);
        }
    }

    function getCached(key) {
        const cache = loadCache();
        const item = cache[key];
        if (item && (Date.now() - item.t) < CACHE_MAX_AGE) return item.url;
        return null;
    }

    function setCached(key, url) {
        const cache = loadCache();
        cache[key] = { url: url, t: Date.now() };
        const keys = Object.keys(cache);
        if (keys.length > 500) {
            keys.sort(function (a, b) { return cache[a].t - cache[b].t; });
            keys.slice(0, 100).forEach(function (k) { delete cache[k]; });
        }
        saveCache(cache);
    }

    function hashString(s) {
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h = (h * 31 + s.charCodeAt(i)) | 0;
        }
        return Math.abs(h);
    }

    async function fetchWithTimeout(url, ms, options) {
        const controller = new AbortController();
        const timer = setTimeout(function () { controller.abort(); }, ms || 4000);
        try {
            const response = await fetch(url, Object.assign({}, options || {}, { signal: controller.signal }));
            clearTimeout(timer);
            return response;
        } catch (error) {
            clearTimeout(timer);
            throw error;
        }
    }

    function normalizeForWiki(keyword) {
        if (!keyword) return '';
        return keyword.trim()
            .split(/\s+/)
            .map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); })
            .join('_');
    }

    async function getWikipediaImage(keywordEn) {
        if (!keywordEn) return null;
        const title = normalizeForWiki(keywordEn);
        try {
            const res = await fetchWithTimeout(
                'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title),
                4000
            );
            if (!res.ok) return null;
            const data = await res.json();
            if (data.originalimage && data.originalimage.source) return data.originalimage.source;
            if (data.thumbnail && data.thumbnail.source) return data.thumbnail.source;
        } catch (e) {
            console.warn('Wikipedia failed:', keywordEn, e);
        }
        return null;
    }

    async function searchWikipediaImage(keywordEn) {
        if (!keywordEn) return null;
        try {
            const searchRes = await fetchWithTimeout(
                'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' +
                encodeURIComponent(keywordEn) + '&format=json&origin=*&srlimit=1',
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

    async function getWordImage(keyword) {
        if (!keyword) return null;
        const cached = getCached('word_' + keyword);
        if (cached) return cached;

        let url = await getWikipediaImage(keyword);
        if (!url) url = await searchWikipediaImage(keyword);
        if (!url) {
            const seed = hashString(keyword);
            url = 'https://picsum.photos/seed/' + seed + '/600/400';
        }
        if (url) setCached('word_' + keyword, url);
        return url;
    }

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
        const cached = getCached('reward_pool');
        if (cached && Array.isArray(cached) && cached.length > 0) {
            return cached[Math.floor(Math.random() * cached.length)];
        }

        const imageUrls = [];
        const shuffled = REWARD_WIKI_TOPICS.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 4);

        for (let i = 0; i < shuffled.length; i++) {
            const topic = shuffled[i];
            try {
                const res = await fetchWithTimeout(
                    'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(topic),
                    4000
                );
                if (res.ok) {
                    const data = await res.json();
                    const imgUrl = (data.originalimage && data.originalimage.source)
                        || (data.thumbnail && data.thumbnail.source);
                    if (imgUrl) imageUrls.push(imgUrl);
                }
            } catch (e) {
                console.warn('Reward fetch failed:', topic, e);
            }
            if (imageUrls.length >= 3) break;
        }

        if (imageUrls.length === 0) {
            imageUrls.push('https://picsum.photos/seed/reward' + Date.now() + '/1200/800');
        }

        setCached('reward_pool', imageUrls);
        return imageUrls[Math.floor(Math.random() * imageUrls.length)];
    }

    return {
        getWordImage: getWordImage,
        getRewardImage: getRewardImage
    };
})();
