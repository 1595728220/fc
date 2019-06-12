import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import axios from "axios"
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css' //单独引入样式文件
// import VueLazyload from 'vue-lazyload'
import Scroll from "./components/common/scroll"
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://127.0.0.1:8081"
Vue.prototype.$axios = axios
Vue.use(Vuex)
Vue.use(MintUI) //将mint-uid库所有组件注册vue实例对象中
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'imgs/lazyload/error.jpg',
//   loading: 'imgs/lazyload/loading.gif',
//   attempt: 1
// })
//声明全局组件
Vue.component("my-scroll", Scroll)
//引入过滤器
import * as filters from "./filter/filter"
//取出对象中的属性名构成数组
Object.keys(filters)
  //遍历数组
  .forEach(key => {
    //将每个过滤器挂载到Vue实例上
    Vue.filter(key, filters[key])
  })


Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


