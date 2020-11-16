<template>
  <section class="coinact" v-if="actInfo">
    <div class="coinact_bg">
      <div class="coin-click" style="height:2.2rem">
        <!--返回按钮-->
        <img src="./images/back.png" alt="" class="back" @click="back">
        <!--规则按钮-->
        <img src="./images/rule.png" alt="" class="rule" @click="showPop(1)">
        <!--倒计时-->
        <div class="time" v-if="actInfo.state==1">剩余时间:{{countTime}}
        </div>
        <div class="time" v-else>活动结束</div>
      </div>
      <!--转盘区域-->
      <div class="lottery_container" :style="lotteryBgArr[selectIndex]">
        <div class="tabs" :style="lotteryBgArr[selectIndex].ball">
          <div class="item" v-for="(item,index) in 6" :style="{transform:'rotate('+60*(item-1)+'deg)skewY(-30deg)'}"
               @click="selectIndex=index">
            <div class="text" style="width: 200%;height: 200%"></div>
          </div>
          <div class="lottery_packages">
            <div class="packages">
              <div class="packages_item"
                   v-for="(item,index) in actInfo.awardPanelRsps[selectIndex].awardsRsps.slice(0,8)">
                <template v-if="item.status==0||(item.status==0&&animationIndex>=0&&animationIndex!=index)">
                  <img :src="`${require(`./images/bubble${index>3?index-4:index}.png`)}`" alt=""">
                  <div class="awardsName"><p>{{item.awardsName}}</p></div>
                </template>
                <template v-else>
                  <img :src="`${require(`./images/animation${index>3?index-4:index}.gif`)}`" alt=""
                       v-if="animationIndex==index">
                  <img src="./images/dart.png" alt="" v-else style="width: .7rem;height: .59rem">
                </template>
              </div>
              <div class="total_prize">
                <p>全部解锁</p>
                <p style="margin: .02rem 0;">领加赠</p>
                <p>{{actInfo.awardPanelRsps[selectIndex].awardsRsps[8].awardsName}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--投掷按钮-->
      <div class="cast_btn" @click="cast">
        <p>立即投掷</p>
        <p>{{actInfo.awardPanelRsps[selectIndex].oneCountConsumeNum}}游戏币一次</p>
      </div>
      <div class="myprize">
        <div class="info">剩余游戏币：<i>{{actInfo.gameCurrencyNum}}</i><img src="./images/addcoin_btn.png" alt=""
                                                                       class="plus_btn" @click="gotomall"></div>
        <div class="myprize_btn" @click="showPop(2)">我的奖励</div>
      </div>
    </div>
    <!--跑马灯-->
    <messages></messages>
    <!--引导-->
    <article class="guide" v-if="guideStep" @click.stop="changeStep">
      <section :class="`guide-item step-${guideStep}`">
        <div class="circle"></div>
        <img class="arrow" src="./images/finger.png" alt="">
        <div class="text">
          {{guideStep==1?'点击切换转盘':'点击飞镖投掷'}}
        </div>
      </section>
    </article>
    <com-pop :popType="popType" ref="comPop" :actInfo="actInfo" :awardData="awardData"
             @close="closePop" @showPop="showPop" @cast="cast"
             @reset="selectIndex=actInfo.curAwardsLevel - 1" @refresh="getActInfo"></com-pop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </section>
</template>

<script>
  import {getActInfo, exchagePrize} from './utils/api'

  export default {
    name: 'coinact',
    components: {
      comPop: () => import('./components/comPop'),
      loading: () => import('../../components/common/loading'),
      messages: () => import('./components/messages')
    },
    data () {
      return {
        popType: 0,
        actInfo: null,
        awardData: null,
        countTime: '',
        showLoading: false,
        selectIndex: 0,
        lotteryBgArr: [{
          background: `url(${require(`./images/lottery1.png`)}) center center / 100% 100%`,
          width: '7.03rem',
          height: '7.14rem',
          ball: {
            top: '.4rem'
          }
        }, {
          background: `url(${require(`./images/lottery2.png`)}) center center / 100% 100%`,
          width: '7.19rem',
          height: '7.03rem'
        }, {
          background: `url(${require(`./images/lottery3.png`)}) center center / 100% 100%`,
          width: '7.03rem',
          height: '7.15rem'
        }, {
          background: `url(${require(`./images/lottery4.png`)}) center center / 100% 100%`,
          width: '7.03rem',
          height: '7.12rem'
        }, {
          background: `url(${require(`./images/lottery5.png`)}) center center / 100% 100%`,
          width: '7.17rem',
          height: '7.03rem',
          ball: {
            left: '.4rem'
          }
        }, {
          background: `url(${require(`./images/lottery6.png`)}) center center / 100% 100%`,
          width: '7.03rem',
          height: '7.14rem',
          ball: {
            top: '.4rem'
          }
        }],
        guideStep: 0, // 引导第几步
        guideTime: null, // 引导
        animationIndex: -1// 炸裂动画气泡index
      }
    },
    async mounted () {
      await this.getActInfo()
      GLOBALS.marchSetsPoint('P_H5PT0350', {
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
            this.countTime = `${day * 24 + hour}:${countMinute}:${countSecond}`
          } else {
            this.countTime = `${countHour}:${countMinute}:${countSecond}`
          }
        }, 1000)
      },
      back () {
        GLOBALS.marchSetsPoint('A_H5PT0350004447')// H5平台-气球爆爆爆-返回按钮点击
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      async getActInfo () {
        let {code, data} = await getActInfo()
        if (code == 200) {
          this.actInfo = data
          this.selectIndex = data.curAwardsLevel - 1
          this.countDown(data.countdown)
          if (this.actInfo.state == 1) {
            // 游戏币新增窗口
            if (this.actInfo.incrNum) {
              GLOBALS.marchSetsPoint('A_H5PT0350004456')// H5平台-气球爆爆爆-恭喜获得游戏币弹窗加载完成
              this.awardData = {
                awardsType: 'coin',
                awardsName: this.actInfo.incrNum + '枚游戏币',
                btnName: '去玩'
              }
              setTimeout(() => {
                this.showPop(3)
              }, 1500)
            }
            // 引导逻辑
            if (!localStorage.getItem('dartact')) {
              this.guideStep = 1
              this.guideTime = setTimeout(() => {
                clearTimeout(this.guideTime)
                this.changeStep()
              }, 3000)
            }
          }
        }
      },
      // 弹窗
      showPop (type, data) {
        this.popType = type
        let points = ['A_H5PT0350004448', 'A_H5PT0350004457']
        points[type - 1] && GLOBALS.marchSetsPoint(points[type - 1])
        data && (this.awardData = data)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      closePop () {
        this.popType = 0
        this.awardData = null
      },
      gotomall () {
        GLOBALS.marchSetsPoint('A_H5PT0350004458')// H5平台-气球爆爆爆-剩余游戏币+号按钮点击
        location.href = 'https://wap.beeplaying.com/xmWap/#/payment'
      },
      // 引导
      changeStep () {
        if (this.guideStep === 1) {
          this.guideStep = 2
          clearTimeout(this.guideTime)
          this.guideTime = setTimeout(() => {
            clearTimeout(this.guideTime)
            this.changeStep()
          }, 3000)
        } else {
          clearTimeout(this.guideTime)
          localStorage.setItem('dartact', true)
          this.guideStep = 0
          GLOBALS.marchSetsPoint('A_H5PT0350004446')// H5平台-气球爆爆爆-活动引导加载完成
        }
      },
      // 投掷操作
      async cast (data) {
        if (this.selectIndex == this.actInfo.curAwardsLevel - 1) {
          if (this.actInfo.gameCurrencyNum < this.actInfo.oneCountConsumeNum) { // 当前剩余的游戏币小于投掷需要的游戏币
            GLOBALS.marchSetsPoint('A_H5PT0350004453')// H5平台-气球爆爆爆-游戏币不足弹窗加载完成
            this.showPop(4)
          } else {
            if (data && data.sureChange) { // 弹窗确定投掷
              this.showLoading = true
              let {code, data, message} = await exchagePrize()
              GLOBALS.marchSetsPoint('A_H5PT0350004449', {
                level: this.actInfo.curAwardsLevel
              })
              if (code == 200) {
                this.animationIndex = data.sort - 1// 炸裂动画
                this.actInfo.awardPanelRsps[this.selectIndex].awardsRsps[this.animationIndex].status = 1
                this.awardData = Object.assign(data, {
                  btnName: '收下'
                })
                setTimeout(() => {
                  this.animationIndex = -1
                  this.showPop(3)
                  this.showLoading = false
                  GLOBALS.marchSetsPoint('A_H5PT0350004450')// H5平台-气球爆爆爆-普通奖励弹窗加载完成
                  if (!data.giveAwards || !data.giveAwards.awardsName) {
                    this.getActInfo()
                  }
                }, 1000)
              } else {
                this.$toast.show({
                  message
                })
                this.showLoading = false
              }
            } else {
              this.awardData = {
                num: this.actInfo.oneCountConsumeNum
              }
              this.showPop(5)
            }
          }
        } else { // 当前可解锁的转盘和显示的转盘不一致
          GLOBALS.marchSetsPoint('A_H5PT0350004452')// H5平台-气球爆爆爆-去解锁弹窗加载完成
          this.showPop(6)
        }
      }
    },
    watch: {
      countTime (val) {
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
      height: 15.55rem;
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
      top: .32rem;
      left: 2.32rem;
      right: 2.47rem;
      margin: auto;
      text-align: center;
      font-size: .24rem;
      font-weight: 400;
      color: #FFF4AC;
      display: flex;
      justify-content: center;
    }
    .back, .rule {
      position: absolute;
      top: .3rem;
      width: .62rem;
      height: .6rem;
      &.back {
        left: 0;
      }
      &.rule {
        right: 0;
      }
    }
    .lottery_container {
      position: relative;
      width: 7.03rem;
      height: 7.14rem;
      margin: auto;
      .tabs {
        width: 6.5rem;
        height: 6.5rem;
        /*background: red;*/
        border-radius: 50%;
        position: absolute;
        top: .3rem;
        left: .25rem;
        overflow: hidden;
        .item {
          overflow: hidden;
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 50%;
          transform-origin: 0% 100%;
          /*&:nth-child(1) {*/
          /*background: gray;*/
          /*}*/
          /*&:nth-child(2) {*/
          /*background: green;*/
          /*}*/
          /*&:nth-child(3) {*/
          /*background: yellow;*/
          /*}*/
          /*&:nth-child(4) {*/
          /*background: brown;*/
          /*}*/
          /*&:nth-child(5) {*/
          /*background: pink;*/
          /*}*/
          /*&:nth-child(6) {*/
          /*background: purple;*/
          /*}*/
        }
        .lottery_packages {
          content: '';
          position: absolute;
          width: 80%;
          height: 80%;
          top: -.1rem;
          bottom: 0;
          left: 0;
          right: -.05rem;
          margin: auto;
          z-index: 1;
          border-radius: 50%;
          overflow: hidden;
          /*background: darkblue;*/
          padding: .2rem;
          box-sizing: border-box;
          .packages {
            position: absolute;
            top: .4rem;
            bottom: .4rem;
            left: .4rem;
            right: .4rem;
            margin: auto;
            overflow: hidden;
            border-radius: 50%;
            .packages_item {
              position: absolute;
              width: 1.07rem;
              height: 1.26rem;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 100%;
                height: 100%;
              }
              .awardsName {
                position: absolute;
                top: 0;
                bottom: 0;
                left: .1rem;
                right: .1rem;
                margin: auto;
                display: flex;
                text-align: center;
                word-break: break-all;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: .22rem;
                font-weight: bold;
              }
              &:nth-child(1) {
                top: .2rem;
                left: 0;
                right: 0;
                margin: auto;
                color: #B1570F;
              }
              &:nth-child(2) {
                top: .57rem;
                right: .57rem;
                color: #992506;
              }
              &:nth-child(3) {
                top: 1.7rem;
                right: .2rem;
                color: #AB0025;
              }
              &:nth-child(4) {
                top: 2.8rem;
                right: .65rem;
                color: #9100AB;
              }
              &:nth-child(5) {
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                color: #B1570F;
              }
              &:nth-child(6) {
                top: 2.8rem;
                left: .65rem;
                color: #992506;
              }
              &:nth-child(7) {
                top: 1.7rem;
                left: .2rem;
                color: #AB0025;
              }
              &:nth-child(8) {
                top: .57rem;
                left: .57rem;
                color: #9100AB;
              }
            }
            .total_prize {
              width: 1.25rem;
              height: 1.25rem;
              border-radius: 50%;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              p {
                font-size: .22rem;
                font-weight: bold;
                color: #FFFFFF;
                word-break: break-all;
                text-align: center;
                &:nth-child(3) {
                  color: #FFEBAD;
                }
              }
            }
          }
        }
      }
    }
    .cast_btn {
      position: absolute;
      top: 10.47rem;
      left: 1.82rem;
      width: 3.64rem;
      height: 1.26rem;
      background: url("./images/cast_btn.png");
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: .24rem;
      box-sizing: border-box;
      p {
        font-size: .4rem;
        font-weight: 800;
        color: #C33A19;
        &:nth-child(2) {
          margin-top: .1rem;
          font-size: .24rem;
          font-weight: 400;
          color: #3E31FF;
        }
      }
    }
    .myprize {
      height: .77rem;
      position: absolute;
      top: 11.73rem;
      left: .55rem;
      right: .44rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info {
        font-size: .36rem;
        font-weight: 400;
        color: #FFEDB8;
        display: flex;
        align-items: center;
        i {
          color: #FF6E4D;
        }
        .plus_btn {
          margin-left: .1rem;
          width: .61rem;
          height: .61rem;
        }
      }
      .myprize_btn {
        width: 1.5rem;
        height: .77rem;
        background: url("./images/myprize_btn.png");
        background-size: 100% 100%;
        text-align: center;
        line-height: .77rem;
        font-size: .24rem;
        font-weight: bold;
        color: #C33A19;
      }
    }
    .guide {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 6;
      .guide-item {
        overflow: hidden;
      }
      .step-1 {
        position: absolute;
        top: 2.5rem;
        left: 1rem;
        width: 100%;
        width: 4rem;
        height: 3rem;
        box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.3);
        .circle {
          width: 2.5rem;
          height: 1.5rem;
          position: absolute;
          box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.3);
          border-radius: 70%;
          top: 0;
          left: 0.1rem;
        }
        .arrow {
          position: absolute;
          width: 1.02rem;
          top: .5rem;
          left: 1.5rem;
        }
        .text {
          position: absolute;
          width: 3.26rem;
          top: 1.7rem;
          left: 1.6rem;
          font-size: .36rem;
          font-weight: bold;
          color: #FFFFFF;
        }
      }
      .step-2 {
        position: absolute;
        top: 9.9rem;
        left: 1.3rem;
        width: 8rem;
        height: 8rem;
        box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.3);
        .circle {
          width: 4.5rem;
          height: 2rem;
          position: absolute;
          box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.3);
          border-radius: 70%;
          top: 0;
          left: 0.1rem;
        }
        .arrow {
          position: absolute;
          width: 1.02rem;
          top: 1rem;
          left: 3.5rem;
        }
        .text {
          position: absolute;
          width: 3.26rem;
          top: 2.2rem;
          right: 1.6rem;
          font-size: .36rem;
          font-weight: bold;
          color: #FFFFFF;
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
