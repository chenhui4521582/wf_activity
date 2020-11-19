<template>
  <section :class="getClassName('com_pop')" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div :class="getClassName('title_bg')">{{popType==3?(awardData.titlename||titles[popType-1]):titles[popType-1]}}</div>
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1">
                <scroll>
                  <div>
                    <p v-if="actInfo">1、活动时间：{{actInfo.beginDate}}-{{actInfo.endDate}}</p>
                    <p>2、活动设有6个宝箱，玩家通过付费解锁宝箱获得等额金叶，并有机率瓜分奖池钻石；</p>
                    <p>3、钻石奖池每天0点刷新，并抽取系统实时奖励累计成钻石数；</p>
                    <p>4、钻石可用于『财宝商店』换取好礼；</p>
                    <p>5、当前一个宝箱解锁成功，可解锁下一个宝箱；</p>
                    <p>6、当一轮宝箱全部解锁后，回到第一个宝箱重新开始。单天宝箱解锁不限轮次，宝箱进度每天0点清零刷新；</p>
                    <p>7、单轮宝箱线路中，宝箱越置后，钻石瓜分机率越高；</p>
                    <p>8、每轮单个宝箱仅可购买1次。因异常操作（刷单或单轮单个宝箱重复购买）产生的宝箱解锁问题，可能使复购获得的钻石无法计入账户。如有问题请联系在线客服；</p>
                    <p>9、解锁宝箱时瓜分的钻石奖池以系统计算为准（当天23点50分后解锁的宝箱可能因支付延迟而无法瓜分当日奖池，请尽早解锁宝箱哦~）；</p>
                    <p>10、活动结束后，活动页入口保留两天，钻石仍可换取奖励，过期钻石作废。</p>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==2">
                <div class="bonus-record" :class="{empty:!record.length}">
                  <template>
                    <div class="title_items">
                      <div class="title">时间</div>
                      <div class="title">消耗钻石数</div>
                      <div class="title">获得奖励</div>
                    </div>
                    <div class="content">
                      <scroll :data="record">
                        <ul>
                          <li v-for="item in record">
                            <div>{{item.createTime}}</div>
                            <div>{{item.consume}}</div>
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
              <template v-else-if="popType==3">
                <div class="awards_list" :class="{onlyone:awardList.length==1}">
                  <div class="award" v-for="item in awardList">
                    <div class="img_bg">
                      <img :src="`${require(`../images/awards/${item.awardsType}.png`)}`" alt="">
                    </div>
                    <div class="awardsName">{{item.awardsName}}<template v-if="item.num>1">X{{item.num}}</template>
                      <template v-if="item.awardsRemark">(<i style="font-size:.18rem;">{{item.awardsRemark}}</i>)
                      </template>
                    </div>
                  </div>
                </div>
                <div class="info" v-html="awardData.info"></div>
                <div class="btns" v-if="awardData.btnNum">
                  <div class="btn" @click="gotopay(awardData)" v-if="awardData.btnNum==1">{{awardData.price}}元解锁>></div>
                  <template v-else>
                    <div class="btnSure" @click="exchagePrize(awardData)">点击兑换</div>
                    <div class="btnSure" @click="letmesee">我再想想</div>
                  </template>
                </div>
              </template>
            </div>
            <div :class="getClassName('close')" @click="close">
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
    name: 'compop',
    data () {
      return {
        isShowPop: false,
        titles: ['活动规则', '换取记录', '解锁宝箱后可获得'],
        record: []
      }
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
      },
      awardList: {
        type: Array,
        default: () => []
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
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
      getClassName (name) {
        return `${name} flag${this.popType} awardNum${this.awardList.length}`
      },
      async showPop () {
        if ([2].includes(this.popType)) {
          let {code, data} = await getRecords()
          if (code == 200) {
            this.record = data
            this.isShowPop = true
          }
        } else {
          this.isShowPop = true
        }
      },
      close () {
        this.$emit('close', this.awardData)
        this.isShowPop = false
        this.record = []
      },
      move (e) {
        e.preventDefault()
      },
      gotopay (item) {
        this.isShowPop = false
        localStorage.setItem('originDeffer', window.location.href)
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
      exchagePrize (item) {
        this.isShowPop = false
        this.$emit('exchagePrize', Object.assign(item, {
          sureChange: true
        }))
      },
      letmesee () {
        this.isShowPop = false
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
    top: 30%;
    left: 50%;
    margin-top: -50%;
    margin-left: -3.365rem;
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
          top: 3.1rem;
          left: 0;
          right: 0;
          margin: auto;
          width: 3.78rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .4rem;
          font-weight: bold;
          z-index: 1;
          color: #FFE9BD;
        }
        .main {
          width: 6.73rem;
          height: 8.5rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          background: url("../images/compop/pop.png");
          background-size: 100% 100%;
          .container_compop {
            top: 3.7rem;
            left: 1.4rem;
            right: 1.4rem;
            bottom: .6rem;
            margin: auto;
            position: absolute;
            &.flag1 {
              p {
                line-height: .4rem;
                font-size: .26rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
              }
            }
            &.flag2 {
              position: absolute;
              left: .8rem;
              right: .8rem;
              margin: auto;
              .bonus-record {
                height: 4rem;
                position: relative;
                margin: auto;
                font-size: .26rem;
                font-weight: 400;
                .title_items {
                  display: flex;
                  height: .5rem;
                  background: #FF92CD;
                  width: 100%;
                  .title {
                    flex: 1;
                    font-size: .24rem;
                    text-align: center;
                    height: .5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #711A67;
                  }
                }
                .content {
                  position: absolute;
                  height: 3.5rem;
                  top: .5rem;
                  left: 0rem;
                  right: 0;
                  color: #FFE9BD;
                  overflow: hidden;
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: .5rem;
                      align-items: center;
                      background: #B03A8D;
                      div {
                        flex: 1;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      }
                      &:nth-child(2n) {
                        background: #CB5CAA;
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
                  justify-content: center;
                  /*&:before {*/
                  /*content: '';*/
                  /*position: absolute;*/
                  /*left: 0;*/
                  /*right: 0;*/
                  /*margin: auto;*/
                  /*width: 1.27rem;*/
                  /*height: 1.27rem;*/
                  /*background: url("../images/compop/empty.png");*/
                  /*background-size: 100% 100%;*/
                  /*}*/
                  &:after {
                    content: '没有记录';
                    position: absolute;
                    top: 2rem;
                    left: 0;
                    right: 0;
                    margin: auto;
                    font-size: .24rem;
                    font-weight: 500;
                    color: #FFE9BD;
                    align-self: flex-end;
                    text-align: center;
                  }
                }
              }
            }
            &.flag3 {
              height: 4rem;
              .awards_list {
                display: flex;
                flex-wrap: wrap;
                width: 3.9rem;
                justify-content: space-between;
                position: relative;
                margin-bottom: .35rem;
                &.onlyone {
                  justify-content: center;
                }
                .award {
                  .img_bg {
                    width: 1.6rem;
                    height: 1.6rem;
                    background: #9C2A82;
                    border-radius: .28rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                      width: 80%;
                    }
                  }
                  .awardsName {
                    margin-top: .13rem;
                    font-size: .26rem;
                    font-weight: 500;
                    color: #FFFFFF;
                    text-align: center;
                    max-width: 1.63rem;
                  }
                  &:nth-child(2n+1) {
                    margin-right: .2rem;
                    margin-bottom: .1rem;
                  }
                }
                &:not(.onlyone) {
                  &:after {
                    content: '+';
                    position: absolute;
                    top: .5rem;
                    left: 0;
                    right: 0;
                    margin: auto;
                    font-size: .48rem;
                    font-weight: bolder;
                    color: #FFFFFF;
                    text-align: center;
                  }
                }
              }
              .info {
                font-size: .24rem;
                font-weight: 500;
                color: #FFE2AB;
                text-align: center;
                line-height: .3rem;
              }
              .btns{
                font-size: .3rem;
                font-weight: 500;
                color: #FFFFFF;
                display: flex;
                justify-content: center;
                .btn {
                  margin: .16rem auto 0;
                  width: 2.6rem;
                  height: .88rem;
                  background: url("../images/compop/pay_btn.png");
                  background-size: 100% 100%;
                  line-height: .88rem;
                  text-align: center;
                }
                .btnSure{
                  width: 1.9rem;
                  height: .88rem;
                  line-height: .88rem;
                  text-align: center;
                  &:nth-child(1){
                    background: url("../images/compop/exchange.png");
                    background-size: 100% 100%;
                  }
                  &:nth-child(2){
                    margin-left:.1rem;
                    background: url("../images/compop/giveup.png");
                    background-size: 100% 100%;
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
