<template>
  <section class="rule" :style="{zIndex:isShowPop?101:1}" :class="{pop2:from==2}">
    <template v-if="from==0">
      <img src="../pages/images/rule/icon.png" alt="" @click="showPop" class="ruleicon">
      <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
      <transition name="scalc">
        <div class="pop" v-if="isShowPop">
          <div class="wrap">
            <div class="main">
              <div class="title">活动规则</div>
              <div class="time">活动时间：10月25日至10月29日</div>
              <div class="title1">每日任务活动：</div>
              <p>1、活动期间每天会有3个每日任务，完成后可领取奖励(仅限 当日领取)；</p>
              <p>2、任务设有任务引导，点击可查看具体的完成方式，帮助你 迅速的了解猫并完成相应任务；</p>
              <p>3、若连续5天每天都完成所有每日任务，则可获得额外奖励， 额外奖励需手动领取，如未领取，活动结束后系统会发至 个人账户上。</p>
              <div class="title1">集鱼干排行活动：</div>
              <p>1、活动期间每天会有3个每日任务，完成后可领取奖励(仅限 当日领取)； 2 任务设有任务引导，点击可查看具体的完成方式，帮助你 迅速的了解猫并完成相应任务；</p>
              <p>2、任务设有任务引导，点击可查看具体的完成方式，帮助你 迅速的了解猫并完成相应任务；</p>
              <p>3、若连续5天每天都完成所有每日任务，则可获得额外奖励， 额外奖励需手动领取，如未领取，活动结束后系统会发至 个人账户上；</p>
              <p>4、玩家通过游戏消耗金叶可自动获取鱼干，每消耗1000金 叶可获得1g鱼干。可获得鱼干的游戏限以下： 糖果萌消消、欢乐竞技台球、捕鱼游戏、王者弹珠、三国 大作战、众神风云、深海探一探、枪火英雄(物资争夺玩法)。</p>
            </div>
          </div>
          <div class="close-icon" @click="isShowPop = false"></div>
        </div>
      </transition>
    </template>
    <template v-if="from==1">
      <img src="../pages/images/package/profit/bangshoubtn.png" alt="" @click="showPop" class="profit profit1">
      <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
      <transition name="scalc">
        <div class="pop" v-if="isShowPop">
          <div class="wrap">
            <div class="main">
              <div class="title">榜首攻略</div>
              <div class="title1">1 什么是鱼干？如何获取</div>
              <p>鱼干是招财猫道具，在游戏中每消耗1000金叶可自动获得1鱼干，可获得鱼干的游戏限以下：糖果萌消消、欢乐竞技 台球、捕鱼游戏、王者弹珠、三国大作战、众神风云、深海探一探、枪火英雄(物资争夺玩法除外)、斗地主和麻将的桌费；</p>
              <div class="title1">2.如何快速获取鱼干登上榜单呢？</div>
              <p>在登上榜单的道路上，当然是有捷径可循的。 首先，你可以把获得的鱼干进行喂养提升招财猫等级，升到相应的等级后可以开启特权，当你获得鱼干加成的特权后，你就可以慢慢走向“人生巅峰"了;当然除了鱼干加成，还有各式各样的特权，给你与众不同的游戏体验<i  @click="gotocat">(戳此查看招财猫特权详情)</i>。其次，你可以持续与猫互动，保持良好的好感度，好感度可以带来鱼干加成，好感度越高鱼干加成的量也越大。<i @click="gotocat">(戳此查看好感度规则)</i>。再者，如果你有钞能力，可以购买商城道具，道具附带鱼干加成的效果，剁手一时爽，一直剁一直爽<i  @click="gotocat">(戳此查看猫商城道具)</i>。</p>
              <div class="title1">3.猫币有什么用？</div>
              <p>猫币是招财猫奖励道具，可以在猫领奖页兑换高额话费券、京东卡和游戏金叶子，大奖拿到手软！</p>
            </div>
          </div>
          <div class="close-icon" @click="isShowPop = false"></div>
        </div>
      </transition>
    </template>
    <template v-else-if="from==2">
      <img src="../pages/images/package/profit/chongbangbtn.png"  class="profit profit2" alt="" @click="showPop">
      <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
      <transition name="scalc">
        <div class="pop" v-if="isShowPop">
          <div class="wrap wrap3">
            <div class="main">
              <div class="title1">以下游戏可获取鱼干哦，快快冲榜吧</div>
              <div class="gamelist">
                <img :src="require(`../pages/images/pop/games/${index}.png`)" alt="" v-for="(item,index) in 4" class="game">
              </div>
              <div class="gogames" @click="gotoindex">更多游戏></div>
            </div>
          </div>
          <div class="close-icon" @click="isShowPop = false"></div>
        </div>
      </transition>
    </template>
  </section>
</template>

<script>
export default {
  name: "rule",
  data () {
    return {
      isShowPop: false
    };
  },
  props: {
    ruleMain: {
      type: String,
      default: ""
    },
    from: {
      type: String,
      default: "0"
    }
  },
  methods: {
    showPop () {
      this.isShowPop = true
      if (this.from) {
        GLOBALS.marchSetsPoint('A_H5PT0075001482')   // H5平台-砸金蛋-活动已结束-点击规则
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0075001459')   // H5平台-砸金蛋-点击规则
      }
    },
    gotocat(){
      location.href= `https://wap.beeplaying.com/petcat?channel=${localStorage.getItem('APP_CHANNEL')}`
    },
    gotoindex(){
      location.href= window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.rule {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -3rem;
  margin-top: -4.9rem;
  &.pop2{
    margin-left: -2.79rem;
    margin-top: -3.9rem;
  }
  img {
    &.ruleicon{
      position: fixed;
      width: 0.78rem;
      height: 0.5rem;
      right: 0;
      top: .25rem;
    }
    &.profit{
      position: fixed;
      width: 3.3rem;
      height: .9rem;
      bottom: .11rem;
      &.profit1{
        left: .18rem;
      }
      &.profit2{
        right: .18rem;
      }
    }
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
      width: 6rem;
      height: 9.8rem;
      background: url("../pages/images/rule/bg.png") no-repeat center center /
        100% 100%;
      margin: 0 auto;
      box-sizing: border-box;
      padding: .4rem;
      .main {
        font-size: 0.2rem;
        letter-spacing: 0.02rem;
        font-weight: bold;
        color:rgba(196,94,19,1);
        .title{
          font-size:.26rem;
          color:rgba(155,66,1,1);
          text-align: center;
          margin-bottom:.28rem;
        }
        .title1{
          margin-top:.22rem;
          margin-bottom:.22rem;
          text-align: left;
        }
        .time{
          font-weight:400;
          color:rgba(196,94,19,1);
        }

        p {
          line-height: 0.32rem;
          font-weight:400;
          color:rgba(196,94,19,1);
          text-align: left;
          i{
            color: #005AFF;
          }
        }
      }
      &.wrap3{
        width: 5.58rem;
        height: 7.76rem;
        padding: .7rem;
        .title1{
          text-align: center;
        }
        .gamelist{
          display: flex;
          flex-wrap: wrap;
          height: 5.62rem;
          justify-content: space-between;
          .game{
            width: 1.96rem;
            height: 2.68rem;
          }
        }
        .gogames{
          font-size:.24rem;
          font-weight:400;
          color:rgba(196,94,19,1);
          text-align: right;
        }
      }
    }

    .close-icon {
      width: 0.9rem;
      height: 0.8rem;
      background: url("../pages/images/common/close.png") no-repeat center
        center / 100% 100%;
      position: absolute;
      top: .58rem;
      right: 0;
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
