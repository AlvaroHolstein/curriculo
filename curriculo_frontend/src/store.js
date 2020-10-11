import Vue from 'vue';
import Vuex from 'vuex';
import { PROD_URL } from '../dev.env';

Vue.use(Vuex);
console.log(process.env)
const store = new Vuex.Store({
    state: {
        logged: false,
        url: process.env.NODE_ENV == 'production' ? PROD_URL : 'http://localhost:5000/api/',
        token: null
    },
    mutations: {
        login (state) {
            state.logged = true;
        },
        logout (state) {
            state.logged = false;
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
        }
    }
})

export default store;