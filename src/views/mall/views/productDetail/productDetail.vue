<template>
  <main class="product-detail">
    <Header title="商品详情" />
    <article class="content">
      <goods-info :info="info" />
      <specifications :info="info" />
      <section class="deliver-quality">
        <p class="good-deliver">
          <span>发货</span>
          <span>商家配送 | 快递 ¥6.00</span>
        </p>
        <p class="good-quality">
          <span>保障</span>
          <span>正品保障·全国联保·售后无忧</span>
        </p>
      </section>
      <goods-descript :info="info" />
    </article>
    <div class="bottom-button">立即购买</div>
  </main>
</template>

<script>
import GoodsInfo from './components/goodsInfo'
import GoodsDescript from './components/goodsDescription'
import Specifications from './components/specifications'
export default {
  name: 'productDetail',
  components: {
    GoodsInfo,
    GoodsDescript,
    Specifications
  },
  data () {
    return {
      info: {}
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.product-detail {
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 1.2rem 0.24rem;
  .introduction-wrapper {
    border-radius: 0.16rem;
    overflow: hidden;
    .top-img {
      img {
        width: 100%;
      }
    }
  }
  .deliver-quality {
    padding: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 0.16rem;
    background: #fff;
    height: 1.4rem;
    box-sizing: border-box;
    .good-deliver,
    .good-quality {
      display: flex;
      align-items: center;
      height: 0.5rem;
      line-height: 0.5rem;
      span {
        font-size: 0.24rem;
        &:first-child {
          margin-right: 0.25rem;
          color: #888888;
        }
        &:last-child {
          color: #0d0d0d;
          font-weight: 400;
        }
      }
    }
  }
  .bottom-button {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 0.9rem;
    background: #ff4141;
    line-height: 0.92rem;
    font-size: 0.24rem;
    color: #fff;
    text-align: center;
  }
}
</style>
