import HomePage from './HomePage.js';
import HistoryPage from './HistoryPage.js';
import TechniquesPage from './TechniquesPage.js';
import WorksPage from './WorksPage.js';
import InnovationPage from './InnovationPage.js';
import AnalysisPage from './AnalysisPage.js';
import NotFoundPage from './NotFoundPage.js';

const pages = [
    {
        path: '/',
        name: 'home',
        title: '首页',
        component: HomePage
    },
    {
        path: '/history',
        name: 'history',
        title: '历史传承',
        component: HistoryPage
    },
    {
        path: '/techniques',
        name: 'techniques',
        title: '核心技艺',
        component: TechniquesPage
    },
    {
        path: '/techniques/:id',
        name: 'technique-detail',
        title: '针法详情',
        component: TechniquesPage
    },
    {
        path: '/works',
        name: 'works',
        title: '代表性作品',
        component: WorksPage
    },
    {
        path: '/works/:id',
        name: 'work-detail',
        title: '作品详情',
        component: WorksPage
    },
    {
        path: '/innovation',
        name: 'innovation',
        title: '创新应用',
        component: InnovationPage
    },
    {
        path: '/analysis',
        name: 'analysis',
        title: '技艺分析',
        component: AnalysisPage
    },
    {
        path: '/404',
        name: 'not-found',
        title: '页面未找到',
        component: NotFoundPage
    },
    {
        path: '*',
        name: 'catch-all',
        title: '页面未找到',
        component: NotFoundPage
    }
];

export {
    HomePage,
    HistoryPage,
    TechniquesPage,
    WorksPage,
    InnovationPage,
    AnalysisPage,
    NotFoundPage
};

export default pages;