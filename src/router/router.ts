import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const HomePage = () => import('@/pages/HomePage/HomePage.vue')
const OrderPage = () => import('@/pages/OrderPage/OrderPage.vue')
const SearchPage = () => import('@/pages/SearchPage/SearchPage.vue')
const NotFoundPage = () => import('@/pages/NotFoundPage/NotFoundPage.vue')
const DetailsPage = () => import('@/pages/DetailsPage/DetailsPage.vue')

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
    path: '/details/:id',
    name: 'details',
    component: DetailsPage
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
] as RouteRecordRaw[] // почему-то тс ругается, что объект со свойством redirect не совместим с типом, поэтому задаю тип явно

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { // при переходе на новую страницу будет происходить скролл к верху страницы
    return { top: 0 }
  }
})

export default router
