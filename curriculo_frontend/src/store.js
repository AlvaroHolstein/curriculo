import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        logged: false
    },
    mutations: {
        login (state) {
            state.logged = true;
        },
        logout (state) {
            state.logged = false;
        }
    },
    getters: {
        logged(state) {
            return state.logged;
        }
    }
})

export default store;