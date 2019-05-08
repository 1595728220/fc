import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import NotFound from "@/components/notfound"
import Login from '@/components/login'
import Register from '@/components/register'
import Product from "@/components/product"
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'/product',
      component:Product
    },
    {
      path:"*",
      component:NotFound
    }
  ]
})
