<template>
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div class="title_bg">{{titles[popType-1]}}</div>
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1">
                <scroll>
                  <div>
                    <p>1、恭喜你成为幸运儿，金币挑战对幸运儿单独开放！ </p>
                    <p>2、活动时间：{{actInfo.timeline}} </p>
                    <p>3、金币挑战中，每支持1W金叶即可获得一个金币！ </p>
                    <p>4、在斗地主、麻将、枪火英雄、套圈、天天飞机大战、打地鼠中消耗金叶不计入其中。</p>
                    <p>5、如有疑问，请联系在线客服。</p>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==2">
                <p>特别挑战开启</p>
                <img src="../images/compop/jyz.png" alt="">
                <div class="info">金叶子已到账</div>
              </template>
              <template v-else-if="popType==3">
                <img src="../images/compop/jinbi.png" alt="" v-if="awardData.awardsType=='jinbi'">
                <div class="yhq" v-else>
                  <i>{{awardData.awardsName.replace(getAwardName(awardData.awardsType),'')}}</i>
                  <div>{{getAwardName(awardData.awardsType)}}</div>
                </div>
                <div class="info">{{awardData.awardsName}}</div>
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
        isShowPop: false,
        titles: ['活动规则', '温馨提示', '恭喜获得']
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
      getClassName(name) {
        return `${name} flag${this.popType}`
      },
      async showPop() {
        this.isShowPop = true
      },
      close() {
        this.$emit('close',this.awardData)
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
    top: 30%;
    left: 50%;
    margin-left: -3.04rem;
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
          width: 6.08rem;
          height: 7.87rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          background: url("../images/compop/pop1.png");
          background-size: 100% 100%;
          &.flag1 {
            background: url("../images/compop/pop.png");
            background-size: 100% 100%;
          }
          .container_compop {
            position: absolute;
            top: 2.7rem;
            bottom: .2rem;
            left: .2rem;
            right: .2rem;
            margin: auto;
            &.flag1 {
              p {
                font-size: .3rem;
                font-weight: 400;
                color: rgba(140, 51, 5, 1);
                line-height: .36rem;
              }
            }
            &.flag2 {
              display: flex;
              flex-direction: column;
              align-items: center;
              p {
                font-size: .6rem;
                font-weight: bold;
                color: rgba(252, 89, 89, 1);
                margin-bottom: .48rem;
              }
              img {
                width: 1.27rem;
                height: 1.27rem;
                margin-bottom: .45rem;
              }
              .info {
                font-size: .4rem;
                font-weight: 400;
                color: rgba(200, 98, 45, 1);
              }
            }
            &.flag3 {
              top: 3.5rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                width: 1.99rem;
                height: 2.01rem;
                margin-bottom: .44rem;
              }
              .yhq {
                width: 2.65rem;
                height: 2.97rem;
                background: url("../images/compop/hfq.png");
                background-size: 100% 100%;
                font-size: .22rem;
                font-weight: bold;
                color: rgba(245, 96, 62, 1);
                padding-top: .8rem;
                box-sizing: border-box;
                text-align: center;
                i {
                  font-size: .48rem;
                  font-weight: bold;
                  color: rgba(245, 96, 62, 1);
                }
                div {
                  margin-top: .55rem;
                  font-size: .37rem;
                  font-weight: bold;
                  color: rgba(255, 255, 255, 1);
                }
              }
              .info {
                font-size: .48rem;
                font-weight: bold;
                color: rgba(252, 89, 89, 1);
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
