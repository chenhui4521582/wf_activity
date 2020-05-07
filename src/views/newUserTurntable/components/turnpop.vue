<template>
  <div class="turnpop">
    <div class="pop-mask"></div>
    <div class="turnpop-wrap">
      <div class="turnpop-content" :class="`type-${popType}`">
        <template v-if="popType===0">
          <p>
            非常遗憾
          </p>
          <p>
            您的抽奖机会已用完
          </p>
          <p class="sub-desc">
            <template v-if="info.newUserInfo.envelopeRmb>=info.convertConsumeRmb">
              达到体现门槛，快去领话费吧
            </template>
            <template v-else>
              还差{{info.convertConsumeRmb-info.newUserInfo.envelopeRmb}}元就可以提现了
            </template>
          </p>
          <div class="btn" @click="close(true)">获得更多抽奖机会</div>
        </template>
        <template v-if="popType===1">
          <p>
            话费红包 x{{awardsInfo.awardsEnvelopeNum}} 预计{{awardsInfo.awardsEnvelopeRmb}}元<br />
            <template v-if="awardsInfo.envelopeRmb>=info.convertConsumeRmb">
              达到体现门槛，快去领话费吧
            </template>
            <template v-else>
              还差{{info.convertConsumeRmb-awardsInfo.envelopeRmb}}元就可以提现了
            </template>
          </p>
          <div class="btn" @click="close(true)">再抽一次</div>
        </template>
        <template v-if=""></template>
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
  props: {
    popType: {
      type: Number,
      default: 0 // 0 没有机会 1 转盘抽奖 2
    },
    awardsInfo: {
      type: Object,
      default: () => ({})
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  filters: {
    priceFilter (val) {
      return (val / 10).toFixed(1) || 0
    }
  },
  methods: {
    close (type) {
      this.$emit('on-close', type)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../common/css/base.css';
.bgWithFull(@url) {
  background: url(@url) no-repeat center center;
  background-size: 100% 100%;
}
.pop-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
}
.turnpop {
  .turnpop-wrap {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .turnpop-content {
      width: 5.2rem;
      height: 7.2rem;
      box-sizing: border-box;
      font-size: 0.24rem;
      font-weight: 500;
      color: #666666;
      line-height: 0.36rem;
      .btn {
        width: 2.8rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        color: #fff;
        margin: auto;
        .bgWithFull('../img/btn-bg.png');
      }
      &.type-1 {
        .bgWithFull('../img/success-bg.png');
        p {
          color: #666;
          padding: 4.8rem 0 0;
          text-align: center;
          font-size: 0.26rem;
        }
        .btn {
          margin-top: 0.4rem;
        }
      }
      &.type-0 {
        padding: 3.96rem 0.44rem 0;
        text-align: center;
        .bgWithFull('../img/error-bg.png');
        color: #fdfdeb;
        line-height: 0.48rem;
        p:nth-child(1) {
          font-size: 0.36rem;
        }
        p:nth-child(2) {
          font-size: 0.3rem;
        }
        p:nth-child(3) {
          color: #666;
          font-size: 0.26rem;
          margin-top: 0.3rem;
        }
        .btn {
          margin-top: 0.3rem;
        }
      }
    }
    .close {
      width: 0.7rem;
      height: 0.7rem;
      .bgWithFull('../img/close.png');
      margin: 0.3rem auto 0;
    }
  }
}
</style>
