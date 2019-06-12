<template>
  <div class="profile clear">
    <back-bar title="我的资料" back="/"></back-bar>
    <div class="profile-list">
      <mt-cell title="头像" is-link @click.native="changeSheetVisible('avatar')">
        <img v-lazy="userServerAdd+userInfo.img_addr" class="avatar" v-if="userInfo.img_addr">
      </mt-cell>
      <mt-cell title="昵称" is-link :value="userInfo.nick" @click.native="changeSheetVisible('nick')"></mt-cell>
      <mt-cell title="所在地" :value="userInfo.addr.split('市')[0]+'市'" v-if="userInfo.addr"></mt-cell>
    </div>
    <mt-actionsheet v-model="sheetVisible.avatar" :actions="actions"></mt-actionsheet>
    <mt-popup v-model="sheetVisible.nick" popup-transition="popup-fade"></mt-popup>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
export default {
  data() {
    return {
      // userInfo: {},
      sheetVisible: {
        avatar: false,
        nick: false
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
    },
    userInfo(){
      return this.$store.state.userInfo
    }
  },
  methods: {
    getCamera() {
      console.log("打开摄像机");
    },
    getLibrary() {
      console.log("打开相册");
    },
    changeSheetVisible(name) {
      this.sheetVisible[name] = true;
      console.log(name);
      console.log(this.sheetVisible.avatar);
    }
  },
  components: {
    "back-bar": BackBar
  },
  watch: {
    "sheetVisible.nick": {
      handler(val) {
        if (val) {
          this.$messagebox({
            showInput: true,
            title: "修改昵称",
            showConfirmButton: true,
            confirmButtonText: "修改",
            inputType: "text",
            showCancelButton: true,
            message: "输入昵称",
            $type: "prompt"
          }).then(({ action, value }) => {
            console.log(action);
            console.log(value);
            if(action === "confirm") {
              this.$axios.post("/user/add",{nick:value}).then(result=>{
                this.$toast({message:result.data.msg})
                if(result.data.code === 200) {
                  this.$store.dispatch("requireUserInfo")
                }
                this.sheetVisible.nick = false
              })
            }
          });
        }
      }
    }
  },
  created() {
    this.$store.dispatch("requireUserInfo")
    // .then(() => {
    //   this.userInfo = this.$store.state.userInfo;
    //   console.log(this.userInfo);
    // });
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
  .avatar {
    width: 2.5rem;
  }
  /deep/ .mint-cell-allow-right::after {
    width: 1rem;
    height: 1rem;
    font-weight: bold;
  }
  /deep/ .mint-cell-value.is-link {
    margin-right: 1.75rem;
  }
  /deep/ .mint-cell-text {
    font-weight: 900;
  }
  /deep/ .mint-cell {
    padding: 0.1rem 0;
  }
  /deep/ .mint-cell:first-child .mint-cell-wrapper {
    background-origin: content-box;
  }
}
</style>
