<template>
  <div class="product-detail" ref="fatherScroll">
    <back-bar title="产品详情" back="/product"></back-bar>
    <div class="hinder"></div>

    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item,index) of imgList" :key="index">
        <img :src="baseSrc+item" class="detail-img" v-if="!!item">
      </mt-swipe-item>
    </mt-swipe>
    <div class="info">
      <div>{{product_detail.described}}，质量优良，品质有保障，欲购从速！</div>
      <div>货号：{{product_detail.artNo}}</div>
      <div>价格：<span>{{product_detail.price|money}}</span></div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="详情">详情</mt-tab-item>
      <mt-tab-item id="评价">评价</mt-tab-item>
      <mt-tab-item id="保障">保障</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="详情">
        <mt-cell v-for="n in 10" :title="'content ' + n"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="评价">
        <mt-cell v-for="n in 4" :title="'content ' + n"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="保障">
        <img v-lazy="baseSrc+product_detail.promise">
      </mt-tab-container-item>
    </mt-tab-container>
    <scroll-top :top="top" @backTop="initTop"></scroll-top>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
import ScrollTop from "../components/common/scrollTop";
export default {
  data() {
    return {
      product_detail: {},
      selected: "详情",
      top: 0
    };
  },
  computed: {
    //获取产品图片保存的路径
    baseSrc() {
      return this.$store.state.productServerAdd;
    },
    imgList() {
      let { photo1, photo2, photo3, photo4 } = this.product_detail;
      return [photo1, photo2, photo3, photo4];
    }
  },
  created() {
    window.addEventListener("scroll", this.saveTop, true);
    console.log(this.$route.query.pid);
    let pid = this.$route.query.pid;
    if (pid) {
      this.$axios.get("/order/add_browse", {
        params: { pid }
      });
      this.$axios
        .get("/product/detail", {
          params: { pid }
        })
        .then(result => {
          // console.log(result);
          this.product_detail = result.data[0];
          console.log(this.product_detail);
        });
    }
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
  components: {
    "back-bar": BackBar,
    "scroll-top": ScrollTop
  }
};
</script>
<style lang="scss" scoped>
.product-detail {
  background: #eee;
  max-height: 100vh;
  overflow: auto;
  .mint-swipe {
    max-width: 100vw;
    height: 100vw;
    .detail-img {
      width: 100%;
    }
  }
  .info {
    background: #fff;
    padding: 0.7rem 0.3rem;
    div:first-child{
      padding-bottom:0.5rem;
    }
    div:nth-child(2){
      color:#666;
    }
    div:last-child{
      color:#00c17b;
      span{
        font-size:1.5rem;
      }
    }
  }
  .mint-navbar {
    margin-top: 1rem;
    border-bottom: 3px solid #ddd;
    .mint-tab-item.is-selected {
      border-bottom: 3px solid #00c17b;
      color: #00c17b;
      font-size: 1rem;
    }
    .mint-tab-item {
      padding: 0.7rem 0;
    }
  }
  /deep/ .mint-tab-item-label {
    font-size: 1rem;
  }
}
</style>
