<template>
  <div class="rule" v-if="isRule">
    <div class="mask"></div>
    <div class="container">
      <div class="header">
        活动规则
        <div class="closed" @click="hideRule"></div>
      </div>
      <div class="rule-text">
        <p>1.充值任意金额可获得随机数量的福气值</p>
        <p>2.福气值排行榜累积7天结算一次，榜单实时刷新，奖励将于{{endTime | timeFormat}}自动发放至背包。</p>
        <p>3.活动时间: {{beforeTime | timeFormat('y-m-d')}} - {{endTime | timeFormat('y-m-d')}} </p>
        <p>4.该活动拍卖充值不计入排名</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'blessing-rule',
    props: {
	  isRule: {
	    type: Boolean,
        default: false
      },
	  endTime: {
	    default: ''
      },
	  beforeTime: {
	    default: ''
      }
    },
    methods: {
	  hideRule () {
	    this.$emit('hideRule', 'rule')
      }
    }
  }
</script>

<style scoped lang="less">
.rule{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.54);
  }
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5.97rem;
    height: 5.5rem;
    background:rgba(39,45,159,1);
    border-radius:12px;
    transform: translate(-50%, -50%);
    z-index: 10;
    color: #fff;
    overflow: hidden;
    .header {
      background: #506BE4;
      position: relative;
      text-align: center;
      height: .69rem;
      line-height: .69rem;
      color: #0A1194;
      font-size: .4rem;
      .closed {
        position: absolute;
        width: .48rem;
        height: .48rem;
        right: .22rem;
        top: .1rem;
        background: url("../images/closed.png") no-repeat center center / 100% 100%;
      }
    }
    .rule-text {
      padding: .25rem .38rem;
      p {
        padding-bottom: .3rem;
        color: #FFFFFF;
        font-size: .3rem;
        line-height: .45rem;
      }
    }
  }
}
</style>
