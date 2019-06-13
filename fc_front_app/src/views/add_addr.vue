<template>
  <div>
    <back-bar title="新增收货地址" :back="backAddr"></back-bar>
    <div class="hinder">
      <mt-field placeholder="请输入收货人真实姓名" v-model="userName" label="收货人"></mt-field>
      <mt-field placeholder="请输入联系电话" v-model="phone" label="联系电话" disabled></mt-field>
      <!-- <mt-picker :slots="datalist" @change="onValuesChange"></mt-picker> -->
      <addr-city @getAddr="modifyAddr"></addr-city>
      <mt-field
        placeholder="请输入收货人详细地址(街道及以下信息)"
        v-model="addr_detail"
        label="详细地址"
        type="textarea"
      ></mt-field>
      <mt-button size="large" type="primary" @click.native="saveAddr">保存</mt-button>
    </div>
  </div>
</template>
<script>
import BackBar from "../components/common/backbar";
import AddrCity from "../components/common/addr_city";
// import allCity from "../../public/js/city.js";
// let pickerObj = {
//   prov: {},
//   city: {},
//   area: {}
// };
export default {
  data() {
    return {
      userName: "",
      backAddr: "",
      phone: "",
      addr_city: "",
      addr_detail: "",
      addr: ""
    };
  },
  components: {
    "back-bar": BackBar,
    "addr-city": AddrCity
  },
  methods: {
    // onValuesChange(picker, values) {
    //   allCity.forEach(function(val, index) {
    //     //values[0]是第一个省当前选择的值
    //     if (val.label == values[0]) {
    //       //当前省对应的城市
    //       let icity = val.children.map((item, index) => {
    //         return item.label;
    //       });
    //       picker.setSlotValues(1, icity); //设定给定slot备选数组的值

    //       //当前城市对应的区
    //       allCity[index].children.forEach((item, id) => {
    //         if (item.label == values[1]) {
    //           let iregion = item.children.map((ele, index) => {
    //             return ele.label;
    //           });
    //           picker.setSlotValues(2, iregion); //设定给定slot备选数组的值
    //         }
    //       });
    //     }
    //   });
    //   this.addr_prov = picker.values[0];
    //   this.addr_area = picker.values[2];
    // },
    //根据传入的参数修改地址的市县信息
    modifyAddr(prov, city, area) {
      if (prov.indexOf("市") === -1) this.addr_city = prov + city + area;
      else this.addr_city = prov + area;
      console.log(prov, city, area);
      console.log(this.addr_city)
    },
    saveAddr() {
      this.$axios
        .get("/order/set_order_addr", {
          params: {
            userName: this.userName,
            addr:
              this.addr_prov +
              this.addr_city +
              this.addr_area +
              this.addr_detail,
            addr_city: this.addr_prov + this.addr_city + this.addr_area,
            addr_detail: this.addr_detail
          }
        })
        .then(result => {
          // this.$store.dispatch("requireUserOrderAddr")
          console.log(result.data);
          this.$toast({ message: result.data.msg, duration: 1000 });
          if (result.data.code === 200) {
            this.$router.push(this.backAddr);
          }
        });
    }
  },
  // computed: {
  //   datalist() {
  //     let slots = [
  //       {
  //         flex: 1,
  //         values: Object.keys(pickerObj.prov),
  //         className: "slot1",
  //         textAlign: "right",
  //         defaultIndex: 2
  //       },
  //       {
  //         divider: true,
  //         content: "-",
  //         className: "slot2"
  //       },
  //       {
  //         flex: 1,
  //         values: Object.keys(pickerObj.city),
  //         className: "slot3",
  //         textAlign: "center"
  //       },
  //       {
  //         divider: true,
  //         content: "-",
  //         className: "slot4"
  //       },
  //       {
  //         flex: 1,
  //         values: Object.keys(pickerObj.area),
  //         className: "slot5",
  //         textAlign: "left",
  //         defaultIndex: 2
  //       }
  //     ];
  //     return slots;
  //   }
  // },
  // 组件内的路由守卫，将来源的路由保存起来
  beforeRouteEnter(to, from, next) {
    // console.log(from.path);
    // vm.backAddr = from.path
    next(vm => (vm.backAddr = from.fullPath));
  },
  created() {
    //如果用户收货信息非空
    if (this.$store.state.userOrderAddr) {
      let {
        userName,
        phone,
        userAddr,
        addr,
        addr_city,
        addr_detail
      } = this.$store.state.userOrderAddr;
      this.userName = userName;
      this.phone = phone;
    }
    // allCity.forEach((val, index) => {
    //   pickerObj.prov[val.label] = val.label;
    // });
    // allCity[0].children.forEach((item, id) => {
    //   pickerObj.city[item.label] = item.label;
    // });
    // allCity[0].children[0].children.forEach((item, id) => {
    //   pickerObj.area[item.label] = item.label;
    // });
  }
};
</script>
<style lang="scss" scoped>
.mint-button--primary {
  background-color: #00c17b;
}
</style>
