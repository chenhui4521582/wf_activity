<template>
  <section class="freight">
    <p class="label">配送方式</p>
    <p class="value">快递 {{info.postage|postageFilter}}</p>
  </section>
</template>

<script>
export default {
  name: 'freight',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  filters: {
    postageFilter (postage) {
      if (postage) {
        return '¥' + postage.toFixed(2)
      } else {
        return '免邮'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.freight {
  padding: 0.2rem;
  background: #fff;
  border-radius: 0.16rem;
  margin-bottom: 0.2rem;
  font-size: 0.24rem;
  display: flex;
  justify-content: space-between;
  line-height: 0.36rem;
  .label {
    color: #888;
  }
  .value {
    color: #000;
  }
}
</style>
