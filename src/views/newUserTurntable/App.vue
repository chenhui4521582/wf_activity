<template>
  <div id="app" ref="app" class="turn-wrap" v-if="info.state">
    <template v-if="!isDetailShow">
      <div class="top">
        <p class="back" @click="back"><span>返回</span></p>
        <template v-if="info.countdown>0">
          <span>&nbsp;&nbsp;限时福利&nbsp;</span>剩余&nbsp;<em>{{countTime.day}}</em>&nbsp;天&nbsp;<em>{{countTime.hour}}</em>&nbsp;小时&nbsp;<em>{{countTime.minute}}</em>&nbsp;分
        </template>
        <template v-else>
          <span>活动已结束</span>
        </template>
      </div>
      <div class="top-btn-wrap">
        <div class="btn left" @click="showRule()">玩法说明</div>
        <div class="btn right" @click="goMy()">我的奖品</div>
      </div>
      <div class="main">
        <div class="list-wrap">
          <div class="awards-list" ref="wheel"
            :style="{backgroundImage:'url(' + imgFilter(info.wheelImage) + ')'}">
            <ul>
              <li v-for="(item,index) in info.wheelConfigList.length" :key="index"
                :style="rotate[index]"></li>
            </ul>
          </div>
          <div class="pointer" @click="betting()">
            <span>({{info.newUserInfo&&info.newUserInfo.betTimes || 0}}次)</span></div>
        </div>
      </div>
      <div class="active-info-wrap">
        <template v-if="info.newUser">
          <div class="money-wrap">
            <p>已抽到: <span>{{info.newUserInfo.envelopeRmb||0 }}</span>元
            </p>
            <p>
              <template v-if="info.newUserInfo.envelopeRmb>=info.convertConsumeRmb">
                达到提现门槛，快去领话费吧
              </template>
              <template v-else>
                还差{{Math.floor((info.convertConsumeRmb - info.newUserInfo.envelopeRmb)*100)/100}}元就可以提现了
              </template>
            </p>
          </div>
          <div class="cash-out">
            <div class="percent-wrapper">
              <div class="percent-bg">
                <div class="percent"
                  :style="{width:`${info.convertConsumeRmb>info.newUserInfo.envelopeRmb?info.newUserInfo.envelopeRmb/info.convertConsumeRmb*100:100}%`,borderRadius: info.convertConsumeRmb>info.newUserInfo.envelopeRmb?'0.08rem 0 0 0.08rem':'0.08rem'}">
                  <p>{{info.newUserInfo.envelopeRmb}}<span>元</span></p>
                </div>
              </div>
              <p>{{info.convertConsumeRmb}}<span>元</span></p>
            </div>
            <div class="btn" @click="_convert()">提现</div>
          </div>
        </template>
      </div>
      <div class="task-wrap">
        <div class="task-content">
          <img class="task-title" src="./img/task-title.png" alt="">
          <ul class="task-list">
            <li class="list-item" v-for="(item,index) of taskList">
              <div class="icon-wrap">
                <img :src="item.icon|filter" alt="">
              </div>
              <div class="content-wrap">
                <div class="name">{{item.taskName}}</div>
                <div class="other">
                  <div class="percent-wrap">
                    <div class="percent" :style="{width:item.finishNum/item.taskOps * 100 + '%'}">
                    </div>
                    <div class="text-percent">{{item.finishNum}}/{{item.taskOps}}</div>
                  </div>
                  <div class="awards">
                    <div class="icon"><img :src="item.awardsImage|filter" alt=""></div>
                    <p>x{{item.awardsNum}}</p>
                  </div>
                </div>
              </div>
              <div class="btn-wrap">
                <div class="btn undone" v-if="item.taskStatus===1" @click="goGame(item)">去完成</div>
                <div class="btn receive" v-else-if="item.taskStatus===0" @click="_finish(item)">
                  领抽奖机会
                </div>
                <div class="btn done" v-else>已完成</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <my-awards :info="info" v-model="isDetailShow" @convert="_convert"></my-awards>
    <rule v-if="isRuleShow" :info="info" @on-close="closeRule()"></rule>
    <turnpop v-if="isTurnpopShow" :pop-type="popType" :info="info" :awards-info="awardsInfo"
      @on-close="closeTurnPop"></turnpop>
  </div>
</template>
<script>
/* eslint-disable no-undef */
import { taskInfo, activityInfo, bet, finish, convert, setRetainPopup } from './services/api'
import _get from 'lodash.get'
export default {
  name: 'app',
  data () {
    return {
      info: {},
      countTime: {},
      taskList: {},
      isRuleShow: false,
      isTurnpopShow: false,
      isDetailShow: false,
      popType: 0,
      awardsInfo: { price: 1 },
      options: {
        currentIndex: 0, // 当前圈数
        turn: 9, // 最少圈数
        isStart: false // 是否开始旋转
      }
    }
  },
  components: {
    'rule': () => import('./components/rule.vue'),
    'turnpop': () => import('./components/turnpop'),
    'myAwards': () => import('./components/myAwards')
  },
  async mounted () {
    await this.init()
    this.getTaskInfo()
    GLOBALS.marchSetsPoint('P_H5PT0279', { source_address: this.sourceAddress }) // H5平台-新人抽奖转盘活动-页面加载完成
    let curChannel = localStorage.getItem('APP_CHANNEL')
    if (curChannel === '100039' && this.info.newUser && this.info.newUserInfo.needRetain) {
      try {
        window.bdminCloseFun = () => {
          this.popType = 8
          this.showTurnPop()
          setRetainPopup()
        }
        var bdminObj = 'bdminCloseFun'
        var scheme = 'baiduhaokan://action/backHandler/?goback_callback=' + encodeURIComponent(bdminObj)
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = scheme
        console.log('iframe::', iframe)
        document.body.appendChild(iframe)
        setTimeout(function () {
          iframe.remove()
        }, 1000)
      } catch (e) {
        window.alert(e.message)
      }
    }
  },
  computed: {
    rotate () {
      let rotateArr = []
      let length = this.info.wheelConfigList
      let d = 360 / length
      for (let i = 0; i < length; i++) {
        rotateArr.push('transform: rotate(' + (d * i) + 'deg)')
      }
      return rotateArr
    },
    sourceAddress () {
      return GLOBALS.getUrlParam('from')
    }
  },
  methods: {
    async init () {
      const res = await activityInfo()
      const data = _get(res, 'data', null)
      if (data) {
        this.info = data
        this.countDown(data.countdown)
        if (this.info.newUser) {
          if (this.info.newUserInfo.incrBetTimes) {
            this.awardsInfo = { awardsNum: this.info.newUserInfo.incrBetTimes }
            this.popType = 3
            this.showTurnPop()
          }
        } else {
          if (this.info.oldUserInfo && this.info.oldUserInfo.showCoupon) {
            this.popType = 6
            this.showTurnPop()
          } else {
            this.popType = 7
            this.showTurnPop()
          }
        }
      }
    },
    imgFilter (url) {
      if (url && !url.includes('http')) {
        return '//file.beeplaying.com' + url
      } else {
        return url
      }
    },
    async getTaskInfo () {
      const res = await taskInfo()
      const data = _get(res, 'data', null)
      if (data) {
        this.taskList = data
      }
    },
    async betting () {
      GLOBALS.marchSetsPoint('A_H5PT0279003331') // H5平台-新人抽奖转盘-抽奖点击
      if (this.info.newUserInfo && this.info.newUserInfo.betTimes) {
        const res = await bet()
        const data = _get(res, 'data', null)
        if (data) {
          this.awardsInfo = data
          this.operation()
          return
        }
      } else {
        this.popType = 0
      }
      this.showTurnPop()
    },
    async _convert (convertType) {
      if (this.convertType) {
        GLOBALS.marchSetsPoint('A_H5PT0279003334') // H5平台-新人抽奖转盘-马上提取点击
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0279003332') // H5平台-新人抽奖转盘-提现点击
      }
      if (this.info.convertConsumeRmb <= this.info.newUserInfo.envelopeRmb) {
        const res = await convert()
        const code = _get(res, 'code', 0)
        const data = _get(res, 'data', null)
        if (code === 200) {
          this.awardsInfo = data
          this.info.newUserInfo.betTimes = this.awardsInfo.betTimes
          this.info.newUserInfo.envelopeNum = this.awardsInfo.envelopeNum
          this.info.newUserInfo.envelopeRmb = this.awardsInfo.envelopeRmb
          this.popType = 4
          this.showTurnPop()
        } else {
          this.popType = 5
          this.showTurnPop()
        }
      } else {
        this.$toast.show({
          message: `满${this.info.convertConsumeRmb}元才可以提取哦`
        })
      }
    },
    // 特惠倒计时
    countDown (info) {
      if (!info) return false
      let date = info / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
          this.$router.replace('/')
        }
        let _day = Math.floor(date / 86400)
        let _hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let _minute = Math.floor(parseInt(date / 60) % 60)
        let day = _day
        let hour = _hour >= 10 ? _hour : '0' + _hour
        let minute = _minute >= 10 ? _minute : '0' + _minute
        this.countTime = {
          day,
          hour,
          minute
        }
      }, 1000)
    },
    goMy () {
      this.isDetailShow = true
    },
    showRule () {
      this.isRuleShow = true
    },
    closeRule () {
      this.isRuleShow = false
    },
    showTurnPop () {
      this.isTurnpopShow = true
      if (this.popType === 0) {
        GLOBALS.marchSetsPoint('A_H5PT0279003337') // H5平台-新人抽奖转盘-抽奖机会不足弹窗加载完成
      } else if (this.popType === 1) {
        GLOBALS.marchSetsPoint('A_H5PT0279003335') // H5平台-新人抽奖转盘-中奖弹窗加载完成
      } else if (this.popType === 2) {
        GLOBALS.marchSetsPoint('A_H5PT0279003336') // H5平台-新人抽奖转盘-满足提现弹窗加载完成
      }
    },
    closeTurnPop (type) {
      this.isTurnpopShow = false
      if (type) {
        if (this.popType === 0) {
          this.$nextTick(() => {
            window.scrollTo(0, this.$refs.app.scrollHeight)
          })
        } else if (this.popType === 1) {
          this.betting()
        } else if (this.popType === 2) {
          this.getTaskInfo()
        } else if (this.popType === 4) {
          WapCall.openGame('/xmWap/#/my/prize')
        } else if (this.popType === 5) {
          WapCall.openGame('/xmWap/#/my/customerService')
        }
      }
    },
    operation () {
      if (this.options.isStart) {
        return false
      } else {
        this.options.isStart = true // 锁 专拍没有执行完的时候 不可以再次点击 ;
        this.options.currentIndex++
        let sun = this.options.turn * 360
        let ran = this.awardsInfo.awardsSort - 1
        /*    旋转度数 = 上次度数+ 最小圈数 * 360 + 当前数字 * 60 +随机角度  = 最终旋转度数     */
        this.$refs.wheel.style.transform = 'rotate(-' + (this.options.currentIndex * sun + ran * 360 / this.info.wheelConfigList.length) + 'deg)'
        setTimeout(() => {
          this.options.isStart = false
          this.popType = 1
          this.showTurnPop()
          this.info.newUserInfo.betTimes = this.awardsInfo.betTimes
          this.info.newUserInfo.envelopeNum = this.awardsInfo.envelopeNum
          this.info.newUserInfo.envelopeRmb = this.awardsInfo.envelopeRmb
        }, 3200)
      }
    },
    goGame (item) {
      let { gameType, url, action, taskId, taskName, index } = item
      GLOBALS.marchSetsPoint('A_H5PT0279003333', {
        position_id: index + 1,
        target_project_id: gameType,
        task_id: taskId,
        task_name: taskName
      })
      let actionsArr = [39, 35, 34, 32]
      // 跳转到首页
      if (action == 36 || url == '/plat/') {
        this.$router.push('/')
        return false
      }
      // 跳转商城
      if (actionsArr.includes(action)) {
        WapCall.openGame('/xmWap/#/payment/')
        return false
      }
      WapCall.openGame(url)
    },
    async _finish ({ taskId, taskLogId }) {
      const res = await finish({ taskId, taskLogId })
      const code = _get(res, 'code', 0)
      const data = _get(res, 'data', null)
      if (code === 200) {
        this.awardsInfo = data
        this.popType = 2
        this.showTurnPop()
      }
    },
    back () {
      let url = SDK.getBackUrl()
      if (url) {
        url = url.split('?')[0]
        WapCall.openGame(url)
      }
    }
    // move (e) {
    //   e.preventDefault()
    // },
    // scrollNoMove () {
    //   document.body.style.overflow = 'hidden'
    //   document.addEventListener('touchmove', this.move, { passive: false })
    // },
    // scrollMove () {
    //   document.body.style.overflow = null
    //   document.removeEventListener('touchmove', this.move, { passive: false })
    // }
  }
  // watch: {
  //   isRuleShow (val) {
  //     if (val) {
  //       this.scrollNoMove()
  //     } else {
  //       this.scrollMove()
  //     }
  //   },
  //   isTurnpopShow (val) {
  //     if (val) {
  //       this.scrollNoMove()
  //     } else {
  //       this.scrollMove()
  //     }
  //   }
  // }
}
</script>
<style lang="less">
@import '../../common/css/base.css';
.bgWithFull(@url) {
  background: url(@url) no-repeat center center;
  background-size: 100% 100%;
}
.turn-wrap {
  min-height: 100vh;
  background: #b52fe1 url('./img/bg.png') no-repeat center ~'-1.2rem' / 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 0 0.2rem;
  .top {
    height: 0.6rem;
    line-height: 0.36rem;
    color: #fff;
    display: flex;
    font-size: 0.28rem;
    align-self: center;
    align-content: center;
    justify-content: center;
    justify-content: center;
    font-weight: 500;
    padding: 0.12rem 0;
    box-sizing: border-box;
    position: relative;
    .bgWithFull('./img/top-bg.png');
    span {
      font-size: 0.32rem;
      font-weight: 800;
    }
    em {
      font-size: 0.32rem;
      background: #fff;
      color: #000;
      font-weight: 800;
      padding: 0 0.08rem;
      border-radius: 0.04rem;
    }
    .back {
      position: absolute;
      left: 0;
      top: 0;
      height: 0.6rem;
      line-height: 0.6rem;
      width: 1.12rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background: #cc2f1f;
      border-radius: 0 0.3rem 0.3rem 0;
      span {
        font-size: 0.24rem;
      }
      &::before {
        content: '';
        display: block;
        width: 0.14rem;
        height: 0.24rem;
        margin-right: 0.08rem;
        margin-left: 0.2rem;
        .bgWithFull('./img/back.png');
      }
    }
  }
  .top-btn-wrap {
    margin-top: 0.24rem;
    display: flex;
    color: #fff;
    font-size: 0.24rem;
    font-weight: bold;
    align-items: center;
    justify-content: space-between;
    .btn {
      height: 0.5rem;
      line-height: 0.54rem;
      background: #cc2f1f;
      position: relative;
      &.left {
        width: 1.42rem;
        text-align: center;
        border-radius: 0 0.3rem 0.3rem 0;
      }
      &.right {
        width: 1.6rem;
        border-radius: 0.3rem 0 0 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &::before {
          content: '';
          display: block;
          width: 0.24rem;
          height: 0.26rem;
          font-size: 0;
          margin: -0.02rem 0.04rem 0;
          .bgWithFull('./img/awards-icon.png');
        }
      }
    }
  }
  .main {
    position: relative;
    margin: 1.72rem auto 0;
    width: 5.2rem;
    height: 5.2rem;
    .bgWithFull('./img/light1.png');
    animation: changeBg 0.3s infinite ease;
    .list-wrap {
      padding: 0.2rem;
      box-sizing: border-box;
      height: 100%;
      .awards-list {
        height: 100%;
        background: no-repeat center center;
        background-size: 100% 100%;
        position: relative;
        transition: all 3s;
        ul {
          width: inherit;
          height: inherit;
        }

        li {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          color: transparent;
          text-align: center;
        }
      }
      .pointer {
        height: 2rem;
        width: 1.84rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.1rem;
        margin-left: -0.92rem;
        .bgWithFull('./img/pointer.png');
        animation: scale 1s infinite ease;
        span {
          color: #fff;
          font-size: 0.28rem;
          font-weight: 400;
          position: absolute;
          bottom: 0.4rem;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }
      }
    }
  }
  .active-info-wrap {
    margin: 0.28rem 0.3rem;
    padding: 0.2rem;
    height: 2.04rem;
    box-sizing: border-box;
    .money-wrap {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding-bottom: 0.12rem;
      border-bottom: 1px solid rgba(255, 200, 197, 0.5);
      p {
        vertical-align: baseline;
        font-size: 0.3rem;
        color: #fff;
        span {
          font-size: 0.48rem;
        }
        &:last-child {
          color: #ffd6e1;
          font-size: 0.2rem;
        }
      }
    }
    .cash-out {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1.1rem;
      .percent-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          width: 0.72rem;
          color: #ff9591;
          font-size: 0.26rem;
          text-align: center;
          span {
            font-size: 0.2rem;
          }
        }
        .percent-bg {
          flex: 1;
          height: 0.2rem;
          background: #a33834;
          border-radius: 0.08rem;
          .percent {
            background: #ffeb44;
            height: 100%;
            position: relative;
            p {
              color: #ffee31;
              font-size: 0.3rem;
              position: absolute;
              bottom: -0.4rem;
              right: 0;
              transform: translateX(55%);
              white-space: nowrap;
            }
            &::before {
              content: '';
              display: block;
              position: absolute;
              right: 0;
              width: 0.26rem;
              height: 0.32rem;
              top: -0.4rem;
              transform: translateX(55%);
              .bgWithFull('./img/good-icon.png');
            }
          }
        }
      }
      .btn {
        min-width: 1.6rem;
        max-width: 1.6rem;
        height: 0.7rem;
        font-size: 0.3rem;
        font-weight: bold;
        color: #ff4777;
        text-align: center;
        line-height: 0.7rem;
        margin-left: 0.12rem;
        .bgWithFull('./img/cash-out-btn.png');
      }
    }
  }
  .task-wrap {
    margin: 0.3rem;
    border-radius: 0.3rem;
    background: #f9ebfb;
    padding: 0.34rem 0.2rem 0.14rem;
    .task-content {
      .task-title {
        width: 4.12rem;
        height: 0.46rem;
        display: block;
        margin: auto;
      }
      .task-list {
        min-height: 1.28rem;
        padding: 0.08rem 0 0;
        .list-item {
          display: flex;
          padding: 0.24rem 0;
          align-items: center;
          justify-content: space-between;
          &:not(:last-child) {
            border-bottom: 1px solid #e0e0e0;
          }
          .icon-wrap {
            height: 0.8rem;
            width: 0.8rem;
            border-radius: 0.08rem;
            position: relative;
            overflow: hidden;
            img {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              max-height: 100%;
            }
          }
          .content-wrap {
            flex: 1;
            margin-left: 0.2rem;
            .name {
              font-size: 0.3rem;
              font-weight: bold;
              color: #15002b;
              margin-bottom: 0.12rem;
            }
            .other {
              display: flex;
              align-items: center;
              .percent-wrap {
                position: relative;
                width: 2.4rem;
                height: 0.26rem;
                background: #e0e0e0;
                border-radius: 0.14rem;
                .percent {
                  background: #ffd200;
                  height: 100%;
                  border-radius: 0.14rem;
                }
                .text-percent {
                  position: absolute;
                  top: 0;
                  width: 100%;
                  height: 0.26rem;
                  line-height: 0.26rem;
                  font-size: 0.2rem;
                  color: #15002b;
                  text-align: center;
                }
              }
              .awards {
                display: flex;
                align-items: center;
                color: #ff5544;
                font-size: 0.26rem;
                margin-left: 0.1rem;
                .icon {
                  width: 0.26rem;
                  height: 0.26rem;
                  margin-right: 0.02rem;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
          }
          .btn-wrap {
            .btn {
              width: 1.6rem;
              height: 0.7rem;
              text-align: center;
              line-height: 0.7rem;
              font-size: 0.24rem;
              color: #fff;
            }
            .undone {
              .bgWithFull('./img/btn-red.png');
            }
            .receive {
              .bgWithFull('./img/receive-btn-bg.png');
            }
            .done {
              .bgWithFull('./img/btn-grey.png');
            }
          }
        }
      }
    }
  }
  @keyframes changeBg {
    0% {
      .bgWithFull('./img/light1.png');
    }

    100% {
      .bgWithFull('./img/light2.png');
    }
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
