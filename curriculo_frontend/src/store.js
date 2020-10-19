import Vue from 'vue';
import Vuex from 'vuex';
import { PROD_URL } from '../dev.env';
import { AuthClass } from './classes/auth.class';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        logged: false,
        url: process.env.NODE_ENV == 'production' ? PROD_URL : 'http://localhost:5000/api/',
        token: null,
        username: null,
        contaValue: null,
        lsToken: 'elto'
    },
    mutations: {
        async login(state) {
            let jwtVerified = await AuthClass.verifyToken(store.getters.token);
            console.log(jwtVerified)
            if (jwtVerified) {
                state.logged = true;
                state.username = jwtVerified.username;
                state.contaValue = jwtVerified.a * jwtVerified.b;
                localStorage.setItem("elto", JSON.stringify(store.getters.token));
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
                }
            } catch (error) {
                state.logged = false;
                state.username = null;
                state.contaValue = null;

                if(localStorage.getItem(state.lsToken)) {
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
        // setContaValue(state) {
        //     state
        // }
    },
    getters: {
        logged(state) {
            return state.logged;
        },
        url(state) {
            return state.url;
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
        }
    }
})

export default store;