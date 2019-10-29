<template>
  <div class="turnpop">
    <div class="pop-mask"></div>
    <div class="turnpop-wrap">
      <div class="turnpop-content success" v-if="popType">
        <h1>恭喜获得</h1>
        <p>
          <span>¥</span><em>{{awardsInfo.awardsAmount|priceFilter}}</em>
        </p>
        <div class="btn btn-1" @click="close(true)"></div>
      </div>
      <div class="turnpop-content error" v-else>
        <h1>温馨提示</h1>
        <p>
          很遗憾，您的抽奖机会已用完
        </p>
        <div class="btn btn-2" @click="close(true)"></div>
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
      type: Boolean,
      default: false
    },
    awardsInfo: {
      type: Object,
      default: () => { }
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
.turnpop {
  .turnpop-wrap {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .turnpop-content {
      width: 5.8rem;
      height: 7.06rem;
      padding: 2rem 0.6rem 0;
      box-sizing: border-box;
      font-size: 0.24rem;
      font-weight: 500;
      line-height: 0.36rem;
      color: #936855;
      h1 {
        color: #ff5900;
        font-size: 0.45rem;
        text-align: center;
        margin-bottom: 0.38rem;
      }
      .bgWithFull("../img/pop-bg.png");
      &.success {
        p {
          color: #fff;
          margin: 0.92rem auto 0.72rem;
          width: 3rem;
          height: 1.28rem;
          line-height: 1.26rem;
          .bgWithFull("../img/money-bg.png");
          box-sizing: border-box;
          display: flex;
          align-items: baseline;
          span {
            font-size: 0.4rem;
            margin: 0 0.1rem 0 0.2rem;
            font-weight: normal;
          }
          em {
            font-size: 0.8rem;
          }
        }
      }
      &.error {
        text-align: center;
        p {
          margin-top: 1.38rem;
          margin-bottom: 1.24rem;
          font-size: 0.3rem;
        }
      }
      .btn {
        width: 3.86rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        margin: 0 auto;
        &.btn-1 {
          .bgWithFull("../img/btn-1.png");
        }
        &.btn-2 {
          .bgWithFull("../img/btn-2.png");
        }
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
