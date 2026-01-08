import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import apiPlugin from './plugins/api'
import toolsPlugin from './plugins/tools'

const app = createApp(App)

app.use(router)
app.use(apiPlugin, {
  baseURL: 'https://donations.edu.netlog.fr',
  apiKey: import.meta.env.VITE_API_KEY
})
app.use(toolsPlugin, {
  textMaxLength: 100
})

app.mount('#app')
