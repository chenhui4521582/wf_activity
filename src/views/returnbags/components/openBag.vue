<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <div class="bonus-success">
      <div class="info">
        <div class="close" @click="close">点击开福袋</div>
      </div>
      <div class="pop_close" @click="close"></div>
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
        this.$emit('open')
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
      width: 0.41rem;
      height: 0.41rem;
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
    background: rgba(0, 0, 0, 0.7);
    z-index: 10;
  }

  .bonus-success {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5.1rem;
    height: 4.5rem;
    background: url("../images/richbag_pop.png");
    background-size: 100% 100%;
    z-index: 11;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3.52rem;
    box-sizing: border-box;
    .info {
      .close {
        width: 2.52rem;
        height: 0.92rem;
        line-height: 0.92rem;
        text-align: center;
        font-size: 0.3rem;
        font-weight: bold;
        color:rgba(126,23,165,1);
        background: url("../images/pop_btn.png");
        background-size: 100% 100%;
      }
      .desc{
        margin-top: .1rem;
        font-size:.2rem;
        font-weight:400;
        color:rgba(182,129,255,1);
      }
    }
    .pop_close {
      position: absolute;
      right: .65rem;
      top: 2.05rem;
      width: .41rem;
      height: .41rem;
      background: url("../images/close.png");
      background-size: 100% 100%;
    }
  }
</style>
