<template>
  <section class="rank">
    <div class="rank-icon" @click.stop="showRank"></div>
    <transition :name="actInfo.state===2?'':'fade'">
      <profit v-show="isShowRank" @close="closeRank" @get-dice="getDice" :act-info="actInfo"
        ref="profit"></profit>
    </transition>
  </section>
</template>

<script>
import Profit from '../profit/index'
export default {
  name: 'rank',
  components: {
    Profit
  },
  props: {
    actInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isShowRank: false
    }
  },
  mounted () {

  },
  methods: {
    showRank () {
      this.isShowRank = true
      this.$refs.profit.getRankList()
      GLOBALS.marchSetsPoint('A_H5PT0345004348') // H5平台-欢乐大富翁-排行榜页面加载完成
    },
    closeRank () {
      this.isShowRank = false
    },
    getDice () {
      this.isShowRank = false
      this.$emit('get-dice', 'rank')
    }
  },
  watch: {
    actInfo (info) {
      if (info.state === 2) {
        this.isShowRank = true
        this.$refs.profit.getRankList(info)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.rank {
  .rank-icon {
    position: fixed;
    width: 0.88rem;
    height: 2.32rem;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    z-index: 3;
    top: 5rem;
    right: 0;
    background-image: url(./img/rank-btn-icon.png);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  left: 100vw !important;
  opacity: 0;
}
</style>
