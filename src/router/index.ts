import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    // server页面
    {
        path: '/',
        name: '',
        // 异步加载，打包时代码分割，性能优化
        component: () => import('@/pages/Home.vue'),
    },
    // huoshan
    {
        path: '/huoshan',
        name: 'huoshan',
        component: () => import('@/pages/HuoShan.vue'),
    },
    {
        path: '/deepseek',
        name: 'deepseek',
        component: () => import('@/pages/DeepSeek.vue'),
    },
    {
        path: '/models',
        name: 'models',
        component: () => import('@/pages/Models.vue'),
    },
    // 404页面
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/pages/404.vue'),
    },
]

// 全局路由
const router = createRouter({
    history: createWebHashHistory(), // 路由模式：history模式
    routes: routes,
})

// 全局路由存储当前路由路径
router.beforeEach((to, _, next) => {
    console.log('to--', to.path)
    next()
})

export default router
