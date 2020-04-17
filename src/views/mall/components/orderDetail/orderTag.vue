<template>
  <section class="order-tag" :class="`status-${info.status}`">
    <template v-if="info.status === 0">
      <p>订单待付款</p>
      <span>{{countdownTime}}后自动关闭</span>
    </template>
    <template v-else-if="info.status === 1">
      <p>订单付款中</p>
      <span>正在付款，请刷新页面更新订单状态</span>
    </template>
    <template v-else-if="info.status === 2">
      <p>等待卖家发货</p>
      <span>商品将在7天内发货，请耐心等待</span>
    </template>
    <template v-else-if="info.status === 3">
      <p>卖家已发货</p>
      <span>等待买家收货</span>
    </template>
    <template v-else-if="info.status === 4">
      <img src="./imgs/order-finished.png" alt="">
      <span>交易已完成</span>
    </template>
    <template v-else-if="info.status === 5">
      <img src="./imgs/order-cancel.png" alt="">
      <span>订单已取消</span>
    </template>
    <template v-else-if="info.status === 6">
      <img src="./imgs/order-closed.png" alt="">
      <span>订单已退款</span>
    </template>
  </section>
</template>

<script>
export default {
  name: '',
  props: {
    info: {
      type: Object,
      default: () => ({}) // 订单状态 0-待支付，1-支付中，2-已支付待发货，3-已发货，4-确认收货，5-订单取消，6-退款
    }
  },
  data () {
    return {
      countdownTime: '00小时00分00秒',
      timer: null
    }
  }, 
  methods: {
    countDown (data) {
      if (!data) return false
      let date = data / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          this.$emit('updateOrderStatus', 5)
          clearInterval(this.timer)
        }
        let day = Math.floor(date / 86400)
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        if (day > 0) {
          this.countdownTime = `${countDay}天${countHour}小时${countMinute}分${countSecond}秒`
        } else {
          this.countdownTime = `${countHour}小时${countMinute}分${countSecond}秒`
        }
      }, 1000)
    }
  },
  watch: {
    info: {
      handler (value) {
        if (value && value.status === 0 && value.countDown) {
          this.countDown(value.countDown)
        }
      },
      deep: true,
      immediate: true
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.order-tag {
  padding: 0.3rem;
  border-radius: 0.16rem;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: flex-end;
  font-size: 0.24rem;
  justify-content: space-between;
  line-height: 0.3rem;
  p {
    color: #fff;
    font-size: 0.2rem;
    height: 0.3rem;
    line-height: 0.3rem;
    border-radius: 0.06rem;
    padding: 0 0.1rem;
  }
  img {
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.1rem;
  }
  &.status-0,
  &.status-1 {
    background: #ffecec;
    color: #ff4141;
    p {
      background: #ff4141;
    }
  }
  &.status-2 {
    background: #ffecec;
    color: #ff7800;
    p {
      background: #ff7800;
    }
  }
  &.status-3 {
    background: #fff2c7;
    color: #ffbc00;
    p {
      background: #ffbc00;
    }
  }
  &.status-4 {
    background: #fffad4;
    color: #ff7800;
    justify-content: center;
  }
  &.status-5 {
    background: #f0f0f0;
    color: #bbb;
    justify-content: center;
  }
  &.status-6 {
    background: #ffecec;
    color: #ff4141;
    justify-content: center;
  }
}
</style>
