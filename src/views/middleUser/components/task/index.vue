<template>
  <section class="task">
    <ul class="tabs-wrapper">
      <li :class="{selected:currentGroup===item.group}" v-for="(item,index) in tabsList"
        :key="index" @click="toggleGroup(item)">
        <img v-if="currentGroup===item.group" :src="item.selectedImgUrl" alt="">
        <img v-else :src="item.imgUrl" alt="">
      </li>
    </ul>
    <div class="task-wrapper">
      <h4>{{gameId|gameIdFilter}}超级任务</h4>
      <p class="countdown-time" v-html="countdownTime"></p>
      <ul class="task-list">
        <li v-for="(item,index) in taskList[currentGroup-1]">
          <p class="name">
            {{item.taskName}}
          </p>
          <div class="content-wrapper">
            <div class="awards">
              <!-- <div class="icon"><img :src="item.awardsImage|filter" alt=""></div> -->
              <div class="icon"><img :src="item.awardsImage" alt=""></div>
              <p>{{item.awardsName}}</p>
            </div>
            <div class="percent-wrap">
              <div class="percent" :style="{width:item.finishNum/item.taskOps * 100 + '%'}">
              </div>
              <div class="text-percent">{{item.finishNum}}/{{item.taskOps}}</div>
            </div>
          </div>
          <div class="btn-wrapper">
            <div class="btn undone" v-if="item.taskStatus===1" @click="goGame(item)">去完成
            </div>
            <div class="btn receive" v-else-if="item.taskStatus===0" @click="receive(item)">
              待领取
            </div>
            <div class="btn done" v-else>已领取</div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { taskFinish, pointConvert, userPoint } from '../../services/api'
import _get from 'lodash.get'
export default {
  name: 'task',
  components: {

  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    gameId: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      tabsList: [
        {
          imgUrl: require('./img/active.png'),
          selectedImgUrl: require('./img/active-selected.png'),
          group: 1
        },
        {
          imgUrl: require('./img/earn.png'),
          selectedImgUrl: require('./img/earn-selected.png'),
          group: 2
        },
        {
          imgUrl: require('./img/prop.png'),
          selectedImgUrl: require('./img/prop-selected.png'),
          group: 3
        }
      ],
      currentGroup: 1,
      pointVo: [],
      taskVo: [
        {
          "taskId": 1163,
          "taskName": "进入一次游戏大厅",
          "gameType": 0,
          "taskDesc": "进入一次游戏大厅幸运大转盘拉新-1次转盘机会",
          "icon": "https://file.beeplaying.com/group1/M00/43/4D/CmcEHV6nm52AFv0bAAGMJuRHJK8725.png",
          "taskOps": 1,
          "finishNum": 0,
          "taskStatus": 0,
          "taskLogId": null,
          "cycle": 1,
          "awardsType": 28,
          "awardsName": "200金叶子",
          "url": null,
          "awardsImage": require('./img/awrad-icon.png'),
          "showAwardsImage": "",
          "taskDescShow": "进入一次游戏大厅",
          "awardsNum": 1,
          "taskType": 1,
          "subTask": null,
          "preTask": null,
          "startDate": "04月28日",
          "endDate": "12月31日",
          "action": 94,
          "sort": 1,
          "totakTaskNum": null,
          "hasFinishedTask": null,
          "taskDescImg": "/group1/M00/43/4D/CmcEHV6nm6CAPSUMAAGMJuRHJK8936.png",
          group: 1
        },
        {
          "taskId": 1164,
          "taskName": "查看一次游戏大厅领奖页面",
          "gameType": 0,
          "taskDesc": "查看一次游戏大厅领奖页面幸运大转盘拉新-1次转盘机会",
          "icon": "https://file.beeplaying.com/group1/M00/42/66/CmcEHF6nnEaAKA81AAGMJuRHJK8186.png",
          "taskOps": 1,
          "finishNum": 0,
          "taskStatus": 2,
          "taskLogId": null,
          "cycle": 1,
          "awardsType": 28,
          "awardsName": "5元话费券",
          "url": null,
          "awardsImage": require('./img/awrad-icon.png'),
          "showAwardsImage": "",
          "taskDescShow": "查看一次游戏大厅领奖页面",
          "awardsNum": 1,
          "taskType": 1,
          "subTask": null,
          "preTask": null,
          "startDate": "04月28日",
          "endDate": "12月31日",
          "action": 94,
          "sort": 2,
          "totakTaskNum": null,
          "hasFinishedTask": null,
          "taskDescImg": "/group1/M00/42/66/CmcEHF6nnEiAVycKAAGMJuRHJK8107.png",
          group: 1
        },
        {
          "taskId": 1165,
          "taskName": "查看一次游戏大厅我的资产",
          "gameType": 0,
          "taskDesc": "查看一次游戏大厅领奖页面幸运大转盘拉新-1次转盘机会",
          "icon": "https://file.beeplaying.com/group1/M00/43/4D/CmcEHV6nn8uAL9BEAAGMJuRHJK8520.png",
          "taskOps": 1,
          "finishNum": 0,
          "taskStatus": 1,
          "taskLogId": null,
          "cycle": 1,
          "awardsType": 28,
          "awardsName": "200金叶子",
          "url": null,
          "awardsImage": require('./img/awrad-icon.png'),
          "showAwardsImage": "",
          "taskDescShow": "查看一次游戏大厅领奖页面",
          "awardsNum": 1,
          "taskType": 1,
          "subTask": null,
          "preTask": null,
          "startDate": "04月28日",
          "endDate": "12月31日",
          "action": 94,
          "sort": 3,
          "totakTaskNum": null,
          "hasFinishedTask": null,
          "taskDescImg": "/group1/M00/43/4D/CmcEHV6nn86AK9RwAAGMJuRHJK8913.png",
          group: 1
        },
        {
          "taskId": 1166,
          "taskName": "查看一次游戏大厅我的任务",
          "gameType": 0,
          "taskDesc": "查看一次游戏大厅我的任务幸运大转盘拉新-1次转盘机会",
          "icon": "https://file.beeplaying.com/group1/M00/42/66/CmcEHF6noCCAH408AAGMJuRHJK8590.png",
          "taskOps": 1,
          "finishNum": 0,
          "taskStatus": 1,
          "taskLogId": null,
          "cycle": 1,
          "awardsType": 28,
          "awardsName": "5元话费券",
          "url": null,
          "awardsImage": require('./img/awrad-icon.png'),
          "showAwardsImage": "",
          "taskDescShow": "查看一次游戏大厅我的任务",
          "awardsNum": 1,
          "taskType": 1,
          "subTask": null,
          "preTask": null,
          "startDate": "04月28日",
          "endDate": "12月31日",
          "action": 94,
          "sort": 4,
          "totakTaskNum": null,
          "hasFinishedTask": null,
          "taskDescImg": "/group1/M00/42/66/CmcEHF6noCOAVZqBAAGMJuRHJK8831.png",
          group: 2
        },
        {
          "taskId": 1167,
          "taskName": "欢乐台球支持300金叶子",
          "gameType": 2,
          "taskDesc": "欢乐台球支持300金叶子幸运大转盘拉新-1次转盘机会",
          "icon": "https://file.beeplaying.com/group1/M00/43/4D/CmcEHV6noHOAOb4jAAGMJuRHJK8026.png",
          "taskOps": 300,
          "finishNum": 0,
          "taskStatus": 1,
          "taskLogId": null,
          "cycle": 1,
          "awardsType": 28,
          "awardsName": "200金叶子",
          "url": "/billiards/",
          "awardsImage": require('./img/awrad-icon.png'),
          "showAwardsImage": "",
          "taskDescShow": "欢乐台球支持300金叶子",
          "awardsNum": 1,
          "taskType": 1,
          "subTask": null,
          "preTask": null,
          "startDate": "04月28日",
          "endDate": "12月31日",
          "action": 2,
          "sort": 6,
          "totakTaskNum": null,
          "hasFinishedTask": null,
          "taskDescImg": "/group1/M00/43/4D/CmcEHV6noHaAT7TEAAGMJuRHJK8066.png",
          group: 2
        },
        {
          "taskId": 1170,
          "taskName": "糖果萌消消支持300金叶子",
          "gameType": 12,
          "taskDesc": "糖果萌消消支持300金叶子幸运大转盘拉新-1次转盘机会",
          "icon": "https://file.beeplaying.com/group1/M00/42/66/CmcEHF6noWeAEbwpAAGMJuRHJK8396.png",
          "taskOps": 300,
          "finishNum": 0,
          "taskStatus": 1,
          "taskLogId": null,
          "cycle": 1,
          "awardsType": 28,
          "awardsName": "5元话费券",
          "url": "/crush/",
          "awardsImage": require('./img/awrad-icon.png'),
          "showAwardsImage": "",
          "taskDescShow": "糖果萌消消支持300金叶子",
          "awardsNum": 1,
          "taskType": 1,
          "subTask": null,
          "preTask": null,
          "startDate": "04月28日",
          "endDate": "12月31日",
          "action": 2,
          "sort": 7,
          "totakTaskNum": null,
          "hasFinishedTask": null,
          "taskDescImg": "/group1/M00/42/66/CmcEHF6noWqAJrYwAAGMJuRHJK8086.png",
          group: 3
        }
      ],
      awardInfo: {},
      actInfo: {},
      timer: null,
      countdownTime: null
    }
  },
  computed: {
    taskList () {
      let statusA = this.taskVo.filter(item => item.group === 1)
      let statusB = this.taskVo.filter(item => item.group === 2)
      let statusC = this.taskVo.filter(item => item.group === 3)
      return [statusA, statusB, statusC]
    }
  },
  filters: {
    conversion (value) {
      if (value >= 10000) {
        return `${Math.floor(value / 1000) / 10}万`
      } else {
        return value || 0
      }
    },
    gameIdFilter (value) {
      let gameInfo = {
        '20': '捕鱼'
      }
      return gameInfo[value] || ''
    }
  },
  mounted () {
    this.countDown(100000000)
  },
  methods: {
    percentWidth (item) {
      let userTaskProgress = item.userTaskProgress || 0
      let taskProgress = item.taskProgress || 1
      let percent = userTaskProgress / taskProgress * 100
      if (percent > 100) {
        percent = 100
      }
      return `${percent}%`
    },
    toggleGroup (item) {
      this.currentGroup = item.group
    },
    async receive (item) {
      GLOBALS.marchSetsPoint('A_H5PT0074001440', { task_id: item.taskId, task_name: item.taskName })
      const res = await taskFinish(item.taskId)
      const code = _get(res, 'code', 0)
      if (code === 200) {
        const awardRsp = _get(res, 'data.awardRsp', {})
        this.taskVo = _get(res, 'data.taskRsps', [])
        this.info.userPoints = _get(res, 'data.userPoint', this.info.userPoints)
        this.getUserPoint()
        this.awardInfo = {
          list: [{
            img: awardRsp.awardImg,
            name: awardRsp.awardName
          }],
          desc: ''
        }
        this.$emit('show-pop', 'award', this.awardInfo)
      }
    },
    async getUserPoint () {
      const res = await userPoint()
      const code = _get(res, 'code', 0)
      if (code === 200) {
        this.pointVo = _get(res, 'data', [])
      }
    },
    async pointReceive (item, index) {
      GLOBALS.marchSetsPoint('A_H5PT0074001437', { task_id: item.id, task_name: item.awardName })
      const res = await pointConvert(item.id)
      const code = _get(res, 'code', 0)
      const data = _get(res, 'data', {})
      if (code === 200) {
        this.pointVo[index].status = 2
        this.awardInfo = {
          list: [{
            img: data.awardImg,
            name: data.awardName
          }],
          desc: ''
        }
        this.$emit('show-pop', 'award', this.awardInfo)
      }
    },
    toOpenGame (item) {
      GLOBALS.marchSetsPoint('A_H5PT0074001439', { task_id: item.taskId, task_name: item.taskName })
      this.$emit('show-game')
    },
    countDown (data) {
      if (!data) return false
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
        let countHour = hour >= 10 ? hour : "0" + hour
        let countMinute = minute >= 10 ? minute : "0" + minute
        let countSecond = second >= 10 ? second : "0" + second
        this.countdownTime = `<span>${countHour}</span><span>:</span><span>${countMinute}</span><span>:</span><span>${countSecond}</span>后结束`
      }, 1000)
    },
  },
  watch: {
    info (info) {
      if (info) {
        this.actInfo = JSON.parse(JSON.stringify(info))
        this.pointVo = JSON.parse(JSON.stringify(info.pointVo))
        this.taskVo = JSON.parse(JSON.stringify(info.taskVo))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.backImg(@url) {
  background: url(@url) no-repeat center center;
  background-size: 100% 100%;
}
.task {
  margin-top: 0.5rem;
  position: relative;
  .tabs-wrapper {
    position: absolute;
    top: 1.2rem;
    left: 0;
    li {
      width: 1.06rem;
      height: 1.1rem;
      position: relative;
      margin-bottom: 0.06rem;
      img {
        position: absolute;
        width: 1.06rem;
        height: 1.1rem;
        max-width: none;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      &.selected {
        width: 1.06rem;
        height: 1.3rem;
        img {
          width: 1.4rem;
          height: 1.9rem;
        }
      }
    }
  }
  .task-wrapper {
    width: 6.6rem;
    height: 7.82rem;
    .backImg('./img/task-bg.png');
    margin: 0 auto 0.6rem;
    h4 {
      height: 0.8rem;
      line-height: 0.8rem;
      margin: auto;
      text-align: center;
      font-size: 0.3rem;
      font-weight: 800;
      color: #fff;
      text-shadow: 0px 0.02rem 0.03rem #6a97fa;
    }
    .countdown-time {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #02fcff;
      font-weight: bold;
      margin: 0.3rem 0;
      height: 0.36rem;
    }
    .task-list {
      li {
        width: 5.6rem;
        height: 1.2rem;
        background: #a852f9;
        border: 0.02rem solid #eacdff;
        border-radius: 0.6rem;
        margin: 0.2rem 0 0 0.76rem;
        position: relative;
        color: #fff;
        padding: 0.28rem 0 0 0.4rem;
        box-sizing: border-box;
        .content-wrapper {
          display: flex;
          margin-top: -0.1rem;
          align-items: center;
          .awards {
            display: flex;
            align-items: center;
            width: 1.2rem;
            white-space: nowrap;
            .icon {
              width: 0.6rem;
              height: 0.6rem;
              img {
                min-width: 0.6rem;
                height: 0.6rem;
              }
            }
          }
          .percent-wrap {
            position: relative;
            width: 1.8rem;
            height: 0.26rem;
            background: #8a18f0;
            border-radius: 0.14rem;
            overflow: hidden;
            .percent {
              background: #e3beff;
              height: 100%;
            }
            .text-percent {
              position: absolute;
              top: 0;
              width: 100%;
              height: 0.26rem;
              line-height: 0.26rem;
              font-size: 0.2rem;
              color: #540265;
              text-align: center;
            }
          }
        }
        .btn-wrapper {
          position: absolute;
          right: 0.54rem;
          top: 50%;
          margin-top: -0.25rem;
          .btn {
            width: 1.3rem;
            height: 0.5rem;
            text-align: center;
            line-height: 0.5rem;
            font-size: 0.24rem;
            color: #fff;
            border-radius: 0.25rem;
          }
          .undone {
            color: #fff;
            background: #e374ff;
          }
          .receive {
            color: #fff;
            background: #ff9314;
          }
          .done {
            color: #540264;
            background: #ba1cbd;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
.task-wrapper .countdown-time >>> span {
  display: inline-block;
  width: 0.36rem;
  height: 0.36rem;
  border-radius: 0.04rem;
  background: #3e1498;
  text-align: center;
  line-height: 0.36rem;
  margin: 0 0.04rem;
}
.task-wrapper .countdown-time >>> .end {
  color: #b874f8;
}
</style>
