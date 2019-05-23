import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import NotFound from "@/views/notfound"
import Login from '@/views/login'
import Register from '@/views/register'
import Product from "@/views/product"
import AppDown from "@/views/appdown"
import Detail from "@/views/detail"
import Person from "@/views/person"
import Forget from "@/views/forget"
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/product',
      component: Product
    },
    {
      path: "/appdown",
      component: AppDown
    },
    {
      path:"/detail/:pid",
      component:Detail,
      props:true
    },
    {
      path:"/person",
      component:Person
    },
    {
      path:"/forget",
      component:Forget
    },
    {
      path: "*",
      component: NotFound
    }
  ],
})
