<template>
  <div class="title-bar">
    <mt-search v-model="keyword" cancel-text="取消" placeholder="搜索" :result.sync="result">
      <mt-cell v-for="(item,index) in result" :title="item.title" :value="item.value" :key="index"></mt-cell>
    </mt-search>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
      result: [
        { title: "冰种", value: "冰种" },
        { title: "冰种", value: "冰种" },
        { title: "冰种", value: "冰种" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.title-bar {
  width: 100%;
  position: fixed;
  height: 3rem;
}
</style>
