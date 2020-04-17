<template>
  <section class="business-info">
    <p class="title">交易明细</p>
    <ul>
      <li>
        <span class="label">商品金额</span>
        <span class="value">¥{{ info.payPrice && info.payPrice.toFixed(2)}}</span>
      </li>
      <li v-if="info.hfqPrice">
        <span class="label">话费券抵扣</span>
        <span class="value">- ¥{{info.hfqPrice && info.hfqPrice.toFixed(2)}}</span>
      </li>
      <li v-if="info.postage">
        <span class="label">运费</span>
        <span class="value">+ ¥{{info.postage && info.postage.toFixed(2)}}</span>
      </li>
      <li v-if="info.realPrice">
        <span class="label">实付款</span>
        <span class="value">¥{{ info.realPrice && info.realPrice.toFixed(2)}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'businessInfo',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
.business-info {
  padding: 0.2rem 0.2rem;
  background: #fff;
  border-radius: 0.16rem;
  margin-bottom: 0.2rem;
  font-size: 0.24rem;
  line-height: 0.36rem;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .label {
        color: #888;
      }
      .value {
        color: #ff4141;
      }
    }
  }
}
</style>
