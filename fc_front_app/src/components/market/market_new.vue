<template>
  <div ref="fatherScroll" class="market-new pr">
    <p>新品</p>
    <scroll-top :top="top" @backTop="initTop"></scroll-top>
  </div>
</template>
<script>
import ScrollTop from "../common/scrollTop";
import InfiScroll from "../common/infiScroll";
export default {
  data() {
    return {
      top: 0
    };
  },
  created() {
    window.addEventListener("scroll", this.saveTop, true);
    this.$store.commit("changeProductQuery", { keywords: this.keywords });
    this.$store.dispatch("getProductList");
  },
  methods: {
    initTop() {
      console.log("回到顶部");
      this.top = 0;
      this.$refs.fatherScroll.scrollTop = 0;
    },
    //保存当前滚动的距离
    saveTop(e) {
      this.top = e.target.scrollTop;
      // console.log(this.top)
    },
  },
  computed: {
    productList() {
      return this.$store.state.productList;
    }
  },
  watch: {},
  components: {
    "scroll-top": ScrollTop,
    "infi-scroll": InfiScroll
  }
};
</script>
<style lang="scss" scoped>
.market-new {
  max-height: 100vh;
  overflow-y: auto;
  /deep/ p{
    height: 1000px;
  }
}
</style>
