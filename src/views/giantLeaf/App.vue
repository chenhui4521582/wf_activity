<template>
  <div class="giant-leaf-new">
    <img class="bg_img" src="./images/big_bg.png" alt="">
    <img class="bg_img act_title" src="./images/title.png" alt="">
    <img class="bg_img fly_leaf" src="./images/fly_leaf.png" alt="">
    <div class="fh-box">
      <a href="javascript:" class="btn" @click.stop="handleBack">首页</a>
      <a href="javascript:" class="btn" @click.stop="handRule">规则</a>
    </div>
    <div class="contaniner-bg">
      <img src="./images/leaf_bottom.png" alt="" srcset="">
    </div>
    <div class="contaniner">
      <div class="message">
        <div class="item-move" v-if="lamp.length">
          <ul :class="{'anim':isMove}">
            <li v-for="item in lamp">恭喜<span class="lamp-text">{{item.nickName}}</span>金叶奖励翻{{item.returnRatio}}倍</li>
          </ul>
        </div>
      </div>
      <div class="main-wrapper">
        <ul>
          <li v-if="awardsList&&awardsList.length>0" :class="{activated:activatedIndex === index}" v-for="(item,index) in awardsList" :key="index">
            <img :src="item.wheelImage|filter" alt="">
          </li>
          <li v-else :class="{activated:activatedIndex === index}" v-for="(item,index) in imgList" :key="index">
            <img :src="imgList[index]" alt="">
          </li>
          <li v-if="getBetStage>0" class="btn" @click.stop="circle(true)">
            <p>点我翻倍</p><span>{{getBetStage}}金叶</span>
          </li>
          <li v-else class="btn btn_gray">
            <p>次数已用完</p>
          </li>
        </ul>
      </div>
      <div class="user-info">
        去除本金已赚<span>{{getProfit}}</span><img src="./images/leaf_icon.png" /><span class="btn_look" @click.stop="handHistory">查看</span>
      </div>
      <div class="count-down-clock">
        <img src="./images/time_icon.png" />距离活动结束：{{countTime}}
      </div>
    </div>
    <rule :showRule="showRule" :list="ruleList" @hideRule="hideRule" />
    <history :showHistory="showHistory" @hideHistory="hideHistory" />
    <turntable-dialog :priceData="priceData" :jyzUserInfo="jyzUserInfo" :showDialog="showDialog" :dialogStatus="dialogStatus" @hideDialog="hideDialog" @going="going" />
  </div>
</template>
<script type="text/javascript">
import rule from './components/rule'
import history from './components/history'
import turntableDialog from './components/turntableDialog'
import { clearInterval } from 'timers'
export default {
  name: 'giantLeafNew',
  data () {
    return {
      turnAnimate: false,
      lenCloc: 0,
      isStatr: false,
      finalAwards: null, // 奖品列表
      getFinalIndex: null,
      awardsList: null,
      ruleList: null,
      jyzUserInfo: null,
      activityInfo: null,
      showRule: false,
      showHistory: false,
      countTime: '',
      dialogStatus: 'loader',
      showDialog: false,
      priceData: {},
      isMove: false,
      lamp: [],
      imgList: [require('./images/8.png'), require('./images/1.1.png'), require('./images/1.8.png'), require('./images/2.2.png'), require('./images/1.4.png'), require('./images/5.png'), require('./images/2.png'), require('./images/1.2.png'), require('./images/2.5.png'), require('./images/1.6.png')],
      ylbScroll: null,
      mainTimer: null,
      mainTimes: 0,
      timer1: null,
      timer2: null,
      isClicked: false,
      curChannel: localStorage.getItem('APP_CHANNEL'),
      activatedIndex: 0
    }
  },
  components: {
    rule,
    history,
    turntableDialog
  },
  computed: {
    getRecordNum () {
      if (this.jyzUserInfo) {
        return this.jyzUserInfo.betNum - this.jyzUserInfo.betRecordNum
      }
    },
    getProfit () {
      if (this.jyzUserInfo) {
        return this.jyzUserInfo.profit || 0
      }
    },
    getBetStage () {
      if (this.jyzUserInfo) {
        return this.jyzUserInfo.betStage
      }
    },
    rotate () {
      var rotateArr = []
      var d = 1 / 10
      for (var i = 0; i < 10; i++) {
        rotateArr.push('transform: rotate(' + d * i + 'turn)')
      }
      return rotateArr
    }
  },
  methods: {
    // 跑马灯滚动
    scroll () {
      this.isMove = true
      setTimeout(() => {
        this.lamp.push(this.lamp[0])
        this.lamp.shift()
        this.isMove = false
      }, 1000)
    },
    setMainTimer (speed = 100) {
      if (this.mainTimes > 30 && this.finalAwards.returnRatio === this.awardsList[this.activatedIndex].returnRatio) {
        clearTimeout(this.mainTimer)
        this.activatedIndex = 0
        this.mainTimes = 0
        this.jyzUserInfo.betNum = this.finalAwards.betNum
        this.jyzUserInfo.betRecordNum = this.finalAwards.betRecordNum
        this.jyzUserInfo.betStage = this.finalAwards.betStage
        this.jyzUserInfo.profit = this.finalAwards.profit
        this.dialogStatus = 'success'
        this.showDialog = true
        this.isClicked = false
        return
      }
      this.activatedIndex++
      this.mainTimes++
      if (this.activatedIndex > 9) {
        this.activatedIndex = 0
      }
      if (this.mainTimes < 30) {
        speed = 100
      } else {
        speed = 200
      }
      this.mainTimer = setTimeout(() => {
        clearTimeout(this.mainTimer)
        this.setMainTimer(speed)
      }, speed)
    },
    getFinalAwards () {
      if (this.isClicked) return
      this.isClicked = true
      this.mainTimes = 0
      this.axios.post('//ops-api.beeplaying.com/ops/api/leafswheel/betting', {
        value: this.jyzUserInfo.betStage
      }).then(data => {
        let params = this.priceData = data.data
        if (params.code == 200) {
          this.setMainTimer()
          this.finalAwards = params.data
          let that = this
          for (let i = 0, len = that.awardsList.length; i < len; i++) {
            if (params.data.returnRatio == that.awardsList[i].returnRatio) {
              that.getFinalIndex = i
            }
          }
        } else {
          this.isClicked = false
          if (params.code == 201 || params.code == 202) {
            this.dialogStatus = 'error'
            this.showDialog = true
          } else {
            this.$toast.show({
              message: params.message,
              duration: 3000
            })
          }
        }
      })
    },
    circle (status) {
      if (status) {
        GLOBALS.marchSetsPoint('A_H5PT0074001128')
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0074001130')
      }
      let that = this
      if (that.awardsList && that.awardsList.length == 0) {
        that.$toast.show({
          message: '转盘活动未开启',
          duration: 3000
        })
        return
      }
      // 最终奖品
      this.getFinalAwards()
    },
    getUserInfo () {
      this.axios.post('//ops-api.beeplaying.com/ops/api/leafswheel/getUserInfo').then(res => {
        if (res.data.code == 200) {
          this.jyzUserInfo = res.data.data
          if (this.jyzUserInfo && this.jyzUserInfo.betIncreaseNum != 0) {
            this.dialogStatus = 'loader'
            this.showDialog = true
            GLOBALS.marchSetsPoint('A_H5PT0074001134')
          }
        }
      })
    },
    getAwardsList () {
      this.axios.post('//ops-api.beeplaying.com/ops/api/leafswheel/getActivityInfo').then(data => {
        let params = data.data
        if (params.code == 200) {
          this.awardsList = params.data.ratioList
          this.ruleList = params.data.betRuleList
          this.activityInfo = params.data
          this.countDown(this.activityInfo.countdown)
        } else {
          this.awardsList = null
          this.ruleList = null
          this.$toast.show({
            message: params.message,
            duration: 3000
          })
        }
      })
    },
    countDown (item) {
      if (!item) return false
      let date = item / 1000
      this.timer = setInterval(() => {
        date = date - 1
        console.log('data:', date)
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
        }
        let day = Math.floor(parseInt(date / 60 / 60 / 24))
        let hourse = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(parseInt(date) % 60)
        let countDay = day >= 10 ? day : '0' + day
        let countHourse = hourse >= 10 ? hourse : '0' + hourse
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        this.countTime = `${countDay}天${countHourse}时${countMinute}分${countSecond}`
      }, 1000)
    },
    handleBack () {
      GLOBALS.marchSetsPoint('A_H5PT0074001126')
      location.href = window.linkUrl.getBackUrl(this.curChannel)
      // window.history.go(-1)
    },
    handRule () {
      GLOBALS.marchSetsPoint('A_H5PT0074001127')
      this.showRule = true
    },
    hideRule () {
      this.showRule = false
    },
    handHistory () {
      GLOBALS.marchSetsPoint('A_H5PT0074001340')
      this.showHistory = true
    },
    hideHistory () {
      this.showHistory = false
    },
    hideDialog () {
      this.showDialog = false
    },
    going (isCircle) {
      this.showDialog = false
      this.circle(isCircle)
    },
    getNotice () {
      this.axios.post('//ops-api.beeplaying.com/ops/api/leafswheel/getNoticeList').then(res => {
        if (res.data.code == 200) {
          this.lamp = res.data.data
        }
      })
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0074001125')
    this.getAwardsList()
    this.getUserInfo()
    this.getNotice()
    // 导航滚动
    clearInterval(this.ylbScroll)
    this.ylbScroll = setInterval(this.scroll, 2500)
  }
}
</script>
<style lang="less" scoped>
.giant-leaf-new {
  min-height: calc(~'100vh' - 0.5rem);
  width: 100vw;
  background: #f1a927;
  .bg_img {
    position: absolute;
    top: 0;
    width: 100%;
    display: block;
    z-index: 0;
    &.fly_leaf {
      width: calc(~"100%" - 0.3rem);
      top: 0.3rem;
      left: 0;
      z-index: 2;
    }
    &.act_title {
      width: calc(~"100%" - 1.56rem);
      top: 0.43rem;
      left: 0.8rem;
    }
  }
  .user-info {
    position: absolute;
    top: 7.1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8c1826;
    font-weight: bold;
    white-space: nowrap;
    font-size: 0.36rem;
    span {
      color: #ffdb4b;
      display: inline-block;
      margin: 0 0.1rem;
    }
    .btn_look {
      width: 1.18rem;
      height: 0.64rem;
      line-height: 0.68rem;
      font-size: 0.26rem;
      color: #d52319;
      text-align: center;
      font-weight: bold;
      background: url("./images/border_btn.png") no-repeat top center / 100%;
    }
    img {
      width: 0.28rem;
      height: 0.28rem;
    }
  }
  .count-down-clock {
    position: absolute;
    top: 7.96rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.24rem;
    color: #fff;
    font-weight: bold;
    white-space: nowrap;
    img {
      width: 0.31rem;
      height: 0.31rem;
      margin-right: 0.13rem;
    }
  }
  .fh-box {
    margin-top: 0.5rem;
    position: relative;
    z-index: 2;
    .btn {
      display: block;
      width: 0.95rem;
      height: 0.58rem;
      line-height: 0.58rem;
      background: rgba(213, 35, 25, 0.6);
      border-radius: 0 0.25rem 0.25rem 0;
      font-size: 0.24rem;
      color: #fffdf3;
      font-weight: 500;
      text-decoration: none;
      text-indent: 0.18rem;
      position: relative;
      z-index: 1;
      &:first-child {
        margin-bottom: 2px;
      }
    }
  }
  .contaniner-bg {
    margin-top: 1.5rem;
    height: 9.2rem;
    position: relative;
    background: url("./images/container.png") no-repeat top center / 100%;
    z-index: 1;
    img {
      position: absolute;
      bottom: -0.28rem;
      width: 100%;
    }
  }
  .contaniner {
    position: absolute;
    top: 2.9rem;
    width: 100%;
    height: 9.2rem;
    z-index: 2;
    .message {
      margin-top: 0.32rem;
      height: 0.58rem;
      line-height: 0.58rem;
      color: #c04333;
      font-weight: bold;
      font-size: 0.2rem;
      text-align: center;
      .item-move {
        height: 0.58rem;
        position: relative;
        overflow: hidden;
        transition: all 0.3s;
        ul {
          width: 100%;
        }
        li {
          height: 0.58rem;
          line-height: 0.62rem;
          display: flex;
          justify-content: center;
        }
      }
      .anim {
        transition: all 1s;
        margin-top: -0.58rem;
      }
    }
    .main-wrapper {
      position: relative;
      padding: 1.2rem 0.68rem;
      ul {
        position: relative;
        width: 5.84rem;
        height: 4.68rem;
        li {
          position: absolute;
          width: 1.46rem;
          height: 1.56rem;
          background: url("./images/cell_normal.png") no-repeat top center /
            100% 100%;
          padding: 0.16rem 0.12rem;
          box-sizing: border-box;
          &.activated {
            background: url("./images/cell_activated.png") no-repeat top center /
              100% 100%;
          }
          &:nth-child(1) {
            top: 0;
            left: 1.46rem;
          }
          &:nth-child(2) {
            top: 0;
            left: 2.92rem;
          }
          &:nth-child(3) {
            top: 0;
            left: 4.38rem;
          }
          &:nth-child(4) {
            top: 1.56rem;
            left: 4.38rem;
          }
          &:nth-child(5) {
            top: 3.12rem;
            left: 4.38rem;
          }
          &:nth-child(6) {
            top: 3.12rem;
            left: 2.92rem;
          }
          &:nth-child(7) {
            top: 3.12rem;
            left: 1.46rem;
          }
          &:nth-child(8) {
            top: 3.12rem;
            left: 0;
          }
          &:nth-child(9) {
            top: 1.56rem;
            left: 0;
          }
          &:nth-child(10) {
            top: 0;
            left: 0;
          }
          img {
            width: 1.22rem;
            height: 1.22rem;
          }
        }
      }
      .btn {
        position: absolute;
        top: 1.56rem;
        left: 1.46rem;
        width: 2.9rem;
        height: 1.6rem;
        background: url("./images/btn.png") no-repeat top center / 100% 100%;
        font-size: 0;
        color: #fff;
        text-align: center;
        padding: 0.24rem;
        p {
          font-size: 0.48rem;
        }
        span {
          font-size: 0.32rem;
        }
        &.btn_gray {
          background: url("./images/btn_gray.png") no-repeat top center / 100%
            100%;
          p {
            font-size: 0.38rem;
            line-height: 1rem;
          }
        }
      }
    }
  }
}
</style>