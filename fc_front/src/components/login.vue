<template>
    <div>
        <!-- content start -->
        <div class="container">
            <!-- loginForm start-->
            <div class="login row mt-5 mb-5 ml-auto mr-auto pr" ref="father_area">
                <!-- 消息提示模态框开始 -->
                <myalert ></myalert>
                <!-- 消息提示模态框结束 -->
                <div class="col-sm-12 mb-3">
                    <h2 class="text-center">登录</h2>
                </div>
                <div class="col-sm-12 mb-3">
                    <!-- 手机表单开始 -->
                    <div class="phone_err text-right text-danger" :class="{v_hidden:state_phone}">手机号格式错误</div>
                    <input type="text" class="input_form" placeholder="手机号" @blur="func_phone_blur"
                        v-model="input_phone" :class="{input_form_error:!state_phone}">
                    <!-- 手机表单结束 -->
                </div>

                <div class="col-sm-12 mb-3">
                    <!-- 密码表单开始 -->
                    <div class="upwd_err text-right text-danger" :class="{v_hidden:state_upwd}">包含数字、字母、下划线的6-18位</div>
                    <input type="password" class="input_form" placeholder="密码" @blur="func_upwd_blur"
                        v-model="input_upwd" :class="{input_form_error:!state_upwd}">
                    <!-- 密码表单结束 -->
                </div>

                <div class="col-sm-12 mb-3">
                    <button class="btn" @click="login" :disabled="check_input_right">登录</button>
                </div>
                <!-- 登录按钮 -->
                <div class="col-sm-12 mb-3">
                    <!-- 注册忘记密码跳转链接开始 -->
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/register">注册</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link to="/">忘记密码</router-link>
                        </li>
                    </ul>
                    <!-- 注册忘记密码跳转链接结束 -->
                </div>
            </div>
            <!-- loginForm end -->
        </div>
        <!-- content end -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                
                phoneRegex: /^1[34578]\d{9}$/, //手机号正则
                upwdRegex: /^[a-zA-Z\d_]{6,18}$/, //密码正则
                input_phone: "", //保存用户输入的手机号
                input_upwd: "", //保存用户输入的密码
                state_phone: true, //手机号验证状态
                state_upwd: true, //密码验证状态
                blur_once: false, //是否失去过焦点
                blur_two: false, //是否失去焦点
                // alert_show: "", //登录的结果对象
                test: "这是测试消息",
                login_timer: null //登录方法中使用的定时器
            };
        },
        methods: {
            /**
             * 手机号表单失去焦点时调用的方法
             */
            func_phone_blur() {
                // console.log("鼠标从手机号失去焦点");
                //已经触发过一次失去焦点事件
                // this.blur_once = true
                //验证手机号格式，并将结果赋值给手机号的验证状态
                this.state_phone = this.phoneRegex.test(this.input_phone)
            },
            /**
             * 密码表单失去焦点时调用的方法
             */
            func_upwd_blur() {
                // console.log("鼠标从密码失去焦点");
                //已经触发过一次失去焦点事件
                // this.blur_two = true
                //验证密码格式，并将结果赋值给密码的验证状态
                this.state_upwd = this.upwdRegex.test(this.input_upwd)
            },
            /**
             * 登录按钮的点击事件所调用的方法
             */
            login() {
                this.$axios.post("/user/login", {
                    //登录的手机号
                    phone: this.input_phone,
                    //登录的密码
                    upwd: this.input_upwd
                }).then(result => {
                    // console.log(result)
                    //将请求数据放入变量中
                    this.$store.dispatch("set_mymsg", result.data.msg);
                    // this.alert_show = result.data.msg
                    // console.log(this.login_result)
                    //如果登录成功
                    if (result.data.code === 200) {
                        //2s后跳转回首页
                        this.login_timer = setTimeout(() => {
                            // console.log("登录成功，2秒后跳转回首页")
                            this.$router.push("/")
                        }, 3000)
                    }
                }).catch(error => {
                    throw error
                })
            }
        },
        //组件销毁后清空定时器
        destroyed() {
            clearTimeout(this.login_timer)
        },
        computed: {
            //去除失去焦点验证
            check_input_right() {
                return !this.state_phone || !this.state_upwd
            }
        },
    };
</script>
<style>
    @media screen and (max-width:575px) {
        .login {
            width: 18rem;
        }
    }

    @media screen and (min-width: 576px) {
        .login {
            width: 70%;
        }
    }

    @media screen and (min-width: 768px) {
        .login {
            width: 60%;
        }
    }

    @media screen and (min-width: 992px) {
        .login {
            width: 50%;
        }
    }

    @media screen and (min-width: 1200px) {
        .login {
            width: 40%;
        }
    }

    .login {
        border-radius: 0.5rem;
        box-shadow: 0 0 1rem 0.01rem #333;
        padding-top: 2rem;
    }

    .login .breadcrumb {
        background: transparent;
        font-size: 16px;
        padding-left: 0;
        margin: 0;
        justify-content: flex-end;
    }

    .login .breadcrumb-item+.breadcrumb-item::before {
        content: "|";

    }

    .login .breadcrumb .breadcrumb-item a {
        font-size: 16px;
    }

    .login h2 {
        font-size: 1.25rem;
    }

    .login .input_form {
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

    .login .input_form_error {
        outline: none;
        border-color: #f44336;
    }

    .login .btn {
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

    .login .btn:hover {
        background: rgb(42, 117, 254);
        border: rgb(42, 117, 254);
    }
</style>