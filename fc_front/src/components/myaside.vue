<template>
  <div class="aside_nav">
    <div v-for="(obj,index) in jump_list" :key="index" class="icon">
      <router-link v-if="obj.hasOwnProperty('to')" :to="obj.to"></router-link>
      <a :href="obj.href" v-if="obj.hasOwnProperty('href')"></a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jump_list: [{ to: "/" }, { to: "/appdown" }, { to: "/" }, { href: "#" }]
    };
  },
  methods: {}
};
</script>
<style scoped>
.aside_nav {
  position: fixed;
  height: 15rem;
  width: 3rem;
  right: 0rem;
  opacity: 0.1;
  top: 90%;
  margin-top: -15rem;
  background: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  z-index: 1000;
  transition: all 0.5s linear;
}
.aside_nav:hover {
  opacity: 0.6;
}
.aside_nav .icon a {
  width: 32px;
  height: 32px;
  margin-right: 0;
  display: block;
  background-image: url("../assets/imgs/index/icon.png");
  cursor: pointer;
}
.aside_nav .icon:nth-child(2) a {
  background-position: -10px -10px;
}
.aside_nav .icon:nth-child(3) a {
  background-position: -62px -10px;
}
.aside_nav .icon:nth-child(4) a {
  background-position: -10px -62px;
}
.aside_nav .icon:nth-child(1) a {
  background-position: -62px -62px;
}
</style>
