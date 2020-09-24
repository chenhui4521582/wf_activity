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
                <scroll>
                  <div>
                    <p>1、活动时间：{{actInfoData.beginDate}} - {{actInfoData.endDate}}</p>
                    <p>2、活动期间从4个国庆礼盒中选定1个，并开启对应任务；</p>
                    <p>3、每天完成对应任务，可以获得⭐和碎片奖励；</p>
                    <p>4、每日任务奖励需当天领取，过期不予补偿；</p>
                    <p>5、8天累计⭐，最终获得50%以上⭐可领取50%礼盒奖励。100%达成最终领取全部礼盒奖励；</p>
                    <p>6、活动期间内，奖励和任务一旦选定，不可中途更改目标奖励或任务；</p>
                    <p>7、活动结束后入口仍保留两天，请及时领取奖励。</p>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==2">
                <div class="sad_content">
                  <p>选择奖品后将开启相应任务，<br>活动期间不可更改哦~</p>
                  <div class="btn_sure" @click="sureSelect(1)">确认选择</div>
                  <div class="btn_cancel" @click="sureSelect(0)">我再想想</div>
                </div>
              </template>
              <template v-else-if="popType==3">
                <div class="gamelist">
                  <img :src="require(`../images/games/${index}.png`)" alt="" v-for="(item,index) in games"
                       class="game"
                       @click="gotogame(item)">
                </div>
                <div class="gogames" @click="gotoindex">更多游戏>></div>
              </template>
              <template v-else-if="popType==4">
                <div class="sad_content">
                  <img class="giftimg" :src="`${require(`../images/pic${awardData.bagId-1}.png`)}`">
                  <div class="gift-detail" v-html="awardData.awardsName.replace('+','+<br>')"></div>
                  <div class="info">奖励将自动发放到账</div>
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
  import {applyLevel} from '../utils/api'

  export default {
    name: 'comPop',
    data() {
      return {
        isShowPop: false,
        games: [{
          id: 12,
          url: '/crush'
        }, {
          id: 10, url: '/fish'
        }, {
          id: 30, url: '/boom'
        }, {
          id: 13, url: '/kingdom2'
        }, {
          id: 2, url: '/billiards'
        }, {
          id: 18, url: '/square'
        }, {
          id: 21, url: '/Marbles',
        }, {
          id: 27, url: '/crush3'
        }],
        titles: ["活动规则", "温馨提示", "大家都在玩", "恭喜获得"],
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
          case 'yhq':
            return '优惠券'
            break
        }
      },
      async showPop() {
        this.isShowPop = true
      },
      close() {
        this.$emit('close')
        this.isShowPop = false
      },
      move(e) {
        e.preventDefault()
      },
      async sureSelect(flag) {
        //H5平台-欢乐国庆礼-确认选择框-我再想想点击 A_H5PT0334004219
        GLOBALS.marchSetsPoint(flag?'A_H5PT0334004218':'A_H5PT0334004219')//H5平台-欢乐国庆礼-确认选择框-确认选择点击
        if(flag){
          let {code,message}=await applyLevel(this.awardData.bagLevel)
          if(code==200){
            this.$emit('refresh')
          }
          this.$toast.show({
            message,
            duration: 1000
          })
        }
        this.close()
      },
      gotogame({url, id}) {
        GLOBALS.jumpOutsideGame(url)
      },
      gotoindex() {
        window.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
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
    top: 2rem;
    margin-left: -3.04rem;
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
          width: 6.08rem;
          height: 5.7rem;
          background: #FFDBB6;
          border-radius: .2rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          padding: 1.2rem .2rem 0;
          box-sizing: border-box;
          overflow: hidden;
          .title_bg {
            width: 6.08rem;
            height: 1.05rem;
            position: absolute;
            left: 0;
            top: 0;
            background: #FFAE66;
            .title_txt {
              position: absolute;
              left: 0;
              right: 0;
              margin: auto;
              font-size: .48rem;
              font-weight: bold;
              color: #642F00;
              text-align: center;
              line-height: 1.05rem;
              &:before {
                content: '';
                width: 3.66rem;
                height: .61rem;
                background: url("../images/pop_title.png");
                background-size: 100% 100%;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
              }
            }
          }
          .container_compop {
            height: 4rem;
            &.flag1 {
              height: 4.3rem;
              padding: 0 .13rem;
              box-sizing: border-box;
              position: absolute;
              width: 5.5rem;
              p {
                color: #653000;
                font-weight: 400;
                font-size: .3rem;
                line-height: .4rem;
                &.center {
                  text-align: center;
                  text-decoration: underline;
                }
                /*i {*/
                  /*color: #FFE795;*/
                  /*font-weight: bold;*/
                /*}*/
                /*span {*/
                  /*font-weight: bold;*/
                /*}*/
              }
            }
            &.flag2, &.flag4 {
              position: relative;
              .sad_content {
                position: absolute;
                left: 0;
                right: 0;
                margin: .28rem auto 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                p {
                  font-size: .3rem;
                  font-weight: bold;
                  color: #653000;
                  line-height: .4rem;
                  text-align: center;
                  margin-bottom: .7rem;
                }
                .btn_sure, .btn_cancel {
                  width: 4.2rem;
                  height: .72rem;
                  background: #DD1711;
                  border-radius: .36rem;
                  font-size: .24rem;
                  color: #FFFFFF;
                  text-align: center;
                  line-height: .72rem;
                  &.btn_cancel {
                    margin-top: .23rem;
                    color: #FF7800;
                    background: #FFFFFF;
                  }
                }
                .giftimg {
                  width: 1.83rem;
                  height: 2.13rem;
                }
                .gift-detail {
                  font-size: .3rem;
                  font-weight: bold;
                  color: #C70A05;
                  line-height: .4rem;
                  margin: .16rem 0 .52rem;
                  text-align: center;
                }
                .info {
                  font-size: .24rem;
                  color: #642F00;
                }
              }
            }
            &.flag3 {
              .gamelist {
                display: flex;
                flex-wrap: wrap;
                height: 4.2rem;
                justify-content: space-between;
                position: absolute;
                left: .2rem;
                right: .2rem;
                .game {
                  width: 1.24rem;
                  height: 1.69rem;
                }
              }
              .gogames {
                font-size: 0.3rem;
                font-weight: bold;
                color: #642F00;
                text-align: center;
                position: absolute;
                bottom: .15rem;
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
          background: url("../images/close.png") no-repeat center
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
