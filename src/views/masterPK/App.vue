<template>
  <div class="master-pk">
    <!-- 返回按钮 -->
    <div class="back-btn" @click="backHome">
      <img class="inner-img" src="./img/back-icon.png" alt="">
    </div>
    <!-- 规则按钮 -->
    <div class="rule-btn" @click="openRule">
      <img class="inner-img" src="./img/rule-icon.png" alt="">
    </div>
    <!-- 倒计时 -->
    <count-down :time="countdown" @countDownCallback="countDownCallback"/>
    <!-- 奖池 -->
    <div class="prize">
      <div class="red item">加入任一队伍即可瓜分5000元话费，玩家贡献值越高，奖励越多</div>
      <div class="blue item">获胜队赢80%奖池奖励，惜败队获20%。队员贡献值越高，奖励越多</div>
      <div class="jeckpot">
        奖池已累计 元京东券
        <img class="jeckpot-icon" src="./img/jeckpot-icon.png" alt="">
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="ranking">
      <div class="total">
        <div class="item red">
          <p class="title">红队</p>
          <p class="hot-num">火力值<img src="./img/hot-icon.png" alt="">：<span>16,88888</span></p>
          <p class="hot-people">火力人数：<span>16,88888</span></p>
        </div>
        <div class="item blue">
          <p class="title">红队</p>
          <p class="hot-num">火力值<img src="./img/hot-icon.png" alt="">：<span>16,88888</span></p>
          <p class="hot-people">火力人数：<span>16,88888</span></p>
        </div>
      </div>
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
// import Popup from './components/popup'
import Services from './services/services'
import utils from './components/utils'
import _get from 'lodash.get'
export default {
  name: 'masterPK',
  data: ()=>({
    activitiesInfo: {},
    countdown: '',
    showPopup: false,
    popupType: 0
  }),
  components: {
    CountDown,
    // Popup
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
    },
    countDownCallback() {
      this.activitiesInfo.state = 2
    }
  },
  mounted() {
    this._getInfo()
  }
}
</script>
<style lang="less">
@import url('../../common/css/base.less');
@import url('../../../static/iconfont/iconfont.css');
* {
  box-sizing: border-box;
}
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.master-pk {
  padding: 1.93rem 0 1.3rem;
  min-height: 100vh;
  background: url(./img/top-bg.png) no-repeat center top #120C40;
  background-size: 100% 3.1rem;
  .back-btn {
    position: absolute;
    left: 0;
    top: .17rem;
    width: .78rem;
    height: .56rem;
  }
  .rule-btn {
    position: absolute;
    top: .97rem;
    left: 0;
    width: .78rem;
    height: .56rem;
  }
  .prize {
    position: relative;
    margin: 0 auto .15rem; 
    padding: .97rem .24rem;
    display: flex;
    justify-content: space-between;
    width: 6.64rem;
    height: 3.83rem;
    background: url(./img/banner-bg.png) no-repeat center center;
    background-size: 100% 100%;
    .item {
      padding: .66rem .2rem 0;
      width: 3rem;
      height: 1.8rem;
      font-size: .22rem;
      &.red {
        color: #FFEBEE;
        background: url(./img/prize-blue.png) no-repeat center center;
        background-size: 100% 100%;
      }
      &.blue {
        color: #E1E2FF;
        background: url(./img/prize-red.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .jeckpot {
      position: absolute;
      bottom: .08rem;
      left: .88rem;
      width: 4.89rem;
      height: 1.09rem;
      background: url(./img/jeckpot-bg.png) no-repeat center center;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .22rem;
      color: #A4152E;
      font-weight: bold;
      span {
        color: #201FF1;
        font-size: .26rem;
      }
      .jeckpot-icon {
        margin-left: .2rem;
        width: .33rem;
        height: .33rem;
      }
    }
  }
  .ranking {
    position: relative;
    margin: 0 auto;
    width: 6.87rem;
    min-height: 6.6rem;
    background: url(./img/ranking-bg2.png) no-repeat center top;
    background-size: 100% 6.6rem;
    .total {
      position: absolute;
      top: -.31rem;
      left: .21rem;
      padding-top: 1.43rem;
      width: 6.4rem;
      height: 3.3rem;
      background: url(./img/total-bg.png) no-repeat center top;
      background-size: 100% 100%;
      display: flex;
      .item {
        position: relative;
        width: 50%;
        color: #FFFFFF;
        font-size: .22rem;
        span {
          color: #FFF113;
          font-weight: bold;
        }
        .title {
          margin-bottom: .2rem;
          text-indent: .73rem;
          font-size: .28rem;
          font-weight:800;
        }
        .hot-num {
          margin-bottom: .1rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            width: .22rem;
            height: .26rem;
          }
        }
        &.red {
          padding-left: .29rem;
        }
        &.blue {
          padding-left: .8rem;
        }
        .peckpot-icon {
          position: absolute;
          top: .97rem;
          width: .77rem;
          height: .83rem;
        }
      }
    }
  }
}

</style>
