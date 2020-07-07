<template>
  <div class="koiwish" v-if="actInfo">
    <img class="back" src="./images/back.png" alt="" @click="back">
    <img class="rule" src="./images/rule.png" alt="" @click="showPop(1)">
    <img class="gonglue" src="./images/gonglue.png" alt="" @click="showPop(2)">
    <div class="myzhuzhu">{{actInfo.userInfo.remnantNum}}
      <div class="plus" @click="showPop(3,true)"></div>
    </div>
    <div class="myprize" :class="{reddot:actInfo.unReceiveNum}" @click="showPop(4)"></div>
    <div class="container">
      <div class="level" v-for="(poolitem,poolindex) in actInfo.jackpotList"
           :class="{level0:poolindex==0,level1:poolindex==1}">
        <div class="wish"
             :class="{gray:poolitem.jackpotStatus==2,wish0:poolindex==0,wish1:poolindex==1,showSuccess:showSuccess==poolitem.jackpotType}">
          <div class="left">
            <div class="item">第</div>
            <div class="item" :class="{wish0:poolindex==0,wish1:poolindex==1}">{{poolitem.round}}</div>
            <div class="item">场</div>
          </div>
          <div class="total"
               :class="{wish0:poolindex==0,wish1:poolindex==1,light:(poolindex==0&&countdown1.time ||poolindex==1&&countdown2.time)}">
            当前累计 <img src="./images/zhuzhu0.png"
                      alt="">
            ：<i>{{poolitem.currentAmount}}</i></div>
          <div class="r_info" :class="{wish0:poolindex==0,wish1:poolindex==1}">奖池蓄满{{poolitem.limitAmount}}抽锦鲤</div>
          <div class="prizes">
            <div class="item" v-for="(item,index) in poolitem.koiList">
              <div class="name">{{jiliNames[item.level-1]}}</div>
              <img :src="`${require(`./images/${item.level}.png`)}`" alt="">
              <div class="prize" :class="{wish0:poolindex==0,wish1:poolindex==1}">{{item.awardsName}}</div>
            </div>
          </div>
          <div class="btnwish" :class="{gray:poolitem.jackpotStatus==2}" @click="gotowish(poolitem)"></div>
          <div class="gradient_pop"
               :class="{expand:(poolindex==0&&expand0)||(poolindex==1&&expand1),wish0:poolindex==0,wish1:poolindex==1}" v-if="(poolindex==0&&expand0)||(poolindex==1&&expand1)">
            <div class="item" v-for="(item,index) in poolitem.betArray">
              <div class="item_item" @click="selectGradient(poolindex,index)">
                <img src="./images/zhuzhu0.png" alt="">
                <span>{{item}}</span>
              </div>
            </div>
          </div>
          <div class="gradient"
               :class="{gray:poolitem.jackpotStatus==2,wish0:poolindex==0,wish1:poolindex==1}">
            <div class="item single" @click="poolitem.jackpotStatus<2&&(poolindex==0&&(expand0=!expand0)||poolindex==1&&(expand1=!expand1))">
              <div class="item_item">
                <img src="./images/zhuzhu0.png" alt="">
                <span v-if="poolindex==0">{{poolitem.betArray[gradientIndex0]}}</span>
                <span v-else>{{poolitem.betArray[gradientIndex1]}}</span>
              </div>
              <i class="iconfont icon-next" :class="{expand:(poolindex==0&&expand0||poolindex==1&&expand1)}"></i>
            </div>
          </div>
          <div class="counttime" v-if="poolindex==0&&countdown1.time || (poolindex==1&&countdown2.time)">
            许愿抽锦鲤<br>
            <template v-if="poolindex==0">{{countdown1.time}}秒后结束</template>
            <template v-else>{{countdown2.time}}秒后结束</template>
          </div>
        </div>
        <div class="info">·当前场次累计消耗许愿珠：<i>{{poolitem.myProgress}}</i></div>
        <div class="percent">
          <div class="prizes">
            <div class="item" v-for="(item,index) in poolitem.progressList">
              <div class="prize" :class="{selected:item.unlock,wish0:poolindex==0,wish1:poolindex==1}" v-if="index<=2">
                {{item.awardsName.replace(getAwardName(item.awardsType),'')}}<br>{{getAwardName(item.awardsType)}}
              </div>
              <div class="prize" :class="{wish0:poolindex==0,wish1:poolindex==1}" v-else>
                <div class="tips">{{item.awardsName}}</div>
              </div>
              <div class="zhuzhu" :class="{selected:item.unlock}"><img src="./images/zhuzhu0.png" alt="">
                {{item.consume}}
              </div>
            </div>
          </div>
          <div class="progress">
            <div class="progressbar" :style="{width:percent[poolitem.progressList.filter(item=>item.unlock).length]}"
                 :class="{nolight:poolitem.myProgress<poolitem.progressList[0].consume||poolitem.myProgress>=poolitem.progressList[poolitem.progressList.length-1].consume}"></div>
          </div>
        </div>
        <div class="desc" v-if="poolindex==0">
          <div class="item">·单场消耗许愿珠解锁奖品，可到【领奖】框领取；</div>
          <div class="item">·开奖倒计时开始，用高值许愿珠许愿，锦鲤中率更高。</div>
        </div>
      </div>
    </div>
    <com-pop :pop-type="popType" :awardData="awardData" ref="comPop" @close="popType=0"
             :isNotEnough="isNotEnough" @refresh="getActInfo" :ruleTime="actInfo.beginDate" :totalRound="actInfo.totalRound"></com-pop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </div>
</template>

<script>
  /* eslint-disable */
  import '../../common/js/window.js';
  import {activityInfo, getDynamic, prizeVow} from './utils/api'

  export default {
    name: 'App',
    data() {
      return {
        gradientIndex0: 0,
        expand0: false,
        gradientIndex1: 0,
        expand1: false,
        jiliNames: ['紫锦鲤', '橙锦鲤', '红锦鲤', '蓝锦鲤', '白锦鲤', '绿锦鲤'],
        popType: 0,//1.规则 2.攻略 3.游戏弹窗 4.领奖 5.恭喜获得
        showLoading: false,
        isNotEnough: false,
        actInfo: null,
        percent: ['0%', '27%', '52%', '78%', '100%'],
        showSuccess: 0,
        awardData: null,
        timer: null,
        countdown1: {
          time: ''
        },
        countdown2: {
          time: ''
        },
      }
    },
    components: {
      comPop: () => import('./components/comPop'),
      loading: () => import('../../components/common/loading.vue')
    },
    methods: {
      getAwardName(awardType) {
        switch (awardType) {
          case 'jyz':
            return '金叶子';
            break;
          case 'yg':
            return '鱼干';
            break;
          case 'jdk':
            return '京东券';
            break;
          case 'hfq':
            return '话费券';
            break;
        }
      },
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0300003565')
        this.resetExpand()
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      showPop(popType, isEnough) {
        this.resetExpand()
        //1.规则 2.攻略 3.游戏弹窗 4.领奖 5.恭喜获得
        let points = ['A_H5PT0300003566', 'A_H5PT0300003567', isEnough ? 'A_H5PT0300003568' : '', 'A_H5PT0300003569']
        points[popType - 1] && GLOBALS.marchSetsPoint(points[popType - 1])
        if (popType == 3) {
          this.isNotEnough = !isEnough
        }
        this.popType = popType
        setTimeout(() => {
          if (popType == 3) {
            GLOBALS.marchSetsPoint(isEnough ? 'A_H5PT0300003571' : 'A_H5PT0300003573')
          }
          this.$refs.comPop.showPop()
        })
      },
      selectGradient(flag, index) {
        this['gradientIndex' + flag] = index
        this['expand' + flag] = false
      },
      async gotowish(poolitem) {
        this.resetExpand()
        //剩余珠珠小于选择的梯度即珠珠不够许愿
        if (poolitem.jackpotStatus == 2) return
        GLOBALS.marchSetsPoint(poolitem.jackpotType == 1 ? 'A_H5PT0300003570' : 'A_H5PT0300003577')
        if (this.actInfo.userInfo.remnantNum < poolitem.betArray[poolitem.jackpotType == 1 ? this.gradientIndex0 : this.gradientIndex1]) {
          this.showPop(3, false)
        } else {
          this.showLoading = true
          try{
            const {code, data, message} = await prizeVow({
              jackpotType: poolitem.jackpotType,
              round: poolitem.round,
              amount: poolitem.betArray[poolitem.jackpotType == 1 ? this.gradientIndex0 : this.gradientIndex1],
            })
            if (code === 200) {
              if (data.businessType == 2 && data.hitInfo && data.hitInfo.winning || (data.businessType == 1 && data.wishingInfo && data.wishingInfo.unlock)) {
                this.awardData = Object.assign(data.hitInfo || data.wishingInfo, {
                  jackpotType: poolitem.jackpotType,
                  round: poolitem.round,
                  awardsType: data.businessType == 2 ? '' : (data.hitInfo || data.wishingInfo)["awardsType"]
                })
                data.wishingInfo && data.wishingInfo.unlock && GLOBALS.marchSetsPoint('A_H5PT0300003574', {
                  awards_name: data.wishingInfo.awardsName
                })
                data.hitInfo && data.hitInfo.winning && GLOBALS.marchSetsPoint('A_H5PT0300003576', {
                  awards_name: data.hitInfo.awardsName
                })
                setTimeout(() => {
                  this.showPop(5)
                  this.showLoading = false
                }, 1000)
              } else {
                this.showSuccess = poolitem.jackpotType
                setTimeout(() => {
                  this.showSuccess = 0
                  this.showLoading = false
                }, 1000)
              }
              this.getActInfo()
            } else {
              this.$toast.show({
                message
              })
              this.showLoading = false
            }
          }catch(e){
            this.showLoading = false
          }
        }
      },
      async getActInfo() {
        this.resetExpand()
        const {code, data} = await activityInfo()
        if (code === 200) {
          this.actInfo = data
          //幸运珠新增
          if (data.incrNum) {
            this.awardData = {
              "awardsName": `${data.incrNum}颗许愿珠`,
              "awardsType": ""
            }
            setTimeout(() => {
              GLOBALS.marchSetsPoint('A_H5PT0300003572')
              this.showPop(5)
            }, 1000)
          }
          !this.countdown1.time && this.actInfo.jackpotList[0].jackpotCountdown && GLOBALS.remainingTimeExt(
            this,
            this.actInfo.jackpotList[0].jackpotCountdown,
            this.countdown1
          )
          !this.countdown2.time && this.actInfo.jackpotList[1].jackpotCountdown && GLOBALS.remainingTimeExt(
            this,
            this.actInfo.jackpotList[1].jackpotCountdown,
            this.countdown2
          )
          if (this.timer) {
            clearInterval(this.timer)
          }
          //两个奖池中有一个是奖池开启，进行接口轮询
          if (data.jackpotList.filter(item => item.jackpotStatus == 0).length) {
            this.timer = setInterval(async () => {
              let res = await getDynamic()
              if (res.code == 200) {
                this.actInfo.jackpotList[0] = Object.assign(this.actInfo.jackpotList[0], res.data[0])
                this.actInfo.jackpotList[1] = Object.assign(this.actInfo.jackpotList[1], res.data[1])
                !this.countdown1.time && this.actInfo.jackpotList[0].jackpotCountdown && GLOBALS.remainingTimeExt(
                  this,
                  this.actInfo.jackpotList[0].jackpotCountdown,
                  this.countdown1
                )
                !this.countdown2.time && this.actInfo.jackpotList[1].jackpotCountdown && GLOBALS.remainingTimeExt(
                  this,
                  this.actInfo.jackpotList[1].jackpotCountdown,
                  this.countdown2
                )
                //两个奖池中有一个是奖池开启，进行接口轮询
                if (res.data.filter(item => item.jackpotStatus == 0).length == 0) {
                  clearInterval(this.timer)
                  this.timer = null
                }
              }
            }, 5000)
          } else {
            clearInterval(this.timer)
            this.timer = null
          }
        }
      },
      resetExpand() {
        this.expand0 = false
        this.expand1 = false
      }
    },
    async mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0300', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      this.getActInfo()
    },
    watch: {
      'countdown1.time': function (val) {
        if (!val) {
          this.getActInfo()
        }
      },
      'countdown2.time': function (val) {
        if (!val) {
          this.getActInfo()
        }
      }
    }
  }
</script>
<style lang="less">
  @import '../../common/css/base.css';
  @import url('./iconfont/iconfont.css');

  .koiwish {
    min-height: 100vh;
    position: relative;
    background: #770101;
    padding: 2.87rem 0 .5rem;
    box-sizing: border-box;
    &:before {
      content: '';
      width: 100%;
      position: absolute;
      top: -1.23rem;
      height: 5.42rem;
      background: url("./images/top.png");
      background-size: 100% 100%;
    }
    .back {
      width: .7rem;
      height: .64rem;
      position: absolute;
      top: .12rem;
    }
    .rule {
      width: .98rem;
      height: .64rem;
      position: absolute;
      top: .78rem;
    }
    .gonglue {
      width: .98rem;
      height: .64rem;
      position: absolute;
      top: 1.44rem;
    }
    .myzhuzhu {
      width: 1.76rem;
      height: .76rem;
      background: url("./images/myzhuzhu.png");
      background-size: 100% 100%;
      position: absolute;
      top: 2.1rem;
      left: .27rem;
      padding: 0 .3rem 0 .58rem;
      box-sizing: border-box;
      text-align: center;
      line-height: .8rem;
      font-size: .24rem;
      font-weight: bold;
      color: rgba(255, 240, 179, 1);
      &:before {
        content: '';
        width: .44rem;
        height: .45rem;
        background: url("./images/zhuzhu1.png");
        background-size: 100% 100%;
        position: absolute;
        top: .16rem;
        left: .15rem;
      }
      .plus {
        content: '';
        width: 1rem;
        height: 1rem;
        background: url("./images/plus.png");
        background-size: 100% 100%;
        position: absolute;
        top: -.11rem;
        right: -0.5rem;
      }
    }
    .myprize {
      width: 1.48rem;
      height: 1.13rem;
      background: url("./images/receiveprize.png");
      background-size: 100% 100%;
      position: absolute;
      top: 1.73rem;
      right: .09rem;
      &.reddot:before {
        content: '';
        width: .12rem;
        height: .12rem;
        background: rgba(202, 24, 24, 1);
        border-radius: 50%;
        position: absolute;
        top: .62rem;
        left: 1.04rem;
      }
    }
    .container {
      position: relative;
      padding: 0 .3rem;
      box-sizing: border-box;
      .level {
        position: relative;
        &.level0 {
          .wish {
            position: relative;
            padding-top: 1.13rem;
            box-sizing: border-box;
            width: 6.6rem;
            height: 4.96rem;
            background: url("./images/wish0bg.png");
            background-size: 100% 100%;
          }
        }
        &.level1 {
          margin-top: .3rem;
          .wish {
            position: relative;
            padding-top: .97rem;
            box-sizing: border-box;
            width: 6.6rem;
            height: 4.96rem;
            background: url("./images/wish1bg.png");
            background-size: 100% 100%;
          }
        }
        .wish {
          .left {
            position: absolute;
            top: 2.1rem;
            width: .8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: .28rem;
            font-weight: bold;
            color: rgba(244, 231, 168, 1);
            .item:nth-child(2) {
              margin: .1rem 0;
              width: .44rem;
              height: .44rem;
              line-height: .44rem;
              text-align: center;
              background: rgba(244, 231, 168, 1);
              border-radius: 50%;
              color: #00565D;
              &.wish1 {
                color: #770101;
              }
            }
          }
          .total {
            margin: auto;
            width: 3.01rem;
            height: .9rem;
            background: url("./images/wish0_total.png");
            background-size: 100% 100%;
            font-size: .22rem;
            font-weight: bold;
            color: rgba(244, 231, 168, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            i {
              font-size: .28rem;
              color: #FFFC0D;
            }
            img {
              margin-left: .1rem;
              width: .3rem;
              height: .3rem;
            }
            &.wish1 {
              background: url("./images/wish1_total.png");
              background-size: 100% 100%;
            }
            &:before {
              content: '';
              width: 3.01rem;
              height: .9rem;
              background: url("./images/light1.png");
              background-size: 100% 100%;
              position: absolute;
              left: 0;
              right: 0;
              margin: auto;
            }
            &.light:before {
              animation: changeBg 1s infinite ease;
            }
          }
          .r_info {
            margin: .05rem 0 .2rem;
            font-size: .2rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(255, 242, 189, 1);
            text-align: center;
            &.wish1 {
              margin: .05rem 0 .29rem;
              color: #FEEFBA
            }
          }
          .prizes {
            display: flex;
            justify-content: space-between;
            padding: 0 .11rem 0 .93rem;
            box-sizing: border-box;
            .item {
              display: flex;
              flex-direction: column;
              align-items: center;
              .name {
                margin-bottom: .19rem;
                font-size: .26rem;
                font-weight: bold;
                color: rgba(255, 242, 189, 1);
                text-align: center;
              }
              img {
                width: 1.6rem;
                height: 1.03rem;
              }
              .prize {
                margin-top: -.02rem;
                width: 1.55rem;
                height: .36rem;
                background: rgba(244, 231, 168, 1);
                border-radius: .18rem;
                text-align: center;
                line-height: .4rem;
                font-size: .22rem;
                font-weight: bold;
                color: rgba(4, 95, 99, 1);
                &.wish1 {
                  color: rgba(119, 1, 1, 1);
                }
              }
            }
          }
          .btnwish {
            position: absolute;
            bottom: -.33rem;
            left: 2.14rem;
            width: 2.32rem;
            height: .66rem;
            background: url("./images/gotowish.png");
            background-size: 100% 100%;
            &.gray {
              background: url("./images/gotowish_gray.png");
              background-size: 100% 100%;
            }
          }
          .gradient_pop {
            position: absolute;
            bottom: .3rem;
            right: .28rem;
            width: 1.7rem;
            height: 1.6rem;
            background: url("./images/gradientpop0.png");
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            font-size: .24rem;
            font-weight: bold;
            color: rgba(255, 241, 189, 1);
            padding: .1rem 0;
            box-sizing: border-box;
            .item {
              width: 1.15rem;
              img {
                width: .3rem;
                height: .3rem;
                margin-right: .13rem;
              }
              display: flex;
              align-items: center;
              line-height: .3rem;
              &.single {
                justify-content: center;
              }
              .item_item {
                display: flex;
                align-items: center;
              }
            }
            &.wish1 {
              background: url("./images/gradientpop1.png");
              background-size: 100% 100%;
            }
          }
          .gradient {
            position: absolute;
            bottom: -.29rem;
            right: .28rem;
            width: 1.7rem;
            height: .57rem;
            background: url("./images/gradientbtn0.png");
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            font-size: .24rem;
            font-weight: bold;
            color: rgba(255, 241, 189, 1);
            .item {
              width: 1.15rem;
              img {
                width: .3rem;
                height: .3rem;
                margin-right: .13rem;
              }
              display: flex;
              align-items: center;
              line-height: .3rem;
              &.single {
                justify-content: center;
              }
              .item_item {
                display: flex;
                align-items: center;
              }
              i {
                font-size: .16rem;
                transform: rotate(-90deg);
                margin-left: .13rem;
                &.expand{
                  transform: rotate(-270deg);
                }
              }
            }
            &.wish1 {
              background: url("./images/gradientbtn1.png");
              background-size: 100% 100%;
            }
            &.gray {
              background: url("./images/gradientbtngray.png");
              background-size: 100% 100%;
              color: rgba(61, 61, 61, 1);
            }
          }
          &.gray {
            &:before {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              height: 4.33rem;
              background: url("./images/bg_gray.png");
              background-size: 100% 100%;
              z-index: 2;
            }
            &:after {
              content: '';
              position: absolute;
              bottom: 1.76rem;
              left: 0;
              right: 0;
              margin: auto;
              width: 2.89rem;
              height: .8rem;
              background: url("./images/btn_over.png");
              background-size: 100% 100%;
              z-index: 2;
            }
            &.wish1 {
              &:before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                height: 4.46rem;
                background: url("./images/bg_gray1.png");
                background-size: 100% 100%;
                z-index: 2;
              }
            }
          }
          &.showSuccess {
            &:after {
              content: '';
              position: absolute;
              bottom: .24rem;
              left: 0;
              right: 0;
              margin: auto;
              width: 3.79rem;
              height: 3.85rem;
              background: url("./images/wishsuccess.png");
              background-size: 100% 100%;
              z-index: 2;
            }
          }
          .counttime {
            position: absolute;
            top: .38rem;
            right: -.3rem;
            width: 1.48rem;
            height: .7rem;
            background: rgba(244, 231, 168, 1);
            border: .02rem solid rgba(255, 255, 255, 1);
            border-radius: .12rem 0px 0px .12rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .2rem;
            font-weight: bold;
            color: rgba(119, 1, 1, 1);
            text-align: center;
          }
        }
        .info {
          margin: .68rem 0 .29rem;
          font-size: .24rem;
          font-weight: bold;
          color: rgba(255, 204, 124, 1);
          i {
            color: rgba(255, 204, 124, 1);
          }
        }
        .percent {
          position: relative;
          height: 1.2rem;
          .prizes {
            position: absolute;
            display: flex;
            padding-left: .2rem;
            box-sizing: border-box;
            justify-content: space-between;
            align-items: flex-end;
            z-index: 1;
            width: 100%;
            .item {
              .prize {
                width: 1.2rem;
                height: .8rem;
                background: url("./images/level_default.png");
                background-size: 100% 100%;
                font-size: .24rem;
                font-weight: bold;
                color: rgba(61, 61, 61, 1);
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: .3rem;
                margin-bottom: .1rem;
                text-align: center;
                &.selected {
                  color: #004F54;
                  background: url("./images/level0.png");
                  background-size: 100% 100%;
                  &.wish1 {
                    color: #FFF2BD;
                    background: url("./images/level1.png");
                    background-size: 100% 100%;
                  }
                }
              }
              .zhuzhu {
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  margin-right: .04rem;
                  width: .3rem;
                  height: .3rem;
                }
                font-size: .24rem;
                font-weight: bold;
                color: rgba(210, 210, 210, 1);
                &.selected {
                  color: rgba(255, 203, 123, 1);
                }
              }
              &:nth-child(4) {
                .prize {
                  width: 1.43rem;
                  height: .93rem;
                  background: url("./images/package.png");
                  background-size: 100% 100%;
                  margin-bottom: .04rem;
                  position: relative;
                  .tips {
                    position: absolute;
                    top: -.5rem;
                    left: 0;
                    right: 0;
                    margin: auto;
                    width: 1.2rem;
                    height: .45rem;
                    background: url("./images/tips.png");
                    background-size: 100% 100%;
                    font-size: .2rem;
                    font-weight: bold;
                    color: rgba(244, 231, 168, 1);
                    padding-bottom: .1rem;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                }
              }
            }
          }
          .progress {
            position: absolute;
            top: .35rem;
            width: 6.6rem;
            height: .2rem;
            background: rgba(82, 0, 0, 1);
            border-radius: .1rem;
            .progressbar {
              height: 100%;
              width: 0%;
              background: linear-gradient(-90deg, rgba(255, 212, 4, 1) 0%, rgba(64, 150, 103, 1) 100%);
              border-radius: .1rem;
              position: relative;
              &.wish1 {
                background: linear-gradient(-90deg, rgba(255, 212, 4, 1) 0%, rgba(241, 38, 46, 1) 100%);
              }
              &:not(.nolight):before {
                content: '';
                position: absolute;
                top: -.09rem;
                right: -.6rem;
                width: 1.59rem;
                height: .38rem;
                background: url("./images/hbim.png");
                background-size: 100% 100%;
              }
            }
          }
        }
        .desc {
          margin-top: .34rem;
          width: 6.6rem;
          height: 1.2rem;
          padding-left: .12rem;
          box-sizing: border-box;
          background: rgba(210, 16, 23, 0.6);
          border: .02rem solid rgba(255, 206, 129, 1);
          border-radius: .12rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .item {
            font-size: .24rem;
            font-weight: bold;
            color: rgba(255, 242, 189, 1);
            &:nth-child(1) {
              margin-bottom: .2rem;
            }
          }
        }
      }
    }
  }

  @keyframes changeBg {
    0% {
      background: url('./images/light1.png') no-repeat center center / 100%
      100%;
    }

    100% {
      background: url('./images/light2.png') no-repeat center center / 100%
      100%;
    }
  }
</style>
