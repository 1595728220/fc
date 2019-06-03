<template>
  <div class="identify">
    <back-bar back="/login"></back-bar>
    <h3>输入验证码</h3>
    <div>
      <span v-show="time !== 0">{{time}}秒内短信会到到达您的手机&nbsp;</span>
      <a class="resend" @click.prevent="resend" v-show="time === 0">点击重新发送&nbsp;</a>
      <span>&nbsp;{{getPhone}}</span>
    </div>
    <div class="inputFour">
      <input
        type="text"
        maxlength="1"
        class="inputSquer"
        ref="inputSquer"
        v-model="inputIdentify[name]"
        v-for="(val,name,index) of inputIdentify"
        :key="index"
        @keyup.delete="backspace"
      >
    </div>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
export default {
  data() {
    return {
      timer: "",
      time: 60,
      inputIdentify: {
        one: "",
        two: "",
        three: "",
        four: ""
      }
    };
  },
  methods: {
    resend() {
      this.$messagebox({
        message: "是否重新发送验证码",
        showConfirmButton: "true",
        showCancelButton: "true"
      }).then(val => {
        val === "confirm" && this.$store.dispatch("requireIdentify");
        this.time = 60;
      });
    },
    //按下删除键时清空表单
    backspace() {
      this.inputIdentify = {
        one: "",
        two: "",
        three: "",
        four: ""
      };
    }
  },
  computed: {
    //返回保存在store的手机号
    getPhone() {
      return this.$store.getters.getPhone;
    },
    //返回保存在store的验证码
    getIdentify() {
      return this.$store.getters.getIdentify;
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.time !== 0 ? this.time-- : clearInterval(this.timer);
    }, 1000);
    this.$refs.inputSquer[0].focus();
    console.log(this.getIdentify);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {
    //监听表单值
    inputIdentify: {
      handler() {
        console.log("数据改变");
        let arr = Object.values(this.inputIdentify);
        let i, len;
        for (i = 0, len = arr.length; i < len; i++) {
          if (arr[i] === "") break;
        }
        if (i !== len) this.$refs.inputSquer[i].focus();
        else if (
          this.getIdentify.toLowerCase() === arr.join("").toLowerCase()
        ) {
          this.$axios
            .get("/user/mobileLogin", {
              params: {
                phone: this.$store.state.userPhone,
                identify: this.getIdentify
              }
            })
            .then(result => {
              this.$toast({
                message: result.data.msg,
                duration: 500
              });
              if (result.data.code === 200) {
                this.$router.push("/");
              }
            });
        } else {
          this.$messagebox({
            message: "验证码输入错误，请重新输入",
            showConfirmButton: "true"
          }).then(this.backspace);
        }
      },
      deep: true
    }
  },
  components: { "back-bar": BackBar }
};
</script>
<style lang="scss" scoped>
.identify {
  text-align: center;
  margin-top: 5rem;
  .resend {
    color: #00c17b !important;
  }
  .inputFour {
    display: flex;
    justify-content: space-around;
    margin-top: 3rem;
    padding: 0 2rem;
    .inputSquer {
      width: 4rem;
      height: 4rem;
      border: 1px solid #ddd;
      padding-left: 1.4rem;
      font-size: 2rem;
      &:focus {
        border-color: #00c17b;
        outline: none;
      }
    }
  }
}
</style>
