<template>
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div :class="getClassName('wrap')">
          <div class="title_bg">
            <img :src="`${require(`../images/comPop/${this.popType}/title.png`)}`" alt=""
                 style="width:2.34rem;height:.56rem" v-if="[0,1].includes(popType)">
            <img :src="`${require(`../images/comPop/${this.popType}/title${this.prizeInfoType}.png`)}`" alt=""
                 style="width:1.74rem;height:.56rem" v-else-if="popType==2">
            <img :src="`${require(`../images/comPop/3/title${this.wavePrizeInfoType}.png`)}`" alt=""
                 style="width:2.36rem;height:.55rem" v-else-if="popType==3">
            <div class="close" @click="close">
            </div>
          </div>
          <div class="main">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==0">
                <p v-if="ruleTime">活动时间:{{ruleTime}}</p>
                <p>1. 活动期间内，玩家在游戏中消耗一定的叶子，可领取摇奖机次数;</p>
                <p>2. 每次摇奖都会随机摇出5个图案，玩家根据摇出的相同图案的数量会获得不同的奖励，出现的相同图案越多，奖励越丰厚;</p>
                <p>3. 活动期间，玩家累计获得的摇奖次数会进行排行;</p>
                <p>4. 活动结束后，按照最终排行进行奖励发放;</p>
                <p>5. 活动结束后，排行榜还会展示一天时间。</p>
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
                  <p>当前游戏币不足</p>
                  <p>快去玩游戏获取摇游戏币吧</p>
                  <div class="btn btn_yellow" @click="gotogame">去玩游戏</div>
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
                  <div class="btn btn_yellow" @click="gotowave(1)">再摇一次</div>
                </template>
                <template v-else-if="wavePrizeInfoType==3">
                  <p>恭喜您获得{{jinbinum| filterPrice}}个游戏币</p>
                  <div class="btn btn_yellow" @click="close">快去摇奖</div>
                </template>
              </template>
            </div>
            <div class="footer"></div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import Services from '../services/services'

  export default {
    name: "comPop",
    data() {
      return {
        isShowPop: false,
        record: [],
        toalItems: [],
        prizeInfoList: []
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
              }, {
                awardsType: 'yg',
                name: '鱼干',
                value: data.ygAmount
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
              } else {
                this.prizeInfoList = data
              }
              this.isShowPop = true
            }
          }
        }
      },
      close() {
        // if (this.popType == 3 && this.wavePrizeInfoType == 1) {
        //   this.$emit('gotowavedirect')
        // }
        this.$emit('close')
        this.isShowPop = false;
      },
      gotogame() {
        GLOBALS.marchSetsPoint('A_H5PT0229002662')//H5平台-双旦活动页-摇一摇点击后游戏币不足弹窗-去玩游戏点击
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
      },
      gotowave(flag) {
        //A_H5PT0229002664 H5平台-双旦活动页-摇一摇点击后中奖弹窗-再摇一次点击
        //A_H5PT0229002667 H5平台-双旦活动页-摇一摇点击后游戏币充足提示弹窗-直接摇奖点击
        let points=['A_H5PT0229002667','A_H5PT0229002664']
        GLOBALS.marchSetsPoint(points[flag])
        this.isShowPop = false;
        this.$emit('gotowavedirect')
      },
      changeGear() {
        GLOBALS.marchSetsPoint('A_H5PT0229002666')//H5平台-双旦活动页-摇一摇点击后游戏币充足提示弹窗-切换额度点击
        this.isShowPop = false;
        this.$emit('close')
      }
    },
    watch: {
      isShowPop(value) {
        if(value) {
          document.body.style.overflow = 'hidden';
          document.addEventListener('touchmove', this.move, { passive: false });
        }else {
          document.body.style.overflow = null;
          document.removeEventListener('touchmove', this.move, { passive: false });
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
    margin-left: -3.14rem;
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
          width: 6.27rem;
          height: 3.66rem;
          background: url("../images/comPop/top.png") no-repeat center
            center / 100% 100%;
          position: relative;
          img {
            position: absolute;
            top: 2.01rem;
            left: 0;
            right: 0;
            margin: auto;
          }
          .close {
            width: .81rem;
            height: .84rem;
            background: url("../images/comPop/close-bg.png") no-repeat center
              center / 100% 100%;
            position: absolute;
            top: 1rem;
            right: .17rem;
            &:before {
              content: '';
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              width: .35rem;
              height: .35rem;
              background: url("../images/comPop/close.png") no-repeat center
                center / 100% 100%;
            }
          }
        }
        .main {
          width: 5.9rem;
          font-size: 0.2rem;
          background: #ED2437;
          border-radius: 0px 0px .16rem .16rem;
          padding: 0 0 1.3rem;
          color: #fff;
          margin-left: .14rem;
          position: relative;
          top: -.1rem;
          .container_compop {
            &.flag0 {
              padding: 0 .2rem;
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
                color: rgba(255, 255, 255, 1);
                margin-bottom: .14rem;
                position: relative;
                padding-left: .6rem;
                &:before {
                  content: '';
                  position: absolute;
                  left: .39rem;
                  width: .1rem;
                  height: .36rem;
                  background: rgba(254, 253, 251, 1);
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
                width: 1.94rem;
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                font-size: .36rem;
                font-weight: bold;
                &.btn_yellow {
                  color: rgba(237, 36, 55, 1);
                  background: url("../images/comPop/button.png") no-repeat center
                    center / 100% 100%;
                }
                &.btn_purple {
                  margin-right: .46rem;
                  background: url("../images/comPop/3/purplebutton.png") no-repeat center
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
          }
          .footer {
            width: 6.51rem;
            height: 1.18rem;
            background: url("../images/comPop/bottom.png") no-repeat center
              center / 100% 100%;
            position: absolute;
            bottom: 0;
            left: -.3rem
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
