import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/home"
import Login from '@/views/login'
import Order from "@/views/order"
import Search from "@/views/search"
import NotFound from "@/views/notfound"

Vue.use(Router)
export default new Router({
  routes: [
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
      name:"search",
      path: '/search',
      component: Search
    },
    {
      path: "*",
      component: NotFound
    }
  ],
})
