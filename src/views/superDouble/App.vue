<template>
  <main class="super-double">
    <template v-if="activityInfo&&(activityInfo.state===1||activityInfo.state===2)">
      <activity-title @open-pop="openPop" :info="activityInfo" />
      <stage ref="stage" v-model="curStageInfo" :info="activityInfo" @open-pop="openPop"
        @change-activity-info="changeActivityInfo" />
      <exchange ref="exchange" :info="activityInfo" @change-activity-info="changeActivityInfo"
        @open-pop="openPop" />
      <get-pop v-if="showGetPop" @open-pop="openPop" @on-close="showGetPop=false"
        @refresh="changeActivityInfo" />
    </template>
    <pop-up v-model="popType" v-show="popType" :cur-stage-info="curStageInfo"
      :award-info="awardInfo" :info="activityInfo" @callback="popUpCallback" />
  </main>
</template>

<script>
/* eslint-disable no-undef */
import { activityInfo, myRank } from './services/api'
export default {
  name: 'superDouble',
  components: {
    activityTitle: () => import('./component/activityTitle'),
    exchange: () => import('./component/exchange'),
    stage: () => import('./component/stage'),
    getPop: () => import('./component/getPop'),
    popUp: () => import('./component/popUp')
  },
  data () {
    return {
      activityInfo: {},
      popType: 0,
      curStageInfo: {},
      awardInfo: {
        desc: 'tg',
        img: require('./img/crush-icon.png')
      },
      showGetPop: false
    }
  },
  computed: {
  },
  mounted () {
    GLOBALS.marchSetsPoint('P_H5PT0301', {
      source_address: GLOBALS.getUrlParam('from') || ''
    }) // H5平台-猩猩点灯活动-页面加载完成
    this.init()
  },
  methods: {
    async init () {
      const { code, data } = await activityInfo()
      if (code === 200) {
        this.activityInfo = data
        this.getMyRank()
      }
    },

    async getMyRank () {
      const { code, data } = await myRank()
      if (code === 200) {
        if (data.popup || this.activityInfo.state === 2) {
          if (data.myRank >= 1 && data.myRank <= 10) {
            this.openPop(12, {
              desc: data.awardsList[0].awardsType,
              name: data.awardsList[0].awardsName,
              rank: data.myRank
            })
          } else {
            this.openPop(14)
          }
        }
      }
    },
    async changeActivityInfo () {
      const { code, data } = await activityInfo()
      if (code === 200) {
        this.activityInfo = data
      }
    },
    openPop (type, info) {
      if (type === 99) {
        this.showGetPop = true
        return
      }
      switch (type) {
        case 8:
          GLOBALS.marchSetsPoint('A_H5PT0301003605') // H5平台-疯狂翻倍活动-热门游戏推荐弹窗加载完成
          break

        default:
          break
      }
      this.awardInfo = info
      this.popType = type
    },
    popUpCallback (type) {
      switch (type) {
        case 4:
          this.$refs.stage._quit()
          GLOBALS.marchSetsPoint('A_H5PT0301003600') // H5平台-疯狂翻倍活动-请留步退出弹窗-退出并领取点击
          break
        case 6:
          GLOBALS.marchSetsPoint('A_H5PT0301003602') // H5平台-疯狂翻倍活动-糖豆不足弹窗-立即去玩点击
          this.$nextTick(() => {
            this.openPop(8)
          })
          break
        case 8:
          GLOBALS.marchSetsPoint('A_H5PT0301003607') // H5平台-疯狂翻倍活动-热门游戏推荐弹窗-返回大厅点击
          window.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
          break
        case 10:
          this.$refs.exchange._exchange(this.awardInfo)
          GLOBALS.marchSetsPoint('A_H5PT0301003604') // H5平台-疯狂翻倍活动-确认兑换弹窗-立即兑换点击
          break
        case 5:
          GLOBALS.marchSetsPoint('A_H5PT0301003598') // H5平台-疯狂翻倍活动-翻倍失败弹窗-知道了点击
          break
        case 9:
          GLOBALS.marchSetsPoint('A_H5PT0301003596') // H5平台-疯狂翻倍活动-翻倍成功弹窗-知道了点击
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
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  transform: translate3D(0, 0, 0);
}
</style>
