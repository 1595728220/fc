<template>
  <div class>
    <h2 v-if="!!nothing">{{nothing}}</h2>
    <div class="w-100 user" v-for="(obj,index) in words" :key="index">
      <img :src="'http:\/\/127.0.0.1:8081/user/'+obj.img_addr" class="fl mt-2">
      <span>{{obj.nick}}</span>
      <p>{{obj.content}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["mymsg"],
  data() {
    return {
      words: [],
      imgSrc: [],
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
          // console.log(this.words);
        })
        .catch(err => {
          throw err;
        });
    }
    // words(){
    //   if(words.length > 0) {
    //     for(let val of words){
    //       imgSrc.push(require("../"+val))
    //     }
    //   }
    // }
  }
};
</script>
<style scoped>
.user {
  padding: 1.875rem;
  border-top: 0.0625rem solid #ccc;
  border-bottom: 0.0625rem solid #ccc;
}
.user img {
  width: 2rem;
  vertical-align: bottom;
}
.user span {
  padding-left: 1.25rem;
  font-size: 1rem;
  color: #0aa1ed;
}
.user p {
  padding-left: 3.25rem;
  font-size: 1.25rem;
  margin-top: 0.625rem;
}
</style>
