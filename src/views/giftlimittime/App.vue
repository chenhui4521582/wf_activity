<template>
  <section class="coinact" v-if="actInfo">
    <div class="coin-click">
      <img src="./images/back.png" alt="" class="back" @click="back">
      <img src="./images/rule.png" alt="" class="rule" @click="showPop(1)">
      <div class="time">{{actInfo.ruleDate}}最低{{actInfo.ruleMaxDiscount}}折</div>
      <div class="horn_container" v-if="hornList.length">
        <horn :noticeList="hornList"></horn>
      </div>
    </div>
    <div class="gift_container">
      <div class="time_container">
        <div class="time_container_container">
          <div class="time_more">
            <div class="item" v-for="(item,index) in actInfo.timelineList"
                 :class="{last:index==actInfo.timelineList.length-1}" @click="showTips(item.state)">
              <div class="img_bg" :class="{end:item.state==2,selected:item.state==1}"
                   v-html="item.state==3?'敬请期待...':item.name.replace('日',`日<br>`)"></div>
              <div class="state" :class="{end:item.state==2,selected:item.state==1}">
                <template v-if="item.state==1">
                  {{countdown.time}}
                </template>
                <template v-else>
                  {{status[item.state]}}
                </template>
              </div>
            </div>
          </div>
          <div class="percent"
               :style="{width:(1.3*actInfo.timelineList.length+0.4*(actInfo.timelineList.length-1))+'rem'}"
               v-if="actInfo.timelineList.length>1">
            <div class="percent_bar"
                 :style="{width:(actInfo.timelineList[actInfo.timelineList.length-1].state==2?1:(currentIndex/(actInfo.timelineList.length-1)))*100+'%'}"></div>
          </div>
        </div>
      </div>
      <div class="task_container">
        <div class="item" v-for="(item,index) in actInfo.welfareList" :class="{last:index==actInfo.welfareList.length-1}">
          <div class="left">
            <div class="img_bg">
              <img src="./images/pic0.png" alt="">
            </div>
            <div class="num">{{item.amount}}</div>
          </div>
          <div class="middle">
            <div class="img_bg">
              <img src="./images/leaf.png" alt="">
            </div>
            <div class="num">{{item.awardsList[0].awardsNum}}</div>
          </div>
          <div class="right">
            <div class="price">{{item.price}}元 <i>{{item.content}}</i></div>
            <div class="btn" :class="{gray:item.buyFlag==0||item.buyStatus==2}" @click="gotopay(item)"></div>
            <div class="surplus">剩余数量： <i>{{item.totalNum}}</i></div>
          </div>
          <div class="corner">
            {{item.discount}}折
          </div>
        </div>
      </div>
    </div>
    <com-pop :popType="popType" ref="comPop" :actInfo="actInfo"></com-pop>
  </section>
</template>

<script>
  import {getActInfo, getNoticeList} from './utils/api'

  export default {
    name: 'coinact',
    components: {
      comPop: () => import('./components/comPop'),
      horn: () => import('./components/horn')
    },
    data() {
      return {
        popType: 0,
        actInfo: null,
        status: ["即将开启", "", "已结束", ''],
        hornList: [],
        countdown: {
          time: ''
        },
        currentIndex: 0
      }
    },
    async mounted() {
      await this.getActInfo()
      GLOBALS.marchSetsPoint('P_H5PT0327', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
    },
    methods: {
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0327004071')
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      async getActInfo() {
        let {code, data} = await getActInfo()
        if (code == 200) {
          this.actInfo = data
          let timeData = data.timelineList.filter(item => item.state == 1)[0]
          if (timeData) {
            this.currentIndex = data.timelineList.findIndex(item => item.state == 1)
            !this.countdown.time && timeData.countdown && GLOBALS.remainingTime(
              this,
              timeData.countdown,
              this.countdown
            )
          } else {
            this.currentIndex = 0
          }
          this.getNoticeList()
        }
      },
      gotopay(item) {
        if (item.buyFlag == 0 || item.buyStatus == 2) {
          return
        }
        localStorage.setItem('originDeffer', window.location.href)
        GLOBALS.marchSetsPoint('A_H5PT0327004073', {
          product_price: item.price,
          product_id: item.bizId,
          product_name: item.name
        })
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
      //弹窗
      showPop(type) {
        this.popType = type
        if (type == 1) {//规则点击
          GLOBALS.marchSetsPoint('A_H5PT0327004072')
        }
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      async getNoticeList() {
        let {code, data} = await getNoticeList()
        if (code == 200) {
          this.hornList = data
        }
      },
      showTips(state){
        this.status[state]&&this.$toast.show({
          message:`波次${this.status[state]}`,
          duration:1000
        })
      }
    },
    watch: {
      'countdown.time': function (val) {
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
    background: linear-gradient(0deg, #00246E 0%, #0A256E 100%);
    padding: 4.36rem 0 .29rem;
    box-sizing: border-box;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4.29rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
    }
    .time {
      position: absolute;
      top: 2.5rem;
      left: 0;
      right: 0;
      z-index: 2;
      text-align: center;
      font-size: .26rem;
      font-weight: bold;
      color: #FFFFFF;
      z-index: 1;
    }
    .back, .rule {
      position: absolute;
      top: .2rem;
      width: .76rem;
      height: .42rem;
      z-index: 2;
      &.back {
        left: 0;
      }
      &.rule {
        right: 0;
      }
    }
    .horn_container {
      position: absolute;
      top: 3.18rem;
      left: 0;
      right: 0;
      margin: auto;
      width: 4.83rem;
      height: 1.23rem;
      background: url("./images/horn.png");
      background-size: 100% 100%;
      z-index: 1;
      padding: .08rem .5rem .35rem;
      box-sizing: border-box;
    }
    .gift_container {
      padding: 0 .14rem;
      box-sizing: border-box;
      .time_container {
        width: 100%;
        height: 2.28rem;
        background: url("./images/timebg.png");
        background-size: 100% 100%;
        margin-bottom: .18rem;
        overflow: hidden;
        position: relative;
        .time_container_container {
          height: 100%;
          position: absolute;
          left: .26rem;
          right: .26rem;
          .time_more {
            height: 100%;
            display: flex;
            align-items: center;
            position: absolute;
            z-index: 1;
            .item {
              .img_bg {
                width: 1.3rem;
                height: 1.1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: .24rem;
                font-weight: bold;
                color: #94650F;
                background: #EDE0CE;
                border-radius: .2rem;
                line-height: .36rem;
                text-align: center;
                &.end {
                  background: #780307;
                  color: #DE777B;
                }
                &.selected {
                  background: url("./images/selected.png");
                  background-size: 100% 100%;
                }
              }
              .state {
                margin-top: .23rem;
                font-size: .24rem;
                height: .24rem;
                font-weight: bold;
                color: #780307;
                opacity: 0.6;
                text-align: center;
                &.end {
                  opacity: 1;
                }
                &.selected {
                  opacity: 1;
                  color: #FEE94C;
                }
              }
              &:not(.last) {
                margin-right: .4rem
              }
            }
          }
          .percent {
            width: 100%;
            height: .2rem;
            background: #780307;
            opacity: 0.3;
            position: absolute;
            top: .85rem;
            display: flex;
            align-items: center;
            .percent_bar {
              height: .1rem;
              background: linear-gradient(90deg, #FEEE9A 0%, #F8BF51 100%);
            }
          }
        }
      }
      .task_container {
        .item {
          width: 100%;
          height: 1.98rem;
          background: url("./images/taskbg.png");
          background-size: 100% 100%;
          padding: 0 .35rem 0 .53rem;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          &:not(.last){
            margin-bottom: .15rem;
          }
          .img_bg {
            width: 1.3rem;
            height: 1.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .num {
            text-align: center;
            font-size: .24rem;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 1;
          }
          .left {
            .img_bg {
              background: #06246E;
              border-radius: 50%;
              margin-bottom: .04rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .middle {
            .img_bg {
              position: relative;
              padding-top: .2rem;
              box-sizing: border-box;
              img {
                width: .85rem;
                height: .64rem;
              }
              &:before {
                content: '';
                position: absolute;
                top: .07rem;
                left: 0;
                width: .63rem;
                height: .63rem;
                background: url("./images/plus.png");
                background-size: 100% 100%;
              }
            }
          }
          .right {
            line-height: 1;
            .price {
              font-size: .24rem;
              font-weight: 500;
              color: #F6FF00;
              text-align: center;
              margin-bottom: .14rem;
              i {
                margin-left: .2rem;
                font-size: .18rem;
                font-weight: 500;
                text-decoration: line-through;
                color: rgba(255, 255, 255, .7);
              }
            }
            .btn {
              width: 1.9rem;
              height: .54rem;
              background: url("./images/pay_btn.png");
              background-size: 100% 100%;
              margin: 0 auto .15rem;
              &.gray {
                background: url("./images/pay_btn_gray.png");
                background-size: 100% 100%;
                position: relative;
                &:before {
                  content: '立即抢购';
                  position: absolute;
                  left: 0;
                  right: 0;
                  top: 0;
                  bottom: 0;
                  margin: auto;
                  font-size: .24rem;
                  font-weight: 500;
                  color: #474444;
                  text-align: center;
                  line-height: .54rem;
                }
              }
            }
            .surplus {
              font-size: .2rem;
              font-weight: 500;
              color: #FFFFFF;
              text-align: center;
              i {
                color: #6BF9FE;
              }
            }
          }
          .corner {
            position: absolute;
            top: .2rem;
            left: -.05rem;
            width: .78rem;
            height: .51rem;
            background: url("./images/corner.png");
            background-size: 100% 100%;
            font-size: .22rem;
            font-weight: 500;
            color: #FFFFFF;
            padding-bottom: .1rem;
            padding-right: .1rem;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
</style>
