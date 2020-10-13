import Vue from "vue";
import Router from "vue-router";
import store from "./store"; // Ir buscar a minha store
import Auth from "./views/auth-page.vue";

import MainPage from "./views/main-page.vue";
import Experiencia from "./views/experiencia.vue";
import Educacao from "./views/educacao.vue";
import Competencias from "./views/competencias.vue";
import Detalhes from "./views/detalhes.vue";
import InformacaoAdicional from "./views/informacao_adicional.vue";

import axios from 'axios';

import {AuthClass} from './classes/auth.class';

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
    try {
        let letgo = true;

        console.log({ to, from, next }, to.name, store)

        /** Em desenvolvimento isto vai ser de uma forma, 
         * depois em produção vai ser de outra maneira
         */
        if (to.name != "auth" && store.getters.logged == false) {
            letgo = false;
        }

        /** Fazer a conflirmação das cookies aqui */
        // fetch()

        if (to.name != 'auth' && store.getters.logged == true) {
            //1. Veirficar Token
            let jwtVerified = await AuthClass.verifyToken(store.getters.token);


            //Ainda tenho que criar a rota
            let {a, b} = jwtVerified;
            console.log({a, b, jwtVerified}); 
            let authRes = await axios.post(`${store.getters.url}auth/verify`, { token: store.getters.token, c: a*b});

            if(!authRes.data.success) {
                letgo = false;
            }
        }
        next(letgo)
        if (!letgo && from.name != "auth") {
            router.push({ name: 'auth' })
        }
    } catch (error) {
        console.error(error)
        next(false)
    }
})
export default router;