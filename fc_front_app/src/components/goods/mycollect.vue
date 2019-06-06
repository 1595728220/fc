<template>
  <div class="my-collect">
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
    this.$axios.get("/order/get_collect").then(result=>{
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
.my-collect{
  height:100vh;
  overflow: auto;
  padding-bottom:120px;
}
</style>
