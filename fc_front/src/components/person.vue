<template>
  <div class="person_area row m-4 pt-2 pb-4">
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
      <div v-else class="change_user_info">
        <h4>修改信息</h4>
        <div v-for="(val,ind) in user" :key="ind" class="mt-5">
          <span>{{ind|fanyi}}：</span>
          <input
            type="text"
            :disabled="ind === 'phone'"
            v-model="user[ind]"
            v-if="ind !== 'img_addr' "
          >
          <div v-else>
            <input type="file" @change="getFile" id="file" ref="file">
            <label for="file">画像変更</label>
          </div>
        </div>
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
        phone: "",
        nick: "",
        userName: "",
        addr: "",
        img_addr: ""
      },
      user: {
        phone: "",
        nick: "",
        userName: "",
        addr: "",
        img_addr: ""
      },
      newImg: "",
      newImg_addr: "http://127.0.0.1:8081/user/avatar_1.png"
    };
  },
  methods: {
    click_change_show(ind) {
      this.show_index = ind;
    },
    get_user_info() {
      // console.log(this.$store.getters.get_uid)
      this.$axios
        .get("/user/detail", {
          params: { uid: this.$store.getters.get_uid }
        })
        .then(result => {
          console.log(result);
          if (result.data.code === 200) {
            for (let key in result.data.data) {
              // this.$set(this.user,key,result.data.data[key])
              this.user[key] = result.data.data[key];
            }
          } else {
            this.user = this.user_info;
          }
          console.log(this.user);
        })
        .catch(err => {
          throw err;
        });
    },
    get_input_file() {
      this.newImg = this.$refs.file[0].files;
      this.newImg_addr = window.URL.createObjectURL(this.$refs.file[0]);
      console.log(this.newImg);
      console.log(this.newImg_addr);
    },
    getFile(e) {
      let _this = this;
      var files = e.target.files[0];
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.src = this.result;
      };
    }
  },
  // this.$store.dispatch("set_user")
  mounted() {
    this.$store.dispatch("set_user").then(this.get_user_info);
    // this.get_user_info()
  },
  // created() {
  //   this.get_user_info()
  // },
  // watch: {
  //   $route(){
  //     this.get_user_info()
  //   }
  // },
  computed: {
    person_uid() {
      return this.$store.getters.get_uid;
    },
    get_local() {
      return this.user.addr && this.user.addr.split("市")[0];
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 575px) {
  .aside_nav {
    width: 6.25rem;
  }
  .person_msg {
    width: 14rem;
  }
}

@media screen and (min-width: 576px) {
}

@media screen and (min-width: 768px) {
}

@media screen and (min-width: 992px) {
}

@media screen and (min-width: 1200px) {
}
.person_area {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.person_area ul {
  background: #ddd;
  padding: 1rem 0 1rem 0.5rem;
}
.person_area li.active {
  background: #fff;
}
.person_area li a:hover {
  color: #333;
}
.person_msg {
  height: 35rem;
  padding: 1rem 0 1rem 1rem;
  font-size: 1.25rem;
}
.person_msg img {
  width: 2.5rem;
}
.btn {
  margin: 0 auto;
}
.person_msg h4 {
  margin-bottom: 0;
  text-align: center;
  padding: 3.125rem 0;
  background: #eee;
  border-radius: 0.625rem;
}
.person_msg p {
  margin-bottom: 0;
}
.person_msg label {
  width: 120px;
  display: block;
  border-radius: 2px;
  color: #fff;
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
}
input[type="file"] {
  display: none;
  z-index: 10;
  width: 120px;
  font-size: 0;
  height: 30px;
}
</style>
