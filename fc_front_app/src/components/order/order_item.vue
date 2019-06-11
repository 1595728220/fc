<template>
  <div class="order-item">
    <div class="left-img">
      <img :src="baseSrc+productItem.photo1">
    </div>
    <div class="text-right">
      <div class="described">{{productItem.described}}</div>
      <div class="price">{{productItem.total|money}}</div>
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
  }
};
</script>
<style lang="scss" scoped>
.order-item {
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
  }
}
</style>
