import Router from './core/router.js';
import DataManager from './core/dataManager.js';
import AnimationController from './core/animationController.js';
import ComponentManager from './core/componentManager.js';
import LazyLoader from './core/lazyLoader.js';
import { Modal } from './components/modal.js';
import { Accordion } from './components/accordion.js';
import { Tab } from './components/tab.js';
import { Gallery } from './components/gallery.js';
import { StitchDemo } from './components/stitchDemo.js';
import pages from './pages/index.js';

class App {
    constructor() {
        this.router = null;
        this.dataManager = null;
        this.animationController = null;
        this.componentManager = null;
        this.lazyLoader = null;
        this.modal = null;
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;

        try {
            this.initCoreModules();
            this.initRouter();
            await this.initData();
            this.initComponents();
            this.initEventListeners();
            this.handleInitialRoute();
            
            this.isInitialized = true;
            console.log('广绣网站已初始化完成');
        } catch (error) {
            console.error('应用初始化失败:', error);
            this.showError(error);
        }
    }

    initCoreModules() {
        this.dataManager = new DataManager();
        this.animationController = new AnimationController();
        this.componentManager = new ComponentManager();
        this.lazyLoader = new LazyLoader();
        this.modal = new Modal({
            overlayId: 'modal-overlay',
            containerId: 'modal-container',
            contentId: 'modal-content',
            closeId: 'modal-close'
        });
    }

    initRouter() {
        this.router = new Router({
            mode: 'hash',
            routes: pages,
            onBeforeEnter: async (route, params) => {
                this.showLoader();
                this.closeMobileMenu();
                return true;
            },
            onAfterEnter: async (route, params) => {
                await this.renderPage(route, params);
                this.hideLoader();
                this.updateNavigation(route);
                this.initPageComponents();
                this.scrollToTop();
            },
            onError: (error) => {
                console.error('路由错误:', error);
                this.hideLoader();
                this.showError(error);
            }
        });
    }

    async initData() {
        await this.dataManager.init();
    }

    initComponents() {
        this.componentManager.register('accordion', Accordion);
        this.componentManager.register('tab', Tab);
        this.componentManager.register('gallery', Gallery);
        this.componentManager.register('stitchDemo', StitchDemo);
        
        this.animationController.initScrollAnimations();
        this.lazyLoader.init();
    }

    initEventListeners() {
        this.initHeaderScroll();
        this.initMobileMenu();
        this.initBackToTop();
        this.initKeyboardNavigation();
        
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    initHeaderScroll() {
        const header = document.getElementById('site-header');
        if (!header) return;

        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        });
    }

    initMobileMenu() {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mainNav = document.getElementById('main-nav');

        if (!hamburgerBtn || !mainNav) return;

        hamburgerBtn.addEventListener('click', () => {
            const isActive = mainNav.classList.toggle('active');
            hamburgerBtn.classList.toggle('active', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mainNav = document.getElementById('main-nav');

        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            hamburgerBtn?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    initBackToTop() {
        let backToTop = document.querySelector('.back-to-top');
        
        if (!backToTop) {
            backToTop = document.createElement('button');
            backToTop.className = 'back-to-top';
            backToTop.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
            `;
            backToTop.setAttribute('aria-label', '返回顶部');
            document.body.appendChild(backToTop);
        }

        window.addEventListener('scroll', this.debounce(() => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, 100));

        backToTop.addEventListener('click', () => {
            this.scrollToTop();
        });
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.modal.close();
                this.closeMobileMenu();
            }

            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                console.log('搜索功能待实现');
            }
        });
    }

    handleInitialRoute() {
        this.router.init();
    }

    async renderPage(route, params) {
        const pageContainer = document.getElementById('page-container');
        if (!pageContainer) return;

        const currentContent = pageContainer.querySelector('[data-page]');
        
        if (currentContent) {
            this.animationController.animateElement(currentContent, 'page-exit');
            await this.animationController.waitForAnimationEnd(currentContent);
        }

        const PageClass = route.component;
        const pageInstance = new PageClass({
            dataManager: this.dataManager,
            animationController: this.animationController,
            componentManager: this.componentManager,
            modal: this.modal,
            params: params,
            route: route
        });

        const pageHtml = await pageInstance.render();
        
        pageContainer.innerHTML = pageHtml;
        
        const newContent = pageContainer.querySelector('[data-page]');
        if (newContent) {
            this.animationController.animateElement(newContent, 'page-enter');
        }

        await pageInstance.afterRender();
    }

    updateNavigation(route) {
        const navLinks = document.querySelectorAll('.nav-link[data-route]');
        const footerLinks = document.querySelectorAll('.footer-link');
        
        const currentPath = route.path || '/';

        navLinks.forEach(link => {
            const linkRoute = link.getAttribute('data-route');
            if (linkRoute === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    initPageComponents() {
        this.lazyLoader.observeAll();
        this.animationController.initScrollAnimations();
        this.componentManager.initAll();
    }

    showLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.remove('hidden');
        }
    }

    hideLoader() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }

    showError(error) {
        const errorMessage = error.message || '发生未知错误';
        this.modal.show(`
            <h2 class="modal-title">出错了</h2>
            <div class="modal-body">
                <div class="alert alert-error">
                    <span>${errorMessage}</span>
                </div>
                <p class="mt-4">请刷新页面重试或稍后再试。</p>
            </div>
        `);
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    handleResize() {
        this.closeMobileMenu();
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    navigate(path) {
        this.router.navigate(path);
    }

    getData(key) {
        return this.dataManager.get(key);
    }

    showModal(content) {
        this.modal.show(content);
    }

    closeModal() {
        this.modal.close();
    }
}

const app = new App();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

export default app;