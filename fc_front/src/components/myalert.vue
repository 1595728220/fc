<template>
    <div class="alert_area" :class="{show:myalert_is_show}" :style="alert_position" ref="myalert">
        {{mymsg.msg}}
    </div>
</template>
<script>
    export default {
        props: ['mymsg'],
        data() {
            return {
                //提示框的是否显示
                myalert_is_show: false,
                //提示框的左偏移量
                alert_left:null,
                //提示框的上偏移量
                alert_top:null,
                //父元素的宽度
                father_width:null,
                //父元素的高度
                father_height:null,
                //获取当前元素的宽度
                alert_width:null,
                //获取当前元素的高度
                // alert_height:null
                //隐藏的定时器
                hidden_timer:null
            }
        },
        methods: {
            //1.5s后修改提示框的显示状态为false
            delayHiding() {
                this.hidden_timer = setTimeout(() => {
                    console.log("1.5s后提示模态框隐藏")
                    //修改提示框的显示状态为false
                    this.myalert_is_show = false
                }, 2000)
            },
            //获取页面可视区域的宽高，并修改偏移量
            func_position(){
                //获取组件父元素的宽度和高度
                this.father_height = this.$parent.$refs.father_area.offsetHeight
                this.father_width = this.$parent.$refs.father_area.offsetWidth
                //获取当前提示框的宽度
                this.alert_width = this.$refs.myalert.offsetWidth
                // this.alert_height = this.$refs.myalert.offsetHeight
                //计算提示框的偏移属性
                this.alert_left = (this.father_width - this.alert_width) / 2  
                this.alert_top = this.father_height  / 2 - 30
            }
        },
        mounted() {
            //提示框的显示状态为true
            this.myalert_is_show = true
            //获取当前提示框所需的位置属性
            this.func_position()
            //组件挂载2s后修改提示框的显示状态为false
            this.delayHiding()
        },
        //组件更新时重新定位提示框位置
        updated() {
            //获取当前提示框所需的位置属性
            this.func_position()
        },
        //组件被销毁后清空定时器
        destroyed() {
            clearTimeout(this.hidden_timer)
        },
        watch: {
            //监听消息数据的变化，如果变化，显示我的提示框，并在2s后关闭
            mymsg: function () {
                //提示框的显示状态为true
                this.myalert_is_show = true
                //清空当前的定时器
                clearTimeout(this.hidden_timer)
                //调用延时隐藏的方法
                this.delayHiding()
            }
        },
        computed: {
            //利用计算属性将偏移属性拼接成为一个内联的样式
            alert_position:function(){
                return `left:${this.alert_left}px;top:${this.alert_top}px`
            }
        },
        
    }
</script>
<style>
    .alert_area {
        height:0rem;
        margin:auto;
        position: absolute;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 0.4rem;
        color: #fff;
        text-align: center;
        font-size: 1.25rem;
        line-height: 4rem;
        opacity: 0;
        padding: 0 0.625rem;
        /* animation:fadeInDown 0.5s linear 0s; */
        transition: opacity 0.5s linear 0s, height 0.5s linear 0s;
        z-index: 100;
    }

    .alert_area.show {
        opacity: 1;
        height: 3.75rem;
    }
</style>