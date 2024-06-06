import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
const router = createRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  history: createWebHashHistory(import.meta.env.BASE_URL,),
  
  //history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/HomeView.vue")
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import("../views/ChatView.vue")
    },
  /*  {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },*/
    {
      path: '/models',
      name: 'models',
      component: () => import("../views/ModelsView.vue")
    },
/*    {
      path: '/voice',
      name: 'voice',
      component: VoiceView
    },
*/
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
