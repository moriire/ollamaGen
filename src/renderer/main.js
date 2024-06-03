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

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Add the theme link dynamically
const themeLink = document.createElement('link');
themeLink.rel = 'stylesheet';
themeLink.id = 'theme-link';
document.head.appendChild(themeLink);

// Set initial theme based on localStorage
const initialTheme = localStorage.getItem('theme') || 'light';
themeLink.setAttribute('href', initialTheme === 'light' ? './renderer/assets/css/light-theme.css' : './renderer/assets/assets/css/dark-theme.css');
app.mount('#app')