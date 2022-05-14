import Vue from 'vue';
import Vuex from 'vuex';
import i18n from './i18n';
import { PROD_URL, PORT } from '../dev.env.js';
import { AuthClass } from './classes/auth.class';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isGuest: localStorage["isGuest"] === null || localStorage["isGuest"] === undefined ? true : localStorage["isGuest"], // this will be the var that is true until de user logs in.
        logged: false,
        url: process.env.NODE_ENV == 'production' ? PROD_URL : `http://localhost:${PORT}/api/`,
        serverless_url: process.env.NODE_ENV == 'production' ? 'TBD' : `http://localhost:${PORT}/`,
        token: null,
        username: null,
        contaValue: null,
        lsToken: 'elto',

        // Também vai estar na localStorage, assim o default vai ser pt
        language: localStorage['language'] ? localStorage['language'] : 'pt',

        // Will solve the bug of everybody receive all messages from discord
        idM: ""
    },
    mutations: {
        isGuest(state, value) {
            state.isGuest = value;
        },
        async login(state, idM) {
            let jwtVerified = await AuthClass.verifyToken(store.getters.token);
            if (jwtVerified) {
                state.logged = true;
                state.idM = idM;
                state.username = jwtVerified.username;
                state.contaValue = jwtVerified.a * jwtVerified.b;
                localStorage.setItem("elto", JSON.stringify(store.getters.token));

                state.isGuest = false;
                localStorage.setItem("isGuest", JSON.stringify(state.isGuest));
            }
        },
        async logout(state) {
            try {
                // 1. Fazer um pedido para "matar" o token
                let logout = await AuthClass.logout(this.http, state.url, state.token)
                if (logout) {
                    state.logged = false;
                    state.username = null;
                    state.contaValue = null;
                    state.idM = "";
                    state.isGuest = true;
                    localStorage.setItem("isGuest", JSON.stringify(state.isGuest));
                    localStorage.setItem(state.lsToken, "");
                }
            } catch (error) {
                state.logged = false;
                state.username = null;
                state.contaValue = null;
                state.idM = "";
                state.isGuest = true;
                localStorage.setItem("isGuest", JSON.stringify(store.getters.isGuest));


                if (localStorage.getItem(state.lsToken)) {
                    localStorage.setItem(state.lsToken, "");
                }
            }
        },

        /** Token Shananigans */
        setToken(state, token) {
            state.token = token;
        },
        clearToken(state) {
            state.token = null;
        },
        changeLanguage(state, lang) {
            // Dentro da store
            state.language = lang;
            localStorage.setItem("language", state.language);

            // Agora o que realmente vai fazer mudar a linguagem
            // this.$i18n.locale = state.language
            // Funcionando
            i18n.locale = state.language;
        }
    },
    getters: {
        /**
         * 
         * @param {*} state 
         * @returns {boolean} isGuest
         */
        isGuest(state) {
            if (typeof state.isGuest == "string") {
                if (state.isGuest == "false") return false;
                if (state.isGuest == "true") return true;
            }

            return state.isGuest;
        },
        logged(state) {
            return state.logged;
        },
        url(state) {
            return state.url;
        },
        serverless_url(state) {
            return state.serverless_url;
        },
        token(state) {
            return state.token;
        },
        username(state) {
            return state.username;
        },
        // Usado para além de enviar o token que já vai nas cookies,
        // envio também o resultado da conta que é necessário para verificar o token
        headersValue(state) {
            // Set-Cookie=${state.contaValue}
            return {
                'Set-Cookie': `c=${state.contaValue};`,
                "content-Type": "application/json",
                Accept: "/",
                "Cache-Control": "no-cache",
            };
        },
        /** Return = ?c=contaValue
         * 
         * @param {*} state 
         */
        contaValueParams(state) {
            return `?c=${state.contaValue}`;
        },
        language(state) {
            return state.language;
        },
        idM(state) {
            return state.idM;
        },
        discChannel(state) {
            let name = (state.username + "_" + state.idM).toLowerCase();
            if (name.split(" ").length > 1) {
                name = name.split(" ").join("-")
            }
            return name;
        }
    }
})

export default store;