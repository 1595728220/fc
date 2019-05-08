import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//要设置的全局访问的state对象
const state = {
  //要设置的初始属性值
  person_uid : 0
};
const getters = { //实时监听state值的变化(最新状态)
  get_uid(state) { //方法名随意,主要是来承载变化的值
    return state.person_uid
  }
};
const mutations = {
  _set_uid(state,newUid) { //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.person_uid = newUid;
  }
};
const actions = { //this.$store.dispatch('set_uid'，6)
  set_uid(context,newUid) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
      context.commit("_set_uid",newUid);
  },
};
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;