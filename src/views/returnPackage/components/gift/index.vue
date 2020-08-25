<template>
  <section class="gift">
    <template v-if="giftInfo.haveBuy">
      <div class="bg">
        <p>
          <span>{{giftInfo.dateRange}}</span>连续登录可领完全部<span>{{conversion(giftInfo.extraAmount)}}</span>加赠金叶
        </p>
        <img src="./img/bought-icon.png" alt="" class="bought-icon">
        <p class="desc">
          <em>已领 {{giftInfo.receiveCount}} 次</em><br />
          <span>(今日为第{{giftInfo.continueDay}}天)</span>
        </p>
      </div>
    </template>
    <template v-else-if="state===1">
      <div class="bg">
        <p>加赠的金叶：购买次日起，连续登录分5天领取</p>
        <ul class="gift-content">
          <li v-for="(item,index) in giftInfo.list" :key="item.bizId" @click="goPay(index,item)">
            <img :src="item.productIcon|filter" alt="">
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <img src="./img/end.png" alt="">
    </template>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { bigCustomerRecallProducts, sendBigCustomerAdditionalRewards } from '../../services/api'
import _get from 'lodash.get'
export default {
  name: 'gift',
  components: {

  },
  props: {
    state: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      giftInfo: {},
      awardInfo: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const res = await bigCustomerRecallProducts()
      const code = _get(res, 'code', 0)
      const data = _get(res, 'data', {})
      if (code === 200) {
        this.giftInfo = data
        if (data.haveBuy) {
          this._sendBigCustomerAdditionalRewards()
        }
      }
    },
    async _sendBigCustomerAdditionalRewards () {
      const res = await sendBigCustomerAdditionalRewards()
      const code = _get(res, 'code', 0)
      const data = _get(res, 'data', {})
      if (code === 200) {
        this.awardInfo = {
          list: [{
            img: require('./img/leaf.png'),
            name: this.conversion(data.dailyAmount) + '金叶',
            nofilter: true
          }],
          desc: `${data.dateRange}连续登录<br/>可领完全部${this.conversion(data.amount)}金叶`
        }
        this.$emit('show-pop', 'give', this.awardInfo)
      }
    },
    goPay (index, val) {
      GLOBALS.marchSetsPoint('A_H5PT0074001435', { recharge_rmb: val.price, product_id: val.bizId })
      localStorage.setItem('payment', JSON.stringify(val))
      localStorage.setItem('originDeffer', location.href)
      location.href = 'https://wap.beeplaying.com/xmWap/#/payment/paymentlist'
    },
    conversion (value) {
      if (value >= 10000) {
        return `${Math.floor(value / 1000) / 10}万`
      } else {
        return value
      }
    }
  }
}
</script>

<style lang="less" scoped>
.gift {
  width: 6.68rem;
  margin: 0.28rem auto 0.3rem;
  .bg {
    width: 6.68rem;
    height: 5.12rem;
    background: url('./img/gift-bg.png') no-repeat center center;
    background-size: 100% 100%;
    font-size: 0.24rem;
    color: #0cf1ff;
    text-align: center;
    box-sizing: border-box;
    padding: 1.24rem 0 0;
    line-height: 0.36rem;
    font-weight: bold;
    padding-right: 0.1rem;
    span {
      color: #feee9a;
    }
    .bought-icon {
      width: 2.46rem;
      height: 2.42rem;
      display: block;
      margin: 0.24rem auto 0;
    }
    .gift-content {
      margin-top: 0.2rem;
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      li {
        margin-left: 0.14rem;
        min-width: 2.52rem;
        max-width: 2.52rem;
        height: 3.02rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .desc {
      line-height: 0;
      em {
        font-size: 0.24rem;
        color: #f35631;
        font-style: normal;
        line-height: 0.3rem;
      }
      span {
        font-size: 0.2rem;
        color: #c5d2fe;
        line-height: 0.24rem;
      }
    }
  }
}
</style>
