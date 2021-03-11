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

let allSurveys = require('../allSurveys.json');
let allAnswers = require('../allAnswers.json');

if (localStorage.getItem("allSurveys") === null) {
    localStorage.setItem("allSurveys", JSON.stringify(allSurveys));
}
if (localStorage.getItem("allAnswers") === null) {
    localStorage.setItem("allAnswers", JSON.stringify(allAnswers));
}

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
