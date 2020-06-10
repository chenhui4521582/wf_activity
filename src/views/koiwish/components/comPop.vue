<template>
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <!--//1.规则 2.攻略 3.游戏弹窗 4.领奖 5.恭喜获得-->
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div :class="getClassName('wrap')">
          <div class="main">
            <div class="title_bg">
              <img :src="`${require(`../images/compop/${popType}/title.png`)}`" alt="" v-if="[1,2].includes(popType)">
              <img :src="`${require(`../images/compop/${popType}/${isNotEnough?1:0}/title.png`)}`" alt=""
                   v-else-if="popType==3">
              <img :src="`${require(`../images/compop/${popType}/${tabIndex}/title.png`)}`" alt=""
                   v-else-if="popType==4">
              <img :src="`${require(`../images/compop/${popType}/${awardData.awardsType?1:0}/title.png`)}`" alt=""
                   v-else-if="popType==5">
            </div>
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1">
                <scroll>
                  <div>
                    <p>1、活动时间：{{ruleTime}}开始</p>
                    <p>2、活动期间，玩游戏累计消耗1万金叶获1颗许愿珠，许愿珠可用于向许愿池许愿，解锁奖品； </p>
                    <p>3、许愿池分为至尊池、黄金池，每种许愿池各有3种锦鲤大奖，各设3次锦鲤开奖机会（蓄满奖池后600秒抽锦鲤结束后，即为1场结束）；</p>
                    <p class="highlight">4、单场累计许愿送奖励</p>
                    <p>单个场次奖池积蓄许愿珠时，玩家消耗许愿珠向奖池许愿，达到一定数量即可解锁奖品，玩家可到【领奖】页手动领取；</p>
                    <p class="highlight">5、许愿池开启，中锦鲤大奖</p>
                    <p>①许愿池积满一定许愿珠时（至尊池积满10000珠，黄金池积满5000珠），奖池开启600秒倒计时，在此期间许愿有机率赢锦鲤大奖。</p>
                    <p>②单局消耗许愿珠越高，锦鲤中奖率越高；</p>
                    <p>③每场许愿池有3条锦鲤，单个玩家最高赢全部锦鲤</p>
                    <p>④600秒倒计时结束后开奖，【领奖】页公布锦鲤中奖名单</p>
                    <p class="white">注：抽锦鲤期间许愿消耗的许愿珠，不计入【当前场次累计消耗许愿珠】，不可额外解锁奖品</p>
                    <p>6、场次结束</p>
                    <p>①每种许愿池共有3场。每场开奖后，下一场开始，<span class="white">上一场的累计消耗许愿珠归零，许愿池从0累计许愿珠；</span></p>
                    <p>②任一许愿池在<span class="highlight">第3场开奖后即为结束</span>；两种许愿池均结束后，活动结束，且剩余许愿珠作废；</p>
                    <p>7、金叶消耗计入活动的游戏包括：欢乐竞技台球，街机欢乐捕鱼，糖果萌消消，三国大作战，欢乐的小鸟，深海探一探，王者弹珠，众神风云 ，福满多、斗西游。</p>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==2">
                <scroll>
                  <div>
                    <p>1、玩游戏累计消耗1万金叶=1颗许愿珠，许愿珠可用于许愿池许愿，解锁奖品；</p>
                    <p>2、活动共有2个奖池，选择其中一个奖池许愿，单个场次消耗的许愿珠达到一定数量可解锁奖品；</p>
                    <p>3、许愿池积满许愿珠后，开启600秒抽锦鲤倒计时，单个玩家有机率获全部锦鲤大奖（单局消耗许愿珠越高，中率越高）；600秒结束后，中奖用户名单【领奖】页公布；</p>
                    <p class="white">注：抽锦鲤期间许愿消耗的许愿珠，不计入【当前场次累计消耗许愿珠】，不可额外解锁奖品</p>
                    <p>4、每种许愿池共有3场。每场开奖后，下一场开始，上场累计消耗许愿珠归零，许愿池从0累计许愿珠 </p>
                    <p>5、当至尊、黄金池3场开奖均结束后，活动结束。 </p>
                    <p>具体可见活动规则</p>
                  </div>
                </scroll>
              </template>
              <!--大家玩游戏-->
              <template v-else-if="popType==3">
                <div class="title_info">累计消耗1万金叶=1许愿珠</div>
                <div class="gamelist">
                  <img :src="require(`../images/compop/games/${index}.png`)" alt="" v-for="(item,index) in games"
                       class="game"
                       @click="gotogame(item)">
                </div>
                <div class="gogames" @click="gotoindex">更多游戏>></div>
                <div class="title_info">部分游戏流水计入活动，详见规则</div>
              </template>
              <template v-else-if="popType==4">
                <div class="toatl_awards">
                  <div class="item" v-for="(item,index) in 2" @click="selectTabIndex(index)">
                    <img :src="`${require(`../images/compop/tab${index}${tabIndex==index?1:0}.png`)}`" alt=""
                         class="game">
                  </div>
                </div>
                <div class="bonus-record" :class="{empty:!record.length}">
                  <div class="title_items">
                    <div class="title">奖池</div>
                    <div class="title">场次</div>
                    <div class="title">{{tabIndex==0?'昵称':'奖品'}}</div>
                    <div class="title">{{tabIndex==0?'奖品':''}}</div>
                  </div>
                  <div class="content" :class="{empty:!record.length}">
                    <scroll ref="scroll4" :data="record" v-if="record.length">
                      <ul>
                        <li v-for="item in record">
                          <div>{{jackpotType[item.jackpotType-1]}}</div>
                          <div>
                            {{item.round}}
                          </div>
                          <div :class="{awardname:tabIndex==1}">
                            {{tabIndex==0?item.nickname:item.awardsName}}
                          </div>
                          <div :class="{awardname:tabIndex==0}">
                            <template v-if="tabIndex==0">
                              {{item.awardsName}}
                            </template>
                            <div class="btn" :class="{gray:item.status==1}" v-else
                                 @click="gotoreceive(item)"></div>
                          </div>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
              </template>
              <template v-else-if="popType==5">
                <div class="light">
                  <template v-if="awardData.awardsType">
                    <img :src="`${require(`../images/compop/${awardData.awardsType}.png`)}`" alt="" class="awardImg">
                    <div class="award_name">{{awardData.awardsType=='box'?'幸运盲盒':awardData.awardsName}}</div>
                    <div class="info awardsType">
                      奖品可在<i>【领奖】</i>页手动领取<br>继续许愿可获更多奖励！
                    </div>
                    <div class="tips" v-if="awardData.awardsType=='box'">{{awardData.awardsName}}</div>
                  </template>
                  <template v-else>
                    <template v-if="awardData.level">
                      <div class="title5">您在{{awardData.jackpotType==1?'至尊许愿池':'黄金许愿池'}}第{{awardData.round}}场获得</div>
                      <img :src="`${require(`../images/compop/${awardData.level}.png`)}`" alt="" class="awardImg">
                    </template>
                    <img src="../images/compop/zhuzhu.png" alt="" class="awardImg" v-else>
                    <div class="award_name">{{awardData.awardsName}}</div>
                    <div class="info">
                      许愿有机会成赢取锦鲤大奖
                    </div>
                  </template>
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
  import {getAwardsList, getKoiList, goReceive} from '../utils/api'

  export default {
    name: "compop",
    data() {
      return {
        isShowPop: false,
        jackpotType: ['至尊', '黄金'],
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
        }],
        tabIndex: 0,
        showSuccess: false,
        showLoading:false
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
    },
    components: {
      scroll: () => import('./scroll'),
      loading: () => import('../../../components/common/loading.vue')
    },
    methods: {
      async selectTabIndex(index) {
        if (index != this.tabIndex) {
          if (index == 1) {
            let {code, data} = await getAwardsList()
            if (code == 200) {
              this.tabIndex = index
              this.record = data
            }
          } else {
            let {code, data} = await getKoiList()
            if (code == 200) {
              this.tabIndex = index
              this.record = data
            }
          }
          this.$refs.scroll4 && this.$refs.scroll4.scrollTo(0, 0)
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
        if ([1, 2, 3, 5].includes(this.popType)) {
          this.isShowPop = true
        } else {
          let {code, data} = await getKoiList()
          if (code == 200) {
            this.record = data
            this.isShowPop = true
          }
        }
      },
      close() {
        this.$emit('close')
        if (this.popType == 4 && this.tabIndex) {
          this.$emit('refresh')
        }
        this.tabIndex = 0
        this.isShowPop = false;
      },
      gotogame({url, id}) {
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
      async gotoreceive(item) {
        //领取
        if (item.status == 0) {
          this.showLoading=true
          try{
            let {code, data,message} = await goReceive(item.id)
            if (code == 200) {
              this.showSuccess = true;
              //设置该item 为已领取
              item.status = 1
              setTimeout(() => {
                this.showSuccess = false
              }, 1000)
              this.showLoading=false
            }else{
              this.$toast.show({
                message
              })
              this.showLoading = false
            }
          }catch (e) {
            this.showLoading = false
          }
        }
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
          top: .1rem;
          left: 1.4rem;
          width: 2.45rem;
          img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            height: .34rem;
          }
        }
        .main {
          width: 5.1rem;
          height: 6.39rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          background: url("../images/compop/bg.png");
          background-size: 100% 100%;
          .container_compop {
            position: absolute;
            top: 1rem;
            bottom: .1rem;
            left: .2rem;
            right: .2rem;
            margin: auto;
            &.flag1, &.flag2 {
              position: absolute;
              top: 1rem;
              bottom: .3rem;
              left: .2rem;
              right: .2rem;
              margin: auto;
              font-size: .24rem;
              font-weight: 500;
              line-height: .36rem;
              color:rgba(239,192,145,1);
              .highlight{
                font-weight: bold;
                color:#FFF0B3;
              }
              .white{
                font-weight: bold;
                color: #fff;
              }
            }
            &.flag3 {
              .title_info {
                margin-top: .1rem;
                text-align: center;
                font-size: .24rem;
                font-weight: 500;
                font-style: italic;
                color: rgba(255, 255, 255, 1);
              }
              .gamelist {
                display: flex;
                flex-wrap: wrap;
                height: 3.6rem;
                justify-content: space-between;
                margin-top: .24rem;
                padding: 0 .4rem;
                .game {
                  width: 1.24rem;
                  height: 1.69rem;
                }
              }
              .gogames {
                font-size: .32rem;
                font-weight: 800;
                font-style: italic;
                color: rgba(255, 241, 86, 1);
                text-align: center;
                margin-top: .2rem;
              }
            }
            &.flag4 {
              .toatl_awards {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin-bottom: .3rem;
                .item {
                  img {
                    width: 2.19rem;
                    height: .63rem;
                  }
                }
              }
              .bonus-record {
                height: 2.16rem;
                position: relative;
                margin: auto;
                font-size: .22rem;
                font-weight: bold;
                .title_items {
                  display: flex;
                  .title {
                    flex: 1;
                    text-align: center;
                    font-size: .26rem;
                    font-weight: bold;
                    color: rgba(255, 240, 179, 1);
                    &:nth-child(1) {
                      text-align: left;
                      flex: .5;
                    }
                    &:nth-child(2) {
                      flex: .5;
                    }
                  }
                }
                .content {
                  position: absolute;
                  height: 3.5rem;
                  top: .7rem;
                  left: 0rem;
                  right: 0;
                  overflow: hidden;
                  font-size: .22rem;
                  font-weight: 500;
                  color: rgba(255, 240, 179, 0.8);
                  line-height: .36rem;
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: .8rem;
                      align-items: center;
                      div {
                        flex: 1;
                        text-align: center;
                        overflow: hidden;
                        &:not(.awardname) {
                          white-space: nowrap;
                        }
                        text-overflow: ellipsis;
                        &:nth-child(1) {
                          text-align: left;
                          flex: .5;
                        }
                        &:nth-child(2) {
                          flex: .5;
                        }
                        &.awardname {
                          word-break: break-all;
                          line-height: .3rem;
                        }
                        .btn {
                          width: 1.41rem;
                          height: .63rem;
                          background: url("../images/compop/receive.png");
                          background-size: 100% 100%;
                          &.gray {
                            background: url("../images/compop/received.png");
                            background-size: 100% 100%;
                          }
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
                  background: url("../images/compop/receivesuccess.png");
                  background-size: 100% 100%;
                  z-index: 101;
                }
              }
            }
            &.flag5 {
              left: 0;
              right: 0;
              .light {
                content: '';
                position: absolute;
                top: -.4rem;
                left: 0;
                right: 0;
                margin: auto;
                width: 4.9rem;
                height: 4.98rem;
                background: url("../images/compop/light.png");
                background-size: 100% 100%;
                .title5 {
                  position: absolute;
                  top: .44rem;
                  left: 0;
                  right: 0;
                  margin: auto;
                  font-size: .24rem;
                  font-weight: 500;
                  font-style: italic;
                  color: rgba(255, 255, 255, 1);
                  text-align: center;
                }
                .awardImg {
                  width: 2.61rem;
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  margin: auto;
                }
                .award_name {
                  position: absolute;
                  bottom: .8rem;
                  left: 0;
                  right: 0;
                  margin: auto;
                  font-size: .32rem;
                  font-weight: 800;
                  font-style: italic;
                  color: rgba(255, 241, 86, 1);
                  text-align: center;
                }
                .info {
                  position: absolute;
                  bottom: .3rem;
                  left: 0;
                  right: 0;
                  margin: auto;
                  font-size: .24rem;
                  font-weight: 500;
                  font-style: italic;
                  color: rgba(255, 255, 255, 1);
                  text-align: center;
                  &.awardsType {
                    bottom: 0rem;
                    line-height: .3rem;
                    i {
                      color: #FFF25A;
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
                  background: url("../images/compop/tip.png");
                  background-size: 100% 100%;
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
            }
          }
          .close {
            position: absolute;
            bottom: -.88rem;
            left: 0;
            right: 0;
            margin: auto;
            width: .48rem;
            height: .88rem;
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
