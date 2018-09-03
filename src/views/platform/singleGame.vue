<template>
  <div class="container">
    <div class="header">
      <img src="./image/Back.svg" alt="back" @click="back" class="back">
      <span>《{{singleGameName}}》攻略资讯列表</span>
    </div>
    <div ref="scroll" class="body">
      <ul class="third-tab">
        <li class="third-tab-content" v-for="(item,index) in singleGameList" @click="gotoPage(item.id,item.gameType,item,index)">
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
        <li v-if="singleGameList" class="nomore">
          {{more}}
        </li>
      </ul>
      <img :class="{backToTopInActive:!backToTop}" src="./image/back-to-top.svg" alt="回到顶部" class="backToTop" @touchend="scrollToTop">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      Config: {
        body: {
          scrollX: false,
          scrollY: true,
          click: true,
          pullUpLoad: {
            threshold: 20
          }
        },
        preventDefault: false
      },
      backToTop: false,
      more: "",
      post: true
    };
  },
  methods: {
    ...mapActions(["GetGroupList"]),
    // 跳转资讯详情
    gotoPage(id, gameType, item, index) {
      let params = {
        awards_name: item.mainTitle,
        target_project_id: item.gameType,
        event_id: 1202040002,
        event_name: "资讯详情",
        room_level: index + 1
      };
      this.checkPoint(params, this.userInfo, this);
      this.$router.push({
        name: "gameNewsDetails",
        params: { id, fromWhichList: gameType }
      });
    },
    back() {
      let params = {
        event_id: 1202000002,
        event_name: "返回页面",
        target_project_id: this.$route.params.gameType
      };
      this.checkPoint(params, this.userInfo, this);
      if (this.$router) {
        this.$router.push({ name: "app", params: { tab: 2 } });
      } else {
        window.location.href = "/activities/platform.html";
        // history.go(0)
      }
    },
    scrollToTop() {
      this.scroll.scrollTo(0, 0, 300);
    }
  },
  computed: {
    ...mapGetters(["singleGameList", "singleGameName", "userInfo"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.post = true;
      // vm.GetGroupList({ gameType: vm.$route.params.gameType });
      vm.$store
        .dispatch("GetGroupList", {
          gameType: vm.$route.params.gameType,
          pageInfo: { page: 1, pageSize: 10 },
          gameName: vm.$route.params.gameName
        })
        .then(
          a => {
            vm.more =
              a.length >= 10 ? "上拉加载" : "- 没有更多内容了，到底了 -";
            // vm.post = a.length >= 10 ? true : false;
            vm.scroll =
              vm.$refs.scroll && new BScroll(vm.$refs.scroll, vm.Config.body);
            vm.scroll.on("pullingUp", async _ => {
              if (vm.post) {
                vm.more = "加载中...";
                vm.post = false;
                await vm.$store
                  .dispatch("GetGroupList", {
                    gameType: vm.$route.params.gameType,
                    gameName: vm.$route.params.gameName
                  })
                  .then(
                    a => {
                      vm.post = a.length >= 10 ? true : false;
                      vm.more =
                        a.length >= 10
                          ? "上拉加载"
                          : "- 没有更多内容了，到底了 -";
                      vm.scroll.refresh();
                    },
                    rej => {
                      vm.more = "- 没有更多内容了，到底了 -";
                      /* vm.$toast.show({
                        message: "没有更多内容啦"
                      }); */
                    }
                  );
              }
              vm.scroll.finishPullUp();
            });
            vm.scroll.on("scroll", position => {
              if (position.y < 0) {
                vm.backToTop = true;
              } else if (position.y >= 0) {
                vm.backToTop = false;
              }
            });
          },
          rej => {
            vm.more = '- 没有更多内容了，到底了 -'
            /* vm.$toast.show({
              message: "没有更多内容啦"
            }); */
          }
        );
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.gameType) {
      this.$store
        .dispatch("GetGroupList", {
          gameType: to.params.gameType,
          pageInfo: { page: 1, pageSize: 10 },
          gameName: from.params.gameName
        })
        .then(res => {
          {
            this.more =
              res.length >= 10 ? "上拉加载" : "- 没有更多内容了，到底了 -";
            this.scroll =
              this.$refs.scroll &&
              new BScroll(this.$refs.scroll, this.Config.body);
            this.scroll.on("pullingUp", async _ => {
              this.more = "加载中...";
              await this.$store
                .dispatch("GetGroupList", {
                  gameType: this.$route.params.gameType,
                  gameName: this.$route.params.gameName
                })
                .then(
                  a => {
                    this.more =
                      a.length >= 10
                        ? "上拉加载"
                        : "- 没有更多内容了，到底了 -";
                    this.scroll.refresh();
                  },
                  rej => {
                    this.more = "- 没有更多内容了，到底了 -";
                    /*  this.$toast.show({
                      message: "没有更多内容啦"
                    }); */
                  }
                );
              this.scroll.finishPullUp();
            });
            this.scroll.on("scroll", position => {
              if (position.y < 0) {
                this.backToTop = true;
              } else if (position.y >= 0) {
                this.backToTop = false;
              }
            });
          }
        })
        .catch(rej => {
          /* this.$toast.show({
            message: "没有更多内容啦"
          }); */
        });
    }
    next();
  }
};
</script>

<style scoped lang="less">
.container {
  position: absolute;
  height: 100%;
  // padding-top: 0.88rem;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    height: 0.88rem;
    width: 100%;
    background-color: #d73c1e;
    color: #fff;
    font-size: 0.3rem;
    line-height: 0.88rem;
    text-align: center;
    z-index: 10;
    .back {
      position: absolute;
      left: 0.12rem;
      top: 0.22rem;
      height: 0.44rem;
      vertical-align: middle;
      display: inline-block;
    }
    span {
      text-align: center;
    }
  }
  .body {
    // overflow: hidden;
    // height: 100%;
    position: absolute;
    width: 100%;
    top: 0.88rem;
    bottom: 0;
    left: 0;
    .third-tab {
      width: 100%;
      .third-tab-content {
        width: 100%;
        height: 2.05rem;
        padding: 0.32rem 0.28rem 0.31rem 0.3rem;
        position: relative;
        display: flex;
        box-sizing: border-box;
        &::after {
          content: "";
          pointer-events: none;
          /* 防止点击触发 */
          box-sizing: border-box;
          position: absolute;
          width: 200%;
          height: 200%;
          left: 0;
          top: 0;
          border-bottom: 1px solid #e5e5e5;
          transform: scale(0.5);
          transform-origin: 0 0;
        }
        .coverImg {
          font-size: 0.2rem;
          width: 1.92rem;
          // height: 1.74rem;
        }
        .third-tab-contents {
          display: inline-block;
          margin-left: 0.21rem;
          color: #3c3c3c;
          width: 100%;
          position: relative;
          .third-tab-content-title {
            font-size: 0.3rem;
            line-height: 0.4rem;
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .third-tab-content-abstract {
            // width: 4.49rem;
            overflow: hidden;
            color: #a4a4a4;
            font-size: 0.24rem;
            line-height: 0.34rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .third-tab-content-stat {
            position: absolute;
            bottom: 0;
            color: #666;
            width: 100%;
            font-size: 0.2rem;
            display: flex;
            justify-content: space-between;
            .third-tab-content-time {
            }
            .third-tab-content-views {
              .third-tab-content-views-eye {
                width: 0.32rem;
                height: 0.18rem;
              }
            }
          }
        }
      }
    }
  }
}
.nomore {
  color: #a3a3a3;
  font-size: 0.26rem;
  text-align: center;
  margin-top: 0.31rem;
  margin-bottom: 0.42rem;
}
.backToTop {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  transition: all 0.5s ease;
}
.backToTopInActive {
  bottom: -1rem;
}
</style>
