<template>
  <section class="rule">
    <div class="rule-icon" @click="showRule"></div>
    <transition name="scalc">
      <section class="pop-up-wrapper" v-show="isShowRule">
        <div class="mask"></div>
        <div class="content-wrapper">
          <div class="content">
            <div class="title">
              玩法介绍
            </div>
            <div class="container">
              <p>一、活动时间：{{actInfo.timeline}}；
              </p>
              <p>
                二、活动期间，在指定游戏内达成<span>流水梯度或购买活动礼包可获取骰子</span>，通过投掷控制招财猫移动，触发地图上的奖励或惩罚，除[起点]外，地图共有36个格子，最后一格藏有超级宝藏，有机会开出惊喜大奖。只有<span>恰好落在终点的格子才能获取奖励，否则只能根据多出的点数折回。</span>玩家解锁终点超级宝藏后，则会返回起点，开始新的一轮。
              </p>
              <p>例如：在[35]格投出3点，则会前进1格到[36]格，然后再后退2格至[34]格，知道解锁终点超级宝藏。
              </p>
              <p>
                三、每天获取的骰子会参与[骰子之神]排行榜的竞争，每天0点，<span>根据玩家前一日获取的骰子数量排行，</span>前15名玩家可以获得丰厚的奖励，奖励自动发放，可在个人中心查看获奖记录。
              </p>
              <p>
                四、<span>玩家每天获取的骰子数量和流水梯度会在24点清空，同时招财猫的位置也将回到起点，</span>请及时参与游戏。玩家在每个格子上获取的奖励也将自动发放，可在[历史记录]中查看详情。
              </p>
              <p>活动奖励如下：
              </p>
              <p>话费券、京东券、金叶子、充值优惠券、斗地主记牌器、斗地主超级加倍、街机捕鱼冰冻、街机捕鱼锁定等道具。
              </p>
              <p>
                五、流水计入活动的游戏包括：欢乐竞技台球、街机欢乐捕鱼、糖果萌消消、三国大作战、欢乐的小鸟、深海探一探、王者弹珠、众神风云、破晓方块消消乐、斗西游、天使之战、疯狂炸弹人。
              </p>
            </div>
          </div>
          <div class="close-icon" @click="closeRule()"></div>
        </div>
      </section>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'rule',
  components: {

  },
  props: {
    actInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isShowRule: false
    }
  },
  mounted () {

  },
  methods: {
    showRule () {
      this.isShowRule = true
      GLOBALS.marchSetsPoint('A_H5PT0345004346') // H5平台-欢乐大富翁-玩法弹窗加载完成
    },
    closeRule () {
      this.isShowRule = false
    }
  }
}
</script>

<style lang="less" scoped>
.rule {
  .rule-icon {
    position: fixed;
    width: 0.86rem;
    height: 0.94rem;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    z-index: 3;
    top: 2rem;
    right: 0.06rem;
    background-image: url(./img/rule-icon.png);
  }
  .pop-up-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: 9;
    .mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
    }
    .content-wrapper {
      width: 5.78rem;
      height: 6.68rem;
      position: fixed;
      margin: 0 auto;
      z-index: 1;
      box-sizing: border-box;
      font-size: 0.3rem;
      left: 50%;
      top: 50%;
      margin-top: -3.34rem;
      margin-left: -2.89rem;
      .content {
        border-radius: 0.2rem;
        height: 6.68rem;
        background: #feda89;
        .title {
          height: 0.9rem;
          font-size: 0.48rem;
          line-height: 0.84rem;
          color: #ffeec8;
          text-align: center;
          background: url(../../img/pop-title-bg.png) #f27d27 no-repeat center
            center;
          background-size: 4.9rem 0.54rem;
          border-radius: 0.2rem 0.2rem 0 0;
          font-weight: bold;
          position: relative;
        }
        .container {
          height: calc(~'100%' - 0.9rem);
          box-sizing: border-box;
          overflow-x: hidden;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          padding: 0.36rem;
          color: #986900;
          p {
            margin-bottom: 0.12rem;
            line-height: 0.48rem;
            span {
              font-weight: bold;
              color: #d85c02;
            }
          }
        }
      }
      .close-icon {
        width: 0.6rem;
        height: 0.6rem;
        background: url('../../img/close.png') no-repeat center center;
        background-size: 100% 100%;
        margin: 0.4rem auto;
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
