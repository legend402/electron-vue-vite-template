import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'uno.css'
import router from './router'
import pinia from './store'
import "material-design-icons-iconfont/dist/material-design-icons.min.css";

(async () => {
  const app = createApp(App)

  app.use(router)
  app.use(pinia)

  if (import.meta.env.MODE !== 'web')
    app.config.globalProperties.$ipcRenderer = (await import('electron')).ipcRenderer
  
  app.mount('#app')
})()
