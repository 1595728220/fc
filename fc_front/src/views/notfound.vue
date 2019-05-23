<template>
  <h1 class="text-center text-danger">404 Not Found!{{time}}秒后返回首页</h1>
</template>
<script>
export default {
  data() {
    return {
      time: 5,
      timer: null
    };
  },
  mounted() {
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
  }
};
</script>
<style>
</style>