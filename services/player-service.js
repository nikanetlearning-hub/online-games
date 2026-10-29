/* ================================================================
   player-service.js
   مدیریت پروفایل بازیکن و ذخیره‌ی آمار در localStorage
   ================================================================ */
const PlayerService = (() => {
    const STORAGE_KEY = 'edu_games_players_v2';

    let data = load();

    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) { console.warn(e); }
        return { players: {}, currentId: null };
    }

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    /* ============================================================
       ساخت پروفایل جدید
       ============================================================ */
    function createPlayer(name) {
        const id = 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
        data.players[id] = {
            name: name.trim() || 'بازیکن',
            avatar: '👤',
            createdAt: Date.now(),
            stats: {}
        };
        data.currentId = id;
        save();
        return id;
    }

    /* ============================================================
       دریافت لیست بازیکنان
       ============================================================ */
    function getPlayers() {
        return Object.entries(data.players).map(([id, p]) => ({ id, ...p }));
    }

    /* ============================================================
       دریافت بازیکن فعلی
       ============================================================ */
    function getCurrentPlayer() {
        return data.currentId && data.players[data.currentId]
            ? { id: data.currentId, ...data.players[data.currentId] }
            : null;
    }

    /* ============================================================
       تغییر بازیکن فعلی
       ============================================================ */
    function switchPlayer(id) {
        if (data.players[id]) {
            data.currentId = id;
            save();
            return true;
        }
        return false;
    }

    /* ============================================================
       ثبت پاسخ (درست / نادرست) برای یک بازی
       ============================================================ */
    function recordAnswer(gameId, isCorrect) {
        if (!data.currentId || !data.players[data.currentId]) return;
        const stats = data.players[data.currentId].stats;
        if (!stats[gameId]) {
            stats[gameId] = { score: 0, attempts: 0, correct: 0, wrong: 0, lastPlayed: 0 };
        }
        const s = stats[gameId];
        s.attempts += 1;
        if (isCorrect) { s.correct += 1; s.score += 1; }
        else { s.wrong += 1; }
        s.lastPlayed = Date.now();
        save();
    }

    /* ============================================================
       دریافت آمار یک بازی
       ============================================================ */
    function getGameStats(gameId) {
        const p = getCurrentPlayer();
        return p && p.stats[gameId] ? { ...p.stats[gameId] } : null;
    }

    /* ============================================================
       دریافت تمام آمار بازیکن فعلی
       ============================================================ */
    function getAllStats() {
        const p = getCurrentPlayer();
        return p ? p.stats : {};
    }

    return { createPlayer, getPlayers, getCurrentPlayer, switchPlayer, recordAnswer, getGameStats, getAllStats };
})();