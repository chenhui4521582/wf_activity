<template>
  <section :class="getClassName('rule')" :style="{zIndex:isShowPop?2:2}">
    <div class="pop-mask" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop">
        <div :class="getClassName('wrap')" @click="close(from)">
          <template v-if="from!=1">
            <div :class="getClassName('btn btn-yellow')" @click="btnyellowclick">
              <template v-if="from==2">
                立即去翻牌
              </template>
              <template v-else-if="from==3">
                去充值得翻牌点
              </template>
              <template v-else-if="from==4">
                继续翻牌
              </template>
              <template v-else-if="from==5">
                继续翻牌
              </template>
              <template v-else-if="from==6">
                继续翻牌
              </template>
              <template v-else-if="from==7||from==11">
                放弃翻倍卡
              </template>
              <template v-else-if="from==8">
                去充值得翻牌点
              </template>
              <template v-else>
                我要升级
              </template>
            </div>
            <div :class="getClassName('btn btn-pink')" v-if="[3,7,8,9,10,11].includes(from)" @click="btnpinkclick">
              <template v-if="from==3">
                去玩游戏得翻牌点
              </template>
              <template v-else-if="from==7||from==11">
                继续翻牌
              </template>
              <template v-else-if="from==8">
                去玩游戏得翻牌点
              </template>
              <template v-else>
                我再想想
              </template>
            </div>
            <div class="info1" v-if="from==5||from==6">
              <template v-if="from==5">
                翻倍卡生效，奖励翻倍
              </template>
              <template v-else>
                继续翻出奖品则奖励X2
              </template>
            </div>
            <template v-if="from==2">
              <img src="../images/pop/gradation/level2.png" alt="" v-if="level==2" class="gradationimg">
              <img src="../images/pop/gradation/level3.png" alt="" v-if="level==3" class="gradationimg">
            </template>
            <div :class="getClassName('product-img')" v-if="[4,5,6].includes(from)">
              <div class="item" v-for="item in carddata">
                <img src="../images/jd.png" alt="" v-if="item.awardsType=='jdk'">
                <img src="../images/huafei.png" alt="" v-if="item.awardsType=='hfq'">
                <img src="../images/fish.png" alt="" v-if="item.awardsType=='yg'">
                <img src="../images/leaf.png" alt="" v-if="item.awardsType=='jyz'">
                <img src="../images/card.png" alt="" v-if="item.awardsType=='fbk'">
                <span>{{item.awardsName}}</span>
              </div>
            </div>
            <div class="info" v-if="from!=7">
              <template v-if="from==3">充值金叶可获得翻牌点<br></template>
              累计获得总翻牌点可获得最高奖励<i>30000元京东卡</i></div>
            <div class="info" v-else>
              获得翻倍卡后，下次奖励翻倍
            </div>
          </template>
        </div>
        <div class="close-icon" @click="close(0)"></div>
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
      },
      from: {
        type: Number,
        default: 0
      },
      level: {
        type: Number,
        default: 0
      },
      carddata:{
        type: Array,
        default: []
      }
    },
    methods: {
      showPop() {
        this.isShowPop = true
        if (this.from) {
          GLOBALS.marchSetsPoint('A_H5PT0075001482')   // H5平台-砸金蛋-活动已结束-点击规则
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0075001459')   // H5平台-砸金蛋-点击规则
        }
      },
      close(flag) {
        if(flag==0){
          this.$emit('close', flag)
          if(this.from==1){
            GLOBALS.marchSetsPoint('A_H5PT0156001794')//H5平台-翻牌活动-弹窗反馈-首次进入页面恭喜获得翻牌点弹窗-关闭点击
            this.$emit('card')
          }
        }
        if(flag==1){
          GLOBALS.marchSetsPoint('A_H5PT0156001793')//H5平台-翻牌活动-弹窗反馈-首次进入页面恭喜获得翻牌点弹窗-去翻大奖点击
          this.$emit('close', flag)
          this.$emit('card')
        }
      },
      getClassName(name) {
        if (this.from) {
          return `${name} flag${this.from}`
        } else {
          return name
        }
      },
      btnyellowclick() {
        this.$emit('close', 0)
        if (this.from == 2) {//立即去翻牌
          GLOBALS.marchSetsPoint('A_H5PT0156001799')//H5平台-翻牌活动-弹窗反馈-翻牌场次升级弹窗-立即去翻牌点击
        } else if (this.from == 3) {//去充值得翻牌点
          GLOBALS.marchSetsPoint('A_H5PT0156001796')//H5平台-翻牌活动-弹窗反馈-翻牌点不够弹窗-去充值得翻牌点点击
          this.$emit('package')
        } else if (this.from == 4) {//继续翻牌
          GLOBALS.marchSetsPoint('A_H5PT0156001782')//H5平台-翻牌活动-弹窗反馈-正常奖励弹窗-继续翻牌
        } else if (this.from == 5) {//继续翻牌
          GLOBALS.marchSetsPoint('A_H5PT0156001786')//H5平台-翻牌活动-弹窗反馈-翻倍开出奖励弹窗-继续翻牌
        } else if (this.from == 6) {//继续翻牌
          GLOBALS.marchSetsPoint('A_H5PT0156001784')//H5平台-翻牌活动-弹窗反馈-获得翻倍卡弹窗-继续翻牌
        } else if (this.from == 7||this.from == 11) {//放弃翻倍卡
          GLOBALS.marchSetsPoint('A_H5PT0156001790')//H5平台-翻牌活动-弹窗反馈-重置提醒弹窗-放弃翻倍卡点击
          this.$emit('sureCard',this.from==7?1:2)//true 重置 false 升级场次
        } else if (this.from == 8) {//去充值得翻牌点
          this.$emit('package')
        }else if (this.from == 9) {//我要升级
          this.$emit('sureGrade')
        }else{//我要升级
          this.$emit('sureGrade')
        }
      },
      btnpinkclick() {
        this.$emit('close', 0)
        if (this.from == 3) {//去玩游戏得牌点
          GLOBALS.marchSetsPoint('A_H5PT0156001797')//H5平台-翻牌活动-弹窗反馈-翻牌点不够弹窗-去玩游戏得翻牌点点击
          location.href = window.linkUrl.getBackUrl(this.curChannel)
        } else if (this.from == 7||this.from ==11) {//继续翻牌
          GLOBALS.marchSetsPoint('A_H5PT0156001791')//H5平台-翻牌活动-弹窗反馈-重置提醒弹窗-继续翻牌点击
        } else if (this.from == 8) {//去玩游戏得牌点
          location.href = window.linkUrl.getBackUrl(this.curChannel)
        }else if (this.from == 9) {//我再想想

        }else if (this.from == 10) {//我再想想

        }
      }
    },
    mounted(){
      if (this.from == 1) {//首次赠送
        GLOBALS.marchSetsPoint('A_H5PT0156001792')//H5平台-翻牌活动-弹窗反馈-首次进入页面恭喜获得翻牌点弹窗加载完成
      } else if (this.from == 2) {//恭喜升级
        GLOBALS.marchSetsPoint('A_H5PT0156001798')//H5平台-翻牌活动-弹窗反馈-翻牌场次升级弹窗加载完成
      } else if (this.from == 3) {//翻倍点不足
        GLOBALS.marchSetsPoint('A_H5PT0156001795')//H5平台-翻牌活动-弹窗反馈-翻牌点不够弹窗加载完成
      } else if (this.from == 4) {//正常奖励
        GLOBALS.marchSetsPoint('A_H5PT0156001781')//H5平台-翻牌活动-弹窗反馈-正常奖励弹窗加载完成
      } else if (this.from == 5) {//翻倍开出
        GLOBALS.marchSetsPoint('A_H5PT0156001785')//H5平台-翻牌活动-弹窗反馈-翻倍开出奖励弹窗加载完成
      } else if (this.from == 6) {//获得翻倍卡
        GLOBALS.marchSetsPoint('A_H5PT0156001783')//H5平台-翻牌活动-弹窗反馈-获得翻倍卡弹窗加载完成
      } else if (this.from == 7||this.from == 11) {//重置弹窗
        GLOBALS.marchSetsPoint('A_H5PT0156001789')//H5平台-翻牌活动-弹窗反馈-重置提醒弹窗加载完成
      } else if (this.from == 8) {//抱歉不能升级
        //GLOBALS.marchSetsPoint('A_H5PT0156001776')
      }else if (this.from == 9) {//是否升级中级场
        // GLOBALS.marchSetsPoint('A_H5PT0156001789')
      }else{//是否升级高级场
        // GLOBALS.marchSetsPoint('A_H5PT0156001789')
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .rule {
    position: fixed;
    top: 0;
    &.flag1, &.flag7,&.flag11, &.flag9, &.flag10 {
      top: 1.64rem;
    }
    left: 50%;
    margin-left: -2.81rem;
    &.flag1 {
      margin-left: -2.69rem;
    }
    &.flag7,&.flag11, &.flag9, &.flag10{
      margin-left: -2.46rem;
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
        padding: 1.06rem 0.2rem 0;
        .main {
          font-size: 0.2rem;
          font-weight: bold;
          color: rgba(236, 110, 71, 1);
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
        }
        &.flag1 {
          width: 5.38rem;
          height: 6.3rem;
          background: url("../images/pop/indexpop.png") no-repeat center center /
        100% 100%;
        }
        &.flag2 {
          padding: 2.9rem 0.2rem 0;
          width: 5.62rem;
          height: 7.64rem;
          background: url("../images/pop/gradation/bg.png") no-repeat center center /
        100% 100%;
        }
        &.flag3 {
          padding: 2.9rem 0.2rem 0;
          width: 5.62rem;
          height: 7.64rem;
          background: url("../images/pop/sorry/bg.png") no-repeat center center /
        100% 100%;
        }
        &.flag4 {
          padding: 2.9rem 0.2rem 0;
          width: 5.62rem;
          height: 7.64rem;
          background: url("../images/pop/pop1.png") no-repeat center center /
        100% 100%;
        }
        &.flag5 {
          padding: 2.9rem 0.2rem 0;
          width: 5.62rem;
          height: 7.64rem;
          background: url("../images/pop/pop2.png") no-repeat center center /
        100% 100%;
        }
        &.flag6 {
          padding: 2.9rem 0.2rem 0;
          width: 5.62rem;
          height: 7.64rem;
          background: url("../images/pop/pop3.png") no-repeat center center /
        100% 100%;
        }
        &.flag7{
          padding: 2.9rem 0.2rem 0;
          width: 4.93rem;
          height: 5.61rem;
          background: url("../images/pop/reset/bg.png") no-repeat center center /
        100% 100%;
        }
        &.flag11 {
          padding: 2.9rem 0.2rem 0;
          width: 4.93rem;
          height: 5.61rem;
          background: url("../images/pop/gradation/bg1.png") no-repeat center center /
        100% 100%;
        }
        &.flag8 {
          padding: 2.9rem 0.2rem 0;
          width: 5.62rem;
          height: 7.64rem;
          background: url("../images/pop/reset/sorry.png") no-repeat center center /
        100% 100%;
        }
        &.flag9 {
          padding: 2.9rem 0.2rem 0;
          width: 4.93rem;
          height: 5.61rem;
          background: url("../images/pop/reset/level2.png") no-repeat center center /
        100% 100%;
        }
        &.flag10 {
          padding: 2.9rem 0.2rem 0;
          width: 4.93rem;
          height: 5.61rem;
          background: url("../images/pop/reset/level3.png") no-repeat center center /
        100% 100%;
        }
        .gradationimg {
          position: absolute;
          top: 3rem;
          left: 0;
          right: 0;
          width: 3.51rem;
          height: 1.04rem;
          margin: auto;
        }
        .product-img {
          position: absolute;
          top: 3.4rem;
          left: 0;
          right: 0;
          text-align: center;
          font-size: .18rem;
          font-weight: 400;
          color: #3f1207;
          line-height: .3rem;
          height: 1.9rem;
          display: flex;
          justify-content: center;
          &.flag6 {
            justify-content: space-between;
          }
          padding-left: .85rem;
          padding-right: .8rem;
          .item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 1.85rem;
            align-items: center;
            img {
              width: 1.17rem;
              height: 1.24rem;
            }
            span {
              font-size: .26rem;
              font-weight: 400;
              color: rgba(244, 131, 73, 1);
            }
          }
        }
        .btn {
          width: 3.28rem;
          height: .87rem;
          left: 50%;
          transform: translateX(-50%);
          &.btn-yellow {
            background: url("../images/pop/btn_yellow.png");
            background-size: 100% 100%;
            bottom: 1.9rem;
            &.flag3, &.flag7,&.flag11, &.flag8, &.flag9, &.flag8, &.flag10 {
              bottom: 3rem;
            }
            &.flag6, &.flag5 {
              bottom: 1.6rem;
            }
          }
          position: absolute;
          line-height: .7rem;
          text-align: center;
          font-size: .26rem;
          font-weight: bold;
          color: rgba(144, 79, 34, 1);
          padding-bottom: .2rem;
          box-sizing: border-box;
          &.btn-pink {
            background: url("../images/pop/btn_pink.png");
            background-size: 100% 100%;
            bottom: 2rem;
            color: rgba(255, 210, 217, 1);
          }
        }
        .info {
          position: absolute;
          bottom: 1.4rem;
          left: 0;
          right: 0;
          text-align: center;
          font-size: .18rem;
          font-weight: 400;
          color: #3f1207;
          line-height: .3rem;
          i {
            color: #CF5E20;
          }
        }
        .info1 {
          position: absolute;
          bottom: 2.75rem;
          left: 0;
          right: 0;
          text-align: center;
          font-size: .3rem;
          font-weight: 400;
          color: rgba(255, 98, 53, 1);
          line-height: .3rem;
        }
      }
      .close-icon {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../pages/images/common/close.png") no-repeat center
          center / 100% 100%;
        margin: 0.4rem auto 0;
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
