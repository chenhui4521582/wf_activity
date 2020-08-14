<template>
  <div class="bigbonus" v-if="actInfo">
    <div class="bigbonus-container" :class="{fixed:$refs.dropDown&&$refs.dropDown.curIndex}">
      <img src="./images/back.png" alt="" class="back" @click="backHome">
      <img src="./images/rule.png" alt="" class="rule" @click="showPop(7)">
      <img src="./images/gonglue.png" alt="" class="gonglue" @click="showPop(9)">
      <div class="receive_prize">
        领奖
      </div>
      <div class="horn_container">
        <div class="surplus" v-if="countdown.time">距离结束剩余{{countdown.time}}</div>
        <div class="surplus" v-else style="font-size: .3rem">活动已结束</div>
      </div>
      <div class="gain_distance">
        <div class="item">牛郎获得助力<i>00000米</i></div>
        <div class="item">织女获得助力<i>8888米</i></div>
      </div>
      <div class="operation_btn" @click="operation"></div>
      <div class="task"></div>
    </div>
    <drop-down v-if="actInfo.state!==1" ref="dropDown" :totalNum="actInfo.userInfo.totalNum" @showPop="showPop"
               @refresh="_getInfo">
    </drop-down>
    <comPop :popType="popType" :actInfoData="actInfo" :awardData="awardData" ref="comPop"
            @close="closePop" @showPop="showPop" @opendown="$refs.dropDown.curIndex=1"></comPop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </div>
</template>
<script>
  import {getNoticeList, activityInfo, drawLot, receiveCoupon, getJackpotAmount} from './utils/api'

  export default {
    name: 'bigbonus',
    data: () => ({
      popType: 0,
      hornList: [],
      showLoading: false,
      actInfo: null,
      awardData: null,
      countdown: {//倒计时
        time: ''
      },
      countdown1: {//倒计时
        time: ''
      },
      timer: null,
      percent: ['0.5', '1', '3']
    }),
    components: {
      horn: () => import('./components/horn'),
      comPop: () => import('./components/comPop'),
      loading: () => import('../../components/common/loading'),
      DropDown: () => import('./dropDown.vue')
    },
    methods: {
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
        // ["中奖记录","抽奖券获得记录","昨日排行","今日排行","很遗憾","大家都在玩","活动规则","奖池计算说明","中奖攻略","恭喜您","温馨提示","恭喜获得！"]
        switch (type) {
          case 1:
            point = 'A_H5PT0309003767';
            break;//中奖记录
          case 2:
            point = 'A_H5PT0309003772';
            break;//抽奖券获得记录
          case 3:
            point = 'A_H5PT0309003769';
            break;//昨日排行
          case 4:
            point = 'A_H5PT0309003768';
            break;//今日排行
          case 6:
            point = 'A_H5PT0309003778';
            break;//大家都在玩
          case 7:
            point = 'A_H5PT0309003762';
            break;//规则点击
          case 9:
            point = 'A_H5PT0309003763';
            break;//中奖攻略
          case 8:
            point = 'A_H5PT0309003764';
            break;//奖池计算说明
          case 11:
            point = 'A_H5PT0309003780';
            break;//温馨提示
        }
        data && (this.awardData = data)
        point && GLOBALS.marchSetsPoint(point)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      //返回
      backHome() {
        GLOBALS.marchSetsPoint('A_H5PT0309003761')
        history.back(-1)
      },
      //获取活动信息
      async _getInfo() {
        let {code, data} = await activityInfo()
        if (code == 200) {
          this.actInfo = data
          this._getNoticeList()
          data.haveUnReceive && setTimeout(() => {
            this.showPop(11)
          }, 1500)
          if (data.rankInfo.popup) {
            if (data.rankInfo.awardsName) {
              setTimeout(() => {
                this.showPop(12, {
                  awardsName: data.rankInfo.awardsName,
                  awardsType: data.rankInfo.awardsType,
                  info: `昨天排行第${data.rankInfo.myRank}名，获得以上奖励`,
                  isRank: true
                })
              }, 1000)
              GLOBALS.marchSetsPoint('A_H5PT0309003781')//H5平台-奖池大满贯活动-次日上榜弹窗加载完成
            } else {
              this.$toast.show({
                message: '昨日您与排行榜失之交臂啦~',
                duration: 3000
              })
              setTimeout(() => {
                this.showPop(3)
              }, 3000)
            }
          }
          if (this.timer) {
            clearInterval(this.timer)
          }
          if (this.actInfo.state == 1) {//活动期间轮询接口
            this.timer = setInterval(() => {
              this.setJackpotAmount()
            }, 5000)
          }
          !this.countdown.time && data.countdown && GLOBALS.remainingTime(
            this,
            data.countdown,
            this.countdown,
            true
          )
          !this.countdown1.time && data.couponInfo.countdown && GLOBALS.remainingTime(
            this,
            data.couponInfo.countdown,
            this.countdown1
          )
        }
      },
      //跑马灯
      async _getNoticeList() {
        let {code, data, message} = await getNoticeList()
        if (code == 200) {
          this.hornList = data
        }
      },
      init() {
        this._getInfo()
      },
      //抽奖
      async drawLuck(item) {
        GLOBALS.marchSetsPoint('A_H5PT0309003773')//H5平台-奖池大满贯活动-点击抽奖按钮点击
        if (this.actInfo.state == 1) {
          //券不够
          if (item.amount > this.actInfo.userInfo.remnantNum) {
            this.showPop(5)
            GLOBALS.marchSetsPoint('A_H5PT0309003774')
          } else {
            this.showLoading = true
            const {code, data, message} = await drawLot(item.amount)
            if (code === 200) {
              this.showLoading = false
              this.showPop(12, {
                awardsName: `${data.amount}个话费碎片${data.businessType == 4 ? `<br><i style="font-size: .26rem;font-weight:400;">（${data.rate}%奖池奖励）</i>` : ``}`,
                awardsType: 'hfq',
                info: `${data.progress.unlock ? `今日您已累计消耗${data.progress.total}张抽奖券，<br>下次高额券抽必中奖池大奖！` : `奖励将自动发放到账<br>（10个话费碎片=1元话费券）`}`
              })
              if (data.progress.unlock) {
                GLOBALS.marchSetsPoint('A_H5PT0309003776')
              } else if (data.rate) {
                GLOBALS.marchSetsPoint('A_H5PT0309003777')
              } else {
                GLOBALS.marchSetsPoint('A_H5PT0309003775')
              }
              this._getInfo()
            } else {
              this.showLoading = false
              this.$toast.show({
                message: message,
                duration: 1000
              })
              this._getInfo()
            }
          }
        } else {
          this.$toast.show({
            message: '活动已结束',
            duration: 1000
          })
        }
      },
      //抢券
      async gainQuan() {
        if (!this.countdown1.time) {
          GLOBALS.marchSetsPoint('A_H5PT0309003765')
          this.showLoading = true
          const {code, data, message} = await receiveCoupon()
          if (code == 200) {
            this.showLoading = false
            this.awardData = data
            this.showPop(10)
            GLOBALS.marchSetsPoint('A_H5PT0309003766')
            this._getInfo()
          } else {
            this.showLoading = false
            this.$toast.show({
              message: message,
              duration: 1000
            })
            this._getInfo()
          }
        }
      },
      //定时刷新奖池
      async setJackpotAmount() {
        let {code, data} = await getJackpotAmount()
        if (code == 200) {
          this.actInfo.jackpotAmount = data
        }
      },
      operation() {
        this.$refs.dropDown.outHandleTab()
      }
    },
    mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0309', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      this.init()
    },
    watch: {
      "countdown.time"(value) {
        if (!value) {
          this._getInfo()
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
    .bigbonus-container {
      width: 100%;
      height: 20.33rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: relative;
      padding-top: 6.43rem;
      box-sizing: border-box;
      &.fixed {
        position: fixed;
      }
      .back, .rule, .gonglue {
        width: .7rem;
        height: .7rem;
        position: absolute;
        top: .19rem;
        left: .15rem;
        &.rule {
          top: 1.1rem;
        }
        &.gonglue {
          top: 2rem;
        }
      }
      .receive_prize{
        position: absolute;
        top:1.72rem;
        right: 0;
        width:.94rem;
        height:.66rem;
        line-height:.66rem;
        text-align: center;
        background:rgba(240,121,5,1);
        border-radius:.33rem 0 0 .33rem;
        font-size:.36rem;
        font-weight:bold;
        color:rgba(255,255,255,1);
        &.red:before{
          content: '';
          width:.18rem;
          height:.18rem;
          background:rgba(255,9,56,1);
          border-radius:50%;
          position: absolute;
          left: .04rem;
          top: -0.05rem;
        }
      }
      .horn_container {
        position: absolute;
        top: -.05rem;
        left: 1.01rem;
        width: 5.15rem;
        height: 2.65rem;
        .surplus {
          margin-top: .13rem;
          text-align: center;
          font-size: .22rem;
          font-weight: 400;
          color: rgba(255, 227, 216, 1);
        }
        .hornDiv {
          width: 3.7rem;
          height: .44rem;
          position: absolute;
          top: 2.16rem;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
      .gain_distance {
        width: 4.66rem;
        height: 1.38rem;
        background: url("./images/PK.png");
        background-size: 100% 100%;
        padding: .1rem 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto .46rem;
        .item {
          font-size: .3rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          i {
            color: #FFE558;
          }
        }
      }
      .operation_btn {
        width: 5.61rem;
        height: 1.14rem;
        margin: 0 auto .37rem;
        background: url("./images/btnAdd1.png");
        background-size: 100% 100%;
        &.gain {
          background: url("./images/btnGain.png");
          background-size: 100% 100%;
        }
        &.gray {
          background: url("./images/btnAdd0.png");
          background-size: 100% 100%;
        }
      }
      .task {
        width: 6.69rem;
        height: 10.11rem;
        background: url("./images/task_bg.png");
        background-size: 100% 100%;
        margin: 0 auto;
      }
    }
    .downbtn {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100vw;
      height: 1.04rem;
      background: url('./images/downbtn.png') center center / 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      font-size: .28rem;
      font-weight: bold;
      color: rgba(95, 9, 7, 1);
      padding-top: .1rem;
      box-sizing: border-box;
      i {
        color: #FF3131;
      }
      .item:nth-child(2) {
        margin-top: .1rem;
      }
      &:not(.moreprize):before {
        content: '';
        position: absolute;
        top: -.28rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 1.79rem;
        height: .28rem;
        background: url('./images/uparrow.png') center center / 100% 100%;
      }
      .item.moreprize {
        font-size: .32rem;
        font-weight: bold;
        color: rgba(95, 9, 7, 1);
        i {
          color: #FF1B16;
        }
        &:nth-child(2) {
          font-size: .24rem;
          font-weight: bold;
          text-decoration: underline;
          color: rgba(199, 61, 26, 1);
        }
      }
    }
  }

  .pop-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .drop-down {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 2;
    .drop-down-content {
      width: 100%;
      height: 4.2rem;
      position: fixed;
      left: 0;
      bottom: 0;
      font-size: 0.2rem;
      z-index: 12;
      box-sizing: border-box;
      background: url('./images/packages.png') center center / 100% 100%;
      padding: 0 .26rem;
      box-sizing: border-box;
      p {
        font-size: .28rem;
        font-weight: bold;
        color: rgba(95, 9, 7, 1);
        text-align: center;
        margin: .44rem 0 .31rem;
      }
      .packages {
        display: flex;
        justify-content: space-around;
        .item {
          width: 2.08rem;
          height: 2.77rem;
          text-align: center;
          background: rgba(255, 255, 255, 1);
          border-radius: .14rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 1.42rem;
            height: 1.42rem;
          }
          .item-text {
            font-size: 0.2rem;
            color: rgba(108, 108, 108, 1);
            line-height: 0.26rem;
          }
          .btn-price {
            margin-top: .13rem;
            width: 1.5rem;
            height: 0.5rem;
            line-height: 0.5rem;
            color: rgba(255, 255, 255, 1);
            border-radius: 0.25rem;
            font-size: 0.24rem;
            font-weight: bold;
            text-align: center;
            background: rgba(255, 47, 47, 1);
            &.gray {
              background: rgba(136, 136, 136, 1);
            }
          }
        }
      }
      .downarrow {
        position: absolute;
        top: -.38rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 1.79rem;
        height: .38rem;
        background: url('./images/downarrow.png') center center / 100% 100%;
      }
      &.gray:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0, 0, 0, .5);
        border-radius: .35rem .35rem 0 0;
      }
      &.gray:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 2.17rem;
        height: 2.17rem;
        background: url("./images/buyover.png");
        background-size: 100% 100%;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }

  /*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
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

  @keyframes tranRotateZ {
    0% {
      transform: rotateZ(0deg);
    }
    50% {
      transform: rotateZ(30deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
</style>
