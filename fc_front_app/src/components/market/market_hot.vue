<template>
  <div>
    <div ref="fatherScroll" class="market-hot pr">
      <infi-scroll>
        <div v-for="(item,index) of productList" :key="index">
          <market-item :productItem="item"></market-item>
        </div>
      </infi-scroll>
      <scroll-top :top="top" @backTop="initTop"></scroll-top>
    </div>
  </div>
</template>
<script>
import ScrollTop from "../common/scrollTop";
import InfiScroll from "../common/infiScroll";
import MarketItem from "./market_item"
export default {
  data() {
    return {
      top: 0
    };
  },
  created() {
    window.addEventListener("scroll", this.saveTop, true);
    this.$store.commit("initProductQuery")
    this.$store.commit("changeProductQuery", { rexiao: true })
    // this.$store.dispatch("getProductList");
  },
  mounted() {
    
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
  watch: {},
  components: {
    "scroll-top": ScrollTop,
    "infi-scroll": InfiScroll,
    "market-item" : MarketItem,
  }
};
</script>
<style lang="scss" scoped>
.market-hot {
  max-height: 100vh;
  overflow-y: auto;
}
</style>

