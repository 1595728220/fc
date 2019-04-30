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
                
                <!-- 注册表单的内容主体开始 -->
                <div class="area clear">

                    <!-- 表单标题部分开始 -->
                    <div class="register_title ">
                        <h2 class="">手机注册</h2>
                        <a href="#" class="icon_btn"></a>
                    </div>
                    <!-- 表单标题部分结束 -->

                    <!-- 手机号表单开始 -->
                    <div class="phone_err">手机号格式错误</div>
                    <input type="text" placeholder="手机号" class="input_form">
                    <!-- 手机号表单结束 -->

                    <!-- 密码表单开始 -->
                    <div class="upwd_err">包含数字、字母、下划线的6-18位</div>
                    <input type="password" placeholder="密码" class="input_form">
                    <!-- 密码表单结束 -->

                    <!-- 重复密码表单开始 -->
                    <div class="cpwd_err">两次密码输入不一致</div>
                    <input type="password" placeholder="确认密码" class="input_form">
                    <!-- 重复密码表单结束 -->

                    <!-- 验证码表单开始 -->
                    <div class="iden_err">验证码错误</div>
                    <div class="iden_area">
                        <input type="text" placeholder="验证码" class="input_form iden_form">
                        <img src="asets/picture/yzm.png" class="pa">
                    </div>
                    <!-- 验证码表单结束 -->

                    <!-- 注册按钮 -->
                    <button class="btn">注册</button>

                    <!-- 同意用户协议复选框开始 -->
                    <div class="agree pr">
                        <input type="checkbox" class="" id="register_agree">
                        <label for="register_agree" class="agree_label">我已阅读并同意<router-link to="/register">《用户注册协议》
                            </router-link></label>
                    </div>
                    <!-- 同意用户协议复选框结束 -->

                    <!-- 跳转登录链接开始 -->
                    <div class="have">
                        已有账号？
                        <router-link to="/login">立即登录</router-link>
                    </div>
                    <!-- 跳转登录链接结束 -->

                </div>
                <!-- 注册表单的内容主体结束 -->

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
                register_result: "1"
            }
        }
    }
</script>
<style>
    @media screen and (max-width:575px) {
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
</style>