class BasePage {
    constructor(options = {}) {
        this.dataManager = options.dataManager;
        this.animationController = options.animationController;
        this.componentManager = options.componentManager;
        this.modal = options.modal;
        this.params = options.params || {};
        this.route = options.route || {};
    }

    async render() {
        return '<div data-page="base"><p>基础页面</p></div>';
    }

    async afterRender() {
    }

    getSiteData() {
        return this.dataManager.get('site', {});
    }

    getData(key, defaultValue = null) {
        return this.dataManager.get(key, defaultValue);
    }

    findById(collection, id) {
        return this.dataManager.findById(collection, id);
    }

    findByCategory(collection, category) {
        return this.dataManager.findByCategory(collection, category);
    }

    createCard(item, options = {}) {
        const {
            showImage = true,
            showDescription = true,
            showTag = true,
            link = null
        } = options;

        const title = item.title || item.name || '';
        const description = item.description || '';
        const category = item.category || '';
        const image = item.image || '';

        let cardHtml = `<div class="card card-elevated scroll-animate">`;

        if (showImage && image) {
            cardHtml += `
                <div class="card-image">
                    <img src="${image}" alt="${title}" class="lazy-image" data-src="${image}">
                    <div class="card-image-overlay"></div>
                </div>
            `;
        } else if (showImage) {
            cardHtml += `
                <div class="card-image bg-bg-alt flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--color-neutral-400)" stroke-width="1">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                    </svg>
                </div>
            `;
        }

        cardHtml += `<div class="card-body">`;

        if (showTag && category) {
            cardHtml += `<span class="card-tag mb-3 inline-block">${category}</span>`;
        }

        cardHtml += `<h3 class="card-title">${title}</h3>`;

        if (showDescription && description) {
            cardHtml += `<p class="card-description mt-2">${this.truncate(description, 100)}</p>`;
        }

        cardHtml += `</div></div>`;

        if (link) {
            cardHtml = `<a href="${link}" class="block">${cardHtml}</a>`;
        }

        return cardHtml;
    }

    truncate(text, length = 100) {
        if (text.length <= length) return text;
        return text.slice(0, length) + '...';
    }

    createSectionHeader(title, subtitle = '') {
        let html = `
            <div class="section-header">
                <h2 class="section-title">${title}</h2>
        `;

        if (subtitle) {
            html += `<p class="section-subtitle">${subtitle}</p>`;
        }

        html += `</div>`;
        return html;
    }

    createBreadcrumb(items) {
        let html = `<nav class="breadcrumb" aria-label="面包屑导航">`;

        items.forEach((item, index) => {
            const isLast = index === items.length - 1;
            
            html += `<span class="breadcrumb-item">`;
            
            if (isLast) {
                html += `<span class="breadcrumb-current">${item.label}</span>`;
            } else if (item.href) {
                html += `<a href="${item.href}" class="breadcrumb-link">${item.label}</a>`;
            } else {
                html += `<span>${item.label}</span>`;
            }
            
            html += `</span>`;
        });

        html += `</nav>`;
        return html;
    }

    createTimeline(items) {
        let html = `<div class="timeline">`;

        items.forEach((item, index) => {
            html += `
                <div class="timeline-item scroll-animate">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-year">${item.year || ''}</div>
                        <h4 class="timeline-title">${item.title || ''}</h4>
                        <p class="timeline-description">${item.description || ''}</p>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        return html;
    }

    createGallery(items) {
        let html = `<div class="gallery-grid" data-component="gallery">`;

        items.forEach((item) => {
            const title = item.title || '';
            const image = item.image || '';
            const meta = item.artist || item.category || '';

            html += `
                <div class="gallery-item" data-full="${image}">
                    <img src="${image}" alt="${title}" class="lazy-image" data-src="${image}">
                    <div class="gallery-overlay">
                        <h4 class="gallery-title">${title}</h4>
                        ${meta ? `<p class="gallery-meta">${meta}</p>` : ''}
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        return html;
    }

    createAccordion(items) {
        let html = `<div class="accordion" data-component="accordion">`;

        items.forEach((item, index) => {
            const isOpen = index === 0;

            html += `
                <div class="accordion-item ${isOpen ? 'open' : ''}">
                    <button class="accordion-header" aria-expanded="${isOpen}">
                        <span>${item.title}</span>
                        <span class="accordion-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 9l6 6 6-6"/>
                            </svg>
                        </span>
                    </button>
                    <div class="accordion-content">
                        <div class="accordion-body">
                            ${item.content || item.description || ''}
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        return html;
    }

    createTabs(tabs) {
        let html = `<div data-component="tab">`;

        html += `<div class="tab-list" role="tablist">`;
        tabs.forEach((tab, index) => {
            const isActive = index === 0;
            html += `
                <button class="tab-btn ${isActive ? 'active' : ''}" 
                        role="tab" 
                        aria-selected="${isActive}"
                        ${!isActive ? 'tabindex="-1"' : ''}>
                    ${tab.label}
                </button>
            `;
        });
        html += `</div>`;

        tabs.forEach((tab, index) => {
            const isActive = index === 0;
            html += `
                <div class="tab-panel ${isActive ? 'active' : ''}" 
                     role="tabpanel"
                     ${!isActive ? 'hidden' : ''}>
                    ${tab.content}
                </div>
            `;
        });

        html += `</div>`;
        return html;
    }

    createGrid(items, columns = 3, gap = 6) {
        const columnClass = columns === 1 ? 'grid-cols-1' :
                           columns === 2 ? 'grid-cols-2' :
                           columns === 3 ? 'grid-cols-3' :
                           columns === 4 ? 'grid-cols-4' : 'grid-cols-3';

        const gapClass = gap === 4 ? 'grid-gap-4' :
                        gap === 6 ? 'grid-gap-6' :
                        gap === 8 ? 'grid-gap-8' : 'grid-gap-6';

        return `<div class="grid ${columnClass} ${gapClass}">${items.join('')}</div>`;
    }

    createButton(text, options = {}) {
        const {
            variant = 'primary',
            size = 'md',
            href = null,
            onClick = null,
            icon = null,
            className = ''
        } = options;

        const variantClass = variant === 'primary' ? 'btn-primary' :
                            variant === 'secondary' ? 'btn-secondary' :
                            variant === 'outline' ? 'btn-outline' :
                            variant === 'outline-secondary' ? 'btn-outline-secondary' :
                            variant === 'ghost' ? 'btn-ghost' : 'btn-primary';

        const sizeClass = size === 'sm' ? 'btn-sm' :
                         size === 'lg' ? 'btn-lg' : '';

        let iconHtml = icon ? `<span class="mr-2">${icon}</span>` : '';

        const attrs = [];
        if (onClick) attrs.push(`onclick="${onClick}"`);
        if (className) attrs.push(`class="${className}"`);

        const attrString = attrs.join(' ');

        if (href) {
            return `<a href="${href}" class="btn ${variantClass} ${sizeClass}" ${attrString}>${iconHtml}${text}</a>`;
        }

        return `<button class="btn ${variantClass} ${sizeClass}" ${attrString}>${iconHtml}${text}</button>`;
    }

    createAlert(message, type = 'info') {
        const typeClass = type === 'success' ? 'alert-success' :
                          type === 'warning' ? 'alert-warning' :
                          type === 'error' ? 'alert-error' : 'alert-info';

        return `<div class="alert ${typeClass}">${message}</div>`;
    }

    createPagination(currentPage, totalPages, onPageChange) {
        let html = `<div class="pagination">`;

        html += `
            <button class="pagination-btn" 
                    ${currentPage === 1 ? 'disabled' : ''}
                    onclick="${onPageChange}(${currentPage - 1})">
                上一页
            </button>
        `;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                html += `
                    <button class="pagination-btn ${i === currentPage ? 'active' : ''}"
                            onclick="${onPageChange}(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                html += `<span class="pagination-ellipsis">...</span>`;
            }
        }

        html += `
            <button class="pagination-btn"
                    ${currentPage === totalPages ? 'disabled' : ''}
                    onclick="${onPageChange}(${currentPage + 1})">
                下一页
            </button>
        `;

        html += `</div>`;
        return html;
    }
}

export default BasePage;