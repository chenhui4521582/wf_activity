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
              一、活动时间：2020年10月25日0点至2020年10月29日24点<br />
              二、除【起点】以外，地图共有36格，每个格子都有相应的事件、奖励、惩罚；地图最后一格准备了【秘宝】，但只有恰好落到该格子上才能领取奖励，否则只能根据投掷的点数折回，直到解锁该奖，玩家解锁【秘宝】后，则会回到起点，开始新的一轮。<br />
              如：在【35】格投到【3】点，则会前进【1】格到【36】格，然后再后退【2】格至【34】格<br />
              三、普通探宝——每次消耗【1】枚骰子；超级探宝——每次消耗【10】枚骰子。玩家的招财猫根据投掷的点数移动，触发格子上的事件，并得到相对应的奖励或是惩罚。<br />
              四、通过玩游戏达成流水梯度或购买礼包可获取骰子，骰子每日清零，请记得及时使用。玩家在每个格子上获取的奖励都自动发放到账户，可以在【历史记录】中查看获奖记录等信息。<br />
              五、每天0点，会根据玩家前一日获取的骰子排行，前15名玩家可获得丰厚的奖励，奖励自动发放到玩家游戏账户，玩家可以在个人中心查看榜单奖励。<br />
              六、流水计入活动的游戏包括：欢乐竞技台球、街机欢乐捕鱼、糖果萌消消、三国大作战、欢乐的小鸟、深海探一探、王者弹珠、众神风云、福满多、斗西游、天使之战。
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
  name: '',
  components: {

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
          background: url(./img/pop-title-bg.png) #f27d27 no-repeat center
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
          color: #d85c02;
        }
      }
      .close-icon {
        width: 0.6rem;
        height: 0.6rem;
        background: url('./img/close.png') no-repeat center center;
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
