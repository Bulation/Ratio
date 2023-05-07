import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import './assets/main.scss'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import { createMetaManager } from 'vue-meta';
import { defaultConfig } from 'vue-meta'
const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(
    createMetaManager(false, {
      ...defaultConfig,
      meta: { tag: 'meta', nameless: true }
    })
  )
  .mount('#app');
