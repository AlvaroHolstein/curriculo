import Vue from 'vue'
import router from './router'
import App from './App.vue'
import Vuex from 'vuex';
import i18n from './i18n'

import store from './store';
import axios from "axios";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import Swal from 'sweetalert2';
import markyIt from 'markdown-it';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import CustomError from './classes/custom-error.class';

let path = { path: "../"};
dotenv.config({path})
Vue.config.productionTip = false

if(process.env.NODE_ENV == 'production') {
  axios.defaults.withCredentials = true;
}
// Já funcionou a parte das env variables, como ao cert ....
Vue.prototype.http = axios;
Vue.prototype.CustomError = CustomError;

Vue.prototype.jwt = jwt;
Vue.prototype.$Swal = Swal;
Vue.prototype.markyIt = new markyIt();

Vue.use(router)
Vue.use(Vuex);

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Vue.prototype.$store = Vuex;
new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
