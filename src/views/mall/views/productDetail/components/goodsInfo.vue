<template>
  <div class="goods-info">
    <div class="goods-img">
      <img :src="currentInfo.detailPicture | filter" alt="">
      <div class="corner" v-if="currentInfo.cornerImg">
        <img :src="currentInfo.cornerImg | filter" alt="">
      </div>
    </div>
    <div class="info">
      <div class="group">
        <p>
          <span class="unit">¥</span>
          <span class="price">{{currentInfo.payPrice}}</span>
          <span class="market-price">官方价:￥{{currentInfo.marketPrice | unit}}</span>
        </p>
        <p class="deduction">
          <span>
            {{currentInfo.label}}
          </span>
        </p>
      </div>
      <div class="group1">
        <span class="name">
          {{currentInfo.name}}
        </span>
        <span class="participants">
          已售{{currentInfo.purchaseNum || 0}}件
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goodsInfo',
  props: {
    currentInfo: {
      type: Object,
      default: () => ({})
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
  margin: 0 0 0.2rem;
  background: #fff;
  border-radius: 0.16rem;
  height: 4.17rem;
  .goods-img {
    position: relative;
    height: 2.77rem;
    text-align: center;
    overflow: hidden;
    img {
      vertical-align: top;
      width: 100%;
      height: auto;
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
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 0.1rem;
      .price {
        color: #ff2f2f;
        font-size: 0.42rem;
        font-weight: 800;
        margin-right: 0.16rem;
        line-height: .3rem;
      }
      p {
        height: 0.4rem;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        white-space: nowrap;
        &:first-child {
          .unit {
            font-size: 0.24rem;
            color: #ff2f2f;
            line-height: 0.25rem;
          }
          .price {
            line-height: 0.36rem;
          }
          .market-price {
            font-size: 0.2rem;
            color: #bbbbbb;
          }
        }
      }

      .deduction {
        color: #ff4141;
        span {
          font-size: 0.2rem;
          border: 0.01rem solid #ff4141;
          border-radius: 0.06rem;
          padding: 0 0.1rem;
          line-height: 0.36rem;
          flex-shrink: 0;
        }
      }
    }
    .group1 {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: .5rem;
      .name {
        font-size: 0.32rem;
        color: #000;
        font-weight: bold;
      }
      .participants {
        line-height: .25rem;
        font-size: 0.24rem;
        color: #888888;
      }
    }
  }
}
</style>