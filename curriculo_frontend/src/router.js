import Vue from "vue";
import Router from "vue-router";
import Experiencia from "./views/experiencia.vue";
import Educacao from "./views/educacao.vue";
import Competencias from "./views/competencias.vue";
import Detalhes from "./views/detalhes.vue";
import InformacaoAdicional from "./views/informacao_adicional.vue";

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
        },
        {
            path: "/competencias",
            name: "competencias",
            component: Competencias
        },
        {
            path: "/detalhes",
            name: "detalhes",
            component: Detalhes
        },
        {
            path: "/info",
            name: "info_adicional",
            component: InformacaoAdicional
        }
    ]
})

export default router;