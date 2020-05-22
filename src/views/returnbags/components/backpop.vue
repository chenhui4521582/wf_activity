<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <div class="bonus-success">
      <span class="title title0"></span>
      <div class="desc">
        <p>即将离开回归礼包页面，您可通过 平台“任务-限时活动”回到这里。</p>
        <img src="../images/pic.png" alt="" @click="gototask">
        <div class="sure" @click="back">确认离开</div>
      </div>
      <div class="close" @click="close"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {}
    },
    methods: {
      close() {
        this.$emit('close')
      },
      back() {
        this.$emit('close')
        this.$emit('back', 1)
      },
      gototask() {
        location.href = 'https://wap.beeplaying.com/xmWap/#/task'
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
    background: rgba(0, 0, 0, .7);
    z-index: 10;
  }

  .bonus-success {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4.43rem;
    height: 6.2rem;
    background: linear-gradient(0deg, rgba(77, 36, 128, 0.98), rgba(38, 23, 67, 0.98));
    border-radius: .32rem;
    z-index: 11;
    .title {
      width: 2.29rem;
      height: .44rem;
      background: url("../images/tips_title.png");
      background-size: 100% 100%;
      position: absolute;
      top: .4rem;
      left: 0;
      right: 0;
      margin: auto;
    }
    .desc {
      position: absolute;
      top: 1.02rem;
      left: .33rem;
      right: .3rem;
      font-size: .24rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: .36rem;
      img {
        width: 3.88rem;
        height: 2.78rem;
        margin: .16rem 0 .31rem;
      }
      .sure {
        width: 2.52rem;
        height: 0.92rem;
        line-height: 0.92rem;
        text-align: center;
        font-size: 0.3rem;
        font-weight: bold;
        color: rgba(126, 23, 165, 1);
        background: url("../images/pop_btn.png");
        background-size: 100% 100%;
        margin: auto;
      }
    }
    .close {
      position: absolute;
      right: .11rem;
      top: .09rem;
      width: .41rem;
      height: .41rem;
      background: url("../images/close.png");
      background-size: 100% 100%;
    }
  }
</style>
