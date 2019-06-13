<template>
  <div class="addr-city">
    <mt-picker :slots="datalist" @change="onValuesChange"></mt-picker>
  </div>
</template>
<script>
import allCity from "../../../public/js/city.js";
let pickerObj = {
  prov: {},
  city: {},
  area: {}
};
export default {
  data() {
    return {};
  },
  methods: {
    onValuesChange(picker, values) {
      allCity.forEach(function(val, index) {
        //values[0]是第一个省当前选择的值
        if (val.label == values[0]) {
          //当前省对应的城市
          let icity = val.children.map((item, index) => {
            return item.label;
          });
          picker.setSlotValues(1, icity); //设定给定slot备选数组的值

          //当前城市对应的区
          allCity[index].children.forEach((item, id) => {
            if (item.label == values[1]) {
              let iregion = item.children.map((ele, index) => {
                return ele.label;
              });
              picker.setSlotValues(2, iregion); //设定给定slot备选数组的值
            }
          });
        }
      });
      this.addr_prov = picker.values[0];
      this.$emit("getAddr", ...picker.values);
    }
  },
  computed: {
    datalist() {
      let slots = [
        {
          flex: 1,
          values: Object.keys(pickerObj.prov),
          className: "slot1",
          textAlign: "right",
          defaultIndex: 0
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: Object.keys(pickerObj.city),
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: Object.keys(pickerObj.area),
          className: "slot5",
          textAlign: "left",
          defaultIndex: 0
        }
      ];
      return slots;
    }
  },
  created() {
    allCity.forEach((val, index) => {
      pickerObj.prov[val.label] = val.label;
    });
    allCity[0].children.forEach((item, id) => {
      pickerObj.city[item.label] = item.label;
    });
    allCity[0].children[0].children.forEach((item, id) => {
      pickerObj.area[item.label] = item.label;
    });
  }
};
</script>
<style lang="scss" scoped>
.addr-city{
  width:100vw;
}
</style>
