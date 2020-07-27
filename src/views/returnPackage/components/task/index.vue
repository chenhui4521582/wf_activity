<template>
  <section class="task">
    <div class="bg" :class="`state-${info.state}`">
      <section class="point-wrapper">
        <section class="point-title">
          <p class="left">
            任务累计积分：<span>{{info.userPoints}}</span>
          </p>
          <p class="right" @click="showPop('rule')">
            <span>哪些游戏流水计入任务</span>
            <img src="./img/problem-icon.png" alt="">
          </p>
        </section>
        <div class="point-line" v-if="info.state===1">
          <div class="point-line-content" :style="{width:pointWidth}"></div>
        </div>
        <ul class="point-content">
          <li v-for="(item,index) in pointVo" :key="item.id">
            <div class="point-tips">
              {{item.points}}积分
            </div>
            <div class="red-packet">
              <img v-if="item.status===2" src="./img/open-red-packet-icon.png" alt="">
              <img v-else src="./img/red-packet-icon.png" alt="">
            </div>
            <p>{{item.awardName}}</p>
            <div class="small-btn">
              <img src="./img/received-small-btn.png" v-if="item.status===2">
              <img src="./img/receive-small-btn.png" v-else-if="item.status===1"
                @click="pointReceive(item,index)">
            </div>
          </li>
        </ul>
      </section>
      <section class="task-wrapper" v-if="info.state===1">
        <ul>
          <li v-for="item in taskList">
            <p class="title">{{item.taskName}}</p>
            <div class="percent">
              <div class="percent-bg">
                <div class="percent-content" :style="{width:percentWidth(item)}"></div>
                <div class="percent-text">
                  {{item.userTaskProgress|conversion}}/{{item.taskProgress|conversion}}</div>
              </div>
              <div class="award-wrapper">
                <img src="./img/task-award-icon.png" alt="">
                <span>{{item.awardName}}</span>
              </div>
            </div>
            <div class="btn">
              <img src="./img/receive-btn.png" alt="" v-if="item.taskStatus===0"
                @click="receive(item)">
              <img src="./img/finish-btn.png" alt="" v-if="item.taskStatus===1"
                @click="toOpenGame(item)">
              <img src="./img/received-btn.png" alt="" v-if="item.taskStatus===2">
            </div>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { taskFinish, pointConvert } from '../../services/api'
import _get from 'lodash.get'
export default {
  name: 'task',
  components: {

  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      pointVo: [],
      taskVo: [],
      awardInfo: {},
      actInfo: {}
    }
  },
  computed: {
    pointWidth () {
      if (!this.info.userPoints) {
        return '0%'
      } else if (this.pointVo[0] && this.info.userPoints < this.pointVo[0].points) {
        return 10 * (this.info.userPoints * 1.0 / this.pointVo[0].points) + '%'
      } else if (this.info.userPoints === this.pointVo[0].points) {
        return '13%'
      } else if (this.pointVo[1] && this.info.userPoints < this.pointVo[1].points) {
        return (13 + 20 * (this.info.userPoints - this.pointVo[0].points) / (this.pointVo[1].points - this.pointVo[0].points)) + '%'
      } else if (this.info.userPoints === this.pointVo[1].points) {
        return '34%'
      } else if (this.pointVo[2] && this.info.userPoints < this.pointVo[2].points) {
        return (34.5 + 27 * (this.info.userPoints - this.pointVo[1].points) / (this.pointVo[2].points - this.pointVo[1].points)) + '%'
      } else if (this.info.userPoints === this.pointVo[2].points) {
        return '63%'
      } else if (this.pointVo[3] && this.info.userPoints < this.pointVo[3].points) {
        return (64 + 26 * (this.info.userPoints - this.pointVo[2].points) / (this.pointVo[3].points - this.pointVo[2].points)) + '%'
      } else {
        return '100%'
      }
    },
    taskList () {
      let statusA = this.taskVo.filter(item => item.taskStatus === 0).sort((itemA, itemB) => itemA - itemB)
      let statusB = this.taskVo.filter(item => item.taskStatus === 1).sort((itemA, itemB) => itemA - itemB)
      let statusC = this.taskVo.filter(item => item.taskStatus === 2).sort((itemA, itemB) => itemA - itemB)
      return [...statusA, ...statusB, ...statusC]
    }
  },
  filters: {
    conversion (value) {
      if (value >= 10000) {
        return `${Math.floor(value / 1000) / 10}万`
      } else {
        return value || 0
      }
    }
  },
  mounted () {
  },
  methods: {
    showPop (type) {
      this.$emit('show-pop', type)
    },
    percentWidth (item) {
      let userTaskProgress = item.userTaskProgress || 0
      let taskProgress = item.taskProgress || 1
      let percent = userTaskProgress / taskProgress * 100
      if (percent > 100) {
        percent = 100
      }
      return `${percent}%`
    },
    async receive (item) {
      GLOBALS.marchSetsPoint('A_H5PT0074001440', { task_id: item.taskId, task_name: item.taskName })
      const res = await taskFinish(item.taskId)
      const code = _get(res, 'code', 0)
      if (code === 200) {
        const awardRsp = _get(res, 'data.awardRsp', {})
        this.taskVo = _get(res, 'data.taskRsps', [])
        this.info.userPoints = _get(res, 'data.userPoint', this.info.userPoints)
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
.task {
  width: 6.68rem;
  margin: 0.2rem auto 0;
  .bg {
    width: 6.68rem;
    height: 4.18rem;
    box-sizing: border-box;
    background: url('./img/task-bg-2.png') no-repeat center center;
    background-size: 100% 100%;
    padding-top: 1.3rem;
    position: relative;
    &.state-1 {
      background-image: url('./img/task-bg.png');
      height: 10.24rem;
    }
    .point-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.28rem 0 0.46rem;
      .left {
        font-size: 0.24rem;
        color: #c9d5ff;
        span {
          color: #feed99;
        }
      }
      .right {
        font-size: 0.2rem;
        color: #0cf1ff;
        display: flex;
        align-items: center;
        justify-content: right;
        img {
          height: 0.28rem;
          margin-left: 0.1rem;
        }
      }
    }
    .point-line {
      position: absolute;
      z-index: 1;
      top: 2.6rem;
      left: 50%;
      margin-left: -3.06rem;
      width: 6.12rem;
      height: 0.1rem;
      background: #1f2961;
      border-radius: 0.05rem;
      overflow: hidden;
      .point-line-content {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        height: 100%;
        background: #feee9a;
      }
    }
    .point-content {
      position: relative;
      display: flex;
      text-align: center;
      align-items: center;
      z-index: 2;
      margin-top: 0.2rem;
      height: 1.62rem;
      li {
        position: absolute;
        top: 0;
        &:nth-child(1) {
          left: 8%;
        }
        &:nth-child(2) {
          left: 29%;
        }
        &:nth-child(3) {
          left: 54%;
        }
        &:nth-child(4) {
          left: 80%;
        }
      }
      .point-tips {
        width: 1rem;
        height: 0.4rem;
        color: #feee9a;
        font-size: 0.18rem;
        background: url('./img/tips-bg.png') no-repeat center center;
        background-size: 100% 100%;
        line-height: 0.3rem;
      }
      .red-packet {
        width: 0.5rem;
        height: 0.6rem;
        margin: 0.1rem auto;
      }
      p {
        font-size: 0.2rem;
        font-weight: bold;
        color: #c9d5ff;
      }
      .small-btn {
        width: 1.1rem;
        height: 0.54rem;
      }
    }
    .task-wrapper {
      ul {
        height: 6.6rem;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        li {
          position: relative;
          width: 6.2rem;
          height: 1.34rem;
          box-sizing: border-box;
          background: url('./img/task-item-bg.png') no-repeat center center;
          background-size: 100% 100%;
          margin: 0.1rem auto;
          display: flex;
          padding: 0.26rem 0.36rem;
          flex-wrap: wrap;
          align-content: space-between;
          .title {
            width: 100%;
            font-size: 0.26rem;
            color: #c9d5ff;
          }
          .percent {
            width: 100%;
            display: flex;
            align-items: center;
            .percent-bg {
              position: relative;
              width: 2.6rem;
              height: 0.3rem;
              border-radius: 0.06rem;
              background: #849be9;
              overflow: hidden;
            }
            .percent-content {
              position: absolute;
              height: 100%;
              background: #f8bf52;
            }
            .percent-text {
              position: absolute;
              width: 100%;
              text-align: center;
              line-height: 0.3rem;
              color: #10174f;
              font-size: 0.22rem;
              font-weight: bold;
            }
            .award-wrapper {
              display: flex;
              align-items: center;
              font-size: 0.24rem;
              color: #f8bf52;
              font-weight: bold;
              img {
                width: 0.3rem;
                height: 0.3rem;
                margin-left: 0.14rem;
                margin-right: 0.08rem;
              }
            }
          }
          .btn {
            position: absolute;
            width: 1.32rem;
            height: 0.6rem;
            top: 50%;
            margin-top: -0.3rem;
            right: 0.3rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
