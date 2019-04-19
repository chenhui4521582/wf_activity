<template>
  <div class="day-ranking" :class="{'no-scroll': noMove}">
    <ranking-header />
    <ranking-time
      @switchTime="switchTime"
    />
    <ranking-list
      :timeId = timeId
    />
    <game-list
      @noScroll="noScroll"
      @scroll="scroll"
    />
    <ranking-rule />
  </div>
</template>

<script>

export default {
  name: 'day-ranking',
  data: () => ({
    timeId:'',
	noMove: false
  }),
  components: {
	rankingHeader: () => import('./component/rankingHeader'),
	rankingTime: () => import('./component/rankingTime'),
	rankingList: () => import('./component/rankingList'),
	gameList: () => import('./component/gameList'),
	rankingRule: () => import('./component/rankingRule')
  },
  methods: {
	switchTime (id) {
      this.timeId = id
    },
    noScroll () {
	  this.noMove = true
    },
    scroll () {
	  this.noMove = false
    }
  }
}
</script>

<style scoped type="less">
@import '../../common/css/base.css';
</style>

<style lang="less" scoped>
.day-ranking{
  background: #0A0A0A;
  &.no-scroll {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}

</style>
