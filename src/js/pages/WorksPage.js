import BasePage from './BasePage.js';

class WorksPage extends BasePage {
    constructor(options) {
        super(options);
    }

    async render() {
        const works = this.getData('works', []);
        const categories = this.getData('workCategories', []);
        
        const featuredWorks = works.filter(w => w.featured);
        const otherWorks = works.filter(w => !w.featured);

        return `
            <div data-page="works">
                <div class="bg-neutral-900 text-white py-16">
                    <div class="container">
                        ${this.createBreadcrumb([
                            { label: '首页', href: '#/' },
                            { label: '代表性作品' }
                        ])}
                        <h1 class="text-4xl md:text-5xl font-serif font-bold mt-8 text-center">
                            <span class="text-secondary-light">广绣</span>代表性作品
                        </h1>
                        <p class="text-center text-neutral-300 mt-4 max-w-2xl mx-auto">
                            欣赏广绣大师们的经典之作，感受一针一线间的艺术魅力。
                            从传统题材到现代创新，每一件作品都凝聚着匠人的心血。
                        </p>
                    </div>
                </div>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('精选作品', '广绣艺术的巅峰之作')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            ${featuredWorks.map((work, index) => `
                                <div class="card card-elevated overflow-hidden scroll-animate" style="animation-delay: ${index * 0.1}s;">
                                    <div class="grid grid-cols-1 lg:grid-cols-2">
                                        <div class="card-image h-full min-h-64">
                                            <div class="bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center h-full">
                                                <div class="text-center">
                                                    <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="var(--color-primary)" stroke-width="0.5" class="mx-auto mb-3">
                                                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                                                        <circle cx="8.5" cy="8.5" r="1.5"/>
                                                        <path d="M21 15l-5-5L5 21"/>
                                                    </svg>
                                                    <p class="text-sm text-neutral">作品图片</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="flex items-start justify-between mb-3">
                                                <span class="card-tag">${work.category}</span>
                                                ${work.featured ? `
                                                    <span class="text-xs bg-secondary-50 text-secondary-dark px-2 py-1 rounded-full flex items-center gap-1">
                                                        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                                        </svg>
                                                        精选
                                                    </span>
                                                ` : ''}
                                            </div>
                                            <h3 class="text-xl font-serif font-semibold mb-2">${work.title}</h3>
                                            <div class="flex items-center gap-4 text-sm text-neutral mb-3">
                                                <span>作者：${work.artist}</span>
                                                <span>年份：${work.year}</span>
                                            </div>
                                            <p class="text-neutral text-sm mb-4">${work.description}</p>
                                            
                                            ${work.techniques && work.techniques.length > 0 ? `
                                                <div class="mb-4">
                                                    <h4 class="text-sm font-medium mb-2">使用针法：</h4>
                                                    <div class="flex flex-wrap gap-2">
                                                        ${work.techniques.map(t => `
                                                            <span class="text-xs bg-bg-alt text-neutral px-2 py-1 rounded">${t}</span>
                                                        `).join('')}
                                                    </div>
                                                </div>
                                            ` : ''}
                                            
                                            ${work.dimensions ? `
                                                <div class="text-sm text-neutral">
                                                    <span class="font-medium">尺寸：</span>${work.dimensions}
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <section class="section section-alt">
                    <div class="container">
                        ${this.createSectionHeader('作品分类', '按类别浏览广绣作品')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                            ${categories.map((cat, index) => {
                                const count = works.filter(w => w.category === cat.name).length;
                                return `
                                    <a href="#/works?category=${encodeURIComponent(cat.id)}" 
                                       class="card card-elevated scroll-animate" style="animation-delay: ${index * 0.1}s;">
                                        <div class="card-body text-center">
                                            <div class="w-16 h-16 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5">
                                                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                                                    <path d="M9 9h6M9 12h6M9 15h4"/>
                                                </svg>
                                            </div>
                                            <h3 class="font-serif font-semibold mb-2">${cat.name}</h3>
                                            <p class="text-sm text-neutral mb-3">${this.truncate(cat.description, 50)}</p>
                                            <span class="text-sm text-primary">${count} 件作品</span>
                                        </div>
                                    </a>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('全部作品', '浏览所有广绣作品')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            ${works.map((work, index) => `
                                <div class="card card-elevated scroll-animate" style="animation-delay: ${index * 0.05}s;">
                                    <div class="card-image">
                                        <div class="bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center h-full">
                                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--color-neutral-400)" stroke-width="0.5">
                                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                                <path d="M21 15l-5-5L5 21"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="flex items-start justify-between mb-2">
                                            <span class="card-tag">${work.category}</span>
                                            ${work.featured ? `
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--color-secondary)" class="flex-shrink-0">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                                </svg>
                                            ` : ''}
                                        </div>
                                        <h3 class="card-title">${work.title}</h3>
                                        <p class="text-sm text-neutral mb-2">${work.artist} · ${work.year}</p>
                                        <p class="card-description">${this.truncate(work.description, 60)}</p>
                                    </div>
                                    <div class="card-footer">
                                        <div class="flex flex-wrap gap-2">
                                            ${(work.techniques || []).slice(0, 2).map(t => `
                                                <span class="text-xs bg-bg-alt text-neutral px-2 py-1 rounded">${t}</span>
                                            `).join('')}
                                            ${(work.techniques || []).length > 2 ? `
                                                <span class="text-xs text-neutral">+${work.techniques.length - 2}</span>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <section class="section section-alt">
                    <div class="container">
                        ${this.createSectionHeader('作品赏析', '从多个角度欣赏广绣之美')}
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-center">
                            <div class="scroll-animate">
                                <div class="bg-card rounded-xl p-8 shadow-md">
                                    <h3 class="text-xl font-serif font-semibold mb-4">广绣的艺术特点</h3>
                                    <div class="space-y-4">
                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 bg-primary-50 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                                    <path d="M2 17l10 5 10-5"/>
                                                    <path d="M2 12l10 5 10-5"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 class="font-medium mb-1">构图饱满</h4>
                                                <p class="text-sm text-neutral">广绣构图讲究饱满，图案繁复，装饰性强，善于运用留白与对比。</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 bg-secondary-50 text-secondary-dark rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 class="font-medium mb-1">色彩艳丽</h4>
                                                <p class="text-sm text-neutral">广绣配色讲究对比鲜明，常用大红、金黄等鲜艳色彩，视觉效果强烈。</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-8 h-8 bg-accent-50 text-accent rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                                    <polyline points="14 2 14 8 20 8"/>
                                                    <line x1="16" y1="13" x2="8" y2="13"/>
                                                    <line x1="16" y1="17" x2="8" y2="17"/>
                                                    <polyline points="10 9 9 9 8 9"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 class="font-medium mb-1">针法多样</h4>
                                                <p class="text-sm text-neutral">广绣拥有数十种针法，每种针法都有独特的表现力，可表现各种质感。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="scroll-animate" style="animation-delay: 0.1s;">
                                ${this.createGallery(works.slice(0, 4).map(w => ({
                                    title: w.title,
                                    image: w.image,
                                    artist: w.artist,
                                    category: w.category
                                })))}
                            </div>
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

export default WorksPage;