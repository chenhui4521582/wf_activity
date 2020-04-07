<template>
  <div class="catvip" :class="{end:isEnd,showDown:$refs.dropDown&&$refs.dropDown.isDropDown}"
    v-if="actInfoData">
    <template v-if="!isEnd">
      <div class="catvip_container">
        <div class="clickIcons">
          <div class="item">
            <div class="back" @click="back">返回</div>
            <div class="rule" @click="showPop(7)">规则</div>
          </div>
          <div class="gift" @click="showPop(9)"
            v-if="actInfoData.catStatus&&actInfoData.catLevel<20">
            <img src="./imgs/gift-icon.png" alt="">
            <span>升等级</span>
          </div>
        </div>
        <div class="catvip_countdown" v-if="actInfoData.state==1">
          剩余
          <div class="countdown_item" v-for="item in countTime.split('')">
            <i v-if="!['时','分','秒'].includes(item)">{{item}}</i>
            <template v-else>{{item}}</template>
          </div>
        </div>
        <div class="catvip_lottery_wrapper" :class="`bg-${currentAwardType}`">
          <div class="petal_bg"></div>
          <div class="catvip_lottery_container">
            <div class="tabs_wrapper">
              <div class="left" :class="{active:currentAwardType===1}" @click="changeTab(1)">
                <p class="name">初级场</p>
                <p class="level">(1元)</p>
              </div>
              <div class="right" :class="{active:currentAwardType===10}" @click="changeTab(10)">
                <p class="name">高级场</p>
                <p class="level">(10元)</p>
              </div>
            </div>
            <div class="awards_list" v-for="(items,key) in actInfoData.awardsConfigList" :key="key"
              v-show="items.level===currentAwardType">
              <div class="list">
                <div class="item" v-for="item in items.awardsList">
                  <img :src="item.awardsImage|filter" alt="">
                  <div class="info">
                    <div>{{item.showName}}</div>
                    <div v-if="item.awardsType==1">金叶子</div>
                    <div v-else-if="item.awardsType==32">优惠券</div>
                    <div v-else-if="item.awardsType==10">话费券</div>
                  </div>
                  <div class="star-icon" v-if="!item.star"></div>
                </div>
              </div>
              <div class="horn" v-if="hornList.length">
                <img src="./imgs/laba.png" alt="">
                <horn :horn-list="hornList"></horn>
              </div>
            </div>
            <template v-if="currentAwardType===10">
              <div class="pay_btn" :class="{gray:actInfoData.seniorLottery==2}"
                @click="preheat(()=>lottery('seniorLottery'))">
                <template v-if="actInfoData.seniorLottery === 0">
                  支付{{currentAwardType}}元抽奖<br><i
                    v-if="actInfoData.seniorLotteryNum>=200">{{actInfoData.seniorLotteryNum}}人已抽奖</i>
                </template>
                <template v-else-if="actInfoData.seniorLottery==1">
                  立即开奖
                </template>
                <template v-else>
                  已参与
                </template>
              </div>
            </template>
            <template v-else>
              <div class="pay_btn" :class="{gray:actInfoData.juniorLottery==2}"
                @click="preheat(()=>lottery('juniorLottery'))">
                <template v-if="actInfoData.juniorLottery === 0">
                  支付{{currentAwardType}}元抽奖<br><i
                    v-if="actInfoData.juniorLotteryNum>=200">{{actInfoData.juniorLotteryNum}}人已抽奖</i>
                </template>
                <template v-else-if="actInfoData.juniorLottery==1">
                  立即开奖
                </template>
                <template v-else>
                  已参与
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="exchangeLeaf" v-if="actInfoData.leafConvertConfig">
        <div class="title"></div>
        <div class="bill_wrapper">
          <div>当前话费券：{{actInfoData.hfqNum}}</div>
          <p @click="showPop(8)">提升限购次数></p>
        </div>
        <div class="list">
          <div class="list-item" @click="preheat(()=>exchangeLeaf(actInfoData.leafConvertConfig))">
            <div class="left">
              <div class="item">
                <img src="./imgs/hfq.png" alt="">
                <div>{{actInfoData.leafConvertConfig.hfqName}}</div>
              </div>
              <div class="item">
                <div class="shape"></div>
                <div>兑换</div>
              </div>
              <div class="item">
                <img src="./imgs/packagepic.png" alt="">
                <div>{{actInfoData.leafConvertConfig.leafs}}金叶子</div>
              </div>
            </div>
            <div class="right"
              :class="{gray:actInfoData.leafConvertConfig.purchased>=actInfoData.leafConvertConfig.limit}">
              <div>立即<br>兑换</div>
              <div>限购
                {{actInfoData.leafConvertConfig.purchased>actInfoData.leafConvertConfig.limit?actInfoData.leafConvertConfig.limit:actInfoData.leafConvertConfig.purchased}}/{{actInfoData.leafConvertConfig.limit}}
              </div>
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
            <div class="btn" :class="{gain:item.status==1,gained:item.status==2}"
              @click="preheat(()=>dotask(item))"></div>
          </div>
        </div>
      </div>
      <drop-down ref="dropDown" :countTime="countTime" :endDate="actInfoData.endDate"
        @showPop="showPop" :myInfo="myInfo" @handleTab="outHandleTab"></drop-down>
    </template>
    <template v-else>
      <div class="clickIcons">
        <div class="back" @click="back">返回</div>
        <div class="rule" @click="showPop(7)">规则</div>
      </div>
      <profit :is-full="true" @showPop="showPop" />
    </template>
    <!--popType-->
    <com-pop :pop-type="popType" :award-data="awardData" :package-info="packageInfo" ref="comPop"
      :countTime="countTime" :leafItem="leafItem" @exchange="exchange" @opengame="showPop(5)"
      @buy-gift="showPop(9)" :actInfoData="actInfoData">
    </com-pop>
    <loading v-if="showLoading"></loading>
  </div>
</template>

<script>
/* eslint-disable */
import '../../common/js/window.js'
import {
  activityInfo,
  getNoticeList,
  exchangeLeaf,
  taskGain,
  rankList,
  levelLottery,
  getPackages
} from './utils/api'
import Loading from "../../components/common/loading"

export default {
  name: 'App',
  data () {
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
      packageInfo: [],
      currentAwardType: 1
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
    getCountInfo (dateinfo) {
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
    countDown (item) {
      if (!item) return false
      let date = item / 1000
      let { day, countHour, countMinute, countSecond } = this.getCountInfo(date)
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
    back () {
      GLOBALS.marchSetsPoint('A_H5PT0252002981')   // 点击返回
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
    },
    //弹窗
    showPop (type) {
      this.popType = type
      let point = ''
      switch (type) {
        case 7:
          point = 'A_H5PT0252002982'
          break//规则点击
        case 2:
          point = 'A_H5PT0252002994'
          break//猫币介绍
      }
      point && GLOBALS.marchSetsPoint(point)
      if ([0].includes(type)) {
        setTimeout(() => {
          this.$refs.comPop.showPop()
        }, 1000)
      } else {
        type == 2 && GLOBALS.marchSetsPoint('A_H5PT0252002997')
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      }
    },
    //活动信息
    async getActInfo (flag) {
      let { code, data } = await activityInfo()
      if (code == 200) {
        this.actInfoData = data
        if (data.state == 1 || data.state == 0) {
          this.isEnd = false
          this.rulesExplain = data.beginDate + '~' + data.endDate
          this.currentAwardType = data.lastRechargeAmount ? data.lastRechargeAmount : data.rechargeAmount > 1000 ? 10 : 1
          this.countDown(data.countdown)
          flag && data.state == 1 && this.getHornList()
          flag && (
            this.getRankList(),
            this.getPackageData()
          )

          if (data.popup) {
            this.showPop(10)
          }
        } else {
          this.isEnd = true
        }
        flag && GLOBALS.marchSetsPoint('P_H5PT0252', {
          source_address: GLOBALS.getUrlParam('from') || ''
        })
      }
    },
    //走马灯接口
    async getHornList () {
      let { code, data } = await getNoticeList()
      if (code == 200) {
        this.hornList = data
      }
    },
    //排行信息
    async getRankList () {
      const { code, data } = await rankList()
      if (code === 200) {
        this.myInfo = data.userInfo
      }
    },
    //1元礼包数据
    async getPackageData () {
      const { code, data } = await getPackages(235)
      if (code === 200) {
        this.packageInfo = data && data.mallBizConfigs
      }
    },
    //兑换叶子
    exchangeLeaf (item) {
      if (item.purchased < item.limit) {
        GLOBALS.marchSetsPoint('A_H5PT0252002987', {
          awards_id: item.level,
          awards_name: item.hfqName + '兑换' + item.leafName
        })
        this.leafItem = item
        GLOBALS.marchSetsPoint(item.convert ? 'A_H5PT0252002988' : 'A_H5PT0252002990', {
          awards_id: item.level,
          awards_name: item.hfqName + '兑换' + item.leafName
        })
        this.showPop(6)
      }
    },
    //确认兑换
    async exchange () {//exchangeLeaf
      GLOBALS.marchSetsPoint('A_H5PT0252002989')
      this.showLoading = true
      let { code, data, message } = await exchangeLeaf()
      if (code == 200) {
        this.awardData = {
          type: 'jyz',
          awardsName: data.amount + '金叶子',
          info: `可至“我的-资产”查看`,
          popType: 1
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
    //任务 去完成 和领取
    async dotask (item) {
      //去完成
      if (item.status == 0) {
        GLOBALS.marchSetsPoint('A_H5PT0252002995', {
          task_id: item.taskId,
          task_name: item.taskName
        })
        if (item.url.includes('moreGamePop')) {
          this.showPop(5)
        } else {
          GLOBALS.jumpOutsideGame(item.url)
        }
      }
      //去领取
      if (item.status == 1) {
        GLOBALS.marchSetsPoint('A_H5PT0252002996', {
          task_id: item.taskId,
          task_name: item.taskName
        })
        this.showLoading = true
        let { code, data, message } = await taskGain(item.taskId)
        if (code == 200) {
          this.awardData = {
            type: data.type,
            awardsName: data.awardsName,
            info: `可至招财猫查看`,
            popType: 2
          }
          GLOBALS.marchSetsPoint(data.type == 'mb' ? 'A_H5PT0252002999' : 'A_H5PT0252002998')
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
    //一元抽奖 购买和抽奖
    async lottery (lotteryType) {
      if (this.actInfoData[lotteryType] == 0) {
        localStorage.setItem('originDeffer', window.location.href)
        GLOBALS.marchSetsPoint('A_H5PT0252002983')   // 点击任意礼包
        let packageInfo = this.packageInfo.filter(item => item.price === this.currentAwardType)
        if (packageInfo && packageInfo.length > 0) {
          packageInfo = packageInfo[0]
          localStorage.setItem('JDD_PARAM', JSON.stringify(packageInfo))
          localStorage.setItem('payment', JSON.stringify(packageInfo))
          location.href =
            'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
        }
      } else if (this.actInfoData[lotteryType] == 1) {
        GLOBALS.marchSetsPoint('A_H5PT0252002984')
        this.showLoading = true
        let { code, data, message } = await levelLottery({ level: this.currentAwardType })
        if (code == 200) {
          this.awardData = {
            awardsImg: data.awardsImg,
            awardsName: data.awardsName,
            info: `奖励已发放，可至“我的”查看`,
            popType: 0
          }
          GLOBALS.marchSetsPoint('A_H5PT0252002985')
          this.showPop(3)
          this.getActInfo(false)
          this.getHornList()
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
    //预热、活动中的(无猫、级别不够)
    preheat (dosth, ms = 0) {//预热
      if (this.actInfoData.state == 0 || (this.actInfoData.state == 1 && (!this.actInfoData.catStatus || this.actInfoData.catLevel < 20))) {
        this.actInfoData.state == 0 && GLOBALS.marchSetsPoint('A_H5PT0252002976')   // H5平台-招财猫会员日-预热阶段提示弹窗加载完成
        this.actInfoData.state == 1 && !this.actInfoData.catStatus && GLOBALS.marchSetsPoint('A_H5PT0252002977')   // H5平台-招财猫会员日-未领猫提示弹窗加载完成
        this.actInfoData.state == 1 && this.actInfoData.catStatus && this.actInfoData.catLevel < 20 && GLOBALS.marchSetsPoint('A_H5PT0252002979')   // H5平台-招财猫会员日-未领猫提示弹窗加载完成
        setTimeout(() => {
          this.showPop(4)
        }, ms)
      } else {
        dosth()
      }
    },
    //点击副业tab
    outHandleTab (idx) {
      if (this.actInfoData.state == 0 || (this.actInfoData.state == 1 && (!this.actInfoData.catStatus || this.actInfoData.catLevel < 20))) {
        this.showPop(4)
      } else {
        this.preheat(() => this.$refs.dropDown.handleTab(idx))
      }
    },
    changeTab (level) {
      this.currentAwardType = level
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getActInfo(true)
    })
  },
  watch: {
    countTime (val) {
      if (!val) {
        this.getActInfo(true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../common/css/base.css";

.catvip {
  background: #ecd9c2;
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
      .back,
      .rule {
        width: 0.59 * 0.8rem;
        height: 1.2 * 0.8rem;
        background: rgba(255, 211, 83, 1);
        border-radius: 0 0.2rem 0.2rem 0;
        font-size: 0.36 * 0.8rem;
        font-weight: 400;
        color: rgba(196, 94, 19, 1);
        display: flex;
        align-items: center;
        text-align: center;
        &.rule {
          border-radius: 0.2rem 0 0 0.2rem;
          color: rgba(255, 255, 255, 1);
          background: rgba(145, 116, 252, 1);
        }
      }
    }
  }
  .catvip_container {
    position: relative;
    height: 7.05rem;
    background: url("./imgs/bg.png");
    background-size: 100% 100%;
    .clickIcons {
      position: absolute;
      top: 0.22rem;
      left: 0;
      right: 0;
      margin: auto;
      display: flex;
      justify-content: space-between;
      .item {
        .back,
        .rule {
          width: 0.59rem;
          height: 1.2rem;
          background: rgba(255, 211, 83, 1);
          border-radius: 0 0.2rem 0.2rem 0;
          font-size: 0.36rem;
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
      .gift {
        width: 0.54rem;
        height: 1.9rem;
        color: #fff;
        font-size: 0;
        background: #ff635e;
        border-radius: 0.2rem 0 0 0.2rem;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;
        text-align: center;
        img {
          width: 0.42rem;
          height: 0.34rem;
          margin-bottom: 0.1rem;
        }
        span {
          font-size: 0.36rem;
        }
      }
    }
    .catvip_countdown {
      padding-top: 1.8rem;
      padding-left: 1.38rem;
      font-size: 0.2rem;
      font-weight: 400;
      color: #1f8842;
      display: flex;
      align-items: center;
      .countdown_item {
        color: #1f8842;
        margin-left: 0.05rem;
        i {
          display: inline-block;
          width: 0.31rem;
          height: 0.34rem;
          color: #d9ffe6;
          line-height: 0.34rem;
          text-align: center;
          background: #1f8842;
          border-radius: 0.04rem;
        }
      }
    }
    .catvip_lottery_wrapper {
      width: 100%;
      height: 4.88rem;
      background: no-repeat center center;
      background-size: 6.22rem 4.88rem;
      position: relative;
      margin: 0.2rem auto 0;
      &.bg-1 {
        background-image: url("./imgs/bg-1.png");
        .pay_btn {
          background-image: url("./imgs/btnlight.png");
          color: #fff8ef;
          i {
            color: #ffdb79;
          }
        }
      }
      &.bg-10 {
        background-image: url("./imgs/bg-10.png");
        .pay_btn {
          background-image: url("./imgs/btnyellow.png");
          color: #a05103;
          i {
            color: #ff4f78;
          }
        }
      }
      .petal_bg {
        position: absolute;
        top: 1.22rem;
        left: 0.1rem;
        width: 7.08rem;
        height: 2.44rem;
        background: url("./imgs/petal.png") no-repeat center center;
        background-size: 100% 100%;
      }
      .catvip_lottery_container {
        position: relative;
        height: 4.88rem;
        .tabs_wrapper {
          height: 0.72rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          padding-top: 0.24rem;
          .left {
            width: 1.64rem;
            height: 0.72rem;
            background: no-repeat center center;
            background-size: 100% 100%;
            background-image: url(./imgs/left-normal.png);
            &.active {
              background-image: url(./imgs/left-active.png);
            }
          }
          .right {
            width: 1.64rem;
            height: 0.72rem;
            background: no-repeat center center;
            background-size: 100% 100%;
            background-image: url(./imgs/right-normal.png);
            &.active {
              background-image: url(./imgs/right-active.png);
            }
          }
          .active {
            color: #ff9638;
          }
          .name {
            font-size: 0.3rem;
            font-weight: bold;
            line-height: 0.42rem;
          }
          .level {
            font-size: 0.24rem;
          }
        }
        .awards_list {
          width: 5.2rem;
          margin: 0.5rem auto 0;
          .list {
            height: 1.2rem;
            display: flex;
            overflow-x: scroll;
            .item {
              width: 0.95rem;
              height: 1.2rem;
              background: rgba(252, 228, 207, 1);
              border-radius: 0.1rem;
              margin-left: 0.1rem;
              display: flex;
              flex-direction: column;
              flex-shrink: 0;
              justify-content: center;
              align-items: center;
              position: relative;
              img {
                width: 0.89rem;
                height: 0.51rem;
              }
              .info {
                margin-top: 0.1rem;
                font-size: 0.18rem;
                font-weight: 400;
                color: rgba(195, 65, 8, 1);
                div {
                  line-height: 0.2rem;
                  text-align: center;
                }
              }
              .star-icon {
                position: absolute;
                left: 0;
                top: 0;
                width: 0.48rem;
                height: 0.48rem;
                background: url("./imgs/star-icon.png") no-repeat center center;
                background-size: 100% 100%;
              }
            }
          }
          .horn {
            margin-top: 0.2rem;
            position: relative;
            display: flex;
            align-items: center;
            padding-left: 0.5rem;
            img {
              width: 0.17rem;
              height: 0.15rem;
              margin-right: 0.27rem;
            }
          }
        }
        .pay_btn {
          position: absolute;
          left: 50%;
          margin-left: -1.3rem;
          bottom: 0.42rem;
          width: 2.6rem;
          height: 0.71rem;
          background-size: 100% 100%;
          font-size: 0.3rem;
          font-weight: 400;
          padding: 0.04rem 0 0.08rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          i {
            margin-top: 0.02rem;
            font-size: 0.18rem;
            font-weight: bold;
          }
          &.gray {
            background: url("./imgs/btngray.png");
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .exchangeLeaf {
    margin-top: 0.3rem;
    .title {
      width: 6rem;
      height: 0.45rem;
      background: url("./imgs/exchangetitle.png");
      background-size: 100% 100%;
      margin: auto;
    }
    .bill_wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #ff635e;
      width: 6.48rem;
      height: 0.46rem;
      background: rgba(216, 192, 161, 1);
      box-shadow: 0 0.02rem 0px 0px rgba(255, 243, 226, 0.53),
        0px 0.02rem 0.02rem 0px rgba(184, 150, 107, 0.9);
      border-radius: 0.23rem;
      margin: 0.18rem auto;
      padding: 0 0.2rem 0 0.26rem;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 0.26rem;
      p {
        color: #26944c;
      }
    }
    .list {
      .list-item {
        margin: 0.2rem auto 0;
        width: 6.5rem;
        height: 1.66rem;
        background: rgba(252, 241, 226, 1);
        box-shadow: 0px 0.08rem 0.09rem 0px rgba(212, 169, 129, 0.48);
        border-radius: 0.2rem;
        display: flex;
        .left {
          width: 4.9rem;
          height: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: 0.26rem;
          font-weight: 400;
          color: rgba(255, 61, 51, 1);
          .item {
            text-align: center;
            &:nth-child(1) {
              img {
                width: 1.79rem;
                height: 0.99rem;
              }
            }
            &:nth-child(2) {
              font-size: 0.3rem;
              font-weight: bold;
              color: rgba(244, 162, 97, 1);
              .shape {
                width: 0.8rem;
                height: 0.28rem;
                border-bottom: 0.04rem solid #f4a261;
                box-sizing: border-box;
                position: relative;
                margin-bottom: 0.2rem;
                &:after {
                  content: "";
                  position: absolute;
                  right: 0.1rem;
                  bottom: -0.06rem;
                  height: 0.28rem;
                  width: 0.04rem;
                  background: #f4a261;
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
          border-radius: 0 0.2rem 0.2rem 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          div {
            font-size: 0.24rem;
            font-weight: 400;
            color: rgba(255, 248, 239, 1);
            &:nth-child(1) {
              font-size: 0.36rem;
              font-weight: bold;
              margin-bottom: 0.1rem;
              line-height: 0.36rem;
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
    margin-top: 0.48rem;
    .title {
      width: 6.75rem;
      height: 0.44rem;
      background: url("./imgs/tasktitle.png");
      background-size: 100% 100%;
      margin: auto;
    }
    .whatmaobi {
      margin: 0.08rem auto 0.26rem;
      width: 2.5rem;
      height: 0.48rem;
      background: rgba(231, 133, 54, 1);
      border-radius: 0.24rem;
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(235, 217, 193, 1);
      text-align: center;
      line-height: 0.48rem;
    }
    .list {
      .item {
        width: 6.67rem;
        height: 1.65rem;
        background: url("./imgs/taskbg.png");
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        padding: 0.2rem 0.3rem 0.37rem;
        box-sizing: border-box;
        margin: auto;
        img {
          width: 1.04rem;
          height: 1.04rem;
          margin-right: 0.2rem;
        }
        .info {
          width: 3.46rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .info_title {
            font-size: 0.28rem;
            font-weight: bold;
            color: rgba(231, 133, 54, 1);
            line-height: 0.36rem;
          }
          .info_content {
            display: flex;
            align-items: center;
            font-size: 0.2rem;
            font-weight: 400;
            color: rgba(231, 133, 54, 1);
            .percent {
              margin-right: 0.1rem;
              width: 1.52rem;
              height: 0.3rem;
              background: rgba(236, 223, 213, 1);
              border-radius: 0.12rem;
              &.full {
                background: rgba(236, 192, 134, 1);
              }
            }
          }
        }
        .btn {
          width: 1.37rem;
          height: 0.55rem;
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
