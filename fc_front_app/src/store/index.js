import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);
//要设置的全局访问的state对象
const state = {
  //要设置的初始属性值
  //手机号正则
  phoneRegex: /^1[34578]\d{9}$/,
  //密码正则
  // upwdRegex: /^[a-zA-Z\d_]{6,18}$/,
  productList: [],
  productQuery:{
    keywords:"",
    classify:"",
    style:"",
    thickness:"",
    color:"",
    minprice:"",
    maxprice:"",
    rexiao:false,
    xinpin:false,
    recommond:false,
    pno:1,
    size:6,
  }
};
const getters = { //实时监听state值的变化(最新状态)

};
const mutations = {
  //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
  //修改产品列表数据
  setProductList(state, val) {
    state.productList = val
  }
};
const actions = { //this.$store.dispatch('set_uid'，6)
  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性  
  getProductList(context, keywords) {
    // if (keywords.length === 0) {
    //   console.log("keywords为空")
    //   return
    // }
    axios.get("/product/list", {
      params: {
        keywords
      }
    }).then(result => {
      console.log(result.data[0])
      context.commit("setProductList",result.data[0])
    }).catch(err => { throw err })
  }
};
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  //添加插件在F5刷新前将数据存储入sessionStorage中，刷新后将数据恢复
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});

export default store;