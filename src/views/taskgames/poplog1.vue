<template>
  <div class="pop-log">
    <template v-if="!masterTask&&!newUserTaskFinish&&(newTaskItems&&newTaskItems.popUp)">
      <div class="mask"></div>
      <div class="shine-box">
        <img class="shine"
          src="./img/dialog/shine.png"
          alt="">
      </div>
      <img class="bg"
        src="./img/dialog/bg.png"
        alt="">
      <div class="content">
        <img class="title"
          src="./img/dialog/new-user-task-text.png"
          alt="">
        <img class="hb-icon"
          src="./img/dialog/hb-icon.png"
          alt="">
        <p class="num">30元话费</p>
        <div class="text">完成新人任务即可获得话费</div>
        <div class="close"
          @click="close">朕知道了</div>
      </div>
    </template>
    <template v-else>
      <task-award-pop v-if="awardItemNew.awardsName"
        :awards="awardItemNew"
        :awardsImage="awardsImage"
        :btnName="btnName"
        @close="close"></task-award-pop>
    </template>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    awardItem: {
      default: null
    },
    motherTask: {
      default: null
    },
    newTaskItems: {
      default: null
    },
    crushTaskList: {
      default: null
    },
    isNewTask: {
      default: false
    },
    masterTask: {
      default: false
    },
    newUserTaskFinish: Boolean,
    awardItemNew: null
  },
  methods: {
    closed () {
      this.$emit('close')
    },
    close () {
      if (this.masterTask) {
        let index = this.awardItem && this.awardItem.index,
          curTaskList = this.crushTaskList.allTask[index]
        if (this.awardItem && this.awardItem.showMedalImg) {
          this.$emit('close', 'change')
        } else if (this.awardItem && this.awardItem.awardsFlag == 'mother_crush_task') {
          this.$emit('close', 'showReceiveMedal')
        } else if (curTaskList && curTaskList.parentTask.taskStatus == 0) {
          this.$emit('close', 'showMedalAnimate')
        }
      }
      if (this.newUserTaskFinish) {
        this.$emit('close', 'reset')
      }
      this.$emit('close')
    }
  },
  mounted () {
    this.awardItemNew = this.awardItem
    this.awardItemNew.awardsNum = 1
    if (this.masterTask) {
      if (this.awardItem.showMedalImg) {
        this.awardItemNew.awardsImage = this.awardItem.medalimg
      }
    } else {
      if (this.newUserTaskFinish) {
        this.awardItemNew.awardsName = this.motherTask.awardsName
      }
    }
  },
  computed: {
    awardsImage () {
      let url = this.awardItem.showAwardsImage || this.awardItem.awardsImage
      if (this.masterTask) {
        if (this.awardItem.showMedalImg) {
          this.awardItem.awardsImage = this.awardItem.medalimg
        } else {
          url = `${require('./img/crushMasterTask/task_huafei.png')}`
        }
      } else {
        if (this.newUserTaskFinish) {
          url = `${require('./img/signIn-icon.png')}`
        }
      }
      return url
    },
    btnName () {
      let url = '朕收下啦'
      if (!this.masterTask && this.newUserTaskFinish) {
        url = '去看看大师任务'
      }
      return url
    }
  }
}
</script>

<style lang='less' scoped>
.crush-wrap {
  margin: 0.4rem auto;
  width: 2.23rem;
  height: 2.3rem;
  text-align: center;
  background: #da4027;
  border-radius: 0.08rem;
  border: 0.01rem solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
}

.medeal-icon {
  max-width: 100%;
  max-height: 100%;
}

* {
  box-sizing: border-box;
}

.shine {
  display: block;
  width: 86%;
  animation: rotate 2s linear infinite;
  margin: 0 auto;
}

.shine-box {
  width: 100%;
  position: fixed;
  top: 5%;
  left: 0%;
  z-index: 6;
  overflow: hidden;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #000;
  opacity: 0.6;
  z-index: 5;
}

.content-box {
  position: fixed;
  width: 80%;
  left: 50%;
  margin-left: -40%;
  top: 10%;
  z-index: 7;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);

  .bg {
    width: 100%;
    display: block;
  }
  .content {
    position: absolute;
    width: 100%;
    top: 0;
    padding: 10% 2%;
    padding-bottom: 8%;
    height: 100%;
    .title {
      height: 24px;
      display: block;
      margin: 0 auto;
    }
    .icon {
      width: 1.6rem;
      height: 1.6rem;
      margin: 0 auto;
      background: #ffd66d;
      border: 1px solid #fff;
      border-radius: 5px;
      margin-top: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 70%;
        display: block;
        margin: 0 auto;
      }
    }
    .hb-icon {
      width: 1.09rem;
      /*height: 1.6rem;*/
      margin: 0 auto;
      display: block;
      margin-top: 10%;
    }
    .num {
      font-size: 0.28rem;
      text-align: center;
      margin-top: 3%;
    }
    .text {
      font-size: 14px;
      text-align: center;
      margin-top: 6%;
      &.progress {
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: 0.26rem;
          margin-right: 4px;
        }
        .progress-bg {
          background: #dd3317;
          width: 46%;
          position: relative;
          height: 0.22rem;
          border-radius: 3px;
          overflow: hidden;
          .progress-bar {
            background: #ffcf52;
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
            left: 0;
            font-size: 0.22rem;
            line-height: 0.22rem;
            text-align: center;
          }
        }
      }
    }
    .close {
      color: #a34c00;
      font-size: 0.28rem;
      background: #ffcf52;
      width: 50%;
      font-weight: bold;
      margin: 0 auto;
      text-align: center;
      margin-top: 10%;
      padding: 3.5% 0;
      border-radius: 6px;
    }
  }
}

.new {
  .bg {
    height: 5.3rem;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.7);
  }
  .rotate {
    position: absolute;
    left: 50%;
    top: 0%;
    z-index: 2;
    width: 130%;
    margin-left: -65%;
    animation: rotate 2s linear infinite;
  }
  .content {
    position: absolute;
    left: 50%;
    top: 0;
    z-index: 3;
    width: 4.8rem;
    height: 5.3rem;
    background-size: 100% 100%;
    transform: translate(-50%, 0);
    .title {
      margin: 0 auto;
      width: 3.64rem;
      height: 0.36rem;
      display: block;
    }
    .price {
      margin: 0.7rem auto 0.07rem;
      width: 1.49rem;
      height: 1.49rem;
      display: block;
    }
    .num {
      text-align: center;
      font-size: 0.18rem;
      color: #fff;
    }
    .explain {
      margin-top: 0.6rem;
      text-align: center;
      font-size: 0.26rem;
      color: #fdf469;
    }
    .btn {
      margin: 0.15rem auto 0;
      width: 2.4rem;
      height: 0.62rem;
      background: #ffcf52;
      color: #a34c00;
      text-align: center;
      line-height: 0.62rem;
      border-radius: 5px;
    }
    .closed {
      width: 0.44rem;
      height: 0.44rem;
      margin: 0.5rem auto 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
