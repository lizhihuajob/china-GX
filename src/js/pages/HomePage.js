import BasePage from './BasePage.js';

class HomePage extends BasePage {
    constructor(options) {
        super(options);
    }

    async render() {
        const siteData = this.getSiteData();
        const featuredWorks = this.getData('works', []).filter(w => w.featured).slice(0, 4);
        const techniques = this.getData('techniques', []).slice(0, 4);
        const history = this.getData('history', []);
        const innovations = this.getData('innovations', []).slice(0, 3);

        const featuredCards = featuredWorks.map(work => 
            this.createCard(work, { link: `#/works/${work.id}` })
        );

        const techniqueCards = techniques.map(tech => 
            this.createCard({
                ...tech,
                title: tech.name
            }, { 
                showImage: false,
                link: `#/techniques/${tech.id}` 
            })
        );

        const innovationCards = innovations.map(item => 
            this.createCard(item, { 
                showImage: false,
                showTag: true 
            })
        );

        return `
            <div data-page="home">
                <section class="hero-section">
                    <div class="hero-background"></div>
                    <div class="hero-pattern"></div>
                    <div class="hero-content">
                        <span class="hero-kicker scroll-animate">国家级非物质文化遗产</span>
                        <h1 class="hero-title scroll-animate" style="animation-delay: 0.1s;">
                            <span class="highlight">中国</span>广绣
                        </h1>
                        <p class="hero-subtitle scroll-animate" style="animation-delay: 0.2s;">
                            ${siteData.description}
                        </p>
                        <div class="hero-actions scroll-animate" style="animation-delay: 0.3s;">
                            ${this.createButton('了解历史', { href: '#/history', variant: 'primary', size: 'lg' })}
                            ${this.createButton('探索技艺', { href: '#/techniques', variant: 'outline-secondary', size: 'lg' })}
                        </div>
                    </div>
                    <div class="hero-scroll-indicator">
                        <span>向下滚动探索</span>
                        <div class="scroll-arrow"></div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('历史传承', '广绣有着上千年的悠久历史，是中国刺绣艺术的瑰宝')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            ${history.slice(0, 3).map((item, index) => `
                                <div class="card card-bordered scroll-animate" style="animation-delay: ${index * 0.1}s;">
                                    <div class="card-body">
                                        <div class="text-4xl font-serif font-bold text-primary mb-3">${item.year}</div>
                                        <h4 class="card-title">${item.title}</h4>
                                        <p class="card-description mt-2">${this.truncate(item.description, 80)}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="text-center mt-10">
                            ${this.createButton('查看完整历史', { href: '#/history', variant: 'outline' })}
                        </div>
                    </div>
                </section>

                <section class="section section-alt">
                    <div class="container">
                        ${this.createSectionHeader('核心技艺', '广绣拥有数十种精湛针法，每一种都有独特的表现力')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                            ${techniqueCards.join('')}
                        </div>
                        
                        <div class="mt-16">
                            <div class="bg-card rounded-xl p-8 shadow-lg">
                                <h3 class="text-xl font-serif font-semibold mb-6 text-center">针法演示</h3>
                                <div class="stitch-demo-container mx-auto" data-component="stitchDemo"></div>
                                <p class="text-center text-sm text-neutral mt-6">
                                    点击播放按钮，观看直针绣的针法演示动画
                                </p>
                            </div>
                        </div>
                        
                        <div class="text-center mt-10">
                            ${this.createButton('探索更多针法', { href: '#/techniques', variant: 'outline' })}
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('代表性作品', '欣赏广绣大师们的经典之作')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            ${featuredCards.join('')}
                        </div>
                        
                        <div class="text-center mt-10">
                            ${this.createButton('浏览全部作品', { href: '#/works', variant: 'outline' })}
                        </div>
                    </div>
                </section>

                <section class="section section-alt">
                    <div class="container">
                        ${this.createSectionHeader('创新应用', '传统技艺与现代设计的完美融合')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            ${innovationCards.join('')}
                        </div>
                        
                        <div class="text-center mt-10">
                            ${this.createButton('了解更多创新', { href: '#/innovation', variant: 'outline' })}
                        </div>
                    </div>
                </section>

                <section class="section bg-neutral-900 text-white">
                    <div class="container">
                        <div class="text-center mb-12">
                            <h2 class="text-3xl md:text-4xl font-serif font-bold mb-4">
                                <span class="text-secondary-light">传承</span>与<span class="text-secondary-light">创新</span>
                            </h2>
                            <p class="text-neutral-300 max-w-2xl mx-auto">
                                广绣作为国家级非物质文化遗产，承载着岭南千年的文化底蕴。
                                在新时代，我们既要传承传统技艺，也要探索创新之路，让古老的技艺焕发新的生命力。
                            </p>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                            <div class="text-center scroll-animate">
                                <div class="text-4xl md:text-5xl font-serif font-bold text-secondary-light mb-2">1000+</div>
                                <div class="text-neutral-400">年历史传承</div>
                            </div>
                            <div class="text-center scroll-animate" style="animation-delay: 0.1s;">
                                <div class="text-4xl md:text-5xl font-serif font-bold text-secondary-light mb-2">50+</div>
                                <div class="text-neutral-400">种精湛针法</div>
                            </div>
                            <div class="text-center scroll-animate" style="animation-delay: 0.2s;">
                                <div class="text-4xl md:text-5xl font-serif font-bold text-secondary-light mb-2">100+</div>
                                <div class="text-neutral-400">位传承大师</div>
                            </div>
                            <div class="text-center scroll-animate" style="animation-delay: 0.3s;">
                                <div class="text-4xl md:text-5xl font-serif font-bold text-secondary-light mb-2">2006</div>
                                <div class="text-neutral-400">列入非遗名录</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('技艺分析', '深入了解广绣的优势与挑战')}
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                            <div class="scroll-animate">
                                <div class="bg-card rounded-xl p-6 shadow-md">
                                    <h4 class="text-lg font-serif font-semibold mb-4 flex items-center gap-2">
                                        <span class="w-8 h-8 bg-accent-50 text-accent rounded-full flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                                <polyline points="22 4 12 14.01 9 11.01"/>
                                            </svg>
                                        </span>
                                        优势
                                    </h4>
                                    ${this.createAccordion(
                                        this.getData('analysis.strengths', []).map(s => ({
                                            title: s.title,
                                            description: s.description
                                        }))
                                    )}
                                </div>
                            </div>
                            <div class="scroll-animate" style="animation-delay: 0.1s;">
                                <div class="bg-card rounded-xl p-6 shadow-md">
                                    <h4 class="text-lg font-serif font-semibold mb-4 flex items-center gap-2">
                                        <span class="w-8 h-8 bg-primary-50 text-primary rounded-full flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"/>
                                                <line x1="12" y1="8" x2="12" y2="12"/>
                                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                                            </svg>
                                        </span>
                                        挑战
                                    </h4>
                                    ${this.createAccordion(
                                        this.getData('analysis.challenges', []).map(c => ({
                                            title: c.title,
                                            description: c.description
                                        }))
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-center mt-10">
                            ${this.createButton('查看完整分析', { href: '#/analysis', variant: 'outline' })}
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    async afterRender() {
        this.animationController.initScrollAnimations();
        this.componentManager.initAll();
    }
}

export default HomePage;