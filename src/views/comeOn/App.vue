<template>
  <main v-if="info&&info.state">
    <template v-if="!showProfit && !isEnd">
      <div class="light-up" :class="`level-${level}`">
        <header>
          <div class="time">
            活动时间：{{info.beginDate&&info.beginDate.split('年')[1]}}-{{info.endDate&&info.endDate.split('年')[1]}}
          </div>
          <div class="title">
            <img src="./img/title.png" alt="">
          </div>
        </header>
        <article class="lamp-wrapper">
          <div class="duck-wrapper default" v-if="currentIndex === 10">
            <div class="duck">
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
                :class="{dark:item.status === 0,light:item.status===2 || item.status === 1,shake:item.status === 1}">
              </div>
              <div class="duck-wrapper" v-if="currentIndex === index && currentLevel === level">
                <div class="duck">
                  <div class="number">
                    <p>进度</p>
                    <p>{{info.currentAmount|conversion}}</p>
                  </div>
                </div>
              </div>
              <div class="text">
                <p>累计消耗</p>
                <p>{{item.amount|conversion}}金叶</p>
              </div>
            </li>
          </ul>
        </article>
        <article class="bottom-wrapper">
          <section class="btn-wrapper">
            <div class="left-btn" @click="_receiveAll">奖励一键领取</div>
            <div class="right-btn" @click="openProfit">查看排行榜</div>
          </section>
          <p>排行榜第一名可得<span>800元</span>话费券</p>
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
/* eslint-disable no-undef */
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
      awardInfo: {},
      isLoading: false
    }
  },
  computed: {
    currentIndex () {
      let index = 0
      let arr = _clonedeep(this.list)
      if (arr) {
        index = arr.findIndex(item => item.status === 1)
        if (index >= 0) {
          return index
        } else {
          index = arr.length - 1 - arr.reverse().findIndex(item => item.status === 2)
        }
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
    duckPosition (index) {
      let rightArr = [2, 3, 4, 7, 8]
      return rightArr.includes(index)
    },
    percentWidth (now, next) {
      let width = ''
      if (next.status) {
        width = '100%'
      } else {
        let currentAmount = this.info.currentAmount
        if ((currentAmount - now.amount) <= 0 || (next.amount - now.amount) <= 0) {
          width = '0%'
        } else {
          width = (currentAmount - now.amount) / (next.amount - now.amount) * 100 + '%'
        }
      }
      return width
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
      if (this.isLoading) {
        return
      }
      GLOBALS.marchSetsPoint('A_H5PT0297003537', {
        level: this.level
      }) // H5平台-猩猩点灯活动-奖励一键领取按钮点击
      this.isLoading = true
      if (this.list && this.list.filter(item => (item.status === 0 || item.status === 1)).length) {
        const res = await receiveAll(this.level)
        this.isLoading = false
        const code = _get(res, 'code', 0)
        if (code === 200) {
          this.awardInfo = _get(res, 'data', {})
          this.openPop(5)
        } else if (code === 101) {
          this.$toast.show({
            message: _get(res, 'message', ''),
            duration: 3000
          })
        }
      } else {
        this.isLoading = false
        this.$toast.show({
          message: '当前层级奖励已领完',
          duration: 3000
        })
      }
    },
    async _receive (item) {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      const res = await receive({ level: this.level, sort: item.sort })
      this.isLoading = false
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
            this.$nextTick(() => { this.openPop(7) })
            break
          case 4:
          case 5:
            if (this.info.state === 1) {
              this._activityInfo()
            }
            break
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
      if (this.info.levelProgressList && !this.info.levelProgressList[this.level - 1].open && this.level !== this.currentLevel) {
        this.openPop(0)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.light-up {
  height: 17.34rem;
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
      position: absolute;
      white-space: nowrap;
      width: min-content;
      color: #f8c854;
      left: 50%;
      top: 1.34rem;
      width: 4rem;
      margin-left: -2rem;
      text-align: center;
    }
    .title {
      width: 6.32rem;
      font-size: 0;
      margin: 0 auto;
    }
  }
  .lamp-wrapper {
    height: 13.4rem;
    .duck-wrapper {
      position: absolute;
      top: -0.98rem;
      left: -0.6rem;
      .duck {
        width: 1.64rem;
        height: 1.82rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;

        background-image: url('./img/duck-icon.png');
      }
      .number {
        text-align: center;
        position: absolute;
        width: 1.1rem;
        height: 0.64rem;
        font-size: 0.2rem;
        line-height: 0.2rem;
        top: -0.44rem;
        color: #d0a56d;
        box-sizing: border-box;
        white-space: nowrap;
        left: 39%;
        margin-left: -0.55rem;
        background: url('./img/bottom-arrow.png') no-repeat center bottom;
        background-size: auto 100%;
        padding-top: 0.06rem;
      }
      &.default {
        top: 2.2rem;
        left: 1.8rem;
      }
    }
    ul {
      position: relative;
      li {
        position: absolute;
        .lamp {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: relative;
          margin: auto;
          width: 1.18rem;
          height: 0.8rem;
          &.dark {
            background-image: url('./img/dark-lamp.png');
          }
          &.light {
            background-image: url('./img/light-lamp.png');
          }
          &.shake {
            animation: shake 0.6s infinite;
          }
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
          color: #fff;
        }
      }
    }
  }
  .bottom-wrapper {
    text-align: center;
    font-size: 0.3rem;
    font-weight: 400;
    position: absolute;
    bottom: 0;
    width: 100%;
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
        margin: 0 0.16rem 0.1rem;
      }
      .left-btn {
        color: #fff;
        background-image: url('./img/purple-btn.png');
      }
      .right-btn {
        color: #8d3903;
        background-image: url('./img/blue-btn.png');
      }
    }
    p {
      font-size: 0.3rem;
      margin-bottom: 0.2rem;
    }
  }
  &.level-1 {
    background-image: url('./img/bg-1.png');
    .lamp-wrapper {
      ul {
        li {
          &.step-0 {
            top: 0.6rem;
            left: 4.4rem;
          }
          &.step-1 {
            top: 2.4rem;
            left: 2rem;
          }
          &.step-2 {
            top: 3.6rem;
            left: 4.5rem;
          }
          &.step-3 {
            top: 4.8rem;
            left: 0.8rem;
          }
          &.step-4 {
            top: 6rem;
            left: 4.6rem;
          }
          &.step-5 {
            top: 7rem;
            left: 0.8rem;
          }
          &.step-6 {
            top: 8rem;
            left: 3.6rem;
          }
          &.step-7 {
            top: 9.6rem;
            left: 5.2rem;
          }
          &.step-8 {
            top: 10rem;
            left: 0.6rem;
          }
          &.step-9 {
            top: 12rem;
            left: 3rem;
          }
        }
      }
    }
    .bottom-wrapper {
      color: #1c4c0d;
    }
  }
  &.level-2 {
    background-image: url('./img/bg-2.png');
    .lamp-wrapper {
      ul {
        li {
          &.step-0 {
            top: 0.6rem;
            left: 4.4rem;
          }
          &.step-1 {
            top: 2.2rem;
            left: 2rem;
          }
          &.step-2 {
            top: 3.3rem;
            left: 5.2rem;
          }
          &.step-3 {
            top: 4.5rem;
            left: 2.2rem;
          }
          &.step-4 {
            top: 5.8rem;
            left: 4.8rem;
          }
          &.step-5 {
            top: 7rem;
            left: 1.2rem;
          }
          &.step-6 {
            top: 8rem;
            left: 3.6rem;
          }
          &.step-7 {
            top: 9.3rem;
            left: 0.9rem;
          }
          &.step-8 {
            top: 10.2rem;
            left: 5rem;
          }
          &.step-9 {
            top: 12.2rem;
            left: 2rem;
          }
        }
      }
    }
    .bottom-wrapper {
      color: #944510;
    }
  }
  &.level-3 {
    background-image: url('./img/bg-3.png');
    .lamp-wrapper {
      ul {
        li {
          &.step-0 {
            top: 0.6rem;
            left: 4.4rem;
          }
          &.step-1 {
            top: 2.2rem;
            left: 2rem;
          }
          &.step-2 {
            top: 3.3rem;
            left: 5.2rem;
          }
          &.step-3 {
            top: 4.5rem;
            left: 2.2rem;
          }
          &.step-4 {
            top: 5.8rem;
            left: 4.8rem;
          }
          &.step-5 {
            top: 6.6rem;
            left: 0.4rem;
          }
          &.step-6 {
            top: 8rem;
            left: 3.6rem;
          }
          &.step-7 {
            top: 10rem;
            left: 4.4rem;
          }
          &.step-8 {
            top: 9.3rem;
            left: 0.9rem;
          }
          &.step-9 {
            top: 12.2rem;
            left: 2.2rem;
          }
        }
      }
    }
    .bottom-wrapper {
      color: #a0a0a0;
    }
  }
  &.level-4 {
    background-image: url('./img/bg-4.png');
    .lamp-wrapper {
      ul {
        li {
          &.step-0 {
            top: 0.6rem;
            left: 4.2rem;
          }
          &.step-1 {
            top: 2.4rem;
            left: 2rem;
          }
          &.step-2 {
            top: 3.3rem;
            left: 4.9rem;
          }
          &.step-3 {
            top: 4.2rem;
            left: 0.9rem;
          }
          &.step-4 {
            top: 5.8rem;
            left: 5.5rem;
          }
          &.step-5 {
            top: 6.6rem;
            left: 1.7rem;
          }
          &.step-6 {
            top: 8.2rem;
            left: 4rem;
          }
          &.step-7 {
            top: 9.8rem;
            left: 1rem;
          }
          &.step-8 {
            top: 10.2rem;
            left: 5.4rem;
          }
          &.step-9 {
            top: 12rem;
            left: 2.6rem;
          }
        }
      }
    }
    .bottom-wrapper {
      color: #36214f;
    }
  }
}
@keyframes shake {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
