<template>
  <div class="row m-0 detail bg-secondary">
    <div class="col-lg-7 tu">
      <div class="row m-0">
        <div class="col-lg-10">
          <img :src="imgSrc.product[showIndex]" alt class="w-100">
        </div>
        <div class="col-lg-2 d-flex flex-column justify-content-between">
          <img :src="val" v-for="(val,index) in imgSrc.product" :key="index" class="w-100" @click="qiehuan(index)">
        </div>
      </div>
    </div>
    <div class="col-lg-5 wen d-flex flex-column justify-content-between">
      <!-- <div class=" "> -->
        <h3>{{product.described}}</h3>
        <h5>货号:{{product.artNo}}</h5>
        <h5>建议零售价:{{product.price}}</h5>
        <h5>提示:该宝贝只能在对庄APP内购买</h5>
        <router-link to="/appdown" class="btn btn-success">APP内购买</router-link>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pid: 0,
      product: {},
      imgSrc:{product:[],promise:[]},
      showIndex:0
    };
  },
  methods: {
    qiehuan(val){
      // console.log(val)
      this.showIndex = val
    }
  },
  mounted() {
    //页面加载后将路由中的产品编号参数保存在本地变量中
    this.pid = this.$route.params.pid;
    //根据产品编号查找对应的产品信息
    this.$axios
      .get("/product/detail", {
        params: { pid: this.pid }
      })
      .then(result => {
        for (let key in result.data[0]){
          this.$set(this.product, key, result.data[0][key]);
          switch(key){
            case "photo1":
            case "photo2":
            case "photo3":
            case "photo4":
              this.imgSrc.product.push(require('../assets/imgs/product/'+result.data[0][key]))
              break
            case "promise":
              this.imgSrc.promise.push(require('../assets/imgs/product/'+result.data[0][key]))
              break
            default:
          }
        }
        // console.log(this.imgSrc)
        console.log(result.data[0]);
      })
      .catch(err => {
        throw err;
      });
  }
  // watch: {
  //   //监听pid的变化,如果变化就请求新的产品详情信息
  //   pid() {}
  // }
};
</script>
<style scoped>
</style>
