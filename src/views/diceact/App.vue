<template>
  <div class="lanternfestival" :class="{end:isEnd,showDown:$refs.dropDown&&$refs.dropDown.isDropDown}"
       v-if="actInfoData">
    <template v-if="!isEnd">
      <div class="lanternfestival_container">
        <div class="clickIcons">
          <div class="item">
            <div class="back" @click="back">
              首页
            </div>
            <div class="rule" @click="showPop(0)">
              规则
            </div>
          </div>
          <div class="item">
            <div class="myprize" @click="showPop(1)">
              我的奖励
            </div>
            <div class="gonglue" @click="showPop(4)">
              攻略
            </div>
          </div>
        </div>
        <div class="dice_annimation" :class="{animation:showLoading&&!showBar}">
          <div class="item" v-for="item in numberArray"
               :style="{backgroundImage:`url(${require(`./imgs/dicepics/dice${item}.png`)})`}"
               v-if="!(showLoading&&!showBar)"></div>
        </div>
        <div class="prize_consume">
          <div class="pop" v-show="show">
            <div class="pop_inner">
              <div class="pop_inner1">
                <div v-for="(item,key) in actInfo.stageList.slice().reverse()" :key="key" @click="selectStage(item)">
                  <img src="./imgs/gamecoin.png"><span>消耗{{item.consumeNum}}个幸运币</span>
                </div>
              </div>
            </div>
          </div>
          <div class="prize_consume_bg">
            <img src="./imgs/gamecoin.png" alt/>
            <div class="text">消耗{{actInfo.stageList[currentIndex].consumeNum}}个幸运币</div>
            <img src="./imgs/up.png" @click="up"/>
          </div>
        </div>
        <div class="btn_play" :class="{down:showLoading&&!showBar}" @click="gotowave"></div>
      </div>
      <div class="lanternfestival_detail">
        <div class="lanternfestival_detail_info">
          <div class="item">
            <div class="txt">已消耗幸运币</div>
            <div class="line"></div>
            <div class="txtnum">{{(actInfo&&actInfo.useNum)|filterPrice}}</div>
          </div>
          <div class="item">
            <div class="txt">当前可用幸运币</div>
            <div class="line"></div>
            <div class="txtnum">{{actInfo&&actInfo.remanentNum|filterPrice}}</div>
          </div>
        </div>
        <span>奖励说明</span>
        <prize @openprize='checkPrizeInfo'></prize>
      </div>
      <drop-down ref="dropDown" :toDayUserCouponNum="actInfoData.totalNum" :rules-explain="rulesExplain"
                 @refresh="refresh" :countTime="actInfoData.countdown" :endDate="actInfoData.endDate"
                 @showPop="hitShowPop"></drop-down>
    </template>
    <template v-else>
      <profit :is-full="true" @showPop="showPop"/>
    </template>
    <com-pop :pop-type="popType" :prize-info-type="prizeInfoType"
             :wave-prize-info-type="wavePrizeInfoType" :rule-time="rulesExplain" :award-data="awardData"
             :awardList="awardList" :max-can-select-limit="maxCanSelectLimit" ref="comPop" :jinbinum="jinbinum"
             :myRank="myRank"
             @close="popType=0" @gotowavedirect="gotowavedirect" @opengame="showPop(5)"></com-pop>
    <loading v-show="showLoading" :showBar="showBar"></loading>
  </div>
</template>

<script>
  /* eslint-disable */
  import '../../common/js/window.js';
  import Services from './services/services'

  export default {
    name: 'App',
    data() {
      return {
        countTime: '',//瓜分倒计时
        rulesExplain: '',//活动时间段
        isEnd: false,//是否活动结束
        popType: 0,//窗口类型 0 领取昨日幸运币奖励 1 活动规则 2 瓜分记录 3 瓜分攻略 4 大家都在玩 5 开榜 6 任务流水领取弹窗   // 0 规则 1我的奖励 2奖品信息 3抽奖弹窗
        prizeInfoType: 0, // 0 特等奖 1 一等奖 2 二等奖 3 三等奖 4 参与奖
        wavePrizeInfoType: 0, // 0 游戏币不足 1. 切换投注额度 2中奖弹窗
        maxCanSelectLimit: null,
        jinbinum: 0, // 点击领取获得金币数
        awardsLevelItem: null, // 选中的档位
        awardData: null,//弹窗奖励
        isHasGift: false,//是否有昨日未领取的奖励
        awardList: [],//开榜奖品
        myRank: 0,//我的发榜排名
        actInfoData: null,//活动信息数据
        actInfo: null,//活动信息数据
        show: false,
        currentIndex: 0,
        showBar: true,
        showLoading: false,
        numberArray: [1, 1, 1]
      }
    },
    components: {
      dropDown: () => import('./dropDown'),//副页
      profit: () => import('./component/profit'),//排行榜
      prize: () => import('./component/prize'),
      comPop: () => import('./component/comPop'),//弹窗
      loading: () => import('../../components/common/loading'),
    },
    methods: {
      getLevelName(showLevel) {
        switch (showLevel) {
          case 1:
            return '参与奖';
            break;
          case 2:
            return '三等奖';
            break;
          case 3:
            return '二等奖';
            break;
          case 4:
            return '一等奖';
            break;
          case 5:
            return '特等奖';
            break;
        }
      },
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
        this.countTime = `${countHour}:${countMinute}:${countSecond}`
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
            this.countTime = `${day}天${countHour}:${countMinute}:${countSecond}`
          } else {
            this.countTime = `${countHour}:${countMinute}:${countSecond}`
          }
        }, 1000)
      },
      //返回
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0245002837')   // 点击返回
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      //弹窗
      showPop(type) {
        this.popType = type
        let point = ''
        switch (type) {
          case 0:
            point = 'A_H5PT0245002838';
            break;//规则点击
          case 1:
            point = 'A_H5PT0245002840';
            break;//我的奖励
          case 4:
            point = 'A_H5PT0245002839';
            break;//攻略
        }
        point && GLOBALS.marchSetsPoint(point)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
        if ([0, 6].includes(type)) {
          setTimeout(() => {
            this.$refs.comPop.showPop()
          }, 1000)
        } else {
          setTimeout(() => {
            this.$refs.comPop.showPop()
          })
        }
      },
      //活动信息
      async getActInfo(flag) {
        let {code, data} = (await Services.getActInfo()).data
        if (code == 200) {
          this.actInfoData = data
          this.actInfo = data
          if (data.state == 1) {
            this.isEnd = false
            this.rulesExplain = data.beginDate + '~' + data.endDate
            this.countDown(data.countdown)
          } else {
            this.isEnd = true
            this.getUserAwardsTips()
          }
        }
        flag && GLOBALS.marchSetsPoint('P_H5PT0245', {
          source_address: GLOBALS.getUrlParam('from') || ''
        })
      },
      //奖励提示（昨日奖励+开榜）
      async getUserAwardsTips() {//getMyRank
        let {code, data} = (await Services.getMyRank()).data
        if (code == 200) {
          if (data.popup) {//盈利榜弹窗只弹一次
            this.myRank = data.myRank
            this.awardList = data.awardsList || []
            //GLOBALS.marchSetsPoint(this.awardList.length ? 'A_H5PT0240002793' : 'A_H5PT0240002794')
            this.showPop(6)//盈利榜发榜弹窗
          }
        }
      },
      hitShowPop(data) {
        this.popType = data.type
        data.awardData && (this.awardData = data.awardData)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      up() {
        this.show = !this.show
      },
      selectStage(item) {
        this.currentIndex = item.awardsLevel - 1;
        // GLOBALS.marchSetsPoint('A_H5PT0229002660', {task_id: this.currentIndex}) //H5平台-双旦活动页-消耗游戏币选择按钮点击
        this.up()
      },
      gotowave() {
        this.showLoading = true
        let item = this.actInfo.stageList[this.currentIndex]
        let selectVal = item.consumeNum
        GLOBALS.marchSetsPoint('A_H5PT0245002841', {task_id: item.awardsLevel}) //H5平台-双旦活动页-摇一摇按钮点击
        let maxItems = this.actInfo.stageList.filter(item => item.consumeNum < this.actInfo.remanentNum && item.consumeNum > selectVal)
        if (this.actInfo.remanentNum < selectVal) {
          // GLOBALS.marchSetsPoint('A_H5PT0229002661') //H5平台-双旦活动页-摇一摇点击后游戏币不足弹窗加载完成
          this.gotowavepop({item: item, popType: 3, wavePrizeInfoType: 0})
          this.showLoading = false
        } else if (maxItems.length > 0) {//拥有的游戏币可支持比当前选中的更高的档位
          // GLOBALS.marchSetsPoint('A_H5PT0229002665') //H5平台-双旦活动页-摇一摇点击后游戏币充足提示弹窗加载完成
          this.gotowavepop({
            item: item,
            popType: 3,
            wavePrizeInfoType: 1,
            maxCanSelectLimit: maxItems.sort()[maxItems.length - 1]
          })
          this.showLoading = false
        } else {
          this.gotowavedirect()
        }
      },
      async gotowavedirect() {
        this.showLoading = true
        this.showBar = false
        let self = this
        let {consumeNum, awardsLevel} = this.actInfo.stageList[this.currentIndex]
        if (this.actInfo.remanentNum < consumeNum) {
          // GLOBALS.marchSetsPoint('A_H5PT0229002661') //H5平台-双旦活动页-摇一摇点击后游戏币不足弹窗加载完成
          this.gotowavepop({item: self.actInfo.stageList[self.currentIndex], popType: 3, wavePrizeInfoType: 0})
          this.showLoading = false
        } else {
          this.showLoading = true
          try {
            let {code, data, message} = (await Services.runAnimation(awardsLevel)).data
            if (code == 200) {
              this.awardData = data
              setTimeout(() => {
                self.showLoading = false
                self.showBar = true
                self.numberArray = self.awardData.numberArray
                this.gotowavepop({
                  item: self.actInfo.stageList[self.currentIndex],
                  popType: 3,
                  wavePrizeInfoType: 2,
                  awardData: {
                    awardType: self.awardData.awardsType,
                    awardName: self.awardData.awardsName,
                    levelName: self.getLevelName(self.awardData.showLevel + 1),
                    icons: self.awardData.numberArray
                  }
                })
              }, 100)
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
      gotowavepop({item, popType, wavePrizeInfoType, maxCanSelectLimit, awardData}) {
        this.awardsLevelItem = item
        this.popType = popType
        this.wavePrizeInfoType = wavePrizeInfoType
        this.maxCanSelectLimit = maxCanSelectLimit
        this.awardData = awardData
        if (wavePrizeInfoType == 2) {
          this.getActInfo(false)
        }
        setTimeout(() => {
          this.$refs.comPop.showPop()
        }, 100)
      },
      checkPrizeInfo(type) {
        this.popType = 2
        this.prizeInfoType = parseInt(type)
        GLOBALS.marchSetsPoint('A_H5PT0245002842', {
          awards_name: type - 1
        })
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      refresh(num) {
        this.getActInfo(false)
        if (num) {
          this.popType = 3
          this.wavePrizeInfoType = 3
          this.jinbinum = num
          setTimeout(() => {
            this.$refs.comPop.showPop()
          }, 100)
        }
      },
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

  .lanternfestival {
    background: #833834;
    height: 100vh;
    position: relative;
    padding-bottom: 1.2rem;
    &.showDown {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
    }
    &.end {
      background: url("./imgs/bg1.png");
      background-size: 100% 1.03rem;
    }
    .lanternfestival_container {
      position: relative;
      height: 6.42rem;
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
          display: flex;
          flex-direction: column;
          font-size: .3rem;
          font-weight: bold;
          color: rgba(255, 254, 254, 1);
          &:nth-child(1) {
            .back {
              width: .6rem;
              height: 1.12rem;
              padding: 0 .13rem;
              box-sizing: border-box;
              border-radius: 0 .2rem .2rem 0;
              background: rgba(125, 192, 105, 1);
              display: flex;
              align-items: center;
            }
            .rule {
              margin-top: .02rem;
              width: .6rem;
              height: 1.12rem;
              padding: 0 .13rem;
              box-sizing: border-box;
              border-radius: 0 .2rem .2rem 0;
              background: rgba(255, 149, 36, 1);
              display: flex;
              align-items: center;
            }
          }
          &:nth-child(2) {
            .myprize {
              margin-top: .02rem;
              width: .55rem;
              height: 1.5rem;
              padding: 0 .13rem;
              box-sizing: border-box;
              border-radius: .2rem 0 0 .2rem;
              background: #E6685A;
              display: flex;
              align-items: center;
            }
            .gonglue {
              margin-top: .02rem;
              width: .55rem;
              height: 1.12rem;
              padding: 0 .13rem;
              box-sizing: border-box;
              border-radius: .2rem 0 0 .2rem;
              background: rgba(255, 149, 36, 1);
              display: flex;
              align-items: center;
            }
          }
        }
      }
      .dice_annimation {
        position: absolute;
        height: .89rem;
        top: 3.3rem;
        left: 2.25rem;
        right: 2.12rem;
        margin: auto;
        display: flex;
        justify-content: space-between;
        &.animation {
          background: url("./imgs/touzi.gif");
          background-size: 100% 100%;
        }
        .item {
          width: .84rem;
          height: .89rem;
          &:nth-child(1) {
            background-size: 100% 100%;
          }
          &:nth-child(2) {
            background-size: 100% 100%;
          }
          &:nth-child(3) {
            background-size: 100% 100%;
          }
        }
      }
      .prize_consume {
        position: absolute;
        width: 2.8rem;
        height: 0.5rem;
        top: 5.08rem;
        left: 2.2rem;
      }
      .prize_consume_bg {
        width: 2.8rem;
        height: 0.5rem;
        img {
          &:first-child {
            width: 0.3rem;
            height: 0.3rem;
            position: absolute;
            top: 0.1rem;
            left: 0.09rem;
          }
          &:last-child {
            width: 0.59rem;
            height: 0.44rem;
            position: absolute;
            top: 0.04rem;
            // bottom: 0.03rem;
            left: 2.2rem;
          }
        }
      }
      .text {
        position: absolute;
        left: .4rem;
        right: .6rem;
        top: .17rem;
        display: flex;
        align-items: center;
        height: .22rem;
        font-size: .22rem;
        font-weight: 400;
        color: rgba(255, 199, 81, 1);
        justify-content: center;
      }
      .pop {
        background: url("./imgs/pop.png");
        background-size: 100% 100%;
        width: 2.91rem;
        height: 2.37rem;
        position: absolute;
        top: -2.5rem;
        z-index: 1;
      }
      .pop_inner {
        width: 2.43rem;
        height: 2rem;
        align-items: center;
        position: absolute;
        margin: 0 auto;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
      }
      .pop_inner1 {
        // height: 0.24rem;
        width: 100% !important;

        font-size: 0.22rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        // line-height:14px;
      }
      .pop_inner1 div {
        border-bottom: 1px solid #284761;
        padding-top: 0.12rem;
        padding-bottom: 0.1rem;
        height: 0.54rem;
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }
      .pop_inner1 img {
        width: 0.24rem;
        height: 0.24rem;
        position: absolute;
        left: 0.1rem;
      }
      .pop_inner span {
        position: absolute;
        white-space: nowrap;
        /* width: 0.24rem; */
        height: 0.24rem;
        left: 0.45rem;
      }
      .pop_inner1 div:last-child {
        border-bottom: 0px;
      }
      .btn_play {
        width: 1.58rem;
        height: 1.09rem;
        background: url("imgs/btnUp.png");
        background-size: 100% 100%;
        position: absolute;
        bottom: .9rem;
        right: .15rem;
        &.down {
          background: url("imgs/btnDown.png");
          background-size: 100% 100%;
        }
      }
    }
    .lanternfestival_detail {
      position: relative;
      height: 3.94rem;
      background: url("imgs/prizeDetails.png");
      background-size: 100% 100%;
      span {
        position: absolute;
        top: .6rem;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        font-size: .3rem;
        font-weight: 400;
        color: rgba(205, 133, 116, 1);
      }
      .lanternfestival_detail_info {
        width: 6.76rem;
        height: .89rem;
        background: url("./imgs/tabs.png");
        background-size: 100% 100%;
        display: flex;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: -.35rem;
        .item {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: .2rem 0 .1rem;
          box-sizing: border-box;
          font-size: .24rem;
          font-weight: 400;
          .line {
            width: 1px;
            height: .31rem;
            background: rgba(248, 194, 181, 1);
            margin: 0 .1rem;
          }
          &:nth-child(1) {
            color: rgba(248, 194, 181, 1);
          }
          &:nth-child(2) {
            color: rgba(255, 211, 101, 1);
            .line {
              background: rgba(255, 213, 101, 1);
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
