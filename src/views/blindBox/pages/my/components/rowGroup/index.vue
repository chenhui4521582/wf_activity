<template>
  <section class="container">
    <Row v-for="(item,index) in row"
      :key="item.title"
      :icon="item.icon"
      :title="item.title"
      :border="index !== (row.length-1)"
      @jump="item.jump" />
  </section>
</template>

<script>
import Row from '../row'
// import { findUrl } from '../../../../utils/index'
// import { problemUrl } from '../../../../config/url'

export default {
  data () {
    return {
      row: [
        {
          icon: require('./assets/my-prize.png'),
          title: '我的奖品',
          jump: () => {
            this.$router.push({
              name: 'MyPrize'
            })
          }
        },
        {
          icon: require('./assets/record.png'),
          title: '开盒记录',
          jump: () => {
            this.$router.push({
              name: 'BoxRecord'
            })
          }
        },
        {
          icon: require('./assets/problem.png'),
          title: '问题反馈',
          jump: () => {
            location.href = 'https://wap.beeplaying.com/xmWap/#/my/feedback'
            // location.href = findUrl(problemUrl, `https://wap.beeplaying.com/wap/home/#/problem?channel=${GLOBALS.channel}`)
          }
        }
      ]
    }
  },
  components: {
    Row
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
