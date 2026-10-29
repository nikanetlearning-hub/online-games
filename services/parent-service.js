/* ================================================================
   parent-service.js
   کلمات سفارشی والدین + ضبط صدای والد/مادر در IndexedDB
   ================================================================ */
const ParentService = (() => {
    const WORD_KEY = 'edu_parent_custom_words_v2';
    const DB_NAME = 'edu_audio_db_v2';
    const STORE_NAME = 'recordings';

    /* ============================================================
       کلمات سفارشی
       ساختار: { "حرف|شکل": [ { w, i, img }, ... ] }
       ============================================================ */
    function getCustomWords() {
        try {
            return JSON.parse(localStorage.getItem(WORD_KEY) || '{}');
        } catch {
            return {};
        }
    }

    function addCustomWord(word, keywordEn, letter, form, targetIndex) {
        const all = getCustomWords();
        const key = `${letter}|${form}`;
        if (!all[key]) all[key] = [];
        // جلوگیری از تکرار کلمه
        if (all[key].some(item => item.w === word.trim())) return false;
        all[key].push({
            w: word.trim(),
            i: Number(targetIndex) || 0,
            img: (keywordEn || '').trim()
        });
        localStorage.setItem(WORD_KEY, JSON.stringify(all));
        return true;
    }

    function removeCustomWord(word, letter, form) {
        const all = getCustomWords();
        const key = `${letter}|${form}`;
        if (!all[key]) return false;
        const before = all[key].length;
        all[key] = all[key].filter(item => item.w !== word);
        if (all[key].length === 0) delete all[key];
        localStorage.setItem(WORD_KEY, JSON.stringify(all));
        return all[key].length < before;
    }

    /* ============================================================
       IndexedDB برای ذخیره‌ی صدای ضبط‌شده
       کلید = کلمه ، مقدار = Blob
       ============================================================ */
    function openDB() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, 1);
            req.onupgradeneeded = () => {
                if (!req.result.objectStoreNames.contains(STORE_NAME)) {
                    req.result.createObjectStore(STORE_NAME);
                }
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function saveRecording(word, blob) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).put(blob, word);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    }

    async function getRecording(word) {
        const db = await openDB();
        return new Promise((resolve) => {
            const req = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(word);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => resolve(null);
        });
    }

    async function deleteRecording(word) {
        const db = await openDB();
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).delete(word);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => resolve(false);
        });
    }

    /* ============================================================
       ضبط صدا با MediaRecorder
       ============================================================ */
    let mediaRecorder = null;
    let chunks = [];

    async function startRecording() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('مرورگر شما از ضبط صدا پشتیبانی نمی‌کند');
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        chunks = [];
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
        };
        mediaRecorder.start();
    }

    async function stopRecordingAndSave(word) {
        return new Promise((resolve) => {
            if (!mediaRecorder) { resolve(false); return; }
            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                mediaRecorder.stream.getTracks().forEach(t => t.stop());
                mediaRecorder = null;
                try {
                    await saveRecording(word, blob);
                    resolve(true);
                } catch (e) {
                    console.warn(e);
                    resolve(false);
                }
            };
            mediaRecorder.stop();
        });
    }

    function isRecording() {
        return mediaRecorder && mediaRecorder.state === 'recording';
    }

    return {
        getCustomWords,
        addCustomWord,
        removeCustomWord,
        getRecording,
        deleteRecording,
        startRecording,
        stopRecordingAndSave,
        isRecording
    };
})();