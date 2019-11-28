<template>
  <section>
    <Drawer :close="close"
      :show="show"
      :confirm="confirm"
      :cancel="cancel"
      :title="title"
      @onClose="$emit('onClose')"
      @onCancel="$emit('onCancel')"
      @onConfirm="$emit('onConfirm')">
      <section class="pay-content">
        <div class="row">
          <span>订单名称:</span>
          <span></span>
          <span>开1次盲盒</span>
        </div>
        <div class="row">
          <span>订单金额:</span>
          <span></span>
          <span>15元</span>
        </div>
        <div class="row">
          <span>优惠券:</span>
          <span></span>
          <span>5元</span>
        </div>
      </section>
      <section class="pay-footer"
        slot="footer">
        <img src="./assets/ali.png"
          alt="支付宝">
        <span></span>
        <img src="./assets/wechat.png"
          alt="微信">
      </section>
    </Drawer>
  </section>
</template>

<script>
import Drawer from '../drawer'
export default {
  props: {
    close: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    title: {
      type: String,
      default: '订单确认'
    },
    confirm: {
      type: String
    },
    cancel: {
      type: String
    }
  },
  components: {
    Drawer
  }
}
</script>

<style lang="less" scoped>
.pay-content {
  padding: 0 0.96rem 0.22rem 0.62rem;
  .row {
    display: flex;
    justify-content: space-between;
    font-size: 0.24rem;
    color: #1a1e28;
    padding-bottom: 0.28rem;
  }
}
.pay-footer {
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
  img {
    width: 3rem;
  }
}
</style>
