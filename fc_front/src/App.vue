<template>
  <div id="app" class="container-fluid p-0" @click="click_hidden_dropdown">
    <myheader></myheader>
    <router-view></router-view>
    <myfooter></myfooter>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    click_hidden_dropdown() {
      if (this.$store.getters.get_class_is_show_dropdown)
        this.$store.dispatch("set_class_is_show_dropdown", false);
      if (this.$store.getters.get_search_is_show_dropdown)
        this.$store.dispatch("set_search_is_show_dropdown", false);
    }
  }
};
</script>

<style>
</style>
