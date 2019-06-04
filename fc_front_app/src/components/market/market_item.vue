<template>
  <div class="market-item">
    <img v-lazy="baseSrc+productItem.photo1" class="img" @click="goToDetail">
  </div>
</template>
<script>
export default {
  props: {
    productItem: { Type: Object, default: {} },
    origin: { default: "" }
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
    goToDetail() {}
  }
};
</script>
<style lang="scss" scoped>
.market-item {
  display: flex;
  justify-content: space-between;
  .img {
    width:100%;
  }
}
</style>
