class Gallery {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            itemSelector: '.gallery-item',
            lightbox: true,
            lightboxClass: 'gallery-lightbox',
            onOpen: null,
            onClose: null,
            onNavigate: null,
            ...options
        };

        this.items = [];
        this.currentIndex = -1;
        this.lightbox = null;
        this.lightboxImage = null;
        this.lightboxCaption = null;

        this.init();
    }

    init() {
        this.items = Array.from(
            this.element.querySelectorAll(this.options.itemSelector)
        );

        if (this.items.length === 0) {
            console.warn('未找到画廊项目');
            return;
        }

        if (this.options.lightbox) {
            this.createLightbox();
        }

        this.bindEvents();
    }

    createLightbox() {
        if (document.querySelector(`.${this.options.lightboxClass}`)) {
            this.lightbox = document.querySelector(`.${this.options.lightboxClass}`);
            this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
            this.lightboxCaption = this.lightbox.querySelector('.lightbox-caption');
            return;
        }

        this.lightbox = document.createElement('div');
        this.lightbox.className = this.options.lightboxClass;
        this.lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="关闭">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
            <button class="lightbox-nav lightbox-prev" aria-label="上一张">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
            </button>
            <img class="lightbox-image" src="" alt=""/>
            <button class="lightbox-nav lightbox-next" aria-label="下一张">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
            <div class="lightbox-caption">
                <h4 class="lightbox-caption-title"></h4>
                <p class="lightbox-caption-desc"></p>
            </div>
        `;

        document.body.appendChild(this.lightbox);

        this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
        this.lightboxCaption = this.lightbox.querySelector('.lightbox-caption');
    }

    bindEvents() {
        this.items.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(index);
            });
        });

        if (this.lightbox) {
            const closeBtn = this.lightbox.querySelector('.lightbox-close');
            const prevBtn = this.lightbox.querySelector('.lightbox-prev');
            const nextBtn = this.lightbox.querySelector('.lightbox-next');

            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.close());
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.prev());
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.next());
            }

            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.close();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (!this.lightbox.classList.contains('active')) return;

                switch (e.key) {
                    case 'Escape':
                        this.close();
                        break;
                    case 'ArrowLeft':
                        this.prev();
                        break;
                    case 'ArrowRight':
                        this.next();
                        break;
                }
            });
        }
    }

    open(index) {
        if (index < 0 || index >= this.items.length) return;

        this.currentIndex = index;
        const item = this.items[index];

        const imgSrc = item.getAttribute('data-full') || 
                       item.querySelector('img')?.src || 
                       item.querySelector('img')?.getAttribute('data-src');
        
        const title = item.querySelector('.gallery-title')?.textContent || '';
        const desc = item.querySelector('.gallery-meta')?.textContent || '';

        if (this.options.lightbox && this.lightbox) {
            this.lightboxImage.src = imgSrc;
            this.lightboxImage.alt = title;

            const captionTitle = this.lightboxCaption.querySelector('.lightbox-caption-title');
            const captionDesc = this.lightboxCaption.querySelector('.lightbox-caption-desc');

            if (captionTitle) captionTitle.textContent = title;
            if (captionDesc) captionDesc.textContent = desc;

            this.lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        if (typeof this.options.onOpen === 'function') {
            this.options.onOpen(index, item);
        }
    }

    close() {
        if (this.lightbox) {
            this.lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (typeof this.options.onClose === 'function') {
            this.options.onClose(this.currentIndex);
        }

        this.currentIndex = -1;
    }

    next() {
        if (this.items.length === 0) return;
        
        let nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.items.length) {
            nextIndex = 0;
        }

        this.open(nextIndex);

        if (typeof this.options.onNavigate === 'function') {
            this.options.onNavigate('next', nextIndex);
        }
    }

    prev() {
        if (this.items.length === 0) return;
        
        let prevIndex = this.currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = this.items.length - 1;
        }

        this.open(prevIndex);

        if (typeof this.options.onNavigate === 'function') {
            this.options.onNavigate('prev', prevIndex);
        }
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    getItems() {
        return this.items;
    }

    destroy() {
        this.items.forEach((item) => {
            item.replaceWith(item.cloneNode(true));
        });

        if (this.lightbox && this.lightbox.parentNode) {
            this.lightbox.parentNode.removeChild(this.lightbox);
        }

        this.items = [];
        this.lightbox = null;
        this.element = null;
    }

    static initAll(container = document) {
        const galleries = container.querySelectorAll('[data-component="gallery"]');
        return Array.from(galleries).map((el) => new Gallery(el));
    }
}

export { Gallery };
export default Gallery;