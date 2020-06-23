<template>
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <!--//1.规则 2.攻略 3.游戏弹窗 4.领奖 5.恭喜获得-->
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div :class="getClassName('wrap')">
          <div class="main">
            <div class="title_bg" v-if="titles[popType-1]">
              {{titles[popType-1]}}
            </div>
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1">
                <scroll>
                  <div>
                    <p>1、活动时间：{{actInfo.beginDate}}-{{actInfo.endDate}}</p>
                    <p>2、<span style="font-weight: bold">天降福粽</span></p>
                    <p>每天{{actInfo.zongzi.beginHour}}-{{actInfo.zongzi.endHour}}点平台发放【福棕】，过时未领取作废</p>
                    <p>3、<span style="font-weight: bold">龙舟大会</span></p>
                    <p>①赛制</p>
                    <p class="highlight">
                      每天开展龙舟大会，每天0-24点为1个赛程回合，共有7个回合。分铜、银、金3个赛道，各赛道长度和奖励不同；玩家需在{{actInfo.applyDeadlineHour}}点前报名，且仅可报名1个赛道。{{actInfo.applyDeadlineHour}}点后未报名的，则无法参与当日竞赛；</p>
                    <p>②获得划桨距离</p>
                    <p class="highlight">• 玩家通过玩游戏或购买专属礼包，可获划行距离；</p>
                    <p>• 新增划桨距离需手动划桨使用，否则不计入活动；</p>
                    <p>• 当天累计消耗1万金叶=1米可划桨距离。流水计入活动的游戏：欢乐竞技台球，街机欢乐捕鱼，糖果萌消消，三国大作战，欢乐的小鸟，深海探一探，王者弹珠，众神风云 ，福满多、斗西游</p>
                    <p>• 礼包所赠划桨距离在当天手动划桨使用后则计入当天比赛。</p>
                    <p>③奖励</p>
                    <p class="white">• 每天各赛道划行到一定距离，可领取【赛道奖励】，奖励由系统自动发放；</p>
                    <p>• 达成终点、且划桨长度前10名，赢当日【超级奖励】，奖励在比赛次日由系统自动发放。</p>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==2">
                <scroll>
                  <div class="pop2">
                    <div class="item">
                      <div class="left">1</div>
                      <div class="right">
                        活动期间，每天{{actInfo.zongzi.beginHour}}-{{actInfo.zongzi.endHour}}点平台发放 <i>【福棕】</i>过期未领取作废
                      </div>
                    </div>
                    <img src="../images/compop/arrow.png" alt="">
                    <div class="item">
                      <div class="left">2</div>
                      <div class="right">
                        活动期间，每天开展龙舟大会，每天0-24点为1个赛程回合，共有7个回合。分铜、银、金3个赛道，各赛道长度和奖励不同，<i>玩家需在{{actInfo.applyDeadlineHour}}点前报名，且仅可报名1个赛道。</i>{{actInfo.applyDeadlineHour}}点后未报名的，则无法参与当日竞赛。
                      </div>
                    </div>
                    <img src="../images/compop/arrow.png" alt="">
                    <div class="item">
                      <div class="left">3</div>
                      <div class="right">
                        每天各赛道划行到一定距离，可领取<i>【赛道奖励】。达成终点、且划桨长度前10名，赢当日<i>【超级奖励】</i>。
                      </i>
                      </div>
                    </div>
                    <img src="../images/compop/arrow.png" alt="">
                    <div class="item">
                      <div class="left">4</div>
                      <div class="right">
                        玩家通过玩游戏或购买专属礼包，可获得划行距离。<i>新增划桨距离需手动划桨使用，否则不计入活动</i>
                      </div>
                    </div>
                  </div>
                </scroll>
              </template>
              <!--大家玩游戏-->
              <template v-else-if="[3,4,5,6,8].includes(popType)">
                <div class="title5" v-if="popType==4">你已成功累计划桨<i>{{awardData.amount}}米</i>,<br>获得以下奖励</div>
                <div class="title5" v-else-if="popType==6&&awardData.awardsType">
                  昨日在{{channelNames[awardData.trackLevel-1]}}获得第
                  <i>{{awardData.rank}}名，</i><br>获得以下奖励
                </div>
                <img :src="`${require(`../images/compop/${awardData.awardsType}.png`)}`" alt=""
                     class="awardImg" :class="{channel:popType==8}" v-if="awardData.awardsType">
                <template v-else>
                  <img src="../images/compop/boat.png" alt="" v-if="popType==5" class="awardImg boat">
                  <img src="../images/compop/sad.png" alt="" v-else class="awardImg sad">
                </template>
                <div class="title5" v-if="popType==5">您可冲刺<i>{{awardData.awardsName}}米</i>划桨距离<br><i
                  v-if="!awardData.isFromPackage">{{awardData.isAppointment?'':'报名后可划桨'}}</i>
                  <template v-else>（含礼包赠送）</template>
                </div>
                <div class="title5" v-else-if="popType==6&&!awardData.awardsType">昨日在铜赛道暂未获得上榜，<br>再接再厉！</div>
                <div class="title5" v-else-if="popType==8">{{awardData.awardsName}}</div>
                <template v-else>
                  <div class="award_name">{{awardData.awardsName}}</div>
                  <div class="info awardsType" v-if="popType==3">
                    奖励将自动发放到账<br>每天的龙舟大会奖励更大哦
                  </div>
                  <div class="info awardsType" v-else>
                    {{awardData.awardsType?'奖励将自动发放到账':''}}
                  </div>
                </template>
                <div class="info awardsType" v-if="popType==8">
                  截至今天24点到达终点且<br>赛道排名前10名有大奖！
                </div>
              </template>
              <template v-else-if="popType==7">
                <div class="channels">
                  <div class="item" v-for="(item,index) in channels">
                    <img :src="`${require(`../images/compop/channel${index}.png`)}`" alt="" class="channel">
                    <img src="../images/compop/choose.png" alt="" class="choose" @click="chooseChannel(item)">
                  </div>
                </div>
              </template>
              <template v-else-if="popType==9">
                <div class="pop9_title">仅展示超级奖励玩家名单</div>
                <div class="toatl_awards">
                  <div class="item" v-for="(item,index) in channelNames" @click="selectTabIndex(index)"
                       :class="{selected:tabIndex==index}">
                    {{item}}
                  </div>
                </div>
                <div class="bonus-record" :class="{empty:!record.length}">
                  <div class="title_items">
                    <div class="title">排行</div>
                    <div class="title">昵称</div>
                    <div class="title">累计划桨</div>
                    <div class="title">奖励</div>
                  </div>
                  <div class="content"
                       :class="{empty:!(historyRank[tabIndex]&&historyRank[tabIndex].rankList||[]).length}">
                    <scroll ref="scroll4" :data="record"
                            v-if="(historyRank[tabIndex]&&historyRank[tabIndex].rankList||[]).length">
                      <ul>
                        <li v-for="(item,index) in (historyRank[tabIndex]&&historyRank[tabIndex].rankList||[])">
                          <div>{{item.rank}}</div>
                          <div>
                            {{item.nickname}}
                          </div>
                          <div>
                            {{item.amount}}米
                          </div>
                          <div class="awardname">
                            {{item.awardsName}}
                          </div>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
              </template>
              <template v-else-if="popType==10">
                <div class="toatl_awards">
                  <div class="item" v-for="(item,index) in tabs" @click="selectTabIndex(index)"
                       :class="{selected:tabIndex==index}">
                    {{item}}
                  </div>
                </div>
                <div class="pop10_title">
                  <template v-if="tabIndex==0">
                    <img src="../images/compop/cup.png" alt="">
                    <span>每天达成各赛道终点且<br>排名前10名可得</span>
                  </template>
                  <template v-else-if="tabIndex==1">
                    每天划桨达到一定距离，<br>系统自动发放赛道奖励
                  </template>
                  <template v-else>
                    每天达成赛道终点并排名前10名可赢<br>超级奖励，次日由系统发放
                  </template>
                </div>
                <div class="bonus-record" :class="{empty:!record.length,tab12:tabIndex!=0}">
                  <div class="title_items"
                       :class="{flag10:popType==10,tab0:tabIndex==0,tab1:tabIndex==1,tab2:tabIndex==2}">
                    <div class="title" v-for="item in pop10Title[tabIndex]">{{item}}</div>
                  </div>
                  <div class="content pop10" :class="{empty:!record.length,tab0:tabIndex==0}">
                    <scroll ref="scroll4" :data="record" v-if="record.length">
                      <ul>
                        <li v-for="(item,index) in record"
                            :class="{flag10:popType==10,tab0:tabIndex==0,tab1:tabIndex==1,tab2:tabIndex==2}">
                          <template v-if="tabIndex==0">
                            <div>{{item.rank}}</div>
                            <div>
                              {{item.copper}}
                            </div>
                            <div>
                              {{item.silver}}
                            </div>
                            <div class="awardname">
                              {{item.gold}}
                            </div>
                          </template>
                          <template v-else-if="tabIndex==1">
                            <div>{{item.applyDate}}</div>
                            <div>
                              {{channelNames[item.trackLevel-1]}}
                            </div>
                            <div>
                              {{item.amount}}米
                            </div>
                            <div class="awardname">
                              {{item.awardsName}}
                            </div>
                          </template>
                          <template v-else>
                            <div>{{item.applyDate}}</div>
                            <div>
                              {{channelNames[item.trackLevel-1]}}
                            </div>
                            <div>{{item.rank}}</div>
                            <div>
                              {{item.amount}}米
                            </div>
                            <div class="awardname">
                              {{item.awardsName}}
                            </div>
                          </template>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
              </template>
            </div>
            <div class="close" @click="close">
            </div>
          </div>
        </div>
      </div>
    </transition>
    <loading v-show="showLoading" :showBar="false"></loading>
  </section>
</template>

<script>
  import {getHistoryRank, getRankConfig, getTrackConfig, getRankAwards} from '../utils/api'

  export default {
    name: "compop",
    data() {
      return {
        isShowPop: false,
        record: [],
        toalItems: [],
        tabIndex: 0,
        showSuccess: false,
        showLoading: false,
        titles: ['活动规则', '端午争霸须知', '恭喜获得', '恭喜您！', '快去冲刺龙舟', '昨日战报', '点击选择赛道', '报名成功！', '昨日排行'],
        channelNames: ['铜赛道', '银赛道', '金赛道'],
        tabs: ['大赛奖励', '个人赛道奖励', '个人超级奖励'],
        historyRank: [],
        pop10Title: {
          0: ['排名', '铜赛道', '银赛道', '金赛道'],
          1: ['日期', '赛道', '累计划桨', '奖励'],
          2: ['日期', '赛道', '排名', '累计划桨', '奖励']
        }
      };
    },
    props: {
      isNotEnough: {
        type: Boolean,
        default: false
      },
      ruleTime: {
        type: String,
        default: ""
      },
      popType: {
        type: Number,
        default: 0
      },
      awardData: {
        type: Object,
        default: () => null
      },
      channels: {
        type: Array,
        default: () => []
      },
      actInfo: {
        type: Object,
        default: () => null
      }
    },
    components: {
      scroll: () => import('./scroll'),
      loading: () => import('../../../components/common/loading.vue')
    },
    methods: {
      async selectTabIndex(index) {
        if (this.popType == 9) {
          this.tabIndex = index
          this.$refs.scroll4 && this.$refs.scroll4.scrollTo(0, 0)
        } else {
          if (index != this.tabIndex) {
            if (index == 0) {
              let {code, data} = await getRankConfig()
              if (code == 200) {
                this.tabIndex = index
                this.record = data
                this.isShowPop = true
              }
            } else if (index == 1) {
              let {code, data} = await getTrackConfig()
              if (code == 200) {
                this.tabIndex = index
                this.record = data
                this.isShowPop = true
              }
            } else {
              let {code, data} = await getRankAwards()
              if (code == 200) {
                this.tabIndex = index
                this.record = data
                this.isShowPop = true
              }
            }
          }
        }
      },
      getClassName(name) {
        return `${name} flag${this.popType} ${this.showSuccess ? 'showSuccess' : ''}`
      },
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
      async showPop() {
        if (this.popType < 9) {
          this.isShowPop = true
        } else {
          if (this.popType == 9) {
            this.getHistoryRank()
          } else {
            let {code, data} = await getRankConfig()
            if (code == 200) {
              this.record = data
              this.isShowPop = true
            }
          }
        }
      },
      close() {
        this.$emit('close')
        if (this.popType == 4 && this.tabIndex) {
          this.$emit('refresh')
        } else if (this.popType == 6) {
          this.$emit('showPop5', 0)
        }
        this.tabIndex = 0
        this.isShowPop = false;
      },
      async gotoreceive(item) {
        //领取
        if (item.status == 0) {
          this.showLoading = true
          try {
            let {code, data, message} = await goReceive(item.id)
            if (code == 200) {
              this.showSuccess = true;
              //设置该item 为已领取
              item.status = 1
              setTimeout(() => {
                this.showSuccess = false
              }, 1000)
              this.showLoading = false
            } else {
              this.$toast.show({
                message
              })
              this.showLoading = false
            }
          } catch (e) {
            this.showLoading = false
          }
        }
      },
      chooseChannel(item) {
        this.close()
        this.$emit('chooseChannel', item)
      },
      async getHistoryRank() {
        let {code, data} = await getHistoryRank()
        if (code == 200) {
          this.historyRank = {
            0: data.filter(item => item.trackLevel == 1)[0] || null,
            1: data.filter(item => item.trackLevel == 2)[0] || null,
            2: data.filter(item => item.trackLevel == 3)[0] || null
          }
          this.isShowPop = true
        }
      },
      move(e) {
        e.preventDefault()
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
  }
  ;
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -2.55rem;
    margin-top: -40%;
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
          height: .72rem;
          position: relative;
          top: .81rem;
          left: 0;
          right: 0;
          margin: auto;
          width: 3.78rem;
          display: flex;
          align-items: center;
          justify-content: center;
          &:before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 3.78rem;
            height: .23rem;
            background: url("../images/compop/decoration.png");
            background-size: 100% 100%;
          }
          font-size: .36rem;
          font-weight: bold;
          color: rgba(153, 166, 81, 1);
        }
        .main {
          width: 5.5rem;
          height: 6.39rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          background: url("../images/compop/bg.png");
          background-size: 100% 100%;
          .container_compop {
            position: absolute;
            top: 1.5rem;
            bottom: .1rem;
            left: .2rem;
            right: .2rem;
            margin: auto;
            &.flag1 {
              position: absolute;
              top: 1.5rem;
              bottom: .3rem;
              left: .42rem;
              right: .42rem;
              margin: auto;
              font-size: .28rem;
              font-weight: 400;
              color: rgba(32, 62, 34, 1);
              line-height: .36rem;
            }
            &.flag2 {
              bottom: .3rem;
              .pop2 {
                display: flex;
                flex-direction: column;
                align-items: center;
                .item {
                  display: flex;
                  width: 4.6rem;
                  background: rgba(121, 187, 85, 1);
                  border-radius: .1rem;
                  overflow: hidden;
                  .left {
                    width: .73rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(47, 139, 55, 1);
                    font-size: .48rem;
                    font-weight: 400;
                    color: rgba(237, 249, 233, 1);
                  }
                  .right {
                    padding: .16rem;
                    box-sizing: border-box;
                    width: 3.86rem;
                    font-size: .2rem;
                    font-weight: 400;
                    color: rgba(22, 42, 24, 1);
                    i {
                      color: #AF0314;
                    }
                  }
                }
                img {
                  margin: .1rem 0;
                  width: .48rem;
                  height: .27rem;
                }
              }
            }
            &.flag3, &.flag4, &.flag5, &.flag6, &.flag8 {
              left: 0;
              right: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .title5 {
                font-size: .3rem;
                font-weight: bold;
                color: rgba(55, 147, 60, 1);
                text-align: center;
                i {
                  color: #F8632B;
                }
                margin-bottom: .33rem;
              }
              .awardImg {
                width: 2.61rem;
                &.boat {
                  width: 2.04rem;
                  margin-bottom: .33rem;
                }
                &.sad {
                  width: 1.67rem;
                  margin-bottom: .33rem;
                }
                &.channel {
                  width: 1.35rem;
                  margin-bottom: .33rem;
                }
              }
              .award_name {
                margin: .15rem 0 .6rem;
                font-size: .3rem;
                font-weight: bold;
                color: rgba(247, 99, 44, 1);
                text-align: center;
              }
              .info {
                font-size: .24rem;
                font-weight: 400;
                color: rgba(153, 167, 81, 1);
                text-align: center;
                &.awardsType {
                  bottom: 0rem;
                  line-height: .3rem;
                  i {
                    color: #F7632C;
                  }
                }
              }
              .tips {
                position: absolute;
                top: 1.28rem;
                right: .98rem;
                margin: auto;
                width: 1.4rem;
                height: .56rem;
                /*background: url("../images/compop/tip.png");*/
                /*background-size: 100% 100%;*/
                font-size: .22rem;
                font-weight: bold;
                color: rgba(255, 242, 189, 1);
                padding-bottom: .1rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
            &.flag7 {
              bottom: .5rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .channels {
                display: flex;
                .item {
                  width: 1.35rem;
                  .channel {
                    width: 1.35rem;
                  }
                  .choose {
                    margin-top: .2rem;
                    width: 1.31rem;
                  }
                  &:nth-child(2) {
                    margin: 0 .22rem;
                  }
                }
              }
            }
            &.flag9, &.flag10 {
              &.flag10 {
                top: 1rem;
              }
              .pop9_title {
                font-size: .24rem;
                font-weight: 400;
                color: rgba(153, 167, 81, 1);
                margin-bottom: .27rem;
                text-align: center;
              }
              .pop10_title {
                font-size: .24rem;
                font-weight: 400;
                color: rgba(153, 167, 81, 1);
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width: .76rem;
                }
              }
              .toatl_awards {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                width: 4.86rem;
                height: .67rem;
                background: rgba(237, 249, 233, 1);
                border: .02rem solid rgba(121, 187, 85, 1);
                border-radius: .33rem;
                box-sizing: border-box;
                overflow: hidden;
                margin: 0 auto .2rem;
                .item {
                  flex: 1;
                  font-size: .24rem;
                  font-weight: bold;
                  color: rgba(121, 187, 85, 1);
                  text-align: center;
                  line-height: .67rem;
                  box-sizing: border-box;
                  &.selected {
                    color: rgba(237, 249, 233, 1);
                    background: rgba(121, 187, 85, 1);
                  }
                  &:nth-child(2) {
                    border-left: .02rem solid rgba(121, 187, 85, 1);
                    border-right: .02rem solid rgba(121, 187, 85, 1);
                  }
                }
              }
              .bonus-record {
                height: 2.16rem;
                position: relative;
                margin: auto;
                font-size: .22rem;
                font-weight: bold;
                &.tab12 {
                  margin-top: .2rem;
                }
                .title_items {
                  width: 4.85rem;
                  height: .6rem;
                  background: rgba(121, 187, 85, 1);
                  display: flex;
                  margin: auto;
                  .title {
                    flex: 1;
                    text-align: center;
                    font-size: .22rem;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    line-height: .6rem;
                    &:nth-child(1) {
                      flex: .5;
                    }
                    &:nth-child(2) {
                      flex: .5;
                    }
                  }
                  &.tab0 {
                    background: rgba(255, 154, 46, 1);
                  }
                  &.flag10 {
                    &.tab0 {
                      .title:nth-child(2) {
                        flex: 1;
                      }
                    }
                    &.tab2 {
                      .title:nth-child(1) {
                        flex: 1;
                      }
                      .title:nth-child(3) {
                        flex: .5;
                      }
                    }
                  }
                }
                .content {
                  width: 4.85rem;
                  position: absolute;
                  height: 2.5rem;
                  left: 0rem;
                  right: 0;
                  margin: auto;
                  overflow: hidden;
                  font-size: .2rem;
                  font-weight: 400;
                  color: rgba(50, 63, 43, 1);
                  line-height: .36rem;
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: .6rem;
                      align-items: center;
                      background: rgba(206, 249, 182, 1);
                      div {
                        flex: 1;
                        text-align: center;
                        overflow: hidden;
                        &:not(.awardname) {
                          white-space: nowrap;
                        }
                        text-overflow: ellipsis;
                        &:nth-child(1) {
                          flex: .5;
                        }
                        &:nth-child(2) {
                          flex: .5;
                        }
                        &.awardname {
                          word-break: break-all;
                          line-height: .3rem;
                        }
                      }
                      &:nth-child(2n) {
                        background: rgba(175, 228, 144, 1);
                      }
                      &.flag10 {
                        &.tab0 {
                          div:nth-child(2) {
                            flex: 1;
                          }
                        }
                        &.tab2 {
                          div:nth-child(1) {
                            flex: 1;
                          }
                          div:nth-child(3) {
                            flex: .5;
                          }
                        }
                      }
                    }
                  }
                  &.pop10 {
                    height: 2.8rem;
                  }
                  &.tab0 {
                    ul {
                      li {
                        background: rgba(248, 222, 195, 1);
                        &:nth-child(2n) {
                          background: rgba(251, 209, 163, 1);
                        }
                      }
                    }
                  }
                }
              }
              &.showSuccess {
                &:before {
                  content: '';
                  position: absolute;
                  left: 0;
                  right: 0;
                  margin: auto;
                  width: 3.79rem;
                  height: 3.85rem;
                  /*background: url("../images/compop/receivesuccess.png");*/
                  /*background-size: 100% 100%;*/
                  z-index: 101;
                }
              }
            }
          }
          .close {
            position: absolute;
            bottom: -1rem;
            left: 0;
            right: 0;
            margin: auto;
            width: .6rem;
            height: .6rem;
            background: url("../images/compop/close.png");
            background-size: 100% 100%;
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
