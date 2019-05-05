<template>
<!-- http://www.aitaocui.cn/daquan/feicui/94312.html -->
    <div class="">
        <myheader></myheader>
        <div class="container mt-3 mb-3">
            <div class="banner bg-secondary row m-0">
                <div class="col-lg-10 col-sm-12"></div>
                <div class="col-lg-2 col-sm-12 d-flex flex-sm-row flex-lg-column">
                    <ul>
                        <li v-for="(val,key,index) in banner.imgMsg" :key="index">
                            <router-link :to="'/detail/'+val.pid">
                                <img :src="val.src">
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
                banner:{
                    baseAddr:"../assets/imgs/banner/",
                    imgMsg:{},
                },
            }
        },
        mounted() {
            this.$axios.get("/product/banner").then(result=>{
                this.banner.imgMsg = result.data
                this.banner.imgMsg.forEach(el=>{
                    el.src = require(this.banner.baseAddr+el.banner)
                    // el.src=require("../assets/imgs/banner/banner1.jpg")
                    // el.test = require("../assets/imgs/banner/banner1.jpg")
                })
                console.log(this.banner.imgMsg[0].src)
            }).catch(error=>{
                throw error
            })
        },
        computed: {
            
        },
    }
</script>
<style>

</style>