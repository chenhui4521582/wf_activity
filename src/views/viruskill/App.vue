<template>
  <div class="viruskill" :class="{end:isEnd,showDown:$refs.dropDown&&$refs.dropDown.isDropDown}"
       v-if="actInfoData">
    <template v-if="!isEnd">
      <div class="viruskill_container">
        <div class="clickIcons">
          <div class="item">
            <div class="back" @click="back">
              首页
            </div>
            <div class="gonglue" @click="showPop(4)">
              攻略 + 奖品
            </div>
          </div>
          <div class="item">
            <div class="rule" @click="showPop(7)">
              规则
            </div>
            <div class="myprize" @click="showPop(1)">
              已获奖励
            </div>
          </div>
        </div>
        <div class="virus-animation">
          <div class="container">
            <img src="./imgs/x10.png" alt="" class="x10" v-if="useVaccine" :class="{killed:allKilled}">
            <img :src="`${require(`./imgs/virus${item}.png`)}`" alt=""
                 v-for="(item,index) in virus"
                 :class="{killed:killIndex==index||allKilled,down:animateArr.includes(index+'')}">
          </div>
        </div>
        <div class="virus-percent">
          <div class="item">剩余病毒</div>
          <div class="item">
            <div class="progress-bar"
                 :style="{width:((actInfoData.userInfo.totalVirusNum-actInfoData.userInfo.totalKillNum)/actInfoData.userInfo.totalVirusNum*100).toFixed(2) + '%'}"
                 :class="{percent100:actInfoData.userInfo.totalVirusNum==actInfoData.userInfo.totalKillNum}">
            </div>
            <div class="progress-bar-text">{{((actInfoData.userInfo.totalVirusNum-actInfoData.userInfo.totalKillNum)/actInfoData.userInfo.totalVirusNum*100).toFixed(2) + '%'}}</div>
          </div>
        </div>
        <div class="alreadyKill">
          <div class="item">已累计消灭病毒</div>
          <div class="item">{{actInfoData.userInfo.totalKillNum|filterPrice}}个</div>
        </div>
        <div class="virus-box">
          <div class="item" v-for="item in actInfoData.userInfo.userPropList" @click="gotokill(item,false)">
            <img src="./imgs/pill.png" alt="" v-if="item.propType==1">
            <img src="./imgs/alcohol.png" alt="" v-else-if="item.propType==2">
            <img src="./imgs/vaccine.png" alt="" v-else-if="item.propType==3">
            剩余{{item.remnantNum}}个
          </div>
        </div>
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
    <loading v-show="showLoading" :showBar="false"></loading>
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
        wavePrizeInfoType: 0, // 0 幸运币不足 1. 切换投注额度 2中奖弹窗
        maxCanSelectLimit: null,
        jinbinum: null, // 点击领取获得金币数
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
        numberArray: [1, 1, 1],
        killIndex: -1,
        addIndex: -1,//需要填补的病毒INDEX
        allKilled: false,
        virus: [],//病毒数组
        animateArr: [],//需要下移的病毒数组
        useVaccine: false,//使用疫苗
        currentItem: null
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
        GLOBALS.marchSetsPoint('A_H5PT0248002901')   // 点击返回
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      //弹窗
      showPop(type) {
        this.popType = type
        let point = ''
        switch (type) {
          case 7:
            point = 'A_H5PT0248002903';
            break;//规则点击
          case 1:
            point = 'A_H5PT0248002904';
            break;//我的奖励
          case 4:
            point = 'A_H5PT0248002902';
            break;//攻略
        }
        point && GLOBALS.marchSetsPoint(point)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
        if ([7, 6].includes(type)) {
          setTimeout(() => {
            this.$refs.comPop.showPop()
          }, 1500)
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
        flag && GLOBALS.marchSetsPoint('P_H5PT0248', {
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
      async gotokill(item,isgotokill) {
        if(!isgotokill){
          let points=['A_H5PT0248002905','A_H5PT0248002906','A_H5PT0248002907']
          GLOBALS.marchSetsPoint(points[item.propType-1])
        }
        this.currentItem = item
        if (item.remnantNum == 0) {
          this.gotowavepop({item: item, popType: 3, wavePrizeInfoType: 0})
        } else {
          this.showLoading = true
          this.showBar = false
          let {code, data, message} = (await Services.runAnimation(item.propType)).data
          if (code == 200) {
            if (item.propType == 1) {//消灭1个
              this.killIndex = Math.floor(0 + Math.round(49 * Math.random()))
              //需要移动位置的病毒INDEX
              let killIndex1 = parseInt(this.killIndex % 10); // 个位数
              let killIndex0 = parseInt((this.killIndex % 100) / 10);  // 十位数
              let arr=[]
              for (let i = 0; i < killIndex0; i++) {
                this.animateArr.push((i || '') + '' + killIndex1)//需要下移的INDEX
                arr.push(this.virus[parseInt((i || '') + '' + killIndex1)])
              }
              this.addIndex = killIndex1//需要补位的INDEX
              setTimeout(() => {
                this.killIndex = -1
                this.animateArr = []
                for (let i = 0; i < killIndex0; i++) {
                  let index = parseInt((i || '') + '' + killIndex1)
                  this.virus[index + 10] = arr[i]
                }
                this.virus[this.addIndex] = Math.floor(1 + Math.round(2 * Math.random()))
              }, 1000)
            } else {//消灭整屏
              this.allKilled = true
              this.useVaccine = item.propType == 3
              setTimeout(() => {
                this.virus = []
                this.allKilled = false
                this.useVaccine = false
                for (let i = 0; i < 50; i++) {
                  setTimeout(() => {
                    this.virus.push(Math.floor(1 + Math.round(2 * Math.random())))
                  }, 100)
                }
              }, 500)
            }
            setTimeout(() => {
              this.showBar = true
              setTimeout(() => {
                this.showLoading = false
                this.gotowavepop({
                  popType: 3,
                  wavePrizeInfoType: 2,
                  awardData: {
                    propType: data.propType,
                    thisKillNum: data.thisKillNum,
                    awardName: data.awardsInfo.awardsName,
                    awardType: data.awardsInfo.awardsType,
                    totalKillNum: data.userInfo.totalKillNum
                  }
                })
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
        }
      },
      gotowave() {
        this.showLoading = true
        let item = this.actInfo.stageList[this.currentIndex]
        let selectVal = item.consumeNum
        GLOBALS.marchSetsPoint('A_H5PT0245002841', {task_id: item.awardsLevel}) //H5平台-双旦活动页-摇一摇按钮点击
        let maxItems = this.actInfo.stageList.filter(item => item.consumeNum < this.actInfo.remanentNum && item.consumeNum > selectVal)
        if (this.actInfo.remanentNum < selectVal) {
          // GLOBALS.marchSetsPoint('A_H5PT0229002661') //H5平台-双旦活动页-摇一摇点击后幸运币不足弹窗加载完成
          this.gotowavepop({item: item, popType: 3, wavePrizeInfoType: 0})
          this.showLoading = false
        } else if (maxItems.length > 0) {//拥有的幸运币可支持比当前选中的更高的档位
          // GLOBALS.marchSetsPoint('A_H5PT0229002665') //H5平台-双旦活动页-摇一摇点击后幸运币充足提示弹窗加载完成
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
        this.gotokill(this.currentItem,true)
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
      refresh(data) {
        this.getActInfo(false)
        if (data) {
          this.popType = 3
          this.wavePrizeInfoType = 3
          this.jinbinum = data
          setTimeout(() => {
            this.$refs.comPop.showPop()
          }, 100)
        }
      },
    },
    mounted() {
      for (let i = 0; i < 50; i++) {
        this.virus.push(Math.floor(1 + Math.round(2 * Math.random())))
      }
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

  .viruskill {
    background: rgb(48, 56, 201);
    height: 100vh;
    position: relative;
    padding-bottom: .94rem;
    &.showDown {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
    }
    .viruskill_container {
      position: relative;
      height: 11.37rem;
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
          font-size: .24rem;
          font-weight: 400;
          color: #fff;
          /*&:nth-child(1) {*/
          .back {
            width: .48rem;
            height: .91rem;
            padding: 0 .13rem;
            box-sizing: border-box;
            border-radius: 0 .2rem .2rem 0;
            background: #41D3DC;
            display: flex;
            align-items: center;
          }
          .rule {
            margin-top: .02rem;
            width: .48rem;
            height: .91rem;
            padding: 0 .13rem;
            box-sizing: border-box;
            border-radius: .2rem 0 0 .2rem;
            background: #F6A98B;
            display: flex;
            align-items: center;
          }
          /*}*/
          /*&:nth-child(2) {*/
          .myprize {
            margin-top: .02rem;
            width: .48rem;
            height: 1.21rem;
            padding: 0 .13rem;
            box-sizing: border-box;
            border-radius: .2rem 0 0 .2rem;
            background: #FF568E;
            display: flex;
            align-items: center;
          }
          .gonglue {
            margin-top: .02rem;
            width: .48rem;
            height: 1.3rem;
            padding: 0 .13rem;
            box-sizing: border-box;
            border-radius: 0 .2rem .2rem 0;
            background: #D366F2;
            display: flex;
            align-items: center;
          }
          /*}*/
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
      .virus-animation {
        position: absolute;
        top: 2.8rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 6rem;
        height: 4.5rem;
        overflow: hidden;
        .container {
          display: flex;
          flex-wrap: wrap;
          position: relative;
          img {
            width: .6rem;
            height: .67rem;
            margin-bottom: .3rem;
            &.killed {
              animation: scalehide .5s forwards ease-in-out;
            }
            &.down {
              animation: downPosition .5s .5s forwards ease-in-out;
            }
          }
          .x10 { //.useVaccine
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 2.48rem;
            height: .99rem;
            background: url("./imgs/x10.png");
            background-size: 100% 100%;
            z-index: 1;
            &.killed {
              animation: scalehide 1s forwards ease-in-out;
            }
          }
        }
      }
      .virus-percent {
        position: absolute;
        top: 7.64rem;
        left: .8rem;
        width: 5.57rem;
        height: .3rem;
        background: rgba(202, 122, 91, 1);
        box-shadow: 0px 1px 0px 0px rgba(255, 213, 198, 0.77), 0px 2px 0px 0px rgba(42, 15, 12, 0.21);
        border-radius: .15rem;
        display: flex;
        align-items: center;
        .item {
          &:nth-child(1) {
            width: 1.06rem;
            font-size: .22rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: .3rem;
            background: rgba(144, 67, 37, 1);
            border-radius: .15rem 0 0 .15rem;
          }
          &:nth-child(2) {
            width: 4.43rem;
            height: .22rem;
            background: rgba(252, 194, 171, 1);
            border-radius: 0 .11rem .11rem 0;
            position: relative;
            .progress-bar {
              height: .22rem;
              background: rgba(26, 65, 232, 1);
              max-width: 100%;
              &.percent100 {
                border-radius: 0 .11rem .11rem 0;
              }
            }
            .progress-bar-text{
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              text-align: center;
              line-height: .22rem;
              font-size:.2rem;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
          }
        }
      }
      .alreadyKill {
        position: absolute;
        top: 8.4rem;
        left: 1.6rem;
        right: 1.48rem;
        font-size: .26rem;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        color: rgba(208, 210, 255, 1);
        display: flex;
        .item {
          flex: 1;
          text-align: center;
          &:nth-child(2) {
            font-size: .28rem;
            color: rgba(255, 228, 79, 1);
            border-left: 1px solid #D0D2FF;
          }
        }
      }
      .virus-box {
        position: absolute;
        top: 8.85rem;
        left: 1.35rem;
        width: 5.35rem;
        height: 1.26rem;
        display: flex;
        justify-content: space-around;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(208, 210, 255, 1);
        .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 1.58rem;
            height: .83rem;
            margin-bottom: .06rem;
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

  @keyframes scalehide {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    30% {
      transform: scale(1.5);
      opacity: 1;
    }
    70% {
      transform: scale(1.3);
      opacity: .5;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  @keyframes downPosition {
    100% {
      transform: translate(0, .97rem);
    }
  }
</style>
