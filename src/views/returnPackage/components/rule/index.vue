<template>
  <article class="rule">
    <div class="rule-icon" @click.stop="showPop()">
      <img src="./img/rule-icon.png" alt="">
    </div>
    <transition name="mask">
      <section class="pop-wrapper" v-show="isShowPop">
        <div class="mask"></div>
        <div class="content-wrapper">
          <div class="content">
            1.活动<span>持续5天</span>，活动入口开放6天；<br />
            2.每日签到可获得金叶/游戏道具，不可补签；<br />
            3.完成每日任务领取积分，每日任务每天0点重置，<span>积分在活动期内不重置，进行累加，达到一定额度后可领取话费奖励；</span><br />
            4.以下游戏消耗金叶会被计入每日任务进度中：<br />
            欢乐竞技台球、糖果萌消消、王者弹珠、街机欢乐捕鱼、三国大作战、众神风云、欢乐的小鸟、深海探一探、斗西游、破晓方块消消乐<br />
            5.超值礼包<span>四选一</span>，且<span>仅可购买1次</span>，加赠的优惠券购买后立即到账，<span>加赠金叶自购买次日起，连续5天进行发放，登陆即可领取</span>（未登录，则当日加赠金叶领取失败）<br />
            6.活动结束后，会预留1天时间，请领取积分奖励，逾期入口关闭，奖励不可再领取。<br />
          </div>
          <div class="close-icon" @click="closePop()">
            <img src="../../img/close-icon.png" alt="">
          </div>
        </div>
      </section>
    </transition>
  </article>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'rule',
  components: {

  },
  data () {
    return {
      isShowPop: false
    }
  },
  methods: {
    showPop () {
      GLOBALS.marchSetsPoint('A_H5PT0074001436')
      this.isShowPop = true
    },
    closePop () {
      this.isShowPop = false
    }
  }
}
</script>

<style lang="less" scoped>
.rule {
  .rule-icon {
    position: absolute;
    top: 0.12rem;
    right: 0.06rem;
    width: 0.82rem;
    height: 1.06rem;
  }
  .pop-wrapper {
    .content-wrapper {
      .content {
        padding: 1.58rem 0.78rem 0;
        height: 9.42rem;
        background: url(./img/rule-popup.png) no-repeat center center;
        background-size: 100% 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
