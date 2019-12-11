<template>
  <section class="product">
    <div class="product-img">
      <img :src="product.awardsImage | imgFilter " alt="奖品">
    </div>
    <div class="product-info">
      <p class="name">{{product.awardsName}}</p>
      <p class="des">
        <span class="price">¥{{product.showAmount }}</span>
        <span></span>
        <span class="count">{{product.showOpenNum }}人已获得</span>
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
        showOpenNum: null
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
    padding: 0.19rem;
    .name {
      color: #000;
      font-size: 0.28rem;
      margin-bottom: 0.19rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      max-height: 0.6rem;
      line-height: 0.3rem;
      overflow: hidden;
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
