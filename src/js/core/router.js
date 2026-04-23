class Router {
    constructor(options = {}) {
        this.mode = options.mode || 'hash';
        this.routes = options.routes || [];
        this.currentRoute = null;
        this.params = {};
        this.onBeforeEnter = options.onBeforeEnter || (() => true);
        this.onAfterEnter = options.onAfterEnter || (() => {});
        this.onError = options.onError || (() => {});
        this.history = [];
    }

    init() {
        if (this.mode === 'hash') {
            window.addEventListener('hashchange', () => this.handleRouteChange());
            window.addEventListener('load', () => this.handleRouteChange());
        } else {
            window.addEventListener('popstate', () => this.handleRouteChange());
            this.handleRouteChange();
        }
    }

    handleRouteChange() {
        const path = this.getPath();
        const matchedRoute = this.matchRoute(path);

        if (!matchedRoute) {
            const notFoundRoute = this.routes.find(r => r.path === '/404') || 
                                   this.routes.find(r => r.path === '*');
            if (notFoundRoute) {
                this.navigateToRoute(notFoundRoute, {});
            } else {
                this.onError(new Error('页面未找到'));
            }
            return;
        }

        this.navigateToRoute(matchedRoute.route, matchedRoute.params);
    }

    getPath() {
        if (this.mode === 'hash') {
            const hash = window.location.hash.slice(1);
            return hash || '/';
        } else {
            return window.location.pathname;
        }
    }

    matchRoute(path) {
        for (const route of this.routes) {
            const match = this.matchPath(route.path, path);
            if (match) {
                return { route, params: match.params };
            }
        }
        return null;
    }

    matchPath(routePath, actualPath) {
        if (routePath === '*') {
            return { params: {} };
        }

        const routeSegments = routePath.split('/').filter(Boolean);
        const actualSegments = actualPath.split('/').filter(Boolean);

        if (routeSegments.length !== actualSegments.length) {
            return null;
        }

        const params = {};

        for (let i = 0; i < routeSegments.length; i++) {
            const routeSegment = routeSegments[i];
            const actualSegment = actualSegments[i];

            if (routeSegment.startsWith(':')) {
                const paramName = routeSegment.slice(1);
                params[paramName] = actualSegment;
            } else if (routeSegment !== actualSegment) {
                return null;
            }
        }

        return { params };
    }

    async navigateToRoute(route, params) {
        try {
            const shouldProceed = await this.onBeforeEnter(route, params);
            
            if (shouldProceed === false) {
                return;
            }

            this.currentRoute = route;
            this.params = params;
            this.history.push({ path: route.path, params, timestamp: Date.now() });

            await this.onAfterEnter(route, params);
        } catch (error) {
            this.onError(error);
        }
    }

    navigate(path) {
        if (this.mode === 'hash') {
            window.location.hash = path;
        } else {
            window.history.pushState({}, '', path);
            this.handleRouteChange();
        }
    }

    push(path, state = {}) {
        if (this.mode === 'hash') {
            window.location.hash = path;
        } else {
            window.history.pushState(state, '', path);
            this.handleRouteChange();
        }
    }

    replace(path, state = {}) {
        if (this.mode === 'hash') {
            const hashPath = path.startsWith('#') ? path : '#' + path;
            window.location.replace(hashPath);
        } else {
            window.history.replaceState(state, '', path);
            this.handleRouteChange();
        }
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }

    go(delta) {
        window.history.go(delta);
    }

    getCurrentRoute() {
        return this.currentRoute;
    }

    getParams() {
        return this.params;
    }

    getHistory() {
        return this.history;
    }
}

export default Router;