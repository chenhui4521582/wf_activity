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
import { taskReceive } from '../../services/api'
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
      taskVo: [],
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
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        this.countdownTime = `<span>${countHour}</span><span>:</span><span>${countMinute}</span><span>:</span><span>${countSecond}</span>后结束`
      }, 1000)
    }
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
