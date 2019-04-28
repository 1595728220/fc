<template>
  <div class="row header">
    <div class="col-sm-12">
      <div class="navbar navbar-expand-md navbar-light header_nav">
        <router-link to="/" class="navbar-brand">对庄翡翠</router-link>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#header_area">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="header_area" class="collapse navbar-collapse">
          <ul class="navbar-nav w-100">
            <li class="nav-item">
              <router-link to="/" class="nav-link">逛市场</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link">新品</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link">对庄APP</router-link>
            </li>
            <li class="nav-item pr">
              <a @click="class_click" class="nav-link cp"> 分类
                <div class="triangle_area">
                  <span :class="{'triangle-left':is_triangle_left,'triangle-top':is_triangle_top}">
                  </span>
                </div>
              </a>
              <div class="dropdown-menu text-dark mb-1 class_area" :class="{show:class_is_show_dropdown}">
                <div class="mb-5 p-3">
                  <h5 class="mb-2">吊坠/挂坠</h5>
                  <div>
                    <router-link to="/product" class="btn btn-primary w-25">佛</router-link>
                  </div>
                </div>
                <div class="mb-5 p-3">
                  <h5 class="mb-2">手镯</h5>
                  <div>
                    <router-link to="/product" class="btn btn-primary w-25">圆圈</router-link>
                  </div>
                </div>
                <div class="mb-5 p-3">
                  <h5 class="mb-2">界面裸石</h5>
                  <div>
                    <router-link to="/product" class="btn btn-primary w-25">水滴形</router-link>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item pr">
              <input type="text" class="form-control dib search_input" @focus="search_click" @blur="search_click"
                placeholder="翡翠手镯">
              <button class="btn btn-primary">搜索</button>
              <div class="dropdown-menu text-dark mb-1 search_area" :class="{show:search_is_show_dropdown}">
                  <div class="mb-5 p-3">
                      <div v-if="person_uid">
                        <h5>历史记录</h5>
                        <div>

                        </div>
                      </div>
                      <h5 class="mb-2">热门搜索</h5>
                      <div>
                        <router-link to="/product" class="btn btn-primary w-25" v-for="(keyword,ind) in keywords" :key="ind"><span v-if="keyword">{{keyword.content}}</span></router-link>
                      </div>
                    </div>
              </div>
            </li>
            <li class="nav-item">
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/login">登录</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/register">注册</router-link>
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
        person_uid:1,
        //三角形的底边方向是否在左
        is_triangle_left: false,
        //三角形的底边方向是否在上
        is_triangle_top: true,
        //分类框是否显示
        class_is_show_dropdown: false,
        //搜索关键字是否显示
        search_is_show_dropdown: false,
        //搜索关键字
        keywords:{all:null,me:null},
        //分类关键字
        classfywords:null
      }
    },
    methods: {
      class_click:function() {
        console.log("鼠标点击分类标签，展开下拉列表");
        [this.is_triangle_left, this.is_triangle_top] = [this.is_triangle_top, this.is_triangle_left]
        this.class_is_show_dropdown = !this.class_is_show_dropdown
      },
      search_click:function() {
        this.search_is_show_dropdown = !this.search_is_show_dropdown
      }
    },
    mounted:function(){
      this.$axios.get("http://127.0.0.1:8079/user/search",{
        uid:this.person_uid
      }).then((result)=>{
        // console.log(result.data.data.all)
        // this.keywords = JSON.parse(JSON.stringify(result.data.data.all))
        this.keywords = result.data.data.all
        console.log(this.keywords)
      }).catch((error)=>{
        console.log(error)
      })
    }
  }
</script>
<style>
  @media (min-width: 576px) {
    .header .navbar-nav {
      align-items: flex-start
    }
  }

  @media (min-width: 768px) {
    .class_area {
      width: 500px;
      position: absolute;
      left: 10px;
      top: 10px;
    }

    .header .navbar-nav {
      justify-content: space-between;
      align-items: center;
    }

    .breadcrumb {
      align-items: center;
    }
  }

  @media (min-width: 992px) {}

  @media (min-width: 1200px) {}

  .header {
    border-bottom: 1px solid #ccc;
  }



  .header_nav li>a {
    font-size: 16px;
    font-weight: bold;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .header_nav li button {
    border: 0;
    outline: 0;
    font-size: 16px;
    font-weight: bold;
    /* color: rgba(255, 255, 255, 0.5); */
  }

  .header_nav li .triangle_area {
    width: 12px;
    height: 12px;
    display: inline-block;
  }

  .header_nav .form-control {
    width: 75%;
    vertical-align: middle;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    cursor:text;
  }

  .header_nav .btn {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  .header_nav .breadcrumb {
    background: transparent;
    font-size: 16px;
    /* align-items: center; */
    padding-left: 0;
    margin: 0;
    /* justify-content: space-around; */
  }

  .breadcrumb-item+.breadcrumb-item::before {
    content: "|";
    /* color:#333; */
    /* font-size:16px; */
  }

  .header_nav .breadcrumb .breadcrumb-item a {
    font-size: 16px;
  }
  .header .class_area{
    width:23rem;
    top:33px;
  }
  .header .search_area{
    width:23rem;
  }
  .header .search_area a{
    margin-left:1rem;
    margin-bottom:1rem;
  }
</style>