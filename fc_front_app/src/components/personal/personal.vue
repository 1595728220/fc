<template>
  <div class="personal">
    <div class="title">
      <div class="bg-user"></div>
      <div class="user">
        <img :src="baseServerAdd+userInfo.img_addr">
        <div class="nick">用户昵称：{{userInfo.nick}}</div>
      </div>
    </div>
    <router-link class="myOrder" to="/confirm_order" >
      <div class="left">
        <span class="iconfont icon-baoguofahuo"></span>
        我购买的订单
      </div>
      <div class="right">
        查看全部订单
        <span class="mint-button-icon rotate">
          <i class="mintui mintui-back"></i>
        </span>
      </div>
    </router-link>
    <div class="order-icon">
      <router-link class="icon-item" :to="{name:'confirm_order',params:{selected:obj.name}}" v-for="(obj,index) of orderList" :key="index">
        <span class="iconfont" :class="obj.class"></span>
        {{obj.name}}
      </router-link>
      <!-- <router-link class="icon-item" to="/confirm_order">
        <span class="iconfont icon-yunshuzhongwuliu"></span>
        待发货
      </router-link>
      <router-link class="icon-item" to="/confirm_order">
        <span class="iconfont icon-baoguofahuo"></span>
        待收货
      </router-link>
      <router-link class="icon-item" to="/confirm_order">
        <span class="iconfont icon-chaibaoguoqujian"></span>
        已完成
      </router-link>
      <router-link class="icon-item" to="/confirm_order">
        <span class="iconfont icon-tuikuan-xi"></span>
        退款
      </router-link> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: [
        { name: "待付款", class: "icon-shangpin-xianxing" },
        { name: "待发货", class: "icon-yunshuzhongwuliu" },
        { name: "待收货", class: "icon-baoguofahuo" },
        { name: "已完成", class: "icon-chaibaoguoqujian" },
        { name: "退款", class: "icon-tuikuan-xi" }
      ]
    };
  },
  created() {
    this.$store.dispatch("requireUserInfo");
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    baseServerAdd() {
      return this.$store.state.userServerAdd;
    }
  }
};
</script>
<style lang="scss" scoped>
.personal {
  height: 100vh;
  .title {
    position: relative;
    .user {
      padding: 2rem 0 1.5rem;
      text-align: center;
      width: 100%;
      position: absolute;
      z-index: 1;
      top: 0;
      img {
        background: #aaa;
        border-radius: 50%;
      }
      .nick {
        margin-top: 1rem;
        color: #fff;
      }
    }
    .bg-user {
      // position: absolute;
      // top: 0;
      background-image: url(/imgs/personal/banner4.jpg);
      background-size: 43.75rem;
      background-position: -11.5625rem 0.125rem;
      filter: blur(0.1875rem);
      height: 10rem;
      width: 100%;
    }
  }
  .myOrder {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0.5rem;
    .left {
      color: #333;
      .icon-baoguofahuo {
        color: #666;
      }
    }
    .right {
      color: #666;
      .rotate {
        transform: rotate(180deg);
        text-align: right;
      }
    }
  }
  .order-icon {
    display: flex;
    justify-content: space-around;
    .icon-item {
      display: flex;
      flex-direction: column;
      text-align: center;
      color: #333;
      text-decoration: none;
    }
    .iconfont {
      line-height: 1;
      font-size: 2.125rem;
      color: #00c17b;
    }
  }
}
</style>
