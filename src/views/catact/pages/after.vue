<template>
  <section class="after">
    <img src="./images/index/back.png" class="e-back" @click.stop="back">
    <rule :rule-main="rulesInfo"></rule>
    <profit :is-full="true" :from="1" ref="profit"></profit>
    <common-pop :is-show-pop="isShowPop" :my-info="myInfo" :is-end="true" @close-pop="closePop" @closePopend="$refs.profit.isOpen=true"></common-pop>
  </section>
</template>

<script>
import { activityInfo,receivePopupAwards} from '../utils/api'
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
      if (data.state==1) {
        next({ path: '/' })
      } else if (data.countdown) {
        next({ path: '/' })
      } else {
        next(vm => {
          vm.rulesInfo = vm.getActTime(data)
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
      GLOBALS.marchSetsPoint('A_H5PT0201002053')   //H5平台-撸猫活动-返回按钮点击(跳转平台首页)
      location.href= window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
    },
    async closePop () {
      this.isShowPop = false
    },
    async getPopupAwards () {
      let {code,data}=await receivePopupAwards()
      if(code==200&&data.flag==0){
        this.myInfo = data
        this.isShowPop = true
      }
    },
    getActTime(activityInfoData){
      if(activityInfoData){
        return `${activityInfoData.beginDate.split('-').splice(1).join('.')}-${activityInfoData.endDate.split('-').splice(1).join('.')}`
      }else{
        return ''
      }
    },
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0201002074')   //H5平台-撸猫活动-排行榜发榜页加载完成
    this.getPopupAwards()
  }
}
</script>
<style scoped>
.after >>> .rule {
  z-index: 4 !important;
}
.after >>> .rule img {
  top: .28rem;
  right: 0;
}
</style>

<style rel="stylesheet/less" lang="less" scoped>
.after {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  position: relative;
  /*background: #ffe6b3;*/
  padding: 0.26rem 0.1rem;
  box-sizing: border-box;
  border-radius: .4rem .4rem 0 0;
  background: linear-gradient(0deg,rgba(255,255,255,1),rgba(255,248,232,1));
  box-shadow: 0*0.01rem 10*0.01rem 8*0.01rem 0*0.01rem rgba(20,131,86,0.8), 0*0.01rem 6*0.01rem 2*0.01rem 0*0.01rem rgba(255,245,225,1), 0*0.01rem -6*0.01rem 2*0.01rem 0*0.01rem rgba(187,221,207,1);
  .e-back {
    width: 0.78rem;
    height: 0.5rem;
    position: fixed;
    top: 0.28rem;
    left: 0rem;
    z-index: 4;
  }
}
</style>
