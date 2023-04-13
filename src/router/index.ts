import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/LMain.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        }
      ]
    },
    {
      path: '/auth',
      component: () => import('../layouts/LMain.vue'),
      children: [
        {
          path: '',
          name: 'sign-in',
          component: () => import('../views/Auth/SignInView.vue')
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          component: () => import('../views/Auth/SignUpView.vue')
        }
      ]
    }
    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
  ]
})

export default router
