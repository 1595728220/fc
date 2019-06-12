<template>
  <div class="product-detail" ref="fatherScroll">
    <!-- <back-bar title="产品详情" back="/product"></back-bar> -->
    <back-bar title="产品详情" :back="backAddr"></back-bar>
    <div class="hinder"></div>
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item,index) of imgList" :key="index">
        <img :src="baseSrc+item" class="detail-img" v-if="!!item">
      </mt-swipe-item>
    </mt-swipe>
    <div class="info">
      <div>{{product_detail.described}}，质量优良，品质有保障，欲购从速！</div>
      <div>货号：{{product_detail.artNo}}</div>
      <div>
        价格：
        <span>{{product_detail.price|money}}</span>
      </div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="详情">详情</mt-tab-item>
      <mt-tab-item id="评价">评价</mt-tab-item>
      <mt-tab-item id="保障">保障</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="详情">
        <mt-cell
          v-for="(val,name,index) in show_detail"
          :title="name|fanyi"
          :key="index"
          :value="val"
        />
        <div v-for="(item,index) of imgList" :key="index+10">
          <img :src="baseSrc+item" class="detail-img" v-if="!!item">
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="评价">
        <div>
          <div v-if="content">
            <div v-for="(obj,index) of content" :key="index">
              <user-content :user_content="obj"></user-content>
            </div>
          </div>
          <div v-if="content_msg" class="content_msg">{{content_msg}}</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="保障">
        <img v-lazy="baseSrc+product_detail.promise">
      </mt-tab-container-item>
    </mt-tab-container>
    <scroll-top :top="top" @backTop="initTop"></scroll-top>
    <!-- <immediately-buy :pid="pid"></immediately-buy> -->
    <immediately-buy></immediately-buy>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
import ScrollTop from "../components/common/scrollTop";
import UserContent from "../components/common/user_content";
import ImmediatelyBuy from "../components/common/immediatelyBuy";
export default {
  data() {
    return {
      // product_detail: {},
      selected: "详情",
      top: 0,
      content: null,
      content_msg: "",
      // pid: "",
      backAddr: ""
    };
  },
  computed: {
    //获取产品图片保存的路径
    baseSrc() {
      return this.$store.state.productServerAdd;
    },
    //获取产品的图片
    imgList() {
      let { photo1, photo2, photo3, photo4 } = this.$store.state.productDetail;
      return [photo1, photo2, photo3, photo4];
    },
    //提取要展示的详情信息
    show_detail() {
      let {
        artNo,
        classify,
        color,
        described,
        month_buy,
        price,
        shelf_time,
        style,
        thickness
      } = this.$store.state.productDetail;
      //对数据格式进行修改
      shelf_time = new Date(shelf_time);
      shelf_time = `${shelf_time.getMonth() + 1}月${shelf_time.getDate()}日`;
      month_buy += " 件";
      price += " 元";
      // 返回一个对象
      return {
        artNo,
        described,
        shelf_time,
        month_buy,
        price,
        color,
        classify,
        style,
        thickness
      };
    },
    //返回产品编号
    pid() {
      return this.$store.state.productId;
    },
    //返回产品详情
    product_detail() {
      // console.log(this.$store.state.productDetail);
      return this.$store.state.productDetail;
    }
  },
  created() {
    window.addEventListener("scroll", this.saveTop, true);
    // console.log(this.$route.query.pid);
    //获取地址栏中的产品id
    let pid = this.$route.query.pid;
    this.$store.commit("setProductId", pid);
    this.$store.dispatch("requireProductDetail");
    if (pid) {
      //发送请求保存本次的浏览记录
      this.$axios.get("/order/add_browse", {
        params: { pid }
      });
      this.$axios
        .get("/product/get_words", {
          params: { pid }
        })
        .then(result => {
          // console.log(result)
          let data = result.data;
          if (data.code === 200) {
            this.content = data.msg;
          } else {
            this.content_msg = data.msg;
          }
        });
    }
  },
  // 组件内的路由守卫，将来源的路由保存起来
  beforeRouteEnter(to, from, next) {
    // console.log(from);
    // vm.backAddr = from.path
    next(vm => (vm.backAddr = from.fullPath));
  },
  methods: {
    initTop() {
      console.log("回到顶部");
      this.top = 0;
      this.$refs.fatherScroll.scrollTop = 0;
    },
    //保存当前滚动的距离
    saveTop(e) {
      this.top = e.target.scrollTop;
      // console.log(this.top)
    }
  },
  watch: {},
  components: {
    "back-bar": BackBar,
    "scroll-top": ScrollTop,
    "user-content": UserContent,
    "immediately-buy": ImmediatelyBuy
  }
};
</script>
<style lang="scss" scoped>
.product-detail {
  background: #eee;
  max-height: 100vh;
  padding-bottom: 2.7rem;
  overflow: auto;
  .mint-swipe {
    max-width: 100vw;
    height: 100vw;
  }
  .detail-img {
    width: 100%;
  }
  .info {
    background: #fff;
    padding: 0.7rem 0.3rem;
    div:first-child {
      padding-bottom: 0.5rem;
    }
    div:nth-child(2) {
      color: #666;
    }
    div:last-child {
      color: #00c17b;
      span {
        font-size: 1.5rem;
      }
    }
  }
  .mint-navbar {
    margin-top: 1rem;
    border-bottom: 3px solid #ddd;
    .mint-tab-item.is-selected {
      border-bottom: 3px solid #00c17b;
      color: #00c17b;
      font-size: 1rem;
    }
    .mint-tab-item {
      padding: 0.7rem 0;
    }
  }
  /deep/ .mint-tab-item-label {
    font-size: 1rem;
  }
  .content_msg {
    text-align: center;
    color: #999;
    padding: 1rem 0;
  }
}
</style>
