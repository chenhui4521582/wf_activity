<template>
  <section :class="getClassName('com_pop')" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div :class="getClassName('main')">
            <div :class="getClassName('title_bg')">
              {{titles[popType-1]}}
            </div>
            <div :class="getClassName('container_compop')">
              <!--规则-->
              <template v-if="popType==1">
                <scroll>
                  <div>
                    <p v-if="actInfo">1、活动时间：{{actInfo.startDate}}-{{actInfo.endDate}}，共计三天；</p>
                    <p>2、活动期间，每充值10元即可获得一枚游戏币（活动道具自动发放无需领取），游戏币可用于投飞镖扎气球；</p>
                    <p>3、共计6个转盘，单个转盘共有8个气球，每击爆一个气球，就会获取对应奖励，同时该气球从转盘上消失，<i>解锁全部8个奖励后，会有额外加赠，并开启下一个转盘；</i></p>
                    <p>4、<i>转盘按照顺序逐个解锁</i>，未解锁的转盘不可投掷；</p>
                    <p>5、活动奖励包括：金叶子、话费券、京东券、大额优惠券等；</p>
                  </div>
                </scroll>
              </template>
              <!--我的奖励-->
              <template v-else-if="popType==2">
                <div class="bonus-record" :class="{empty:!record.length}">
                  <template>
                    <div class="title_items" v-if="record.length">
                      <div class="title">时间</div>
                      <div class="title">获得奖励</div>
                    </div>
                    <div class="content">
                      <scroll :data="record">
                        <ul>
                          <li v-for="item in record">
                            <div>{{item.dateTime}}</div>
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
              <!--恭喜获得-->
              <template v-else-if="popType==3">
                <div class="info" v-html="awardData.info"></div>
                <div class="awards_list onlyone">
                  <div class="award">
                    <div class="img_bg">
                      <img :src="`${require(`../images/awards/${awardData.awardsType}.png`)}`" alt=""
                           :class="{full:awardData.awardsType!='coin'}" v-if="awardData.awardsType">
                      <img :src="awardData.awardsImg|filter" alt="" v-if="awardData.awardsImg" class="full">
                    </div>
                    <div class="awardsName">{{awardData.awardsName}}</div>
                  </div>
                </div>
                <div class="btns">
                  <div class="btn" @click="letmesee">{{awardData.btnName}}</div>
                </div>
              </template>
              <!--很遗憾-->
              <template v-else-if="popType==4">
                <div class="awards_list onlyone">
                  <div class="award">
                    <div class="img_bg">
                      <img src="../images/compop/sad.png" alt="">
                    </div>
                    <div class="awardsName">
                      很遗憾，你的游戏币不足
                    </div>
                  </div>
                </div>
                <div class="btns">
                  <div class="btnSure" @click="gotomall">去获取</div>
                  <div class="btnSure" @click="letmesee">再想想</div>
                </div>
              </template>
              <!--温馨提示 游戏比不足-->
              <template v-else-if="popType==5">
                <div class="awards_list onlyone">
                  <div class="award">
                    <div class="img_bg">
                      <img src="../images/compop/coin.png" alt="">
                    </div>
                    <div class="awardsName">
                      本次投掷消耗<br>{{awardData.num}}个游戏币
                    </div>
                  </div>
                </div>
                <div class="btns">
                  <div class="btnSure" @click="exchagePrize(awardData)">确定</div>
                  <div class="btnSure" @click="letmesee">取消</div>
                </div>
              </template>
              <!--温馨提示 只能玩解锁键盘-->
              <template v-else-if="popType==6">
                <div class="awards_list onlyone">
                  <div class="award">
                    <div class="awardsName" style="font-size: .4rem;line-height: .5rem">
                      领取前面所有奖励<br>才可开启当前转盘
                    </div>
                  </div>
                </div>
                <div class="btns">
                  <div class="btn" @click="reset">去解锁</div>
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
        titles: ['活动规则', '我的奖励', '恭喜获得', '很遗憾', '温馨提示', '温馨提示'],
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
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      getClassName (name) {
        return `${name} flag${this.popType}`
      },
      async showPop () {
        if ([2].includes(this.popType)) {
          let {code, data} = await getRecords()
          if (code == 200) {
            this.record = data || []
            this.isShowPop = true
          }
        } else {
          this.isShowPop = true
        }
      },
      close () {
        this.isShowPop = false
        this.record = []
        if (this.awardData && this.awardData.giveAwards && this.awardData.giveAwards.awardsName) {
        }else{
          this.$emit('close', this.awardData)
        }
      },
      move (e) {
        e.preventDefault()
      },
      gotomall () {
        GLOBALS.marchSetsPoint('A_H5PT0350004454')// H5平台-气球爆爆爆-游戏币不足弹窗-去获取按钮点击
        location.href = 'https://wap.beeplaying.com/xmWap/#/payment'
      },
      // 确定兑换
      exchagePrize () {
        this.isShowPop = false
        this.$emit('cast', {
          sureChange: true
        })
      },
      letmesee () {
        this.popType == 4 && GLOBALS.marchSetsPoint('A_H5PT0350004455')// H5平台-气球爆爆爆-游戏币不足弹窗-再想想按钮点击
        this.isShowPop = false
      },
      reset () {
        this.isShowPop = false
        this.$emit('reset')
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
          if (this.awardData && this.awardData.giveAwards && this.awardData.giveAwards.awardsName) {
            this.$emit('showPop', 3, Object.assign(this.awardData.giveAwards, {
              btnName: '收下继续',
              info: `恭喜解锁全部奖励<br>再送一份大礼`
            }))
            GLOBALS.marchSetsPoint('A_H5PT0350004451')// H5平台-气球爆爆爆-加赠奖励弹窗加载完成
            this.$emit('refresh')
          }
        }
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    top: 10%;
    left: 50%;
    margin-left: -3.25rem;
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
          position: relative;
          top: .95rem;
          left: 0;
          right: 0;
          margin: auto;
          width: 3.78rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .36rem;
          font-weight: bold;
          z-index: 1;
          color: #914701;
        }
        .main {
          width: 6.45rem;
          height: 6.87rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          background: url("../images/compop/pop.png");
          background-size: 100% 100%;
          .container_compop {
            top: 2rem;
            left: 1rem;
            right: .95rem;
            bottom: .8rem;
            margin: auto;
            position: absolute;
            &.flag1 {
              p {
                line-height: .4rem;
                font-size: .3rem;
                font-weight: 400;
                color: #983D00;
                i{
                  font-weight: bolder;
                }
              }
            }
            &.flag2 {
              .bonus-record {
                height: 4.05rem;
                position: relative;
                margin: auto;
                font-size: .28rem;
                font-weight: 400;
                .title_items {
                  display: flex;
                  height: .55rem;
                  background: #C3550C;
                  width: 100%;
                  padding: .09rem 0;
                  box-sizing: border-box;
                  .title {
                    flex: 1;
                    font-size: .3rem;
                    text-align: center;
                    height: .55rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #FFECD5;
                    height: .37rem;
                    &:nth-child(1) {
                      border-right: 1px solid #FFECD5;
                    }
                  }
                }
                .content {
                  position: absolute;
                  height: 3.5rem;
                  top: .55rem;
                  left: 0rem;
                  right: 0;
                  color: #983D00;
                  overflow: hidden;
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: .5rem;
                      align-items: center;
                      background: #FCA973;
                      div {
                        flex: 1;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      }
                      &:nth-child(2n) {
                        background: #FBD3A3;
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
                  &:before {
                    content: '';
                    position: absolute;
                    top: 1rem;
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
                    top: 2.5rem;
                    left: 0;
                    right: 0;
                    margin: auto;
                    font-size: .3rem;
                    font-weight: 400;
                    color: #983D00;
                    align-self: flex-end;
                    text-align: center;
                  }
                }
              }
            }
            &.flag3, &.flag4, &.flag5, &.flag6 {
              height: 4rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .info {
                font-size: .3rem;
                font-weight: bold;
                color: #C53800;
                line-height: .4rem;
                text-align: center;
              }
              .awards_list {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                position: relative;
                &.onlyone {
                  justify-content: center;
                }
                .award {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  .img_bg {
                    width: 2.56rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                      width: 80%;
                      &.full {
                        width: 100%;
                      }
                    }
                  }
                  .awardsName {
                    margin-top: .13rem;
                    font-size: .36rem;
                    font-weight: 400;
                    color: #983D00;
                    text-align: center;
                  }
                  &:nth-child(2n+1) {
                    margin-bottom: .1rem;
                  }
                }
              }
              .btns {
                font-size: .3rem;
                font-weight: 400;
                color: #C33A19;
                display: flex;
                justify-content: center;
                .btn {
                  margin: .16rem auto 0;
                  width: 2.66rem;
                  height: .96rem;
                  background: url("../images/compop/btn0l.png");
                  background-size: 100% 100%;
                  padding-bottom: .1rem;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .btnSure {
                  width: 2.08rem;
                  height: .96rem;
                  text-align: center;
                  &:nth-child(1) {
                    color: #953308;
                    background: url("../images/compop/btn0.png");
                    background-size: 100% 100%;
                    padding-bottom: .1rem;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  &:nth-child(2) {
                    color: #245EB5;
                    margin-left: .1rem;
                    background: url("../images/compop/btn1.png");
                    background-size: 100% 100%;
                    padding-bottom: .1rem;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                }
              }
            }
          }
          .close {
            position: absolute;
            bottom: -0.8rem;
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
