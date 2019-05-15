<template>
  <div class="person_area row m-0 mr-4 ml-4">
    <ul class="col-2 text-center">
      <li class="pt-3 pb-3 active"><a href="javascript:;" class="middle_font">个人信息</a></li>
      <li class="pt-3 pb-3"><a href="javascript:;" class="middle_font">收货地址</a></li>
      <li class="pt-3 pb-3"><a href="javascript:;" class="middle_font">订单详情</a></li>
    </ul>
    <div class="col-10">

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user
    }
  },
}
</script>
<style scoped>
  .person_area ul{
    background:#ddd;
    padding:1rem 0 1rem .5rem;
  }
  .person_area li.active{
    background:#fff;
  }
  .person_area li a:hover{
    color:#333;
  }
</style>
