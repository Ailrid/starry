import 'reflect-metadata'
import '@/assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import { bootstrapVirid } from './ccs'
bootstrapVirid()

app.mount('#app')
