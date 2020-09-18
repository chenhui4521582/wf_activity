<template>
  <section class="task">
    <ul class="tabs-wrapper">
      <li :class="{selected:currentGroup===item.group}" v-for="(item,index) in tabsList"
        :key="index" @click="toggleGroup(item)">
        <img :src="currentGroup===item.group?item.selectedImgUrl:item.imgUrl" alt="">
      </li>
    </ul>
    <div class="task-wrapper">
      <h4>{{gameInfo[currentGame]||''}}超级任务</h4>
      <p class="countdown-time" v-if="openGame===currentGame" v-html="countdownTime"></p>
      <p class="countdown-time" v-else>
        <span class="end">已</span><span class="end">结</span><span class="end">束</span>
      </p>
      <ul class="task-list">
        <li v-for="(item,index) in taskList[currentGroup-1]">
          <p class="name">
            {{item.taskName}}
          </p>
          <div class="content-wrapper">
            <div class="awards">
              <div class="icon"><img :src="item.awardImg|filter" alt=""></div>
              <p>{{item.awardName}}</p>
            </div>
            <div class="percent-wrap">
              <div class="percent"
                :style="{width:item.userTaskProgress/item.taskProgress * 100 + '%'}">
              </div>
              <div class="text-percent">
                {{item.userTaskProgress|conversion}}/{{item.taskProgress|conversion}}</div>
            </div>
          </div>
          <div class="btn-wrapper">
            <div class="btn undone" v-if="item.taskStatus===1" @click="goGame(item)">去完成
            </div>
            <div class="btn receive" v-else-if="item.taskStatus===0" @click="taskReceive(item)">
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
  name: 'task-list',
  components: {

  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    list: {
      type: Array,
      default: () => ([])
    },
    currentGame: {
      type: [Number, String],
      default: 0
    },
    openGame: {
      type: [Number, String],
      default: 0
    },
    countdownTime: {
      type: String,
      default: ''
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
      timer: null,
      gameInfo: {
        '12': '糖果',
        '10': '捕鱼',
        '13': '三国'
      }
    }
  },
  computed: {
    taskList () {
      // 活跃新星
      let groupA = this.list.filter(item => item.group === 1)
      // 游戏赚金
      let groupB = this.list.filter(item => item.group === 2)
      // 道具免费领
      let groupC = this.list.filter(item => item.group === 3)
      return [groupA, groupB, groupC]
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
    goGame (item) {
      GLOBALS.marchSetsPoint('A_H5PT0332004187', {
        task_id: item.taskId,
        task_name: item.taskName,
        section_id: this.currentGame,
        section_name: this.gameInfo[this.currentGame] || ''
      }) // H5平台-超级任务活动页-各游戏游戏板块子任务-去完成点击
      GLOBALS.jumpOutsideGame(item.url)
    },
    async taskReceive (item) {
      const res = await taskReceive({ gameType: this.currentGame, taskId: item.taskId })
      const code = _get(res, 'code', 0)
      if (code === 200) {
        this.$toast.show({
          message: '领取成功',
          duration: 3000
        })
        this.$emit('refreshTask', this.currentGame, true)
      }
      GLOBALS.marchSetsPoint('A_H5PT0332004188', {
        task_id: item.taskId,
        task_name: item.taskName,
        section_id: this.currentGame,
        section_name: this.gameInfo[this.currentGame] || ''
      }) // H5平台-超级任务活动页-各游戏游戏板块子任务-去完成点击
    }
  },
  watch: {
    currentGame (value) {
      this.currentGroup = 1
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
      margin: 0.3rem 0 0.1rem;
      height: 0.36rem;
    }
    .task-list {
      height: 5.6rem;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      li {
        width: 5.6rem;
        height: 1.2rem;
        background: #a852f9;
        border: 0.02rem solid #eacdff;
        border-radius: 0.6rem;
        margin: 0.2rem 0 0 0.76rem;
        position: relative;
        color: #fff;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        padding-left: 0.22rem;
        .name {
          width: 100%;
        }
        .content-wrapper {
          display: flex;
          align-items: center;
          .awards {
            display: flex;
            align-items: center;
            width: 2.4rem;
            white-space: nowrap;
            font-size: 0.22rem;
            .icon {
              min-width: 0.6rem;
              min-height: 0.6rem;
              position: relative;
              img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
                max-width: 0.6rem;
                max-height: 0.6rem;
              }
            }
          }
          .percent-wrap {
            position: relative;
            width: 1.4rem;
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
          right: 0.2rem;
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
