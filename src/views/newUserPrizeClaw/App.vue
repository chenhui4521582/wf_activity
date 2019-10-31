<template>
  <div id="app" ref="app" class="turn-wrap" v-if="info.openFlag">
    <p class="back" @click="back"></p>
    <div class="top">
      <span>&nbsp;&nbsp;限时福利&nbsp;</span>剩余{{countTime.day}}天{{countTime.hour}}小时{{countTime.minute}}分
    </div>
    <div class="top-btn-wrap">
      <div class="btn left" @click="showRule()">玩法说明</div>
      <div class="btn right" @click="goMy()">我的奖品</div>
    </div>
    <div class="bottom-wrap">
      <p class="times" style="opacity:0">
        {{info.wheelTimes||0}}次抽奖机会
      </p>
      <div class="main">
        <div class="notice-wrap">
          <!-- 跑马灯 -->
          <horn-list :notice-list="noticeList" v-if="noticeList.length" />
        </div>
        <div class="list-wrap">
          <div class="claw" :class="{down:step===2,up:step===1}">
          </div>
          <div class="awards-list">
            <ul class="top-list">
              <li v-for="(item,index) in list1" :style="{left:2.28*(3-item)+1.88+'rem',display:(3-item)< -3?'none':'block'}">
                <img :src="require('./img/award-'+index+'.png')" alt="">
              </li>
            </ul>
            <ul class="bottom-list" v-if="!isTurnpopShow" ref="con">
              <li v-for="(item,index) in list" :style="{right:1.88*(3-item)+'rem',display:(3-item)< -3?'none':'block'}">
                <img :src="require('./img/award-'+imgList[index]+'.png')" alt="">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pointer" :class="{down:step===2}" @click.stop="betting()"></div>
      <p class="times">
        {{info.wheelTimes||0}}次抽奖机会
      </p>
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
                <div class="btn undone" v-if="item.taskStatus===1" @click="goGame(item)">去完成</div>
                <div class="btn done" v-else @click="goGame(item)">已完成</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <rule v-if="isRuleShow" @on-close="closeRule()"></rule>
    <turnpop v-if="isTurnpopShow" :pop-type="popType" :awards-info="awardsInfo" @on-close="closeTurnPop"></turnpop>
  </div>
</template>
<script>
/* eslint-disable no-undef */
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
      awardsInfo: {},
      list: [0, 1, 2, 3, 4, 5, 6, 7],
      list1: [0, 1, 2, 3, 4, 5, 6, 7],
      imgList: [],
      countDoneTimer: null,
      clawTimer: null,
      otherTime: null,
      currentIndex: 0,
      step: 0
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
    GLOBALS.marchSetsPoint('P_H5PT0200', { source_address: this.sourceAddress }) // H5平台-新手转盘活动-页面加载完成
  },
  computed: {
    sourceAddress () {
      return GLOBALS.getUrlParam('from')
    }
  },
  methods: {
    async init () {
      const res = await this.axios.post('//ops-api.beeplaying.com/ops/api/wheel/newUser/info')
      const { data } = res.data
      this.step = 0
      this.$set(this, 'imgList', [0, 1, 2, 3, 4, 5, 6, 7])
      if (data) {
        this.info = data
        this.countDown(data.countdown)
        this.clawTimer = setInterval(() => {
          this.list.push(this.list.shift())
          this.list1.push(this.list1.shift())
          this.currentIndex = this.list.indexOf(3)
        }, 500)
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
      GLOBALS.marchSetsPoint('A_H5PT0200002040') // H5平台-新手转盘活动页-抽奖按钮点击
      if (this.info.wheelTimes) {
        const res = await this.axios.post('//ops-api.beeplaying.com/ops/api/richwheel/commonBetting', { value: 31 })
        const { data } = res.data
        if (data) {
          this.awardsInfo = data
          this.operation()
          return
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
      this.countDoneTimer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.countDoneTimer)
          this.$router.replace('/')
        }
        let _day = Math.floor(date / 86400)
        let _hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let _minute = Math.floor(parseInt(date / 60) % 60)
        let day = _day
        let hour = _hour >= 10 ? _hour : '0' + _hour
        let minute = _minute >= 10 ? _minute : '0' + _minute
        this.countTime = {
          day,
          hour,
          minute
        }
      }, 1000)
    },
    goMy () {
      WapCall.openGame('/xmWap/#/my/')
      GLOBALS.marchSetsPoint('A_H5PT0200002039') // H5平台-新手转盘活动页-我的奖品点击
    },
    showRule () {
      this.isRuleShow = true
      GLOBALS.marchSetsPoint('A_H5PT0200002038') // H5平台-新手转盘活动页-玩法说明点击
    },
    closeRule () {
      this.isRuleShow = false
    },
    showTurnPop () {
      this.isTurnpopShow = true
      if (this.popType) {
        this.$set(this, 'imgList', [])
        this.init()
        GLOBALS.marchSetsPoint('A_H5PT0200002043', {
          task_name: this.awardsInfo.awardsName
        }) // H5平台-新手转盘活动页-获得奖品提示弹窗加载完成
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0200002046') // H5平台-新手转盘活动页-抽奖机会不足提示弹窗加载完成
      }
    },
    closeTurnPop (type) {
      this.isTurnpopShow = false
      if (this.popType) {
        if (type) {
          this.betting()
          GLOBALS.marchSetsPoint('A_H5PT0200002044') // H5平台-新手转盘活动页-获得奖品提示弹窗-再抽一次点击
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0200002045') // H5平台-新手转盘活动页-获得奖品提示弹窗-关闭点击
        }
      } else {
        if (type) {
          this.$nextTick(() => {
            window.scrollTo(0, this.$refs.app.scrollHeight)
          })
          GLOBALS.marchSetsPoint('A_H5PT0200002047') // H5平台-新手转盘活动页-抽奖机会不足提示弹窗-获得更多抽奖机会点击
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0200002048') // H5平台-新手转盘活动页-抽奖机会不足提示弹窗-关闭点击
        }
      }
    },
    operation () {
      if (this.step) {
        return false
      } else {
        this.step = 2
        let actIndex = this.currentIndex > 4 ? (this.currentIndex + 2) % 7 : this.currentIndex + 3
        this.$set(this.imgList, actIndex, 0)
        this.otherTime = setTimeout(() => {
          clearInterval(this.clawTimer)
          clearTimeout(this.otherTime)
          this.otherTime = setTimeout(() => {
            let _cIndex = this.currentIndex < 1 ? 7 : this.currentIndex - 1
            clearTimeout(this.otherTime)
            this.step = 1
            if (this.list[_cIndex] === 2) {
              this.$refs.con.childNodes[_cIndex].style.top = '-1.5rem'
            }
            this.otherTime = setTimeout(() => {
              clearTimeout(this.otherTime)
              this.popType = true
              this.showTurnPop()
            }, 600)
          }, 500)
        }, 2000)
      }
    },
    goGame ({ url, taskId, taskName, taskStatus }) {
      let params = {
        task_id: taskId,
        task_name: taskName
      }
      if (taskStatus === 1) {
        GLOBALS.marchSetsPoint('A_H5PT0200002041', params) // H5平台-新手转盘活动页-去完成任务点击(跳转不同游戏)
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0200002042', params) // H5平台-新手转盘活动页-已完成任务点击(跳转不同游戏)
      }
      WapCall.openGame(url)
    },
    back () {
      let url = SDK.getBackUrl()
      if (url) {
        url = url.split('?')[0]
        WapCall.openGame(url)
      }
    },
    move (e) {
      e.preventDefault()
    },
    scrollNoMove () {
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', this.move, { passive: false })
    },
    scrollMove () {
      document.body.style.overflow = null
      document.removeEventListener('touchmove', this.move, { passive: false })
    }
  },
  watch: {
    isRuleShow (val) {
      if (val) {
        this.scrollNoMove()
      } else {
        this.scrollMove()
      }
    },
    isTurnpopShow (val) {
      if (val) {
        this.scrollNoMove()
      } else {
        this.scrollMove()
      }
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
  background: #340967 url("./img/bg.png") no-repeat center ~"-1.24rem" / 100% auto;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  .top {
    width: 5.14rem;
    height: 2.38rem;
    color: #fff;
    font-size: 0.24rem;
    font-weight: 500;
    position: relative;
    margin: 0.28rem 0.94rem 0 1.1rem;
    box-sizing: border-box;
    padding: 1.18rem 0 0 0.78rem;
    .bgWithFull("./img/top-title.png");
  }
  .back {
    position: absolute;
    left: 0.24rem;
    top: 0.24rem;
    height: 0.34rem;
    width: 0.2rem;
    .bgWithFull("./img/back.png");
  }
  .top-btn-wrap {
    position: absolute;
    width: 100%;
    top: 1.4rem;
    display: flex;
    color: #fff;
    font-size: 0.2rem;
    font-weight: bold;
    align-items: center;
    justify-content: space-between;
    .btn {
      height: 0.36rem;
      line-height: 0.38rem;
      background: #4e53d9;
      position: relative;
      width: 1.05rem;
      text-align: center;
      &.left {
        border-radius: 0 0.18rem 0.18rem 0;
      }
      &.right {
        border-radius: 0.18rem 0 0 0.18rem;
      }
    }
  }
  .bottom-wrap {
    margin-top: -0.88rem;
    padding: 1.68rem 0 0.2rem;
    background: url("./img/main-bg.png") no-repeat center top / 100% auto;
    .times {
      color: #fcff0f;
      font-size: 0.26rem;
      text-align: center;
      margin-bottom: 0.02rem;
    }
  }
  .main {
    position: relative;
    width: 6.62rem;
    height: 4.8rem;
    margin: auto;
    .bgWithFull("./img/light1.png");
    animation: changeBg 0.3s infinite ease;
    .notice-wrap {
      width: 4rem;
      height: 0.38rem;
      line-height: 0.38rem;
      padding-top: 0.12rem;
      padding-left: 0.4rem;
      margin: auto;
      font-size: 0.22rem;
    }
    .list-wrap {
      box-sizing: border-box;
      width: 5.44rem;
      height: 4.9rem;
      margin: auto;
      .claw {
        position: absolute;
        top: 0.94rem;
        left: 50%;
        margin-left: -0.56rem;
        z-index: 3;
        font-size: 0;
        &::before {
          content: "";
          display: block;
          width: 0.12rem;
          height: 0.22rem;
          margin: auto;
          transition: all 0.5s linear;
          font-size: 0;
          background: url("./img/stick.png") no-repeat center bottom / 100% auto;
        }
        &:after {
          content: "";
          display: block;
          width: 1.12rem;
          height: 1.12rem;
          margin: -0.04rem auto 0;
          font-size: 0;
          .bgWithFull("./img/claw.png");
        }
        &.down {
          margin-left: -0.6rem;
          &::before {
            transition: all 2.2s linear;
            height: 1.5rem;
          }
          &::after {
            .bgWithFull("./img/claw2.png");
            width: 1.2rem;
            height: 1.16rem;
            margin: auto;
          }
        }
        &.up {
          margin-left: -0.6rem;
          &::before {
            transition: all 0.5s linear;
            height: 0.22rem;
          }
          &::after {
            .bgWithFull("./img/claw2.png");
            width: 1.2rem;
            height: 1.16rem;
            margin: auto;
          }
        }
      }
      .awards-list {
        overflow: hidden;
        .top-list {
          margin-top: 2.14rem;
          position: relative;
          width: 100%;
          height: 1.4rem;
          li {
            position: absolute;
            height: 1.38rem;
            width: 1.28rem;
            text-align: center;
            opacity: 0.8;
            transition: all 0.49s linear;
            img {
              width: auto;
              height: 100%;
            }
          }
        }
        .bottom-list {
          margin-top: -1.1rem;
          position: relative;
          z-index: 1;
          width: 100%;
          height: 2.2rem;
          li {
            position: absolute;
            top: 0;
            height: 2.2rem;
            width: 1.68rem;
            text-align: center;
            transition: all 0.49s linear;
            img {
              width: auto;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .pointer {
    height: 1.86rem;
    width: 4.24rem;
    margin: 1rem auto 0;
    .bgWithFull("./img/start-btn.png");
    &.down {
      .bgWithFull("./img/start-btn2.png");
    }
  }
  .task-wrap {
    width: 6.8rem;
    margin: 0.22rem auto 0;
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
