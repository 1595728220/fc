<template>
  <div
    class="alert_area"
    :class="{show:myalert_is_show}"
    :style="alert_position"
    ref="myalert"
  >{{mymsg}}</div>
</template>
<script>
export default {
  //mymsg需要传入一个完整的消息对象，即包含msg属性的对象
  // props: ['mymsg'],
  data() {
    return {
      //提示框的是否显示
      myalert_is_show: false,
      //提示框的左偏移量
      alert_left: null,
      //提示框的上偏移量
      alert_top: null,
      //父元素的宽度
      father_width: null,
      //父元素的高度
      father_height: null,
      //获取当前元素的宽度
      alert_width: null,
      //获取当前元素的高度
      // alert_height:null
      //隐藏的定时器
      hidden_timer: null
    };
  },
  methods: {
    //1.5s后修改提示框的显示状态为false
    delayHiding() {
      this.hidden_timer = setTimeout(() => {
        // console.log("1.5s后提示模态框隐藏")
        //清空vuex中的待展示信息
        this.$store.dispatch("set_mymsg", "");
        //更新提示框的显示状态
        this.myalert_is_show = this.$store.getters.get_mymsg;
      }, 2000);
    },
    //获取页面可视区域的宽高，并修改偏移量
    func_position() {
      // //获取组件父元素的宽度和高度
      // this.father_height = this.$parent.$refs.father_area.offsetHeight;
      // this.father_width = this.$parent.$refs.father_area.offsetWidth;
      //获取当前提示框的宽度
      this.alert_width = this.$refs.myalert.offsetWidth;
      // this.alert_height = this.$refs.myalert.offsetHeight
      //计算提示框的偏移属性
      this.alert_left =  this.alert_width / 2;
      // console.log(this.father_height,this.father_width)
      // console.log(this.alert_width)
      // console.log(this.alert_left,this.alert_top)
    }
  },
  //   mounted() {
  //     // console.log(this.mymsg)
  //     //根据当前的mymsg设置提示框的显示状态
  //     this.myalert_is_show = this.mymsg;
  //     //获取当前提示框所需的位置属性
  //     this.func_position();
  //     //组件挂载2s后修改提示框的显示状态为false
  //     this.delayHiding();
  //   },
  //组件更新时重新定位提示框位置
  updated() {
    //获取当前提示框所需的位置属性
    this.func_position();
  },
  //组件被销毁后清空定时器
  destroyed() {
    clearTimeout(this.hidden_timer);
    this.$store.dispatch("set_mymsg", "");
  },
  watch: {
    //监听消息数据的变化，如果变化，显示我的提示框，并在2s后关闭
    mymsg: function() {
      //   console.log(this.mymsg)
      //清空当前的定时器
      clearTimeout(this.hidden_timer);
      //根据当前的mymsg设置提示框的显示状态
      this.myalert_is_show = this.mymsg;
      //   console.log(this.myalert_is_show)
      //调用延时隐藏的方法
      this.delayHiding();
    }
  },
  computed: {
    //利用计算属性将偏移属性拼接成为一个内联的样式
    alert_position() {
      return `margin-left:${-this.alert_left/16}rem`;
    },
    //返回对vuex仓库的变量
    mymsg() {
      return this.$store.state.mymsg;
    }
  }
};
</script>
<style scoped lang="scss">
.alert_area {
  height: 0;
  margin: auto;
  position: absolute;
  left:50%;
  top:50%;
  margin-left:0;
  margin-top:-1.875rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0.4rem;
  color: #fff;
  text-align: center;
  font-size: 1.25rem;
  line-height: 4rem;
  opacity: 0;
  padding: 0 0.625rem;
  transition: opacity 0.5s linear 0s, height 0.5s linear 0s;
  // transition: all 1s linear 0s;
  z-index: 100;
}

.alert_area.show {
  opacity: 1;
  height: 3.75rem;
}
</style>