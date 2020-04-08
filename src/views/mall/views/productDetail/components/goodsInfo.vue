<template>
  <div class="goods-info">
    <div class="goods-img">
      <img :src="info.detailPicture | filter" alt="">
      <div class="corner" v-if="info.cornerImg">
        <img :src="info.cornerImg | filter" alt="">
      </div>
    </div>
    <div class="info">
      <div class="group">
        <span class="unit">¥</span>
        <span class="price">{{info.purchasePrice}}</span>
        <span class="market-price">官方价:￥{{info.marketPrice | unit}}</span>
      </div>
      <div class="group1">
        <span class="name">
          {{info.name}}
        </span>
        <span class="participants">
          已有{{info.participants || 0}}人参与抽奖
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goodsInfo',
  props: {
    info: {
      type: Object,
      default: () => { }
    }
  },
  filters: {
    unit (value) {
      if (value) {
        return value.toFixed(2)
      } else {
        return value
      }
    }
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.goods-info {
  overflow: hidden;
  margin: 0.2rem 0;
  background: #fff;
  border-radius: 0.16rem;
  height: 4.17rem;
  .goods-img {
    position: relative;
    height: 2.77rem;
    text-align: center;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
    .corner {
      position: absolute;
      left: 0;
      top: 0;
      width: 1.07rem;
      height: 0.62rem;
    }
  }
  .info {
    padding: 0 0.22rem;
    height: 1.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .group {
      height: 0.4rem;
      &:first-child {
        margin-bottom: 0.24rem;
      }
      .price {
        color: #ff2f2f;
        font-size: 0.42rem;
        font-weight: 800;
        margin-right: 0.16rem;
      }
      .unit {
        font-size: 0.24rem;
        color: #ff2f2f;
      }
      .market-price {
        font-size: 0.2rem;
        color: #bbbbbb;
      }
    }
    .group1 {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .name {
        font-size: 0.32rem;
        color: #000;
        font-weight: bold;
      }
      .participants {
        font-size: 0.24rem;
        color: #888888;
      }
    }
  }
}
</style>