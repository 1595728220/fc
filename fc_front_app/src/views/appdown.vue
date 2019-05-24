<template>
  <div>
    <div class="down_area text-center mb-5">
      <img src="imgs/header/logo.png" class="mt-5">
      <p class="mt-3 text-center">对庄翡翠，100万用户都在</p>
      <img src="imgs/download/downapp.png" class="mb-5">
    </div>
    <mytuwen :mymsg="tuwen"></mytuwen>
  </div>
</template>
<script>
import { Script } from 'vm';
export default {
  data() {
    return {
      tuwen: [
        {
          tu: "550.jpg",
          wen_title: "文案文案文案文案文案文案",
          wen_detail:
            "我是文案我是文案我是文案我是文案我是文案我是文案我是文案我是文案"
        },
        {
          tu: "551.jpg",
          wen_title: "文案文案文案文案文案文案",
          wen_detail:
            "我是文案我是文案我是文案我是文案我是文案我是文案我是文案我是文案"
        },
        {
          tu: "552.jpg",
          wen_title: "文案文案文案文案文案文案",
          wen_detail:
            "我是文案我是文案我是文案我是文案我是文案我是文案我是文案我是文案"
        },
        {
          tu: "553.jpg",
          wen_title: "文案文案文案文案文案文案",
          wen_detail:
            "我是文案我是文案我是文案我是文案我是文案我是文案我是文案我是文案"
        },
        {
          tu: "554.jpg",
          wen_title: "文案文案文案文案文案文案",
          wen_detail:
            "我是文案我是文案我是文案我是文案我是文案我是文案我是文案我是文案"
        }
      ]
    };
  }
};
</script>
<style scoped lang="scss">
.down_area {
  font-size: 1.875rem;
  font-weight: bold;
  background: #ddd;
  img:first-child {
    border-radius: 0.875rem;
  }
}
</style>
