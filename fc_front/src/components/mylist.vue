<template>
  <ul class="productlist row m-0 mb-3">
    <li v-for="(product,key) in products" class="col-sm-12 col-md-6 col-lg-3 p-0 mt-5" :key="key">
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
  props: ["mymsg"],
  data() {
    return {
      products: [], //保存产品列表的数组
      productsCount:0
    };
  },
  mounted() {
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
          //讲搜索的总记录数存入变量
          this.productsCount = result.data[1][0]["found_rows()"]
          this.products.forEach(el => {
            this.$set(
              el,
              "imgSrc",
              require("../assets/imgs/product/" + el.photo1)
            );
          });
        })
        .catch(error => {
          throw error;
        });
    },
    sendValToFather(){
    }
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
    productsCount(){
      // console.log("子组件查询数据库获取产品总数："+this.productsCount)
      this.$emit("sendfatherevent",this.productsCount)
    }
    
  }
};
</script>
<style>
.productlist a {
  background: rgba(242, 242, 242, 1);
  /* background:#000 !important; */
}

.productlist .price {
  font-weight: 700;
  font-size: 20px;
  color: #00c17b;
}

.productlist .described {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.productlist > li {
  border: 1px solid #ddd;
}
</style>