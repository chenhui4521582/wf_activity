<template>
  <div class="rule" v-if="value">
    <div class="mask"></div>
    <div class="center">
      <div class="title">规则须知</div>
      <div class="wrap">
          活动时间：{{info.beginDate | formatTime('y:m:d h:m:s')}} - {{info.endDate | formatTime('y:m:d h:m:s')}} <br>
          1. 活动期间，玩家可以使用一定数量游戏币来刮不同种类的刮刮乐，刮刮乐可以100%刮出奖励； <br>
          2. 游戏币可以通过购买活动页面内礼包获得，重复购买可以重复获得； <br>
          3. 活动期间内，玩家在指定游戏中消耗金叶子数量达到一定值即可领取活动游戏币； （套圈、枪火英雄、麻将、斗地主、飞机大战、生肖大作战及斗西游不计入本次活动） <br>
          4. 活动期间，玩家使用兑换的刮刮卡可以刮出不同奖励，刮刮乐等级越高，刮出的奖励越好；<br>
          <a @click="openBetAward">点击查看奖励</a> <br>
          5. 活动结束后，根据活动期间累计获得的游戏币进行排名并发放排行奖励，有奖排行榜仅限前30名玩家进榜，排行榜奖励将直接发放，排行榜单会展示一天；<br>
          注意：活动结束后，未使用的游戏币将清零 活动结束后，未使用的刮刮卡作废
      </div>
      <div class="closed" @click="hide"></div>
    </div>
  </div>
  
</template>
<script>
export default {
  name: 'rule',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    hide() {
      this.$emit('input', false)
    },
    openBetAward () {
      this.$emit('input', false)
      this.$emit('openBetAward', false)
    }
  }
}
</script>
<style scoped lang="less">
*{
  box-sizing: border-box;
}
.rule{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0,0,0,.7)
  }
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5.89rem;
    height: 6.55rem;
    z-index: 2;
    background: #649FEF;
    border-radius: .2rem;
    border:3px solid #000;
    transform: translate(-50%, -50%);
    .title {
      overflow: hidden;
      height: .93rem;
      line-height: .93rem;
      text-align: center;
      font-size: .36rem;
      color: #fff;
      border-bottom:3px solid #000;
      background: #0150E1;
      border-radius: .1rem .1rem 0 0;
    }
    .wrap {
      margin-top:.32rem;
      padding: 0 .2rem;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      height: 4.6rem;
      color: #fff;
      line-height: .4rem;
      font-size: .24rem;
      a {
        color: #FFD941;
        text-decoration: underline;
      }
    }
  }
  .closed {
    position: absolute;
    left: 50%;
    bottom: -.93rem;
    z-index: 3;
    width: .6rem;
    height: .6rem;
    background: url(../img/close.png) no-repeat center center;
    background-size: 100% auto;
    transform: translate(-50%, 0);
  }
}
</style>