<template>
  <div id="app" class="container-fluid p-0" @click="click_hidden_class_dropdown">
    <myheader></myheader>
    <router-view></router-view>
    <myfooter></myfooter>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    click_hidden_class_dropdown(){
      this.$store.dispatch("set_class_is_show_dropdown",false)
    }
  },
};
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
