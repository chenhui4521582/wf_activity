<template>
  <section class="container">
    <Row v-for="(item,index) in row"
      :key="item.title"
      :icon="item.icon"
      :title="item.title"
      :tip="item.tip"
      :border="index !== (row.length-1)"
      @jump="item.jump" />
  </section>
</template>

<script>
import { List } from '../../../../apis/coupon'
import { toService, createService } from '../../../../global'
import Row from '../row'

export default {
  data () {
    return {
      row: [
        {
          icon: require('./assets/my-prize.png'),
          title: '我的奖品',
          jump: () => {
            GLOBALS.marchSetsPoint('A_H5PT0225002568')
            this.$router.push({
              name: 'MyPrize'
            })
          }
        },
        {
          icon: require('./assets/record.png'),
          title: '开盒记录',
          jump: () => {
            GLOBALS.marchSetsPoint('A_H5PT0225002569')
            this.$router.push({
              name: 'BoxRecord'
            })
          }
        },
        {
          icon: require('./assets/coupon.png'),
          title: '我的优惠券',
          jump: () => {
            GLOBALS.marchSetsPoint('A_H5PT0225003047')
            this.$router.push({
              name: 'Coupon'
            })
          }
        },
        {
          icon: require('./assets/service.png'),
          title: '在线客服',
          jump: () => {
            GLOBALS.marchSetsPoint('A_H5PT0225002577')
            location.href = ysf('url')
            // location.href = 'https://wap.beeplaying.com/xmWap/#/my/customerService'
          }
        },
        {
          icon: require('./assets/problem.png'),
          title: '问题反馈',
          jump: () => {
            GLOBALS.marchSetsPoint('A_H5PT0225002570')
            location.href = 'https://wap.beeplaying.com/xmWap/#/my/feedback'
          }
        }
      ]
    }
  },
  components: {
    Row
  },
  created () {
    createService()
  },
  async mounted () {
    toService()
    const { data: { data } } = await List({ gameId: 28, params: true })
    if (data.length > 0) this.$set(this.row[2], 'tip', '有优惠券未使用')
  }
}
</script>

<style lang="less" scoped>
.container {
  background: #fff;
  width: 6.6rem;
  border-radius: 0.16rem;
  margin: -0.7rem auto 0;
  position: relative;
  z-index: 99;
}
</style>
