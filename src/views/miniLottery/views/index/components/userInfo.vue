<template>
  <div class="user-info">
    <div class="leaf">
      {{userInfo.leafs | amountComputen}}
    </div>
    <div class="phone">
      {{userInfo.phoneScrap / 10 | amountComputen}}
    </div>
    <div class="card-lottery" @click="goExchange">
      {{userInfo.cardAccount  | amountComputen}}
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
    padding: 0 0 0 1.45rem; 
    display: flex;
    justify-items: flex-start;
    font-size: .24rem;
    color: #F1303D;
    height: .56rem;
    background: url(../img/user-bg.png) no-repeat center top / 100% 100%;
    .leaf {
      margin-right: .85rem;
      width: 1.1rem;
      height: .56rem;
      line-height: .56rem;
    }
    .phone {
      margin-right: 1.05rem;
      width: 1.1rem;
      height: .56rem;
      line-height: .56rem;
    }
    .card-lottery {
      width: 1.1rem;
      height: .56rem;
      line-height: .56rem;
      background: url(../img/add-icon.png) no-repeat right center / .28rem .28rem;
    }
  }
</style>