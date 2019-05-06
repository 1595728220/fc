<template>
    <!-- http://www.aitaocui.cn/daquan/feicui/94312.html -->
    <div class="">
        <myheader></myheader>
        <div class="container mt-3 mb-3">
            <div class="banner bg-secondary row m-0">
                <div class="col-lg-10 col-sm-12"></div>
                <div class="col-lg-2 col-sm-12 ">
                    <ul class="d-flex flex-sm-row flex-lg-column">
                        <li v-for="(val,key,index) in banner.imgMsg" :key="index">
                            <router-link :to="'/detail/'+val.pid" class="mr-1 ml-1 d-block">
                                <img :src="val.bannerSrc" class="w-100 asideImg" :hover>
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
                },
            }
        },
        mounted() {
            //请求banner数据
            this.$axios.get("/product/banner").then(result => {
                this.banner.imgMsg = result.data
                //遍历banner响应结果，进行一些数据的处理
                this.banner.imgMsg.forEach(el => {
                    //设置图片的相对路径
                    el.bannerSrc = require("../assets/imgs/banner/" + el.banner)
                    // el.now
                    // el.asideSrc = require("../assets/imgs/product/"+el.photo1)
                })
            }).catch(error => {
                throw error
            })
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

    .banner .asideImg.active {
        border: 3px solid #28a745
    }

    .banner .asideImg {
        border: 3px solid transparent
    }
</style>