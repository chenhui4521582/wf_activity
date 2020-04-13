<template>
  <article class="product-detail">
    <Header title="商品详情" />
    <section class="content">
      <goods-info :current-info="currentInfo" />
      <specifications :info="info" :current-index="currentIndex" :current-info="currentInfo"
        v-model="buyNumber" @change-index="changeIndex" />
      <section class="deliver-quality">
        <p class="good-deliver">
          <span>发货</span>
          <span>商家配送 | 快递 ¥{{currentInfo.postage.toFixed(2)}}</span>
        </p>
        <p class="good-quality">
          <span>保障</span>
          <span>正品保障·全国联保·售后无忧</span>
        </p>
      </section>
      <goods-descript :current-info="currentInfo" />
    </section>
    <div class="bottom-button" @click="comfirmOrder">立即购买</div>
  </article>
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
      info: [{
        detailPicture: 'https://img13.360buyimg.com/n1/s450x450_jfs/t1/98682/21/15708/153146/5e74a581Ea58612d6/474a18564d87b1d8.jpg',
        picture: 'https://img13.360buyimg.com/n1/s450x450_jfs/t1/98682/21/15708/153146/5e74a581Ea58612d6/474a18564d87b1d8.jpg',
        payPrice: 9999,
        marketPrice: 10000,
        name: 'iPhone11 pro',
        purchaseNum: 0,
        specs: '256G',
        postage: 6,
        deductPrice: 100,
        description: '该产品是三网通用的电话卡，与移动合作，直接使用移动线路，故与移动是一样的音质，显号，不费流量，通话价格相比又是极便宜，包括通话及淘宝购物折扣使用，欢迎体验。该产品是三网通用的电话卡，与移动合作，直接使用移动线路，故与移动是一样音质，显号，不费流量，通话价格相比又是极便宜，包括通话及淘宝购物折扣使用，欢迎体验。该产品是三网通用的电话卡，与移动合作，接使用移动线路，故与移动是一样的音质，显号，不费流量，通话价格相比又是极便宜，包括通话及淘宝购物折扣使用，欢迎体验。'
      }, {
        detailPicture: 'https://img13.360buyimg.com/n1/s450x450_jfs/t1/98682/21/15708/153146/5e74a581Ea58612d6/474a18564d87b1d8.jpg',
        picture: 'https://img13.360buyimg.com/n1/s450x450_jfs/t1/98682/21/15708/153146/5e74a581Ea58612d6/474a18564d87b1d8.jpg',
        payPrice: 10200,
        marketPrice: 15000,
        name: 'iPhone11 pro',
        purchaseNum: 0,
        specs: '512G',
        postage: 0,
        deductPrice: 200,
        description: '该产品是三网通用的电话卡，与移动合作，直接使用移动线路，故与移动是一样的音质，显号，不费流量，通话价格相比又是极便宜，包括通话及淘宝购物折扣使用，欢迎体验。该产品是三网通用的电话卡，与移动合作，直接使用移动线路，故与移动是一样音质，显号，不费流量，通话价格相比又是极便宜，包括通话及淘宝购物折扣使用，欢迎体验。该产品是三网通用的电话卡，与移动合作，接使用移动线路，故与移动是一样的音质，显号，不费流量，通话价格相比又是极便宜，包括通话及淘宝购物折扣使用，欢迎体验。'
      }],
      currentIndex: 0,
      buyNumber: 1
    }
  },
  computed: {
    currentInfo () {
      return this.info[this.currentIndex]
    }
  },
  mounted () {

  },
  methods: {
    changeIndex (index) {
      this.currentIndex = index
    },
    comfirmOrder () {
      let info = {
        picture: this.currentInfo.picture,
        name: this.currentInfo.name,
        specs: this.currentInfo.specs,
        payPrice: this.currentInfo.payPrice,
        deductPrice: this.currentInfo.deductPrice,
        postage: this.currentInfo.postage,
        num: this.buyNumber
      }
      this.$router.push({
        name: 'comfirmOrder',
        query: {
          info: JSON.stringify(info)
        }
      })
    }
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
  box-sizing: border-box;
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
