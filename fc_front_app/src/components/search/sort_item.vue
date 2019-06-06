<template>
  <div class="sort-item" @click="searchProduct">
    <div :class="`bg-${num}`"></div>
    <div>{{Object.values(sort)[0]}}</div>
  </div>
</template>
<script>
export default {
  props: {
    sort: { default: ""},
    num: { default: "" }
  },
  data() {
    return {};
  },
  methods: {
    //查找对应的产品
    searchProduct(){
      //初始化查询参数
      this.$store.commit("initProductQuery")
      //修改查询参数
      this.$store.commit("changeProductQuery",this.sort)
      //跳转产品页
      this.$router.push("/product")
    }
  },
  mounted() {
    console.log(this.sort)
    // Object.values(JSON.parse(sort))[0]
  },
};
</script>
<style lang="scss" scoped>
.sort-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60px;
  text-align: center;
  margin-right:1rem;
  margin-bottom:1rem;
  .bg-20 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -10px -10px;
  }

  .bg-21 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -90px -10px;
  }

  .bg-22 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -10px -90px;
  }

  .bg-23 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -90px -90px;
  }

  .bg-24 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -170px -10px;
  }

  .bg-31 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -170px -90px;
  }
  .bg-30 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -170px -10px;
  }

  .bg-01 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -170px -90px;
  }

  .bg-10 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -10px -170px;
  }

  .bg-11 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -90px -170px;
  }

  .bg-12 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -170px -170px;
  }

  .bg-13 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -250px -10px;
  }

  .bg-00 {
    width: 60px;
    height: 60px;
    background: url(/imgs/sort/css_sprites.png) -250px -90px;
  }
}
</style>
