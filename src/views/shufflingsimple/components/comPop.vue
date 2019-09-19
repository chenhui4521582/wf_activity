<template>
  <section :class="getClassName('rule')" :style="{zIndex:isShowPop?2:2}">
    <div class="pop-mask" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop">
        <div :class="getClassName('wrap')" @click="close(from)">
          <template v-if="from!=1">
            <div :class="getClassName('btn btn-yellow')" @click="btnyellowclick">
            </div>
            <div :class="getClassName('product-img')">
              <!--<div class="item" v-for="item in carddata">-->
                <!--<img src="../images/jd.png" alt="" v-if="item.awardsType=='jdk'">-->
                <!--<img src="../images/huafei.png" alt="" v-if="item.awardsType=='hfq'">-->
                <!--<img src="../images/fish.png" alt="" v-if="item.awardsType=='yg'">-->
                <!--<img src="../images/leaf.png" alt="" v-if="item.awardsType=='jyz'">-->
                <!--<img src="../images/card.png" alt="" v-if="item.awardsType=='fbk'">-->
                <!--<span>{{item.awardsName}}</span>-->
              <!--</div>-->
              <div class="item">
                <img src="./images/pop/fee.png" alt="">
                <!--<img src="./images/pop/leaf.png" alt="">-->
                <span>33333</span>
              </div>
            </div>
            <div class="info">
              <!--很遗憾，<br>您与大奖擦肩而过~-->
              恭喜您中奖啦！
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
        if (this.from == 2) {//立即去翻牌
          this.$emit('close', 0)
          GLOBALS.marchSetsPoint('A_H5PT0156001799')//H5平台-翻牌活动-弹窗反馈-翻牌场次升级弹窗-立即去翻牌点击
        } else if (this.from == 3) {//去充值得翻牌点
          this.$emit('close', 0)
          GLOBALS.marchSetsPoint('A_H5PT0156001796')//H5平台-翻牌活动-弹窗反馈-翻牌点不够弹窗-去充值得翻牌点点击
          this.$emit('package')
        } else if (this.from == 4) {//继续翻牌
          this.$emit('close', 0)
          GLOBALS.marchSetsPoint('A_H5PT0156001782')//H5平台-翻牌活动-弹窗反馈-正常奖励弹窗-继续翻牌
        } else if (this.from == 5) {//继续翻牌
          this.$emit('close', 0)
          GLOBALS.marchSetsPoint('A_H5PT0156001786')//H5平台-翻牌活动-弹窗反馈-翻倍开出奖励弹窗-继续翻牌
        } else if (this.from == 6) {//继续翻牌
          this.$emit('close', 0)
          GLOBALS.marchSetsPoint('A_H5PT0156001784')//H5平台-翻牌活动-弹窗反馈-获得翻倍卡弹窗-继续翻牌
        } else if (this.from == 7||this.from == 11) {//放弃翻倍卡
          GLOBALS.marchSetsPoint('A_H5PT0156001790')//H5平台-翻牌活动-弹窗反馈-重置提醒弹窗-放弃翻倍卡点击
          this.$emit('sureCard',this.from==7?1:2)//true 重置 false 升级场次
          if(this.from == 7){
            this.$emit('close', 0)
          }
        } else if (this.from == 8) {//去充值得翻牌点
          this.$emit('close', 0)
          this.$emit('package')
        }else if (this.from == 9) {//我要升级
          this.$emit('close', 0)
          this.$emit('sureGrade')
        }else{//我要升级
          this.$emit('close', 0)
          this.$emit('sureGrade')
        }
      },
      btnpinkclick() {
        if (this.from == 3) {//去玩游戏得牌点
          GLOBALS.marchSetsPoint('A_H5PT0156001797')//H5平台-翻牌活动-弹窗反馈-翻牌点不够弹窗-去玩游戏得翻牌点点击
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
        } else if (this.from == 7||this.from ==11) {//继续翻牌
          this.$emit('close', 0)
          GLOBALS.marchSetsPoint('A_H5PT0156001791')//H5平台-翻牌活动-弹窗反馈-重置提醒弹窗-继续翻牌点击
        } else if (this.from == 8) {//去玩游戏得牌点
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
        }else if (this.from == 9) {//我再想想
          this.$emit('close', 0)
        }else if (this.from == 10) {//我再想想
          this.$emit('close', 0)
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
    top: 2.27rem;
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
        padding: 2.9rem 0.2rem 0;
        width: 7.2rem;
        height:8.26rem;
        background: url("./images/pop/bg.png") no-repeat center center /
        100% 100%;
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
          top: 2.7rem;
          left: 2rem;
          right: 2.15rem;
          text-align: center;
          font-size: .18rem;
          font-weight: 400;
          color: #3f1207;
          line-height: .3rem;
          height: 2.6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item {
            display: flex;
            flex-direction: column;
            justify-content:space-between;
            width: 100%;
            height: 2.6rem;
            align-items: center;
            img {
              height: 1.6rem;
            }
            span {
              width: 1.81rem;
              height: .48rem;
              line-height:.48rem;
              font-size: .32rem;
              font-weight: 400;
              color:rgba(255,251,172,1);
              background: url("./images/pop/txtname.png");
              background-size: 100% 100%;
              overflow: hidden;
            }
          }
        }
        .btn {
          width: 4.9rem;
          height: 1.06rem;
          left: 50%;
          transform: translateX(-50%);
          &.btn-yellow {
            background: url("./images/pop/btn.png");
            background-size: 100% 100%;
            top: 6.43rem;
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
            background: url("./images/pop/btn.png");
            background-size: 100% 100%;
            bottom: 2rem;
            color: rgba(255, 210, 217, 1);
          }
        }
        .info {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          right: 2.15rem;
          text-align: center;
          font-size: .28rem;
          font-weight: 400;
          color: #ffffff;
          height: .8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: .4rem;
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
      /*.close-icon {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../pages/images/common/close.png") no-repeat center
          center / 100% 100%;
        margin: 0.4rem auto 0;
      }*/
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
