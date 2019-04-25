<template>
  <div class="day-ranking" :class="{'no-scroll': noMove}">
    <ranking-header />
    <ranking-list
      @openGames="openGames"
    />
    <game-list
      @noScroll="noScroll"
      @scroll="scroll"
      ref="games"
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
	rankingList: () => import('./component/rankingList'),
	gameList: () => import('./component/gameList'),
	rankingRule: () => import('./component/rankingRule')
  },
  methods: {
    noScroll () {
	  this.noMove = true
    },
    scroll () {
	  this.noMove = false
    },
	openGames () {
      this.$refs.games.show()
    },
    init () {
      let url = '//ops-api.beeplay123.com/ops/api/hoursRanking/getUserIncreaseScore'
      this.axios.post(url).then(res => {
        let {code, data = 0} = res.data
        if(code == 200 && data > 0) {
		  this.$toast.show({
			message: `恭喜您获得${data}幸运分！`,
			duration: 3000
		  })
        }
      })
    }
  },
  mounted () {
    //埋点 进入页面
	GLOBALS.marchSetsPoint('A_H5PT0075000718')
    this.init()
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
