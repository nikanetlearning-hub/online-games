/* ================================================================
   shell.js — پوسته‌ی مشترک همه بازی‌ها
   ================================================================ */
(function () {
    'use strict';

    const state = {
        playerId: null,
        score: 0,
        gameModule: null,
        hintVisible: false,
        started: false
    };

    const el = {};

    /* ============================================================
       ساخت ساختار DOM پوسته
       ============================================================ */
    function buildShell() {
        document.getElementById('shell-root').innerHTML = `
            <!-- مودال پروفایل -->
            <div class="profile-modal" id="sh-profile-modal">
                <div class="profile-box">
                    <h1>👋 خوش آمدی!</h1>
                    <div id="sh-player-list"></div>
                    <div class="new-player-row">
                        <input type="text" id="sh-new-player-name" placeholder="نام بازیکن جدید..." maxlength="20">
                        <button id="sh-add-player-btn">➕ افزودن</button>
                    </div>
                </div>
            </div>

            <!-- نوار بالا -->
            <div class="topbar" id="sh-topbar" style="display:none">
                <div class="info">
                    <span>👤 <b id="sh-user-name">—</b></span>
                    <span id="sh-letter-wrap" style="display:none">حرف: <b id="sh-letter">—</b></span>
                    <span id="sh-form-wrap" style="display:none">شکل: <b id="sh-form">—</b></span>
                    <span>⭐ <b id="sh-score">0</b></span>
                </div>
                <div class="actions">
                    <button id="sh-hint-btn" style="display:none">نمایش راهنما</button>
                    <button id="sh-change-btn" class="change" style="display:none">🔄 تغییر</button>
                    <button id="sh-parent-btn" class="parent">👨‍👩‍👧 والدین</button>
                    <button id="sh-back-btn" class="back">🏠 بازگشت</button>
                </div>
            </div>

            <!-- بنر راهنما -->
            <div class="hint-banner" id="sh-hint-banner">
                <span class="lbl">شکل مورد نظر:</span>
                <span class="chr" id="sh-hint-chr">—</span>
            </div>

            <!-- ظرف بازی -->
            <div id="game-container" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding-top:clamp(44px,5.5vh,60px);"></div>
        `;

        el.profileModal = document.getElementById('sh-profile-modal');
        el.playerList   = document.getElementById('sh-player-list');
        el.newNameInput = document.getElementById('sh-new-player-name');
        el.addPlayerBtn = document.getElementById('sh-add-player-btn');

        el.topbar      = document.getElementById('sh-topbar');
        el.userName    = document.getElementById('sh-user-name');
        el.letter      = document.getElementById('sh-letter');
        el.letterWrap  = document.getElementById('sh-letter-wrap');
        el.form        = document.getElementById('sh-form');
        el.formWrap    = document.getElementById('sh-form-wrap');
        el.score       = document.getElementById('sh-score');
        el.hintBtn     = document.getElementById('sh-hint-btn');
        el.changeBtn   = document.getElementById('sh-change-btn');
        el.parentBtn   = document.getElementById('sh-parent-btn');
        el.hintBanner  = document.getElementById('sh-hint-banner');
        el.hintChr     = document.getElementById('sh-hint-chr');
        el.backBtn     = document.getElementById('sh-back-btn');
        el.gameContainer = document.getElementById('game-container');
    }

    /* ============================================================
       مودال پروفایل
       ============================================================ */
    function renderPlayerList() {
        const players = PlayerService.getPlayers();
        const current = PlayerService.getCurrentPlayer();

        if (players.length === 0) {
            el.playerList.innerHTML = '<p style="color:#94a3b8;text-align:center;margin-bottom:12px;">هنوز بازیکنی ثبت نشده. اول یک بازیکن بساز.</p>';
            return;
        }

        el.playerList.innerHTML = players.map(p => {
            const isActive = current && current.id === p.id;
            const gameCount = Object.keys(p.stats || {}).length;
            return `
                <div class="player-item ${isActive ? 'active' : ''}" data-id="${p.id}">
                    <span class="player-avatar">${p.avatar}</span>
                    <span class="player-name">${p.name}</span>
                    <span class="player-stat">${gameCount} بازی</span>
                </div>
            `;
        }).join('');

        el.playerList.querySelectorAll('.player-item').forEach(item => {
            item.addEventListener('click', () => {
                PlayerService.switchPlayer(item.dataset.id);
                closeProfileModal();
            });
        });
    }

    function closeProfileModal() {
        el.profileModal.style.display = 'none';
        el.topbar.style.display = 'flex';
        const p = PlayerService.getCurrentPlayer();
        if (p) el.userName.textContent = p.name;
        tryStartGame();
    }

    function setupProfileModal() {
        renderPlayerList();
        el.addPlayerBtn.addEventListener('click', () => {
            const name = el.newNameInput.value.trim();
            if (!name) return;
            PlayerService.createPlayer(name);
            renderPlayerList();
            closeProfileModal();
        });
        el.newNameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') el.addPlayerBtn.click();
        });
        const current = PlayerService.getCurrentPlayer();
        if (current) {
            closeProfileModal();
        } else {
            setTimeout(() => el.newNameInput.focus(), 100);
        }
    }

    /* ============================================================
       دکمه‌های نوار بالا
       ============================================================ */
    function setupTopbarButtons() {
        el.hintBtn.addEventListener('click', () => {
            state.hintVisible = !state.hintVisible;
            el.hintBanner.classList.toggle('show', state.hintVisible);
            el.hintBtn.classList.toggle('active', state.hintVisible);
            el.hintBtn.textContent = state.hintVisible ? 'پنهان کردن راهنما' : 'نمایش راهنما';
            if (state.gameModule && state.gameModule.onHintToggle) {
                state.gameModule.onHintToggle(state.hintVisible);
            }
        });

        el.changeBtn.addEventListener('click', () => {
            if (state.gameModule && state.gameModule.onChangeClick) {
                state.gameModule.onChangeClick();
            }
        });

        el.parentBtn.addEventListener('click', openParentPanel);

        el.backBtn.addEventListener('click', () => {
            if (history.length > 1) history.back();
            else location.href = 'index.html';
        });
    }

    /* ============================================================
       شروع بازی
       ============================================================ */
    function tryStartGame() {
        if (state.started) return;
        if (!state.gameModule) return;
        if (!PlayerService.getCurrentPlayer()) return;
        if (!el.gameContainer) return;
        state.started = true;
        try {
            state.gameModule.init(el.gameContainer);
        } catch (err) {
            console.error('خطا در راه‌اندازی بازی:', err);
        }
    }

    /* ============================================================
       API عمومی برای بازی‌ها
       ============================================================ */
    window.GameShell = {
        setScore(n) {
            state.score = Number(n) || 0;
            if (el.score) el.score.textContent = state.score;
        },
        addScore(n = 1) { this.setScore(state.score + n); },
        getScore() { return state.score; },

        getUserName() {
            const p = PlayerService.getCurrentPlayer();
            return p ? p.name : 'بازیکن';
        },

        setGameInfo(value1, value2, labels) {
            const l1 = (labels && labels.letter) || 'حرف';
            const l2 = (labels && labels.form) || 'شکل';

            if (value1 && el.letterWrap) {
                el.letterWrap.style.display = '';
                const firstNode = el.letterWrap.firstChild;
                if (firstNode && firstNode.nodeType === Node.TEXT_NODE) {
                    firstNode.nodeValue = l1 + ': ';
                }
                el.letter.textContent = value1;
            }
            if (value2 && el.formWrap) {
                el.formWrap.style.display = '';
                const firstNode = el.formWrap.firstChild;
                if (firstNode && firstNode.nodeType === Node.TEXT_NODE) {
                    firstNode.nodeValue = l2 + ': ';
                }
                el.form.textContent = value2;
            }
        },
        clearGameInfo() {
            if (el.letterWrap) el.letterWrap.style.display = 'none';
            if (el.formWrap) el.formWrap.style.display = 'none';
        },

        enableHint(text) {
            if (!el.hintBtn) return;
            el.hintBtn.style.display = '';
            el.hintChr.textContent = text || '—';
        },
        disableHint() {
            if (!el.hintBtn) return;
            el.hintBtn.style.display = 'none';
            el.hintBanner.classList.remove('show');
            el.hintBtn.classList.remove('active');
            el.hintBtn.textContent = 'نمایش راهنما';
            state.hintVisible = false;
        },

        /* دکمه تغییر - جدید */
        enableChange(label) {
            if (!el.changeBtn) return;
            el.changeBtn.style.display = '';
            el.changeBtn.textContent = '🔄 ' + (label || 'تغییر');
        },
        disableChange() {
            if (!el.changeBtn) return;
            el.changeBtn.style.display = 'none';
        },

        registerGame(module) {
            state.gameModule = module;
            tryStartGame();
        }
    };

    /* ============================================================
       پنل والدین
       ============================================================ */
    function openParentPanel() {
        const overlay = document.createElement('div');
        overlay.className = 'parent-overlay';
        overlay.innerHTML = `
            <div class="parent-panel">
                <h2>👨‍👩‍👧 منوی والدین</h2>
                <div class="parent-tabs">
                    <button class="ptab active" data-tab="words">📚 افزودن کلمه</button>
                    <button class="ptab" data-tab="stats">📊 آمار بازیکن</button>
                </div>
                <div class="ptab-content" id="ptab-words">
                    <div class="pfield">
                        <label>حرف:</label>
                        <input id="pw-letter" placeholder="مثلاً: ا">
                    </div>
                    <div class="pfield">
                        <label>شکل:</label>
                        <select id="pw-form">
                            <option value="آ-اول">آ در اول</option>
                            <option value="ا-اول">ا در اول</option>
                            <option value="ا-وسط">ا در وسط</option>
                            <option value="ا-آخر">ا در آخر</option>
                            <option value="اول">اول</option>
                            <option value="وسط">وسط</option>
                            <option value="آخر">آخر</option>
                        </select>
                    </div>
                    <div class="pfield">
                        <label>کلمه:</label>
                        <input id="pw-word" placeholder="مثلاً: آبشار">
                    </div>
                    <div class="pfield">
                        <label>ایندکس حرف هدف (از ۰):</label>
                        <input id="pw-index" type="number" value="0" min="0">
                    </div>
                    <div class="pfield">
                        <label>کلیدواژه انگلیسی برای تصویر (اختیاری):</label>
                        <input id="pw-keyword" placeholder="waterfall">
                    </div>
                    <div class="pbtn-row">
                        <button class="pbtn green" id="pw-save">💾 ذخیره کلمه</button>
                        <button class="pbtn purple" id="pw-record">🎙️ ضبط صدا</button>
                        <button class="pbtn red" id="pw-stop" style="display:none;">⏹️ پایان ضبط</button>
                    </div>
                    <p class="pstatus" id="pw-status"></p>
                </div>
                <div class="ptab-content" id="ptab-stats" style="display:none;"></div>
                <button class="parent-close" id="parent-close-btn">بستن ✖</button>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('#parent-close-btn').addEventListener('click', () => overlay.remove());

        overlay.querySelectorAll('.ptab').forEach(tab => {
            tab.addEventListener('click', () => {
                overlay.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const target = tab.dataset.tab;
                overlay.querySelector('#ptab-words').style.display = target === 'words' ? 'flex' : 'none';
                overlay.querySelector('#ptab-stats').style.display = target === 'stats' ? 'flex' : 'none';
                if (target === 'stats') renderStats(overlay.querySelector('#ptab-stats'));
            });
        });

        const statusEl = overlay.querySelector('#pw-status');
        overlay.querySelector('#pw-save').addEventListener('click', () => {
            const letter = overlay.querySelector('#pw-letter').value.trim();
            const form = overlay.querySelector('#pw-form').value;
            const word = overlay.querySelector('#pw-word').value.trim();
            const idx = overlay.querySelector('#pw-index').value;
            const kw = overlay.querySelector('#pw-keyword').value.trim();
            if (!letter || !word) {
                statusEl.textContent = '❌ حرف و کلمه الزامی است';
                return;
            }
            const ok = ParentService.addCustomWord(word, kw, letter, form, idx);
            statusEl.textContent = ok ? '✅ کلمه ذخیره شد' : '⚠️ این کلمه قبلاً ذخیره شده';
        });

        let recordingWord = '';
        const recordBtn = overlay.querySelector('#pw-record');
        const stopBtn = overlay.querySelector('#pw-stop');

        recordBtn.addEventListener('click', async () => {
            recordingWord = overlay.querySelector('#pw-word').value.trim();
            if (!recordingWord) {
                statusEl.textContent = '❌ اول کلمه را وارد کنید';
                return;
            }
            try {
                await ParentService.startRecording();
                recordBtn.style.display = 'none';
                stopBtn.style.display = 'inline-block';
                statusEl.textContent = '🎙️ در حال ضبط...';
            } catch (e) {
                statusEl.textContent = '❌ خطا در دسترسی به میکروفون';
            }
        });

        stopBtn.addEventListener('click', async () => {
            const ok = await ParentService.stopRecordingAndSave(recordingWord);
            stopBtn.style.display = 'none';
            recordBtn.style.display = 'inline-block';
            statusEl.textContent = ok ? '✅ صدا ذخیره شد' : '❌ خطا در ذخیره صدا';
        });
    }

    /* ============================================================
       نمایش آمار در تب آمار
       ============================================================ */
    function renderStats(container) {
        const player = PlayerService.getCurrentPlayer();
        if (!player) {
            container.innerHTML = '<p style="color:#94a3b8;">هیچ بازیکنی انتخاب نشده</p>';
            return;
        }
        const stats = player.stats || {};
        const entries = Object.entries(stats);

        if (entries.length === 0) {
            container.innerHTML = `<p style="color:#94a3b8;">${player.name} هنوز بازی‌ای انجام نداده</p>`;
            return;
        }

        const gameNames = {
            'alphabet': '🔤 الفبای فارسی',
            'numbers_fa': '🔢 اعداد فارسی',
            'numbers_en': '🔢 اعداد انگلیسی'
        };

        container.innerHTML = `<h3 style="color:#ffd700;margin-bottom:12px;">📊 آمار ${player.name}</h3>` +
            entries.map(([gameId, s]) => {
                const accuracy = s.attempts ? ((s.correct / s.attempts) * 100).toFixed(0) : 0;
                const displayName = gameNames[gameId] || ('🎮 ' + gameId);
                return `
                    <div class="stats-card">
                        <h4>${displayName}</h4>
                        <p>امتیاز: <b>${s.score}</b> | تلاش: ${s.attempts} | درست: ${s.correct} | غلط: ${s.wrong}</p>
                        <p>دقت: <b style="color:${accuracy >= 70 ? '#22c55e' : accuracy >= 40 ? '#f59e0b' : '#ef4444'}">${accuracy}%</b></p>
                    </div>
                `;
            }).join('');
    }

    /* ============================================================
       بارگذاری اسکریپت بازی
       ============================================================ */
    function loadGameScript() {
        const params = new URLSearchParams(location.search);
        const gameId = params.get('game');
        if (!gameId) {
            console.warn('پارامتر game در URL مشخص نشده. مثال: shell.html?game=alphabet');
            return;
        }
        const safeId = gameId.replace(/[^a-z0-9_-]/gi, '');
        if (!safeId) return;
        const script = document.createElement('script');
        script.src = `games/${safeId}-game.js`;
        script.onerror = () => console.error('اسکریپت بازی لود نشد:', script.src);
        document.body.appendChild(script);
    }

    /* ============================================================
       شروع
       ============================================================ */
    document.addEventListener('DOMContentLoaded', () => {
        buildShell();
        setupProfileModal();
        setupTopbarButtons();
        loadGameScript();
    });
})();
