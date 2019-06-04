<template>
  <div class="item">
    <!-- <h1>产品详情</h1> -->
    <img v-lazy="baseSrc+productItem.photo1" class="img" @click="goToDetail">
    <div class="described">{{productItem.described}}</div>
    <div class="price">
      <span class="text">￥{{productItem.price.toFixed(2)}}</span>
      <!-- <span
        class="icon iconfont shoucang"
        :class="productItem.collect ? 'icon-xihuan' :'icon-xihuan-xianxing' "
        @click="addCollect"
      ></span> -->
      <my-collect :productItem="productItem"></my-collect>
    </div>
  </div>
</template>
<script>
import Collect from "../common/collect"
export default {
  props: {
    productItem: { default: {} }
  },
  data() {
    return {};
  },
  methods: {
    //跳转到商品详情页
    goToDetail() {
      this.$router.push({
        name: "product_detail",
        params: { pid: this.productItem.pid }
      });
    },
    // //添加收藏
    // addCollect() {
    //   //发送请求添加收藏记录
    //   if (this.productItem.collect) {
    //     console.log("取消收藏")
    //     this.$axios.get("/order/remove_collect",{
    //       params:{pid:this.productItem.pid}
    //     }).then(result=>{
    //       if (result.data.code === 200) {
    //           //取消收藏成功
    //           this.$toast({
    //             message: result.data.msg,
    //             position: "middle",
    //             duration: 1000
    //           });
    //           //获取最新的数据
    //           this.$store.dispatch("getProductList");
    //         } else {
    //           //取消收藏失败
    //           this.$toast({
    //             message: result.data.msg,
    //             position: "middle",
    //             duration: 1500
    //           });
    //         }
    //     })
    //   } else {
    //     this.$axios
    //       .get("/order/add_collect", {
    //         params: { pid: this.productItem.pid }
    //       })
    //       .then(result => {
    //         if (result.data.code === 200) {
    //           //收藏成功
    //           this.$toast({
    //             message: result.data.msg,
    //             position: "middle",
    //             duration: 1000
    //           });
    //           //获取最新的数据
    //           this.$store.dispatch("getProductList");
    //         } else {
    //           //收藏失败
    //           this.$toast({
    //             message: result.data.msg,
    //             position: "middle",
    //             duration: 1500
    //           });
    //         }
    //       });
    //   }
    // }
  },
  computed: {
    //获取产品图片保存的路径
    baseSrc() {
      return this.$store.state.productServerAdd;
    }
  },
  components:{
    "my-collect":Collect
  }
};
</script>
<style lang="scss" scoped>
.item {
  .img {
    width: 100%;
  }
  .described,
  .price {
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
    padding: 0 0.25rem;
  }
  .described {
    color: #555;
  }
  .price {
    .text {
      color: #00c17b;
    }
    // .shoucang {
    //   color: #f30213;
    // }
    display: flex;
    justify-content: space-between;
  }
}
</style>
