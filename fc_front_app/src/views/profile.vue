<template>
  <div class="profile clear">
    <back-bar title="我的资料" back="/"></back-bar>
    <div class="profile-list">
      <mt-cell title="头像" is-link @click.native="changeSheetVisible('avatar')">
        <img v-lazy="userServerAdd+userInfo.img_addr" class="avatar" v-if="userInfo.img_addr">
      </mt-cell>
      <mt-cell title="昵称" is-link :value="userInfo.nick" @click.native="changeSheetVisible('nick')"></mt-cell>
      <mt-cell
        title="所在地"
        :value="userInfo.addr_city"
        v-if="userInfo.addr"
        is-link
        @click.native="changeSheetVisible('addr_city')"
      ></mt-cell>
      <mt-cell
        title="出生日期"
        :value="userInfo.birthday|monthDate"
        @click.native="changeSheetVisible('birthday')"
        is-link
      ></mt-cell>
      <mt-cell
        title="性别"
        :value="userInfo.gender|sex"
        @click.native="changeSheetVisible('gender')"
        is-link
      ></mt-cell>
      <mt-cell
        title="详细地址"
        :value="userInfo.addr_detail"
        @click.native="changeSheetVisible('addr_detail')"
        is-link
      ></mt-cell>
    </div>
    <mt-actionsheet v-model="sheetVisible.avatar" :actions="actions"></mt-actionsheet>
    <mt-popup v-model="sheetVisible.nick" popup-transition="popup-fade"></mt-popup>
    <mt-popup v-model="sheetVisible.gender" position="bottom">
      <mt-picker
        :slots="gender_slots"
        @change="onGenderChange"
        class="gender-picker"
        :showToolbar="true"
      >
        <span @click="cancelGender">取消</span> 
        <span @click="saveGender">保存</span>
      </mt-picker>
    </mt-popup>
    <mt-popup v-model="sheetVisible.addr_detail" position="bottom"></mt-popup>

    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="birthday"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="new Date('1919/1/1')"
      :endDate="new Date()"
      @confirm="handleConfirm"
    ></mt-datetime-picker>
    <mt-popup v-model="sheetVisible.addr_city" position="bottom" class="addr-city">
      <div class="picker-toolbar">
        <span @click="cancelCity">取消</span>
        <span @click="saveCity">保存</span>
      </div>
      <addr-city @getAddr="modifyCity"></addr-city>
      <mt-button type="primary" @click.native="saveCity">保存</mt-button>
      <mt-button @click.native="cancelCity">取消</mt-button>
    </mt-popup>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
import AddrCity from "../components/common/addr_city";
export default {
  data() {
    return {
      // userInfo: {},
      sheetVisible: {
        avatar: false,
        nick: false,
        birthday: false,
        addr_city: false,
        addr_detail: false,
        gender: false
      },
      addr_city: "",
      actions: [
        { name: "拍照", method: this.getCamera },
        { name: "从相册中选择", method: this.getLibrary }
      ],
      birthday: "",
      gender_slots: [{ flex: 1, values: ["男", "女"], textAlign: "center" }],
      gender: 1
    };
  },
  computed: {
    userServerAdd() {
      return this.$store.state.userServerAdd;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    onGenderChange(e) {
      let gender = e.getSlotValue(0) === '男' ? 1 : 2;
      console.log(gender);
      this.gender = gender
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(val) {
      this.$axios
        .post("/user/add", {
          birthday: val.getTime()
        })
        .then(result => {
          this.$toast(result.data.msg);
          if (result.data.code === 200) this.requireUserInfo();
        });
    },
    //获取相机
    getCamera() {
      console.log("打开摄像机");
      // this.sheetVisible.avatar = false;
      // console.log(this.sheetVisible.avatar)
    },
    //获取相册
    getLibrary() {
      console.log("打开相册");
      // this.sheetVisible.avatar = false;
    },
    //根据属性名修改对应的组件可见
    changeSheetVisible(name) {
      this.sheetVisible[name] = true;
      console.log(name);
      console.log(this.sheetVisible[name]);
      if (name === "birthday") this.openPicker();
    },
    requireUserInfo() {
      this.$store.dispatch("requireUserInfo");
    },
    //修改城市以上的地址
    modifyCity(prov, city, area) {
      if (prov.indexOf("市") === -1) this.addr_city = prov + city + area;
      else this.addr_city = prov + area;
    },
    //将城市以上的地址保存到后台
    saveCity() {
      this.$axios
        .post("/user/add", {
          addr_city: this.addr_city
        })
        .then(result => {
          this.$toast(result.data.msg);
          if (result.data.code === 200) this.requireUserInfo();
          this.sheetVisible.addr_city = false;
        });
    },
    //点击取消选择城市
    cancelCity() {
      this.sheetVisible.addr_city = false;
    },
    //点击保存性别
    saveGender() {
      this.$axios
        .post("/user/add", {
          gender: this.gender
        })
        .then(result => {
          this.$toast(result.data.msg);
          if (result.data.code === 200) this.requireUserInfo();
          this.sheetVisible.gender = false;
        });
    },
    //点击取消性别选择
    cancelGender() {
      this.sheetVisible.gender = false;
    }
  },
  components: {
    "back-bar": BackBar,
    "addr-city": AddrCity
  },
  watch: {
    // 监听可见对象收货地址属性的变化
    "sheetVisible.addr_detail": {
      handler(val) {
        if (val) {
          this.$messagebox({
            showInput: true,
            title: "修改详细地址",
            showConfirmButton: true,
            confirmButtonText: "修改",
            inputType: "text",
            showCancelButton: true,
            message: "输入街道以下地址信息",
            $type: "prompt"
          }).then(
            ({ action, value }) => {
              console.log(action);
              console.log(value);
              //如果确认修改
              if (action === "confirm") {
                //发起修改请求
                this.$axios
                  .post("/user/add", { addr_detail: value })
                  .then(result => {
                    //提示请求结果
                    this.$toast({ message: result.data.msg });
                    //如果请求成功
                    if (result.data.code === 200) {
                      //请求新的用户信息
                      this.requireUserInfo();
                    }
                  });
              }
              //点击修改后隐藏
              this.sheetVisible.addr_detail = false;
            },
            () => {
              //点击取消后隐藏
              this.sheetVisible.addr_detail = false;
            }
          );
        }
      }
    },
    // 监听可见对象昵称属性的变化
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
          }).then(
            ({ action, value }) => {
              console.log(action);
              console.log(value);
              if (action === "confirm") {
                this.$axios.post("/user/add", { nick: value }).then(result => {
                  this.$toast({ message: result.data.msg });
                  if (result.data.code === 200) {
                    this.requireUserInfo();
                  }
                });
              }
              this.sheetVisible.nick = false;
            },
            () => {
              this.sheetVisible.nick = false;
            }
          );
        }
      }
    }
  },
  created() {
    this.requireUserInfo();
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

  .addr-city {
    text-align: center;
    .mint-button--primary {
      background-color: #00c17b;
    }
    .mint-button--normal {
      line-height: 2.5625rem;
      margin: 1rem 0;
      outline: none;
    }
  }
  .picker-toolbar {
    height: 40px;
    border-bottom: solid 1px #eaeaea;
    span:first-child {
      float: left;
    }
    span:last-child {
      float: right;
    }
    span {
      display: inline-block;
      width: 50%;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      color: #26a2ff;
    }
  }
  .gender-picker {
    width: 100vw;
  }
}
</style>
