<template>
  <div
    class="icon iconfont shoucang"
    :class="productItem.collect ? 'icon-xihuan' :'icon-xihuan-xianxing' "
    @click="addCollect"
  >
    <span v-show="!productItem.collect">收藏</span>
  </div>
</template>
<script>
export default {
  props: {
    productItem: { Type: Object, default: {} }
  },
  data() {
    return {};
  },

  methods: {
    //添加收藏
    addCollect() {
      //发送请求添加收藏记录
      if (this.productItem.collect) {
        console.log("取消收藏");
        this.$axios
          .get("/order/remove_collect", {
            params: { pid: this.productItem.pid }
          })
          .then(result => {
            if (result.data.code === 200) {
              //取消收藏成功
              this.$toast({
                message: result.data.msg,
                position: "middle",
                duration: 1000
              });
              //获取最新的数据
              this.$store.dispatch("getProductList");
            } else {
              //取消收藏失败
              this.$toast({
                message: result.data.msg,
                position: "middle",
                duration: 1500
              });
            }
          });
      } else {
        this.$axios
          .get("/order/add_collect", {
            params: { pid: this.productItem.pid }
          })
          .then(result => {
            if (result.data.code === 200) {
              //收藏成功
              this.$toast({
                message: result.data.msg,
                position: "middle",
                duration: 1000
              });
              //获取最新的数据
              this.$store.dispatch("getProductList");
            } else {
              //收藏失败
              this.$toast({
                message: result.data.msg,
                position: "middle",
                duration: 1500
              });
            }
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.shoucang {
  color: #f30213;
  display: flex;
  align-items: center;
  font-size:1.5rem;
  span {
    margin-left:0.1rem;
    color: #000;
    font-size: 0.85rem;
  }
}
</style>
