import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router/router'
import './assets/scss/main.scss'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import clickOutsideDirective from './directives/clickOutsideDirective'

import 'element-plus/es/components/base/style/css'
import 'element-plus/theme-chalk/el-skeleton.css'
import 'element-plus/es/components/skeleton-item/style/css'
import 'element-plus/es/components/base/style/css'
import 'element-plus/theme-chalk/el-skeleton-item.css'

const app = createApp(App)
const head = createHead()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.directive('click-outside', clickOutsideDirective)

app.use(pinia).use(router).use(head).mount('#app')
