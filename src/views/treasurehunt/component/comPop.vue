<template>
  <div class="mask" v-if="value">

    <div class="pop-bg" :class="[value==7?'big-pop-bg':'']">
      <div class="pop-title" v-if="value==1">活动规则</div>
      <div class="pop-title" v-if="value==2">中奖记录</div>
      <div class="pop-title" v-if="value==3">探宝成功!</div>
      <div class="pop-title" v-if="value==4">太棒了!</div>
      <div class="pop-title" v-if="value==5">很遗憾!</div>

      <div class="pop-title" v-if="value==6||value==7" :style="{marginBottom:value==7?0:''}">恭喜您!
      </div>
      <div class="pop-container"
           :class="{'super-pop-container':value==7,'scroll-norecord':userAwards.length==0&&value==2,flag1:value==1}">
        <!-- 活动规则 -->
        <template v-if="value==1">
          <p>1、活动时间：{{activityInfo.beginDate}}~{{activityInfo.endDate}}，共3天 </p>
          <p>2、活动期间，单笔充值每满10元额外获得1颗宝石，宝石用于探宝抽奖；</p>
          <p>3、每次探宝必中1个奖励，已抽中的奖励不会重复获得，参与10次可获得全部奖励，转盘结束； </p>
          <p>4、参与过程中，每次参与消耗的宝石数会随着转盘次数增加而进行递增； </p>
          <p>5、除稀有道具外，每轮抽奖的奖励由系统自动发放到账； </p>
          <p>6、1%金叶返利卡（稀有道具）： </p>
          <p>• 道具说明：平台将返利1%金叶，即返利玩家在返利卡生效期间游戏内消耗金叶总和的1%金叶；</p>
          <p>• 生效时间：领取返利卡后立即生效，有效时间为24小时； </p>
          <p>• 返利时间：返利卡失效后奖励由系统自动结算后发放至玩家帐户； </p>
          <p>• 系统返利结算可能稍有延迟，请您耐心等待； </p>
          <p>• 返利的金叶不计入盈利榜；</p>
          <p>• 以下游戏支持金叶计入活动：欢乐竞技台球，街机欢乐捕鱼，糖果萌消消，三国大作战，欢乐的小鸟，深海探一探，王者弹珠，众神风云 ，福满多，斗西游</p>
          <p>7、活动结束或抽完所有奖励后，剩余宝石自动作废；</p>
          <p>8、如有问题，请联系在线客服。</p>
        </template>
        <!-- 中奖记录 -->
        <template v-if="value==2">
          <ul class="prize-container">
            <li class="container-title">
              <div>抽奖时间</div>
              <div class="line"></div>
              <div>奖品名称</div>
            </li>
            <div class="scroll" :class="[userAwards.length==0?'scroll-norecord':'']">
              <li class="prize-list" v-for="(item,key) in userAwards" :key="key">
                <div class="left">{{item.createTime}}</div>
                <div class="right">{{item.awardsName}}</div>
              </li>
              <template v-if="userAwards.length==0">
                <img class="norecord" src="../images/compop/norecord.png"
                     alt="">
                <p class='norecord-tips'>无记录</p>
              </template>
            </div>

          </ul>
        </template>
        <!-- 探宝成功 -->
        <template v-if="value==3">
          <img class="prize-img" :src="`${require(`../images/compop/${prizeshow.awardsType}.png`)}`" alt/>
          <p class="congra-texts">恭喜您获得</p>
          <p class="prize-name">{{prizeshow.awardsName}}</p>
          <p class="expire-date" v-if="prizeshow.awardsType=='yhq'">(有效期3天)</p>
          <p class="tips">奖励可前往“我的”页面查看</p>
        </template>
        <!-- 太棒了（每次宝石与上次新增时） -->
        <template v-if="value==4">
          <img class="yellow-rock" src="../images/compop/yellowrock.png" alt/>
          <p class="congra-texts">恭喜您获得</p>
          <p class="prize-name">{{activityInfo.incrPropNum}}颗宝石</p>
          <div class="iknow" @click="close">我知道了</div>
        </template>
        <!-- 很遗憾 宝石数量不够 -->
        <template v-if="value==5">
          <img class="yellow-rock" src="../images/compop/yellowrock.png" alt/>
          <p class="congra-texts">
            还差一点宝石就<span style="font-size:0.38rem;color:#EA382B">可抽大奖!</span>
          </p>
          <div class="iknow" @click="goshop">去获取宝石</div>
          <p class="tips" style="margin-top: 0.25rem;">每充值10元就送1颗宝石哟~</p>
        </template>
        <!-- 恭喜您，获得金叶返利 -->
        <template v-if="value==6">
          <img class="jinyezi" src="../images/compop/jyz.png" alt="">
          <p class="congra-texts" style="margin-top: 0.2rem;">已获得</p>
          <p class="prize-name">{{state.rebateAmount}}金叶返利</p>
          <p class="tips" style="margin: 0.2rem auto 0rem;">
            系统结算预计需1小时，<br>请您耐心等待。<br>结算完成后返利将自动发送至账户</p>
        </template>
        <!-- 恭喜您，获得超级返利卡 -->
        <template v-if="value==7">
          <img class="fanlika" src="../images/compop/fanlika.png" alt="">
          <div class="fanli-texts">
            <p class="congra-texts" style="margin-top: 0.2rem;">获得</p>
            <p class="prize-name">1%超级返利卡</p>
          </div>
          <div class="fanli-tips">
            <p>返利卡开始生效，有效时间为<span>24小时</span>！在此期间，玩游戏消耗金叶越多，返利越高！</p>
            <p>返利卡失效后，系统自动结算返利卡生效期间<br>消耗金叶总和的1%金叶。</p>
          </div>
          <div style="margin-top: 0.5rem;" class="iknow" @click="gorule">更多了解返利卡>></div>
        </template>
      </div>
    </div>
    <div class="close" @click.stop="close">
      <img src="../images/close.png" alt/>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        click: true
      }
    },
    created() {
    },
    mounted() {
      console.log('this.value', this.value)
    },
    methods: {
      // 更多了解返利卡（跳转到规则）
      gorule() {
        this.$emit('input', 1)
      },
      // 去获取宝石
      goshop() {
        window.location.href = 'https://wap.beeplaying.com/xmWap/#/payment/'
        this.$emit('input', 0)
      },
      close() {
        this.$emit('input', 0)
        // 传父组件click开关 恢复click的值
        this.$emit('clickshow', this.click)
      },
      move (e) {
        e.preventDefault()
      }
    },
    props: {
      value: {
        type: Number,
        default: 0
      },
      prizeshow: {
        type: Object,
        value: {}
      },
      activityInfo: {
        type: Object,
        value: {}
      },
      state: {
        type: Object,
        value: {}
      },
      userAwards: {
        type: Array,
        value: []
      }
    }
  }
</script>
<style lang="less">
  @import "../../../common/css/base.css";
  @keyframes change {
    0% {
      -webkit-transform: scale(0);
      // scale:0
    }
    50% {
      -webkit-transform: scale(1.2);
    }
    100% {
      -webkit-transform: scale(1);
    }
  }

  @-webkit-keyframes change {
    0% {
      -webkit-transform: scale(0);
      // scale:0
    }
    50% {
      -webkit-transform: scale(1.2);
    }
    100% {
      -webkit-transform: scale(1);
    }
  }

  .mask {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    animation: change 0.4s linear;
    .pop-bg {
      background: url(../images/compop/compopbg.png) no-repeat;
      background-size: 100% 100%;
      width: 5.2rem;
      overflow: hidden;
      height: 6.7rem;
      margin: 1.6rem auto 0;
      &.big-pop-bg {
        background: url(../images/compop/bigpopbg.png) no-repeat;
        background-size: 100% 100%;
        width: 5.4rem;
        height: 8.22rem;
        margin: 1.6rem auto 0;
        overflow: hidden;
      }
      .pop-title {
        font-size: 0.36rem;
        font-weight: bold;
        color: rgba(115, 37, 1, 1);
        height: 1.1rem;
        line-height: 1.1rem;
        text-align: center;
        margin-bottom: .26rem;
        text-align: center;
      }
      .pop-container {
        width: 4.78rem;
        height: 4.66rem;
        overflow: auto;
        margin: 0 auto;
        &.scroll-norecord {
          overflow-y: hidden;
        }

        &::-webkit-scrollbar {
          width: 0.05rem;
          height: 0.05rem;
        }
        &::-webkit-scrollbar-thumb {
          background: rgba(220, 165, 96, 1);
          border-radius: 0.05rem;
        }
        .activity-rule {
          width: 4.7rem;
        }
        &.flag1 {
          p {
            font-size: .24rem;
            font-weight: 400;
            color: rgba(157, 82, 46, 1);
            line-height: .3rem;
          }
        }
        &.super-pop-container {
          width: 4.78rem;
          overflow: auto;
          margin: 0 auto;
          height: 6.4rem;
          position: relative;
        }
        & p {
          font-size: 0.24rem;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: rgba(255, 233, 165, 1);
        }
        & span {
          font-weight: bold;
          color: #ffcc5d;
          font-size: 0.24rem;
        }
        // 中奖记录
        .prize-container {
          height: 3.99rem;
          margin-top: 0.1rem;
          display: flex;

          flex-direction: column;
          align-items: center;
          .container-title {
            width: 4.51rem;
            height: 0.57rem;
            background: rgba(226, 114, 32, 1);
            display: flex;
            align-items: center;
            div {
              line-height: 0.57rem;
              text-align: center;
              font-size: 0.24rem;
              font-weight: 400;
              color: rgba(77, 37, 22, 1);
              &:first-child, &:last-child {
                flex: 1;
              }
            }
            .line {
              width: 1px;
              height: 0.31rem;
              background: rgba(4, 3, 0, 1);
            }
          }
          .scroll {
            height: 3.42rem;

            overflow: auto;
            &.scroll-norecord {
              overflow-y: hidden;
            }
            .norecord {
              display: block;
              width: 1.27rem;
              height: 1.27rem;
              margin-top: 0.89rem;
            }
            .norecord-tips {
              height: 0.22rem;
              font-size: 0.24rem;
              font-family: Alibaba PuHuiTi;
              font-weight: 400;
              color: rgba(150, 69, 11, 1);
              text-align: center;
              margin-top: 0.33rem;
            }
          }
          .prize-list {
            width: 4.51rem;
            height: 0.57rem;
            display: flex;
            justify-content: center;
            list-style: none;
            align-items: center;
            &:nth-child(odd) {
              background: rgba(224, 171, 113, 0.35);
            }
            &:nth-child(even) {
              background: rgba(255, 255, 255, 0.35);
            }
            div {
              text-align: center;
              flex: 1;
              font-size: 0.24rem;
              font-weight: 400;
              color: rgba(177, 105, 36, 1);
            }
          }
        }
        .prize-img {
          width: 2.54rem;
          height: 1.47rem;
          display: block;
          margin: 0.35rem auto 0;
        }
        .congra-texts {
          font-size: 0.38rem;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          color: #9D522E;
          margin-top: 0.37rem;
          text-align: center;
        }
        .prize-name {
          color: #EA382B;
          font-weight: bold;
          font-size: 0.38rem;
          text-align: center;
          white-space: nowrap;
          margin-top: 0.2rem;
        }
        .expire-date {
          text-align: center;
          font-size: 0.3rem;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: rgba(157, 82, 46, 1);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          top: 6.3rem;
        }
        .tips {
          margin: 0.7rem auto 0rem;
          text-align: center;
          font-size: 0.3rem;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: rgba(157, 82, 46, 1);
        }
        .yellow-rock {
          width: 1.6rem;
          height: 1.46rem;
          display: block;
          margin: 0.4rem auto 0;
        }
        .iknow {
          background: linear-gradient(0deg, rgba(244, 118, 42, 1), rgba(254, 208, 122, 1));
          box-shadow: 0px .04rem 0px 0px rgba(245, 107, 34, 0.41);
          border-radius: .15rem;
          width: 2.92rem;
          height: 0.6rem;
          font-size: 0.3rem;
          font-weight: bold;
          color: rgba(159, 16, 52, 1);
          text-align: center;
          line-height: 0.6rem;
          margin: 0.65rem auto 0;
        }
        // 恭喜您，获得金叶返利
        .jinyezi {
          width: 2.56rem;
          height: 1.48rem;
          display: block;
          margin: 0.3rem auto 0;
        }
        // 恭喜您获得超级返利卡

        .fanlika {
          width: 3.87rem;
          height: 3.87rem;
          display: block;
          margin: 0 auto;
          margin-top: -0.6rem;
        }
        .fanli-texts {
          position: absolute;

          left: 50%;
          top: 2rem;
          transform: translateX(-50%);
        }
        .fanli-tips {
          text-align: center;
          margin-top: 0.8rem;
          p {
            color: rgba(255, 241, 213, 1);
            font-size: 0.22rem;
            font-weight: bold;
            line-height: 0.3rem;
          }
          span {
            font-size: 0.22rem;
            color: #FFBC3B;
          }
        }
      }
    }
    .close {
      width: 0.6rem;
      height: 0.6rem;
      margin: 0.48rem auto;
      img {
        display: block;
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }
</style>
