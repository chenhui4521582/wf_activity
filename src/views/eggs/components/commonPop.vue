<template>
  <section class="commonPop" @touchmove.prevent>
    <div class="pop-mask" v-if="isShowPop || haveGif" @touchmove.prevent>
      <img id="haveGif" v-if="haveGif" src="" alt="">
    </div>
    <transition :name="haveGif?'scalcLong':'scalc'">
      <div class="pop" v-if="isShowPop && !isEnd">
        <div class="wrap" :class="{'hammer-wrap':popType===3}">
          <div class="main">
            <ul class="awards-list" :class="`length-${awardsList.length}`">
              <li :class="item.awardsType" v-for="(item,index) in awardsList" :key="index">
                <span>{{item.awardsName}}</span>
              </li>
            </ul>
          </div>
          <div class="hit-egg-btn" @click="keepHit()" v-if="popType<3">{{popType>1?'立即':'继续'}}砸彩蛋</div>
          <div class="get-cz-btn" @click="getMore">获取更多锤子</div>
        </div>
        <div class="close-icon" @click="closePop"></div>
      </div>
      <div class="pop" v-if="isShowPop && isEnd">
        <div class="wrap end-wrap">
          <div class="main">
            <ul class="awards-list" :class="`length-${awardsList.length}`">
              <li :class="item.awardsType" v-for="(item,index) in awardsList" :key="index">
                <span>{{item.awardsName}}</span>
              </li>
            </ul>
            <p v-if="myRank&&myRank<=rankSize">恭喜您排名{{myRank}}，获得以上奖品</p>
            <p v-if="myRank>rankSize||!myRank">恭喜您排名{{myRank?myRank:'1000+'}}，<br>{{rankSize}}名以外不能领取奖励</p>
          </div>
          <div class="hit-egg-btn" @click="closePop">好的</div>
        </div>
        <div class="close-icon" @click="closePop"></div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'commonPop',
  data () {
    return {
      imgUrl: ''
    }
  },
  props: {
    isEnd: {
      type: Boolean,
      default: false
    },
    haveGif: {
      type: Boolean,
      default: false
    },
    isShowPop: {
      type: Boolean,
      default: false
    },
    popType: {
      type: Number,
      default: 0
    },
    awardsList: {
      type: Array,
      default: []
    },
    myRank: {
      type: Number,
      default: 0
    },
    rankSize: {
      type: Number,
      default: 0
    }
  },
  methods: {
    closePop () {
      switch (this.popType) {
        case 2:
          GLOBALS.marchSetsPoint('A_H5PT0075001457')   // H5平台-砸金蛋-恭喜新增锤子弹窗-点击关闭
          break;
        case 3:
          GLOBALS.marchSetsPoint('A_H5PT0075001479')   // H5平台-砸金蛋-砸蛋失败弹窗-点击关闭
          break;

        default:
          GLOBALS.marchSetsPoint('A_H5PT0075001476')   // H5平台-砸金蛋-砸蛋成功弹窗-点击关闭
          break;
      }
      this.$emit('close-pop')
    },
    keepHit () {
      switch (this.popType) {
        case 2:
          GLOBALS.marchSetsPoint('A_H5PT0075001455')   // H5平台-砸金蛋-恭喜新增锤子弹窗-点击立即砸彩蛋
          break;

        default:
          GLOBALS.marchSetsPoint('A_H5PT0075001474')   // H5平台-砸金蛋-砸蛋成功弹窗-点击继续砸彩蛋
          break;
      }
      this.$emit('keep-hit')
    },
    getMore () {
      switch (this.popType) {
        case 2:
          GLOBALS.marchSetsPoint('A_H5PT0075001456')   // H5平台-砸金蛋-恭喜新增锤子弹窗-点击获取更多锤子
          break;
        case 3:
          GLOBALS.marchSetsPoint('A_H5PT0075001478')   // H5平台-砸金蛋-砸蛋失败弹窗-点击获取更多锤子
          break;

        default:
          GLOBALS.marchSetsPoint('A_H5PT0075001475')   // H5平台-砸金蛋-砸蛋成功弹窗-点击获取更多锤子
          break;
      }
      this.$emit('get-more')
    }
  },
  mounted () {
    document.querySelector("#haveGif").src = `../pages/images/common/open-eggs.gif?${Date.now()}`
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.commonPop {
  position: fixed;
  top: 1.36rem;
  left: 50%;
  margin-left: -2.46rem;
  z-index: 10;
  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    &.have-gif {
      background: rgba(0, 0, 0, 0.55) no-repeat center center / 100% 5.2rem;
      animation: bgChange 1s linear;
    }
    img {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
    }
  }
  .pop {
    position: relative;
    z-index: 10;
    .wrap {
      width: 4.92rem;
      height: 7.38rem;
      background: no-repeat center center / 100% 100%;
      background-image: url("../pages/images/common/bg.png");
      margin: 0 auto;
      box-sizing: border-box;
      padding: 2.32rem 0.26rem 0;
      &.hammer-wrap {
        height: 6.2rem;
        background-image: url("../pages/images/common/no-hammer-bg.png");
        .main {
          .awards-list {
            min-height: 2.4rem;
          }
        }
      }
      &.end-wrap {
        height: 6.6rem;
        background-image: url("../pages/images/common/end-bg.png");
        .main {
          .awards-list {
            min-height: 2rem;
            &.length-1 {
              li.end-empty {
                max-width: 1.28rem;
                max-height: 1.66rem;
                background-color: transparent;
                background-size: 100% 100%;
                background-image: url("../pages/images/common/end-empty.png");
              }
            }
            &.length-2 {
              li {
                max-width: 1.28rem;
                max-height: 1.28rem;
                background-size: 100% 100%;
                &.jyz {
                  background-image: url("../pages/images/common/jyz-with-bg.png");
                }
                &.jdk {
                  background-image: url("../pages/images/common/jdk-with-bg1.png");
                }
                span {
                  bottom: 0;
                  display: block;
                  text-align: center;
                  height: 0.34rem;
                  line-height: 0.36rem;
                }
              }
            }
          }
          p {
            text-align: center;
            font-size: 0.28rem;
            font-weight: bold;
            color: #c85501;
            min-height: 0.6rem;
          }
        }
      }
      .main {
        font-size: 0.24rem;
        line-height: 0.3rem;
        letter-spacing: 0.02rem;
        font-weight: bold;
        color: #fff;
        .awards-list {
          min-height: 2.8rem;
          display: flex;
          align-content: center;
          justify-content: center;
          li {
            position: relative;
            display: block;
            border-radius: 0.1rem;
            background-color: #ffcb7c;
            background: #ffcb7c no-repeat center center;
            span {
              position: absolute;
              display: block;
              color: #c85501;
              width: 100%;
              text-align: center;
              font-size: 0.24rem;
              font-weight: bold;
              white-space: nowrap;
            }
          }
          &.length-1,
          &.length-2 {
            li {
              flex: 1;
              max-width: 1.88rem;
              max-height: 1.88rem;
              background-size: 1.22rem 1.22rem;
              &.hammer {
                background-image: url("../pages/images/common/hammer.png");
              }
              &.hfq {
                background-image: url("../pages/images/common/hfq.png");
              }
              &.jdk {
                background-image: url("../pages/images/common/jdk.png");
              }
              &.yg {
                background-image: url("../pages/images/common/yg.png");
              }
              span {
                bottom: -0.48rem;
              }
              margin: 0.2rem 0.08rem;
            }
          }
          &.length-3,
          &.length-4,
          &.length-5 {
            flex-wrap: wrap;
            padding: 0 0.8rem;
            justify-content: left;
            li {
              flex: 0 0 50%;
              max-width: 1.28rem;
              max-height: 1.28rem;
              min-width: 1.28rem;
              min-height: 1.28rem;
              background-size: 1.28rem 1.28rem;
              &.hfq {
                background-image: url("../pages/images/common/hfq-with-bg.png");
              }
              &.jdk {
                background-image: url("../pages/images/common/jdk-with-bg.png");
              }
              &.yg {
                background-image: url("../pages/images/common/yg-with-bg.png");
              }
              span {
                bottom: 0;
                font-size: 0.18rem;
              }
              margin: 0.1rem 0.06rem;
            }
          }
          &.length-5 {
            padding: 0 0.1rem;
          }
        }
      }
      .get-cz-btn,
      .hit-egg-btn {
        width: 2.9rem;
        height: 0.68rem;
        line-height: 0.68rem;
        border-radius: 0.34rem;
        color: #fff;
        font-size: 0.3rem;
        font-weight: bold;
        text-align: center;
        margin: 0.18rem auto 0;
      }
      .hit-egg-btn {
        background: #e55600;
      }
      .get-cz-btn {
        background: #f27e11;
      }
    }
    .close-icon {
      width: 0.6rem;
      height: 0.6rem;
      background: url("../pages/images/common/close.png") no-repeat center
        center / 100% 100%;
      margin: 0.4rem auto 0;
    }
  }
  .scalc-enter-active {
    animation: fadeAnimation 0.3s ease-in-out;
  }
  .scalcLong-enter-active {
    animation: fadeAnimation 1s ease-in-out;
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
