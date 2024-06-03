import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import ModelsView from '../views/ModelsView.vue'
import InstallerView from '../views/InstallerView.vue'
const router = createRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView
    },
    {
      path: '/models',
      name: 'models',
      component: ModelsView
    },
    {
      path: '/terminal',
      name: 'terminal',
      component: InstallerView
    },
  ]
})

export default router
