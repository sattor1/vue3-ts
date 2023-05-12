import MainVue from '@/pages/Main.vue'
import Table from '@/pages/Table.vue'
import Calculator from '@/pages/Calculator.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/posts',
      name: 'posts',
      component: MainVue,
      children: [
        {
          path: '/posts/:id',
          name: 'post-item',
          component: MainVue
        }
      ]
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: Calculator
    }
  ]
})

export default router
