import VueRouter from 'vue-router'

import CreateSurvey from "@/components/createSurvey/CreateSurvey";
import Created from "@/components/createdSurveys/CreatedSurveys";
import Survey from "@/components/createdSurveys/Survey";
import Results from "@/components/results/Results";
import SurveyResults from "@/components/results/SurveyResults";

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
    },
    {
        path: "/results/:id",
        name: "Survey Results",
        component: SurveyResults
    },
    {
        path: "/created/:id",
        name: "Created Survey",
        component: Survey
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router
