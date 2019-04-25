import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
Vue.prototype.$ajax = axios

//js
import "./assets/js/jquery"
import "./assets/js/jquery.flot"
//css
import "./assets/css/bootstrap.css"
import "./assets/css/font-awesome.css"
import "./assets/css/animate.css"
import "./assets/css/my_comm.css"

//声明全局组件
import MyHeader from "@/components/myheader"
import MyFooter from "@/components/myfooter"
Vue.component('myheader',MyHeader)
Vue.component('myfooter',MyFooter)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
