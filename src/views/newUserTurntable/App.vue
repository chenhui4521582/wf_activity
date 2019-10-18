<template>
  <div id="app" class="turn-wrap" v-if="info.openFlag">
    <div class="top">
      <span>限时福利 </span>剩余<em>{{countTime.day}}</em>天<em>{{countTime.hour}}</em>小时<em>{{countTime.minute}}</em>分
    </div>
    <div class="top-btn-wrap">
      <div class="btn left" @click="showRule()">玩法说明</div>
      <div class="btn right" @click="goMy()">我的奖品</div>
    </div>
    <div class="main">
      <div class="list-wrapper">
        <ul class="awards-list"></ul>
        <div class="pointer" @click="betting()"><span>({{info.wheelTimes}}次)</span></div>
      </div>
    </div>
    <div class="notice-wrap">
      <!-- 跑马灯 -->
      <horn-list :notice-list="noticeList" v-if="noticeList.length" />
    </div>
    <div class="task-wrap">
      <div class="task-content">
        <h4>完成每日任务 获得抽奖机会</h4>
        <ul class="task-list">
          <li class="list-item" v-for="(item,index) of taskList">
            <div class="icon-wrap">
              <img :src="item.icon|filter" alt="">
            </div>
            <div class="content-wrap">
              <div class="name">{{item.taskName}}</div>
              <div class="other">
                <div class="percent-wrap">
                  <div class="percent" :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></div>
                  <div class="text-percent">{{item.finishNum}}/{{item.taskOps}}</div>
                </div>
                <div class="awards">
                  <div class="icon"><img :src="item.awardsImage|filter" alt=""></div>
                  <p>x{{item.awardsNum}}</p>
                </div>
              </div>
            </div>
            <div class="btn-wrap">
              <div class="btn undone" v-if="item.taskStatus===1">去完成</div>
              <div class="btn done" v-else>已完成</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <rule v-if="isRuleShow" @on-close="closeRule()"></rule>
    <turnpop v-if="isTurnpopShow" :pop-type="popType" :awards-info="awardsInfo" @on-close="closeTurnPop()"></turnpop>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      info: {},
      countTime: {},
      noticeList: [],
      taskList: {},
      isRuleShow: false,
      isTurnpopShow: false,
      popType: false,
      awardsInfo: {}
    }
  },
  components: {
    'rule': () => import('./components/rule.vue'),
    'turnpop': () => import('./components/turnpop'),
    'horn-list': () => import('./components/hornList')
  },
  mounted () {
    this.init()
    this.getNoticeList()
    this.getTaskInfo()
  },
  methods: {
    async init () {
      const res = await this.axios.post('//ops-api.beeplaying.com/ops/api/wheel/newUser/info')
      const { data } = res.data
      if (data) {
        this.info = data
        this.countDown(data.countDown)
      }
    },
    async getNoticeList () {
      const res = await this.axios.post('//ops-api.beeplaying.com/ops/api/wheelgame/commonTopHores', { version: 31 })
      const { data } = res.data
      if (data && data.length > 0) {
        this.noticeList = data
      }
    },
    async getTaskInfo () {
      const res = await this.axios.post('//platform-api.beeplaying.com/task/api/usertask/platCommonTaskByBatch', { value: 'newUserWheel' })
      const { data } = res.data
      if (data) {
        this.taskList = data
      }
    },
    async betting () {
      if (this.info.wheelTimes) {
        const res = await this.axios.post('//ops-api.beeplaying.com/ops/api/richwheel/commonBetting')
        const { data } = res.data
        if (data) {
          this.awardsInfo = data
          this.popType = true
        }
      } else {
        this.popType = false
      }
      this.showTurnPop()
    },
    // 特惠倒计时
    countDown (info) {
      if (!info) return false
      let date = info / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
          this.$router.replace('/')
        }
        let _day = Math.floor(date / 86400)
        let _hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let _minute = Math.floor(parseInt(date / 60) % 60)
        let day = _day
        let hour = _hour >= 10 ? _hour : '0' + _hour
        let minute = _minute >= 10 ? _minute : '0' + _minute
        if (day > 0) {
          this.countTime = {
            day,
            hour,
            minute
          }
        }
      }, 1000)
    },
    goMy () {
      WapCall.openGame('/xmWap/#/my/prize')
    },
    showRule () {
      this.isRuleShow = true
    },
    closeRule () {
      this.isRuleShow = false
    },
    showTurnPop () {
      this.isTurnpopShow = true
    },
    closeTurnPop () {
      this.isTurnpopShow = false
    }
  }
}
</script>
<style lang="less">
@import "../../common/css/base.css";
.bgWithFull(@url) {
  background: url(@url) no-repeat center center / 100% 100%;
}
.turn-wrap {
  min-height: 100vh;
  background: url("./img/bg.png") no-repeat center ~"-1.2rem" / 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 0 0.2rem;
  .top {
    height: 0.6rem;
    line-height: 0.36rem;
    color: #fff;
    display: flex;
    font-size: 0.28rem;
    align-self: center;
    align-content: center;
    justify-content: center;
    justify-content: center;
    font-weight: 500;
    padding: 0.12rem 0;
    box-sizing: border-box;
    .bgWithFull("./img/top-bg.png");
    span {
      font-size: 0.32rem;
      font-weight: 800;
    }
    em {
      font-size: 0.32rem;
      background: #fff;
      color: #000;
      font-weight: 800;
      padding: 0 0.08rem;
      border-radius: 0.04rem;
    }
  }
  .top-btn-wrap {
    margin-top: 0.24rem;
    display: flex;
    color: #fff;
    font-size: 0.24rem;
    font-weight: bold;
    align-items: center;
    justify-content: space-between;
    .btn {
      height: 0.5rem;
      line-height: 0.5rem;
      background: #cc2f1f;
      position: relative;
      &.left {
        width: 1.42rem;
        text-align: center;
        border-radius: 0 0.3rem 0.3rem 0;
      }
      &.right {
        width: 1.6rem;
        border-radius: 0.3rem 0 0 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &::before {
          content: "";
          display: block;
          width: 0.24rem;
          height: 0.26rem;
          font-size: 0;
          margin: -0.02rem 0.04rem 0;
          .bgWithFull("./img/awards-icon.png");
        }
      }
    }
  }
  .main {
    position: relative;
    margin: 1.72rem auto 0;
    width: 5.2rem;
    height: 5.2rem;
    .bgWithFull("./img/light1.png");
    animation: changeBg 0.3s infinite ease;
    .list-wrapper {
      padding: 0.2rem;
      box-sizing: border-box;
      height: 100%;
      .awards-list {
        height: 100%;
        .bgWithFull("./img/awards.png");
      }
      .pointer {
        height: 2rem;
        width: 1.84rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.1rem;
        margin-left: -0.92rem;
        .bgWithFull("./img/pointer.png");
        span {
          color: #fff;
          font-size: 0.28rem;
          font-weight: 400;
          position: absolute;
          bottom: 0.4rem;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .notice-wrap {
    width: 4rem;
    height: 0.38rem;
    line-height: 0.38rem;
    padding: 0.48rem 0 0 0.4rem;
    margin: auto;
  }
  .task-wrap {
    width: 6.8rem;
    margin: 0.5rem auto 0;
    .task-content {
      background: url("./img/wcrw-bj02.png") repeat-y center top / 100%;
      margin: -1px 0;
      padding-top: 0.32rem;
      h4 {
        text-align: center;
        font-size: 0.36rem;
        font-weight: bold;
        color: #333;
      }
      .task-list {
        min-height: 1.28rem;
        padding: 0.2rem 0.3rem 0;
        .list-item {
          display: flex;
          padding: 0.24rem 0;
          align-items: center;
          justify-content: space-between;
          &:not(:last-child) {
            border-bottom: 1px solid #e0e0e0;
          }
          .icon-wrap {
            height: 0.8rem;
            width: 0.8rem;
            border-radius: 0.08rem;
            border: 1px solid;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .content-wrap {
            flex: 1;
            margin-left: 0.2rem;
            .name {
              font-size: 0.3rem;
              font-weight: bold;
              color: #15002b;
              margin-bottom: 0.12rem;
            }
            .other {
              display: flex;
              align-items: center;
              .percent-wrap {
                position: relative;
                width: 2.4rem;
                height: 0.26rem;
                background: #e0e0e0;
                border-radius: 0.14rem;
                .percent {
                  background: #ffd200;
                  height: 100%;
                  border-radius: 0.14rem;
                }
                .text-percent {
                  position: absolute;
                  top: 0;
                  width: 100%;
                  height: 0.26rem;
                  line-height: 0.26rem;
                  font-size: 0.2rem;
                  color: #15002b;
                  text-align: center;
                }
              }
              .awards {
                display: flex;
                align-items: flex-end;
                color: #ff5544;
                font-size: 0.26rem;
                margin-left: 0.1rem;
                .icon {
                  width: 0.26rem;
                  height: 0.26rem;
                  margin-right: 0.02rem;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
          }
          .btn-wrap {
            .btn {
              width: 1.6rem;
              height: 0.7rem;
              text-align: center;
              line-height: 0.7rem;
              font-size: 0.3rem;
              font-weight: bold;
              color: #fff;
            }
            .undone {
              .bgWithFull("./img/btn-red.png");
            }
            .done {
              .bgWithFull("./img/btn-grey.png");
            }
          }
        }
      }
    }
    &::before {
      content: "";
      display: block;
      height: 0.26rem;
      .bgWithFull("./img/wcrw-bj01.png");
    }
    &::after {
      content: "";
      display: block;
      height: 0.26rem;
      .bgWithFull("./img/wcrw-bj01.png");
      transform: rotateX(180deg);
    }
  }
  @keyframes changeBg {
    0% {
      .bgWithFull("./img/light1.png");
    }

    100% {
      .bgWithFull("./img/light2.png");
    }
  }
}
</style>
