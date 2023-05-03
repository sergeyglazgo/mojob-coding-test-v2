import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
import VueAxios from 'vue-axios'
import axios from 'axios'

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios as any)
app.use(ElementPlus)
app.provide('axios', app.config.globalProperties.axios)

app.mount('#app')
