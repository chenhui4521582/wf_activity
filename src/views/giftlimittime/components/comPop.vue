<template>
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1">
                <scroll>
                  <div>
                    <p>1、活动时间：{{actInfo.beginDate}}~{{actInfo.endDate}}</p>
                    <p>2、每天分别设置{{actInfo.hourList.join('点、')}}点两个时间节点，每个节点开放{{actInfo.ruleGiftNum}}个不同价格梯度的礼包优惠；</p>
                    <p>3、每种礼包的抢购数量有限。且随着价格梯度增长，折扣越高。</p>
                    <p>4、每个时间段的礼包价格、赠品均不同</p>
                  </div>
                </scroll>
              </template>
            </div>
            <div class="close" @click="close">
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>
<script>
  export default {
    name: "compop",
    data() {
      return {
        isShowPop: false
      };
    },
    props: {
      popType: {
        type: Number,
        default: 0
      },
      awardData: {
        type: Object,
        default: () => null
      },
      actInfo: {
        type: Object,
        default: () => null
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      getClassName(name) {
        return `${name} flag${this.popType}`
      },
      async showPop() {
        this.isShowPop = true
      },
      close() {
        this.isShowPop = false;
      },
      move(e) {
        e.preventDefault()
      }
    },
    watch: {
      isShowPop(value) {
        if (value) {
          document.body.style.overflow = 'hidden';
          document.addEventListener('touchmove', this.move, {passive: false});
        } else {
          document.body.style.overflow = null;
          document.removeEventListener('touchmove', this.move, {passive: false});
        }
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    top: 40%;
    margin-top: -50%;
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
          height: .72rem;
          position: relative;
          top: 2.3rem;
          left: 0;
          right: 0;
          margin: auto;
          width: 3.78rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .48rem;
          font-weight: bold;
          color: rgba(140, 51, 5, 1);
          z-index: 1;
        }
        .main {
          width: 7.2rem;
          height: 6.27rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          background: url("../images/compop/pop.png");
          background-size: 100% 100%;
          .container_compop {
            position: absolute;
            top: 2rem;
            bottom: .6rem;
            left: 1.49rem;
            right: 1.38rem;
            margin: auto;
            &.flag1 {
              p {
                font-size: .26rem;
                font-weight: bold;
                color: #FFFFFF;
                line-height: .4rem;
              }
            }
          }
          .close {
            position: absolute;
            bottom: -.8rem;
            left: 0;
            right: 0;
            margin: auto;
            width: .6rem;
            height: .6rem;
            background: url("../images/compop/close.png");
            background-size: 100% 100%;
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
