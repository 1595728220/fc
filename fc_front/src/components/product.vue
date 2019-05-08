<template>
  <div>
    <mylist :mymsg="search"></mylist>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search_info: {
        classify: "",
        style: "",
        thickness: "",
        color: "",
        minprice: 0,
        maxprice: 99999999,
        rexiao: "",
        xinpin: "",
        recommond: "",
        pno: 1,
        size: 8,
        keywords: ""
      }
    };
  },

  mounted() {
    // console.log(this.$route.query)
    //将参数放入search
    this.save_route_search();
  },
  watch: {
    $route() {
      //跳转组件页面后，监听路由参数中对应的当前页面以及上一个页面
      // console.log(this.$route.query)
      // 保存路由中的参数
      this.save_route_search();
      // console.log(this.search)
      // console.log(1);
    },
    // search: {
    //   handler(newVal, oldVal) {
    //     console.log("监听search整个对象的变化");
    //   },
    //   deep: true
    // },
  },
  methods: {
    save_route_search() {
      //保存路由传递的参数在临时变量中
      //先清空多次路由传值对原对象的更改
      let tmp = this.$route.query;
      this.search.thickness = ""
      this.search.color = ""
      this.search.keywords = ""
      this.search.style = ""
      this.search.classify = ""
      //如果参数来自与class
      if (tmp.form === "class") {
        //对参数的不同情况，放入search对应的属性名中
        if (tmp.keys === "颜色") {
          this.search.color = tmp.val;
        } else if (tmp.keys === "种水") {
          this.search.thickness = tmp.val;
        } else {
          this.search.classify = tmp.keys;
          this.search.style = tmp.val;
        }
      } else {
        //来自其他来源
        //将传递的参数放入对应search
        for (let key in tmp) {
          this.search[key] = tmp[key];
        }
      }
    },
  },
  computed: {
    search(){
      return this.search_info
    }
  }
};
</script>
<style>
</style>