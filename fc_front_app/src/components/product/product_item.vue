<template>
  <div class="item" @click="goToDetail">
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
  methods: {
    goToDetail(e){
      this.$router.push({name:"product_detail",params:{pid:this.productItem.pid}})
    }
  },
  computed: {
    baseSrc() {
      return this.$store.state.productServerAdd;
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  .img {
    width: 100%;
  }
  .described,
  .price {
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
    padding:0 0.25rem;
  }
  .described {
    color: #555;
  }
  .price {
    color: #00c17b;
    text-align: right;
  }
}
</style>
