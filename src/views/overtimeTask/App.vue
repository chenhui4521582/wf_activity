<template>
  <section id="app" class="overtime-task">
    <section class="top-wrapper">
      <p class="award-name">
        限时完成任务加奖{{info.awardsName}}
      </p>
      <div class="count-down-wrap">
        <p class="time">倒计时：{{countdownTime}}</p>
        <p class="other">48小时内完成大师任务加奖300元</p>
      </div>
    </section>
    <section class="content-wrapper">
      <h4 class="header">当前大师任务进度</h4>
      <section class="list-wrap" :style="{backgroundImage:'url('+bgImg+')'}">
        <div class="img-wrap">
          <img class="img" :src="currentTask.finishedMedalIcon|filter" alt="">
        </div>
        <div class="content">
          <div class="top-wrap">
            <div class="name">{{parentTaskInfo.gameName}}</div>
            <div class="reward">共得{{parentTaskInfo.reward}}奖励</div>
          </div>
          <div class="bottom-wrap">
            <div class="percent-wrapper">
              <div class="percent" :style="{width: parentTaskInfo.hasFinishedTask / parentTaskInfo.totalTask * 100 + '%' }"></div>
            </div>
            <div class="percent-text">{{parentTaskInfo.hasFinishedTask+'/'+parentTaskInfo.totalTask}}</div>
          </div>
        </div>
      </section>
      <ul class="sub-task" v-if="subTasks.length">
        <li v-for="(item,index) in subTasks" :key="index">
          <section class="list-wrap" :style="{backgroundImage:'url('+bgImg+')'}">
            <div class="img-wrap">
              <img class="img" :src="item.icon|filter" alt="">
            </div>
            <div class="content">
              <div class="top-wrap">
                <div class="name">{{item.taskName}}</div>
              </div>
              <div class="bottom-wrap">
                <div class="percent-wrapper">
                  <div class="percent" :style="{width: item.finishNum / item.taskOps * 100 + '%' }"></div>
                  <div class="percent-other">{{item.finishNum+'/'+item.taskOps}}</div>
                </div>
                <div class="percent-text">{{item.awardsName}}</div>
              </div>
            </div>
            <div class="btn-wrap">
              <a href="javascript:" class="btn receive" v-if="item.taskStatus == 0" @click="goTask()">领取</a>
              <a href="javascript:" class="btn success" v-if="item.taskStatus == 1" @click="goGame(1)">去完成</a>
              <a href="javascript:" class="btn gray" v-if="item.taskStatus == 2">已领取</a>
            </div>
          </section>
        </li>
      </ul>
    </section>
    <section class="btn-wrapper">
      <div class="btn blue" @click="goGame()">立即去完成</div>
      <div class="btn red" @click="receiveAll()">领取奖励</div>
    </section>
    <section class="rule-wrapper">
      <h4>活动规则</h4>
      <section class="rule">
        <p>1. 活动时间：开启活动后，倒计时48小时； </p>
        <p>2. 参与活动的玩家必须在规定的时间内（48小时）完成所有《王者弹珠》大师任务，方可领取300元加奖；</p>
        <p>3. 具体活动时间以活动页面倒计时为准；</p>
        <p>4. 该活动奖励仅针对《王者弹珠》一款游戏的大师任务开启；</p>
        <p>5. 该活动奖励仅可领取1次。</p>
        <p>6. 特殊情况：若未在48小时内完成任务，停留在活动页中通过跳转及返回完成任务，不予以计算奖励。</p>
      </section>
    </section>
  </section>
</template>

<script>
import utils from '../../common/js/utils'
export default {
  name: 'overtimeTask',
  components: {

  },
  data () {
    return {
      info: {},
      countdownTime: '',
      parentTaskInfo: {},
      masterList: {
        12: 'crush-achievement',
        21: 'marbles-achievement',
        18: 'warrior-achievement',
        13: 'kingdom2-achievement',
        10: 'fish-achievement',
        9: 'kingdom-achievement',
        8: 'moto-achievement',
        5: 'samguk-achievement',
        2: 'bill-achievement'
      }
    }
  },
  computed: {
    _channel () {
      return utils.getUrlParam('channel') || localStorage.getItem('APP_CHANNEL') || ''
    },
    _token () {
      return utils.getUrlParam('token') || localStorage.getItem('ACCESS_TOKEN') || ''
    },
    _gametype () {
      return utils.getUrlParam('gametype') || localStorage.getItem('wj_gameType') || 0
    },
    bgImg () {
      let url = this.parentTaskInfo.bgIcon
      if (url && !url.includes('http')) {
        return '//file.beeplaying.com' + url
      } else {
        return url
      }
    },
    currentTask () {
      let info = {}
      try {
        info = this.parentTaskInfo.list[this.parentTaskInfo.currentRank - 1]
      } catch (error) {

      }
      return info
    },
    subTasks () {
      let info = []
      try {
        if (this.currentTask.subListA.length || this.currentTask.subListB.length) {
          info = info.concat(this.currentTask.subListA, this.currentTask.subListB)
        }
      } catch (error) {

      }
      return info
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const res = await this.axios.post('//ops-api.beeplaying.com/ops/api/achievement-task/info')
      const { data, code } = res.data
      if (code === 200) {
        if (data.countdown) {
          this.info = data
          this.countDown(data.countdown)
          this.getAchievementTaskOfHall()
        }
        GLOBALS.marchSetsPoint('P_H5PT0198')        // H5平台-大师任务加奖活动-页面加载完成
      }
    },
    async getAchievementTaskOfHall () {
      const res = await this.axios.post('//platform-api.beeplaying.com/task/api/usertask/achievementTaskOfHall', { value: this.masterList[this._gametype] })
      const { data, code } = res.data
      if (code === 200) {
        this.parentTaskInfo = data && data[0]
      }
    },

    // 特惠倒计时
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
        let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        if (day > 0) {
          this.countdownTime = `${countDay}天${countHour}:${countMinute}:${countSecond}`
        } else {
          this.countdownTime = `${countHour}:${countMinute}:${countSecond}`
        }
      }, 1000)
    },

    async finish (item) {
      // H5平台-任务-成就大厅-去完成
      // await GLOBALS.marchSetsPoint('A_H5PT0122001168', {
      //   entrance: this.platSource,
      //   target_project_id: item.gameType,
      //   task_id: item.taskId,
      //   task_name: item.taskName
      // })
      let { data } = await this.axios.post('//platform-api.beeplaying.com/task/api/usertask/cacheGameType', { value: this.masterList[this._gametype] })
      location.href = `//wap.beeplaying.com${item.url}?channel=${localStorage.getItem('APP_CHANNEL')}`
    },
    goGame (type) {
      if (type) {
        GLOBALS.marchSetsPoint('A_H5PT0198002014')        // H5平台-大师任务加奖活动页面-右边去完成点击
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0198002012')        // H5平台-大师任务加奖活动页面-底部立即去完成按钮点击
      }
      let str = this.masterList[this._gametype].split('-')[0]
      WapCall.openGame('/' + str.replace(str[0], str[0].toUpperCase()))
    },
    goTask () {
      GLOBALS.marchSetsPoint('A_H5PT0198002014')        // H5平台-大师任务加奖活动页面-右边去完成点击
      let url = `${window.linkUrl.getBackUrl(this._channel, null, false, false, '#/taskview')}`
      location.href = url
    },
    receiveAll () {
      GLOBALS.marchSetsPoint('A_H5PT0198002013')        // H5平台-大师任务加奖活动页面-底部领取奖励按钮点击
      let msg = ''
      if (this.parentTaskInfo.totalTask - this.parentTaskInfo.hasFinishedTask <= 0) {
        msg = '奖励已发放 请注意查收'
      } else {
        msg = '暂未完成所有任务'
      }
      this.$toast.show({
        message: msg
      })
    }
  }
}
</script>
<style lang="less">
@import "../../common/css/base.css";
.bgWithFull(@url) {
  background: url(@url) no-repeat center center / 100% 100%;
}
/* 坚屏模式 */
@media only screen and (orientation: portrait) {
  #app {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 0.22rem;
    font-weight: 700;
    color: #fff;
    background-color: #0f1626;
  }
}

/* 横屏模式 */
@media screen and (orientation: landscape) {
  #app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 0.22rem;
    font-weight: 700;
    background-color: #0f1626;
    color: #fff;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
.overtime-task {
  overflow-y: scroll;
  .top-wrapper {
    height: 5.6rem;
    .bgWithFull("./img/top-bg.png");
    text-align: center;
    padding-top: 3.68rem;
    box-sizing: border-box;
    position: relative;
    .award-name {
      font-size: 0.22rem;
      font-weight: 500;
      color: #0f1626;
      line-height: 32px;
    }
    .count-down-wrap {
      height: 2.54rem;
      margin-top: -0.3rem;
      box-sizing: border-box;
      .bgWithFull("./img/btn-bg.png");
      padding-top: 0.96rem;
      .time {
        color: #fecc09;
        font-size: 0.28rem;
        font-weight: 500;
        line-height: 0.38rem;
      }
      .other {
        color: #646a80;
        font-size: 0.2rem;
        line-height: 0.3rem;
        font-weight: 400;
      }
    }
  }
  .content-wrapper {
    margin-top: 0.4rem;
    padding: 0.4rem;
    .header {
      font-size: 0.3rem;
      font-weight: 500;
      color: #eef3ff;
      line-height: 0.32rem;
      margin-bottom: 0.3rem;
    }
    .list-wrap {
      display: flex;
      align-items: center;
      align-content: center;
      width: 6.4rem;
      height: 1.8rem;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      border-radius: 0.12rem;
      padding: 0 0.24rem;
      box-sizing: border-box;
      margin-bottom: 0.1rem;
      .img-wrap {
        background-color: #2a3044;
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 50%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        font-size: 0;
        margin-right: 0.24rem;
        img {
          max-width: 1.1rem;
          max-height: 1.04rem;
        }
      }
      .content {
        flex: 1;
        .top-wrap {
          display: flex;
          align-items: baseline;
          .name {
            font-size: 0.28rem;
            font-weight: 500;
            color: #eef4ff;
            line-height: 0.32rem;
          }
          .reward {
            margin-left: 0.26rem;
            font-size: 0.22rem;
            font-weight: 500;
            color: rgba(238, 244, 255, 0.8);
            line-height: 0.32rem;
          }
          margin-bottom: 0.2rem;
        }
        .bottom-wrap {
          display: flex;
          align-items: center;
          .percent-wrapper {
            flex: 1;
            height: 0.2rem;
            border-radius: 0.1rem;
            background-color: #0f1626;
            font-size: 0;
            .percent {
              height: 0.2rem;
              border-radius: 0.1rem;
              width: 100%;
              background: linear-gradient(
                90deg,
                rgba(254, 176, 55, 1),
                rgba(226, 32, 81, 1)
              );
              position: relative;
              min-width: 0.78rem;
              &::after {
                content: "";
                display: block;
                position: absolute;
                width: 1.58rem;
                height: 0.96rem;
                .bgWithFull("./img/rocket.png");
                top: 50%;
                right: -0.3rem;
                margin-top: -0.48rem;
              }
            }
          }
          .percent-text {
            width: 0.6rem;
            text-align: right;
            font-size: 0.28rem;
            font-weight: normal;
            color: #eef4ff;
            line-height: 0.32rem;
            margin-left: 0.2rem;
          }
        }
      }
    }
    .sub-task {
      .list-wrap {
        height: 1.2rem;
        background-position: center top;
        background-size: 100%;
        .img-wrap {
          width: 0.8rem;
          height: 0.8rem;
          img {
            width: 100%;
            height: 100%;
            background: 0.12rem;
          }
        }
        .content {
          .top-wrap {
            margin-bottom: 0.1rem;
            .name {
              font-size: 0.26rem;
              font-weight: 400;
              color: #eef4ff;
              line-height: 0.32rem;
            }
          }

          .bottom-wrap {
            .percent-wrapper {
              flex: 1;
              position: relative;
              .percent {
                min-width: 0;
                background: linear-gradient(
                  90deg,
                  rgba(31, 190, 224, 1),
                  rgba(81, 68, 214, 1)
                );
                &::after {
                  content: none;
                }
              }
              .percent-other {
                position: absolute;
                top: 0;
                right: 0.2rem;
                font-size: 0.2rem;
                height: 0.2rem;
                font-weight: 400;
                color: #eef4ff;
                line-height: 0.2rem;
              }
            }
            .percent-text {
              width: 1.14rem;
              font-size: 0.22rem;
              color: #eb5148;
              line-height: 0.32rem;
              margin-left: 0;
            }
          }
        }
        .btn-wrap {
          margin-left: 0.2rem;
          .btn {
            display: block;
            width: 1.1rem;
            height: 0.5rem;
            line-height: 0.5rem;
            border-radius: 0.12rem;
            text-align: center;
            color: #fff;
            &.success {
              background-color: #538cff;
            }
            &.btn-receive {
              .bgWithFull("./img/get_icon.png");
            }

            &.gray {
              background: #787f97;
              color: #2a3044;
            }
          }
        }
      }
    }
  }
  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      width: 2.4rem;
      height: 0.84rem;
      line-height: 0.84rem;
      margin: 0 0.4rem;
      text-align: center;
      font-size: 0.3rem;
      font-weight: 500;
      color: #fff;
      &.blue {
        .bgWithFull("./img/blue-btn.png");
      }
      &.red {
        .bgWithFull("./img/red-btn.png");
      }
    }
  }
  .rule-wrapper {
    padding: 0.4rem;
    position: relative;
    margin-top: 0.2rem;
    h4 {
      position: absolute;
      width: 1.2rem;
      top: 0.3rem;
      left: 50%;
      margin-left: -0.6rem;
      font-size: 0.28rem;
      font-weight: 500;
      color: #fdae37;
      line-height: 0.32rem;
      text-align: center;
    }
    .rule {
      box-sizing: border-box;
      height: 4.86rem;
      padding: 0.6rem;
      .bgWithFull("./img/rule-bg.png");
      font-size: 0.26rem;
      font-weight: 400;
      color: #74798e;
      line-height: 0.4rem;
      letter-spacing: 1;
    }
  }
  .bottom-wrapper {
    margin: 0.1rem auto 0.36rem;
    text-align: center;
    font-size: 0.2rem;
    font-weight: 500;
    color: #8489a7;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
    &::before {
      content: "";
      display: block;
      width: 0.58rem;
      height: 0.02rem;
      background-color: #8489a7;
      margin-right: 0.08rem;
    }
    &::after {
      content: "";
      display: block;
      width: 0.58rem;
      height: 0.02rem;
      background-color: #8489a7;
      margin-left: 0.08rem;
    }
  }
}

.alertBox {
  .box {
    white-space: nowrap;
  }
}
</style>