<template>
  <div class="scrollTop" v-show="isShow" @click.stop="goTop">
    <span class="icon iconfont icon-shangfan text" ></span>
  </div>
</template>
<script>
export default {
  props:{
    top:{default:0},
    backTop:{Type:Function}
  },
  data() {
    return {
      isShow:false
    }
  },
  methods: {
    goTop(e){
      console.log("点击返回顶部")
      // console.log(e.target)
      // this.$emit("backTop")
      // this.scroll.scrollTo(0,0)
    }
  },
  watch: {
    top(){
      if(this.top > 300) {
        this.isShow = true
      }else {
        this.isShow = false
      }
    }
  },
}
</script>
<style lang="scss" scoped>
  .scrollTop{
    .text{
      font-size:1.5rem;
      line-height:2rem;
      font-weight: bold;
      color:#fff;
    }
    width:2rem;
    height:2rem;
    background:#00c17b;
    position:fixed;
    right:0.5rem;
    bottom:4%;
    border-radius: 50%;
    text-align: center;
  }
</style>
