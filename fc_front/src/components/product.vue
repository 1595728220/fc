<template>
  <div>
    <mylist :mymsg="search" @sendfatherevent="rcvMsg($event)"></mylist>
    <ul class="pagination justify-content-end mb-3">
      <li class="page-item mr-3" ><a class="page-link fanye" href="javascript:;" @click="page_click_change(-1)" :class="{disabled:search.pno === 1}">上一页</a></li>
      <li class="page-item mr-3" v-for="(count,index) of create_arr" :key="index">
        <a class="page-link" href="javascript:;" @click="save_click_search({pno:count})" :class="{current:count===search.pno}">{{count}}</a>
      </li>
      <li class="page-item mr-3" ><a class="page-link fanye" href="javascript:;" @click="page_click_change(1)"  :class="{disabled:search.pno === pageNo}">下一页</a></li>
    </ul>
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
        },
        btn_msg: {

        },
        productCount: "",
        pageNo: "",
        pageBtnCount: ""
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
      productCount() {
        console.log("父组件接收到子组件传入的产品总记录数" + this.productCount)
        //计算总页数并赋值
        this.pageNo = Math.ceil(this.productCount / this.search.size)
        if (this.pageNo < 6) {
          this.pageBtnCount = this.pageNo
        } else {
          this.pageBtnCount = 5
        }
      }
    },
    methods: {
      //保存通过路由传参的数据到search_info中
      save_route_search() {
        //保存路由传递的参数在临时变量中
        let tmp = this.$route.query;
        //先清空多次路由传值对原对象的更改
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
      //保存页面点击对应的数据到search_info中
      save_click_search({
        classify,
        style,
        thickness,
        color,
        minprice,
        maxprice,
        rexiao,
        xinpin,
        recommond,
        pno,
        keywords
      } = {}) {
        console.log(arguments)
        let arg = arguments[0]
        for (let key in arg) {
          this.search[key] = arg[key]
        }
      },
      //接收子组件传递的产品总数值
      rcvMsg(msg) {
        this.productCount = msg
      },
      // 点击上一页/下一页翻页功能
      page_click_change(sign){
        // console.log(1)
        if(sign === 1 && this.search.pno < this.pageNo){
          this.search.pno ++
        }else if(sign === -1 && this.search.pno > 1 ){
          this.search.pno -- 
        }
      }
    },
    computed: {
      search() {
        return this.search_info
      },
      create_arr(){
        //创建一个空数组
        let arr = []
        let k = -2
        //循环往数组中放页码
        // console.log(this.pageBtnCount)
        //数组中没有放满pageBtnCount指定的数量的数据则进入下一次循环
        while(arr.length < this.pageBtnCount){
            // console.log(this.search.pno + k)
            //页码为大于0的数
            // console.log(this.search.pno + k)
            // console.log(this.pageNo)
          //如果生成的页码超过最大页码数，则跳出循环
          if(this.search.pno + k > this.pageNo){
            break
          }
          if(this.search.pno + k > 0){
            // 将页码插入数组
            arr.push(this.search.pno + k)
          }
          k++       
        }
        // console.log(arr)
        return arr
      }
    }
  };
</script>
<style>
  a.page-link {
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    padding: 0;
    text-align: center;
    color:#0aa1ed;
    border-color:#ccc;
    border-radius:5px;
  }
  a.page-link.fanye{
    width:3rem;
  }
  a.page-link.current{
    background:#0aa1ed;
    color:#fff;
  }
  a.page-link.disabled{
    color:#aaa;
    cursor:default;
  }
  a.page-link.disabled:hover{
    background:#fff;
  }
  a.page-link.disabled:focus{
    box-shadow: 0 0 0;
  }
</style>