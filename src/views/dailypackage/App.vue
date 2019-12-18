<template>
  <div id="app">
    <section class="after" id="after">
      <div class="container" v-if="myInfo">
        <img src="./images/back.png" class="e-back" @click.stop="back">
        <rule ref="rule" :ruleMain="myInfo.startTime+'~'+myInfo.endTime"></rule>
        <div class="tabs" :class="{tab1:tabIndex==0,tab2:tabIndex==1}">
          <div class="item" :class="{selected:tabIndex==0}" @click="settabIndex(0)">限购礼包</div>
          <div class="item" :class="{selected:tabIndex==1}" @click="settabIndex(1)">幸运币兑换</div>
        </div>
      </div>
      <div class="container1" v-if="myInfo">
        <span class="total-num">我的幸运币：{{myInfo.myCoin}}</span>
        <div class="container1_container">
          <template v-if="tabIndex==0">
            <div class="packgaes">
              <div class="item" v-for="(item,index) in taskInfo">
                <template v-if="index<3">
                  <div class="sec1">
                    <div class="item"
                      v-for="(item1,index1) in item.awardsList.slice().sort((a,b)=>(b.awardsType-a.awardsType))">
                      <img src="./images/fudai.png" alt="" v-if="item1.awardsType==28">
                      <img src="./images/package_leaf.png" alt="" v-if="item1.awardsType==1">
                      <span v-if="item1.awardsType==28">幸运币福袋</span>
                      <span v-if="item1.awardsType==1">{{item1.awardsNum}}金叶</span>
                    </div>
                    <div class="tip">{{item.name}}</div>
                  </div>
                  <div class="sec2">
                    <div class="item">
                      <img :src="item.productIcon|filter" alt="">
                      <span>{{item.amount}}金叶</span>
                    </div>
                    <div class="btn gray" @click="gotopay(item,false)" v-if="item.buyFlag == 0">
                      {{item.price}}元抢购</div>
                    <div class="btn" @click="gotopay(item,true)" v-else>{{item.price}}元抢购</div>
                  </div>
                </template>
                <template v-else>
                  <div class="btn-all" @click="gotopay(item,item.buyFlag != 0)"
                    :class="{gray:item.buyFlag == 0}">
                    {{item.price}}元全部抢购
                  </div>
                </template>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="awards"
              v-if="coinInfo&&coinInfo.limitedTimePackageExchangeAwardsList.length">
              <div class="item"
                v-for="(item,index) in coinInfo.limitedTimePackageExchangeAwardsList"
                :class="{tabIndex:!tabIndex,lt3:index<3}">
                <div class="content" :class="{hot:item.corner}">
                  <img :src="item.awardsImg|filter" alt="">
                  <div class="name">{{item.awardsName}}</div>
                </div>
                <div class="btn" @click="gain(item)"><img src="./images/jinbi.png"
                    alt="">x{{item.costCoin}}</div>
              </div>
            </div>
          </template>
          <p
            style="display: flex;align-items: center;justify-content: center;font-size: .2rem;color:rgba(233,226,255,1);padding-bottom: .25rem;">
            *每种礼包每天限购1次，每天0点刷新购买次数 <img src="./images/rule.png" alt="" @click="showrule"
              style="width: .3rem;height: .3rem;margin-left: .14rem"></p>
        </div>
      </div>
      <common-pop :is-show-pop="isShowPop" :fail="fail" :surplus='surplus' :awardData="awardData"
        @close-pop="isShowPop=false" @gototask="gototask" @exchange="exchange"></common-pop>
      <common-package-pop :is-show-pop="isShowPackagePop" :fail="fail" :awardData="awardPackageData"
        @close-pop="isShowPackagePop=false" @gototask="gototask" @exchange="exchange">
      </common-package-pop>
      <loading v-show="isLoading"></loading>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
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
        localStorage.setItem('originDeffer', window.location.href)
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      } else {//当日已购买
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
  width: 100vw;
  height: 11.36rem;
  position: relative;
  background: #fff;
  padding: 0.26rem 0;
  box-sizing: border-box;
  font-size: 0.28rem;
  color: rgba(21, 0, 43, 1);
  .container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 11.36rem;
    background: url("./images/bg.png");
    background-size: 100% 100%;
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
      top: 2.74rem;
      left: 0.6rem;
      text-align: center;
      display: flex;
      margin: auto;
      .item {
        flex: 1;
        line-height: 0.75rem;
        width: 3rem;
        height: 0.7rem;
        background: rgba(223, 140, 247, 1);
        color: rgba(110, 30, 209, 1);
        &.selected {
          color: rgba(255, 255, 255, 1);
          background: rgba(136, 54, 237, 1);
        }
        &:nth-child(1) {
          border-radius: 0.35rem 0 0 0.35rem;
        }
        &:nth-child(2) {
          border-radius: 0 0.35rem 0.35rem 0;
        }
      }
      font-size: 0.28rem;
      font-weight: bold;
    }
  }
  .container1 {
    position: absolute;
    top: 3.45rem;
    width: 100%;
    margin-bottom: 0.5rem;
    .title {
      display: flex;
      align-items: center;
      font-weight: bold;
      color: rgba(21, 0, 43, 1);
      margin-bottom: 0.3rem;
    }
    .total-num {
      display: inline-block;
      position: relative;
      top: 0.26rem;
      left: 50%;
      transform: translateX(-50%);
      padding: 0 0.25rem;
      min-width: 1.7rem;
      height: 0.5rem;
      background: #940c9f;
      border-radius: 0.25rem;
      font-size: 0.22rem;
      font-weight: bold;
      color: #fff;
      box-sizing: border-box;
      text-align: center;
      line-height: 0.55rem;
    }
    .container1_container {
      position: relative;
      top: 0.51rem;
      padding: 0 0.2rem;
      /*margin-bottom: 1.25rem;*/
      .awards {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 0.38rem;
        width: 6.8rem;
        padding: 0.3rem;
        box-sizing: border-box;
        background: rgba(204, 163, 255, 1);
        border-radius: 0.1rem;
        .item {
          height: 2.5rem;
          margin-bottom: 0.1rem;
          border-radius: 0.12rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          box-sizing: border-box;
          margin-right: 0.85rem;
          &:nth-child(3n) {
            margin-right: 0;
          }
          &.lt3 {
            margin-bottom: 0.4rem;
          }
          .content {
            width: 1.5rem;
            height: 1.66rem;
            display: flex;
            flex-direction: column;
            background: url("./images/duihuan_bg.png");
            background-size: 100% 100%;
            position: relative;
            &.hot:before {
              content: "";
              position: absolute;
              width: 0.5rem;
              height: 0.56rem;
              background: url("./images/hot.png");
              background-size: 100% 100%;
            }
            .name {
              font-size: 0.24rem;
              font-weight: bold;
              color: rgba(99, 57, 0, 1);
              text-align: center;
              height: 0.45rem;
              line-height: 0.45rem;
            }
          }
          &.tabIndex {
            height: 2.1rem;
            padding: 0.2rem 0;
          }
          img {
            width: 1.5rem;
            height: 1.22rem;
          }
          .btn {
            margin-top: 0.23rem;
            width: 1.5rem;
            height: 0.6rem;
            text-align: center;
            line-height: 0.6rem;
            background: linear-gradient(
              0deg,
              rgba(249, 104, 48, 1) 0%,
              rgba(234, 62, 98, 1) 0%,
              rgba(254, 160, 117, 1) 99%
            );
            border-radius: 0.3rem;
            font-size: 0.34rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 0.42rem;
              height: 0.42rem;
              margin-right: 0.1rem;
            }
          }
          &.surplus {
            width: 3.35rem;
          }
        }
      }
      .packgaes {
        .item {
          position: relative;
          height: 1.6rem;
          font-size: 0.22rem;
          margin-bottom: 0.25rem;
          .sec1 {
            position: absolute;
            width: 3.58rem;
            height: 1.6rem;
            background: rgba(255, 210, 139, 1);
            border-radius: 0.1rem;
            display: flex;
            padding: 0 0.6rem;
            box-sizing: border-box;
            justify-content: space-around;
            z-index: 1;
            color: #633900;
            .item {
              display: flex;
              flex-direction: column;
              text-align: center;
              justify-content: center;
              img {
                width: 0.94rem;
                height: 0.94rem;
                display: inline-block;
                margin: 0 auto;
              }
              span {
                margin-top: 0.12rem;
              }
            }
            &:before {
              content: "";
              position: absolute;
              width: 0.68rem;
              height: 0.6rem;
              background: url("./images/plus_corner.png");
              background-size: 100% 100%;
              left: 0;
            }
            .tip {
              position: absolute;
              top: -0.1rem;
              left: 0.7rem;
              width: 1.8rem;
              height: 0.42rem;
              line-height: 0.32rem;
              background: url("./images/tips.png");
              background-size: 100% 100%;
              font-size: 0.18rem;
              font-weight: bold;
              color: rgba(142, 86, 0, 1);
              text-align: center;
              padding-bottom: 0.1rem;
              box-sizing: border-box;
            }
          }
          .sec2 {
            position: absolute;
            width: 6.8rem;
            height: 1.38rem;
            background: url("./images/package_bg.png");
            background-size: 100% 100%;
            padding-left: 3.7rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-around;
            top: 0;
            bottom: 0;
            margin: auto;
            .item {
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
              height: 100%;
              margin: auto 0;
              span {
                color: rgba(28, 11, 80, 1);
              }
            }
            .btn {
              width: 1.5rem;
              height: 0.6rem;
              line-height: 0.6rem;
              text-align: center;
              background: linear-gradient(
                0deg,
                rgba(249, 104, 48, 1) 0%,
                rgba(234, 62, 98, 1) 0%,
                rgba(254, 160, 117, 1) 99%
              );
              border-radius: 0.3rem;
              color: rgba(255, 255, 255, 1);
              &.gray {
                background: rgba(115, 97, 138, 1);
              }
            }
          }
          &:nth-child(4) {
            height: 0.8rem;
            .btn-all {
              width: 3rem;
              height: 0.8rem;
              line-height: 0.8rem;
              text-align: center;
              background: linear-gradient(
                0deg,
                rgba(252, 232, 74, 1) 0%,
                rgba(254, 173, 45, 1) 99%
              );
              border-radius: 0.4rem;
              font-size: 0.32rem;
              font-weight: bold;
              color: rgba(116, 55, 3, 1);
              margin: auto;
              position: relative;
              &.gray {
                color: rgba(255, 255, 255, 1);
                background: rgba(115, 97, 138, 1);
              }
              &:before {
                content: "";
                position: absolute;
                width: 0.75rem;
                height: 0.65rem;
                right: 0;
                background: url("./images/discount.png");
                background-size: 100% 100%;
              }
            }
          }
          &:nth-child(1) {
            .sec2 {
              img {
                width: 0.94rem;
                height: 1.03rem;
              }
            }
          }
          &:nth-child(2) {
            .sec2 {
              img {
                width: 1.15rem;
                height: 1.08rem;
              }
            }
          }
          &:nth-child(3) {
            .sec2 {
              img {
                width: 1.11rem;
                height: 1.03rem;
              }
            }
          }
        }
      }
    }
  }
  .e-back {
    width: 0.66rem;
    position: absolute;
    top: 0.1rem;
    left: 0;
    z-index: 4;
  }
  .rule-icon {
    width: 0.74rem;
    height: 0.4rem;
    line-height: 0.42rem;
    position: absolute;
    right: 0;
    top: 0.5rem;
    font-size: 0.24rem;
    font-weight: bold;
    color: #ff7225;
    text-align: center;
    background: #ffffff;
    border-radius: 0.2rem 0px 0px 0.2rem;
  }
}
</style>
