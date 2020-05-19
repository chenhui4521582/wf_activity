<template>
  <div class="guide" v-show="value">
    <div class="mask"></div>
    <div class="guide-box" @click="hide">
      <!-- 第一天 -->
      <div class="first-day" v-if="guideInfo && guideInfo.firstDay">
        <img class="inner-img" src="../img/popup2.png" alt="">
      </div>
      <template v-else>
        <!-- 昨天有奖品 -->
        <div class="yesteday yes" v-if="hasAward">
          <div class="item" v-if="guideInfo.hfqAmount">
            <img src="../img/award1.png" alt="">
            <p>{{guideInfo.hfqAmount}}元话费</p>
          </div>
          <div class="item" v-if="guideInfo.jdkAmount">
            <img src="../img/award3.png" alt="">
            <p>{{guideInfo.jdkAmount}}元京东卡</p>
          </div>
          <div class="item" v-if="guideInfo.jyzAmount">
            <img src="../img/award2.png" alt="">
            <p>{{guideInfo.jyzAmount}}金叶子</p>
          </div>
        </div>
        <!-- 昨天无奖品 -->
        <div class="yesteday no" v-else>
          <img class="inner-img" src="../img/popup3.png" alt="">
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guide',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    guideInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    hasAward () {
      if(this.guideInfo.hfqAmount || this.guideInfo.jdkAmount || this.guideInfo.jyzAmount) {
        return true
      }
      return false
    }
  },
  methods: {
    goGame( item ) {
      if (item.url) {
        window.location.href = item.url
      }
    },
    hide(btn) {
      this.$emit('input', false)
    },
    show() {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.guide {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: center;
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 14;
  }
  .guide-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 15;
    .first-day,.yesteday {
      width: 6.4rem;
      height: 6.58rem;
      &.yes {
        padding: 3.1rem .75rem 0;
        display: flex;
        justify-content: space-around;
        background: url(../img/popup1.png) no-repeat center top;
        background-size: 100% 100%;
        .item {
          img {
            width: 1.64rem;
            height: .96rem;
          }
          p {
            text-align: center;
            white-space: nowrap;
            font-size: .2rem;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
