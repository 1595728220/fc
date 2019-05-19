<template>
  <div class="row m-0 forget_area">
    <div class="col-md-7 col-sm-0">
      <img src="../assets/imgs/forget/bg.jpg" class="img-fluid">
    </div>
    <div class="col-sm-5 offset-sm-3 offset-md-0 p-0">
      <div class="d-flex title ">
        <p class="middle_font mb-0 justify-self-center">忘记密码</p>
        <router-link to="/login" class="btn btn-light mr-1">返回</router-link>
      </div>
      <div class="content">
          <input type="text" placeholder="手机号码">
          <input type="text" placeholder="验证码">
          <input type="password" placeholder="新密码">
          <input type="password" placeholder="确认密码">
          <button>确认</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      forget_data: {
        phone: "",
        identify: "",
        upwd: "",
        cpwd: ""
      }
    };
  }
};
</script>
<style scoped>
@media screen and (max-width: 767px) {
  .col-sm-0 {
    display: none;
  }
  .offset-sm-3 {
    margin-left: 25%;
  }
}
@media screen and (min-width: 576px) {
}

@media screen and (min-width: 768px) {
}

@media screen and (min-width: 992px) {
}

@media screen and (min-width: 1200px) {
}
.forget_area .title {
  height: 3rem;
  align-items: center;
  background: #ddd;
}
.forget_area .title a {
  padding-top: 0;
  padding-bottom: 0;
  line-height: 2rem;
  height: 2rem;
}
.forget_area .title p {
  margin: 0 auto;
  font-weight: bold;
}
.forget_area .content{
    padding:1.5rem 0.5rem;
    display: flex;
    flex-direction: column;
}
.forget_area .content input{
    width: 100%;
    display: block;
    height: 2.5rem;
    background: #fff;
    border: 1px solid #ccc;
    padding: 0 1.125rem;
    color: #262e39;
    border-radius: 0.25rem;
}
</style>
