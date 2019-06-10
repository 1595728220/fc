<template>
  <div class="order">
    <back-bar title="订单" :back="`/detail?pid=${pid}`"></back-bar>
    <div class="hinder"></div>
    <router-link class="user-order-addr" to="/add_addr">
      <div class="top">
        <span>{{userOrderAddr.userName}}</span>
        <span>{{userOrderAddr.phone}}</span>
      </div>
      <div class="bottom">
        <span>{{userOrderAddr.addr}}</span>
        <span class="mint-button-icon rotate">
          <i class="mintui mintui-back"></i>
        </span>
      </div>
    </router-link>
    <div class="product-detail">
      <img v-lazy="productServerAdd+productDetail.photo1" class="img">
      <div class="right">
        <div class="title">{{productDetail.described}}超值好货赶紧来抢吧，限时特价只卖一个星期，走过不要错过</div>
        <div class="price">{{productDetail.price|money}}</div>
      </div>
    </div>
    <div class="server">
      <div>
        鉴定宝服务
        <span class="price">￥75</span>
      </div>
      <mt-checklist v-model="server" :options="['']"></mt-checklist>
    </div>
    <div class="primose">您购买的宝贝将发至对庄，出具GTC证书后再发给您，并由对庄提供翡翠保A承诺，最高赔付一百万，退货来回运费全部由对庄承担</div>
    <div class="bottom-bar">
      合计：{{(productDetail.price+5+75*server.length)|money}}(含5元运费)
      <mt-button type="primary" class="button" @click.native="create_order">确认</mt-button>
    </div>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
export default {
  data() {
    return {
      server: []
    };
  },
  computed: {
    pid() {
      return this.$store.state.productId;
    },
    userOrderAddr() {
      let tmp = this.$store.state.userOrderAddr;
      tmp = tmp || {};
      console.log(tmp);
      return tmp;
    },
    productDetail() {
      return this.$store.state.productDetail;
    },
    productServerAdd() {
      return this.$store.state.productServerAdd;
    },
    total_price() {
      return this.productDetail.price + 5 + 75 * this.server.length;
    }
  },
  created() {
    this.$store.dispatch("requireUserOrderAddr").then(() => {
      this.$messagebox({
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "添加地址",
        title: "",
        message: "还没有添加收货详情，快去添加吧",
        confirmButtonHighlight: true
      }).then(action => {
        if (action === "confirm") {
          this.$router.push("/add_addr");
        } else {
          this.$router.push(`/detail?pid=${this.pid}`);
        }
      });
    });
    console.log(this.productDetail);
  },
  methods: {
    create_order() {
      this.$messagebox({
        message: `是否支付${this.total_price}元`,
        showConfirmButton: true,
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.$axios
            .get("/order/create", {
              params: {
                total: this.total_price,
                pid: this.pid
              }
            })
            .then(result => {
              this.$messagebox({
                message: result.data.msg,
                showConfirmButton: true
              }).then(() => {
                this.$router.push("/");
              });
            });
        }
      });
    }
  },
  components: {
    "back-bar": BackBar
  }
};
</script>
<style lang="scss" scoped>
.order {
  background: #f5f5f5;
  height: 100vh;

  .user-order-addr {
    text-decoration: none;
    display: block;
    color: #fff;
    background: green;
    padding: 0 1rem;

    .top {
      display: flex;
      justify-content: space-between;
    }
    .bottom {
      font-size: 0.9rem;
      display: flex;
      justify-content: space-between;
    }
    .rotate {
      // display: block;
      transform: rotate(180deg);
      text-align: right;
    }
  }
  .product-detail {
    display: flex;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background: #fff;
    .img {
      width: 40%;
      height: 100%;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: #00c17b;
      }
    }
  }
  .server {
    display: flex;
    justify-content: space-between;
    background: #fff;
    // align-items: center;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    .price {
      color: #00c17b;
    }
    /deep/ .mint-checklist-label {
      padding: 0;
    }
    /deep/ .mint-checkbox-input:checked + .mint-checkbox-core::after {
      transform: rotate(45deg) scale(1.4);
      left: 7px;
      top: 4px;
    }
    /deep/ .mint-checklist-title {
      margin:0;
    }
    /deep/ .mint-cell{
      min-height:21px;
    }
  }
  .primose {
    font-size: 0.7rem;
    color: #999;
    background: #fff;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .bottom-bar {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 1rem 0.5rem;
    background: #fff;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      height: 2.5rem;
      line-height: 2.5rem;
      background: #00c17b;
      outline: none;
      &:active {
        background: #00c17b;
      }
    }
  }
}
</style>
