<template>
  <div>
    <div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="新品">新品</mt-tab-item>
        <mt-tab-item id="热销">热销</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="新品">
        新品
      </mt-tab-container-item>
      <mt-tab-container-item id="热销">
        热销
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "新品"
    };
  }
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
</style>
