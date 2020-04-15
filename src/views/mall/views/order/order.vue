<template>
  <div class="order-list">
    <Header title="我的订单" />
    <div class="wrap">
      <div class="order-nav">
        <div class="nav-item" v-for="(item, index) in nav"
          :class="{'active': currentIndex == index}" :key="index" @click="handleClick(index)">
          {{item.name}}
          <div class="line"></div>
        </div>
      </div>
      <div class="list" v-if="showList">
        <order-item v-for="(item, index) in list" :item="item" :key="index" @openPopup="openPopup"
          @goServices="goServices" @jumpOrderDetail="jumpOrderDetail" />
      </div>
      <div class="empty" v-else>
        <img src="./img/empty.png" alt="">
      </div>
    </div>
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
    <!-- 返回商品列表 -->
    <div class="back" @click="backToProduct">
      <img src="./img/back.png" alt="">
    </div>
  </div>
</template>
<script>
import OrderItem from './components/listItem'
import { getOrderList, cancelOrder } from '../../services/order'
import _get from 'lodash.get'
export default {
  name: 'orderList',
  data: () => ({
    nav: [
      { name: '全部', status: 0 },
      { name: '待付款', status: 1 },
      { name: '待发货', status: 2 },
      { name: '已发货', status: 3 },
      { name: '已完成', status: 4 }
    ],
    currentIndex: 0,
    list: [],
    modal: {
      show: false,
      status: 0,
      type: 0,
      title: '',
      saveText: '',
      closeText: ''
    },
    shipInfo: ''
  }),
  components: {
    OrderItem
  },
  computed: {
    showList () {
      return this.list.length
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
  methods: {
    handleClick (index) {
      this.currentIndex = index
      this._getOrderList()
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
      if (this.modal.status == 1) {
        this._cancelOrder()
      }
      this.resetModal()
    },
    /** 打开弹框 **/
    openPopup (status, orderNo, shipInfo) {
      this.orderNo = orderNo
      this.shipInfo = shipInfo
      if (status == 1) {
        this.modal.show = true
        this.modal.type = 2
        this.modal.status = status
        this.modal.title = '温馨提示'
        this.modal.saveText = '再考虑下'
        this.modal.closeText = '取消订单'
      }
      if (status == 2) {
        this.modal.show = true
        this.modal.type = 1
        this.modal.status = status
        this.modal.title = '物流详情'
        this.modal.saveText = ''
        this.modal.closeText = ''
      }
      if (status == 3) {
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
      if (this.modal.status == 1) {
        this.resetModal()
      }
      if (this.modal.status == 3) {
        this._confirmOrder()
      }
    },
    /** 跳转客服 **/
    goServices () {
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/my/customerService'
    },
    /** 获取订单列表 **/
    _getOrderList () {
      const { status } = this.nav[this.currentIndex]
      getOrderList(status).then(res => {
        const { code } = _get(res, 'data')
        if (code == 200) {
          this.list = _get(res, 'data.data', [])
        }
      })
    },
    /** 取消订单 **/
    _cancelOrder () {
      cancelOrder(this.orderNo).then(res => {
        const { code, message } = _get(res, 'data')
        if (code == 200) {
          this.$toast.show({ message: '取消成功' }, () => {
            this._getOrderList()
          })
        } else {
          this.$toast.show({ message })
        }
      })
    },
    /** 确认收货 **/
    _confirmOrder () {
      confirmOrder(this.orderNo).then(res => {
        const { code, message } = _get(res, 'data')
        if (code == 200) {
          this.$toast.show({ message: '确认收货成功' }, () => {
            this._getOrderList()
          })
        } else {
          this.$toast.show({ message })
        }
      })
    },
    /** 跳转订单详情 **/
    jumpOrderDetail (orderId) {
      this.$router.push({
        name: 'orderDetail',
        query: {
          orderId
        }
      })
    },
    backToProduct () {
      this.$router.push({
        name: 'productList'
      })
    },
    onCopy () {
      this.$toast.show({ message: '复制成功' })
    },
    onError () {
      this.$toast.show({ message: '复制失败 ' })
    }
  },
  mounted () {
    this._getOrderList()
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.order-list {
  position: relative;
  overflow: hidden;
  padding-top: 0.9rem;
  height: 100vh;
  background: #f7f7f7;
  .wrap {
    .order-nav {
      padding: 0 0.24rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 0.94rem;
      .nav-item {
        padding: 0 0.2rem;
        font-size: 0.32rem;
        color: #888888;
        &.active {
          position: relative;
          color: #000000;
          font-weight: bold;
          .line {
            position: absolute;
            left: 50%;
            bottom: -0.1rem;
            transform: translate(-50%, 0);
            width: 0.32rem;
            height: 0.06rem;
            background: #ff4141;
            border-radius: 0.3rem;
          }
        }
      }
    }
    .list {
      position: absolute;
      padding: 0 0.24rem;
      left: 0;
      right: 0;
      top: 1.84rem;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .empty {
      margin: 1.7rem 0 0 1.66rem;
      width: 3.38rem;
      height: 2.26rem;
      img {
        width: 3.38rem;
        height: 2.26rem;
      }
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
  .back {
    position: absolute;
    right: 0.24rem;
    bottom: 1.1rem;
    z-index: 2;
    width: 1.2rem;
    height: 1.2rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
}
</style>