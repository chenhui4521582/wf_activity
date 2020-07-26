<template>
  <section class="task">
    <template v-if="info.state===1">
      <div class="bg">
        <section class="point-wrapper">
          <section class="point-title">
            <p class="left">
              任务累计积分：<span>{{info.userPoints}}</span>
            </p>
            <p class="right" @click="showPop('rule')">
              哪些游戏流水计入任务
              <img src="./img/problem-icon.png" alt="">
            </p>
          </section>
          <ul class="point-content">
            <li v-for="item in pointVo" :key="item.id">
              <div class="point-tips">
                {{item.points}}
              </div>
              <div class="red-packet">
                <img v-if="item.status===2" src="./img/open-red-packet-icon.png" alt="">
                <img v-else src="./img/red-packet-icon.png" alt="">
              </div>
              <p>{{item.awardName||'5元话费'}}</p>
              <div class="small-btn">
                <img src="./img/received-small-btn.png" v-if="item.status===2">
                <img src="./img/receive-small-btn.png" v-else>
              </div>
            </li>
          </ul>
        </section>
        <section class="task-wrapper">
          <ul>
            <li v-for="item in taskVo">
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
    </template>
    <template v-else>
      <!-- <img src="./img/end.png" alt=""> -->
    </template>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { taskFinish } from '../../services/api'
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
      return `${userTaskProgress / taskProgress}%`
    },
    async receive (item) {
      const res = await taskFinish(item.taskId)
      const code = _get(res, 'code', 0)
      if (code === 200) {
        const awardRsp = _get(res, 'data.awardRsp', {})
        this.taskVo = _get(res, 'data.taskRsp', [])
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
    toOpenGame () {
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
    height: 10.24rem;
    box-sizing: border-box;
    background: url('./img/task-bg.png') no-repeat center center;
    background-size: 100% 100%;
    padding-top: 1.3rem;
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
          width: 0.28rem;
          margin-left: 0.1rem;
        }
      }
    }
    .point-content {
      display: flex;
      text-align: center;
      align-items: center;
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
