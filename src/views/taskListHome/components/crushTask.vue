<template>
  <div class="crush-task">
    <div class="task-title" @click="showCurDetails()">
      <img :src="item.bgIcon | filter" class="bg-task" :class="{'radius': !item.selected}">
      <p class="left-part">
        <span>当前进度</span>
        <img :src="item.currentParentTask.statusIcon | filter" alt="">
      </p>
      <div class="right-part">
        <span class="task-name">
          <img :src="item.titleIcon | filter" alt="">
          <em>共得{{item.reward}}奖励</em>
        </span><br>
        <p class="task-process">
          <span class="process-bar">
            <em class="in" :style="{'width': item.finishLength / item.currentLength * 100 +'%'}"></em>
          </span>
          <em>{{transUint(item.finishLength, item.currentLength)}}</em>
        </p>
        <span class="task-details " :class="{'reddot': item.isShowRed}">
          查看详情<em class="btn-arrow" :class="{'rotate': item.selected}"></em>
        </span>
      </div>
    </div>
    <div v-if="item.selected">
      <div v-if="item.hasFinishedTask != item.totalTask">
        <ul class="task-list" v-if="item.currentParentTask.parentTask.taskStatus == 1">
          <li v-for="(item1,index) in item.showSubMasterList" 
          :key="index"
          @click="checkTaskStatus(item1 ,item.batchId, item.currentParentTask)">
            <div class="description" >
              <div class="head-img">
                <img :src="item1.icon | filter " alt="">
              </div>
              <div class="content">
                <p v-html="item1.taskDescShow"></p>
                <div class="progress">
                  <div class="progress-bg">
                    <div class="progress-bar" :style="{width: item1.finishNum / item1.taskOps * 100 + '%'}"></div>
                    <span>{{transUint(item1.finishNum,item1.taskOps)}}</span>
                  </div>
                  <div class="num">
                    <img :src="item1.awardsImage | filter" alt="">
                    <span>{{item1.awardsName}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn" v-if="item1.taskStatus == 0">领取</div>
            <div class="btn play" v-if="item1.taskStatus == 1">去完成</div>
            <div class="btn gray opacitying" v-if="item1.taskStatus == 2">已领取</div>
          </li>
        </ul>
        <div class="medals-locked" v-else>
          <img src="../images/chengjiu_bg.png">
          <p class="btn" @click="receive(item.currentParentTask.parentTask, item.batchId, 'mother_crush_task', item.currentParentTask)">获取成就奖励</p>
        </div>
      </div>
      <div class="task-finished" v-else>
        <ul>
          <li v-for="(item2,index2) in item.allTask" :key="index2">
            <img :src="item2.medalIcon | filter" alt=""><br>
            <span>{{item2.medalName}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    index: Number,
    platSource: String
  },
  name: 'crushTask',
  computed: {
    gameType () {
      return this.item.showSubMasterList[0].gameType
    }
  },
  methods: {
    async showCurDetails () {
      if (this.item.selected) {
        this.$set(this.item, 'selected', false)
      } else {
        await GLOBALS.marchSetsPoint('A_H5PT0122001167', {
          entrance: this.platSource,
          target_project_id: this.gameType,
          task_id: this.item.currentParentTask.parentTask.taskId,
          task_name: this.item.currentParentTask.parentTask.taskName
        })
        this.$set(this.item, 'selected', true)
      }
    },
    checkTaskStatus (item, type, curParentTask) {
      if (item.taskStatus == 0) {
        this.receive(item, type, '', curParentTask)
      } else if (item.taskStatus == 1) {
        this.$emit('finish', item, type)
      }
    },
    receive (item, type, val, curParentTask) {
      this.$emit('receive', item, type, val, curParentTask)
    },
    transUint (finishNum, taskOps) {
      let finish = finishNum > 10000 ? (finishNum / 10000).toFixed(2) + '万' : finishNum,
        ops = taskOps > 10000 ? taskOps / 10000 + '万' : taskOps
      return finish + '/' + ops
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../common/css/base.css";
@import "../taskListHome.less";
</style>
