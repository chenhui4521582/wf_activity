<template>
  <div class="rule" v-if="value">
    <div class="mask"></div>
    <div class="center">
      <div class="title">规则须知</div>
      <div class="wrap">
        1.攻略公示<br>
        通过审核的攻略均展示在此页面。<br>
        2.点赞<br>
        每位玩家都可以给喜欢的攻略点赞（可点赞自己的攻略)，每条攻略限点赞1次。<br>
        3.排行榜<br>
        排行榜持续14天，依据攻略点赞数量排名，若点赞量相同，则优先达成的攻略排名在前。排行榜结束次日，将通过站内信发放奖励，玩家需手动领取。奖励配置如下：<br>
        第1~3名       金叶子+头像框+猫道具  <br>
        第4~50名     金叶子+头像框<br>
        第50+名       金叶子<br>
        (金叶子奖励额度与排名相关)
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
    }
  },
  methods: {
    hide() {
      this.$emit('input', false)
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
    width: 4.6rem;
    height: 5.8rem;
    z-index: 2;
    background: #B43131;
    border-radius: .32rem;
    transform: translate(-50%, -50%);
    .title {
      margin-top: .2rem;
      text-align: center;
      font-size: .32rem;
      color: #fff;
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