<template>
  <div class="d-flex flex-column">
    <div
      v-for="(obj,index) in mymsg"
      :key="index"
      class="w-100 pt-5 pb-5 d-flex justify-content-around"
      :class="{gray_bg:index%2 === 1}"
    >
      <!-- <img :src="imgSrc(obj.tu)" class="tu" :class="{fr:index%2 === 1,fl:index%2 === 0}"> -->
      <img :src="`imgs/download/${obj.tu}`">
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
  computed: {},
  methods: {}
};
</script>
<style scoped lang="scss">
.gray_bg {
  background: #ddd;
  justify-content: space-around;
  flex-direction: row-reverse;
}
.zi:first-child {
  font-size: 1.875rem;
  font-weight: bold;
  margin-top: 15rem;
}
</style>

