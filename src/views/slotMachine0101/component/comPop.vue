<template>
  <section class="com_pop" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div :class="getClassName('wrap')">
          <div class="title">
            <img :src="titleImgs[popType].url" alt=""
                 :style="{width:titleImgs[popType].width,height:titleImgs[popType].height}">
            <div class="close" @click="isShowPop = false">
            </div>
          </div>
          <div class="main">
            <div :class="getClassName('container')">
              <template v-if="popType==0">
                <p v-if="ruleTime">活动时间:{{ruleTime}}</p>
                <p>1. 活动期间内，玩家在游戏中消耗一定的叶子，可领取摇奖机次数;</p>
                <p>2. 每次摇奖都会随机摇出5个图案，玩家根据摇出的相同图案的数量会获得不同的奖励，出现的相同图案越多，奖励越丰厚;</p>
                <p>3. 活动期间，玩家累计获得的摇奖次数会进行排行;</p>
                <p>4. 活动结束后，按照最终排行进行奖励发放;</p>
                <p>5. 活动结束后，排行榜还会展示一天时间。</p>
              </template>
              <template v-if="popType==1">
                <p v-if="ruleTime">活动时间:{{ruleTime}}</p>
                <p>1. 活动期间内，玩家在游戏中消耗一定的叶子，可领取摇奖机次数;</p>
                <p>2. 每次摇奖都会随机摇出5个图案，玩家根据摇出的相同图案的数量会获得不同的奖励，出现的相同图案越多，奖励越丰厚;</p>
                <p>3. 活动期间，玩家累计获得的摇奖次数会进行排行;</p>
                <p>4. 活动结束后，按照最终排行进行奖励发放;</p>
                <p>5. 活动结束后，排行榜还会展示一天时间。</p>
              </template>
              <template v-if="popType==2">
                <p>随机获得下列奖励</p>
                <div class="prize_info" :class="{lte2:prizeInfoList[prizeInfoType].length<=2,triple:prizeInfoList[prizeInfoType].length%3==0&&prizeInfoList[prizeInfoType].length<=6}">
                  <div class="prize_info_item" v-for="(item,index) in prizeInfoList[prizeInfoType]" :class="{empty:!item.awardName}">
                    <div class="prize_info_img">
                      <img :src="`${require(`../images/comPop/${item.awardType}.png`)}`" alt="" v-if="item.awardType">
                    </div>
                    <div class="prize_info_name">
                      <div class="prize_info_name_item" v-if="item.awardType">{{getAwardName(item.awardType)}}</div>
                      <div class="prize_info_name_item" v-if="item.awardName">{{item.awardName.replace(item.awardName.split(/\d+/)[0],'')}}
                      </div>
                    </div>
                  </div>
                </div>
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
  export default {
    name: "comPop",
    data() {
      return {
        isShowPop: true,
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
      prizeInfoList: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      titleImgs() {
        return [{
          url: `${require('../images/comPop/0/title.png')}`,
          width: '2.33rem',
          height: '.54rem'
        }, {
          url: `${require('../images/comPop/1/title.png')}`,
          width: '2.33rem',
          height: '.54rem'
        }, {
          url: `${require(`../images/comPop/2/title${this.prizeInfoType}.png`)}`,
          width: '1.74rem',
          height: '.56rem'
        }]
      }
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
      showPop() {
        this.isShowPop = true
        GLOBALS.marchSetsPoint('A_H5PT0156001769')//H5平台-翻牌活动-中间区域-规则按钮点击
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
        .title {
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
            position: relative;
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
          padding: 0 0 1.43rem;
          color: #fff;
          margin-left: .14rem;
          position: relative;
          .container {
            &.flag0 {
              padding: 0 .2rem;
              box-sizing: border-box;
              font-size: 24px;
              font-weight: 500;
              line-height: .36rem;
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
                  width: 1.12rem;
                  margin-bottom:.1rem;
                  &.empty{
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
                &.triple{
                  width:4.5rem;
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
