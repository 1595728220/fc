<template>
  <div v-html="yzmImg" class="col-sm-6 p-0 my_yzm_area" @click="fatherfunc"></div>
</template>
<script>
export default {
  //yzmImg 存放父组件获得的yzm结果字符串
  //fatherfunc存放父组件中的获取验证码方法
  props: ["yzmImg","fatherfunc"],
  data() {
    return {};
  }
};
</script>
<style>

@media screen and (max-width: 575px) {
  .my_yzm_area svg {
    width: 100% !important;
    border:1px solid #ddd;
  }
  .my_yzm_area{
      width:50%;
      display:inline-block;
  }
}
@media screen and (min-width: 576px) {
  .my_yzm_area svg {
    width: 100% !important;
    height: 100% !important;
    vertical-align: middle;
  }
}
.my_yzm_area svg{
    cursor: pointer;
}
</style>


