<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <div class="bonus-success">
      <div class="close" @click="gotoact"></div>
      <div class="close1" @click="close(1)"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {}
    },
    props: {
      type: {
        type: Number,
        default: 0//1.活动规则 2.砸金蛋还差锤子 3.砸金蛋需要去活动页 4.砸金蛋结束
      },
      awardsname: {
        type: String,
        default: ''
      },
      gametype: {
        type: Number,
        default: 0
      }
    },
    methods: {
      close() {
        this.$emit('closeview')
      },
      gotoact() {
        this.$emit('gotoact')
      }
    },
    mounted() {
    }
  }
</script>
<style lang="less" scoped>
  .pop-window {
    position: relative;
    z-index: 11;
    width: 100%;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    .pop-close {
      width: 0.68rem;
      height: 0.68rem;
      position: absolute;
      right: -0.34rem;
      top: -0.34rem;
    }
  }

  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
  }

  /* 坚屏模式 */
  @media only screen and (orientation: portrait) {
    .bonus-success {
      position: fixed;
      top: 1.8rem;
      left: 55%;
      transform: translateX(-50%);
      width: 5.77rem;
      height: 6.16rem;
    }
  }

  /* 横屏模式 */
  @media screen and (orientation: landscape) {
    .bonus-success {
      position: fixed;
      top: 2%;
      left: 55%;
      transform: translateX(-50%);
      width: 5.77rem;
      height: 6.16rem;
    }
  }

  .bonus-success {
    background: url("../../images/sdkbg.png");
    background-size: 100% 100%;
    .btn {
      font-size: .3rem;
      width: 2.9rem;
      height: .68rem;
      line-height: .68rem;
      text-align: center;
      background: rgba(236, 129, 16, 1);
      border-radius: .34rem;
      margin: auto;
      &.btn_more {
        background: rgba(229, 86, 0, 1);
      }
      &.btn_see {
        margin-top: .18rem;
        background: rgba(236, 129, 16, 1);
      }
    }
    .close1{
      position: absolute;
      width: .5rem;
      height: .5rem;
      background: url("../images/common/close.png");
      background-size: 100% 100%;
      right: 0.4rem;
      margin: auto;
      top: 0.4rem;
    }
    .close {
      position: absolute;
      width: 2.41rem;
      height: .83rem;
      background: url("../../images/sdkbtn.png");
      background-size: 100% 100%;
      left: 1.4rem;
      bottom: -1rem;
    }
  }
</style>
