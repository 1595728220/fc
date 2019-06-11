<template>
  <div class="confirm-order">
    <back-bar title="订单中心" back="/"></back-bar>
    <mt-navbar v-model="selected" fixed class="mynavbar">
      <mt-tab-item :id="obj.name" v-for="(obj,index) of orderListName" :key="index">{{obj.name}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" class="mycontainer">
      <mt-tab-container-item
        :id="obj.name"
        v-for="(obj,index) of orderListName"
        :key="index"
        
      >
        <div class="order-list" ref="fatherScroll">
          <!-- {{check(obj.name)}} -->
          <div v-for="(val,ind) of check(obj.name)" :key="ind">
            <order-item :productItem="val"></order-item>
          </div>
        <scroll-top :top="top" @backTop="initTop"></scroll-top>
        </div>
      </mt-tab-container-item>
      <!-- <mt-tab-container-item id="待付款">待付款</mt-tab-container-item>
      <mt-tab-container-item id="待发货">待发货</mt-tab-container-item>
      <mt-tab-container-item id="待收货">待收货</mt-tab-container-item>
      <mt-tab-container-item id="已完成">待付款</mt-tab-container-item>
      <mt-tab-container-item id="退款">待付款</mt-tab-container-item>-->
    </mt-tab-container>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
import OrderItem from "../components/order/order_item";
import ScrollTop from "../components/common/scrollTop";
export default {
  props: {},
  data() {
    return {
      selected: "",
      orderListName: [
        { name: "全部" },
        { name: "待付款" },
        { name: "待发货" },
        { name: "待收货" },
        { name: "已完成" },
        { name: "退款" }
      ],
      orderList: [],
      top: 0,
    };
  },
  created() {
    window.addEventListener("scroll", this.saveTop, true);
    //获取路由传参的selected根据是否为空保存到本地变量中
    let tmp = this.$route.params.selected;
    if (tmp) {
      //不为空
      //直接赋值
      this.selected = tmp;
    } else {
      //为空
      //赋值为-1
      this.selected = "全部";
    }
    this.$axios.get("/order/list").then(result => {
      this.orderList = result.data.data;
      // console.log(this.orderList);
    });
  },
  components: {
    "back-bar": BackBar,
    "order-item": OrderItem,
    "scroll-top": ScrollTop
  },
  methods: {
    check(val) {
      let params;
      if (val === "全部") {
        return this.orderList;
      } else {
        return this.orderList.filter(el => {
          return el.order_state == this.change(val);
        });
      }
    },
    change(val){
      let params
      switch (val) {
          case "待付款":
            params = 0;
            break;
          case "待发货":
            params = 1;
            break;
          case "待收货":
            params = 2;
            break;
          case "已完成":
            params = 3;
            break;
          case "退款":
            params =4;
            break;
          default:
            params = -1;
        }
        return params
    },
    initTop() {
      console.log("回到顶部");
      this.top = 0;
      this.$refs.fatherScroll[this.change(this.selected)+1].scrollTop = 0;
    },
    //保存当前滚动的距离
    saveTop(e) {
      console.log()
      this.top = e.target.scrollTop;
      // console.log(this.top)
    }
  }
};
</script>
<style lang="scss" scoped>
.confirm-order {
  .mynavbar {
    margin-top: 2.5rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 0.3rem 0.5rem;
  }
  .mycontainer {
    margin-top: 6.3rem;
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: none;
    color: #fff;
    margin-bottom: 0;
    background: #00c17b;
    border-radius: 10px;
  }
  .order-list {
    height: 83vh;
    overflow-y: auto;
  }
}
</style>
