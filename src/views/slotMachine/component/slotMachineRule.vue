<template>
  <div class="rule" v-if="value">
    <div class="mask"></div>
    <div class="wrapper">
      <div class="title">活动规则</div>
      <div class="content">
        1. 活动时间：{{userInfo.beginDate}}至{{userInfo.endDate}}<br>
        2. 活动奖励分为 个、十、百、千、万、十万、百万、7个数位，最高为“百万”位 <br>
        3. 玩家达成指定条件可以解锁下一数位的摇奖机会，每个数位可以随机摇出1-9任意一个数字 <br>
        4. 活动期间内，玩家每天可以根据摇到的数位及对应的数字来获得金叶奖励 <br>
        5. 当日最高奖励为“百万”位，玩家摇完“百万”位的数字后，则当天活动达到最高 <br>
        6. 奖励发放：用户在次日登录后，奖励会自动发放到账。如果活动期间内用户次日未登陆，则顺延。
        <p>7. 注意：如果玩家在{{userInfo.endDate}}活动结束后24小时内都未登陆，则视为放弃奖励。  </p>
      </div>
      <div class="close" @click="hide"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'slotMachine-rule',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      userInfo: {
        type: Object,
        default: () =>({})
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
.rule {
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
  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    width: 5.24rem;
    
  }
  .title {
    font-size: .36rem;
    color: #8DFFF6;
    text-align: center;
    width: 5.24rem;
    height: .86rem;
    line-height: .86rem;
    font-weight: bold;
    background: #01A194;
    border-radius: .16rem .16rem 0 0;
  }
  .content {
    background: #00B7A8;
    padding: .21rem .52rem .47rem .40rem;
    font-size: .22rem;
    color:#8DFFF6;
    line-height: .3rem;
    border-radius: 0 0 .16rem .16rem;
    p{
      color: #FFE04E;
    }
  }
  .close {
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translate(-50%, 0);
    width: .6rem;
    height: .6rem;
    background: url(../images/close-btn.png) no-repeat center center / 100% 100%;
  }
}
</style>
