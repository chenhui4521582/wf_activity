<template>
  <section class="after">
    <img src="../images/rank/back.png" class="e-back" @click.stop="back">
    <profit :is-full="true" @set-my-info="setMyInfo" :from="1"></profit>
  </section>
</template>

<script>
export default {
  name: 'after',
  components: {
    profit: () => import('./component/profit')
  },
  async beforeRouteEnter (to, from, next) {
    next()
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
      GLOBALS.marchSetsPoint('A_H5PT0156001779')   // 排行榜返回
      this.$router.push('/')
    },
    async closePop () {
      this.isShowPop = false
    },
    setMyInfo (data) {
      this.myInfo = data
      this.isShowPop = true
      if (this.myInfo && this.myInfo.myRank && this.myInfo.myRank <= this.myInfo.rankSize) {
        this.awardsList = [{
          awardsType: 'jyz',
          awardsName: this.myInfo.jyzAmount ? (this.myInfo.jyzAmount >= 10000 ? this.myInfo.jyzAmount / 10000 + '万' : this.myInfo.jyzAmount) : 0
        }, {
          awardsType: 'jdk',
          awardsName: this.myInfo.jdkAmount ? (this.myInfo.jdkAmount >= 10000 ? this.myInfo.jdkAmount / 10000 + '万元' : this.myInfo.jdkAmount + '元') : 0 + '元'
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
  @import '../../../common/css/base.css';
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
  background: #46272E;
  padding: 0.26rem 0.1rem;
  box-sizing: border-box;
  .e-back {
    width: 0.88rem;
    height: 0.88rem;
    position: fixed;
    top: 0.26rem;
    left: 0.1rem;
    z-index: 11;
  }
}
</style>
