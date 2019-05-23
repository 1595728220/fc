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
/* 网页样式初始化 */
* {
  margin: 0;
  padding: 0;
}
body,
a {
  color: #333;
  font: .75rem "Helvetica Neue", Helvetica, Arial, sans-serif;
}
a:hover,
a:focus {
  text-decoration: none;
}
ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
/*定义一些常用的样式*/
.clear:before {
  content: "";
  display: table;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.pr {
  position: relative;
}
.pa {
  position: absolute;
}
.df {
  display: flex;
}
.db {
  display: block;
}
.dib {
  display: inline-block;
}
.cp {
  cursor: pointer;
}
img {
  border: 0;
  vertical-align: middle;
}

input:-webkit-autofill {
  box-shadow: 0 0 0 62.5rem #fff inset;
}
.triangle-top {
  width: 0;
  height: 0;
  border-left: .375rem solid transparent;
  border-right: .375rem solid transparent;
  border-top: .5rem solid #333;
  display: inline-block;
  margin-left: .1875rem;
}
.triangle-right {
  width: 0;
  height: 0;
  border-top: .375rem solid transparent;
  border-bottom: .375rem solid transparent;
  border-right: .5rem solid #333;
  display: inline-block;
  margin-left: .1875rem;
}
.triangle-bottom {
  width: 0;
  height: 0;
  border-left: .375rem solid transparent;
  border-right: .375rem solid transparent;
  border-bottom: .5rem solid #333;
  display: inline-block;
  margin-left: .1875rem;
}
.triangle-left {
  width: 0;
  height: 0;
  border-top: .375rem solid transparent;
  border-bottom: .375rem solid transparent;
  border-left: .5rem solid #333;
  display: inline-block;
  margin-left: .1875rem;
}
.tr {
  transition: all 0.5s linear 0s;
}
.small_font {
  font-size: .75rem;
  color: #333;
}
.v_hidden {
  visibility: hidden;
  height: 0 !important;
}
.v_show {
  visibility: visible;
}
.middle_font {
  font-size: 1rem;
  color: #333;
}
.oh {
  overflow: hidden;
}
a:focus {
  box-shadow: 0 0 0 !important;
}
[v-cloak] {
  display: none !important;
}
</style>
