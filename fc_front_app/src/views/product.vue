<template>
  <div>
    <div
      class="product pr"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="moreLoading"
      infinite-scroll-immediate-check="false"
      infinite-scroll-distance="0"
      @scroll.native="saveTop"
      ref="fatherScroll"
    >
      <back-bar title="产品" back="/"></back-bar>
      <div class="hinder"></div>
      <!-- <h1>产品页面</h1> -->
      <my-scroll :data="localProductList">
        <div class="product-area">
          <div v-for="(item,index) of localProductList" :key="index" class="product-item">
            <product-item :productItem="item"></product-item>
          </div>
          <div class="more_loading">
            <mt-spinner type="snake" color="#00c17b" :size="20" v-show="moreLoading && !allLoaded"></mt-spinner>
            <span v-show="allLoaded">已全部加载</span>
          </div>
        </div>
      </my-scroll>
      <scroll-top :top="top" @backTop="initTop"></scroll-top>
    </div>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
import ProductItem from "../components/product/product_item";
import ScrollTop from "../components/common/scrollTop";
export default {
  data() {
    return {
      moreLoading: false,
      allLoaded: false,
      page: {
        pno: 1,
        size: 6
      },
      localProductList: [],
      top: 0,
      pull:true,
    };
  },
  computed: {
    //获取产品列表信息
    productList() {
      return this.$store.state.productList;
    },
    //获取条件查询的商品的总记录数
    totalProduct() {
      return this.$store.state.totalQueryProduct;
    }
  },
  methods: {
    loadMore() {
      console.log("正在加载更多数据" + (this.page.pno + 1));
      this.moreLoading = true;
      console.log("moreLoading:" + this.moreLoading);
      setTimeout(() => {
        //人为延长数据加载时间，仅测试使用
        //如果数据全部加载
        if (this.allLoaded) {
          //禁用无限滚动
          this.moreLoading = true;
        } else {
          //查询的页数++
          this.page.pno++;
          //将关键词发送到vuex中
          this.$store.commit("changeProductQuery", this.page);
          //触发vuex中的查询产品信息的方法
          this.$store.dispatch("getProductList");
        }
      }, 2000);
    },
    //保存当前滚动的距离
    saveTop(e) {
      this.top = e.target.scrollTop;
      // console.log(this.top)
    },
    //无动画的返回顶部
    initTop() {
      console.log("回到顶部");
      this.top = 0;
      // console.log(this.aBScroll);
      // this.aBScroll.scrollTo(0, 0);
      this.$refs.fatherScroll.scrollTop = 0
    },
    loadData(){
      console.log("加载数据")
    }

  },
  created() {
    window.addEventListener("scroll", this.saveTop, true);
  },
  components: {
    "back-bar": BackBar,
    "product-item": ProductItem,
    "scroll-top": ScrollTop
  },
  watch: {
    //监听产品列表信息，如果有新数据则触发操作
    productList() {
      console.log("产品列表信息更新");
      //将本次查询的数据拼接到本地数组
      this.localProductList = this.localProductList.concat(this.productList);
      //启用无限滚动
      this.moreLoading = false;
      console.log(
        "moreLoading:" +
          this.moreLoading +
          "数据：" +
          this.localProductList.length +
          "/" +
          this.totalProduct
      );
      //如果本地的数据条数不小于总记录条数
      if (this.localProductList.length >= this.totalProduct) {
        console.log("已经超出总产品记录数");
        //禁用无限滚动
        this.moreLoading = true;
        //数据全部加载
        this.allLoaded = true;
      }
    }
  },
  mounted() {
    //挂载后触发vuex中的查询产品信息的方法
    this.$store.dispatch("getProductList");
  },
  destroyed() {
    //组件销毁后初始化查询参数
    this.$store.commit("initProductQuery");
  }
};
</script>
<style lang="scss" scoped>
.product {
  max-height: 100vh;
  overflow-y: auto;
  .product-area {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.25rem;
    .product-item {
      width: 49%;
    }
    .more_loading {
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>