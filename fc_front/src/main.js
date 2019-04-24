import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
Vue.prototype.$ajax = axios
//css
import "./assets/css/bootstrap.css"
import "./assets/css/font-awesome.css"
import "./assets/css/animate.css"
import "./assets/css/app.css"
//js
import "./assets/js/jquery"
import "./assets/js/jquery.flot"
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
