<template>
  <section class="rule" :style="{zIndex:isShowPop?101:(from>0?100:1)}" :class="{pop2:from==2}">
    <template v-if="from==0">
      <img src="../pages/images/rule/icon.png" alt="" @click="showPop" class="ruleicon">
      <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
      <transition name="scalc">
        <div class="pop" v-if="isShowPop">
          <div class="wrap">
            <div class="main">
              <div class="title">活动规则</div>
              <div class="time">活动时间：{{ruleMain.replace(/\./g,'月').replace('-','日-')}}日</div>
              <div class="title1">每日任务活动：</div>
              <p>1、活动期间每天会有3个每日任务，完成后可领取奖励(仅限当日领取)；</p>
              <p>2、任务设有任务引导，点击可查看具体的完成方式，帮助你迅速地了解猫并完成相应任务；</p>
              <p>3、若连续5天每天都完成所有每日任务，则可获得额外金叶奖励，额外奖励需手动领取，如未领取，活动结束后系统会发至个人账户。</p>
              <div class="title1">集鱼干排行活动：</div>
              <p>1、玩家通过游戏消耗金叶可自动获取鱼干，每消耗1000金叶可获得1g鱼干。可获得鱼干的游戏限以下：糖果萌消消、欢乐竞技台球、捕鱼游戏、王者弹珠、三国大作战、众神风云、深海探一探、枪火英雄(物资争夺玩法除外)、斗地主和麻将(仅算桌费)。好感度、特权及商城商品可提供鱼干加成，加速鱼干的获取；</p>
              <p>2、活动期间内仅通过游戏获得的鱼干会被计入排行中(老玩家首次进入招财猫转换所得鱼干、活动中获得的鱼干不计入排行)。活动结束后会根据用户5天累计的鱼干获取量排名发放奖励。奖励会在活动结束后自动发放至个人账户，活动结束后三天内，用户可通过活动入口进入查看结果。</p>
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
              <div class="title1">鱼干如何获取？</div>
              <p>游戏中每消耗1000金叶可自动获得1g鱼干，可获得鱼干的游戏限以下：糖果萌消消、欢乐竞技台球、捕鱼游戏、王者弹珠、三国大作战、众神风云、深海探一探、枪火英雄(物资争夺玩法除外)、斗地主和麻将（仅算桌费)。</p>
              <div class="title1">如何快速获取鱼干登上榜单？</div>
              <p>1、升猫等级解锁特权，10级可获得鱼干加成特权，继续提升猫等级还可使特权权益扩大，永久性加快鱼干获取<i  @click="gotocat">(戳此查看招财猫特权详情)</i>；</p>
              <p>2、持续与猫互动保持好感度，好感度越高，获得的鱼干加成比例也越高<i @click="gotocat">(戳此查看招财猫好感度)</i>；</p>
              <p>3、商城道具附带鱼干加成效果，道具有期限，有效期内可提供高额的鱼干加成<i  @click="gotocat">(戳此查看猫商城道具)</i>。</p>
              <div class="title1">猫币有什么用？</div>
              <p>猫币可在招财猫领奖页兑换高额话费券、京东卡和游戏金叶子。</p>
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
                <img :src="require(`../pages/images/pop/games/${index}.png`)" alt="" v-for="(item,index) in games" class="game" @click="gotogame(item)">
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
      isShowPop: false,
      games:[{
        id:12,
        url:'/crush'
      },{
        id:21,url:'/Marbles'
      },{
        id:10,url:'/fish'
      },{
        id:2,url:'/billiards'
      }]
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
      if (this.from) {
        //2067:H5平台-撸猫活动-排行榜页面-我要上榜首按钮点击
        //2068:H5平台-撸猫活动-排行榜页面-立即冲榜按钮点击
        GLOBALS.marchSetsPoint(this.from==1?'A_H5PT0201002067':'A_H5PT0201002068')
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0201002054')   //H5平台-撸猫活动-规则按钮点击
      }
      this.isShowPop = true
      //2069:H5平台-撸猫活动-排行榜页面-榜首攻略弹窗加载完成
      //2071:H5平台-撸猫活动-排行榜页面-立即冲榜弹窗加载完成
      this.from&&GLOBALS.marchSetsPoint(this.from==1?'A_H5PT0201002069':'A_H5PT0201002071')
    },
    gotocat(){
      GLOBALS.marchSetsPoint('A_H5PT0201002070')//H5平台-撸猫活动-排行榜页面-榜首攻略弹窗-蓝色跳转内容点击(跳转招财猫)
      location.href= `https://wap.beeplaying.com/petcat?channel=${localStorage.getItem('APP_CHANNEL')}`
    },
    gotoindex(){
      GLOBALS.marchSetsPoint('A_H5PT0201002073')//H5平台-撸猫活动-排行榜页面-立即冲榜弹窗-更多游戏点击(跳转平台首页)
      location.href= window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
    },
    gotogame({url,id}){
      GLOBALS.marchSetsPoint('A_H5PT0201002072',{target_project_id:id})//H5平台-撸猫活动-排行榜页面-立即冲榜弹窗-具体游戏点击
      GLOBALS.jumpOutsideGame(url)
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
