<template>
  <div class="immediately-buy">
    <my-collect :productItem="productItem"></my-collect>
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
}
</style>
