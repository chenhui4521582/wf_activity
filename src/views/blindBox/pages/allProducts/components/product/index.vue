<template>
  <section @click="$emit('view')" class="product">
    <img src="./assets/icon.png" class="icon">
    <div class="product-img">
      <img :src="product.awardsImage | imgFilter"
        alt="奖品" />
    </div>
    <div class="product-info">
      <div class="name">
        {{ product.awardsName }}
        <p class="recommend">{{product.remark}}</p>
      </div>
      <p class="des">
        <span class="price">¥{{ product.showAmount }}</span>
        <span></span>
        <span class="count">库存充足</span>
      </p>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    product: {
      type: Object,
      default: {
        awardsImage: null,
        awardsName: null,
        showAmount: null,
        showOpenNum: null,
        remark: null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.product {
  width: 3.15rem;
  // height: 3.71rem;
  border-radius: 0.16rem;
  overflow: hidden;
  margin: 0.15rem;
  background: #fff;
  position:relative;
  .icon {
    width: .9rem;
    position: absolute;
    top: 0;
    left: 0rem;
  }
  .product-img {
    height: 2.7rem;
    background: #e3e2e2;
    padding-top: 0.2rem;
    box-sizing: border-box;
    img {
      width: 2.3rem;
      height: 2.3rem;
      margin: 0 auto;
      display: block;
    }
  }
  .product-info {
    padding: 0.12rem 0.2rem 0.2rem;
    .name {
      color: #000;
      font-size: 0.24rem;
      margin-bottom: 0.12rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      height: 0.8rem;
      line-height: 0.4rem;
      overflow: hidden;
      word-break: break-all;
      .recommend {
        background: #EEEEEE;
        line-height: 0.3rem;
        border-radius:0.15rem;
        padding: 0 0.18rem 0 0.13rem;
        color: #999999;
        font-size: 0.18rem;
        width: fit-content;
        margin-top: 0.07rem;
      }
    }
    .des {
      display: flex;
      justify-content: space-between;
      font-size: 0.2rem;
      .price {
        color: #ff4141;
      }
      .count {
        color: #999999;
      }
    }
  }
}
</style>
