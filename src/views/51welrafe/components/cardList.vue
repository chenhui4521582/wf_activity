<template>
  <div class="card-list">
    <div class="item" v-for="(item, index) in list" :key="index" @click="gotoPayCard(item, index)">
      <div class="item-img">
        <img :src="`${require(`../img/pic${index}.png`)}`" alt="">
      </div>
      <div class="item-name">{{item.content}}</div>
      <div class="item-btn">
       ￥{{item.price}}
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
      GLOBALS.marchSetsPoint('A_H5PT0278003323',{
        product_price: item.price
      })
      let channel = localStorage.getItem('APP_CHANNEL')
      let originDeffer = `//wap.beeplaying.com/activities/51welrafe.html?channel=${channel}&blindBox=true`
      localStorage.setItem('payment', JSON.stringify(item))
      localStorage.setItem('originDeffer', originDeffer)
      window.location.href="//wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true"
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
      height: 1.39rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .item-name {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 1.74rem;
      /*white-space: nowrap;*/
      font-size: .2rem;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
    .item-btn {
      width: 1.74rem;
      height: .84rem;
      background: url("../img/pay_btn.png");
      background-size: 100% 100%;
      font-size: .26rem;
      color:#c75e01;
      text-align: center;
      line-height: .84rem;
      font-weight: bold;
    }
  }
}
</style>
