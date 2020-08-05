<template>
  <section class="coinact" v-if="actInfo">
    <div class="coin-click" style="height: 5.4rem">
      <img src="./images/back.png" alt="" class="back" @click="back">
      <div class="total_gain">
        <template v-if="actInfo.state==1&&countTime">
          任务{{actInfo.currentStage}}<i>距离结束还剩：{{countTime}}</i>
        </template>
      </div>
      <div class="fighthours_container">
        <div class="item" v-for="(item,index) in actInfo.progressList">
          <div class="taskBg_container"
               :class="{end:[2,3].includes(item.state),goComplete:[1,4].includes(item.state),unBegin:item.state==0}">
            <div class="taskBg"
                 :class="{end:[2,3].includes(item.state),goComplete:[1,4].includes(item.state),unBegin:item.state==0}">
              <div class="task_name">任务{{item.stage}}</div>
              <div class="award_name">¥{{item.awardsName.replace('元','').replace('话费券','')}}</div>
              <div class="award_type">（话费）</div>
              <div class="task_info" v-if="[1,4].includes(item.state)">游戏支持金叶{{item.amount|filterPrice}}</div>
            </div>
          </div>
          <div class="percent"
               :class="{end:[2,3].includes(item.state),goComplete:[1,4].includes(item.state),unBegin:item.state==0}">
            <div class="percent_bar" :class="{full:item.currentAmount==item.amount}"
                 :style="{width:(item.currentAmount/item.amount)*100+'%'}" v-if="[1,4].includes(item.state)">
              {{item.currentAmount|filterPrice}}
            </div>
            <span v-else-if="[2,3].includes(item.state)">{{item.currentAmount|filterPrice}}</span>
            <span v-else>未开始</span>
          </div>
          <div class="task_btn"
               :class="{received:item.state==3||item.state==4,receive:item.state==2,goComplete:item.state==1,unBegin:item.state==0}"
               @click="doTask(item)">
            <template v-if="item.state==0">
              第{{item.stage}}小时
            </template>
            <template v-else>
              {{btnStates[item.state-1]}}
            </template>
          </div>
        </div>
      </div>
      <div class="fighthours_case">
        <img src="./images/participatebtn.png" alt="" v-if="actInfo.state==0" @click="goApply">
        <span v-if="actInfo.state==2">本次火拼任务已全部完成，即将关闭入口，<br>请尽快领取奖励哟~</span>
        <span v-else-if="actInfo.state==3">好遗憾~未达成本次火拼任务</span>
      </div>
      <div class="fighthours_rule">
        <img src="./images/decoration.png" alt="" class="decoration">
        <div class="rule_txt">
          <p>• 每小时玩游戏消耗金叶达到梯度，则可领取小时任务奖励</p>
          <p>• 如果无法完成前1小时任务，则无法领取奖励，且后续任务不会继续解锁，火拼结束;</p>
          <p>• 任务完成后，自动启动下一个任务，并开始1小时倒计时</p>
          <p>• 任一任务达成后，可手动领取奖励；</p>
          <p>• 任务失败或任务全部完成后，活动入口将在1小时后下线，请及时领取奖励； </p>
          <p>• 参与活动的游戏包括：糖果萌消消、欢乐竞技台球、街机欢乐捕鱼、三国大作战、众神风云、福满多、斗西游、深海探一探、欢乐的小鸟、炸弹人</p>
        </div>
      </div>
    </div>
    <com-pop :popType="popType" ref="comPop" :actInfo="actInfo" :awardData="awardData"></com-pop>
  </section>
</template>

<script>
  import {getActInfo, goApply, receivePrize} from './utils/api'

  export default {
    name: 'coinact',
    components: {
      comPop: () => import('./components/comPop')
    },
    data() {
      return {
        popType: 0,
        actInfo: null,
        awardData: null,
        status: ["去完成", "未领取", "已领取"],
        mallBizConfigs: [],
        taskData: [{
          levelStatus: 2,
          awardsName: '50',
          amount: 10000000,
          goal: 10000000,
          status: 1
        }, {
          levelStatus: 1,
          awardsName: '200',
          amount: 220000,
          goal: 10000000,
          status: 0
        }, {
          levelStatus: 0,
          awardsName: '500',
          amount: 0,
          goal: 0,
          status: 0
        }],
        btnStates: ['去完成', '领取奖励', '已领取', "未达成"],
        allCompleted: false,
        currentTaskData: null,
        countTime: ''
      }
    },
    async mounted() {
      await this.getActInfo()
      GLOBALS.marchSetsPoint('P_H5PT0310', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
    },
    methods: {
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0310003852')
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      async getActInfo() {
        let {code, data} = await getActInfo()
        if (code == 200) {
          this.actInfo = data
          if (this.actInfo.currentCountdown) {
            !this.countTime && this.countDown(this.actInfo.currentCountdown)
          }
        }
      },
      async goApply() {
        let {code, data} = await goApply()
        if (code == 200) {
          this.showPop(3)
          this.getActInfo()
        }
      },
      //弹窗
      showPop(type) {
        this.popType = type
        if (type == 1) {//规则点击
          GLOBALS.marchSetsPoint('A_H5PT0310003853')
        }
        setTimeout(() => {
          // A_H5PT0310003856 H5平台-金币挑战活动-活动规则弹窗加载完成
          // A_H5PT0310003858 H5平台-金币挑战活动-特别挑战开启弹窗加载完成
          let points = ['A_H5PT0310003856', 'A_H5PT0310003858']
          points[type - 1] && GLOBALS.marchSetsPoint(points[type - 1])
          if (this.awardData) {
            GLOBALS.marchSetsPoint(this.awardData.awardsType == 'jinbi' ? 'A_H5PT0310003857' : 'A_H5PT0310003855', {
              awards_name: this.awardData.awardsName,
              awards_num: this.awardData.awardsNum
            })
          }
          this.$refs.comPop.showPop()
        })
      },
      async gain(category, item) {
        if (category) {
          if (item.awardsState == 0) {
            location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()

          } else if (item.awardsState == 1) {
            GLOBALS.marchSetsPoint('A_H5PT0310003854')
            let {code, data, message} = await receivePrize(category, item.sort)
            if (code == 200) {
              this.awardData = Object.assign(data, {
                awardsNum: item.awardsNum
              })
              this.showPop(3)
              this.getActInfo()
            } else {
              this.$toast.show({
                message,
                duration: 1000
              })
            }
          }
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0310003854')
          let {code, data, message} = await receiveAll()
          if (code == 200) {
            this.awardData = data
            this.showPop(3)
            this.getActInfo()
          } else {
            this.$toast.show({
              message,
              duration: 1000
            })
          }
        }
      },
      countDown(item) {
        if (!item) return false
        let date = item / 1000
        this.timer = setInterval(() => {
          date = date - 1
          if (date <= 0) {
            date = 0
            clearInterval(this.timer)
          }
          let day = Math.floor(date / 86400)
          let hour = Math.floor(parseInt(date / 60 / 60) % 24)
          let minute = Math.floor(parseInt(date / 60) % 60)
          let second = Math.floor(date % 60)
          // let countDay = day >= 10 ? day : '0' + day
          let countDay = day >= 10 ? day : '0' + day
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          if (day >= 2) {
            this.countTime = 0
          } else if (day > 0) {
            this.countTime = `${day}天${countHour}:${countMinute}:${countSecond}`
          } else {
            this.countTime = `${hour ? countHour + ':' : ''}${countMinute}:${countSecond}`
          }
        }, 1000)
      },
      async doTask(item) {
        //received:item.state==3||item.state==4,receive:item.state==2,goComplete:item.state==1,unBegin:item.state==0
        if (item.state == 1) {
          this.showPop(1)
        } else if (item.state == 2) {
          let {code, data} = await receivePrize(item.stage)
          if (code == 200) {
            this.awardData = data
            this.showPop(2)
            this.getActInfo()
          }
        }
      }
    },
    watch: {
      countTime(val) {
        if (!val) {
          this.getActInfo()
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../../common/css/base.css";

  .coinact {
    min-height: 100vh;
    position: relative;
    background: #FFE6AF;
    padding-top: 5.53rem;
    box-sizing: border-box;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 16.15rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
    }
    .time {
      position: absolute;
      top: 3.84rem;
      left: 0;
      right: 0;
      z-index: 2;
      text-align: center;
      font-size: .2rem;
      font-weight: 400;
      color: rgba(171, 74, 32, 1);
      z-index: 1;
    }
    .back, .rule {
      position: absolute;
      top: .2rem;
      left: .16rem;
      width: .66rem;
      height: .66rem;
      z-index: 2;
      &.rule {
        top: 1.06rem;
      }
    }
    .gain {
      position: fixed;
      top: 5.37rem;
      left: 0;
      width: 1.07rem;
      height: .68rem;
      z-index: 2;
    }
    .total_gain {
      position: absolute;
      top: 4.6rem;
      height: .75rem;
      left: .8rem;
      width: 5.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      font-size: .4rem;
      font-weight: bold;
      color: rgba(255, 236, 22, 1);
      i {
        color: #fff;
      }
    }
    .fighthours_container {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: center;
      .taskBg_container {
        width: 2.08rem;
        height: 3.32rem;
        display: flex;
        justify-content: center;
        padding-top: .34rem;
        box-sizing: border-box;
        &.goComplete {
          width: 2.47rem;
          padding-top: 0;
        }
        .taskBg {
          width: 2.08rem;
          height: 2.88rem;
          padding-top: .16rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-weight: 400;
          .task_name {
            font-size: .24rem;
            color: rgba(209, 199, 185, 1);
            margin-bottom: 1.1rem;
            line-height: 1;
          }
          .award_name {
            font-size: .48rem;
            color: rgba(177, 167, 154, 1);
            margin-bottom: .08rem;
            line-height: 1;
          }
          .award_type {
            font-size: .2rem;
            color: rgba(187, 177, 163, 1);
            line-height: 1;
          }
          .task_info {
            margin-top: .26rem;
            font-size: .18rem;
            color: rgba(255, 234, 185, 1);
            line-height: 1;
          }
          &.end {
            background: url("./images/bonus2.png");
            background-size: 100% 100%;
          }
          &.goComplete {
            .task_name {
              font-size: .26rem;
              color: rgba(255, 233, 181, 1);
              margin-bottom: 1.12rem;
            }
            .award_name {
              font-size: .52rem;
              color: rgba(255, 216, 61, 1);
              margin-bottom: .08rem;
            }
            .award_type {
              font-size: .22rem;
              color: rgba(255, 217, 142, 1);
            }
            width: 2.47rem;
            height: 3.32rem;
            padding-top: .3rem;
            box-sizing: border-box;
            background: url("./images/bonus1.png");
            background-size: 100% 100%;
          }
          &.unBegin {
            .task_name {
              color: rgba(255, 233, 181, 1);
            }
            .award_name {
              color: rgba(255, 216, 61, 1);
            }
            .award_type {
              color: rgba(255, 217, 142, 1);
            }
            background: url("./images/bonus0.png");
            background-size: 100% 100%;
          }
        }
      }
      .percent {
        width: 1.76rem;
        height: .3rem;
        background: #fff;
        border-radius: .15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .2rem;
        font-weight: 400;
        color: rgba(251, 111, 50, 1);
        position: relative;
        margin: auto;
        overflow: hidden;
        &.goComplete {
          color: #4c1506;
        }
        &.end {
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          background: rgba(120, 110, 96, 1);
        }
        .percent_bar {
          height: .3rem;
          position: absolute;
          left: 0;
          background: rgba(251, 111, 50, 1);
          border-radius: .15rem 0 0 .15rem;
          text-align: center;
          line-height: .3rem;
          &.full {
            border-radius: .15rem;
          }
        }
      }
      .task_btn {
        width: 1.87rem;
        height: .57rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: .14rem auto 0;
        font-size: .24rem;
        font-weight: bold;
        &.goComplete {
          background: url("./images/btn0.png");
          background-size: 100% 100%;
          color: rgba(227, 53, 6, 1);
        }
        &.receive {
          background: url("./images/btn1.png");
          background-size: 100% 100%;
          color: rgba(255, 255, 255, 1);
        }
        &.received {
          background: url("./images/btn2.png");
          background-size: 100% 100%;
          color: rgba(255, 255, 255, 1);
        }
        &.unBegin {
          margin: .18rem auto 0;
          height: .47rem;
          background: url("./images/hourbtn.png");
          background-size: 100% 100%;
          color: rgba(143, 44, 0, 1);
        }
      }
    }
    .fighthours_case {
      position: relative;
      z-index: 1;
      margin-top: .25rem;
      display: flex;
      justify-content: center;
      span {
        font-size: 32px;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        color: rgba(247, 39, 1, 1);
        line-height: .48rem;
        text-align: center;
      }
      img {
        width: 4.83rem;
        height: 1.29rem;
      }
    }
    .fighthours_rule {
      margin-top: .36rem;
      position: relative;
      z-index: 1;
      padding: 0 .46rem;
      box-sizing: border-box;
      img {
        width: 6.28rem;
        height: .34rem;
        margin-bottom: .33rem;
      }
      .rule_txt {
        p {
          font-size: .24rem;
          font-weight: 400;
          color: rgba(193, 137, 77, 1);
          line-height: .36rem;
        }
      }
    }
  }
</style>
