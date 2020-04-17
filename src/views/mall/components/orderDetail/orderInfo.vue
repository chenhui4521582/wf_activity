<template>
  <section class="order-info">
    <p class="title">订单信息</p>
    <ul>
      <li>
        <span class="label">订单编号</span>
        <p class="value">
          <span>{{info.orderNo}}</span>
          <span class="copy" v-clipboard:copy="info.orderNo" v-clipboard:success="onCopy"
            v-clipboard:error="onError">复制</span>
        </p>
      </li>
      <li>
        <span class="label">付款时间</span>
        <span class="value">{{info.payTime}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'orderInfo',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onCopy () {
      this.$toast.show({ message: '复制成功' })
    },
    onError () {
      this.$toast.show({ message: '复制失败' })
    }
  }
}
</script>

<style lang="less" scoped>
.order-info {
  padding: 0.2rem 0.2rem;
  background: #fff;
  border-radius: 0.16rem;
  margin-bottom: 0.2rem;
  font-size: 0.24rem;
  line-height: 0.36rem;
  .title {
    margin-bottom: .1rem;
  }
  ul {
    li {
      margin-bottom: .07rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .label {
        color: #888;
      }
      .value {
        color: #000;
        .copy {
          background: #f0f0f0;
          color: #ff4141;
          height: 0.42rem;
          text-align: center;
          width: 0.9rem;
          line-height: 0.42rem;
          display: inline-block;
          border-radius: 0.1rem;
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>
