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
              <a @click="class_hover" class="nav-link cp"> 分类
                <div class="triangle_area">
                  <span :class="{'triangle-left':is_triangle_left,'triangle-top':is_triangle_top}">
                  </span>
                </div>
              </a>
              <div class="dropdown-menu text-dark w-100 mb-1" :class="{show:is_show_dropdown}" id="class_area">
                <h3>分类一</h3>
                <h3>分类二</h3>
                <h3>分类三</h3>
              </div>
            </li>
            <li class="nav-item">
              <input type="text" class="form-control dib " placeholder="翡翠手镯">
              <button class="btn btn-primary">搜索</button>
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
        is_triangle_left: false,
        is_triangle_top: true,
        is_show_dropdown:false
      }
    },
    methods: {
      class_hover() {
        // console.log("鼠标点击分类标签，展开下拉列表");
        [this.is_triangle_left, this.is_triangle_top] = [this.is_triangle_top, this.is_triangle_left]
        this.is_show_dropdown = !this.is_show_dropdown
      }
    },
  }
</script>
<style>
  @media (min-width: 576px) {
    .header .navbar-nav {
      align-items:flex-start
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
      align-items:center;
    }
    .breadcrumb{
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
    padding-left:0 !important;
    padding-right:0 !important;
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
  }

  .header_nav .btn {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  .header_nav .breadcrumb {
    background: #fff;
    font-size: 16px;
    /* align-items: center; */
    padding-left:0;
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
</style>