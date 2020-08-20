<template>
  <section :class="getClassName('com_pop')" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div class="title_bg">{{titles[popType-1]}}</div>
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1">
                <scroll>
                  <div>
                    <p v-if="actInfo">1、活动时间：{{actInfo.beginDate}}-{{actInfo.endDate}}</p>
                    <p>2、活动期间，单笔每满{{actInfo.conventRate}}元获得一次抽奖机会；</p>
                    <p>3、单次抽奖必中奖品，有一定概率抽中稀有限量道具、幸运碎片、话费券；</p>
                    <p>4、幸运碎片累计可兑换额外奖品；</p>
                    <p>5、台球限定皮肤仅可兑换一次。捕鱼抽奖券、糖果buff券可以重复领取，叠加有效时间/使用次数。</p>
                    <p>道具属性说明：</p>
                    <p>1、捕鱼抽奖券：可用于参与千万奖池抽奖，最高1000万奖池大奖</p>
                    <p>2、台球限定皮肤-金麦曙晖：限定款台球游戏皮肤，仅可兑换一次，永久生效。</p>
                    <p>3、糖果buff券：</p>
                    <p>1）小树苗buff券-bonus奖励计入小树苗的比例提高，可加快小树苗成长，加奖更多；</p>
                    <p>2）糖果小店buff券-彩虹糖果兑换收益卡之后，收益卡加成提升；</p>
                    <p>3）爱心银行buff券-爱心银行下次领取时奖励提高，当天积累越多，第二天领的越多</p>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==2">
                <p>您获得 <i>{{awardData.awardsNum}}</i> 个<br>抽奖机会</p>
                <div class="info">快去抽奖吧！</div>
              </template>
              <template v-else-if="popType==3">
                <p>您的抽奖机会<br>不足</p>
                <div class="info">单笔充值每满{{awardData.awardsNum}}元，可抽奖一次哦</div>
                <img src="../images/compop/goshopbtn.png" alt="" @click="gotomall">
              </template>
              <template v-else-if="popType==4">
                <div class="award">
                  <div class="img_bg">
                    <img :src="`${require(`../images/awards/${awardData.awardsType}.png`)}`" alt="">
                  </div>
                  <div class="awardsName" v-html="awardData.awardsName"></div>
                </div>
                <div class="info">{{awardData.info}}</div>
              </template>
              <template v-else>
                <div class="bonus-record" :class="{empty:!record.length}">
                  <template v-if="record.length">
                    <div class="title_items">
                      <div class="title">时间</div>
                      <div class="title">奖励</div>
                    </div>
                    <div class="content">
                      <scroll :data="record">
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
  </section>
</template>
<script>
  import {getRecords} from '../utils/api'

  export default {
    name: "compop",
    data() {
      return {
        isShowPop: false,
        titles: ['活动规则', '', '', '恭喜获得', '抽奖记录', '兑奖记录'],
        record: []
      };
    },
    props: {
      popType: {
        type: Number,
        default: 0
      },
      awardData: {
        type: Object,
        default: () => null
      },
      actInfo: {
        type: Object,
        default: () => null
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
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
      getClassName(name) {
        return `${name} flag${this.popType}`
      },
      async showPop() {
        if ([5, 6].includes(this.popType)) {
          let {code, data} = await getRecords(this.popType)
          if (code == 200) {
            this.record = data
            this.isShowPop = true
          }
        } else {
          this.isShowPop = true
        }
      },
      close() {
        this.$emit('close', this.awardData)
        this.isShowPop = false;
        this.record = []
      },
      move(e) {
        e.preventDefault()
      },
      gotomall() {
        location.href = 'https://wap.beeplaying.com/xmWap/#/payment'
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
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    top: 30%;
    left: 50%;
    margin-left: -3.56rem;
    margin-top: -50%;
    &.flag1 {
      margin-left: -3.365rem;
    }
    &.flag2, &.flag3 {
      margin-left: -3.41rem;
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
          height: .72rem;
          position: relative;
          top: 2.4rem;
          left: 0;
          right: 0;
          margin: auto;
          width: 3.78rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .48rem;
          font-weight: bold;
          z-index: 1;
          color: rgba(255, 230, 173, 1);
        }
        .main {
          width: 7.12rem;
          height: 8.45rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          background: url("../images/compop/pop2.png");
          background-size: 100% 100%;
          &.flag1 {
            width: 6.73rem;
            height: 8.5rem;
            background: url("../images/compop/pop.png");
            background-size: 100% 100%;
          }
          &.flag2, &.flag3 {
            width: 6.82rem;
            height: 7.24rem;
            background: url("../images/compop/pop1.png");
            background-size: 100% 100%;
          }
          .container_compop {
            position: absolute;
            top: 2.7rem;
            bottom: .2rem;
            left: .2rem;
            right: .2rem;
            margin: auto;
            &.flag1 {
              left: 1.52rem;
              right: 1.52rem;
              bottom: .6rem;
              p {
                line-height: .4rem;
                font-size: .27rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
              }
            }
            &.flag2, &.flag3 {
              top: 3rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              p {
                font-size: .54rem;
                font-weight: 400;
                color: rgba(254, 247, 183, 1);
                line-height: .7rem;
                text-align: center;
                i {
                  color: #FED750;
                }
              }
              img {
                width: 3.07rem;
                height: 1.07rem;
              }
              .info {
                margin: .7rem 0 .2rem;
                font-size: .24rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
              }
            }
            &.flag4 {
              top: 3.2rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              .award {
                height: 2.8rem;
                font-size: .22rem;
                font-weight: bold;
                color: rgba(245, 96, 62, 1);
                box-sizing: border-box;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: .2rem;
                .awardsName {
                  font-size: .3rem;
                  font-weight: bold;
                  color: rgba(2, 70, 114, 1);
                  line-height: .4rem;
                }
                .img_bg {
                  width: 1.7rem;
                  height: 1.7rem;
                  background: rgba(2, 70, 114, 1);
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-bottom: .3rem;
                  img {
                    width: 90%;
                  }
                }
              }
              .info {
                height: 1.5rem;
                line-height: 1.5rem;
                font-size: .24rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
              }
            }
            &.flag5, &.flag6 {
              position: absolute;
              top: 3rem;
              bottom: 2.4rem;
              left: .2rem;
              right: .2rem;
              margin: auto;
              .bonus-record {
                height: 2.16rem;
                position: relative;
                margin: auto;
                font-size: .28rem;
                font-weight: bold;
                width: 4rem;
                .title_items {
                  display: flex;
                  height: .6rem;
                  .title {
                    flex: 1;
                    text-align: center;
                    height: .6rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(3, 48, 86, 1);
                  }
                }
                .content {
                  position: absolute;
                  height: 2.5rem;
                  top: .6rem;
                  left: 0rem;
                  right: 0;
                  font-size: .24rem;
                  font-weight: bold;
                  color: rgba(4, 89, 124, 1);
                  overflow: hidden;
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: .6rem;
                      align-items: center;
                      div {
                        flex: 1;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
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
                    background: url("../images/compop/empty.png");
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
            }
          }
          .close {
            position: absolute;
            bottom: -0.4rem;
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
