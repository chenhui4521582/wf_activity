<template>
  <article class="rule">
    <div class="rule-icon" @click.stop="showPop()">
      规则
    </div>
    <transition name="mask">
      <section class="pop-wrapper" v-show="isShowPop">
        <div class="mask"></div>
        <div class="content-wrapper">
          <div class="content">
            <div class="title">活动规则</div>
            <p>
              1、活动时间：{{info.startDate}} 至 {{info.endDate}}
            </p>
            <p>
              2、活动期间，完成充值礼包即有机会获取礼包奖励，若多个充值礼包可以形成Bingo即可领取Bingo奖励，Bingo奖励需手动领取；
            </p>
            <p>
              3、Bingo规则：
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.横向连续三个礼包全部获得即可形成一个Bingo;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.竖向连续三个礼包全部获得即可完成一个Bingo；
            </p>
            <p>
              4、完成所有Bingo，即可获得最终大奖，需手动领取；</p>
            <p>
              5、再来一次Bingo：<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;清空目前所有已购买的礼包状态，可以重新进行充值，并领取Bingo奖励；
            </p>
            <p>
              6、以上所有奖励请在{{info.showEndDate}}前完成领取，过期不予领取。
            </p>
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
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isShowPop: false
    }
  },
  methods: {
    showPop () {
      GLOBALS.marchSetsPoint('A_H5PT0311003866') // H5平台-bingo冲冲冲页面-点击活动说明
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
    right: 0;
    top: 0.3rem;
    font-weight: bold;
    color: #fff;
    background: #ff742f;
    width: 0.7rem;
    line-height: 0.4rem;
    padding-left: 0.1rem;
    box-sizing: border-box;
    border-radius: 0.2rem 0 0 0.2rem;
  }
  .pop-wrapper {
    .content-wrapper {
      .content {
        .title {
          height: 1.14rem;
          line-height: 1.14rem;
          text-align: center;
          font-size: 0.36rem;
          margin-bottom: 0.2rem;
        }
        padding: 0 0.5rem;
        height: 7.92rem;
        background: url(./img/rule-pop.png) no-repeat center center;
        background-size: 100% 100%;
        box-sizing: border-box;
        line-height: 0.36rem;
        p {
          margin-top: 0.04rem;
        }
      }
    }
  }
}
</style>
