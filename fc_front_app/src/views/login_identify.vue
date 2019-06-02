<template>
  <div class="identify">
    <back-bar back="/login"></back-bar>
    <h3>输入验证码</h3>
    <div>
      <span>time秒内短信会到到达您的手机</span>
      <span></span>
    </div>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
export default {
  data() {
    return {
      timer: "",
      time: 60
    };
  },
  components: { "back-bar": BackBar }
};
</script>
<style lang="scss" scoped>
</style>
