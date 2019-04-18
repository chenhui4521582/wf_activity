<template>
  <div class="day-ranking">
    <ranking-header />
    <ranking-time />
    <ranking-list />
    <game-list />
    <ranking-rule />
  </div>
</template>

<script>
import common from '@/common/js/utils'
export default {
  name: 'day-ranking',
  data: () => ({
  }),
  components: {
	rankingHeader: () => import('./component/rankingHeader'),
	rankingTime: () => import('./component/rankingTime'),
	rankingList: () => import('./component/rankingList'),
	gameList: () => import('./component/gameList'),
	rankingRule: () => import('./component/rankingRule')
  },
  methods: {

  },
  mounted () {
    this.batchId = common.getUrlParam('batchId');
	this.APP_CHANNEL = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL'):common.getUrlParam('channel')
	this.ACCOUNT_TOKEN = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN'):common.getUrlParam('token')
  }
}
</script>

<style scoped type="less">
@import '../../common/css/base.css';
</style>

<style lang="less" scoped>
.day-ranking{
  background: #0A0A0A;
}
</style>
