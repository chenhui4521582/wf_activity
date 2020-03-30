<template>
  <div id="app">
    <section class="after" id="after">
      <div class="container" v-if="myInfo">
        <!-- 返回按钮 -->
        <img src="./images/back.png" class="e-back" @click.stop="back">
        <!-- 规则按钮 -->
        <img src="./images/rule.png" class="rule-icon" alt="" @click="showrule">
        <!-- 导航条 -->
        <div class="tabs" :class="{tab1:tabIndex==0,tab2:tabIndex==1}">
          <div class="item" :class="{ selected: tabIndex==0 }" @click="settabIndex(0)">限购礼包</div>
          <div class="item" :class="{ selected: tabIndex==1 }" @click="settabIndex(1)">幸运币兑换</div>
        </div>
        <div class="total-num">
          我的幸运币：
          <img src="./images/lucky-icon.png" alt="">
          {{myInfo.myCoin || 0}}
        </div>
      </div>
      <div class="wrap" v-if="myInfo">
        <div class="explain" v-if="tabIndex == 0">
          ·全部抢购价每天限1次，每天0点刷新购买次数；<br>
          ·单独购买礼包不限次数。
        </div>
        <div class="explain" v-if="tabIndex == 1">
          ·幸运币用于兑换以下奖品；<br>
          ·活动结束后幸运币作废清零。
        </div>
        <!-- 购买礼包 -->
        <div class="packgaes" v-if="tabIndex == 0">
          <template v-for="(item,index) in taskInfo">
            <div class="item" v-if="index < 3" :key="index">
              <div class="sec2">
                <img :src="item.productIcon | filter" alt="">
                <span>{{item.amount}}</span>
              </div>
              <!-- 礼包内容 -->
              <div class="award-wrap">
                <div 
                  class="sec1"
                  v-for="(item1,index1) in item.awardsList.slice().sort((a,b)=>(b.awardsType-a.awardsType))"
                  :key="index1"
                >
                  <img src="./images/fudai.png" alt="" v-if="item1.awardsType==28">
                  <img src="./images/package_leaf.png" alt="" v-if="item1.awardsType==1">
                  <span v-if="item1.awardsType == 28">幸运币福袋</span>
                  <span v-if="item1.awardsType == 1">{{item1.awardsNum}}</span>
                  <span class="add">+</span>
                </div>
              </div>
              <!-- icon -->
              <div class="corner"></div>
              <!-- 礼包提示 -->
              <div class="tip">{{item.name}}</div>
              <!-- 购买按钮 -->
              <div class="btn" @click="gotopay(item,true)" >{{ item.price }}元抢购>></div>
            </div>
            <!-- 全部购买 -->
            <div 
              v-else
              :key="index"
              class="btn-all" 
              :class="{ gray: item.buyFlag == 0 }"
              @click="gotopay(item, item.buyFlag != 0)">
              <div class="tips">每日限1次</div>
            </div>
          </template>
        </div>
        <!-- 幸运币兑换 -->
        <div class="awards" v-if="tabIndex == 1 && showExchange">
          <div class="item"
            v-for="(item,index) in coinInfo.limitedTimePackageExchangeAwardsList"
            :class="{tabIndex: !tabIndex}"
            :key="index"
          >
            <div class="content">
              <div class="light">
                <img src="./images/light.png" alt="">
              </div>
              <img class="award-img" :src="item.awardsImg | filter" alt="">
              <div class="award-name">{{ item.awardsName }}</div>
              <div class="exchange-num">
                <img src="./images/lucky-icon.png" alt=""> x{{item.costCoin}}
              </div>
            </div>
            <div class="btn" @click="gain(item)">
              兑换
            </div>
          </div>
        </div>
      </div>
      <!-- 公共弹框 -->
      <common-pop 
        :is-show-pop="isShowPop" 
        :fail="fail" 
        :surplus='surplus' 
        :awardData="awardData"
        @close-pop="isShowPop=false" 
        @gototask="gototask" 
        @exchange="exchange"
      />
      <!-- 公共弹框 -->
      <common-package-pop 
        :is-show-pop="isShowPackagePop" 
        :fail="fail" 
        :awardData="awardPackageData"
        @close-pop="isShowPackagePop=false"
        @gototask="gototask"
        @exchange="exchange"
      />
      <!-- 规则 -->
      <rule ref="rule" :info="myInfo"></rule>
      <!-- loading -->
      <loading v-show="isLoading"></loading>
    </section>
  </div>
</template>

<script>
import '../../common/js/window.js';
export default {
  name: 'App',
  data () {
    return {
      tabIndex: 0,
      isShowPop: false,
      awardsList: [],
      myInfo: {},
      taskInfo: [],
      fail: false,//兑换失败
      surplus: 0,//勋章换取奖励的差额
      awardData: null,
      awardPackageData: [],
      coinInfo: null,
      isShowPackagePop: false,
      isLoading: false
    }
  },
  computed: {
    channel () {
      return localStorage.getItem('APP_CHANNEL') || ''
    },
    showExchange () {
      return this.coinInfo && this.coinInfo.limitedTimePackageExchangeAwardsList.length
    }
  },
  components: {
    rule: () => import('./components/rule'),
    commonPop: () => import('./components/commonPop'),
    commonPackagePop: () => import('./components/commonPackagePop'),
    'loading': () => import('../../components/common/loading'),
  },
  methods: {
    showrule () {
      GLOBALS.marchSetsPoint('A_H5PT0224002531')//H5平台-限购商城页-限购礼包页-底部规则点击
      this.$refs.rule.showPop()
    },
    back () {
      //默认跳首页去
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
    },
    fetch (url, params) {
      if (url.startsWith('/ops/api')) {
        url = '//ops-api.beeplaying.com' + url
      }
      if (url.startsWith('/wap/api') || url.startsWith('/task/api')) {
        url = '//platform-api.beeplaying.com' + url
      }
      if (url.startsWith('/shop/api')) {
        url = '//shop-api.beeplaying.com' + url
      }
      return this.axios.post(url, params, {})
    },//请求封装方法
    async getActInfo (flag) {
      let { data, code } = (await this.fetch('/ops/api/limited-time-package/info')).data
      if (code == 200 && data) {
        this.myInfo = data
        if (flag) {
          GLOBALS.marchSetsPoint('P_H5PT0224', { source_address: GLOBALS.getUrlParam('from') || '' })//H5平台-限购商城页面加载完成
        }
        flag && this.getBuyState()
        flag && this.getTaskInfo()
        flag && this.getCoinInfo()
      }
    },
    async getTaskInfo () {
      let { data, code } = (await this.fetch('/shop/api/mall/dayLimitWelfare')).data
      if (code == 200) {
        GLOBALS.marchSetsPoint('A_H5PT0224002525')//H5平台-限购商城页-限购礼包页面加载
        this.taskInfo = data
      }
    },
    async getCoinInfo () {
      let { data, code } = (await this.fetch('/ops/api/limited-time-package/exchange/list')).data
      if (code == 200) {
        GLOBALS.marchSetsPoint('A_H5PT0224002526')//H5平台-限购商城页-幸运币兑换页面加载
        this.coinInfo = data
      }
    },
    async gain (item) {
      GLOBALS.marchSetsPoint('A_H5PT0224002534', {
        awards_id: item.costCoin
      })//H5平台-限购商城页-幸运币兑换页-各幸运币兑换点击
      this.awardData = item;
      if (this.myInfo.myCoin > item.costCoin) {
        GLOBALS.marchSetsPoint('A_H5PT0224002535', {
          awards_id: item.costCoin
        })//H5平台-限购商城页-幸运币兑换页-幸运币不足弹窗加载完成
        this.fail = true;
        this.surplus = 0;
        this.isShowPop = true
      } else {
        this.fail = true
        this.surplus = Math.abs(this.myInfo.myCoin - item.costCoin)
        this.isShowPop = true
        GLOBALS.marchSetsPoint('A_H5PT0224002537', {
          awards_id: item.costCoin
        })//H5平台-限购商城页-幸运币兑换页-是否兑换弹窗加载完成
      }
    },
    async exchange (item) {
      this.isLoading = true
      try {
        let { code, message } = (await this.fetch('/ops/api/limited-time-package/exchange', {
          value: item.id
        })).data
        this.isLoading = false
        if (code == 200) {
          this.fail = false;
          this.surplus = 0;
          this.isShowPop = true
          GLOBALS.marchSetsPoint('A_H5PT0224002536', {
            awards_id: item.costCoin
          })//H5平台-限购商城页-幸运币兑换页-兑换成功弹窗加载完成
        } else {
          this.$toast.show({
            message: message,
            duration: 2000
          })
        }
        this.getActInfo(false)
      } catch (e) {
        this.isLoading = false
      }
    },
    settabIndex (flag) {
      if (this.tabIndex != flag) {
        this.tabIndex = flag;
        GLOBALS.marchSetsPoint(flag ? 'A_H5PT0224002526' : 'A_H5PT0224002525')
      }
    },
    gototask () {
      this.tabIndex = 0;
    },
    gotopay (item, canBuy) {
      let points = {
        '6': "A_H5PT0224002527",//H5平台-限购商城页-限购礼包页-6元抢购点击
        '18': 'A_H5PT0224002528',//H5平台-限购商城页-限购礼包页-18元抢购点击
        '55': 'A_H5PT0224002530',//H5平台-限购商城页-限购礼包页-55元抢购点击
        '36': 'A_H5PT0224002529'//H5平台-限购商城页-限购礼包页-36元抢购点击
      }
      if (canBuy) {
        points[item.price] && GLOBALS.marchSetsPoint(points[item.price])
        let channel = localStorage.getItem('APP_CHANNEL')
        let originDeffer = `//wap.beeplaying.com/activities/dailypackage.html?channel=${channel}&blindBox=true`
        localStorage.setItem('originDeffer', originDeffer)
        localStorage.setItem('payment', JSON.stringify(item))
        window.location.href="//wap.beeplaying.com/xmWap/#/payment/paymentlist"
      } else {
        //当日已购买
        GLOBALS.marchSetsPoint('A_H5PT0224002533')//H5平台-限购商城页-限购礼包页-礼包不能购买弹窗加载完成
        this.fail = true
        this.isShowPackagePop = true
      }
    },
    async getBuyState () {
      let { data, code } = (await this.fetch('/ops/api/limited-time-package/buy')).data
      if (code == 200 && data && data.limitedTimePackageBuyGoodList && data.limitedTimePackageBuyGoodList.length) {
        GLOBALS.marchSetsPoint('A_H5PT0224002532')//H5平台-限购商城页-限购礼包页-底部规则点击
        this.fail = false
        this.awardPackageData = data.limitedTimePackageBuyGoodList
        this.isShowPackagePop = true
      }
    }
  },
  created () {
    this.getActInfo(true)
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.after .rule {
  z-index: 4 !important;
}

.after .rule img {
  top: 1.3rem;
  left: 0.1rem;
}
.after {
  padding-bottom: .5rem;
  overflow: hidden;
  position: relative;
  font-size: 0.28rem;
  color: rgba(21, 0, 43, 1);
  min-height: 100vh;
  background: url("./images/bg.png") center top no-repeat #6945CE;
  background-size: 100% auto;
  .container {
    .text {
      position: absolute;
      top: 0.75rem;
      bottom: 1.52rem;
      left: 0.48rem;
      display: flex;
      flex-direction: column;
      font-size: 0.3rem;
      color: #fff;
      .item {
        &:nth-child(1) {
          font-size: 0.44rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .tabs {
      position: absolute;
      top: 2.27rem;
      left: 0.53rem;
      width: 6.11rem;
      height: .71rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: url(./images/nav-bg.png) no-repeat center top;
      background-size: 100% 100%;
      .item {
        width: 3.19rem;
        height: 0.71rem;
        line-height: 0.71rem;
        font-size: .26rem;
        text-align: center;
        color: #A888FF;
        font-weight: bold;
        &.selected {
          color: #FFFFFF;
          background: url(./images/nav-active.png) no-repeat center center;
          background-size: 100% 100%;
        }
      }
    }
    .total-num {
      position: absolute;
      top: 3.12rem;
      left: 50%;
      transform: translateX(-50%);
      min-width: 3rem;
      padding: 0 .2rem;
      height: 0.5rem;
      background: #41249B;
      border-radius: 0.25rem;
      font-size: 0.24rem;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      img {
        margin-right: .3rem;
        width: .3rem;
        height: .3rem;
      }
    }
  }
  .wrap {
    margin-top: 3.91rem;
    width: 100%;
    .explain {
      margin-bottom: .25rem;
      padding-left: .35rem;
      color: #fff;
      font-size: .22rem;
      line-height: .4rem;
    }
    .awards {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0  .24rem;
      box-sizing: border-box;
      .item {
        margin: 0 .1rem 0.3rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .content {
          position: relative;
          width: 2.16rem;
          height: 2.28rem;
          background: url(./images/exchange-bg.png) no-repeat center center;
          background-size: 100% 100%;
          .light {
            position: absolute;
            z-index: 1;
            width: 1.93rem;
            height: 1.97rem;
            left: 50%;
            top: -.14rem;
            transform: translate(-50%, 0);
            img {
              vertical-align: top;
              width: 100%;
              height: 100%;
            }
          }
          &.hot:before {
            content: "";
            position: absolute;
            width: 0.5rem;
            height: 0.56rem;
            background: url("./images/hot.png");
            background-size: 100% 100%;
          }
          .award-img {
            margin: .39rem auto 0;
            display: block;
            position: relative;
            z-index: 2;
            width: 1.68rem;
            height: .98rem;
          }
          .award-name {
            font-size: 0.24rem;
            font-weight: 500;
            color: #fff;
            text-align: center;
            height: 0.43rem;
            line-height: 0.43rem;
          }
          .exchange-num {
            height: .38rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .26rem;
            color: #FFF59E;
            img {
              margin-right: .13rem;
              width: .3rem;
              height: .3rem;
            }
          }
        }
        .btn {
          margin-top: 0.23rem;
          width: 1.7rem;
          height: 0.6rem;
          text-align: center;
          line-height: 0.6rem;
          background: #F8D9E4;
          border-radius: 0.3rem;
          font-size: 0.26rem;
          font-weight: bold;
          color: #D20F7E;
        }
      }
    }
    .packgaes {
      padding: 0  .24rem;
      .item {
        position: relative;
        height: 1.71rem;
        font-size: 0.22rem;
        margin-bottom: 0.15rem;
        background: url(./images/card-bg.png) no-repeat center top;
        background-size: 100% 100%;
        display: flex;
        justify-self: start;
        .sec2 {
          margin-right: .62rem;
          padding: .1rem 0 0 .21rem;
          width: 1.22rem;
          text-align: center;
          img {
            vertical-align: top;
            width: 1.22rem;
            height: 1.2rem;
          }
          span {
            color: #E7DAFF;
            font-size: .24rem;
          }
        }
        .award-wrap  {
          padding-top: .1rem;
          display: flex;
          justify-content: flex-start;
          .sec1 {
            text-align: center;
            img {
              display: block;
              width: 1.22rem;
              height: 1.2rem;
            }
            span {
              font-size: .22rem;
              color: #E7DAFF;
            }
            &:first-child {
              position: relative;
              padding-right: .37rem;
              .add {
                position: absolute;
                width: .37rem;
                text-align: center;
                right: 0;
                top: 0;
                font-size: .4rem;
                line-height: 1.3rem;
              }
            }
            &:last-child {
              .add {
                display: none;
              }
            }
          }
        }
        .corner {
          position: absolute;
          width: 0.55rem;
          height: 0.55rem;
          background: url("./images/plus_corner.png") no-repeat;
          background-size: 100% 100%;
          left: 1.34rem;
          top: -.06rem;
        }
        .tip {
          position: absolute;
          top: 0;
          left: 2.6rem;
          width: 1.84rem;
          height: 0.47rem;
          line-height: 0.32rem;
          background: url("./images/tips.png");
          background-size: 100% 100%;
          font-size: 0.18rem;
          color: #3E2298;
          text-align: center;
        }
        .btn {
          position: absolute;
          right: .25rem;
          top: .56rem;
          width: 1.7rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          background: #F8D9E4;
          border-radius: 0.3rem;
          color: #D20F7E;
          font-weight:bold;
          font-size: .26rem;
        }
 
      }
      .btn-all {
        position: relative;
        margin: 0 auto;
        width: 3.59rem;
        height: 1.17rem;
        background: url(./images/buy-all-btn.png) no-repeat center center;
        background-size: 100% 100%;
        &.gray {
          background: url(./images/buy-all-disable.png) no-repeat center center;
          background-size: 100% 100%;
        }
        .tips {
          position: absolute;
          right: -1.01rem;
          top: -.1rem;
          width: 1.25rem;
          height: .45rem;
          background: url(./images/tips1.png) no-repeat center top;
          background-size: 100% 100%;
          font-size: .2rem;
          color: #fff;
          line-height: .36rem;
          text-align: center;
        }
      }
    }
  }
  .e-back {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    width: 0.44rem;
    height: 1.44rem;
  }
  .rule-icon {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 4;
    width: 0.44rem;
    height: 1.41rem;
  }
}
</style>
