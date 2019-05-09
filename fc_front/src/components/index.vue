<template>
    <!-- http://www.aitaocui.cn/daquan/feicui/94312.html -->
    <div class>
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
                <div class="col-lg-2 col-sm-12">
                    <ul class="d-flex flex-sm-row flex-lg-column justify-content-between align-items-stretch">
                        <li v-for="(val,key) in banner.imgMsg" :key="key">
                            <router-link :to="'/detail/'+val.pid" class="mr-1 ml-1 d-block">
                                <img :src="val.bannerSrc" class="w-100 asideImg" @mouseenter="asideBanner_enter(key)"
                                    @mouseleave="asideBanner_leave" :class="{active:val.isshow}">
                                <span class="text-white text-center d-block">{{val.described}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="d-flex justify-content-around mt-5">
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
            <div class="floors">
                <div :class="key" v-for="(floor,key) in floors" :key="key">
                    <h3>{{floor.title}}</h3>
                    <mylist :mymsg="floor"></mylist>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //屏幕宽度
                screenWidth: document.documentElement.clientWidth,
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
                        left: 0,
                        //轮播到下一张图片距离的临界值
                        critical: 0,
                        //构造一个在最后重复第一张图的数组
                        imgMsg: []
                    }
                },
                //楼层信息
                floors: {
                    floor1: {
                        title: "新品推荐",
                        classify: "",
                        style: "",
                        thickness: "",
                        color: "",
                        minprice: 0,
                        maxprice: 999999999999,
                        rexiao: "",
                        xinpin: true,
                        recommond: "",
                        pno: 1,
                        size: 4,
                    },
                    floor2: {
                        title: "热销推荐",
                        classify: "",
                        style: "",
                        thickness: "",
                        color: "",
                        minprice: 0,
                        maxprice: 999999999999,
                        rexiao: true,
                        xinpin: "",
                        recommond: "",
                        pno: 1,
                        size: 4,
                    },
                    floor3: {
                        title: "好货推荐",
                        classify: "",
                        style: "",
                        thickness: "",
                        color: "",
                        minprice: 0,
                        maxprice: 999999999999,
                        rexiao: "",
                        xinpin: "",
                        recommond: true,
                        pno: 1,
                        size: 4,
                    },
                },
            };
        },
        mounted() {
            //获取当前轮播一张图的宽度
            this.banner.lunbo.onceWidth = this.$refs.banner_area.offsetWidth;
            // 计算当前到下一张图片距离的临界值
            this.banner.lunbo.critical =
                (this.banner.lunbo.currentIndex + 1) * this.banner.lunbo.onceWidth;
            // 定义窗口大小变更通知事件
            window.onresize = () => {
                //窗口宽度
                this.screenWidth = document.documentElement.clientWidth;
            };
            //请求banner数据
            this.$axios
                .get("/product/banner")
                .then(result => {
                    //将结果图片存入变量
                    this.banner.imgMsg = result.data;
                    //轮播的图片的数量
                    this.banner.lunbo.imgCount = result.data.length;
                    //在添加一个新属性时，需要使用this.$set添加，此时添加的新属性为被监听的属性
                    this.banner.imgMsg.forEach(el => {
                        //设置图片的相对路径
                        this.$set(
                            el,
                            "bannerSrc",
                            require("../assets/imgs/banner/" + el.banner)
                        );
                        this.$set(el, "isshow", false);
                    });
                    //默认第一张图高亮
                    this.banner.imgMsg[0].isshow = true;
                    //构造成一个适合轮播的数组
                    this.banner.lunbo.imgMsg = [
                        ...this.banner.imgMsg,
                        this.banner.imgMsg[0]
                    ];
                })
                .catch(error => {
                    throw error;
                });
            //页面加载后开始轮播图片
            this.smartLoop();
        },

        methods: {
            //鼠标移入侧边小图
            asideBanner_enter(ind) {
                //console.log("鼠标进入asideBanner" + ind);
                clearTimeout(this.banner.lunbo.timer);
                //让下一次轮播延时
                this.banner.lunbo.sign = 0;
                //获取当前的要显示的图片下标
                this.banner.lunbo.currentIndex = ind;
                //计算当前的图片轮播距离
                this.banner.lunbo.left = ind * this.banner.lunbo.onceWidth;
                //计算切换到下一张图片的临界距离
                this.banner.lunbo.critical = (ind + 1) * this.banner.lunbo.onceWidth;
                //让让前鼠标进入的小图高亮
                this.setHeightlight();
            },
            //鼠标移出侧边小图
            asideBanner_leave() {
                //继续轮播
                this.smartLoop();
            },
            // 让当前轮播显示的图片所对应小图高亮的方法
            setHeightlight() {
                //清空所有的高亮
                this.banner.imgMsg = this.banner.imgMsg.map(el => {
                    el.isshow = false;
                    return el;
                });
                //如果当前图片的下标小于图片数量
                if (this.banner.lunbo.currentIndex < this.banner.imgMsg.length) {
                    //当前图片高亮显示状态改为true
                    this.banner.imgMsg[this.banner.lunbo.currentIndex].isshow = true;
                } else { //如果当前图片的下标不小于图片数量
                    //将第一张图片的高亮显示状态改为true
                    this.banner.imgMsg[0].isshow = true;
                }
            },
            //轮播的方法
            lunbo() {
                //如果累计的边界不小于父元素的宽度，那么重置参数
                if (
                    this.banner.lunbo.left >=
                    this.banner.lunbo.imgCount * this.banner.lunbo.onceWidth
                ) {
                    //向左的移动距离初始化
                    this.banner.lunbo.left = 0;
                    //当前图片所对应下标初始化
                    this.banner.lunbo.currentIndex = 0;
                    //重新计算当前轮播到下一张图片距离的临界值
                    this.banner.lunbo.critical =
                        (this.banner.lunbo.currentIndex + 1) * this.banner.lunbo.onceWidth;
                }
                //限制时间间隔在40ms以内
                if (this.banner.lunbo.deltaTime > 40) {
                    this.banner.lunbo.deltaTime = 40;
                }
                //计算left属性值
                this.banner.lunbo.left +=
                    this.banner.lunbo.speed * this.banner.lunbo.deltaTime;

                //left属性超出累积的边界值时，将left属性值规范化，并计算新的累积边界值，
                if (this.banner.lunbo.left >= this.banner.lunbo.critical) {
                    //使轮播延时4秒
                    this.banner.lunbo.sign = 0;
                    //切换到下一张图片
                    this.banner.lunbo.currentIndex++;
                    //修正图片的左移动距离
                    this.banner.lunbo.left = this.banner.lunbo.critical;
                    //计算当前到下一张图片距离的临界值
                    this.banner.lunbo.critical =
                        this.banner.lunbo.onceWidth * (this.banner.lunbo.currentIndex + 1);
                    //   让当前轮播显示的图片所对应小图高亮
                    this.setHeightlight();
                }
            },
            //智能动画
            smartLoop() {
                // console.log(this.banner.lunbo.left)
                // console.log(this.banner.lunbo.critical)
                //定义开始执行时的时间节点
                let now = new Date();
                //计算中间的时间间隔
                this.banner.lunbo.deltaTime = now - this.banner.lunbo.lastTime;
                //不延迟轮播
                if (this.banner.lunbo.sign === 1) {
                    this.lunbo();
                    requestAnimationFrame(this.smartLoop);
                } else {
                    //延迟轮播
                    //当图片到达边界点时，等待3秒继续
                    this.banner.lunbo.timer = setTimeout(() => {
                        //   console.log("运行定时器"+this.banner.lunbo.timer)
                        this.lunbo();
                        this.banner.lunbo.sign = 1;
                        requestAnimationFrame(this.smartLoop);
                    }, 4000);
                    // console.log("当前等待运行的定时器" + this.banner.lunbo.timer);
                }
            }
        },
        watch: {
            screenWidth() {
                //监听屏幕宽度变化
                this.banner.lunbo.onceWidth = this.$refs.banner_area.offsetWidth;
                this.banner.lunbo.left =
                    this.banner.lunbo.onceWidth * this.banner.lunbo.currentIndex;
            }
        },
        computed: {
            //将margin-left拼接成完整的内联样式
            calcMarginLeft() {
                return `margin-left:${-this.banner.lunbo.left}px`;
            }
        },
        destroyed() {
            clearTimeout(this.banner.lunbo.timer);
        }
    };
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
            height: calc(540px * 340 / 925);
        }
    }

    @media screen and (min-width: 768px) {
        .banner .asideImg {
            height: 86px;
        }

        .banner .banner_area {
            height: calc(720px * 340 / 925);
        }
    }

    @media screen and (min-width: 992px) {
        .banner .asideImg {
            height: 56px;
        }

        .banner .banner_area {
            height: calc(960px * 340 / 925);
        }
    }

    @media screen and (min-width: 1200px) {
        .banner .asideImg {
            height: 84px;
        }

        .banner .banner_area {
            height: calc(1140px * 340 / 925);
        }
    }

    .banner .main {
        width: 500%;
        height: 100%;
        overflow: hidden;
    }

    .banner .asideImg.active {
        border: 3px solid #28a745;
    }

    .banner .asideImg {
        border: 3px solid transparent;
    }
    .index_icon{
        width: 4.1rem;
        height: 4.2rem;
        background:url(../assets/imgs/icon/icons.png) -233px -125px;
        background-size: 20rem;
        margin:0 auto;
    }
    .icon_text{
        font-size:20px;
    }
    .index_icon.pifa{
        background-position: -341px -19px;
    }
    .index_icon.rushi{
        background-position: -341px -125px;
    }
    .index_icon.tuikuan{
        background-position: -127px -125px;        
    }
    .floors {
        margin-top: 2.5rem;
        padding-top: 1.5rem;
        border-top: 2px solid #ddd;
    }
</style>