<template>
  <div class="immediately-buy">
    <my-collect :productItem="productItem"></my-collect>
    <mt-button type="primary" class="my-button" @click.native="goToOrder">立即购买</mt-button>
  </div>
</template>
<script>
import Collect from "../common/collect";
export default {
  props: {
    // pid: { default: "" }
  },
  data() {
    return {};
  },
  components: {
    "my-collect": Collect
  },
  computed: {
    //根据当前产品id取出产品总列表中对应的数据
    productItem() {
      return this.$store.state.productDetail
    },
    pid(){
      return this.$store.state.productId
    }
  },
  created() {

  },
  methods: {
    goToOrder() {
      this.$router.push({
        path: "/order",
        query: { pid: this.productItem.pid }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.immediately-buy {
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  .my-button {
    // margin-right:1rem;
    border-radius: 0;
    line-height: 2.5625rem;
  }
  .mint-button--primary {
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
</style>
