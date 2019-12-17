<template>
  <section class="rule" :style="{zIndex:isShowPop?101:(from>0?100:1)}" :class="{pop2:from==2,pop5:from==5}">
    <template v-if="from==0">
      <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
      <transition name="scalc">
        <div class="pop" v-if="isShowPop">
          <div class="wrap">
            <div class="main">
              <div class="title">活动规则</div>
              <div class="container">
                <scroll ref="scroll" :scrollbar="true">
                  <div>
                    <div class="title1">1.活动时间</div>
                    <p>{{ruleMain}},{{lotteryDate}}锦鲤发奖;</p>
                    <div class="title1">2.玩法介绍</div>
                    <p><i style="font-weight: bolder; color: #C8744F; margin-right: .1rem;">·</i>每天有3个打卡任务，在斗地主、麻将、跑得快、枪火英雄、套圈中消耗金叶不计入金叶消耗任务中。打卡任务每天0点刷新清零已完成情况；
                    </p>
                    <p><i style="font-weight: bolder; color: #C8744F; margin-right: .1rem;">·</i>每天达成任意1个打卡任务,获1颗金星;金星数可累计,3颗可转盘1次;
                    </p>
                    <p><i style="font-weight: bolder; color: #C8744F; margin-right: .1rem;">·</i>累计打卡可许愿，赢取锦鲤大奖。
                    </p>
                    <div class="title1">3.每日打卡转盘100%中奖</div>
                    <p>3颗金星转盘1次,<i style="font-weight: bold;color:#FF1616">100%中奖</i>;</p>
                    <div class="title1">4.累计打卡抽锦鲤</div>
                    <p><i style="font-weight: bolder; color: #C8744F; margin-right: .1rem;">·</i>活动期间,<i
                      style="font-weight: bold;color:#FF1616">完成当日3个活动任务即为打卡成功</i>,累计打卡有机会获得锦鲤大奖;</p>
                    <p><i style="font-weight: bolder; color: #C8744F; margin-right: .1rem;">·</i>累计打卡完成后,可在许愿池许愿变锦鲤;未达到对应打卡天数,暂不可许愿;
                    </p>
                    <p><i style="font-weight: bolder; color: #C8744F; margin-right: .1rem;">·</i>打卡天数越多,<i
                      style="font-weight: bold;color:#FF1616">许愿的锦鲤越多,将参与更多种锦鲤的抽选</i>(每人最多获得1种锦鲤奖励);</p>
                    <p>锦鲤参与人数每小时刷新1次</p>
                    <p><i style="font-weight: bolder; color: #C8744F; margin-right: .1rem;">·</i>活动结束将从许愿的玩家中抽取1000个锦鲤名单,具体名额如下：
                    </p>
                    <p>累计2天,抽400名锦鲤,每人1张500金叶套圈券;</p>
                    <p>累计3天,抽300名锦鲤,每人10000金叶;</p>
                    <p>累计4天,抽150名锦鲤,每人50元话费券;</p>
                    <p>累计5天,抽80名锦鲤,每人100元京东卡;</p>
                    <p>累计6天,抽60名锦鲤,每人500元话费券;</p>
                    <p>累计7天,抽10名锦鲤,每人1000元京东卡。</p>
                    <div class="title1">5.奖品发放</div>
                    <p><i style="font-weight: bolder; color: #C8744F; margin-right: .1rem;">·</i>转盘奖品将自动发放到账，中奖记录在【锦鲤开奖】查看；
                    </p>
                    <p><i style="font-weight: bolder; color: #C8744F; margin-right: .1rem;">·</i>锦鲤名单将于活动结束1天内在【锦鲤开奖】公布,<i
                      style="font-weight: bold;color:#FF1616">锦鲤奖励在玩家当天进入活动页后自动发送,过期视为放弃;</i>;</p>
                    <p><i style="font-weight: bolder; color: #C8744F; margin-right: .1rem;">·</i>活动结束后未使用的金星将自动作废。</p>
                    <div class="title1">6.其他</div>
                    <p>平台保留对活动条款的最终解释权,如需咨询或有疑问,请联系在线客服。</p>
                    <div style="height:.2rem"></div>
                  </div>
                </scroll>
              </div>
            </div>
          </div>
          <div class="close-icon" @click="isShowPop = false"></div>
        </div>
      </transition>
    </template>
    <template v-else-if="from==1">
      <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
      <transition name="scalc">
        <div class="pop" v-if="isShowPop">
          <div class="wrap wrap3">
            <div class="main">
              <div class="title">大家都在玩</div>
              <div class="gamelist">
                <img :src="require(`../pages/images/pop/games/${index}.png`)" alt="" v-for="(item,index) in games"
                     class="game" @click="gotogame(item)">
              </div>
              <div class="gogames" @click="gotoindex">更多游戏>></div>
              <div class="info"
                   style="font-size: .28rem;color: #fff;font-weight: bold;margin-top: .5rem;line-height: .3rem;text-align: center">
                小贴士：部分游戏金叶消耗不计入此 活动,具体可查看规则哦~
              </div>
            </div>
          </div>
          <div class="close-icon" @click="isShowPop = false"></div>
        </div>
      </transition>
    </template>
    <template v-else-if="from==2">
      <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
      <transition name="scalc">
        <div class="pop pop2" v-if="isShowPop">
          <div class="title">锦鲤名单</div>
          <div class="wrap wrap2">
            <div class="main" style="padding: 1rem 0.1rem;box-sizing: border-box;">
              <p style="font-size: .3rem;font-weight:bold;color:rgba(255,255,255,1);line-height: .4rem;text-align: center">
                锦鲤名单将在{{lotteryDate}}公布,<br>记得连续打卡,<br>许愿变锦鲤！</p>
            </div>
          </div>
          <div class="close-icon" @click="isShowPop = false"></div>
        </div>
      </transition>
    </template>
    <template v-else-if="from==3">
      <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
      <transition name="scalc">
        <div class="pop pop2" v-if="isShowPop">
          <div class="title">转盘中奖记录</div>
          <div class="wrap wrap2">
            <div class="main">
              <div class="bonus-record" v-if="list.length">
                <div class="title1">奖励</div>
                <div class="title1">时间</div>
                <div class="line"
                     style="width: 1px; height: .3rem; position: absolute; left: 2rem; background: rgba(255, 255, 255, 0.38); margin-top: .1rem;"></div>
                <div class="content">
                  <scroll :data="list" ref="scroll" :beforeScroll="true" :listenScroll="true" :probeType="3">
                    <ul>
                      <li v-for="(item,index) in list">
                        <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 3rem;">
                          {{item.awardName}}
                        </div>
                        <div style="width: 2rem;text-align: center;display: flex;justify-content: center;">
                          {{item.time||''}}
                        </div>
                      </li>
                    </ul>
                  </scroll>
                </div>
              </div>
              <div class="record-null" v-else>
                <img src="../pages/images/pop/empty.png" alt="" class="empty">
                <div class="text">无记录</div>
              </div>
            </div>
          </div>
          <div class="close-icon" @click="isShowPop = false"></div>
        </div>
      </transition>
    </template>
    <template v-else-if="from==4">
      <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
      <transition name="scalc">
        <div class="pop" v-if="isShowPop">
          <div class="wrap wrap4">
            <div class="main">
              <img src="../pages/images/pop/bbstar.png" alt="" style="width: 2.65rem;margin:1rem auto;display: block">
              <div class="info" style="font-size: .36rem;font-weight:bold;color:rgba(253,88,1,1);text-align: center">
                去完成任务或者明天再来！
              </div>
            </div>
          </div>
          <div class="close-icon" @click="isShowPop = false"></div>
        </div>
      </transition>
    </template>
    <template v-else-if="from>=5&&from<=12">
      <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
      <transition name="scalc">
        <div class="pop pop5" v-if="isShowPop">
          <div class="wrap"
               :class="{wrap5:from==5,wrap6:from==6,wrap7:from==7,wrap8:from==8,wrap9:from==9,wrap10:from==10,wrap11:from==11,wrap12:from==12}">
            <div class="btn" v-if="from==5"
                 style="width: 3.86rem; height: 1rem; position: absolute; bottom: 1.4rem; left: 0; right: 0; margin: auto;"
                 @click="close"></div>
            <div class="container" v-if="from==7||from==8">
              <div class="item">任务完成</div>
              <div class="item"></div>
              <div class="item">奖励</div>
              <h4>小贴士：集齐{{starnum}}颗星可转盘领奖~</h4>
            </div>
            <div class="container" v-if="from==9||from==10">
              <div class="item">今日打卡成功</div>
              <div class="item">全部任务完成</div>
              <div class="item">奖励 <img src="../pages/images/pop/star.png" alt=""> x1</div>
              <h4>小贴士：快去玩转盘，100%有奖</h4>
            </div>
            <div class="container" v-if="from==11||from==12">
              <div class="item" v-if="from==11">继续打卡可许愿</div>
              <div class="item" v-else style="color:rgba(239,72,75,1);">你已成功许愿</div>
              <div class="item"><img src="../pages/images/pop/xuyuan/jinli.png" alt=""> x1</div>
              <div class="btn" v-if="from==11" @click="close"></div>
              <div class="info" v-else>
                记得每天来许愿哦，<br>中奖名单将在{{lotteryDate}}公布
              </div>
            </div>
          </div>
          <div class="close-icon" @click="close"></div>
        </div>
      </transition>
    </template>
  </section>
</template>

<script>
  import scroll from './scroll'
  import {prizeRecord} from '../utils/api'

  export default {
    name: "rule",
    data() {
      return {
        isShowPop: false,
        games: [{
          id: 12,
          url: '/crush'
        }, {
          id: 18, url: '/square'
        }, {
          id: 2, url: '/billiards'
        }, {
          id: 10, url: '/fish'
        }, {
          id: 13, url: '/kingdom2'
        }, {
          id: 21, url: '/Marbles'
        }]
      };
    },
    props: {
      ruleMain: {
        type: String,
        default: ""
      },
      from: {
        type: String,
        default: "0"
      },
      lotteryDate: {
        type: String,
        default: ""
      },
      starnum: {
        type: Number,
        default: 0
      }
    },
    components: {
      scroll
    },
    methods: {
      async showPop() {
        if (this.from == '0') {//规则
          GLOBALS.marchSetsPoint('A_H5PT0211002229')
        }
        if (this.from == '2') {//H5平台-7天打卡抽锦鲤活动-锦鲤开奖点击
          GLOBALS.marchSetsPoint('A_H5PT0211002230')
        }
        if (this.from != '3') {
          this.isShowPop = true
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0211002239')
          let {code, data} = await prizeRecord()
          if (code == 200) {
            this.list = data
            this.isShowPop = true
          }
        }
      },
      gotoindex() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
      gotogame({url, id}) {
        GLOBALS.marchSetsPoint('A_H5PT0211002235', {target_project_id: id})
        GLOBALS.jumpOutsideGame(url)
      },
      close() {
        this.isShowPop = false
        if (this.from == '5' || this.from == '6') {//H5平台-7天打卡抽锦鲤活动-活动第8日发奖弹窗-关闭
          GLOBALS.marchSetsPoint('A_H5PT0211002241')
        }
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .rule {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -2.83rem;
    margin-top: -4.32rem;
    &.pop2 {
      margin-left: -2.8rem;
      margin-top: -4.68rem;
    }
    &.pop5 {
      margin-left: -2.85rem;
      margin-top: -5rem;
    }
    img {
      &.ruleicon {
        position: fixed;
        width: 0.78rem;
        height: 0.5rem;
        right: 0;
        top: .25rem;
      }
      &.profit {
        position: fixed;
        width: 3.3rem;
        height: .9rem;
        bottom: .11rem;
        &.profit1 {
          left: .18rem;
        }
        &.profit2 {
          right: .18rem;
        }
      }
    }

    .pop-mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.55);
    }
    .pop {
      position: relative;
      z-index: 10;
      .wrap {
        width: 5.66rem;
        height: 8.64rem;
        background: url("../pages/images/pop/rule.png") no-repeat center center /
        100% 100%;
        margin: 0 auto;
        box-sizing: border-box;
        padding: .15rem .6rem;
        .main {
          font-size: 0.24rem;
          /*letter-spacing: 0.02rem;*/
          font-weight: bold;
          color: #B3552C;
          .title {
            font-size: .5rem;
            color: #fff;
            text-align: center;
          }
          .container {
            overflow: hidden;
            position: absolute;
            left: .6rem;
            right: .6rem;
            top: 1.2rem;
            bottom: 1.3rem;
          }
          .title1 {
            margin-top: .1rem;
            margin-bottom: .1rem;
            text-align: left;
          }
          .time {
            font-weight: 400;
            color: rgba(196, 94, 19, 1);
          }

          p {
            font-size: 0.2rem;
            line-height: 0.32rem;
            font-weight: 400;
            color: #C8744F;
            text-align: left;
            i {
              color: #005AFF;
            }
          }
        }
        &.wrap2 {
          width: 5.6rem;
          height: 6.28rem;
          padding: .15rem .4rem;
          background: url("../pages/images/pop/pop3.png") no-repeat center
            center / 100% 100%;
          .bonus-record {
            position: absolute;
            z-index: 11;
            left: .3rem;
            right: .3rem;
            height: 5.8rem;
            padding: .4rem 0 0;
            box-sizing: border-box;
            .title1 {
              font-size: .3rem;
              font-weight: bold;
              color: rgba(236, 244, 255, 1);
              position: absolute;
              &:nth-child(1) {
                left: .1rem;
              }
              &:nth-child(2) {
                left: 3.8rem;
              }
            }
            .line {
              width: 1px;
              height: .1rem;
              position: absolute;
              left: 2rem;
            }
            .content {
              position: absolute;
              height: 5rem;
              top: .9rem;
              left: 0rem;
              right: 0;
              font-size: .22rem;
              font-weight: bold;
              color: #fff;
              overflow: hidden;
              ul {
                margin-top: .1rem;
                display: flex;
                flex-direction: column;
                li {
                  display: flex;
                  justify-content: space-between;
                  height: .53rem;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.38);
                  box-sizing: border-box;
                  div {
                    display: flex;
                    align-items: center;
                  }
                }
              }
            }
          }
          .record-null {
            height: 3.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            margin-top: 1rem;
            img {
              width: 1.27rem;
              height: 1.27rem;
            }
            .text {
              font-size: .5rem;
              font-weight: 400;
              color: rgba(169, 21, 40, 1);
            }
          }
        }
        &.wrap3 {
          width: 5.66rem;
          height: 7.32rem;
          padding: .15rem .4rem;
          background: url("../pages/images/pop/pop1.png") no-repeat center center /
        100% 100%;
          .title1 {
            text-align: center;
          }
          .gamelist {
            display: flex;
            flex-wrap: wrap;
            height: 4.4rem;
            justify-content: space-between;
            margin-top: .6rem;
            margin-bottom: .1rem;
            .game {
              width: 1.49rem;
              height: 2.05rem;
            }
          }
          .gogames {
            font-size: .28rem;
            color: #b3552c;
            text-align: right;
            font-weight: bold;
            text-align: center;
          }
        }
        &.wrap4 {
          width: 5.66rem;
          height: 6.44rem;
          padding: .35rem .4rem;
          background: url("../pages/images/pop/pop4.png") no-repeat center center /
        100% 100%;
        }
        &.wrap5 {
          width: 5.7rem;
          height: 8.26rem;
          padding: .35rem .4rem;
          background: url("../pages/images/pop/pop_after1.png") no-repeat center center /
        100% 100%;
        }
        &.wrap6 {
          width: 5.66rem;
          height: 6.44rem;
          background: url("../pages/images/pop/pop_after0.png") no-repeat center center /
        100% 100%;
        }
        &.wrap9, &.wrap10 {
          width: 5.66rem;
          height: 8.26rem;
          background: url("../pages/images/pop/pop_task11.png") no-repeat center center /
        100% 100%;
          .container {
            width: 5.22rem;
            height: 4.18rem;
            background: url(../pages/images/pop/thumb.png);
            background-size: 100% 100%;
            position: absolute;
            top: 2.87rem;
            left: .2rem;
            padding-top: .3rem;
            box-sizing: border-box;
            text-align: center;
            .item {
              &:nth-child(1) {
                font-size: .6rem;
                font-weight: bold;
                color: rgba(254, 90, 1, 1);
                margin-bottom: 2.36rem;
              }
              &:nth-child(2) {
                font-size: .3rem;
                font-weight: bold;
                color: rgba(254, 90, 1, 1);
              }
              &:nth-child(3) {
                font-size: .4rem;
                font-weight: bold;
                color: rgba(254, 90, 1, 1);
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: .22rem;
                img {
                  width: 1.07rem;
                  height: 1.09rem;
                }
              }
            }
            h4 {
              font-size: .28rem;
              font-weight: bold;
              color: rgba(255, 255, 255, 1)
            }
          }
        }
        &.wrap7, &.wrap8 {
          width: 5.66rem;
          height: 8.26rem;
          background: url("../pages/images/pop/pop_task10.png") no-repeat center center /
        100% 100%;
          .container {
            width: 4.42rem;
            height: 4.18rem;
            background: url(../pages/images/pop/starbg.png);
            background-size: 100% 100%;
            position: absolute;
            top: 3.17rem;
            left: .65rem;
            text-align: center;
            .item {
              &:nth-child(1) {
                font-size: .6rem;
                font-weight: bold;
                color: rgba(247, 90, 99, 1);
                margin-bottom: 3rem;
              }
              &:nth-child(2) {
                font-size: .3rem;
                font-weight: bold;
                color: rgba(254, 90, 1, 1);
              }
              &:nth-child(3) {
                font-size: .4rem;
                font-weight: bold;
                color: rgba(254, 90, 1, 1);
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: .56rem;
              }
            }
            h4 {
              font-size: .28rem;
              font-weight: bold;
              color: rgba(255, 255, 255, 1)
            }
          }
        }
        &.wrap11, &.wrap12 {
          width: 5.76rem;
          height: 8.34rem;
          &.wrap11 {
            background: url("../pages/images/pop/xuyuan/refusebg.png") no-repeat center center /
        100% 100%;
          }
          &.wrap12 {
            background: url("../pages/images/pop/xuyuan/successbg.png") no-repeat center center /
        100% 100%;
          }
          .container {
            width: 4.42rem;
            height: 4.18rem;
            position: absolute;
            top: 3.29rem;
            left: .7rem;
            text-align: center;
            .item {
              &:nth-child(1) {
                font-size: .6rem;
                font-weight: bold;
                color: rgba(255, 66, 0, 1);
              }
              &:nth-child(2) {
                img {
                  width: 3.62rem;
                  height: 2.94rem;
                }
              }
            }
            .btn {
              width: 3.86rem;
              height: 1rem;
              position: absolute;
              left: 0;
              right: 0;
              margin: auto;
              background: url("../pages/images/pop/xuyuan/ok.png") no-repeat center center /
        100% 100%;
            }
            .info {
              font-size: .28rem;
              font-weight: bold;
              color: rgba(239, 72, 75, 1);
              margin-top: .2rem;
              line-height: .4rem;
            }
          }
        }
      }

      .close-icon {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../pages/images/common/close.png") no-repeat center
          center / 100% 100%;
        margin: 0.4rem auto 0;
      }
      &.pop2 {
        .title {
          width: 4.55rem;
          height: 1.63rem;
          background: url("../pages/images/pop/title.png") no-repeat center center /
        100% 100%;
          adding-top: .6rem;
          box-sizing: border-box;
          line-height: 1rem;
          text-align: center;
          margin: auto;
          font-size: .4rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          text-shadow: 1px 1px 0px rgba(224, 33, 30, 1);
          padding: .6rem;
          box-sizing: border-box;
          margin-bottom: .45rem;
        }
      }
    }
    .scalc-enter-active {
      animation: fadeAnimation 0.3s ease-in-out;
    }
    @keyframes fadeAnimation {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  }
</style>
