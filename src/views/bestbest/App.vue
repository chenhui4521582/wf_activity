<template>
  <div class="bestbest" v-if="actInfo">
    <div class="bestbest-container">
      <img src="./images/back.png" alt="" class="back" @click="backHome">
      <div class="horn" v-if="hornList.length">
        <horn :noticeList="hornList" :bestname="bestname"></horn>
      </div>
      <div class="rule" @click="showPop(7)">活动规则</div>
      <div class="myprize" @click="showPop(1)">奖励</div>
      <img src="./images/mine.png" alt="" class="mine" @click="showPop(6)">
      <div class="bestbest-person" :class="{animation:!showBar}">
        <template v-if="showBar">
          <template v-if="actInfo.state!=4">
            <img src="./images/playbtn.png" alt="" @click="gotolottery(0)" v-if="!moreprize"
                 :class="{end:showPackages}">
            <img src="./images/prizebtn.png" alt="" @click="gotolottery(1)" v-if="moreprize"
                 :class="{end:showPackages}">
          </template>
          <img src="./images/overbtn.png" alt="" class="end" v-else>
        </template>
      </div>
      <div class="best-num">抽签次数：<i>{{actInfo.remnantTime||0}}次</i></div>
    </div>
    <div class="downbtn" :class="{moreprize:moreprize||(actInfo.state==1&&!actInfo.todayRecharge)||(actInfo.state==4)}"
         @click="checkdownbtn" v-if="!showPackages">
      <template v-if="!moreprize&&actInfo.state!=4">
        <div class="item">参与任意{{actInfo.ultimateMinTime}}天即可<i>免费抽取高额奖励</i>上上签！</div>
        <div class="item">{{actInfo.ultimateDate}}0点开启！</div>
      </template>
      <template v-else>
        <div class="item" :class="{moreprize:moreprize}">高额奖励上上签,<i>最高抽取150元奖励！</i></div>
        <div class="item" :class="{moreprize:moreprize}">查看大家手气>></div>
      </template>
    </div>
    <div class="pop-mask" v-if="showPackages" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="showPackages">
        <div class="drop-down-content" :class="{gray:allPackagesBuyed}">
          <p>购买下列礼包可获得抽签次数</p>
          <div class="packages">
            <div class="item" v-for="(item,index) in leaguePacksListArr.slice(0,3)" @click="gotopay(item)">
              <img :src="`${require(`./images/package${index}.png`)}`" alt="">
              <span
                class="item-text">{{item.content.split('+')[0]}}<br/>+{{item.content.split('+')[1]}}</span>
              <a href="javascript:" class="btn-price" :class="{gray:item.buyFlag==0}">{{item.price}}元购买</a>
            </div>
          </div>
          <div class="downarrow" @click="showPackages=false"></div>
        </div>
      </div>
    </transition>
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
      hornList: [],
      prizeItem: null,//签面领取奖品
      showBar: true,
      showLoading: false,
      actInfo: null,
      awardData: null,
      allPackagesBuyed: false
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
        if (!this.moreprize&&this.actInfo.state!=4) {
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
        if (!this.actInfo.remnantTime&&this.actInfo.state!=2) {//次数不够
          if(this.moreprize){
            this.showPop(5)
          }else{
            if(this.actInfo.todayRecharge){
              this.showPackages=true
            }else{
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
          this.hornList = data
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
    background: #D52B42;
    .bestbest-container {
      width: 100%;
      height: 13.01rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: relative;
      padding-top: 2.14rem;
      box-sizing: border-box;
      .back {
        width: .5rem;
        height: .5rem;
        position: absolute;
        top: .12rem;
        left: .23rem;
      }
      .mine {
        width: .81rem;
        height: 1.83rem;
        position: absolute;
        top: 6.41rem;
        right: .29rem;
        z-index: 1;
      }
      .horn {
        width: 3.95rem;
        height: .44rem;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: url("./images/horn.png");
        background-size: 100% 100%;
      }
      .rule, .myprize {
        width: .55rem;
        height: 1.31rem;
        background: rgba(156, 28, 43, 1);
        border-radius: .28rem;
        font-size: .24rem;
        font-weight: bold;
        color: rgba(52, 8, 12, 1);
        position: absolute;
        right: .2rem;
        padding: 0 .15rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        line-height: .24rem;
        &.rule {
          top: .53rem
        }
        &.myprize {
          height: 1.06rem;
          top: 2.03rem
        }
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 11.25rem;
        background: url("./images/decoration.png");
        background-size: 100% 100%;
      }
      .bestbest-person {
        position: relative;
        left: 0;
        right: 0;
        margin: auto;
        width: 5.73rem;
        height: 7.48rem;
        background: url("./images/person.png");
        background-size: 100% 100%;
        &.animation {
          top: -1.8rem;
          width: 7.2rem;
          height: 11.36rem;
          background: url("./images/animation.gif");
          background-size: 100% 100%;
        }
        img {
          position: absolute;
          left: 2.29rem;
          bottom: 2rem;
          width: 1.21rem;
          height: 1.51rem;
          &:not(.end) {
            animation: huxi 3s infinite ease-in-out;
          }
        }
      }
      .best-num {
        height: .6rem;
        font-size: .28rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: .6rem;
        i {
          color: #FFC418;
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
