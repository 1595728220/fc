<template>
  <div class="profile clear">
    <back-bar title="我的资料" back="/"></back-bar>
    <div class="profile-list">
      <mt-cell title="头像" is-link @click.native="changeSheetVisible('avatar')">
          <img v-lazy="userServerAdd+userInfo.img_addr" class="avatar" v-if="userInfo.img_addr">
      </mt-cell>
      <mt-cell title="昵称" is-link :value="userInfo.nick">
      </mt-cell>
    </div>
    <mt-actionsheet v-model="sheetVisible.avatar" :actions="actions"></mt-actionsheet>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
export default {
  data() {
    return {
      userInfo: {},
      sheetVisible:{
        avatar: false,
      },
      actions: [
        { name: "拍照", method: this.getCamera },
        { name: "从相册中选择", method: this.getLibrary }
      ]
    };
  },
  computed: {
    userServerAdd() {
      return this.$store.state.userServerAdd;
    }
  },
  methods:{
    getCamera(){
      console.log("打开摄像机")
    },
    getLibrary(){
      console.log("打开相册")
    },
    changeSheetVisible(name){
      this.sheetVisible[name] = true
      console.log(name)
      console.log(this.sheetVisible.avatar)
    }
  },
  components: {
    "back-bar": BackBar
  },
  created() {
    this.$store.dispatch("requireUserInfo").then(() => {
      this.userInfo = this.$store.state.userInfo;
      console.log(this.userInfo);
    });
  }
};
</script>
<style lang="scss" scoped>
.profile {
  background: #eee;
  height: 100vh;
  .profile-list {
    margin-top: 3rem;
  }
  .avatar{
    width:2.5rem;
  }
  /deep/ .mint-cell-allow-right::after{
    width:1rem;
    height:1rem;
    font-weight: bold;
  }
  /deep/ .mint-cell-value.is-link{
    margin-right:1.75rem;
  }
  /deep/ .mint-cell-text{
    font-weight: 900;
  }
  /deep/ .mint-cell{
    padding:0.1rem 0;
  }
  /deep/ .mint-cell:first-child .mint-cell-wrapper{
    background-origin:content-box
  }
}
</style>
