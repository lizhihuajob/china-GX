class AnimationController {
    constructor() {
        this.animations = new Map();
        this.animationId = 0;
        this.scrollObserver = null;
        this.isInitialized = false;
    }

    animateElement(element, animationName, options = {}) {
        if (!element) return;

        const {
            duration = 500,
            delay = 0,
            easing = 'ease-out',
            onComplete = null
        } = options;

        const animationClass = this.getAnimationClass(animationName);
        if (!animationClass) return;

        element.style.setProperty('--animation-duration', `${duration}ms`);
        element.style.setProperty('--animation-delay', `${delay}ms`);
        element.style.setProperty('--animation-timing-function', easing);

        element.classList.remove(animationClass);
        void element.offsetWidth;
        element.classList.add(animationClass);

        if (onComplete) {
            const handleAnimationEnd = () => {
                element.removeEventListener('animationend', handleAnimationEnd);
                onComplete();
            };
            element.addEventListener('animationend', handleAnimationEnd);
        }

        return {
            element,
            animationClass,
            stop: () => this.stopAnimation(element, animationClass)
        };
    }

    getAnimationClass(animationName) {
        const animationMap = {
            'fade-in': 'animate-fade-in',
            'fade-in-up': 'animate-fade-in-up',
            'fade-in-down': 'animate-fade-in-down',
            'fade-in-left': 'animate-fade-in-left',
            'fade-in-right': 'animate-fade-in-right',
            'scale-in': 'animate-scale-in',
            'slide-up': 'animate-slide-up',
            'slide-down': 'animate-slide-down',
            'slide-left': 'animate-slide-left',
            'slide-right': 'animate-slide-right',
            'pulse': 'animate-pulse',
            'bounce': 'animate-bounce',
            'spin': 'animate-spin',
            'page-enter': 'page-enter',
            'page-exit': 'page-exit'
        };

        return animationMap[animationName] || null;
    }

    stopAnimation(element, animationClass) {
        if (!element) return;
        element.classList.remove(animationClass);
    }

    waitForAnimationEnd(element) {
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }

            const handleAnimationEnd = () => {
                element.removeEventListener('animationend', handleAnimationEnd);
                resolve();
            };

            const computedStyle = window.getComputedStyle(element);
            const animationDuration = parseFloat(computedStyle.animationDuration) * 1000;

            if (animationDuration === 0) {
                resolve();
                return;
            }

            element.addEventListener('animationend', handleAnimationEnd);

            setTimeout(() => {
                element.removeEventListener('animationend', handleAnimationEnd);
                resolve();
            }, animationDuration + 100);
        });
    }

    initScrollAnimations() {
        if (this.isInitialized && this.scrollObserver) {
            this.scrollObserver.disconnect();
        }

        if ('IntersectionObserver' in window) {
            this.scrollObserver = new IntersectionObserver(
                (entries) => this.handleScrollEntries(entries),
                {
                    root: null,
                    rootMargin: '0px 0px -50px 0px',
                    threshold: 0.1
                }
            );

            const scrollElements = document.querySelectorAll(
                '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
            );

            scrollElements.forEach((element) => {
                this.scrollObserver.observe(element);
            });

            this.isInitialized = true;
        } else {
            this.initScrollAnimationsFallback();
        }
    }

    handleScrollEntries(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animated');
                this.scrollObserver.unobserve(element);
            }
        });
    }

    initScrollAnimationsFallback() {
        const scrollElements = document.querySelectorAll(
            '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
        );

        const checkScroll = () => {
            scrollElements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - 50;

                if (isVisible) {
                    element.classList.add('animated');
                }
            });
        };

        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }

    createSequence(animations, options = {}) {
        const { delay = 100, onComplete = null } = options;
        let index = 0;

        const runNext = () => {
            if (index >= animations.length) {
                if (onComplete) onComplete();
                return;
            }

            const animation = animations[index];
            this.animateElement(
                animation.element,
                animation.type,
                animation.options || {}
            );

            index++;
            setTimeout(runNext, delay);
        };

        runNext();

        return {
            stop: () => {
                index = animations.length;
            }
        };
    }

    createParallax(element, options = {}) {
        const { speed = 0.5, direction = 'vertical' } = options;

        const updateParallax = () => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
                const offset = (scrollProgress - 0.5) * speed * 100;

                if (direction === 'vertical') {
                    element.style.transform = `translateY(${offset}px)`;
                } else {
                    element.style.transform = `translateX(${offset}px)`;
                }
            }
        };

        window.addEventListener('scroll', updateParallax);
        updateParallax();

        return {
            destroy: () => {
                window.removeEventListener('scroll', updateParallax);
                element.style.transform = '';
            }
        };
    }

    staggerAnimation(elements, animationType, options = {}) {
        const {
            delay = 100,
            staggerDelay = 50,
            onComplete = null
        } = options;

        if (!elements || elements.length === 0) return;

        elements.forEach((element, index) => {
            setTimeout(() => {
                this.animateElement(element, animationType, {
                    ...options,
                    onComplete: index === elements.length - 1 ? onComplete : null
                });
            }, delay + index * staggerDelay);
        });
    }

    addHoverEffect(element, options = {}) {
        if (!element) return;

        const {
            scale = 1.05,
            translateY = -4,
            shadow = 'var(--shadow-lg)',
            duration = 300
        } = options;

        element.style.transition = `transform ${duration}ms var(--ease-out), box-shadow ${duration}ms var(--ease-out)`;

        const handleMouseEnter = () => {
            element.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            element.style.boxShadow = shadow;
        };

        const handleMouseLeave = () => {
            element.style.transform = '';
            element.style.boxShadow = '';
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return {
            destroy: () => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
                element.style.transition = '';
                element.style.transform = '';
                element.style.boxShadow = '';
            }
        };
    }

    addCardHoverEffects(container = document) {
        const cards = container.querySelectorAll('.card');
        
        cards.forEach((card) => {
            this.addHoverEffect(card, {
                scale: 1.02,
                translateY: -4,
                shadow: 'var(--shadow-xl)',
                duration: 300
            });
        });
    }

    addButtonRipple(button) {
        if (!button) return;

        const handleClick = (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        };

        button.addEventListener('click', handleClick);

        return {
            destroy: () => {
                button.removeEventListener('click', handleClick);
            }
        };
    }

    addProgressBar() {
        if (document.querySelector('.progress-bar')) return;

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        document.body.appendChild(progressBar);

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();

        return {
            destroy: () => {
                window.removeEventListener('scroll', updateProgress);
                progressBar.remove();
            }
        };
    }

    animateNumbers(element, targetValue, options = {}) {
        if (!element) return;

        const {
            duration = 2000,
            delay = 0,
            decimalPlaces = 0,
            prefix = '',
            suffix = '',
            easing = 'ease-out'
        } = options;

        const startValue = 0;
        const startTime = performance.now() + delay;

        const updateNumber = (currentTime) => {
            if (currentTime < startTime) {
                requestAnimationFrame(updateNumber);
                return;
            }

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            let easedProgress;
            if (easing === 'ease-out') {
                easedProgress = 1 - Math.pow(1 - progress, 3);
            } else if (easing === 'ease-in') {
                easedProgress = progress * progress * progress;
            } else {
                easedProgress = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            }

            const currentValue = startValue + (targetValue - startValue) * easedProgress;
            const formattedValue = currentValue.toFixed(decimalPlaces);
            
            element.textContent = `${prefix}${formattedValue}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };

        requestAnimationFrame(updateNumber);
    }

    createTypewriter(element, text, options = {}) {
        if (!element) return;

        const {
            speed = 50,
            delay = 0,
            cursor = true,
            onComplete = null
        } = options;

        let charIndex = 0;
        element.textContent = '';

        if (cursor) {
            element.style.borderRight = '2px solid var(--color-text)';
            element.style.animation = 'blink 1s step-end infinite';
        }

        const typeNext = () => {
            if (charIndex < text.length) {
                element.textContent += text[charIndex];
                charIndex++;
                setTimeout(typeNext, speed);
            } else {
                if (onComplete) onComplete();
            }
        };

        setTimeout(typeNext, delay);

        return {
            stop: () => {
                charIndex = text.length;
            }
        };
    }

    addSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href.startsWith('#/')) return;

                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    revealMask(element) {
        if (!element) return;
        element.classList.add('reveal-mask');
    }

    destroy() {
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
            this.scrollObserver = null;
        }
        this.animations.clear();
        this.isInitialized = false;
    }
}

export default AnimationController;