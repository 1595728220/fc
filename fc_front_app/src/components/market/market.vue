<template>
  <div>
    <div>
      <mt-navbar v-model="selected" fixed class="mynavbar">
        <mt-tab-item id="新品" >新品</mt-tab-item>
        <mt-tab-item id="热销" >热销</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="新品" >
        <market-list :query="xinpin" v-if="selected === '新品'" origin="新品"></market-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="热销" >
        <market-list :query="rexiao" v-if="selected === '热销'" origin="热销"></market-list>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import marketList from "./market_list"
// import marketNew from "./market_new"
export default {
  data() {
    return {
      selected: "新品",
      rexiao:{rexiao:true},
      xinpin:{xinpin:true}
    };
  },
  components:{
    "market-list":marketList,
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
