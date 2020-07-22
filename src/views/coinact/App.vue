<template>
  <section class="coinact">
    <div class="coin-click" style="height: 5.4rem">
      <img src="./images/back.png" alt="" class="back" @click="back">
      <img src="./images/rule.png" alt="" class="rule" @click="showPop(1)">
      <img src="./images/canGain.png" class="gain" alt="" @click="gain" v-if="list.filter(item=>item.status==1).length">
      <img src="./images/unGain.png" class="gain" alt="" @click="gain" v-else>
      <div class="time">活动时间:{{actInfo.timeline}}</div>
      <div class="total_gain">
        <div class="item">累计获得：<i>{{actInfo.userBetting}}/{{actInfo.userCoinNum}}金币</i></div>
        <div class="item">每支持10000金叶=1个金币（部分游戏不计入）</div>
      </div>
      <div class="coin_stage">
        <template v-if="!actInfo.nextStage">
          <div class="item">{{actInfo.nextStage}}</div>
          <div class="item">下一达成阶段</div>
        </template>
        <template v-else>
          <div class="item" style="font-size: .24rem">已完成</div>
          <div class="item" style="font-size: .24rem;color: #fff;font-weight: bold;">全部阶段</div>
        </template>
      </div>
    </div>
    <div class="coin_list">
      <div class="coin_left">
        <div class="item" v-for="item in list"
             :class="{gray:item.status==2,complete:item.status==0,receive:item.status==1}">
          <div class="price">{{item.price}}元</div>
          <div class="status" @click="gain(item)">{{status[item.status]}}</div>
        </div>
      </div>
      <div class="coin_percent">
        <div class="item" v-for="(item,index) in list" :class="{gray:item.status==0}">
          <span>{{index+1}}</span>
        </div>
        <div class="percent_box" v-if="list.length>1">
          <div class="percent_progress" style="max-height: 100%"
               :style="{height:(list.filter(item=>item.status>0).length/(list.length-1))*100+'%'}"></div>
        </div>
      </div>
      <div class="coin_right">
        <div class="item" v-for="item in list"
             :class="{gray:item.status==2,complete:item.status==0,receive:item.status==1}">
          <div class="price">{{item.price}}元</div>
          <div class="status" @click="gain(item)">{{status[item.status]}}</div>
        </div>
        <div class="pop">
          <img src="./images/text.png" alt="">
          <span>解锁挑战奖励翻倍</span>
          <div class="award">
            <img src="./images/compop/jyz.png" alt="">
            <div class="award_name">立得10000金叶</div>
          </div>
          <div class="btn" @click="gotopay">100元解锁</div>
        </div>
      </div>
    </div>
    <com-pop :popType="popType" ref="comPop" :awardData="awardData" @close="popType=0"></com-pop>
  </section>
</template>

<script>
  import {getActInfo, receiveAll, receiveExtend, receiveNormal, getPackages} from './utils/api'

  export default {
    name: 'coinact',
    components: {
      comPop: () => import('./components/comPop')
    },
    data() {
      return {
        popType: 0,
        actInfo: null,
        packages: [],
        countdown: {
          time: ''
        },
        awardData: null,
        status: ["去完成", "未领取", "已领取"],
        list: [{
          price: 1,
          status: 1
        }, {
          price: 11,
          status: 1
        }]
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
          if (this.actInfo.popup) {
            let packageBag = this.packages.filter(item => item.bizId == this.actInfo.bizId)[0]
            if (packageBag) {
              this.awardData = {
                name: packageBag.name,
                content: packageBag.content,
                productIcon: packageBag.productIcon,
                isCat: this.packages.length >= 4 && this.packages.slice(-1)[0].bizId == this.actInfo.bizId
              }
              setTimeout(() => {
                this.showPop(2)
              }, 1000)
            }
          }
          !this.countdown.time && this.actInfo.countdown && GLOBALS.remainingTime(
            this,
            this.actInfo.countdown,
            this.countdown,
            true
          )
        }
      },
      gotopay() {
        location.href = '//wap.beeplaying.com/xmWap/#/payment/'
      },
      //弹窗
      showPop(type) {
        this.popType = type
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      gain(item) {
        this.showPop(3)
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
    background: url("./images/bgline.png");
    background-size: 100% 2.36rem;
    border-bottom: .3rem solid #FFEFDE;
    box-sizing: border-box;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5.33rem;
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
      position: absolute;
      top: 5.37rem;
      left: 0;
      width: 1.07rem;
      height: .68rem;
      z-index: 2;
    }
    .total_gain {
      position: absolute;
      top: 4.25rem;
      height: 1rem;
      left: .5rem;
      width: 4.3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1;
      .item {
        font-size: .18rem;
        font-weight: 400;
        color: rgba(160, 83, 13, 1);
        text-align: center;
        &:nth-child(1) {
          font-size: .32rem;
          font-weight: bold;
          color: rgba(156, 47, 13, 1);
          margin-bottom: .15rem;
          i {
            color: rgba(255, 0, 0, 1);
          }
        }
      }
    }
    .coin_stage {
      position: absolute;
      top: 4.25rem;
      height: 1rem;
      right: .5rem;
      width: 1.71rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1;
      .item {
        font-size: .18rem;
        font-weight: 400;
        color: rgba(232, 198, 255, 1);
        text-align: center;
        &:nth-child(1) {
          font-size: .48rem;
          font-weight: bold;
          color: rgba(255, 253, 250, 1);
          margin-bottom: .13rem;
          line-height: 1;
        }
      }
    }
    .coin_list {
      display: flex;
      justify-content: space-around;
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      padding-bottom: .2rem;
      .coin_left {
        .item {
          width: 2.41rem;
          height: 1.39rem;
          background: url("./images/left.png");
          background-size: 100% 100%;
          font-size: .36rem;
          font-weight: bold;
          color: rgba(254, 240, 91, 1);
          padding-left: 1rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: .34rem;
          &:nth-child(1) {
            margin-top: 0;
          }
          .status {
            margin-top: .17rem;
            width: 1.04rem;
            height: .44rem;
            line-height: .44rem;
            text-align: center;
            background: rgba(110, 26, 173, 1);
            border-radius: .22rem;
            font-size: .24rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          &.receive {
            .status {
              background: rgba(255, 240, 225, 1);
              color: rgba(207, 54, 54, 1);
            }
          }
          &.gray {
            background: url("./images/l_gray.png");
            background-size: 100% 100%;
            color: rgba(232, 232, 232, 1);
            .status {
              background: rgba(110, 108, 108, 1);
            }
          }
        }
      }
      .coin_percent {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        .item {
          height: 1.39rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: .34rem;
          position: relative;
          z-index: 1;
          &:nth-child(1) {
            margin-top: 0;
          }
          span {
            width: .9rem;
            height: .88rem;
            text-align: center;
            line-height: .88rem;
            background: url("./images/round.png");
            background-size: 100% 100%;
            font-size: .36rem;
            font-weight: bold;
            color: rgba(247, 219, 191, 1);
          }
          &.gray {
            span {
              color: rgba(167, 93, 26, 1);
              background: url("./images/round_gray.png");
              background-size: 100% 100%;
            }
          }
        }
        .percent_box {
          width: .17rem;
          position: absolute;
          top: .3rem;
          left: 0;
          right: 0;
          bottom: .3rem;
          margin: auto;
          background: #F8ECF0;
          .percent_progress {
            background: #A95C16;
          }
        }
      }
      .coin_right {
        position: relative;
        .item {
          width: 2.41rem;
          height: 1.39rem;
          background: url("./images/right.png");
          background-size: 100% 100%;
          font-size: .36rem;
          font-weight: bold;
          color: rgba(254, 240, 91, 1);
          padding-right: 1rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: .34rem;
          &:nth-child(1) {
            margin-top: 0;
          }
          .status {
            margin-top: .17rem;
            width: 1.04rem;
            height: .44rem;
            line-height: .44rem;
            text-align: center;
            background: rgba(110, 26, 173, 1);
            border-radius: .22rem;
            font-size: .24rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          &.receive {
            .status {
              background: rgba(255, 240, 225, 1);
              color: rgba(207, 54, 54, 1);
            }
          }
          &.gray {
            background: url("./images/r_gray.png");
            background-size: 100% 100%;
            color: rgba(232, 232, 232, 1);
            .status {
              background: rgba(110, 108, 108, 1);
            }
          }
        }
        .pop {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          min-height: 4.5rem;
          background: rgba(0, 0, 0, 0.63);
          border-radius: .1rem;
          padding-top: .53rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 1.44rem;
            height: .37rem;
          }
          span {
            margin: .1rem 0 .04rem;
            font-size: .24rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .award {
            margin-bottom: .24rem;
            width: 2.08rem;
            height: 2.1rem;
            background: url("./images/light.png");
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding-top: .4rem;
            box-sizing: border-box;
            img {
              width: 1.27rem;
              height: 1.27rem;
            }
            .award_name {
              font-size: .26rem;
              font-weight: bold;
              color: rgba(254, 239, 110, 1);
            }
          }
          .btn {
            width: 1.64rem;
            height: .6rem;
            line-height: .6rem;
            background: rgba(156, 63, 219, 1);
            border-radius: .3rem;
            font-size: .24rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            margin-bottom: .2rem;
          }
        }
      }
    }
  }
</style>
