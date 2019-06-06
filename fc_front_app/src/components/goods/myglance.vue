<template>
  <div class="my-glance">
    <div v-for="(obj,index) of productList" :key="index">
      <goods-item :productItem="obj"></goods-item>
    </div>
  </div>
</template>
<script>
import GoodsItem from "./goods_item"
export default {
  data() {
    return {
      productList:[]
    }
  },
  mounted() {
    this.$axios.get("/order/get_browse").then(result=>{
      this.productList = result.data.data
      // console.log(this.productList)
    })
  },
  components:{
    "goods-item":GoodsItem
  }
}
</script>
<style lang="scss" scoped>
.my-glance{
  height:100vh;
  padding-bottom:120px;
  overflow: auto;
}
</style>
