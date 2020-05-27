<template>
  <main v-if="info&&info.state">
    <template v-if="!showProfit && !isEnd">
      <div class="light-up" :style="{backgroundImage:`url(${require(`./img/bg-${level}.png`)})`}">
        <header>
          <div class="time">活动时间：{{info.beginDate}}-{{info.endDate}}</div>
          <div class="title">
            <img src="./img/title.png" alt="">
          </div>
        </header>
        <article class="lamp-wrapper" :class="`level-${level}`">
          <div class="chimpanzee-wrapper default" v-if="currentIndex === 10">
            <div class="chimpanzee">
              <div class="number">
                <p>进度</p>
                <p>{{info.currentAmount|conversion}}</p>
              </div>
            </div>
          </div>
          <ul>
            <li v-for="(item,index) in list" :key="index" :class="`step-${index}`"
              @click="handleClick(item)">
              <div class="lamp"
                :class="{dark:item.status === 0,twinkle:item.status === 1,light:item.status===2}">
                <div class="chimpanzee-wrapper" :class="chimpanzeePosition(index)?'right':'left'"
                  v-if="currentIndex === index && currentLevel === level">
                  <div class="chimpanzee">
                    <div class="number">
                      <p>进度</p>
                      <p>{{info.currentAmount|conversion}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text">
                <p>累计消耗</p>
                <p>{{item.amount|conversion}}金叶</p>
                <div class="point-bg" v-if="index<list.length-1">
                  <div class="point-icon" :style="{width:percentWidth(item,list[index+1])}"></div>
                </div>
              </div>
            </li>
          </ul>
        </article>
        <article class="bottom-wrapper">
          <section class="btn-wrapper">
            <div class="left-btn" @click="_receiveAll">奖励一键领取</div>
            <div class="right-btn" @click="openProfit">查看排行榜</div>
          </section>
          <p>排行榜第一名可得<span>8888</span>话费券</p>
        </article>
        <top-btn v-model="level" @open-pop="openPop" />
      </div>
    </template>
    <!-- 排行榜 -->
    <profit v-if="showProfit || isEnd" :is-end="isEnd" :info="info" @show-pop="openAwardsPop"
      @back="showProfit=false" />
    <pop-up v-model="popType" :info="info" :award-info="awardInfo" v-show="showPop"
      @close="closePop" />
  </main>
</template>

<script>
import _get from 'lodash.get'
import _clonedeep from 'lodash.clonedeep'
import { activityInfo, receiveAll, receive } from './services/api'
export default {
  name: '',
  components: {
    'pop-up': () => import('./component/popUp'),
    'top-btn': () => import('./component/topBtn'),
    profit: () => import('./component/profit')
  },
  data () {
    return {
      level: 1,
      currentLevel: 1,
      info: {},
      number: 4999999,
      popType: 0,
      showPop: false,
      showProfit: false,
      awardInfo: {}
    }
  },
  computed: {
    currentIndex () {
      let index = 0
      let arr = _clonedeep(this.list)
      if (arr) {
        index = arr.length - 1 - arr.reverse().findIndex(item => item.status)
      }
      return index
    },
    list () {
      return this.info.levelProgressList && this.info.levelProgressList[this.level - 1].progressList
    },
    isEnd () {
      return !this.info.countdown || this.info.state === 2
    }
  },
  filters: {
    conversion (value) {
      if (value >= 10000) {
        return `${Math.floor(value / 100) / 100}万`
      } else {
        return value
      }
    }
  },
  mounted () {
    this._activityInfo()
    GLOBALS.marchSetsPoint('P_H5PT0297', {
      source_address: GLOBALS.getUrlParam('from') || ''
    }) // H5平台-猩猩点灯活动-页面加载完成
  },
  methods: {
    chimpanzeePosition (index) {
      let rightArr = [2, 3, 4, 7, 8]
      return rightArr.includes(index)
    },
    percentWidth (now, next) {
      if (next.status) {
        return '100%'
      } else {
        let currentAmount = this.info.currentAmount
        return (currentAmount - now.amount) / (next.amount - now.amount) * 100 + '%'
      }
    },
    async _activityInfo () {
      const res = await activityInfo()
      this.info = _get(res, 'data', {})
      this.level = this.info.currentLevel
      this.currentLevel = this.info.currentLevel
    },
    handleClick (item) {
      switch (item.status) {
        case 0:
          this.awardInfo = {
            amount: item.amount,
            awardsName: item.awardsName
          }
          this.openPop(3)
          GLOBALS.marchSetsPoint('A_H5PT0297003539', {
            level: this.level,
            task_id: item.sort,
            task_name: `累计消耗${item.amount}金叶`
          }) // H5平台-猩猩点灯活动-灯泡点击（未完成）
          break
        case 1:
          this._receive(item)
          GLOBALS.marchSetsPoint('A_H5PT0297003540', {
            level: this.level,
            task_id: item.sort,
            task_name: `累计消耗${item.amount}金叶`
          }) // H5平台-猩猩点灯活动-灯泡奖励领取（已完成）
          break

        default:
          break
      }
    },
    async _receiveAll () {
      const res = await receiveAll(this.level)
      const code = _get(res, 'code', 0)
      if (code === 200) {
        this.awardInfo = _get(res, 'data', {})
        this.openPop(5)
        GLOBALS.marchSetsPoint('A_H5PT0297003537', {
          level: this.level
        }) // H5平台-猩猩点灯活动-奖励一键领取按钮点击
      } else if (code === 101) {
        this.$toast.show({
          message: _get(res, 'message', ''),
          duration: 3000
        })
      }
    },
    async _receive (item) {
      const res = await receive({ level: this.level, sort: item.sort })
      const code = _get(res, 'code', 0)
      if (code === 200) {
        this.awardInfo = _get(res, 'data', {})
        this.openPop(4)
      } else if (code === 101) {
        this.$toast.show({
          message: _get(res, 'message', ''),
          duration: 3000
        })
      }
    },
    openPop (type) {
      this.popType = type
      this.showPop = true
      switch (type) {
        case 4:
        case 5:
          GLOBALS.marchSetsPoint('A_H5PT0297003542') // H5平台-猩猩点灯活动-奖励获得弹窗加载完成
          break

        default:
          break
      }
    },
    openAwardsPop (type, item) {
      item && (this.awardInfo = item)
      this.openPop(type)
    },
    closePop (isSure) {
      this.showPop = false
      if (isSure) {
        switch (this.popType) {
          case 0:
            this.level = this.currentLevel
            break
          case 3:
            GLOBALS.marchSetsPoint('A_H5PT0297003541') // H5平台-猩猩点灯活动-点灯任务弹窗-立即完成点击
            this.openPop(7)
            break
          case 4:
          case 5:
            if (this.info.state === 1) {
              this._activityInfo()
            }
          default:
            break
        }
      }
    },
    openProfit () {
      this.showProfit = true
      GLOBALS.marchSetsPoint('A_H5PT0297003538') // H5平台-猩猩点灯活动-查看排行榜按钮点击
    }
  },
  watch: {
    level (value) {
      if (this.info.levelProgressList && !this.info.levelProgressList[this.level - 1].open) {
        this.openPop(0)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.light-up {
  min-height: 100vh;
  width: 100vw;
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  overflow-x: hidden;
  font-family: Alibaba PuHuiTi;
  font-weight: 400;
  position: relative;
  color: #fff;
  font-size: 0.24rem;
  img {
    max-width: 100%;
  }
  header {
    .time {
      font-size: 0.18rem;
      color: #fcfafb;
      margin: 0.08rem auto;
      position: relative;
      white-space: nowrap;
      width: min-content;
      color: #6d7999;
      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        height: 1px;
        width: 0.64rem;
        top: 50%;
        background: #6d7999;
      }
      &::before {
        right: calc(~'100% + 0.06rem');
      }
      &::after {
        left: calc(~'100% + 0.06rem');
      }
    }
    .title {
      width: 6.32rem;
      font-size: 0;
      margin: -0.3rem auto 0;
    }
  }
  .lamp-wrapper {
    height: 11.8rem;
    .chimpanzee-wrapper {
      position: absolute;
      top: 1.2rem;
      .chimpanzee {
        width: 1.14rem;
        height: 1.36rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
      }
      .number {
        text-align: center;
        position: absolute;
        background: #f5f6f9;
        border-radius: 0.1rem;
        height: 0.58rem;
        line-height: 0.24rem;
        padding: 0.02rem 0.1rem;
        bottom: 1.48rem;
        color: #d0a56d;
        box-sizing: border-box;
        white-space: nowrap;
        transform: translateX(-50%);
        &::after {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 0.1rem;
          background: url('./img/bottom-arrow.png') no-repeat center bottom;
          background-size: auto 100%;
          top: 0.54rem;
          left: 0;
        }
      }
      &.default {
        top: 3.2rem;
        left: 1.8rem;
        .chimpanzee {
          background-image: url('./img/chimpanzee-left.png');
        }
        .number {
          left: 36%;
        }
      }
      &.left {
        left: -0.8rem;
        .chimpanzee {
          background-image: url('./img/chimpanzee-left.png');
        }
        .number {
          left: 36%;
        }
      }
      &.right {
        right: -0.8rem;
        .chimpanzee {
          background-image: url('./img/chimpanzee-right.png');
        }
        .number {
          left: 61%;
        }
      }
    }
    ul {
      position: relative;
      li {
        position: absolute;
        .lamp {
          width: 1.8rem;
          height: 1.8rem;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: relative;
        }
        .text {
          width: 1.36rem;
          height: 0.56rem;
          text-align: center;
          background-image: url('./img/text-bg.png');
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin: -0.02rem auto 0;
          line-height: 0.24rem;
          font-size: 0.18rem;
          padding: 0.04rem;
          box-sizing: border-box;
          position: relative;
          p:first-child {
            color: #a8640c;
            font-weight: 400;
          }
          p:last-child {
            color: #c75d07;
            font-weight: bold;
          }
        }

        .point-bg {
          height: 0.2rem;
          background: url('./img/dark-icon.png') repeat-x left center;
          background-size: auto 100%;
          position: absolute;
          transform-origin: left center;
          .point-icon {
            height: 0.2rem;
            width: 0%;
            max-width: 100%;
            background: url('./img/light-icon.png') repeat-x left center;
            background-size: auto 100%;
          }
        }
        &.step-0 {
          top: -0.48rem;
          left: 2.9rem;
          .point-bg {
            width: 1rem;
            bottom: 0.1rem;
            left: 1.36rem;
            transform: rotateZ(33deg);
          }
        }
        &.step-1 {
          top: 0.38rem;
          left: 5rem;
          .point-bg {
            width: 1.3rem;
            left: 0.8rem;
            transform: rotateZ(121deg);
            bottom: -0.1rem;
          }
        }
        &.step-2 {
          top: 1.9rem;
          left: 3.8rem;
          .point-bg {
            width: 0.64rem;
            left: 0.04rem;
            transform: rotateZ(150deg);
            bottom: 0.1rem;
          }
        }
        &.step-3 {
          top: 2.4rem;
          left: 2rem;
          .point-bg {
            width: 1.2rem;
            left: 0.6rem;
            transform: rotateZ(132deg);
            bottom: -0.1rem;
          }
        }
        &.step-4 {
          top: 3.7rem;
          left: 0.5rem;
          .point-bg {
            width: 1.7rem;
            left: 0.7rem;
            transform: rotateZ(15deg);
            bottom: -0.1rem;
          }
        }
        &.step-5 {
          top: 4.5rem;
          left: 2.8rem;
          .point-bg {
            width: 1.2rem;
            left: 1.34rem;
            transform: rotateZ(344deg);
            bottom: 0.2rem;
          }
        }
        &.step-6 {
          top: 4.2rem;
          left: 5.2rem;
          .point-bg {
            width: 2.6rem;
            left: 0.8rem;
            transform: rotateZ(129deg);
            bottom: -0.1rem;
          }
        }
        &.step-7 {
          top: 6.5rem;
          left: 3rem;
          .point-bg {
            width: 1.3rem;
            left: 0.1rem;
            transform: rotateZ(167deg);
            bottom: 0rem;
          }
        }
        &.step-8 {
          top: 7rem;
          left: 0.5rem;
          .point-bg {
            width: 2.8rem;
            left: 0.6rem;
            transform: rotateZ(35deg);
            bottom: -0.1rem;
          }
        }
        &.step-9 {
          top: 9rem;
          left: 3.4rem;
        }
      }
    }
    &.level-1 {
      .lamp {
        &.dark {
          background-image: url('./img/dark-lamp-1.png');
        }
        &.light {
          background-image: url('./img/light-lamp-1.png');
        }
        &.twinkle {
          animation: twinkle1 1s infinite;
        }
      }
    }
    &.level-2 {
      .lamp {
        &.dark {
          background-image: url('./img/dark-lamp-2.png');
        }
        &.light {
          background-image: url('./img/light-lamp-2.png');
        }
        &.twinkle {
          animation: twinkle2 1s infinite;
        }
      }
    }
    &.level-3 {
      .lamp {
        &.dark {
          background-image: url('./img/dark-lamp-3.png');
        }
        &.light {
          background-image: url('./img/light-lamp-3.png');
        }
        &.twinkle {
          animation: twinkle3 1s infinite;
        }
      }
    }
    &.level-4 {
      .lamp {
        &.dark {
          background-image: url('./img/dark-lamp-4.png');
        }
        &.light {
          background-image: url('./img/light-lamp-4.png');
        }
        &.twinkle {
          animation: twinkle4 1s infinite;
        }
      }
    }
  }
  .bottom-wrapper {
    text-align: center;
    color: #fff;
    font-size: 0.3rem;
    font-weight: 400;
    .btn-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        width: 2.9rem;
        height: 0.8rem;
        line-height: 0.8rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: 0 0.16rem 0.22rem;
      }
      .left-btn {
        background-image: url('./img/purple-btn.png');
      }
      .right-btn {
        background-image: url('./img/blue-btn.png');
      }
    }
    p {
      font-weight: bold;
      margin-bottom: 0.4rem;
      span {
        color: #fcde39;
      }
    }
  }
}
@keyframes twinkle1 {
  from {
    background-image: url('./img/dark-lamp-1.png');
  }
  to {
    background-image: url('./img/light-lamp-1.png');
  }
}
@keyframes twinkle2 {
  from {
    background-image: url('./img/dark-lamp-2.png');
  }
  to {
    background-image: url('./img/light-lamp-2.png');
  }
}
@keyframes twinkle3 {
  from {
    background-image: url('./img/dark-lamp-3.png');
  }
  to {
    background-image: url('./img/light-lamp-3.png');
  }
}
@keyframes twinkle4 {
  from {
    background-image: url('./img/dark-lamp-4.png');
  }
  to {
    background-image: url('./img/light-lamp-4.png');
  }
}
</style>
