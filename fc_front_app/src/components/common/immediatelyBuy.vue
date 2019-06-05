<template>
  <div class="immediately-buy">
    <my-collect :productItem="productItem"></my-collect>
    <mt-button type="primary" class="my-button" >立即购买</mt-button>
  </div>
</template>
<script>
import Collect from "../common/collect";
export default {
  props: {
    pid: { default: "" }
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
      return this.$store.state.productList.filter(el => el.pid == this.pid)[0];
    }
  },
  mounted() {
    // this.$store.dispatch("getProductList");
    console.log(this.productItem)
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.immediately-buy {
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  display:flex;
  justify-content: space-between;
  padding-left:1rem;
  .my-button{
    // margin-right:1rem;
    border-radius: 0;
    line-height: 2.5625rem;
  }
}
</style>
