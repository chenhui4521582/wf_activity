<template>
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div :class="getClassName('wrap')">
          <div class="main">
            <div class="container_compop">
              <div class="awards">
                <div class="item" v-for="(item,index) in awardData.content.split('+')">
                  <img :src="awardData.productIcon|filter" alt="" v-if="index==0">
                  <img src="../images/leaf.png" alt="" v-else class="leaf">
                  <div class="awardname">{{index==1?item:awardData.name}}</div>
                </div>
              </div>
              <div class="btn" @click="gotogame(awardData.isCat)"></div>
              <div class="info">{{awardData.isCat?'招财猫内点击“换肤”，即可立即装扮':'点击个人中心头像-头像挂件即可进行装扮'}}</div>
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
      awardData: {
        type: Object,
        default: () => null
      },
      actInfo: {
        type: Object,
        default: () => null
      }
    },
    methods: {
      getClassName(name) {
        return `${name} flag${this.popType}`
      },
      async showPop() {
        console.log('9999')
        this.isShowPop = true
      },
      close() {
        this.$emit('close')
        this.isShowPop = false;
      },
      move(e) {
        e.preventDefault()
      },
      gotogame(isCat) {
        if (isCat) {
          GLOBALS.jumpOutsideGame('/petcat')
        } else {
          location.href = '//wap.beeplaying.com/xmWap/#/personalCenter/headFrame'
        }
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
  ;
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -2.92rem;
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
          top: .81rem;
          left: 0;
          right: 0;
          margin: auto;
          width: 3.78rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .36rem;
          font-weight: bold;
          color: rgba(153, 166, 81, 1);
        }
        .main {
          width: 5.84rem;
          height: 5.88rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          background: url("../images/popbg.png");
          background-size: 100% 100%;
          .container_compop {
            position: absolute;
            top: 1.5rem;
            bottom: .1rem;
            left: .2rem;
            right: .2rem;
            margin: auto;
            .awards {
              display: flex;
              align-items: center;
              justify-content: space-around;
              align-items: flex-end;
              margin-bottom: .32rem;
              .item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
              img {
                width: 1.5rem;
                height: 1.5rem;
                &.leaf {
                  width: 1.6rem;
                  height: 1.6rem;
                }
              }
              .awardname {
                margin-top: .3rem;
                font-size: .26rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
              }
            }
            .btn {
              width: 3.04rem;
              height: 1.14rem;
              background: url("../images/decorate_btn.png");
              background-size: 100% 100%;
              margin: auto;
            }
            .info {
              margin-top: .16rem;
              font-size: .22rem;
              font-weight: bold;
              color: rgba(255, 143, 53, 1);
              text-align: center;
            }
          }
          .close {
            position: absolute;
            top: .66rem;
            right: .23rem;
            width: .5rem;
            height: .5rem;
            background: url("../images/close.png");
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
