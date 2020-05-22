<template>
  <div class="returnbags" v-if="actData">
    <div class="back" @click="back(0)"></div>
    <div class="rule" @click="showRule"></div>
    <div class="time">
      倒计时:{{countdown.time&&countdown.time.split('分')[0]+'分'}}
    </div>
    <div class="container">
      <div class="extra">
        <div class="item" v-for="(item,index) in actData.extendAwardsList">
          <div class="day">第{{index+1}}天</div>
          <img :src="`${require(`./images/bag${index}.png`)}`" alt="">
          <div class="btn" :class="{btn1:item.state==1,btn2:item.state==2}" @click="getAwards(0,item)">
            {{item.state==2?'已领取':'领取'}}
          </div>
        </div>
      </div>
      <div class="task">
        <div class="tabs">
          <div class="item" v-for="(item,index) in 3" :class="{selected:tabIndex==index}" @click="setTabIndex(index)">
            第{{item}}天
          </div>
        </div>
        <div class="task_container">
          <div class="item" v-for="item in currentTasks">
            <div class="task_content">
              <div class="name">{{item.awardsName}}</div>
              <div class="percent">
                <div class="g-percent">
                  <div class="g-percent-bg" :style="{width: (item.currentProgress/item.taskCondition)*100+'%'}"
                       :class="{full:item.currentProgress&&item.currentProgress>=item.taskCondition}">
                  </div>
                  <span>{{item.currentProgress}}/{{item.taskCondition}}</span>
                </div>
                <img :src="`${require(`./images/${item.awardsType}.png`)}`" alt="">
                <div class="awradname">{{item.awardsName}}</div>
              </div>
            </div>
            <div class="btn" :class="{btn1:item.state==1,btn2:item.state==2,btn3:[3,4].includes(item.state)}"
                 @click="getAwards(1,item)">{{
              btnNames[item.state]}}
            </div>
          </div>
        </div>
      </div>
      <div class="richbag" v-if="packages">
        <div class="bag_container">
          <img src="./images/richbag.png" alt="">
          <div class="item">
            <div class="name">{{packages.name}}</div>
            <div class="info">
              {{packages.content.split('+')[0]}}<br/>{{packages.content.split('+')[1]}}
            </div>
          </div>
          <div class="btn" :class="{buyed:actData.giftStatus!=0}" @click="gotopay(packages)">
            {{actData.giftStatus==0?'购买':'已购买'}}
          </div>
        </div>
      </div>
    </div>
    <!--以下都是弹窗-->
    <!--规则-->
    <rule v-if="showrulepop" @close="showrulepop=false"></rule>
    <!--奖品弹窗-->
    <award-pop v-if="showAwardPop" :awardsname="awardsname" :type="awardType" @close="showAwardPop=false"></award-pop>
    <!--有福袋开启-->
    <open-bag v-if="showOpenBag" @open="getAwards(2,null)"></open-bag>
    <back-pop v-if="shoWBackPop" @back="back" @close="shoWBackPop=false"></back-pop>
  </div>
</template>

<script>
  import '../../common/js/window.js';
  import {
    getActivityInfo,
    getReceiveDayAwards,
    getExtraAwards,
    getPackages,
    getReceiveGift,
    getRingServerStatus
  } from './utils/api'
  import rule from './components/rule'
  import awardPop from './components/awardPop'
  import openBag from './components/openBag'
  import backPop from './components/backpop'

  export default {
    name: "App",
    data() {
      return {
        btnNames: ['去完成', '领取', '已领取', '已过期', '未开启'],
        countdown: {
          // 倒计时
          time: ""
        },
        actData: null,
        currentTasks: [],
        tabIndex: 0,
        showrulepop: false,
        showAwardPop: false,
        showOpenBag: false,
        shoWBackPop: false,
        awardsname: '',
        awardType: '',
        packages: null,
        ringData: null
      }
    },
    components: {
      rule, awardPop, openBag, backPop
    },
    methods: {
      async _getRingServerStatus() {
        let {data, code} = await getRingServerStatus()
        if (code === 200) {
          if (data.type === '1' || (data.distanceStop < 0 && data.distanceStart >= 0)) {
            this.ringData = data
          }
        }
      },
      back(flag) {
        if (flag == 0) {
          this.shoWBackPop = true
        } else {
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
        }
      },
      showRule() {
        this.showrulepop = true
      },
      setTabIndex(index) {
        if (index != this.tabIndex) {
          this.tabIndex = index
          this.currentTasks = this.actData.dayTaskList[index] && this.actData.dayTaskList[index].taskList;
        }
      },
      async getAwards(flag, item) {
        //额外奖励
        let points = ['A_H5PT0290003477', 'A_H5PT0290003478', 'A_H5PT0290003482']
        if (flag == 0) {
          if (item.state == 1) {
            GLOBALS.marchSetsPoint(points[flag], {
              product_id: item.day, product_name: item.awardsName
            })
            let {code, data, message} = await getExtraAwards(item.day)
            if (code == 200) {
              this.awardsname = data.awardsName
              this.awardType = data.awardsType
              this.showAwardPop = true
              this.getActivityInfo()
            } else {
              this.$toast.show({
                message: message
              })
            }
          }
        }
        //任务
        if (flag == 1) {
          if (item.state == 0) {
            GLOBALS.marchSetsPoint('A_H5PT0290003479', {
              task_id: item.idx, task_name: item.taskName
            })
            if (item.taskUrl) {
              if (item.taskUrl.includes('ring')) {
                if (this.ringData) {
                  GLOBALS.jumpOutsideGame(this.ringData.type == 2 ? '/ring2/' : '/ring/')
                }
              } else {
                GLOBALS.jumpOutsideGame(item.taskUrl)
              }
            }
          }
          if (item.state == 1) {
            GLOBALS.marchSetsPoint(points[flag], {
              task_id: item.idx, task_name: item.taskName
            })
            let {code, data, message} = await getReceiveDayAwards(this.actData.thisDay, item.idx)
            if (code == 200) {
              this.awardsname = data.awardsName
              this.awardType = data.awardsType
              GLOBALS.marchSetsPoint('A_H5PT0290003481', {
                task_id: item.idx, task_name: item.taskName
              })
              this.showAwardPop = true
              this.getActivityInfo()
            } else {
              this.$toast.show({
                message: message
              })
            }
          }
        }
        //福袋
        if (flag == 2) {
          GLOBALS.marchSetsPoint(points[flag])
          this.showOpenBag = false
          let {code, data, message} = await getReceiveGift()
          if (code == 200) {
            this.awardsname = data.awardsName
            this.awardType = data.awardsType
            this.showAwardPop = true
          } else {
            this.$toast.show({
              message: message
            })
          }
        }
      },
      closeAwardPop() {
        this.showAwardPop = false
      },
      async getActivityInfo() {
        let {code, data} = await getActivityInfo()
        if (code == 200) {
          this.actData = data
          this.tabIndex = data.thisDay - 1
          this.showOpenBag = data.giftStatus == 1
          this.currentTasks = data.dayTaskList[data.thisDay - 1] && data.dayTaskList[data.thisDay - 1].taskList;
          !this.countdown.time &&
          this.actData.countdown &&
          GLOBALS.remainingTime(this, this.actData.countdown, this.countdown, true);
        }
      },
      async getPackages() {
        let {code, data} = await getPackages()
        if (code == 200) {
          this.packages = data.mallBizConfigs[0]
        }
      },
      gotopay(item) {
        localStorage.setItem('originDeffer', window.location.href)
        GLOBALS.marchSetsPoint('A_H5PT0290003480', {
          product_pric: item.price,
          product_id: item.bizId,
          product_name: item.name
        })   // H5平台-砸金蛋-获取锤子大浮层-点击任意礼包
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
      move(e) {
        e.preventDefault()
      }
    },
    mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0290', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      this.getActivityInfo()
      this.getPackages()
      this._getRingServerStatus()
    },
    watch: {
      showrulepop(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.move, {passive: false})
        } else {
          document.body.style.overflow = null
          document.removeEventListener('touchmove', this.move, {passive: false})
        }
      },
      showAwardPop(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.move, {passive: false})
        } else {
          document.body.style.overflow = null
          document.removeEventListener('touchmove', this.move, {passive: false})
        }
      },
      showOpenBag(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.move, {passive: false})
        } else {
          document.body.style.overflow = null
          document.removeEventListener('touchmove', this.move, {passive: false})
        }
      },
      shoWBackPop(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.move, {passive: false})
        } else {
          document.body.style.overflow = null
          document.removeEventListener('touchmove', this.move, {passive: false})
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/base.css";

  .returnbags {
    min-height: 100vh;
    background: #260E37;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      width: 100%;
      height: 6.29rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
    }
    .back {
      position: absolute;
      top: .56rem;
      left: .2rem;
      width: .46rem;
      height: .46rem;
      background: url("./images/back.png");
      background-size: 100% 100%;
    }
    .rule {
      position: absolute;
      top: .56rem;
      right: 0;
      width: .84rem;
      height: .46rem;
      background: url("./images/rule.png");
      background-size: 100% 100%;
    }
    .time {
      position: absolute;
      top: 1.75rem;
      left: 2.1rem;
      right: 2.28rem;
      text-align: center;
      font-size: .26rem;
      font-weight: 800;
      color: rgba(213, 255, 247, 1);
    }
    .container {
      padding: 2.58rem .3rem .3rem;
      box-sizing: border-box;
      .extra {
        position: relative;
        width: 100%;
        height: 3.28rem;
        background: url("./images/extra_bg.png");
        background-size: 100% 100%;
        margin-bottom: .2rem;
        padding: .79rem .25rem .29rem;
        box-sizing: border-box;
        &:before {
          content: '完成对应日期全部专属任务即可领取';
          position: absolute;
          left: 2.56rem;
          top: .36rem;
          font-size: .2rem;
          font-weight: bold;
          color: rgba(254, 254, 254, 1);
        }
        display: flex;
        justify-content: space-between;
        .item {
          width: 1.9rem;
          height: 2.2rem;
          background: linear-gradient(0deg, rgba(57, 33, 96, 0.98), rgba(88, 31, 121, 0.98));
          border-radius: .2rem;
          position: relative;
          .day {
            width: .7rem;
            height: .3rem;
            background: rgba(60, 30, 99, 1);
            border-radius: .1rem;
            font-size: .2rem;
            font-weight: bold;
            color: rgba(212, 162, 242, 1);
            text-align: center;
            line-height: .3rem;
            position: absolute;
            top: .11rem;
            left: .13rem;
          }
          img {
            width: 1.2rem;
            height: 1.2rem;
            position: absolute;
            top: .2rem;
            left: 0;
            right: 0;
            margin: auto;
          }
          .btn {
            width: 1.52rem;
            height: .62rem;
            background: url("./images/btn_gray.png");
            background-size: 100% 100%;
            text-align: center;
            line-height: .65rem;
            font-size: .24rem;
            font-weight: bold;
            color: rgba(99, 99, 99, 1);
            position: absolute;
            bottom: .2rem;
            left: 0;
            right: 0;
            margin: auto;
            &.btn1 {
              color: rgba(126, 23, 165, 1);
              background: url("./images/taskbtn1.png");
              background-size: 100% 100%;
            }
            &.btn2 {
              color: rgba(120, 90, 159, 1);
              background: url("./images/taskbtn2.png");
              background-size: 100% 100%;
            }
          }
        }
      }
      .task {
        position: relative;
        width: 100%;
        height: 4.55rem;
        background: url("./images/task_bg.png");
        background-size: 100% 100%;
        margin-bottom: .2rem;
        .tabs {
          display: flex;
          padding-left: .27rem;
          box-sizing: border-box;
          .item {
            width: 1rem;
            height: .66rem;
            background: rgba(62, 25, 107, 1);
            border-radius: 0 0 .1rem .1rem;
            font-size: .2rem;
            font-weight: bold;
            color: rgba(182, 129, 255, 1);
            line-height: .66rem;
            text-align: center;
            &:nth-child(2) {
              margin: 0 .2rem;
            }
            &.selected {
              font-size: .24rem;
              color: rgba(212, 162, 242, 1);
              background: linear-gradient(0deg, rgba(105, 12, 132, 0.98), rgba(91, 31, 173, 0.98));
              color: rgba(212, 162, 242, 1);
            }
          }
        }
        .task_container {
          margin-top: .1rem;
          .item {
            margin: 0 auto .12rem;
            padding: 0 .25rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 6.1rem;
            height: 1.07rem;
            background: rgba(58, 26, 88, 1);
            border-radius: .2rem;
            .task_content {
              .name {
                font-size: .28rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                margin-bottom: .12rem;
              }
              .percent {
                display: flex;
                align-items: center;
                img {
                  width: .3rem;
                  height: .3rem;
                  margin: 0 .04rem 0 .21rem;
                }
                .awradname {
                  font-size: .24rem;
                  font-weight: bold;
                  color: rgba(252, 193, 26, 1);
                }
                .g-percent {
                  width: 2rem;
                  height: .24rem;
                  background: rgba(48, 25, 66, 1);
                  border-radius: 0.08rem;
                  position: relative;
                  text-align: center;
                  line-height: 0.26rem;
                  font-size: 0.2rem;
                  font-weight: bold;
                  color: rgba(212, 162, 242, 1);
                  .g-percent-bg {
                    max-width: 100%;
                    height: 0.24rem;
                    background: rgba(112, 3, 79, 1);
                    border-radius: 0.08rem 0 0 .08rem;
                    position: absolute;
                    left: 0;
                    top: 0;
                    &.full {
                      border-radius: 0.08rem;
                    }
                  }
                  span {
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                  }
                }
              }
            }
            .btn {
              width: 1.52rem;
              height: .62rem;
              background: url("./images/taskbtn0.png");
              background-size: 100% 100%;
              font-size: .24rem;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
              text-align: center;
              line-height: .65rem;
              &.btn1 {
                color: rgba(126, 23, 165, 1);
                background: url("./images/taskbtn1.png");
                background-size: 100% 100%;
              }
              &.btn2 {
                color: rgba(120, 90, 159, 1);
                background: url("./images/taskbtn2.png");
                background-size: 100% 100%;
              }
              &.btn3 {
                color: rgba(99, 99, 99, 1);
                background: url("./images/btn_gray.png");
                background-size: 100% 100%;
              }
            }
          }
        }
      }
      .richbag {
        width: 100%;
        height: 2.74rem;
        background: url("./images/bag_bg.png");
        background-size: 100% 100%;
        padding: .77rem .25rem .3rem;
        box-sizing: border-box;
        .bag_container {
          height: 100%;
          background: linear-gradient(0deg, rgba(57, 33, 96, 0.98), rgba(88, 31, 121, 0.98));
          border-radius: .2rem;
          display: flex;
          padding: 0 .25rem;
          box-sizing: border-box;
          align-items: center;
          justify-content: space-between;
          img {
            width: 1.08rem;
            height: 1.1rem;
          }
          .name {
            font-size: .28rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
          }
          .info {
            margin-top: .17rem;
            font-size: .24rem;
            font-weight: bold;
            color: rgba(252, 193, 26, 1);
            line-height: .3rem;
          }
          .btn {
            width: 1.52rem;
            height: .62rem;
            background: url("./images/taskbtn0.png");
            background-size: 100% 100%;
            font-size: .24rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: .62rem;
            &.buyed {
              color: rgba(120, 90, 159, 1);
              background: url("./images/taskbtn2.png");
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
</style>
