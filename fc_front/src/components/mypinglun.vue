<template>
  <div class="mt-3">
    <h2 v-if="!!nothing">{{nothing}}</h2>
    <div class="w-100" v-for="(obj,index) in words" :key="index">{{obj.content}}</div>
  </div>
</template>
<script>
export default {
  props: ["mymsg"],
  data() {
    return {
      words: [],
      user: [],
      nothing: ""
    };
  },

  watch: {
    mymsg() {
      // console.log(this.mymsg);
      this.$axios
        .get("/product/get_words", {
          params: { pid: this.mymsg }
        })
        .then(result => {
          if (result.data.code === 200) {
            this.words = result.data.msg;
            this.nothing = "";
          } else {
            this.nothing = result.data.msg;
            this.words = [];
          }
          console.log(this.words);
        })
        .catch(err => {
          throw err;
        });
    },
    words(){
      if(words.length > 0) {
        
      }
    }
  }
};
</script>
<style scoped>
</style>
