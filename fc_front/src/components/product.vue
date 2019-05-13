<template>
  <div>
    <div class="row m-0 middle_font">
      <div class="col-12">
        <div class="row m-0 mb-2" v-for="(title,index) in get_product_classify" :key="index">
          <div class="col-sm-2 col-lg-1 pt-3 font-weight-bold class_title">{{index|fanyi}}:</div>
          <ul class=" col-sm-10 col-lg-11 d-flex justify-content-start my_pills flex-wrap">
            <li>
              <a href="javascript:;" :class="{checked:!search[index]}" class="d-block"
                @click="save_click_search(as_key_fanhui_obj(index,''))">全部</a>
            </li>
            <li v-for="(detail,ind) in title" :key="ind" class="">
              <a href="javascript:;" class="d-block" @click="save_click_search(as_key_fanhui_obj(index,detail))"
                :class="{checked:search[index]===detail}">{{detail}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <mylist :mymsg="search" @sendfatherevent="rcvMsg($event)"></mylist>
    <ul class="pagination justify-content-end mb-3">
      <li class="page-item mr-3">
        <a class="page-link fanye" href="javascript:;" @click="page_click_change(-1)"
          :class="{disabled:search.pno === 1}">上一页</a>
      </li>
      <li class="page-item mr-3" v-for="(count,index) of create_arr" :key="index">
        <a class="page-link" href="javascript:;" @click="save_click_search({pno:count})"
          :class="{current:count===search.pno}">{{count}}</a>
      </li>
      <li class="page-item mr-3">
        <a class="page-link fanye" href="javascript:;" @click="page_click_change(1)"
          :class="{disabled:search.pno === pageNo}">下一页</a>
      </li>
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
        btn_msg: {},
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
        // console.log("父组件接收到子组件传入的产品总记录数" + this.productCount);
        //计算总页数并赋值
        this.pageNo = Math.ceil(this.productCount / this.search.size);
        if (this.pageNo < 6) {
          this.pageBtnCount = this.pageNo;
        } else {
          this.pageBtnCount = 5;
        }
      },
    },
    methods: {
      //保存通过路由传参的数据到search_info中
      save_route_search() {
        //保存路由传递的参数在临时变量中
        let tmp = this.$route.query;
        //先清空多次路由传值对原对象的更改
        this.search.thickness = "";
        this.search.color = "";
        this.search.keywords = "";
        this.search.style = "";
        this.search.classify = "";
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
      save_click_search(
        //   {
        //   classify,
        //   style,
        //   thickness,
        //   color,
        //   minprice,
        //   maxprice,
        //   rexiao,
        //   xinpin,
        //   recommond,
        //   pno,
        //   keywords
        // } = {}
      ) {
        // console.log(arguments)
        let arg = arguments[0];
        for (let key in arg) {
          this.search[key] = arg[key];
        }
        console.log(arguments)
      },
      //接收子组件传递的产品总数值
      rcvMsg(msg) {
        this.productCount = msg;
      },
      // 点击上一页/下一页翻页功能
      page_click_change(sign) {
        // console.log(1)
        if (sign === 1 && this.search.pno < this.pageNo) {
          this.search.pno++;
        } else if (sign === -1 && this.search.pno > 1) {
          this.search.pno--;
        }
      },
      //根据键和值返回一个对象
      as_key_fanhui_obj(key, val) {
        // console.log(key)
        // console.log(val)
        let obj = {}
        obj[key] = val
        // console.log(obj)
        return obj
      }
    },
    computed: {
      //返回搜索的基本信息
      search() {
        return this.search_info;
      },
      //生成页码的数组
      create_arr() {
        //创建一个空数组
        let arr = [];
        let k = -2;
        //循环往数组中放页码
        // console.log(this.pageBtnCount)
        //数组中没有放满pageBtnCount指定的数量的数据则进入下一次循环
        while (arr.length < this.pageBtnCount) {
          // console.log(this.search.pno + k)
          //页码为大于0的数
          // console.log(this.search.pno + k)
          // console.log(this.pageNo)
          //如果生成的页码超过最大页码数，则跳出循环
          if (this.search.pno + k > this.pageNo) {
            break;
          }
          if (this.search.pno + k > 0) {
            // 将页码插入数组
            arr.push(this.search.pno + k);
          }
          k++;
        }
        // console.log(arr)
        return arr;
      },
      //返回产品的分类信息
      get_product_classify() {
        // console.log(this.$store.getters.get_product_class)
        return this.$store.getters.get_product_class;
      },

    }
  };
</script>
<style scoped>
  @media screen and (max-width: 575px) {
    
  }

  @media screen and (min-width: 576px) {
    .class_title{
      text-align:right;
    }
  }

  @media screen and (min-width: 768px) {
    
  }

  @media screen and (min-width: 992px) {
   
  }

  @media screen and (min-width: 1200px) {
    
  }

  ul.my_pills>li {
    padding: 0.5rem 1.2rem;
  }

  ul.my_pills>li>a {
    font-size: 1rem;
    color: #333;
    padding: 0.5rem 1.2rem;
  }

  ul.my_pills>li>a.checked {
    border-radius: 0.5rem;
    background: #3ec13e;
    color: #fff;

  }

  a.page-link {
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    padding: 0;
    text-align: center;
    color: #0aa1ed;
    border-color: #ccc;
    border-radius: 5px;
  }

  a.page-link.fanye {
    width: 3rem;
  }

  a.page-link.current {
    background: #0aa1ed;
    color: #fff;
  }

  a.page-link.disabled {
    color: #aaa;
    cursor: default;
  }

  a.page-link.disabled:hover {
    background: #fff;
  }

  a.page-link.disabled:focus {
    box-shadow: 0 0 0;
  }
</style>