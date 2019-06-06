<template>
  <div class="user-content">
    <div class="title">
      <img v-lazy="baseSrc+user_content.img_addr">
      <span>{{user_content.nick}}</span>
    </div>

    <p class="content">{{user_content.content}}</p>
  </div>
</template>
<script>
export default {
  props: {
    user_content: { default: {} }
  },
  computed: {
    baseSrc() {
      return this.$store.state.userServerAdd;
    }
  },
  mounted() {
    // console.log(this.user_content);
  }
};
</script>
<style lang="scss" scoped>
.user-content{
  display:flex;
  flex-direction: column;
  background: #fff;
  margin-bottom:1rem;
  .title{
    display: flex;
    align-items: center;
    padding-bottom:0.5rem;
    padding-top:0.5rem;
    
    img{
      width:3.125rem;
    }
    span{
      margin-left:1rem;
      font-size:1.2rem;
      color:#000;
    }
  }
}
</style>
