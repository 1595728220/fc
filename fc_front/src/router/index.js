import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import NotFound from "@/components/notfound"
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path:"*",
      component:NotFound
    }
  ]
})
