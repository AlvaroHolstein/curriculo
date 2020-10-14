import Vue from 'vue'
import router from './router'
import App from './App.vue'
import Vuex from 'vuex';
import store from './store';
import axios from "axios";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import Swal from 'sweetalert2';

dotenv.config()
Vue.config.productionTip = false

Vue.prototype.http = axios;
Vue.prototype.jwt = jwt;
Vue.prototype.$Swal = Swal;

Vue.use(router)
Vue.use(Vuex);

// Vue.prototype.$store = Vuex;
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
