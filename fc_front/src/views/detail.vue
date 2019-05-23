<template>
  <div>
    <div class="row m-0 detail pr">
      <div class="col-lg-6 tu col-sm-12 d-flex">
        <div class="w-100">
          <div class="pr middle_img">
            <img :src="imgSrc.product[showIndex]" alt class="w-100">
            <div class="mask pa" v-show="mask_is_show" :style="return_position"></div>
            <div
              class="super_mask pa"
              @mouseenter="smask_enter"
              @mouseleave="smask_leave"
              @mousemove="smask_move($event)"
              ref="super_mask"
            ></div>
            <span class="pa bg_img" :style="return_bgImg" v-show="mask_is_show"></span>
          </div>
          <div class="d-flex justify-content-between mb-3 mt-3">
            <img
              :src="val"
              v-for="(val,index) in imgSrc.product"
              :key="index"
              class="small_img"
              @click="qiehuan(index)"
            >
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-sm-12 wen d-flex flex-column justify-content-between">
        <div class>
          <h3 class="font-weight-bold mb-5">{{product.described}}</h3>
          <h5 class="middle_font mb-5">货号:{{product.artNo}}</h5>
          <h5 class="text-danger mb-5">建议零售价:￥{{product.price}}</h5>
        </div>
        <div class="text-center">
          <h5 class="text-secondary middle_font text-left">提示:该宝贝只能在对庄APP内购买</h5>
          <router-link to="/appdown" class="btn btn-success w-50 mb-3">APP内购买</router-link>
        </div>
        <div class="d-flex justify-content-around pt-5">
          <div class="p-0">
            <p class="index_icon promise"></p>
            <span class="icon_text">翡翠保A承若</span>
          </div>
          <div class="p-0">
            <p class="index_icon pifa"></p>
            <span class="icon_text">源头批发</span>
          </div>
          <div class="p-0">
            <p class="index_icon rushi"></p>
            <span class="icon_text">手机如实拍摄</span>
          </div>
          <div class="p-0">
            <p class="index_icon tuikuan"></p>
            <span class="icon_text">7天无理由退款</span>
          </div>
        </div>
      </div>
    </div>
    <div class="changtu mt-3 pl-4">
      <div class="btn-group">
        <a
          href="javascript:;"
          class="btn btn-secondary"
          @click="bottom_qiehuan(ind)"
          :class="{btnPrimary:bottom_index===ind}"
          v-for="(val,ind) in bottom"
          :key="ind"
        >{{val}}</a>
      </div>
      <div :class="{show:bottom_index === 0}" class="hide">
        <img :src="val" v-for="(val,index) in imgSrc.product" :key="index" class="w-100">
      </div>
      <div :class="{show:bottom_index === 1}" class="hide">
        <img :src="val" v-for="(val,index) in imgSrc.promise" :key="index" class="w-100">
      </div>
      <div :class="{show:bottom_index === 2}" class="hide">
        <mypinglun :mymsg="pid"></mypinglun>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:["pid"],
  data() {
    return {
      product: {},
      imgSrc: { product: [], promise: [] },
      showIndex: 0,
      bottom_index: 0,
      bottom: ["详情", "保障", "评论"],
      mask_is_show: false,
      mask_top: 0,
      mask_left: 0,
      scop_scale: 4,
      imgWidth: 0
    };
  },
  methods: {
    qiehuan(val) {
      // console.log(val)
      this.showIndex = val;
      // this.bigImgSrc = this.imgSrc.product[val]
      // console.log(this.bigImgSrc)
    },
    bottom_qiehuan(ind) {
      this.bottom_index = ind;
    },
    //鼠标进入super_mask触发的事件处理函数
    smask_enter() {
      this.mask_is_show = true;
    },
    //鼠标移出super_mask触发的事件处理函数
    smask_leave() {
      this.mask_is_show = false;
    },
    //鼠标在super_mask移动的事件处理函数
    smask_move(e) {
      let top = e.offsetY,
        left = e.offsetX,
        width = this.$refs.super_mask.offsetWidth,
        revise = width / this.scop_scale / 2,
        //计算边界
        min = 0,
        max = width - revise * 2;
      //修正top,left，使鼠标在方块中央
      top -= revise;
      left -= revise;
      //保存当前图片的宽度
      this.imgWidth = width;
      // console.log(max)
      // console.log(left);
      // console.log(top);
      // console.log(width);
      //超出值规范化
      if (top < min) top = min;
      else if (top > max) top = max;
      if (left < min) left = min;
      else if (left > max) left = max;
      // 保存进data中
      this.mask_top = top;
      this.mask_left = left;
      // console.log(this.mask_top);
    }
  },
  created() {
    //页面加载后将路由中的产品编号参数保存在本地变量中
    // this.pid = this.$route.params.pid;
    //根据产品编号查找对应的产品信息
    this.$axios
      .get("/product/detail", {
        params: { pid: this.pid }
      })
      .then(result => {
        for (let key in result.data[0]) {
          this.$set(this.product, key, result.data[0][key]);
          // 将图片资源保存进专门的变量中
          switch (key) {
            case "photo1":
            case "photo2":
            case "photo3":
            case "photo4":
              this.imgSrc.product.push(
                "imgs/product/" + result.data[0][key]
              );
              break;
            case "promise":
              this.imgSrc.promise.push(
                "imgs/product/" + result.data[0][key]
              );
              break;
            default:
          }
        }
        // console.log(this.product)
        // console.log(this.imgSrc)
        // console.log(result.data[0]);
      })
      .catch(err => {
        throw err;
      });
  },
  computed: {
    return_position() {
      return `left:${this.mask_left/16}rem;top:${this.mask_top/16}rem`;
    },
    return_bgImg() {
      return `background-image:url("${
        this.imgSrc.product[this.showIndex]
      }");background-size:${this.scop_scale * this.imgWidth /16}rem,${this
        .scop_scale * this.imgWidth /16}rem;background-position:${-this.scop_scale *
        this.mask_left /16}rem ${-this.scop_scale * this.mask_top /16}rem`;
    }
  }
};
</script>
<style scoped lang="scss">
@media screen and (max-width: 575px) {
  .small_img {
    height: 4rem;
    width: 4rem;
  }
}

@media screen and (min-width: 576px) {
  .small_img {
    width: 6.25rem;
    height: 6.25rem;
  }
}

@media screen and (min-width: 768px) {
  .small_img {
    width: 8rem;
    height: 8rem;
  }
}
@media screen and (max-width: 991px) {
  .bg_img {
    bottom: -100%;
    left: 0;
  }
}
@media screen and (min-width: 992px) {
  .small_img {
    width: 6.25rem;
    height: 6.25rem;
  }
  .bg_img {
    right: -100%;
    top: 0;
  }
}

@media screen and (min-width: 1200px) {
  .small_img {
    width: 8rem;
    height: 8rem;
  }
}
.middle_img {
  .mask {
    width: 25%;
    height: 25%;
    left: 0;
    top: 0;
    background: #ff0;
    opacity: 0.2;
  }
  .super_mask {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    cursor: move;
  }
}

.small_img {
  cursor: pointer;
}
.bg_img {
  width: 100%;
  height: 100%;
  z-index: 10;
  border: .0625rem solid #ccc;
}
.wen > div:nth-child(3) {
  border-top: .0625rem solid #ccc;
}
.index_icon {
  width: 4.1rem;
  height: 4.2rem;
  background: url(/imgs/icon/icons.png) -14.5625rem -7.8125rem;
  background-size: 20rem;
  margin: 0 auto;
  &.pifa {
    background-position: -21.3125rem -1.1875rem;
  }
  &.rushi {
    background-position: -21.3125rem -7.8125rem;
  }
  &.tuikuan {
    background-position: -7.9375rem -7.8125rem;
  }
}
.icon_text {
  font-size: 1.25rem;
}

.hide {
  display: none;
}
.show {
  display: block;
}
.btnPrimary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  &:hover {
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
  &:not(:disabled):not(.disabled):active {
    color: #fff;
    background-color: #0062cc;
    border-color: #005cbf;
  }
}
</style>
