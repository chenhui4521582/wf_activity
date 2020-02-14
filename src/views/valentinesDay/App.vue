<template>
  <div class="valentines">
    <!-- pannel1 -->
    <section class="pannel1">
      <div class="back" @click="backHome">返回</div>
      <!-- 倒计时 -->
      <count-down :time="info.countdown"/>
    </section>
    <!-- pannel2 -->
    <section class="pannel2">
      <img src="./img/icon2.png" alt="">
      <img src="./img/icon1.png" alt="">
    </section>
    <!-- pannel3 -->
    <section class="pannel3">
      <!-- 任务 -->
      <ul class="task">
        <li>
          <div class="icon">
            <div class="icon1"></div>
            <img src="./img/award-icon2.png" alt="">
          </div>
          <div class="text">
            <div class="title">每日付费达2元</div>
            <div class="progress">
              <div class="progress-wrap" :style="{width: countRechargeWidth()}"></div>
              <div class="progress-text">{{ info.rechargeAmount || 0 }}/2</div>
            </div>
          </div>
          <div class="btn play-game" v-if="info.rechargeStatus == 0" @click="gotoPay">去完成</div>
          <div class="btn" v-if="info.rechargeStatus == 1" @click="_getLoveNo(1)">立即领取</div>
          <div class="btn disable" v-if="info.rechargeStatus == 2">已领取</div>
        </li>
        <li>
          <div class="icon">
            <div class="icon1"></div>
            <img src="./img/award-icon2.png" alt="">
          </div>
          <div class="text">
            <div class="title">每日游戏消耗金叶达5万</div>
            <div class="progress">
              <div class="progress-wrap" :style="{width: countAmountWidtht()}"></div>
              <div class="progress-text">{{ info.bettingAmount || 0 | amountFilter }}/5万</div>
            </div>
          </div>
          <div class="btn play-game" v-if="info.bettingStatus == 0" @click="playGame">去完成</div>
          <div class="btn" v-if="info.bettingStatus == 1" @click="_getLoveNo(2)">立即领取</div>
          <div class="btn disable" v-if="info.bettingStatus == 2">已领取</div>
        </li>
      </ul>
      <!-- 抽红包 -->
      <div class="lotter">
        <!-- 标题 -->
        <div class="title">
          <h5>2.18最高抽520元红包</h5>
          <p class="line"></p>
        </div>
        <div class="title1">累计30颗甜心可参与抽红包，甜心还可通过购买礼盒获得哟！</div>
        <!-- 奖励列表 -->
        <ul class="lotter-list">
          <li v-for="(item, index) in lotter" :key="index">
            <div class="lotter-center" :class="{active: info.sweetHeartNum >= item.number}">
              <p>{{item.text}}</p>
              <p>奖励</p>
            </div>
            <div class="loveNo">
              <img src="./img/love-icon.png" alt="" class="love-icon">
              <div class="love-number">{{item.number}}</div>
            </div>
            <div class="right-icon"></div>
          </li>
        </ul>
        <!-- 当前爱心数量 -->
        <div class="current-loverNo">
          当前甜心：<span>{{info.sweetHeartNum || 0}}个</span>  
        </div>
        <!-- 抽奖按钮 -->
        <div class="lotter-btn fade" v-if="info.lottery" @click="_getLotter"></div>
        <div class="lotter-btn disable" v-else @click="lotteryDisable"></div>
      </div>
    </section>
    <!-- pannel4 -->
    <section class="pannel4">
      <ul class="card-list">
        <div class="item" v-for="(item, index) in cardList" :key="index" @click="gotoPayCard(item, index)">
          <img :src="item.productIcon | filter" alt="">
        </div>
      </ul>
    </section>
    <!-- pannel5 -->
    <section class="pannel5">
      <div class="title">
        <img src="./img/rule-title.png" alt="">
      </div>
      <div class="text">
        <h5>①活动时间</h5>
        <p>2020年2月14日-2月18日，2月18日抽红包</p>
        <h5>②一重礼：集甜心抽红包</h5>
        <p>• 活动期间通过完成每日活动任务或购买限定礼盒，即可获得甜心；</p>
        <p>• 累计甜心达到30颗以上，2月18日可到活动页抽红包（只可抽取一次）。累计甜心越多，红包越大，最高获得520元奖励；</p>
        <p>• 在斗地主、麻将、跑得快、枪火英雄、套圈、天天飞机大战中消耗金叶不计入活动任务中；</p>
        <p>• 每日活动任务0点刷新。</p>
        <h5>③二重礼：限定礼盒买一送一</h5>
        <p>买限定礼盒，再送小礼盒！优惠多多，并额外获得甜心。</p>
        <h5>④小提示</h5>
        <p>• 甜心在活动结束后将清零作废；</p>
        <p>• 2月18日未抽取的红包，过期不予补偿；</p>
        <p>• 如有任何疑问，可咨询在线客服。</p>
      </div>
    </section>
    <!-- 返回顶部 -->
    <div class="backTop" v-if="showBackTop" @click="handleBackTop">
      <img src="./img/back-top.png" alt="">
    </div>
    <Popup v-model="showPopup" :popupStatus="popupStatus" :award="award" :love="love" :sweetHeartNum="info.sweetHeartNum"/>
  </div>
</template>
<script>
import Loading from '@/components/common/loading'
import CountDown from './countDown'
import Popup from './popup'
import Services from './services/services'
import utils from './components/utils'
import _get from 'lodash.get'
export default {
  name: 'valentinesDay',
  data: ()=>({
    info: {},
    type: 1,
    lotter: [
      { text: '最高10元', number: 30 },
      { text: '最高50元', number: 70 },
      { text: '最高150元', number: 150 },
      { text: '最高520元', number: 300 },
    ],
    cardList: [],
    showPopup: false,
    popupStatus: 0,
    love: {
      number: 0,
      lottery: false,
      lackNum: 0
    },
    award: {
      awardsName: '' ,
      awardsNum: 0,
      awardsType: ''
    },
    showBackTop: false
  }),
  filters: {
    amountFilter(value) {
      if(value >= 10000) {
        return (value / 10000).toFixed(2) + '万'
      }
      return value
    }
  },
  components: {
    Loading,
    Popup,
    CountDown
  },
  computed: {
    showList() {
      return this.optimumTimeList.concat(this.highlightTimeList).length
    }
  },
  methods: {
    /** 返回 **/
    backHome() {
      window.location.href = "//wap.beeplaying.com/xmWap/"
      GLOBALS.marchSetsPoint('A_H5PT0244002821')
    },
    countRechargeWidth() {
      if(this.info.rechargeAmount) {
        if(this.info.rechargeAmount >= 2) {
          return '100%'
        }else {
          return Math.floor((this.info.rechargeAmount / 2) * 100) + '%'
        }
        return 
      }
      return '0%'
    },
    countAmountWidtht() {
      if(this.info.bettingAmount ) {
        if(this.info.bettingAmount >= 50000) {
          return '100%'
        }else {
          return Math.floor((this.info.bettingAmount / 50000) * 100) + '%'
        }
        return 
      }
      return '0%'
    },
    gotoPay() {
      GLOBALS.marchSetsPoint('A_H5PT0244002822')
      location.href = '//wap.beeplaying.com/xmWap/#/payment/'
    },
    gotoPayCard(item, index) {
      let channel = localStorage.getItem('APP_CHANNEL')
      let originDeffer = `//wap.beeplaying.com/activities/valentinesDay.html?channel=${channel}&blindBox=true`
      localStorage.setItem('payment', JSON.stringify(item))
      localStorage.setItem('originDeffer', originDeffer)
      switch(index) {
        case 0 :
          GLOBALS.marchSetsPoint('A_H5PT0244002828')
          break;
        case 1 :
          GLOBALS.marchSetsPoint('A_H5PT0244002829')
          break;
        case 2 :
          GLOBALS.marchSetsPoint('A_H5PT0244002830')
          break;
      }
      window.location.href="//wap.beeplaying.com/xmWap/#/payment/paymentlist"

    },
    lotteryDisable() {
      this.$toast.show({ message:'当前不可抽奖' })
    },
    onScroll() {
      let _this = this
      window.onscroll = function() {
        let t = document.documentElement.scrollTop || document.body.scrollTop
        if(t >= 436) {
          _this.showBackTop = true
        }
        if(t <= 436) {
          _this.showBackTop = false
        }
      }
    },
    handleBackTop() {
      this.showBackTop = false
      window.scrollTo(0, 0)
    },
    /** 打开更多游戏弹框 **/
    playGame() {
      this.showPopup = true
      this.popupStatus = 4
      GLOBALS.marchSetsPoint('A_H5PT0244002824')
    },
    /** 获取情人节活动数据 **/
    _getValentinesInfo() {
      Services.getValentinesInfo().then(res=> {
        let {code, message, data} = _get(res, 'data')
        if(code == 200) {
          this.info = _get(res, 'data.data', {})
          /** 活动开奖当天弹框 **/
          if(this.info.popup) {
            this.showPopup = true
            this.popupStatus = 3
            GLOBALS.marchSetsPoint('A_H5PT0244002831')
          }
          if(this.info.state == 2) {
            this.$toast.show({ message:'当前活动已结束!' })
          }
        }
      })
    },
    /** 领取爱心接口 **/
    _getLoveNo(type) {
      Services.getLoveNo(type).then(res=> {
        let {code, message, data} = _get(res, 'data')
        if(code == 200) {
          this.love.number = _get(res, 'data.data.receiveNum', 0)
          this.love.lottery = _get(res, 'data.data.lottery', false)
          this.love.lackNum = _get(res, 'data.data.lackNum', 0)
          if(this.love.number > 0) {
            this.showPopup = true
            this.popupStatus = 1
            GLOBALS.marchSetsPoint('A_H5PT0244002826')
          }
          this._getValentinesInfo()
        }else {
          this.$toast.show({message})
        }
        switch(type) {
          case 1: 
            GLOBALS.marchSetsPoint('A_H5PT0244002823')
            break;
          case 2: 
            GLOBALS.marchSetsPoint('A_H5PT0244002825')
            break;
        }
      })
    },
    /** 抽红包接口 **/
    _getLotter() {
      Services.getLotter().then(res=> {
        let {code, message, data} = _get(res, 'data')
        if(code == 200) {
          this.award = _get(res, 'data.data')
          this.showPopup = true
          this.popupStatus = 2
          this._getValentinesInfo()
          GLOBALS.marchSetsPoint('A_H5PT0244002832')
        }
      })
      GLOBALS.marchSetsPoint('A_H5PT0244002827')
    },
    /** 获取礼包列表 **/
    _getCardList() {
      Services.getCardList().then(res=> {
        let {code, message, data} = _get(res, 'data')
        if(code == 200) {
          this.cardList = _get(res, 'data.data.leaguePacksList', [])
        }
      })
    },
  },
  created() {
    this._getValentinesInfo()
    this._getCardList()
    this.onScroll()
    GLOBALS.marchSetsPoint('P_H5PT0244')

    /** 删除回调地址防止异常 **/
    localStorage.removeItem('originDeffer')
  }
}
</script>
<style scoped lang="less">
@import '../../common/css/base.css';
@import url('../../../static/iconfont/iconfont.css');
* {
  box-sizing: border-box;
}
.valentines {
  overflow: hidden;
  min-height: 100vh;
  background: #880131;
  .pannel1 {
    position: relative;
    overflow: hidden;
    height: 6.07rem;
    background: url(./img/bg1.png) no-repeat center top ;
    background-size: 100% 100%;
    .back {
      position: absolute;
      left: 0;
      top: .16rem;
      width: .64rem;
      height: .44rem;
      background: #127C79;
      text-align: center;
      line-height: .44rem;
      font-size: .24rem;
      color: #fff;
      border-radius: 0 .24rem .24rem 0;
    }
  }
  .pannel2 {
    display: flex;
    justify-content: center;
    img {
      height: 2.32rem;
      &:first-child{
        margin-right: .1rem;
        width: 3.2rem;
      }
      &:last-child {
        width: 3.27rem;
      }
    }
  }
  .pannel3 {
    overflow: hidden;
    margin: 0 auto .2rem;
    width: 6.62rem;
    height: 8.88rem;
    background: url(./img/bg2.png) no-repeat center top ;
    background-size: 100% 100%;
    .task {
      margin: 2.1rem auto 0;
      overflow: hidden;
      width: 5.32rem;
      li {
        position: relative;
        padding: .14rem;
        margin-bottom: .2rem;
        overflow: hidden;
        height: 1.18rem;
        background: #FEBDAB;
        border-radius: .1rem;
        .icon {
          position: relative;
          float: left;
          margin-right: .14rem;
          width: .9rem;
          height: .9rem;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
          .icon1 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url(./img/inner-icon.png) no-repeat center center;
            background-size: 100% 100%; 
          }
        }
        .text{
          height: 100%;
          float: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .title {
            margin-bottom: .12rem;
          }
          .progress {
            position: relative;
            overflow: hidden;
            width: 1.6rem;
            height: .3rem;
            background: #FFDDD4;
            border-radius: .15rem;
            .progress-wrap {
              position: absolute;
              left: 0;
              top: 0;
              z-index: 1;
              width: 50%;
              height: .3rem;
              background: #BE013D;
            }
            .progress-text {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              z-index: 2;
              text-align: center;
              line-height: .3rem;
              font-size: .2rem;
              color: #FEA087;
            }
          }
        }
        .btn {
          position: absolute;
          right: .23rem;
          top: .33rem;
          width: 1.13rem;
          height: .54rem;
          line-height: .54rem;
          text-align: center;
          font-size: .24rem;
          color: #FFDDD4;
          background: #D12B50;
          border-radius: .27rem;
          &.disable {
            background: #A09F9F;
          }
          &.play-game {
            background: #017D61;
          }
        }
      }
    }
    .lotter {
      margin: 0 auto;
      overflow: hidden;
      width: 5.32rem;
      .title {
        margin-bottom: .1rem;
        position: relative;
        height: .36rem;
        line-height: .36rem;
        text-align: center;
        h5 {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          transform: translate(-50%, -50%);
          padding: 0 .1rem;
          font-size: .36rem;
          white-space: nowrap;
          color: #FFE57E;
          background: #CA3354;
        }
        .line {
          position: absolute;
          left: 0;
          top: 50%;
          z-index: 1;
          width: 100%;
          height: 1px;
          transform: translate(0, -50%);
          background: #FF977C;
        }
      }
      .title1 {
          margin-bottom: .16rem;
          white-space: nowrap;
          font-size: .2rem;
          color: #FFE57E;
          text-align: center;
      }
      .lotter-list {
        margin-bottom: .16rem;
        display: flex;
        justify-content: center;
        li {
          position: relative;
          width: 1.35rem;
          .lotter-center {
            padding-top: .07rem;
            margin-bottom: .1rem;
            width: 1.2rem;
            height: .72rem;
            background: url(./img/looter-bg.png) no-repeat center center;
            background-size: 100% 100%;
            font-size: .22rem;
            color: #830823;
            text-align: center;
            &.active {
              background: url(./img/looter-bg-active.png) no-repeat center center;
              background-size: 100% 100%;
              color: #fff;
            }
          }
          .right-icon {
            position: absolute;
            right: 0;
            top: 0;
            width: .15rem;
            height: .64rem;
            background: url(./img/right-icon.png) no-repeat center center;
            background-size: .1rem .16rem; 
          }
          &:last-child {
            width: 1.2rem;
            .right-icon {
              display: none;
            }
          }
          .loveNo {
            width: 1.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .love-icon {
              margin-right: .1rem;
              display: block;
              width: .18rem;
              height: .16rem;
            }
            .love-number {
              font-size: .22rem;
              color: #fff;
            }
          }
        }
      }
    }
    .current-loverNo {
      margin-bottom: .5rem;
      text-align: center;
      color: #FFE57E;
      font-size: .24rem;
      span {
        color: #fff;
      }
    }
    .lotter-btn {
      margin: 0 auto;
      width: 3.65rem;
      height: 1.08rem;
      background: url(./img/lottery-btn.png) no-repeat center center;
      background-size: 100% 100%;
      &.fade {
        animation: fade 2s infinite;
      }
      &.disable {
        background: url(./img/lottery-btn-diasble.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  .pannel4 {
    margin: 0 auto .42rem;
    overflow: hidden;
    width: 6.62rem;
    height: 8.78rem;
    background: url(./img/bg3.png) no-repeat center top ;
    background-size: 100% 100%;
    .card-list {
      margin-top: 2.1rem;
      .item {
        margin: 0 auto .16rem;
        width: 5.39rem;
        height: 1.97rem;
        img {
          vertical-align: top;
          width: 5.39rem;
          height: 1.97rem;
        }
      }
    }
  }
  .pannel5 {
    margin: 0 auto .8rem;
    width: 6.62rem;
    .title {
      margin: 0 auto .3rem;
      width: 3rem;
      height: .34rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .text {
      color: #FF9C7D;
      h5 {
        margin-bottom: .2rem;
        font-size: .28rem;
        font-weight: bold;
      }
      p {
        margin-bottom: .2rem;
        font-size: .24rem;
        line-height: .3rem;
      }
    }
  }
  .backTop {
    position: fixed;
    right: .3rem;
    bottom: 2rem;
    width: .8rem;
    height: .8rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
}
@keyframes fade {
  0% {
    transform: scale(.8)
  }
  50% {
    transform: scale(1)
  }
  100% {
    transform: scale(.8)
  }
}
</style>
