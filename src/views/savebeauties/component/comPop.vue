<template>
  <section :class="getClassName('com_pop')" class="com_pop" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div class="title_bg" v-if="popType>1">
            <div class="img" v-if="popType==1">
            </div>
            <div class="img" v-else-if="popType==2">
              我的奖励
            </div>
            <div class="img" v-else-if="popType==3">
              恭喜您
            </div>
            <div class="img" v-else-if="popType==4">
              主人
            </div>
            <div class="img" v-else-if="popType==6">
              {{awardData&&awardData.title}}
            </div>
            <div class="img" v-else-if="popType==7">
              活动规则
            </div>
          </div>
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1">
                <div class="savebtn" @click="close">开始营救</div>
              </template>
              <template v-else-if="popType==2">
                <div class="bonus-record" :class="{empty:!record.length}">
                  <div class="title_items">
                    <div class="title">奖品</div>
                    <div class="title">来源</div>
                    <div class="title">时间</div>
                  </div>
                  <div class="content" :class="{empty:!record.length}">
                    <scroll :data="record" v-if="record.length">
                      <ul>
                        <li v-for="item in record">
                          <div v-html="item.awardName.replace(/元/,'元<br>')"></div>
                          <div>{{item.source}}</div>
                          <div v-html="item.date.replace(/年/,'年<br>')"></div>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
              </template>
              <template v-else-if="popType==3">
                <div class="tips" v-html="awardData.tips"></div>
                <img :src="awardData.awardsImg|filter" alt="" v-if="awardData.awardsImg">
                <img :src="require(`../images/comPop/${awardData.type}.png`)" alt="" v-else>
                <div class="award_name">{{awardData.awardsName}}</div>
                <div class="btnred" @click="close(awardData)" v-if="awardData.btnName">{{awardData.btnName}}</div>
                <div class="info" v-if="awardData.info" v-html="awardData.info"></div>
              </template>
              <template v-else-if="popType==4">
                <div>
                  <p>啊~终于看到阳光了</p>
                  <p>谢谢你救我出来</p>
                  <p>未来</p>
                  <p>我将和你一起看遍浩渺星河</p>
                  <p>就现在，出发吧！</p>
                  <div class="btnred" @click="close">关闭</div>
                </div>
              </template>
              <template v-else-if="popType==6">
                <div v-html="awardData.tips"></div>
                <div class="back" @click="close">{{awardData.btn1Name}}</div>
                <div class="btnred" @click="confrimsure(awardData.item)">{{awardData.btn2Name}}</div>
              </template>
              <template v-else-if="popType==7">
                <scroll>
                  <div>
                    <p v-if="actInfoData">活动时间：{{actInfoData.beginDate}}-{{actInfoData.endDate}}</p>
                    <p>活动内容：本次活动由每日营救和我的队伍两部分组成。</p>
                    <p>每日营救：</p>
                    <p>1、活动期间，每天有5个不同的任务，玩家通过完成每个任务可以获得对应的任务碎片及任务奖励，完成全部任务即可救出当前人物。</p>
                    <p>2、玩家可通过购买礼包的方式加速救出人物。（礼包每日购买一次，限购买当日有效）</p>
                    <p>• 万能碎片礼包：购买万能碎片礼包后，可以解锁任意一个未完成的任务碎片。</p>
                    <p>• 简化任务礼包：购买简化任务礼包后，可将所有未完成的任务简化，降低难度加速完成任务。（正在进行中的任务进度清零并简化）</p>
                    <p>3、未能救出当日队友即为放弃，次日0点开启营救新队友。</p>
                    <p>我的队伍：</p>
                    <p>活动期间成功集结3名队友，可获得营救奖励；成功集结6名队友即已完成本次活动，并获得最终奖励。</p>
                    <p>注：活动期间获得的所有奖励请及时领取，每日任务已更新或活动已结束将不再进行奖励发放。</p>
                    <p>本次活动如有其他问题请向客服咨询。</p>
                  </div>
                </scroll>
              </template>
            </div>
            <div class="footer" v-if="popType>1"></div>
          </div>
          <div :class="getClassName('close')" @click="close">
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import {
    myAwards
  } from '../utils/api'

  export default {
    name: 'comPop',
    data() {
      return {
        isShowPop: false,
        record: [],
        beautyname: ['千夏','风音','妃奈','沙耶','心优','空音']
      }
    },
    props: {
      popType: {
        type: Number,
        default: 0
      },
      awardData: {
        type: Object,
        default: () => null
      },
      leafItem: {
        type: Object,
        default: null
      },
      countTime: {
        type: String,
        default: ''
      },
      actInfoData: {
        type: Object,
        default: null
      },
      actDay: {
        type: Number,
        default: 0
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      getClassName(name) {
        return `${name} flag${this.popType} beauty${this.actDay - 1}`
      },
      getAwardName(awardType) {
        switch (awardType) {
          case 'jyz':
            return '金叶子'
            break
          case 'yg':
            return '鱼干'
            break
          case 'jdk':
            return '京东券'
            break
          case 'hfq':
            return '话费券'
            break
        }
      },
      async showPop() {
        if (this.popType != 2) {
          this.isShowPop = true
        } else {
          let {code, data} = await myAwards()
          if (code == 200) {
            this.record = data
            this.isShowPop = true
          }
        }
      },
      close(data) {
        // let points = ['A_H5PT0252002986', 'A_H5PT0252002993']
        // if (this.popType == 3) {
        //   points[data.popType] && GLOBALS.marchSetsPoint(points[data.popType])
        // }
        if (this.popType == 1) {
          GLOBALS.marchSetsPoint('A_H5PT0265003131', {
            task_id: this.actDay
          })
        }
        this.popType == 3 && this.awardData.hasOwnProperty('extraAward') && this.awardData.extraAward && this.$emit('close', this.awardData)
        this.isShowPop = false
      },
      move(e) {
        e.preventDefault()
      },
      confrimsure(item) {
        this.isShowPop = false
        this.$emit('confrimsure', item)
      }
    },
    watch: {
      isShowPop(value) {
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

<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    left: 50%;
    top: 2rem;
    margin-left: -2.8rem;
    &.flag1 {
      margin-left: -2.71rem;
    }
    &.flag7{
      top: .5rem;
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
        margin: 0 auto;
        box-sizing: border-box;
        .title_bg {
          width:  5.61rem;
          height: .98rem;
          background: url("../images/comPop/top.png") no-repeat center
            center / 100% 100%;
          position: relative;
          .img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            font-size: .36rem;
            font-weight: bold;
            color:rgba(255,206,215,1);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .main {
          width: 5.61rem;
          font-size: 0.2rem;
          background: url("../images/comPop/bgline.png");
          background-size: 5.61rem .71rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: .2rem .2rem 0;
          box-sizing: border-box;
          &.flag1 {
            width: 5.43rem;
            height: 6.83rem;
            padding: 2.5rem .2rem 0;
            .textcontent {
              height: 2.35rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
              font-size: .24rem;
              font-weight: bold;
              color: rgba(106, 44, 20, 1);
              margin-bottom: .2rem;
            }
            .savebtn {
              width:2.1rem;
              background:rgba(255,162,41,1);
              border-radius:.35rem;
              height: .7rem;
              line-height: .7rem;
              text-align: center;
              font-size: .3rem;
              font-weight: bold;
              color: rgba(255, 241, 241, 1);
              position: absolute;
              bottom: -.1rem;
              left: 0;
              right: 0;
              margin: auto;
            }
            &.beauty0 {
              background: url("../images/comPop/popBeauty/0.png");
              background-size: 100% 100%;
            }
            &.beauty1 {
              background: url("../images/comPop/popBeauty/1.png");
              background-size: 100% 100%;
            }
            &.beauty2 {
              background: url("../images/comPop/popBeauty/2.png");
              background-size: 100% 100%;
            }
            &.beauty3 {
              background: url("../images/comPop/popBeauty/3.png");
              background-size: 100% 100%;
            }
            &.beauty4 {
              background: url("../images/comPop/popBeauty/4.png");
              background-size: 100% 100%;
            }
            &.beauty5 {
              background: url("../images/comPop/popBeauty/5.png");
              background-size: 100% 100%;
            }
          }
          .container_compop {
            .btnred {
              width: 2.5rem;
              height: .7rem;
              background:rgba(252,43,102,1);
              border-radius: .35rem;
              font-size: .3rem;
              font-weight: bold;
              color: rgba(255, 241, 241, 1);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin: .2rem auto 0;
              font-weight: bold;
            }
            z-index: 1;
            &.flag7 {
              color:rgba(186,56,79,1);
              box-sizing: border-box;
              font-size: .24rem;
              font-weight:400;
              height: 6.5rem;
              position: relative;
              p {
                line-height: .3rem;
                &.title {
                  font-weight: bold;
                }
                i {
                  font-weight: bold;
                  color: #FF0505;
                }
              }
            }
            &.flag1 {
              .bonus-record {
                width: 100%;
                height: 5rem;
                position: relative;
                margin: auto;
                font-size: .24rem;
                font-weight: 400;
                color: rgba(255, 227, 197, 1);
                .title_items {
                  display: flex;
                  align-items: center;
                  height: .46rem;
                  background: rgba(196, 101, 70, 1);
                  .title {
                    flex: 1;
                    text-align: center;
                    height: .3rem;
                    line-height: .3rem;
                    box-sizing: border-box;
                    &:nth-child(1), &:nth-child(2) {
                      border-right: 1px solid rgba(249, 186, 165, 1);
                    }
                  }
                }
                .content {
                  position: absolute;
                  height: 4.54rem;
                  top: .44rem;
                  left: 0rem;
                  right: 0;
                  font-size: .2rem;
                  font-weight: 400;
                  background: rgba(249, 186, 165, 1);
                  overflow: hidden;
                  color: rgba(106, 44, 20, 1);
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      height: .77rem;
                      div {
                        flex: 1;
                        text-align: center;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      }
                      &:nth-child(2n) {
                        background: rgba(211, 140, 116, 1);
                      }
                    }
                  }
                }
              }
            }
            &.flag2 {
              .bonus-record {
                width: 100%;
                height: 5rem;
                position: relative;
                margin: auto;
                font-size: .24rem;
                font-weight: 400;
                color: rgba(255, 227, 197, 1);
                .title_items {
                  display: flex;
                  align-items: center;
                  height: .46rem;
                  background:rgba(224,82,106,1);
                  color:rgba(255,227,197,1);
                  .title {
                    flex: 1;
                    text-align: center;
                    height: .3rem;
                    line-height: .3rem;
                    box-sizing: border-box;
                    &:nth-child(1), &:nth-child(2) {
                      border-right: 1px solid rgba(249, 186, 165, 1);
                    }
                  }
                }
                .content {
                  position: absolute;
                  height: 4.54rem;
                  top: .44rem;
                  left: 0rem;
                  right: 0;
                  font-size: .28rem;
                  font-weight: 400;
                  background:rgba(249,222,226,1);
                  overflow: hidden;
                  color:rgba(188,55,78,1);
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      height: 1.06rem;
                      div {
                        flex: 1;
                        text-align: center;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      }
                      &:nth-child(2n) {
                        background:rgba(227,156,168,1);
                      }
                    }
                  }
                }
              }
            }
            &.flag3 {
              text-align: center;
              .tips {
                font-size: .28rem;
                font-weight: bold;
                color:rgba(188,52,76,1);
                margin-bottom: .15rem;
                line-height: .36rem;
              }
              img {
                width: 1.93rem;
                height: 1.12rem;
              }
              .award_name {
                margin-top: .1rem;
                font-size: .28rem;
                font-weight: bold;
                color:rgba(234,57,44,1);
              }
              .info {
                margin-top: .3rem;
                font-size: .28rem;
                font-weight: bold;
                color:rgba(155,61,78,1);
                line-height: .36rem;
              }
            }
            &.flag4 {
              font-size: .36rem;
              font-weight: bold;
              color: #BC344C;
              line-height: .5rem;
              text-align: center;
            }
            &.flag5 {
              .gamelist {
                display: flex;
                flex-wrap: wrap;
                height: 4.2rem;
                justify-content: space-between;
                padding: 0 .2rem;
                .game {
                  width: 1.24rem;
                  height: 1.69rem;
                }
              }
              .gogames {
                font-size: .24rem;
                color: #C45E13;
                text-align: right;
                font-weight: bold;
                text-align: center;
                padding-bottom: .1rem;
              }
            }
            &.flag6 {
              font-size: .36rem;
              font-weight: bold;
              color:rgba(188,52,76,1);
              text-align: center;
              line-height: .5rem;
              .back {
                margin: .27rem auto 0;;
                width: 2.5rem;
                height: .7rem;
                line-height: .7rem;
                text-align: center;
                border: .02rem solid rgba(255,255,255,1);
                box-sizing: border-box;
                border-radius: .35rem;
                font-size: .3rem;
                font-weight: bold;
                color:rgba(255,241,241,1);
              }
              .sad {
                display: block;
                width: 1.49rem;
                height: 1.59rem;
                margin: 0 auto .2rem;
              }
            }
          }
          .footer {
            width: 5.61rem;
            height: .63rem;
            background: url("../images/comPop/bottom.png") no-repeat center
              center / 100% 100%;
            position: absolute;
            bottom: -0.62rem;
            left: 0;
            margin: auto;
          }
          &.flag7{
            padding: .2rem .4rem 0;
            .footer{
              bottom: -0.32rem;
            }
          }
        }
        .close {
          width: 0.6rem;
          height: 0.6rem;
          background: url("../images/close.png") no-repeat center
            center / 100% 100%;
          margin: 0.6rem auto 0;
          &.flag1 {
            margin: 0.2rem auto 0;
          }
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
