<template>
  <div class="container">
    <!-- <slider>
        <div v-for="item in 5" >
            <div>
                <img src="./image/图层 3@2x.png" alt="">
            </div>
        </div>
    </slider> -->
    <div @touchstart="backToWap" class="backToWap">
      返回页面
    </div>
    <div ref="scrollBanner" class="banner">
      <ul ref="slideGroup" class="scroll-banner">
        <li class="scroll-list" v-for="(item,index) in bannerList" @click="staticgoToGame(item,index)">
          <img :src="item.img|filter" :alt="item.name">
        </li>
      </ul>
      <div class="bannerDots">
        <span v-for="(item,index) in dots" class="bannerDot" :class="{active:index==currentPageIndex}"></span>
      </div>
    </div>
    <div class="body">
      <ul class="navs">
        <li ref="tabWidth" @touchstart="Switch($event,index)" class="nav" :class="{activeNav:index==scrollTabsPage}" v-for="(tabName,index) in tabNames">
          {{tabName}}
        </li>
        <div class="tab-slider" :style="{width,left}"></div>
      </ul>
      <div ref="scrollTabs" class="tabs">
        <ul class="tabs-content">
          <li ref="firstTab" class="tab-content">
            <img class="none" v-if="newHotActivitiesInfo.length==0" src="./image/none.png" alt="">
            <ul v-else class="first-tab">
              <li class="first-tab-content" v-for="(item,index) in newHotActivitiesInfo" @click="gotoActivity(item,$event,index)">
                <img class="bigImg" :src="item.img|filter" alt="">
                <div class="left-content">
                  <p class="content-title">
                    {{item.title}}
                  </p>
                  <p class="content-time">
                    活动时间：{{item.replacedStartTime+'-'+item.replacedEndTime}}
                  </p>
                </div>
                <div class="right-btn" :style="{color:item.underStatus=='underWay'?'#D73C1E':'#8F8F8F',border:item.underStatus=='underWay'?'1px solid #D73C1E':'1px solid #8F8F8F'}">
                  {{item.underStatus=='underWay'?'进行中':item.underStatus=='notYet'?'未开始':'已结束'}}
                </div>
                <img v-if="item.underStatus=='notYet'" src="./image/未开始印章.png" alt="未开始" class="tip">
                <img v-if="item.underStatus=='already'" src="./image/已结束印章 @2x.png" alt="已结束" class="tip">
              </li>
              <li class="nomore">
                {{more.first}}
              </li>
            </ul>
            <img :class="{backToTopInActive:!backToTop.first}" src="./image/back-to-top.svg" alt="回到顶部" class="backToTop" @touchend="scrollToTop('first')">
          </li>
          <li ref="secondTab" class="tab-content">
            <img class="none" v-if="newServerList.length==0" src="./image/none.png" alt="">
            <ul v-else class="second-tab">
              <li class="second-tab-content" v-for="(list,index) in newServerList">
                <img class="midImg" :src="list.gameImg|filter" alt="">
                <div class="mid-content">
                  <div class="mid-content1">
                    <div class="mid-content1-top">
                      <span class="mid-content1-top-title">
                        {{list.gameName}}
                      </span>
                      <!-- <span class="mid-content1-top-tips">
                        开发
                      </span> -->
                    </div>
                    <div class="mid-content1-bottom">
                      {{list.name}}{{list.region}}
                    </div>
                  </div>
                  <div class="mid-content2" :style="{color:list.overTime.substr(0,1)!=='已'?'#A4A4A4':'#D73C1E'}" v-html="list.overTime">

                  </div>
                </div>
                <div class="right-btn" @click="goToGame(list.canGo,list,index)" :style="{backgroundColor:list.overTime.substr(0,1)=='已'?'#D73C1E':'#B1B1B1'}">
                  {{list.canGo?'进入游戏':'即将开服'}}
                </div>
              </li>
              <li v-if="newServerList.length>0" class="nomore">
                {{more.second}}
              </li>
            </ul>
            <img :class="{backToTopInActive:!backToTop.second}" src="./image/back-to-top.svg" alt="回到顶部" class="backToTop" @touchend="scrollToTop('second')">
          </li>
          <li class="tab-content specialThird">
            <img class="none" v-if="false" src="./image/none.png">
            <div class="else" v-else>
              <div ref="thirdTabNavWrap" class="thirdTabNav-wrap">
                <ul class="thirdTab-navs">
                  <li v-for="(item,index) in newsListGameGroup" :key="index" class="thirdTab-nav" @click="getGroupList(item,item.gameType,item.name,null,null,index)">
                    <img class="thirdTab-nav-icon" :src="item.img|filter" :alt="item.name">
                    <div class="thirdTab-nav-title">
                      {{item.name}}
                    </div>
                    <!-- <div class="thirdTab-nav-subTitle">
                      玩法攻略
                    </div> -->
                  </li>
                </ul>
              </div>
              <div ref="thirdTab" class="thirdTabWrap">
                <ul class="third-tab">
                  <li class="third-tab-content" v-for="(item,index) in newsListInfo" @click="gotoPage(item,index)">
                    <img class="coverImg" :src="item.img|filter" :alt="item.gameName">
                    <div class="third-tab-contents">
                      <div class="third-tab-content-title">
                        {{item.mainTitle}}
                      </div>
                      <div class="third-tab-content-abstract">
                        {{item.subTitle}}
                      </div>
                      <div class="third-tab-content-stat">
                        <span class="third-tab-content-time">
                          {{item.editTime}}
                        </span>
                        <!-- <span class="third-tab-content-views">
                          <img src="" alt="" class="third-tab-content-views-eye">
                          2000
                        </span> -->
                      </div>
                    </div>
                  </li>
                  <li v-if="newsListGameGroup.length>0&&newsListInfo.length>0" class="nomore">
                    - 没有更多内容了，到底了 -
                  </li>
                </ul>
                <img :class="{backToTopInActive:!backToTop.third}" src="./image/back-to-top.svg" alt="回到顶部" class="backToTop" @touchend="scrollToTop('third')">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapGetters } from "vuex";
import { jumpToGame } from "./js/utils.js";

export default {
  data() {
    return {
      Config: {
        banner: {
          scrollY: false,
          scrollX: true,
          // bindToWrapper:true
          snap: {
            loop: true,
            // stepX: 0,
            threshold: 0.3,
            speed: 400
          },
          click: true
        },
        Tabs: {
          scrollX: true,
          scrollY: false,
          // startX: -320,
          snap: {
            loop: false,
            threshold: 0.3
            // stepX: -document.documentElement.clientWidth
          },
          probeType: 3,
          disableTouch: true
          // click: true
        },
        thirdTab: {
          scrollX: true,
          scrollY: false,
          // startX: 1200,
          snap: {
            loop: false,
            threshold: 0.3
            // stepX: document.documentElement.clientWidth
          },
          probeType: 3,
          click: true
        },
        body: {
          scrollX: false,
          scrollY: true,
          click: true,
          pullUpLoad: {
            threshold: 20
          },
          probeType: 3
          // scrollbar: true
        }
      },
      currentPageIndex: 0,
      dots: [],
      tabNames: ["热门活动", "最新开服", "攻略资讯"],
      stats: {
        banner: [
          {
            img: require("./image/banner蜀山世界.jpg"),
            url: "http://www.5idhf.com/sssj_sdk/wanfeng?external=1"
          },
          {
            img: require("./image/banner醉玲珑.jpg"),
            url: "http://zll.allrace.com/zll_sdk/wanfeng?external=1"
          }
        ],
        tab1: null,
        tab2: [
          {
            gameImg: require("./image/蜀山世界.png"),
            gameName: "蜀山世界",
            name: "今日新服",
            overTime: "今日<br>10:00开服",
            canGo: true,
            url: "http://www.5idhf.com/sssj_sdk/wanfeng?external=1"
          },
          {
            gameImg: require("./image/醉玲珑.png"),
            gameName: "醉玲珑",
            name: "今日新服",
            overTime: "今日<br>10:00开服",
            canGo: true,
            url: "http://zll.allrace.com/zll_sdk/wanfeng?external=1"
          }
        ]
      },
      translateX: "",
      width: "",
      left: "",
      leftAll: "",
      clientWidth: document.documentElement.clientWidth,
      widthArr: [],
      bannerWidth: "",
      banner: [1, 2],
      timer: "",
      interval: 4000,
      autoPlay: true,
      pageInfo: {
        tab1: null,
        tab2: {
          page: 1,
          pageSize: 10
        }
      },
      scrollEnd: false,
      children: null,
      scrollTabsPage: 0,
      backToTop: {
        first: false,
        second: false,
        third: false
      },
      more: {
        first: "",
        second: "",
        third: ""
      },
      post: {
        first: true,
        second: true
      }
    };
  },
  computed: {
    ...mapGetters([
      "newsListInfo",
      "newsListGameGroup",
      "newServerList",
      "newHotActivitiesInfo",
      "bannerList",
      "userInfo"
    ])
  },
  methods: {
    backToWap() {
      const from = this.getUrlParam("from");
      if (from.includes("#")) {
        const href = from.split("#")[0];
        switch (href) {
          case "jsWap":
            location.href = "../jsWap";
            break;
          case "wap":
            location.href = "../wap/home";
            break;
        }
      }
    },
    Switch(e, index) {
      // this.width = this.$refs.tabWidth[index].offsetWidth + "px";
      let event_id_Arr = [1202010002, 1202010003, 1202030004];
      let params = {
        event_id: event_id_Arr[index],
        event_name: this.tabNames[index]
      };
      this.checkPoint(params, this.userInfo, this);
      if (this.scrollTabs) {
        this.scrollTabs.goToPage(index, 0, 200, {
          // easeOutQuint
          swipe: {
            style: "cubic-bezier(0,0,0.58,1)",
            fn: function(t) {
              return 1 + --t * t * t * t * t;
            }
          },
          // easeOutQuard
          swipeBounce: {
            style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            fn: function(t) {
              return t * (2 - t);
            }
          },
          // easeOutQuart
          bounce: {
            style: "cubic-bezier(0.165, 0.84, 0.44, 1)",
            fn: function(t) {
              return 1 - --t * t * t * t;
            }
          }
        });
        // this.translateX = `translateX(${(index - 1) * 176}%)`;
        this.scrollTabsPage = this.scrollTabs.getCurrentPage().pageX;
      } else {
        this.scrollTabs = new BScroll(this.$refs.scrollTabs, this.Config.Tabs);
      }
    },
    initTabScroll(index, e) {
      if (!this.scrollTabs) {
        // index && (this.Config.Tabs.startX = -index * this.clientWidth);
        this.scrollTabs = new BScroll(this.$refs.scrollTabs, this.Config.Tabs);
      }
      this.scrollTabs.on("scroll", coordinate => {
        /* this.translateX = `translateX(${-(
            coordinate.x /
            document.documentElement.clientWidth *
            176
          ) - 176}%)`; */
        // this.width =
        // console.log(this.clientWidth)
        let index1 = -coordinate.x / (this.clientWidth * 2);
        // leftFirst = this.$refs.tabWidth[0].offsetLeft;
        this.left = this.leftAll * index1 + "px";
        /* if(index1<1&&index1>0.5){
            -(this.widthArr[2]-this.widthArr[0])*index1
          } */
        /* if (index1 > 0.5) {
            this.width = this.widthArr[2] + "px";
          } else {
            this.width = this.widthArr[0] + "px";
          } */
      });
      this.scrollTabs.on("scrollEnd", coordinate => {
        if (this.scrollEnd) return;
        if (-coordinate.x == this.clientWidth * 2) {
          // this.destroyTabScroll();
          if (
            this.newsListInfo.length !== 0 &&
            this.newsListGameGroup.length !== 0
          ) {
            // setTimeout(() => {
            //   /* this.$refs.thirdTab &&
            //     (this.thirdTab = new BScroll(
            //       this.$refs.thirdTab,
            //       this.Config.body
            //     )); */
            //   /* this.$refs.thirdTabNavWrap &&
            //       (this.thirdTabNavWrap = new BScroll(
            //         this.$refs.thirdTabNavWrap,
            //         this.Config.thirdTab
            //       )); */
            // }, 0);
            this.scrollEnd = false;
            return;
          } else {
            this.scrollEnd = true;
            this.$store.dispatch("GetNewsList").then(res => {
              this.$nextTick(_ => {
                this.$refs.thirdTab &&
                  (this.thirdTab = new BScroll(
                    this.$refs.thirdTab,
                    this.Config.body
                  ));
                this.thirdTab.on("scroll", position => {
                  this.position(position, this, "third");
                });
                /* this.$refs.thirdTabNavWrap &&
                    (this.thirdTabNavWrap = new BScroll(
                      this.$refs.thirdTabNavWrap,
                      this.Config.thirdTab
                    )); */
              });
              this.scrollEnd = false;
            });
          }
        } else if (-coordinate.x == this.clientWidth) {
          if (this.scrollEnd) return;
          if (this.newServerList.length !== 0 && this.secondTab) {
            return;
          } else {
            this.scrollEnd = true;
            this.$store
              .dispatch("getNewServer", { page: 1, pageSize: 10 })
              .then(res => {
                this.more.second =
                  res.length >= 10 ? "上拉加载" : "- 没有更多内容了，到底了 -";
                this.$refs.secondTab &&
                  (this.secondTab = new BScroll(
                    this.$refs.secondTab,
                    this.Config.body
                  ));
                this.secondTab.on("pullingUp", async _ => {
                  if (this.post.second) {
                    this.more.second = "加载中...";
                    this.post.second = false;
                    // if(this.secondTab.maxScrollY<=this.secondTab.absStartY)
                    await this.$store.dispatch("getNewServer").then(
                      res => {
                        this.post.second = res.length >= 10 ? true : false;
                        this.more.second =
                          res.length >= 10
                            ? "上拉加载"
                            : "- 没有更多内容了，到底了 -";
                        this.secondTab.refresh();
                      },
                      rej => {
                        this.more.second = "- 没有更多内容了，到底了 -";
                        /* this.$toast.show({
                          message: "没有更多内容"
                        }); */
                      }
                    );
                    this.secondTab.finishPullUp();
                  }
                });
                this.secondTab.on("scroll", position => {
                  this.position(position, this, "second");
                });
                this.scrollEnd = false;
              });
          }
        }
      });
      // debugger
      if (index) {
        this.scrollTabs.goToPage(index, 0, 0);
      }
      // this.left = index / 2 * this.leftAll + "px";

      if (this.scrollTabs.enabled) {
        return;
      } else {
        this.scrollTabs.enable();
      }
      /* if (index)
        this.Config.Tabs.startX = -index * document.documentElement.clientWidth; */
    },
    destroyTabScroll() {
      if (this.scrollTabs.enable) this.scrollTabs.disable();
    },
    _setSlideWidth(isResize) {
      this.children = this.$refs.slideGroup.children;
      let width = 0;
      let slideWidth = this.$refs.scrollBanner.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        child.style.width = slideWidth + "px";
        width += slideWidth;
      }
      if (this.Config.banner.snap.loop && !isResize) {
        width += 2 * slideWidth;
      }
      this.$refs.slideGroup.style.width = width + "px";
    },
    _play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.scrollBanner.next();
      }, this.interval);
    },
    _initBanner() {
      this.scrollBanner = new BScroll(
        this.$refs.scrollBanner,
        this.Config.banner
      );
      this.scrollBanner.on("scrollEnd", this._onScrollEnd);
      this.scrollBanner.on("touchEnd", () => {
        if (this.autoPlay) {
          this._play();
        }
      });
      this.scrollBanner.on("beforeScrollStart", () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    _onScrollEnd() {
      let pageIndex = this.scrollBanner.getCurrentPage().pageX;
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        this._play();
      }
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    trimStr(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    //获取地址栏问号后面的参数值
    getUrlParam: function(ename) {
      var url = window.location.href;
      var Request = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.split("?")[1];
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          Request[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      } else {
        return "";
      }
      return Request[ename];
    },
    // 最新开服跳转游戏
    goToGame(booleans, item, index) {
      if (booleans) {
        let params = {
          target_project_id: item.gameType,
          offline_time: Number(item.accuOverTime),
          event_name: "最新开服-进入游戏",
          event_id: 1202030001,
          room_level: index + 1
        };
        this.checkPoint(params, this.userInfo, this);
        // jumpToGame(item);
      } else {
        return;
      }
    },
    //轮播图跳转游戏
    staticgoToGame(item, index) {
      let params = {
        // awards_id:item.id,
        target_project_id: item.gameType,
        awards_name: item.name,
        event_id: 1202010001,
        event_name: "首页轮播图",
        room_level: index + 1
      };
      this.checkPoint(params, this.userInfo, this);
      try {
        jumpToGame(item);
      } catch (error) {}
    },
    // 资讯列表获取分类信息，跳转分类页面
    getGroupList(
      item,
      gameType,
      gameName,
      pageInfo = { page: 1, pageSize: 10 },
      firstClick = true,
      index
    ) {
      /* let loading = this.$loading({
        target: this.$refs.thirdTab,
        text: "拼命加载中"
      }); */
      let params = {
        target_project_id: gameType,
        awards_id: item.id,
        event_name: "游戏选择",
        event_id: 1202040001,
        room_level: index + 1
      };
      this.checkPoint(params, this.userInfo, this);
      this.$router.push({ name: "gameNews", params: { gameType, gameName } });
    },
    // 跳转资讯详情
    gotoPage(item, index) {
      let params = {
        awards_id: item.id,
        awards_name: item.mainTitle,
        target_project_id: item.gameType,
        event_id: 1202040002,
        event_name: "资讯详情",
        room_level: index + 1
      };
      this.checkPoint(params, this.userInfo, this);
      this.$router.push({
        name: "gameNewsDetails",
        params: { id: item.id, item, fromWhichList: -1 }
      });
    },
    gotoActivity(item, e, index) {
      // if (item.underStatus == "underWay") {
      /* if (url && url.indexOf("external=1") != -1) {
          let _url =
            this.trimStr(url) +
            "&channel=" +
            localStorage.getItem("APP_CHANNEL") +
            "&token=" +
            localStorage.getItem("ACCESS_TOKEN") +
            "&gurl=" +
            url.split("?")[0] +
            "&pf=" +
            this.getUrlParam("from");

          window.location.href = _url;
          return;
        } */
      let params = {
        awards_id: item.id,
        awards_name: item.title,
        game_phase: item.activityStartTime + "-" + item.activityEndTime,
        event_id: 1202020001,
        event_name: "活动点击",
        room_level: index + 1,
        target_project_id: item.gameType
      };
      this.checkPoint(params, this.userInfo, this);
      this.$router.push({
        name: "activityDetails",
        params: {
          item,
          id: item.id
        }
      });
      // }
    },
    scrollToTop(page) {
      this[`${page}Tab`].scrollTo(0, 0, 300);
    },
    position(position, vm, page) {
      // debugger
      if (position.y < 0) {
        vm.backToTop[page] = true;
      } else if (position.y >= 0) {
        vm.backToTop[page] = false;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // vm.$nextTick(_ => {
      !vm.scrollTabs && vm.initTabScroll(to.params.tab);
      // vm.scrollTabs &&vm.scrollTabs.goToPage(2,0,500)
      vm.$store.dispatch("GetNewsList").then(res => {
        vm.$nextTick(_ => {
          vm.$refs.thirdTab &&
            (vm.thirdTab = new BScroll(vm.$refs.thirdTab, vm.Config.body));
          vm.thirdTab.on("scroll", position => {
            vm.position(position, vm, "third");
          });
          /* vm.$refs.thirdTabNavWrap &&
                    (vm.thirdTabNavWrap = new BScroll(
                      vm.$refs.thirdTabNavWrap,
                      vm.Config.thirdTab
                    )); */
        });
        vm.scrollEnd = false;
      });
      // });
    });
  },
  beforeCreate() {
    this.$store
      .dispatch("getNewActivitiesInfo", { page: 1, pageSize: 10 })
      .then(
        _ => {
          this.more.first =
            _.length >= 10 ? "上拉加载" : "- 没有更多内容了，到底了 -";
          // setTimeout(() => {
          this.$refs.firstTab &&
            (this.firstTab = new BScroll(
              this.$refs.firstTab,
              this.Config.body
            ));
          this.firstTab.on("pullingUp", async _ => {
            if (this.post.first) {
              this.post.first = false;
              this.more.first = "加载中...";
              await this.$store.dispatch("getNewActivitiesInfo").then(
                res => {
                  this.post.first = res.length >= 10 ? true : false;
                  this.more.first =
                    res.length >= 10
                      ? "上拉加载"
                      : "- 没有更多内容了，到底了 -";
                  this.firstTab.refresh();
                },
                rej => {
                  this.more.first = "- 没有更多内容了，到底了 -";
                  /* this.$toast.show({
                    message: "没有更多活动内容"
                  }); */
                }
              );
              this.firstTab.finishPullUp();
            }
          });
          this.firstTab.on("scroll", position => {
            this.position(position, this, "first");
          });
          // }, 0);
          /* this.$nextTick(()=>{
        this.$refs.firstTab &&
        (this.firstTab = new BScroll(this.$refs.firstTab, this.Config.body));
      }) */
        },
        rej => {
          /* this.$toast.show({
            message: "没有更多活动内容"
          }); */
        }
      );
    this.$store.dispatch("getBannerList").then(_ => {
      this._setSlideWidth();
      this._initDots();
      this._initBanner();
      this._play();
    });
  },
  mounted() {
    this.$nextTick(() => {
      !this.scrollTabs && this.initTabScroll();
      // this.width = this.$refs.tabWidth[0].offsetWidth + "px";
      // this.left = this.$refs.tabWidth[0].offsetLeft + "px";
      let leftArr = [];
      for (let i in this.$refs.tabWidth) {
        leftArr.push(this.$refs.tabWidth[i].offsetLeft);
        this.widthArr.push(this.$refs.tabWidth[i].offsetWidth);
      }
      this.leftAll = leftArr[leftArr.length - 1] - leftArr[0];
      // this.bannerWidth=100*this.banner.length+'%';
    });
  }
};
</script>

<style lang="less" scoped>
@import "./css/App.less";
</style>
