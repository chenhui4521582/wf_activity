<template>
  <section class="goods-wrapper">
    <div class="goods">
      <img :src="exchange.image | imgFilter"
        alt="">
    </div>
    <div class="detail">
      <p class="title">{{exchange.name}}</p>
      <p class="des">{{exchange.remark}}</p>
      <div class="handler">
        <p>{{exchange.score}}<span class="unit">积分</span></p>
        <span class="button">兑换</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['exchange']
}
</script>

<style lang="less" scoped>
.goods-wrapper {
  width: 3.2rem;
  border-radius: 0.16rem;
  background: #fff;
  overflow: hidden;
  .goods {
    height: 2.3rem;
    background: #dbdbdb;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 2.23rem;
      height: 1.25rem;
      border-radius: 0.16rem;
    }
  }
  .detail {
    padding: 0.3rem 0.2rem;
    .title {
      font-size: 0.28rem;
      color: #1b1f29;
      padding-bottom: 0.17rem;
    }
    .des {
      background: #f0f0f0;
      border-radius: 0.15rem;
      font-size: 0.2rem;
      color: #1b1f29;
      width: fit-content;
      padding: 0.06rem 0.15rem;
    }
    .handler {
      font-size: 0.3rem;
      color: #ff2828;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-top: .05rem;
      .unit {
        font-size: 0.2rem;
      }
    }
    .button {
      width: 0.9rem;
      display: inline-block;
      line-height: 0.42rem;
      text-align: center;
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.24rem;
      background: #FF4141;
    }
  }
}
</style>
