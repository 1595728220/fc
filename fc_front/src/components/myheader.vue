<template>
  <div class="row header">
    <div class="col-lg-6 col-sm-12">
      <ul class="header_nav df">
        <li>
          <router-link to="/">对庄翡翠</router-link>
        </li>
        <li>
          <router-link to="/">逛市场</router-link>
        </li>
        <li>
          <router-link to="/">新品</router-link>
        </li>
        <li>
          <button @mouseenter="class_hover" @mouseleave="class_hover">分类</button>
          <div class="triangle_area"><span :class="{'triangle-left':is_triangle_left,'triangle-top':is_triangle_top}"></span></div>
        </li>
        <li>
          <router-link to="/">对庄APP</router-link>
        </li>
      </ul>
    </div>
    <div class="col-lg-6 col-sm-12">
      <div class="row m-0 header_right">
        <div class="col-sm-6">
          <input type="text" class="form-control dib " placeholder="翡翠手镯">
          <button class="btn btn-primary">搜索</button>
        </div>
        <div class="col-sm-6">
          <ul class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/login">登录</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/register">注册</router-link>
            </li>
          </ul>
        </div>
      </div>
     
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      is_triangle_left:false,
      is_triangle_top:true
    }
  },
  methods: {
    class_hover(){
      console.log("鼠标悬停在分类标签");
      [this.is_triangle_left,this.is_triangle_top] = [this.is_triangle_top,this.is_triangle_left] 
    }
  },
}
</script>
<style>
  @media screen and (minwidth:992px){
    
  }
  .header{
    padding:20px 5px;
    border-bottom:1px solid #ccc;
    align-items:center;

  }
  .header_nav{
    justify-content:space-around;
    /* align-items:center; */
  }
  .header_nav li a{
    font-size:16px;
    font-weight:bold;
  }
  .header_nav li button{
    border:0;
    outline:0;
    font-size:16px;
    font-weight:bold;
    background:#fff;
  }
  .header_nav li:first-child a{
    font-size:20px;
  }
  .header_nav li .triangle_area{
    width:12px;
    height:12px;
    display: inline-block;
  }
  .header_right .form-control{
    width:50%;
    vertical-align: middle;
    border-top-right-radius:0px;
    border-bottom-right-radius: 0px;
  }
  .header_right .btn{
    border-top-left-radius:0px;
    border-bottom-left-radius: 0px;
  }
  .header_right .breadcrumb{
    background:#fff;
  }
  .breadcrumb > li + li:before{
    content:"|";
    color:#333;
    font-size:16px;
  }
  .breadcrumb .breadcrumb-item a{
    font-size:16px;
  }
</style>