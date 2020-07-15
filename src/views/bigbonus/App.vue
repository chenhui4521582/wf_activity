<template>
  <div class="bestbest" v-if="actInfo">
    <div class="bestbest-container">
      <img src="./images/back.png" alt="" class="back" @click="backHome">
      <img src="./images/rule.png" alt="" class="rule" @click="showPop(7)">
      <img src="./images/gonglue.png" alt="" class="gonglue" @click="showPop(7)">
      <img src="./images/today_rank.png" alt="" class="rank">
      <!--<img src="./images/yesterday_rank.png" alt="" class="rank">-->
      <div class="horn_container">
        <div class="surplus">距离活动结束剩余XXXXX</div>
        <div class="hornDiv" v-if="hornList.length">
          <horn :noticeList="hornList" :bestname="bestname"></horn>
        </div>
      </div>
      <div class="gain_quan">
        <img src="./images/quan.png" alt="" class="quan">
        <template v-if="countdown.time">
          <img src="./images/gain_quancountdown.png" alt="" class="quancountdown">
          <div class="counttime">
            <div class="countdown_item" v-for="item in countdown.time.split('')">
              <i v-if="![':'].includes(item)">{{item}}</i>
              <template v-else>{{item}}</template>
            </div>
          </div>
        </template>
      </div>
      <div class="surplus_info">
        <div class="item">今日剩余抽奖券：<i>88</i></div>
        <div class="item">中奖记录>></div>
      </div>
      <div class="today_pool">
        <img src="./images/how.png" alt="">
        <div class="pool_num">8888888</div>
      </div>
      <div class="luck_draw">
        <div class="item" v-for="(item,index) in luckDrawData">
          <span class="luck_draw_click">点击抽奖></span>
          <div class="luck_draw_info"><img src="./images/prize_quan.png" alt="">X{{item.num}}</div>
          <div class="tip">
            <span>单次最高中奖池</span>
            <span><i>{{item.max}}</i></span>
          </div>
        </div>
      </div>
      <div class="extra_prize">
        <div class="info">当天累计消耗<i>3000抽奖券</i>，下次高额券抽最多<i>3%</i>奖池</div>
        <div class="list">
          <div class="item" v-for="(item,index) in extraData">
            <div class="percent">
              <div class="percent_div">
                <span>最高瓜分奖池</span>
                <span class="percent_num">{{item.percent}}</span>
              </div>
              <img src="./images/extra_next.png" alt="" v-if="index<2">
            </div>
            <div class="num">{{item.num}}</div>
            <div class="info">消耗抽奖券</div>
          </div>
        </div>
      </div>
    </div>
    <winPop :bestname="bestname" :awardData="awardData" @openmine="showPop(6)" ref="winPop"></winPop>
    <comPop :popType="popType" :actInfoData="actInfo" :bestname="bestname" ref="comPop" @close="popType=0"
            @openprize="openprize" :package="leaguePacksListArr[3]"></comPop>
    <prize-pop :awardData="prizeItem" :bestname="bestname" ref="prizePop" @close="prizeItem=null"></prize-pop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </div>
</template>
<script>
  import {getNoticeList, showLeaguePacksList, activityInfo, drawLot} from './utils/api'

  export default {
    name: 'bestbest',
    data: () => ({
      bestname: ["中签", "上签", "上上签"],
      showPackages: false,
      popType: 0,
      leaguePacksListArr: [],
      hornList: [{
        nickname: 'XXXX', awardsName: '10个话费碎片'
      }],
      prizeItem: null,//签面领取奖品
      showBar: true,
      showLoading: false,
      actInfo: null,
      awardData: null,
      allPackagesBuyed: false,
      countdown: {//倒计时
        time: '88:88:88'
      },
      luckDrawData: [{
        num: 1,
        max: 888
      }, {
        num: 10,
        max: 8888
      }],
      extraData: [{
        percent: '0.5%',
        num: 300
      }, {
        percent: '1%',
        num: 1000
      }, {
        percent: '3%',
        num: 3000
      }]
    }),
    components: {
      horn: () => import('./components/horn'),
      winPop: () => import('./components/winPop'),
      comPop: () => import('./components/comPop'),
      prizePop: () => import('./components/prizePop'),
      loading: () => import('../../components/common/loading'),
    },
    computed: {
      moreprize() {
        return this.actInfo && [2, 3].includes(this.actInfo.state)
      }
    },
    methods: {
      move(e) {
        e.preventDefault()
      },
      //弹窗
      showPop(type) {
        this.popType = type
        let point = ''
        switch (type) {
          case 7:
            point = 'A_H5PT0274003243';
            break;//规则点击
          case 1:
            point = 'A_H5PT0274003242';
            break;//我的奖励
          case 6:
            point = 'A_H5PT0274003244';
            break;//我抽到的签
        }
        point && GLOBALS.marchSetsPoint(point)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      backHome() {
        GLOBALS.marchSetsPoint('A_H5PT0274003241')
        window.location.href = "//wap.beeplaying.com/xmWap/#/"
      },
      checkdownbtn() {
        if (this.actInfo.state == 1 && !this.actInfo.todayRecharge) {
          return
        }
        if (!this.moreprize && this.actInfo.state != 4) {
          this.showPackages = true
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0274003252')
          this.showPop(2)
        }
      },
      openprize(item) {
        this.prizeItem = item
        setTimeout(() => {
          this.$refs.prizePop.showPop()
        })
      },
      gotopay(item) {
        if (item.buyFlag == 1) {
          localStorage.setItem('originDeffer', window.location.href)
          GLOBALS.marchSetsPoint('A_H5PT0274003251', {
            recharge_rmb: item.price,
            product_id: item.bizId,
            awards_name: item.name,
            product_name: item.name
          })   // 点击任意礼包
          localStorage.setItem('JDD_PARAM', JSON.stringify(item))
          localStorage.setItem('payment', JSON.stringify(item))
          location.href =
            'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
        }
      },
      async gotolottery(type) {//0 立即抽签 1高级奖励抽签
        this.showLoading = true
        this.showBar = false
        GLOBALS.marchSetsPoint(type ? 'A_H5PT0274003253' : 'A_H5PT0274003245')
        let self = this
        if (!this.actInfo.remnantTime && this.actInfo.state != 2) {//次数不够
          if (this.moreprize) {
            this.showPop(5)
          } else {
            if (this.actInfo.todayRecharge) {
              this.showPackages = true
            } else {
              this.showPop(4)
            }
          }
          this.showLoading = false
          this.showBar = true
        } else {
          this.showLoading = true
          try {
            let {code, data, message} = await drawLot()
            if (code == 200) {
              this.awardData = data
              setTimeout(() => {
                self.showBar = true
                setTimeout(() => {
                  self.showLoading = false
                  self.$refs.winPop.showPop()
                  self._getInfo()
                }, 100)
              }, 1000)
            } else {
              this.showLoading = false
              this.showBar = true
              this.$toast.show({
                message: message,
                duration: 2000
              })
            }
          } catch (e) {
            this.showLoading = false
          }
        }
      },
      /** 获取活动信息 **/
      async _getInfo() {
        let {code, data, message} = await activityInfo()
        if (code == 200) {
          this.actInfo = data
          this._getNoticeList()
        }
      },
      async _getNoticeList() {
        let {code, data, message} = await getNoticeList()
        if (code == 200) {
          // this.hornList = data
        }
      },
      async getShowLeaguePacksList() {
        const {code, data} = await showLeaguePacksList()
        if (code === 200) {
          this.leaguePacksListArr = data.mallBizConfigs
          this.allPackagesBuyed = this.leaguePacksListArr.slice(0, 3).filter(item => item.buyFlag == 0).length == 3
        }
      },
      init() {
        this._getInfo()
      }
    },
    mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0274', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      this.init()
      this.getShowLeaguePacksList()
    },
    watch: {
      showPackages(value) {
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
<style scoped lang="less">
  @import '../../common/css/base.css';

  * {
    box-sizing: border-box;
  }

  .bestbest {
    min-height: 100vh;
    background: #2E016A;
    .bestbest-container {
      width: 100%;
      height: 11.35rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: relative;
      padding-top: 2.74rem;
      box-sizing: border-box;
      .back, .rule, .gonglue {
        width: .85rem;
        height: .85rem;
        position: absolute;
        top: .08rem;
        left: .12rem;
        &.rule {
          top: 1.01rem;
        }
        &.gonglue {
          top: 1.94rem;
        }
      }
      .rank {
        width: .88rem;
        height: .87rem;
        position: absolute;
        top: 1.81rem;
        right: .13rem;
      }
      .horn_container {
        position: absolute;
        top: 0;
        left: 1.01rem;
        width: 5.15rem;
        height: 2.65rem;
        background: url("./images/horn_container.png");
        background-size: 100% 100%;
        .surplus {
          margin-top: .13rem;
          text-align: center;
          font-size: .22rem;
          font-weight: 400;
          color: rgba(255, 227, 216, 1);
        }
        .hornDiv {
          width: 3.7rem;
          height: .44rem;
          position: absolute;
          top: 2.16rem;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
      .gain_quan {
        position: absolute;
        top: .18rem;
        right: .04rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .quan {
          width: .84rem;
          height: .95rem;
        }
        .quancountdown {
          width: 1.08rem;
          height: .3rem;
        }
        .counttime {
          font-size: 0.18rem;
          font-weight: 400;
          color: rgba(255, 238, 214, 1);
          display: flex;
          align-items: center;
          .countdown_item {
            color: rgba(255, 238, 214, 1);
            i {
              display: inline-block;
              width: 0.14rem;
              height: 0.18rem;
              color: rgba(255, 51, 42, 1);
              line-height: 0.18rem;
              text-align: center;
              background: rgba(255, 238, 214, 1);
              border-radius: 0.02rem;
              margin: 0 0.01rem;
            }
          }
        }
      }
      .surplus_info {
        padding: 0 1.04rem 0 .88rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-bottom: .1rem;
        i {
          color: #FFBF50;
        }
      }
      .today_pool {
        position: relative;
        width: 6.4rem;
        height: 2.51rem;
        background: url("./images/today_bonus.png");
        background-size: 100% 100%;
        margin: 0 auto .07rem;
        &:before {
          content: '今日奖池';
          position: absolute;
          top: .43rem;
          left: 2.49rem;
          font-size: .36rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        &:after {
          content: '(话费碎片)';
          position: absolute;
          bottom: .48rem;
          left: 2.64rem;
          font-size: .24rem;
          font-weight: 400;
          color: rgba(174, 128, 210, 1);
        }
        img {
          position: absolute;
          top: .37rem;
          right: .48rem;
          width: .33rem;
          height: .33rem;
        }
        .pool_num {
          position: absolute;
          top: .85rem;
          left: 0;
          right: 0;
          margin: auto;
          font-size: .8rem;
          font-weight: bold;
          color: rgba(229, 94, 49, 1);
          text-align: center;
        }
      }
      .luck_draw {
        display: flex;
        justify-content: center;
        margin-bottom: .17rem;
        .item {
          width: 3.14rem;
          height: 1.52rem;
          background: url("./images/prizebtn0.png");
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-bottom: .1rem;
          box-sizing: border-box;
          .luck_draw_click {
            font-size: .36rem;
            font-weight: bold;
            color: rgba(255, 227, 216, 1);
          }
          .luck_draw_info {
            margin-top: .1rem;
            font-size: .3rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
            img {
              width: .77rem;
              height: .44rem;
              margin-right: .12rem;
            }
          }
          .tip {
            content: '';
            position: absolute;
            width: 1.75rem;
            height: .8rem;
            background: url("./images/tips0.png");
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: .18rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            top: -.55rem;
            padding-bottom: .05rem;
            box-sizing: border-box;
            i {
              font-size: .36rem;
              font-weight: bold;
              color: rgba(255, 203, 68, 1);
              line-height: 1;
            }
          }
          &:nth-child(1) {
            .tip {
              left: 0;
            }
          }
          &:nth-child(2) {
            margin-left: .2rem;
            background: url("./images/prizebtn1.png");
            background-size: 100% 100%;
            .tip {
              background: url("./images/tips1.png");
              background-size: 100% 100%;
              right: 0;
            }
          }
        }
      }
      .extra_prize {
        width: 6.28rem;
        height: 3.36rem;
        background: url("./images/extra_bg.png");
        background-size: 100% 100%;
        padding-top: .68rem;
        box-sizing: border-box;
        margin: 0 auto;
        .info {
          font-size: .24rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          i {
            color: #E55E31;
          }
        }
        .list {
          display: flex;
          justify-content: center;
          .item {
            text-align: center;
            .percent {
              height: 1.71rem;
              display: flex;
              justify-content: center;
              align-items: center;
              .percent_div {
                width: 1.31rem;
                height: 1.36rem;
                background: url("./images/extra.png");
                background-size: 100% 100%;
                padding-top: .16rem;
                box-sizing: border-box;
                text-align: center;
                span {
                  font-size: .18rem;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  &.percent_num {
                    margin-top: .26rem;
                    font-size: .36rem;
                    font-weight: bold;
                    color: rgba(252, 236, 63, 1);
                  }
                }
                &.gray {
                  background: url("./images/extra_gray.png");
                  background-size: 100% 100%;
                }
                &.light {
                  width: 1.66rem;
                  height: 1.71rem;
                  background: url("./images/extra_light.png");
                  background-size: 100% 100%;
                  padding-top: .33rem;
                  box-sizing: border-box;
                }
              }
              img {
                width: .22rem;
                height: .35rem;
                margin: 0 .1rem;
              }
            }
            .num,.info{
              width: 1.31rem;
              text-align: center;
              &.light{
                width: 1.66rem;
              }
              &.num {
                font-size: .3rem;
                font-weight: bold;
                color: rgba(252, 236, 63, 1);
              }
              &.info {
                font-size: .2rem;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
      }
    }
    .downbtn {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100vw;
      height: 1.04rem;
      background: url('./images/downbtn.png') center center / 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      font-size: .28rem;
      font-weight: bold;
      color: rgba(95, 9, 7, 1);
      padding-top: .1rem;
      box-sizing: border-box;
      i {
        color: #FF3131;
      }
      .item:nth-child(2) {
        margin-top: .1rem;
      }
      &:not(.moreprize):before {
        content: '';
        position: absolute;
        top: -.28rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 1.79rem;
        height: .28rem;
        background: url('./images/uparrow.png') center center / 100% 100%;
      }
      .item.moreprize {
        font-size: .32rem;
        font-weight: bold;
        color: rgba(95, 9, 7, 1);
        i {
          color: #FF1B16;
        }
        &:nth-child(2) {
          font-size: .24rem;
          font-weight: bold;
          text-decoration: underline;
          color: rgba(199, 61, 26, 1);
        }
      }
    }
  }

  .pop-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .drop-down {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 2;
    .drop-down-content {
      width: 100%;
      height: 4.2rem;
      position: fixed;
      left: 0;
      bottom: 0;
      font-size: 0.2rem;
      z-index: 12;
      box-sizing: border-box;
      background: url('./images/packages.png') center center / 100% 100%;
      padding: 0 .26rem;
      box-sizing: border-box;
      p {
        font-size: .28rem;
        font-weight: bold;
        color: rgba(95, 9, 7, 1);
        text-align: center;
        margin: .44rem 0 .31rem;
      }
      .packages {
        display: flex;
        justify-content: space-around;
        .item {
          width: 2.08rem;
          height: 2.77rem;
          text-align: center;
          background: rgba(255, 255, 255, 1);
          border-radius: .14rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 1.42rem;
            height: 1.42rem;
          }
          .item-text {
            font-size: 0.2rem;
            color: rgba(108, 108, 108, 1);
            line-height: 0.26rem;
          }
          .btn-price {
            margin-top: .13rem;
            width: 1.5rem;
            height: 0.5rem;
            line-height: 0.5rem;
            color: rgba(255, 255, 255, 1);
            border-radius: 0.25rem;
            font-size: 0.24rem;
            font-weight: bold;
            text-align: center;
            background: rgba(255, 47, 47, 1);
            &.gray {
              background: rgba(136, 136, 136, 1);
            }
          }
        }
      }
      .downarrow {
        position: absolute;
        top: -.38rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 1.79rem;
        height: .38rem;
        background: url('./images/downarrow.png') center center / 100% 100%;
      }
      &.gray:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0, 0, 0, .5);
        border-radius: .35rem .35rem 0 0;
      }
      &.gray:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 2.17rem;
        height: 2.17rem;
        background: url("./images/buyover.png");
        background-size: 100% 100%;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }

  /*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  @keyframes huxi {
    0% {
      transform: scale(0.9);
    }
    10% {
      transform: scale(1);
    }
    20% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1);
    }
    40% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1);
    }
    80% {
      transform: scale(0.9);
    }
    90% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.9);
    }
  }
</style>
