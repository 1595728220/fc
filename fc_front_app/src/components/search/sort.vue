<template>
  <div class="sort">
    <mt-navbar v-model="selected" class="mynavbar">
      <mt-tab-item
        :id="name"
        v-for="(arr,name,index) of product_classfy"
        :key="index"
      >{{name|fanyi}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item :id="name" v-for="(arr,name,index) of product_classfy" :key="index">
        <div class="sort-title">{{name|fanyi}}</div>
        <div class="sort-list">
          <sort-item
            v-for="(val,ind) of arr"
            :key="ind"
            :num="''+index+ind"
            :sort="outObject(name,val)"
          ></sort-item>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import SortItem from "./sort_item";
export default {
  data() {
    return {
      //产品的分类情况
      product_classfy: {},
      selected: "classify"
    };
  },
  created() {
    //请求产品的分类信息
    this.$axios.get("/product/classfy").then(result => {
      // console.log(result.data);
      let tmpArr = {
        classify: [],
        style: [],
        color: [],
        thickness: []
      };
      // console.log(result.data)
      //遍历结果消息的数组
      for (let row of result.data) {
        //往产品分类对象的属性所对应的数组中插入原本没有的值
        this.check_array(tmpArr.classify, row.classify);
        this.check_array(tmpArr.style, row.style);
        this.check_array(tmpArr.color, row.color);
        this.check_array(tmpArr.thickness, row.thickness);
      }
      this.product_classfy = tmpArr;
    });
  },
  methods: {
    //检查元素是否存在数组中
    check_array(arr, el) {
      // console.log(arr);
      if (arr.indexOf(el) === -1) {
        arr.push(el);
      }
      return arr;
    },
    //生成一个对象
    outObject(name, val) {
      let tmp = {};
      tmp[name] = val;
      return tmp;
    }
  },
  components: {
    "sort-item": SortItem
  }
};
</script>
<style lang="scss" scoped>
.sort {
  .mynavbar {
    flex-direction: column;
    justify-content: flex-start;
    width: 30%;
    height: 88vh;
    float: left;
    /deep/ .mint-tab-item-label {
      font-size: 1rem;
    }
    .mint-tab-item.is-selected {
      border-bottom: none;
      color: #00c17b;
      /deep/ .mint-tab-item-label {
        font-size: 1.5rem;
      }
    }
    .mint-tab-item {
      flex: 0;
    }
  }
  .page-tabbar-container {
    height: 100vh;
    background-color: #f3f3f3;
  }
  .sort-list {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 1rem;
    justify-content: flex-start;
  }
  .sort-title{
    border-bottom:1px solid #333;
    text-align: left;
    padding:0.5rem 1rem;
  }
}
</style>
