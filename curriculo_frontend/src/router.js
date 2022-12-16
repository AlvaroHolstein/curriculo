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

import { AuthClass } from './classes/auth.class';

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

        let tokenNameLs = "elto";

        let lsToken = "";

        // Checkar se algum user já estava "logado"
        if (localStorage.getItem(tokenNameLs)) {
            lsToken = JSON.parse(localStorage.getItem(tokenNameLs));
        }

        console.log("passando", {isGuest: store.getters.isGuest})

        /** Em desenvolvimento isto vai ser de uma forma, 
         * depois em produção vai ser de outra maneira
         * 
         * console.log(to.name != "auth" && store.getters.logged == false, to.name, store.getters.logged)
         */
        if (store.getters.isGuest) {
            // Ir para qualquer que for o caminho que o utilizador quer.
            console.log("entºao calara")
            next();
            return;
        } else {

            if (to.name != "auth" && store.getters.logged == false) {
                if (lsToken != "") {

                    let jwtVerified = await AuthClass.verifyToken(lsToken);

                    let { a, b } = jwtVerified;
                    let authRes = await axios.post(`${store.getters.url}auth/verify`, { token: lsToken, c: a * b });
                    if (!authRes.data.success) {
                        letgo = false;
                    }
                    else {
                        // Se for este o caso então significa que pode ir direto para a conta
                        store.commit("setToken", lsToken);
                        await store.commit("login", authRes.data.data._id);

                        /** Passo 2. das Mensagens */
                        router.push({ name: "experiencia" });
                    }
                }
                else {
                    letgo = false;
                }
            }

            /** Fazer a conflirmação das cookies aqui */
            if ((to.name != 'auth' && store.getters.logged == true) || store.getters.logged == true) {
                //1. Veirficar Token
                let jwtVerified = await AuthClass.verifyToken(store.getters.token);


                //Ainda tenho que criar a rota
                let { a, b } = jwtVerified;
                let authRes = await axios.post(`${store.getters.url}auth/verify`, { token: store.getters.token, c: a * b });
                if (!authRes.data.success) {
                    letgo = false;
                }
            }

            if (!localStorage.getItem(tokenNameLs) && store.getters.token == "") {
                letgo = false;
            }

            if (to.name == "auth" && store.getters.logged == false) {
                letgo = true;
            }
            next(letgo)
            /** Isto devia sempre mandar as pessoas para a página de login
             * quando alguma coisa corre mal com o token
             */
            if (!letgo && to.name != 'auth') {
                router.push({ name: 'auth' })
            }
        }
    } catch (error) {
        if (to.name != "auth") router.push({ name: 'auth' })
        else next()
    }
})
export default router;