import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/home"
import Login from '@/views/login'
import Order from "@/views/order"
import NotFound from "@/views/notfound"
import Product from "@/views/product"
import ProductDetail from "@/views/product_detail"
import LoginIdentify from "@/views/login_identify"
import AddAddr from "@/views/add_addr"
import ConfirmOrder from "@/views/confirm_order"
import Profile from "@/views/profile"
import axios from "axios"
Vue.use(Router)
let router = new Router({
  routes: [
    {
      name:"profile",
      path:"/profile",
      component:Profile
    },
    {
      name:"confirm_order",
      path:"/confirm_order",
      component:ConfirmOrder
    },
    {
      name: "add_order_addr",
      path: "/add_addr",
      component: AddAddr
    },
    {
      name: "login_identify",
      path: "/identify",
      component: LoginIdentify
    },
    {
      name: "product_detail",
      path: "/detail",
      component: ProductDetail
    },
    {
      name: "product",
      path: "/product",
      component: Product
    },
    {
      name: "home",
      path: '/',
      component: Home
    },
    {
      name: "login",
      path: '/login',
      component: Login
    },
    {
      name: "order",
      path: '/order',
      component: Order
    },
    {
      path: "*",
      component: NotFound
    }
  ],
})

//设置路由守卫，验证用户登录状态
router.beforeEach((to, from, next) => {
  axios.get("/user/state").then(result => {
    if (result.data.code === 200) {
      console.log("已经登录")
      if (to.path === '/login') {
        next({ path: '/' });
      }
    } else {
      console.log("未登录")
      if (to.path !== "/login") {
        next({ path: "/login" })
      }
    }
    next()
  })
})
export default router
