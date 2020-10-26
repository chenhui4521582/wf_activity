<template>
  <main class="monopoly-wrapper">
    <article id="area" ref="area">
      <section class="bg">
        <img v-for="index in 4" :key="`stage${currentStage}-${index}`"
          :src="require(`./img/bg/stage${currentStage}_${index}.png`)" alt="">
      </section>
      <transition name="fade">
        <section class="end-six-tips" v-if="currentSort>=30">
          <img src="./img/end-six-tips.png" alt="">
        </section>
      </transition>
      <section class="main-container">
        <section class="time">
          活动倒计时：{{countdownTime}}
        </section>
        <section class="pieces-wrapper">
          <ul>
            <li v-for="(item,index) in piecesList" :ref="`piece${index}`"
              :class="['piece-item',`index-${index}`,`item-${item.awardsType}`,{'over':index<currentSort,'current':index===currentSort}]"
              :key="`piece-${index}`" :style="{zIndex:37-index}">
              <template v-if="item.awardsType==='jyz'">
                {{item.awardsNum}}<br /><span>金叶</span>
              </template>
              <template v-if="item.awardsType==='hfq'">
                {{item.awardsDesc.replace('话费券','')}}<br /><span>话费券</span>
              </template>
              <template v-if="item.awardsType==='jdk'">
                {{item.awardsDesc.replace('京东券','')}}<br /><span>京东券</span>
              </template>
              <template v-if="item.awardsType==='yhq'">
                {{item.awardsDesc.replace('优惠券','')}}<br /><span>优惠券</span>
              </template>
              <template v-if="item.awardsType==='box'">
                {{item.awardsDesc.replace('随机大奖','')}}<br /><span>随机大奖</span>
              </template>
              <template v-if="item.awardsType==='jiabei'||item.awardsType==='jipaiqi'">
                <span>斗地主</span><br />{{item.awardsDesc.replace('斗地主','')}}
              </template>
              <template v-if="item.awardsType==='bingdong'||item.awardsType==='suoding'">
                <span>捕鱼</span><br />{{item.awardsDesc.replace('捕鱼','')}}
              </template>
              <template v-if="['back','go'].includes(item.awardsType)">
                {{item.awardsDesc}}
              </template>
              <div class="head-icon bounce" v-if="index===currentSort"></div>
            </li>
          </ul>
        </section>
      </section>
    </article>
    <article class="btn-wrapper">
      <div class="back" @click="back()"></div>
      <rule :act-info="actInfoData" />
      <ul class="stage-tags">
        <li class="tag-item" :class="item.value===currentStage?'selected':'normal'"
          v-for="item in tagsList" :key="item.value" @click.stop="changeStage(item.value)">
          {{item.name}}</li>
      </ul>
      <rank :act-info="actInfoData" @show-pop="showPop" @get-dice="showGetDice" />
    </article>
    <article class="dice-wrapper" v-if="isShowDice">
      <img v-if="diceNumber" :src="require(`./img/dice/${diceNumber}.png`)" alt="">
      <img v-else src="./img/dice/dice.gif" alt="">
    </article>
    <article class="bottom">
      <div class="bottom-bg"></div>
      <ul class="bottom-btn-wrapper">
        <li class="get-dice-btn" @click="showGetDice()"></li>
        <li class="dice-btn" @click="bet">
          <p class="times" @click.stop="toggleShowTimeList">{{currentTime}}次</p>
          <p class="desc">单次消耗 {{gameInfo.onceConsume}} 枚骰子</p>
          <div class="select-times-btn" @click.stop="toggleShowTimeList"></div>
          <transition name="fade">
            <ul class="time-list" v-show="isShowTimeList">
              <li v-for="time in timeList" @click.stop="changeTime(time)">{{time}}次</li>
            </ul>
          </transition>
        </li>
        <li class="history-btn" @click="showPop(6)">
          <p>当前剩余: <span>{{gameInfo.remnantNum}}</span></p>
        </li>
      </ul>
    </article>
    <article class="guide" v-if="isShowGuide" @click.stop="changeStep">
      <section v-for="item in stepArr" :class="`guide-item step-${item}`">
        <div class="circle"></div>
        <img class="arrow" :src="require(`./img/guide/step-${item}-arrow.png`)" alt="">
        <img class="text" :src="require(`./img/guide/step-${item}.png`)" alt="">
      </section>
    </article>
    <get-dice ref="getDice" @show-pop="showPop" @refresh="getGameInfo()" />
    <pop-up v-model="popType" :awards-info="awardsInfo" :current-stage="currentStage"
      :info="actInfoData" />
  </main>
</template>

<script>
import utils from '@/common/js/utils'
import { activityInfo, gameInfo, bet } from './services/api'
import Rule from './component/rule/rule'
import Rank from './component/rank/rank'
import GetDice from './component/getDice/index'
import PopUp from './component/popUp'
import _get from 'lodash.get'
export default {
  name: '',
  components: {
    Rule,
    Rank,
    GetDice,
    PopUp
  },
  data () {
    return {
      actInfoData: {
        gameInfo: {
          gameAwardsList: []
        },
        rankPopup: {}
      },
      tagsList: [
        {
          name: '普通探宝',
          value: 1
        },
        {
          name: '超级探宝',
          value: 2
        }
      ],
      currentStage: 1,
      currentSort: 0,
      countdownTime: '',
      currentTime: 1,
      isShowTimeList: false,
      gameInfo: { gameAwardsList: [], timeList: [] },
      popType: 0,
      isShowDice: false,
      diceNumber: 0,
      awardsInfo: [{
        'awardsDesc': '666元京东券',
        'awardsType': 'jdk'
      }],
      isShowGuide: false,
      guideTime: null,
      stepArr: [1, 2],
      rankInfo: {}
    }
  },
  computed: {
    curChannel () {
      return localStorage.getItem('APP_CHANNEL') || utils.getUrlParam('channel')
    },
    sourceAddress () {
      return utils.getUrlParam('from')
    },
    timeList () {
      return this.gameInfo.timeList.sort((itemA, itemB) => (itemB - itemA)).filter(item => item !== this.currentTime) || []
    },
    rankPopup () {
      return this.actInfoData.rankPopup || {}
    },
    piecesList () {
      let list = [{ awardsDesc: '起点', awardsNum: 0, awardsType: 'start' }, ...this.gameInfo.gameAwardsList]
      return list
    }
  },
  filters: {
    numberFilter (number) {
      return number || (number === 0 ? 0 : '?')
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const res = await activityInfo()
      const { code, data } = res
      if (code === 200) {
        this.actInfoData = data
        this.rankInfo = _get(data, 'rankPopup', {})
        this.countDown(data.countdown)
        this.currentStage = _get(data, 'lastGameLevel', 2)
        this.gameInfo = _get(data, 'gameInfo', { gameAwardsList: [], timeList: [] })
        this.currentSort = _get(data, 'gameInfo.currentSort', 0)
        if (this.rankInfo.popup) {
          this.showPop(5, [this.rankInfo])
        }
        this.onScroll()
        GLOBALS.marchSetsPoint('P_H5PT0345', { source_address: this.sourceAddress }) // H5平台-欢乐大富翁-页面加载完成
        if (!localStorage.getItem('happyMonopoly') && this.actInfoData.state === 1) {
          this.isShowGuide = true
          GLOBALS.marchSetsPoint('A_H5PT0345004343') // H5平台-欢乐大富翁-活动引导页加载完成
          this.guideTime = setTimeout(() => {
            clearTimeout(this.guideTime)
            this.changeStep()
          }, 3000)
        }
      }
    },
    async bet () {
      if (this.gameInfo.remnantNum < this.gameInfo.onceConsume * this.currentTime) {
        this.$toast.show({
          message: '当前剩余骰子数不足',
          duration: 2000,
          isOneLine: true
        })
        return
      }
      GLOBALS.marchSetsPoint('A_H5PT0345004349', {
        level: this.currentStage,
        times: this.currentTime
      }) // H5平台-欢乐大富翁-投掷按钮点击
      this.isShowDice = true
      try {
        const res = await bet({
          gameLevel: this.currentStage,
          time: this.currentTime
        })
        const { code, data } = res
        if (code === 200) {
          this.gameInfo.remnantNum = data.remnantNum
          let diceTime = setTimeout(() => {
            clearTimeout(diceTime)
            if (this.currentTime === 1) {
              this.diceNumber = data.lastGameNum
              let pieceTime = setTimeout(() => {
                clearTimeout(pieceTime)
                this.isShowDice = false
                this.diceNumber = 0
                if (this.currentSort !== 36 && this.currentSort + data.lastGameNum > 36) {
                  this.currentSort = 36 - (this.currentSort + data.lastGameNum - 36)
                } else if (this.currentSort === 36) {
                  this.currentSort = data.currentSort
                } else {
                  this.currentSort = this.currentSort + data.lastGameNum
                }
                if (['go', 'back'].includes(this.piecesList[this.currentSort].awardsType)) {
                  this.$toast.show({
                    message: this.piecesList[this.currentSort].awardsDesc,
                    duration: 2000,
                    isOneLine: true
                  })
                  let time = setTimeout(() => {
                    clearTimeout(time)
                    this.currentSort = data.currentSort
                    if (this.currentSort === 36) {
                      this.showPop(4, data.awardsList)
                    } else if (data.awardsList.length) {
                      this.showPop(1, data.awardsList)
                    } else {
                      this.showPop(3, data.awardsList)
                    }
                    this.onScroll()
                    return
                  }, 2000)
                } else {
                  if (this.currentSort === 36) {
                    this.showPop(4, data.awardsList)
                  } else if (data.awardsList.length) {
                    this.showPop(1, data.awardsList)
                  } else {
                    this.showPop(3, data.awardsList)
                  }
                }
                this.onScroll()
                return
              }, 1000)
            } else {
              this.isShowDice = false
              this.diceNumber = 0
              this.currentSort = data.currentSort
              this.showPop(2, data.awardsList)
            }
            this.onScroll()
            return
          }, 1000)
        } else {
          this.isShowDice = false
          this.$toast.show({
            message: '请稍后重试',
            duration: 2000,
            isOneLine: true
          })
        }
      } catch (error) {
        this.isShowDice = false
        this.$toast.show({
          message: '请稍后重试',
          duration: 2000,
          isOneLine: true
        })
      }
    },
    async getGameInfo (level) {
      if (!level) {
        level = this.currentStage
      }
      const res = await gameInfo(level)
      const { code, data } = res
      if (code === 200) {
        this.gameInfo = data || { gameAwardsList: [], timeList: [] }
        this.currentSort = data.currentSort
        this.onScroll()
      }
    },
    back () {
      GLOBALS.marchSetsPoint('A_H5PT0345004347') // H5平台-欢乐大富翁-返回按钮点击
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
    },
    onScroll () {
      setTimeout(() => {
        this.$refs.area.scrollTo(0, this.$refs[`piece${this.currentSort}`][0].offsetTop - 100)
      }, 100)
    },
    countDown (data) {
      if (!data) return false
      let date = data / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
          this.$emit('masterTaskStatus', false)
          this.showFlag = false
        }
        let day = Math.floor(date / 86400)
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        if (day > 0) {
          this.countdownTime = `${day}天${hour}小时${minute}分`
        } else {
          this.countdownTime = `${hour}小时${minute}分${second}秒`
        }
      }, 1000)
    },
    toggleShowTimeList () {
      this.isShowTimeList = !this.isShowTimeList
    },
    changeTime (time) {
      this.isShowTimeList = false
      this.currentTime = time
    },
    changeStage (value) {
      if (this.currentStage === value) {
        return
      }
      this.currentStage = value
      this.getGameInfo(value)
      if (value === 1) {
        GLOBALS.marchSetsPoint('A_H5PT0345004344') // H5平台-欢乐大富翁-普通探宝按钮点击
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0345004345') // H5平台-欢乐大富翁-超级探宝按钮点击
      }
    },
    showGetDice () {
      this.$refs.getDice.showGetDice()
    },
    showPop (type, info) {
      this.popType = type
      this.awardsInfo = info
      switch (type) {
        case 1:
        case 2:
          GLOBALS.marchSetsPoint('A_H5PT0345004355') // H5平台-欢乐大富翁-普通事件弹窗加载完成
          break
        case 4:
          GLOBALS.marchSetsPoint('A_H5PT0345004356') // H5平台-欢乐大富翁-终点大盒子奖励弹窗加载完成
          break
        case 5:
          GLOBALS.marchSetsPoint('A_H5PT0345004357') // H5平台-欢乐大富翁-恭喜上榜弹窗加载完成
          break

        default:
          break
      }
    },
    changeStep () {
      if (this.stepArr.length === 2) {
        this.stepArr = [3, 4, 5]
        clearTimeout(this.guideTime)
        this.guideTime = setTimeout(() => {
          clearTimeout(this.guideTime)
          this.changeStep()
        }, 3000)
      } else {
        clearTimeout(this.guideTime)
        localStorage.setItem('happyMonopoly', true)
        this.isShowGuide = false
        this.stepArr = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.monopoly-wrapper {
  min-height: 100vh;
  box-sizing: border-box;
  font-size: 0.24rem;
  font-family: Alibaba PuHuiTi;
  position: relative;
  z-index: 1;
  #area {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .bg {
    text-align: center;
    font-size: 0;
    padding-bottom: 1rem;
    img {
      width: 100%;
    }
  }
  .end-six-tips {
    position: absolute;
    top: 4.5rem;
    right: 0.4rem;
    img {
      width: 4.2rem;
    }
  }
  .main-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    min-height: 100vh;
    padding: 0.1rem;
    z-index: 2;
    .time {
      width: 100%;
      margin-top: 1.48rem;
      text-align: center;
      font-size: 0.26rem;
      margin-left: 0.1rem;
      color: #fff;
    }
    .pieces-wrapper {
      position: relative;
      .head-icon {
        width: 1.04rem;
        height: 1.28rem;
        background: url(./img/head-icon.png) no-repeat center center;
        background-size: 100% 100%;
        position: absolute;
        animation: name duration timing-function delay iteration-count direction
          fill-mode;
      }
      ul {
        .piece-item {
          position: absolute;
          width: 1.38rem;
          height: 1rem;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
          color: #fff;
          transform: translate3D(-50%, -50%, 0);
          text-align: center;
          box-sizing: border-box;
          &.index-0 {
            top: 25.24rem;
            left: 2.9rem;
          }
          &.index-1 {
            top: 24.8rem;
            left: 4.4rem;
          }
          &.index-2 {
            top: 23.8rem;
            left: 5.44rem;
          }
          &.index-3 {
            top: 22.5rem;
            left: 5.2rem;
          }
          &.index-4 {
            top: 22.1rem;
            left: 3.6rem;
          }
          &.index-5 {
            top: 22.1rem;
            left: 1.9rem;
          }
          &.index-6 {
            top: 21rem;
            left: 1.1rem;
          }
          &.index-7 {
            top: 19.8rem;
            left: 1.14rem;
          }
          &.index-8 {
            top: 18.6rem;
            left: 1.6rem;
          }
          &.index-9 {
            top: 18.5rem;
            left: 3.1rem;
          }
          &.index-10 {
            top: 19.6rem;
            left: 4.2rem;
          }
          &.index-11 {
            top: 19.8rem;
            left: 5.68rem;
          }
          &.index-12 {
            top: 18.6rem;
            left: 5.7rem;
          }
          &.index-13 {
            top: 17.3rem;
            left: 5.8rem;
          }
          &.index-14 {
            top: 16.1rem;
            left: 5rem;
          }
          &.index-15 {
            top: 16.1rem;
            left: 3.2rem;
          }
          &.index-16 {
            top: 15.7rem;
            left: 1.6rem;
          }
          &.index-17 {
            top: 14.2rem;
            left: 1.64rem;
          }
          &.index-18 {
            top: 13.4rem;
            left: 3rem;
          }
          &.index-19 {
            top: 13.4rem;
            left: 4.6rem;
          }
          &.index-20 {
            top: 12.6rem;
            left: 5.8rem;
          }
          &.index-21 {
            top: 11.4rem;
            left: 5.8rem;
          }
          &.index-22 {
            top: 10rem;
            left: 5.4rem;
          }
          &.index-23 {
            top: 10.1rem;
            left: 3.6rem;
          }
          &.index-24 {
            top: 11.2rem;
            left: 2.2rem;
          }
          &.index-25 {
            top: 10.2rem;
            left: 1.2rem;
          }
          &.index-26 {
            top: 8.9rem;
            left: 1.2rem;
          }
          &.index-27 {
            top: 7.6rem;
            left: 2.4rem;
          }
          &.index-28 {
            top: 7.6rem;
            left: 4.2rem;
          }
          &.index-29 {
            top: 7.2rem;
            left: 5.8rem;
          }
          &.index-30 {
            top: 6.04rem;
            left: 5.8rem;
          }
          &.index-31 {
            top: 4.86rem;
            left: 5.3rem;
          }
          &.index-32 {
            top: 4.86rem;
            left: 3.2rem;
          }
          &.index-33 {
            top: 4.2rem;
            left: 1.6rem;
          }
          &.index-34 {
            top: 2.9rem;
            left: 1.56rem;
          }
          &.index-35 {
            top: 1.5rem;
            left: 2.06rem;
          }
          &.index-36 {
            // top: 1.5rem;
            // left: 4.2rem;
            top: 0.7rem;
            left: 5.4rem;
          }
          &.item-start {
            background: none;
            .head-icon {
              top: -1.3rem;
              left: 0.1rem;
            }
          }
          &.item-go {
            width: 1.04rem;
            height: 1.04rem;
            background-image: url(./img/go-item-bg.png);
            color: #2c6666;
            font-size: 0.22rem;
            font-weight: bold;
            padding-top: 0.12rem;
            padding-left: 0.12rem;
            line-height: 0.32rem;
            .head-icon {
              top: -1.2rem;
              left: 0rem;
            }
          }
          &.item-back {
            width: 1.16rem;
            height: 1.04rem;
            background-image: url(./img/back-item-bg.png);
            color: #611c03;
            font-size: 0.22rem;
            font-weight: bold;
            padding-top: 0.1rem;
            padding-right: 0.18rem;
            line-height: 0.32rem;
            .head-icon {
              top: -1.2rem;
              left: 0rem;
            }
          }
          &.item-blank {
            width: 1.38rem;
            height: 1rem;
            background-image: url(./img/blank-item-bg.png);
            .head-icon {
              top: -1.2rem;
              left: 0.2rem;
            }
          }
          &.item-home {
            width: 0.8rem;
            height: 1.36rem;
            background-image: url(./img/home-item-bg.png);
            .head-icon {
              top: -1.2rem;
              left: -0.12rem;
            }
          }
          &.item-bingdong,
          &.item-suoding,
          &.item-jiabei,
          &.item-jipaiqi,
          &.item-jyz,
          &.item-hfq,
          &.item-jdk,
          &.item-yhq {
            font-weight: bold;
            font-size: 0.2rem;
            line-height: 0.24rem;
            padding-top: 0.24rem;
            padding-left: 0.1rem;
            width: 1.38rem;
            height: 1rem;
            background-image: url(./img/normal-item-bg.png);
            span {
              font-weight: 400;
              font-size: 0.22rem;
            }
            .head-icon {
              top: -1.3rem;
              left: 0.2rem;
            }
            &.over {
              background-image: url(./img/over-item-bg.png);
            }
            &.current {
              width: 1.54rem;
              height: 1.1rem;
              background-image: url(./img/current-item-bg.png);
            }
          }
          &.item-bingdong,
          &.item-suoding,
          &.item-jiabei,
          &.item-jipaiqi {
            padding-top: 0.22rem;
            font-size: 0.22rem;
          }
          &.item-jyz {
            font-size: 0.24rem;
            padding-top: 0.22rem;
          }
          &.item-box {
            width: 1.76rem;
            height: 0.58rem;
            background-image: url(./img/box-item-bg.png);
            font-size: 0.22rem;
            font-weight: bold;
            color: #bc4601;
            line-height: 0.24rem;
            box-sizing: border-box;
            padding-left: 0.2rem;
            padding-top: 0.05rem;
            .head-icon {
              top: 0rem;
              left: -1rem;
            }
          }
        }
      }
    }
  }
  .btn-wrapper {
    .back {
      position: fixed;
      width: 0.86rem;
      height: 0.94rem;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      z-index: 3;
      top: 2rem;
      left: 0.06rem;
      background-image: url(./img/back-btn-icon.png);
    }
    .stage-tags {
      position: fixed;
      top: 4.9rem;
      left: 0;
      z-index: 3;
      li {
        word-break: break-all;
        font-size: 0.3rem;
        color: #fff;
        font-weight: bold;
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        line-height: 0.32rem;
        margin-top: -0.12rem;
        &.normal {
          width: 0.6rem;
          height: 1.72rem;
          padding: 0.2rem 0 0 0.06rem;
          background-image: url(./img/normal-tag-btn.png);
        }
        &.selected {
          width: 0.88rem;
          height: 1.72rem;
          padding: 0.2rem 0.4rem 0 0.2rem;
          background-image: url(./img/selected-tag-btn.png);
        }
      }
    }
  }
  .dice-wrapper {
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    img {
      width: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3D(-50%, -50%, 0);
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 4;
    .bottom-bg {
      height: 1.82rem;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: url(./img/bottom/bottom-bg.png) no-repeat center bottom;
      background-size: 7.2rem auto;
    }
    .bottom-btn-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      text-align: center;
      .get-dice-btn {
        width: 1.98rem;
        height: 1.6rem;
        background: url(./img/bottom/get-dice-btn-bg.png) no-repeat center
          bottom;
        background-size: 100% 100%;
        margin-bottom: 0.1rem;
      }
      .dice-btn {
        width: 2.7rem;
        height: 2.8rem;
        background: url(./img/bottom/dice-btn-bg.png) no-repeat center bottom;
        background-size: 100% 100%;
        margin: 0 0.1rem;
        position: relative;
        box-sizing: border-box;
        padding-top: 1.56rem;
        .times {
          font-size: 0.38rem;
          font-weight: bold;
          color: #fff;
          line-height: 0.5rem;
          margin-right: 1rem;
          margin-left: 0.3rem;
        }
        .desc {
          margin-top: 0.06rem;
          font-size: 0.24rem;
          line-height: 0.36rem;
          color: #954600;
        }
        .select-times-btn {
          position: absolute;
          right: 0.24rem;
          bottom: 0.7rem;
          width: 0.74rem;
          height: 0.6rem;
        }
        .time-list {
          width: 2.18rem;
          background: url(./img/bottom/time-list-bg.png) no-repeat center center;
          background-size: 100% 100%;
          position: absolute;
          bottom: 1.3rem;
          top: -0.6rem;
          right: 0.2rem;
          overflow: hidden;
          li {
            font-size: 0.24rem;
            color: #fff3a5;
            line-height: 0.64rem;
          }
        }
      }
      .history-btn {
        width: 2rem;
        height: 1.38rem;
        background: url(./img/bottom/history-btn-bg.png) no-repeat center bottom;
        background-size: 100% 100%;
        margin-bottom: 0.1rem;
        color: #fff;
        font-size: 0.22rem;
        box-sizing: border-box;
        padding-top: 0.18rem;
        line-height: 0.36rem;
      }
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
      bottom: 0;
      left: 0;
      height: 3.2rem;
      width: 100%;
      .circle {
        width: 2rem;
        height: 2rem;
        box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.58);
        position: absolute;
        border-radius: 50%;
        bottom: 0;
        left: 0.1rem;
      }
      .arrow {
        position: absolute;
        width: 1.02rem;
        bottom: 1.9rem;
        left: 1rem;
      }
      .text {
        position: absolute;
        width: 3.26rem;
        top: 0;
        left: 2.2rem;
      }
    }
    .step-2 {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 3.2rem;
      width: 100%;
      .circle {
        width: 1.5rem;
        height: 3.6rem;
        box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.58);
        position: absolute;
        border-radius: 50%;
        top: 4.6rem;
        left: -0.4rem;
      }
      .arrow {
        position: absolute;
        width: 1.06rem;
        top: 6rem;
        left: 1rem;
      }
      .text {
        position: absolute;
        width: 4.16rem;
        top: 7rem;
        left: 1.5rem;
      }
    }
    .step-3 {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4rem;
      width: 100%;
      .circle {
        width: 2.4rem;
        height: 2.4rem;
        box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.58);
        position: absolute;
        border-radius: 50%;
        bottom: 0.3rem;
        left: 50%;
        margin-left: -1.2rem;
      }
      .arrow {
        position: absolute;
        width: 0.32rem;
        bottom: 1.8rem;
        left: 50%;
        margin-left: -0.16rem;
      }
      .text {
        position: absolute;
        width: 3.18rem;
        top: 0;
        left: 50%;
        margin-left: -1.58rem;
      }
    }
    .step-4 {
      position: absolute;
      top: 0;
      height: 4.8rem;
      left: 0;
      width: 100%;
      .circle {
        width: 0;
        height: 0;
        box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.58);
        position: absolute;
        border-radius: 50%;
        bottom: 0.3rem;
        left: 50%;
        margin-left: -1.2rem;
      }
      .arrow {
        position: absolute;
        width: 0.32rem;
        top: 0.34rem;
        left: 50%;
        margin-left: -0.16rem;
      }
      .text {
        position: absolute;
        width: 4.7rem;
        top: 1.66rem;
        left: 50%;
        margin-left: -2.02rem;
      }
    }
    .step-5 {
      position: absolute;
      top: 4.8rem;
      left: 0;
      bottom: 4rem;
      width: 100%;
      .circle {
        width: 1.2rem;
        height: 2.4rem;
        box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.58);
        position: absolute;
        border-radius: 50%;
        top: 0.1rem;
        right: -0.24rem;
      }
      .arrow {
        position: absolute;
        width: 0.98rem;
        top: 0.2rem;
        right: 0.76rem;
      }
      .text {
        position: absolute;
        width: 3.1rem;
        top: 0;
        right: 2rem;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  top: 1.5rem !important;
  opacity: 0;
}
.bounce {
  animation-duration: 1.5s;
  animation-name: bounce;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  transform-origin: center bottom;
}

@keyframes bounce {
  0%,
  15%,
  47%,
  73%,
  89%,
  100% {
    animation-timing-function: ease-out;
    transform: translate3d(0, 0, 0);
  }

  30%,
  32% {
    animation-timing-function: ease-in;
    transform: translate3d(0, -0.2rem, 0);
  }

  60% {
    animation-timing-function: ease-in;
    transform: translate3d(0, -0.12rem, 0);
  }

  82% {
    animation-timing-function: ease-in;
    transform: translate3d(0, -0.06rem, 0);
  }

  94% {
    animation-timing-function: ease-in;
    transform: translate3d(0, -0.02rem, 0);
  }
}
</style>
