<template>
  <div class="row header m-0">
    <div class="col-sm-12">
      <div class="navbar navbar-expand-md navbar-light header_nav">
        <router-link to="/" class="navbar-brand">对庄翡翠</router-link>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#header_area" @click="collapse_click">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="header_area" class="collapse navbar-collapse" :class="{show:collapse_is_show}">
          <ul class="navbar-nav w-100">
            <li class="nav-item">
              <router-link to="/" class="nav-link">逛市场</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link">新品</router-link>
            </li>
            <li class="nav-item pr">
              <a @click="class_click" class="nav-link cp"> 分类
                <div class="triangle_area">
                  <span :class="{'triangle-left':is_triangle_left,'triangle-top':is_triangle_top}">
                  </span>
                </div>
              </a>
              <div class="dropdown-menu text-dark mb-1 class_area" :class="{show:class_is_show_dropdown}">
                <div class="p-3" v-for="(key,ind) in product_classfy">
                  <h5 class="mb-2">{{ind}}</h5>
                  <div>
                    <router-link :to="'/product/'+val" class="btn btn-primary w-25 mr-2 mb-2"
                      v-for="(val,aind) in product_classfy[ind]" :key="aind">{{val}}</router-link>
                  </div>
                </div>
                <!-- <div class="p-3" >
                  <h5 class="mb-2">挂坠</h5>
                  <div>
                    <router-link to="/product/项链" class="btn btn-primary w-25 mr-2">项链</router-link>
                  </div>
                </div>
                <div class="p-3">
                  <h5 class="mb-2">饰品</h5>
                  <div>
                    <router-link to="/product/手镯" class="btn btn-primary w-25 mr-2">手镯</router-link>
                    <router-link to="/product/戒指" class="btn btn-primary w-25 mr-2">戒指</router-link>
                  </div>
                </div>
                <div class="p-3">
                  <h5 class="mb-2">种水</h5>
                  <div>
                    <router-link to="/product/冰种" class="btn btn-primary w-25 mr-2">冰种</router-link>
                    <router-link to="/product/冰种" class="btn btn-primary w-25 mr-2">糯种</router-link>
                  </div>
                </div> -->
              </div>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link">对庄APP</router-link>
            </li>
            <li class="nav-item pr">
              <div>
                <input type="text" class="form-control dib search_input" @focus="search_click" @blur="search_click"
                  placeholder="翡翠手镯" v-model="person_input_search">
                <router-link class="btn btn-primary pl-3 pr-3" :to="'/product/'+person_input_search">搜索</router-link>
              </div>
              <div class="dropdown-menu text-dark mb-1 search_area" :class="{show:search_is_show_dropdown}">
                <div class="mb-5 p-3">
                  <div v-if="person_uid">
                    <h5>搜索记录</h5>
                    <div>
                      <router-link to="/product" class="btn btn-primary w-25" v-for="(keyword,ind) in keywords.me"
                        :key="ind" :class="{disabled:!is_person_keywords}"><span
                          v-if="keyword">{{keyword.content}}</span></router-link>
                    </div>
                  </div>
                  <h5 class="mb-2">热门搜索</h5>
                  <div>
                    <router-link :to="'/product/'+keyword.content" class="btn btn-primary w-25"
                      v-for="(keyword,ind) in keywords.all" :key="ind"><span v-if="keyword">{{keyword.content}}</span>
                    </router-link>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item" v-if="!person_uid">
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/login">登录</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/register">注册</router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item" v-if="person_uid">
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <span class="person_welcome">{{person_name}} 欢迎回来</span>
                </li>
                <li class="breadcrumb-item">
                  <a @click="logout_click" href="#">退出</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        //保存当前用户id
        person_uid: null,
        //保存当前用户名字
        person_name: null,
        //三角形的底边方向是否在左
        is_triangle_left: false,
        //三角形的底边方向是否在上
        is_triangle_top: true,
        //分类框是否显示
        class_is_show_dropdown: false,
        //搜索关键字是否显示
        search_is_show_dropdown: false,
        //导航栏的是否折叠状态
        collapse_is_show: false,
        //搜索关键字
        keywords: {
          all: null,
          me: null
        },
        //分类关键字
        classfywords: null,
        //是否有个人的搜索关键字记录
        is_person_keywords: false,
        //保存用户输入的搜索关键词
        person_input_search: null,
        //产品的分类情况
        product_classfy: {
          "颜色": [],
          "种水": []
        }
      }
    },
    methods: {
      //点击分类标签，展开/收起下拉列表
      class_click: function () {
        // console.log("鼠标点击分类标签，展开下拉列表");
        //三角形的状态交换
        [this.is_triangle_left, this.is_triangle_top] = [this.is_triangle_top, this.is_triangle_left]
        //下拉列表的显示/隐藏状态
        this.class_is_show_dropdown = !this.class_is_show_dropdown
      },
      //搜索栏失去焦点/获得焦点时执行的方法
      search_click: function () {
        //如果搜索栏的下拉列表处于显示状态
        if (this.search_is_show_dropdown) {
          // console.log("1秒后搜索关键字栏隐藏")
          setTimeout(() => {
            //改变状态
            this.search_is_show_dropdown = !this.search_is_show_dropdown
          }, 1000)
        } else { //处于隐藏状态
          //改变状态
          this.search_is_show_dropdown = !this.search_is_show_dropdown
        }
      },
      //点击按钮控制导航栏的隐藏或显示方法
      collapse_click: function () {
        //切换显示/隐藏的状态
        this.collapse_is_show = !this.collapse_is_show
      },
      //点击登出的事件
      logout_click: function () {
        //向/user/logout发送请求携带uid和对应的cookie
        this.$axios.get("/user/logout", {
          params: {
            uid: this.person_uid
          }
        }).then((result) => {
          // console.log("用户成功登出")
          //检查当前登录状态
          this.check_person_state()
        }).catch((error) => {
          console.log(error)
        })
      },
      //检查用户的登录状态的方法
      check_person_state: function () {
        //发送请求查看用户的登录状态
        this.$axios.get("/user/state").then((result) => {
          // console.log(result)
          //如果已登录
          if (result.data.code === 200) {
            //保存该用户的编号
            this.person_uid = result.data.uid
            //保存该用户的昵称
            this.person_name = result.data.nick
          } else {
            //清空用户的编号
            this.person_uid = null
            //清空用户的昵称
            this.person_name = null
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      //检查元素是否存在数组中
      check_array: function (arr, el) {
        if (arr.indexOf(el) === -1) {
          arr.push(el)
        }
        return arr
      }
    },
    //当组件挂载后
    mounted: function () {
      //发送请求
      this.$axios.get("/user/search", {
        params: {
          uid: this.person_uid
        }
      }).then((result) => {
        // console.log(result)
        // this.keywords = JSON.parse(JSON.stringify(result.data.data.all))
        this.keywords.all = result.data.data.all
        this.keywords.me = result.data.data.me || []
        // console.log(this.keywords)
        if (this.keywords.me.length === 0) {
          this.keywords.me = [{
            content: "无"
          }]
        } else {
          this.is_person_keywords = true
        }
        // console.log(this.is_person_keywords)
      }).catch((error) => {
        console.log(error)
      })
      //请求产品的分类信息
      this.$axios.get("/product/classfy").then(result => {
        // console.log(result.data)
        //遍历结果消息的数组
        for (let row of result.data) {
          //如果存在分类则新增分类下的样式，如果不存在分类，则创建分类，并添加样式
          this.product_classfy[row.classify] ? this.check_array(this.product_classfy[row.classify], row.style) :
            this.product_classfy[row.classify] = [row.style]
          //往产品分类对象的颜色属性所对应的数组中插入原本没有的值
          this.check_array(this.product_classfy["颜色"], row.color)
          //往产品分类对象的种水属性所对应的数组中插入原本没有的值
          this.check_array(this.product_classfy["种水"], row.thickness)
        }
        // console.log(this.product_classfy)
      }).catch(error => {
        console.log(error)
      })
      //检查用户当前状态
      this.check_person_state()
    },
    //监听数据变化
    watch: {

    },
  }
</script>
<style>
  @media (min-width: 576px) {
    .header .navbar-nav {
      align-items: flex-start
    }
  }

  @media (min-width: 768px) {
    .header_nav .class_area {
      width: 500px;
      position: absolute;
      left: 10px;
      top: 10px;
    }

    .header .navbar-nav {
      justify-content: space-around;
      align-items: center;
    }

    .breadcrumb {
      align-items: center;
    }
  }

  @media (min-width: 992px) {}

  @media (min-width: 1200px) {}

  .header {
    box-shadow: 0 0 1rem 0.01rem #333;
  }


  .header .navbar-light .navbar-nav .nav-link {
    color: rgba(0, 0, 0, 0.7)
  }

  .header .navbar-light .navbar-nav .nav-link:hover {
    color: rgba(0, 0, 0, 0.8)
  }

  .header_nav li>a {
    font-size: 16px;
    font-weight: bold;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .header_nav li .triangle_area {
    width: 12px;
    height: 12px;
    display: inline-block;
  }

  .header_nav .nav-item>div>.form-control {
    width: 75%;
    vertical-align: middle;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    cursor: text;
  }

  .header_nav .nav-item>div>.btn {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    height: 38px;
  }

  .header_nav .breadcrumb {
    background: transparent;
    font-size: 16px;
    /* align-items: center; */
    padding-left: 0;
    margin: 0;
    /* justify-content: space-around; */
  }

  .header_nav .breadcrumb-item+.breadcrumb-item::before {
    content: "|";
    /* color:#333; */
    /* font-size:16px; */
  }

  .header_nav .breadcrumb .breadcrumb-item a {
    font-size: 16px;
  }

  .header .class_area {
    width: 23rem;
    top: 33px;
  }

  .header .search_area {
    width: 23rem;
  }

  .header .search_area a {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }

  .header .person_welcome {
    font-weight: bold;
  }

  .btn.disabled {
    color: #ddd;
    pointer-events: none;
  }
</style>