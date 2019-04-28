<template>
    <div>
        <myheader></myheader>
        <!-- content start -->
        <div class="container">
            <!-- loginForm start-->
            <div class="login row m-0">
                <div class="col-sm-12">
                    <h2>登录</h2>
                </div>
                <div class="col-sm-12">
                    <!-- 手机表单开始 -->
                    <div class="phone_err">手机号格式错误</div>
                    <input type="text" class="input_form" placeholder="手机号" @blur="func_phone_blur">
                    <!-- 手机表单结束 -->
                </div>

                <div class="col-sm-12">
                    <!-- 密码表单开始 -->
                    <div class="upwd_err">包含数字、字母、下划线的6-18位</div>
                    <input type="password" class="input_form" placeholder="密码" @blur="func_upwd_blur">
                    <!-- 密码表单结束 -->
                </div>

                <div class="col-sm-12">
                    <button class="btn" @click="login">登录</button>
                </div>
                <!-- 登录按钮 -->
                <div class="col-sm-12">
                    <!-- 注册忘记密码跳转链接开始 -->
                    <ul class="clear">
                        <li>
                            <router-link to="/register">注册</router-link>
                        </li>
                        <li>|</li>
                        <li>
                            <router-link to="/">忘记密码</router-link>
                        </li>
                    </ul>
                    <!-- 注册忘记密码跳转链接结束 -->
                </div>
            </div>
            <!-- loginForm end -->

        </div>
        <!-- content end -->
        <myfooter></myfooter>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                phoneRegex: /^1[34578]\d{9}$/, //手机号正则
                upwdRegex: /^[a-zA-Z\d_]{6,18}$/, //密码正则
                state_phone: 0, //手机号验证状态
                state_upwd: 0 //密码验证状态
            }
        },
        methods: {
            /**
             * 手机号表单失去焦点时调用的方法
             */
            func_phone_blur() {
                console.log("鼠标从手机号失去焦点")
            },
            /**
             * 密码表单失去焦点时调用的方法
             */
            func_upwd_blur() {
                console.log("鼠标从密码失去焦点")
            },
            /**
             * 登录按钮的点击事件所调用的方法
             */
            login() {
                console.log("点击登录")
            }
        }
    }
</script>
<style>
    .login {
        border:1px solid #fff;
        border-radius: 7px;
    }

    .login .input_form {
        display: block;
        height: 40px;
        background: #fff;
        border: 1px solid #ccc;
        padding: 0 10px;
        /* outline:none; */
        color: #262e39;
        border-radius: 3px;
        margin: 0 auto 18px;
        box-sizing: border-box;
    }

    .login .input_form_error {
        outline: none;
        border-color: #F44336;
    }

    .login .btn {
        height: 40px;
        display: block;
        background: #4b95ff;
        border: #4b95ff;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        margin: 0 auto 18px;
        padding: 0 10px;

    }

    .login .btn:hover {
        background: rgb(42, 117, 254);
        border: rgb(42, 117, 254);
    }

    .login>.phone_err {
        width: 340px;
        margin: 0 auto;
        color: #F44336;
        top: 75px;
        right: 62px;
        font-size: 12px;
        text-align: right;
        display: block;
    }

    .login>.upwd_err {
        width: 340px;
        margin: 0 auto;
        color: #F44336;
        top: 134px;
        right: 62px;
        font-size: 12px;
        text-align: right;
        display: block;
    }

    .login h2 {
        font-size: 20px;
        text-align: center;
        margin: 20px 0 30px;
        font-weight: normal;
    }
</style>