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
            let channelFlag = window.linkUrl.getBackUrlFlag(GLOBALS.channel)
            let url = `https://wap.beeplaying.com/${channelFlag}/#/problem?channel=${GLOBALS.channel}`
            switch (channelFlag) {
              case 'wap':
                url = `https://wap.beeplaying.com/${channelFlag}/home/#/problem?channel=${GLOBALS.channel}`
                break;
              case 'xmWap':
                url = `https://wap.beeplaying.com/${channelFlag}/#/issues?channel=${GLOBALS.channel}`
                break;
              default:
                break;
            }
            location.href = url
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
