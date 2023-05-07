import { createRouter, createWebHistory } from 'vue-router'
const HomePage = () => import('@/pages/HomePage/HomePage.vue')
const OrderPage = () => import('@/pages/OrderPage/OrderPage.vue')
const SearchPage = () => import('@/pages/SearchPage/SearchPage.vue')


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/order',
    name: 'order',
    component: OrderPage
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
