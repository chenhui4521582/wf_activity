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
              <template v-if="popType==1">
                <div class="tabs">
                  <div class="item" v-for="(item,index) in tabs" @click="changeTab(index)"
                       :class="{selected:tabIndex==index}">{{item}}
                  </div>
                </div>
                <div class="bonus-record" :class="{empty:!record.length}">
                  <div class="title_items">
                    <div class="title">日期</div>
                    <div class="title">{{tabIndex==0?'鹊桥会场次':'排名'}}</div>
                    <div class="title">{{tabIndex==0?'助力值':'当天累计助力'}}</div>
                    <div class="title">{{tabIndex==0?'瓜分奖励':'排名奖励'}}</div>
                    <div class="title"></div>
                  </div>
                  <div class="content">
                    <scroll :data="record">
                      <ul>
                        <li v-for="(item,index) in record" :class="{last:record.length-1==index}">
                          <div>{{item.applyDate}}</div>
                          <div>
                            <template v-if="tabIndex==0">{{item.round}}（{{item.roundFinish?'相会成功':'相会失败'}}）</template>
                            <template v-else>{{item.rank}}</template>
                          </div>
                          <div>
                            <template v-if="tabIndex==0">{{item.amount}}（{{item.teamPercent}}%）</template>
                            <template v-else>{{item.amount}}米</template>
                          </div>
                          <div v-html="item.awardsName.replace('+','<br>')"></div>
                          <div>
                            <div class="btn" :class="{gray:item.received}" @click="gainAwards(item,tabIndex)">
                              {{item.received?'已领取':'领取'}}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
              </template>
              <template v-else-if="popType==2">
                <div class="tabs">
                  <div class="item" v-for="(item,index) in tabs" @click="changeTab(index)"
                       :class="{selected:tabIndex==index}">{{item}}
                  </div>
                </div>
                <div class="info">*仅展示每场鹊桥会前10名玩家，排行顺序1-10名</div>
                <div class="bonus-record" :class="{empty:!allRecord.length}">
                  <div class="title_items">
                    <div class="title">日期</div>
                    <div class="title">鹊桥会场次</div>
                    <div class="title">昵称</div>
                    <div class="title">助力值</div>
                    <div class="title">排名奖励</div>
                  </div>
                  <div class="content content_flag2">
                    <scroll :data="allRecord" ref="scroll" :listenScroll="true" :probeType="3"
                            @scroll="scroll">
                      <ul>
                        <li v-for="(item,index) in allRecord" :class="{last:allRecord.length-1==index}">
                          <div>{{item.applyDate}}</div>
                          <div style="white-space: normal;">{{item.round}}({{item.roundFinish?'相会成功':'相会失败'}}<template v-if="!item.roundFinish">助力值{{item.roundFinishRate}}%</template>)
                          </div>
                          <div>{{item.nickname}}</div>
                          <div>{{item.amount?item.amount:''}}</div>
                          <div v-html="item.awardsName.replace('+','<br>')"></div>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
              </template>
              <template v-else-if="popType==3">
                <div class="bonus-record" :class="{empty:!lastRecord.length}">
                  <div class="title_items">
                    <div class="title">排名</div>
                    <div class="title">昵称</div>
                    <div class="title">助力值</div>
                    <div class="title">排名奖励</div>
                  </div>
                  <div class="content">
                    <scroll :data="lastRecord" ref="scroll" :listenScroll="true" :probeType="3">
                      <ul>
                        <li v-for="(item,index) in lastRecord" :class="{last:lastRecord.length-1==index}">
                          <div :class="{first:item.rank==1,second:item.rank==2,third:item.rank==3}">
                            <span>{{item.rank}}</span>
                          </div>
                          <div>{{item.nickname}}</div>
                          <div>
                            {{item.amount}}
                          </div>
                          <div v-html="item.awardsName.replace('+','<br>')">
                          </div>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
              </template>
              <template v-else-if="[7,8,9].includes(popType)">
                <scroll>
                  <div>
                    <template v-if="popType==7">
                      <p>1、活动时间：{{actInfoData.beginDate}}-{{actInfoData.endDate}}</p>
                      <p>2、活动期间，<i>每天一键入队</i>随机加入牛郎/织女队，为牛郎/织女助力。玩家通过玩游戏支持金叶或购买活动礼包获得助力值；</p>
                      <p>3、单次鹊桥总长度{{actInfoData.totalAmount}}米。当两组玩家助力牛郎织女【鹊桥相会成功】（牛郎织女相距0米），则两队共同瓜分大奖<i>{{actInfoData.totalAwards}}</i>。奖励以各团队助力占比瓜分（如牛郎队助力值占比两队总助力60%，则领取60%奖励）；
                      </p>
                      <p>4、每天可多次助力【鹊桥相会】并多次瓜分奖励；当天最后一场鹊桥会未完成时，双方共同助力值需达成50%以上，则可瓜分一定比例奖励。否则不计奖励；</p>
                      <p>5、每天设定个人助力榜和团队贡献榜</p>
                      <p>·个人榜：单个玩家当天入队后累计助力值，前10名获排行大奖；</p>
                      <p>·团队榜：每场鹊桥会中，根据玩家在团队的贡献比计算奖励；</p>
                      <p>·单场鹊桥会达成，各队前3名分别加奖团队奖励的3%、1%、0.5%</p>
                      <p>·单个玩家在单场鹊桥会团队贡献比需0.1%以上才可瓜分团队奖励；</p>
                      <p>团队助力比和个人助力比均保留<i>小数点后两位</i>进行奖励核算。</p>
                      <p>6、<i>每天需尽早匹配入队。</i>当天入队后产生的流水自动计算成助力值，并加到当天入队后的各个场次和当天个人榜，<i>入队前不计；</i>助力值无需用户进入活动页刷新</p>
                      <p>7、团队发奖和个人榜发奖，均由玩家<i>手动领奖，过期不予补偿</i></p>
                      <p>8、购买礼包和个人榜计入活动，均以系统统计为准。</p>
                      <p>9、消耗金叶计入活动的游戏包括：糖果萌消消、街机欢乐捕鱼、疯狂炸弹人、三国大作战、欢乐竞技台球、众神风云、破晓方块消消乐、斗西游、王者弹珠。</p>
                      <p>10、本次活动分多个难度，系统为您自动匹配。</p>
                    </template>
                    <template v-else-if="popType==8">
                      <p class="weight">1.【本场团队预估奖励】</p>
                      <p>=鹊桥会达成发放总奖励*当前团队助力值占比（如牛郎和织女当前收获助力10000米，所在团队助力5000米，则助力值占比50%）</p>
                      <p>注：<i>奖励需完成鹊桥会才可发放。</i>单场鹊桥会失败，则牛郎织女助力值需达成总路程50%以上，两队可共同瓜分对应比例奖励。</p>
                      <p class="weight">2.【个人预估奖励】</p>
                      <p>=团队预计奖励*当前个人贡献（比如团队预计可瓜分10000元，个人助力值占比30%，则预计奖励=10000*30%）<br>*团队前3名再分别加奖团队奖励的3%、1%、0.5%</p>
                      <p>3.入队后，单个玩家在单场鹊桥会贡献比需0.1%以上才可瓜分团队奖励。</p>
                    </template>
                    <template v-else-if="popType==9">
                      <p>1、<i>每天一键入队</i>随机加入牛郎/织女队，助力牛郎/织女相会。玩游戏支持金叶或购买活动礼包获助力；</p>
                      <img src="../images/comPop/gonglue/1.png" alt="" style="width:5.43rem;height: 1.26rem">
                      <p>
                        2、两队助力牛郎织女【鹊桥相会成功】（即牛郎织女相距0米），则两队共同瓜分大奖。团队奖励以各团队助力占比进行瓜分；当天最后一场鹊桥会未完成时，双方共同助力值需达成50%以上，则可瓜分一定比例奖励。否则不计奖励；</p>
                      <img src="../images/comPop/gonglue/2.png" alt="" style="width:5.45rem;height: 2.75rem">
                      <p>3、每天设定<i>个人榜和团队贡献榜</i></p>
                      <p>·个人榜：单个玩家当天入队后累计助力值，前10名获排行大奖；</p>
                      <p>·团队榜：每场鹊桥会中，根据玩家在团队的贡献比计算奖励，且各队前3名额外加奖；单人在单场鹊桥会团队贡献比0.1%以上才可瓜分团队奖励；</p>
                      <p>4、<i>每天需尽早匹配入队，入队前金叶消耗不计入活动；</i></p>
                      <p>5、奖励均由<i>玩家手动领奖</i></p>
                      <img src="../images/comPop/gonglue/3.png" alt="" style="width:5.48rem;height:2.16rem">
                      <p>6、本次活动分多个难度系数，系统已为您自动匹配。</p>
                    </template>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==10">
                <div class="sad_content">
                  <img src="../images/comPop/ball.png" alt="" class="box">
                  <p>你已新增助力值{{awardData.amount}}</p>
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
                  <img src="../images/comPop/boy.png" alt="" class="person" v-if="awardData.team">
                  <img src="../images/comPop/girl.png" alt="" class="person" v-else>
                  <div class="add">你已成功加入</div>
                  <p>{{awardData.team?'牛郎助力队':'织女助力队'}}</p>
                  <div class="info">鹊桥会将有多个场次，你的助力值会自动累计到各场次，并分别计算所得奖励哟~</div>
                </div>
              </template>
            </div>
          </div>
          <div class="close" @click="close">
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import {getAwardsRecord, getHistoryRankList, gainAwardsRecord, getRankListPersonal} from '../utils/api'

  export default {
    name: 'comPop',
    data() {
      return {
        isShowPop: false,
        record: [],
        currentIndex: 1,
        pageSize: 20,
        /** 滚动到底部锁 **/
        scrollLock: false,
        lastRecord: [],
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
        titles: ["领奖页", "往期团队表现", "上期排行", "今日排行", "很遗憾", "大家都在玩", "活动规则", "奖励计算方式", "中奖攻略", "恭喜!!", "温馨提示", "恭喜!!"],
        tabIndex: 0
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
    computed: {
      tabs() {
        return this.popType == 1 ? ['团队榜', '个人榜'] : ['牛郎助力组', '织女助力组']
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      /** 列表滚动到底部重新获取数据 **/
      scroll(pos) {
        let height = document.querySelector('.content_flag2 ul').clientHeight
        let boxHeight = document.querySelector('.content_flag2').clientHeight
        let endPosition = height - boxHeight
        if (Math.abs(Math.round(pos.y)) > endPosition) {
          /** 添加滚动锁数据没有回来不允许加载数据**/
          if (this.scrollLock) {
            return false
          }
          this.scrollLock = true
          setTimeout(() => {
            // 向列表添加数据
            this.currentIndex++
            this._getAllList()
          }, 100)
        }
      },
      async _getAllList() {
        let {code, data} = await getHistoryRankList({
          pageSize: this.pageSize,
          page: this.currentIndex,
          value: this.tabIndex ? 0 : 1
        })
        if (code == 200) {
          this.allRecord = [...this.allRecord, ...data]
          /** 解除滚动限制 **/
          if (data.length == this.pageSize) {
            this.scrollLock = false
          } else {
            this.scrollLock = true
          }
          GLOBALS.marchSetsPoint('A_H5PT0323004015')//H5平台-七夕鹊桥会活动-往期表现页加载完成
          this.isShowPop = true
        }
      },
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
        if (![1, 2, 3].includes(this.popType)) {
          this.isShowPop = true
        } else {
          if (this.popType == 1 || this.popType == 2) {
            if (this.awardData) {
              this.tabIndex = this.awardData.tabIndex
            }
            if (this.popType == 1) {
              let {code, data} = await getAwardsRecord(this.tabIndex == 0)
              if (code == 200) {
                this.record = data
              }
              GLOBALS.marchSetsPoint('A_H5PT0323004012')//H5平台-七夕鹊桥会活动-领奖弹窗加载完成
              this.isShowPop = true
            } else {
              this._getAllList()
            }
          } else {
            let {code, data} = await getRankListPersonal(false)
            if (code == 200) {
              this.lastRecord = data
              this.isShowPop = true
            }
          }
        }
      },
      close() {
        this.$emit('close')
        this.isShowPop = false
        this.record = []
        this.allRecord = []
        this.lastRecord = []
        this.currentIndex = 1
        this.scrollLock = false
        if (this.popType == 11 && this.awardData) {
          this.$emit('showPop', 10, this.awardData)
        }
        if (this.popType == 1) {
          this.$emit('refresh')
        }
        this.tabIndex = 0
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
      },
      async changeTab(index) {
        this.record = []
        this.allRecord = []
        this.lastRecord = []
        this.currentIndex = 1
        this.scrollLock = false
        this.tabIndex = index
        if (this.popType == 1 || this.popType == 2) {
          if (this.popType == 1) {
            let {code, data} = await getAwardsRecord(this.tabIndex == 0)
            if (code == 200) {
              this.record = data
            }
            this.isShowPop = true
          } else {
            this._getAllList()
          }
        } else {
          let {code, data} = await getHistoryRankList()
          if (code == 200) {
            this.lastRecord = data
            this.isShowPop = true
          }
        }
      },
      async gainAwards(item, tabIndex) {
        if (!item.received) {
          let {code, message} = await gainAwardsRecord(tabIndex == 0, item.id)
          if (code == 200) {
            this.$toast.show({
              message: '领取成功'
            })
            //设置该item 为已领取
            item.received = true
          } else {
            this.$toast.show({
              message
            })
          }
        }
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
    top: 1rem;
    margin-left: -3.08rem;
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
          padding: 2.2rem .2rem 0;
          box-sizing: border-box;
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
              padding: 0 .13rem;
              box-sizing: border-box;
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
                p {
                  font-size: .24rem;
                  line-height: .36rem;
                  font-weight: bold;
                }
                img {
                  margin: .2rem 0;
                }
              }
            }
            &.flag1, &.flag2, &.flag3, &.flag4 {
              .tabs {
                width: 5.09rem;
                height: .88rem;
                background: rgba(13, 103, 154, 1);
                border-radius: .44rem;
                font-size: .36rem;
                font-weight: 400;
                color: rgba(70, 168, 224, 1);
                overflow: hidden;
                display: flex;
                margin: 0 auto .2rem;
                .item {
                  flex: 1;
                  line-height: .88rem;
                  text-align: center;
                  &.selected {
                    background: rgba(255, 254, 253, 1);
                    color: rgba(230, 75, 21, 1);
                  }
                }
              }
              .bonus-record {
                height: 2.26rem;
                position: relative;
                margin: auto;
                font-size: .2rem;
                font-weight: 400;
                .title_items {
                  display: flex;
                  height: .6rem;
                  background: rgba(192, 225, 255, 1);
                  border-radius: .08rem .08rem 0 0;
                  padding: .15rem 0;
                  box-sizing: border-box;
                  .title {
                    font-size: .22rem;
                    color: rgba(39, 141, 199, 1);
                    flex: 1;
                    text-align: center;
                    height: .3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:nth-child(1) {
                      flex: .5;
                    }
                    &:nth-child(2), &:nth-child(3) {
                      flex: 1.1;
                    }
                    /*&:nth-child(1), &:nth-child(2), &:nth-child(3) {*/
                    /*border-right: 1px solid rgba(34, 63, 107, 1);*/
                    /*}*/
                  }
                }
                .content {
                  position: absolute;
                  height: 3.6rem;
                  top: .6rem;
                  left: 0rem;
                  right: 0;
                  color: rgba(255, 255, 255, 1);
                  overflow: hidden;
                  background: rgba(72, 167, 220, 1);
                  border-radius: 0 0 .08rem .08rem;
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: .83rem;
                      align-items: center;
                      position: relative;
                      div {
                        flex: 1;
                        text-align: center;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        &:nth-child(1) {
                          flex: .5;
                        }
                        &:nth-child(2) {
                          flex: 1.1;
                        }
                        &:nth-child(3) {
                          flex: 1.2;
                        }
                        .btn {
                          width: .88rem;
                          height: .44rem;
                          text-align: center;
                          line-height: .44rem;
                          background: rgba(255, 107, 49, 1);
                          border-radius: .22rem;
                          margin: 0 auto;
                          &.gray {
                            color: rgba(72, 167, 220, 1);
                            background: rgba(41, 87, 114, 1);
                          }
                        }
                      }
                      &:not(.last):after {
                        content: '';
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        width: 5.5rem;
                        height: .01rem;
                        background: rgba(60, 156, 211, 1);
                      }
                    }
                  }
                }
                /*&.empty {*/
                /*position: absolute;*/
                /*top: 2rem;*/
                /*bottom: 0;*/
                /*left: 0;*/
                /*right: 0;*/
                /*margin: auto;*/
                /*display: flex;*/
                /*align-items: center;*/
                /*justify-content: center;*/
                /*&:before {*/
                /*content: '';*/
                /*position: absolute;*/
                /*left: 0;*/
                /*right: 0;*/
                /*margin: auto;*/
                /*width: 1.27rem;*/
                /*height: 1.27rem;*/
                /*background: url("../images/comPop/empty.png");*/
                /*background-size: 100% 100%;*/
                /*}*/
                /*&:after {*/
                /*content: '没有记录';*/
                /*position: absolute;*/
                /*left: 0;*/
                /*right: 0;*/
                /*margin: auto;*/
                /*font-size: .24rem;*/
                /*font-weight: 500;*/
                /*color: rgba(207, 117, 66, 1);*/
                /*align-self: flex-end;*/
                /*text-align: center;*/
                /*}*/
                /*}*/
              }
              &.flag1 {
                .bonus-record {
                  .title_items {
                    .title {
                      &:nth-child(4) {
                        flex: 1.2;
                      }
                      &:nth-child(5) {
                        flex: .8;
                      }
                    }
                  }
                  .content {
                    ul {
                      li {
                        div {
                          &:nth-child(4) {
                            flex: 1.2;
                          }
                          &:nth-child(5) {
                            flex: .8;
                          }
                        }
                      }
                    }
                  }
                }
              }
              &.flag2 {
                .info {
                  font-size: .2rem;
                  font-weight: 400;
                  color: rgba(133, 208, 251, 1);
                  margin: .19rem 0 .09rem;
                  text-align: center;
                }
                .bonus-record {
                  .title_items {
                    .title {
                      &:nth-child(3) {
                        flex: 1;
                      }
                      &:nth-child(5) {
                        flex: 1.2;
                      }
                    }
                  }
                  .content {
                    height: 3.3rem;
                    ul {
                      li {
                        div {
                          &:nth-child(3) {
                            flex: 1;
                          }
                          &:nth-child(5) {
                            flex: 1.2;
                          }
                        }
                      }
                    }
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
                    height: 4.7rem;
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
                margin: .5rem auto 0;
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
                .add {
                  font-size: .3rem;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
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
                  color: rgba(255, 255, 255, 1);
                  text-align: center;
                }
              }
              &.flag11 {
                .sad_content {
                  p {
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
