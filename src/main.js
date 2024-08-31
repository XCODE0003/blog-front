import './assets/css/main.css'
import router from "@/router/ingdex.js";
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')