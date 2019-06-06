<template>
  <div class="goods">
    <div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="glance">浏览过的</mt-tab-item>
        <mt-tab-item id="collect">我的收藏</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="glance">
        <my-glance></my-glance>
      </mt-tab-container-item>
      <mt-tab-container-item id="collect">
        <my-collect></my-collect>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import MyGlance from "./myglance"
import MyCollect from "./mycollect"
export default {
  data() {
    return {
      selected: "glance"
    };
  },
  components:{
    "my-glance":MyGlance,
    "my-collect":MyCollect
  }
};
</script>
<style lang="scss" scoped>
.goods {
  .mint-navbar .mint-tab-item {
    padding: 0.7rem 0;
    &:first-child {
      border-right: 1px solid #ddd;
    }
    &.is-selected {
      color: #00c17b;
      border-bottom-color: #00c17b;
    }
    /deep/ .mint-tab-item-label {
      font-size: 1rem;
    }
  }
}
</style>
