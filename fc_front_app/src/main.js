import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import axios from "axios"
import store from './store'
import MintUI from 'mint-ui' 
import'mint-ui/lib/style.css' //单独引入样式文件
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://127.0.0.1:8081"
Vue.prototype.$axios = axios
Vue.use(Vuex)
Vue.use(MintUI) //将mint-uid库所有组件注册vue实例对象中


//声明全局组件
// import MyHeader from "@/components/myheader"
// import MyFooter from "@/components/myfooter"
// import MyAlert from "@/components/myalert"
// import MyYzm from "@/components/myyzm"
// import MyList from "@/components/mylist"
// import MyTuwen from "@/components/mytuwen"
// import MyAside from "@/components/myaside"
// import MyPingLun from "@/components/mypinglun"
//引入过滤器
import * as filters from "./filter/filter"
//取出对象中的属性名构成数组
Object.keys(filters)
//遍历数组
.forEach(key => {
  //将每个过滤器挂载到Vue实例上
  Vue.filter(key,filters[key])
})

// Vue.component('myheader',MyHeader)
// Vue.component('myfooter',MyFooter)
// Vue.component('myalert',MyAlert)
// Vue.component('myyzm',MyYzm)
// Vue.component('mylist',MyList)
// Vue.component('mytuwen',MyTuwen)
// Vue.component('myaside',MyAside)
// Vue.component('mypinglun',MyPingLun)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
