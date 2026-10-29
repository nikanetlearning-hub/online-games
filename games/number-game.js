/* ================================================================
   games/number-game.js — بازی دوم: آموزش اعداد فارسی و انگلیسی
   ================================================================ */

const NumberGame = {
    container: null,
    language: 'fa',           // 'fa' یا 'en'
    target: 1,                // عدد هدف (1 تا 20)
    options: [],              // 5 عدد نمایش داده‌شده
    state: { isLocked: false },
    el: {},

    /* ============================================================
       اعداد فارسی و انگلیسی
       ============================================================ */
    numbers: {
        fa: ['۱','۲','۳','۴','۵','۶','۷','۸','۹','۱۰','۱۱','۱۲','۱۳','۱۴','۱۵','۱۶','۱۷','۱۸','۱۹','۲۰'],
        en: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
    },

    /* ============================================================
       کلمات اعداد برای پخش صدا
       ============================================================ */
    numberWords: {
        fa: ['یک','دو','سه','چهار','پنج','شش','هفت','هشت','نه','ده','یازده','دوازده','سیزده','چهارده','پانزده','شانزده','هفده','هجده','نوزده','بیست'],
        en: ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty']
    },

    /* ============================================================
       init
       ============================================================ */
    init(container) {
        this.container = container;
        this.renderSelector();
    },

    /* ============================================================
       صفحه‌ی انتخاب زبان و عدد هدف
       ============================================================ */
    renderSelector() {
        this.state.isLocked = false;
        this.container.innerHTML = `
            <div class="selector">
                <h2>انتخاب زبان و عدد برای آموزش</h2>
                <h3>۱) زبان اعداد را انتخاب کنید:</h3>
                <div class="form-list" id="ng-lang-list">
                    <button data-lang="fa" class="${this.language === 'fa' ? 'sel' : ''}">فارسی (۱، ۲، ۳...)</button>
                    <button data-lang="en" class="${this.language === 'en' ? 'sel' : ''}">English (1, 2, 3...)</button>
                </div>
                <h3>۲) عدد مورد نظر (۱ تا ۲۰) را انتخاب کنید:</h3>
                <div class="letter-grid" id="ng-num-grid"></div>
                <button class="start-btn" id="ng-start-btn">شروع بازی</button>
            </div>
        `;

        this.el.langList = document.getElementById('ng-lang-list');
        this.el.numGrid  = document.getElementById('ng-num-grid');
        this.el.startBtn = document.getElementById('ng-start-btn');

        // تغییر زبان
        this.el.langList.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                this.language = btn.dataset.lang;
                this.el.langList.querySelectorAll('button').forEach(b => {
                    b.classList.toggle('sel', b.dataset.lang === this.language);
                });
                this.buildNumberGrid();
            });
        });

        // شروع بازی
        this.el.startBtn.addEventListener('click', () => this.startGame());

        this.buildNumberGrid();
    },

    /* ============================================================
       ساخت شبکه‌ی 1 تا 20 در صفحه‌ی انتخاب
       ============================================================ */
    buildNumberGrid() {
        this.el.numGrid.innerHTML = '';
        for (let n = 1; n <= 20; n++) {
            const d = document.createElement('div');
            d.className = 'ltr';
            d.textContent = this.numbers[this.language][n - 1];
            d.dataset.num = n;
            if (n === this.target) d.classList.add('sel');
            d.addEventListener('click', () => {
                this.target = n;
                this.el.numGrid.querySelectorAll('.ltr').forEach(x => {
                    x.classList.toggle('sel', Number(x.dataset.num) === n);
                });
            });
            this.el.numGrid.appendChild(d);
        }
    },

    /* ============================================================
       شروع بازی
       ============================================================ */
    startGame() {
        if (!this.target) return;
        GameShell.setScore(0);
        const langLabel = this.language === 'fa' ? 'فارسی' : 'English';
        GameShell.setGameInfo(
            langLabel,
            this.displayNumber(this.target),
            { letter: 'زبان', form: 'عدد هدف' }
        );
        GameShell.enableHint(this.displayNumber(this.target));
        this.state.isLocked = false;
        this.renderGameArea();
        this.showNextRound();
    },

    /* ============================================================
       تبدیل عدد 1-20 به شکل نمایشی
       ============================================================ */
    displayNumber(n) {
        return this.numbers[this.language][n - 1];
    },

    /* ============================================================
       ساخت ناحیه بازی
       ============================================================ */
    renderGameArea() {
        this.container.innerHTML = `
            <div class="game-area" id="ng-game-area">
                <p class="instruction" id="ng-instruction"></p>
                <div class="number-options" id="ng-options"></div>
                <div class="feedback-panel" id="ng-feedback"></div>
            </div>
            <button class="sound-btn" id="ng-sound-btn" title="پخش صدا">🔊</button>
            <button class="change-btn" id="ng-change-btn" title="تغییر عدد">⚙️</button>
        `;

        this.el.gameArea    = document.getElementById('ng-game-area');
        this.el.instruction = document.getElementById('ng-instruction');
        this.el.options     = document.getElementById('ng-options');
        this.el.feedback    = document.getElementById('ng-feedback');
        this.el.soundBtn    = document.getElementById('ng-sound-btn');
        this.el.changeBtn   = document.getElementById('ng-change-btn');

        this.el.soundBtn.addEventListener('click', () => this.playNumberSound(this.target));
        this.el.changeBtn.addEventListener('click', () => {
            this.state.isLocked = false;
            this.hideFeedback();
            this.renderSelector();
        });
    },

    /* ============================================================
       نمایش دور جدید: ۵ عدد تصادفی شامل عدد هدف
       ============================================================ */
    showNextRound() {
        this.state.isLocked = false;
        this.hideFeedback();

        // ۴ عدد تصادفی غیر از عدد هدف
        const distractors = [];
        while (distractors.length < 4) {
            const r = Math.floor(Math.random() * 20) + 1;
            if (r !== this.target && !distractors.includes(r)) {
                distractors.push(r);
            }
        }

        // ترکیب و شافل
        const options = [this.target, ...distractors];
        this.shuffle(options);
        this.options = options;

        this.el.instruction.textContent =
            `عدد «${this.displayNumber(this.target)}» را پیدا کن و روی آن کلیک کن`;

        this.renderOptions();
    },

    /* ============================================================
       رندر ۵ عدد
       ============================================================ */
    renderOptions() {
        this.el.options.innerHTML = '';
        this.options.forEach(num => {
            const btn = document.createElement('div');
            btn.className = 'num-btn';
            btn.textContent = this.displayNumber(num);
            btn.dataset.num = num;
            btn.addEventListener('click', () => this.onOptionClick(num, btn));
            this.el.options.appendChild(btn);
        });
    },

    /* ============================================================
       کلیک روی یک عدد
       ============================================================ */
    onOptionClick(num, btnEl) {
        if (this.state.isLocked) return;

        // پخش صدای عدد کلیک‌شده
        this.playNumberSound(num);

        if (num === this.target) {
            this.onCorrect(btnEl);
        } else {
            this.onWrong(btnEl);
        }
    },

    /* ============================================================
       پاسخ درست
       ============================================================ */
    onCorrect(btnEl) {
        this.state.isLocked = true;
        GameShell.addScore(1);
        PlayerService.recordAnswer('numbers_' + this.language, true);

        btnEl.classList.add('correct');
        this.el.instruction.textContent = 'آفرین! درست بود 🎉';

        const praises = [
            'آفرین! 🌟','عالی بود! ⭐','دقیق و درست! ✅',
            'بارک‌الله! 👏','هوشمندانه! 🧠','کارت عالیه! 🎉'
        ];
        const msg = praises[Math.floor(Math.random() * praises.length)];

        this.showFeedback('success', `
            <div class="feedback-praise">${msg}</div>
            <div class="feedback-buttons">
                <button class="btn-reward" data-action="reward">🎁 نمایش پاداش</button>
                <button class="btn-next" data-action="next">عدد بعدی ➜</button>
            </div>
        `);
    },

    /* ============================================================
       پاسخ نادرست
       ============================================================ */
    onWrong(btnEl) {
        PlayerService.recordAnswer('numbers_' + this.language, false);

        btnEl.classList.add('wrong');
        setTimeout(() => btnEl.classList.remove('wrong'), 400);

        const target = this.displayNumber(this.target);
        const edu = `دقت کن! عدد درست «${target}» است`;

        const encourages = [
            'دوباره تلاش کن! 💪','تو میتونی! 🌟','نزدیک بود! ✨','با دقت بیشتر! 🎯'
        ];
        const enc = encourages[Math.floor(Math.random() * encourages.length)];

        this.showFeedback('wrong', `
            <div class="feedback-edu">${edu}</div>
            <div class="feedback-encourage">${enc}</div>
            <div class="feedback-buttons">
                <button class="btn-retry" data-action="retry">🔄 تکرار</button>
                <button class="btn-next" data-action="next">➡️ عدد بعدی</button>
            </div>
        `);
    },

    /* ============================================================
       پنل بازخورد
       ============================================================ */
    showFeedback(type, html) {
        this.el.feedback.className = 'feedback-panel show ' + type;
        this.el.feedback.innerHTML = html;
        this.el.feedback.querySelectorAll('button[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action === 'reward') this.showReward();
                else if (action === 'next') this.showNextRound();
                else if (action === 'retry') this.retryRound();
            });
        });
    },

    hideFeedback() {
        if (this.el.feedback) {
            this.el.feedback.className = 'feedback-panel';
            this.el.feedback.innerHTML = '';
        }
    },

    retryRound() {
        this.state.isLocked = false;
        this.hideFeedback();
        this.el.options.querySelectorAll('.num-btn').forEach(b => {
            b.classList.remove('correct', 'wrong');
        });
    },

    /* ============================================================
       پخش صدای عدد
       ============================================================ */
    playNumberSound(num) {
        const word = this.numberWords[this.language][num - 1];
        const langCode = this.language === 'fa' ? 'fa-IR' : 'en-US';

        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(word);
            u.lang = langCode;
            u.rate = 0.8;
            speechSynthesis.speak(u);
        }
    },

    /* ============================================================
       پاداش تمام‌صفحه
       ============================================================ */
    async showReward() {
        const overlay = document.createElement('div');
        overlay.className = 'reward-overlay';
        overlay.innerHTML = `
            <div class="reward-loading">⏳ در حال بارگذاری جایزه...</div>
            <img style="display:none" alt="جایزه">
            <div class="reward-text">آفرین ${GameShell.getUserName()}! ⭐ امتیاز: ${GameShell.getScore()}</div>
            <button class="btn-continue">ادامه ➜</button>
        `;
        document.body.appendChild(overlay);

        const img = overlay.querySelector('img');
        const loading = overlay.querySelector('.reward-loading');
        const url = await ImageService.getRewardImage();

        if (url) {
            img.onload = () => {
                img.style.display = 'block';
                loading.style.display = 'none';
            };
            img.onerror = () => { loading.textContent = '🎉 آفرین! (عکس در دسترس نیست)'; };
            img.src = url;
        } else {
            loading.textContent = '🎉 آفرین! (عکس در دسترس نیست)';
        }

        overlay.querySelector('.btn-continue').addEventListener('click', () => {
            overlay.remove();
            this.showNextRound();
        });
    },

    /* ============================================================
       ابزار
       ============================================================ */
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    onHintToggle(visible) {
        if (this.el.gameArea) this.el.gameArea.classList.toggle('shifted', visible);
    }
};

GameShell.registerGame(NumberGame);
