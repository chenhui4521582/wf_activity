<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <div class="bonus-success">
      <p class="title title0">活动规则</p>
      <div class="desc">
        <p v-if="actInfo">
          活动时间：{{actInfo.beginDate}}~{{actInfo.endDate}}
        </p>
        <p>
          1.在活动页面点击价格按钮，即可直接购买充值加赠礼包；
        </p>
        <p>
          2.购买礼包所获的加赠礼品，需在多多玩APP手机号登录后领取；
        </p>
        <p>
          3.若未绑定手机号请先绑定后，再用此手机号登录多多玩APP，加赠立即到账；
        </p>
        <p>
          4.活动结束后3天内，可继续手机号登录多多玩APP领奖；超过3天仍未领取，视为放弃加赠。
        </p>
        <p>
          5.登录后您可直接在多多玩APP内的活动中心，直接购买充值加赠礼包，获得加赠。
        </p>
        <p>
          多多玩游戏平台对本活动具有最终解释权。
        </p>
      </div>
      <div class="close" @click="close"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
    }
  },
  props: {
    actInfo: {
      type: Object,
      default: null
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  mounted () {
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
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.bonus-success {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4.2rem;
  height: 5.8rem;
  background: linear-gradient(0deg, #d74b3e, #fcab66);
  border-radius: 0.32rem;
  z-index: 11;
  .title {
    width: 100%;
    font-size: 0.26rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin: 0.3rem auto 0.36rem;
  }
  .desc {
    font-size: 0.22rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    width: 100%;
    padding: 0 0.36rem;
    box-sizing: border-box;
    height: 4.52rem;
    overflow-x: hidden;
    overflow-y: scroll;
    p {
      line-height: 0.33rem;
      text-align: justify;
      word-break: break-all;
    }
  }
  .close {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.9rem;
    margin: auto;
    width: 0.6rem;
    height: 0.6rem;
    background: url('../images/close.png');
    background-size: 100% 100%;
  }
}
</style>
