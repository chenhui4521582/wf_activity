<template>
  <article class="comfirm-order">
    <Header title="确认订单" />
    <Address :info="defaultAddress" />
    <good-info :info="goodInfo" />
    <Freight :info="goodInfo" />
    <duction-price :cost="maxDeductPrice" v-model="isSelectedCost" />
    <business-info :info="goodInfo" />
    <section class="bottom-wrapper">
      <div class="value">
        <span>还需支付</span>
        <em>¥{{ price && price.toFixed(2) }}</em>
      </div>
      <div class="submit-btn" @click="_payOrder">提交订单</div>
    </section>
  </article>
</template>

<script>
import Address from '../../components/orderDetail/address'
import GoodInfo from '../../components/orderDetail/goodInfo'
import Freight from '../../components/orderDetail/freight'
import DuctionPrice from '../../components/orderDetail/ductionPrice'
import BusinessInfo from '../../components/orderDetail/businessInfo'
import Services from '../../services/order'
import _get from 'lodash.get'
export default {
  name: 'comfirm-order',
  data () {
    return {
      addressList: [],
      isSelectedCost: false
    }
  },
  components: {
    Address,
    GoodInfo,
    Freight,
    DuctionPrice,
    BusinessInfo
  },
  computed: {
    goodInfo () {
      let info = localStorage.getItem('activitiesMallItem')
      if (info) {
        info = JSON.parse(info)
      }
      GLOBALS.marchSetsPoint('A_H5PT0276003262', {
        product_price: info.payPrice,
        product_id: info.id,
        product_name: info.name
      })
      if (this.isSelectedCost) {
        let price = info.deductPrice * info.num
        price = price < info.fragmentAmount ? price : info.fragmentAmount
        this.$set(info, 'hfqPrice', price)
      } else {
        delete info.hfqPrice
      }
      return info
    },
    maxDeductPrice () {
      let price = this.goodInfo.deductPrice * this.goodInfo.num
      return price < this.goodInfo.fragmentAmount ? price : this.goodInfo.fragmentAmount
    },
    price () {
      let price = this.goodInfo.payPrice * this.goodInfo.num + this.goodInfo.postage
      this.isSelectedCost && (price = (price * 1000 - this.maxDeductPrice * 1000) / 1000)
      return price
    },
    hasAddressList () {
      return this.addressList.length
    },
    defaultAddress () {
      let from = this.$route.query.from
      if (from) {
        return this.$route.query
      }
      if (this.hasAddressList) {
        return this.addressList[0]
      }
      return {}
    }
  },
  methods: {
    /** 获取收货地址 **/
    _getAddress () {
      Services.getAddress().then(res => {
        const { code } = _get(res, 'data')
        if (code === 200) {
          this.addressList = _get(res, 'data.data')
        }
      })
    },
    /** 下单 **/
    _payOrder () {
      GLOBALS.marchSetsPoint('A_H5PT0276003263', {
        product_price: this.goodInfo.payPrice,
        product_id: this.goodInfo.id,
        product_name: this.goodInfo.name
      })
      if(!this.hasAddressList) {
        this.$toast.show({message: '请选择收货地址'})
        return false
      }
      if(this.lock) return false
      this.lock = true
      Services.payOrder({
        'deductPrice': this.goodInfo.deductPrice,
        'num': this.goodInfo.num,
        'placeId': this.defaultAddress.id,
        'postage': this.goodInfo.postage,
        'productId': this.goodInfo.id,
        'realPrice': this.price,
        'useHfq': this.isSelectedCost
      }).then(res => {
        this.lock = false
        const { code, data, message } = _get(res, 'data')
        if (code === 200) {
          let orderInfo = {
            ...data,
            price: this.price
          }
          localStorage.setItem('payment', JSON.stringify(orderInfo))
          let channel = localStorage.getItem('APP_CHANNEL')
          let originDeffer = `//wap.beeplaying.com/activities/mall.html#/order?channel=${channel}&blindBox=true`
          localStorage.setItem('originDeffer', originDeffer)
          window.location.replace('/xmWap/#/payment/paymentlist')
        } else {
          this.$toast.show({ message })
        }
      }).catch(erro => {
        this.lock = false
      })
    }
  },
  mounted () {
    this._getAddress()
    if (this.maxDeductPrice) {
      this.isSelectedCost = true
    }
  }
}
</script>

<style lang="less" scoped>
.comfirm-order {
  min-height: 100vh;
  padding: 1.2rem 0.24rem;
  box-sizing: border-box;
  .bottom-wrapper {
    padding-left: 0.24rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 0.9rem;
    background: #fff;
    font-size: 0.24rem;
    color: #888;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .value {
      height: 0.9rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      em {
        margin-left: 0.08rem;
        font-size: 0.32rem;
        color: #ff4141;
      }
    }
    .submit-btn {
      width: 3rem;
      height: 0.9rem;
      line-height: 0.9rem;
      background: #ff4141;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
