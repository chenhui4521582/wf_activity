<template>
  <div class="crush-master-wrap">
    <overtime-master-task :game-type="parseInt(currentGameType)"></overtime-master-task>
    <div class="head">
      <img :src="crushTaskList.bgIcon | filter" alt="">
      <p class="title">
        <span>
          <i>成就任务</i>
          <img class="name-title" :src="crushTaskList.gameNameIcon | filter" alt="">
        </span>
        <span class="reware-bg">
          共得<i>{{crushTaskList.reward}}</i>奖励
        </span>
      </p>
      <div class="process">
        <div class="probar-ball">
          <div class="bar" :style="{width:crushTaskList.finishLength/crushTaskList.currentLength * 100 + '%'}"></div>
        </div>
        <p class="tips">
          <span>{{transUint(crushTaskList.finishLength,crushTaskList.currentLength)}}</span>
          <span>完成当前进度<i>加赠{{crushTaskList.currentParentTask.parentTask.awardsName}}</i></span>
        </p>
      </div>
    </div>
    <div class="crush-task-list">
      <ul class="master-task-list" v-if="crushTaskList.currentParentTask.parentTask.taskStatus == 1">
        <li v-for="(item,index) in crushTaskList.showSubMasterList" v-if="item && index < 2" @click="checkTaskStatus(item,'crush_task')">
          <div class="description" :class="{opacitying:item.taskStatus == 2}">
            <div class="head-img">
              <img :src="item.icon | filter" alt="">
            </div>
            <div class="content">
              <p v-html="item.taskDescShow"></p>
              <div class="progress">
                <div class="progress-bg">
                  <div class="progress-bar" :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></div>
                  <span>{{transUint(item.finishNum,item.taskOps)}}</span>
                </div>
                <div class="num">
                  <img :src="item.awardsImage | filter" alt="">
                  <span>{{item.awardsName}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="btn" v-if="item.taskStatus == 0">领取</div>

          <div class="btn play" v-if="item.taskStatus == 1">去完成</div>
          <div class="btn gray opacitying" v-if="item.taskStatus == 2">已领取</div>
        </li>
      </ul>
      <div class="medals-locked" v-if="crushTaskList.currentParentTask.parentTask.taskStatus == 0">
        <img src="../img/crushMasterTask/chengjiu_bg.png">
        <p class="btn" @click="receive(crushTaskList.currentParentTask.parentTask,'mother_crush_task')">获取成就奖励</p>
      </div>
      <div class="medals-lock" v-if="crushTaskList.currentParentTask.parentTask.taskStatus == 2">
        <img src="../img/crushMasterTask/chengjiu_locked_title.png">
        <img :src="crushTaskList.currentParentTask.medalIcon | filter" class="medeal">
        <!-- <p>获取日期<br>2018-12-13</p> -->
      </div>
      <div class="medals-lock unlock" v-if="currentMedalList && currentMedalList.index > 0 && crushTaskList.currentParentTask.parentTask.taskStatus == 4 ">
        <img src="../img/crushMasterTask/chengjiu_unlocked_title.png">
        <img :src="crushTaskList.currentParentTask.medalIcon | filter" class="medeal">
        <p>解锁前提条件<br>获得“{{crushTaskList.medalList[currentMedalList.index-1].medalName}}”称号</p>
      </div>
    </div>
    <div class="medal-wrap">
      <ul>
        <li v-for="(item,i) in crushTaskList.medalList" :class="{hightlight:item.selected}" @click="checkMedals(item)">
          <img :src="item.statusIcon | filter" :class="{'animate':item.selected && showMedalAnimate}">
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import masterData from '../data.js'
import overtimeMasterTask from './overtimeMasterTask'

export default {
  props: {
    crushTaskList: {
      default: null
    },
    showReceiveMedal: {
      default: false
    },
    showMedalAnimate: {
      default: false
    },
    currentMedalIndex: {
      default: 0
    },
    currentGameType: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      medalList: null, //勋章列表
      isShowMasterLocked: false, //是否显示已解锁勋章
      isShowFinished: false, //是否显示领取奖励
      isShowMasterUnlocked: false, //是否显示未解锁勋章
      // currentMedalList : null, //当前点击勋章
      isShowList: true,//是否显示任务列表
      flag: 1,
      changeAnimation: false,
      isMotherType: true,
      nameList: [
        {
          name: '新贵',
          img: require('../img/crushMasterTask/name_new.png')
        },
        {
          name: '达人',
          img: require('../img/crushMasterTask/name_daren.png')
        },
        {
          name: '高手',
          img: require('../img/crushMasterTask/name_higher.png')
        },
        {
          name: '大师',
          img: require('../img/crushMasterTask/name_master.png')
        },
      ],
    }
  },
  components: { overtimeMasterTask },
  mounted () {
    //taskStatus 0 已完成未领取 1 去完成 2 已领取
    // setTimeout(() => {
    //     console.log(this.crushTaskList.currentIndex+'------');
    //     this.currentMedalList = this.crushTaskList.medalList[this.crushTaskList.currentIndex]
    // }, 0);
    GLOBALS.marchSetsPoint('S_00000000000009', { project_id: this.currentGameType, target_project_id: this.currentGameType }) // H5平台-游戏内SDK-页面
  },
  computed: {
    currentMedalList () {
      return this.crushTaskList.medalList[this.crushTaskList.currentIndex]
    }
  },
  methods: {
    transUint (finishNum, taskOps) {
      let finish = finishNum > 10000 ? (finishNum / 10000).toFixed(2) + '万' : finishNum,
        ops = taskOps > 10000 ? taskOps / 10000 + '万' : taskOps
      return finish + '/' + ops
    },
    // 点击切换显示勋章内容（已获得 未解锁 进行中）
    checkMedals (value) {
      let index = value.index
      let parentTask = this.crushTaskList.allTask[index].parentTask
      GLOBALS.marchSetsPoint('A_H5PT0061000539', {
        project_id: parentTask.taskType,
        target_project_id: parentTask.taskType,
        task_id: parentTask.taskId,
        task_name: parentTask.taskName
      }) // H5平台-游戏内SDK-成就任务-勋章点击
      this.checkFinishedList(index, 'checkMode')
      this.$emit('hideMedalAnimate')
    },
    checkFinishedList (i, type) {
      this.$emit('refreshTask', i, type)
    },
    getCurentIcon () {
      let curMedelIcon
      if (this.crushTaskList.currentParentTask.medalIcon.includes('medal-1')) {
        return this.crushTaskList.currentParentTask.medalIcon.replace('medal-1', 'medal-2')
      }
    },
    // 完成任务
    checkTaskStatus (item, type) {
      this.$emit('checkTaskStatus', item, type, this.currentMedalList.index)
    },
    // 领取奖励
    receive (item, type) {
      this.isMotherType = true
      if (item.taskName.indexOf('糖果') > -1) {
        this.$emit('receive', item, 'mother_crush_task', this.currentMedalList.index, `//file.beeplaying.com${this.getCurentIcon()}`, 'allFinish')
        return false
      }
      this.$emit('receive', item, 'mother_crush_task', this.currentMedalList.index, `//file.beeplaying.com${this.getCurentIcon()}`)
    }
  },
  watch: {
    medalList (newIndex, oldIndex) { },
    showReceiveMedal (newIndex, oldIndex) {
      if (newIndex) {
        if (this.currentMedalIndex != 3) {
          this.checkFinishedList(this.currentMedalIndex + 1)
        }
      }
    },
    showMedalAnimate (newIndex, oldIndex) {
      if (newIndex) {
      }
    },
  }
}
</script>
<style lang="less" scoped>
div {
  box-sizing: border-box;
}
.master-task-list {
  background: #203252;
  padding: 4% 3%;
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

          .num {
            img {
              width: 0.32rem;
              height: 0.23rem;
              display: inline;
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
      margin: 0 auto;
      display: block;
      width: 0.8rem;
      height: 0.4rem;
      line-height: 0.4rem;
      border-radius: 0.08rem;
      text-align: center;
      font-size: 0.2rem;
      color: #2a3044;
      font-weight: bold;
      background: url("../img/get_icon.png") no-repeat center / 100% 100%;
      &.play {
        color: #fff;
        background: #538cff;
      }
      &.gray {
        background: #787f97;
        color: #2a3044;
      }
      &.opacitying {
        opacity: 0.5;
      }
    }
  }
}
.crush-master-wrap {
  // padding-top: .3rem;
  width: 100%;
  height: auto;
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
  .head {
    position: relative;
    padding: 0.32rem 0.2rem;
    width: 100%;
    height: 1.45rem;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1.45rem;
    }
    // background: url(../img/crushMasterTask/master_head.png) no-repeat;
    // background-size: 100% 100%;
    .title {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 0.45rem;
      margin-bottom: 0.17rem;
      span:first-child {
        position: relative;
        display: inline-block;
        width: 2.36rem;
        height: 0.45rem;
        i {
          position: absolute;
          right: 0.2rem;
          top: -0.02rem;
          color: #ffebcb;
          font-size: 0.16rem;
        }
        .name-title {
          float: left;
          width: 1.4rem;
          height: 0.45rem;
        }
        .xunzhang-title {
          position: absolute;
          right: 0;
          bottom: 0.01rem;
          width: 0.85rem;
          height: 0.25rem;
        }
      }

      span:last-child {
        position: absolute;
        left: 1.5rem;
        bottom: 0;
        text-align: center;
        margin-top: -0.05rem;
        color: #32344b;
        font-size: 0.16rem;
        width: 1.45rem;
        height: 0.24rem;
        line-height: 0.2rem;
        background: url(../../taskListHome/images/bg_awards.png);
        background-size: 100% 100%;
        i {
          font-size: 0.22rem;
          font-weight: bold;
          line-height: 0.22rem;
        }
      }
    }
    .process {
      position: relative;
      z-index: 2;
    }
    .probar-ball {
      position: relative;
      width: 100%;
      height: 0.14rem;
      line-height: 0.14rem;
      background: #0f1726;
      border-radius: 0.08rem;
      font-size: 0.18rem;
      overflow: hidden;
      .bar {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: #fedfac;
        border-radius: 0.08rem 0 0 0.08rem;
        z-index: 1;
      }
      p {
        position: absolute;
        width: 100%;
        text-align: center;
        z-index: 2;
        color: #4f5379;
      }
    }
    .tips {
      margin-top: 0.06rem;
      span:first-child {
        margin-right: 0.06rem;
        float: left;
        font-size: 0.22rem;
      }
      span:last-child {
        float: right;
        font-size: 0.2rem;
        color: #666879;
        i {
          color: #e3e5f8;
        }
      }
    }
  }
  .crush-task-list {
    background: #232432;
    .medals-locked {
      padding-bottom: 0.2rem;
      width: 100%;
      text-align: center;
      img {
        width: 3.29rem;
        height: 1.19rem;
        margin: 0.3rem auto 0.14rem;
      }
      p {
        margin: 0 auto;
        width: 1.32rem;
        height: 0.37rem;
        line-height: 0.37rem;
        font-size: 0.17rem;
        background: #ee6f0b;
        border-radius: 0.08rem;
      }
    }
    .medals-lock {
      position: relative;
      width: 100%;

      text-align: center;
      img {
        &:first-child {
          position: absolute;
          left: 0.22rem;
          top: 0.3rem;
          width: 1.38rem;
          height: 0.34rem;
        }
        &.medeal {
          margin: 0.3rem auto;
          width: 1.16rem;
          height: 1.6rem;
        }
      }
      p {
        position: absolute;
        right: 0.23rem;
        bottom: 0.3rem;
        font-size: 0.17rem;
        line-height: 0.25rem;
        color: #ffd338;
        text-align: right;
      }
      &.unlock {
        p {
          color: #4a4e73;
        }
        > img.medeal {
          width: 1.17rem;
          height: 1.6rem;
        }
      }
    }
  }
  .master-task-list {
    background: #232432;
    height: 1.8rem;
    > li:not(:last-child) {
      border-bottom: 1px solid #383a58;
    }
  }
  .medal-wrap {
    padding: 0 3%;
    width: 100%;
    height: 1.15rem;
    background: url(../img/crushMasterTask/master_bottom.png) no-repeat;
    background-size: 100% 100%;
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        flex: 1;
        position: relative;
        width: 0.99rem;
        height: 1.15rem;
        text-align: center;
        padding: 0.2rem 0;
        box-sizing: border-box;
        &:not(:last-child) {
          margin-right: 0.34rem;
          &:after {
            content: "";
            position: absolute;
            right: -0.3rem;
            top: 0.6rem;
            width: 0.18rem;
            height: 0.18rem;
            background: url(../img/crushMasterTask/icon_arrow.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        &.hightlight {
          background: url(../img/crushMasterTask/highlight.png) no-repeat;
          background-size: 100% 100%;
        }
        img {
          width: 0.83rem;
          height: 0.85rem;
          margin: 0 auto;
        }
      }
    }
  }
  .animate {
    animation: scal 1s linear;
  }
  @keyframes scal {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
