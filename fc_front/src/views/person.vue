<template>
  <div class="person_area row m-4 pt-2 pr">
    <ul class="col-lg-2 col-md-3 col-sm-4 text-center aside_nav">
      <li
        class="pt-3 pb-3"
        :class="{active:show_index === ind}"
        v-for="(val,ind) in left_nav"
        :key="ind"
      >
        <a href="javascript:;" class="middle_font" @click="click_change_show(ind)">{{val}}</a>
      </li>
    </ul>
    <div class="col-lg-10 col-md-9 col-sm-8 person_msg pt-0">
      <div v-if="show_index === 0">
        <h4>个人信息</h4>
        <div class="mt-5">
          <span>头像：</span>
          <img :src="'http:\/\/127.0.0.1:8081/user/'+user.img_addr" v-if="user.img_addr">
          <!-- <img src="http://file.urlip.cn/fc_assets/avatar/avatar_1.png" alt=""> -->
        </div>
        <p class="mt-5">昵称：{{user.nick}}</p>
        <p class="mt-5">所在地：{{get_local}}</p>
        <p class="mt-5">手机号：{{user.phone}}</p>
      </div>
      <div v-else-if="show_index === 1">
        <h4>收货地址</h4>
        <p class="mt-5">姓名：{{user.userName}}</p>
        <p class="mt-5">联系方式：{{user.phone}}</p>
        <p class="mt-5">详细地址：{{user.addr}}</p>
      </div>
      <div v-else-if="show_index === 2">
        <h4>订单详情</h4>
        <div class="text-center mt-5">
          <p class="text-center mb-5">请在对庄APP 内查看订单信息</p>
          <router-link to="/appdown" class="btn btn-primary">下载对庄APP</router-link>
        </div>
      </div>
      <div v-else class="change_user_info pr" ref="father_area">
        <myalert></myalert>
        <h4>修改信息</h4>
        <div v-for="(val,ind) in user" :key="ind" class="mt-4">
          <span>{{ind|fanyi}}：</span>
          <input
            type="text"
            :disabled="ind === 'phone'"
            v-model="user[ind]"
            v-if="ind !== 'img_addr' "
          >
          <div v-else class="file_box pr">
            <input type="file" @change="getFile" id="file" ref="file">
            <label for="file">选择头像</label>
            <img :src="newImg_addr" alt>
            <button @click="save_img">保存头像</button>
          </div>
        </div>
        <button @click="save_msg" class="user_submit" :disabled="this.user_no_change">保存用户信息</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      left_nav: ["个人信息", "收货地址", "订单详情", "修改信息"],
      show_index: 0,
      //用于用户信息重置
      user_info: {
        phone: "无",
        nick: "无",
        userName: "不详",
        addr: "无",
        img_addr: "avatar_1.png"
      },
      user: {
        phone: "",
        nick: "",
        userName: "",
        addr: "",
        img_addr: ""
      },
      newImg: "",
      // newImg_addr: "http://127.0.0.1:8081/user/avatar_1.png"
      newImg_addr: "",
      // alert_show: false,
      user_no_change: true
    };
  },
  methods: {
    //更换当前显示的右侧内容下标
    click_change_show(ind) {
      this.show_index = ind;
    },
    //获取用户基本信息
    get_user_info() {
      //在还未获取用户基本信息之前，认为user信息未修改
      this.user_no_change = true;
      // console.log(this.$store.getters.get_uid)
      this.$axios
        .get(
          "/user/detail"
          //移出请求的uid参数
          // , {
          //   params: { uid: this.$store.getters.get_uid }
          // }
        )
        .then(result => {
          // console.log(result);
          //如果查询用户基本信息成功
          if (result.data.code === 200) {
            //遍历取出需要的结果保存入本地
            let { phone, nick, userName, addr, img_addr } = result.data.data,
              data = { phone, nick, userName, addr, img_addr };
            for (let key in data) {
              // this.$set(this.user,key,result.data.data[key])
              this.user[key] = data[key];
              //保存部分信息到用于比较的user_info
              this.user_info[key] = data[key];
            }
          } else {
            //查询用户失败
            // 将user初始化
            this.user = this.user_info;
          }
          // console.log(this.user);
        })
        .catch(err => {
          throw err;
        });
    },
    // 得到file表单的值，保存在data的变量中
    getFile(e) {
      let _this = this;
      var files = e.target.files[0];
      this.newImg = files;
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.newImg_addr = this.result;
      };
    },
    save_img() {
      //取出完整的文件信息
      let x = this.newImg;
      // console.log(x)
      // console.log(this.person_uid)
      //创建一个form对象
      let params = new FormData();
      //向表单对象添加数据
      params.append("avatar", x, x.name);
      params.append("uid", this.person_uid);

      // console.log(params.get("uid"))
      // console.log(params.get("file"))
      //设置请求头
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      //发送请求
      this.$axios
        .post("/user/avatar", params, config)
        .then(result => {
          // console.log(result)
          // if(result.data.code === 200) {
          //将结果对象保存进alert组件展示的变量中
          this.$store.dispatch("set_mymsg", result.data.msg);
          // this.alert_show = this.$store.getters.get_mymsg;

          // }
          //清空旧数据
          this.newImg_addr = "";
          this.newImg = "";
          // console.log(this.result_msg)
        })
        .catch(err => {
          throw err;
        });
    },
    //点击事件处理函数，发送添加用户信息的请求
    save_msg() {
      // console.log(this.user)
      // console.log(this.user_info)
      // console.log(JSON.stringify(this.user) === JSON.stringify(this.user_info) )
      //如果用户修改个人信息，则发送请求，否则什么也不做
      this.user_is_change ||
        this.$axios
          .post("/user/add", {
            uid: this.$store.getters.get_uid,
            addr: this.user.addr,
            userName: this.user.userName,
            nick: this.user.nick
          })
          .then(result => {
            // console.log(result)
            //将结果对象保存进alert组件展示的变量中
            this.$store.dispatch("set_mymsg", result.data.msg);
            // this.alert_show = this.$store.getters.get_mymsg;
            //修改成功个人信息后重新获取个人信息
            this.get_user_info();
            // console.log(this.alert_show)
          })
          .catch(err => {
            throw err;
          });
    }
  },
  // this.$store.dispatch("set_user")
  created() {
    //组件挂载后,获取当前用户信息
    this.$store.dispatch("set_user").then(this.get_user_info);
    // this.get_user_info()
  },
  computed: {
    //向vuex获取当前用户id
    person_uid() {
      return this.$store.getters.get_uid;
    },
    //取出市级信息以上的地址
    get_local() {
      return this.user.addr && this.user.addr.split("市")[0];
    }
  },
  watch: {
    //监听user对象的变化
    user: {
      //变化后执行的事件处理函数
      handler() {
        // console.log(this.user)
        // console.log(this.user_info)
        //保存用户信息是否未修改
        this.user_no_change =
          JSON.stringify(this.user) === JSON.stringify(this.user_info);
        // console.log(this.user_no_change);
      },
      deep: true
    }
  }
};
</script>
<style scoped lang="scss">
@media screen and (max-width: 575px) {
  .aside_nav {
    width: 6.25rem;
  }
  .person_msg {
    width: 14rem;
  }
}
@media screen and (max-width: 622px) {
  .person_area {
    height: 47.5rem;
  }
}
.btn {
  margin: 0 auto;
}
.person_area {
  border-top: 0.0625rem solid #eee;
  border-bottom: 0.0625rem solid #eee;
  ul {
    background: #ddd;
    padding: 1rem 0 1rem 0.5rem;
    li.active {
      background: #fff;
      a:hover {
        color: #333;
      }
    }
  }
  .person_msg {
    height: 35rem;
    padding: 1rem 0 1rem 1rem;
    font-size: 1.25rem;
    position: static;
    img {
      width: 2.5rem;
    }
    h4 {
      margin-bottom: 0;
      text-align: center;
      padding: 3.125rem 0;
      background: #eee;
      border-radius: 0.625rem;
    }
    p {
      margin-bottom: 0;
    }
    .change_user_info {
      & > div {
        text-align: center;
      }
      span {
        display: inline-block;
        width: 7rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: right;
      }
      input {
        height: 2.5rem;
        box-shadow: 0 0 0;
        border: 0;
        border-bottom: 0.0625rem solid #333;
        outline: 0;
        vertical-align: bottom;
        &:disabled {
          background: rgba(0, 0, 0, 0.1);
        }
      }
      .user_submit {
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;
        z-index: 10;
        background-image: linear-gradient(to bottom, #27b1f6 0%, #0aa1ed 100%);
        font-size: inherit;
        padding: 0.42rem 0.625rem;
        border-radius: 0.3125rem;
        color: #fff;
        margin-bottom: 0;
        border: 0;
        &:disabled {
          background: rgba(0, 0, 0, 0.5);
          cursor: default;
        }
      }
      .file_box {
        display: inline-block;
        width: 15.1875rem;
        label,
        button {
          position: absolute;
          top: 0;
          left: 0;
          cursor: pointer;
          z-index: 10;
          background-image: linear-gradient(
            to bottom,
            #27b1f6 0%,
            #0aa1ed 100%
          );
          font-size: inherit;
          padding: 0.42rem 0.625rem;
          border-radius: 0.3125rem;
          color: #fff;
          margin-bottom: 0;
        }
        button {
          top: 3.125rem;
          padding: 0.42rem 0.625rem;
          box-shadow: 0 0 0;
          border: 0;
        }
        img {
          margin-left: 7.625rem;
          width: 2.5rem;
        }
        input[type="file"] {
          position: absolute;
          left: -9999rem;
        }
      }
    }
  }
}
</style>
