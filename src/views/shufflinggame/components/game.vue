<template>
  <section class="rule" :style="{zIndex:isShowPop?3:2}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <!-- <div class="title">大家都在玩</div> -->
          <div class="title">
            <img src="../images/games/game-title.png" alt="">
          </div>
          <!-- <div class="main" style="background: #750503;border-radius:0px 0px .16rem .16rem;padding:.2rem;color:#fff"> -->
          <div class="main">
            <div class="gamelist">
              <img
                :src="require(`../images/games/${index}.png`)"
                alt
                v-for="(item,index) in games"
                class="game"
                @click="gotogame(item)"
              />
            </div>
            <div class="gogames" @click="gotoindex">更多游戏>></div>
          </div>
          <div
            class="info"
            style="font-size: .2rem;color: #FAD366;font-weight: bold;line-height: .3rem;text-align: center;padding: 0 .5rem"
          >部分游戏支持金叶不计入活动，详见规则</div>
        </div>
        <div class="close-icon" @click="isShowPop = false"></div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "rule",
  data() {
    return {
      isShowPop: false,
      games: [
        {
          id: 12,
          url: "/crush"
        },
        {
          id: 18,
          url: "/square"
        },
        {
          id: 2,
          url: "/billiards"
        },
        {
          id: 10,
          url: "/fish"
        },
        {
          id: 13,
          url: "/kingdom2"
        },
        {
          id: 21,
          url: "/Marbles"
        }
      ]
    };
  },
  methods: {
    showPop() {
      this.isShowPop = true;
    },
    gotogame({ url, id }) {
      GLOBALS.marchSetsPoint("A_H5PT0156002613", {
        task_id: id,
        task_name: url
      });
      GLOBALS.jumpOutsideGame(url);
    },
    gotoindex() {
      GLOBALS.marchSetsPoint("A_H5PT0156002614");
      location.href = window.linkUrl.getBackUrl(
        localStorage.getItem("APP_CHANNEL")
      );
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.rule {
  position: fixed;
  top: 0;
  left: 50%;
  // margin-left: -2.86 * 1.125rem;
  margin-left: -3.55rem;
  img:not(.game) {
    width: 0.84rem;
    height: 0.84rem;
    position: fixed;
    right: 0;
    top: 0.36rem;
  }

  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
  }
  .pop {
    position: relative;
    z-index: 10;
    .wrap {
      // width: 5.72 * 1.125rem;
      height: 8.68 * 1.125rem;
      width: 7.1rem;
      background: url("../images/pop/rule/bg.png") no-repeat center center /
        100% 100%;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 1.15 * 1.125rem 0.75rem 0.6rem 1rem;
      .title {
        // font-size: 0.54rem;
        // height: 1 * 1.125rem;
        // line-height: 1 * 1.125rem;
        // text-align: center;
        // font-weight: 400;
        // color: rgba(255, 230, 173, 1);
        // background: linear-gradient(
        //   0deg,
        //   rgba(254, 222, 87, 1) 0%,
        //   rgba(254, 252, 201, 1) 100%
        // );
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        position: absolute;
    width: 3.24rem;
    height: 0.76rem;
    top: 1.9rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    img{
         width: 3.24rem;
    height: 0.76rem;
    position: static;
    }
      }
      .main {
        // font-size: 0.2rem;
        // // background: #750503;
        // border-radius: 0px 0px .16rem .16rem;
        // padding: .2rem;
        // color: #fff;
        font-size: 0.2rem;
        /* background: #750503; */
        border-radius: 0px 0px 0.16rem 0.16rem;
        padding: 0.2rem;
        color: #fff;
        width: 75%;
        margin: 0rem auto;
        padding-right: 0.45rem;
        padding-top: 1.9rem;
        .text {
          display: flex;
          i {
            margin-top: 0.1rem;
            display: inline-block;
            width: 0.1rem;
            height: 0.1rem;
            background: rgba(236, 110, 71, 1);
            border-radius: 50%;
            margin-right: 0.18rem;
          }
          span {
            max-width: 4.2rem;
          }
          line-height: 0.3rem;
        }
        .gamelist {
          display: flex;
          flex-wrap: wrap;
          height: 4.2rem;
          justify-content: space-between;
          margin-top: 0.4rem;
          .game {
            width: 1.24rem;
            height: 1.69rem;
          }
        }
        .gogames {
          font-size: 0.3rem;
          color: #fdf35e;
          text-align: right;
          font-weight: bold;
          text-align: center;
          padding-bottom: 0.1rem;
        }
      }
    }
    .close-icon {
      width: 0.6rem;
      height: 0.6rem;
      background: url("../pages/images/common/close.png") no-repeat center
        center / 100% 100%;
      margin: 0 auto;
    }
  }
  .scalc-enter-active {
    animation: fadeAnimation 0.3s ease-in-out;
  }
  @keyframes fadeAnimation {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
