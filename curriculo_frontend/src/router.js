import Vue from "vue";
import Router from "vue-router";

import Auth from "./views/auth-page.vue";

import MainPage from "./views/main-page.vue";
import Experiencia from "./views/experiencia.vue";
import Educacao from "./views/educacao.vue";
import Competencias from "./views/competencias.vue";
import Detalhes from "./views/detalhes.vue";
import InformacaoAdicional from "./views/informacao_adicional.vue";

Vue.use(Router);

const router = new Router({
    routes: [
        // route para a página de autenticação
        {
            path: "/auth",
            name: "auth",
            component: Auth //auth
        },
        // Tab1, estes paths vão ter que estar protegidos
        {
            path: "/",
            name: "cv",
            component: MainPage,
            children: [
                {
                    // Tenta vir para esta página por 
                    path: "/exp",
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
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    console.log({ to, from, next })

    /** Fazer a confirmação das cookies aqui */
    // fetch()
    next();
})
export default router;