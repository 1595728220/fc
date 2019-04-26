<template>
  <div class="row header">
    <div class="col-sm-12">
      <div class="navbar navbar-expand-sm navbar-light header_nav">
        <router-link to="/" class="navbar-brand">对庄翡翠</router-link>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#header_area">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="header_area" class="collapse navbar-collapse">
          <ul class="navbar-nav">
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
              <a @mouseenter="class_hover" @mouseleave="class_hover" class="nav-link" data-target="#class_area"
                data-toggle="collapse"> 分类<div class="triangle_area">
                  <span :class="{'triangle-left':is_triangle_left,'triangle-top':is_triangle_top}">
                  </span>
                </div>
              </a>
              <div class="collapse text-dark w-100 class_area" id="class_area">
                <h1>分类一</h1>
                <h1>分类二</h1>
                <h1>分类三</h1>
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
        is_triangle_top: true
      }
    },
    methods: {
      class_hover() {
        console.log("鼠标悬停在分类标签");
        [this.is_triangle_left, this.is_triangle_top] = [this.is_triangle_top, this.is_triangle_left]
      }
    },
  }
</script>
<style>
  @media (min-width: 576px) {}

  @media (min-width: 768px) {
    .class_area {
      width: 500px;
      position: absolute;
      left: 10px;
      top: 10px;
    }
  }

  @media (min-width: 992px) {}

  @media (min-width: 1200px) {}

  .header {
    border-bottom: 1px solid #ccc;
  }

  .header_nav li a {
    font-size: 16px;
    font-weight: bold;
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