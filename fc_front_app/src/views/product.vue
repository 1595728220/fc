<template>
  <div
    class="product"
    v-infinite-scroll="loadMore"
    infinite-scroll-distance="6"
  >
    <back-bar title="产品" back="/"></back-bar>
    <div class="hinder"></div>
    <!-- <h1>产品页面</h1> -->
    <div class="product-area">
      <div v-for="(item,index) of localProductList" :key="index" class="product-item">
        <product-item :productItem="item"></product-item>
      </div>
      <div class="more_loading" v-show="!queryLoading">
        <mt-spinner type="snake" color="#00c17b" :size="20" v-show="moreLoading && !allLoaded"></mt-spinner>
        <span v-show="allLoaded">已全部加载</span>
      </div>
    </div>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
import ProductItem from "../components/product/product_item";
export default {
  data() {
    return {
      queryLoading: false,
      moreLoading: false,
      allLoaded: false,
      page: {
        pno: 1,
        pageSize: 6
      },
      localProductList: []
    };
  },
  computed: {
    //获取产品列表信息
    productList() {
      return this.$store.state.productList;
    },
    //获取条件查询的商品的总记录数
    totalProduct(){
      return this.$store.state.totalQueryProduct
    }
  },
  methods: {
    loadMore() {
      console.log("正在加载更多数据")
      if(this.allLoaded){
        return false
      }
      //查询的页数++
      this.page.pno++;
      //将关键词发送到vuex中
      this.$store.commit("changeProductQuery", this.page);
      //触发vuex中的查询产品信息的方法
      this.$store.dispatch("getProductList");
    }
  },
  components: {
    "back-bar": BackBar,
    "product-item": ProductItem
  },
  watch: {
    //监听产品列表信息
    productList() {
      console.log("产品列表信息更新");
      this.localProductList = this.localProductList.concat(this.productList);
      console.log(this.localProductList.length >= this.totalProduct)
      if(this.localProductList.length === this.totalProduct){
        this.allLoaded = true
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.product {
  .product-area {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.25rem;
    .product-item {
      width: 49%;
    }
  }
}
</style>