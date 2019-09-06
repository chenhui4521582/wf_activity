<template>
  <div id="app" class="close">
    <awards-pop @closeview="closegameeggs" @gotoact="gotoact"></awards-pop>
  </div>
</template>
<script>
  import awardsPop from './component/awardPop'
  export default {
    data () {
      return {
      }
    },
    methods: {
      closegameeggs () {
        if (parent.closeWebView) {
          parent.closeWebView()
        }
      },
      gotoact () {//去活动详情
        parent.location.href = `http://wap.beeplaying.com/activities/shufflinggame.html?from=index`
      }
    },
    components: {
      awardsPop
    }
  }

</script>
<style lang="less" scoped>
  @import "../../../common/css/base.css";
  html, body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    background-color:transparent !important;
  }
  /* 坚屏模式 */
  @media only screen and (orientation: portrait) {
    #app {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      background: #ffe6b3;
      font-size: 0.24rem;
      font-weight: 700;
      color: #fff;
      width: 6.6rem;
      height: 9.9rem;
    }
  }

  /* 横屏模式 */
  @media screen and (orientation: landscape) {
    #app {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      background: #ffe6b3;
      font-size: 0.24rem;
      font-weight: 700;
      color: #fff;
      width: 6.6rem;
      height: 9.9rem;
      overflow: scroll;
    }
  }

  #app {
    &.close {
      background: transparent;
    }
  }
</style>
