<template>
  <div class="title-bar">
    <form action @submit.prevent="function(){return false}">
      <mt-search
        v-model="keywords"
        cancel-text="取消"
        placeholder="输入关键词"
        @keyup.enter.native="searchEvent"   
      ></mt-search>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keywords: ""
    };
  },
  methods: {
    //回车时触发的事件
    searchEvent() {
      console.log("查找" + this.keywords);
      this.$store.commit("initProductQuery");
      //将关键词发送到vuex中
      this.$store.commit("changeProductQuery",{keywords:this.keywords}) ;
      //触发vuex中的查询产品信息的方法
      // this.$store.dispatch("getProductList");
      //从当前搜索框失去焦点
      document.activeElement.blur();
      //清空搜索框输入内容
      this.keywords = "";
      this.$router.push("/product");
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.title-bar {
  width: 100%;
  position: fixed;
  height: 2.75rem;
  .mint-searchbar-core::-ms-input-placeholder {
    text-align: center;
  }
  .mint-searchbar-core::-webkit-input-placeholder {
    text-align: center;
  }
  .mint-searchbar-inner {
    .mintui-search {
      font-size: 1rem !important;
      color: #aaa !important;
    }
  }
  .mint-searchbar-core {
    padding-left: 0.4rem;
  }
  .mint-searchbar {
    background: #00c17b;
  }
  a:not([href]):not([tabindex]) {
    color: #fff;
  }
}
</style>
