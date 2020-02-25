<template>
  <section class="exchange-wrapper">
    <Title title="积分兑好礼" />
    <div class="content">
      <Gift class="gift"
        v-for="(item, index) in awardsList"
        :key="index"
        :exchange="item" />
    </div>
  </section>
</template>

<script>
import Title from '../title'
import Gift from '../gift'

export default {
  components: {
    Title,
    Gift
  },
  props: {
    awardsList: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
.exchange-wrapper {
  padding-bottom: 0.25rem;
  .content {
    display: flex;
    padding: 0 .3rem;
    flex-wrap: wrap;
    .gift {
      margin-bottom: 0.2rem;
      margin-right: 0.2rem;
      &:nth-child(even) {
        margin-right: 0;
      }
    }
  }
}
</style>
