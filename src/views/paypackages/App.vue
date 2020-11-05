<template>
  <section class="coinact" v-if="actInfo">
    <div class="coinact_bg">
      <div class="coin-click" style="height:3.53rem">
        <img src="./images/back.png" alt="" class="back" @click="back">
        <img src="./images/rule.png" alt="" class="rule" @click="showPop(1)">
        <div class="current_total">
          <div class="item">当前累计</div>
          <div class="item">{{actInfo.jackpotAmount}} <img src="./images/gemstone.png" alt=""></div>
        </div>
        <div class="time" v-if="actInfo.state==1">距离活动结束<i>{{countTime}}</i>
        </div>
        <div class="time" v-else><i>活动结束</i></div>
        <img src="./images/shop_icon.png" alt="" class="shop_icon" @click="operation" v-if="actInfo.state>=1">
      </div>
      <message></message>
      <div class="lottery_container">
        <div class="packages" :style="{backgroundImage:`url(${require(`./images/line0${actInfo.buyLevel>5?5:actInfo.buyLevel}.png`)})`}">
          <div class="item" v-for="(item,index) in packagesList">
            <div class="tips" v-if="actInfo.state==1">最多抽奖池<i>{{item.content.replace('最多抽奖池','')}}</i></div>
            <img :src="`${require(`./images/box${index+1}.png`)}`" alt="" class="box" v-if="actInfo.buyLevel<=index">
            <img :src="`${require(`./images/open${index+1}.png`)}`" alt="" class="box_open" v-else>
            <div class="btn" :class="{gray:actInfo.buyLevel>index,pay:index==actInfo.buyLevel}" @click="gotopay(index,item)" v-if="actInfo.state==1">解锁宝箱</div>
          </div>
        </div>
      </div>
    </div>
    <drop-down ref="dropDown" :actInfoData="actInfo" @showPop="showPop" @refresh="getActInfo" @exchagePrize="exchagePrize"></drop-down>
    <com-pop :popType="popType" ref="comPop" :actInfo="actInfo" :awardData="awardData" :awardList="awardList"
             @close="closePop" @showPop="showPop" @exchagePrize="exchagePrize"></com-pop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </section>
</template>

<script>
  import {getActInfo, exchagePrize, getJackpotAmount, getPackages} from './utils/api'

  export default {
    name: 'coinact',
    components: {
      comPop: () => import('./components/comPop'),
      loading: () => import('../../components/common/loading'),
      DropDown: () => import('./dropDown.vue'),
      message: () => import('./components/message')
    },
    data () {
      return {
        popType: 0,
        actInfo: null,
        awardData: null,
        countTime: '',
        showLoading: false,
        gearList: [],
        gearIndex: 0,
        showGearList: false,
        awardList: [],
        jackpotTimer: null,
        countdown: {
          time: ''
        },
        packagesList: []
      }
    },
    async mounted () {
      await this.getActInfo()
      this.getPackagesList()
      GLOBALS.marchSetsPoint('P_H5PT0347', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
    },
    methods: {
      getCountInfo (dateinfo) {
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
      // 倒计时
      countDown (item) {
        if (!item) return false
        let date = item / 1000
        let {day, countHour, countMinute, countSecond} = this.getCountInfo(date)
        this.countTime = `${countHour}时${countMinute}分${countSecond}秒`
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
            this.countTime = `${day}天${countHour}时${countMinute}分${countSecond}秒`
          } else {
            this.countTime = `${countHour}时${countMinute}分${countSecond}秒`
          }
        }, 1000)
      },
      back () {
        GLOBALS.marchSetsPoint('A_H5PT0347004373')
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      async getActInfo () {
        this.showGearList = false
        let {code, data} = await getActInfo()
        if (code == 200) {
          this.actInfo = data
          this.countDown(data.countdown)
          // 每日倒计时
          !this.countdown.time && this.actInfo.dayCountdown && GLOBALS.remainingTime(
            this,
            this.actInfo.dayCountdown,
            this.countdown
          )
          if (this.actInfo.popupInfo.popup) {
            setTimeout(() => {
              let zsNum = this.actInfo.popupInfo.popupAwards.length == 0 ? this.actInfo.popupInfo.popupAwards[0].propAmount : this.actInfo.popupInfo.popupAwards.reduce((prev, next) => prev.propAmount + next.propAmount)
              this.awardData = Object.assign({}, {
                info: `金叶已到账${zsNum.propAmount ? `；<br>钻石可到财宝商店换取好礼！` : ''}`,
                btnNum: 0,
                titlename: '恭喜获得'
              })
              this.awardList = [{
                awardsName: `${this.actInfo.popupInfo.popupAwards[0].leafAmount}金叶`,
                awardsType: 'jyz',
                num: this.actInfo.popupInfo.popupAwards.length
              }]
              if (zsNum.propAmount) {
                this.awardList.push({
                  awardsName: zsNum.propAmount + '颗钻石',
                  awardsType: 'zs'
                })
              }
              this.showPop(3)
              GLOBALS.marchSetsPoint('A_H5PT0347004378')
            }, 1000)
          }
          if (this.jackpotTimer) {
            clearInterval(this.jackpotTimer)
          }
          if (this.actInfo.state == 1) { // 活动期间轮询接口
            this.jackpotTimer = setInterval(() => {
              this.setJackpotAmount()
            }, 5000)
          }
        }
      },
      // 弹窗
      showPop (type) {
        this.showGearList = false
        this.popType = type
        let points = ['A_H5PT0347004374', 'A_H5PT0347004379']
        points[type - 1] && GLOBALS.marchSetsPoint(points[type - 1])
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      closePop (data) {
        this.popType = 0
        this.awardData = null
        this.awardList = []
      },
      async exchagePrize (item) {
        if (item.consume > this.actInfo.remnantNum) {
          this.$toast.show({
            message: '钻石不足哟~'
          })
        } else {
          if (item.sureChange) {
            this.showLoading = true
            let {code, data, message} = await exchagePrize(item.sort)
            if (code == 200) {
              this.awardData = {
                info: '奖励将自动发放到账'
              }
              this.awardList = [data]
              this.showPop(3)
              this.showLoading = false
              this.getActInfo()
              GLOBALS.marchSetsPoint('A_H5PT0347004381', {
                award_id: item.sort,
                award_name: item.awardsName
              })
            } else {
              this.$toast.show({
                message
              })
              this.showLoading = false
            }
          } else {
            this.awardData = Object.assign(item, {
              btnNum: 2,
              sureChange: true,
              titlename: '确认换取'
            })
            this.awardList = [item]
            this.showPop(3)
            GLOBALS.marchSetsPoint('A_H5PT0347004380', {
              award_id: item.sort,
              award_name: item.awardsName
            })
          }
        }
      },
      // 定时刷新奖池
      async setJackpotAmount () {
        let {code, data} = await getJackpotAmount()
        if (code == 200) {
          this.actInfo.jackpotAmount = data
        }
      },
      operation () {
        GLOBALS.marchSetsPoint('A_H5PT0347004375')
        this.$nextTick(() => {
          this.$refs.dropDown.outHandleTab()
        })
      },
      async getPackagesList () {
        if (this.actInfo.state == 1) {
          const { code, data } = await getPackages()
          if (code === 200) {
            this.packagesList = data.mallBizConfigs
          }
        } else {
          this.packagesList = [{}, {}, {}, {}, {}, {}]// 活动结束默认展示六个宝箱
        }
      },
      gotopay (index, item) {
        this.actInfo.buyLevel <= index && GLOBALS.marchSetsPoint('A_H5PT0347004376')
        if (this.actInfo.buyLevel == index) {
          this.awardData = Object.assign(item, {
            info: `金叶在购买后立即到账； <br>钻石奖励在付费后揭晓哦！`,
            btnNum: 1
          })
          this.awardList = [{
            awardsName: item.amount + '金叶',
            awardsType: 'jyz'
          }, {
            awardsName: '钻石盲盒',
            awardsType: 'mh'
          }]
          this.showPop(3)
          GLOBALS.marchSetsPoint('A_H5PT0347004377')
        } else if (this.actInfo.buyLevel < index) {
          this.$toast.show({
            message: '先解锁前端的宝箱哟~'
          })
        }
      }
    },
    watch: {
      countTime (val) {
        if (!val) {
          this.getActInfo()
        }
      },
      'countdown.time': function (val) {
        if (!val) {
          this.getActInfo()
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../../common/css/base.css";

  .coinact {
    min-height: 100vh;
    position: relative;
    background: #07315C;
    .coinact_bg {
      height: 26.43rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: relative;
      left: 0;
      right: 0;
      margin: auto;
    }
    .current_total {
      height: .75rem;
      box-sizing: border-box;
      position: absolute;
      top: 1.98rem;
      left: 1.3rem;
      right: 1.1rem;
      margin: auto;
      color: #FFFDDF;
      text-align: center;
      font-size: .22rem;
      font-weight: 400;
      .item {
        &:nth-child(2) {
          margin-top: .08rem;
          font-size: .72rem;
          font-weight: bold;
          color: #FFD758;
          line-height: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            margin-left: .07rem;
            width: .51rem;
            height: .45rem;
          }
        }
      }
    }
    .time {
      height: .25rem;
      box-sizing: border-box;
      position: absolute;
      top: 3rem;
      left: 2rem;
      right: 1.8rem;
      margin: auto;
      color: #441172;
      text-align: center;
      font-size: .22rem;
      font-weight: 800;
      //z-index: 1;
      display: flex;
      justify-content: center;
      i {
        color: #FF0105;
      }
    }
    .shop_icon {
      width: 1.558rem;
      height: 1.47rem;
      position: absolute;
      top: 3.89rem;
      right: 0;
      z-index: 1;
    }
    .back, .rule {
      position: absolute;
      left: .12rem;
      top: .18rem;
      width: .86rem;
      height: .86rem;
      &.rule {
        top: 1.26rem;
      }
    }
    .lottery_container {
      position: relative;
      height: 21.63rem;
      .packages {
        width: 6.38rem;
        height: 17.36rem;
        background: url("./images/line00.png");
        background-size: 100% 100%;
        position: absolute;
        top: 3.3rem;
        left: .59rem;
        right: .22rem;
        .item {
          width: 2.85rem;
          height: 1.35rem;
          background: url("./images/bottom.png");
          background-size: 100% 100%;
          position: absolute;
          .tips {
            width: 2.6rem;
            height: .98rem;
            padding-bottom: .2rem;
            box-sizing: border-box;
            background: url("./images/tips.png");
            background-size: 100% 100%;
            position: absolute;
            top: -2.5rem;
            left: .5rem;
            right: 0;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .3rem;
            font-weight: 400;
            color: #FFFFFF;
            z-index: 1;
            i {
              color: #FFFF6A;
            }
          }
          .btn {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            bottom: -.55rem;
            width: 1.93rem;
            height: .79rem;
            background: url("./images/lock0.png");
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .3rem;
            font-weight: 500;
            color: #FFFFFF;
            text-shadow: 0px 1px 0px #2D4B0B;
            &.pay{
              background: url("./images/lock1.png");
              background-size: 100% 100%;
              animation: huxi 3s infinite ease-in-out;
            }
            &.gray{
              background: url("./images/lock2.png");
              background-size: 100% 100%;
            }
          }
          .box, .box_open {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            bottom: .7rem;
            &.box_open {
              left: .11rem;
              bottom: 1rem;
            }
          }
          &:nth-child(1) {
            top: -.97rem;
            left: .63rem;
            .tips {
              top: -2.2rem;
            }
            .box {
              width: 2.61rem;
              height: 2.16rem;
            }
            .box_open {
              width: 3.15rem;
              height: 3.06rem;
              bottom: .7rem;
            }
          }
          &:nth-child(2) {
            top: 1.9rem;
            right: .46rem;
            .box {
              width: 2.48rem;
              height: 2.33rem;
            }
            .box_open {
              width: 2.7rem;
              height: 2.65rem;
              left: .3rem;
            }
          }
          &:nth-child(3) {
            left: -.3rem;
            top: 5.5rem;
            .box {
              width: 2.5rem;
              height: 2.34rem;
            }
            .box_open {
              width: 2.59rem;
              height: 2.62rem;
              left: .5rem;
              bottom: .9rem;
            }
          }
          &:nth-child(4) {
            top: 8.6rem;
            right: .56rem;
            .box {
              width: 2.71rem;
              height: 2.41rem;
            }
            .box_open {
              width: 2.79rem;
              height: 2.71rem;
              left: .26rem;
            }
          }
          &:nth-child(5) {
            left: .1rem;
            top: 12.84rem;
            .tips {
              top: -2.6rem;
            }
            .box {
              width: 2.69rem;
              height: 2.5rem;
            }
            .box_open {
              width: 2.8rem;
              height: 2.92rem;
              left: .26rem;
            }
          }
          &:nth-child(6) {
            right: .8rem;
            bottom: -.96rem;
            width: 3.88rem;
            height: 1.84rem;
            background: url("./images/bottom_big.png");
            background-size: 100% 100%;
            .tips {
              top: -2.7rem;
              left: 1.1rem;
            }
            .btn {
              bottom: -.45rem;
            }
            .box, .box_open {
              bottom: .9rem;
            }
            .box {
              width: 3.2rem;
              height: 3.05rem;
            }
            .box_open {
              width: 3.45rem;
              height: 3.44rem;
              left: .58rem;
              bottom: 1.1rem;
            }
          }
        }
      }
    }
  }
  @keyframes huxi {
    0% {
      transform: scale(0.9);
    }
    10% {
      transform: scale(1);
    }
    20% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1);
    }
    40% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1);
    }
    80% {
      transform: scale(0.9);
    }
    90% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.9);
    }
  }
</style>
