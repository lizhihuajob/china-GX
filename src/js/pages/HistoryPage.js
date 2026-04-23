import BasePage from './BasePage.js';

class HistoryPage extends BasePage {
    constructor(options) {
        super(options);
    }

    async render() {
        const history = this.getData('history', []);
        const culturalSignificance = this.getData('culturalSignificance', {});

        return `
            <div data-page="history">
                <div class="bg-neutral-900 text-white py-16">
                    <div class="container">
                        ${this.createBreadcrumb([
                            { label: '首页', href: '#/' },
                            { label: '历史传承' }
                        ])}
                        <h1 class="text-4xl md:text-5xl font-serif font-bold mt-8 text-center">
                            <span class="text-secondary-light">广绣</span>历史传承
                        </h1>
                        <p class="text-center text-neutral-300 mt-4 max-w-2xl mx-auto">
                            广绣有着上千年的悠久历史，是中国刺绣艺术的重要组成部分，
                            见证了岭南地区的文化发展与中外文化交流。
                        </p>
                    </div>
                </div>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('历史发展脉络', '从唐代到现代，广绣经历了漫长的发展历程')}
                        
                        <div class="mt-12">
                            ${this.createTimeline(history)}
                        </div>
                    </div>
                </section>

                <section class="section section-alt">
                    <div class="container">
                        ${this.createSectionHeader('文化传承意义', culturalSignificance.overview || '')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            ${(culturalSignificance.values || []).map((value, index) => `
                                <div class="bg-card rounded-xl p-8 shadow-md scroll-animate" style="animation-delay: ${index * 0.1}s;">
                                    <div class="w-12 h-12 bg-primary-50 text-primary rounded-lg flex items-center justify-center mb-4">
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                                            ${this.getIconForValue(value.title)}
                                        </svg>
                                    </div>
                                    <h3 class="text-xl font-serif font-semibold mb-3">${value.title}</h3>
                                    <p class="text-neutral mb-4">${value.description}</p>
                                    <ul class="space-y-2">
                                        ${(value.details || []).map(detail => `
                                            <li class="flex items-start gap-2 text-sm text-neutral">
                                                <span class="text-primary mt-1">•</span>
                                                <span>${detail}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('传承大师', '广绣技艺的守护者与传承人')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            ${this.getData('artists', []).map((artist, index) => `
                                <div class="card card-elevated scroll-animate" style="animation-delay: ${index * 0.1}s;">
                                    <div class="card-image bg-bg-alt flex items-center justify-center">
                                        <div class="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--color-primary)" stroke-width="1">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                                <circle cx="12" cy="7" r="4"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <h3 class="card-title flex items-center gap-2">
                                            ${artist.name}
                                            ${artist.birthYear ? `<span class="text-sm font-normal text-neutral">(${artist.birthYear}-)</span>` : ''}
                                        </h3>
                                        <p class="card-description mt-2">${this.truncate(artist.description, 60)}</p>
                                    </div>
                                    <div class="card-footer">
                                        <div class="flex flex-wrap gap-2">
                                            ${(artist.achievements || []).slice(0, 2).map(a => `
                                                <span class="text-xs bg-secondary-50 text-secondary-dark px-2 py-1 rounded-full">${a}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <section class="section section-alt">
                    <div class="container">
                        ${this.createSectionHeader('非遗保护', '广绣于2006年列入第一批国家级非物质文化遗产名录')}
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-center">
                            <div class="scroll-animate">
                                <div class="bg-card rounded-xl p-8 shadow-md">
                                    <h3 class="text-xl font-serif font-semibold mb-4 text-primary">保护历程</h3>
                                    <ul class="space-y-4">
                                        <li class="flex items-start gap-3">
                                            <span class="w-8 h-8 bg-primary-50 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">1</span>
                                            <div>
                                                <h4 class="font-medium mb-1">2006年</h4>
                                                <p class="text-sm text-neutral">广绣列入第一批国家级非物质文化遗产名录</p>
                                            </div>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <span class="w-8 h-8 bg-primary-50 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">2</span>
                                            <div>
                                                <h4 class="font-medium mb-1">2008年</h4>
                                                <p class="text-sm text-neutral">广东省建立广绣传承基地，培养新一代传承人</p>
                                            </div>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <span class="w-8 h-8 bg-primary-50 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">3</span>
                                            <div>
                                                <h4 class="font-medium mb-1">2012年</h4>
                                                <p class="text-sm text-neutral">广绣大师工作室成立，推动技艺传承与创新</p>
                                            </div>
                                        </li>
                                        <li class="flex items-start gap-3">
                                            <span class="w-8 h-8 bg-primary-50 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">4</span>
                                            <div>
                                                <h4 class="font-medium mb-1">近年</h4>
                                                <p class="text-sm text-neutral">广绣与时尚、文创产业结合，探索新的发展路径</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="scroll-animate" style="animation-delay: 0.1s;">
                                ${this.createAlert('广绣作为中国四大名绣之一，是岭南文化的重要代表。保护和传承广绣技艺，对于弘扬中华传统文化、促进中外文化交流具有重要意义。', 'info')}
                                
                                <div class="mt-6 grid grid-cols-2 gap-4">
                                    <div class="bg-card rounded-lg p-4 text-center shadow-sm">
                                        <div class="text-2xl font-serif font-bold text-primary">60+</div>
                                        <div class="text-sm text-neutral">国家级传承人</div>
                                    </div>
                                    <div class="bg-card rounded-lg p-4 text-center shadow-sm">
                                        <div class="text-2xl font-serif font-bold text-primary">10+</div>
                                        <div class="text-sm text-neutral">传承基地</div>
                                    </div>
                                    <div class="bg-card rounded-lg p-4 text-center shadow-sm">
                                        <div class="text-2xl font-serif font-bold text-primary">500+</div>
                                        <div class="text-sm text-neutral">从业人员</div>
                                    </div>
                                    <div class="bg-card rounded-lg p-4 text-center shadow-sm">
                                        <div class="text-2xl font-serif font-bold text-primary">1000+</div>
                                        <div class="text-sm text-neutral">年历史</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    getIconForValue(title) {
        const icons = {
            '艺术价值': '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
            '历史价值': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
            '经济价值': '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
            '社会价值': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
        };
        return icons[title] || '<path d="M12 2L2 7l10 5 10-5-10-5z"/>';
    }

    async afterRender() {
        this.animationController.initScrollAnimations();
        this.componentManager.initAll();
    }
}

export default HistoryPage;