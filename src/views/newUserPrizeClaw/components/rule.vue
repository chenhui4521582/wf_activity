<template>
  <div class="rule">
    <div class="pop-mask"></div>
    <div class="rule-wrap">
      <div class="rule-content">
        <h1>玩法说明</h1>
        <p>
          1.活动开放时间：新用户注册1-7天内；
        </p>
        <p>
          2.活动期间，新用户每日有1次免费抓娃娃的机会；
        </p>
        <p>
          3.免费抽奖机会用完后，用户可通过完成页面下方的每日任务，获得更多抽奖机会；
        </p>
        <p>
          4.参与活动的用户即有机会获得奖品，此活动为概率中奖；
        </p>
        <p>
          5.在法律允许的范围内最终解释权归玩蜂所有。
        </p>
        <div class="btn" @click="close(1)"></div>
      </div>
      <div class="close" @click="close()"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: '',
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0200002049') // H5平台-新手转盘活动页-玩法说明弹窗加载完成
  },
  methods: {
    close (type) {
      if (type) {
        GLOBALS.marchSetsPoint('A_H5PT0200002050') // H5平台-新手转盘活动页-玩法说明弹窗-我知道了点击
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0200002051') // H5平台-新手转盘活动页-玩法说明弹窗-关闭点击
      }
      this.$emit('on-close')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../common/css/base.css";
.bgWithFull(@url) {
  background: url(@url) no-repeat center center / 100% 100%;
}
.pop-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
}
.rule {
  .rule-wrap {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .rule-content {
      width: 5.8rem;
      height: 7.06rem;
      padding: 2rem 0.5rem 0;
      box-sizing: border-box;
      font-size: 0.24rem;
      font-weight: 500;
      line-height: 0.36rem;
      color: #936855;
      h1 {
        color: #ff5900;
        font-size: 0.45rem;
        text-align: center;
        margin-bottom: 0.3rem;
      }
      .bgWithFull("../img/pop-bg.png");
      .btn {
        width: 3.86rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #fff;
        margin: 0 auto;
        .bgWithFull("../img/btn-3.png");
      }
    }
    .close {
      width: 0.78rem;
      height: 0.78rem;
      .bgWithFull("../img/close.png");
      position: absolute;
      right: 0;
      top: 1.6rem;
    }
  }
}
</style>
