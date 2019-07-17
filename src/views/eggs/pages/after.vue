<template>
  <section class="after">
    <img src="./images/index/back.png" class="e-back" @click="back">
    <rule :rule-main="rulesInfo" :from="1"></rule>
    <profit :is-full="true" @set-my-info="setMyInfo" :from="1"></profit>
    <common-pop :is-show-pop="isShowPop" :my-rank="myInfo.myRank" :rank-size="myInfo.rankSize" :is-end="true" :awards-list="awardsList" @close-pop="closePop"></common-pop>
  </section>
</template>

<script>
import { activityInfo } from '../utils/api'
export default {
  name: 'after',
  components: {
    rule: () => import('../components/rule'),
    commonPop: () => import('../components/commonPop'),
    profit: () => import('./component/profit')
  },
  async beforeRouteEnter (to, from, next) {
    const { code, data } = await activityInfo()
    if (code === 200) {
      if (data.open) {
        next({ path: '/' })
      } else if (data.countdown) {
        next({ path: '/before' })
      } else {
        next(vm => {
          vm.rulesInfo = data.rulesInfo
        })
      }
    } else {
      next()
    }
  },
  data () {
    return {
      isShowPop: false,
      awardsList: [],
      rulesInfo: '',
      myInfo: {}
    }
  },
  methods: {
    back () {
      history.go(-1)
      GLOBALS.marchSetsPoint('A_H5PT0075001481')   // H5平台-砸金蛋-活动已结束-点击返回
    },
    async closePop () {
      this.isShowPop = false
    },
    setMyInfo (data) {
      this.myInfo = data
      this.isShowPop = true
      if (this.myInfo && this.myInfo.myRank <= this.myInfo.rankSize) {
        this.awardsList = [{
          awardsType: 'jyz',
          awardsName: this.myInfo.jyzAmount >= 10000 ? this.myInfo.jyzAmount / 10000 + '万' : this.myInfo.jyzAmount
        }, {
          awardsType: 'jdk',
          awardsName: this.myInfo.jdkAmount >= 10000 ? this.myInfo.jdkAmount / 10000 + '万元' : this.myInfo.jdkAmount + '元'
        }]
      } else {
        this.awardsList = [{
          awardsType: 'end-empty'
        }]
      }
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0075001480')   // H5平台-砸金蛋-活动已结束-页面
  }
}
</script>
<style scoped>
.after >>> .rule {
  z-index: 4 !important;
}
.after >>> .rule img {
  top: 1.3rem;
  left: 0.1rem;
}
</style>

<style rel="stylesheet/less" lang="less" scoped>
.after {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  position: relative;
  background: #ffe6b3;
  padding: 0.26rem 0.1rem;
  box-sizing: border-box;
  .e-back {
    width: 0.88rem;
    height: 0.88rem;
    position: fixed;
    top: 0.26rem;
    left: 0.1rem;
    z-index: 4;
  }
}
</style>
