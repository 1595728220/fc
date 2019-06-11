<template>
  <div class="back-bar">
    <mt-header fixed :title="title">
      <router-link  slot="left" :to="back">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  props: {
    //父组件传递的标题
    title: { default: "" },
    //父组件传递的后退路由地址
    back: { default: "" }
  },
};
</script>
<style lang="scss">
.back-bar {
  .mint-header {
    background: #00c17b;
  }
  label {
    margin-bottom: 0;
  }
  .mint-header-title {
    margin-bottom: 0;
    font-size: 1rem;
  }
 
   .mint-header .mint-button{
      outline:0;
    }
  
}
</style>
