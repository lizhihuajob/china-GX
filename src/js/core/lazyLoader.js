class LazyLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px 0px',
            threshold: 0.01,
            placeholderColor: 'var(--color-neutral-100)',
            loadingClass: 'lazy-image',
            loadedClass: 'loaded',
            errorClass: 'error',
            ...options
        };

        this.observer = null;
        this.images = new Set();
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;

        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    rootMargin: this.options.rootMargin,
                    threshold: this.options.threshold
                }
            );
        }

        this.isInitialized = true;
    }

    observe(element) {
        if (!element) return;

        if (this.images.has(element)) return;

        if (!this.isInitialized) {
            this.init();
        }

        this.images.add(element);

        if (this.observer) {
            this.observer.observe(element);
        } else {
            this.loadImage(element);
        }
    }

    observeAll(container = document) {
        const lazyElements = container.querySelectorAll('[data-src], [data-srcset]');
        
        lazyElements.forEach((element) => {
            this.observe(element);
        });

        const lazyBackgrounds = container.querySelectorAll('[data-bg]');
        
        lazyBackgrounds.forEach((element) => {
            this.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    loadImage(element) {
        return new Promise((resolve, reject) => {
            const src = element.getAttribute('data-src');
            const srcset = element.getAttribute('data-srcset');
            const bg = element.getAttribute('data-bg');
            const sizes = element.getAttribute('data-sizes');

            if (!src && !srcset && !bg) {
                resolve();
                return;
            }

            if (element.classList.contains(this.options.loadedClass)) {
                resolve();
                return;
            }

            element.classList.add(this.options.loadingClass);

            if (bg) {
                this.loadBackground(element, bg)
                    .then(() => {
                        element.classList.remove(this.options.loadingClass);
                        element.classList.add(this.options.loadedClass);
                        this.images.delete(element);
                        resolve();
                    })
                    .catch(() => {
                        element.classList.remove(this.options.loadingClass);
                        element.classList.add(this.options.errorClass);
                        reject();
                    });
                return;
            }

            const img = new Image();

            img.onload = () => {
                if (src) {
                    element.src = src;
                }
                if (srcset) {
                    element.srcset = srcset;
                }
                if (sizes) {
                    element.sizes = sizes;
                }

                element.classList.remove(this.options.loadingClass);
                element.classList.add(this.options.loadedClass);
                
                element.removeAttribute('data-src');
                element.removeAttribute('data-srcset');
                element.removeAttribute('data-sizes');
                
                this.images.delete(element);
                
                this.triggerLoadEvent(element);
                resolve();
            };

            img.onerror = () => {
                element.classList.remove(this.options.loadingClass);
                element.classList.add(this.options.errorClass);
                this.images.delete(element);
                reject(new Error('图片加载失败'));
            };

            if (src) {
                img.src = src;
            }
            if (srcset) {
                img.srcset = srcset;
            }
        });
    }

    loadBackground(element, bg) {
        return new Promise((resolve, reject) => {
            const bgImages = this.parseBackgroundImages(bg);
            
            if (bgImages.length === 0) {
                element.style.backgroundImage = bg;
                resolve();
                return;
            }

            const loadPromises = bgImages.map((url) => {
                return new Promise((res, rej) => {
                    const img = new Image();
                    img.onload = res;
                    img.onerror = rej;
                    img.src = url;
                });
            });

            Promise.all(loadPromises)
                .then(() => {
                    element.style.backgroundImage = bg;
                    element.removeAttribute('data-bg');
                    resolve();
                })
                .catch(reject);
        });
    }

    parseBackgroundImages(bg) {
        const urlRegex = /url\(['"]?([^'")]+)['"]?\)/g;
        const matches = [];
        let match;

        while ((match = urlRegex.exec(bg)) !== null) {
            matches.push(match[1]);
        }

        return matches;
    }

    triggerLoadEvent(element) {
        const event = new CustomEvent('lazy-loaded', {
            detail: { element }
        });
        element.dispatchEvent(event);
    }

    forceLoad(element) {
        return this.loadImage(element);
    }

    loadAll() {
        const promises = [];
        this.images.forEach((element) => {
            promises.push(this.forceLoad(element));
        });
        return Promise.all(promises);
    }

    unobserve(element) {
        if (this.observer && this.images.has(element)) {
            this.observer.unobserve(element);
            this.images.delete(element);
        }
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.images.clear();
        this.isInitialized = false;
    }

    static createPlaceholder(width, height, options = {}) {
        const {
            color = '#e8e4de',
            text = '',
            textColor = '#a8a29a'
        } = options;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);

        if (text) {
            ctx.fillStyle = textColor;
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, width / 2, height / 2);
        }

        return canvas.toDataURL();
    }
}

export default LazyLoader;