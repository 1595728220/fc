<template>
    <!-- http://www.aitaocui.cn/daquan/feicui/94312.html -->
    <div class="">
        <myheader></myheader>
        <div class="container mt-3 mb-3">
            <div class="banner bg-secondary row m-0">
                <div class="col-lg-10 col-sm-12">
                        <ul class="clear main">
                            <li v-for="(val,key) in banner.imgMsg" :key="key" class="fl">
                                    <router-link :to="'/detail/'+val.pid" class="d-block">
                                        <img :src="val.bannerSrc" class="w-100 asideImg" @mouseenter="asideBanner_enter(key)" @mouseleave="asideBanner_leave(key)" :class="{active:val.isshow}">
                                    </router-link>
                                </li>
                            </ul>
                </div>
                <div class="col-lg-2 col-sm-12 ">
                    <ul class="d-flex flex-sm-row flex-lg-column">
                        <li v-for="(val,key) in banner.imgMsg" :key="key">
                            <router-link :to="'/detail/'+val.pid" class="mr-1 ml-1 d-block">
                                <img :src="val.bannerSrc" class="w-100 asideImg" @mouseenter="asideBanner_enter(key)" @mouseleave="asideBanner_leave(key)" :class="{active:val.isshow}">
                                <span class="text-white text-center d-block">{{val.described}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <myfooter></myfooter>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                banner: {
                    imgMsg: {},
                    imgPosition:{}
                },
            }
        },
        mounted() {
            //请求banner数据
            this.$axios.get("/product/banner").then(result => {
                this.banner.imgMsg = result.data
                //使用map遍历banner响应结果，进行一些数据的处理
                // this.banner.imgMsg = this.banner.imgMsg.map(el => {
                //     //设置图片的相对路径
                //     el.bannerSrc = require("../assets/imgs/banner/" + el.banner)
                //     el.isshow = false
                //     return el
                // })
                //在添加一个新属性时，需要使用this.$set添加，此时添加的新属性为被监听的属性
                this.banner.imgMsg.forEach(el => {
                    //设置图片的相对路径
                    // el.bannerSrc = require("../assets/imgs/banner/" + el.banner)
                    this.$set(el,"bannerSrc",require("../assets/imgs/banner/" + el.banner))
                    // el.isshow = false
                    this.$set(el,"isshow",false)
                })
            }).catch(error => {
                throw error
            })
        },
        methods: {
            asideBanner_enter(ind) {
                // console.log("鼠标进入asideBanner"+ind)
                //使用map可以更新视图
                this.banner.imgMsg = this.banner.imgMsg.map(el=>{
                    el.isshow = false
                    return el
                })
                //使用forEach无法更新视图,需要配合this.$set完成数据的更新
                // this.banner.imgMsg.forEach(el=>{
                //     this.$set(el,"isshow",false)
                // })
                this.banner.imgMsg[ind].isshow = true
                // this.$set(this.banner.imgMsg[ind],"isshow",true)
                // console.log(this.banner.imgMsg)
            },
            asideBanner_leave(ind) {
                // console.log("鼠标离开asideBanner"+ind)
                this.banner.imgMsg[ind].isshow = false
                // this.$set(this.banner.imgMsg[ind],"isshow",false)
            },
        },
        computed: {

        },
    }
</script>
<style>
    @media screen and (max-width: 575px) {
        .banner .asideImg {
            height: 40px;
        }
    }

    @media screen and (min-width: 576px) {
        .banner .asideImg {
            height: 50px;
        }
    }

    @media screen and (min-width: 768px) {
        .banner .asideImg {
            height: 80px;
        }
    }

    @media screen and (min-width: 992px) {
        .banner .asideImg {
            height: 50px;
        }
    }

    @media screen and (min-width: 1200px) {
        .banner .asideImg {
            height: 65px;
        }
    }
    .banner .main{
        width:calc()
    }
    .banner .asideImg.active {
        border: 3px solid #28a745
    }

    .banner .asideImg {
        border: 3px solid transparent
    }
</style>