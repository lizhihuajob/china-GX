import BasePage from './BasePage.js';

class TechniquesPage extends BasePage {
    constructor(options) {
        super(options);
    }

    async render() {
        const techniques = this.getData('techniques', []);
        const categories = this.getData('techniqueCategories', []);
        
        const techniquesByCategory = {};
        categories.forEach(cat => {
            techniquesByCategory[cat.id] = techniques.filter(t => {
                if (cat.id === 'basic') return t.category === '基础针法';
                if (cat.id === 'feature') return t.category === '特色针法';
                if (cat.id === 'advanced') return t.category === '高级针法';
                return false;
            });
        });

        const tabs = categories.map(cat => ({
            label: cat.name,
            content: `
                <div class="mb-4">
                    <p class="text-neutral">${cat.description}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${(techniquesByCategory[cat.id] || []).map((tech, index) => `
                        <div class="card card-elevated scroll-animate" style="animation-delay: ${index * 0.05}s;">
                            <div class="card-body">
                                <div class="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 class="text-lg font-serif font-semibold">${tech.name}</h3>
                                        <div class="flex items-center gap-2 mt-2">
                                            <span class="text-xs bg-primary-50 text-primary px-2 py-1 rounded-full">${tech.category}</span>
                                            <span class="text-xs ${this.getDifficultyClass(tech.difficulty)} px-2 py-1 rounded-full">
                                                ${tech.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                    ${tech.demo ? `
                                        <span class="flex items-center gap-1 text-xs text-accent bg-accent-50 px-2 py-1 rounded-full">
                                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                                <polygon points="5 3 19 12 5 21 5 3"/>
                                            </svg>
                                            可演示
                                        </span>
                                    ` : ''}
                                </div>
                                <p class="text-neutral text-sm mb-4">${tech.description}</p>
                                ${tech.steps && tech.steps.length > 0 ? `
                                    <div class="border-t border-border-light pt-4">
                                        <h4 class="text-sm font-medium mb-2">刺绣步骤：</h4>
                                        <ol class="space-y-2">
                                            ${tech.steps.map((step, i) => `
                                                <li class="flex items-start gap-2 text-sm text-neutral">
                                                    <span class="w-5 h-5 bg-primary-50 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs">${i + 1}</span>
                                                    <span>${step}</span>
                                                </li>
                                            `).join('')}
                                        </ol>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `
        }));

        return `
            <div data-page="techniques">
                <div class="bg-neutral-900 text-white py-16">
                    <div class="container">
                        ${this.createBreadcrumb([
                            { label: '首页', href: '#/' },
                            { label: '核心技艺' }
                        ])}
                        <h1 class="text-4xl md:text-5xl font-serif font-bold mt-8 text-center">
                            <span class="text-secondary-light">广绣</span>核心技艺
                        </h1>
                        <p class="text-center text-neutral-300 mt-4 max-w-2xl mx-auto">
                            广绣拥有数十种精湛针法，每一种都有独特的表现力。
                            从基础的直针绣到复杂的织锦绣，构成了完整的技艺体系。
                        </p>
                    </div>
                </div>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('针法演示', '观看直针绣的动态演示，了解刺绣的基本过程')}
                        
                        <div class="mt-12">
                            <div class="bg-card rounded-xl p-8 shadow-lg">
                                <div class="flex flex-col lg:flex-row gap-8">
                                    <div class="flex-1">
                                        <h3 class="text-xl font-serif font-semibold mb-4">直针绣演示</h3>
                                        <p class="text-neutral mb-6">
                                            直针绣是广绣最基本的针法，线条排列整齐，适用于表现大面积的色块和平滑的过渡。
                                            点击控制面板可以播放、暂停或分步查看刺绣过程。
                                        </p>
                                        <div class="stitch-demo-container" data-component="stitchDemo"></div>
                                    </div>
                                    <div class="lg:w-80">
                                        <h4 class="font-medium mb-3">针法信息</h4>
                                        <div class="space-y-3">
                                            <div class="flex justify-between items-center p-3 bg-bg-alt rounded-lg">
                                                <span class="text-sm text-neutral">难度</span>
                                                <span class="text-sm font-medium text-accent">初级</span>
                                            </div>
                                            <div class="flex justify-between items-center p-3 bg-bg-alt rounded-lg">
                                                <span class="text-sm text-neutral">类别</span>
                                                <span class="text-sm font-medium">基础针法</span>
                                            </div>
                                            <div class="flex justify-between items-center p-3 bg-bg-alt rounded-lg">
                                                <span class="text-sm text-neutral">步骤数</span>
                                                <span class="text-sm font-medium">5步</span>
                                            </div>
                                        </div>
                                        
                                        <h4 class="font-medium mb-3 mt-6">其他针法</h4>
                                        <div class="space-y-2">
                                            ${techniques.slice(1, 5).map(tech => `
                                                <button class="w-full text-left p-3 bg-bg-alt rounded-lg hover:bg-bg transition-colors text-sm"
                                                        onclick="window.location.hash='#/techniques/${tech.id}'">
                                                    <span class="font-medium">${tech.name}</span>
                                                    <span class="text-neutral ml-2">(${tech.difficulty})</span>
                                                </button>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section section-alt">
                    <div class="container">
                        ${this.createSectionHeader('针法分类', '广绣针法按难度和特点分为多个类别')}
                        
                        <div class="mt-12">
                            ${this.createTabs(tabs)}
                        </div>
                    </div>
                </section>

                <section class="section">
                    <div class="container">
                        ${this.createSectionHeader('针法特点对比', '不同针法各有特点，适用于不同的表现需求')}
                        
                        <div class="mt-12 overflow-x-auto">
                            <table class="w-full bg-card rounded-xl shadow-md overflow-hidden">
                                <thead class="bg-bg-alt">
                                    <tr>
                                        <th class="text-left p-4 font-medium">针法名称</th>
                                        <th class="text-left p-4 font-medium">类别</th>
                                        <th class="text-left p-4 font-medium">难度</th>
                                        <th class="text-left p-4 font-medium">适用场景</th>
                                        <th class="text-left p-4 font-medium">特点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${techniques.map((tech, index) => `
                                        <tr class="${index % 2 === 0 ? 'bg-white' : 'bg-bg-alt'} border-t border-border-light">
                                            <td class="p-4 font-medium">${tech.name}</td>
                                            <td class="p-4">
                                                <span class="text-xs bg-primary-50 text-primary px-2 py-1 rounded-full">
                                                    ${tech.category}
                                                </span>
                                            </td>
                                            <td class="p-4">
                                                <span class="text-xs ${this.getDifficultyClass(tech.difficulty)} px-2 py-1 rounded-full">
                                                    ${tech.difficulty}
                                                </span>
                                            </td>
                                            <td class="p-4 text-sm text-neutral">
                                                ${this.getUseCase(tech.name)}
                                            </td>
                                            <td class="p-4 text-sm text-neutral max-w-xs">
                                                ${this.truncate(tech.description, 50)}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section class="section section-alt">
                    <div class="container">
                        ${this.createSectionHeader('学习路径', '从基础到高级，循序渐进学习广绣技艺')}
                        
                        <div class="mt-12">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="bg-card rounded-xl p-6 shadow-md scroll-animate">
                                    <div class="w-12 h-12 bg-accent-50 text-accent rounded-lg flex items-center justify-center mb-4">
                                        <span class="text-lg font-bold">1</span>
                                    </div>
                                    <h3 class="text-lg font-serif font-semibold mb-3">入门阶段</h3>
                                    <p class="text-neutral text-sm mb-4">
                                        学习基础针法，掌握刺绣的基本姿势和工具使用。
                                    </p>
                                    <ul class="space-y-2">
                                        ${['直针绣', '续针绣', '捆针绣'].map(name => `
                                            <li class="flex items-center gap-2 text-sm text-neutral">
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-accent)" stroke-width="2">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                <span>${name}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                    <p class="text-xs text-neutral mt-4">预计学习时间：1-2个月</p>
                                </div>
                                
                                <div class="bg-card rounded-xl p-6 shadow-md scroll-animate" style="animation-delay: 0.1s;">
                                    <div class="w-12 h-12 bg-secondary-50 text-secondary-dark rounded-lg flex items-center justify-center mb-4">
                                        <span class="text-lg font-bold">2</span>
                                    </div>
                                    <h3 class="text-lg font-serif font-semibold mb-3">进阶阶段</h3>
                                    <p class="text-neutral text-sm mb-4">
                                        学习特色针法，掌握明暗表现和色彩过渡技巧。
                                    </p>
                                    <ul class="space-y-2">
                                        ${['施针', '辅助针', '编绣'].map(name => `
                                            <li class="flex items-center gap-2 text-sm text-neutral">
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-accent)" stroke-width="2">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                <span>${name}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                    <p class="text-xs text-neutral mt-4">预计学习时间：3-6个月</p>
                                </div>
                                
                                <div class="bg-card rounded-xl p-6 shadow-md scroll-animate" style="animation-delay: 0.2s;">
                                    <div class="w-12 h-12 bg-primary-50 text-primary rounded-lg flex items-center justify-center mb-4">
                                        <span class="text-lg font-bold">3</span>
                                    </div>
                                    <h3 class="text-lg font-serif font-semibold mb-3">精通阶段</h3>
                                    <p class="text-neutral text-sm mb-4">
                                        学习高级针法，能够独立创作复杂作品。
                                    </p>
                                    <ul class="space-y-2">
                                        ${['绕绣', '织锦绣', '创意设计'].map(name => `
                                            <li class="flex items-center gap-2 text-sm text-neutral">
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-accent)" stroke-width="2">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                <span>${name}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                    <p class="text-xs text-neutral mt-4">预计学习时间：1-2年</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    getDifficultyClass(difficulty) {
        if (difficulty === '初级') return 'bg-accent-50 text-accent';
        if (difficulty === '中级') return 'bg-secondary-50 text-secondary-dark';
        if (difficulty === '高级') return 'bg-primary-50 text-primary';
        return 'bg-neutral-100 text-neutral';
    }

    getUseCase(name) {
        const useCases = {
            '直针绣': '大面积色块、平滑过渡',
            '续针绣': '长线条、轮廓勾勒',
            '捆针绣': '粗壮线条、纹理表现',
            '施针': '明暗层次、立体感',
            '辅助针': '色彩过渡、衔接',
            '编绣': '编织纹理、席纹效果',
            '绕绣': '蓬松质感、立体效果',
            '织锦绣': '华丽锦缎、复杂图案'
        };
        return useCases[name] || '综合应用';
    }

    async afterRender() {
        this.animationController.initScrollAnimations();
        this.componentManager.initAll();
    }
}

export default TechniquesPage;