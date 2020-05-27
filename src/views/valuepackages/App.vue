<template>
  <div class="valuepackages" v-if="actInfo&&actInfo.state==1">
    <img src="./images/back.png" alt="" class="back" @click="back">
    <img src="./images/rule.png" alt="" class="rule" @click="showRule">
    <div class="container">
      <div class="item" v-for="item in packages" @click="gotopay(item)" :style="{ background: `url(${getBackground(item)||''})`, backgroundSize: 'cover'}">
      </div>
    </div>
    <rule v-if="isShowRule" :actInfo="actInfo" @close="isShowRule=false"></rule>
  </div>
</template>
<script>
  import {getActInfo, getPackages} from './utils/api'

  export default {
    data() {
      return {
        actInfo: null,
        packages: [],
        isShowRule:false
      }
    },
    components:{
      rule:()=>import('./components/rule')
    },
    methods: {
      back(){
        GLOBALS.marchSetsPoint('A_H5PT0295003519')
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      showRule(){
        GLOBALS.marchSetsPoint('A_H5PT0295003520')
        this.isShowRule=true
      },
      getBackground(item) {
        return `${item.productIcon.includes('//')?item.productIcon:'//file.beeplaying.com'+item.productIcon}`
      },
      async getActInfo() {
        let {code, data} = await getActInfo()
        if (code == 200) {
          this.actInfo = data
          if (data.state == 1) {
            this.getPackages()
          }
        }
      },
      async getPackages() {
        let {code, data} = await getPackages()
        if (code == 200) {
          this.packages = data.mallBizConfigs
        }
      },
      gotopay(item) {
        localStorage.setItem('originDeffer', window.location.href)
        GLOBALS.marchSetsPoint('A_H5PT0295003518', {product_price: item.price, product_id: item.productId,product_name:item.name})
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
    },
    mounted() {
       GLOBALS.marchSetsPoint('P_H5PT0295', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })

      this.getActInfo()
    }
  }
</script>
<style lang="less">
  @import "../../common/css/base.css";

  .valuepackages {
    min-height: 100vh;
    position: relative;
    background: #60E4AB;
    padding-top: 2.16rem;
    padding-bottom: .8rem;
    box-sizing: border-box;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      width: 100%;
      height: 3.88rem;
      background: url("./images/top.png");
      background-size: 100% 100%;
    }
    .back{
      position: absolute;
      top: .3rem;
      left: 0;
      width: .8rem;
      height: .4rem;
      background: url("./images/back.png");
      background-size: 100% 100%;
    }
    .rule{
      position: absolute;
      top: .3rem;
      right: 0;
      width: .78rem;
      height: .4rem;
      background: url("./images/rule.png");
      background-size: 100% 100%;
    }
    .container {
      position: relative;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.88rem;
      height: 8.92rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      padding: .86rem .34rem 0;
      box-sizing: border-box;
      .item {
        display: inline-block;
        width: 3rem;
        height: 2.31rem;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(3, 195, 186, 1);
        border-radius: .26rem;
        padding: .13rem 0 0;
        box-sizing: border-box;
        margin-top: .2rem;
        &:nth-child(2n+1){
          margin-right: .2rem;
        }
      }
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1.59rem;
      background: url("./images/bottom.png");
      background-size: 100% 100%;
    }
  }
</style>
