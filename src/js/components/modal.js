class Modal {
    constructor(options = {}) {
        this.options = {
            overlayId: 'modal-overlay',
            containerId: 'modal-container',
            contentId: 'modal-content',
            closeId: 'modal-close',
            closeOnOverlay: true,
            closeOnEsc: true,
            bodyScrollLock: true,
            onOpen: null,
            onClose: null,
            ...options
        };

        this.overlay = document.getElementById(this.options.overlayId);
        this.container = document.getElementById(this.options.containerId);
        this.content = document.getElementById(this.options.contentId);
        this.closeBtn = document.getElementById(this.options.closeId);

        this.isOpen = false;
        this.lastFocusedElement = null;

        this.init();
    }

    init() {
        if (!this.overlay) {
            this.overlay = document.createElement('div');
            this.overlay.id = this.options.overlayId;
            this.overlay.className = 'modal-overlay';
            document.body.appendChild(this.overlay);
        }

        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = this.options.containerId;
            this.container.className = 'modal-container';
            this.overlay.appendChild(this.container);
        }

        if (!this.content) {
            this.content = document.createElement('div');
            this.content.id = this.options.contentId;
            this.content.className = 'modal-content';
            this.container.appendChild(this.content);
        }

        if (!this.closeBtn && this.container) {
            this.closeBtn = document.createElement('button');
            this.closeBtn.id = this.options.closeId;
            this.closeBtn.className = 'modal-close';
            this.closeBtn.setAttribute('aria-label', '关闭');
            this.closeBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
            `;
            this.container.appendChild(this.closeBtn);
        }

        this.bindEvents();
    }

    bindEvents() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        if (this.options.closeOnOverlay && this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });
        }

        if (this.options.closeOnEsc) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        }
    }

    open(content) {
        if (this.isOpen) return;

        this.lastFocusedElement = document.activeElement;

        if (content) {
            this.setContent(content);
        }

        if (this.options.bodyScrollLock) {
            document.body.style.overflow = 'hidden';
        }

        this.overlay.classList.add('active');
        this.isOpen = true;

        if (typeof this.options.onOpen === 'function') {
            this.options.onOpen();
        }

        this.trapFocus();
    }

    close() {
        if (!this.isOpen) return;

        this.overlay.classList.remove('active');
        this.isOpen = false;

        if (this.options.bodyScrollLock) {
            document.body.style.overflow = '';
        }

        if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
            this.lastFocusedElement.focus();
        }

        if (typeof this.options.onClose === 'function') {
            this.options.onClose();
        }
    }

    setContent(content) {
        if (!this.content) return;

        if (typeof content === 'string') {
            this.content.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            this.content.innerHTML = '';
            this.content.appendChild(content);
        }
    }

    show(content) {
        this.open(content);
    }

    hide() {
        this.close();
    }

    toggle(content) {
        if (this.isOpen) {
            this.close();
        } else {
            this.open(content);
        }
    }

    trapFocus() {
        const focusableSelectors = [
            'a[href]',
            'area[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'button:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];

        const focusableElements = this.container.querySelectorAll(focusableSelectors.join(','));
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (firstFocusable) {
            firstFocusable.focus();
        }

        const handleKeyDown = (e) => {
            if (!this.isOpen) return;

            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        };

        this.overlay.addEventListener('keydown', handleKeyDown);
    }

    destroy() {
        this.close();
        
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }

        this.overlay = null;
        this.container = null;
        this.content = null;
        this.closeBtn = null;
    }

    static create(options) {
        return new Modal(options);
    }

    static alert(message, title = '提示') {
        const modal = new Modal();
        modal.show(`
            <div class="modal-body text-center">
                <h3 class="modal-title mb-4">${title}</h3>
                <p class="mb-6">${message}</p>
                <button class="btn btn-primary" data-modal-close>确定</button>
            </div>
        `);

        const closeBtn = modal.content.querySelector('[data-modal-close]');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => modal.close());
        }

        return modal;
    }

    static confirm(message, title = '确认') {
        return new Promise((resolve) => {
            const modal = new Modal();
            modal.show(`
                <div class="modal-body text-center">
                    <h3 class="modal-title mb-4">${title}</h3>
                    <p class="mb-6">${message}</p>
                    <div class="flex justify-center gap-4">
                        <button class="btn btn-outline" data-modal-cancel>取消</button>
                        <button class="btn btn-primary" data-modal-confirm>确定</button>
                    </div>
                </div>
            `);

            const cancelBtn = modal.content.querySelector('[data-modal-cancel]');
            const confirmBtn = modal.content.querySelector('[data-modal-confirm]');

            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    modal.close();
                    resolve(false);
                });
            }

            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    modal.close();
                    resolve(true);
                });
            }
        });
    }
}

export { Modal };
export default Modal;