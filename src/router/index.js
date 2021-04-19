import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Settings from '@/views/Settings.vue'
import Transaction from '@/views/Transaction.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: {id: null}
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    props: {id: null}
  },
  {
    path: '/create-transaction',
    name: 'CreateTransaction',
    component: Transaction,
    props: {id: 0}
  },
  {
    path: '/pending-transaction',
    name: 'PendingTransaction',
    component: Transaction,
    props: {id: 1}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
