<template>
  <div class="market-item">
    <div @click="goToDetail" class="left-img">
      <img v-lazy="baseSrc+productItem.photo1">
    </div>
    <div class="text-right">
      <div class="described">{{productItem.described}}</div>
      <div class="price">{{productItem.price|money}}</div>
      <div class="bottom">
        <span v-show="origin==='新品'">{{productItem.shelf_time|monthDate}}</span>
        <span v-show="origin==='热销'">月售:{{productItem.month_buy|toWan}}</span>
        <!-- <div
          class="icon iconfont shoucang"
          :class="productItem.collect ? 'icon-xihuan' :'icon-xihuan-xianxing' "
          @click="addCollect"
        >
        <span>收藏</span>
        </div> -->
        <my-collect :productItem="productItem"></my-collect>
      </div>
    </div>
  </div>
</template>
<script>
import Collect from "../common/collect"
export default {
  props: {
    productItem: { Type: Object, default: {} },
    origin: { default: "" }
  },
  data() {
    return {};
  },
  computed: {
    baseSrc() {
      return this.$store.state.productServerAdd;
    }
  },
  methods: {
    goToDetail() {
      this.$router.push({
        path: "/detail",
        query: { pid: this.productItem.pid }
      });
    },
    //添加收藏
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
  components:{
    "my-collect":Collect
  }
};
</script>
<style lang="scss" scoped>
.market-item {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  .left-img {
    width: 40%;
    img {
      width: 100%;
    }
  }
  .text-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right:0.5rem;
    width: 55%;
    .described {
      text-align: left;
    }
    .price {
      color: #00c17b;
    }
    .bottom {
      display:flex;
      justify-content: space-between;
      align-items: center;
      // .shoucang {
      //   color: #f30213;
      //   display:flex;
      //   align-items: center;
      //   span{
      //     color:#000;
      //     font-size:0.85rem;
      //   }
      // }
    }
  }
}
</style>
