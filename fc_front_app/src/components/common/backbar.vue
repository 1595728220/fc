<template>
  <div class="back-bar">
    <mt-header fixed :title="title">
      <router-link :to="back" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  props: {
    title: { default: "" },
    back: { default: "" }
  }
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
}
</style>
