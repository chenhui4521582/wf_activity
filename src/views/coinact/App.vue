<template>
  <section class="coinact" v-if="actInfo">
    <div class="coin-click" style="height: 5.4rem">
      <img src="./images/back.png" alt="" class="back" @click="back">
      <img src="./images/rule.png" alt="" class="rule" @click="showPop(1)">
      <img src="./images/canGain.png" class="gain" alt="" @click="gain(0,null)"
           v-if="[...actInfo.leftProgressList,...actInfo.rightProgressList].filter(item=>item.awardsState==1).length">
      <img src="./images/unGain.png" class="gain" alt="" v-else>
      <div class="time">活动时间:{{actInfo.timeline}}</div>
      <div class="total_gain">
        <div class="item">累计获得：<i>{{actInfo.userCoinNum}}/{{actInfo.nextConsume}}金币</i></div>
        <div class="item">每支持10000金叶=1个金币（部分游戏不计入）</div>
      </div>
      <div class="coin_stage">
        <template v-if="actInfo.nextStage">
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
        <div class="item" v-for="item in actInfo.leftProgressList"
             :class="{gray:item.awardsState==2,complete:item.awardsState==0,receive:item.awardsState==1}">
          <div class="price">{{item.awardsNum*0.1}}元</div>
          <div class="status" @click="gain(1,item)">{{status[item.awardsState]}}</div>
        </div>
      </div>
      <div class="coin_percent">
        <div class="item" v-for="(item,index) in actInfo.leftProgressList" :class="{gray:item.awardsState==0}">
          <span>{{index+1}}</span>
        </div>
        <div class="percent_box" v-if="actInfo.leftProgressList.length>1">
          <div class="percent_progress" style="max-height: 100%"
               :style="{height:(actInfo.leftProgressList.filter(item=>item.awardsState>0).length/(actInfo.leftProgressList.length-1))*100+'%'}"></div>
        </div>
      </div>
      <div class="coin_right">
        <div class="item" v-for="item in actInfo.rightProgressList"
             :class="{gray:item.awardsState==2,complete:item.awardsState==0,receive:item.awardsState==1}">
          <div class="price">{{item.awardsNum*0.1}}元</div>
          <div class="status" @click="gain(2,item)">{{status[item.awardsState]}}</div>
        </div>
        <div class="pop" v-if="actInfo.bagLock&&mallBizConfigs.length">
          <img src="./images/text.png" alt="">
          <span>解锁挑战奖励翻倍</span>
          <div class="award">
            <img src="./images/compop/jyz.png" alt="">
            <div class="award_name">{{mallBizConfigs[0].content}}</div>
          </div>
          <div class="btn" @click="gotopay(mallBizConfigs[0])">{{mallBizConfigs[0].price}}元解锁</div>
        </div>
      </div>
    </div>
    <com-pop :popType="popType" ref="comPop" :actInfo="actInfo" :awardData="awardData" @close="closePop"></com-pop>
  </section>
</template>

<script>
  import {getActInfo, receiveAll, receivePrize, getPackages} from './utils/api'

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
        mallBizConfigs: []
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
          //锁定
          if (this.actInfo.bagLock) {
            this.getShowLeaguePacksList()
          }
          //金币新增
          if (this.actInfo.incrCoinNum) {
            setTimeout(() => {
              this.awardData = {
                awardsName: this.actInfo.incrCoinNum + '金币',
                awardsType: 'jinbi',
                bagPopup: this.actInfo.bagPopup,
                awardsNum: this.actInfo.incrCoinNum
              }
              this.showPop(3)
            }, 1000)
          } else if (this.actInfo.bagPopup) {//购买礼包成功
            setTimeout(() => {
              this.showPop(2)
            }, 1000)
          }
        }
      },
      gotopay(item) {
        localStorage.setItem('originDeffer', window.location.href)
        GLOBALS.marchSetsPoint('A_H5PT0277003315', {
          recharge_rmb: item.price,
          product_id: item.bizId,
          awards_name: item.name,
          product_name: item.name
        })   // H5平台-超级大赢家活动-礼包点击
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
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
          points[type] && GLOBALS.marchSetsPoint(points[type])
          if (this.awardData) {
            GLOBALS.marchSetsPoint(this.awardData.awardType == 'jinbi' ? 'A_H5PT0310003857' : 'A_H5PT0310003855', {
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
      async getShowLeaguePacksList() {
        const {code, data} = await getPackages(this.actInfo.bagBatchId)
        if (code === 200) {
          this.mallBizConfigs = data.mallBizConfigs
        }
      },
      closePop(data) {
        this.popType = 0
        if (data && data.bagPopup) {
          this.showPop(2)
        }
        this.awardData = null
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
      position: fixed;
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
            position: relative;
            img {
              width: 1.27rem;
              height: 1.27rem;
            }
            .award_name {
              position: absolute;
              left: -.16rem;
              right:-.16rem;
              bottom: 0;
              font-size: .26rem;
              font-weight: bold;
              color: rgba(254, 239, 110, 1);
              text-align: center;
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
