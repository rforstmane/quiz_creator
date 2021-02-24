import VueRouter from 'vue-router'

import CreateSurvey from "./components/CreateSurvey";

const routes = [
    {
        path: '/create-quiz',
        name: 'create-quiz',
        component: CreateSurvey,
        meta: {
            showNavigation: false,
            auth: false
        }
    },
]
const router = new VueRouter({

    base: process.env.VUE_APP_ROUTER_BASE_URL,
    routes

})



router.beforeEach((to, from, next) => {
    //console.log(from, to)

    next()
})
