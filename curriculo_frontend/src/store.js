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
        contaValue: null
    },
    mutations: {
        async login(state) {
            let jwtVerified = await AuthClass.verifyToken(store.getters.token);

            if (jwtVerified) {
                state.logged = true;
                state.username = jwtVerified.username;
                state.contaValue = jwtVerified.a * jwtVerified.b;
            }
        },
        logout(state) {
            state.logged = false;
            state.username = null;
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
            return {
                'Cookie': `c=${state.contaValue};Set-Cookie=${state.contaValue}`,
                "content-Type": "application/json",
                Accept: "/",
                "Cache-Control": "no-cache",
            };
        }
    }
})

export default store;