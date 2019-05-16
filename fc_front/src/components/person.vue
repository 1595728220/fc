<template>
  <div class="person_area row m-4 pt-2 pb-4">
    <ul class="col-lg-2 col-md-3 col-sm-4 text-center">
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
        <h4>个人信息</h4>
        <span>头像：</span>
        <img :src="'http:\/\/127.0.0.1:8081/user/'+user.img_addr" v-if="user.img_addr">
        <p>昵称：{{user.nick}}</p>
        <p>所在地：{{get_local}}</p>
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
      console.log(this.$store.getters.get_uid)
      this.$axios
        .get("/user/detail", {
          params: { uid: this.$store.getters.get_uid }
        })
        .then(result => {
          // console.log(result);
          if(result.data.code === 200)
            this.user = result.data.data
          else 
            this.user = {}
        })
        .catch(err => {
          throw err;
        });
    }
  },
    // this.$store.dispatch("set_user")
  mounted() {
    this.$store.dispatch("set_user").then(this.get_user_info).catch(function(){
      console.log("用户未登录")
    })   
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
    get_local(){
      return this.user.addr && this.user.addr.split("市")[0]
    }
  }
};
</script>
<style scoped>
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
.person_msg{
  padding: 1rem 0 1rem 0.5rem;
}
</style>
