<template>
  <div class="row ml-0 mr-0 mb-3 forget_area">
    <div class="col-md-7 col-sm-0 oh pr-0">
      <img src="../assets/imgs/forget/bg.jpg" class>
    </div>
    <div class="col-md-5 offset-sm offset-md-0 form_area">
      <div class="d-flex title">
        <p class="middle_font mb-0 justify-self-center">忘记密码</p>
        <router-link to="/login" class="btn btn-light mr-1">返回</router-link>
      </div>
      <div class="content">
        <input type="text" placeholder="手机号码" v-model="forget_data.phone">
        <!-- <input type="text" placeholder="验证码"> -->
        <div class="row mb-3 ml-0 mr-0">
            <input
              type="text"
              placeholder="验证码"
              class="input_form col-sm-6 d-inline-block mb-0"
              v-model="forget_data.identify"
              
            >
            <div class="col-sm-6 p-0 align-self-center">
              <div class="row m-0">
                <myyzm :yzmimg="yzm_result_img" v-if="yzm_result_img" :fatherfunc="require_yzm"></myyzm>
                <a
                  class="col-sm-6 align-self-center cp text-primary p-0"
                  @click="require_yzm"
                >看不清楚，换一张</a>
              </div>
            </div>
          </div>
        <input type="password" placeholder="新密码" v-model="forget_data.upwd">
        <input type="password" placeholder="确认密码" v-model="forget_data.cpwd">
        <button disabled>确认</button>
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
      },
      phone_msg: "手机号格式不正确", //保存手机号的提示信息
      active_yzm: "", //从服务器端返回的验证码
      yzm_result_img: "", //请求验证码的图片
      register_timer: null //注册页面的定时器
    };
  },
  methods: {
         /**
     * 请求yzm的方法，通过axios的get方法请求 /user/yzm
     */
    require_yzm() {
      // console.log(this.input_phone);
      this.$axios
        .get("/user/yzm", {
          params: {
            phone: this.forget_data.phone
          }
        })
        .then(result => {
            console.log(this.forget_data.phone)
          //请求成功
          console.log(result);
          //如果返回的结果的data属性不是一个对象
          if (result.data.code === undefined) {
            //取出值
            this.yzm_result_img = result.data.yzm.data || "请再次获取验证码";
            this.active_yzm = result.data.yzm.text || "请再次获取验证码";
            // console.log(this.yzm_result_img)
          }
          //否则
          else {
            //取出对象中msg属性值
            this.yzm_result_img = result.data.msg;
          }
          //   console.log(this.yzm_result_img)
        })
        .catch(error => {
          //请求失败
          //在控制台输出错误信息
          throw error;
        });
    },
  },
  mounted() {
      this.require_yzm()
  },
};
</script>
<style scoped>
@media screen and (max-width: 767px) {
  .col-sm-0 {
    display: none;
  }
  .offset-sm {
    margin-left: 12.5%;
  }
  .form_area {
    width: 75%;
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

.forget_area .form_area {
  max-width: 23.75rem;
  min-width: 17.5rem;
  border: 1px solid #eee;
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
.forget_area .content {
  padding: 1.5rem 0.5rem;
  display: flex;
  flex-direction: column;
}
.forget_area .content .input_form {
  width: 100%;
  display: block;
  height: 2.5rem;
  background: #fff;
  border: 1px solid #ccc;
  padding: 0 1.125rem;
  color: #262e39;
  border-radius: 0.25rem;
  box-sizing: border-box;
}
.forget_area .content input,
.forget_area .content button {
  width: 100%;
  display: block;
  height: 2.5rem;
  background: #fff;
  border: 1px solid #ccc;
  padding: 0 1.125rem;
  color: #262e39;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}
.forget_area .content input:nth-child(2) {
  width: 50%;
}
.forget_area .content button {
  color: #fff;
  background-image: linear-gradient(to bottom, #27b1f6 0%, #0aa1ed 100%);
  cursor: pointer;
  border: 0;
  outline: 0;
  opacity: 0.8;
}
.forget_area .content button:active {
  opacity: 1;
}
.forget_area .content button:disabled {
  background: #ddd;
  opacity: 1;
}
</style>
