<template>
  <div class="footer">
    <div class="d-flex justify-content-around mb-3">
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
    <div class="row m-0">
      <div class="col-list col-sm-12 col-lg-8">
        <div class="row m-0">
          <div class="col-sm-12 col-lg-4">
            <h4 class="small_font font-weight-bold">交易方式</h4>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-4">
        <img :src="img_erweima" class="w-50">
        <img :src="img_erweima" class="w-50">
      </div>
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
</style>