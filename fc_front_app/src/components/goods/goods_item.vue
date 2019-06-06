<template>
  <div class="market-item">
    <div  class="left-img">
      <img :src="baseSrc+productItem.photo1">
    </div>
    <div class="text-right">
      <div class="described">{{productItem.described}}</div>
      <div class="price">{{productItem.price|money}}</div>
      <div class="bottom">
        <div class="goods-time">
          <span v-show="productItem.coll_time">收藏于：{{productItem.coll_time|monthDate}}</span>
          <span v-show="productItem.brow_time">浏览于：{{productItem.brow_time|monthDate}}</span>
        </div>
        <mt-button type="primary" @click.native="goToOrder">立即购买</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    productItem: { Type: Object, default: {} }
  },
  data() {
    return {};
  },
  computed: {
    baseSrc() {
      return this.$store.state.productServerAdd;
    }
  },
  methods: {
    goToOrder() {
      this.$router.push({
        path: "/order",
        query: { pid: this.productItem.pid }
      });
    },
    // goToDetail(){
    //   this.$router.push({
    //     path: "/detail",
    //     query: { pid: this.productItem.pid },
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
.market-item {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  .left-img {
    width: 40%;
    img {
      width: 100%;
    }
  }
  .text-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 0.5rem;
    width: 55%;
    .described {
      text-align: left;
    }
    .price {
      color: #00c17b;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .goods-time {
        font-size: 0.5rem;
      }
      .mint-button--primary {
        background-color: #00c17b;
        line-height: 41px;
        font-size: 0.8rem;
        background-color: #00c17b;
        opacity: 1;
        &:active {
          background-color: #00c17b;
          opacity: 0.9;
          outline: 0;
          &:after {
            background-color: #00c17b;
          }
        }
      }
    }
  }
}
</style>
