<template>
  <div>
    <div
      class="product-area"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="moreLoading"
      infinite-scroll-immediate-check="false"
      infinite-scroll-distance="10"
      @scroll.native="saveTop"
    >
    
      <slot></slot>
      <div class="more_loading">
          <mt-spinner type="snake" color="#00c17b" :size="20" v-show="moreLoading && !allLoaded"></mt-spinner>
          <span v-show="allLoaded">已全部加载</span>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      moreLoading: false,
      allLoaded: false,
      page: {
        pno: 1,
        size: 6
      },
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
          this.page.size += 6;
          //将关键词发送到vuex中
          this.$store.commit("changeProductQuery", this.page);
          //触发vuex中的查询产品信息的方法
          this.$store.dispatch("getProductList");
        }
      }, 1000);
    },
  },
  watch: {
    //监听产品列表信息，如果有新数据则触发操作
    productList() {
      console.log("产品列表信息更新");
      //将本次查询的数据拼接到本地数组
      // this.localProductList = this.localProductList.concat(this.productList);
      // this.localProductList = this.productList;
      //启用无限滚动
      this.moreLoading = false;
      console.log(
        "moreLoading:" +
          this.moreLoading +
          "数据：" +
          this.productList.length +
          "/" +
          this.totalProduct
      );
      //如果本地的数据条数不小于总记录条数
      if (this.productList.length >= this.totalProduct) {
        console.log("已经超出总产品记录数");
        //禁用无限滚动
        this.moreLoading = true;
        //数据全部加载
        this.allLoaded = true;
      }
    }
  },
  created() {
    // this.$store.commit("initProductQuery");
  },
  mounted() {
    //挂载后触发vuex中的查询产品信息的方法
    this.$store.dispatch("getProductList");
  },
  destroyed() {
    //组件销毁后初始化查询参数
    // this.$store.commit("initProductQuery");
  }
};
</script>
<style lang="scss" scoped>
.product-area {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.25rem;
    .more_loading {
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
