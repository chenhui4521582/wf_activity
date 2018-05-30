<template>
  <div class="container">
    <div ref="scrollBanner" class="banner">
      <ul class="scroll-banner">
        <li class="scroll-list" v-for="i in 1">
          <img src="./image/图层 3@2x.png" alt="">
        </li>
      </ul>
    </div>
    <div class="body">
      <ul class="navs">
        <li @touchstart="Switch($event,index)" class="nav" v-for="(nav,index) in 3">
          热门活动
        </li>
        <div class="tab-slider" :style="{transform:translateX}">

        </div>
      </ul>
      <div ref="scrollTabs" class="tabs">
        <ul class="tabs-content">
          <li ref="firstTab" class="tab-content">
            <ul class="first-tab">
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
            <ul class="second-tab">
              <li class="second-tab-content" v-for="list in 16">
                <img class="midImg" src="./image/圆角矩形 3@2x.png" alt="">
                <div class="mid-content">
                  <div class="mid-content1">
                    <div class="mid-content1-top">
                      <span class="mid-content1-top-title">
                        超级玛丽
                      </span>
                      <span class="mid-content1-top-tips">
                        开发
                      </span>
                    </div>
                    <div class="mid-content1-bottom">
                      200服-海水难量
                    </div>
                  </div>
                  <div class="mid-content2">
                    3月20日<br>09：00开服
                  </div>
                </div>
                <div class="right-btn">
                  暂待进入
                </div>
              </li>
              <li class="nomore">
                - 没有更多内容了，到底了 -
              </li>
            </ul>
          </li>
          <li ref="thirdTab" class="tab-content">
            <div ref="thirdTabNavWrap" class="thirdTabNav-wrap">
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
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "app",
  data() {
    return {
      Config: {
        banner: {
          scrollY: false,
          scrollX: true
          // bindToWrapper:true
          /* snap: {
            loop: true,
            stepX: 200,
            stepY: 100,
            threshold: 0.3,
            speed: 400
          } */
        },
        Tabs: {
          scrollX: true,
          scrollY: false
        },
        body: {
          scrollX: false,
          scrollY: true,
          scrollbar: true
        }
      },
      tab: 0,
      translateX: ""
    };
  },
  methods: {
    Switch(a, b) {
      this.tab = b;
      this.translateX = `translateX(${(b - 1) * 192}%)`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollBanner = new BScroll(
        this.$refs.scrollBanner,
        this.Config.banner
      );
      this.scrollTabs = new BScroll(this.$refs.scrollTabs, this.Config.Tabs);
      this.firstTab = new BScroll(this.$refs.firstTab, this.Config.body);
      this.secondTab = new BScroll(this.$refs.secondTab, this.Config.body);
      this.thirdTabNavWrap = new BScroll(
        this.$refs.thirdTabNavWrap,
        this.Config.Tabs
      );
    });
  }
};
</script>

<style lang="less" scoped>
@import "./css/App.less";
</style>
