//import './assets/main.css'
import 'whatwg-fetch'; // Polyfill for Fetch API
import 'abortcontroller-polyfill'; // Polyfill for AbortController
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const theme = localStorage.getItem('theme') || 'light';
const app = createApp(App)

app.use(createPinia())
app.use(router)
document.documentElement.setAttribute('data-bs-theme', theme)
app.mount('#app')