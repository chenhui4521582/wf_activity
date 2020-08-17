<template>
  <section :class="getClassName('com_pop')" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div :class="getClassName('main')">
            <div class="title_bg">
              <div class="title_txt">
                {{titles[popType-1]}}
              </div>
            </div>
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1||popType==2">
                <div class="bonus-record" :class="{empty:!record.length}">
                  <template v-if="record.length">
                    <div class="title_items">
                      <div class="title">日期</div>
                      <div class="title">{{popType==1?'奖池奖品':'获得数量'}}</div>
                    </div>
                    <div class="content">
                      <scroll :data="record">
                        <ul>
                          <li v-for="item in record">
                            <div>{{item.createTime}}</div>
                            <div>
                              {{popType==1?item.remark:item.propNum+'张'}}
                            </div>
                          </li>
                        </ul>
                      </scroll>
                    </div>
                  </template>
                </div>
              </template>
              <template v-else-if="popType==3||popType==4">
                <div class="bonus-record" :class="{empty:!allRecord.length}">
                  <template v-if="allRecord.length">
                    <div class="title_items">
                      <div class="title">排名</div>
                      <div class="title">昵称</div>
                      <div class="title" v-html="popType==3?'累计消耗券数':`今日累计<br>消耗券数/时间`"></div>
                      <div class="title">奖励内容</div>
                    </div>
                    <div class="content content_flag2">
                      <scroll :data="allRecord" ref="scroll" :listenScroll="true" :probeType="3">
                        <ul>
                          <li v-for="(item,index) in allRecord">
                            <div :class="{first:item.rank==1,second:item.rank==2,third:item.rank==3}"><span>{{item.rank}}</span>
                            </div>
                            <div>{{item.nickname}}</div>
                            <div>
                              {{popType==3?item.amount:item.totalNum}}张<br>
                              <span v-if="popType==4">{{item.updateTime}}</span>
                            </div>
                            <div>
                              {{item.awardsName}}
                            </div>
                          </li>
                        </ul>
                      </scroll>
                    </div>
                  </template>
                </div>
              </template>
              <template v-else-if="popType==5">
                <div class="sad_content">
                  <img src="../images/comPop/sad.png" alt="" class="sad">
                  <p>当前抽奖券不足</p>
                  <div class="btns">
                    <div class="btnred" @click="gotopay">充值获得</div>
                    <div class="btnOrange" @click="show(6)">玩游戏<br>消耗金叶获得</div>
                  </div>
                  <div class="info">具体获得券数，可至活动主页查看哦</div>
                </div>
              </template>
              <!--大家都在玩-->
              <template v-else-if="popType==6">
                <div class="gamelist">
                  <img :src="require(`../images/comPop/games/${index}.png`)" alt=""
                       v-for="(item,index) in games" class="game" @click="gotogame(item)">
                </div>
                <div class="gogames" @click="gotoindex">去玩更多游戏>></div>
              </template>
              <template v-else-if="[7,8,9].includes(popType)">
                <scroll>
                  <div>
                    <template v-if="popType==7">
                      <p>1、活动时间：{{actInfoData.timeline}}</p>
                      <p>2、<span>获得抽奖券</span></p>
                      <p>• 活动期间，单天玩游戏消耗金叶或充值获得抽奖券，抽奖券可用于“今日奖池“抽奖；</p>
                      <p>• 每日获得的抽奖券，<i>次日0点清零</i>。需及时抽奖使用；</p>
                      <p>3、<span>今日奖池</span></p>
                      <p>每天从平台系统抽取一定比例奖励作为奖池，随着玩家消耗金叶增长，奖池持续累积，并于当天24点清零，从0累计（10个话费碎片=1元话费券）；</p>
                      <p>4、<span>抽奖必中奖池</span></p>
                      <p>单次抽奖消耗抽奖券数越大，瓜分奖池奖励越高。<i>单天内累计消耗一定额度抽奖券，下次高额券抽奖必中一定比例奖池大奖（奖池基数以系统实时统计为准；瓜分机会仅当天有效）；</i></p>
                      <p>5、<span>天天排行</span></p>
                      <p>每天累计消耗抽奖券最多的10名玩家，获得排行奖励。奖励次日由系统结算发至帐户。</p>
                      <p>6、<span>限量抢券</span></p>
                      <p>活动期间，每天中午12点限量派发充值优惠券（优惠券有效期1天）</p>
                      <p>7、参与活动的游戏包括：糖果萌消消、欢乐竞技台球、街机欢乐捕鱼、三国大作战、众神风云、福满多、斗西游、深海探一探、欢乐的小鸟、炸弹人</p>
                    </template>
                    <template v-else-if="popType==8">
                      <p class="weight">1.【本场团队预估奖励】</p>
                      <p>=鹊桥会达成发放总奖励*当前团队助力值占比（如牛郎和织女当前收获助力10000米，所在团队助力5000米，则助力值占比50%）</p>
                      <p>注：<i>奖励需完成鹊桥会才可发放。</i>单场鹊桥会失败，则牛郎织女助力值需达成总路程50%以上，两队可共同瓜分对应比例奖励。</p>
                      <p class="weight">2.【个人预估奖励】</p>
                      <p>=团队预计奖励*当前个人贡献（比如团队预计可瓜分10000元，个人助力值占比30%，则预计奖励=10000*30%）<br>*团队前3名再分别加奖团队奖励的3%、2%、1%</p>
                      <p>3.入队后，单个玩家在单场鹊桥会贡献比需1%以上才可瓜分团队奖励。</p>
                    </template>
                    <template v-else-if="popType==9">
                      <p>1.每天玩游戏或买礼包获得抽奖券</p>
                      <img src="../images/comPop/gonglue/1.png" alt="" style="width:4.16rem;height: .51rem">
                      <p>2.点击抽奖按钮，可进行奖池抽奖，单次消耗高额券奖励更高</p>
                      <img src="../images/comPop/gonglue/2.png" alt="" style="width:4.14rem;height: 2.42rem">
                      <p>3.当天累计消耗一定抽奖券后，下次高额券抽奖必中奖池大奖</p>
                      <img src="../images/comPop/gonglue/3.png" alt="" style="width:4.15rem;height: 1.87rem">
                      <p>4.每天中午12点，限量派发500张优惠券，先抢先得！</p>
                      <img src="../images/comPop/gonglue/4.png" alt="" style="width:1.15rem;height: 1.25rem">
                      <p>5.当天累计消耗抽奖券前10名玩家，获得当天排行大奖</p>
                      <img src="../images/comPop/gonglue/5.png" alt="" style="width:4.35rem;height: 2.57rem">
                    </template>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==10">
                <div class="sad_content">
                  <img src="../images/comPop/ball.png" alt="" class="box">
                  <p>你已新增助力值100</p>
                  <div class="info">助力值已自动累计到今日鹊桥会各场次和<br>个人榜~</div>
                </div>
              </template>
              <template v-else-if="popType==11">
                <div class="sad_content">
                  <img src="../images/comPop/box.png" alt="" class="box">
                  <p>你有奖励待领取，<br>记得尽快领取~</p>
                </div>
              </template>
              <template v-else-if="popType==12">
                <div class="sad_content">
                  <img src="../images/comPop/boy.png" alt="" class="person">
                  <div class="add">你已成功加入</div>
                  <p>织女助力队</p>
                  <div class="info">鹊桥会将有多个场次，你的助力值会自动累计到各场次，并分别计算所得奖励哟~</div>
                </div>
              </template>
            </div>
            <template v-if="popType==4">
              <img src="../images/comPop/yesterday_rank.png" alt=""
                   style="width:.42rem;height: 1.42rem;position: absolute;top:0;    right: -0.08rem;" @click="show(3)">
              <div class="myrank">
                <div class="item">
                  <div class="myrank_title">我的排名</div>
                  <div class="myrank_content">{{mineData.myRank}}</div>
                </div>
                <div class="item">
                  <div class="myrank_title">今日消耗抽奖券</div>
                  <div class="myrank_content">{{mineData.useNum}}张</div>
                </div>
                <div class="item">
                  <div class="myrank_title">排行奖励</div>
                  <div class="myrank_content">{{mineData.currentAwards}}</div>
                </div>
              </div>
            </template>
          </div>
          <div class="close" @click="close">
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  // getAwardsRecord 获奖记录
  // getPopupList 抽奖券获得记录
  // getHistoryRankList 昨日排行
  // getRankList 今日排行
  import {getAwardsRecord, getPopupList, getHistoryRankList, getRankList} from '../utils/api'

  export default {
    name: 'comPop',
    data() {
      return {
        isShowPop: false,
        record: [],
        allRecord: [],
        mineData: null,
        games: [{
          id: 12,
          url: '/crush'
        }, {
          id: 10, url: '/fish'
        }, {
          id: 13, url: '/kingdom2'
        }, {
          id: 2, url: '/billiards'
        }, {
          id: 18, url: '/square'
        }, {
          id: 30, url: '/boom'
        }],
        titles: ["中奖记录", "抽奖券获得记录", "昨日排行", "今日排行", "很遗憾", "大家都在玩", "活动规则", "奖励计算方式", "中奖攻略", "恭喜!!", "温馨提示", "恭喜!!"]
      }
    },
    props: {
      popType: {
        type: Number,
        default: 0
      },
      awardData: {
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
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      getClassName(name) {
        return `${name} flag${this.popType}`
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
          case 'yhq':
            return '优惠券'
            break
        }
      },
      async showPop() {
        if (![1, 2, 3, 4].includes(this.popType)) {
          this.isShowPop = true
        } else {
          if (this.popType == 1 || this.popType == 2) {
            if (this.popType == 1) {
              let {code, data} = await getAwardsRecord()
              if (code == 200) {
                this.record = data
              }
              this.isShowPop = true
            } else {
              let {code, data} = await getPopupList()
              if (code == 200) {
                this.record = data
              }
              this.isShowPop = true
            }
          } else {
            if (this.popType == 3) {
              let {code, data} = await getHistoryRankList()
              if (code == 200) {
                this.allRecord = data
                this.isShowPop = true
              }
            } else {
              let {code, data} = await getRankList()
              if (code == 200) {
                this.mineData = {
                  currentAwards: data.currentAwards,
                  myRank: data.myRank,
                  useNum: this.actInfoData.userInfo.useNum
                }
                this.allRecord = data.rankList
                this.isShowPop = true
              }
            }
          }
        }
      },
      close() {
        this.$emit('close')
        this.isShowPop = false
        this.allRecord = []
        if (this.awardData && this.awardData.isAdd) {
          this.$emit('showPop', 10)
        }
      },
      move(e) {
        e.preventDefault()
      },
      gotopay() {
        this.close()
        this.$emit('opendown')
      },
      show(type) {
        this.close()
        this.$emit('showPop', type)
      },
      gotogame({url, id}) {
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
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
    margin-left: -3.08rem;
    &.flag9 {
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
        .main {
          width: 6.16rem;
          height: 7.85rem;
          background: url("../images/comPop/bg.png");
          background-size: 100% 100%;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: 2.2rem .33rem 0;
          box-sizing: border-box;
          &.flag4 {
            height: 4.8rem;
          }
          &.flag9 {
            height: 7rem;
          }
          .title_bg {
            width: 6.16rem;
            height: .94rem;
            position: absolute;
            left: 0;
            top: 1.1rem;
            .title_txt {
              position: absolute;
              left: 0;
              right: 0;
              margin: auto;
              font-size: .42rem;
              font-weight: bold;
              color: rgba(230, 75, 21, 1);
              text-align: center;
              line-height: .94rem;
            }
          }
          .container_compop {
            &.flag7, &.flag8, &.flag9 {
              position: absolute;
              height: 5.3rem;
              width: 5.5rem;
              p {
                /*font-weight: bold;*/
                color: rgba(255, 255, 255, 1);
                box-sizing: border-box;
                font-size: .26rem;
                line-height: .36rem;
                &.center {
                  text-align: center;
                  text-decoration: underline;
                }
                i {
                  color: #FFE795;
                  font-weight: bold;
                }
                span {
                  font-weight: bold;
                }
              }
              &.flag8 {
                p {
                  font-size: .26rem;
                  line-height: .5rem;
                  &.weight {
                    font-weight: bold;
                  }
                }
              }
              &.flag9 {
                height: 6.5rem;
                p {
                  font-size: .22rem;
                  line-height: .3rem;
                  font-weight: bold;
                }
                img {
                  margin: .2rem 0;
                }
              }
            }
            &.flag1, &.flag2, &.flag3, &.flag4 {
              .bonus-record {
                height: 2.16rem;
                position: relative;
                margin: auto;
                font-size: .22rem;
                font-weight: bold;
                .title_items {
                  display: flex;
                  height: .6rem;
                  background: rgba(87, 42, 231, 1);
                  .title {
                    flex: 1;
                    text-align: center;
                    height: .6rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                }
                .content {
                  position: absolute;
                  height: 3.5rem;
                  top: .6rem;
                  left: 0rem;
                  right: 0;
                  font-weight: 500;
                  color: rgba(50, 30, 68, 1);
                  overflow: hidden;
                  background: rgba(145, 113, 248, 1);
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: .6rem;
                      line-height: .6rem;
                      align-items: center;
                      div {
                        flex: 1;
                        text-align: center;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        &.first, &.second, &.third {
                          span {
                            display: inline-block;
                            width: .36rem;
                            height: .36rem;
                            border-radius: 50%;
                            line-height: .36rem;
                          }
                          &.first {
                            span {
                              background: rgba(253, 60, 60, 1);
                            }
                          }
                          &.second {
                            span {
                              background: rgba(60, 169, 253, 1);
                            }
                          }
                          &.third {
                            span {
                              background: rgba(253, 187, 60, 1);
                            }
                          }
                        }
                      }
                      &:nth-child(2n) {
                        background: rgba(134, 98, 248, 1);
                      }
                    }
                  }
                }
                &.empty {
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  margin: auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                    width: 1.27rem;
                    height: 1.27rem;
                    background: url("../images/comPop/empty.png");
                    background-size: 100% 100%;
                  }
                  &:after {
                    content: '没有记录';
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                    font-size: .24rem;
                    font-weight: 500;
                    color: rgba(207, 117, 66, 1);
                    align-self: flex-end;
                    text-align: center;
                  }
                }
              }
              &.flag3 {
                .bonus-record {
                  .title_items {
                    .title {
                      &:nth-child(1) {
                        flex: .5;
                      }
                    }
                  }
                  .content {
                    ul {
                      li {
                        div:nth-child(1) {
                          flex: .5;
                        }
                      }
                    }
                  }
                }
              }
              &.flag4 {
                .bonus-record {
                  .title_items {
                    height: .72rem;
                    .title {
                      height: .72rem;
                      &:nth-child(1) {
                        flex: .5;
                      }
                    }
                  }
                  .content {
                    height: 2.8rem;
                    top: .72rem;
                    ul {
                      li {
                        height: .72rem;
                        line-height: 1;
                        div:nth-child(1) {
                          flex: .5;
                        }
                      }
                    }
                  }
                }
              }
            }
            &.flag5, &.flag10, &.flag11, &.flag12 {
              position: relative;
              .sad_content {
                position: absolute;
                left: 0;
                right: 0;
                margin:.5rem auto 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                .box {
                  width: 2.83rem;
                  height: 2.38rem;
                  margin-bottom: .4rem;
                }
                .person {
                  width: 2.56rem;
                  height: 2.88rem;
                }
                .add{
                  font-size:.3rem;
                  font-weight:400;
                  color:rgba(255,255,255,1);
                  margin: .15rem 0 .13rem;
                }
                p {
                  font-size: .4rem;
                  font-weight: bold;
                  color: rgba(255, 236, 131, 1);
                  line-height: .4rem;
                  text-align: center;
                }
                .info {
                  margin-top: .29rem;
                  font-size: .26rem;
                  font-weight: 400;
                  color:rgba(255,255,255,1);
                  text-align: center;
                }
              }
              &.flag11 {
                .sad_content {
                  p{
                    font-size: .4rem;
                    line-height: .5rem;
                  }
                }
              }
              &.flag12 {
                .sad_content {
                  margin: .2rem auto 0;
                }
              }
            }
            &.flag6 {
              .gamelist {
                display: flex;
                flex-wrap: wrap;
                height: 4.2rem;
                justify-content: space-between;
                padding: 0 0.5rem;
                position: absolute;
                left: .5rem;
                right: .5rem;
                .game {
                  width: 1.24rem;
                  height: 1.69rem;
                }
              }
              .gogames {
                font-size: 0.36rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
              }
            }
          }
          .myrank {
            height: .97rem;
            background: rgba(255, 255, 255, 1);
            border: .02rem solid rgba(255, 198, 169, 1);
            border-radius: 0 0 .2rem .2rem;
            display: flex;
            position: absolute;
            left: 0;
            right: 0;
            bottom: -.2rem;
            margin: auto;
            width: 5.86rem;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            .item {
              font-size: .22rem;
              font-weight: 400;
              color: rgba(87, 42, 231, 1);
              .myrank_title {
                margin-bottom: .15rem;
                color: rgba(50, 30, 68, 1);
              }
            }
          }
        }
        .close {
          width: .6rem;
          height: .6rem;
          background: url("../images/comPop/close.png") no-repeat center
            center / 100% 100%;
          position: absolute;
          bottom: -.8rem;
          left: 0;
          right: 0;
          margin: auto;
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
