<template>
  <div class="d-flex flex-column">
    <div v-for="(obj,index) in mymsg" :key="index" class="w-100 pt-5 pb-5 d-flex justify-content-around" :class="{gray_bg:index%2 === 1}">
      <!-- <img :src="imgSrc(obj.tu)" class="tu" :class="{fr:index%2 === 1,fl:index%2 === 0}"> -->
      <img :src="imgSrc(obj.tu)">
      <div>
        <p class="zi">{{obj.wen_title}}</p>
        <p class="zi">{{obj.wen_detail}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["mymsg"],
  data() {
    return {};
  },
  mounted() {
    // console.log(this.mymsg);
  },
  computed: {},
  methods: {
    imgSrc(name) {
      return require("../assets/imgs/download/" + name);
    }
  }
  // watch: {
  //   mymsg(){
  //     console.log(this.mymsg)
  //   }
  // },
};
</script>
<style scoped>

.gray_bg {
  background: #ddd;
  justify-content: space-around;
  flex-direction: row-reverse
}
.zi:first-child{
  font-size:1.875rem;
  font-weight: bold;
  margin-top:15rem;
}
</style>

