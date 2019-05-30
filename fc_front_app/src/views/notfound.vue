<template>
  <div>
    <back-bar title="404" back="/"></back-bar>
    <h1 class="text-center text-danger">404 Not Found!{{time}}秒后返回首页</h1>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
export default {
  data() {
    return {
      time: 5,
      timer: null
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
</style>