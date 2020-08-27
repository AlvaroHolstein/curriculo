import Vue from "vue";
import Router from "vue-router";
import Experiencia from "./views/experiencia.vue";
import Educacao from "./views/educacao.vue";

Vue.use(Router);

const router = new Router({
    routes: [
        // Tab1
        {
            path: "/",
            name: "experiencia",
            component: Experiencia
        },
        {
            path: "/educacao",
            name: "educacao",
            component: Educacao
        }
    ]
})

export default router;