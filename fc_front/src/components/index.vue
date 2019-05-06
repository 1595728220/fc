<template>
    <!-- http://www.aitaocui.cn/daquan/feicui/94312.html -->
    <div class="">
        <myheader></myheader>
        <div class="container mt-3 mb-3">
            <div class="banner bg-secondary row m-0">
                <div class="col-lg-10 col-sm-12 p-0 oh banner_area" ref="banner_area">
                    <ul class="clear main d-flex" :style="calcMarginLeft">
                        <li v-for="(val,key) in banner.lunbo.imgMsg" :key="key" class="fl h-100">
                            <router-link :to="'/detail/'+val.pid" class="d-block h-100">
                                <img :src="val.bannerSrc" class="w-100 h-100">
                            </router-link>
                        </li>
                        <li v-for="(val,key) in banner.imgMsg[0]" :key="key" class="fl h-100">
                                <router-link :to="'/detail/'+val.pid" class="d-block h-100">
                                    <img :src="val.bannerSrc" class="w-100 h-100">
                                </router-link>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-2 col-sm-12 ">
                    <ul class="d-flex flex-sm-row flex-lg-column justify-content-between align-items-stretch">
                        <li v-for="(val,key) in banner.imgMsg" :key="key">
                            <router-link :to="'/detail/'+val.pid" class="mr-1 ml-1 d-block">
                                <img :src="val.bannerSrc" class="w-100 asideImg" @mouseenter="asideBanner_enter(key)"
                                    @mouseleave="asideBanner_leave(key)" :class="{active:val.isshow}">
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
                //轮播图对象
                banner: {
                    //轮播图展示的产品对象
                    imgMsg: {},
                    //轮播对象
                    lunbo: {
                        //当前图片的下标
                        currentIndex: 0,
                        // 轮播中一张图的宽度
                        onceWidth: 0,
                        //存储定时器
                        timer: null,
                        // 图片的数量
                        imgCount: 0,
                        //定时器的时间间隔
                        deltaTime: 0,
                        //上一次定时器运行的时间点
                        lastTime: null,
                        //轮播的速度
                        speed: 2,
                        //轮播的距离
                        left:0,
                        //表示一张图片轮播完的临界值
                        critical:0,
                        //构造一个在最后重复第一张图的数组
                        imgMsg:[]
                    },
                },
                screenWidth: document.documentElement.clientWidth, //屏幕宽度
            }
        },
        mounted() {
            //获取当前轮播一张图的宽度
            this.banner.lunbo.onceWidth = this.$refs.banner_area.offsetWidth
            this.banner.lunbo.critical = (this.banner.lunbo.currentIndex+1)*this.banner.lunbo.onceWidth
            // 定义窗口大小变更通知事件
            window.onresize =  () => {
                this.screenWidth = document.documentElement.clientWidth; //窗口宽度
            };
            //请求banner数据
            this.$axios.get("/product/banner").then(result => {
                this.banner.imgMsg = result.data
                this.banner.lunbo.imgCount = result.data.length
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
                    this.$set(el, "bannerSrc", require("../assets/imgs/banner/" + el.banner))
                    // el.isshow = false
                    this.$set(el, "isshow", false)
                })
                this.banner.lunbo.imgMsg = [...this.banner.imgMsg,this.banner.imgMsg[0]]
            }).catch(error => {
                throw error
            })
            //页面加载后开始轮播图片
            // this.banner.lunbo.timer = setInterval(() => {
            //     this.banner.lunbo.currentIndex === this.banner.lunbo.imgCount - 1 ? this.banner.lunbo
            //         .currentIndex = 0 : this.banner.lunbo.currentIndex++
            // }, 1000)
            this.smartLoop()
        },

        methods: {
            asideBanner_enter(ind) {
                // console.log("鼠标进入asideBanner"+ind)
                //使用map可以更新视图
                this.banner.imgMsg = this.banner.imgMsg.map(el => {
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
            lunbo() {
                //如果累计的边界不小于父元素的宽度，那么重置参数
                if ( this.banner.lunbo.left >= this.banner.lunbo.imgCount*this.banner.lunbo.onceWidth) {
                    this.banner.lunbo.left = 0
                    this.banner.lunbo.currentIndex = 0
                    this.banner.lunbo.critical = (this.banner.lunbo.currentIndex+1)*this.banner.lunbo.onceWidth
                }
                //限制时间间隔在40ms以内
                if (this.banner.lunbo.deltaTime > 40) {
                    this.banner.lunbo.deltaTime = 40
                }
                //计算left属性值
                this.banner.lunbo.left += this.banner.lunbo.speed * this.banner.lunbo.deltaTime

                 //left属性超出累积的边界值时，将left属性值规范化，并计算新的累积边界值，
                 if (this.banner.lunbo.left >= this.banner.lunbo.critical) {
                    this.banner.lunbo.sign = 0
                    this.banner.lunbo.currentIndex ++
                    this.banner.lunbo.left = this.banner.lunbo.critical
                    this.banner.lunbo.critical = this.banner.lunbo.onceWidth * (this.banner.lunbo.currentIndex + 1)
                }
            },
            smartLoop() {
                // console.log(this.banner.lunbo.left)
                // console.log(this.banner.lunbo.critical)
                let lunbo = this.lunbo.bind(this.banner.lunbo)
                //定义开始执行时的时间节点
                let now = new Date()
                //计算中间的时间间隔
                this.banner.lunbo.deltaTime = now - this.banner.lunbo.lastTime
                if (this.banner.lunbo.sign === 1) {
                    this.lunbo()
                    requestAnimationFrame(this.smartLoop)
                } else {
                    //当图片到达边界点时，等待3秒继续
                    this.banner.lunbo.timer = setTimeout( ()=> {
                        this.lunbo()
                        this.banner.lunbo.sign = 1
                        requestAnimationFrame(this.smartLoop)
                    }, 4000)
                }
            },
            
        },
        watch: {
            'screenWidth': function () { //监听屏幕宽度变化
                this.banner.lunbo.onceWidth = this.$refs.banner_area.offsetWidth;
            },
        },
        computed: {
            //将margin-left拼接成完整的内联样式
            calcMarginLeft() {
                return `margin-left:${-this.banner.lunbo.left}px`
            },
        },
        destroyed() {
            clearInterval(this.banner.lunbo.timer)
        },
    }
</script>
<style>
    @media screen and (max-width: 575px) {
        .banner .asideImg {
            height: 40px;
        }

        .banner .banner_area {
            height: 165px;
        }
    }

    @media screen and (min-width: 576px) {
        .banner .asideImg {
            height: 65px;
        }

        .banner .banner_area {
            height: calc(540px*340/925);
        }
    }

    @media screen and (min-width: 768px) {
        .banner .asideImg {
            height: 86px;
        }

        .banner .banner_area {
            height: calc(720px*340/925);
        }
    }

    @media screen and (min-width: 992px) {
        .banner .asideImg {
            height: 56px;
        }

        .banner .banner_area {
            height: calc(960px*340/925);
        }
    }

    @media screen and (min-width: 1200px) {
        .banner .asideImg {
            height: 84px;
        }

        .banner .banner_area {
            height: calc(1140px*340/925);
        }
    }

    .banner .main {
        width: 500%;
        height: 100%;
        overflow: hidden;
    }

    .banner .asideImg.active {
        border: 3px solid #28a745
    }

    .banner .asideImg {
        border: 3px solid transparent
    }
</style>