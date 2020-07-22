<template>
  <div class="bigbonus" v-if="actInfo">
    <div class="bigbonus-container" :class="{fixed:$refs.dropDown&&$refs.dropDown.curIndex}">
      <img src="./images/back.png" alt="" class="back" @click="backHome">
      <img src="./images/rule.png" alt="" class="rule" @click="showPop(7)">
      <img src="./images/gonglue.png" alt="" class="gonglue" @click="showPop(9)">
      <img src="./images/today_rank.png" alt="" class="rank" @click="showPop(4)" v-if="actInfo.state==1">
      <img src="./images/yesterday_rank.png" alt="" class="rank" @click="showPop(3)" v-if="actInfo.state>1">
      <div class="horn_container">
        <div class="surplus" v-if="countdown.time">距离结束剩余{{countdown.time}}</div>
        <div class="surplus" v-else style="font-size: .3rem">活动已结束</div>
        <div class="hornDiv" v-if="hornList.length">
          <horn :noticeList="hornList"></horn>
        </div>
      </div>
      <div class="gain_quan" v-if="actInfo.state==1">
        <img src="./images/quan.png" alt="" class="quan" v-if="countdown1.time">
        <img src="./images/animation.gif" alt="" class="quan animation" @click="gainQuan" v-else>
        <template v-if="countdown1.time">
          <img src="./images/gain_quancountdown.png" alt="" class="quancountdown">
          <div class="counttime">
            <div class="countdown_item" v-for="item in countdown1.time.split('')">
              <i v-if="![':'].includes(item)">{{item}}</i>
              <template v-else>{{item}}</template>
            </div>
          </div>
        </template>
        <img src="./images/gain_quanbtn.png" alt="" v-else style="width: .89rem;height: .4rem;margin-top: .02rem"
             @click="gainQuan">
      </div>
      <div class="surplus_info">
        <div class="item">今日剩余抽奖券：<i>{{actInfo.userInfo.remnantNum}}</i></div>
        <div class="item" @click="showPop(1)">中奖记录>></div>
      </div>
      <div class="today_pool">
        <img src="./images/how.png" alt="" @click="showPop(8)">
        <div class="pool_num">{{actInfo.jackpotAmount}}</div>
      </div>
      <div class="luck_draw">
        <div class="item" v-for="(item,index) in actInfo.drawList" @click="drawLuck(item)">
          <span class="luck_draw_click">点击抽奖></span>
          <div class="luck_draw_info"><img src="./images/prize_quan.png" alt="">X{{item.amount}}</div>
          <div class="tip">
            <span>单次最高中奖池</span>
            <span><i>{{item.showRate}}%</i></span>
          </div>
        </div>
      </div>
      <div class="extra_prize">
        <div class="info">当天累计消耗<i>3000抽奖券</i>，下次高额券抽最多<i>3%</i>奖池</div>
        <div class="list">
          <div class="item" v-for="(item,index) in actInfo.consumeList">
            <div class="percent">
              <div class="percent_div" :class="{gray:item.state==2,light:item.state==1}">
                <span>最高瓜分奖池</span>
                <span class="percent_num">{{percent[index]}}%</span>
              </div>
              <img src="./images/extra_next.png" alt="" v-if="index<2">
            </div>
            <div class="num" :class="{gray:item.state==2,light:item.state==1}">{{item.total}}</div>
            <div class="info" :class="{gray:item.state==2,light:item.state==1}">消耗抽奖券</div>
          </div>
        </div>
      </div>
    </div>
    <drop-down v-if="actInfo.state==1" ref="dropDown" :totalNum="actInfo.userInfo.totalNum" @showPop="showPop"
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
      percent:['0.5','1','3']
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
        window.location.href = "//wap.beeplaying.com/xmWap/#/"
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
                duration: 1000
              })
              setTimeout(() => {
                this.showPop(3)
              }, 1000)
            }
          }
          if (this.timer) {
            clearInterval(this.timer)
          }
          this.timer = setInterval(() => {
            this.setJackpotAmount()
          }, 5000)
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
    background: #2E016A;
    padding-bottom: .94rem;
    .bigbonus-container {
      width: 100%;
      height: 11.35rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: relative;
      padding-top: 2.74rem;
      box-sizing: border-box;
      &.fixed {
        position: fixed;
      }
      .back, .rule, .gonglue {
        width: .85rem;
        height: .85rem;
        position: absolute;
        top: .08rem;
        left: .12rem;
        &.rule {
          top: 1.01rem;
        }
        &.gonglue {
          top: 1.94rem;
        }
      }
      .rank {
        width: .88rem;
        height: .87rem;
        position: absolute;
        top: 1.81rem;
        right: .13rem;
      }
      .horn_container {
        position: absolute;
        top: -.05rem;
        left: 1.01rem;
        width: 5.15rem;
        height: 2.65rem;
        background: url("./images/horn_container.png");
        background-size: 100% 100%;
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
      .gain_quan {
        position: absolute;
        top: .18rem;
        right: .04rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .quan {
          width: .84rem;
          height: .95rem;
          &.animation{
            width: .97rem;
            height: 1.05rem;
          }
        }
        .quancountdown {
          width: 1.08rem;
          height: .3rem;
        }
        .counttime {
          font-size: 0.18rem;
          font-weight: 400;
          color: rgba(255, 238, 214, 1);
          display: flex;
          align-items: center;
          .countdown_item {
            color: rgba(255, 238, 214, 1);
            i {
              display: inline-block;
              width: 0.14rem;
              height: 0.18rem;
              color: rgba(255, 51, 42, 1);
              line-height: 0.2rem;
              text-align: center;
              background: rgba(255, 238, 214, 1);
              border-radius: 0.02rem;
              margin: 0 0.01rem;
            }
          }
        }
      }
      .surplus_info {
        padding: 0 1.04rem 0 .88rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-bottom: .1rem;
        i {
          color: #FFBF50;
        }
      }
      .today_pool {
        position: relative;
        width: 6.4rem;
        height: 2.51rem;
        background: url("./images/today_bonus.png");
        background-size: 100% 100%;
        margin: 0 auto .07rem;
        &:before {
          content: '今日奖池';
          position: absolute;
          top: .43rem;
          left: 2.49rem;
          font-size: .36rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        &:after {
          content: '(话费碎片)';
          position: absolute;
          bottom: .48rem;
          left: 2.64rem;
          font-size: .24rem;
          font-weight: 400;
          color: rgba(174, 128, 210, 1);
        }
        img {
          position: absolute;
          top: .37rem;
          right: .48rem;
          width: .33rem;
          height: .33rem;
        }
        .pool_num {
          position: absolute;
          top: .85rem;
          left: 0;
          right: 0;
          margin: auto;
          font-size: .8rem;
          font-weight: bold;
          color: rgba(229, 94, 49, 1);
          text-align: center;
        }
      }
      .luck_draw {
        display: flex;
        justify-content: center;
        margin-bottom: .17rem;
        .item {
          width: 3.14rem;
          height: 1.52rem;
          background: url("./images/prizebtn0.png");
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-bottom: .1rem;
          box-sizing: border-box;
          .luck_draw_click {
            font-size: .36rem;
            font-weight: bold;
            color: rgba(255, 227, 216, 1);
          }
          .luck_draw_info {
            margin-top: .1rem;
            font-size: .3rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
            img {
              width: .77rem;
              height: .44rem;
              margin-right: .12rem;
            }
          }
          .tip {
            content: '';
            position: absolute;
            width: 1.75rem;
            height: .8rem;
            background: url("./images/tips0.png");
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: .18rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            top: -.55rem;
            padding-bottom: .05rem;
            box-sizing: border-box;
            i {
              font-size: .36rem;
              font-weight: bold;
              color: rgba(255, 203, 68, 1);
              line-height: 1;
            }
          }
          &:nth-child(1) {
            .tip {
              left: 0;
            }
          }
          &:nth-child(2) {
            margin-left: .2rem;
            background: url("./images/prizebtn1.png");
            background-size: 100% 100%;
            .tip {
              background: url("./images/tips1.png");
              background-size: 100% 100%;
              right: 0;
            }
          }
        }
      }
      .extra_prize {
        width: 6.28rem;
        height: 3.36rem;
        background: url("./images/extra_bg.png");
        background-size: 100% 100%;
        padding-top: .68rem;
        box-sizing: border-box;
        margin: 0 auto;
        .info {
          font-size: .24rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          i {
            color: #E55E31;
          }
        }
        .list {
          display: flex;
          justify-content: center;
          .item {
            text-align: center;
            .percent {
              height: 1.71rem;
              display: flex;
              justify-content: center;
              align-items: center;
              .percent_div {
                width: 1.31rem;
                height: 1.36rem;
                background: url("./images/extra.png");
                background-size: 100% 100%;
                padding-top: .16rem;
                box-sizing: border-box;
                text-align: center;
                display: flex;
                flex-direction: column;
                span {
                  font-size: .18rem;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  &.percent_num {
                    display: inline-block;
                    margin-top: .1rem;
                    font-size: .36rem;
                    font-weight: bold;
                    color: rgba(252, 236, 63, 1);
                  }
                }
                &.gray {
                  background: url("./images/extra_gray.png");
                  background-size: 100% 100%;
                }
                &.light {
                  width: 1.66rem;
                  height: 1.71rem;
                  background: url("./images/extra_light.png");
                  background-size: 100% 100%;
                  padding-top: .33rem;
                  box-sizing: border-box;
                }
              }
              img {
                width: .22rem;
                height: .35rem;
                margin: 0 .1rem;
              }
            }
            .num, .info {
              width: 1.31rem;
              text-align: center;
              &.light {
                width: 1.66rem;
              }
              &.num {
                font-size: .3rem;
                font-weight: bold;
                color: rgba(252, 236, 63, 1);
              }
              &.info {
                font-size: .2rem;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
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
