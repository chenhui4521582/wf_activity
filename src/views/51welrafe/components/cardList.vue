<template>
  <div class="card-list">
    <div class="item" v-for="(item, index) in list" :key="index" @click="gotoPayCard(item, index)">
      <div class="item-img">
        <img :src="item.productIcon | filter" alt="">
      </div>
      <div class="item-name">{{item.content}}</div>
      <div class="item-btn">
        <img src="../img/buy-btn.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cardList',
  props: {
    list: Array,
    default: () => []
  },
  methods: {
    gotoPayCard(item, index) {
      let channel = localStorage.getItem('APP_CHANNEL')
      let originDeffer = `//wap.beeplaying.com/activities/51welrafe.html?channel=${channel}&blindBox=true`
      localStorage.setItem('payment', JSON.stringify(item))
      localStorage.setItem('originDeffer', originDeffer)
      window.location.href="//wap.beeplaying.com/xmWap/#/payment/paymentlist"
    }
  }
}
</script>
<style lang="less" scoped>
.card-list {
  padding: 0 .4rem;
  height: 4.7rem;
  display: flex;
  justify-content: space-between;
  .item {
    .item-img {
      width: 1.74rem;
      height: 1.74rem;
    }
    .item-name {
      width: 1.74rem;
      white-space: nowrap;
      font-size: .2rem;
      font-weight: bold;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .item-btn {
      width: 1.74rem;
      height: .84rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>