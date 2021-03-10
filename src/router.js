import VueRouter from 'vue-router'

import CreateSurvey from "@/components/createSurvey/CreateSurvey";
import Created from "@/components/createdSurveys/CreatedSurveys";
import Results from "@/components/results/Results";

const routes = [
    {
        path: "/",
        name: "Main"
    },
    {
        path: "/create",
        name: "CreateSurvey",
        component: CreateSurvey
    },
    {
        path: "/created",
        name: "Created",
        component: Created
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
