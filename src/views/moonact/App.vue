<template>
  <div class="bigbonus" id="app" v-if="actInfo" :class="{fixed:$refs.dropDown&&$refs.dropDown.curIndex}">
    <img src="./images/back.png" alt="" class="back" @click="backHome">
    <img src="./images/rule.png" alt="" class="rule" @click="showPop(7)">
    <message ref="message"></message>
    <img src="./images/gonglue.png" alt="" class="gonglue" @click="showPop(9)">
    <img src="./images/rank.png" class="rank"
         @click="showPop(1,actInfo.personalUnReceive&&!actInfo.teamUnReceive?1:0)"></img>
    <div class="current_total">
      <div class="item">88888话费碎片</div>
      <div class="item">（8888荷灯）</div>
      <img src="./images/help.png" alt="" class="help">
    </div>
    <div class="wish_counttime">
      <div class="counttime">3:45:56后还愿</div>
      <div class="package">
        <div class="tips">待领取*3</div>
      </div>
    </div>
    <div class="wish_task">
      <div class="total">
        <div class="item">当前时段累计获得荷灯：25</div>
        <div class="item">中奖记录>></div>
      </div>
      <hit-percent :gameBetting="taskProgressInfoData.gameProgress.gameBetting"
                   :hbItems="taskProgressInfoData.gameProgress.progressList"
                   @refresh="_getInfo" @showPop="showPop" v-if="taskProgressInfoData"></hit-percent>
    </div>
    <drop-down ref="dropDown" :actInfoData="actInfo" @showPop="showPop"
               @refresh="_getInfo">
    </drop-down>
    <comPop :popType="popType" :actInfoData="actInfo" :awardData="awardData" ref="comPop"
            @close="closePop" @showPop="showPop" @opendown="$refs.dropDown.curIndex=1" @refresh="_getInfo"></comPop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </div>
</template>
<script>
  import {
    activityInfo,
    applyTeam,
    getDynamic,
    getCurrentTeamRank,
    getRankListPersonal,
    userProgress
  } from './utils/api'

  export default {
    name: 'bigbonus',
    data: () => ({
      popType: 0,
      hornList: [],
      showLoading: false,
      actInfo: null,
      awardData: null,
      timer: null,
      countTime: '',
      record: null,
      timerDynamic: null,
      taskProgressInfoData: null,
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
      message: () => import('./components/message'),
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
            this.countTime = `${hour ? countHour + '时' : ''}${countMinute}分${countSecond}秒`
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
            point = 'A_H5PT0323004011';
            break;//H5平台-七夕鹊桥会活动-领奖按钮点击
          case 3:
            point = 'A_H5PT0323004018';
            break;//H5平台-七夕鹊桥会活动-个人榜-上期排行框加载完成
          case 7:
            point = 'A_H5PT0323004007';
            break;//规则点击
          case 9:
            point = 'A_H5PT0323004008';
            break;//中奖攻略
          case 8:
            point = 'A_H5PT0323004014';
            break;//奖池计算说明
          case 10:
            point = 'A_H5PT0323004017';
            break;//H5平台-七夕鹊桥会活动-新增助力值弹窗加载完成
          case 11:
            point = 'A_H5PT0323004019';
            break;//H5平台-七夕鹊桥会活动-奖励待领取弹窗加载完成
          case 12:
            point = 'A_H5PT0323004010';
            break;//H5平台-七夕鹊桥会活动-入队成功弹窗加载完成
        }
        data && (this.awardData = data)
        if ([1, 2].includes(type)) {
          this.awardData = {
            tabIndex: data
          }
        }
        point && GLOBALS.marchSetsPoint(point)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      //返回
      backHome() {
        GLOBALS.marchSetsPoint('A_H5PT0323004006')
        history.back(-1)
      },
      //获取活动信息
      async _getInfo(isFirst = false) {
        let {code, data} = await activityInfo()
        if (code == 200) {
          this.actInfo = data
          this.countDown(data.countdown)
          this.taskProgressInfo()
          if (this.timerDynamic) {
            clearInterval(this.timerDynamic)
          }
          if (this.actInfo.state == 1) {//活动期间轮询接口
            this.timerDynamic = setInterval(() => {
              this.setJackpotAmount()
            }, 5000)
            this.getTodayData()
          }
          if (this.actInfo.firstLoadPopup) {//首次进入强弹活动攻略
            setTimeout(() => {
              this.showPop(9)
            }, 1500)
          } else if (this.actInfo.personalUnReceive || this.actInfo.teamUnReceive) {
            if (isFirst) {
              if (this.actInfo.incrNum) {
                this.awardData = {
                  popType: 10,
                  amount: this.actInfo.incrNum
                }
              }
              setTimeout(() => {
                this.showPop(11)
              }, 1500)
            } else {
              if (this.actInfo.incrNum) {
                this.awardData = {
                  amount: this.actInfo.incrNum
                }
                setTimeout(() => {
                  this.showPop(10)
                }, 1500)
              }
            }
          } else if (this.actInfo.incrNum) {
            this.awardData = {
              amount: this.actInfo.incrNum
            }
            setTimeout(() => {
              this.showPop(10)
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
          this.actInfo.dynamic = data
          if (this.round != this.actInfo.dynamic.round) {
            this._getInfo(false)
          }
        }
      },
      async operation() {
        if (this.actInfo.state == 1) {
          if (this.actInfo.userTeam == -1) {//入队
            GLOBALS.marchSetsPoint('A_H5PT0323004009')//H5平台-七夕鹊桥会活动-一键入队按钮点击
            let {code, data, message} = await applyTeam()
            if (code == 200) {
              this.awardData = {
                team: data
              }
              this.showPop(12)
              await this._getInfo(false)
              this.showFinger = true
              setTimeout(() => {
                this.showFinger = false
              }, 3000)
            } else {
              this.$toast.show({
                message
              })
            }
          } else {//助力
            GLOBALS.marchSetsPoint('A_H5PT0323004016')//H5平台-七夕鹊桥会活动-获取助力值按钮点击
            this.$nextTick(() => {
              this.$refs.dropDown.outHandleTab()
            })
          }
        }
      },
      changeTabIndex(index) {
        this.tabIndex = index
        this.getTodayData()
      },
      changeData() {
        GLOBALS.marchSetsPoint('A_H5PT0323004013')
        this.isBoyTeam = !this.isBoyTeam
        this.getTodayData()
      },
      async getTodayData() {
        if (this.actInfo.userTeam > -1) {
          this.record = null
          if (this.tabIndex == 0) {
            let {code, data} = await getCurrentTeamRank(this.isBoyTeam ? 1 : 0)
            if (code == 200) {
              this.record = data
            }
          } else {
            let {code, data} = await getRankListPersonal(true)
            if (code == 200) {
              this.record = data
            }
          }
        }
      },
      getAnchor(name) {
        if (window == window.top) {
          document.body.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76
          !document.body.scrollTop && (document.documentElement.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76)
        } else {
          document.getElementById('app').scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76
          this.isShowTopIcon = false
        }
      },
      async taskProgressInfo () {
        const { code, data } = await userProgress()
        if (code === 200) {
          this.taskProgressInfoData = data
        }
      },
    },
    async mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0323', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      await this.init()
      if (window == window.top) {
        window.onscroll = () => {
          //超过一屏就显示回到顶部的图标
          this.isShowTopIcon = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) >= 4.32 * this.fontsize
        }
      } else {
        window.ontouchmove = () => {
          //超过一屏就显示回到顶部的图标
          this.isShowTopIcon = document.getElementById('app').scrollTop >= 4.32 * this.fontsize
        }
      }
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
    .current_total{
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
      .item{
        &:nth-child(1){
          font-size: .36rem;
          font-weight: bold;
          color: #FF067B;
        }
        &:nth-child(2){
          margin-top: .01rem;
          font-size: .24rem;
          font-weight: 400;
          color: #431BB0;
        }
      }
      .help{
        width: .3rem;
        height: .3rem;
        position: absolute;
        top:.77rem;
        right: .6rem;
      }
    }
    .wish_counttime{
      width: 6.5rem;
      height: .96rem;
      background: url("./images/bottom_bg.png");
      background-size: 100% 100%;
      position: absolute;
      top: 8.43rem;
      left: 0;
      right: 0;
      margin: auto;
      .counttime{
        position: absolute;
        top:-.22rem;
        left:.31rem;
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
      .package{
        position: absolute;
        top:-1.16rem;
        right:.82rem;
        width: 1.88rem;
        height: 1.97rem;
        background: url("./images/package.png");
        background-size: 100% 100%;
        .tips{
          position: absolute;
          left: 1.31rem;
          top:-.09rem;
          width: 1.32rem;
          height: .46rem;
          line-height:.48rem;
          text-align: center;
          background: url("./images/tips.png");
          background-size: 100% 100%;
          font-size: .26rem;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
    }
    .wish_task{
      position: relative;
      width: 6.55rem;
      height: 3.5rem;
      background: linear-gradient(270deg, #FBD098, #FDECC3);
      border-radius: .16rem;
      margin: auto;
      padding: .15rem 0 0;
      box-sizing: border-box;
      .total{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0  .25rem;
        box-sizing: border-box;
        margin-bottom: .2rem;
        .item{
          &:nth-child(1){
            font-size: .28rem;
            font-weight: 400;
            color: #A55A1D;
          }
          &:nth-child(2){
            font-size: .24rem;
            font-weight: 400;
            color: #EB3618;
          }
        }
      }
    }
  }
</style>
