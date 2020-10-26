<template>
  <main class="return-packet">
    <div class="bg">
      <img src="./img/bg.png" alt="">
    </div>
    <div class="back" @click="back()">返回</div>
    <rule />
    <article class="main-content" v-if="info.state===1">
      <div class="time">截止时间：{{info.endDate}}</div>
      <sign ref="sign" :info="info" @show-pop="showPop" />
      <task ref="task" :info="info" @show-pop="showPop" @show-game="showGame" />
      <gift ref="gift" :state="info.state" @show-pop="showPop" @findCoupon="_couponPopup" />
    </article>
    <article class="main-content" v-else>
      <div class="time end-time">活动已结束，未领奖励限今日领完</div>
      <task ref="task" :info="info" @show-pop="showPop" />
      <gift ref="gift" :state="info.state" @show-pop="showPop" @findCoupon="_couponPopup" />
      <sign ref="sign" :info="info" @show-pop="showPop" />
    </article>
    <article class="to-game">
      <p>{{}}</p>
    </article>
    <popup v-model="isShowPop" :type="popType" :awards-info="awardsInfo" @on-confirm="onConfirm" />
    <gamelist v-model="isShowGame" />
    <welcome ref="welcome" />
  </main>
</template>

<script>
/* eslint-disable no-undef */
import rule from './components/rule/index'
import sign from './components/sign/index'
import task from './components/task/index'
import gift from './components/gift/index'
import popup from './components/popup/index'
import welcome from './components/welcome/index'
import gamelist from './components/gamelist/index'
import { activityHome, couponPopup } from './services/api'
import _get from 'lodash.get'
export default {
  name: 'returnPacket',
  components: {
    rule,
    sign,
    task,
    gift,
    popup,
    welcome,
    gamelist
  },
  data () {
    return {
      info: {},
      isShowPop: false,
      isShowGame: false,
      popType: 'award',
      awardsInfo: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const res = await activityHome()
      const code = _get(res, 'code', 0)
      const data = _get(res, 'data', 0)
      let isShowedWelcome = localStorage.getItem('returnPackageWelcom')
      if (code === 200) {
        this.info = data
        if (!isShowedWelcome) {
          this.$refs.welcome.openPop()
        }
      }
      GLOBALS.marchSetsPoint('A_H5PT0074001432')
    },
    async _couponPopup () {
      const res = await couponPopup()
      const code = _get(res, 'code', 0)
      const data = _get(res, 'data', 0)
      if (code === 200 && data.couponIsShow) {
        GLOBALS.marchSetsPoint('A_H5PT0290004069') // H5平台-回归礼包-优惠券加赚-弹窗加载完成
        this.showPop('coupon', {
          list: [{
            img: data.opsBiguserBackflowAwardRsp.awardImg,
            name: data.opsBiguserBackflowAwardRsp.awardName
          }],
          desc: '许久不见，小多赠送您优惠券一张'
        })
      }
    },
    showPop (type, info) {
      this.popType = type
      this.awardsInfo = info
      this.isShowPop = true
    },
    showGame () {
      this.isShowGame = true
    },
    onConfirm () {
      if (this.popType === 'coupon') {
        GLOBALS.marchSetsPoint('A_H5PT0290004070') // H5平台-回归礼包-优惠券加赚弹窗-立即使用点击
        GLOBALS.jumpOutsideGame('/xmWap/#/payment/')
      }
    },
    back () {
      GLOBALS.marchSetsPoint('A_H5PT0074001433')
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
    }
  }
}
</script>

<style lang="less" scoped>
.return-packet {
  position: relative;
  font-size: 0.24rem;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    0deg,
    rgba(16, 16, 70, 1) 0%,
    rgba(39, 23, 84, 1) 100%
  );
  .bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    min-height: 100vh;
    img {
      display: block;
      margin: auto;
    }
  }
  .back {
    position: absolute;
    left: 0;
    top: 0.3rem;
    font-weight: bold;
    color: #c9d5ff;
    background: #100e64
      linear-gradient(0deg, rgba(16, 14, 100, 1) 0%, rgba(21, 29, 90, 1) 100%);
    width: 0.8rem;
    line-height: 0.54rem;
    border-radius: 0 0.27rem 0.27rem 0;
    box-sizing: border-box;
    padding-left: 0.15rem;
  }
  .main-content {
    position: absolute;
    width: 100vw;
    top: 2.18rem;
    .time {
      color: #fff;
      font-weight: bold;
      text-align: center;
      font-style: italic;
    }
    .end-time {
      background: #849be9;
      width: 4.1rem;
      padding: 0 0.24rem;
      height: 0.48rem;
      margin: -0.04rem auto;
      text-align: center;
      line-height: 0.46rem;
      border-radius: 0.24rem;
      color: #1f2961;
    }
  }
  .to-game {
    width: 1.74rem;
    height: 1.74rem;
    background: url(./img/to-game-icon.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>
