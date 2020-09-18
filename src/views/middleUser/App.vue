<template>
  <main class="middle-user">
    <div class="bg">
      <img src="./img/bg.png" alt="">
    </div>
    <div class="back" @click="back()"></div>
    <rule-pop :info="info" />
    <article class="main-content">
      <game-list ref="gameList" :list="gameList" :current-game="currentGame"
        @toggleGame="findTaskRspByGameType" />
      <red-packet ref="redPacket" :info="info" :list="progressList" @gameReceive="gameReceive" />
      <task-list ref="task" :info="info" :list="taskList" :countdown-time="countdownTime"
        :current-game="currentGame" :open-game="openGame" @refreshTask="findTaskRspByGameType" />
    </article>
  </main>
</template>

<script>
/* eslint-disable no-undef */
import RulePop from './components/rule/index'
import TaskList from './components/task/index'
import RedPacket from './components/redPacket/index'
import GameList from './components/gameList/index'
import { activityHome, findTaskRspByGameType, gameReceive } from './services/api'
import _get from 'lodash.get'
export default {
  name: 'middleUser',
  components: {
    RulePop,
    TaskList,
    RedPacket,
    GameList
  },
  data () {
    return {
      info: {},
      gameList: [],
      taskList: [],
      progressList: [],
      currentGame: 0,
      openGame: 0,
      countdownTime: '',
      apiLocked: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      if (this.apiLocked) {
        return
      }
      this.apiLocked = true
      const res = await activityHome()
      this.apiLocked = false
      const code = _get(res, 'code', 0)
      if (code === 200) {
        this.info = _get(res, 'data', {})
        this.gameList = _get(res, 'data.gameRsps', []).sort((itemA, itemB) => { return itemA.sort - itemB.sort })
        this.taskList = _get(res, 'data.taskRsps', [])
        this.progressList = _get(res, 'data.progressList', [])
        let gameType = this.gameList[0].gameId
        this.gameList.forEach(item => {
          if (item.state === 1) {
            gameType = item.gameId
          }
        })
        this.currentGame = gameType
        this.openGame = gameType
        this.countDown(_get(res, 'data.countdown', 0))
      }
      GLOBALS.marchSetsPoint('P_H5PT0332', {
        source_address: GLOBALS.getUrlParam('from') || ''
      }) // H5平台-超级任务活动-页面加载完成
    },
    back () {
      GLOBALS.marchSetsPoint('A_H5PT0332004183') // H5平台-超级任务活动页-返回按钮点击
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
    },
    async findTaskRspByGameType (type, isRefresh = false) {
      if (this.apiLocked) {
        return
      }
      this.apiLocked = true
      if (this.currentGame !== type) {
        this.currentGame = type
      } else if (!isRefresh) {
        return
      }
      const res = await findTaskRspByGameType(type)
      this.apiLocked = false
      const code = _get(res, 'code', 0)
      if (code === 200) {
        this.taskList = _get(res, 'data', [])
        let taskClearIndex = this.taskList.findIndex(item => item.taskStatus === 0)
        if (taskClearIndex < 0) {
          this.gameList.forEach(item => {
            if (item.gameId === this.currentGame) {
              item.hasRedPoint = 0
            }
          })
        }
      }
    },
    async gameReceive () {
      if (this.apiLocked) {
        return
      }
      this.apiLocked = true
      const res = await gameReceive()
      this.apiLocked = false
      const code = _get(res, 'code', 0)
      if (code === 200) {
        this.progressList = _get(res, 'data', [])
        this.$toast.show({
          message: '领取成功',
          duration: 3000
        })
      }
    },
    countDown (data) {
      if (!data) {
        this.countdownTime = '<span class="end">已</span><span class="end">结</span><span class="end">束</span>'
        return false
      }
      let date = data / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
          this.countdownTime = '<span class="end">已</span><span class="end">结</span><span class="end">束</span>'
        }
        let hour = Math.floor(parseInt(date / 60 / 60))
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        this.countdownTime = `<span>${countHour}</span><span>:</span><span>${countMinute}</span><span>:</span><span>${countSecond}</span>后结束`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.backImg(@url) {
  background: url(@url) no-repeat center center;
  background-size: 100% 100%;
}
.middle-user {
  position: relative;
  font-size: 0.24rem;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100vh;
  width: 100vw;
  background: #4a13b9;
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
    left: -0.2rem;
    top: -0.2rem;
    width: 1.4rem;
    height: 1.4rem;
    .backImg('./img/back-icon.png');
  }
  .main-content {
    position: absolute;
    width: 100vw;
    top: 5rem;
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
}
</style>
