<template>
  <div class="welrafe">
    <!-- 返回按钮 -->
    <div class="back-btn">
      <img src="./img/back-icon.png" alt="">
    </div>
    <!-- 规则按钮 -->
    <div class="rule-btn">
      <img src="./img/rule-icon.png" alt="">
    </div>
    <!-- 倒计时 -->
    <count-down />
    <!-- 导航 -->
    <div class="nav">
      <div :class="[currentIndex == 1 ? 'seal active' : 'seal']" @click="handleNavClick(1)"/>
      <div :class="[currentIndex == 2 ? 'exchange active' : 'exchange']" @click="handleNavClick(2)"/>
      <div :class="[currentIndex == 3 ? 'ranking active' : 'ranking']" @click="handleNavClick(3)"/>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 收集图章 -->
      <get-seal v-if="currentIndex == 1"/>
      <!-- 兑换大奖 -->
      <exchange-prize v-if="currentIndex == 2"/>
      <!-- 排行榜 -->
      <ranking v-if="currentIndex == 3"/>
    </div>
  </div>
</template>
<script>
import CountDown from './components/countDown'
import GetSeal from './components/getSeal'
import ExchangePrize from './components/exchangePrize'
import Ranking from './components/Ranking'
// import Rule from './components/rule'
// import Popup from './components/popup'
import Services from './services/services'
import utils from './components/utils'
import _get from 'lodash.get'
export default {
  name: 'welrafe',
  data: ()=>({
    currentIndex: 1
  }),
  components: {
    CountDown,
    GetSeal,
    ExchangePrize,
    Ranking
    // Popup,
    // Rule,
  },
  computed: {
  },
  methods: {
    handleNavClick (index) {
      this.currentIndex = index
    }
  },
  mounted() {
    
  }
}
</script>
<style scoped lang="less">
@import '../../common/css/base.less';
@import url('../../../static/iconfont/iconfont.css');
* {
  box-sizing: border-box;
}
.welrafe {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background: url(./img/bg.png) no-repeat center top;
  background-size: 100% auto;
  .back-btn {
    position: absolute;
    left: 0;
    top: .2rem;
    width: .7rem;
    height: .45rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
  .rule-btn {
    position: absolute;
    top: .02rem;
    right: .02rem;
    width: 1.1rem;
    height: 1.3rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
  .nav {
    margin-bottom: .1rem;
    display: flex;
    justify-content: center;
    .seal {
      width: 2.02rem;
      height: .82rem;
      background: url(./img/nav1.png) no-repeat center top;
      background-size: 1.88rem .82rem;
      &.active {
        background: url(./img/nav1-active.png) no-repeat center center;
        background-size: 2.02rem .82rem;
      }
    }
    .exchange {
      width: 2.02rem;
      height: .82rem;
      background: url(./img/nav2.png) no-repeat center center;
      background-size: 1.88rem .82rem;
      &.active {
        background: url(./img/nav2-active.png) no-repeat center center;
        background-size: 2.02rem .82rem;
      }
    }
    .ranking {
      width: 2.02rem;
      height: .82rem;
      background: url(./img/nav3.png) no-repeat center center;
      background-size: 1.88rem .82rem;
      &.active {
        background: url(./img/nav3-active.png) no-repeat center center;
        background-size: 2.02rem .82rem;
      }
    }
  }
}
</style>
