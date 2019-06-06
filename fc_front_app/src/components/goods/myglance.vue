<template>
  <div class="my-glance">
    <div v-for="(obj,index) of productList" :key="index">
      <goods-item :productItem="obj"></goods-item>
    </div>
    <span v-show="!productList">暂无浏览记录</span>
    <mt-button @click.native="clearAll" class="clear-all" v-show="!!productList">清空所有浏览记录</mt-button>
  </div>
</template>
<script>
import GoodsItem from "./goods_item";
export default {
  data() {
    return {
      productList: []
    };
  },
  methods: {
    clearAll() {
      this.$messagebox({
        message: "是否删除所有浏览记录",
        showConfirmButton: true,
        showCancelButton: true
      }).then(action => {
        if (action === "confirm")
          this.$axios.get("/order/remove_browse").then(result => {
            this.$toast(result.data.msg);
            this.getProductList()
          });
      });
    },
    getProductList() {
      this.$axios.get("/order/get_browse").then(result => {
        this.productList = result.data.data;
        // console.log(this.productList)
      });
    }
  },
  mounted() {
    this.getProductList()
  },
  components: {
    "goods-item": GoodsItem
  }
};
</script>
<style lang="scss" scoped>
.my-glance {
  height: 100vh;
  padding-bottom: 120px;
  overflow: auto;
  text-align: center;
}
.mint-button--normal{
  outline:none;
  line-height: 41px;
}
</style>
