<template>
  <div class="not-found">
    <back-bar title="404" back="/"></back-bar>
    <div class="hinder"></div>
    <img v-lazy="imgSrc">
    <h1>{{time}}秒后返回首页</h1>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
export default {
  data() {
    return {
      time: 5,
      timer: null,
      imgSrc:"imgs/404/404.jpg"
    };
  },
  created() {
    this.timer = setInterval(() => {
      // console.log("notfound网页中的定时器运行中，剩余时间"+this.time)
      this.time--;
      if (this.time < 1) {
        clearInterval(this.timer);
        this.timer = null;
        this.$router.push({
          path: "/"
        });
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    "back-bar": BackBar
  }
};
</script>
<style scoped lang="scss">
.not-found{
  img{
    width:100%;
  }
  h1{
    color:#00c17b;
    text-align:center
  }
}
</style>