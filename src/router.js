import VueRouter from 'vue-router'

import CreateSurvey from "@/components/CreateSurvey";
import CreatedSurveys from "@/components/CreatedSurveys";
import Results from "@/components/Results";

const routes = [
    {
        path: "/",
        name: "Main"
    },
    {
        path: "/create",
        name: "Create",
        component: CreateSurvey
    },
    {
        path: "/created",
        name: "Created",
        component: CreatedSurveys
    },
    {
        path: "/results",
        name: "Results",
        component: Results
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router
