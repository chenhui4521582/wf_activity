<template>
  <article class="comfirm-order">
    <!-- 头部 -->
    <Header title="订单详情" />
    <order-tag :info="orderInfo" />
    <Address :info="orderInfo" :locked=true />
    <good-info :info="orderInfo" />
    <business-info :info="orderInfo" />
    <order-info :info="orderInfo" />
    <section class="bottom-wrapper" @click="toService()">
      <div class="grey">
        <img src="./imgs/service-icon.png" alt="">
        <p>
          客服
        </p>
      </div>
      <div class="white" v-if="whiteText" @click="whiteClick()">
        {{whiteText}}
      </div>
      <div class="red" v-if="redText" @click="redClick()">
        {{redText}}
      </div>
    </section>
  </article>
</template>

<script>
import orderTag from '../../components/orderDetail/orderTag'
import Address from '../../components/orderDetail/address'
import GoodInfo from '../../components/orderDetail/goodInfo'
import BusinessInfo from '../../components/orderDetail/businessInfo'
import orderInfo from '../../components/orderDetail/orderInfo'
export default {
  name: 'comfirm-order',
  components: {
    orderTag,
    Address,
    GoodInfo,
    BusinessInfo,
    orderInfo
  },
  computed: {
    whiteText () {
      switch (this.orderInfo.status) {
        case 0:
          return '取消订单'
        case 2:
          return '查看物流'
        case 3:
          return '去评价'
        default:
          return ''
      }
    },
    redText () {
      switch (this.orderInfo.status) {
        case 0:
          return '付款'
        case 1:
          return ''
        case 2:
          return '确认收货'
        default:
          return '再次购买'
      }
    }
  },
  data () {
    return {
      orderInfo: {
        countDown: 10000000,
        hfqPrice: 100,
        id: 1234,
        name: 'iPhone11 pro',
        num: 1,
        orderNo: '12345657489',
        payPrice: 9999,
        payTime: '2020-03-01 13:09:32',
        picture: 'https://img13.360buyimg.com/n1/s450x450_jfs/t1/98682/21/15708/153146/5e74a581Ea58612d6/474a18564d87b1d8.jpg',
        postage: 10,
        realPrice: 9819,
        receiveAddress: '新疆维吾尔自治区 克孜勒苏柯尔克孜自治州 阿合奇县 哈拉布拉克乡',
        receiverName: '彭于晏',
        shipInfo: '',
        specs: '512G',
        status: 0 // 订单状态 0-待支付，1-已支付待发货，2-已发货，3-确认收货，4-订单取消，5-退款，6-已评价
      },
      cost: 50
    }
  },
  mounted () {
  },
  methods: {
    toService () { },
    whiteClick () { },
    redClick () { }
  }
}
</script>

<style lang="less" scoped>
.comfirm-order {
  min-height: 100vh;
  padding: 1.2rem 0.24rem;
  box-sizing: border-box;
  .bottom-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    height: 0.9rem;
    width: 100vw;
    background: #fff;
    font-size: 0.24rem;
    color: #888;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .grey {
      background: #f0f0f0;
      flex: 1;
      height: 0.9rem;
      text-align: center;
      padding-top: 0.16rem;
      box-sizing: border-box;
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    .white {
      min-width: 3.1rem;
      text-align: center;
      color: #ff4141;
    }
    .red {
      min-width: 3.1rem;
      text-align: center;
      color: #fff;
      background: #ff4141;
      height: 0.9rem;
      line-height: 0.9rem;
    }
  }
}
</style>
