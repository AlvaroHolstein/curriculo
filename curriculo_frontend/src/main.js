import Vue from 'vue'
import router from './router'
import App from './App.vue'

import axios from "axios";

Vue.config.productionTip = false

Vue.prototype.http = axios;

Vue.use(router)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
