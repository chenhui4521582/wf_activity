<template>
  <section class="payeddecoration">
    <div class="time">{{countdown.time}}</div>
    <div class="package1">
      <div class="item" v-for="(item,index) in packages.slice(0,3)">
        <img :src="item.productIcon|filter" alt="">
        <div class="content" v-html="item.content.replace('+','<br>')"></div>
        <div class="btn">{{item.price}}</div>
      </div>
    </div>
    <div class="package2" v-if="packages.length>=4"></div>
  </section>
</template>

<script>
  import {getActInfo, getPackages} from './utils/api'

  export default {
    name: 'payeddecoration',
    components: {},
    data() {
      return {
        actInfo: null,
        packages: [],
        countdown: {
          time: ''
        },
      }
    },
    mounted() {
      this.getActInfo()
      GLOBALS.marchSetsPoint('P_H5PT0284', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      this.getPackages()
    },
    methods: {
      back() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      async getActInfo() {
        let {code, data} = await getActInfo()
        if (code == 200) {
          this.actInfo = data
          !this.countdown.time && this.actInfo.countdown && GLOBALS.remainingTime(
            this,
            this.actInfo.countdown,
            this.countdown,
            true
          )
        }
      },
      async getPackages() {
        let {code, data} = await getPackages()
        if (code == 200) {
          this.packages = data.mallBizConfigs
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../../common/css/base.css";

  .payeddecoration {
    height: 100vh;
    background: #5741D1;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 2.78rem;
      background: url("./images/case.png");
      background-size: 100% 100%;
      z-index: 1;
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 11.6rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
    }
    .time {
      position: relative;
      top: 1.83rem;
      z-index: 2;
      text-align: center;
      font-size: .24rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    .package1{
      position: absolute;
      top:2.3rem;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.72rem;
      height: 3.88rem;
      background: url("./images/paybg1.png");
      background-size: 100% 100%;
      z-index: 2;
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 3.74rem;
        height: 1.5rem;
        img{
          width: 1.5rem;
          height: 1.5rem;
        }
        &:nth-child(1){
          width: 2.24rem;
          height: 3rem;
        }
      }
    }
    .package2{
      position: absolute;
      top:6.3rem;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.72rem;
      height: 5.17rem;
      background: url("./images/paybg2.png");
      background-size: 100% 100%;
      z-index: 2;
    }
  }
</style>
