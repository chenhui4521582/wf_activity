<template>
  <transition name="scalc">
    <div class="rule" @touchmove.prevent v-if="showRule">
      <div class="mask"></div>
      <div class="box">
        <div class="title">活动规则</div>
        <div class="content">
          <div class="rule-text">
            1 参与本活动可免费获得{{rechargeNumber}}次翻倍机会;累计充值达到相应额度可获得额外的翻倍机会（累充从活动开始计）;
            <br>
            2 每次翻倍需拿出相应数量的金叶，拿出的金叶越多，奖励也越丰厚;
            <br>
            3 完成9个梯度的翻倍后，无法继续参与此活动。
          </div>
          <div class="rule-table">
            <div class="rule-title">
              <ul>
                <li>
                  <span>次数</span>
                  <span>获得翻倍资格</span>
                  <span>拿出金叶数</span>
                </li>
              </ul>
            </div>
            <div class="rule-list">
              <ul>
                <li v-for="(item, index) in list" :key="index">
                  <span>第{{item.sort}}次</span>
                  <span>{{!item.recharge?'赠送':'累充'+item.recharge+'元'}}</span>
                  <span>拿出{{item.betAmount}}金叶</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="closed" @click="hideRule"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'rule',
  props: {
    showRule: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: [
        { sort: 1, recharge: 0, betAmount: 188 },
        { sort: 2, recharge: 10, betAmount: 588 },
        { sort: 3, recharge: 50, betAmount: 4888 },
        { sort: 4, recharge: 120, betAmount: 10888 },
        { sort: 5, recharge: 300, betAmount: 25888 },
        { sort: 6, recharge: 500, betAmount: 42888 },
        { sort: 7, recharge: 900, betAmount: 98888 },
        { sort: 8, recharge: 1500, betAmount: 148888 },
        { sort: 9, recharge: 2500, betAmount: 248888 }
      ]
    }
  },
  computed: {
    rechargeNumber () {
      let rechargeList = this.list.filter(element => {
        return element.recharge === 0
      })
      return rechargeList.length
    }
  },
  methods: {
    hideRule () {
      this.$emit('hideRule')
    }
  }
}
</script>



<style scoped lang="less">
.rule {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 10;
  .mask {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .box {
    position: absolute;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    width: 5.7rem;
    .title {
      height: 0.82rem;
      line-height: 0.82rem;
      text-align: center;
      color: #fdbe68;
      font-size: 0.36rem;
      background: #a8232c;
      font-weight: bold;
      border-radius: 10px 10px 0 0;
    }
    .content {
      padding: 0.35rem;
      border-radius: 0 0 10px 10px;
      background: #fdbe68;
      .rule-text {
        margin-bottom: 0.1rem;
        font-size: 0.24rem;
        color: #c23834;
        line-height: 0.34rem;
      }
      .rule-table {
        text-align: center;
        border: 1px solid #c23834;
        .rule-title {
          font-size: 0.24rem;
          color: #f4e19e;
          background: #c23834;
          border-bottom: 1px solid #c23834;
          height: 0.46rem;
          line-height: 0.46rem;
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              flex: 1;
              &:first-child {
                flex: 0.94rem 0 0;
              }
              &:last-child {
                flex: 2.18rem 0 0;
              }
            }
          }
        }
        .rule-list {
          font-size: 0.18rem;
          color: #c23834;
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 0.38rem;
            line-height: 0.38rem;
            &:not(:last-child) {
              border-bottom: 1px solid #c23834;
            }
            span {
              flex: 1;
              height: 0.38rem;
              line-height: 0.38rem;
              white-space: nowrap;
              &:first-child {
                flex: 0.94rem 0 0;
                border-right: 1px solid #c23834;
              }
              &:last-child {
                flex: 2.18rem 0 0;
                border-left: 1px solid #c23834;
              }
            }
          }
        }
      }
    }
    .closed {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      margin-left: -0.3rem;
      width: 0.6rem;
      height: 0.6rem;
      background: url("../images/closed_icon.png") no-repeat center center /
        100% 100%;
    }
  }
}
.scalc-enter-active {
  animation: fadeAnimation 0.3s ease-in-out;
}
@keyframes fadeAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
