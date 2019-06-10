<template>
  <div class="personal">
    <div class="user">
      <img v-lazy="baseServerAdd+userInfo.img_addr">
      <div class="nick">用户昵称：{{userInfo.nick}}</div>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("requireUserInfo");
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    baseServerAdd(){
      return this.$store.state.userServerAdd
    }
  }
};
</script>
<style lang="scss" scoped>
.personal{
  .user{
    padding:1rem 0;
    text-align: center;
    .nick{
      margin-top:0.5rem;
    }
  }
}
</style>
