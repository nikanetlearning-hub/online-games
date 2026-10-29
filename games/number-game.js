/* ================================================================
   games/number-game.js — بازی دوم: آموزش اعداد فارسی و انگلیسی
   ================================================================ */

const NumberGame = {
    container: null,
    language: 'fa',
    target: 1,
    options: [],
    state: { isLocked: false },
    el: {},

    numbers: {
        fa: ['۱','۲','۳','۴','۵','۶','۷','۸','۹','۱۰','۱۱','۱۲','۱۳','۱۴','۱۵','۱۶','۱۷','۱۸','۱۹','۲۰'],
        en: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
    },

    numberWords: {
        fa: ['یک','دو','سه','چهار','پنج','شش','هفت','هشت','نه','ده','یازده','دوازده','سیزده','چهارده','پانزده','شانزده','هفده','هجده','نوزده','بیست'],
        en: ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty']
    },

    COLORS: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'],

    /* ============================================================
       init
       ============================================================ */
    init(container) {
        this.container = container;
        this.renderSelector();
    },

    /* ============================================================
       صفحه انتخاب زبان و عدد
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

        this.el.langList.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                this.language = btn.dataset.lang;
                this.el.langList.querySelectorAll('button').forEach(b => {
                    b.classList.toggle('sel', b.dataset.lang === this.language);
                });
                this.buildNumberGrid();
            });
        });

        this.el.startBtn.addEventListener('click', () => this.startGame());
        this.buildNumberGrid();
    },

    /* ============================================================
       ساخت شبکه ۱ تا ۲۰ با فونت مناسب زبان
       ============================================================ */
    buildNumberGrid() {
        this.el.numGrid.className = 'letter-grid lang-' + this.language;
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
        GameShell.setGameInfo(
            null,
            this.displayNumber(this.target),
            { form: 'عدد هدف' }
        );
        GameShell.enableHint(this.displayNumber(this.target));
        GameShell.enableChange('تغییر عدد');
        this.state.isLocked = false;
        this.renderGameArea();
        this.showNextRound();
    },

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
                <div class="number-options lang-${this.language}" id="ng-options"></div>
                <div class="feedback-panel" id="ng-feedback"></div>
            </div>
            <button class="sound-btn" id="ng-sound-btn" title="پخش صدا">🔊</button>
        `;

        this.el.gameArea    = document.getElementById('ng-game-area');
        this.el.instruction = document.getElementById('ng-instruction');
        this.el.options     = document.getElementById('ng-options');
        this.el.feedback    = document.getElementById('ng-feedback');
        this.el.soundBtn    = document.getElementById('ng-sound-btn');

        this.el.soundBtn.addEventListener('click', () => this.playNumberSound(this.target));
    },

    /* ============================================================
       نمایش دور جدید
       ============================================================ */
    showNextRound() {
        this.state.isLocked = false;
        this.hideFeedback();

        const distractors = [];
        while (distractors.length < 4) {
            const r = Math.floor(Math.random() * 20) + 1;
            if (r !== this.target && !distractors.includes(r)) {
                distractors.push(r);
            }
        }

        const options = [this.target, ...distractors];
        this.shuffle(options);
        this.options = options;

        this.el.instruction.textContent =
            `عدد «${this.displayNumber(this.target)}» را پیدا کن و روی آن کلیک کن`;

        this.renderOptions();
    },

    /* ============================================================
       رندر ۵ عدد با رنگ‌های مختلف و فونت مناسب زبان
       ============================================================ */
    renderOptions() {
        this.el.options.className = 'number-options lang-' + this.language;
        this.el.options.innerHTML = '';

        this.options.forEach((num, idx) => {
            const btn = document.createElement('div');
            btn.className = 'num-btn';
            btn.textContent = this.displayNumber(num);
            btn.style.color = this.COLORS[idx % this.COLORS.length];
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
        this.playNumberSound(num);

        if (num === this.target) {
            this.onCorrect(btnEl);
        } else {
            this.onWrong(btnEl);
        }
    },

    /* ============================================================
       پاسخ درست → صفحه شمارش
       ============================================================ */
    onCorrect(btnEl) {
        this.state.isLocked = true;
        GameShell.addScore(1);
        PlayerService.recordAnswer('numbers_' + this.language, true);

        btnEl.classList.add('correct');
        this.el.instruction.textContent = 'آفرین! درست بود 🎉';

        setTimeout(() => this.showCountScreen(), 400);
    },

    /* ============================================================
       صفحه شمارش تمام‌صفحه (اندازه هوشمند + تنوع آیکون)
       ============================================================ */
    showCountScreen() {
        const num = this.target;

        const ICON_GROUPS = {
            cars:    ['🚗','🚙','🚕','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🚚','🚛','🚜'],
            fruits:  ['🍎','🍊','🍋','🍇','🍓','🍒','🍑','🍉','🍌','🥝','🍍','🥭','🍐'],
            animals: ['🐶','🐱','🐭','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸'],
            flowers: ['🌸','🌺','🌻','🌹','🌷','🌼','💐','🏵️','🌾','🍀'],
            sports:  ['⚽','🏀','🏈','⚾','🎾','🏐','🏉','🎱','🏓','🏸'],
            stars:   ['⭐','🌟','✨','💫','🌠','🌌']
        };
        const groupNames = Object.keys(ICON_GROUPS);
        const chosenGroup = groupNames[Math.floor(Math.random() * groupNames.length)];
        const iconPool = ICON_GROUPS[chosenGroup];

        const items = Array.from({ length: num }, (_, i) => {
            const icon = iconPool[Math.floor(Math.random() * iconPool.length)];
            return `<span class="count-item" style="animation-delay: ${i * 0.06}s">${icon}</span>`;
        }).join('');

        let cols, sizeVh, gapVh;
        if (num <= 2) { cols = num; sizeVh = 18; gapVh = 2; }
        else if (num <= 4) { cols = num; sizeVh = 16; gapVh = 2; }
        else if (num <= 6) { cols = 3; sizeVh = 13; gapVh = 1.5; }
        else if (num <= 9) { cols = 3; sizeVh = 11; gapVh = 1.5; }
        else if (num <= 12) { cols = 4; sizeVh = 10; gapVh = 1.2; }
        else if (num <= 16) { cols = 4; sizeVh = 9; gapVh = 1; }
        else { cols = 5; sizeVh = 8; gapVh = 0.8; }

        const overlay = document.createElement('div');
        overlay.className = 'count-overlay lang-' + this.language;
        overlay.innerHTML = `
            <div class="count-number">${this.displayNumber(num)}</div>
            <div class="count-instruction">آفرین! حالا این ${this.displayNumber(num)} تا را بشمار</div>
            <div class="count-grid" style="
                grid-template-columns: repeat(${cols}, auto);
                gap: ${gapVh}vh;
                justify-content: center;
                align-content: center;
                max-height: 55vh;
                overflow: hidden;
            ">
                ${items}
            </div>
            <div class="count-actions">
                <button class="btn-repeat">🔄 تکرار</button>
                <button class="btn-next-test">تست بعدی ➜</button>
            </div>
        `;

        overlay.querySelectorAll('.count-item').forEach(el => {
            el.style.fontSize = sizeVh + 'vh';
            el.style.lineHeight = '1';
        });

        document.body.appendChild(overlay);

        setTimeout(() => this.playNumberSound(num), 600);

        overlay.querySelector('.btn-repeat').addEventListener('click', () => {
            overlay.remove();
            this.showCountScreen();
        });

        overlay.querySelector('.btn-next-test').addEventListener('click', () => {
            overlay.remove();
            this.showNextRound();
        });
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
                if (action === 'next') this.showNextRound();
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
    },

    onChangeClick() {
        GameShell.disableHint();
        GameShell.disableChange();
        this.state.isLocked = false;
        this.hideFeedback();
        this.renderSelector();
    }
};

GameShell.registerGame(NumberGame);
