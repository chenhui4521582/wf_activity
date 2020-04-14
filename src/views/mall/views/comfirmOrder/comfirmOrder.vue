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
        <em>¥{{price}}</em>
      </div>
      <div class="submit-btn">提交订单</div>
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
import services from '../../../miniLottery/services/services'
export default {
  name: 'comfirm-order',
  data () {
    return {
      addressList: [],
      cost: 50,
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
        const {code} = _get(res, 'data')
        if (code == 200) {
          this.addressList = _get(res, 'data.data')
        }
      })
    },
    /** 下单 **/
    _payOrder () {
      services.payOrder({
        "deductPrice": this.goodsInfo.deductPrice,
        "num": this.goodsInfo.num,
        "placeId": 0,
        "postage": 0,
        "productId": 0,
        "realPrice": 0,
        "userHfq": false
      }).then(res => {
        const {code} = _get(res, 'data')
        if (code == 200) {
          
        }
      })
    }
  },
  mounted () {
    this._getAddress()
  },
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
    height: .9rem;
    background: #fff;
    font-size: 0.24rem;
    color: #888;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .value {
      height: .9rem;
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
      height: .9rem;
      line-height: .9rem;
      background: #ff4141;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
