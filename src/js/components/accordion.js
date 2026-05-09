class Accordion {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            itemSelector: '.accordion-item',
            headerSelector: '.accordion-header',
            contentSelector: '.accordion-content',
            activeClass: 'open',
            multiple: false,
            collapsible: true,
            duration: 300,
            onOpen: null,
            onClose: null,
            ...options
        };

        this.items = [];
        this.init();
    }

    init() {
        this.items = Array.from(
            this.element.querySelectorAll(this.options.itemSelector)
        ).map((item) => {
            const header = item.querySelector(this.options.headerSelector);
            const content = item.querySelector(this.options.contentSelector);

            return {
                element: item,
                header,
                content,
                isOpen: item.classList.contains(this.options.activeClass)
            };
        });

        this.bindEvents();
        this.initOpenItems();
    }

    bindEvents() {
        this.items.forEach((item) => {
            if (item.header) {
                item.header.addEventListener('click', () => {
                    this.toggle(item);
                });

                item.header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggle(item);
                    }
                });
            }
        });
    }

    initOpenItems() {
        this.items.forEach((item) => {
            if (item.isOpen) {
                this.open(item, false);
            }
        });
    }

    toggle(item) {
        if (item.isOpen) {
            if (this.options.collapsible) {
                this.close(item);
            }
        } else {
            this.open(item);
        }
    }

    open(item, animate = true) {
        if (!this.options.multiple) {
            this.items.forEach((otherItem) => {
                if (otherItem !== item && otherItem.isOpen) {
                    this.close(otherItem, animate);
                }
            });
        }

        item.isOpen = true;
        item.element.classList.add(this.options.activeClass);

        if (item.content) {
            if (animate) {
                this.animateOpen(item);
            } else {
                item.content.style.maxHeight = item.content.scrollHeight + 'px';
            }
        }

        if (item.header) {
            item.header.setAttribute('aria-expanded', 'true');
        }

        if (typeof this.options.onOpen === 'function') {
            this.options.onOpen(item);
        }
    }

    close(item, animate = true) {
        item.isOpen = false;
        item.element.classList.remove(this.options.activeClass);

        if (item.content) {
            if (animate) {
                this.animateClose(item);
            } else {
                item.content.style.maxHeight = '0px';
            }
        }

        if (item.header) {
            item.header.setAttribute('aria-expanded', 'false');
        }

        if (typeof this.options.onClose === 'function') {
            this.options.onClose(item);
        }
    }

    animateOpen(item) {
        const content = item.content;
        if (!content) return;

        content.style.display = 'block';
        const height = content.scrollHeight;
        content.style.maxHeight = '0px';

        requestAnimationFrame(() => {
            content.style.transition = `max-height ${this.options.duration}ms ease`;
            content.style.maxHeight = height + 'px';
        });

        this.waitForTransition(content, () => {
            content.style.maxHeight = 'none';
        });
    }

    animateClose(item) {
        const content = item.content;
        if (!content) return;

        content.style.maxHeight = content.scrollHeight + 'px';
        
        requestAnimationFrame(() => {
            content.style.transition = `max-height ${this.options.duration}ms ease`;
            content.style.maxHeight = '0px';
        });
    }

    waitForTransition(element, callback) {
        const handleTransitionEnd = (e) => {
            if (e.target === element && e.propertyName === 'max-height') {
                element.removeEventListener('transitionend', handleTransitionEnd);
                callback();
            }
        };

        element.addEventListener('transitionend', handleTransitionEnd);

        setTimeout(() => {
            element.removeEventListener('transitionend', handleTransitionEnd);
            callback();
        }, this.options.duration + 50);
    }

    openAll() {
        if (!this.options.multiple) {
            console.warn('手风琴设置为单次展开模式，无法展开全部');
            return;
        }

        this.items.forEach((item) => {
            if (!item.isOpen) {
                this.open(item);
            }
        });
    }

    closeAll() {
        this.items.forEach((item) => {
            if (item.isOpen) {
                this.close(item);
            }
        });
    }

    getActiveItems() {
        return this.items.filter((item) => item.isOpen);
    }

    destroy() {
        this.items.forEach((item) => {
            if (item.header) {
                item.header.replaceWith(item.header.cloneNode(true));
            }
        });

        this.items = [];
        this.element = null;
    }

    static initAll(container = document) {
        const accordions = container.querySelectorAll('[data-component="accordion"]');
        return Array.from(accordions).map((el) => new Accordion(el));
    }
}

export { Accordion };
export default Accordion;