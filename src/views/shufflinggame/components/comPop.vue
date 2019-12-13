<template>
  <!--1.排行榜已发榜fail 2.排行榜已发榜success 3.翻倍点不足 4.正常奖励 5.翻倍开出 6.获得翻倍卡 7.重置-翻倍卡-提醒弹窗 8.新的翻牌点 待领取-->
  <section :class="getClassName('rule')" :style="{zIndex:isShowPop?2:2}">
    <div class="pop-mask" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop">
        <div :class="getClassName('wrap')" @click="close(from)">
          <div class="title">
            <template v-if="[1,2].includes(from)">
              排行榜已发榜
            </template>
            <template v-else-if="from==3">
              非常抱歉
            </template>
            <template v-else-if="[4,5,6,9].includes(from)">
              恭喜获得
            </template>
            <template v-else-if="from==7">
              温馨提示
            </template>
            <template v-else-if="from==8">
              恭喜您
            </template>
          </div>
          <div :class="getClassName('container')">
            <template v-if="from==1">
              <img src="../images/pop/sad.png" alt="">
            </template>
            <template v-if="from==3">
              你的翻牌点暂时<br>不够抽奖哦！
            </template>
            <template v-else-if="from==7">
              您有一张翻倍卡未使用<br>是否重新洗牌？
            </template>
            <template v-else-if="from==8">
              您有新的翻牌点<br>待领取
            </template>
            <div :class="getClassName('product-img')" v-if="[2,4,5,6,9].includes(from)">
              <div class="item" v-for="(item,index) in carddata">
                <div class="img_bg" :class="{double:item.doubleState}">
                  <img :src="`${require(`../images/${item.awardsType}.png`)}`" alt="" v-if="item.awardsType!='fbk'">
                  <img :src="`${require(`../images/${item.awardsType}${level}.png`)}`" alt="" v-else>
                </div>
                <span>
                  {{item.awardsName}}
                  <i v-if="from==6" :class="{second:index==1}">
                    <br><template v-if="level==2">（限中级场使用）</template><template v-if="level==3">（限高级场使用）</template>
                  </i>
                </span>
              </div>
            </div>
          </div>
          <div class="tips" v-if="from==1">您暂<i>未上榜</i>，下次继续加油哟~</div>
          <div class="tips" v-if="from==2">恭喜您获得<i>{{rank}}</i>名，获得以上奖励</div>
          <div class="tips" v-if="from==4">继续翻牌可获得更多奖励</div>
          <div class="tips" v-if="from==5">翻倍卡生效，<i>奖励翻倍</i></div>
          <div class="tips" v-if="from==6">继续翻出奖品<i>奖励x2</i></div>
          <div class="tips" v-if="from==9">加赠点数将自动到账</div>
          <template>
            <div :class="getClassName('btn btn-yellow')" @click="btnyellowclick">
            </div>
            <div :class="getClassName('btn btn-pink')" v-if="[3,7].includes(from)" @click="btnpinkclick">
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
      carddata: {
        type: Array,
        default: []
      },
      rank: {
        type: Number,
        default: 0
      },
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
        this.$emit('close', flag)
      },
      getClassName(name) {
        if (this.from) {
          return `${name} flag${this.from}`
        } else {
          return name
        }
      },
      btnyellowclick() {
        if (this.from ==1||this.from == 2) {//好的
          this.$emit('close', 0)
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
        } else if (this.from == 7 || this.from == 11) {//放弃翻倍卡
          GLOBALS.marchSetsPoint('A_H5PT0156001790')//H5平台-翻牌活动-弹窗反馈-重置提醒弹窗-放弃翻倍卡点击
          this.$emit('sureCard', this.from == 7 ? 1 : 2)//true 重置 false 升级场次
          if (this.from == 7) {
            this.$emit('close', 0)
          }
        } else if (this.from == 8) {//立即查看
          this.$emit('close', 0)
          GLOBALS.marchSetsPoint('A_H5PT0156002616')
          this.$emit('downpackage')
        }
      },
      btnpinkclick() {
        if (this.from == 3) {//去玩游戏得牌点
          GLOBALS.marchSetsPoint('A_H5PT0156002612')//H5平台-翻牌活动-弹窗反馈-翻牌点不够弹窗-去玩游戏得翻牌点点击
          // location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
          this.$emit('close', 0)
          this.$emit('gotoplay')
        } else if (this.from == 7 || this.from == 11) {//继续翻牌
          this.$emit('close', 0)
          GLOBALS.marchSetsPoint('A_H5PT0156001791')//H5平台-翻牌活动-弹窗反馈-重置提醒弹窗-继续翻牌点击
        } else if (this.from == 8) {//去玩游戏得牌点
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
        } else if (this.from == 9) {//我再想想
          this.$emit('close', 0)
        } else if (this.from == 10) {//我再想想
          this.$emit('close', 0)
        }
      }
    },
    mounted() {
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
      } else if (this.from == 7 || this.from == 11) {//重置弹窗
        GLOBALS.marchSetsPoint('A_H5PT0156001789')//H5平台-翻牌活动-弹窗反馈-重置提醒弹窗加载完成
      } else if (this.from == 8) {//抱歉不能升级
        //GLOBALS.marchSetsPoint('A_H5PT0156001776')
      } else if (this.from == 9) {//是否升级中级场
        // GLOBALS.marchSetsPoint('A_H5PT0156001789')
      } else {//是否升级高级场
        // GLOBALS.marchSetsPoint('A_H5PT0156001789')
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "../../../common/css/base.css";
  .rule {
    position: fixed;
    top: 40%;
    margin-top: -3.34rem;
    left: 50%;
    margin-left: -2.86rem;
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
          font-size: 0.54rem;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          font-weight: 400;
          color: rgba(255, 230, 173, 1);
          background: linear-gradient(0deg, rgba(254, 222, 87, 1) 0%, rgba(254, 252, 201, 1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .container {
          height: 2.65rem;
          margin-bottom: .2rem;
          position: relative;
          &.flag1{
            img{
              width: 1.73rem;
              height: 1.85rem;
            }
          }
          &.flag3, &.flag7{
            height: 2.05rem;
          }
          &.flag1,&.flag3, &.flag7,&.flag8{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .36rem;
            font-weight: 800;
            color: rgba(255, 255, 255, 1);
            line-height: .6rem;
            text-align: center;
          }
        }
        .tips{
          text-align: center;
          margin-bottom: .15rem;
          font-size:.24rem;
          font-weight:800;
          color:rgba(250,211,102,1);
          i{
            color: #FFFFFF;
          }
        }
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
        padding: 1.15rem .75rem .6rem 1rem;
        width: 5.72rem;
        height: 6.68rem;
        background: url("../images/pop/pop.png") no-repeat center center /
        100% 100%;
        &.flag3,&.flag7 {
          padding: 1.1rem .75rem .6rem 1rem;
          width: 5.72rem;
          height: 6.68rem;
          background: url("../images/pop/sorry/bg.png") no-repeat center center /
        100% 100%;
        }
        &.flag4, &.flag5, &.flag6 {
          padding: 1.1rem .75rem .6rem 1rem;
          width: 5.72rem;
          height: 6.68rem;
          background: url("../images/pop/pop.png") no-repeat center center /
        100% 100%;
        }
       /* &.flag11 {
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
        }*/
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
          text-align: center;
          font-size: .18rem;
          font-weight: 400;
          color: #3f1207;
          line-height: .3rem;
          height:100%;
          display: flex;
          justify-content: center;
          padding-left: .15rem;
          padding-right: .15rem;
          &.flag6,&.flag9{
            justify-content: space-between;
          }
          .item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 1.85rem;
            align-items: center;
            .img_bg{
              width: 1.76rem;
              height: 1.76rem;
              background: url("../images/img_bg.png");
              background-size: 100% 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              &.double:before{
                content: '';
                position: absolute;
                width: 1.01rem;
                height: 1.15rem;
                background: url("../images/icon.png");
                background-size: 100% 100%;
                right: 0;
                top: 0;
              }
              img {
                width: 1.28rem;
                height: 1.28rem;
              }
            }
            span {
              margin-top: .09rem;
              font-size: .24rem;
              font-weight: 800;
              color:rgba(253,243,94,1);
              i{
                font-size: .2rem;
                color: #F59988;
                opacity: 0;
                &.second{
                  opacity: 1;
                }
              }
            }
            &:nth-child(2) .img_bg{
              position: relative;
              &:before{
                content: '';
                position: absolute;
                width: .5rem;
                height: .5rem;
                background: url("../images/plus.png");
                background-size: 100% 100%;
                left:-.3rem;
                top: .7rem;
                z-index: 2;
              }
            }
          }
        }
        .btn {
          width: 3.28rem;
          height: .87rem;
          margin: auto;
          &.btn-yellow {
            &.flag1,&.flag2 {
              width: 2.28rem;
              height: .78rem;
              background: url("../images/pop/ok.png");
              background-size: 100% 100%;
            }
            &.flag3 {
              width: 3.68rem;
              height: .78rem;
              background: url("../images/pop/pay_package_btn.png");
              background-size: 100% 100%;
            }
            &.flag7{
              width: 2.28rem;
              height: .78rem;
              background: url("../images/pop/btn_yellow.png");
              background-size: 100% 100%;
            }
            &.flag8{
              width: 2.28rem;
              height: .78rem;
              background: url("../images/pop/check.png");
              background-size: 100% 100%;
            }
            &.flag4,&.flag5,&.flag6,&.flag9{
              width: 2.28rem;
              height: .78rem;
              background: url("../images/pop/btn_pink.png");
              background-size: 100% 100%;
            }
            &.flag11, &.flag8, &.flag9, &.flag8, &.flag10 {
              bottom: 3rem;
            }
            &.flag6, &.flag5 {
              bottom: 1.6rem;
            }
          }
          &.btn-pink {
            margin-top: .12rem;
            width: 3.68rem;
            height: .78rem;
            background: url("../images/pop/play_btn.png");
            background-size: 100% 100%;
            &.flag7{
              width: 2.28rem;
              height: .78rem;
              background: url("../images/pop/btn_pink.png");
              background-size: 100% 100%;
            }
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
        margin:0 auto;
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
