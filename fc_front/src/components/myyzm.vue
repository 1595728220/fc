<template>
  <div v-html="yzmimg" class="col-sm-6 p-0 my_yzm_area" @click="childclick"></div>
</template>
<script>
export default {
  //yzmImg 存放父组件获得的yzm结果字符串
  //fatherfunc存放父组件中的获取验证码方法
  props: ["yzmimg"],
  data() {
    return {};
  },
  methods: {
    childclick(){
      this.$emit("fatherfunc")
    }
  },
};
</script>
<style  lang="scss">
// @media screen and (max-width: 35.9375rem) {
//   .my_yzm_area svg {
//     width: 100% !important;
//     border: .0625rem solid #ddd;
//   }

//   .my_yzm_area {
//     width: 50%;
//     // display: inline-block;
//   }
// }

@media screen and (min-width: 36rem) {
  
}
.my_yzm_area svg {
    width: 100% !important;
    height: 100% !important;
    vertical-align: middle;
  }
.my_yzm_area svg {
  cursor: pointer;
}
</style>