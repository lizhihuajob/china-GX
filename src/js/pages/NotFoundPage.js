import BasePage from './BasePage.js';

class NotFoundPage extends BasePage {
    constructor(options) {
        super(options);
    }

    async render() {
        return `
            <div data-page="404" class="min-h-[70vh] flex items-center justify-center">
                <div class="text-center px-4">
                    <div class="text-8xl md:text-9xl font-serif font-bold text-primary opacity-20 mb-4">404</div>
                    <h1 class="text-3xl md:text-4xl font-serif font-bold mb-4">页面未找到</h1>
                    <p class="text-neutral mb-8 max-w-md mx-auto">
                        抱歉，您访问的页面不存在或已被移除。
                        请检查URL是否正确，或返回首页继续浏览。
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        ${this.createButton('返回首页', { href: '#/', variant: 'primary', size: 'lg' })}
                        ${this.createButton('浏览历史', { href: '#/history', variant: 'outline', size: 'lg' })}
                    </div>
                    
                    <div class="mt-16 pt-8 border-t border-border-light">
                        <p class="text-sm text-neutral mb-4">您可能想访问：</p>
                        <div class="flex flex-wrap justify-center gap-4">
                            <a href="#/" class="text-primary hover:underline">首页</a>
                            <a href="#/history" class="text-primary hover:underline">历史传承</a>
                            <a href="#/techniques" class="text-primary hover:underline">核心技艺</a>
                            <a href="#/works" class="text-primary hover:underline">代表性作品</a>
                            <a href="#/innovation" class="text-primary hover:underline">创新应用</a>
                            <a href="#/analysis" class="text-primary hover:underline">技艺分析</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async afterRender() {
    }
}

export default NotFoundPage;