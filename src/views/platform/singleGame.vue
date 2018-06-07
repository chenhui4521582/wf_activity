<template>
  <div class="container">
    <div class="header">
      <img src="./image/Back.svg" alt="back" @click="back" class="back">
      <span>《{{singleGameName}}》攻略资讯列表</span>
    </div>
    <div ref="scroll" class="body">
      <ul class="third-tab">
        <li class="third-tab-content" v-for="item in singleGameList" @click="gotoPage(item.id,item.gameId)">
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
          - 没有更多内容了，到底了 -
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
            threshold: 200
          }
        },preventDefault:false
      },
      backToTop: false
    };
  },
  methods: {
    ...mapActions(["GetGroupList"]),
    // 跳转资讯详情
    gotoPage(id, gameId) {
      this.$router.push({
        name: "gameNewsDetails",
        params: { id, fromWhichList: gameId }
      });
    },
    back() {
      if (this.$router) {
        this.$router.push({ name: "app", params: { tab: 2 } });
      } else {
        window.location = "/platform.html";
      }
    },
    scrollToTop() {
      console.log(1)
      this.scroll.scrollTo(0, 0, 300);
    }
  },
  computed: {
    ...mapGetters(["singleGameList", "singleGameName"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // vm.GetGroupList({ gameId: vm.$route.params.gameId });
      vm.$store
        .dispatch("GetGroupList", {
          gameId: vm.$route.params.gameId,
          pageInfo: { page: 1, pageSize: 10 },
          gameName: vm.$route.params.gameName
        })
        .then(
          a => {
            vm.scroll =
              vm.$refs.scroll && new BScroll(vm.$refs.scroll, vm.Config.body);
            vm.scroll.on("pullingUp", _ => {
              vm.$store
                .dispatch("GetGroupList", {
                  gameId: vm.$route.params.gameId,
                  gameName: vm.$route.params.gameName
                })
                .then(
                  a => {
                    vm.scroll.refresh();
                    vm.scroll.finishPullUp();
                  },
                  rej => {
                    vm.$toast.show({
                      message: "没有更多内容啦"
                    });
                  }
                );
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
            vm.$toast.show({
              message: "没有更多内容啦"
            });
          }
        );
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.gameId) {
      this.$store
        .dispatch("GetGroupList", {
          gameId: to.params.gameId,
          pageInfo: { page: 1, pageSize: 10 },
          gameName: from.params.gameName
        })
        .catch(rej => {
          this.$toast.show({
            message: "没有更多内容啦"
          });
        });
    }
    next();
  }
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  height: 100%;
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
    overflow: hidden;
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
