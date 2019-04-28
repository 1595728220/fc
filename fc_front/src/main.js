import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
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

//声明全局组件
import MyHeader from "@/components/myheader"
import MyFooter from "@/components/myfooter"
import MyAlert from "@/components/myalert"
Vue.component('myheader',MyHeader)
Vue.component('myfooter',MyFooter)
Vue.component('myalert',MyAlert)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
