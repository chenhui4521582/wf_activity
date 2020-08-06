<template>
  <section :class="getClassName('com_pop')" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div class="title_bg" v-if="popType!=3">
            <div class="title_txt">
              {{titles[popType-1]}}
            </div>
          </div>
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <!--大家都在玩-->
              <template v-if="popType==1">
                <div class="gamelist">
                  <img :src="require(`../images/comPop/games/${index}.png`)" alt=""
                       v-for="(item,index) in games" class="game" @click="gotogame(item)">
                </div>
                <div class="gogames" @click="gotoindex">查看更多>></div>
                <div class="games_info">部分游戏不计活动，详见规则</div>
              </template>
              <template v-else-if="popType==2">
                <div class="sad_content">
                  <img :src="`${require(`../images/comPop/${awardData.awardsType}.png`)}`" alt="" class="award">
                  <p v-html="awardData.awardsName"></p>
                  <div class="info" v-html="awardData.info" v-if="awardData.info"></div>
                </div>
              </template>
            </div>
          </div>
          <div :class="getClassName('close')" @click="close">
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'comPop',
    data() {
      return {
        isShowPop: false,
        games: [{
          id: 12,
          url: '/crush'
        }, {
          id: 10, url: '/fish'
        }, {
          id: 13, url: '/kingdom2'
        }, {
          id: 2, url: '/billiards'
        }, {
          id: 18, url: '/square'
        }, {
          id: 30, url: '/boom'
        }],
        titles: ["大家都在玩", "恭喜获得"]
      }
    },
    props: {
      popType: {
        type: Number,
        default: 0
      },
      awardData: {
        type: Object,
        default: null
      },
      countTime: {
        type: String,
        default: ''
      },
      actInfoData: {
        type: Object,
        default: null
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      getClassName(name) {
        return `${name} flag${this.popType}`
      },
      getAwardName(awardType) {
        switch (awardType) {
          case 'jyz':
            return '金叶子'
            break
          case 'yg':
            return '鱼干'
            break
          case 'jdk':
            return '京东券'
            break
          case 'hfq':
            return '话费券'
            break
          case 'yhq':
            return '优惠券'
            break
        }
      },
      async showPop() {
        this.isShowPop = true
      },
      close() {
        this.$emit('close')
        this.isShowPop = false
      },
      move(e) {
        e.preventDefault()
      },
      gotogame({url, id}) {
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      }
    },
    watch: {
      isShowPop(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.move, {passive: false})
        } else {
          document.body.style.overflow = null
          document.removeEventListener('touchmove', this.move, {passive: false})
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    left: 50%;
    top: 3.6rem;
    margin-left: -2.5rem;
    &.flag3 {
      margin-left: -2.685rem;
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
        margin: 0 auto;
        box-sizing: border-box;
        .title_bg {
          width: 5.86rem;
          height: 1.6rem;
          background: url("../images/comPop/top.png");
          background-size: 100% 100%;
          position: absolute;
          left: -0.48rem;
          top: -1.6rem;
          .title_txt {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            font-size: .36rem;
            font-weight: bold;
            color: #ffffff;
            text-align: center;
            padding-top: .15rem;
            padding-bottom: .5rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .main {
          width: 4.9rem;
          height: 4.5rem;
          background: #F4E4B3;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: .3rem .5rem 0;
          box-sizing: border-box;
          &:not(.flag3):before {
            content: '';
            position: absolute;
            left: 0;
            bottom: -.35rem;
            width: 4.9rem;
            height: .36rem;
            background: url("../images/comPop/bottom.png");
            background-size: 100% 100%;
          }
          &.flag2 {
            height: 3.6rem
          }
          &.flag3 {
            width: 5.37rem;
            height: 5.32rem;
            background: url("../images/comPop/beginpop.png");
            background-size: 100% 100%;
          }
          .container_compop {
            &.flag2 {
              position: relative;
              &:before {
                content: '';
                position: absolute;
                top: -.8rem;
                left: -.5rem;
                width: 4.76rem;
                height: 4.71rem;
                background: url("../images/comPop/light.png");
                background-size: 100% 100%;
              }
              .sad_content {
                position: absolute;
                left: 0;
                right: 0;
                margin: auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                .award {
                  width: 2.54rem;
                  margin: .4rem 0 .2rem;
                }
                p {
                  font-size: .36rem;
                  font-weight: bold;
                  color: rgba(160, 88, 2, 1);
                  line-height: .4rem;
                  text-align: center;
                }
              }
            }
            &.flag1 {
              .gamelist {
                display: flex;
                flex-wrap: wrap;
                height: 4rem;
                justify-content: space-between;
                position: absolute;
                left: .3rem;
                right: .3rem;
                top: -.1rem;
                .game {
                  width: 1.24rem;
                  height: 1.69rem;
                }
              }
              .gogames {
                font-size: 0.3rem;
                font-weight: bold;
                color: rgba(237, 43, 56, 1);
                text-align: center;
                position: absolute;
                bottom: .3rem;
                left: 0;
                right: 0;
              }
              .games_info {
                font-size: 0.24rem;
                font-weight: 400;
                color: rgba(160, 88, 2, 1);
                text-align: center;
                position: absolute;
                bottom: -.1rem;
                left: 0;
                right: 0;
              }
            }
          }
        }
        .close {
          width: .6rem;
          height: .6rem;
          background: url("../images/comPop/close.png") no-repeat center
            center / 100% 100%;
          position: absolute;
          bottom: -1.2rem;
          left: 0;
          right: 0;
          margin: auto;
          &.flag3 {
            bottom: -.5rem;
          }
        }
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
