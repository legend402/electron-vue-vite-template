import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'uno.css'
import router from './router'
import pinia from './store'
import "material-design-icons-iconfont/dist/material-design-icons.min.css";
import './assets/font'
import { createVuestic } from 'vuestic-ui'
import "vuestic-ui/css";

(async () => {
  const app = createApp(App)

  app.use(router)
  app.use(pinia)
  app.use(createVuestic())

  if (import.meta.env.MODE !== 'web') {
    app.config.globalProperties.$ipcRenderer = (await import('electron')).ipcRenderer
    window.ipcRenderer = (await import('electron')).ipcRenderer
  }
  app.mount('#app')
})()
