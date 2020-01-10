<template>
  <!--窗口类型 0 领取昨日瓜分券奖励 1 活动规则 2 瓜分记录 3 瓜分攻略 4 大家都在玩 5 开榜 6 任务流水领取弹窗-->
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}" :class="{flag0:popType==0}">
    <div class="com_pop_mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div :class="getClassName('wrap')">
          <div class="title_bg">
            <img :src="`${require(`../imgs/title${this.popType}.png`)}`" alt=""
                 style="width:4.29rem;height:1.03rem">
            <div class="close" @click="close">
            </div>
          </div>
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==0||popType==6">
                <div class="img_bg">
                  <img src="../imgs/jyz.png" alt="" v-if="popType==0">
                  <img src="../imgs/yhq.png" alt="" v-else>
                </div>
                <h4 v-if="popType==0">累计获得{{awardData.award|filterPrice}}金叶子</h4>
                <h4 v-else>恭喜您获得{{awardData.awards}}张瓜分券</h4>
                <h2 v-if="popType==0">您昨日共获得{{awardData.couponNum}}张瓜分券</h2>
                <h2 v-else>瓜分券越多，奖励越好哦！</h2>
                <div class="btn" v-if="popType==0" @click="$emit('getCouponAward')">立即领取</div>
                <div class="btn" v-else @click="getmore">获取更多瓜分券</div>
                <div class="tips" v-if="popType==0">瓜分券越多，奖励越好哦！</div>
                <div class="tips" v-else>{{countTime}}后开始瓜分</div>
              </template>
              <template v-else-if="popType==1">
                <scroll :data="ruleTime">
                  <div>
                    <template v-if="ruleTime">
                      <p>活动时间:{{ruleTime}}</p>
                    </template>
                    <p>1. 活动期间内，每天0点会开启5千万金叶奖池，晚间24点发放瓜分奖励并重置奖池 </p>
                    <p>2. 玩家在游戏中消耗一定金叶子，可以领取对应额度的瓜分券，<i>金叶消耗进度每天清零</i></p>
                    <p>3. 瓜分奖励计算：5千万金叶子奖池÷当日活动累计发出的瓜分券数量x玩家手上的瓜分券，即为每人可以瓜得的奖励 </p>
                    <p>4. <i>每日奖励需要玩家次日在活动页领取，超过24小时不领，则视为放弃奖励</i></p>
                    <p>5. 瓜分券每日0点清零重新计算</p>
                    <p>6. 活动期间内，玩家每天获得的瓜分券数量会计入排行榜，活动结束后根据7日累计获得的券数量进行排名并发放排行奖励</p>
                    <p>7. 活动结束后，排行榜会展示1天时间，排行榜奖励将直接到账</p>
                    <p>活动结束后：</p>
                    <p>1. 未领取的瓜分券作废，请及时领取</p>
                    <p>2. 系统会按照最终排行进行奖励发放</p>
                    <p>3. 排行榜还会展示一天时间</p>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==2">
                <div class="bonus-record" :class="{empty:!record.length}">
                  <div class="title_items">
                    <div class="title">获得奖励</div>
                    <div class="title">时间</div>
                  </div>
                  <div class="content" :class="{empty:!record.length}">
                    <scroll :data="record" v-if="record.length">
                      <ul>
                        <li v-for="item in record">
                          <div>
                            {{item.award|filterPrice}}金叶子
                          </div>
                          <div>{{item.date}}</div>
                        </li>
                      </ul>
                    </scroll>
                    <div class="record-null" v-else>
                      <img src="../imgs/empty.png" alt="" class="empty">
                      <div class="text">无记录</div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else-if="popType==3">
                <scroll>
                  <div>
                    <div class="gonglueitem">
                      <div class="left">步骤一</div>
                      <div class="right">
                        <h4>获得瓜分券:</h4>
                        <h2>在指定游戏中消耗金叶子，充值礼包，完成每日任务可以获得瓜分券</h2>
                      </div>
                    </div>
                    <div class="gonglueitem">
                      <div class="left">步骤二</div>
                      <div class="right">
                        <h4>每天瓜分千万奖池:</h4>
                        <h2>次日0点后开启奖池，根据玩家手中的瓜分券数量进行奖池瓜分</h2>
                        <h4>瓜分奖励计算:</h4>
                        <h2>5千万金叶子奖池÷当日活动累计发出的瓜分券数量x玩家手上的瓜分券，即为每人可以瓜得的奖励（详见规则）</h2>
                      </div>
                    </div>
                    <div class="gonglueitem">
                      <div class="left">步骤三</div>
                      <div class="right">
                        <h4>上榜赢大奖：</h4>
                        <h2>玩家每天获得的瓜分券数量会计入排行榜，最高可得价值35000元大奖</h2>
                      </div>
                    </div>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==4">
                <div class="gamelist">
                  <img :src="require(`../imgs/games/${index}.png`)" alt="" v-for="(item,index) in games" class="game"
                       @click="gotogame(item)">
                </div>
                <div class="gogames" @click="gotoindex">更多游戏>></div>
              </template>
              <template v-else-if="popType==5">
                <template v-if="awardList.length">
                  <h4>恭喜您排名{{myRank}}名获得</h4>
                  <div class="product-img">
                    <div class="item" v-for="(item,index) in awardList">
                      <div class="img_bg">
                        <img :src="`${require(`../imgs/${item.awardsType}.png`)}`" alt="">
                      </div>
                      <span>{{item.awardsName}}</span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <img src="../imgs/sad.png" alt="" class="sad">
                  <div class="sad_tips">您未上榜，下次继续加油哦</div>
                </template>
                <div class="btn" v-if="!isHasGift" @click="close">{{awardList.length?'我知道了':'好的'}}</div>
                <div class="btn" v-else @click="getYesterDayGift">领取昨日奖励</div>
                <div class="tips" v-if="!isHasGift">啊哦！您昨日未获得瓜分券</div>
              </template>
            </div>
          </div>
        </div>
        <div class="close-icon" @click="close"></div>
      </div>
    </transition>
  </section>
</template>

<script>
  import {gameReceiveRecord} from '../utils/api'

  export default {
    name: "comPop",
    data() {
      return {
        isShowPop: false,
        record: [],
        toalItems: [],
        prizeInfoList: [],
        games: [{
          id: 12,
          url: '/crush'
        }, {
          id: 2, url: '/billiards'
        }, {
          id: 10, url: '/fish'
        }, {
          id: 13, url: '/kingdom2'
        }, {
          id: 18, url: '/square'
        }, {
          id: 21, url: '/Marbles'
        }]
      };
    },
    props: {
      ruleTime: {
        type: String,
        default: ""
      },
      popType: {
        type: Number,
        default: 0
      },
      prizeInfoType: {
        type: Number,
        default: 0
      },
      wavePrizeInfoType: {
        type: Number,
        default: 0
      },
      awardData: {
        type: Object,
        default: () => null
      },
      maxCanSelectLimit: {
        type: Object,
        default: null
      },
      jinbinum: {
        type: Number,
        default: 0
      },
      isHasGift: {
        type: Boolean,
        default: false
      },
      awardList: {
        type: Array,
        default: () => []
      },
      myRank: {
        type: Number,
        default: 0
      },
      countTime: {
        type: String,
        default: ''
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      getClassName(name) {
        return `${name} flag${this.popType}`
      },
      async showPop() {
        if (this.popType != 2) {
          this.isShowPop = true
        } else {
          let {code, data} = await gameReceiveRecord()
          if (code == 200) {
            this.record = data
            this.isShowPop = true
          }
        }
      },
      close() {
        this.$emit('close')
        this.isShowPop = false;
      },
      gotogame({url, id}) {
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
      getmore() {
        this.isShowPop = false;
        this.$emit('getmore')
      },
      getYesterDayGift() {//领取昨日奖励
        this.isShowPop = false;
        this.$emit('getYesterDayGift')
      }
    },
    watch: {
      isShowPop(value) {
        if (value) {
          document.body.style.overflow = 'hidden';
          document.addEventListener('touchmove', this.move, {passive: false});
        } else {
          document.body.style.overflow = null;
          document.removeEventListener('touchmove', this.move, {passive: false});
        }
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -3.43rem;
    margin-top: -4rem;
    .com_pop_mask {
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
        width: 6.86rem;
        height: 7.33rem;
        background: url("../imgs/pop_bg.png") no-repeat center
          center / 100% 100%;
        .title_bg {
          height: 1.4rem;
          position: relative;
          img {
            position: absolute;
            top: .33rem;
            left: 0;
            right: 0;
            margin: auto;
          }
        }
        .main {
          font-size: 0.24rem;
          border-radius: 0px 0px .16rem .16rem;
          padding: 0 1.2rem 0 1rem;
          box-sizing: border-box;
          color: #F6CCA4;
          margin-left: .14rem;
          position: relative;
          &.flag0, &.flag6 {
            padding: 0 .86rem 0 .7rem;
          }
          .container_compop {
            &.flag0, &.flag6 {
              position: relative;
              top: .2rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              .img_bg {
                width: 1.88rem;
                height: 1.88rem;
                background: rgba(194, 34, 64, 1);
                border: 1px solid rgba(255, 219, 157, 1);
                border-radius: .2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  width: 1.57rem;
                  height: 1.57rem;
                }
                margin-bottom: .57rem;
              }
              h4 {
                font-size: .36rem;
                font-weight: bold;
                color: rgba(246, 204, 164, 1);
                margin-bottom: .3rem;
              }
              h2 {
                font-size: .24rem;
                font-weight: bold;
                color: rgba(137, 8, 32, 1);
                margin-bottom: .5rem;
              }
              .btn {
                width: 3.18rem;
                height: .87rem;
                line-height: .65rem;
                text-align: center;
                background: url("../imgs/btnl2.png");
                background-size: 100% 100%;
                font-size: .3rem;
                font-weight: bold;
                color: rgba(144, 79, 34, 1);
                margin-bottom: .15rem;
                padding-bottom: .22rem;
                box-sizing: border-box;
              }
              .tips {
                font-size: .24rem;
                font-weight: bold;
                color: rgba(246, 204, 164, 1);
              }
            }
            &.flag1 {
              height: 5.5rem;
              position: relative;
              p {
                line-height: .4rem;
                i {
                  color: #fff179;
                  font-weight: bold;
                }
              }
            }
            &.flag2 {
              .bonus-record {
                top: .3rem;
                height: 8rem;
                position: relative;
                margin: auto;
                font-size: .3rem;
                font-weight: bold;
                .title_items {
                  display: flex;
                  height: .36rem;
                  .title {
                    flex: 1;
                    color: rgba(255, 220, 142, 1);;
                    text-align: center;
                    height: .36rem;
                    line-height: .36rem;
                  }
                }
                .content {
                  position: absolute;
                  height: 4.9rem;
                  top: .5rem;
                  left: 0rem;
                  right: 0;
                  font-size: .2rem;
                  font-weight: 500;
                  color: rgba(246, 205, 166, 1);
                  overflow: hidden;
                  border-radius: 0 0 .1rem .1rem;
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      line-height: .36rem;
                      height: .36rem;
                      div {
                        flex: 1;
                        text-align: center;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      }
                    }
                    &:before {
                      content: '';
                      position: absolute;
                      width: 1px;
                      height: 100%;
                      left: 0;
                      right: 0;
                      margin: auto;
                      background: #ff8077;
                    }
                  }
                  &:before {
                    content: '';

                  }
                }
              }
              .record-null {
                height: 2.5rem;
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
            &.flag3 {
              height: 5.5rem;
              position: relative;
              .gonglueitem {
                width: 4.47rem;
                background: rgba(237, 38, 75, 1);
                border: 2px solid rgba(255, 219, 157, 1);
                border-radius: .2rem;
                display: flex;
                color: #F6C599;
                h4 {
                  font-size: .24rem;
                  font-weight: bold;
                  line-height: .32rem;
                }
                h2 {
                  font-size: .2rem;
                  line-height: .32rem;
                }
                .left {
                  width: .69rem;
                  background: rgba(247, 158, 93, 1);
                  border-radius: .2rem 0 0 .2rem;
                  display: flex;
                  align-items: center;
                  text-align: center;
                  font-size: .36rem;
                  font-weight: bold;
                  color: rgba(136, 9, 33, 1);
                }
                .right {
                  padding: .2rem .2rem;
                  line-height: .3rem;
                  width: 3.78rem;
                  box-sizing: border-box;
                }
                margin-bottom: .2rem;
              }
            }
            &.flag5 {
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              top: .4rem;
              h4 {
                font-size: .36rem;
                font-weight: bold;
                color: rgba(246, 204, 164, 1);
                margin-bottom: .6rem;
              }
              .product-img {
                text-align: center;
                font-size: .18rem;
                font-weight: 400;
                color: #3f1207;
                line-height: .3rem;
                height: 100%;
                display: flex;
                justify-content: center;
                padding-left: .15rem;
                padding-right: .15rem;
                .item {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  width: 1.85rem;
                  align-items: center;
                  .img_bg {
                    width: 1.88rem;
                    height: 1.88rem;
                    background: rgba(194, 34, 64, 1);
                    border: 1px solid rgba(255, 219, 157, 1);
                    border-radius: .2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    img {
                      width: 1.57rem;
                      height: 1.57rem;
                    }
                  }
                  span {
                    margin-top: .09rem;
                    font-size: .24rem;
                    font-weight: 800;
                    color: #fff;
                  }
                  &:nth-child(2) {
                    margin-left: .3rem;
                    .img_bg {
                      position: relative;
                      &:before {
                        content: '';
                        position: absolute;
                        width: .5rem;
                        height: .5rem;
                        background: url("../imgs/plus.png");
                        background-size: 100% 100%;
                        left: -.4rem;
                        top: .7rem;
                        z-index: 2;
                      }
                    }
                  }
                }
              }
              .btn {
                margin-top: .4rem;
                width: 3.18rem;
                height: .87rem;
                line-height: .65rem;
                text-align: center;
                background: url("../imgs/btnl2.png");
                background-size: 100% 100%;
                font-size: .3rem;
                font-weight: bold;
                color: rgba(144, 79, 34, 1);
                margin-bottom: .15rem;
                padding-bottom: .22rem;
                box-sizing: border-box;
              }
              .tips {
                font-size: .24rem;
                font-weight: bold;
                color: rgba(246, 204, 164, 1);
              }
              .sad {
                width: 2.15rem;
                height: 2.29rem;
                margin-bottom: .2rem;
              }
              .sad_tips {
                font-size: .36rem;
                font-weight: bold;
                color: rgba(246, 204, 164, 1);
                margin-bottom: .3rem;
              }
            }
          }
          .gamelist {
            display: flex;
            flex-wrap: wrap;
            height: 4.2rem;
            justify-content: space-between;
            margin-top: .4rem;
            .game {
              width: 1.24rem;
              height: 1.69rem;
            }
          }
          .gogames {
            font-size: .3rem;
            color: rgba(246, 203, 161, 1);
            text-align: right;
            font-weight: bold;
            text-align: center;
            padding-bottom: .1rem;
          }
        }
      }
    }
    .close-icon {
      width: 0.6rem;
      height: 0.6rem;
      background: url("../imgs/close.png") no-repeat center
        center / 100% 100%;
      margin: .3rem auto;
      position: relative;
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
