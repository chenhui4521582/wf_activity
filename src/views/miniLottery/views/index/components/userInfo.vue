<template>
  <div class="user-info">
    <div class="leaf">
      <div class="name">金叶子</div>
      <div class="value">{{userInfo.leafs | amountComputen}}</div>
    </div>
    <div class="phone">
      <div class="name">话费</div>
      <div class="value">{{userInfo.phoneScrap / 10 | amountComputen}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'userInfo',
  props: {
    userInfo: {
      type: Object,
      default: ()=> ({})
    }
  },
  methods: {
    goExchange() {
      let APP_CHANNEL = localStorage.getItem('APP_CHANNEL')
      if(['100069','100070','100073','100075','100080','100055','100068','100045'].includes(APP_CHANNEL)) {
        window.location.href = `https://wap.beeplaying.com/xmWap/#/mall/details?accountBalance=0.2&phyAwardsType=46&phyAwardsId=836&name=50%E5%A4%BA%E5%AE%9D%E5%8D%A1%E5%88%B8&channel=${localStorage.getItem('APP_CHANNEL')}`
      }else {
        window.location.href = `https://wap.beeplaying.com/activities/billshop.html#/detail?from=bdWap&phyAwardsType=46&phyAwardsId=836&showOut=1&channel=${localStorage.getItem('APP_CHANNEL')}`
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .user-info {
    margin-left: 1rem;
    display: flex;
    justify-content: flex-start;
    width: 5.3rem;
    height: .56rem;
    font-size: .24rem;
    color: #F1303D;
    background: url(../img/user-bg.png) no-repeat center top / 100% 100%;

    .leaf {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 2.58rem;
      height: .56rem;
      line-height: .58rem;
      box-sizing: border-box;
    }
    .phone {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: .56rem;
      line-height: .58rem;
      .name {
        width: .9rem;
      }
    }
    .name {
      padding-left: .2rem;
      font-size: .24rem;
      color: #AD4E54;
      font-weight: bold;
      width: 1rem;
      white-space: nowrap;
      box-sizing: border-box;
    }
    .value {
      box-sizing: border-box;
      padding-left: .1rem;
      font-size: .24rem;
      color: #F1303D;
      font-weight: 500;
    }
  }
</style>