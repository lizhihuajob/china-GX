import BasePage from './BasePage.js';

class AnalysisPage extends BasePage {
    constructor(options) {
        super(options);
    }

    async render() {
        const analysis = this.getData('analysis', {});

        return `
            <div data-page="analysis">
                <div class="bg-neutral-900 text-white py-16">
                    <div class="container">
                        ${this.createBreadcrumb([
                            { label: '首页', href: '#/' },
                            { label: '技艺分析' }
                        ])}
                        <h1 class="text-4xl md:text-5xl font-serif font-bold mt-8 text-center">
                            <span class="text-secondary-light">广绣</span>技艺分析
                        </h1>
                        <p class="text-center text-neutral-300 mt-4 max-w-2xl mx-auto">
                            深入分析广绣技艺的优势与挑战，探索其在现代社会的发展路径。
                            客观认识技艺特点，才能更好地传承与创新。
                        </p>
                    </div>
                </div>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('SWOT分析', '全面了解广绣技艺的优势、劣势、机会和威胁')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <div class="scroll-animate">
                                <div class="bg-card rounded-xl p-6 shadow-md border-l-4 border-accent">
                                    <div class="flex items-center gap-3 mb-6">
                                        <div class="w-10 h-10 bg-accent-50 text-accent rounded-lg flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"/>
                                                <polyline points="12 6 12 12 16 14"/>
                                            </svg>
                                        </div>
                                        <h3 class="text-xl font-serif font-semibold text-accent">优势 (Strengths)</h3>
                                    </div>
                                    ${this.createAccordion(
                                        (analysis.strengths || []).map(s => ({
                                            title: s.title,
                                            description: `<p>${s.description}</p>`
                                        }))
                                    )}
                                </div>
                            </div>
                            
                            <div class="scroll-animate" style="animation-delay: 0.1s;">
                                <div class="bg-card rounded-xl p-6 shadow-md border-l-4 border-primary">
                                    <div class="flex items-center gap-3 mb-6">
                                        <div class="w-10 h-10 bg-primary-50 text-primary rounded-lg flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"/>
                                                <line x1="12" y1="8" x2="12" y2="12"/>
                                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                                            </svg>
                                        </div>
                                        <h3 class="text-xl font-serif font-semibold text-primary">挑战 (Weaknesses)</h3>
                                    </div>
                                    ${this.createAccordion(
                                        (analysis.challenges || []).map(c => ({
                                            title: c.title,
                                            description: `<p>${c.description}</p>`
                                        }))
                                    )}
                                </div>
                            </div>
                            
                            <div class="scroll-animate">
                                <div class="bg-card rounded-xl p-6 shadow-md border-l-4 border-secondary">
                                    <div class="flex items-center gap-3 mb-6">
                                        <div class="w-10 h-10 bg-secondary-50 text-secondary-dark rounded-lg flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                                <polyline points="22 4 12 14.01 9 11.01"/>
                                            </svg>
                                        </div>
                                        <h3 class="text-xl font-serif font-semibold text-secondary-dark">机会 (Opportunities)</h3>
                                    </div>
                                    ${this.createAccordion(
                                        (analysis.opportunities || []).map(o => ({
                                            title: o.title,
                                            description: `<p>${o.description}</p>`
                                        }))
                                    )}
                                </div>
                            </div>
                            
                            <div class="scroll-animate" style="animation-delay: 0.1s;">
                                <div class="bg-card rounded-xl p-6 shadow-md border-l-4 border-neutral">
                                    <div class="flex items-center gap-3 mb-6">
                                        <div class="w-10 h-10 bg-bg-alt text-neutral rounded-lg flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                                                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
                                                <line x1="15" y1="9" x2="9" y2="15"/>
                                                <line x1="9" y1="9" x2="15" y2="15"/>
                                            </svg>
                                        </div>
                                        <h3 class="text-xl font-serif font-semibold text-neutral">威胁 (Threats)</h3>
                                    </div>
                                    ${this.createAccordion(
                                        (analysis.threats || []).map(t => ({
                                            title: t.title,
                                            description: `<p>${t.description}</p>`
                                        }))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section section-alt">
                    <div class="container">
                        ${this.createSectionHeader('技术特点对比', '广绣与其他刺绣技艺的对比分析')}
                        
                        <div class="mt-12 overflow-x-auto">
                            <table class="w-full bg-card rounded-xl shadow-md overflow-hidden">
                                <thead class="bg-bg-alt">
                                    <tr>
                                        <th class="text-left p-4 font-medium">对比维度</th>
                                        <th class="text-left p-4 font-medium text-primary">广绣</th>
                                        <th class="text-left p-4 font-medium">苏绣</th>
                                        <th class="text-left p-4 font-medium">湘绣</th>
                                        <th class="text-left p-4 font-medium">蜀绣</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.createComparisonRow('艺术风格', 
                                        '构图饱满、色彩艳丽、装饰性强',
                                        '细腻雅致、清雅秀丽、写实为主',
                                        '雄浑大气、色彩鲜明、狮虎见长',
                                        '严谨细腻、色彩明快、花鸟见长'
                                    )}
                                    ${this.createComparisonRow('针法特点', 
                                        '50余种针法，施针、辅助针等特色针法',
                                        '40余种针法，平针、套针为主',
                                        '70余种针法，鬅毛针独特',
                                        '100余种针法，衣锦纹针独特'
                                    )}
                                    ${this.createComparisonRow('用色特点', 
                                        '对比强烈，大红大绿，金碧辉煌',
                                        '淡雅柔和，讲究配色和谐',
                                        '色彩鲜明，明暗对比强烈',
                                        '色彩明快，讲究虚实结合'
                                    )}
                                    ${this.createComparisonRow('题材偏好', 
                                        '花鸟、龙凤、山水、人物皆可',
                                        '花鸟、山水、人物、肖像',
                                        '狮虎、花鸟、山水',
                                        '花鸟、虫鱼、山水'
                                    )}
                                    ${this.createComparisonRow('市场定位', 
                                        '装饰性强，适合家居、礼品',
                                        '艺术性强，适合收藏、陈设',
                                        '实用性强，适合服饰、装饰',
                                        '实用性强，适合服饰、日用品'
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="mt-8">
                            ${this.createAlert('四大名绣各有特色，没有高低之分。广绣的"浓艳"与苏绣的"淡雅"都是中国刺绣艺术的瑰宝，反映了不同地域的文化审美。', 'info')}
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('发展建议', '基于SWOT分析的广绣发展策略建议')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <div class="scroll-animate">
                                <div class="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-6">
                                    <h3 class="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
                                        <span class="w-8 h-8 bg-accent text-white rounded-lg flex items-center justify-center text-sm">SO</span>
                                        优势-机会策略
                                    </h3>
                                    <p class="text-neutral text-sm mb-4">
                                        利用自身优势，抓住外部机会，实现快速发展。
                                    </p>
                                    <ul class="space-y-3">
                                        ${[
                                            '借助国潮兴起的机会，打造广绣文化IP',
                                            '利用政策支持，建设传承基地和文创产业园',
                                            '结合文旅融合，开发广绣体验旅游项目',
                                            '运用数字技术，开发在线教学和虚拟体验'
                                        ].map(item => `
                                            <li class="flex items-start gap-2">
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-accent)" stroke-width="2" class="flex-shrink-0 mt-0.5">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                <span class="text-sm text-neutral">${item}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="scroll-animate" style="animation-delay: 0.1s;">
                                <div class="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
                                    <h3 class="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
                                        <span class="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm">WO</span>
                                        劣势-机会策略
                                    </h3>
                                    <p class="text-neutral text-sm mb-4">
                                        克服自身劣势，利用外部机会，实现转型发展。
                                    </p>
                                    <ul class="space-y-3">
                                        ${[
                                            '利用数字技术降低学习门槛，吸引年轻人',
                                            '开发简化版广绣产品，降低生产成本',
                                            '建立现代学徒制，培养新一代传承人',
                                            '利用社交媒体进行品牌推广，提升知名度'
                                        ].map(item => `
                                            <li class="flex items-start gap-2">
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-primary)" stroke-width="2" class="flex-shrink-0 mt-0.5">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                <span class="text-sm text-neutral">${item}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="scroll-animate">
                                <div class="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-xl p-6">
                                    <h3 class="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
                                        <span class="w-8 h-8 bg-secondary-dark text-white rounded-lg flex items-center justify-center text-sm">ST</span>
                                        优势-威胁策略
                                    </h3>
                                    <p class="text-neutral text-sm mb-4">
                                        利用自身优势，应对外部威胁，保持竞争优势。
                                    </p>
                                    <ul class="space-y-3">
                                        ${[
                                            '强调手工技艺的独特价值，与机器刺绣差异化',
                                            '建立品牌认证体系，打击仿冒产品',
                                            '开发高端定制市场，提升产品附加值',
                                            '拓展收藏市场，强调艺术价值和投资价值'
                                        ].map(item => `
                                            <li class="flex items-start gap-2">
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-secondary-dark)" stroke-width="2" class="flex-shrink-0 mt-0.5">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                <span class="text-sm text-neutral">${item}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="scroll-animate" style="animation-delay: 0.1s;">
                                <div class="bg-gradient-to-br from-neutral-100 to-bg-alt rounded-xl p-6">
                                    <h3 class="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
                                        <span class="w-8 h-8 bg-neutral text-white rounded-lg flex items-center justify-center text-sm">WT</span>
                                        劣势-威胁策略
                                    </h3>
                                    <p class="text-neutral text-sm mb-4">
                                        减少自身劣势，规避外部威胁，实现稳健发展。
                                    </p>
                                    <ul class="space-y-3">
                                        ${[
                                            '探索机械化辅助生产，降低成本',
                                            '开发适合快消市场的简化产品',
                                            '加强知识产权保护，建立品牌信任',
                                            '开发替代材料，降低原材料依赖'
                                        ].map(item => `
                                            <li class="flex items-start gap-2">
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-neutral-600)" stroke-width="2" class="flex-shrink-0 mt-0.5">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                <span class="text-sm text-neutral">${item}</span>
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
                        ${this.createSectionHeader('关键成功因素', '广绣传承与发展的关键要素')}
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            ${[
                                {
                                    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                        <circle cx="9" cy="7" r="4"/>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                    </svg>`,
                                    title: '人才培养',
                                    description: '建立完善的传承体系，培养新一代广绣传承人。既要保留传统师带徒模式，也要结合现代职业教育。',
                                    color: 'accent'
                                },
                                {
                                    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                        <path d="M2 17l10 5 10-5"/>
                                        <path d="M2 12l10 5 10-5"/>
                                    </svg>`,
                                    title: '品牌建设',
                                    description: '打造广绣区域公共品牌，提升行业整体竞争力。建立质量标准和认证体系，保护消费者权益。',
                                    color: 'primary'
                                },
                                {
                                    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                        <line x1="8" y1="21" x2="16" y2="21"/>
                                        <line x1="12" y1="17" x2="12" y2="21"/>
                                    </svg>`,
                                    title: '市场拓展',
                                    description: '拓展新的应用场景和市场渠道。从传统礼品市场向时尚、家居、文旅等多元市场延伸。',
                                    color: 'secondary'
                                },
                                {
                                    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="12" y1="8" x2="12" y2="12"/>
                                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                                    </svg>`,
                                    title: '创新设计',
                                    description: '在保留传统技艺精髓的基础上，进行设计创新。结合现代审美，开发符合当代生活方式的产品。',
                                    color: 'accent'
                                },
                                {
                                    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14 2 14 8 20 8"/>
                                        <line x1="16" y1="13" x2="8" y2="13"/>
                                        <line x1="16" y1="17" x2="8" y2="17"/>
                                        <polyline points="10 9 9 9 8 9"/>
                                    </svg>`,
                                    title: '文化传播',
                                    description: '加强广绣文化的宣传推广，提升社会认知度。利用新媒体、展览、教育等多种渠道进行文化传播。',
                                    color: 'primary'
                                },
                                {
                                    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>`,
                                    title: '保护传承',
                                    description: '加强对传统技艺的记录和保护。建立广绣技艺档案，抢救性记录老艺人的技艺经验。',
                                    color: 'secondary'
                                }
                            ].map((item, index) => `
                                <div class="bg-card rounded-xl p-6 shadow-md scroll-animate" style="animation-delay: ${index * 0.05}s;">
                                    <div class="w-12 h-12 bg-${item.color}-50 text-${item.color === 'secondary' ? 'secondary-dark' : item.color} rounded-lg flex items-center justify-center mb-4">
                                        ${item.icon}
                                    </div>
                                    <h3 class="font-serif font-semibold mb-2">${item.title}</h3>
                                    <p class="text-sm text-neutral">${item.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('总结', '广绣的未来之路')}
                        
                        <div class="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-xl p-8 mt-12">
                            <div class="max-w-3xl mx-auto">
                                <p class="text-lg text-neutral leading-relaxed mb-6">
                                    广绣作为中国四大名绣之一，承载着千年的文化底蕴。在新时代，它既面临着挑战，也充满了机遇。
                                </p>
                                <p class="text-lg text-neutral leading-relaxed mb-6">
                                    传承不是简单的复制，而是在理解传统精髓的基础上进行创新。广绣的未来需要：
                                </p>
                                <ul class="space-y-4 mb-6">
                                    ${[
                                        '坚守技艺本质，保持手工刺绣的独特价值',
                                        '拥抱现代设计，让传统技艺融入当代生活',
                                        '培养多元人才，建立可持续的传承体系',
                                        '拓展市场边界，开发新的应用场景'
                                    ].map(item => `
                                        <li class="flex items-start gap-3">
                                            <span class="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">✓</span>
                                            <span class="text-neutral">${item}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                                <p class="text-lg text-neutral leading-relaxed">
                                    广绣不仅是一门技艺，更是一种文化的传承。让古老的技艺在新时代焕发生机，
                                    需要每一个热爱它的人的共同努力。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    createComparisonRow(dimension, guangxiu, suxiu, xiangxiu, shuxiu) {
        return `
            <tr class="border-t border-border-light">
                <td class="p-4 font-medium">${dimension}</td>
                <td class="p-4 text-sm text-neutral">${guangxiu}</td>
                <td class="p-4 text-sm text-neutral">${suxiu}</td>
                <td class="p-4 text-sm text-neutral">${xiangxiu}</td>
                <td class="p-4 text-sm text-neutral">${shuxiu}</td>
            </tr>
        `;
    }

    async afterRender() {
        this.animationController.initScrollAnimations();
        this.componentManager.initAll();
    }
}

export default AnalysisPage;