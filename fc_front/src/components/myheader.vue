<template>
  <div class="row header m-0 mb-4">
    <div class="col-sm-12">
      <div class="navbar navbar-expand-md navbar-light header_nav">
        <router-link to="/" class="navbar-brand">
          <img src="../../public/imgs/header/logo.png" alt>
        </router-link>
        <button
          class="navbar-toggler"
          data-toggle="collapse"
          data-target="#header_area"
          @click="collapse_click"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="header_area" class="collapse navbar-collapse" :class="{show:collapse_is_show}">
          <ul class="navbar-nav w-100">
            <li class="nav-item">
              <router-link to="/" class="nav-link">逛市场</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{path:'/product',query:{xinpin:'true'}}" class="nav-link">新品</router-link>
            </li>
            <li class="nav-item pr">
              <a @click.stop="class_click" class="nav-link cp" href="javascript:;">
                分类
                <div class="triangle_area">
                  <span
                    :class="{'triangle-left':class_is_show_dropdown,'triangle-top':!class_is_show_dropdown}"
                  ></span>
                </div>
              </a>
              <div
                class="dropdown-menu text-dark mb-1 class_area d-block oh tr"
                :class="{v_hidden:!class_is_show_dropdown}"
              >
                <div
                  class="pt-1 pl-3 pr-3 pb-2"
                  v-for="(values,keys) in product_classfy"
                  :key="keys"
                >
                  <h5 class="mb-2">{{keys}}</h5>
                  <div>
                    <router-link
                      :to="{path:'/product',query:{form:'class',keys,val}}"
                      class="btn btn-primary w-25 mr-2 mb-2"
                      v-for="(val,key) in product_classfy[keys]"
                      :key="key"
                    >{{val}}</router-link>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <router-link to="/appdown" class="nav-link">对庄APP</router-link>
            </li>
            <li class="nav-item pr">
              <div>
                <input
                  type="text"
                  class="form-control dib search_input"
                  @click.stop="search_click"
                  placeholder="翡翠手镯"
                  v-model="person_input_search"
                  @keyup.13="keyup_search"
                >
                <button class="btn btn-primary pl-3 pr-3" @click="keyup_search">搜索</button>
              </div>
              <div
                class="dropdown-menu text-dark mb-1 search_area d-block tr oh"
                :class="{v_hidden:!search_is_show_dropdown}"
              >
                <div class="mb-5 p-3">
                  <div v-if="person_uid">
                    <h5>搜索记录</h5>
                    <div>
                      <router-link
                        :to="{path:'/product',query:{keywords:keyword.content}}"
                        class="btn btn-primary w-25"
                        v-for="(keyword,ind) in keywords.me"
                        :key="ind"
                        :class="{disabled:!is_person_keywords}"
                      >
                        <span v-if="keyword">{{keyword.content}}</span>
                      </router-link>
                    </div>
                  </div>
                  <h5 class="mb-2">热门搜索</h5>
                  <div>
                    <router-link
                      :to="{path:'/product',query:{keywords:keyword.content}}"
                      class="btn btn-primary w-25"
                      v-for="(keyword,ind) in keywords.all"
                      :key="ind"
                    >
                      <span v-if="keyword">{{keyword.content}}</span>
                    </router-link>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item" v-if="!person_uid">
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/login">登录</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/register">注册</router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item" v-if="person_uid">
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <span class="person_welcome">{{person_name}} 欢迎,</span>
                  <router-link to="/person">个人中心</router-link>
                </li>
                <li class="breadcrumb-item">
                  <a @click="logout_click" href="javascript:;">退出</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //保存当前用户id
      // person_uid: null,
      //改用store中的person_uid
      //保存当前用户名字
      // person_name: null,
      //导航栏的是否折叠状态
      collapse_is_show: false,
      //搜索关键字
      keywords: {
        all: null,
        me: null
      },
      //分类关键字
      classfywords: null,
      //是否有个人的搜索关键字记录
      is_person_keywords: false,
      //保存用户输入的搜索关键词
      person_input_search: null,
      //产品的分类情况
      product_classfy: {
        颜色: [],
        种水: []
      },
      mytimer: null
    };
  },
  methods: {
    //点击分类标签，展开下拉列表
    class_click() {
      // console.log("鼠标点击分类标签，展开下拉列表");
      //下拉列表的显示
      this.$store.dispatch("set_class_is_show_dropdown", true);
    },
    //搜索栏失去焦点/获得焦点时执行的方法
    search_click() {
      //搜索栏的下拉菜单显示
      this.$store.dispatch("set_search_is_show_dropdown", true);
    },
    //点击按钮控制导航栏的隐藏或显示方法
    collapse_click() {
      //切换显示/隐藏的状态
      this.collapse_is_show = !this.collapse_is_show;
    },
    //点击登出的事件
    logout_click() {
      //向/user/logout发送请求携带uid和对应的cookie
      this.$axios
        .get("/user/logout", {
          params: {
            uid: this.person_uid
          }
        })
        .then(() => {
          // console.log("用户成功登出")
          //检查当前登录状态
          this.$store.dispatch("set_user");
        })
        .catch(error => {
          throw error;
        });
    },
    //检查用户的登录状态的方法
    // check_person_state() {
    //   //发送请求查看用户的登录状态
    //   //转移到store中统一调度
    //   this.$store.dispatch("set_user");
    // },
    //检查元素是否存在数组中
    check_array(arr, el) {
      if (arr.indexOf(el) === -1) {
        arr.push(el);
      }
      return arr;
    },
    //当回车时跳转路由
    keyup_search() {
      console.log(this.$store.getters.get_uid);
      this.$axios.get("/product/search", {
        params: {
          uid: this.$store.getters.get_uid,
          keywords: this.person_input_search
        }
      });
      this.$router.push({
        path: "/product",
        query: { keywords: this.person_input_search }
      });
    },
    //请求用户的搜索历史记录
    get_user_search() {
      // console.log("请求用户的搜索历史记录")
      //发送请求
      this.$axios
        .get("/user/search", {
          params: {
            uid: this.person_uid
          }
        })
        .then(result => {
          // console.log(result)
          // this.keywords = JSON.parse(JSON.stringify(result.data.data.all))
          this.keywords.all = result.data.data.all;
          this.keywords.me = result.data.data.me || [];
          // console.log(this.keywords)
          if (this.keywords.me.length === 0) {
            this.keywords.me = [
              {
                content: "无"
              }
            ];
          } else {
            this.is_person_keywords = true;
          }
          // console.log(this.is_person_keywords)
        })
        .catch(error => {
          throw error;
        });
    }
  },
  //当组件挂载后
  mounted() {
    //请求产品的分类信息
    this.$axios
      .get("/product/classfy")
      .then(result => {
        // console.log(result.data);
        let tmpArr = {
          classify: [],
          style: [],
          color: [],
          thickness: []
        };
        //遍历结果消息的数组
        for (let row of result.data) {
          //如果存在分类则新增分类下的样式，如果不存在分类，则创建分类，并添加样式
          this.product_classfy[row.classify]
            ? this.check_array(this.product_classfy[row.classify], row.style)
            : (this.product_classfy[row.classify] = [row.style]);
          //往产品分类对象的颜色属性所对应的数组中插入原本没有的值
          this.check_array(this.product_classfy["颜色"], row.color);
          //往产品分类对象的种水属性所对应的数组中插入原本没有的值
          this.check_array(this.product_classfy["种水"], row.thickness);
          this.check_array(tmpArr.classify, row.classify);
          this.check_array(tmpArr.style, row.style);
          this.check_array(tmpArr.color, row.color);
          this.check_array(tmpArr.thickness, row.thickness);
        }
        //将分类信息保存到tmpArr,再保存到Vuex仓库中
        this.$store.dispatch("set_product_class", tmpArr);
        // console.log(this.$store.getters.get_product_class)
      })
      .catch(error => {
        throw error;
      });
    //检查用户当前状态,并查找用户的搜索记录
    this.$store.dispatch("set_user").then(this.get_user_search);
  },

  //监听数据变化
  watch: {
    $route(/*to,from*/) {
      //跳转组件页面后，监听路由参数中对应的当前页面以及上一个页面
      //当路由变化时检查用户登录状态
      this.$store.dispatch("set_user");
      //当路由变化时清空搜索栏
      this.person_input_search = "";
    }
  },
  computed: {
    person_uid() {
      return this.$store.getters.get_uid;
    },
    person_name() {
      return this.$store.getters.get_nick;
    },
    class_is_show_dropdown() {
      return this.$store.getters.get_class_is_show_dropdown;
    },
    search_is_show_dropdown() {
      return this.$store.getters.get_search_is_show_dropdown;
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  }
};
</script>
<style scoped lang="scss">
@media (min-width: 36rem) {
  .header .navbar-nav {
    align-items: flex-start;
  }
}

@media (min-width: 48rem) {
  .header_nav .class_area {
    width: 31.25rem;
    position: absolute;
    left: .625rem;
    top: .625rem;
  }

  .header .navbar-nav {
    justify-content: space-around;
    align-items: center;
  }

  .breadcrumb {
    align-items: center;
  }
}

.header {
  box-shadow: 0 0 1rem 0.01rem #333;
  .navbar-light .navbar-nav .nav-link {
    color: rgba(0, 0, 0, 0.7);
    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }
}

.header_nav {
  li {
    & > a {
      font-size: 1rem;
      font-weight: bold;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .triangle_area {
      width: .75rem;
      height: .75rem;
      display: inline-block;
    }
  }
  .nav-item > div {
    .form-control {
      width: 75%;
      vertical-align: middle;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      cursor: text;
    }
    .btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      height: 2.375rem;
    }
  }
  .breadcrumb {
    background: transparent;
    font-size: 1rem;
    padding-left: 0;
    margin: 0;
    .breadcrumb-item + .breadcrumb-item::before {
      content: "|";
    }
    .breadcrumb-item a {
      font-size: 1rem;
    }
  }
  .class_area {
    height: 28rem;
    width: 23rem;
    top: 2.0625rem;
  }

  .search_area {
    height: 23rem;
    width: 23rem;
  }

  .search_area a {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }

  .person_welcome {
    font-weight: bold;
  }
}
.btn.disabled {
  color: #ddd;
  pointer-events: none;
}
</style>