<template>
  <div class="bigbonus" id="app" v-if="actInfo" :class="{fixed:$refs.dropDown&&$refs.dropDown.curIndex}">
    <img src="./images/back.png" alt="" class="back" @click="backHome">
    <img src="./images/rule.png" alt="" class="rule" @click="showPop(3)">
    <img src="./images/gonglue.png" alt="" class="gonglue" @click="showPop(5)">
    <img src="./images/rank.png" class="rank"
         @click="showPop(2)">
    <div class="horn_container" v-if="hornList.length">
      <horn :noticeList="hornList"></horn>
    </div>
    <div class="current_total" @click="showPop(4)">
      <div class="item">{{actInfo.jackpotInfo&&actInfo.jackpotInfo.timelineTotalAwards||0}}个话费碎片</div>
      <div class="item">（{{actInfo.jackpotInfo&&actInfo.jackpotInfo.timelineTotalAmount||0}}个荷灯）</div>
      <img src="./images/help.png" alt="" class="help">
    </div>
    <div class="wish_counttime">
      <template v-if="actInfo.state==1">
        <div class="counttime"><template v-if="countTime">{{countTime}}后还愿</template></div>
      </template>
      <div class="counttime" v-else>00:00:00后还愿</div>
      <div class="package" @click="recevieBoxPrize">
        <div class="tips" v-if="actInfo.timelineUnreceivedNum">待领取*{{actInfo.timelineUnreceivedNum}}</div>
      </div>
    </div>
    <div class="wish_task">
      <div class="total">
        <div class="item">当前时段累计获得荷灯：{{actInfo.timelineUserAmount}}</div>
        <div class="item" @click="showPop(1)">中奖记录>></div>
      </div>
      <hit-percent :gameBetting="actInfo.timelineUserAmount"
                   :hbItems="actInfo.progressList" :actInfoData="actInfo"
                   @refresh="_getInfo" @showPop="showPop" @openDropDown="$refs.dropDown.curIndex=1"></hit-percent>
    </div>
    <drop-down ref="dropDown" :actInfoData="actInfo" @showPop="showPop"
               @refresh="_getInfo" v-if="actInfo.state==1">
    </drop-down>
    <comPop :popType="popType" :actInfoData="actInfo" :awardData="awardData" :awardList="awardList" ref="comPop"
            @close="closePop" @showPop="showPop" @opendown="$refs.dropDown.curIndex=1" @refresh="_getInfo"></comPop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </div>
</template>
<script>
  import {
    activityInfo,
    getDynamic,
    getNoticeList,
    gameReceiveAll
  } from './utils/api'

  export default {
    name: 'bigbonus',
    data: () => ({
      popType: 0,
      hornList: [],
      showLoading: false,
      actInfo: null,
      awardData:null,
      timer: null,
      countTime: '',
      record: null,
      timerDynamic: null,
      awardList:[],
      hornList:[]
    }),
    computed: {
      girlLeft() {
        if (this.actInfo.dynamic.womenAmount + this.actInfo.dynamic.menAmount > this.actInfo.totalAmount) {
          return (-100 + 520 * this.actInfo.dynamic.womenAmount / (this.actInfo.dynamic.womenAmount + this.actInfo.dynamic.menAmount)) / 100 + 'rem'
        } else {
          return (-100 + 520 * this.actInfo.dynamic.womenAmount / this.actInfo.totalAmount) / 100 + 'rem'
        }
      },
      boyRight() {
        if (this.actInfo.dynamic.womenAmount + this.actInfo.dynamic.menAmount > this.actInfo.totalAmount) {
          return (520 * this.actInfo.dynamic.menAmount / (this.actInfo.dynamic.womenAmount + this.actInfo.dynamic.menAmount)) / 100 + 'rem'
        } else {
          return (520 * this.actInfo.dynamic.menAmount / this.actInfo.totalAmount) / 100 + 'rem'
        }
      },
      fontsize() {
        return parseFloat(localStorage.getItem('fontsize') || '100')
      }
    },
    components: {
      horn: () => import('./components/horn'),
      comPop: () => import('./components/comPop'),
      loading: () => import('../../components/common/loading'),
      DropDown: () => import('./dropDown.vue'),
      hitPercent: () => import('./components/hitPercent'),
    },
    methods: {
      //倒计时
      countDown(item) {
        if (!item) return false
        let date = item / 1000
        this.timer = setInterval(() => {
          date = date - 1
          if (date <= 0) {
            date = 0
            clearInterval(this.timer)
            this.countTime = ''
            return
          }
          let day = Math.floor(date / 86400)
          let hour = Math.floor(parseInt(date / 60 / 60) % 24)
          let minute = Math.floor(parseInt(date / 60) % 60)
          let second = Math.floor(date % 60)
          // let countDay = day >= 10 ? day : '0' + day
          let countDay = day >= 10 ? day : '0' + day
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          if (day > 0) {
            this.countTime = `${countDay}天${countHour}时${countMinute}分${countSecond}秒`
          } else {
            this.countTime = `${countHour}:${countMinute}:${countSecond}`
          }
        }, 1000)
      },
      //弹窗关闭
      closePop() {
        this.popType = 0
        this.awardData = null
      },
      move(e) {
        e.preventDefault()
      },
      //弹窗
      showPop(type, data) {
        this.popType = type
        let point = ''
        switch (type) {
          case 1:
            point = 'A_H5PT0333004193';
            break;//H5平台-中秋祈愿池-中奖记录页加载完成
          case 2:
            point='A_H5PT0333004192'
            break;//H5平台-中秋祈愿池-排行榜按钮点击
          case 3:
            point = 'A_H5PT0333004190';
            break;//规则点击
          case 5:
            point = 'A_H5PT0333004191';
            break;//中奖攻略
          case 4:
            point = 'A_H5PT0333004199';
            break;//奖池计算说明
          case 6:
            point = 'A_H5PT0333004198';
            break;//H5平台-中秋祈愿池-新增荷灯弹窗加载完成
        }
        data && (this.awardData = data)
        point && GLOBALS.marchSetsPoint(point)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      //返回
      backHome() {
        GLOBALS.marchSetsPoint('A_H5PT0333004189')
        history.back(-1)
      },
      //获取活动信息
      async _getInfo(isFirst = false) {
        let {code, data} = await activityInfo()
        if (code == 200) {
          this.actInfo = data
          !this.countTime&&this.countDown(data.timelineCountdown)
          if(isFirst){
            this.getNoticeList()
          }
          if (this.timerDynamic) {
            clearInterval(this.timerDynamic)
          }
          if (this.actInfo.state == 1) {//活动期间轮询接口
            this.timerDynamic = setInterval(() => {
              this.setJackpotAmount()
            }, 5000)
          }
          if (this.actInfo.firstLoadPopup) {//首次进入强弹活动攻略
            setTimeout(() => {
              this.showPop(5)
            }, 1500)
          }else if (this.actInfo.yesterdayRank.popup) {
            GLOBALS.marchSetsPoint('A_H5PT0333004200')
            setTimeout(() => {
              this.showPop(8,Object.assign({
                awardsName: this.actInfo.yesterdayRank.awardsName,
                rank:this.actInfo.yesterdayRank.myRank,
                awardsType:this.actInfo.yesterdayRank.awardsType,
              },this.actInfo.incrNum?{
                popType: 6,
                amount: this.actInfo.incrNum
              }:{}))
            }, 1500)
          } else if (this.actInfo.incrNum) {
            this.awardData = {
              amount: this.actInfo.incrNum
            }
            setTimeout(() => {
              this.showPop(6)
            }, 1500)
          }
        }
      },
      init() {
        this._getInfo(true)
      },
      //定时刷新
      async setJackpotAmount() {
        let {code, data} = await getDynamic()
        if (code == 200) {
          this.actInfo.jackpotInfo = data
        }
      },
      async getNoticeList () {
        const { code, data } = await getNoticeList()
        if (code === 200) {
          this.hornList = data
        }
      },
      async recevieBoxPrize(){
        if(this.actInfo.timelineUnreceivedNum){
          let {code,data}=await gameReceiveAll()
          if(code==200){
            this.awardList=data
            this.showPop(9)
            this._getInfo()
            GLOBALS.marchSetsPoint('A_H5PT0333004197')
          }
        }
      }
    },
    async mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0333', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      await this.init()
    },
    watch: {
      countTime(value) {
        if (!value) {
          this._getInfo(true)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  @import '../../common/css/base.css';

  * {
    box-sizing: border-box;
  }

  .bigbonus {
    min-height: 100vh;
    background: #3D0D9F;
    padding: 9.61rem 0 1.02rem;
    box-sizing: border-box;
    position: relative;
    &:before {
      content: '';
      width: 100%;
      height: 13.87rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: absolute;
      top: 0
    }
    &:after {
      content: '';
      width: 100%;
      height: 4.4rem;
      background: url("./images/flower.gif");
      background-size: 100% 100%;
      position: absolute;
      top: 2.3rem
    }
    &.fixed {
      position: fixed;
      left: 0;
      right: 0;
      margin: auto;
    }
    .back, .rule, .gonglue {
      width: .7rem;
      height: .7rem;
      position: absolute;
      top: .19rem;
      left: .15rem;
      z-index: 1;
      &.rule {
        top: 1.1rem;
      }
      &.gonglue {
        top: 2rem;
      }
    }
    .rank {
      width: 1.08rem;
      height: .99rem;
      position: absolute;
      top: 1.22rem;
      right: .22rem;
    }
    .horn_container {
      position: absolute;
      top: 2rem;
      left: 2.51rem;
      right:1.8rem;
      margin: auto;
      z-index: 1;
      &:before{
        content: '';
        width: .26rem;
        height: .22rem;
        background: url("./images/horn.png");
        background-size: 100% 100%;
        position: absolute;
        left: -.26rem;
        top:0;
        bottom: 0;
        margin: auto;
      }
    }
    .current_total {
      width: 4.42rem;
      height: 1.45rem;
      background: url("./images/brand.png");
      background-size: 100% 100%;
      position: absolute;
      top: 6.07rem;
      left: 0;
      right: 0;
      margin: auto;
      padding: .4rem 0 .39rem;
      box-sizing: border-box;
      text-align: center;
      .item {
        &:nth-child(1) {
          font-size: .36rem;
          font-weight: bold;
          color: #FF067B;
        }
        &:nth-child(2) {
          margin-top: .01rem;
          font-size: .24rem;
          font-weight: 400;
          color: #431BB0;
        }
      }
      .help {
        width: .3rem;
        height: .3rem;
        position: absolute;
        top: .77rem;
        right: .6rem;
      }
    }
    .wish_counttime {
      width: 6.5rem;
      height: .96rem;
      background: url("./images/bottom_bg.png");
      background-size: 100% 100%;
      position: absolute;
      top: 8.43rem;
      left: 0;
      right: 0;
      margin: auto;
      .counttime {
        position: absolute;
        top: -.22rem;
        left: .31rem;
        width: 3.26rem;
        height: .82rem;
        background: url("./images/counttime_bg.png");
        background-size: 100% 100%;
        padding: .2rem 0 0 .7rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .3rem;
        font-weight: bold;
        color: #CD4202;
      }
      .package {
        position: absolute;
        top: -1.16rem;
        right: .82rem;
        width: 1.88rem;
        height: 1.97rem;
        background: url("./images/package.png");
        background-size: 100% 100%;
        .tips {
          position: absolute;
          left: 1.31rem;
          top: -.09rem;
          width: 1.32rem;
          height: .46rem;
          line-height: .48rem;
          text-align: center;
          background: url("./images/tips.png");
          background-size: 100% 100%;
          font-size: .26rem;
          font-weight: 400;
          color: #FFFFFF;
          animation: toggleTip 3s infinite ease-in-out;
        }
      }
    }
    .wish_task {
      position: relative;
      width: 6.55rem;
      height: 3.5rem;
      background: linear-gradient(270deg, #FBD098, #FDECC3);
      border-radius: .16rem;
      margin: auto;
      padding: .15rem 0 0;
      box-sizing: border-box;
      .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .25rem;
        box-sizing: border-box;
        margin-bottom: .2rem;
        .item {
          &:nth-child(1) {
            font-size: .28rem;
            font-weight: 400;
            color: #A55A1D;
          }
          &:nth-child(2) {
            font-size: .24rem;
            font-weight: 400;
            color: #EB3618;
          }
        }
      }
    }
  }
  @keyframes toggleTip {
    0% {
      transform: scale(0.9);
    }
    10% {
      transform: scale(1.2);
    }
    20% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1.2);
    }
    40% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1.2);
    }
    60% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1.2);
    }
    80% {
      transform: scale(0.9);
    }
    90% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(0.9);
    }
  }
</style>
