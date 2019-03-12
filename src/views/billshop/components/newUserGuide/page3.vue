<template>
  <div class="newUserPage3">
    <div class="mask"></div>
    <div class="center">
      <div class="tips">
        <span class="explain">我的话费券：</span>
        <span class="number">{{accountBalance}}</span>
      </div>
      <div class="tip1" @click="handleClick">
        <div class="bg" :class="{'animation': isAnimation}"></div>
        <div class="text">去赚话费券</div>
      </div>
      <div class="tip2" :class="{'animation': isAnimation}"/>
      <div class="tip3" :class="{'animation': isAnimation}"/>
      <div class="tip4" :class="{'animation': isAnimation}"/>
      <div class="tip5" :class="{'animation': isAnimation}"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-guide-page3',
  props: {
    accountBalance: String,
    required: true
  },
  data: () => ({
    isAnimation: false,
    isShow: false
  }),
  methods: {
    handleClick () {
      this.goTaskPage()
    },
    goTaskPage () {
      switch (this.getUrlParam('from')) {
        case 'bdWap':
          parent.location.href = `https://wap.beeplay123.com/bdWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
          break
        case 'jsWap':
          parent.location.href = `https://wap.beeplay123.com/bdWap/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
          break
        default:
          parent.location.href = `https://wap.beeplay123.com/wap/home/?channel=${localStorage.getItem('APP_CHANNEL')}#/taskview`
      }
    },
    getUrlParam (ename) {
      var url = window.location.href
      var Request = new Object()
      if (url.indexOf('?') != -1) {
        var str = url.split('?')[1]
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          Request[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
      } else {
        return ''
      }
      let params = Request[ename] ? Request[ename].split('#')[0] : ''
      return params
    },
    autoHide () {
      let _this = this;
      setTimeout(function () {
        _this.handleClick();
      },7000)
    },
  },
  mounted () {
    this.$nextTick(function () {
      this.isAnimation = true
      this.autoHide()
    })
  }
}
</script>

<style lang="less" scope>
.newUserPage3 {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0.8;
    background: rgba(0, 0, 0, 0.8);
  }
  .center {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    .tips {
      position: absolute;
      top: 0.86rem;
      left: 0;
      width: 4.14rem;
      height: 0.72rem;
      line-height: 0.72rem;
      color: #fff;
      text-align: center;
      background: #2e4570;
      border-radius: 20px;
      .explain {
        font-size: 0.28rem;
      }
      .number {
        font-size: 0.36rem;
      }
    }
    .tip1 {
      position: absolute;
      bottom: 0.06rem;
      left: 0;
      width: 100%;
      height: 1.27rem;
      .text {
        margin: 0.19rem auto 0;
        width: 6.66rem;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.28rem;
        text-align: center;
        color: #fff;
        background: rgba(238, 111, 11, 1);
        border-radius: 8px;
      }
      .bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url("./images/page3/kuang.png") no-repeat center 0;
        background-size: 6.99rem 1.27rem;
        opacity: 0;
        &.animation {
          animation: prople 1s 0s forwards;
        }
      }
    }
    .tip2 {
      position: absolute;
      bottom: 1.4rem;
      left: 0.3rem;
      width: 2.62rem;
      height: 3.31rem;
      background: url("./images/page1/prople.png") no-repeat center 0;
      background-size: 100% 100%;
      opacity: 0;
      &.animation {
        animation: prople 2s 1s forwards;
      }
    }
    .tip3 {
      position: absolute;
      bottom: -0.4rem;
      left: 5.39rem;
      width: 1.3rem;
      height: 1.51rem;
      background: url("./images/page1/finger.png") no-repeat center 0;
      background-size: 100% 100%;
      opacity: 0;
      z-index: 2;
      &.animation {
        animation: finger 1s 2.5s infinite;
      }
    }
    .tip4 {
      position: absolute;
      bottom: 2rem;
      left: 2.83rem;
      width: 4.07rem;
      height: 1.64rem;
      background: url("./images/page3/tips.png") no-repeat center 0;
      background-size: 100% 100%;
      transform: scale(0);
      &.animation {
        animation: tips 0.5s 2s forwards;
      }
    }
    .tip5 {
      position: absolute;
      bottom: 0rem;
      left: 4.5rem;
      width: 1.17rem;
      height: 1.17rem;
      border: 5px solid rgba(180, 226, 255, 1);
      border-radius: 50%;
      transform: scale(0);
      &.animation {
        animation: round 1s 3s infinite;
      }
    }
  }
}
@keyframes tips {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes finger {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  25% {
    opacity: 1;
    transform: rotateZ(-15deg);
  }
  50% {
    opacity: 1;
    transform: rotateZ(-30deg);
  }
  75% {
    opacity: 1;
    transform: rotateZ(-15deg);
  }
  100% {
    opacity: 1;
    transform: rotateZ(0);
  }
}
@keyframes round {
  0% {
    opacity: 1;
    transform: scale(0);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
@keyframes prople {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>