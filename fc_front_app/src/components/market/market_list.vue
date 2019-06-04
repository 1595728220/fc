<template>
  <div ref="fatherScroll" class="market-list pr">
    <infi-scroll>
      <div v-for="(item,index) of productList" :key="index">
        <market-item :productItem="item" :origin="origin"></market-item>
      </div>
    </infi-scroll>
    <scroll-top :top="top" @backTop="initTop"></scroll-top>
  </div>
</template>
<script>
import ScrollTop from "../common/scrollTop";
import InfiScroll from "../common/infiScroll";
import MarketItem from "./market_item";
export default {
  props: {
    query: { Type: Object, default: {} },
    origin:{ default:"" }
  },
  data() {
    return {
      top: 0
    };
  },
  created() {
    window.addEventListener("scroll", this.saveTop, true);
    //先初始化参数，防止干扰
    this.$store.commit("initProductQuery");
    //修改参数
    this.$store.commit("changeProductQuery", this.query);
    // this.$store.dispatch("getProductList");
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
    }
  },
  computed: {
    productList() {
      return this.$store.state.productList;
    }
  },
  components: {
    "scroll-top": ScrollTop,
    "infi-scroll": InfiScroll,
    "market-item": MarketItem
  }
};
</script>
<style lang="scss" scoped>
.market-list {
  max-height: 83vh;
  overflow-y: auto;
}

</style>
