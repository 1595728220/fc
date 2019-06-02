import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);
//要设置的全局访问的state对象
const state = {
  //要设置的初始属性值
  //服务器端的图片路径
  productServerAdd: "http://127.0.0.1:8081/product/",
  bannerServerAdd: "http://127.0.0.1:8081/banner/",
  //手机号正则
  // phoneRegex: /^1[34578]\d{9}$/,
  //密码正则
  // upwdRegex: /^[a-zA-Z\d_]{6,18}$/,
  //产品列表
  productList: [],
  //查询产品的参数
  productQuery: {
    keywords: "",
    classify: "",
    style: "",
    thickness: "",
    color: "",
    minprice: "",
    maxprice: "",
    rexiao: false,
    xinpin: false,
    recommond: false,
    pno: 1,
    size: 6,
  },
  //查询商品的总记录数
  totalQueryProduct: "",
  //手机号
  userPhone: "",
  //验证码
  userIdentify: ""
};
const getters = { //实时监听state值的变化(最新状态)
  //返回一个格式化的手机号
  getPhone(state) {
    let arr = state.userPhone.split("")
    arr.splice(3, 0, " ")
    arr.splice(8, 0, " ")
    return arr.join("")
  },
  getIdentify(state){
    return state.userIdentify
  }
};
const mutations = {
  //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);

  //修改产品列表数据
  setProductList(state, val) {
    state.productList = val
  },
  //初始化查询参数
  initProductQuery(state) {
    state.productQuery = {
      keywords: "",
      classify: "",
      style: "",
      thickness: "",
      color: "",
      minprice: "",
      maxprice: "",
      rexiao: false,
      xinpin: false,
      recommond: false,
      pno: 1,
      size: 6,
    }
  },
  //为查询参数修改数据
  changeProductQuery(state, val) {
    //验证参数是否为对象
    if (Object.prototype.toString.call(val) === "[object Object]") {

      // 提取两个对象中的属性名
      let keys = Object.keys(state.productQuery),
        tmpKeys = Object.keys(val)
      //遍历参数属性名数组
      tmpKeys.forEach(el => {
        //查找参数属性名在目标属性名数组中的下标
        let index = keys.indexOf(el)
        //如果存在，则将对应对象中的值保存进目标对象
        index !== -1 && (state.productQuery[keys[index]] = val[el])
      })
    }
  },
  //设置符合结果的产品总数
  setTotalQueryProduct(state, val) {
    state.totalQueryProduct = val
  },
  //设置用户手机号
  setUserPhone(state, val) {
    state.userPhone = val
  },
  //设置用户验证码
  setUserIdentify(state, val) {
    state.userIdentify = val
  }
};
const actions = { //this.$store.dispatch('set_uid'，6)
  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性  
  //发送请求，查询符合条件的产品信息
  getProductList(context) {
    // console.log(context.state.productQuery)
    axios.get("/product/list", {
      params: context.state.productQuery
    }).then(result => {
      // console.log(state.productQuery)
      context.commit("setTotalQueryProduct", result.data[1][0]["found_rows()"])
      context.commit("setProductList", result.data[0])
    }).catch(err => { throw err })
  },
  //发送请求，请求验证码
  requireIdentify(context) {
    //将手机号保存
    axios.get("/user/yzm", {
      params: { phone: context.state.userPhone }
    }).then(result => {
      // console.log(result)
      context.commit("setUserIdentify", result.data.yzm.text)
      console.log(context.state.userIdentify)
    })
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