<template>
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div class="title_bg">
            <div class="img" v-if="[7,1].includes(popType)">
              {{popType==7?'活动规则':'我的奖励'}}
            </div>
            <div class="img" v-else-if="popType==2">
              {{prizeInfo[prizeInfoType-1]}}
            </div>
            <div class="img" v-else-if="popType==3">
              {{resultInfo[wavePrizeInfoType]}}
            </div>
            <div class="img" v-else-if="popType==4">
              活动攻略与奖励
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
              <template v-if="popType==7">
                <template v-if="ruleTime">
                  <p>活动时间:</p>
                  <p>{{ruleTime}}</p>
                </template>
                <p>活动期间内:</p>
                <p>1. 玩家在指定游戏中消耗一定的叶子，可领取对应的道具</p>
                <p>2. 每次使用道具都会消灭不等量的病毒，并获得对应奖励</p>
                <p>3. 活动期间内，玩家累计消灭的病毒数量会计入排行榜</p>
                <p>4. 活动结束后根据7日累计消灭数量进行排名并发放排行奖励</p>
                <p>5. 活动结束后，排行榜会展示1天时间，排行榜奖励将直接到账</p>
                <p>活动结束后:</p>
                <p>1. 未领取的活动道具作废，请及时领取</p>
                <p>2. 未使用的活动道具作废，请及时使用</p>
                <p>3. 系统会按照最终排行进行奖励发放</p>
                <p>4. 排行榜还会展示一天时间</p>
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
                <h4>消灭记录</h4>
                <div class="bonus-record" :class="{empty:!record.length}">
                  <div class="title_items">
                    <div class="title">消灭时间</div>
                    <div class="title">获得奖励</div>
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
                  <img src="../images/comPop/sad.png" alt="" style="width:1.49rem;height: 1.59rem;margin-bottom: .13rem">
                  <p style="font-size: .3rem;font-weight:bold;color: #014D9D">当前药剂不足</p>
                  <p style="font-size: .3rem;font-weight:bold;color: #014D9D">快去玩游戏获取药剂吧</p>
                  <div class="btn btn_yellow" @click="gotoopengame">去玩游戏</div>
                </template>
                <template v-else-if="wavePrizeInfoType==2">
                  <p>使用<i>{{medicineInfo[awardData.propType-1]}}</i>消灭<i>{{awardData.thisKillNum}}个</i>病毒</p>
                  <p>恭喜获得</p>
                  <div class="prize_info">
                    <div class="prize_info_item">
                      <div class="prize_info_img">
                        <img :src="`${require(`../images/comPop/${awardData.awardType}.png`)}`" alt="">
                      </div>
                      <div class="prize_info_name">
                        <div class="prize_info_name_item">{{getAwardName(awardData.awardType)}}</div>
                        <div class="prize_info_name_item">
                          {{awardData.awardName.replace(getAwardName(awardData.awardType),'')}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btn btn_yellow" @click="gotowave(1)">继续消灭</div>
                  <div class="total">目前您已累计消灭了<i>{{awardData.totalKillNum}}个                                                                                                                                                                                                                                                                                                                                                                                 </i>病毒</div>
                </template>
                <template v-else-if="wavePrizeInfoType==3">
                  <div class="img_bg">
                    <img :src="require(`../images/comPop/icon${jinbinum.propType}.png`)" alt=""
                         style="width:90%;">
                  </div>
                  <p style="font-size:.36rem;font-weight:bold;color:#014D9D;">{{jinbinum.incrNum|
                    filterPrice}}个{{medicineInfo[jinbinum.propType-1]}}</p>
                  <div class="btn btn_yellow" @click="gotokill">去消灭病毒</div>
                </template>
              </template>
              <!--攻略-->
              <template v-else-if="popType==4">
                <div class="glue" style="position: relative">
                  <div class="tabs">
                    <div class="tabs-item" v-for="(item,index) in tabs" @click="tabIndex=index"
                         :class="{selected:index==tabIndex}">{{item}}
                    </div>
                  </div>
                  <div class="content">
                    <scroll ref="scroll4">
                      <div :class="{prize:tabIndex==1}">
                        <template v-if="tabIndex==0">
                          <div class="gonglueitem">
                            <div class="left">步骤一</div>
                            <div class="right">
                              <h4>获得各类药剂:</h4>
                              <h2>活动期间在指定游戏中消耗金叶子，购买充值礼包，完成每日任务可以获得对应道具</h2>
                            </div>
                          </div>
                          <div class="gonglueitem">
                            <div class="left">步骤二</div>
                            <div class="right">
                              <h4>奖励获取:</h4>
                              <h2>玩家可以使用不同的药剂来消灭病毒，并获得对应的奖励 <em @click="tabIndex=1">查看奖励</em></h2>
                            </div>
                          </div>
                          <div class="gonglueitem">
                            <div class="left">步骤三</div>
                            <div class="right">
                              <h4>上榜赢大奖:</h4>
                              <h2>活动期间玩家累计消灭的病毒数会计入排行榜，最高可得价值35000元大奖</h2>
                            </div>
                          </div>
                        </template>
                        <template v-else>
                          <div class="item" v-for="itemp in prizeInfoList">
                            <p>使用一次{{medicineInfo[itemp.propType-1]}}随机获得下列奖励之一</p>
                            <div class="prize_info">
                              <div class="prize_info_item" v-for="(item,index) in itemp.awardsList"
                                   :class="{empty:!item.awardsName}">
                                <div class="prize_info_img">
                                  <img :src="`${require(`../images/comPop/${item.awardsType}.png`)}`" alt=""
                                       v-if="item.awardsType">
                                </div>
                                <div class="prize_info_name">
                                  <div class="prize_info_name_item" v-if="item.awardsType">
                                    {{getAwardName(item.awardsType)}}
                                  </div>
                                  <div class="prize_info_name_item" v-if="item.awardsName">
                                    {{item.awardsName.replace(getAwardName(item.awardsType),'')}}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </scroll>
                  </div>
                </div>
              </template>
              <!--大家玩游戏-->
              <template v-else-if="popType==5">
                <div class="gamelist">
                  <img :src="require(`../imgs/games/${index}.png`)" alt="" v-for="(item,index) in games" class="game"
                       @click="gotogame(item)">
                </div>
                <div class="gogames" @click="gotoindex">去玩更多游戏>></div>
              </template>
              <!--发榜-->
              <template v-else-if="popType==6">
                <template v-if="awardList.length">
                  <h4>恭喜你排名为第<i>{{myRank}}</i>名</h4>
                  <h4><i>获得</i></h4>
                  <div class="prize_info lte2">
                    <div class="prize_info_item" v-for="(item,index) in awardList">
                      <div class="prize_info_img">
                        <img :src="`${require(`../images/comPop/${item.awardsType}.png`)}`" alt=""
                             v-if="item.awardsType">
                      </div>
                      <div class="prize_info_name">
                        <div class="prize_info_name_item" v-if="item.awardsType">{{getAwardName(item.awardsType)}}</div>
                        <div class="prize_info_name_item" v-if="item.awardsName">
                          {{item.awardsName.replace(getAwardName(item.awardsType),'')}}
                        </div>
                      </div>
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
    data() {
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
        }],
        tabs: ['活动攻略', '活动奖励'],
        tabIndex: 0,
        medicineInfo: ['药丸', '酒精', '疫苗']
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
        type: Object,
        default: null
      },
      awardList: {
        type: Array,
        default: []
      },
      myRank: {
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
        if (this.popType != 1 && this.popType != 4) {
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
                name: '京东券',
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
            let {code, data} = (await Services.getAwardsInfo()).data
            if (code == 200) {
              this.prizeInfoList = data
              this.isShowPop = true
            }
          }
        }
      },
      close() {
        this.$emit('close')
        this.tabIndex=0
        this.isShowPop = false
      },
      gotoopengame() {
        //GLOBALS.marchSetsPoint('A_H5PT0229002662')// H5平台-双旦活动页-摇一摇点击后幸运币不足弹窗-去玩游戏点击
        this.$emit('opengame')
      },
      gotowave(flag) {
        // A_H5PT0229002664 H5平台-双旦活动页-摇一摇点击后中奖弹窗-再摇一次点击
        // A_H5PT0229002667 H5平台-双旦活动页-摇一摇点击后幸运币充足提示弹窗-直接投奖点击
        // let points = ['A_H5PT0229002667', 'A_H5PT0229002664']
        // GLOBALS.marchSetsPoint(points[flag])
        this.isShowPop = false
        this.$emit('gotowavedirect')
      },
      changeGear() {
        //GLOBALS.marchSetsPoint('A_H5PT0229002666')// H5平台-双旦活动页-摇一摇点击后幸运币充足提示弹窗-切换额度点击
        this.isShowPop = false
        this.$emit('close')
      },
      gotogame({url, id}) {
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
      move(e) {
        e.preventDefault()
      },
      gotokill(){
        this.isShowPop = false
        this.$emit('gotokill')
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
      },
      tabIndex(val) {
        this.$refs.scroll4&&this.$refs.scroll4.scrollTo(0,0)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    top: .5rem;
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
          width: 5.98rem;
          height: 1.72rem;
          background: url("../images/comPop/top.png") no-repeat center
            center / 100% 100%;
          position: relative;
          padding-top: .3rem;
          .img {
            position: absolute;
            top: .4rem;
            left: 1.15rem;
            right: 1.3rem;
            margin: auto;
            font-size: .48rem;
            font-weight: bold;
            color: #FFCC52;
            text-align: center;
          }
        }
        .main {
          width: 5.98rem;
          font-size: 0.2rem;
          background: url("../images/comPop/bgline.png");
          background-size: 5.98rem .33rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: .3rem 0;
          .container_compop {
            &.flag7 {
              padding: 0 .3rem;
              color: #0359B2;
              box-sizing: border-box;
              font-size: .24rem;
              font-weight: 500;
              p {
                line-height: .36rem;
                &:nth-child(1), &:nth-child(2) {
                  font-weight: bold;
                }
              }
            }
            &.flag1 {
              .toatl_awards {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin: 0 auto .3rem;
                width: 5.42rem;
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
                    &:nth-child(1) {
                      border-right: 2px solid rgba(255, 255, 255, 1);
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
                      align-items: center;
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
                font-weight: bold;
                color: rgba(169, 92, 23, 1);
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
              .img_bg{
                width:2.2rem;
                height:2.2rem;
                background:rgba(147,197,238,1);
                border-radius:.4rem;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              p {
                font-size: .3rem;
                line-height: .5rem;
                color: #014D9D;
                font-weight: bold;
                i {
                  font-weight: bold;
                  font-size: .36rem;
                  color: #FF7F32;
                }
              }
              .btn {
                margin-top: .25rem;
                width: 2.96rem;
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                font-size: .36rem;
                font-weight: bold;
                border-radius: .4rem;
                &.btn_yellow {
                  color: rgba(255, 255, 255, 1);
                  background: linear-gradient(0deg, rgba(254, 160, 117, 1), rgba(234, 62, 98, 1));
                }
                &.btn_purple {
                  margin-right: .25rem;
                  color: rgba(235, 65, 99, 1);
                  background: rgba(254, 183, 60, 1);
                }
              }
              .btns {
                display: flex;
                flex-direction: column;
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
              .total{
                margin-top: .26rem;
                font-size:.24rem;
                font-weight:500;
                color:rgba(89,157,227,1);
                i{
                  color:#FF7F32
                }
              }
            }
            &.flag4 {
              .glue {
                position: relative;
                width: 5.35rem;
                height: 6rem;
                margin: auto;
                .content {
                  position: absolute;
                  top: 1rem;
                  left: 0;
                  right: 0;
                  margin: auto;
                  height: 5rem;
                }
              }
              .tabs {
                display: flex;
                width: 5.35rem;
                height: .76rem;
                font-size: .3rem;
                font-weight: bold;
                margin: auto;
                .tabs-item {
                  flex: 1;
                  font-weight: bold;
                  color: rgba(0, 40, 94, 1);
                  background: rgba(13, 124, 210, 1);
                  flex: 1;
                  text-align: center;
                  line-height: .76rem;
                  &.selected {
                    background: #66ADF7;
                    color: rgba(255, 255, 255, 1);
                  }
                  &:nth-child(1) {
                    border-radius: .38rem 0 0 .38rem;
                  }
                  &:nth-child(2) {
                    border-radius: 0 .38rem .38rem 0;
                  }
                }
              }
              .gonglueitem {
                width: 100%;
                background: #FFFFFF;
                border: 2px solid rgba(255, 219, 157, 1);
                border-radius: .2rem;
                display: flex;
                color: #FF7F32;
                box-sizing: border-box;
                h4 {
                  font-size: .24rem;
                  font-weight: bold;
                  line-height: .32rem;
                }
                h2 {
                  font-size: .2rem;
                  line-height: .32rem;
                  em {
                    color: #0D7CD2;
                    text-decoration: underline;
                  }
                }
                .left {
                  width: .69rem;
                  background: #FF7F32;
                  border-radius: .2rem 0 0 .2rem;
                  display: flex;
                  align-items: center;
                  text-align: center;
                  font-size: .36rem;
                  font-weight: bold;
                  color: #FFFFFF;
                }
                .right {
                  padding: .2rem .2rem;
                  line-height: .3rem;
                  width: 3.78rem;
                  box-sizing: border-box;
                }
                margin: 0 auto .2rem;
                &:nth-child(3) {
                  margin-bottom: 0;
                }
              }
              .prize{
                .item{
                  width: 100%;
                  margin-bottom: .1rem;
                  &:nth-child(3){
                    margin-bottom:0;
                  }
                  p{
                    height: .75rem;
                    border-radius:.2rem .2rem 0 0;
                    background: #FF7F32;
                    font-size:.3rem;
                    font-weight:bold;
                    color:rgba(255,255,255,1);
                    line-height:.75rem;
                    text-align: center;
                  }
                  .prize_info {
                    display: flex;
                    flex-wrap: wrap;
                    padding:.12rem;
                    box-sizing: border-box;
                    border-radius:0 0 .2rem .2rem;
                    background: #79C4FE;
                    .prize_info_item {
                      width: 1.22rem;
                      margin-bottom: .1rem;
                      margin-right: .07rem;
                      &:nth-child(4n){
                        margin-right:0;
                      }
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
              }
            }
            &.flag5 {
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
                font-size: .36rem;
                color: #0059B8;
                text-align: right;
                font-weight: bold;
                text-align: center;
                padding-bottom: .1rem;
              }
            }
            &.flag6 {
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              h4 {
                font-size: .3rem;
                font-weight: bold;
                color: #014D9D;
                margin-bottom: .2rem;
                i {
                  font-size: .36rem;
                  color: #FF7F32;
                }
              }
              .prize_info {
                display: flex;
                flex-wrap: wrap;
                padding: 0 .22rem 0 .26rem;
                box-sizing: border-box;
                justify-content: space-between;
                position: relative;
                .prize_info_item {
                  width: 1.22rem;
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
                &:after{
                  content: '+';
                  position: absolute;
                  top: 50%;
                  bottom: 0;
                  margin: auto;
                  font-size: .36rem;
                  font-weight: bold;
                  color: #ff7f32;
                }
              }
              .btn {
                margin-top: .52rem;
                width: 2.96rem;
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                font-size: .36rem;
                font-weight: bold;
                border-radius: .4rem;
                &.btn_yellow {
                  color: rgba(255, 255, 255, 1);
                  background: linear-gradient(0deg, rgba(254, 160, 117, 1), rgba(234, 62, 98, 1));
                }
              }
              .tips {
                font-size: .24rem;
                font-weight: bold;
                color: rgba(246, 204, 164, 1);
              }
              .sad {
                width: 1.49rem;
                height: 1.59rem;
                margin-bottom: .2rem;
              }
              .sad_tips {
                font-size: .3rem;
                font-weight: bold;
                color: #A95C17;
                margin-bottom: .3rem;
              }
            }
          }
          .footer {
            width: 5.98rem;
            height: .63rem;
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
