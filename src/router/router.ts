import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const HomePage = () => import('@/pages/HomePage/HomePage.vue')
const OrderPage = () => import('@/pages/OrderPage/OrderPage.vue')
const SearchPage = () => import('@/pages/SearchPage/SearchPage.vue')
const NotFoundPage = () => import('@/pages/NotFoundPage/NotFoundPage.vue')


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
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundPage
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
