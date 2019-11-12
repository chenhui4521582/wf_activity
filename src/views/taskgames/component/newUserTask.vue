<template>
  <section class="new-user-task">
    <div class="tips">
      <img src="../img/tips.png" alt="">
    </div>
    <div class="new-task-header">
      <div class="new-task-inner">
        <h4 class="h-title h-new-title icon-tips">
          <p class="h-subtitle">
            <img src="../img/title1.png" class="xr-icon">
            <img src="../images/small-xs-tips.png" class="small-xs-tips">
          </p>
          <div class="text"><img src="../images/cloak.png">{{newTaskItems.countDown | formatTime}}</div>
        </h4>
        <div class="newTask">
          <div v-if="motherTask&&(motherTask.hasFinishedNum != motherTask.allTaskNum)" class="title">
            <span class="text">全部完成</span>
            <span>再得{{motherTask.awardsNum / 10}}元话费</span>
          </div>
          <div class="title" v-else>恭喜！新人任务已全部完成！</div>
          <ul>
            <li class="percent-lq">
              <div class="percent-box">
                <em :style="{width: motherTask.hasFinishedNum/motherTask.allTaskNum * 100 + '%' }"></em>
              </div>
            </li>
          </ul>
          <div class="explain">
            <div class="text">{{motherTask.hasFinishedNum}}/{{motherTask.allTaskNum}}</div>
            <div v-show="newTaskItems.receiverCounter" class="receive">已有{{newTaskItems.receiverCounter}}人领取</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="motherTask.hasFinishedNum != motherTask.allTaskNum">
      <ul class="t-items">
        <li class="not-daily" v-for="(item,index) in newUserTaskList" :key="index">
          <div class="item-content">
            <div :class="{'actived': item.taskStatus == 2}">
              <div class="pic">
                <img :src="item.icon | filter" alt="">
              </div>
              <div class="item-text">
                <p class="title" v-html="item.taskName"></p>
                <div class="percent-container">
                  <div class="percent-box">
                    <div class="text">{{item.finishNum}}/{{item.taskOps}}</div>
                    <em :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></em>
                  </div>
                  <span class="item-award"><i><img :src="item.awardsImage | filter" alt="">{{item.awardsName}}</i></span>
                </div>
              </div>
            </div>
            <p class="btn-box">
              <a href="javascript:" class="btn btn-receive" v-if="item.taskStatus == 0" @click="receive(item)">领取</a>
              <a href="javascript:" class="btn btn-play" v-if="item.taskStatus == 1" @click="goFinish(item)">去完成</a>
              <a href="javascript:" class="btn btn-gray" v-if="item.taskStatus == 2">已领取</a>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul class="finish">
        <li>
          <div class="head-img">
            <img src="../img/signIn-icon.png" alt="">
          </div>
          <div class="f-content">
            <p>快领取话费奖励吧</p>
            <p>{{motherTask.awardsName}}</p>
          </div>
        </li>
        <li @click="receive(motherTask,'motherTask')" class="btn">领取</li>
      </ul>
    </div>
    <div class="open-daily" v-if="newTaskItems.dayTaskVisiblePopUp">
      <div class="mask"></div>
      <img class="shine" src="../img/dialog/shine.png" alt="">
      <div class="content-box">
        <img class="open-gift" src="../img/open-gift.gif" alt="">
        <img class="open-text" src="../img/open-text.png" alt="">
        <img class="open-btn" src="../img/open-btn.png" @click="getList" alt="">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: '',
  components: {
  },
  filters: {
    formatTime (time) {
      let days = time / 1000 / 3600 / 24
      let day = Math.floor(days)
      let hours = Math.ceil((days - day) * 24)
      return `仅剩${day}天${hours}小时`
    },
    filter (url) {
      if (url && !url.includes('http')) {
        return '//file.beeplaying.com' + url
      } else {
        return url
      }
    }
  },
  props: {
    newTaskItems: {
      default: null
    },
    motherTask: {
      default: null
    },
    newUserTaskobj: {
      default: null
    },
    channel: {
      default: null
    }
  },
  computed: {
    newUserTaskList () {
      return this.newTaskItems.taskList
    }
  },
  methods: {
    receive (item) {
      this.$emit('receive', item, 'newtask')
    },
    goFinish (item) {
      this.$emit('goFinish', item, 'newtask')
    },
    getList () {
      this.$emit('getList')
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.t-items {
  margin: 0 auto;

  li {
    height: 0.9rem;
    background: url("../img/dailytask_item_bg.png") no-repeat center / 100% 100%;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 0.2rem;
    border-radius: 0.04rem;

    &.not-daily {
      background: #141f33;
    }

    .actived {
      opacity: 0.5;
      filter: opacity(50);
    }
  }

  .label {
    background: #dd2c00;
    width: 0.6rem;
    font-size: 0.18rem;
    position: absolute;
    text-align: center;
    padding: 0.03rem 0;
    top: 0;
    left: 0;
    border-radius: 0 0 0.04rem 0;

    &.active {
      background: #2e3f5f;
    }
  }

  .pic {
    min-width: 0.6rem;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 12px;
    float: left;
    margin: 0 0.13rem 0 0.16rem;

    img {
      min-width: 0.6rem;
      width: 0.6rem;
      height: 0.6rem;
    }
  }

  .item-text {
    .title {
      width: 112%;
      font-size: 0.23rem;
      margin-bottom: 0.1rem;
      color: #efefef;
    }
  }

  .percent-box {
    margin-right: 0.1rem;

    em {
      max-width: 100% !important;
    }
  }

  .item-award {
    font-size: 0.2rem;
    color: #ffd338;
    padding-right: 0.1rem;

    i {
      display: flex;
      align-items: center;
      width: 1.76rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    img {
      height: 0.24rem;
      margin-right: 0.05rem;
    }
  }

  .new-item-award {
    display: flex;
    align-items: center;

    p {
      height: 0.24rem;
      width: 0.4rem;
      text-align: center;

      img {
        height: 100%;
      }
    }

    span {
      font-size: 0.2rem;
      color: #f1e3d7;
      white-space: nowrap;
    }
  }
}

.percent-container {
  display: flex;
  align-items: center;
}

.percent-box {
  width: 2rem;
  box-sizing: border-box;
  // max-width: 2rem;
  // min-width: 2rem;
  overflow: hidden;
  height: 0.24rem;
  background: #111935;
  border-radius: 0.08rem;
  position: relative;
  float: left;

  .text {
    width: 100%;
    height: 100%;
    font-size: 0.2rem;
    line-height: 0.24rem;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  em {
    width: 50%;
    height: 100%;
    background: #d1ab8e;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 0.08rem;
  }
}

.btn-box {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.16rem;
  width: 0.9rem;

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

    &.btn-play {
      color: #fff;
      background: #538cff;
    }

    &.btn-receive {
      background: url("../img/get_icon.png") no-repeat center / 100% 100%;
    }

    &.btn-gray {
      background: #787f97;
      color: #2a3044;
    }
  }

  .in-game {
    color: #2f3c49;
    font-size: 0.18rem;
  }

  .wool_user {
    position: absolute;
    right: 0.06rem;
    bottom: -0.18rem;
    color: #7d7f9b;
    font-size: 0.14rem;
    white-space: nowrap;
  }
}

.newTask {
  font-size: 0.2rem;
  margin-bottom: 0.17rem;
  padding-right: 0.07rem;

  .title {
    .text {
      color: #fff;
    }

    span {
      font-size: 0.22rem;
      color: #ffd338;
      margin-right: 0.11rem;
    }
  }

  .percent-lq {
    height: 0.24rem;
    line-height: 0.2rem;
    margin: 0.13rem 0;
  }

  .percent-box {
    width: 100%;
  }

  .explain {
    display: flex;
    justify-content: space-between;
    font-size: 0.18rem;
  }
}

.percent-lq {
  span {
    font-size: 0.18rem;
    color: #fff;
  }
}

.finish {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3%;
  background: #141f33;
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  li {
    word-break: keep-all;
    white-space: nowrap;

    &:first-child {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 80%;

      p:last-child {
        font-size: 0.24rem;
        margin-top: 6%;
      }
    }

    &:last-child {
      color: #f05835;
      font-weight: 700;
      font-size: 0.24rem;
      background: #fff;
      padding: 2% 5%;
      border-radius: 0.04rem;
    }

    .head-img {
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 0.06rem;
      overflow: hidden;
      margin-right: 3%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    p {
      font-size: 0.28rem;
      font-weight: 700;
    }
  }
}

/*新人任务*/
.new-task {
  background: #141f33;
  margin-top: 0.3rem;

  .xr-top {
    display: flex;
    justify-content: space-between;
    padding: 0.16rem 0 0.12rem 0;

    .xr-icon {
      width: 1.21rem;
      height: 0.29rem;
    }

    .small-xs-tips {
      width: 0.78rem;
      height: 0.21rem;
    }
  }

  .xr-text {
    font-size: 0.22rem;

    span {
      color: #ffd338;
      margin-left: 0.07rem;
      margin-right: 0.1rem;
    }
  }

  .clock {
    font-size: 0.18rem;
    color: #fff;
    display: flex;
    align-items: center;
    position: relative;
    top: 0.03rem;

    img {
      width: 0.2rem;
      height: 0.2rem;
      margin-right: 0.09rem;
    }
  }
  .new-task-container {
    width: 100%;
    height: 1.01rem;
    background: url(../img/new-task.png) no-repeat;
    background-size: 100% 100%;

    .percent-box {
      width: 1.1rem;
      float: none;
      display: inline-block;

      em {
        max-width: 100% !important;
      }
    }
  }
}

.new-task-header {
  width: 100%;
  height: 2.6rem;
  background: url(~../img/bg.png) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding-top: 0.75rem;
}

.new-task-inner {
  padding: 0 0.17rem 0 0.24rem;
}

.newUser {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.7);
  }

  .content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
  }

  .tips {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3.46rem;

    img {
      width: 100%;
      margin-bottom: 0.29rem;
    }

    p {
      width: 3.46rem;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.2rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(184, 184, 184, 1);
      border-radius: 30px;
      text-align: center;
      background: #202429;
    }
  }
}
.new-user-task {
  margin-top: 0.3rem;
  position: relative;

  .percent-lq {
    height: 0.12rem;

    .percent-box {
      height: 0.12rem;
      border-radius: 0.06rem;

      em {
        background: #507bcc;
      }
    }
  }

  .h-title {
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    position: relative;
    margin: 0.32rem 0 0.14rem;

    .xr-icon {
      width: 1.54rem;
      height: 0.36rem;
    }
    .small-xs-tips {
      width: 0.8rem;
      height: 0.2rem;
    }

    .text {
      position: absolute;
      right: 0;
      font-weight: normal;
      display: flex;
      align-items: center;
      opacity: 0.5;
      font-size: 0.16rem;
      color: rgba(255, 255, 255, 0.5);

      img {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        margin-right: 0.05rem;
      }
    }
  }

  .t-items {
    .pic {
      width: 0.6rem;
      height: 0.6rem;
    }

    li {
      margin-bottom: 0;
      padding: 0 0.16rem;
      height: auto;

      .item-content {
        padding: 0.16rem 0;
        display: flex;
        align-items: center;
        align-content: center;
        position: relative;
        width: 100%;

        .btn-box {
          right: 0;
        }
      }

      &:not(:last-child) {
        .item-content {
          border-bottom: 0.02rem solid #242f41;
        }
      }
    }
  }

  .tips {
    animation: tips 2s infinite;
    position: absolute;
    right: 1.3rem;
    top: -0.1rem;
    width: 1rem;
    height: 0.36rem;

    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  }

  .finish {
    border-radius: 0 0 5px 5px;

    li {
      .head-img {
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.2rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .f-content {
        p {
          font-size: 0.22rem;

          &:last-child {
            font-size: 0.2rem;
          }
        }
      }

      &:last-child {
        padding: 0;
        font-weight: normal;
        font-size: 0.2rem;
        width: 0.8rem;
        height: 0.4rem;
        text-align: center;
        line-height: 0.4rem;
        color: #fff;
        background: #ee6f0b;
      }
    }
  }
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #000;
  opacity: 0.6;
  z-index: 2;
}
.shine {
  position: fixed;
  z-index: 3;
  width: 80%;
  top: 1rem;
  left: 50%;
  margin-left: -40%;
  animation: rotate 2s linear infinite;
  opacity: 0.8;
}
.content-box {
  position: fixed;
  z-index: 4;
  width: 50%;
  height: auto;
  left: 50%;
  margin-left: -25%;
  top: 0.7rem;
  .open-gift {
    position: absolute;
    top: 1.5rem;
    left: 50%;
    margin-left: -1.04rem;
    width: 2.08rem;
  }
  .open-text {
    position: absolute;
    top: 3.5rem;
    left: 50%;
    margin-left: -1.72rem;
    width: 3.44rem;
  }
  .open-btn {
    position: absolute;
    top: 4.6rem;
    left: 50%;
    margin-left: -0.76rem;
    width: 1.52rem;
  }
}
@keyframes tips {
  0% {
    transform-origin: right bottom;
    transform: scale(0);
  }

  15% {
    transform-origin: right bottom;
    transform: scale(1);
  }

  30% {
    transform-origin: center bottom;
    transform: scale(1) rotate(-5deg);
  }

  45% {
    transform-origin: center bottom;
    transform: scale(1) rotate(0);
  }

  85% {
    transform-origin: center bottom;
    transform: scale(1) rotate(0);
  }

  100% {
    transform-origin: right bottom;
    transform: scale(0) rotate(0);
  }
}
</style>
