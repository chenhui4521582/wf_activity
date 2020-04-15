<template>
  <article class="comfirm-order">
    <!-- 头部 -->
    <Header title="订单详情" />
    <order-tag :info="orderInfo" />
    <Address :info="orderInfo" :locked=true />
    <good-info :info="orderInfo" />
    <business-info :info="orderInfo" />
    <order-info :info="orderInfo" />
    <section class="bottom-wrapper">
      <div class="grey" @click="toService()">
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

    <!-- 弹框 -->
    <modal v-model="modal.show" :type="modal.type" :title="modal.title" :saveText="modal.saveText"
      :closeText="modal.closeText" @on-save="modalCallback" @on-close="hideModal">
      <!-- 取消订单 -->
      <template v-if="modal.status == 1">
        <div class="pannel1">
          <p>取消订单后不可恢复</p>
          <p>请确认是否取消订单</p>
        </div>
        <div class="pannel2">
          <p>若您使用了优惠券或话费券</p>
          <p>订单取消后将自动退回</p>
        </div>
      </template>
      <!-- 查看物流 -->
      <template v-if="modal.status == 2">
        <div class="logistics-No">
          <span class="label">物流单号：</span>
          <span class="value">{{logisticsNo}}</span>
        </div>
        <div class="logistics-name">
          <span class="label">承运公司：</span>
          <span class="value">{{logisticsName}}</span>
        </div>
        <div class="logistics-explain">复制快递单号进行查询</div>
        <div class="copy" slot="footer" v-clipboard:copy="logisticsNo" v-clipboard:success="onCopy"
          v-clipboard:error="onError">复制</div>
      </template>
      <!-- 确认收货 -->
      <template v-if="modal.status == 3">
        <div class="receipt">
          请确认您已收到货品<br>
          确认收货后状态不可再次更改
        </div>
      </template>
    </modal>
  </article>
</template>

<script>
/* eslint-disable no-undef */
import orderTag from '../../components/orderDetail/orderTag'
import Address from '../../components/orderDetail/address'
import GoodInfo from '../../components/orderDetail/goodInfo'
import BusinessInfo from '../../components/orderDetail/businessInfo'
import orderInfo from '../../components/orderDetail/orderInfo'
import { getOrderDetail, confirmOrder, cancelOrder } from '../../services/order'
import _get from 'lodash.get'

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
        case 3:
          return '查看物流'
        default:
          return ''
      }
    },
    redText () {
      switch (this.orderInfo.status) {
        case 0:
          return '付款'
        case 1:
        case 2:
          return ''
        case 3:
          return '确认收货'
        default:
          return '再次购买'
      }
    },
    orderId () {
      return GLOBALS.getUrlParam('orderId')
    },
    logisticsNo () {
      if (this.shipInfo) {
        return this.shipInfo.split(/；|;/g)[1]
      }
      return ''
    },
    logisticsName () {
      if (this.shipInfo) {
        return this.shipInfo.split(/；|;/g)[0]
      }
      return ''
    }
  },
  data () {
    return {
      orderInfo: {},
      cost: 50,
      modal: {
        show: false,
        status: 0,
        type: 0,
        title: '',
        saveText: '',
        closeText: ''
      },
      orderNo: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const res = await getOrderDetail(this.orderId)
      this.orderInfo = _get(res, 'data.data', {})
    },
    /** 重置弹框 **/
    resetModal () {
      this.modal.show = false
      this.modal.type = 0
      this.modal.status = 0
      this.modal.title = ''
      this.modal.saveText = ''
      this.modal.closeText = ''
    },
    /** 关闭弹框 **/
    hideModal () {
      if (this.modal.status === 1) {
        this._cancelOrder()
      }
      this.resetModal()
    },
    /** 打开弹框 **/
    openPopup (status, orderNo, shipInfo) {
      this.orderNo = orderNo
      this.shipInfo = shipInfo
      if (status === 1) {
        this.modal.show = true
        this.modal.type = 2
        this.modal.status = status
        this.modal.title = '温馨提示'
        this.modal.saveText = '再考虑下'
        this.modal.closeText = '取消订单'
      }
      if (status === 2) {
        this.modal.show = true
        this.modal.type = 1
        this.modal.status = status
        this.modal.title = '物流详情'
        this.modal.saveText = ''
        this.modal.closeText = ''
      }
      if (status === 3) {
        this.modal.show = true
        this.modal.type = 2
        this.modal.status = status
        this.modal.title = '温馨提示'
        this.modal.saveText = '确认收货'
        this.modal.closeText = '返回'
      }
    },
    /** 弹框回调 **/
    modalCallback () {
      if (this.modal.status === 1) {
        this.resetModal()
      }
      if (this.modal.status === 3) {
        this._confirmOrder()
      }
    },
    toService () {
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/my/customerService'
    },
    whiteClick () {
      switch (this.orderInfo.status) {
        case 0:
          this.openPopup(1, this.orderInfo.id)
          break
        case 3:
          this.openPopup(2, null, this.orderInfo.shipInfo)
          break
        default:
          return ''
      }
    },
    redClick () {
      switch (this.orderInfo.status) {
        case 0:
          this.payNow()
          break
        case 1:
        case 2:
          break
        case 3:
          this.openPopup(3, this.orderInfo.id)
          break
        default:
          this.continueBuy()
          break
      }
    },

    /** 付款 **/
    payNow () {
      let orderInfo = {
        bizType: this.orderInfo.bizType,
        bizId: this.orderInfo.bizId,
        thirdOrderId: this.orderInfo.thirdOrderId,
        price: this.orderInfo.realPrice
      }
      localStorage.setItem('payment', JSON.stringify(orderInfo))
      window.location.href = '/xmWap/#/payment/paymentlist'
    },
    /** 再次购买 **/
    continueBuy () {
      this.$router.push({
        name: 'productDetail',
        query: {
          name: encodeURIComponent(this.orderInfo.name)
        }
      })
    },
    /** 取消订单 **/
    async _cancelOrder () {
      const res = await cancelOrder(this.orderNo)
      const { code, message } = _get(res, 'data')
      if (code === 200) {
        this.$toast.show({ message: '取消成功' }, () => {
          this.init()
        })
      } else {
        this.$toast.show({ message })
      }
    },
    /** 确认收货 **/
    async _confirmOrder () {
      const res = await confirmOrder(this.orderNo)
      const { code, message } = _get(res, 'data')
      if (code === 200) {
        this.$toast.show({ message: '确认收货成功' }, () => {
          this.init()
        })
      } else {
        this.$toast.show({ message })
      }
    },
    onCopy () {
      this.$toast.show({ message: '复制成功' })
    },
    onError () {
      this.$toast.show({ message: '复制失败 ' })
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
  /** 弹框样式 **/
  .pannel1 {
    margin-bottom: 0.1rem;
    font-size: 0.24rem;
    color: #888;
    text-align: center;
    p {
      line-height: 0.36rem;
    }
  }
  .pannel2 {
    font-size: 0.2rem;
    color: #bbbbbb;
    text-align: center;
    p {
      line-height: 0.3rem;
    }
  }
  .logistics-No {
    margin: 0.2rem 0 0.15rem;
    font-size: 0.24rem;
    color: #000;
  }
  .logistics-name {
    margin-bottom: 0.2rem;
    font-size: 0.24rem;
    color: #000;
  }
  .logistics-explain {
    font-size: 0.2rem;
    color: #bbbbbb;
    text-align: center;
  }
  .copy {
    height: 0.7rem;
    width: 100%;
    line-height: 0.72rem;
    font-size: 0.24rem;
    color: #fff;
    background: #ff4141;
    border-radius: 0.16rem;
  }
  .receipt {
    padding: 0.24rem 0 0.1rem;
    text-align: center;
    color: #888888;
    font-size: 0.24rem;
    line-height: 0.38rem;
  }
}
</style>
