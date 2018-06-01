<template>
  <div class="container">
    <!-- <slider>
        <div v-for="item in 5" >
            <div>
                <img src="./image/图层 3@2x.png" alt="">
            </div>
        </div>
    </slider> -->
    <div ref="scrollBanner" class="banner">
      <ul ref="slideGroup" class="scroll-banner" :style="{width:bannerWidth}">
        <li class="scroll-list" v-for="item in stats.banner" @click="staticgoToGame(item)">
          <img :src="item.img" alt="">
        </li>
      </ul>
    </div>
    <div class="body">
      <ul class="navs">
        <li ref="tabWidth" @touchstart="Switch($event,index)" class="nav" v-for="(tabName,index) in tabNames">
          {{tabName}}
        </li>
        <div class="tab-slider" :style="{width,left}"></div>
      </ul>
      <div ref="scrollTabs" class="tabs">
        <ul class="tabs-content">
          <li ref="firstTab" class="tab-content">
            <img class="none" v-if="true" src="./image/none.png" alt="">
            <ul v-else class="first-tab">
              <li class="first-tab-content" v-for="list in 13">
                <img class="bigImg" src="./image/圆角矩形 1@2x.png" alt="">
                <div class="left-content">
                  <p class="content-title">
                    梦想桌球6月赢话费活动
                  </p>
                  <p class="content-time">
                    活动时间：2018/05/26-2018/06/15
                  </p>
                </div>
                <div class="right-btn">
                  进行中
                </div>
              </li>
              <li class="nomore">
                - 没有更多内容了，到底了 -
              </li>
            </ul>
          </li>
          <li ref="secondTab" class="tab-content">
            <img class="none" v-if="false" src="./image/none.png" alt="">
            <ul v-else class="second-tab">
              <li class="second-tab-content" v-for="list in stats.tab2">
                <img class="midImg" :src="list.gameImg" alt="">
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
                      {{list.name}}{{list.partition}}
                    </div>
                  </div>
                  <div class="mid-content2" :style="{color:list.overTime.substr(0,1)=='已'?'#A4A4A4':'#D73C1E'}" v-html="list.overTime">

                  </div>
                </div>
                <div class="right-btn" @click="goToGame(list.canGo,list)" :style="{backgroundColor:list.overTime.substr(0,1)!=='已'?'#D73C1E':'#B1B1B1'}">
                  {{list.canGo?'进入游戏':'即将开服'}}
                </div>
              </li>
              <li class="nomore">
                - 没有更多内容了，到底了 -
              </li>
            </ul>
          </li>
          <li class="tab-content specialThird">
            <img class="none" v-if="true" src="./image/none.png" alt="">
            <div v-else>
              <div ref="thirdTabNavWrap" class="thirdTabNav-wrap" @touchstart="destroyTabScroll">
                <ul class="thirdTab-navs">
                  <li v-for="i in 10" class="thirdTab-nav">
                    <img class="thirdTab-nav-icon" src="./image/椭圆 3@2x.png">
                    <div class="thirdTab-nav-title">
                      去玩斗地主
                    </div>
                    <div class="thirdTab-nav-subTitle">
                      玩法攻略
                    </div>
                  </li>
                </ul>
              </div>
              <div @touchstart="initTabScroll(2)" ref="thirdTab" class="thirdTabWrap">
                <ul class="third-tab">
                  <li class="third-tab-content" v-for="list in 16">
                    <img class="coverImg" src="./image/矩形 4@2x.png" alt="">
                    <div class="third-tab-contents">
                      <div class="third-tab-content-title">
                        《欢乐斗地主》6月返利活动 多投多得投资1万得10万
                      </div>
                      <div class="third-tab-content-stat">
                        <span class="third-tab-content-time">
                          14分钟前
                        </span>
                        <span class="third-tab-content-views">
                          <img src="" alt="" class="third-tab-content-views-eye">
                          2000
                        </span>
                      </div>
                    </div>
                  </li>
                  <li class="nomore">
                    - 没有更多内容了，到底了 -
                  </li>
                </ul>
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
import API from "./js/api.js";
import moment from "moment";
moment.locale("zh-cn");

export default {
  name: "app",
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
          }
        },
        Tabs: {
          scrollX: true,
          scrollY: false,
          // startX: 200,
          snap: {
            loop: false,
            threshold: 0.3
            // stepX: document.documentElement.clientWidth
          },
          probeType: 3
        },
        body: {
          scrollX: false,
          scrollY: true
          // scrollbar: true
        }
      },
      tabNames: ["热门活动", "最新开服", "资讯"],
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
      currentTime: new Date().getTime(),
      currentDate: new Date().getDate()
    };
  },
  methods: {
    Switch(e, index) {
      // this.width = this.$refs.tabWidth[index].offsetWidth + "px";
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
      } else {
        this.scrollTabs = new BScroll(this.$refs.scrollTabs, this.Config.Tabs);
      }
    },
    initTabScroll(index) {
      if (!this.scrollTabs) {
        this.scrollTabs = new BScroll(this.$refs.scrollTabs, this.Config.Tabs);
        this.scrollTabs.on("scroll", coordinate => {
          /* this.translateX = `translateX(${-(
            coordinate.x /
            document.documentElement.clientWidth *
            176
          ) - 176}%)`; */
          // this.width =
          // console.log(this.clientWidth)
          let index1 = -coordinate.x / (this.clientWidth * 2);
          this.left = this.leftAll * index1 + 40 + "px";
          /* if(index1<1&&index1>0.5){
            -(this.widthArr[2]-this.widthArr[0])*index1
          } */
          if (index1 > 0.5) {
            this.width = this.widthArr[2] + "px";
          } else {
            this.width = this.widthArr[0] + "px";
          }
        });
        return;
      }
      if (this.scrollTabs.enabled) {
        return;
      } else {
        this.scrollTabs.enable();
      }
      if (index)
        this.Config.Tabs.startX = -index * document.documentElement.clientWidth;
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
    goToGame(booleans, item) {
      console.log(booleans,'sss');
      if (booleans) {
        console.log(booleans,'1 11');
        if (item && item.url.indexOf("external=1") != -1) {
          console.log(booleans,'222');
          let url =
            this.trimStr(item.url) +
            "&channel=" +
            localStorage.getItem("APP_CHANNEL") +
            "&token=" +
            localStorage.getItem("ACCESS_TOKEN") +
            "&gurl=" +
            item.url.split("?")[0] +
            "&pf=" +
            this.getUrlParam("from");

          window.location.href = url;
          return;
        }
      }
    },
    staticgoToGame(item) {
      let url =
        item.url +
        "&channel=" +
        localStorage.getItem("APP_CHANNEL") +
        "&token=" +
        localStorage.getItem("ACCESS_TOKEN") +
        "&gurl=" +
        item.url.split("?")[0] +
        "&pf=" +
        this.getUrlParam("from");
      console.log(url);
      // window.location.href = url;
    },
    getNewServer() {
      this.axios
        .post(API.newServer, /* qs.stringify */ this.pageInfo.tab2)
        .then(res => {
          /* let res={}
          res.data={}
          res.data.data = [
            {
              createTime: "2018-05-29 11:49:41",
              deleteFlag: 0,
              enable: 1,
              endTime: "2018-06-07 11:49:37",
              gameId: 3,
              gameImg: "/group1/M00/00/4F/CiFVy1sNF7KAfZ_4AAEpSTQrppo036.png",
              gameName: "消消乐",
              id: 3,
              name: "33",
              openTime: "2018-06-01 23:39:35",
              operationUsername: "admin",
              partition: "游戏2分区-22",
              redisField: null,
              startTime: "2018-05-29 11:49:36",
              top: 0,
              updateTime: "2018-06-01 17:11:20",
              url: "/crush/"
            }
          ]; */
          for (let i in res.data.data) {
            let overTime, openDate;
            overTime =
              (new Date(res.data.data[i].openTime).getTime() -
                this.currentTime) /
              1000 /
              60 /
              60;
            openDate = new Date(res.data.data[i].openTime).getDate();
            res.data.data[i].canGo = false;
            if (openDate == this.currentDate) {
              if (overTime < 0) {
                res.data.data[i].overTime =
                  "已开服" + Math.ceil(Math.abs(overTime)) + "小时";
                res.data.data[i].canGo = true;
              } else {
                res.data.data[i].overTime =
                  "今日" +
                  moment(res.data.data[i].openTime).format("ah:mm") +
                  "<br>" +
                  "开服";
              }
            } else if (openDate == this.currentDate + 1) {
              res.data.data[i].overTime =
                "明日" +
                moment(res.data.data[i].openTime).format("ah:mm") +
                "<br>" +
                "开服";
            } else if (openDate > this.currentDate + 1) {
              res.data.data[i].overTime =
                moment(res.data.data[i].openTime).format("MMMDoah:mm") +
                "<br>" +
                "开服";
            }
          }
          this.stats.tab2 = this.stats.tab2.concat(res.data.data);
        });
    }
  },
  created() {
    // this.getNewServer();
  },
  mounted() {
    this.$nextTick(() => {
      this.initTabScroll();
      this.$refs.firstTab &&
        (this.firstTab = new BScroll(this.$refs.firstTab, this.Config.body));
      this.$refs.secondTab &&
        (this.secondTab = new BScroll(this.$refs.secondTab, this.Config.body));
      this.$refs.thirdTab &&
        (this.thirdTab = new BScroll(this.$refs.thirdTab, this.Config.body));
      this.$refs.thirdTabNavWrap &&
        (this.thirdTabNavWrap = new BScroll(
          this.$refs.thirdTabNavWrap,
          this.Config.Tabs
        ));
      this.width = this.$refs.tabWidth[0].offsetWidth + "px";
      this.left = this.$refs.tabWidth[0].offsetLeft + "px";
      let leftArr = [];
      for (let i in this.$refs.tabWidth) {
        leftArr.push(this.$refs.tabWidth[i].offsetLeft);
        this.widthArr.push(this.$refs.tabWidth[i].offsetWidth);
      }
      this.leftAll = leftArr[leftArr.length - 1] - leftArr[0];
      this._setSlideWidth();
      this._initBanner();
      this._play();
      // this.bannerWidth=100*this.banner.length+'%';
    });
  }
};
</script>

<style lang="less" scoped>
@import "./css/App.less";
</style>
