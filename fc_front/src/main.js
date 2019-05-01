import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://127.0.0.1:8081"
Vue.prototype.$axios = axios

//js
import "./assets/js/jquery"
// import "./assets/js/jquery.flot"
// import "./assets/js/bootstrap"
// import "./assets/js/bootstrap.bundle"
//css
import "./assets/css/bootstrap.css"
import "./assets/css/font-awesome.css"
import "./assets/css/animate.css"
import "./assets/css/my_comm.css"
import "./assets/css/animate.css"

//声明全局组件
import MyHeader from "@/components/myheader"
import MyFooter from "@/components/myfooter"
import MyAlert from "@/components/myalert"
import MyYzm from "@/components/myyzm"
Vue.component('myheader',MyHeader)
Vue.component('myfooter',MyFooter)
Vue.component('myalert',MyAlert)
Vue.component('myyzm',MyYzm)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
