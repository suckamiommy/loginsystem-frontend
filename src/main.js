import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import can from './helpers/can'
import axios from './axios/index'

const app = createApp(App).use(store).use(router)
app.config.globalProperties.$can = can;

axios.get('constants').then((res) => {
    app.config.globalProperties.$constants = res.data;
    app.mount('#app')
});


