<template>
  <main class="super-double">
    <template v-if="activityInfo&&activityInfo.state===1">
      <activity-title @open-pop="openPop" />
      <stage ref="stage" v-model="curStageInfo" :info="activityInfo" @open-pop="openPop" />
      <exchange :info="activityInfo" @open-pop="openPop" />
    </template>
    <pop-up v-model="popType" v-show="popType" :cur-stage-info="curStageInfo" :info="activityInfo"
      @callback="popUpCallback" />
  </main>
</template>

<script>
/* eslint-disable no-undef */
import { activityInfo } from './services/api'
export default {
  name: 'superDouble',
  components: {
    activityTitle: () => import('./component/activityTitle'),
    exchange: () => import('./component/exchange'),
    stage: () => import('./component/stage'),
    popUp: () => import('./component/popUp')
  },
  data () {
    return {
      activityInfo: {},
      popType: 5,
      curStageInfo: {}
    }
  },
  computed: {
  },
  mounted () {
    GLOBALS.marchSetsPoint('P_H5PT0301', {
      source_address: GLOBALS.getUrlParam('from') || ''
    }) // H5平台-猩猩点灯活动-页面加载完成
    this.getActivityInfo()
  },
  methods: {
    async  getActivityInfo () {
      const { code, data } = await activityInfo()
      if (code === 200) {
        this.activityInfo = data
      }
    },
    openPop (type) {
      this.popType = type
    },
    popUpCallback (type) {
      switch (type) {
        case 4:
          this.$refs.stage._quit()
          break
        case 8:
          window.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
          break

        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.super-double {
  min-height: 100vh;
  background-color: #00abfe;
  font-size: 0.24rem;
  padding-bottom: 0.32rem;
}
</style>
<style lang="less" >
.module-title {
  font-size: 0.3rem;
  padding-top: 0.36rem;
  color: #003d5b;
  font-weight: bold;
}
.cost-btn {
  width: 3.44rem;
  height: 1.14rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -1.72rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-size: 0.28rem;
  line-height: 0.32rem;
  font-weight: bold;
  color: #003d5b;
  box-sizing: border-box;
  padding-top: 0.28rem;
}
img {
  transform: translate3D(0, 0, 0);
}
</style>
