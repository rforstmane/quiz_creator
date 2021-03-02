import Vue from 'vue'
import App from './App.vue'

import {BootstrapVue} from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from "@/router";
import VueRouter from 'vue-router'

import store from "@/store";

Vue.router = router
Vue.use(VueRouter)

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
