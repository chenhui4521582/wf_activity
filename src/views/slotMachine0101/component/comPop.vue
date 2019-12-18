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
            <template v-if="popType==0">
              <div class="container">
                <p v-if="ruleTime">活动时间:{{ruleTime}}</p>
                <p>1. 活动期间内，玩家在游戏中消耗一定的叶子，可领取摇奖机次数;</p>
                <p>2. 每次摇奖都会随机摇出5个图案，玩家根据摇出的相同图案的数量会获得不同的奖励，出现的相同图案越多，奖励越丰厚;</p>
                <p>3. 活动期间，玩家累计获得的摇奖次数会进行排行;</p>
                <p>4. 活动结束后，按照最终排行进行奖励发放;</p>
                <p>5. 活动结束后，排行榜还会展示一天时间。</p>
              </div>
            </template>
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
        titleImgs: [{
          url: `${require('../images/comPop/0/rule-title.png')}`,
          width: '2.33rem',
          height: '.54rem'
        }]
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
    },
    methods: {
      getClassName(name) {
        return `${name} flag${this.popType}`
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
            padding: 0 .2rem;
            box-sizing: border-box;
            font-size: 24px;
            font-weight: 500;
            line-height: .36rem;
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
