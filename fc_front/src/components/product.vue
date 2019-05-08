<template>
  <div>
    <button @click="search">aa</button>
    <mylist :mymsg="search"></mylist>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        search: {
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
      }
    },
   
    mounted() {
      // console.log(this.$route.query)
      //将参数放入search
      this.save_search()
    },
    watch: {
      $route() { //跳转组件页面后，监听路由参数中对应的当前页面以及上一个页面
        // console.log(this.$route.query)
        // 保存路由中的参数
        this.save_search()
        // console.log(this.search)
      },
      search(){
        console.log(1)
      }
    },
    methods: {
      save_search() {
        //保存路由传递的参数在临时变量中
        let tmp = this.$route.query
        //如果参数来自与class
        if (tmp.form === "class") {
          //对参数的不同情况，放入search对应的属性名中
          if(tmp.keys === "颜色"){
            this.search.color = tmp.val
          } else if(tmp.keys === "种水"){
            this.search.thickness = tmp.val
          } else{
            this.search.classify = tmp.keys
            this.search.style = tmp.val
          }
        } else { //来自其他来源
          //将传递的参数放入对应search
          for (let key in tmp) {
            this.search[key] = tmp[key]
          }
        }
      },
      test(){
        this.search.size--
        console.log(this.search.size)
      }
    },
    computed: {
      
    },
  }
</script>
<style>

</style>