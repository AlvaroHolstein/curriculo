import Vue from 'vue'
import router from './router'
import App from './App.vue'
import Vuex from 'vuex';
import store from './store';
import axios from "axios";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import Swal from 'sweetalert2';
import markyIt from 'markdown-it';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

dotenv.config()
Vue.config.productionTip = false

console.log(process.env)
Vue.prototype.http = axios;
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
  render: h => h(App),
  router,
  store,
}).$mount('#app')
