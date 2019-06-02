<template>
  <div class="login">
    <h3>输入手机号</h3>
    <p>进入翡翠源头批发市场</p>
    <mt-field
      label="手机号"
      placeholder="请输入手机号"
      v-model="phone"
      type="tel"
      :attr="{autofocus:'autofocus'}"
      :state="phoneTest ? 'success': 'error'"
    ></mt-field>
    <mt-button
      size="large"
      :class="{'is-disabled':!phoneTest}"
      type="primary"
      :disabled="!phoneTest"
      @click.native="toIdentify"
    >下一步</mt-button>
    <mt-button size="small" class="weixin-login" v-show="false">
      <img :src="weixinIcon" height="40" width="40" slot="icon">
    </mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      weixinIcon: "imgs/login/weixinIcon.png",
      phoneRegex: /^1[34578]\d{9}$/
    };
  },
  computed: {
    phoneTest() {
      return !!this.phoneRegex && this.phoneRegex.test(this.phone);
    }
  },
  watch: {
    phone() {
      // this.$refs.phoneForm.state =
      // this.$refs.buttonForm.disabled = this.phoneTest
    }
  },
  // mounted() {
  //   this.phoneRegex = this.$store.state.phoneRegex
  // },
  methods: {
    toIdentify() {
      this.$store.dispatch("requireIdentify", this.phone);
      this.$router.push("/identify");
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  padding: 5rem 1rem;
  text-align: center;
  background: #eee;
  height: 100vh;
  .mint-field {
    text-align: left;
  }
  .mint-field /deep/ .mint-cell-title {
    width: 77px !important;
  }
  /deep/ .mint-cell-wrapper {
    border-bottom: 1px solid #ddd;
  }
  .mint-button {
    margin-top: 1rem;
  }
  .mint-button:focus {
    border: none;
    outline: none;
  }
  .mint-button--primary {
    background-color: #00c17b;
    color: #fff;
  }
  .weixin-login {
    background: #fff;
    position: absolute;
    bottom: 2rem;
    left: 50%;
    margin-left: -1.875rem;
    border-radius: 50%;
    // padding:10px 10px;
    padding: 0.625rem;
    width: 3.75rem;
    height: 3.75rem;
  }
}
</style>
