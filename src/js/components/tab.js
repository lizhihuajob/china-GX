class Tab {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            tabListSelector: '.tab-list',
            tabBtnSelector: '.tab-btn',
            tabPanelSelector: '.tab-panel',
            activeClass: 'active',
            defaultIndex: 0,
            onBeforeChange: null,
            onAfterChange: null,
            ...options
        };

        this.tabList = null;
        this.tabs = [];
        this.panels = [];
        this.currentIndex = -1;

        this.init();
    }

    init() {
        this.tabList = this.element.querySelector(this.options.tabListSelector);
        this.tabs = Array.from(
            this.element.querySelectorAll(this.options.tabBtnSelector)
        );
        this.panels = Array.from(
            this.element.querySelectorAll(this.options.tabPanelSelector)
        );

        if (this.tabs.length === 0 || this.panels.length === 0) {
            console.warn('未找到标签页按钮或面板');
            return;
        }

        this.bindEvents();
        this.initTabs();
    }

    bindEvents() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.activateTab(index);
            });

            tab.addEventListener('keydown', (e) => {
                this.handleKeydown(e, index);
            });
        });
    }

    initTabs() {
        let activeIndex = this.options.defaultIndex;

        this.tabs.forEach((tab, index) => {
            if (tab.classList.contains(this.options.activeClass)) {
                activeIndex = index;
            }
        });

        this.activateTab(activeIndex, false);
    }

    handleKeydown(e, currentIndex) {
        const totalTabs = this.tabs.length;
        let newIndex = -1;

        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                newIndex = (currentIndex - 1 + totalTabs) % totalTabs;
                break;

            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                newIndex = (currentIndex + 1) % totalTabs;
                break;

            case 'Home':
                e.preventDefault();
                newIndex = 0;
                break;

            case 'End':
                e.preventDefault();
                newIndex = totalTabs - 1;
                break;
        }

        if (newIndex !== -1) {
            this.activateTab(newIndex);
            this.tabs[newIndex].focus();
        }
    }

    activateTab(index, animate = true) {
        if (index === this.currentIndex) return;

        if (typeof this.options.onBeforeChange === 'function') {
            const shouldChange = this.options.onBeforeChange(index, this.currentIndex);
            if (shouldChange === false) return;
        }

        if (this.currentIndex !== -1) {
            this.deactivateTab(this.currentIndex);
        }

        const tab = this.tabs[index];
        const panel = this.panels[index];

        if (tab) {
            tab.classList.add(this.options.activeClass);
            tab.setAttribute('aria-selected', 'true');
            tab.removeAttribute('tabindex');
        }

        if (panel) {
            panel.classList.add(this.options.activeClass);
            panel.removeAttribute('hidden');
        }

        this.currentIndex = index;

        if (typeof this.options.onAfterChange === 'function') {
            this.options.onAfterChange(index);
        }
    }

    deactivateTab(index) {
        const tab = this.tabs[index];
        const panel = this.panels[index];

        if (tab) {
            tab.classList.remove(this.options.activeClass);
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
        }

        if (panel) {
            panel.classList.remove(this.options.activeClass);
            panel.setAttribute('hidden', 'true');
        }
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    getCurrentPanel() {
        return this.panels[this.currentIndex];
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.tabs.length;
        this.activateTab(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.tabs.length) % this.tabs.length;
        this.activateTab(prevIndex);
    }

    goTo(index) {
        if (index >= 0 && index < this.tabs.length) {
            this.activateTab(index);
        }
    }

    destroy() {
        this.tabs.forEach((tab) => {
            tab.replaceWith(tab.cloneNode(true));
        });

        this.tabs = [];
        this.panels = [];
        this.tabList = null;
        this.element = null;
    }

    static initAll(container = document) {
        const tabs = container.querySelectorAll('[data-component="tab"]');
        return Array.from(tabs).map((el) => new Tab(el));
    }
}

export { Tab };
export default Tab;