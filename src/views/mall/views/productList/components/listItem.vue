<template>
  <div class="list-item" @click="goProductDetail">
    <div class="title">{{item.label}}</div>
    <div class="goods-img">
      <img :src="item.picture | filter" alt="">
    </div>
    <div class="goods-name">
      {{item.name}}
    </div>
    <div class="goods-buy">
      {{item.purchaseNum }}人已买
    </div>
    <div class="goods-price">
      <span class="unit">¥</span>{{item.payPrice}}
    </div>
    <div class="buy-btn">
      购买
    </div>
    <!-- 售罄 -->
    <div class="sell-out" v-if="item.stock == 0">
      <img src="../img/sell-out.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'listItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goProductDetail() {
      GLOBALS.marchSetsPoint('A_H5PT0276003259', {
        product_price: this.item.payPrice,
        product_id: this.item.id,
        product_name: this.item.name
      })
      this.$router.push({
        name: 'productDetail',
        query: {
          name: encodeURIComponent(this.item.name)
        }
      })
    }
  }  

}
</script>
<style lang="less" scoped>
.list-item {
  position: relative;
  margin: 0 .19rem .19rem 0;
  width: 3.2rem;
  height: 4.3rem;
  background: #FFF4E6;
  border-radius:16px;
  &:nth-child(even) {
    margin-right: 0;
  }
  .title {
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    font-weight: bold;
    font-size: .24rem;
    color: #FFFEE9;
    background: url(../img/item-title.png) no-repeat center center;
    background-size: 2.6rem .4rem;
  }
  .goods-img {
    width: 100%;
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .goods-name {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: .2rem;
    padding: 0 .3rem;
    font-size: .28rem;
    color: #000;
    font-weight:bold;
    white-space: nowrap;
  }
  .goods-buy {
    margin-bottom: .2rem;
    padding-left: .3rem;
    font-size: .24rem;
    color: #888888;
  }
  .goods-price {
    margin-bottom: .2rem;
    padding-left: .3rem;
    font-size: .32rem;
    font-weight: bold;
    color: #FF4141;
    .unit {
      font-size: .24rem;
    }
  }
  .buy-btn {
    position: absolute;
    right: .3rem;
    top: 3.7rem;
    width: .9rem;
    height: .42rem;
    line-height: .44rem;
    text-align: center;
    color: #FFFFFF;
    font-weight: bold;
    font-size: .24rem;
    background: #FF4141;
    border-radius: .1rem;
  }
  .sell-out {
    position: absolute;
    left: .16rem;
    top: .64rem;
    width: 1.1rem;
    height: .94rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
}
</style>