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
    <div class="col-lg-10 col-md-9 col-sm-8 person_msg">
      <div v-if="show_index === 0">
        <h4 class="mb-5">个人信息</h4>
        <span>头像：</span>
        <img :src="'http:\/\/127.0.0.1:8081/user/'+user.img_addr" v-if="user.img_addr">
        <p class="mt-5">昵称：{{user.nick}}</p>
        <p class="mt-5">所在地：{{get_local}}</p>
        <p class="mt-5">手机号：{{user.phone}}</p>
      </div>
      <div v-if="show_index === 1">
        <h4 class="mb-5">收货地址</h4>
        <p class="mt-5">姓名：{{user.userName}}</p>
        <p class="mt-5">联系方式：{{user.phone}}</p>
        <p class="mt-5">详细地址：{{user.addr}}</p>
      </div>
      <div v-if="show_index === 2">
        <h4 class="mb-5">订单详情</h4>
        <div class="text-center">
          <p class="text-center mb-5">请在对庄APP 内查看订单信息</p>
          <router-link to="/appdown" class="btn btn-primary">下载对庄APP</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      left_nav: ["个人信息", "收货地址", "订单详情"],
      show_index: 0,
      user: ""
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
          // console.log(result);
          if (result.data.code === 200) this.user = result.data.data;
          else this.user = {};
          // console.log(this.user);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  // this.$store.dispatch("set_user")
  mounted() {
    this.$store
      .dispatch("set_user")
      .then(this.get_user_info)
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
  .aside_nav{
    width:6.25rem;
  }
  .person_msg{
    width:14rem;
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
</style>
