<template>
  <div class="aside_nav">
    <div v-for="(obj,index) in jump_list" :key="index" class="icon">
      <router-link v-if="obj.hasOwnProperty('to')" :to="obj.to"></router-link>
      <a :href="obj.href" v-else></a>
      <!-- <a :href="obj.href" v-if="obj.hasOwnProperty('href')"></a> -->
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
  methods: {},
  watch: {}
};
</script>
<style scoped lang="scss">
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
  &:hover {
    opacity: 0.6;
  }
  .icon a {
    width: 2rem;
    height: 2rem;
    margin-right: 0;
    display: block;
    background-image: url("../../public/imgs/index/icon.png");
    cursor: pointer;
  }
  .icon:nth-child(2) a {
    background-position: -0.625rem -0.625rem;
  }
  .icon:nth-child(3) a {
    background-position: -3.875rem -0.625rem;
  }
  .icon:nth-child(4) a {
    background-position: -0.625rem -3.875rem;
  }
  .icon:nth-child(1) a {
    background-position: -3.875rem -3.875rem;
  }
}
</style>
