<template>
  <div class="confirm-order">
    <back-bar title="订单中心" back="/"></back-bar>
    <mt-navbar v-model="selected" fixed class="mynavbar">
      <mt-tab-item :id="obj.name" v-for="(obj,index) of orderList" :key="index">{{obj.name}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" class="mycontainer">
      <mt-tab-container-item
        :id="obj.name"
        v-for="(obj,index) of orderList"
        :key="index"
      >{{obj.name}}</mt-tab-container-item>
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
export default {
  props: {},
  data() {
    return {
      selected: "",
      orderList: [
        { name: "全部" },
        { name: "待付款" },
        { name: "待发货" },
        { name: "待收货" },
        { name: "已完成" },
        { name: "退款" }
      ]
    };
  },
  created() {
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
  },
  components: {
    "back-bar": BackBar
  },
  watch: {
    selected(){
      let params
      console.log(this.selected)
      switch(this.selected){
        case "待付款":
          params = {order_state:0}
          break
        case "代发货":
          params = {order_state:1}
          break
        case "待收货":
          params = {order_state:2}
          break
        case "已完成":
          params = {order_state:3}
          break
        case "退款":
          params = {order_state:4}
          break
        default:
          params = {}
      }
      this.$axios.get("/order/list",{
        params
      }).then(result=>{
        console.log(result)
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.confirm-order {
  .mynavbar {
    margin-top: 2.5rem;
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
    padding:0.3rem 0.5rem;
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
}
</style>
