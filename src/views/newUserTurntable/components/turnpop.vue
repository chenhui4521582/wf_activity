<template>
  <div class="turnpop">
    <div class="pop-mask"></div>
    <div class="turnpop-wrap">
      <div class="turnpop-content success" v-if="popType">
        <p>
          <span>¥</span><em>{{awardsInfo.price|priceFilter}}</em>
        </p>
        <div class="btn" @click="close(true)">再抽一次</div>
      </div>
      <div class="turnpop-content error" v-else>
        <p>
          非常遗憾
        </p>
        <p>
          您的抽奖机会已用完
        </p>
        <div class="btn" @click="close()">获得更多抽奖机会</div>
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
      return (val / 10).toFixed(1)
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
      width: 5.2rem;
      height: 7.2rem;
      box-sizing: border-box;
      font-size: 0.24rem;
      font-weight: 500;
      color: #666666;
      line-height: 0.36rem;
      &.success {
        .bgWithFull("../img/success-bg.png");
        color: #fff;
        p {
          padding: 4.06rem 1.38rem 0;
          span {
            font-size: 0.4rem;
            margin-right: 0.2rem;
          }
          em {
            font-size: 0.8rem;
          }
        }
      }
      &.error {
        padding: 3.96rem 0.44rem 0;
        text-align: center;
        .bgWithFull("../img/error-bg.png");
        color: #fdfdeb;
        line-height: 0.48rem;
        p:first-child {
          font-size: 0.36rem;
        }
        p:last-child {
          font-size: 0.3rem;
        }
      }
      .btn {
        width: 2.8rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        color: #fff;
        margin: 0.9rem auto 0;
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
