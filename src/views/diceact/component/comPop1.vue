<template>
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}" :class="{flag0:popType==0}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div :class="getClassName('wrap')">
          <div class="title_bg">
            <div class="img" v-if="[0,1].includes(popType)">
              {{popType==0?'活动规则':'我的奖励'}}
            </div>
            <div class="img" v-else-if="popType==2">
              {{prizeInfo[prizeInfoType-1]}}
            </div>
            <div class="img" v-else-if="popType==3">
              {{resultInfo[wavePrizeInfoType]}}
            </div>
            <div class="img" v-else-if="popType==4">
              活动攻略
            </div>
            <div class="img" v-else-if="popType==5">
              大家都在玩
            </div>
            <div class="img" v-else-if="popType==6">
              排行榜已发榜
            </div>
          </div>
          <div class="main">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==0">
                <template v-if="ruleTime">
                  <p>活动时间:</p>
                  <p>{{ruleTime}}</p>
                </template>
                <p>活动期间内:</p>
                <p>1. 玩家在指定游戏中消耗一定的叶子，可领取幸运币，幸运币可以用于掷骰子</p>
                <p>2. 每次投掷骰子，都会投出3个骰子，玩家根据投出的骰子的点数及形式获得对应的奖励</p>
                <p>3. 单次消耗幸运币额度越大，越容易中大奖哟</p>
                <p>4. 活动期间内，玩家累计获得的幸运币券数量会计入排行榜，活动结束后根据7日累计获得的幸运币数量进行排名并发放排行奖励</p>
                <p>4. 活动结束后，排行榜会展示1天时间，排行榜奖励将直接到账</p>
                <p>活动结束后:</p>
                <p>1. 未使用和未领取的幸运币作废,请及时领取使用</p>
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
                     :class="{lte2:prizeInfoList.length<=2,triple:prizeInfoList.length%3==0&&prizeInfoList.length<=6}">
                  <div class="prize_info_item" v-for="(item,index) in prizeInfoList" :class="{empty:!item.awardsName}">
                    <div class="prize_info_img">
                      <img :src="`${require(`../images/comPop/${item.awardsType}.png`)}`" alt="" v-if="item.awardsType">
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
                  <img src="../images/comPop/sad.png" alt="" style="1.49rem;height: 1.59rem;margin-bottom: .13rem">
                  <p style="font-size: .3rem;font-weight:bold;color: #A95C17">当前幸运币不足</p>
                  <p style="font-size: .3rem;font-weight:bold;color: #A95C17">快去玩游戏获取摇游戏币吧</p>
                  <div class="btn btn_yellow" @click="gotoopengame">去玩游戏</div>
                </template>
                <template v-else-if="wavePrizeInfoType==1">
                  <p>您的幸运币充足</p>
                  <p>是否需要切换成{{maxCanSelectLimit.consumeNum}}额度</p>
                  <p><i>获得大奖概率更高哟</i></p>
                  <div class="btns">
                    <div class="btn btn_yellow" @click="changeGear">切换额度</div>
                    <div class="btn btn_purple" @click="gotowave(0)">直接投奖</div>
                  </div>
                </template>
                <template v-else-if="wavePrizeInfoType==2">
                  <p>获得<i>{{awardData.levelName}}</i></p>
                  <div class="prize_info">
                    <div class="prize_info_item">
                      <div class="prize_info_img">
                        <img :src="`${require(`../images/comPop/${awardData.awardType}.png`)}`" alt="">
                      </div>
                      <div class="prize_info_name">
                        <div class="prize_info_name_item">{{getAwardName(awardData.awardType)}}</div>
                        <div class="prize_info_name_item">
                          {{awardData.awardName}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btn btn_yellow" @click="gotowave(1)">去投骰子</div>
                </template>
                <template v-else-if="wavePrizeInfoType==3">
                  <img src="../images/comPop/gameicon.png" alt="" style="width: 1.55rem;height: 1.55rem;margin-bottom: .26rem">
                  <p style="font-size:.36rem;font-weight:bold;color:rgba(169,92,23,1);">{{jinbinum| filterPrice}}个游戏币</p>
                  <div class="btn btn_yellow" @click="close">去投骰子</div>
                </template>
              </template>
              <!--攻略-->
              <template v-else-if="popType==4">
                <scroll>
                  <div>
                    <div class="gonglueitem">
                      <div class="left">步骤一</div>
                      <div class="right">
                        <h4>获得幸运币:</h4>
                        <h2>活动期间在指定游戏中消耗金叶子，购买充值礼包，完成每日任务可以获得幸运币</h2>
                      </div>
                    </div>
                    <div class="gonglueitem">
                      <div class="left">步骤二</div>
                      <div class="right">
                        <h4>奖励获取:</h4>
                        <h2>玩家可以使用活动获得的幸运币掷骰子,根据投出的骰子的点数及形式获得对应的奖励每人可以瓜得的奖励（详见规则）</h2>
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
              <!--大家玩游戏-->
              <template v-else-if="popType==5">
                <div class="gamelist">
                  <img :src="require(`../imgs/games/${index}.png`)" alt="" v-for="(item,index) in games" class="game"
                       @click="gotogame(item)">
                </div>
                <div class="gogames" @click="gotoindex">更多游戏>></div>
              </template>
              <template v-else-if="popType==6">
                <template v-if="awardList.length">
                  <h4>恭喜您排名{{myRank}}名获得</h4>
                  <div class="product-img">
                    <div class="item" v-for="(item) in awardList">
                      <div class="img_bg">
                        <img :src="`${require(`../images/comPop/${item.awardsType}.png`)}`" alt="">
                      </div>
                      <span>{{item.awardsName}}</span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <img src="../images/comPop/sad.png" alt="" class="sad">
                  <div class="sad_tips">您未上榜，下次继续加油哦</div>
                </template>
                <div class="btn btn_yellow" @click="close">我知道了</div>
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
    name: 'comPop',
    data () {
      return {
        isShowPop: false,
        record: [],
        toalItems: [],
        prizeInfoList: [],
        prizeInfo: ['参与奖', '三等奖', '二等奖', '一等奖', '特等奖'],
        resultInfo: ['非常抱歉', '温馨提示', '恭喜获得', '恭喜获得'],
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
      }
    },
    props: {
      ruleTime: {
        type: String,
        default: ''
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
        }
      },
      async showPop () {
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
              }, {
                awardsType: 'yg',
                name: '鱼干',
                value: data.ygAmount
              }]
              this.record = data.awardsList
              this.isShowPop = true
            }
          } else {
            let {code, data} = (await Services.getAwardsInfo(this.prizeInfoType - 1)).data
            if (code == 200) {
              if (data.length == 9) {
                data.splice(0, 0, {
                  awardsType: '',
                  awardsName: ''
                })
                data.splice(1, 0, {
                  awardsType: '',
                  awardsName: ''
                })
                data.splice(3, 0, {
                  awardsType: '',
                  awardsName: ''
                })
                data.splice(4, 0, {
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
      close () {
        // if (this.popType == 3 && this.wavePrizeInfoType == 1) {
        //   this.$emit('gotowavedirect')
        // }
        this.$emit('close')
        this.isShowPop = false
      },
      gotoopengame () {
        GLOBALS.marchSetsPoint('A_H5PT0229002662')// H5平台-双旦活动页-摇一摇点击后游戏币不足弹窗-去玩游戏点击
        this.$emit('opengame')
      },
      gotowave (flag) {
        // A_H5PT0229002664 H5平台-双旦活动页-摇一摇点击后中奖弹窗-再摇一次点击
        // A_H5PT0229002667 H5平台-双旦活动页-摇一摇点击后游戏币充足提示弹窗-直接摇奖点击
        let points = ['A_H5PT0229002667', 'A_H5PT0229002664']
        GLOBALS.marchSetsPoint(points[flag])
        this.isShowPop = false
        this.$emit('gotowavedirect')
      },
      changeGear () {
        GLOBALS.marchSetsPoint('A_H5PT0229002666')// H5平台-双旦活动页-摇一摇点击后游戏币充足提示弹窗-切换额度点击
        this.isShowPop = false
        this.$emit('close')
      },
      gotogame ({url, id}) {
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex () {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
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
    top: 0rem;
    left: 50%;
    margin-left: -2.94rem;
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
          width: 5.88rem;
          height: 3.07rem;
          background: url("../images/comPop/top.png") no-repeat center
            center / 100% 100%;
          position: relative;
          padding-top: .3rem;
          .img {
            position: absolute;
            top: 2.6rem;
            left: 1.15rem;
            right: 1.3rem;
            margin: auto;
            font-size: .48rem;
            font-weight: bold;
            color: rgba(169, 92, 23, 1);
            text-align: center;
          }
        }
        .main {
          width: 5.88rem;
          font-size: 0.2rem;
          background: url("../images/comPop/bgline.png");
          background-size: 5.88rem .758rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: .3rem 0;
          .container_compop {
            &.flag0 {
              padding: 0 .3rem;
              color:#A95C17;
              box-sizing: border-box;
              font-size: .24rem;
              font-weight: 500;
              p{
                line-height: .36rem;
                &:nth-child(1),&:nth-child(2){
                  font-weight: bold;
                }
              }
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
                    padding-top: .15rem;
                    box-sizing: border-box;
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
                color: #A95C17;
                margin-bottom: .14rem;
                position: relative;
                padding-left: .6rem;
                height: .36rem;
                line-height: .36rem;
                &:before {
                  content: '';
                  position: absolute;
                  left: .39rem;
                  width: .1rem;
                  height: .36rem;
                  background: #A95C17;
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
                    &:nth-child(1){
                      border-right:2px solid rgba(255,255,255,1);
                    }
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
                font-size: .3rem;
                text-align: center;
                margin-bottom: .32rem;
                font-weight:bold;
                color:rgba(169,92,23,1);
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
                    width: .96rem;
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
            &.flag3 {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              p {
                font-size: .3rem;
                line-height: .5rem;
                i {
                  font-weight: bold;
                  font-size: .36rem;
                  color: #FCFF00;
                }
              }
              .btn {
                margin-top: .46rem;
                width: 2.96rem;
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                font-size: .36rem;
                font-weight: bold;
                border-radius:.4rem;
                &.btn_yellow {
                  color:rgba(255,255,255,1);
                  background:linear-gradient(0deg,rgba(254,160,117,1),rgba(234,62,98,1));
                }
                &.btn_purple {
                  margin-right: .46rem;
                  color:rgba(235,65,99,1);
                  background:rgba(254,183,60,1);
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
              height: 6rem;
              position: relative;
              .gonglueitem {
                width: 4.47rem;
                background: rgba(237, 38, 75, 1);
                border: 2px solid rgba(255, 219, 157, 1);
                border-radius: .2rem;
                display: flex;
                color: #F6C599;
                margin: auto;
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
            &.flag5{
              .gamelist {
                display: flex;
                flex-wrap: wrap;
                height: 4.2rem;
                justify-content: space-between;
                margin-top: .4rem;
                padding: 0 .6rem;
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
          .footer {
            width: 5.88rem;
            height: .49rem;
            background: url("../images/comPop/bottom.png") no-repeat center
              center / 100% 100%;
            position: absolute;
            bottom: -.47rem;
            left: 0;
            margin: auto;
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
            font-size: .36rem;
            color: #C8925B;
            text-align: right;
            font-weight: bold;
            text-align: center;
            padding-bottom: .1rem;
          }
        }
        .close {
          width: .6rem;
          height: .6rem;
          background: url("../images/comPop/close.png") no-repeat center
            center / 100% 100%;
          position: absolute;
          bottom: -1.3rem;
          right: 0;
          left: 0;
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
