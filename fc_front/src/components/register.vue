<template>
  <div>
    <myheader></myheader>
    <!-- content start -->
    <div class="container">
      <!-- registerForm start -->
      <div class="register pr ml-auto mr-auto mt-5 mb-5 row" ref="father_area">
        <!-- 消息提示模态框开始 -->
        <myalert :mymsg="register_result" v-if="register_result"></myalert>
        <!-- 消息提示模态框结束 -->
        <div class="col-sm-12 mb-3">
          <!-- 表单标题部分开始 -->
          <div class="register_title">
            <h2 class>手机注册</h2>
            <a href="#" class="icon_btn"></a>
          </div>
          <!-- 表单标题部分结束 -->
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 手机号表单开始 -->
          <div class="input_form_error">手机号格式错误</div>
          <input type="text" placeholder="手机号" class="input_form" v-model="input_phone">
          <!-- 手机号表单结束 -->
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 密码表单开始 -->
          <div class="input_form_error">包含数字、字母、下划线的6-18位</div>
          <input type="password" placeholder="密码" class="input_form" v-model="input_upwd">
          <!-- 密码表单结束 -->
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 重复密码表单开始 -->
          <div class="input_form_error">两次密码输入不一致</div>
          <input type="password" placeholder="确认密码" class="input_form" v-model="input_cpwd">
          <!-- 重复密码表单结束 -->
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 验证码表单开始 -->
          <div class="input_form_error">验证码错误</div>
          <div class="row m-0">
            <input
              type="text"
              placeholder="验证码"
              class="input_form col-sm-6 d-inline-block"
              v-model="input_iden"
            >
            <div class="col-sm-6 p-0 align-self-center">
              <div class="row m-0">
                <myyzm :yzmImg="yzm_result_img" v-if="yzm_result_img" :fatherfunc="require_yzm"></myyzm>
                <a
                  class="col-sm-6 align-self-center cp text-primary p-0"
                  @click="require_yzm"
                >看不清楚，换一张</a>
              </div>
            </div>
          </div>
          <!-- 验证码表单结束 -->
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 注册按钮 -->
          <button class="btn" :disabled="check_input_right">注册</button>
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 同意用户协议复选框开始 -->
          <div class="agree pr">
            <input type="checkbox" class id="register_agree">
            <label for="register_agree" class="agree_label">
              我已阅读并同意
              <router-link to="/register" class="text-primary">《用户注册协议》</router-link>
            </label>
          </div>
          <!-- 同意用户协议复选框结束 -->
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 跳转登录链接开始 -->
          <div class="have text-center">
            已有账号？
            <router-link to="/login" class="text-primary">立即登录</router-link>
          </div>
          <!-- 跳转登录链接结束 -->
        </div>
      </div>
      <!-- registerForm end -->
    </div>
    <!-- content end -->

    <myfooter></myfooter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      register_result: null,
      input_phone: null, //手机号表单的输入
      input_upwd: null, //密码表单的输入
      input_cpwd: null, //确认密码表单的输入
      input_iden: null, //验证码表单的输入
      state_phone: true, //手机号验证状态
      state_upwd: true, //密码验证状态
      state_cpwd: true, //确认密码验证状态
      state_iden: true, //验证码验证状态
      state_agree: true, //同意协议验证状态
      blur_once: false, //是否验证过一次表单
      yzm_result_img: "" //请求验证码的图片
    };
  },
  mounted() {
    //获取验证码
    this.require_yzm();
  },
  methods: {
    /**
     * 请求yzm的方法，通过axios的get方法请求 /user/yzm
     */
    require_yzm() {
      console.log(this.input_phone);
      this.$axios
        .get("/user/yzm", {
          params: {
            phone: this.input_phone
          }
        })
        .then(result => {
          //请求成功
          //   console.log(result);
          //如果返回的结果的data属性不是一个对象
          if (typeof result.data !== "object")
            //取出值
            this.yzm_result_img = result.data || "请再次获取验证码";
          //否则
          //取出对象中msg属性值
          else this.yzm_result_img = result.data.msg;
          //   console.log(this.yzm_result_img)
        })
        .catch(error => {
          //请求失败
          //在控制台输出错误信息
          console.log(error);
        });
    },
    /**
     * 手机号表单失去焦点时调用的方法
     */
    func_phone_blur() {
      // console.log("失去焦点")
      if (!phoneRegex.test(phone.value)) {
        //手机号验证不通过
        //改变手机号验证状态
      } else {
        //手机号验证通过
        //发送请求验证手机号是否被注册
      }
    },
    /**
     * 根据请求的状态码，提示消息，内部使用方法，外部无法访问
     * @param {obj} res 响应数据的js对象
     */
    func_phone_blur_yanzheng(res) {
      // console.log(res)
      // console.log("手机号非空，验证是否被注册")
      if (res.code === 200) {
        //手机号可以使用
      } else {
        //手机号已被注册
      }
    },
    /**
     * 密码表单失去焦点时调用的方法
     */
    func_upwd_blur() {
      if (!upwdRegex.test(upwd.value)) {
        //密码验证不通过
        //修改密码验证状态为false
      } else {
        //密码验证通过
        //修改密码验证状态为true
      }
    },
    /**
     * 重复密码表单失去焦点时调用的方法
     */
    func_cpwd_blur() {
      if (cpwd.value !== upwd.value) {
        //重复密码验证不通过
        //修改重复密码状态为false
      } else {
        //重复密码验证通过
        //修改重复密码状态为true
      }
    },
    //验证码表单失去焦点时调用的方法
    func_iden_blur() {
      if (iden.value.toLowerCase() !== "kfax") {
        //验证码验证不通过
        //修改验证码验证状态为 false
      } else {
        //验证码验证通过
        //修改验证码状态为 true
      }
    }
  },
  //计算属性
  computed: {
    //检查表单格式是否正确，需要至少进行一次表单的失去焦点验证
    check_input_right() {
      return (
        !this.state_iden ||
        !this.state_agree ||
        !this.state_phone ||
        !this.state_upwd ||
        !this.state_cpwd ||
        !this.blur_once
      );
    }
  },
  watch: {
    // input_phone:function(){
    //     console.log(this.input_phone)
    // }
    // yzm_result_img(val){
    //     this.oldName = val || "请刷新   "
    // }
  }
};
</script>
<style>
@media screen and (max-width: 575px) {
  .register {
    width: 18rem;
  }
}

@media screen and (min-width: 576px) {
  .register {
    width: 70%;
  }
}

@media screen and (min-width: 768px) {
  .register {
    width: 60%;
  }
}

@media screen and (min-width: 992px) {
  .register {
    width: 50%;
  }
}

@media screen and (min-width: 1200px) {
  .register {
    width: 40%;
  }
}

.register {
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem 0.01rem #333;
  padding-top: 2rem;
}

.register h2 {
  font-size: 1.25rem;
}

.register .input_form {
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

.register .input_form_error {
  outline: none;
  border-color: #f44336;
}

.register .btn {
  width: 100%;
  height: 2.5rem;
  display: block;
  background: #4b95ff;
  border: #4b95ff;
  border-radius: 0.25rem;
  text-align: center;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.register .btn:hover {
  background: rgb(42, 117, 254);
  border: rgb(42, 117, 254);
}
</style>