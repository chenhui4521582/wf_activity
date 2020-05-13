<template>
  <div class="everyday-recharge">
    <!-- 返回 -->
    <div class="back">返回</div>
    <!-- 规则 -->
    <div class="rule">规则</div>
    <!-- 倒计时 -->
    <count-down />
    <!-- tab -->
    <div class="tab">
      <div class="item day" v-show="currentIndex == 0" @click="handleNavClick(1)"></div>
      <div class="item week" v-show="currentIndex == 1" @click="handleNavClick(0)"></div>
    </div>
    <div class="list">
      <div class="top">·奖励请在 <span>每天24点</span> 前及时领取</div>
      <div class="item">
        <div class="title">
          <div class="key">
            <span>累计充值5000元</span>
          </div>
          <div class="value">
            <span class="finish-num">5000</span>/<span class="total-num">5000</span>
          </div>
        </div>
        <div class="content">
          <div class="award-img"></div>
          <div class="award-name"></div>
          <div class="btns">
            <div class="finish"></div>
            <div class="finished"></div>
            <div class="pay"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Rule from './components/rule'
import CountDown from './components/countDown'
import Services from '../../services/services'
import _get from 'lodash.get'
export default {
  name: 'masterStrategy',
  data: ()=>({
    currentIndex: 0,
    info: {},
    list: []
  }),
  components: {
    CountDown
    // Rule,
  },
  computed: {
    nav () {
      return _get(this.info, 'categoryList', [])
    },
    isShowRank () {
      return _get(this.info, 'isShowRank', false)
    },
    totalCount () {
      return _get(this.info, 'totalCount', 0)
    },
    showScroll () {
      return this.nav.length
    }
  },
  methods: {
    handleNavClick (index) {
      this.currentIndex = index
    },
    /** 返回首页 **/
    backHome () {
      window.location.href = "//wap.beeplaying.com/xmWap/"
    },
    /** 打开规则 **/
    openRule () {
      this.showRule = true
    },
    /** 获取活动信息 **/
    _getInfo () {
      Services.getInfo().then(res => {
        console.log(res)
      })
    },
    /** 领取奖励 **/
    _receiveAward () {
      Services.receiveAwards().then(res => {
        console.log(res)
      })
    },
    jump () {
      GLOBALS.marchSetsPoint('A_H5PT0282003394')
      window.location.href = 'https://wj.qq.com/s2/5837168/9470/'
    },
    goRanking () {
      GLOBALS.marchSetsPoint('A_H5PT0282003392')
      this.$router.push({
        name: 'ranking'
      })
    }
  },
  mounted() {
    this._getInfo()
  }
}
</script>
<style lang="less" scoped>
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.everyday-recharge {
  position: relative;
  padding: 1.98rem 0 .28rem;
  background: url(./img/top.png) no-repeat center top #27040B;
  background-size: 100% auto;
  .back,.rule {
    position: absolute;
    top: .2rem;
    width: .8rem;
    height: .42rem;
    text-align: center;
    line-height: .44rem;
    font-size: .24rem;
    font-weight: bold;
    color: #fff;
    border-radius: .21rem;
  }
  .back {
    left: .1rem;
    background: #68BEFE;
  }
  .rule {
    right: .1rem;
    background: #A991FF;
  }
  .tab {
    margin: 0 auto .23rem;
    width: 5.8rem;
    height: .76rem;
    .day {
      width: 100%;
      height: 100%;
      background: url(./img/tab.png) no-repeat center top;
      background-size: 100% 100%;
    }
    .week {
      width: 100%;
      height: 100%;
      background: url(./img/tab1.png) no-repeat center top;
      background-size: 100% 100%;
    }
  }
  .list {
    overflow: hidden;
    margin: 0 auto;
    width: 6.8rem;
    height: 13.81rem;
    background: url(./img/body.png) no-repeat center top;
    background-size: 100% 100%;
    .top {
      margin: .5rem 0;
      text-align: center;
      height: .35rem;
      line-height: .35rem;
      color: #fff;
      span {
        padding: 0 .1rem;
        border-radius: .08rem;
        background: #4F1C95;
      }
    }
    .item {
      margin: 0 auto .25rem;
      width: 6rem;
      height: 2.22rem;
      background: url(./img/item.png) no-repeat center top;
      background-size: 100% 100%;
      .title {
        padding: 0 .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .44rem;
        .key {
          color: #E96023;
        }
        .value {
          .finish-num {
            color: #FD0942;
          }
          .total-num {
             color: #6124C4;
          }
        }
        .center {
          margin-top: .2rem;
        }
      }
    }
  }
}
</style>