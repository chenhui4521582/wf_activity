<template>
  <section>
    <div class="top-container">
      <div class="top">
        <!-- 倒计时 -->
        <div class="countdown">
          <div class="countdown-container" v-if="activityInfo.state==1">
            <div v-if="countTime&&activityInfo.state==1">距离活动结束剩余：</div>
            <div v-if="activityInfo.state==2">活动已经结束</div>
            <div v-if="activityInfo.state==0">活动未开始</div>
            <div v-for="(item,key) in countTime.split('')" :key="key">{{item}}</div>
          </div>
          <div class="countdown-container" v-if="activityInfo.state==2"
               style="justify-content: center;">
            <span v-if="activityInfo.state==2">活动已经结束</span>
          </div>
          <div class="countdown-container" v-if="activityInfo.state==0"
               style="justify-content: center;">
            <span v-if="activityInfo.state==0">活动未开始</span>
          </div>
        </div>
        <p v-show="topshow">
          返利卡有效时间：
          <span v-for="(item,key) in newcountTime.split('')" :key="key">{{item}}</span>
          预计返利：<i>{{state.rebateAmount}}</i>金叶
        </p>
      </div>
    </div>
    <div class="back" @click="back">
    </div>
    <div class="rule" @click="rule">
    </div>
    <div class="prize-record" @click="prizerecord">
    </div>
    <!-- 已有人数 -->
    <div class="tips">
      已有<span>{{rarePropNum|NumFormat}}</span>人获得稀有道具
    </div>
    <!-- 抽奖区域 -->
    <main>
      <div class="main-top">
        <img src="./images/myyellowrock.png" alt/>
        <span class="mynum">{{remnantNum}}</span>
        <!-- 跳转商城 -->
        <div class="gain" @click="goshop"
             v-if="activityInfo.state==1&&prized.length<10">
          获取+
        </div>
        <div class="gain gray" @click="nogoshop"
             v-if="prized.length==10||activityInfo.state==0||activityInfo.state==2">
          获取+
        </div>
      </div>
      <article>
        <ul v-if="newlist.length>=0">
          <li v-for="(item,i) in newlist" :key="i " :class="{on:i==index,flk:item.awardsType=='flk'}">
            <img :src="`${require(`./images/${item.awardsType}.png`)}`" alt/>
            <template v-if="item.awardsType!='flk'">
              <p class="text-one">
                {{item.awardsName.replace(getAwardName(item.awardsType),'')}}
              </p>
              <p class="text-two">{{getAwardName(item.awardsType)}}</p>
            </template>
            <div class="absolute" :class="[prized.includes(i)?'end':'']"></div>
          </li>
        </ul>
        <div class="middle-container">
          <div class="game-tips">每次探宝必得1个奖励，已得奖励不重复抽中，探宝10次获得所有奖励。</div>
          <div class="current-consume">
            <img src="./images/smallyellow.png" alt/>
            <span>{{nextConsume}}</span>
          </div>
          <div class="playgame">
            <div class="goplay" v-if="prized.length!=10&&activityInfo.state==1" @click.stop="startLottery">立即探宝</div>
            <div class="goplay gray" v-if="prized.length==10||activityInfo.state==2||activityInfo.state==0"
                 @click="notenough">立即探宝
            </div>
          </div>
        </div>
      </article>
    </main>
    <comPop v-model="popType" :prizeshow="prizeshow" :activityInfo="activityInfo" :state="state"
            :userAwards="userAwards" @clickshow="getclick"></comPop>
  </section>
</template>
<script>
  import BScroll from 'better-scroll'
  import _get from 'lodash.get'
  import {activityInfo, bet, ratePropState, userAwards} from './services/api'
  import comPop from './component/comPop'
  import utils from '../../common/js/utils.js'

  export default {
    data() {
      return {
        // 头部返利卡开关
        topshow: false,
        time: '',
        fanlitime: '',
        countTime: '',
        // 返利卡倒计时
        newcountTime: '',
        fanlicountTime: '',
        // countDown:['1','天','0','1','时','0','0','分','0','0','秒'],
        popType: 0, // 1规则 2中奖记录 3探宝成功 4宝石比上次多弹窗 5很遗憾（当前宝石不够抽奖额度） 6充值返利获得金叶 7抽中返利卡
        index: -1, // 当前转动到哪个位置，起点位置
        newindex: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], //
        count: 10, // 总共有多少个位置
        timer: 0, // 每次转动定时器
        speed: 230, // 初始转动速度
        times: 0, // 转动次数
        cycle: 8, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1, // 中奖位置
        prized: [], // 已抽中的位置
        click: true,
        showToast: false, // 显示中奖弹
        // 接口返回奖品列表
        newlist: [],
        // 传中奖信息
        prizeshow: {},
        // 活动信息
        activityInfo: {},
        // newlist1:[],
        // 投注
        bet: {},
        // 我的钻石剩余数
        remnantNum: '',
        // 下次消耗
        nextConsume: '',
        // 已获得人数
        rarePropNum: '',
        // 返利卡状态
        state: {},
        // 奖励列表
        userAwards: [],
        message: '',
        there: ''
      }
    },
    created() {
      // this.popType = 7;
      // this.prizeshow.sort=1
      GLOBALS.marchSetsPoint('P_H5PT0251', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      // console.log('3.11 15:53')
    },
    mounted() {
      this.getActivityInfo()
      this.getState(2)
      this.getUserAwards()
    },
    computed: {},
    methods: {
      move (e) {
        e.preventDefault()
      },
      getAwardName(awardType) {
        switch (awardType) {
          case 'jyz':
            return '金叶子';
            break;
          case 'yg':
            return '鱼干';
            break;
          case 'jdk':
            return '京东券';
            break;
          case 'hfq':
            return '话费券';
            break;
          case 'yhq':
            return '优惠券';
            break;
        }
      },
      // 点击弹窗关闭按钮,恢复click=true的状态
      getclick(e) {
        this.click = e
      },
      // 活动信息接口
      async getActivityInfo() {
        const res = await activityInfo()
        this.activityInfo = _get(res, 'data', {})
        this.newlist = _get(res, 'data.wheelAwardsList', [])
        this.remnantNum = this.activityInfo.remnantNum
        this.rarePropNum = this.activityInfo.rarePropNum
        this.nextConsume = this.activityInfo.nextConsume
        for (var i = 0; i < this.newlist.length; i++) {
          if (this.newlist[i].state == 1) {
            this.prized.push(this.newlist[i].sort - 1)
          }
        }
        if (this.activityInfo.incrPropNum > 0) {
          this.popType = 4
          GLOBALS.marchSetsPoint('A_H5PT0251002971')
        }
        this.countDown(this.activityInfo.countdown)
      },
      // 投注
      async getBet() {
        const res = await bet()
        this.bet = _get(res, 'data', {})
        const code = _get(res, 'code', 0)
        this.message = _get(res, 'message', null)
        if (res.message == '您已获取所有奖励') {
          this.$toast.show({
            message: '您已获取所有奖励',
            duration: 1000
          })
        } else if (res.message == '您的宝石不足') {
          this.popType = 5
          GLOBALS.marchSetsPoint('A_H5PT0251002970')
          return
        } else if (this.bet.wheelAwards.awardsType == "flk") {
          this.popType = 7
          this.prized.push(this.bet.wheelAwards.sort - 1)
          this.remnantNum = this.bet.remnantNum
          this.rarePropNum = this.bet.rarePropNum
          this.nextConsume = this.bet.nextConsume
          GLOBALS.marchSetsPoint('A_H5PT0251002972')
        } else {
          this.startRoll()
          if (this.bet) {
            this.remnantNum = this.bet.remnantNum
            this.rarePropNum = this.bet.rarePropNum
            this.nextConsume = this.bet.nextConsume
          }
        }
      },
      // 返利卡状态
      async getState(type) {
        const res = await ratePropState(type)
        this.state = _get(res, 'data', {})
        if (this.state.rebateCountdown > 0) {
          this.topshow = true
          this.fanlitime = this.state.rebateCountdown
          this.fanlicountDown(this.fanlitime)
        }
        if (this.state.rebatePopup) {
          this.popType = 6
          GLOBALS.marchSetsPoint('A_H5PT0251002973')
        }
      },
      // 奖励列表
      async getUserAwards() {
        const res = await userAwards()
        this.userAwards = _get(res, 'data', [])
      },
      // 返回上一级 返回首页
      back() {
        // history.go(-1);
        window.location.href = `https://wap.beeplaying.com/xmWap/`
        GLOBALS.marchSetsPoint('A_H5PT0251002964')
      },
      // 黄钻加号 跳转商城
      goshop() {
        if (!this.click) {
          this.$toast.show({
            message: '正在抽奖',
            duration: 1000
          })
        } else {
          parent.location.href = 'https://wap.beeplaying.com/xmWap/#/payment/'
          GLOBALS.marchSetsPoint('A_H5PT0251002966')
        }
      },
      nogoshop() {
        if (this.activityInfo.state == 0) {
          this.$toast.show({
            message: '活动未开始',
            duration: 1000
          })
        } else if (this.activityInfo.state == 2) {
          this.$toast.show({
            message: '活动已经结束',
            duration: 1000
          })
        } else if (this.prized.length == 10) {
          this.$toast.show({
            message: '您已获得所有奖励',
            duration: 1000
          })
        }
      },
      end() {
      },
      // 点击规则
      rule() {
        if (!this.click) {
          this.$toast.show({
            message: '正在抽奖',
            duration: 1000
          })
        } else {
          this.popType = 1
          GLOBALS.marchSetsPoint('A_H5PT0251002965')
        }
      },
      // 中奖记录
      prizerecord() {
        // console.log("click", this.click);
        if (!this.click) {
          this.$toast.show({
            message: '正在抽奖',
            duration: 1000
          })
        } else {
          this.popType = 2
          this.getUserAwards()
          GLOBALS.marchSetsPoint('A_H5PT0251002967')
        }
      },
      // 钻石不够无法抽奖
      notenough() {
        if (this.activityInfo.state == 2) {
          this.$toast.show({
            message: '活动已经结束',
            duration: 1000
          })
        } else {
          this.$toast.show({
            message: '您已获得所有奖励',
            duration: 1000
          })
        }
      },
      // 倒计时
      getCountInfo(dateinfo) {
        let day = Math.floor(dateinfo / 86400)
        let hour = Math.floor(parseInt(dateinfo / 60 / 60) % 24)
        let minute = Math.floor(parseInt(dateinfo / 60) % 60)
        let second = Math.floor(dateinfo % 60)
        // let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        return {
          day,
          countHour,
          countMinute,
          countSecond
        }
      },
      countDown(item) {
        if (!item) return false
        let date = item / 1000
        let {day, countHour, countMinute, countSecond} = this.getCountInfo(
          date
        )
        let self = this

        doTimer()

        this.timer = setInterval(() => {
          doTimer()
        }, 1000)

        function doTimer() {
          date = date - 1
          if (date <= 0) {
            date = 0
            clearInterval(self.timer)
            self.countTime = ''
            return
          }
          let day = Math.floor(date / 86400)
          let hour = Math.floor(parseInt(date / 60 / 60) % 24)
          let minute = Math.floor(parseInt(date / 60) % 60)
          let second = Math.floor(date % 60)
          let countDay = day >= 10 ? day : '0' + day
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          self.countTime = `${day}天${countHour}时${countMinute}分${countSecond}秒`
        }
      },
      // 返利卡倒计时0
      fanlicountDown(item) {
        if (!item) return false
        let date = item / 1000
        let {day, countHour, countMinute, countSecond} = this.getCountInfo(
          date
        )
        // this.newcountTime = `${countHour}:${countMinute}:${countSecond}`;
        let that = this
        fanliTimer()
        this.timer = setInterval(() => {
          fanliTimer()
        }, 1000)

        function fanliTimer() {
          date = date - 1
          if (date <= 0) {
            date = 0
            clearInterval(that.timer)
            that.newcountTime = ''
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
          if (day >= 0) {
            that.newcountTime = `${countHour}时${countMinute}分${countSecond}秒`
          } else {
            that.newcountTime = `${countHour}:${countMinute}:${countSecond}`
          }
        }
      },
      // 点击投注
      async startLottery() {
        if (this.message == '您的宝石不足') {
          this.popType = 5
        } else if (!this.click) {
          this.$toast.show({
            message: '正在抽奖',
            duration: 1000
          })
        } else {
          this.click = false
          await this.getBet()

          GLOBALS.marchSetsPoint('A_H5PT0251002968')
        }
      },
      // 开始抽奖
      startRoll() {
        this.times += 1 // 转动次数
        this.oneRoll()

        // 转动过程调用的每一次转动方法，这里是第一次调用初始化
        // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置

        if (this.times > this.cycle + 7 && this.prize === this.index) {
          // 抽中返利卡时
          if (this.bet.wheelAwards.state == 1) {
            this.prized.push(this.prize)
          }

          // this.prizeshow = this.list[this.prize];
          this.prizeshow = this.bet.wheelAwards
          // 删除抽中的位置下标
          // console.log("删除数组中的抽奖位置", this.newindex);
          setTimeout(() => {
            if (this.prizeshow.awardsType == "flk") {
              this.popType = 7
              GLOBALS.marchSetsPoint('A_H5PT0251002972')
            } else {
              this.popType = 3
              GLOBALS.marchSetsPoint('A_H5PT0251002969', {
                awards_name: this.prizeshow.awardsName
              })
              setTimeout(() => {
                this.click = true
              }, 200)
            }
          }, 800)
          clearTimeout(this.timer) // 清除转动定时器，停止转动
          this.prize = -1
          this.times = 0
          this.speed = 230
        } else {
          if (this.times < this.cycle) {
            this.speed -= 30 // 加快转动速度
          } else if (this.times === this.cycle) {
            this.prize = this.bet.wheelAwards.sort - 1 // 中奖位置
            if (this.prize > 9) {
              this.prize = 9
            }
          } else if (
            this.times >
            this.cycle + 5
          ) {
            this.speed += 20
          } else {
            this.speed += 20
          }
          if (this.speed < 40) {
            this.speed = 40
          }
          this.timer = setTimeout(this.startRoll, this.speed)
        }
      },
      oneRoll() {
        let _index = this.index
        let canSelectIndexs = []
        for (var i = 0; i <= 9; i++) {
          if (this.prized.indexOf(i) == -1) {
            canSelectIndexs.push(i)
          }
        }
        if (_index >= 9) {
          _index = -1
        } else {
          while (_index < 9) {
            _index++
            // 匹配时
            if (canSelectIndexs.indexOf(_index) > -1) {
              break
            } else {
              if (_index >= 9) {
                _index = -1
              }
            }
          }
        }

        this.index = _index
      }
    },
    components: {
      comPop
    }
  }
</script>
<style lang="less" scoped>
  @import "../../common/css/base.css";

  section {
    width: 100%;
    height: 100vh;
    background-color: #0b0800;
    position: relative;
    /*overflow: hidden;*/
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 11.57rem;
      background: url(./images/bg.png) no-repeat;
      background-size: 100% 100%;
    }
    .top-container {
      display: flex;
      justify-content: center;
      .top {
        background: rgba(147, 10, 49, .68);
        border-radius: 0 0 .15rem .15rem;
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 .13rem;
        .countdown {
          margin: .07rem auto .1rem;
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(241, 133, 33, 1);
          .countdown-container {
            display: flex;
            flex-wrap: nowrap;
          }
          & span {
          }
          .countdown-item:nth-child(1), :nth-child(2),
          :nth-child(4),
          :nth-child(5),
          :nth-child(7),
          :nth-child(8),
          :nth-child(10),
          :nth-child(11) {
            width: 0.22rem;
            height: 0.27rem;
            line-height: .27rem;
            text-align: center;
            background: rgba(230, 121, 35, 1);
            border-radius: 0.04rem;
            font-size: 0.2rem;
            font-weight: 400;
            color: rgba(88, 7, 55, 1);
            margin: 0 .03rem;
            i {
              font-size: 0.24rem;
              font-family: Alibaba PuHuiTi;
              font-weight: 400;
              color: rgba(208, 169, 99, 1);
            }
          }
        }
        & p {
          font-size: 0.2rem;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: rgba(252, 157, 143, 1);
          margin: 0 0 .1rem;
          i, span {
            font-weight: bold;
            color: #FFF777;
          }
        }
      }
    }
    .back {
      background: url(./images/back.png) no-repeat;
      background-size: 100% 100%;
      width: 0.55rem;
      height: 0.67rem;
      position: absolute;
      left: .25rem;
      top: .51rem;
    }
    .rule {
      background: url(./images/rule.png) no-repeat;
      background-size: 100% 100%;
      width: 0.55rem;
      height: 0.97rem;
      position: absolute;
      left: .25rem;
      top: 1.32rem;
    }
    .prize-record {
      position: absolute;
      background: url(./images/prizerecord.png) no-repeat;
      background-size: 100% 100%;
      width: 0.55rem;
      height: 1.25rem;
      top: 0.51rem;
      right: .16rem;
    }
    .tips {
      position: absolute;
      top: 4.8rem;
      left: 0;
      right: 0;
      height: .55rem;
      line-height: .55rem;
      text-align: center;
      font-size: 0.22rem;
      font-weight: 400;
      color: #892127;
      span {
        color: #D0144B;
        font-weight: bold;
      }
    }
    // 抽奖样式
    main {
      height: 6rem;
      width: 92%;
      position: absolute;
      top:5.35rem;
      left: 0;
      right: 0;
      margin: auto;
      .main-top {
        position: relative;
        display: flex;
        height: 0.5rem;
        width: 3.58rem;
        border: .02rem solid rgba(255, 174, 130, 1);
        border-radius: .15rem;
        align-items: center;
        justify-content: center;
        margin: .15rem auto 0;
        padding-right: 1.38rem;
        box-sizing: border-box;
        position: relative;
        img:first-child {
          display: block;
          width: 0.37rem;
          height: 0.33rem;
          margin-right: .18rem;
        }
        .mynum {
          white-space: nowrap;
          font-size: 0.36rem;
          font-weight: bold;
          color: rgba(255, 199, 87, 1);
        }
        .gain {
          position: absolute;
          right: 0;
          width: 1.38rem;
          height: .5rem;
          background: url(./images/gain.png) no-repeat;
          background-size: 100% 100%;
          font-size: .26rem;
          font-weight: bold;
          color: rgba(182, 16, 64, 1);
          text-align: center;
          line-height: .5rem;
          &.gray {
            background: url(./images/gain_gray.png) no-repeat;
            background-size: 100% 100%;
            color: #333;
          }
        }
      }
      article {
        width: 100%;
        margin-top: 0.1rem;
        box-sizing: border-box;
        position: relative;
        height: 5.1rem;
        .absolute {
          position: absolute;
        }
        ul {
          li {
            list-style: none;
            width: 1.41rem;
            height: 1.52rem;
            background: rgba(148, 15, 54, 1);
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: .02rem solid rgba(238, 70, 119, 1);
            border-radius: .15rem;
            box-sizing: border-box;
            .text-one {
              margin-top: 0.1rem;
            }
            .text-two {
              margin-top: 0.05rem;
            }
            &.on {
              background: rgba(120, 8, 41, 1);
              border: .03rem solid rgba(249, 217, 88, 1);
            }
            &.flk {
              left: 0.4rem;
              border: none;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .end {
              background: url(./images/received.png) no-repeat;
              background-size: 100% 100%;
              width: 1.41rem;
              height: 1.52rem;
              position: absolute;
              top: 0rem;
              left: 0rem;
              right: 0rem;
              bottom: 0rem;
              margin: auto;
            }
            p {
              white-space: nowrap;
              font-size: 0.22rem;
              font-weight: 400;
              color: rgba(255, 185, 129, 1);
            }
            img {
              width: 1.11rem;
              height: 0.64rem;
            }
            &:nth-child(1) {
              left: 0.4rem;
            }
            &:nth-child(2) {
              left: 1.9rem;
            }
            &:nth-child(3) {
              left: 3.4rem;
            }
            &:nth-child(4) {
              left: 4.9rem;
            }
            &:nth-child(5) {
              left: 4.9rem;
              top: 1.65rem;
            }
            &:nth-child(6) {
              left: 4.9rem;
              top: 3.3rem;
            }
            &:nth-child(7) {
              left: 3.4rem;
              top: 3.3rem;
            }
            &:nth-child(8) {
              left: 1.9rem;
              top: 3.3rem;
            }
            &:nth-child(9) {
              left: 0.4rem;
              top: 3.3rem;
            }
            &:nth-child(10) {
              left: 0.4rem;
              top: 1.65rem;
            }
          }
        }
        .middle-container {
          position: absolute;
          top: 1.65rem;
          left: 50%;
          width: 2.92rem;
          transform: translateX(-50%);
          margin-top: 0.05rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 1.52rem;
          .game-tips {
            text-align: center;
            font-size: 0.18rem;
            font-weight: 400;
            color: rgba(255, 174, 109, 1);
          }
          .current-consume {
            display: flex;
            align-items: center;
            width: 1.2rem;
            margin: 0.05rem auto;
            justify-content: center;
            img {
              width: 0.27rem;
              height: 0.24rem;
              display: block;
              margin-right: .14rem;
            }
            span {
              font-size: 0.3rem;
              font-family: Alibaba PuHuiTi;
              font-weight: bold;
              color: rgba(249, 225, 129, 1);
            }
          }
          .playgame {
            margin-left: 0.05rem;
            .goplay {
              width: 2.92rem;
              height: .64rem;
              line-height: .64rem;
              text-align: center;
              background: url("./images/startbtn.png");
              background-size: 100% 100%;
              font-size: .3rem;
              font-weight: bold;
              color: rgba(159, 16, 52, 1);
              &.gray {
                background: url("./images/blackbtn.png");
                background-size: 100% 100%;
                color: #333;
              }
            }
            img {
              display: block;
              width: 2.96rem;
              height: 0.65rem;
              margin: 0 auto;
              &:first-child:active {
                transform: translateY(0.02rem);
                transform: scale(0.9);
              }
              &:first-child:visited {
                scale: 1;
              }
            }
          }
        }
      }
    }
  }

  @keyframes breathe {
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
</style>

