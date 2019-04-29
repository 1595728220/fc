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
                myalert_is_show: true,
                //提示框的左偏移量
                alert_left:null,
                //提示框的上偏移量
                alert_top:null,
                //可视页面的宽度
                clientWidth:null,
                //可视页面的高度
                clientHeight:null,
                //获取当前元素的宽度
                alert_width:null,
            }
        },
        methods: {
            //1.5s后修改提示框的显示状态为false
            delayHiding() {
                setTimeout(() => {
                    console.log("1.5s后提示模态框隐藏")
                    //修改提示框的显示状态为false
                    this.myalert_is_show = false
                }, 1500)
            },
            //获取页面可视区域的宽高，并修改偏移量
            func_position(){
                //获取当前的页面的宽度和高度
                this.clientHeight = `${document.documentElement.clientHeight}`
                this.clientWidth = `${document.documentElement.clientWidth}`
                this.alert_width = this.$refs.myalert.offsetWidth
                this.alert_left = (this.clientWidth- this.alert_width) / 2  
                this.alert_top = this.clientHeight / 4
            }
        },
        mounted() {
            this.func_position()
            //组件挂载1.5s后修改提示框的显示状态为false
            this.delayHiding()
            console.log(this.clientHeight,this.clientWidth)
        },
        watch: {
            //监听消息数据的变化，如果变化，显示我的提示框，并在1.5s后关闭
            mymsg: function () {
                this.myalert_is_show = true
                this.delayHiding()
            }
        },
        computed: {
            //将偏移属性拼接成为一个内联的样式
            alert_position:function(){
                return `left:${this.alert_left}px;top:${this.alert_top}px`
            }
        },
    }
</script>
<style>
    .alert_area {
        height: 4rem;
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
        transition: opacity 0.5s linear 0s, height 0.5s linear 0s;
        z-index: 100;
    }

    .alert_area.show {
        opacity: 1;
        height: 3.75rem;
    }
</style>