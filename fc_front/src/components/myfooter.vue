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
    <div class="row m-0 mb-4">
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
          <div class>
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
          <img :src="img_app" class="w-100">
          <p class="text-center m-0">安装对庄APP</p>
        </div>
        <div class="w-50">
          <img :src="img_erweima" class="w-100">
          <p class="text-center m-0">添加对庄客服微信</p>
        </div>
      </div>
    </div>
    <div class="pt-4">
      <ul class="d-flex mr-auto ml-auto justify-content-around flex-wrap mb-4">
        <li class="mr-3" v-for="(obj,index) of jump" :key="index">
          <router-link :to="obj.to">{{obj.name}}</router-link>
        </li>
      </ul>
      <p class="text-center">对庄翡翠 版权所有 2015-2020 ICP备案证数：XXXXXXXX 增值业务许可证：XXXXXXXX</p>
      <p class="text-center">© 2015-2020 www.urlip.com ALL RIGHT RESERVED</p>
      <h4 class="middle_font text-center">买翡翠，找源头，就在对庄</h4>
      <ul class="d-flex mr-auto ml-auto justify-content-between flex-wrap mb-4">
        <li class="mr-2 ml-2" v-for="(obj,index) of youqing" :key="index">
          <a :href="obj.href" target="_blank">{{obj.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img_app: "imgs/download/downapp.png",
      img_erweima: "imgs/footer/erweima.png",
      youqing: [
        { href: "http://www.baidu.com", name: "百度" },
        { href: "http://www.baidu.com", name: "百度" },
        { href: "http://www.baidu.com", name: "百度" },
        { href: "http://www.baidu.com", name: "百度" },
        { href: "http://www.baidu.com", name: "百度" },
        { href: "http://www.baidu.com", name: "百度" },
        { href: "http://www.baidu.com", name: "百度" },
        { href: "http://www.baidu.com", name: "百度" },
        { href: "http://www.baidu.com", name: "百度" },
        { href: "http://www.baidu.com", name: "百度" },
        { href: "http://www.baidu.com", name: "百度" },
      ],
      jump: [
        { to: "/unknow", name: "关于对庄" },
        { to: "/unknow", name: "翡翠图片" },
        { to: "/unknow", name: "翡翠知识" },
        { to: "/unknow", name: "翡翠戒指" },
        { to: "/unknow", name: "对庄口碑" },
        { to: "/unknow", name: "对庄客服" },
        { to: "/unknow", name: "交易规则" },
        { to: "/unknow", name: "鉴定宝服务" },
      ]
    };
  }
};
</script>
<style scoped lang="scss">
.footer > div:first-child {
  border-top: .0625rem solid #ddd;
  border-bottom: .0625rem solid #ddd;
  padding: 1.2rem 0;
}

.footer .footer_icon {
  width: 4rem;
  height: 4rem;
  background: transparent url(/imgs/footer/icon.png) -0.625rem -0.625rem;
  margin-bottom: 0;
}

.footer .footer_icon.faq {
  background-position: -5.875rem -0.625rem;
}

.footer .footer_icon.trends {
  background-position: -0.625rem -5.875rem;
}

.footer .footer_icon.tag {
  background-position: -5.875rem -5.875rem;
}

.footer .footer_icon_text {
  font-size: 1rem;
}

.footer .col-list {
  border-right: .0625rem solid #ddd;
}

.footer > div:nth-child(3) {
  border-top: .0625rem solid #ddd;
}
</style>