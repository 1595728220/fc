<template>
  <ul class="productlist row m-0 mb-3">
    <li v-for="(product,key) in products" class="col-sm-12 col-md-6 col-lg-3 p-0" :key="key">
      <router-link :to="'/detail/'+product.pid" class="d-block p-1">
        <img :src="product.imgSrc" class="w-100 img-thumbnail p-1">
        <p class="described middle_font">{{product.described}}</p>
        <p class="text-success price">￥{{product.price}}</p>
      </router-link>
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['mymsg'],
    data() {
      return {
        products: [] //保存产品列表的数组
      }
    },
    mounted() {
      // console.log(this.mymsg)
      //根据父组件给定的参数查询相符合条件的产品信息
      this.$axios.get("/product/list", {
          params: this.mymsg
        }).then(result => {
          // console.log(result.data)
          //将结果保存在产品列表中
          this.products = result.data
          this.products.forEach(el => {
            this.$set(el, "imgSrc", require("../assets/imgs/product/" + el.photo1))
          })
        })
        .catch(error => {
          throw error
        })
    },
  }
</script>
<style>
  .productlist a{
    background:rgba(242, 242, 242, 1);
    /* background:#000 !important; */
  }
  .productlist .price {
    font-weight: 700;
    font-size: 20px;
    color: #00C17B;
  }
  .productlist>li{
    border:1px solid #ddd;
  }
</style>