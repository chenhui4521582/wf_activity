<template>
  <section v-if="info">
    <div class="title">
      <span>{{countTime}}后结束</span>
    </div>
    <ul class="master-task-list">
      <li @click="checkTaskStatus()">
        <div class="description" :class="{opacitying:info.taskStatus == 2}">
          <div class="head-img">
            <img :src="info.icon | filter" alt="">
          </div>
          <div class="content">
            <p v-html="info.taskName"></p>
            <div class="progress">
              <div class="progress-bg">
                <div class="progress-bar" :style="{width:info.finishNum/info.taskGoal * 100 + '%'}"></div>
                <span>{{transUint(info.finishNum,info.taskGoal)}}</span>
              </div>
              <div class="num">
                <img :src="info.awardsImage | filter" alt="">
                <span>{{info.awardsName}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="btn" v-if="info.taskStatus == 0" @click="receive">领取</div>
        <div class="btn play" v-if="info.taskStatus == 1" @click="goFinish">去完成</div>
      </li>
    </ul>
    <pop-log v-if="isPop" :awardItem="info" @close="closePopLog"></pop-log>
  </section>
</template>

<script>
import { getWarningTask, receive } from './api'
export default {
  name: '',
  components: {
    popLog: () => import('../../poplog'),
  },
  data () {
    return {
      info: null,
      countTime: '',
      isPop: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const { data, code } = await getWarningTask()
      if (code === 200) {
        this.info = data
        this.countDown(this.info.countdown)
      }
    },
    transUint (finishNum, taskOps) {
      let finish = finishNum > 10000 ? (finishNum / 10000).toFixed(2) + '万' : finishNum,
        ops = taskOps > 10000 ? taskOps / 10000 + '万' : taskOps
      return finish + '/' + ops
    },
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
        let day = Math.floor(date / 86400)
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        // let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        if (day > 0) {
          this.countTime = `${day}天${countHour}小时`
        } else if (hour > 0) {
          this.countTime = `${countHour}小时${countMinute}分钟`
        } else {
          this.countTime = `${countMinute}分钟${countSecond}秒`
        }
      }, 1000)
    },
    goFinish () {
      if (parent.closeTaksPage) {
        parent.closeTaksPage()
      }

    },
    async receive () {
      const { data, code } = await receive({ order: this.info.taskId })
      if (code === 200) {
        this.isPop = true
      }
    },
    closePopLog () {
      this.isPop = false
      this.init()
    }
  }
}
</script>
<style  lang="less" scoped>
.title {
  position: relative;
  width: 100%;
  height: 0.9rem;
  background: url(./img/title-bg.png) no-repeat center center / 100% 100%;
  font-size: 0.18rem;
  color: #363951;
  text-align: right;
  padding: 0.06rem 0.08rem;
}
div {
  box-sizing: border-box;
}
.master-task-list {
  background: #0f1726;
  padding: 4% 3%;
  margin-bottom: 0.1rem;
  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0;
    background: transparent;
    border-radius: 0;
    border-bottom: 1px solid #294575;
    padding-bottom: 4%;
    margin: 0;
    &:last-child {
      border: none;
      padding-top: 4%;
      padding-bottom: 0;
    }
    .description {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 80%;
      .head-img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 6px;
        overflow: hidden;
        margin-right: 3%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        > p {
          font-size: 0.23rem;
          font-weight: bold;
          margin-bottom: 5%;
        }
        .progress {
          display: flex;
          align-items: center;

          .progress-bg {
            background: #0f1726;
            width: 1.6rem;
            margin-right: 5px;
            position: relative;
            height: 0.25rem;
            border-radius: 3px;
            overflow: hidden;
            .progress-bar {
              background: #507bcc;
              position: absolute;
              height: 100%;
              left: 0;
              width: 30%;
            }
            span {
              position: absolute;
              width: 100%;
              height: 100%;
              color: #fff;
              font-size: 0.2rem;
              left: 0;
              line-height: 0.25rem;
              text-align: center;
            }
          }
          .num {
            img {
              width: 0.32rem;
              height: 0.23rem;
              display: inline-block;
            }
            span {
              font-size: 0.2rem;
              color: #ffd338;
            }
          }
        }
      }
    }
    .btn {
      color: #fff;
      font-weight: bold;
      font-size: 0.2rem;
      background: #ee6f0b;
      padding: 2% 4%;
      border-radius: 4px;
      text-align: center;
      box-sizing: border-box;
      width: 20%;
      word-break: keep-all;
      white-space: nowrap;
      &.play {
        background: #1976d2;
      }
      &.gray {
        background: #fff;
        color: #141f33;
      }
      &.opacitying {
        opacity: 0.5;
      }
    }
  }
}
</style>