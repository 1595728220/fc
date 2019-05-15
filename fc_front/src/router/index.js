import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import NotFound from "@/components/notfound"
import Login from '@/components/login'
import Register from '@/components/register'
import Product from "@/components/product"
import AppDown from "@/components/appdown"
import Detail from "@/components/detail"
import Person from "@/components/person"
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
      component:Detail
    },
    {
      path:"/person",
      component:Person
    },
    {
      path: "*",
      component: NotFound
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
