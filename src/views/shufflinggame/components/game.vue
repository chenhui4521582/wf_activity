<template>
  <section class="rule" :style="{zIndex:isShowPop?3:2}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="title">大家都在玩</div>
          <div class="main" style="background: #750503;border-radius:0px 0px .16rem .16rem;padding:.2rem;color:#fff">
            <div class="gamelist">
              <img :src="require(`../images/games/${index}.png`)" alt="" v-for="(item,index) in games" class="game"
                   @click="gotogame(item)">
            </div>
            <div class="gogames" @click="gotoindex">更多游戏>></div>
          </div>
          <div class="info" style="font-size: .2rem;color: #FAD366;font-weight: bold;margin-top: .5rem;line-height: .3rem;text-align: center;padding: 0 .2rem">小贴士：在斗地主、麻将、跑得快、枪火英雄、套圈中消耗金叶不计入任务中</div>
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
        games: [{
          id: 12,
          url: '/crush'
        }, {
          id: 18, url: '/square'
        }, {
          id: 2, url: '/billiards'
        }, {
          id: 10, url: '/fish'
        }, {
          id: 13, url: '/kingdom2'
        }, {
          id: 21, url: '/Marbles'
        }]
      };
    },
    methods: {
      showPop() {
        this.isShowPop = true
      },
      gotogame({url, id}) {
        GLOBALS.marchSetsPoint('A_H5PT0211002235', {target_project_id: id})
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex(){
        location.href= window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .rule {
    position: fixed;
    top: 0;
    left: 50%;
    margin-left: -2.86*1.125rem;
    img:not(.game) {
      width: 0.84rem;
      height: 0.84rem;
      position: fixed;
      right: 0;
      top: .36rem;
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
        width: 5.72*1.125rem;
        height: 8.68*1.125rem;
        background: url("../images/pop/rule/bg.png") no-repeat center center /
        100% 100%;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 1.15*1.125rem .75rem .6rem 1rem;
        .title {
          font-size: 0.54rem;
          height: 1*1.125rem;
          line-height: 1*1.125rem;
          text-align: center;
          font-weight: 400;
          color: rgba(255, 230, 173, 1);
          background: linear-gradient(0deg, rgba(254, 222, 87, 1) 0%, rgba(254, 252, 201, 1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .main {
          font-size: 0.2rem;
          background: #750503;
          border-radius: 0px 0px .16rem .16rem;
          padding: .2rem;
          color: #fff;
          .text {
            display: flex;
            i {
              margin-top: .1rem;
              display: inline-block;
              width: .1rem;
              height: .1rem;
              background: rgba(236, 110, 71, 1);
              border-radius: 50%;
              margin-right: .18rem;
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
            margin-top: .4rem;
            .game {
              width: 1.24rem;
              height: 1.69rem;
            }
          }
          .gogames {
            font-size: .3rem;
            color: #FDF35E;
            text-align: right;
            font-weight: bold;
            text-align: center;
            padding-bottom: .1rem;
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
