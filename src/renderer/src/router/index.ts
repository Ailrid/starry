import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Layout.vue'),
    redirect: '/home',
    children: [
      {
        path: '/player',
        name: 'player',
        component: () => import('@/layouts/PlayerLayout.vue')
      },
      {
        path: '/home',
        name: 'home',
        redirect: '/setting',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
          {
            path: '/setting',
            name: 'setting',
            component: () => import('@/pages/Setting.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
