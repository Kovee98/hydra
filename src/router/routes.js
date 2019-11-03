
const routes = [
    {
        path: '/',
        component: () => import('layouts/Layout.vue'),
        children: [
            { path: '', component: () => import('pages/Body.vue') }
        ]
    },
    {
        path: '/params',
        component: () => import('layouts/Layout.vue'),
        children: [
            { path: '', component: () => import('pages/Params.vue') }
        ]
    },
    {
        path: '/headers',
        component: () => import('layouts/Layout.vue'),
        children: [
            { path: '', component: () => import('pages/Headers.vue') }
        ]
    },
    {
        path: '/response',
        component: () => import('layouts/Layout.vue'),
        children: [
            { path: '', component: () => import('pages/Response.vue') }
        ]
    }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue')
    });
}

export default routes;
