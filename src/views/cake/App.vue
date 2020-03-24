<template>
  <main class="cake-wrapper">
    <template v-if="!isShowRank">
      <article class="cake-container" v-if="actStateInfo.state!==4">
        <div class="back" @click="back"></div>
        <div class="add" @click.stop="showPopup(0)"></div>
        <div class="record" @click.stop="showRank"></div>
        <div class="sub-title"></div>
        <section class="cake-bg" :class="`state-${cakeState}`"
          @click="handleClick(actStateInfo.state)">
          <div class="cake-item" :class="[`level-${item.level}`,`status-${item.status}`]"
            v-for="(item,index) in configList" :key="index">
            <div class="lock"
              :class="{shake:item.isShake&&(index+1)%2,'shake-deff':item.isShake&&index%2}">
            </div>
            <div class="line"></div>
            <div class="desc">
              <p>瓜分<span>{{item.amount}}</span>话费券</p>
              <p>{{rechargeFilter(item.recharge)}}</p>
            </div>
            <div class="knife" v-if="item.status === 2 && currentOpenCakeIndex===item.level"></div>
            <div class="cake-img"
              :class="{'cake-fade-out':currentOpenCakeIndex===item.level || alreadyOpenedCakes.includes(item.level)}"
              v-if="item.status === 2 && isNeedOpen"></div>
          </div>
        </section>
      </article>
      <article class="cake-rule">
        <h2>活动规则</h2>
        <section>
          <p>
            1. 活动时间：{{activityInfo.timeline}}
          </p>
          <p>
            2. 瓜分条件（蛋糕顺序为从上至下）：<br>
            &nbsp;&nbsp;&nbsp;① 第1层蛋糕：每日任意付费可解锁参与瓜分。<br>
            &nbsp;&nbsp;&nbsp;② 第2层蛋糕：每日任意付费满10元可解锁参与<br>瓜分第1层和第2层蛋糕。<br>
            &nbsp;&nbsp;&nbsp;③ 第3层蛋糕：活动期间（截止{{endDate}}）累计<br>付费满88元可解锁参与瓜分。<br>
          </p>
          <p>
            3. 瓜分时间：第1层和第2层蛋糕解锁后即可瓜分，<br>第3层蛋糕{{endDate}}开启瓜分。<br>
            注意：第1层和第2层蛋糕为每日瓜分，瓜分截止时间为解锁次日10:00前，若用户未领取，则奖励自动失效，请及时参与瓜分。
          </p>
          <p>
            4. 瓜分规则：有资格参与瓜分的用户随机获得奖励，奖励随付费金额增加而变大。
          </p>
          <p>
            5. 奖品发放：奖励可能为话费券/优惠券/未中奖。瓜分所得奖励将发放至我的资产。
          </p>
          <p>
            6. 瓜分记录-我的记录：列表展示参与时间为每层蛋糕解锁时间，若使用加成卡，则加成卡的参与时间为使用加成卡的时间（即瓜分时间）。
          </p>
          <p>
            7. 活动结束后，奖励领取截止时间: {{showEndDate}}。活动期间所得奖励，若用户在活动结束后仍未领取，则自动失效。
          </p>
          <p class="bottom">
            活动最终解释权归平台所有
          </p>
        </section>
      </article>
      <article class="cake-btn" @click="handleClick(actStateInfo.state)">
        <section :class="{period:actStateInfo.state!==3,last:actStateInfo.state===3}"
          v-if="actStateInfo.state!==4">
          <div class="middle" v-if="actStateInfo.state===3">
            <p>{{actStateInfo.btn}}</p>
            <p class="sub">今日已有{{activityInfo.todayApplyNum}}人参与</p>
          </div>
          <template v-else>
            <div class="left-arrow" v-if="!countTime"></div>
            <div class="middle">
              <p>{{countTime}}{{actStateInfo.btn}}</p>
              <p class="sub">今日已有{{activityInfo.todayApplyNum}}人参与</p>
            </div>
            <div class="right-arrow" v-if="!countTime"></div>
          </template>
        </section>
        <section class="normal" v-else>
          <span>{{actStateInfo.btn}}</span>
        </section>
      </article>
    </template>
    <rank v-if="isShowRank" @on-back="closeRank"></rank>
    <pop-up v-show="isShowPopUp" :divideInfo="divideInfo" :type="popType" @change-type="changeType"
      @on-close="closePopup">
    </pop-up>
  </main>
</template>

<script>
import utils from '@/common/js/utils'
import { ActivityInfo, Divide } from './services/api'
import _get from 'lodash.get'
import Rank from './component/rank'
import PopUp from './component/popup'
export default {
  name: '',
  components: {
    Rank,
    PopUp
  },
  data () {
    return {
      activityInfo: {},
      configList: [],
      isShowRank: false,
      isShowPopUp: false,
      popType: null,
      endDate: '',
      showEndDate: '',
      countTime: '',
      countDownTimer: null,
      applyPopTimer: null,
      changeTypeTimer: null,
      openCakeTimer: null,
      cakeLevelTimer: null,
      divideInfo: {},
      divideDateStr: '',
      currentOpenCakeIndex: 0,
      alreadyOpenedCakes: [],
      isNeedOpen: false,
      inAnimation: false
    }
  },
  computed: {
    curChannel () {
      return localStorage.getItem('APP_CHANNEL') || utils.getUrlParam('channel')
    },
    sourceAddress () {
      return utils.getUrlParam('from')
    },
    isLastDay () {
      let current = new Date()
      let currentYear = current.getFullYear()
      let currentMonth = current.getMonth()
      let currentDate = current.getDate()
      let lastDay = new Date(this.activityInfo.endDate)
      let lastYear = lastDay.getFullYear()
      let lastMonth = lastDay.getMonth()
      let lastDate = lastDay.getDate()
      return currentYear === lastYear && currentMonth === lastMonth && currentDate === lastDate
    },
    cakeState () {
      if (this.configList.length === 3) {
        return this.configList.map(ele => ele.status).join('')
      } else {
        return '000'
      }
    },
    // 0 正常情况 1 最后一天最后一层 待瓜分 2 活动结束
    actStateInfo () {
      // 常规情况
      //    非最后一天
      //    000 任意付费参与
      //    100 瓜分蛋糕
      //    200 继续解锁下一层（当前付费2/10）
      //    210 瓜分蛋糕
      //    220 继续解锁下一层（累计付费x/x）
      //    221 倒计时后继续参与
      //    最后一天
      //    221 （活动结束前）3月23日 22：00开启奖池
      //    221 （活动已结束）瓜分蛋糕
      //    220， 222 （活动已结束） 活动已结束

      let lockedIndex = this.cakeState.indexOf('0')
      let unopenedIndex = this.cakeState.indexOf('1')
      let openedIndex = this.cakeState.indexOf('2')
      if (this.activityInfo.state === 2) {
        if (unopenedIndex >= 0) {
          return { state: 1, btn: '瓜分蛋糕' }
        } else {
          return { state: 4, btn: '活动已结束' }
        }
      } else if (lockedIndex === 0) {
        return { state: 0, btn: '任意付费参与' }
      } else if (this.isLastDay && unopenedIndex === 2) {
        return { state: 3, btn: `${this.endDate}开启奖池` }
      } else {
        if (unopenedIndex >= 0 && unopenedIndex < 2) {
          return { state: 1, btn: '瓜分蛋糕' }
        } else if (openedIndex === 0 && lockedIndex === 1) {
          return { state: 0, btn: `继续解锁(当前支付 ${this.activityInfo.todayRecharge}/${this.configList[1].recharge})` }
        } else if (openedIndex === 0 && lockedIndex === 2) {
          return { state: 0, btn: `继续解锁(累计支付 ${this.activityInfo.totalRecharge}/${this.configList[2].recharge})` }
        } else if (unopenedIndex === 2) {
          return { state: 2, btn: `后继续参与` }
        } else {
          return {}
        }
      }
    }
  },
  mounted () {
    this.getActivityInfo()
    GLOBALS.marchSetsPoint('P_H5PT0253', { 'source_address': GLOBALS.getUrlParam('from') || null }) // H5平台-蛋糕瓜分活动-页面加载完成
  },
  methods: {
    back () {
      location.href = window.SDK.getBackUrl()
    },
    async getActivityInfo () {
      this.isNeedOpen = false
      this.alreadyOpenedCakes = []
      const res = await ActivityInfo()
      let applyPopup = _get(res, 'data.applyPopup', false)
      let forgetPopup = _get(res, 'data.forgetPopup', false)
      this.activityInfo = _get(res, 'data', {})
      this.endDate = _get(res, 'data.endDate', '').slice(5)
      this.showEndDate = _get(res, 'data.showEndDate', '').slice(5)
      let configList = _get(res, 'data.configList', [])
      this.divideDateStr = _get(res, 'data.divideDateStr', '')
      if (applyPopup) {
        configList = configList.map(item => {
          if (item.status === 1) {
            item.status = 0
            item.isShake = true
          }
          return item
        })
        this.applyPopTimer = setTimeout(() => {
          this.showPopup(1)
          clearTimeout(this.applyPopTimer)
        }, 1200)
      } else if (forgetPopup) {
        this.showPopup(2)
      }
      this.configList = configList
    },
    async divide () {
      this.inAnimation = true
      this.alreadyOpenedCakes = []
      const res = await Divide(this.divideDateStr)
      let code = _get(res, 'code', 0)
      if (code === 200) {
        this.divideInfo = _get(res, 'data', {})
        let openCakeLevelArr = []
        this.divideInfo.divideList.sort((a, b) => a.level - b.level).forEach(element => {
          this.configList.forEach(item => {
            if (item.level === element.level) {
              this.isNeedOpen = true
              openCakeLevelArr.push(item.level)
              item.status = 2
            }
          })
        })
        let length = openCakeLevelArr.length
        if (length > 0) {
          let number = 0
          this.$set(this, 'currentOpenCakeIndex', openCakeLevelArr.shift())
          this.alreadyOpenedCakes.push(this.currentOpenCakeIndex)
          this.cakeLevelTimer = setInterval(() => {
            if (number < length) {
              number++
              this.$set(this, 'currentOpenCakeIndex', openCakeLevelArr.shift())
              this.alreadyOpenedCakes.push(this.currentOpenCakeIndex)
            } else {
              clearInterval(this.cakeLevelTimer)
            }
          }, 4000)
          this.openCakeTimer = setTimeout(() => {
            this.inAnimation = false
            clearTimeout(this.openCakeTimer)
            this.showPopup(3)
          }, 4000 * length + 200)
        } else {
          this.inAnimation = false
        }
      } else {
        this.inAnimation = false
        this.$toast.show({
          message: '正在结算中，请稍后再试',
          isOneLine: true,
          duration: 3000
        })
      }
    },
    showRank () {
      if (this.inAnimation) return
      this.isShowRank = true
    },
    closeRank () {
      this.isShowRank = false
    },
    showPopup (type) {
      if (this.inAnimation) return
      this.popType = type
      this.isShowPopUp = true
    },
    closePopup () {
      this.popType = null
      this.divideInfo = {}
      this.isShowPopUp = false
      this.getActivityInfo()
    },
    changeType (type) {
      this.isShowPopUp = false
      this.changeTypeTimer = setTimeout(() => {
        clearTimeout(this.changeTypeTimer)
        this.showPopup(type)
      }, 200)
    },
    handleClick (state) {
      switch (state) {
        case 1:
          GLOBALS.marchSetsPoint('A_H5PT0253003021') // H5平台-蛋糕瓜分活动-瓜分蛋糕按钮点击
          this.divide()
          break
        case 2:
          this.$toast.show({
            message: `${this.endDate}开启瓜分`,
            isOneLine: true,
            duration: 3000
          })
          break
        case 3:
          this.$toast.show({
            message: '还没到瓜分时间哦～～',
            isOneLine: true,
            duration: 3000
          })
          break
        case 4:
          this.$toast.show({
            message: '活动已结束',
            isOneLine: true,
            duration: 3000
          })
          break

        default:
          if (this.actStateInfo.state === 0 && this.actStateInfo.btn === '任意付费参与') {
            GLOBALS.marchSetsPoint('A_H5PT0253003018') // H5平台-蛋糕瓜分活动-任意付费按钮点击
          }
          this.showPopup(0)
          break
      }
    },
    countDown () {
      let nowDate = new Date().setMilliseconds(0)
      let nextDate = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000
      let date = (nextDate - nowDate) / 1000
      this.countDownTimer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.countDownTimer)
        }
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        this.countTime = `${countHour}:${countMinute}:${countSecond}`
        console.log(this.countTime)
      }, 1000)
    },
    rechargeFilter (recharge) {
      switch (recharge) {
        case 10:
          return '付费满10元解锁'
        case 88:
          if (this.configList[2].state === 0) {
            return '活动期间累计付费满88元解锁'
          } else {
            return `${this.endDate}开启瓜分`
          }
        default:
          return '任意付费解锁'
      }
    }
  },
  watch: {
    actStateInfo: {
      deep: true,
      handler (val, oldVal) {
        clearInterval(this.countDownTimer)
        this.countTime = ''
        if (val.state === 2) {
          this.$nextTick(() => {
            this.countDown()
          })
        }
      }
    }
  },
  destroyed () {
    clearTimeout(this.applyPopTimer)
    clearTimeout(this.changeTypeTimer)
    clearInterval(this.countDownTimer)
    clearTimeout(this.openCakeTimer)
    clearTimeout(this.cakeLevelTimer)
    this.this.applyPopTimer = null
    this.changeTypeTimer = null
    this.countDownTimer = null
    this.openCakeTimer = null
    this.cakeLevelTimer = null
  }
}
</script>

<style lang="less" scoped>
.bg-center (@url) {
  background: url(@url) no-repeat center top;
  background-size: 100% 100%;
}
.cake-wrapper {
  min-height: 100vh;
  width: 100%;
  background: #320e12 no-repeat center top;
  background-size: 100% auto;
  font-family: aAlibaba PuHuiTil;
  font-size: 0.2rem;
  overflow-x: hidden;
  .cake-container {
    width: 100%;
    min-height: 530px;
    background: #320e12 url(./img/bg.png) no-repeat center -0.02rem;
    background-size: 100% auto;
    position: relative;
    padding: 0.1rem 0 0;
    box-sizing: border-box;
    .back {
      width: 0.62rem;
      height: 0.56rem;
      .bg-center("./img/back.png");
      position: absolute;
      left: 0;
      top: 0.52rem;
    }
    .add {
      width: 0.92rem;
      height: 0.8rem;
      .bg-center("./img/add-icon.png");
      position: absolute;
      right: 0.1rem;
      top: 1.54rem;
      z-index: 3;
    }
    .record {
      width: 0.92rem;
      height: 0.8rem;
      .bg-center("./img/record-icon.png");
      position: absolute;
      right: 0.1rem;
      top: 2.46rem;
      z-index: 3;
    }
    .sub-title {
      width: 1.56rem;
      height: 0.8rem;
      .bg-center("./img/subtitle.png");
      position: absolute;
      top: 1.7rem;
      left: 2.84rem;
    }
    .cake-bg {
      width: 4.98rem;
      height: 6.56rem;
      position: relative;
      margin: 1.9rem 1.06rem 0 1.16rem;
      &.state-000 {
        .bg-center("./img/state-000.png");
      }
      &.state-001 {
        .bg-center("./img/state-001.png");
      }
      &.state-002 {
        .bg-center("./img/state-002.png");
      }
      &.state-100 {
        .bg-center("./img/state-100.png");
      }
      &.state-101 {
        .bg-center("./img/state-101.png");
      }
      &.state-110 {
        .bg-center("./img/state-110.png");
      }
      &.state-111 {
        .bg-center("./img/state-111.png");
      }
      &.state-200 {
        .bg-center("./img/state-200.png");
      }
      &.state-201 {
        .bg-center("./img/state-201.png");
      }
      &.state-202 {
        .bg-center("./img/state-202.png");
      }
      &.state-210 {
        .bg-center("./img/state-210.png");
      }
      &.state-211 {
        .bg-center("./img/state-211.png");
      }
      &.state-220 {
        .bg-center("./img/state-220.png");
      }
      &.state-221 {
        .bg-center("./img/state-221.png");
      }
      &.state-222 {
        .bg-center("./img/state-222.png");
      }
      .cake-item {
        width: 100%;
        position: relative;
        .knife {
          width: 1.37rem;
          height: 0.6rem;
          position: absolute;
          .bg-center("./img/knife.png");
        }
        .lock {
          width: 0.12rem;
          height: 0.12rem;
          background: #fff;
          border-radius: 50%;
          position: absolute;
        }
        .desc {
          color: #ac7f61;
          font-size: 0.2rem;
          width: 1.9rem;
          border-radius: 0.2rem;
          background-color: rgba(0, 0, 0, 0.4);
          padding: 0.1rem;
          position: absolute;
          bottom: 0.6rem;
          line-height: 0.24rem;
          span {
            color: #d33124;
            font-size: 0.28rem;
          }
        }
        .line {
          background: #fff;
          height: 0.01rem;
          position: absolute;
        }
        .cake-fade-out {
          animation: cakeFadeOut 1s forwards ease-in 3s;
        }
        &.level-1 {
          height: 2.6rem;
          z-index: 2;
          .lock {
            bottom: 0.6rem;
            left: 1.5rem;
          }
          .desc {
            left: -1rem;
          }
          .line {
            width: 0.5rem;
            left: 1.08rem;
            bottom: 0.74rem;
            transform-origin: center center;
            transform: rotateZ(15deg);
          }
          .cake-img {
            position: absolute;
            bottom: 0.03rem;
            right: 1.62rem;
            width: 1.22rem;
            height: 1.46rem;
            .bg-center("./img/cake-1.png");
          }
          .knife {
            right: 0rem;
            bottom: 1.2rem;
            animation: knife1 3s forwards ease-in;
          }
        }
        &.level-2 {
          height: 1.8rem;
          z-index: 1;
          .lock {
            bottom: 0.64rem;
            right: 0.7rem;
          }
          .desc {
            right: -1rem;
            bottom: 0.84rem;
          }
          .line {
            width: 0.5rem;
            right: 0.22rem;
            bottom: 0.76rem;
            transform-origin: center center;
            transform: rotateZ(-15deg);
          }
          .cake-img {
            position: absolute;
            bottom: 0.06rem;
            right: 1.26rem;
            width: 1.64rem;
            height: 1.9rem;
            .bg-center("./img/cake-2.png");
          }
          .knife {
            right: -0.1rem;
            bottom: 1.1rem;
            animation: knife2 3s forwards ease-in;
          }
        }
        &.level-3 {
          height: 2.16rem;
          .lock {
            bottom: 0.7rem;
            left: 1.5rem;
          }
          .desc {
            left: -1rem;
          }
          .line {
            width: 0.5rem;
            left: 1.08rem;
            bottom: 0.82rem;
            transform-origin: center center;
            transform: rotateZ(15deg);
          }
          .cake-img {
            position: absolute;
            bottom: 0rem;
            right: 0.8rem;
            width: 1.98rem;
            height: 2.32rem;
            .bg-center("./img/cake-3.png");
          }
          .knife {
            right: -0.5rem;
            bottom: 1.5rem;
            animation: knife3 3s forwards ease-in;
          }
        }

        &.status-0 {
          .lock {
            width: 0.54rem;
            height: 0.54rem;
            .bg-center("./img/lock-icon.png");
            position: absolute;
            bottom: 0.4rem;
            left: 50%;
            margin-left: -0.27rem;
          }
          .desc {
            color: #ffdb6e;
            span {
              color: #d33124;
            }
          }
          &.level-1 {
            .line {
              width: 1.2rem;
              bottom: 0.8rem;
              transform-origin: center center;
              transform: rotateZ(10deg);
            }
            .desc {
              animation: verticalShake 3s infinite;
            }
          }
          &.level-2 {
            .lock {
              bottom: 0.5rem;
              right: 1.8rem;
            }
            .line {
              width: 1.2rem;
              right: 1.08rem;
              bottom: 0.94rem;
              transform-origin: center center;
              transform: rotateZ(-10deg);
            }
            .desc {
              animation: verticalShake 3s infinite 0.4s;
            }
          }
          &.level-3 {
            .lock {
              bottom: 0.6rem;
            }
            .line {
              width: 1.2rem;
              bottom: 1rem;
              transform-origin: center center;
              transform: rotateZ(10deg);
            }
            .desc {
              animation: verticalShake 3s infinite 0.8s;
            }
          }
        }
      }
    }
  }
  .cake-rule {
    color: #ac7f61;
    font-size: 0.24rem;
    padding: 0.24rem 0.42rem 0.32rem;
    h2 {
      font-size: 0.3rem;
      text-align: center;
    }
    p {
      margin: 0.3rem auto;
    }
    .bottom {
      color: #604634;
      font-size: 0.2rem;
      text-align: center;
      margin: 0.6rem auto 1.2rem;
    }
  }
  .cake-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    section {
      width: 100%;
      height: 0.94rem;
      background: no-repeat center top;
      background-size: 100% 100%;
      font-weight: 800;
      font-size: 0.32rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 0.1rem;
      box-sizing: border-box;
    }
    .normal {
      background-image: url(./img/bottom-normal-btn-bg.png);
      color: #fff;
    }
    .period,
    .last {
      .middle {
        text-align: center;
        min-width: 3rem;
        line-height: 0.34rem;
        margin: auto 0.4rem;
        .sub {
          font-size: 0.2rem;
          color: #cf7500;
        }
      }
      .left-arrow {
        width: 0.84rem;
        height: 0.22rem;
        animation: sway 1s infinite;
        .bg-center("./img/arrow.png");
      }
      .right-arrow {
        width: 0.84rem;
        height: 0.22rem;
        .bg-center("./img/arrow.png");
        animation: swayDeff 1s infinite;
      }
    }
    .period {
      background-image: url(./img/bottom-period-btn-bg.png);
      color: #cf3600;
    }
    .last {
      background-image: url(./img/bottom-last-btn-bg.png);
      color: #cf3600;
      .middle {
        .sub {
          color: #ffd631;
        }
      }
    }
  }
}
.shake {
  animation: shake 1s;
}
.shake-deff {
  animation: shake 1s reverse;
}
@keyframes verticalShake {
  0% {
    transform: translate3d(0, 0, 0);
  }
  25% {
    transform: translate3d(0, -0.1rem, 0);
  }
  50% {
    transform: translate3d(0, 0, 0);
  }
  75% {
    transform: translate3d(0, -0.1rem, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes Shake {
  0% {
    transform: translate3d(0, 0, 0);
  }
  20% {
    transform: translate3d(0, 0.1rem, 0);
  }
  40% {
    transform: translate3d(0, -0.1rem, 0);
  }
  60% {
    transform: translate3d(0, 0.04rem, 0);
  }
  80% {
    transform: translate3d(0, -0.04rem, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes shake {
  0% {
    transform: translate3d(0, 0, 0);
  }
  10% {
    transform: translate3d(-0.1rem, 0, 0);
  }
  20% {
    transform: translate3d(0.1rem, 0, 0);
  }
  30% {
    transform: translate3d(-0.04rem, 0, 0);
  }
  40% {
    transform: translate3d(0.04rem, 0, 0);
  }
  50% {
    transform: translate3d(0, 0, 0);
  }
  60% {
    transform: translate3d(0, 0.1rem, 0);
  }
  70% {
    transform: translate3d(0, -0.1rem, 0);
  }
  80% {
    transform: translate3d(0, 0.04rem, 0);
  }
  90% {
    transform: translate3d(0, -0.04rem, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes sway {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  20% {
    transform: translate3d(-0.3rem, 0, 0) scale(1.1);
  }
  40% {
    transform: translate3d(0.3rem, 0, 0) scale(1.1);
  }
  60% {
    transform: translate3d(-0.1rem, 0, 0) scale(0.9);
  }
  80% {
    transform: translate3d(0.1rem, 0, 0) scale(0.9);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
}
@keyframes swayDeff {
  0% {
    transform: translate3d(0, 0, 0) rotateY(180deg) scale(1);
  }
  20% {
    transform: translate3d(0.3rem, 0, 0) rotateY(180deg) scale(1.1);
  }
  40% {
    transform: translate3d(-0.3rem, 0, 0) rotateY(180deg) scale(1.1);
  }
  60% {
    transform: translate3d(0.1rem, 0, 0) rotateY(180deg) scale(0.9);
  }
  80% {
    transform: translate3d(-0.1rem, 0, 0) rotateY(180deg) scale(0.9);
  }
  100% {
    transform: translate3d(0, 0, 0) rotateY(180deg) scale(1);
  }
}
@keyframes knife1 {
  0% {
    transform: translate3d(0, 0.1rem, 0) rotateY(0deg);
    opacity: 1;
  }
  10% {
    transform: translate3d(-1.1rem, 0.1rem, 0) rotateY(0deg);
    opacity: 1;
  }
  15% {
    transform: translate3d(-1.1rem, 0.6rem, 0) rotateY(0deg);
    opacity: 1;
  }
  20% {
    transform: translate3d(-0.6rem, 0.6rem, 0) rotateY(0deg);
    opacity: 1;
  }
  25% {
    transform: translate3d(-1.1rem, 1.2rem, 0) rotateY(0deg);
    opacity: 1;
  }
  30% {
    transform: translate3d(0, 1.2rem, 0) rotateY(0deg);
    opacity: 1;
  }
  40% {
    transform: translate3d(0, 0.1rem, 0) rotateY(0deg);
    opacity: 1;
  }
  41% {
    transform: translate3d(0, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
  50% {
    transform: translate3d(-2.8rem, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
  60% {
    transform: translate3d(-2.8rem, 0.1rem, 0) rotateY(180deg);
    opacity: 1;
  }
  70% {
    transform: translate3d(-2rem, 0.1rem, 0) rotateY(180deg);
    opacity: 1;
  }
  75% {
    transform: translate3d(-2rem, 0.6rem, 0) rotateY(180deg);
    opacity: 1;
  }
  80% {
    transform: translate3d(-2.4rem, 1.2rem, 0) rotateY(180deg);
    opacity: 1;
  }
  85% {
    transform: translate3d(-2rem, 1.2rem, 0) rotateY(180deg);
    opacity: 1;
  }
  90% {
    transform: translate3d(-2.8rem, 1.2rem, 0) rotateY(180deg);
    opacity: 1;
  }
  91% {
    transform: translate3d(-2.8rem, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
  100% {
    transform: translate3d(-2.8rem, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
}
@keyframes knife2 {
  0% {
    transform: translate3d(0, 0.1rem, 0) rotateY(0deg);
    opacity: 1;
  }
  10% {
    transform: translate3d(-0.8rem, 0.1rem, 0) rotateY(0deg);
    opacity: 1;
  }
  15% {
    transform: translate3d(-0.8rem, 0.6rem, 0) rotateY(0deg);
    opacity: 1;
  }
  20% {
    transform: translate3d(-0.6rem, 0.6rem, 0) rotateY(0deg);
    opacity: 1;
  }
  25% {
    transform: translate3d(-0.8rem, 1.2rem, 0) rotateY(0deg);
    opacity: 1;
  }
  30% {
    transform: translate3d(0, 1.2rem, 0) rotateY(0deg);
    opacity: 1;
  }
  40% {
    transform: translate3d(0, 0.1rem, 0) rotateY(0deg);
    opacity: 1;
  }
  41% {
    transform: translate3d(0, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
  50% {
    transform: translate3d(-3.2rem, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
  60% {
    transform: translate3d(-3.2rem, 0.1rem, 0) rotateY(180deg);
    opacity: 1;
  }
  70% {
    transform: translate3d(-2.2rem, 0.1rem, 0) rotateY(180deg);
    opacity: 1;
  }
  75% {
    transform: translate3d(-2.2rem, 0.6rem, 0) rotateY(180deg);
    opacity: 1;
  }
  80% {
    transform: translate3d(-2.6rem, 1.2rem, 0) rotateY(180deg);
    opacity: 1;
  }
  85% {
    transform: translate3d(-2.2rem, 1.2rem, 0) rotateY(180deg);
    opacity: 1;
  }
  90% {
    transform: translate3d(-3.2rem, 1.2rem, 0) rotateY(180deg);
    opacity: 1;
  }
  91% {
    transform: translate3d(-3.2rem, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
  100% {
    transform: translate3d(-3.2rem, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
}
@keyframes knife3 {
  0% {
    transform: translate3d(0, 0.1rem, 0) rotateY(0deg);
    opacity: 1;
  }
  10% {
    transform: translate3d(-0.8rem, 0.1rem, 0) rotateY(0deg);
    opacity: 1;
  }
  15% {
    transform: translate3d(-0.8rem, 0.6rem, 0) rotateY(0deg);
    opacity: 1;
  }
  20% {
    transform: translate3d(-0.4rem, 0.6rem, 0) rotateY(0deg);
    opacity: 1;
  }
  25% {
    transform: translate3d(-0.8rem, 1.2rem, 0) rotateY(0deg);
    opacity: 1;
  }
  30% {
    transform: translate3d(0, 1.2rem, 0) rotateY(0deg);
    opacity: 1;
  }
  40% {
    transform: translate3d(0, 0.1rem, 0) rotateY(0deg);
    opacity: 1;
  }
  41% {
    transform: translate3d(0, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
  50% {
    transform: translate3d(-3.2rem, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
  60% {
    transform: translate3d(-3.2rem, 0.1rem, 0) rotateY(180deg);
    opacity: 1;
  }
  70% {
    transform: translate3d(-2.5rem, 0.1rem, 0) rotateY(180deg);
    opacity: 1;
  }
  75% {
    transform: translate3d(-2.5rem, 0.6rem, 0) rotateY(180deg);
    opacity: 1;
  }
  80% {
    transform: translate3d(-2.9rem, 1.2rem, 0) rotateY(180deg);
    opacity: 1;
  }
  85% {
    transform: translate3d(-2.5rem, 1.2rem, 0) rotateY(180deg);
    opacity: 1;
  }
  90% {
    transform: translate3d(-3.2rem, 1.2rem, 0) rotateY(180deg);
    opacity: 1;
  }
  91% {
    transform: translate3d(-3.2rem, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
  100% {
    transform: translate3d(-3.2rem, 0.1rem, 0) rotateY(180deg);
    opacity: 0;
  }
}
@keyframes cakeFadeOut {
  0% {
    transform: translate3d(0, 0, 0) rotateY(0deg);
    opacity: 1;
  }
  100% {
    transform: translate3d(3rem, -1.2rem, 0) rotateY(0deg);
    opacity: 0;
  }
}
</style>
