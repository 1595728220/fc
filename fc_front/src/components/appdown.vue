<template>
  <div>
    <div class="down_area text-center mb-5">
      <img src="../assets/imgs/header/logo.png" class="mt-3">
      <p class="mt-3 text-center">对庄翡翠，100万用户都在</p>
      <img src="../assets/imgs/download/downapp.png" class="mb-3">
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      tuwen: [
        {
          tu: require("../assets/imgs/download/550.jpg"),
          wen_title: "文案文案文案文案文案文案",
          wen_detail:
            "我是文案我是文案我是文案我是文案我是文案我是文案我是文案我是文案"
        },
        {
          tu: require("../assets/imgs/download/551.jpg"),
          wen_title: "文案文案文案文案文案文案",
          wen_detail:
            "我是文案我是文案我是文案我是文案我是文案我是文案我是文案我是文案"
        },
        {
          tu: require("../assets/imgs/download/552.jpg"),
          wen_title: "文案文案文案文案文案文案",
          wen_detail:
            "我是文案我是文案我是文案我是文案我是文案我是文案我是文案我是文案"
        },
        {
          tu: require("../assets/imgs/download/553.jpg"),
          wen_title: "文案文案文案文案文案文案",
          wen_detail:
            "我是文案我是文案我是文案我是文案我是文案我是文案我是文案我是文案"
        },
        {
          tu: require("../assets/imgs/download/554.jpg"),
          wen_title: "文案文案文案文案文案文案",
          wen_detail:
            "我是文案我是文案我是文案我是文案我是文案我是文案我是文案我是文案"
        }
      ]
    };
  }
};
</script>
<style scoped>
.down_area {
  font-size: 1.875rem;
  font-weight: bold;
  background: #ddd;
}
.down_area > img:first-child {
  border-radius: 0.875rem;
}
</style>
