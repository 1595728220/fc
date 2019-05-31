<template>
  <div>
    <back-bar title="产品详情" back="/product"></back-bar>
    <div class="hinder"></div>
    <h1>产品详情页面</h1>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar"
export default {
  data() {
    return {

    };
  },
  created() {
    console.log(this.$route.params.pid)
  },
  components:{
    "back-bar":BackBar
  }
};
</script>
<style lang="scss" scoped>
</style>
