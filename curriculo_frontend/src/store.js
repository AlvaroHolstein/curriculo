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
        username: null
    },
    mutations: {
        async login(state) {
            let jwtVerified = await AuthClass.verifyToken(store.getters.token);

            if (jwtVerified) {
                state.logged = true;
                state.username = jwtVerified.username;
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
        }
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
        }
    }
})

export default store;