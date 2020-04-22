<template>
  <header>
    <section class="top">
      <div class="left" @click="back()">返回</div>
      <div class="right" @click="showPop(0)">规则</div>
    </section>
    <section class="bottom">
      <div class="left" @click="showPop(2)">攻略<span>+</span>奖励</div>
      <div class="right" @click="showDropDown()">排行榜></div>
    </section>
  </header>
</template>

<script>
export default {
  name: '',
  methods: {
    back () {
      GLOBALS.marchSetsPoint('A_H5PT0277003302') // H5平台-超级大赢家活动-返回按钮点击
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
    },
    showPop (type) {
      switch (type) {
        case 0:
          GLOBALS.marchSetsPoint('A_H5PT0277003305') // H5平台-超级大赢家活动-规则按钮点击
          break
        case 2:
          GLOBALS.marchSetsPoint('A_H5PT0277003303') // H5平台-超级大赢家活动-攻略奖励按钮点击
          break

        default:
          break
      }
      this.$emit('showPop', type)
    },
    showDropDown () {
      GLOBALS.marchSetsPoint('A_H5PT0277003304') // H5平台-超级大赢家活动-排行榜按钮点击
      this.$emit('showDropDown', 2)
    }
  }
}
</script>

<style lang="less" scoped>
header {
  section {
    display: flex;
    justify-content: space-between;
    div {
      width: 0.48rem;
      box-sizing: border-box;
      word-break: break-all;
      color: #c5e4ff;
      background: rgba(86, 87, 230, 0.7);
      text-align: center;
      line-height: 1;
      padding: 0.09rem;
      &.left {
        padding-right: 0.09rem;
        border-radius: 0 0.16rem 0.16rem 0;
      }
      &.right {
        padding-left: 0.09rem;
        border-radius: 0.16rem 0 0 0.16rem;
      }
    }
  }
  .bottom {
    padding-top: 0.06rem;
    .left {
      max-height: 1.32rem;
      span {
        display: block;
        line-height: 0.18rem;
      }
    }
    .right {
      margin-top: 0.06rem;
      width: 0.66rem;
      height: 1.58rem;
      color: #fff;
      background: url('../img/rank-icon.png') no-repeat center top;
      background-size: 100% 100%;
      padding: 0.62rem 0.18rem 0.1rem 0.25rem;
    }
  }
}
</style>
