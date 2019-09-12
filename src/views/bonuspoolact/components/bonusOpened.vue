<template>
  <main>
    <div class="mask" @touchmove.prevent></div>
    <div class="content-box">
      <div class="top-envo"></div>
      <div class="main-message">
        <div class="info">
          <p class="btn" @click="closePop">
            <template v-if="ultimateState==1">
              马上报名
            </template>
            <template v-else>
              <template v-if="awards">
                收入囊中
              </template>
              <template v-else>
                继续逛逛
              </template>
            </template>
          </p>
          <p class="desc" v-if="tabindex==0&&normalState==5&&ultimateState==1">连续报名5天即可免费瓜分终极奖池哟，<br>
            赶快报名下一场吧！
          </p>
          <p class="desc" v-if="tabindex==0&&normalState==5&&(ultimateState==2||ultimateState==3)">您已获得瓜分终极大奖权利，<br>
            {{dividetimestr}}记得来瓜分哟！
          </p>
          <p class="desc" v-if="tabindex==1&&ultimateState==3">
            愿好运常伴您左右
          </p>
        </div>
      </div>
      <div class="front-msg">
        <div class="content-wrapper" v-if="awards">
          <div class="title">多妹恭喜您获得</div>
          <img :src="awards.awardsImage|filter">
          <p>{{awards.awardsName.replace('优惠券','').replace('话费券','')}}</p>
          <p>{{awards.awardsName.replace(awards.awardsName.replace('优惠券','').replace('话费券',''),'')}}</p>
        </div>
        <div class="content-wrapper sadness" v-else>
          <div class="title">很遗憾</div>
          <img src="../images/sadness.png" alt="">
          <p v-if="ultimateState==1">大奖与你擦肩而过</p>
          <p v-else>差点就中奖啦</p>
        </div>
      </div>
      <div class="close" @click="closePop"></div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'dailyTaskReceivePop',
    props: {
      awards: {
        type: Object,
        default: null
      },
      normalState: {
        type: Number,
        type: 0
      },
      ultimateState: {
        type: Number,
        type: 0
      },
      tabindex: {
        type: Number,
        type: 0
      },
      dividetimestr: {
        type: String,
        type: ''
      }
    },
    methods: {
      closePop() {
        console.log('closeBonusRes')
        this.$emit('closePop')
      },
      getPrizeName(awards) {
        return (parseFloat(awards.awardsName) * awards.awardsNum) + awards.awardsName.match(/[\u4e00-\u9fa5]/g).join("")
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .mask {
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }

  .content-box {
    position: fixed;
    z-index: 11;
    top: 30%;
    width: 100%;
    left: 35%;
    margin-left: -50%;
    animation: dailyScale 1.5s ease-in-out;
    .main-message {
      background: url(../images/ke.png) no-repeat;
      background-size: 100% 100%;
      width: 5.3rem;
      height: 3.34rem;
      margin-left: 2rem;
      z-index: 5;
      position: relative;
      margin-top: 1.5rem;
      animation: letterani 0.5s 1 linear;
      animation-delay: 0.5s;
      .info {
        opacity: 0;
        animation: opacitychange 0.5s 1 forwards;
        animation-delay: 0.5s;
        .btn {
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          bottom: 0.5rem;
          text-align: center;
          font-size: 0.3rem;
          color: rgba(226, 20, 60, 1);
          font-weight: bold;
          box-sizing: border-box;
          width: 3.3rem;
          height: 0.82rem;
          line-height: 0.82rem;
          background: linear-gradient(0deg, rgba(231, 137, 26, 1), rgba(255, 239, 201, 1));
          box-shadow: 0px 3px 4px 0px rgba(107, 2, 18, 0.09);
          border-radius: .41rem;
          z-index: 2;
        }
      }
      .desc {
        font-size: 0.22rem;
        position: absolute;
        top: 1.2rem;
        left: .3rem;
        right: .3rem;
        margin: auto;
        bottom: 0.4rem;
        text-align: center;
        font-weight: 400;
        color: rgba(243, 204, 182, 1);
        line-height: 0.3rem;
      }
    }
    .front-msg {
      background: url(../images/nei.png) no-repeat;
      background-size: 100% 100%;
      width: 5.1rem;
      height: 4.25rem;
      float: left;
      top: -5.5rem;
      left: 2.1rem;
      z-index: 4;
      position: relative;
      animation: front 1s 1 forwards;
      animation-delay: 0.5s;
      .content-wrapper {
        .title {
          margin: 0.35rem auto 0.21rem;
          text-align: center;
          font-size: 0.36rem;
          font-weight: bold;
          color: rgba(253, 137, 19, 1);
        }
        img {
          width: 2.09rem;
          height: 0.99rem;
          display: block;
          margin: 0 auto 0.1rem;
        }
        p {
          font-size: 0.3rem;
          &:nth-of-type(1) {
            font-size: 0.5rem;
            margin-bottom: 0.11rem;
          }
          color: rgba(220, 15, 58, 1);
          font-weight: bold;
          text-align: center;
        }
        &.sadness {
          img {
            width: 1.32rem;
            height: 1.62rem;
          }
          p {
            font-size: 0.3rem;
            font-weight: bold;
            color: rgba(220, 15, 58, 1);
          }
        }
      }
    }
    .top-envo {
      width: 5.3rem;
      height: 5.66rem;
      float: left;
      z-index: 6;
      position: relative;
      left: 2rem;
      top: 0;
      transform: rotateZ(0deg);
      animation: top-envolope 0.5s 1 forwards;
      animation-delay: 0.5s;
      background: url(../images/gai.png) no-repeat;
      background-size: 100% 100%;
      transform: scalez(1);
      top: 0;
      transform: rotateZ(0deg);
      transform-origin: center center;
      z-index: 6;
      &:after {
        content: "";
        position: absolute;
        top: 2.4rem;
        left: 35%;
        width: 1.72rem;
        height: 1.72rem;
        background: url("../images/bi.png") no-repeat;
        background-size: 100% 100%;
        opacity: 1;
        animation: opacitychangecoin 0.5s 1 forwards;
        animation-delay: 0.5s;
      }
    }
    .close {
      position: relative;
      bottom: -0.3rem;
      left: 60%;
      width: 0.6rem;
      height: 0.6rem;
      background: url("../images/close.png") no-repeat center / 100% 100%;
    }
  }

  @-webkit-keyframes front {
    0% {
      top: -5.5rem;
      overflow: hidden;
    }
    50% {
      top: -6.5rem;
      overflow: hidden;
    }
    80% {
      top: -5.5rem;
      overflow: hidden;
    }
    100% {
      top: -7rem;
      overflow: visible;
    }
  }

  @-webkit-keyframes opacitychangecoin {
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes top-envolope {
    0% {
      transform: scalez(0);
    }
    50% {
      transform: scalez(1);
      top: 0.6rem;
      transform: rotateZ(0deg);
      transform-origin: center center;
      z-index: 6;
    }
    100% {
      top: -3.8rem;
      z-index: 2;
      transform: scaley(0);
      transform: rotatex(180deg);
    }
  }

  @-webkit-keyframes letterani {
    0% {
      margin-top: 1.5rem;
    }
    50% {
      margin-top: 2rem;
    }
    100% {
      margin-top: 1.5rem;
    }
  }

  @-webkit-keyframes opacitychange {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes dailyScale {
    0% {
      transform: scale(0, 0);
    }
    20% {
      transform: scale(1.1, 0.95);
    }
    30% {
      transform: scale(0.95, 1.1);
    }
    50% {
      transform: scale(1, 1);
    }
    57% {
      transform: scale(1, 1);
    }
    64% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
</style>
