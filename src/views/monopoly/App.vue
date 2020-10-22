<template>
  <main class="monopoly-wrapper">
    <div class="bg">
      <img v-for="index in 4" :key="`stage${currentStage}-${index}`"
        :src="require(`./img/bg/stage${currentStage}_${index}.png`)" alt="">
    </div>
    <article class="main-container">
      <section class="time">
        活动倒计时：{{countdownTime}}
      </section>
      <section class="pieces-wrapper">
        <ul>
          <li v-for="(item,index) in piecesList"
            :class="['piece-item',`index-${index}`,`item-${item.awardsType}`]"
            :key="`piece-${index}`">
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
            <template v-if="['back','go','fish','landlords','box'].includes(item.awardsType)">
              {{item.awardsDesc}}
            </template>
          </li>
        </ul>
      </section>
    </article>
    <article class="btn-wrapper">
      <div class="back"></div>
      <rule />
      <ul class="stage-tags">
        <li class="tag-item" :class="item.value===currentStage?'selected':'normal'"
          v-for="item in tagsList" :key="item.value" @click.stop="changeStage(item.value)">
          {{item.name}}</li>
      </ul>
      <rank />
    </article>
    <article class="bottom">
      <div class="bottom-bg"></div>
      <ul class="bottom-btn-wrapper">
        <li class="get-dice-btn"></li>
        <li class="dice-btn">
          <p class="times">{{currentTime}}次</p>
          <p class="desc">单次消耗 {{gameInfo.onceConsume}} 枚骰子</p>
          <div class="select-times-btn" @click="toggleShowTimeList"></div>
          <ul class="time-list" v-if="isShowTimeList">
            <li v-for="time in timeList" @click="changeTime(time)">{{time}}次</li>
          </ul>
        </li>
        <li class="history-btn">
          <p>当前剩余: <span>{{gameInfo.remnantNum}}</span></p>
        </li>
      </ul>
    </article>
  </main>
</template>

<script>
import utils from '@/common/js/utils'
import { activityInfo, gameInfo } from './services/api'
import Rule from './component/rule/rule'
import Rank from './component/rank/rank'
import _get from 'lodash.get'
export default {
  name: '',
  components: {
    Rule,
    Rank
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
      countdownTime: '',
      currentTime: 1,
      isShowTimeList: false,
      gameInfo: { gameAwardsList: [], timeList: [] }
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
        this.currentStage = _get(data, 'lastGameLevel', 2)
        this.gameInfo = _get(data, 'gameInfo', { gameAwardsList: [], timeList: [] })
        this.countDown(data.countdown)
      }
    },
    async getGameInfo (level) {
      const res = await gameInfo(level)
      const { code, data } = res
      if (code === 200) {
        this.gameInfo = data || { gameAwardsList: [], timeList: [] }
      }
    },
    onScroll () {
      let bottom = this.el.getBoundingClientRect().bottom
      let height = window.innerHeight
      if (bottom - height < 50) {
      }
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
      this.currentStage = value
      this.getGameInfo(value)
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
  .bg {
    text-align: center;
    font-size: 0;
    padding-bottom: 1rem;
    img {
      width: 100%;
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
      ul {
        .piece-item {
          position: absolute;
          width: 1.38rem;
          height: 1rem;
          background-image: url(./img/normal-item-bg.png);
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
            opacity: 0;
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
          }
          &.item-blank {
            width: 1.38rem;
            height: 1rem;
            background-image: url(./img/blank-item-bg.png);
          }
          &.item-home {
            width: 0.8rem;
            height: 1.36rem;
            background-image: url(./img/home-item-bg.png);
          }
          &.item-fish,
          &.item-landlords,
          &.item-jyz,
          &.item-hfq,
          &.item-jdk,
          &.item-yhq {
            font-weight: bold;
            font-size: 0.2rem;
            line-height: 0.24rem;
            padding-top: 0.24rem;
            padding-left: 0.1rem;
            span {
              font-weight: 400;
              font-size: 0.22rem;
            }
          }
          &.item-fish {
            padding-top: 0.3rem;
          }
          &.item-jyz {
            font-size: 0.24rem;
            padding-top: 0.22rem;
          }
          &.item-box {
            width: 1.4rem;
            height: 0.54rem;
            background-image: url(./img/box-item-bg.png);
            font-size: 0.24rem;
            font-weight: bold;
            color: #bc4601;
            line-height: 0.54rem;
            text-align: center;
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
          height: 2.06rem;
          background: url(./img/bottom/time-list-bg.png) no-repeat center center;
          background-size: 100% 100%;
          position: absolute;
          top: -0.5rem;
          right: 0.2rem;
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
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
