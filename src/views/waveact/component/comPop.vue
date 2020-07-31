<template>
  <section :class="getClassName('com_pop')" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div :class="getClassName('wrap')">
          <div class="title_bg">
            <span v-if="[0,1,4,5,6].includes(popType)">{{titles[this.popType]}}</span>
            <span v-else-if="popType==2">{{titles[this.popType][this.prizeInfoType-1]}}</span>
            <span v-else-if="popType==3">{{titles[this.popType][this.wavePrizeInfoType]}}</span>
          </div>
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==0">
                <template v-if="ruleTime">
                  <p>活动时间:</p>
                  <p>{{ruleTime}}</p>
                </template>
                <p>活动期间内:</p>
                <p>1. 玩家在游戏中消耗一定的叶子,可领取游戏币,游戏币可以用于摇奖(参与活动的游戏包括：糖果萌消消、欢乐竞技台球、街机欢乐捕鱼、三国大作战、众神风云、福满多、斗西游、深海探一探、欢乐的小鸟、炸弹人)</p>
                <p>2. 每次摇奖都会随机摇出5个图案,玩家根据摇出的相同图案的数量会获得不同的奖励,出现的相同图案越多,奖励越丰厚</p>
                <p>3. 单次消耗游戏币额度越大,越容易中大奖哟</p>
                <p>4. 玩家累计获得的游戏币进行排行</p>
                <p>活动结束后:</p>
                <p>1. 未使用和未领取的游戏币作废,请及时领取使用</p>
                <p>2. 系统会按照最终排行进行奖励发放</p>
                <p>3. 排行榜还会展示一天时间</p>
              </template>
              <template v-if="popType==1">
                <div class="toatl_awards">
                  <div class="item" v-for="item in toalItems">
                    <div class="img_bg">
                      <img :src="`${require(`../images/${item.awardsType}.png`)}`" alt="" class="game">
                    </div>
                    <span>{{item.name}}<br><i>{{item.value}}</i></span>
                  </div>
                </div>
                <h4>摇奖记录</h4>
                <div class="bonus-record" :class="{empty:!record.length}">
                  <div class="title_items">
                    <div class="title">摇奖时间</div>
                    <div class="title">摇奖奖励</div>
                  </div>
                  <div class="content" :class="{empty:!record.length}">
                    <scroll :data="record" v-if="record.length">
                      <ul>
                        <li v-for="item in record">
                          <div>{{item.createTime}}</div>
                          <div>
                            {{item.awardsName}}
                          </div>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
              </template>
              <template v-if="popType==2">
                <p>随机获得下列奖励</p>
                <div class="prize_info"
                     :class="{lte2:prizeInfoList.length<=2,triple:(prizeInfoList.length%3==0&&prizeInfoList.length<=6)||prizeInfoList.length==7}">
                  <div class="prize_info_item" v-for="(item,index) in prizeInfoList" :class="{empty:!item.awardsName}">
                    <div class="prize_info_img">
                      <img :src="`${require(`../images/compop/${item.awardsType}.png`)}`" alt="" v-if="item.awardsType">
                    </div>
                    <div class="prize_info_name">
                      <div class="prize_info_name_item" v-if="item.awardsType">{{getAwardName(item.awardsType)}}</div>
                      <div class="prize_info_name_item" v-if="item.awardsName">
                        {{item.awardsName}}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="popType==3">
                <template v-if="wavePrizeInfoType==0">
                  <p>当前游戏币不足</p>
                  <p>快去玩游戏获取摇游戏币吧</p>
                  <div class="btn btn_yellow" @click="goGame">去玩游戏</div>
                </template>
                <template v-else-if="wavePrizeInfoType==1">
                  <p>您的游戏币充足</p>
                  <p>是否需要切换成{{maxCanSelectLimit.consumeNum}}额度</p>
                  <p><i>获得大奖概率更高哟</i></p>
                  <div class="btns">
                    <div class="btn btn_purple" @click="changeGear">切换额度</div>
                    <div class="btn btn_yellow" @click="gotowave(0)">直接摇奖</div>
                  </div>
                </template>
                <template v-else-if="wavePrizeInfoType==2">
                  <p>恭喜您获得<i>{{awardData.levelName}}</i></p>
                  <div class="prize_info">
                    <div class="prize_info_item">
                      <div class="prize_info_img">
                        <img :src="`${require(`../images/compop/${awardData.awardType}.png`)}`" alt="">
                      </div>
                      <div class="prize_info_name">
                        <div class="prize_info_name_item">{{getAwardName(awardData.awardType)}}</div>
                        <div class="prize_info_name_item">
                          {{awardData.awardName}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btn btn_yellow" @click="gotowave(1)">再摇一次</div>
                </template>
                <template v-else-if="wavePrizeInfoType==3">
                  <p>恭喜您获得{{jinbinum| filterPrice}}个游戏币</p>
                  <div class="btn btn_yellow" @click="closeDown">快去摇奖</div>
                </template>
              </template>
              <template v-else-if="popType==4">
                <div class="gamelist">
                  <img :src="require(`../images/compop/games/${index}.png`)" alt=""
                       v-for="(item,index) in games" class="game" @click="gotogame(item)">
                </div>
                <div class="gogames" @click="gotoindex">去玩更多游戏>></div>
              </template>
              <template v-else-if="popType==5">
                <p>本次活动设定多种难度，</p>
                <p>已为您精心匹配当前活动难度~</p>
                <p>快去试试吧!</p>
                <div class="btn btn_yellow_flag5" @click="checkgl">查看攻略>></div>
              </template>
              <template v-else-if="popType==6">
                <scroll>
                  <div>
                    <p>1.玩游戏支持金叶或购买礼包获得游戏币</p>
                    <img src="../images/compop/gonglue/0.png" alt="" style="width:4.19rem;height: .53rem">
                    <p>2.游戏币可摇奖，每次摇奖出现5个花色。花色相同数越多，奖励越高</p>
                    <img src="../images/compop/gonglue/1.png" alt="" style="width:4.11rem;height: 3.48rem">
                    <p>3.活动7天，累计获得游戏币最多前10名玩家获排行大奖</p>
                    <img src="../images/compop/gonglue/2.png" alt="" style="width:4.19rem;height: 2.2rem">
                    <p>4.本次活动分为多种难度，已为玩家匹配当前难度</p>
                  </div>
                </scroll>
              </template>
            </div>
            <div class="footer"></div>
          </div>
          <div class="close" @click="close">
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import Services from '../services/services'

  export default {
    name: "compop",
    data() {
      return {
        isShowPop: false,
        record: [],
        toalItems: [],
        prizeInfoList: [],
        titles: ['活动规则', '我的奖励', ['参与奖', '三等奖', '二等奖', '一等奖', '特等奖'], ['非常抱歉', '温馨提示', '恭喜获得', '恭喜获得'], '大家都在玩', '欢迎到来', '活动攻略'],
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
        if (this.popType != 1 && this.popType != 2) {
          this.isShowPop = true
        } else {
          if (this.popType == 1) {
            let {code, data} = (await Services.gameReceiveRecord()).data
            if (code == 200) {
              this.toalItems = [{
                awardsType: 'hfq',
                name: '话费券',
                value: data.hfqAmount
              }, {
                awardsType: 'jdk',
                name: '京东卡',
                value: data.jdkAmount
              }, {
                awardsType: 'jyz',
                name: '金叶',
                value: data.jyzAmount
              }]
              this.record = data.awardsList
              this.isShowPop = true
            }
          } else {
            let {code, data} = (await Services.getAwardsInfo(this.prizeInfoType)).data
            if (code == 200) {
              if (data.length == 7) {
                data.splice(0, 0, {
                  awardsType: '',
                  awardsName: ''
                })
                data.splice(4, 0, {
                  awardsType: '',
                  awardsName: ''
                })
                this.prizeInfoList = data
              }else if(data.length == 5){
                data.splice(0, 0, {
                  awardsType: '',
                  awardsName: ''
                })
                data.splice(3, 0, {
                  awardsType: '',
                  awardsName: ''
                })
                this.prizeInfoList = data
              } else {
                this.prizeInfoList = data
              }
              this.isShowPop = true
            }
          }
        }
      },
      close() {
        this.$emit('close')
        this.isShowPop = false;
      },
      goGame() {
        GLOBALS.marchSetsPoint('A_H5PT0229002662')//H5平台-双旦活动页-摇一摇点击后游戏币不足弹窗-去玩游戏点击
        this.isShowPop = false
        this.$emit('showPop', 4)
      },
      gotogame({url, id}) {
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
      gotowave(flag) {
        //A_H5PT0229002664 H5平台-双旦活动页-摇一摇点击后中奖弹窗-再摇一次点击
        //A_H5PT0229002667 H5平台-双旦活动页-摇一摇点击后游戏币充足提示弹窗-直接摇奖点击
        let points = ['A_H5PT0229002667', 'A_H5PT0229002664']
        GLOBALS.marchSetsPoint(points[flag])
        this.isShowPop = false;
        this.$emit('gotowavedirect')
      },
      changeGear() {
        GLOBALS.marchSetsPoint('A_H5PT0229002666')//H5平台-双旦活动页-摇一摇点击后游戏币充足提示弹窗-切换额度点击
        this.isShowPop = false;
        this.$emit('close')
      },
      checkgl() {
        this.isShowPop = false
        this.$emit('showPop', 6)
      },
      closeDown(){
        this.isShowPop = false
        this.$emit('closeDown')
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
    top: 1rem;
    left: 50%;
    margin-left: -2.95rem;
    &.flag0,&.flag6 {
      top: 0.2rem;
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
          width: 5.9rem;
          height: 3.14rem;
          background: url("../images/compop/top.png") no-repeat center
            center / 100% 100%;
          position: relative;
          span {
            position: absolute;
            top: 2.25rem;
            left: 0;
            right: 0;
            margin: auto;
            text-align: center;
            font-size: .48rem;
            font-weight: bold;
            color: rgba(255, 252, 219, 1);
          }
        }
        .main {
          width: 5.9rem;
          font-size: 0.2rem;
          background: #FFE6B8;
          border-radius: 0px 0px .16rem .16rem;
          padding: 0 0 .59rem;
          color: rgba(155, 78, 4, 1);
          position: relative;
          top: -.1rem;
          &.flag6 {
            height: 5.5rem;
          }
          .container_compop {
            &.flag0 {
              padding: 0 .3rem;
              box-sizing: border-box;
              font-size: .24rem;
              font-weight: 500;
              line-height: .36rem;
            }
            &.flag1 {
              .toatl_awards {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin-bottom: .3rem;
                .item {
                  width: 1.22rem;
                  height: 1.8rem;
                  .img_bg {
                    height: 1.15rem;
                    background: rgba(254, 253, 251, 1);
                    border-radius: .2rem .2rem 0 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                      width: 80%;
                      height: 80%;
                    }
                  }
                  span {
                    font-size: .22rem;
                    font-weight: 800;
                    display: inline-block;
                    text-align: center;
                    width: 100%;
                    height: .65rem;
                    background: rgba(255, 127, 50, 1);
                    border-radius: 0 0 .2rem .2rem;
                    padding-top: .1rem;
                    box-sizing: border-box;
                    color: #fff;
                    i {
                      color: #FFF500;
                    }
                  }
                }
              }
              h4 {
                padding-left: .39rem;
                font-size: .3rem;
                font-weight: 800;
                color: #9B4E04;
                margin-bottom: .14rem;
                position: relative;
                padding-left: .6rem;
                &:before {
                  content: '';
                  position: absolute;
                  left: .39rem;
                  width: .1rem;
                  height: .36rem;
                  background: #9B4E04;
                  border-radius: .05rem;
                }
              }
              .bonus-record {
                width: 5.42rem;
                height: 2.16rem;
                position: relative;
                margin: auto;
                font-size: .22rem;
                font-weight: bold;
                .title_items {
                  display: flex;
                  height: .36rem;
                  background: rgba(255, 127, 50, 1);
                  border-radius: .1rem .1rem 0 0;
                  .title {
                    flex: 1;
                    text-align: center;
                    height: .36rem;
                    line-height: .36rem;
                    color: #fff;
                  }
                }
                .content {
                  position: absolute;
                  height: 1.8rem;
                  top: .34rem;
                  left: 0rem;
                  right: 0;
                  font-weight: 500;
                  color: #666666;
                  overflow: hidden;
                  background: #fff;
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
                      &:nth-child(2n) {
                        background: rgba(255, 230, 179, 1);
                      }
                    }
                  }
                }
              }
            }
            &.flag2 {
              p {
                font-size: .36rem;
                font-weight: 800;
                text-align: center;
                margin-bottom: .32rem;
              }
              .prize_info {
                display: flex;
                flex-wrap: wrap;
                padding: 0 .22rem 0 .26rem;
                box-sizing: border-box;
                justify-content: space-between;
                .prize_info_item {
                  width: 1.22rem;
                  margin-bottom: .1rem;
                  &.empty {
                    opacity: 0;
                    width: .48rem;
                  }
                  .prize_info_img {
                    height: 1.15rem;
                    background: rgba(254, 253, 251, 1);
                    border-radius: .2rem .2rem 0 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                      width: 80%;
                      margin: auto;
                    }
                  }
                  .prize_info_name {
                    height: .65rem;
                    background: rgba(255, 127, 50, 1);
                    border-radius: 0 0 .2rem .2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: .1rem 0;
                    box-sizing: border-box;
                    .prize_info_name_item {
                      font-size: .22rem;
                      font-weight: 800;
                      text-align: center;
                      color: #fff;
                      &:nth-child(2) {
                        color: #FFF500;
                      }
                    }
                  }
                }
                &.lte2 {
                  justify-content: center;
                  .prize_info_item:nth-child(1) {
                    margin-right: .58rem;
                  }
                }
                &.triple {
                  width: 4.5rem;
                  margin: auto;
                }
              }
            }
            &.flag3, &.flag5 {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              p {
                font-size: .3rem;
                line-height: .5rem;
                font-weight: bold;
                i {
                  font-size: .36rem;
                  color: #FF6000;
                }
              }
              .btn {
                margin-top: .46rem;
                width: 1.94rem;
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                font-size: .36rem;
                font-weight: bold;
                &.btn_yellow {
                  color: rgba(237, 36, 55, 1);
                  background: url("../images/compop/button.png") no-repeat center
                    center / 100% 100%;
                }
                &.btn_yellow_flag5 {
                  width: 2.74rem;
                  color: rgba(237, 36, 55, 1);
                  background: url("../images/sorry2-button.png") no-repeat center
                    center / 100% 100%;
                }
                &.btn_purple {
                  color: rgba(255, 255, 255, 1);
                  margin-right: .46rem;
                  background: url("../images/compop/purplebutton.png") no-repeat center
                    center / 100% 100%;
                }
              }
              .btns {
                display: flex;
              }
              .prize_info {
                margin-top: .23rem;
                display: flex;
                flex-wrap: wrap;
                padding: 0 .22rem 0 .26rem;
                box-sizing: border-box;
                justify-content: space-between;
                .prize_info_item {
                  width: 1.22rem;
                  margin-bottom: .1rem;
                  &.empty {
                    opacity: 0;
                    width: .48rem;
                  }
                  .prize_info_img {
                    height: 1.15rem;
                    background: rgba(254, 253, 251, 1);
                    border-radius: .2rem .2rem 0 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                      width: 80%;
                      margin: auto;
                    }
                  }
                  .prize_info_name {
                    height: .65rem;
                    background: rgba(255, 127, 50, 1);
                    border-radius: 0 0 .2rem .2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: .1rem 0;
                    box-sizing: border-box;
                    .prize_info_name_item {
                      font-size: .22rem;
                      font-weight: 800;
                      text-align: center;
                      &:nth-child(2) {
                        color: #FFF500;
                      }
                    }
                  }
                }
                &.lte2 {
                  justify-content: center;
                  .prize_info_item:nth-child(1) {
                    margin-right: .58rem;
                  }
                }
                &.triple {
                  width: 4.5rem;
                  margin: auto;
                }
              }
            }
            &.flag4 {
              height: 4.6rem;
              .gamelist {
                display: flex;
                flex-wrap: wrap;
                height: 4.2rem;
                justify-content: space-between;
                padding: 0 0.5rem;
                position: absolute;
                .game {
                  width: 1.24rem;
                  height: 1.69rem;
                }
              }
              .gogames {
                font-size: 0.36rem;
                font-weight: bold;
                color: rgba(237, 43, 56, 1);
                text-align: center;
                position: absolute;
                bottom: .2rem;
                left: 0;
                right: 0;
                z-index: 1;
              }
            }
            &.flag6 {
              box-sizing: border-box;
              position: absolute;
              left: .23rem;
              right: .23rem;
              top: 0;
              bottom: .4rem;
              margin: auto;
              z-index: 1;
              p {
                font-size: .22rem;
                font-weight: bold;
                color: rgba(155, 78, 4, 1);
              }
              img {
                margin: .2rem 0;
              }
            }
          }
          .footer {
            width: 5.9rem;
            height: .59rem;
            background: url("../images/compop/bottom.png") no-repeat center
              center / 100% 100%;
            position: absolute;
            bottom: 0;
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
            color: #FDF35E;
            text-align: right;
            font-weight: bold;
            text-align: center;
            padding-bottom: .1rem;
          }
        }
        .close {
          width: .6rem;
          height: .6rem;
          background: url("../images/compop/close.png") no-repeat center
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
