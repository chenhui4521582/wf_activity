<template>
  <section class="task">
    <ul class="btns-wrapper">
      <li></li>
    </ul>
    <div class="tak-wrapper">
      <h4>{{gameId|gameIdFilter}}超级任务</h4>
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
      pointVo: [],
      taskVo: [],
      awardInfo: {},
      actInfo: {}
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
}
</style>
