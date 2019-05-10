import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//要设置的全局访问的state对象
const state = {
  //要设置的初始属性值
  // 保存用户id
  person_uid: 0,
  //保存所有的产品分类信息
  product_class: {}
};
const getters = { //实时监听state值的变化(最新状态)
  get_uid(state) { //方法名随意,主要是来承载变化的值
    return state.person_uid
  },
  get_product_class() {
    return state.product_class
  }
};
const mutations = {
  //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
  //修改用户Id的方法
  _set_uid(state, newUid) {
    state.person_uid = newUid;
  },
  //修改产品分类信息的方法
  _set_product_class(state, newVal) {
    state.product_class = newVal;
  }

};
const actions = { //this.$store.dispatch('set_uid'，6)
  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性  
  //触发_set_uid
  set_uid(context, newUid) {
    context.commit("_set_uid", newUid);
  },
  //触发_set_product_class
  set_product_class(context,newVal) {
    context.commit("_set_product_class",newVal)
  },
};
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;