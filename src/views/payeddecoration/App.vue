<template>
  <section class="payeddecoration">
  </section>
</template>

<script>
  import {getActInfo,getPackages} from './utils/api'
  export default {
    name: 'payeddecoration',
    components: {},
    data() {
      return {
        actInfoData:null
      }
    },
    mounted() {
      this.getActInfo()
      GLOBALS.marchSetsPoint('P_H5PT0284', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
    },
    methods: {
      back() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      async getActInfo(){
        let {code,data}=await getActInfo()
        if(code==200){
          this.actInfoData=data
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../../common/css/base.css";
  .payeddecoration {
    height: 100vh;
  }
</style>
