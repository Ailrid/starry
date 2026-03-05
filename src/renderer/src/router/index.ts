import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: []
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
