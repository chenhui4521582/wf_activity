<template>
  <article class="comfirm-order">
    <Header title="确认订单" />
    <Address :info="addressInfo" />
    <good-info :info="goodInfo" />
    <Freight :info="goodInfo" />
    <duction-price :cost="maxDeductPrice" v-model="isSelectedCost" />
    <business-info :info="goodInfo" />
    <section class="bottom-wrapper">
      <span>还需支付<em>¥{{price}}</em></span>
      <span class="submit-btn">提交订单</span>
    </section>
  </article>
</template>

<script>
import Address from '../../components/orderDetail/address'
import GoodInfo from '../../components/orderDetail/goodInfo'
import Freight from '../../components/orderDetail/freight'
import DuctionPrice from '../../components/orderDetail/ductionPrice'
import BusinessInfo from '../../components/orderDetail/businessInfo'
export default {
  name: 'comfirm-order',
  components: {
    Address,
    GoodInfo,
    Freight,
    DuctionPrice,
    BusinessInfo
  },
  computed: {
    goodInfo () {
      let info = {}
      if (GLOBALS.getUrlParam('info')) {
        info = JSON.parse(decodeURIComponent(GLOBALS.getUrlParam('info')))
      }
      if (this.isSelectedCost) {
        let price = info.deductPrice * info.num
        price = price < this.cost ? price : this.cost
        this.$set(info, 'hfqPrice', price)
      } else {
        delete info.hfqPrice
      }
      return info
    },
    maxDeductPrice () {
      let price = this.goodInfo.deductPrice * this.goodInfo.num
      return price < this.cost ? price : this.cost
    },
    price () {
      let price = this.goodInfo.payPrice + this.goodInfo.postage
      this.isSelectedCost && (price = price - this.maxDeductPrice)
      return price.toFixed(2)
    }
  },
  data () {
    return {
      addressInfo: {
        receiverName: '彭于晏',
        receiveAddress: '新疆维吾尔自治区 克孜勒苏柯尔克孜自治州 阿合奇县 哈拉布拉克乡'
      },
      cost: 50,
      isSelectedCost: false
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.comfirm-order {
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 1.2rem 0.24rem;
  box-sizing: border-box;
  .bottom-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 0.9rem;
    width: 100vw;
    background: #fff;
    font-size: 0.24rem;
    color: #888;
    line-height: 0.9rem;
    box-sizing: border-box;
    padding-left: 0.24rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    em {
      font-size: 0.32rem;
      color: #ff4141;
      margin-left: 0.08rem;
    }
    .submit-btn {
      width: 3rem;
      background: #ff4141;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
