<template>
  <section v-if="mowangList.length>0 && mowangList[0].taskStatus != 2">
    <ul class="t-items">
      <li v-for="(item, index) in mowangList">
        <div :class="{'actived': item.taskStatus == 2}" style="display: flex;align-items: center;flex:1">
          <div class="pic">
            <img src="../img/mowang_icon.png" alt="">
          </div>
          <div class="item-text">
            <div class="title">
              <img src="../img/mowang-text.png" alt="">
              <p>（人人视频用户专属）</p>
            </div>
            <div class="percent-container">
              <div class="percent-box">
                <em :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></em>
              </div>
            </div>
            <div class="new-item-award">
              <p>{{item.finishNum}}/{{item.taskOps}}</p>
              <p>{{item.taskName}}</p>
            </div>
          </div>
        </div>
        <p class="btn-box">
          <a href="javascript:" class="btn btn-receive" v-if="item.taskStatus == 0" @click="receive(item, 'mowangTask')">领取</a>
          <a href="javascript:" class="btn btn-play" v-if="item.taskStatus == 1" @click="goFinishs(item)">去完成</a>
          <a href="javascript:" class="btn btn-gray" v-if="item.taskStatus == 2">已领取</a>
        </p>
      </li>
    </ul>
    <div v-if="awardItem.isShow">
      <div class="mask"></div>
      <div class="shine-box">
        <img class="shine" src="../img/dialog/shine.png" alt="">
      </div>
      <div class="content-box">
        <img class="bg" src="../img/dialog/bg.png">
        <div class="content">
          <img class="title" src="../img/dialog/congratulations-text.png" alt="">
          <div class="icon">
            <img src="../img/task_mowang.png" alt="">
          </div>
          <p class="num">{{awardItem.awardsName}}</p>
          <p style="color:#fad2cc;font-size:0.16rem;text-align:center;">奖励将在2天内发送，请及时在人人视频查收</p>
          <div class="close" @click="close">继续赚话费</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: '',
  components: {

  },
  computed: {
    platSource () {
      return GLOBALS.getUrlParam('from')
    }
  },
  watch: {

  },
  data () {
    return {
      mowangList: [],
      awardItem: {}
    }
  },
  methods: {
    getItem () {
      // 获取任务内容及进度
      this.axios.post('//platform-api.beeplaying.com/task/api/usertask/platCommonTaskByBatch', {
        value: 'renrenMedal'
      }).then((res) => {
        if (res.data.code == 200) {
          this.mowangList = res.data.data || []
        }
      })
    },
    goFinishs (item) {
      GLOBALS.marchSetsPoint('A_H5PT0061001280', {
        entrance: this.platSource,
        task_id: item.taskId,
        task_name: item.taskName,
        phase_id: item.finishNum
      }) // H5平台-游戏内SDK-人人勋章任务-去完成
      // 获取最近在玩
      this.axios.post('//platform-api.beeplaying.com//wap/api/game-category/recently').then((res) => {
        if (res.data.code == 200) {
          let nextGame = res.data.data && res.data.data.list && res.data.data.list[0] || {
            name: '梦想桌球',
            type: 2,
            url: '/billiards/'
          }
          parent.location.href = GLOBALS.getJumpToGameUrl(nextGame.url)
        }
      })
    },
    receive (item, type) {
      this.axios.post('//platform-api.beeplaying.com/task/api/usertask/finish', {
        taskId: item.taskId,
        taskLogId: item.taskLogId
      }).then(res => {
        if (res.data.code === 200) {
          GLOBALS.marchSetsPoint('A_H5PT0061001281', {
            entrance: this.platSource
          })
          this.awardItem = item
          this.$set(this.awardItem, 'isShow', true)
        }
      })
    },
    close () {
      GLOBALS.marchSetsPoint('A_H5PT0061001282', {
        entrance: this.platSource
      })
      this.$set(this.awardItem, 'isShow', false)
      this.getItem()
    }
  },
  mounted () {
    this.getItem()
  },
  destroyed () {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.t-items {
  margin: 0 auto;

  li {
    height: 0.9rem;
    background: url("../img/mowang-bg.png") no-repeat center / 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-bottom: 0.2rem;
    border-radius: 0.04rem;
  }
  .pic {
    min-width: 0.58rem;
    width: 0.58rem;
    height: 0.68rem;
    float: left;
    margin: 0 0.13rem 0 0.16rem;

    img {
      min-width: 0.58rem;
      width: 0.58rem;
      height: 0.68rem;
      filter: drop-shadow(0 0 0.08rem #d38b55);
    }
  }

  .item-text {
    flex: 1;
    .title {
      font-size: 0;
      img {
        width: 1.28rem;
        height: 0.2rem;
        vertical-align: bottom;
      }
      p {
        vertical-align: bottom;
        display: inline-block;
        font-size: 0.16rem;
        color: #23190d;
      }
    }
  }

  .percent-container {
    margin-top: 0.1rem;
    margin-bottom: 0.06rem;
    display: flex;
    align-items: center;
    .percent-box {
      width: 2.4rem;
      height: 0.1rem;
      background: #0f1726;
      border-radius: 0.06rem;
      position: relative;
      float: left;
      margin-right: 0.1rem;
      em {
        height: 100%;
        max-width: 100% !important;
        background: #c7875b;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 0.06rem;
      }
    }
  }
  .new-item-award {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 2.4rem;
    font-size: 0.14rem;
    color: #624e42;
    p {
      height: 0.24rem;
      text-align: center;
    }

    span {
      font-size: 0.2rem;
      color: #f1e3d7;
      white-space: nowrap;
    }
  }
  .btn-box {
    margin-right: 0.16rem;
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
      color: #fff;
      &.btn-play {
        background: #ffc178;
        color: #782e01;
      }
      &.btn-receive {
        background: #dc4901;
        color: #fff;
      }
      &.btn-gray {
        background: #7b5c46;
        color: #e6d2c3;
      }
    }
  }
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
    box-sizing: border-box;
    .title {
      height: 24px;
      display: block;
      margin: 0 auto;
    }
    .icon {
      width: 30%;
      height: 30%;
      margin: 0 auto;
      border-radius: 5px;
      margin-top: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        display: block;
        margin: 0 auto;
      }
    }
    .num {
      font-size: 0.22rem;
      height: 0.24rem;
      line-height: 0.24rem;
      text-align: center;
      margin: 3% auto;
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
</style>
