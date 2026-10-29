/* ================================================================
   image-service.js
   سرویس دریافت تصاویر مرتبط با کلمه و تصاویر پاداش
   ================================================================ */
const ImageService = (() => {

    /* ============================================================
       ۱) تصویر مرتبط با کلمه
       - Openverse API (بدون کلید، Creative Commons)
       - fallback: tteg (Unsplash) با کلیدواژه انگلیسی
       ============================================================ */
    async function getWordImage(keyword, size = 500) {
        if (!keyword) return null;

        // تلاش ۱: Openverse
        try {
            const res = await fetch(
                `https://api.openverse.org/v1/images/?q=${encodeURIComponent(keyword)}&page_size=1`
            );
            if (res.ok) {
                const data = await res.json();
                if (data.results && data.results.length > 0) {
                    return data.results[0].url;
                }
            }
        } catch (e) {
            console.warn('Openverse failed:', e);
        }

        // تلاش ۲: tteg (Unsplash)
        try {
            const res = await fetch(
                `https://tteg-api-53227342417.asia-south1.run.app/search?q=${encodeURIComponent(keyword)}&n=1&orientation=landscape`
            );
            if (res.ok) {
                const data = await res.json();
                if (data.results && data.results[0]) {
                    return data.results[0].url || data.results[0].src?.large;
                }
            }
        } catch (e) {
            console.warn('tteg failed:', e);
        }

        return null;
    }

    /* ============================================================
       ۲) تصویر پاداش: ماشین‌آلات راه‌سازی واقعی
       - tteg (Unsplash) با کلیدواژه‌های انگلیسی
       - fallback: Pixabay (در صورت وجود کلید)
       ============================================================ */
    const REWARD_KEYWORDS = [
        'bulldozer construction',
        'excavator construction site',
        'road roller asphalt',
        'backhoe loader',
        'motor grader road',
        'wheel loader construction',
        'crane construction site',
        'asphalt paver machine'
    ];

    async function getRewardImage() {
        const keyword = REWARD_KEYWORDS[Math.floor(Math.random() * REWARD_KEYWORDS.length)];

        // تلاش ۱: tteg
        try {
            const res = await fetch(
                `https://tteg-api-53227342417.asia-south1.run.app/search?q=${encodeURIComponent(keyword)}&n=1&orientation=landscape`
            );
            if (res.ok) {
                const data = await res.json();
                if (data.results && data.results[0]) {
                    return data.results[0].url || data.results[0].src?.large;
                }
            }
        } catch (e) {
            console.warn('tteg reward failed:', e);
        }

        // تلاش ۲: Openverse
        try {
            const res = await fetch(
                `https://api.openverse.org/v1/images/?q=${encodeURIComponent(keyword)}&page_size=1`
            );
            if (res.ok) {
                const data = await res.json();
                if (data.results && data.results.length > 0) {
                    return data.results[0].url;
                }
            }
        } catch (e) {
            console.warn('Openverse reward failed:', e);
        }

        return null;
    }

    return { getWordImage, getRewardImage };
})();