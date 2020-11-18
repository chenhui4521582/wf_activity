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
                  <template v-for="(item,index) in tabs">
                    <img class="item" :src="`${require(`../img/compop/tab${index}${tabIndex==index?1:0}.png`)}`" alt=""
                         @click="changeTab(index)">
                  </template>
                </div>
                <div class="bonus-record" :class="{empty:!record.length}">
                  <div class="title_items" :class="{empty:!record.length}">
                    <div class="title">参与赛次</div>
                    <div class="title">{{tabIndex==1?'排名':'奖励类型/时间'}}</div>
                    <div class="title">奖励</div>
                  </div>
                  <div class="content">
                    <scroll :data="record">
                      <ul>
                        <li v-for="(item,index) in record" :class="{last:record.length-1==index}">
                          <div>{{raceInfo[item.userLevel-1]}}-第{{item.userRound}}场</div>
                          <div>
                            <template v-if="tabIndex==1">{{item.businessValue}}</template>
                            <template v-else>累计{{item.amount}}奖杯<br>{{item.createTime}}</template>
                          </div>
                          <div>
                            <div class="awardsName">{{item.awardsName}}</div>
                            <div class="btn" :class="{gray:item.received}" @click="gainAwards(item)" v-if="tabIndex==0">
                              {{item.received?'已领取':'领取'}}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
              </template>
              <template v-else-if="popType==3">
                <div class="tabs" v-if="lastRecord.level&&lastRecord.round">
                  <div :class="getClassName('item')">
                    {{raceInfo[lastRecord.level-1]}}-第{{lastRecord.round}}场
                  </div>
                  <!--<img src="../img/compop/tab11.png" class="item selected" alt="">-->
                </div>
                <div class="bonus-record" :class="{empty:!lastRecord.rankList.length}">
                  <div class="title_items" :class="{empty:!lastRecord.rankList.length}">
                    <div class="title">排名</div>
                    <div class="title">昵称</div>
                    <div class="title">奖杯数</div>
                    <div class="title">奖励</div>
                  </div>
                  <div class="content">
                    <scroll :data="lastRecord" ref="scroll" :listenScroll="true" :probeType="3">
                      <ul>
                        <li v-for="(item,index) in lastRecord.rankList"
                            :class="{last:lastRecord.rankList.length-1==index}">
                          <div>
                            <span>{{item.rank}}</span>
                          </div>
                          <div>{{item.nickname}}</div>
                          <div>
                            {{item.totalNum}}
                          </div>
                          <div v-html="item.awardsName.replace('+','<br>')">
                          </div>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
              </template>
              <template v-else-if="[7,9].includes(popType)">
                <scroll>
                  <div>
                    <template v-if="popType==7">
                      <p v-if="actInfoData">1、活动时间：{{actInfoData.beginDate}}-{{actInfoData.endDate}}</p>
                      <p>2、通过游戏流水消耗/礼包购买，获得奖杯（活动期间，每累计5万流水=1个奖杯）；</p>
                      <p>3、赛段晋级说明</p>
                      <p>①活动共分为青铜（活动第1-2天）、白银（活动第3-4天）、黄金（活动第5-6天）3个赛段。</p>
                      <p>②活动1-2天青铜赛：两天内累计达成{{actInfoData.levelInfo[0].upgradeCondition}}杯，可晋级参与白银赛段。未晋级到白银段的玩家，活动3-4天仍停留在青铜段，参与青铜段的排行争夺。</p>
                      <P> 活动3-4天白银赛：参与银赛的玩家，两天内累计达成{{actInfoData.levelInfo[1].upgradeCondition}}杯，可晋级到黄金赛段。</P>
                      <p>活动5-6天黄金赛：所有晋级到黄金赛的玩家，均可领取奖励。前20名可领取终极大奖。排名对奖杯数无限制;</p>
                      <p>③各赛段单场次获得的奖杯均单独累计，并参与单场排行争夺。</p>
                    </template>
                    <template v-else-if="popType==9">
                      <div class="preview">
                        <div class="item1">
                          <div class="item"><{{actInfoData.levelInfo[0].upgradeCondition}}</div>
                          <div class="item">≥{{actInfoData.levelInfo[0].upgradeCondition}}</div>
                        </div>
                        <div class="item2">
                          <div class="item">青铜-<br>第2场</div>
                          <div class="item">白银-<br>第1场</div>
                        </div>
                        <div class="item3">
                          <div class="item"><{{actInfoData.levelInfo[1].upgradeCondition}}</div>
                          <div class="item">≥{{actInfoData.levelInfo[1].upgradeCondition}}</div>
                        </div>
                      </div>
                    </template>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==10">
                <div class="sad_content">
                  <img src="../img/compop/cup.png" alt="" class="cup">
                  <p>你已新增奖杯</p>
                  <div class="info">x{{awardData.amount}}</div>
                </div>
              </template>
              <template v-else-if="popType==12">
                <div class="sad_content">
                  <img :src="`${require(`../img/level${awardData.race}.png`)}`" alt="" class="mycup"
                       style="width: 3.08rem;margin-bottom: .3rem;">
                  <p>成功晋级{{raceInfo[awardData.race]}}段</p>
                  <div class="info" style="font-size: .26rem;color: #D4D3FF" v-if="awardData.race==1">活动第3-4天将参与白银争夺赛
                  </div>
                  <div class="info" style="font-size: .26rem;color: #D4D3FF" v-else-if="awardData.race==2">
                    活动第5-6天将参与黄金争夺赛
                  </div>
                </div>
              </template>
              <template v-else-if="popType==13">
                <div class="sad_content">
                  <div class="img_bg">
                    <img :src="`${require(`../img/compop/${awardData.awardsType}.png`)}`" alt="" class="mycup">
                    <div class="name">
                      {{awardData.awardsName}}
                    </div>
                  </div>
                  <div class="info" style="font-size: .24rem;color: #D4D3FF">在<i style="color: #D91638">{{raceInfo[awardData.level-1]}}赛-第{{awardData.round}}场</i>排名<i
                    style="color: #D91638">第{{awardData.rank}}名</i>，<br>获得以上奖励
                  </div>
                  <div class="info" style="font-size: .22rem;color: #D4D3FF">奖励将自动发放到账</div>
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
  import {getAwardsRecord, getHistoryRankList, gainAwardsRecord} from '../services/api'

  export default {
    name: 'comPop',
    data () {
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
        titles: ['我的奖励', '往期团队表现', '上期排名', '今日排行', '很遗憾', '大家都在玩', '活动规则', '奖励计算方式', '赛制一览', '恭喜你', '温馨提示', '恭喜你', '恭喜你上榜'],
        tabIndex: 0,
        raceInfo: ['青铜', '白银', '黄金']
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
      },
      level: {
        type: Number,
        default: 0
      },
      race: {
        type: Number,
        default: 0
      }
    },
    computed: {
      tabs () {
        return this.popType == 1 ? ['团队榜', '个人榜'] : ['牛郎助力组', '织女助力组']
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      getClassName (name) {
        return `${name} flag${this.popType}`
      },
      getAwardName (awardType) {
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
      async showPop () {
        if (![1, 3].includes(this.popType)) {
          if (this.popType == 10) {
            if (this.awardData && this.awardData.amount) {
              this.isShowPop = true
            } else {
              this.$emit('close')
            }
          } else {
            this.isShowPop = true
          }
        } else {
          if (this.popType == 1) {
            let {code, data} = await getAwardsRecord(this.tabIndex + 1)
            if (code == 200) {
              this.record = data
            }
            this.isShowPop = true
          } else {
            let {code, data} = await getHistoryRankList(this.level + 1)
            if (code == 200) {
              this.lastRecord = data
              this.isShowPop = true
            }
          }
        }
      },
      close () {
        this.$emit('close')
        this.isShowPop = false
        this.record = []
        this.allRecord = []
        this.lastRecord = []
        this.currentIndex = 1
        this.scrollLock = false
        if ([12, 13].includes(this.popType) && this.awardData) {
          console.log('99999')
          this.$emit('showPop', 10, this.awardData)
        }
        if (this.popType == 1) {
          this.$emit('refresh', false)
        }
        this.tabIndex = 0
      },
      move (e) {
        e.preventDefault()
      },
      gotopay () {
        this.close()
        this.$emit('opendown')
      },
      show (type) {
        this.close()
        this.$emit('showPop', type)
      },
      gotogame ({url, id}) {
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex () {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
      async changeTab (index) {
        this.record = []
        this.allRecord = []
        this.lastRecord = []
        this.currentIndex = 1
        this.scrollLock = false
        this.tabIndex = index
        if (this.popType === 1) {
          let {code, data} = await getAwardsRecord(this.tabIndex + 1)
          if (code === 200) {
            this.record = data
          }
          this.isShowPop = true
        } else {
          let {code, data} = await getHistoryRankList(this.level + 1)
          if (code === 200) {
            this.lastRecord = data
            this.isShowPop = true
          }
        }
      },
      async gainAwards (item) {
        if (!item.received) {
          let {code, message} = await gainAwardsRecord(item.id)
          if (code == 200) {
            this.$toast.show({
              message: '领取成功'
            })
            // 设置该item 为已领取
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
      isShowPop (value) {
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
    top: -1rem;
    margin-left: -2.75rem;
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
          width: 5.5rem;
          height: 10.47rem;
          background: url("../img/compop/bg.png");
          background-size: 100% 100%;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: 4.5rem .2rem 0;
          box-sizing: border-box;
          .title_bg {
            width: 6.16rem;
            height: .94rem;
            position: absolute;
            left: 0;
            top: 3.45rem;
            .title_txt {
              position: absolute;
              left: 1.9rem;
              font-size: .3rem;
              font-weight: bold;
              color: #FFFFFF;
              text-align: center;
              line-height: .94rem;
              width: 1.9rem;
            }
          }
          &.flag9 {
            display: flex;
            justify-content: center;
          }
          .container_compop {
            &.flag7, &.flag8, &.flag9 {
              padding: 0 .2rem;
              box-sizing: border-box;
              position: absolute;
              width: 4.8rem;
              height: 5.4rem;
              p {
                font-weight: 500;
                color: #D4D3FF;
                box-sizing: border-box;
                font-size: .24rem;
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
                padding: 0;
                .preview{
                  width: 4.88rem;
                  height: 5.27rem;
                  background: url("../img/compop/preview.png");
                  background-size: 100% 100%;
                  position: relative;
                  font-size: .2rem;
                  font-weight: bold;
                  color: #D4D3FF;
                  .item1{
                    position: absolute;
                    top:.94rem;
                    left: 2.4rem;
                    display: flex;
                    justify-content: space-between;
                    width: 1.6rem;
                    .item{
                      width:.8rem;
                      text-align: center;
                    }
                  }
                  .item2{
                    position: absolute;
                    top:1.64rem;
                    left: 2.4rem;
                    display: flex;
                    justify-content: space-between;
                    width: 1.6rem;
                    .item{
                      width:.8rem;
                      text-align: center;
                    }
                  }
                  .item3{
                    position: absolute;
                    top:3.7rem;
                    left: 3.25rem;
                    display: flex;
                    justify-content: space-between;
                    width: 1.6rem;
                    .item{
                      width:.75rem;
                      text-align: center;
                    }
                  }
                }
              }
            }
            &.flag1, &.flag2, &.flag3, &.flag4 {
              .tabs {
                width: 3.12rem;
                height: .44rem;
                font-size: .36rem;
                font-weight: 400;
                color: rgba(70, 168, 224, 1);
                overflow: hidden;
                display: flex;
                margin: 0 auto .2rem;
                justify-content: center;
                position: relative;
                z-index: 1000;
                .item {
                  width: 1.56rem;
                  height: .44rem;
                  &.flag3 {
                    font-size: .22rem;
                    font-weight: bold;
                    color: #252366;
                    background: url("../img/compop/lasttab_bg.png");
                    background-size: 100% 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center
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
                  padding: .15rem 0;
                  box-sizing: border-box;
                  &.empty {
                    width: 85%;
                  }
                  .title {
                    font-size: .24rem;
                    font-weight: bold;
                    color: #D4D3FF;
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
                  }
                }
                .content {
                  position: absolute;
                  height: 4rem;
                  top: .6rem;
                  left: 0rem;
                  right: 0;
                  color: rgba(255, 255, 255, 1);
                  overflow: hidden;
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: .4rem;
                      align-items: center;
                      position: relative;
                      div {
                        flex: 1;
                        text-align: center;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: .22rem;
                        font-weight: 500;
                        color: #D4D3FF;
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
                          width: 1rem;
                          height: .52rem;
                          text-align: center;
                          line-height: .52rem;
                          background: linear-gradient(0deg, #F13E41 0%, #FF7D7F 100%);
                          border-radius: .26rem;
                          margin: .1rem auto 0;
                          color: #FFFFFF;
                          font-size: .22rem;
                          font-weight: bold;
                          &.gray {
                            color: #252366;
                            background: #5956C3;
                          }
                        }
                      }
                    }
                  }
                }
                &.empty {
                  position: absolute;
                  top: 0rem;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  margin: auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 4.5rem;
                  &:after {
                    content: '暂无记录';
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                    font-size: .28rem;
                    font-weight: 500;
                    color: #08EBFC;
                    align-self: flex-end;
                    text-align: center;
                  }
                }
              }
              &.flag1 {
                .bonus-record {
                  .title_items {
                    .title {
                      &:nth-child(1) {
                        flex: .8;
                      }
                    }
                  }
                  .content {
                    ul {
                      li {
                        height: 1rem;
                        div {
                          &:nth-child(1) {
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
            &.flag5, &.flag10, &.flag11, &.flag12, &.flag13 {
              position: relative;
              .sad_content {
                position: absolute;
                left: 0;
                right: 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                .box {
                  width: 2.83rem;
                  height: 2.38rem;
                  margin-bottom: .4rem;
                }
                .cup {
                  width: 3.63rem;
                  height: 3.69rem;
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
                  font-size: .3rem;
                  font-weight: bold;
                  color: #00FBFF;
                  line-height: .4rem;
                  text-align: center;
                }
                .info {
                  margin-top: .2rem;
                  font-size: .4rem;
                  font-weight: bold;
                  color: #FFD152;
                  text-align: center;
                }
                .img_bg {
                  width: 3.63rem;
                  height: 3.69rem;
                  background: url("../img/compop/light.png");
                  background-size: 100% 100%;
                  padding-top: 1.4rem;
                  box-sizing: border-box;
                  display: flex;
                  flex-direction: column;
                  img {
                    width: 1.68rem;
                    margin-bottom: .64rem;
                    padding-left: .93rem;
                  }
                  .name {
                    font-size: .26rem;
                    color: #FFD152;
                    font-weight: bold;
                    text-align: center;
                  }
                }
                i {
                  font-style: normal;
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
          background: url("../img/compop/close.png") no-repeat center
            center / 100% 100%;
          position: absolute;
          bottom: -.4rem;
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
