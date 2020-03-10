<template>
  <div class="catvip" :class="{end:isEnd,showDown:$refs.dropDown&&$refs.dropDown.isDropDown}" v-if="actInfoData">
    <template v-if="!isEnd">
      <div class="catvip_container">
        <div class="clickIcons">
          <div class="item">
            <div class="back" @click="back">返回</div>
            <div class="rule" @click="showPop(7)">规则</div>
          </div>
        </div>
        <div class="catvip_countdown" v-if="actInfoData.state==1">
          剩余
          <div class="countdown_item" v-for="item in countTime.split('')">
            <i v-if="!['时','分','秒'].includes(item)">{{item}}</i>
            <template v-else>{{item}}</template>
          </div>
        </div>
        <div class="catvip_yiyuan">
          <div class="list">
            <div class="item" v-for="item in actInfoData.awardsConfigList">
              <img :src="item.awardsImage|filter" alt="">
              <div class="info">
                <div>{{item.awardsName}}</div>
                <div v-if="item.awardsType==1">金叶子</div>
                <div v-else-if="item.awardsType==32">优惠券</div>
                <div v-else-if="item.awardsType==10">话费券</div>
              </div>
            </div>
          </div>
          <div class="horn">
            <img src="./imgs/laba.png" alt="">
            <horn :horn-list="hornList" v-if="hornList.length"></horn>
          </div>
          <div class="pay_btn" :class="{gray:actInfoData.lottery==2}" @click="preheat(lottery)">
            <template v-if="actInfoData.lottery==0">
              支付1元抽奖<br><i v-if="actInfoData.lotteryNum>=200">{{actInfoData.lotteryNum}}人已抽奖</i>
            </template>
            <template v-else-if="actInfoData.lottery==1">
              立即开奖
            </template>
            <template v-else>
              已参与
            </template>
          </div>
        </div>
      </div>
      <div class="exchangeLeaf">
        <div class="title"></div>
        <div class="list">
          <div class="list-item" v-for="item in actInfoData.leafConvertConfigList" @click="preheat(()=>exchangeLeaf(item))">
            <div class="left">
              <div class="item">
                <img src="./imgs/hfq.png" alt="">
                <div>{{item.hfqName}}</div>
              </div>
              <div class="item">
                <div class="shape"></div>
                <div>兑换</div>
              </div>
              <div class="item">
                <img src="./imgs/packagepic.png" alt="">
                <div>{{item.leafs}}金叶子</div>
              </div>
            </div>
            <div class="right" :class="{gray:item.purchased>=item.limit}">
              <div>立即<br>兑换</div>
              <div>限购 {{item.purchased>item.limit?item.limit:item.purchased}}/{{item.limit}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="taskgainmaobi">
        <div class="title"></div>
        <div class="whatmaobi" @click="showPop(2)">猫币是什么>></div>
        <div class="list">
          <div class="item" v-for="item in actInfoData.taskConfigList">
            <img :src="item.image|filter" alt="">
            <div class="info">
              <div class="info_title">{{item.taskName}}</div>
              <div class="info_content">
                <div class="percent" :class="{full:item.status}"></div>
                <div class="awardsname">{{item.awardsName}}</div>
              </div>
            </div>
            <!--奖励状态 1：未完成，2：待领取，3：已领取 ,-->
            <div class="btn" :class="{gain:item.status==1,gained:item.status==2}" @click="preheat(()=>dotask(item))"></div>
          </div>
        </div>
      </div>
      <drop-down ref="dropDown" :toDayUserCouponNum="actInfoData.toDayUserCouponNum" :rules-explain="rulesExplain"
                 @refresh="getActInfo" :countTime="countTime" :endDate="actInfoData.endDate"
                 @showPop="showPop" :myInfo="myInfo" @handleTab="outHandleTab"></drop-down>
    </template>
    <template v-else>
      <div class="clickIcons">
        <div class="back" @click="back">返回</div>
        <div class="rule" @click="showPop(7)">规则</div>
      </div>
      <profit :is-full="true" @showPop="showPop"/>
    </template>
    <!--popType-->
    <com-pop :pop-type="popType" :award-data="awardData" ref="comPop" :countTime="countTime" :leafItem="leafItem"
             @exchange="exchange"
             @opengame="showPop(5)" :actInfoData="actInfoData"></com-pop>
    <loading v-if="showLoading"></loading>
  </div>
</template>

<script>
  /* eslint-disable */
  import '../../common/js/window.js';
  import {
    activityInfo,
    userAwardsTips,
    couponAwardReceive,
    getNoticeList,
    exchangeLeaf,
    taskGain,
    rankList,
    yiyuanlottery,
    getPackages
  } from './utils/api'
  import Loading from "../../components/common/loading";

  export default {
    name: 'App',
    data() {
      return {
        countTime: '',//瓜分倒计时
        rulesExplain: '',//活动时间段
        isEnd: false,//是否活动结束
        popType: 0,//窗口类型 0 领取昨日瓜分券奖励 1 活动规则 2 瓜分记录 3 瓜分攻略 4 大家都在玩 5 开榜 6 任务流水领取弹窗
        awardData: null,//弹窗奖励
        isHasGift: false,//是否有昨日未领取的奖励
        awardList: [],//开榜奖品
        myRank: 0,//我的发榜排名
        actInfoData: null,//活动信息数据
        hornList: [],
        leafItem: null,
        showLoading: false,
        myInfo: null,
        packageInfo: []
      }
    },
    components: {
      Loading,
      dropDown: () => import('./dropDown'),//副页
      profit: () => import('./component/profit'),//排行榜
      comPop: () => import('./component/comPop'),//弹窗
      horn: () => import('./component/horn')//弹窗
    },
    methods: {
      getCountInfo(dateinfo) {
        let day = Math.floor(dateinfo / 86400)
        let hour = Math.floor(parseInt(dateinfo / 60 / 60) % 24)
        let minute = Math.floor(parseInt(dateinfo / 60) % 60)
        let second = Math.floor(dateinfo % 60)
        // let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        return {
          day, countHour, countMinute, countSecond
        }
      },
      //倒计时
      countDown(item) {
        if (!item) return false
        let date = item / 1000
        let {day, countHour, countMinute, countSecond} = this.getCountInfo(date)
        this.countTime = `${countHour}时${countMinute}分${countSecond}秒`
        this.timer = setInterval(() => {
          date = date - 1
          if (date <= 0) {
            date = 0
            clearInterval(this.timer)
            this.countTime = ''
            return
          }
          let day = Math.floor(date / 86400)
          let hour = Math.floor(parseInt(date / 60 / 60) % 24)
          let minute = Math.floor(parseInt(date / 60) % 60)
          let second = Math.floor(date % 60)
          // let countDay = day >= 10 ? day : '0' + day
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          if (day > 0) {
            this.countTime = `${day}天${countHour}时${countMinute}分${countSecond}秒`
          } else {
            this.countTime = `${countHour}时${countMinute}分${countSecond}秒`
          }
        }, 1000)
      },
      //返回
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0252002981')   // 点击返回
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      //弹窗
      showPop(type) {
        this.popType = type
        let point = ''
        switch (type) {
          case 7:
            point = 'A_H5PT0252002982';
            break;//规则点击
          case 2:
            point='A_H5PT0252002994';
            break;//猫币介绍
        }
        point && GLOBALS.marchSetsPoint(point)
        if ([0].includes(type)) {
          setTimeout(() => {
            this.$refs.comPop.showPop()
          }, 1000)
        } else {
          type==2&&GLOBALS.marchSetsPoint('A_H5PT0252002997')
          setTimeout(() => {
            this.$refs.comPop.showPop()
          })
        }
      },
      //开榜弹窗点击领取昨日奖励
      async getYesterDayGift() {
        let {code, data} = await userAwardsTips()
        if (code == 200) {
          this.isHasGift = !!data.award
          if (this.isHasGift) {
            this.awardData = {
              award: data.award,
              couponNum: data.couponNum
            }
            this.popType = 0
            setTimeout(() => {
              this.$refs.comPop.showPop()
            })
          }
        }
      },
      //活动信息
      async getActInfo(flag) {
        let {code, data} = await activityInfo()
        if (code == 200) {
          this.actInfoData = data
          if (data.state == 1 || data.state == 0) {
            this.isEnd = false
            this.rulesExplain = data.beginDate + '~' + data.endDate
            this.countDown(data.countdown)
            flag && data.state == 1 && this.getHornList()
            flag&&this.preheat(() => {
              this.getRankList();
              this.getPackageData();
            }, 1000)
          } else {
            this.isEnd = true
          }
          flag && GLOBALS.marchSetsPoint('P_H5PT0252', {
            source_address: GLOBALS.getUrlParam('from') || ''
          })
        }
      },
      //昨日瓜分奖励领取
      async getCouponAward() {
        let {code, message} = await couponAwardReceive()
        if (code == 200) {
          this.$toast.show({
            message: '领取成功',
            duration: 1000
          })
        } else {
          this.$toast.show({
            message: message,
            duration: 1000
          })
        }
        this.$refs.comPop.close()
      },
      exchangeLeaf(item) {
        if (item.purchased < item.limit) {
          GLOBALS.marchSetsPoint('A_H5PT0252002987',{
            awards_id:item.level,
            awards_name:item.hfqName+'兑换'+item.leafName
          })
          this.leafItem = item
          GLOBALS.marchSetsPoint(item.convert?'A_H5PT0252002988':'A_H5PT0252002990',{
            awards_id:item.level,
            awards_name:item.hfqName+'兑换'+item.leafName
          })
          this.showPop(6)
        }
      },
      async getHornList() {
        let {code, data} = await getNoticeList()
        if (code == 200) {
          this.hornList = data
        }
      },
      async exchange(item) {//exchangeLeaf
        GLOBALS.marchSetsPoint('A_H5PT0252002989')
        this.showLoading = true
        let {code, data,message} = await exchangeLeaf(item.level)
        if (code == 200) {
          this.awardData = {
            type: 'jyz',
            awardsName: data.amount + '金叶子',
            info: `可至“我的-资产”查看`,
            popType:1
          }
          GLOBALS.marchSetsPoint('A_H5PT0252002992')
          this.showPop(3)
          this.getActInfo(false)
          this.showLoading = false
        } else {
          this.$toast.show({
            message: message,
            duration: 1000
          })
          this.showLoading = false
        }
      },
      async dotask(item) {
        //去完成
        if (item.status == 0) {
          GLOBALS.marchSetsPoint('A_H5PT0252002995',{
            task_id:item.taskId,
            task_name:item.taskName
          })
          GLOBALS.jumpOutsideGame(item.url)
        }
        //去领取
        if (item.status == 1) {
          GLOBALS.marchSetsPoint('A_H5PT0252002996',{
            task_id:item.taskId,
            task_name:item.taskName
          })
          this.showLoading = true
          let {code, data,message} = await taskGain(item.taskId)
          if (code == 200) {
            this.awardData = {
              type: data.type,
              awardsName: awardsName,
              info: `可至招财猫查看`,
              popType:2
            }
            GLOBALS.marchSetsPoint(data.type=='mb'?'A_H5PT0252002999':'A_H5PT0252002998')
            this.showPop(3)
            this.getActInfo(false)
            this.showLoading = false
          } else {
            this.$toast.show({
              message: message,
              duration: 1000
            })
            this.showLoading = false
          }
        }
      },
      async getRankList() {
        const {code, data} = await rankList()
        if (code === 200) {
          this.myInfo = data.userInfo
        }
      },
      //一元抽奖
      async lottery() {
        console.log(this.actInfoData.lottery)
        if (this.actInfoData.lottery == 0) {
          localStorage.setItem('originDeffer', window.location.href)
          GLOBALS.marchSetsPoint('A_H5PT0252002983')   // 点击任意礼包
          localStorage.setItem('JDD_PARAM', JSON.stringify(this.packageInfo))
          localStorage.setItem('payment', JSON.stringify(this.packageInfo))
          location.href =
            'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
        }
        if (this.actInfoData.lottery == 1) {
          GLOBALS.marchSetsPoint('A_H5PT0252002984')
          this.showLoading = true
          let {code, data,message} = await yiyuanlottery()
          if (code == 200) {
            this.awardData = {
              awardsImg: data.awardsImg,
              awardsName: data.awardsName,
              info: `奖励已发放，可至“我的”查看`,
              popType:0
            }
            GLOBALS.marchSetsPoint('A_H5PT0252002985')
            this.showPop(3)
            this.getActInfo(false)
            this.showLoading = false
          } else {
            this.$toast.show({
              message: message,
              duration: 1000
            })
            this.showLoading = false
          }
        }
      },
      preheat(dosth, ms = 0) {//预热
        if (this.actInfoData.state == 0 || (this.actInfoData.state == 1 && (!this.actInfoData.catStatus || this.actInfoData.catLevel < 20))) {
          this.actInfoData.state == 0&&GLOBALS.marchSetsPoint('A_H5PT0252002976')   // H5平台-招财猫会员日-预热阶段提示弹窗加载完成
          this.actInfoData.state == 1&&!this.actInfoData.catStatus&&GLOBALS.marchSetsPoint('A_H5PT0252002977')   // H5平台-招财猫会员日-未领猫提示弹窗加载完成
          this.actInfoData.state == 1&&this.actInfoData.catStatus&&this.actInfoData.catLevel < 20&&GLOBALS.marchSetsPoint('A_H5PT0252002979')   // H5平台-招财猫会员日-未领猫提示弹窗加载完成
          setTimeout(() => {
            this.showPop(4)
          }, ms)
        } else {
          dosth()
        }
      },
      outHandleTab(idx) {
        if (this.actInfoData.state == 0 || (this.actInfoData.state == 1 && (!this.actInfoData.catStatus || this.actInfoData.catLevel < 20))) {
          this.showPop(4)
        } else {
          this.preheat(this.$refs.dropDown.handleTab(idx))
        }
      },
      async getPackageData() {
        const {code, data} = await getPackages(235)
        if (code === 200) {
          this.packageInfo = data && data.mallBizConfigs && data.mallBizConfigs.length > 0 && data.mallBizConfigs[0]
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.getActInfo(true)
      })
    },
    watch: {
      countTime(val) {
        if (!val) {
          this.getActInfo(true)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/css/base.css';

  .catvip {
    background: #ECD9C2;
    /*height: 100vh;*/
    position: relative;
    padding-bottom: 1.37rem;
    &.showDown {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
    }
    &.end {
      height: 100vh;
      background: rgb(255, 248, 234);
      .clickIcons {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        display: flex;
        justify-content: space-between;
        position: absolute;
        z-index: 11;
        .back, .rule {
          width: .59*.8rem;
          height: 1.2*.8rem;
          background: rgba(255, 211, 83, 1);
          border-radius: 0 .2rem .2rem 0;
          font-size: .36*.8rem;
          font-weight: 400;
          color: rgba(196, 94, 19, 1);
          display: flex;
          align-items: center;
          text-align: center;
          &.rule {
            border-radius: .2rem 0 0 .2rem;
            color: rgba(255, 255, 255, 1);
            background: rgba(145, 116, 252, 1);
          }
        }
      }
    }
    .catvip_container {
      position: relative;
      height: 7.05rem;
      background: url("imgs/bg.png");
      background-size: 100% 100%;
      .clickIcons {
        position: absolute;
        top: .22rem;
        left: 0;
        right: 0;
        margin: auto;
        display: flex;
        justify-content: space-between;
        .item {
          .back, .rule {
            width: .59rem;
            height: 1.2rem;
            background: rgba(255, 211, 83, 1);
            border-radius: 0 .2rem .2rem 0;
            font-size: .36rem;
            font-weight: 400;
            color: rgba(196, 94, 19, 1);
            display: flex;
            align-items: center;
            text-align: center;
            &.rule {
              color: rgba(255, 255, 255, 1);
              background: rgba(145, 116, 252, 1);
            }
          }
        }
      }
      .catvip_countdown {
        position: absolute;
        top: 1.7rem;
        left: .8rem;
        font-size: .2rem;
        font-weight: 400;
        color: #1F8842;
        display: flex;
        justify-content: center;
        align-items: center;
        .countdown_item {
          color: #1F8842;
          margin-left: .05rem;
          i {
            display: inline-block;
            width: .31rem;
            height: .34rem;
            color: #D9FFE6;
            line-height: .34rem;
            text-align: center;
            background: #1F8842;
            border-radius: .04rem;
          }
        }
      }
      .catvip_yiyuan {
        height: 2.75rem;
        position: absolute;
        top: 3.48rem;
        left: 1.2rem;
        right: 1.24rem;
        margin: auto;
        .list {
          height: 1.2rem;
          display: flex;
          overflow-x: scroll;
          .item {
            width: .95rem;
            height: 1.2rem;
            background: rgba(252, 228, 207, 1);
            border-radius: .1rem;
            margin-left: .1rem;
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            justify-content: center;
            align-items: center;
            img {
              width: .89rem;
              height: .51rem;
            }
            .info {
              margin-top: .1rem;
              font-size: .18rem;
              font-weight: 400;
              color: rgba(195, 65, 8, 1);
              div {
                line-height: .2rem;
                text-align: center;
              }
            }
          }
        }
        .horn {
          margin-top: .2rem;
          position: relative;
          display: flex;
          align-items: center;
          padding-left: .5rem;
          img {
            width: .17rem;
            height: .15rem;
            margin-right: .27rem;
          }
        }
        .pay_btn {
          margin: .48rem auto 0;
          width: 2.62rem;
          height: .71rem;
          background: url("./imgs/btnlight.png");
          background-size: 100% 100%;
          font-size: .3rem;
          font-weight: 400;
          color: rgba(255, 248, 239, 1);
          padding: .04rem 0 .08rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          i {
            margin-top: .02rem;
            font-size: .18rem;
            font-weight: bold;
            color: rgba(255, 219, 121, 1);
          }
          &.gray {
            background: url("./imgs/btngray.png");
            background-size: 100% 100%;
          }
        }
      }
    }
    .exchangeLeaf {
      .title {
        width: 6rem;
        height: .45rem;
        background: url("./imgs/exchangetitle.png");
        background-size: 100% 100%;
        margin: auto;
      }
      .list {
        .list-item {
          margin: .2rem auto 0;
          width: 6.5rem;
          height: 1.66rem;
          background: rgba(252, 241, 226, 1);
          box-shadow: 0px .08rem .09rem 0px rgba(212, 169, 129, 0.48);
          border-radius: .2rem;
          display: flex;
          .left {
            width: 4.9rem;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: .26rem;
            font-weight: 400;
            color: rgba(255, 61, 51, 1);
            .item {
              text-align: center;
              &:nth-child(1) {
                img {
                  width: 1.79rem;
                  height: .99rem;
                }
              }
              &:nth-child(2) {
                font-size: .3rem;
                font-weight: bold;
                color: rgba(244, 162, 97, 1);
                .shape {
                  width: .8rem;
                  height: .28rem;
                  border-bottom: .04rem solid #F4A261;
                  box-sizing: border-box;
                  position: relative;
                  margin-bottom: .2rem;
                  &:after {
                    content: "";
                    position: absolute;
                    right: 0.1rem;
                    bottom: -0.06rem;
                    height: 0.28rem;
                    width: 0.04rem;
                    background: #F4A261;
                    border-radius: 0.02rem;
                    transform: rotate(-45deg);
                  }
                }
              }
              &:nth-child(3) {
                img {
                  width: 1.18rem;
                  height: 1.18rem;
                }
              }
            }
          }
          .right {
            width: 1.6rem;
            height: 100%;
            background: rgba(255, 99, 94, 1);
            border-radius: 0 .2rem .2rem 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            div {
              font-size: .24rem;
              font-weight: 400;
              color: rgba(255, 248, 239, 1);
              &:nth-child(1) {
                font-size: .36rem;
                font-weight: bold;
                margin-bottom: .1rem;
                line-height: .36rem;
              }
            }
            &.gray {
              background: rgba(145, 145, 145, 1);
            }
          }
        }
      }
    }
    .taskgainmaobi {
      margin-top: .48rem;
      .title {
        width: 6.75rem;
        height: .44rem;
        background: url("./imgs/tasktitle.png");
        background-size: 100% 100%;
        margin: auto;
      }
      .whatmaobi {
        margin: .08rem auto .26rem;
        width: 2.5rem;
        height: .48rem;
        background: rgba(231, 133, 54, 1);
        border-radius: .24rem;
        font-size: .3rem;
        font-weight: 400;
        color: rgba(235, 217, 193, 1);
        text-align: center;
        line-height: .48rem;
      }
      .list {
        .item {
          width: 6.67rem;
          height: 1.65rem;
          background: url("./imgs/taskbg.png");
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          padding: .2rem .3rem .37rem;
          box-sizing: border-box;
          margin: auto;
          img {
            width: 1.04rem;
            height: 1.04rem;
            margin-right: .2rem;
          }
          .info {
            width: 3.46rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .info_title {
              font-size: .28rem;
              font-weight: bold;
              color: rgba(231, 133, 54, 1);
              line-height: .36rem;
            }
            .info_content {
              display: flex;
              align-items: center;
              font-size: .2rem;
              font-weight: 400;
              color: rgba(231, 133, 54, 1);
              .percent {
                margin-right: .1rem;
                width: 1.52rem;
                height: .3rem;
                background: rgba(236, 223, 213, 1);
                border-radius: .12rem;
                &.full {
                  background: rgba(236, 192, 134, 1);
                }
              }
            }
          }
          .btn {
            width: 1.37rem;
            height: .55rem;
            background: url("./imgs/task0.png");
            background-size: 100% 100%;
            &.gain {
              background: url("./imgs/task1.png");
              background-size: 100% 100%;
            }
            &.gained {
              background: url("./imgs/task2.png");
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }

  @keyframes huxi {
    0% {
      transform: scale(0.9);
    }
    10% {
      transform: scale(1.2);
    }
    20% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1.2);
    }
    40% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1.2);
    }
    60% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1.2);
    }
    80% {
      transform: scale(0.9);
    }
    90% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(0.9);
    }
  }
</style>
