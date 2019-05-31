<template>
  <div class="product-detail">
    <!-- <h1>产品详情</h1> -->
    <img v-lazy="baseSrc+productItem.photo1" class="img">
    <div class="described">{{productItem.described}}</div>
    <div class="price">￥{{productItem.price.toFixed(2)}}</div>
  </div>
</template>
<script>
export default {
  props: {
    productItem: { default: {} }
  },
  data() {
    return {};
  },
  computed: {
    baseSrc() {
      return this.$store.state.productServerAdd;
    }
  }
};
</script>
<style lang="scss" scoped>
.product-detail {
  .img {
    width: 100%;
  }
  .described,.price {
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }
  .described{
    color:#555;
  }
  .price{
    color:#00c17b
  }
}
</style>
