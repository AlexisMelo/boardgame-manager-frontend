import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from "mitt";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css"
import axios from "axios";
import VueAxios from 'vue-axios'

const emitter = mitt()
const app = createApp(App)
app.config.globalProperties.emitter = emitter

app.use(store)
app.use(router)
app.use(VueToast)
app.use(VueAxios, axios)

app.mount("#app")