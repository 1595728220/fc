<template>
  <div class="page-tabbar clear">
    <title-bar></title-bar>
    <!-- 首页面板 -->
    <div class="hinder">
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
        <mt-tab-container-item id="sort">
          <my-sort></my-sort>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 底部导航栏 -->
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="market">
        <span
          class="icon iconfont"
          :class="selected === 'market' ? 'icon-shangpin' : 'icon-shangpin-xianxing'"
        ></span>
        逛市场
      </mt-tab-item>
      <mt-tab-item id="sort">
        <span class="icon iconfont icon-gonggeshitu"></span>
        分类
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
  <!-- </div> -->
</template>
<script>
import Market from "../components/market/market.vue";
import Goods from "../components/goods/goods.vue";
import Personal from "../components/personal/personal.vue";
import Sort from "../components/search/sort.vue";
import TitleBar from "../components/common/titlebar.vue";
export default {
  data() {
    return {
      //当前显示的面板id
      selected: "market"
    };
  },
  components: {
    "my-market": Market,
    "my-goods": Goods,
    "my-personal": Personal,
    "my-sort": Sort,
    "title-bar": TitleBar
  },
  created() {
    this.selected = this.$store.state.home_selected
  },
  watch: {
    selected(){
      this.$store.commit("setHomeSelected",this.selected)
    }
  },
};
</script>
<style lang="scss" scoped>
.page-tabbar {
  .mint-tabbar {
    .mint-tab-item.is-selected {
      color: #00c17b;
    }
  }
}
</style>
