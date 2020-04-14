<template>
  <article class="product-detail">
    <Header title="商品详情" />
    <section class="content">
      <!-- 商品详情 -->
      <goods-info :current-info="currentInfo" />
      <!-- 规格 -->
      <specifications v-model="buyNumber" :info="info" :current-index="currentIndex"
        :current-info="currentInfo" @change-index="changeIndex" />
      <!-- 发货信息 -->
      <section class="deliver-quality">
        <p class="good-deliver">
          <span>发货</span>
          <span>商家配送 | 快递 ¥{{currentInfo.postage && currentInfo.postage.toFixed(2)}}</span>
        </p>
        <p class="good-quality">
          <span>保障</span>
          <span>正品保障·全国联保·售后无忧</span>
        </p>
      </section>
      <!-- 商品详情 -->
      <goods-descript :current-info="currentInfo" />
    </section>
    <div class="bottom-button" @click="comfirmOrder">立即购买</div>
  </article>
</template>

<script>
import GoodsInfo from './components/goodsInfo'
import GoodsDescript from './components/goodsDescription'
import Specifications from './components/specifications'
import Services from '../../services/product'
import _get from 'lodash.get'
export default {
  name: 'productDetail',
  components: {
    GoodsInfo,
    GoodsDescript,
    Specifications
  },
  data () {
    return {
      info: [],
      currentIndex: 0,
      buyNumber: 1,
      fragmentAmount: 0
    }
  },
  computed: {
    currentInfo () {
      if (this.info[this.currentIndex]) {
        return this.info[this.currentIndex]
      }
      return {}
    }
  },
  methods: {
    /** 获取商品详情 **/
    _getProductDetail () {
      const { name } = this.$route.query
      if (!name) return false
      Services.getProductDetail({
        name: decodeURIComponent(name)
      }).then(res => {
        const { code } = _get(res, 'data')
        if (code === 200) {
          this.info = _get(res, 'data.data.detailInfoList', [])
          this.fragmentAmount = _get(res, 'data.data.fragmentAmount', 0)
        }
      })
    },
    changeIndex (index) {
      this.currentIndex = index
    },
    comfirmOrder () {
      let info = {
        id: this.currentInfo.id,
        picture: this.currentInfo.picture,
        name: this.currentInfo.name,
        specs: this.currentInfo.specs,
        payPrice: this.currentInfo.payPrice,
        deductPrice: this.currentInfo.deductPrice,
        postage: this.currentInfo.postage,
        num: this.buyNumber,
        fragmentAmount: this.fragmentAmount
      }
      localStorage.setItem('activitiesMallItem', JSON.stringify(info))
      this.$router.push({
        name: 'comfirmOrder'
      })
    }
  },
  mounted () {
    this._getProductDetail()
  }
}
</script>

<style lang="less" scoped>
.product-detail {
  min-height: 100vh;
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
