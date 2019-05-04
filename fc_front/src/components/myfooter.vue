<template>
  <div class="footer">
    <div class="d-flex justify-content-around mb-4">
      <router-link to="/classroom" class="p-0">
        <p class="footer_icon classroom"></p>
        <span class="footer_icon_text">珠宝课堂</span>
      </router-link>
      <router-link to="/classroom" class="p-0">
        <p class="footer_icon faq"></p>
        <span class="footer_icon_text">珠宝问答</span>
      </router-link>
      <router-link to="/classroom" class="p-0">
        <p class="footer_icon trends"></p>
        <span class="footer_icon_text">对庄动态</span>
      </router-link>
      <router-link to="/classroom" class="p-0">
        <p class="footer_icon classroom"></p>
        <span class="footer_icon_text tag">对庄标签</span>
      </router-link>
    </div>
    <div class="row m-0 pb-3 mb-4">
      <div class="col-list col-sm-12 col-lg-8 pt-3">
        <div class="d-flex flex-wrap justify-content-between">
          <div class="pr-3 pl-3">
            <h4 class="middle_font font-weight-bold mb-2">交易方式</h4>
            <ul>
              <li class="mb-2">
                <router-link to="/zfb">支付宝支付</router-link>
              </li>
              <li class="mb-2">
                <router-link to="/wx">微信支付</router-link>
              </li>
              <li class="mb-2">
                <router-link to="/bank">银行转账汇款</router-link>
              </li>
              <li class="mb-2">
                <router-link to="/zfbfaq">支付宝常见问题</router-link>
              </li>
            </ul>
          </div>
          <div class="">
            <h4 class="middle_font font-weight-bold mb-2">对庄保障</h4>
            <ul>
              <li class="mb-2">
                <router-link to="/picc">PICC承保</router-link>
              </li>
              <li class="mb-2">
                <span>手机如实拍摄</span>
              </li>
              <li class="mb-2">
                <span>源头底价</span>
              </li>
              <li class="mb-2">
                <span>无理由退货</span>
              </li>
            </ul>
          </div>
          <div class="pr-3 pl-3">
            <h4 class="middle_font font-weight-bold mb-2">关于对庄</h4>
            <ul>
              <li class="mb-2">
                <router-link to="/forus">关于我们</router-link>
              </li>
              <li class="mb-2">
                <router-link to="/pinzhi">品质保障</router-link>
              </li>
              <li class="mb-2">
                <router-link to="/miandian">缅甸原石之旅</router-link>
              </li>
              <li class="mb-2">
                <router-link to="/media">媒体报道</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-4 d-flex">
        <div class="w-50">
          <img :src="img_erweima" class="w-100" >
          <p class="text-center m-0">安装对庄APP</p>
        </div>
        <div class="w-50">
          <img :src="img_erweima" class="w-100" >
          <p class="text-center m-0">添加对庄客服微信</p>
        </div>    
      </div>
    </div>
    <div class="pt-4">
      <ul class="d-flex mr-auto ml-auto justify-content-around flex-wrap mb-4">
        <li class="mr-3">
          <router-link to="/unknow">关于对庄</router-link>
        </li>
        <li class="mr-3">
          <router-link to="/unknow">翡翠图片</router-link>
        </li>
        <li class="mr-3">
          <router-link to="/unknow">翡翠知识</router-link>
        </li>
        <li class="mr-3">
          <router-link to="/unknow">翡翠戒指</router-link>
        </li>
        <li class="mr-3">
          <router-link to="/unknow">对庄口碑</router-link>
        </li>
        <li class="mr-3">
          <router-link to="/unknow">对庄客服</router-link>
        </li>
        <li class="mr-3">
          <router-link to="/unknow">交易规则</router-link>
        </li>
        <li>
          <router-link to="/unknow">鉴定宝服务</router-link>
        </li>
        
      </ul>  
      <p class="text-center">对庄翡翠 版权所有 2015-2020 ICP备案证数：XXXXXXXX  增值业务许可证：XXXXXXXX</p>
      <p class="text-center">© 2015-2020 www.urlip.com ALL RIGHT RESERVED</p>
      <h4 class="middle_font text-center">买翡翠，找源头，就在对庄</h4>
     <ul class="d-flex mr-auto ml-auto justify-content-between flex-wrap mb-4">
        <li class="mr-2">
          <a href="http://www.baidu.com" target="_blank">百度</a>
        </li>
        <li class="mr-2">
          <a href="http://www.baidu.com" target="_blank">百度</a>
        </li>
        <li class="mr-2">
          <a href="http://www.baidu.com" target="_blank">百度</a>
        </li>
        <li class="mr-2">
          <a href="http://www.baidu.com" target="_blank">百度</a>
        </li>
        <li class="mr-2">
          <a href="http://www.baidu.com" target="_blank">百度</a>
        </li>
        <li class="mr-2">
          <a href="http://www.baidu.com" target="_blank">百度</a>
        </li>
        <li class="mr-2">
          <a href="http://www.baidu.com" target="_blank">百度</a>
        </li>
        <li class="mr-2">
          <a href="http://www.baidu.com" target="_blank">百度</a>
        </li>
        <li class="mr-2">
          <a href="http://www.baidu.com" target="_blank">百度</a>
        </li>
        <li class="mr-2">
          <a href="http://www.baidu.com" target="_blank">百度</a>
        </li>  
        <li class="mr-2">
          <a href="http://www.baidu.com" target="_blank">百度</a>
        </li>
        
      </ul> 
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      img_erweima:require("../assets/imgs/footer/erweima.png")
    }
  }
};
</script>
<style>
.footer>div:first-child{
  border-top:1px solid #ddd;
  border-bottom:1px solid #ddd;
  padding:1.2rem 0;
}
.footer .footer_icon {
  width: 4rem;
  height: 4rem;
  background: transparent url(../assets/imgs/footer/icon.png) -10px -10px;
  margin-bottom: 0;
}
.footer .footer_icon.faq {
  background-position: -94px -10px;
}
.footer .footer_icon.trends {
  background-position: -10px -94px;
}
.footer .footer_icon.tag {
  background-position: -94px -94px;
}
.footer .footer_icon_text {
  font-size: 1rem;
}
.footer .col-list{
  border-right:1px solid #ddd;
}
.footer>div:nth-child(3){
  border-top:1px solid #ddd;
}
</style>