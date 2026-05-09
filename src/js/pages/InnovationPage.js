import BasePage from './BasePage.js';

class InnovationPage extends BasePage {
    constructor(options) {
        super(options);
    }

    async render() {
        const innovations = this.getData('innovations', []);

        const categories = [...new Set(innovations.map(i => i.category))];

        return `
            <div data-page="innovation">
                <div class="bg-neutral-900 text-white py-16">
                    <div class="container">
                        ${this.createBreadcrumb([
                            { label: '首页', href: '#/' },
                            { label: '创新应用' }
                        ])}
                        <h1 class="text-4xl md:text-5xl font-serif font-bold mt-8 text-center">
                            <span class="text-secondary-light">传统</span>与<span class="text-secondary-light">现代</span>的融合
                        </h1>
                        <p class="text-center text-neutral-300 mt-4 max-w-2xl mx-auto">
                            广绣不再局限于传统挂屏，而是与现代设计、时尚产业、数字艺术等领域深度融合，
                            在新时代焕发出新的生命力。
                        </p>
                    </div>
                </div>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('创新领域', '广绣在各个领域的创新应用')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                            ${innovations.map((item, index) => `
                                <div class="card card-elevated scroll-animate" style="animation-delay: ${index * 0.1}s;">
                                    <div class="card-body">
                                        <div class="w-12 h-12 bg-primary-50 text-primary rounded-lg flex items-center justify-center mb-4">
                                            ${this.getCategoryIcon(item.category)}
                                        </div>
                                        <div class="flex items-start justify-between mb-3">
                                            <h3 class="text-lg font-serif font-semibold">${item.title}</h3>
                                            <span class="text-xs bg-secondary-50 text-secondary-dark px-2 py-1 rounded-full">
                                                ${item.category}
                                            </span>
                                        </div>
                                        <p class="text-neutral text-sm mb-4">${item.description}</p>
                                        
                                        ${item.examples && item.examples.length > 0 ? `
                                            <div class="border-t border-border-light pt-4">
                                                <h4 class="text-sm font-medium mb-3">应用案例：</h4>
                                                <div class="space-y-3">
                                                    ${item.examples.map(ex => `
                                                        <div class="bg-bg-alt rounded-lg p-3">
                                                            <h5 class="text-sm font-medium mb-1">${ex.name}</h5>
                                                            <p class="text-xs text-neutral">${ex.description}</p>
                                                        </div>
                                                    `).join('')}
                                                </div>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <section class="section section-alt">
                    <div class="container">
                        ${this.createSectionHeader('时尚设计', '广绣与高级时装的完美结合')}
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-center">
                            <div class="scroll-animate">
                                <div class="bg-card rounded-xl p-8 shadow-md">
                                    <h3 class="text-xl font-serif font-semibold mb-4 text-primary">广绣元素在时尚中的运用</h3>
                                    <p class="text-neutral mb-6">
                                        广绣以其精湛的技艺和独特的艺术风格，越来越受到国际时尚界的关注。
                                        许多知名设计师将广绣元素融入高级时装设计中，在国际舞台上展现东方美学。
                                    </p>
                                    
                                    <div class="space-y-4">
                                        <div class="flex items-start gap-3">
                                            <div class="w-6 h-6 bg-primary-50 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                                            <div>
                                                <h4 class="font-medium mb-1">高级定制礼服</h4>
                                                <p class="text-sm text-neutral">在巴黎、米兰等国际时装周上，广绣装饰的高级礼服频频亮相。</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-6 h-6 bg-primary-50 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                                            <div>
                                                <h4 class="font-medium mb-1">中式婚礼服</h4>
                                                <p class="text-sm text-neutral">融合广绣技艺的现代婚纱和中式礼服，成为新人的首选。</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-3">
                                            <div class="w-6 h-6 bg-primary-50 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                                            <div>
                                                <h4 class="font-medium mb-1">高级成衣</h4>
                                                <p class="text-sm text-neutral">广绣元素也被应用于日常服饰，让传统技艺走进生活。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="scroll-animate" style="animation-delay: 0.1s;">
                                <div class="grid grid-cols-2 gap-4">
                                    ${[
                                        { title: '花卉纹样', desc: '传统花卉图案的现代演绎' },
                                        { title: '龙凤呈祥', desc: '吉祥图案的时尚表达' },
                                        { title: '山水意境', desc: '东方美学的抽象呈现' },
                                        { title: '云纹装饰', desc: '传统纹样的创新应用' }
                                    ].map((item, i) => `
                                        <div class="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 text-center h-40 flex flex-col items-center justify-center">
                                            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--color-primary)" stroke-width="0.5" class="mb-2">
                                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                                <path d="M21 15l-5-5L5 21"/>
                                            </svg>
                                            <h4 class="font-medium text-sm">${item.title}</h4>
                                            <p class="text-xs text-neutral mt-1">${item.desc}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('数字艺术融合', '广绣与数字技术的创新结合')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div class="card card-elevated scroll-animate">
                                <div class="card-body">
                                    <div class="w-12 h-12 bg-accent-50 text-accent rounded-lg flex items-center justify-center mb-4">
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M2 17l10 5 10-5"/>
                                            <path d="M2 12l10 5 10-5"/>
                                            <path d="M19 9V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v5"/>
                                            <path d="M2 7h20"/>
                                        </svg>
                                    </div>
                                    <h3 class="text-lg font-serif font-semibold mb-3">数字化设计</h3>
                                    <p class="text-neutral text-sm mb-4">
                                        使用计算机辅助设计(CAD)软件进行广绣图案设计，大大提高了设计效率和创意空间。
                                        设计师可以快速预览不同配色和针法效果。
                                    </p>
                                    <ul class="space-y-2">
                                        ${['图案数字化', '虚拟试绣', '配色方案优化', '针法模拟'].map(item => `
                                            <li class="flex items-center gap-2 text-sm text-neutral">
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-accent)" stroke-width="2">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                <span>${item}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="card card-elevated scroll-animate" style="animation-delay: 0.1s;">
                                <div class="card-body">
                                    <div class="w-12 h-12 bg-secondary-50 text-secondary-dark rounded-lg flex items-center justify-center mb-4">
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polygon points="5 3 19 12 5 21 5 3"/>
                                        </svg>
                                    </div>
                                    <h3 class="text-lg font-serif font-semibold mb-3">动画与交互</h3>
                                    <p class="text-neutral text-sm mb-4">
                                        将广绣技艺制作成动画和交互式展示，让更多人通过数字媒体了解和学习这门传统技艺。
                                        针法演示动画使学习更加直观。
                                    </p>
                                    <ul class="space-y-2">
                                        ${['针法演示动画', '交互式教程', 'AR/VR体验', '在线课程'].map(item => `
                                            <li class="flex items-center gap-2 text-sm text-neutral">
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-accent)" stroke-width="2">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                <span>${item}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="card card-elevated scroll-animate" style="animation-delay: 0.2s;">
                                <div class="card-body">
                                    <div class="w-12 h-12 bg-primary-50 text-primary rounded-lg flex items-center justify-center mb-4">
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                            <path d="M2 17l10 5 10-5"/>
                                            <path d="M2 12l10 5 10-5"/>
                                        </svg>
                                    </div>
                                    <h3 class="text-lg font-serif font-semibold mb-3">新媒体传播</h3>
                                    <p class="text-neutral text-sm mb-4">
                                        通过社交媒体、短视频平台等新媒体渠道，广绣正在被更多年轻人了解和喜爱。
                                        非遗文化在数字时代焕发新生。
                                    </p>
                                    <ul class="space-y-2">
                                        ${['短视频教学', '直播展示', '社交媒体传播', '在线展览'].map(item => `
                                            <li class="flex items-center gap-2 text-sm text-neutral">
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-accent)" stroke-width="2">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                <span>${item}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section section-alt">
                    <div class="container">
                        ${this.createSectionHeader('创新案例', '广绣创新应用的成功案例')}
                        
                        <div class="mt-12">
                            ${this.createAccordion([
                                {
                                    title: '国际时装周的广绣元素',
                                    description: `<p class="mb-3">在巴黎、米兰、纽约等国际时装周上，越来越多的设计师将广绣元素融入高级时装设计。中国设计师郭培的作品中，广绣技艺得到了淋漓尽致的展现。</p>
                                    <p class="text-neutral text-sm">这些作品不仅展示了广绣的精湛技艺，也让世界看到了中国传统工艺的现代魅力。广绣从传统挂屏走向T台，成为时尚界的新宠。</p>`
                                },
                                {
                                    title: '文创产品开发',
                                    description: `<p class="mb-3">广绣元素被广泛应用于各类文创产品开发。从文具、数码配件到首饰、家居用品，广绣纹样以新的形式走进现代生活。</p>
                                    <p class="text-neutral text-sm">广州、佛山等地的文创企业与广绣传承人合作，开发出一系列深受年轻人喜爱的文创产品，让传统技艺焕发新的生命力。</p>`
                                },
                                {
                                    title: '数字博物馆建设',
                                    description: `<p class="mb-3">广东省博物馆、广州博物馆等机构建立了广绣数字博物馆，通过3D扫描、虚拟现实等技术，将珍贵的广绣藏品数字化保存和展示。</p>
                                    <p class="text-neutral text-sm">观众可以在线欣赏广绣精品，甚至可以通过VR技术近距离观察针法细节，为广绣的传承和传播提供了新途径。</p>`
                                },
                                {
                                    title: '教育与培训创新',
                                    description: `<p class="mb-3">传统的师带徒模式正在与现代教育体系相结合。职业院校开设广绣专业，线上课程平台提供广绣教学，降低了学习门槛。</p>
                                    <p class="text-neutral text-sm">一些传承人也通过短视频平台分享广绣技艺，吸引了大量年轻粉丝。这种新的传承方式让更多人有机会接触和学习这门古老技艺。</p>`
                                }
                            ])}
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('未来展望', '广绣创新发展的无限可能')}
                        
                        <div class="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 mt-12">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 class="text-xl font-serif font-semibold mb-4">发展趋势</h3>
                                    <div class="space-y-4">
                                        ${[
                                            { title: '智能化生产', desc: '结合人工智能和机器人技术，实现广绣的半自动化生产' },
                                            { title: '个性化定制', desc: '利用数字技术，为消费者提供个性化广绣产品定制服务' },
                                            { title: '跨界合作', desc: '与更多领域开展跨界合作，拓展广绣的应用场景' }
                                        ].map(item => `
                                            <div class="flex items-start gap-3">
                                                <div class="w-6 h-6 bg-white text-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm">→</div>
                                                <div>
                                                    <h4 class="font-medium">${item.title}</h4>
                                                    <p class="text-sm text-neutral">${item.desc}</p>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                                <div>
                                    <h3 class="text-xl font-serif font-semibold mb-4">机遇与挑战</h3>
                                    ${this.createAlert('广绣的创新发展既有机遇也有挑战。如何在保持传统技艺精髓的同时，适应现代市场需求，是每个传承人都在思考的问题。', 'info')}
                                    
                                    <div class="mt-4 grid grid-cols-2 gap-4">
                                        <div class="bg-white rounded-lg p-4 shadow-sm">
                                            <div class="text-2xl font-serif font-bold text-accent mb-1">国潮</div>
                                            <p class="text-xs text-neutral">传统文化复兴</p>
                                        </div>
                                        <div class="bg-white rounded-lg p-4 shadow-sm">
                                            <div class="text-2xl font-serif font-bold text-secondary-dark mb-1">政策</div>
                                            <p class="text-xs text-neutral">非遗保护支持</p>
                                        </div>
                                        <div class="bg-white rounded-lg p-4 shadow-sm">
                                            <div class="text-2xl font-serif font-bold text-primary mb-1">文旅</div>
                                            <p class="text-xs text-neutral">文化旅游融合</p>
                                        </div>
                                        <div class="bg-white rounded-lg p-4 shadow-sm">
                                            <div class="text-2xl font-serif font-bold text-accent mb-1">数字</div>
                                            <p class="text-xs text-neutral">技术赋能创新</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    getCategoryIcon(category) {
        const icons = {
            '时尚设计': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6.5 14.5L12 3l5.5 11.5"/>
                <path d="M4 14h16"/>
                <path d="M17.5 14c-1 2-3 2-5.5 2s-4.5 0-5.5-2"/>
            </svg>`,
            '空间设计': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>`,
            '文创设计': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>`,
            '数字艺术': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
            </svg>`,
            '材料研究': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>`,
            '内容创新': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
            </svg>`
        };
        return icons[category] || icons['文创设计'];
    }

    async afterRender() {
        this.animationController.initScrollAnimations();
        this.componentManager.initAll();
    }
}

export default InnovationPage;