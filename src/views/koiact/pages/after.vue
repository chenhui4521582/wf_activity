<template>
  <section class="after">
    <img src="./images/index/back.png" class="e-back" @click.stop="back">
    <profit :is-full="true" :from="1" ref="profit"></profit>
    <rule from="5" ref="success"></rule>
    <rule from="6" ref="fail"></rule>
  </section>
</template>
<script>
import {receivePopupAwards} from '../utils/api'
export default {
  name: 'after',
  components: {
    rule: () => import('../components/rule'),
    profit: () => import('./component/profit')
  },
  methods: {
    back () {
      history.back(-1)
    },
    async getPopupAwards () {
      let {code,data}=await receivePopupAwards()
      if(code==200&&data.pop){
        GLOBALS.marchSetsPoint('A_H5PT0211002240')
        if(data.ifWin){
          setTimeout(()=>{
            this.$refs.success&&this.$refs.success.showPop()
          })
        }else{
          setTimeout(()=>{
            this.$refs.fail&&this.$refs.fail.showPop()
          })
        }
      }
    },
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0211002242')
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
  background: #835BD9;
  padding: 0.26rem 0.1rem;
  box-sizing: border-box;
  /*border-radius: .4rem .4rem 0 0;
  background: linear-gradient(0deg,rgba(255,255,255,1),rgba(255,248,232,1));
  box-shadow: 0*0.01rem 10*0.01rem 8*0.01rem 0*0.01rem rgba(20,131,86,0.8), 0*0.01rem 6*0.01rem 2*0.01rem 0*0.01rem rgba(255,245,225,1), 0*0.01rem -6*0.01rem 2*0.01rem 0*0.01rem rgba(187,221,207,1);*/
  .e-back {
    width: 0.2rem;
    height: 0.36rem;
    position: fixed;
    left:.24rem;
    top: .24rem;
    z-index: 4;
  }
}
</style>
