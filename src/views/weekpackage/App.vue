<template>
  <div id="app">
    <!--返回按钮-->
    <div class="back" @click="back"></div>
    <div class="m-box">
      <div class="counttime">
        <template v-if="!countdown.time">
          <div class="hour">00</div>
          <div class="min">00</div>
          <div class="sec">00</div>
        </template>
        <template v-else>
          <div class="hour">{{countdown.time.split(':')[0]}}</div>
          <div class="min">{{countdown.time.split(':')[1]}}</div>
          <div class="sec">{{countdown.time.split(':')[2]}}</div>
        </template>
      </div>
      <div class="already-paid">
        <div class="turntable-bg">
          <div class="turntable-light"></div>
        </div>
        <div class="zp-bg" ref="wheel">
          <ul v-if="awardsList">
            <li v-for="(item,index) in awardsList" :style="rotate[index]">
              <div class="turntable-con">
                <p class="name"></p>
                <span class="box"></span>
              </div>
            </li>
          </ul>
        </div>
        <template v-if="detailData">
          <div class="turntable-btn enable" v-if="detailData.state==1">
            <img src="./imgs/btn.png" class="btn-lottery" @click="startBtn">
          </div>
          <div class="turntable-btn disabled" v-else-if="detailData.state==4">
            <img src="./imgs/disabled.png" class="btn-lottery">
          </div>
          <div class="turntable-btn disabled" v-else @click="showdiscountpop">
            <img src="./imgs/checkdiscount.png" class="btn-lottery">
          </div>
        </template>
      </div>
    </div>
    <div class="rule-content">
      <p>1、玩家可以通过转盘获得对应的礼包折扣（由于部分地区存在网络延迟，最终折扣以弹窗展示为准）；</p>
      <p>2、折扣礼包额外加赠的金叶分<i>7天到账</i>，购买第一天开始计算；</p>
      <p>3、加赠金叶需要玩家连续7天登录平台方可领取，如期间不登录则当天奖励作废，不要忘记哟</p>
      <p>4、成功购买折扣礼包后，玩家还能获得一张<i>8折优惠券</i>，优惠券<i>有效期7天</i></p>
      <p>5、活动期间礼包仅可购买一次</p>
      <p>6、活动期间，禁止作弊行为。如有任何疑问，可在游戏中心--“我的”--“帮助”进行反馈</p>
    </div>
    <!--以下都是弹窗-->
    <pop v-if="flag" :type="flag" :detail="detailData" :finalAwards="finalAwards" @close="closepop">
    </pop>
  </div>
</template>
<script>
import '../../common/js/window.js'
import lottery from './lottery'
import pop from './components/pop'
export default {
  data () {
    return {
      curChannel: null,
      curToken: null,
      countdown: {// 红包榜外显倒计时，最后一天显示
        time: ''
      },
      showrulepop: false,
      isOpen: false,
      showmobilepop: false,
      candivide: true,
      isshowBonusOpened: false, // 是否显示开启红包弹窗
      packageData: [], // 礼包数据
      bonusListData: [], // 瓜分记录
      detailData: null, // 活动信息
      awards: null, // 瓜分奖品
      showfinger: false,
      showfingerPress: false,
      flag: 0,
      tabIndex: 0,
      awardsList: [],
      isClicked: false,
      getFinalIndex: null,
      isbtnStatus: 0,
      finalAwards: null
    }
  },
  async mounted () {
    this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL') : this.getUrlParam('channel')
    this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : this.getUrlParam('token')
    await this.myDetails()
    GLOBALS.marchSetsPoint('A_H5PT0074001693')
  },
  computed: {
    countdownText () { // 倒计时文案 红包榜外显倒计时，最后一天显示
      if (this.countdown.time) {
        let hourText = this.countdown.time.split(':')[0]
        let days = Math.floor(hourText / 24)
        if (days == 0) {
          return this.countdown.time
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    isHasIframe () {
      return window != window.top
    },
    rotate () {
      let rotateArr = []
      let d = 360 / this.awardsList.length
      for (let i = 1; i <= this.awardsList.length; i++) {
        rotateArr.push('transform: rotate(' + d * i + 'turn)')
      }
      return rotateArr
    }
  },
  methods: {
    // 获取地址栏问号后面的参数值
    getUrlParam: function (ename) {
      // var url = document.referrer;
      var url = window.location.href
      var Request = new Object()
      if (url.indexOf('?') != -1) {
        var str = url.split('?')[1]
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          Request[strs[i].split('=')[0]] = (strs[i].split('=')[1])
        }
      } else {
        return ''
      }
      return Request[ename]
    },
    back () {
      location.href = window.linkUrl.getBackUrl(this.curChannel)
    }, // 回到首页
    fetch (url, params) {
      if (url.startsWith('/ops/api')) {
        url = '//ops-api.beeplaying.com' + url
      }
      if (url.startsWith('/wap/api')) {
        url = '//platform-api.beeplaying.com' + url
      }
      if (url.startsWith('/shop/api')) {
        url = '//shop-api.beeplaying.com' + url
      }
      return this.axios.post(url, params, {})
    }, // 请求封装方法
    async myDetails (isNeedTurn = true) {
      try {
        const res = await this.fetch('/shop/api/compensation/activity-info')
        if (res.data.code == 200 && res.data.data) {
          this.detailData = res.data.data
          this.awardsList = res.data.data.ratios
          if ((this.detailData.state == 2 || this.detailData.state == 3) && isNeedTurn) {
            this.getFinalAwards(this.detailData.state)
          }
          !this.countdown.time && this.detailData.countdown && GLOBALS.remainingTime(
            this,
            this.detailData.countdown,
            this.countdown
          )
        }
      } catch (e) {

      }
    }, // 获取myDetails数据
    closepop () {
      this.myDetails(false)
      this.flag = 0
    },
    startBtn () {
      if (this.isClicked) return
      GLOBALS.marchSetsPoint('A_H5PT0074001694')
      if (this.awardsList.length == 0) {
        this.$toast.show({
          message: '转盘活动未开启',
          duration: 1500
        })
        return
      }
      // 最终奖品
      this.getFinalAwards(1)
    },
    getFinalAwards (status) {
      let that = this
      if (status == 1) {
        if (this.isClicked) return
        this.isClicked = true
        this.fetch('/shop/api/compensation/welfare-info').then(response => {
          let params = response.data
          if (params.code == 200) {
            this.finalAwards = params.data
            for (let i = 0, len = that.awardsList.length; i < len; i++) {
              if (params.data.ratio == that.awardsList[i].ratio) {
                that.getFinalIndex = i
              }
            }
            lottery.operation(this.$refs.wheel, this.awardsList, that.getFinalIndex, function () {
              that.isClicked = false
              that.flag = 1
            })
          } else {
            this.$toast.show({
              message: params.message,
              duration: 1500
            })
          }
        })
      } else {
        this.fetch('/shop/api/compensation/welfare-info').then(response => {
          let params = response.data
          if (params.code == 200) {
            this.finalAwards = params.data
            for (let i = 0, len = that.awardsList.length; i < len; i++) {
              if (params.data.ratio == that.awardsList[i].ratio) {
                that.getFinalIndex = i
              }
            }
            setTimeout(() => {
              lottery.operation(this.$refs.wheel, this.awardsList, that.getFinalIndex, () => {
                if (status == 3 && location.href.includes('?')) {
                  this.flag = 2
                }
              }, 0)
            }, 100)
          } else {
            this.$toast.show({
              message: params.message,
              duration: 1500
            })
          }
        })
      }
    },
    showdiscountpop () {
      GLOBALS.marchSetsPoint('A_H5PT0074001695', { product_id: this.finalAwards.welfare.bizId, product_name: this.finalAwards.welfare.name, recharge_rmb: this.finalAwards.welfare.price })
      if (this.detailData.state == 2) {
        this.flag = 1
        GLOBALS.marchSetsPoint('A_H5PT0074001696', { product_id: this.finalAwards.welfare.bizId, product_name: this.finalAwards.welfare.name, recharge_rmb: this.finalAwards.welfare.price })
      } else {
        this.flag = 2
        GLOBALS.marchSetsPoint('A_H5PT0074001698', { product_id: this.finalAwards.welfare.bizId, product_name: this.finalAwards.welfare.name, recharge_rmb: this.finalAwards.welfare.price })
      }
    }
  },
  components: {
    pop
  },
  watch: {
    'countdown.time': function (val) {
      if (!val) {
        this.myDetails()
      }
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../common/css/base.css";
.banner-set {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
#app {
  position: absolute;
  height: 18.51rem;
  left: 0;
  right: 0;
  background: url("./imgs/bg.png");
  background-size: 100% 100%;
  color: rgba(255, 255, 255, 1);
}
.back {
  position: fixed;
  top: 0.18rem;
  left: 0.2rem;
  width: 0.63rem;
  height: 0.63rem;
  background: url("./imgs/back.png") no-repeat;
  background-size: 100% 100%;
  z-index: 10;
}
.m-box {
  width: 5.3rem;
  height: 7.46rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  .counttime {
    width: 3.92rem;
    height: 0.82rem;
    background: url(./imgs/counttimebg.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 2.2rem;
    left: 50%;
    transform: translateX(-50%);
    .hour {
      position: absolute;
      width: 0.45rem;
      height: 0.4rem;
      left: 0.32rem;
      top: 0.18rem;
      line-height: 0.4rem;
      text-align: center;
    }
    .min {
      position: absolute;
      width: 0.44rem;
      height: 0.4rem;
      left: 1.2rem;
      top: 0.18rem;
      line-height: 0.4rem;
      text-align: center;
    }
    .sec {
      position: absolute;
      width: 0.44rem;
      height: 0.4rem;
      left: 2.08rem;
      top: 0.18rem;
      line-height: 0.4rem;
      text-align: center;
    }
  }
  .already-paid {
    width: 6.52rem;
    height: 6.52rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 3rem;
    z-index: 2;
    overflow: hidden;
  }
  .turntable-bg {
    width: 5.96rem;
    height: 5.96rem;
    background: url(./imgs/pan.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    z-index: 2;
    .turntable-light {
      width: 6.52rem;
      height: 6.52rem;
      margin-left: -0.3rem;
      margin-top: -0.25rem;
      background: url("./imgs/light1.png") no-repeat center center / 100% 100%;
      animation: changeBg 0.3s alternate infinite ease,
        changeBg1 0.3s infinite ease;
    }
    @keyframes changeBg {
      0% {
        opacity: 1;
        background: url("./imgs/light1.png") no-repeat center center / 100% 100%;
      }

      100% {
        opacity: 0;
        background: url("./imgs/light2.png") no-repeat center center / 100% 100%;
      }
    }
    @keyframes changeBg1 {
      0% {
        opacity: 0;
        background: url("./imgs/light1.png") no-repeat center center / 100% 100%;
      }

      100% {
        opacity: 1;
        background: url("./imgs/light2.png") no-repeat center center / 100% 100%;
      }
    }
    .btn-lottery {
      width: 2.09rem;
      height: 2.31rem;
      position: absolute;
      left: 50%;
      top: 2rem;
      transform: translateX(-50%);
      cursor: pointer;
    }
  }
  .turntable-btn {
    position: absolute;
    width: 3.26rem;
    height: 3.46rem;
    z-index: 3;
    top: 1.5rem;
    left: 50%;
    margin-left: -1.65rem;

    img {
      width: 100%;
    }

    .turn-text {
      position: absolute;
      left: 50%;
      top: 1rem;
      transform: translateX(-50%);
      color: #525252;
      font-size: 0.24rem;
      font-weight: bold;
      font-family: AlibabaPuHuiTiB;
    }

    .turn-countdown {
      position: absolute;
      left: 50%;
      top: 1.3rem;
      transform: translateX(-50%);
      font-size: 0.22rem;
      font-weight: bold;
      font-family: AlibabaPuHuiTiB;
    }

    &.enable {
      animation: btnScale 0.6s infinite linear;

      .turn-countdown {
        top: 1.4rem;
        color: #fff;
        -webkit-text-stroke: 0.02rem #ca5c2c;
      }
    }

    &.disabled {
      .turn-countdown {
        color: #fff;
        -webkit-text-stroke: 0.02rem rgba(108, 108, 108, 0.6);
      }
    }
  }
  .zp-bg {
    width: 5.96rem;
    height: 5.96rem;
    background: url(./imgs/pan.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 2;
    transition: all 3s;
    ul {
      position: absolute;
      left: 0;
      top: 0;
      width: inherit;
      height: inherit;
    }

    li {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      color: #000;
    }

    .turntable-con {
      position: relative;
      display: block;
      padding-top: 0.2rem;
      margin: 0 auto;
      text-align: center;

      .name {
        font-size: 0.24rem;
        color: #c56100;
      }
    }

    .box {
      display: flex;
      width: 0.84rem;
      height: 0.84rem;
      margin: 0 auto;
      position: relative;
      align-items: center;

      img {
        max-width: 100%;
        max-height: 100%;

        &.taoquan {
          max-width: 43%;
        }
      }
    }
  }
  @keyframes btnScale {
    0% {
      transform: scale(1.1);
    }

    50% {
      transform: scale(1.1);
    }

    51% {
      transform: scale(1);
    }

    100% {
      transform: scale(1);
    }
  }
}
.rule-content {
  position: absolute;
  top: 13.34rem;
  left: 0.7rem;
  right: 0.7rem;
  padding-bottom: 0.31rem;
  p {
    font-size: 0.3rem;
    font-weight: 400;
    color: #873370;
    line-height: 0.5rem;
    i {
      color: #e720af;
    }
  }
}
</style>
