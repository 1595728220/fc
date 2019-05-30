import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/home"
import Login from '@/views/login'
import Order from "@/views/order"
import NotFound from "@/views/notfound"
import Product from "@/views/product"
Vue.use(Router)
export default new Router({
  routes: [
    {
      name:"product",
      path:"/product",
      component:Product
    },
    {
      name:"home",
      path: '/',
      component: Home
    },
    {
      name:"login",
      path: '/login',
      component: Login
    },
    {
      name:"order",
      path: '/order',
      component: Order
    },
    {
      path: "*",
      component: NotFound
    }
  ],
})
