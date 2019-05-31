<template>
  <div class="product">
    <back-bar title="产品" back="/"></back-bar>
    <div class="hinder"></div>
    <!-- <h1>产品页面</h1> -->
    <div class="product-area">
      <div v-for="(item,index) of productList" :key="index" class="product-item">
        <product-item :productItem="item"></product-item>
      </div>
    </div>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
import ProductItem from "../components/product/product_item";
export default {
  data() {
    return {};
  },
  computed: {
    //获取产品列表信息
    productList() {
      return this.$store.state.productList;
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
    .product-item{
      width:49%;
    }
  }
}
</style>