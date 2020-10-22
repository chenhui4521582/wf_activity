<template>
  <section class="rank">
    <div class="rank-icon" @click.stop="showRank"></div>
    <profit v-show="isShowRank" @close="closeRank" :is-full="true" ref="profit"></profit>
  </section>
</template>

<script>
import Profit from '../profit/index'
export default {
  name: 'rank',
  components: {
    Profit
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
    },
    closeRank () {
      this.isShowRank = false
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
</style>
