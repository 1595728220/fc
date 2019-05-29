<template>
  <div>
    <h1>首页页面</h1>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="market">
        <my-market></my-market>
      </mt-tab-container-item>
      <mt-tab-container-item id="goods">
        <my-goods></my-goods>
      </mt-tab-container-item>
      <mt-tab-container-item id="personal">
        <my-personal></my-personal>
      </mt-tab-container-item>
    </mt-tab-container>
    <span class=" icon iconfont icon-shangpin"></span>
  </div>
</template>
<script>
import Market from "../components/market/market.vue"
import Goods from "../components/goods/goods.vue"
import Personal from "../components/personal/personal.vue"
export default {
  data() {
    return {
      selected:"market"
    }
  },
  components:{
    "my-market":Market,
    "my-goods":Goods,
    "my-personal":Personal
  },
}
</script>
<style lang="scss" scoped>

</style>
