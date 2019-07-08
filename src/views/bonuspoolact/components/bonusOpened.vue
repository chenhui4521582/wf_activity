<template>
  <main>
    <div class="mask" @touchmove.prevent></div>
    <div class="content-box">
      <div class="top-envo"></div>
      <div class="main-message">
        <div class="info" v-if="awards">
          <p class="btn" @click="closePop">收入囊中</p>
          <p class="desc">哎哟不错哦n(*≧▽≦*)n <br>
            继续参与瓜分让好运一直延续下去吧～</p>
        </div>
        <div class="info" v-else>
          <p class="desc sadness">多妹小提示 <br>
            听说经常参与活动中奖概率更高哦</p>
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
          <img src="../images/bonus/sadness.png" alt="">
          <p>差点就中奖啦</p>
        </div>
      </div>
      <div class="close" @click="closePop" v-if="!awards"></div>
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
    }
  },
  methods: {
    closePop () {
      console.log('closeBonusRes')
      this.$emit('closePop')
    },
    getPrizeName (awards) {
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
    background: url(../images/bonus/ke.png) no-repeat;
    background-size: 100% 100%;
    width: 5.3rem;
    height: 4.05rem;
    margin-left: 2rem;
    z-index: 5;
    position: relative;
    margin-top: 1.5rem;
    -webkit-animation: letterani 0.5s 1 linear;
    -webkit-animation-delay: 0.5s;
    .info {
      opacity: 0;
      -webkit-animation: opacitychange 0.5s 1 forwards;
      -webkit-animation-delay: 0.5s;
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
        height: 0.89rem;
        line-height: 0.89rem;
        background: url("../images/bonus/gained_btn.png") no-repeat;
        background-size: 100% 100%;
        z-index: 2;
      }
    }
    .desc {
      font-size: 0.22rem;
      position: absolute;
      top: 1.5rem;
      left: 0;
      right: 0;
      margin: auto;
      bottom: 0.4rem;
      text-align: center;
      font-weight: 400;
      color: rgba(243, 204, 182, 1);
      line-height: 0.32rem;
      &.sadness {
        top: 2rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
      }
    }
  }

  @keyframes letterani {
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
  @keyframes opacitychange {
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
  .front-msg {
    background: url(../images/bonus/nei.png) no-repeat;
    background-size: 100% 100%;
    width: 5.1rem;
    height: 4.25rem;
    float: left;
    top: -5rem;
    left: 2.1rem;
    z-index: 4;
    position: relative;
    -webkit-animation: front 1s 1 forwards;
    -webkit-animation-delay: 0.5s;
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
        margin: 0 auto 0.2rem;
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

  @keyframes front {
    0% {
      top: -4.5rem;
      overflow: hidden;
    }
    50% {
      top: -6rem;
      overflow: hidden;
    }
    80% {
      top: -4.5rem;
      overflow: hidden;
    }
    100% {
      top: -7.2rem;
      overflow: visible;
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
    -webkit-animation: top-envolope 0.5s 1 forwards;
    -webkit-animation-delay: 0.5s;
    background: url(../images/bonus/gai.png) no-repeat;
    background-size: 100% 100%;
    -webkit-transform: scalez(1);
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
      background: url("../images/bonus/bi.png") no-repeat;
      background-size: 100% 100%;
      opacity: 1;
      animation: opacitychangecoin 0.5s 1 forwards;
      -webkit-animation: opacitychangecoin 0.5s 1 forwards;
      animation-delay: 0.5s;
      -webkit-animation-delay: 0.5s;
    }
  }
  @keyframes opacitychangecoin {
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
  @keyframes top-envolope {
    0% {
      -webkit-transform: scalez(0);
    }
    50% {
      -webkit-transform: scalez(1);
      top: 0.6rem;
      transform: rotateZ(0deg);
      transform-origin: center center;
      z-index: 6;
    }
    100% {
      top: -3.8rem;
      z-index: 2;
      -webkit-transform: scaley(0);
      transform: rotatex(180deg);
    }
  }
  .close {
    position: relative;
    bottom: -0.3rem;
    left: 60%;
    width: 0.6rem;
    height: 0.6rem;
    background: url("../images/bonus/close.png") no-repeat center / 100% 100%;
  }
}
@keyframes dailyScale {
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
