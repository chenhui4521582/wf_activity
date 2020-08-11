<template>
  <div class="waveact" :class="{noshowrank:!showRank}">
    <template v-if="actData">
      <div class="waveact_container" v-show="!showRank" :class="{fixed:isShowDown}">
        <div class="top">
          <div class="back" @click="back">
            返回
          </div>
          <div class="rule" @click="showPop(0)">
            规则
          </div>
          <div class="gonglue" @click="showPop(6)">
            攻略
          </div>
          <div class="rank" @click="gotoRank">
            排行榜
          </div>
          <div class="myprize" @click="showPop(1)">
            我的奖励
          </div>
          <div class="active-time">
            <div class="counttime" v-if="countTime">
              活动剩余时间：
              <div class="countdown_item" v-for="item in countTime.split('')">
                <i v-if="!['天','时','分','秒'].includes(item)">{{item}}</i>
                <template v-else>{{item}}</template>
              </div>
            </div>
            <!--<span style="white-space: nowrap;" v-else>活动已结束</span>-->
          </div>
        </div>
        <game @gotowave="gotowave" :my-info="userData" :act-info="actData" :horn-list="hornList"
              ref="game" @resetpop="resetExpand"></game>
        <prize @openprize='checkPrizeInfo'></prize>
      </div>
      <profit v-if="showRank" @back="rankBack" :my-info="userData" :count-down="countTime"
              @refresh="getActInfo"></profit>
      <drop-down ref="dropDown" :rules-explain="time" v-if="!showRank" :my-info="userData" :act-info="actData"
                 @refresh="refresh" @showPop="showPop" @resetpop="resetExpand"></drop-down>
      <com-pop :pop-type="popType" :prize-info-type="prizeInfoType"
               :wave-prize-info-type="wavePrizeInfoType" :rule-time="time" :award-data="awardData"
               :max-can-select-limit="maxCanSelectLimit" ref="comPop" :jinbinum="jinbinum"
               @close="popType=0" @gotowavedirect="gotowavedirect" @showPop="showPop"
               @closeDown="$refs.dropDown.isDropDown = false"></com-pop>
    </template>
    <loading v-show="showLoading"></loading>
  </div>
</template>


<script>
  import Services from './services/services'
  import game from './component/game'
  import prize from './component/prize'

  export default {
    data() {
      return {
        showRule: false,
        prizeshow: true,
        num: '',
        time: '',
        popType: 0, // 0 规则 1我的奖励 2奖品信息 3抽奖弹窗
        prizeInfoType: 0, // 0 特等奖 1 一等奖 2 二等奖 3 三等奖 4 参与奖
        wavePrizeInfoType: 0, // 0 游戏币不足 1. 切换投注额度 2中奖弹窗
        awardData: null, // 摇中奖品数据
        maxCanSelectLimit: null,
        jinbinum: 0, // 点击领取获得金币数
        showRank: false, // 是否展示排行榜
        actData: null, // 活动信息
        userData: null, // 用户信息
        awardsLevelItem: null, // 选中的档位
        showLoading: false,
        hornList: [],
        countTime: '',
        isShowDown: false
      }
    },
    methods: {
      getLevelName(showLevel) {
        switch (showLevel) {
          case 1:
            return '参与奖'
            break
          case 2:
            return '三等奖'
            break
          case 3:
            return '二等奖'
            break
          case 4:
            return '一等奖'
            break
          case 5:
            return '特等奖'
            break
        }
      },
      checkPrizeInfo(type) {
        this.resetExpand()
        this.popType = 2
        this.prizeInfoType = parseInt(type)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      back() { // 返回
        this.resetExpand()
        GLOBALS.marchSetsPoint('A_H5PT0229002654')// H5平台-双旦活动页-返回按钮点击
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
      },
      rankBack() {
        this.resetExpand()
        if (this.actData.state == 1) {
          this.showRank = false
        } else {
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
        }
      },
      gotoRank() { // 去排行榜
        this.resetExpand()
        GLOBALS.marchSetsPoint('A_H5PT0229002656') // H5平台-双旦活动页-排行榜按钮点击
        setTimeout(() => {
          this.showRank = true
        })
      },
      showPop(type) { // 展示弹窗
        this.resetExpand()
        // A_H5PT0229002655 H5平台-双旦活动页-规则按钮点击
        // A_H5PT0229002658 H5平台-双旦活动页-摇奖记录按钮点击
        let points = ['A_H5PT0229002655', 'A_H5PT0229002658']
        GLOBALS.marchSetsPoint(points[type])
        this.popType = type
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      gotowave({item, popType, wavePrizeInfoType, maxCanSelectLimit, awardData}) {
        this.resetExpand()
        this.awardsLevelItem = item
        this.popType = popType
        this.wavePrizeInfoType = wavePrizeInfoType
        this.maxCanSelectLimit = maxCanSelectLimit
        this.awardData = awardData
        if (wavePrizeInfoType == 2) {
          this.getUserInfo()
        }
        setTimeout(() => {
          this.$refs.comPop.showPop()
        }, 100)
      },
      async gotowavedirect() {
        this.resetExpand()
        this.$refs.game.gotowavedirect()
      },
      async getActInfo(flag) {
        let {code, data} = (await Services.getActInfo()).data
        if (code == 200) {
          flag && GLOBALS.marchSetsPoint('P_H5PT0229', {
            source_address: GLOBALS.getUrlParam('from') || ''
          })// H5平台-双旦活动页面加载完成
          this.actData = data
          this.getCountDown(this.actData.countdown)
          this.time = data.beginDate + '-' + data.endDate
          this.showRank = data.state != 1
          this.getUserInfo()
          if (data.firstPopup) {
            setTimeout(() => {
              this.showPop(5)
            }, 1000)
          }
        }
      },
      async getUserInfo() {
        let {code, data} = (await Services.getUserInfo()).data
        if (code == 200) {
          this.userData = data
          if (this.actData.state == 1) {
            this.getHornList()
          }
        }
      },
      async getHornList() {
        let {code, data} = (await Services.getHornList()).data
        if (code == 200) {
          this.hornList = data
        }
      },
      refresh(num) {
        this.getUserInfo()
        if (num) {
          this.popType = 3
          this.wavePrizeInfoType = 3
          this.jinbinum = num
          setTimeout(() => {
            this.$refs.comPop.showPop()
          }, 100)
        }
      },
      getCountDown(item) {
        if (!item) return false
        let date = item / 1000
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
          let countDay = day >= 10 ? day : '0' + day
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          if (day > 0) {
            this.countTime = `${countDay}天${countHour}时${countMinute}分${countSecond}秒`
          } else {
            this.countTime = `${countHour}时${countMinute}分${countSecond}秒`
          }
        }, 1000)
      },
      resetExpand(isShowDown = false) {
        this.$refs.game.show = false
        this.isShowDown = !!isShowDown
      }
    },
    components: {
      game,
      prize,
      comPop: () => import('./component/comPop'),
      dropDown: () => import('./component/dropDown'),
      profit: () => import('./component/dropDown/component/profit'),
      loading: () => import('../../components/common/loading.vue')
    },
    mounted() {
      this.getActInfo(true)
    },
    watch: {
      countTime(val) {
        if (!val) {
          this.getActInfo(false)
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../../common/css/base.css";

  .top {
    width: 7.2rem;
    height: 1.44rem;
  }

  .waveact {
    width: 7.2rem;
    min-height: 100vh;
    background: #FC4B2E;
    .waveact_container {
      width: 7.2rem;
      height: 14.43rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      &.fixed {
        position: fixed;
      }
    }
  }

  .top span {
    text-align: center;
    display: block;
    top: 1rem;
  }

  .active-time {
    position: absolute;
    top: 1.57rem;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    font-size: 0.24rem;
    color: rgba(209, 228, 250, 1);
    .counttime {
      font-size: 0.24rem;
      color: rgba(209, 228, 250, 1);
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
      .countdown_item {
        color: rgba(255, 238, 214, 1);
        i {
          display: inline-block;
          width: 0.2rem;
          height: 0.24rem;
          color: rgba(255, 83, 45, 1);
          line-height: 0.26rem;
          text-align: center;
          background: rgba(255, 238, 214, 1);
          border-radius: 0.02rem;
          margin: 0 0.01rem;
        }
      }
    }
  }

  .back, .rule, .gonglue, .myprize {
    height: .47rem;
    padding: 0 .1rem;
    background: rgba(106, 64, 220, 1);
    border-radius: 0 .24rem .24rem 0;
    position: absolute;
    top: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    z-index: 1;
    &.rule {
      top: .84rem;
    }
    &.gonglue {
      top: 1.46rem;
    }
    &.myprize {
      right: 0;
      border-radius: .24rem 0 0 .24rem;
    }
  }

  .rank {
    background: url("./images/right.png");
    background-size: 100% 100%;
    width: .94rem;
    height: 1.01rem;
    padding-top: .71rem;
    box-sizing: border-box;
    position: absolute;
    top: 0.95rem;
    right: .08rem;
    z-index: 1;
    font-size: .22rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
</style>
