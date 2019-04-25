<template>
  <div class="row">
    <div class="col-lg-6 col-sm-12">
      <!-- 折叠导航栏 -->
      <div class="navbar navbar-expand-sm bg-dark navbar-dark">
        <!-- 最前方不隐藏的菜单栏 -->
        <router-link to="/" class="navbar-brand">对庄翡翠</router-link>
        <!-- 小屏幕下的按钮，点击展开 -->
        <button data-toggle="collapse" data-target="#header_content" class="navbar-toggler">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- 小屏幕下折叠的内容 -->
        <div id="header_content" class="collapse navbar-collapse">
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
            <li class="nav-item">
                <button class="nav-link" data-toggle="collapse" data-target="#header_class">分类</button>
                <div class="collapse" id="#header_class">
                  111
                </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-sm-12">

    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style>
  body{
    color:#333;
  }
</style>