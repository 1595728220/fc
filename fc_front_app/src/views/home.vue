<template>
  <div class="contanier">
    <h1>首页页面</h1>
    <!-- 首页面板 -->
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
    <!-- 底部导航栏 -->
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="market">
        <span
          class="icon iconfont"
          :class="selected === 'market' ? 'icon-shangpin' : 'icon-shangpin-xianxing'"
        ></span>
        逛市场
      </mt-tab-item>
      <mt-tab-item id="goods">
        <span
          class="icon iconfont"
          :class="selected === 'goods' ? 'icon-shoucang' : 'icon-shoucang-xianxing'"
        ></span>
        我的宝贝
      </mt-tab-item>
      <mt-tab-item id="personal">
        <span
          class="icon iconfont"
          :class="selected === 'personal' ? 'icon-yonghu' : 'icon-yonghu-xianxing'"
        ></span>
        个人中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import Market from "../components/market/market.vue";
import Goods from "../components/goods/goods.vue";
import Personal from "../components/personal/personal.vue";
export default {
  data() {
    return {
      selected: "market"
    };
  },
  components: {
    "my-market": Market,
    "my-goods": Goods,
    "my-personal": Personal
  }
};
</script>
<style lang="scss" scoped>
.mint-tabbar {
  .mint-tab-item.is-selected {
    color: #00c17b;
  }
}
</style>
