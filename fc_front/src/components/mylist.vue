<template>
  <ul class="productlist row m-0">
    <li v-for="(product,key) in products" class="col-sm-12 col-md-6 col-lg-3 mb-5" :key="key">
      <router-link :to="'/detail/'+product.pid" class="d-block p-2">
        <img :src="`http://127.0.0.1:8081/product/${product.photo1}`" class="w-100">
        <p class="described middle_font product_title mb-3 mt-3 ml-0">{{product.described}}</p>
        <p class="text-success product_price m-0">￥{{product.price.toFixed(2)}}</p>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["mymsg"],
  data() {
    return {
      products: [], //保存产品列表的数组
      productsCount: 0
    };
  },
  created() {
    // console.log(this.mymsg);
    this.query_product();
  },
  methods: {
    query_product() {
      //根据父组件给定的参数查询相符合条件的产品信息
      this.$axios
        .get("/product/list", {
          params: this.mymsg
        })
        .then(result => {
          // console.log(result.data)
          //将结果保存在产品列表中
          this.products = result.data[0];
          // console.log(this.products)
          //讲搜索的总记录数存入变量
          this.productsCount = result.data[1][0]["found_rows()"];
        })
        .catch(error => {
          throw error;
        });
    },
  },
  watch: {
    //监视props中的的mymsg变化，变化后执行查询产品操作
    mymsg: {
      handler() {
        // console.log("监听mymsg整个对象的变化");
        // console.dir(this.mymsg)
        this.query_product();
      },
      deep: true
    },

    //监视产品总记录数，如果改变就向父组件发送该值
    productsCount() {
      // console.log("子组件查询数据库获取产品总数："+this.productsCount)
      this.$emit("sendfatherevent", this.productsCount);
    }
  }
};
</script>
<style scoped lang="scss">
.productlist a {
  background: rgb(209, 209, 209);
  border-radius: 1rem;
}
.productlist > li {
  padding: 0 0.8rem;
}
.productlist .product_title {
  margin-left: 0.625rem;
}
.productlist .product_price {
  font-weight: 700;
  font-size: 1.25rem;
  color: #00c17b;
  margin-left: 0.625rem;
}
.productlist .described {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>