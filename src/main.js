import { createApp } from 'vue'
import App from './App.vue'

import Omorphia from 'omorphia'

import '../node_modules/omorphia/dist/style.css'

import './style.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
    .use(Omorphia)
    .use(VueAxios, axios)
    .mount('#app')
