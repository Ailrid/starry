import 'reflect-metadata'
import '@/assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

const app = createApp(App)
app.use(router)

import { bootstrapDI } from './ccs/ioc.config'
bootstrapDI()

app.mount('#app')
