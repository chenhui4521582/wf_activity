<template>
  <div class="ranking">
    <div class="title">排行榜统计截至5月5日</div>
  </div>
</template>
<script type="text/javascript">
import Loading from '@/components/common/loading'
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'ranking',
  data: () => ({
    ranking: []
  }),
  components: {
    Loading
  },
  computed: {
    top3List () {
      let ranking = [...this.ranking]
      return ranking.splice(0,3)
    },
    otherList () {
      let ranking = [...this.ranking]
      return ranking.splice(3)
    }
  },
  methods: {
    _getRanking () {
      Services.getRanking().then(res => {
        const {code} = _get(res, 'data')
        if(code == 200) {
          this.ranking = _get(res, 'data.data.rankList', [])
        }
      })
    }
  },
  mounted () {
    this._getRanking()
  }
}
</script>
<style lang="less" scoped>
.ranking {
  .title {
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
}
</style>
