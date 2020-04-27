<template>
  <div class="welrafe">
    <!-- 返回按钮 -->
    <div class="back-btn" @click="backHome">
      <img src="./img/back-icon.png" alt="">
    </div>
    <!-- 规则按钮 -->
    <div class="rule-btn" @click="openRule">
      <img src="./img/rule-icon.png" alt="">
    </div>
    <!-- 倒计时 -->
    <count-down :time="countdown"/>
    <!-- 导航 -->
    <div class="nav">
      <div :class="[currentIndex == 1 ? 'seal active' : 'seal']" @click="handleNavClick(1)"/>
      <div :class="[currentIndex == 2 ? 'exchange active' : 'exchange']" @click="handleNavClick(2)"/>
      <div :class="[currentIndex == 3 ? 'ranking active' : 'ranking']" @click="handleNavClick(3)"/>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 收集图章 -->
      <get-seal 
        v-if="currentIndex == 1" 
        :userInfo="userInfo" 
        @refrshUserInfo="_getInfo"
      />
      <!-- 兑换大奖 -->
      <exchange-prize 
        v-if="currentIndex == 2" 
        :userInfo="userInfo" 
        :awardsList="awardsList"
        @refrshUserInfo="_getInfo"
      />
      <!-- 排行榜 -->
      <ranking 
        v-if="currentIndex == 3" 
        :activitiesInfo="activitiesInfo"
      />
    </div>
    <!-- popup -->
    <popup 
      v-model="showPopup" 
      :popupType="popupType"
      :rankingAward="rankingAward"
      :myRank="myRank"
      :activitiesInfo="activitiesInfo"
    />
  </div>
</template>
<script>
import CountDown from './components/countDown'
import GetSeal from './components/getSeal'
import ExchangePrize from './components/exchangePrize'
import Ranking from './components/ranking'
import Popup from './components/popup'
import Services from './services/services'
import utils from './components/utils'
import _get from 'lodash.get'
export default {
  name: 'welrafe',
  data: ()=>({
    currentIndex: 1,
    userInfo: {},
    activitiesInfo: {},
    awardsList: [],
    countdown: '',
    showPopup: false,
    popupType: 0,
    rankingAward: [],
    myRank: []
  }),
  components: {
    CountDown,
    GetSeal,
    ExchangePrize,
    Ranking,
    Popup
  },
  methods: {
    handleNavClick (index) {
      this.currentIndex = index
    },
    /** 获取活动信息 **/
    _getInfo () {
      Services.getInfo().then(res => {
        const {code} = _get(res, 'data')
        if(code == 200) {
          this.userInfo = _get(res, 'data.data.userInfo', {})
          this.countdown = _get(res, 'data.data.countdown', '')
          this.awardsList = _get(res, 'data.data.awardsList', [])
          this.activitiesInfo = _get(res, 'data.data', {})
          if(_get(res, 'data.data.state') == 2) {
            this._getUserRanking()
            this.currentIndex = 3
            return 
          }
          if(_get(res, 'data.data.guidePopup', false)) {
            this.popupType = 2
            this.showPopup = true
            GLOBALS.marchSetsPoint('A_H5PT0278003316')
          }
        }
      })
    },
    /** 获取发榜数据 **/
    _getUserRanking () {
      Services.getUserRanking().then(res => {
        const {code} = _get(res, 'data')
        if(code == 200) {
          let popup = _get(res, 'data.data.popup', false)
          this.myRank = _get(res, 'data.data.myRank', 0)
          this.rankingAward = _get(res, 'data.data.awardsList', [])
          if(popup) {
            this.popupType = 9
            this.showPopup = true
            GLOBALS.marchSetsPoint('A_H5PT0278003330')
          }
        }
      })
    },
    openRule () {
      this.popupType = 1
      this.showPopup = true
      GLOBALS.marchSetsPoint('A_H5PT0278003317')
    },
    backHome() {
      window.location.href = "//wap.beeplaying.com/xmWap/"
      GLOBALS.marchSetsPoint('A_H5PT0278003318')
    }
  },
  mounted() {
    this._getInfo()
    GLOBALS.marchSetsPoint('P_H5PT0278', {
      source_address: navigator.referrer
    })
  }
}
</script>
<style lang="less">
@import url('../../common/css/base.less');
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
