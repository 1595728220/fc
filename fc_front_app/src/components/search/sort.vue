<template>
  <div>
    <h1>产品的总分类</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //产品的分类情况
      product_classfy: {
        颜色: [],
        种水: []
      }
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
      //遍历结果消息的数组
      for (let row of result.data) {
        //如果存在分类则新增分类下的样式，如果不存在分类，则创建分类，并添加样式
        this.product_classfy[row.classify]
          ? this.check_array(this.product_classfy[row.classify], row.style)
          : (this.product_classfy[row.classify] = [row.style]);
        //往产品分类对象的颜色属性所对应的数组中插入原本没有的值
        this.check_array(this.product_classfy["颜色"], row.color);
        //往产品分类对象的种水属性所对应的数组中插入原本没有的值
        this.check_array(this.product_classfy["种水"], row.thickness);
        this.check_array(tmpArr.classify, row.classify);
        this.check_array(tmpArr.style, row.style);
        this.check_array(tmpArr.color, row.color);
        this.check_array(tmpArr.thickness, row.thickness);
      }
    });
    console.log(this.product_classfy);
  },
  methods: {
    //检查元素是否存在数组中
    check_array(arr, el) {
      // console.log(arr);
      if (arr.indexOf(el) === -1) {
        arr.push(el);
      }
      return arr;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
