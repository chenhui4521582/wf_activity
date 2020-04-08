<template>
  <section class="rule" :style="{zIndex:isShowPop?3:2}">
    <img src="../images/rule.png" alt="" @click="showPop">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="title"><img src="../images/pop/rule/rule-title.png" alt=""></div>
          <div class="main">
            <div class="text" v-if="ruleMain">1、活动时间：{{ruleMain}}大奖发榜；</div>
            <div class="text"><span>2、共有初、中、高级3个场次，玩家可通过消耗翻牌点进行翻牌，100%有奖；活动期间累计翻牌点最高可赢35000元大奖；</span></div>
            <div class="text"><span>3、翻牌点可通过玩游戏和购买活动页礼包获得，在斗地主、麻将、跑得快、枪火英雄、套圈、天天飞机大战中消耗金叶不计入活动内；</span></div>
            <div class="text"><span>4、单场次翻牌次数越多，所需要的翻牌点越多；</span></div>
            <div class="text"><span>5、初级场消耗翻牌点最少，中级场其次，随机加赠翻倍卡。翻倍卡只能在所得场次使用，使下次翻牌奖励X2；高级场最多，奖励最高，随机加赠翻倍卡或翻牌点（赠送的翻牌点不计入排行榜中）；</span>
            </div>
            <div class="text"><span>6、任意场次中，翻牌中途或翻完所有牌面后选择重新洗牌，将开始新一轮翻牌，且每轮消耗翻牌点不变；</span></div>
            <div class="text"><span>7、每个场次重新洗牌限30次。翻倍卡需及时使用，重新洗牌后将失效。</span></div>
          </div>
        </div>
        <div class="close-icon" @click="isShowPop = false"></div>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    name: "rule",
    data() {
      return {
        isShowPop: false
      };
    },
    props: {
      ruleMain: {
        type: String,
        default: ""
      }
    },
    methods: {
      showPop() {
        this.isShowPop = true
        GLOBALS.marchSetsPoint('A_H5PT0156001769')//H5平台-翻牌活动-中间区域-规则按钮点击
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .rule {
    position: fixed;
    top: 0;
    left: 50%;
    // margin-left: -2.86*1.125rem;
    margin-left: -3.55rem;
    img:not(.game) {
      width: 0.84rem;
      height: 0.84rem;
      position: fixed;
      right: 0;
      top: .36rem;
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
        width: 7.1rem;
        height: 8.68*1.125rem;
        background: url("../images/pop/rule/bg.png") no-repeat center center /
        100% 100%;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 1.15*1.125rem .75rem .6rem 1rem;

        position: relative;
        .title {
          position: absolute;
          width: 2.57rem;
          height: 0.72rem;
          top: 1.8rem;
    left: 50%;
    transform: translateX(-50%);
          img{
              width: 2.57rem;
          height: 0.72rem;
          position: static;
          }
        
          // font-size: 0.54rem;
          // height: 1*1.125rem;
          // line-height: 1*1.125rem;
          // text-align: center;
          // font-weight: 400;
          // color: rgba(255, 230, 173, 1);
          // background: linear-gradient(0deg, rgba(254, 222, 87, 1) 0%, rgba(254, 252, 201, 1) 100%);
          // -webkit-background-clip: text;
          // -webkit-text-fill-color: transparent;
        }
        .main {
          font-size: 0.22rem;
          // background: #750503;
          border-radius: 0px 0px .16rem .16rem;
          padding: 0rem 0.1rem 0rem 0;
          color:rgba(255,247,226,1);
          width: 80%;
    margin: 2.1rem auto;
    height: 5.8rem;
    overflow: auto;
          .text {
            display: flex;
            i {
              margin-top: .1rem;
              display: inline-block;
              width: .1rem;
              height: .1rem;
              background: rgba(236, 110, 71, 1);
              border-radius: 50%;
              margin-right: .18rem;
            }
            span {
              max-width: 4.2rem;
            }
            line-height: 0.3rem;
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
      .close-icon {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../pages/images/common/close.png") no-repeat center
          center / 100% 100%;
        margin: 0 auto;
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
