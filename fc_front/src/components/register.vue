<template>
  <div>
    <!-- content start -->
    <div class="container">
      <!-- registerForm start -->
      <div class="register pr ml-auto mr-auto mt-5 mb-5 row" ref="father_area">
        <!-- 消息提示模态框开始 -->
        <myalert></myalert>
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
          <div :class="{v_hidden:state_form.phone}" class="text-right text-danger">{{phone_msg}}</div>
          <input
            type="text"
            placeholder="手机号"
            class="input_form"
            v-model="input_form.phone"
            @blur="func_phone_blur"
            :class="{input_form_error:!state_form.phone}"
          >
          <!-- 手机号表单结束 -->
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 密码表单开始 -->
          <div :class="{v_hidden:state_form.upwd}" class="text-right text-danger">包含数字、字母、下划线的6-18位</div>
          <input
            type="password"
            placeholder="密码"
            class="input_form"
            v-model="input_form.upwd"
            :class="{input_form_error:!state_form.upwd}"
            @blur="func_upwd_blur"
            autocomplete="new-password"
          >
          <!-- 密码表单结束 -->
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 重复密码表单开始 -->
          <div :class="{v_hidden:state_form.cpwd}" class="text-right text-danger">两次密码输入不一致</div>
          <input
            type="password"
            placeholder="确认密码"
            class="input_form"
            v-model="input_form.cpwd"
            :class="{input_form_error:!state_form.cpwd}"
            @blur="func_cpwd_blur"
            autocomplete="new-password"
          >
          <!-- 重复密码表单结束 -->
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 验证码表单开始 -->
          <div :class="{v_hidden:state_form.iden}" class="text-right text-danger">验证码错误</div>
          <div class="row m-0">
            <input
              type="text"
              placeholder="验证码"
              class="input_form col-sm-6 d-inline-block"
              v-model="input_form.iden"
              :class="{input_form_error:!state_form.iden}"
              @blur="func_iden_blur"
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
          <!-- 验证码表单结束 -->
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 注册按钮 -->
          <button class="btn" :disabled="check_input_right" @click="send_register">注册</button>
        </div>

        <div class="col-sm-12 mb-3">
          <!-- 同意用户协议复选框开始 -->
          <div class="agree pr">
            <input type="checkbox" class id="register_agree" v-model="state_form.agree">
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
  </div>
</template>
<script>
export default {
  //取消是否失去过焦点的验证，体验不好
  data() {
    return {
      // phoneRegex: /^1[34578]\d{9}$/, //手机号正则
      // upwdRegex: /^[a-zA-Z\d_]{6,18}$/, //密码正则
      input_form: {
        phone: "", //手机号表单的输入
        upwd: "", //密码表单的输入
        cpwd: "", //确认密码表单的输入
        iden: "" //验证码表单的输入
      }, //保存表单输入值
      state_form: {
        phone: true, //手机号验证状态
        upwd: true, //密码验证状态
        cpwd: true, //确认密码验证状态
        iden: true, //验证码验证状态
        agree: false //同意协议验证状态
      }, //保存表单状态值
      // blur_once: {
      //   // phone: false,
      //   // upwd: false,
      //   // cpwd: false,
      //   // iden: false
      //   phone: true,
      //   upwd: true,
      //   cpwd: true,
      //   iden: true
      // }, //是否验证过一次表单
      phone_msg: "手机号格式不正确", //保存手机号的提示信息
      active_yzm: "", //从服务器端返回的验证码
      // alert_show: this.$store.getters.get_mymsg,
      yzm_result_img: "", //请求验证码的图片
      register_timer: null //注册页面的定时器
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
      // console.log(this.input_phone);
      this.$axios
        .get("/user/yzm", {
          params: {
            phone: this.input_form.phone
          }
        })
        .then(result => {
          //请求成功
          // console.log(result);
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
    /**
     * 手机号表单失去焦点时调用的方法
     */
    func_phone_blur() {
      // console.log("失去焦点");
      if (!this.phoneRegex.test(this.input_form.phone)) {
        //手机号验证不通过
        //改变手机号验证状态
        this.state_form.phone = false;
        this.phone_msg = "手机号格式不正确";
      } else {
        //手机号验证通过
        this.func_phone_blur_yanzheng();
      }
      //手机号失去过一次焦点
      // this.blur_once.phone = true;
    },
    /**
     * 根据请求的状态码，提示消息，内部使用方法，外部无法访问
     */
    func_phone_blur_yanzheng() {
      //发送请求验证手机号是否被注册
      this.$axios
        .get("/user/hasreg", {
          params: {
            phone: this.input_form.phone
          }
        })
        .then(result => {
          //用户名可用
          if (result.data.code === 200) {
            this.state_form.phone = true;
            this.require_yzm()
          } else {
            //用户名不可用
            this.state_form.phone = false;
            //将提示信息保存到变量
            this.phone_msg = result.data.msg;
          }
        })
        .catch(error => {
          throw error;
        });
    },
    /**
     * 密码表单失去焦点时调用的方法
     */
    func_upwd_blur() {
      //保存正则的验证结果
      this.state_form.upwd = this.upwdRegex.test(this.input_form.upwd);
      //密码表单失去过一次焦点
      // this.blur_once.upwd = true;
    },
    /**
     * 重复密码表单失去焦点时调用的方法
     */
    func_cpwd_blur() {
      //如果两次密码输入相同
      if (this.input_form.cpwd === this.input_form.upwd) {
        this.state_form.cpwd = true;
      } else {
        //两次密码输入不同
        this.state_form.cpwd = false;
      }
      // 再次输入密码失去一次焦点
      // this.blur_once.cpwd = true;
    },
    //验证码表单失去焦点时调用的方法
    func_iden_blur() {
      // console.log(this.input_form.iden, this.active_yzm)
      if (
        this.input_form.iden.toLowerCase() !== this.active_yzm.toLowerCase()
      ) {
        //验证码验证不通过
        //修改验证码验证状态为 false
        this.state_form.iden = false;
      } else {
        //验证码验证通过
        //修改验证码状态为 true
        this.state_form.iden = true;
      }
      //验证码表单失去过一次焦点
      // this.blur_once.iden = true
    },
    //发送注册请求
    send_register() {
      this.$axios
        .post("/user/register", {
          phone: this.input_form.phone,
          upwd: this.input_form.upwd,
          cpwd: this.input_form.cpwd,
          identify: this.input_form.iden
        })
        .then(result => {
          // console.log(result)
          //将注册请求的结果对象存入变量
          this.$store.dispatch("set_mymsg", result.data.msg);
          // console.log(this.register_result)
          // this.alert_show = result.data.msg
          //如果注册成功
          if (result.data.code === 200) {
            // 2秒后跳转到首页
            setTimeout(() => {
              // console.log("注册成功，2秒后跳转回首页")
              this.$router.push("/");
            }, 3000);
          }
          //重新请求验证码
          this.require_yzm();
        })
        .catch(error => {
          this.require_yzm();
          throw error;
        });
    }
  },
  //计算属性
  computed: {
    //检查表单格式是否正确，需要至少进行一次表单的失去焦点验证
    check_input_right() {
      return (
        Object.values(this.state_form).filter(val => {
          return val === false;
        }).length !== 0
      );
    },
    //获取vuex中的手机号正则
    phoneRegex(){
      return this.$store.getters.get_phoneRegex
    },
    //获取vuex中的密码正则
    upwdRegex(){
      return this.$store.getters.get_upwdRegex
    },
  },
  destroyed() {
    clearTimeout(this.register_timer);
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