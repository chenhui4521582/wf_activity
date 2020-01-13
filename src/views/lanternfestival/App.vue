<template>
  <div class="lanternfestival" :class="{end:isEnd,showDown:$refs.dropDown&&$refs.dropDown.isDropDown}" v-if="actInfoData">
    <template v-if="!isEnd">
      <div class="lanternfestival_container">
        <div class="clickIcons">
          <div class="item">
            <img src="./imgs/back.png" alt="" @click="back">
            <img src="./imgs/rule.png" alt="" @click="showPop(1)">
            <img src="./imgs/gonglue.png" alt="" @click="showPop(3)">
          </div>
          <div class="item">
            <img src="./imgs/record.png" alt="" @click="showPop(2)">
          </div>
        </div>
        <div class="lf_container_title">瓜分倒计时</div>
        <div class="lf_container_countdown">
          <div class="countdown_item" v-for="item in countTime.split('')">
            <i v-if="item!=':'">{{item}}</i>
            <template v-else>{{item}}</template>
          </div>
        </div>
        <div class="predict_leaf" v-if="actInfoData.toDayUserCouponNum">
          当前预计可瓜分到<br>
          {{actInfoData.downCoeff*actInfoData.toDayUserCouponNum|filterPrice}}-{{actInfoData.upCoeff*actInfoData.toDayUserCouponNum|filterPrice}}金叶
        </div>
        <div class="predict_leaf" v-else @click="$refs.dropDown.outHandleTab(0)">
          快去领取瓜分券吧
        </div>
        <div class="tips">获得瓜分券越多，分到的奖励越多！</div>
      </div>
      <drop-down ref="dropDown" :toDayUserCouponNum="actInfoData.toDayUserCouponNum" :rules-explain="rulesExplain"
                 @refresh="getActInfo" :countTime="countTime" :endDate="actInfoData.endDate" @showPop="hitShowPop"></drop-down>
    </template>
    <template v-else>
      <profit :is-full="true"/>
    </template>
    <!--popType-->
    <com-pop :pop-type="popType" :rule-time="rulesExplain" :award-data="awardData" ref="comPop" :awardList="awardList"
             :isHasGift="isHasGift" :myRank="myRank" @getYesterDayGift="getYesterDayGift"
             @getCouponAward="getCouponAward" :countTime="countTime"></com-pop>
  </div>
</template>

<script>
  /* eslint-disable */
  import '../../common/js/window.js';
  import {activityInfo, userAwardsTips, couponAwardReceive} from './utils/api'

  export default {
    name: 'App',
    data() {
      return {
        countTime: '',//瓜分倒计时
        rulesExplain: '',//活动时间段
        isEnd: false,//是否活动结束
        popType: 0,//窗口类型 0 领取昨日瓜分券奖励 1 活动规则 2 瓜分记录 3 瓜分攻略 4 大家都在玩 5 开榜 6 任务流水领取弹窗
        awardData: null,//弹窗奖励
        isHasGift: false,//是否有昨日未领取的奖励
        awardList: [],//开榜奖品
        myRank: 0,//我的发榜排名
        actInfoData: null//活动信息数据
      }
    },
    components: {
      dropDown: () => import('./dropDown'),//副页
      profit: () => import('./component/profit'),//排行榜
      comPop: () => import('./component/comPop')//弹窗
    },
    methods: {
      getCountInfo(dateinfo) {
        let day = Math.floor(dateinfo / 86400)
        let hour = Math.floor(parseInt(dateinfo / 60 / 60) % 24)
        let minute = Math.floor(parseInt(dateinfo / 60) % 60)
        let second = Math.floor(dateinfo % 60)
        // let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        return {
          day, countHour, countMinute, countSecond
        }
      },
      //倒计时
      countDown(item) {
        if (!item) return false
        let date = item / 1000
        let {day, countHour, countMinute, countSecond} = this.getCountInfo(date)
        this.countTime = `${countHour}:${countMinute}:${countSecond}`
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
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          if (day > 0) {
            this.countTime = `${day}天${countHour}:${countMinute}:${countSecond}`
          } else {
            this.countTime = `${countHour}:${countMinute}:${countSecond}`
          }
        }, 1000)
      },
      //返回
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0240002786')   // 点击返回
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
      //弹窗
      showPop(type) {
        this.popType = type
        let point = ''
        switch (type) {
          case 1:
            point = 'A_H5PT0240002787';
            break;//规则点击
          case 2:
            point = 'A_H5PT0240002789';
            break;//瓜分记录
          case 3:
            point = 'A_H5PT0240002788';
            break;//攻略
        }
        point && GLOBALS.marchSetsPoint(point)
        if ([0, 5].includes(type)) {
          setTimeout(() => {
            this.$refs.comPop.showPop()
          }, 1000)
        } else {
          setTimeout(() => {
            this.$refs.comPop.showPop()
          })
        }
      },
      //开榜弹窗点击领取昨日奖励
      async getYesterDayGift() {
        let {code, data} = await userAwardsTips()
        if (code == 200) {
          this.isHasGift = !!data.award
          if (this.isHasGift) {
            this.awardData = {
              award: data.award,
              couponNum: data.couponNum
            }
            this.popType = 0
            setTimeout(() => {
              this.$refs.comPop.showPop()
            })
          }
        }
      },
      //活动信息
      async getActInfo(flag) {
        let {code, data} = await activityInfo()
        if (code == 200) {
          this.actInfoData = data
          if (data.state == 1) {
            this.isEnd = false
            this.rulesExplain = data.beginDate + '~' + data.endDate
            this.countDown(data.countdown)
          } else {
            this.isEnd = true
          }
          flag && this.getUserAwardsTips()
        }
        flag && GLOBALS.marchSetsPoint('P_H5PT0240')
      },
      //奖励提示（昨日奖励+开榜）
      async getUserAwardsTips() {
        let {code, data} = await userAwardsTips()
        if (code == 200) {
          this.isHasGift = !!data.award
          if (this.isEnd) {//结束
            if (data.rankTips == 1) {//盈利榜弹窗只弹一次
              this.myRank = data.rankIdx
              this.awardList = data.rankAward || []
              this.showPop(5)//盈利榜发榜弹窗
            }
          } else {//活动中
            if (this.isHasGift) {//有昨日奖励
              this.awardData = {
                award: data.award,
                couponNum: data.couponNum
              }
              this.showPop(0)
            }
          }
        }
      },
      //昨日瓜分奖励领取
      async getCouponAward() {
        let {code, message} = await couponAwardReceive()
        if (code == 200) {
          this.$toast.show({
            message: '领取成功',
            duration: 1000
          })
        } else {
          this.$toast.show({
            message: message,
            duration: 1000
          })
        }
        this.$refs.comPop.close()
      },
      hitShowPop(data) {
        this.popType = data.type
        data.awardData && (this.awardData = data.awardData)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
    },
    mounted() {
      this.$nextTick(function () {
        this.getActInfo(true)
      })
    },
    watch: {
      countTime(val) {
        if (!val) {
          this.getActInfo(true)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/css/base.css';

  .lanternfestival {
    background: #B6072F;
    height: 100vh;
    position: relative;
    padding-bottom: 1.2rem;
    &.showDown{
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
    }
    &.end {
      background: url("./imgs/bg1.png");
      background-size: 100% 1.03rem;
    }
    .lanternfestival_container {
      position: relative;
      height: 11.34rem;
      background: url("imgs/bg.png");
      background-size: 100% 100%;
      .clickIcons {
        position: absolute;
        top: .22rem;
        left: 0;
        right: 0;
        margin: auto;
        display: flex;
        justify-content: space-between;
        .item {
          &:nth-child(1) {
            display: flex;
            flex-direction: column;
            img {
              width: .447rem;
              height: .99rem;
              &:nth-child(1) {
                width: .45rem;
              }
            }
          }
          &:nth-child(2) {
            img {
              width: .447rem;
              height: 1.39rem;
            }
          }
        }
      }
      .lf_container_title {
        position: absolute;
        top: 4.15rem;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        font-size: .28rem;
        font-weight: bold;
        color: rgba(255, 204, 167, 1);
        line-height: 15px;
      }
      .lf_container_countdown {
        position: absolute;
        top: 4.5rem;
        left: 0;
        right: 0;
        margin: auto;
        font-size: .26rem;
        font-weight: bold;
        color: rgba(255, 241, 230, 1);
        display: flex;
        justify-content: center;
        .countdown_item {
          margin-left: .05rem;
          i {
            display: inline-block;
            width: .31rem;
            height: .34rem;
            line-height: .34rem;
            text-align: center;
            background: rgba(199, 44, 67, 1);
            border-radius: .04rem;
          }
          &:nth-child(1) {
            margin-left: 0;
          }
        }
      }
      &:before {
        content: '';
        position: absolute;
        top: 7.04rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 3.36rem;
        height: .65rem;
        background: url("imgs/moneynum.png");
        background-size: 100% 100%;
        animation: huxi 6s infinite ease-in-out;
      }
      .predict_leaf {
        position: absolute;
        top: 9.06rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 4.33rem;
        height: 1.25rem;
        background: url("imgs/btnl1.png");
        background-size: 100% 100%;
        padding-bottom: .25rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: .4rem;
        text-align: center;
        font-size: .3rem;
        font-weight: bold;
        color: rgba(177, 0, 40, 1);
      }
      .tips {
        position: absolute;
        bottom: .66rem;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(244, 173, 157, 1);
        line-height: 26px;
      }
    }
  }

  @keyframes huxi {
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
