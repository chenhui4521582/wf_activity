<template>
  <div class="rule">
    <div class="pop-mask"></div>
    <div class="rule-wrap">
      <div class="rule-content">
        <p>
          1.活动开放时间：新用户注册1-7天内；
        </p>
        <p>
          2.活动期间，新用户每日有1次免费转盘抽奖机会；
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
        <div class="btn" @click="close()">我知道了</div>
      </div>
      <div class="close" @click="close()"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    close () {
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
      width: 5.2rem;
      height: 8.3rem;
      padding: 3.22rem 0.44rem 0;
      box-sizing: border-box;
      font-size: 0.24rem;
      font-weight: 500;
      color: #666666;
      line-height: 0.36rem;
      .bgWithFull("../img/rule-bg.png");
      .btn {
        width: 2.8rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        color: #fff;
        margin: 0.18rem auto 0;
        .bgWithFull("../img/btn-bg.png");
      }
    }
    .close {
      width: 0.7rem;
      height: 0.7rem;
      .bgWithFull("../img/close.png");
      margin: 0.3rem auto 0;
    }
  }
}
</style>
