<template>
  <div>
    <div>
      <mt-navbar v-model="selected" fixed class="mynavbar">
        <mt-tab-item id="新品" >新品</mt-tab-item>
        <mt-tab-item id="热销" >热销</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="新品" v-if="selected === '新品'">
        <market-new></market-new>
      </mt-tab-container-item>
      <mt-tab-container-item id="热销" v-if="selected === '热销'">
        <market-hot></market-hot>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import marketHot from "./market_hot"
import marketNew from "./market_new"
export default {
  data() {
    return {
      selected: "新品"
    };
  },
  components:{
    "market-hot":marketHot,
    "market-new":marketNew
  },
};
</script>
<style lang="scss" scoped>
.mint-navbar .mint-tab-item.is-selected{
  border-bottom-color:#00c17b;
  color:#00c17b;
}
.mint-navbar .mint-tab-item{
  padding:0.5rem 0;
}
/deep/ .mint-tab-item-label{
  font-size:1.5rem;
}
.mint-navbar{
  margin-top:2.75rem;
}
.mint-tab-container{
  margin-top:2.5rem;
}
</style>
