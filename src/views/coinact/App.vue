<template>
  <section class="coinact">
    <div class="time" v-if="countdown.time">{{countdown.time.split('分')[0]+'分'}}结束</div>
    <img src="./images/back.png" alt="" class="back" @click="back">
    <template v-if="actInfo&&actInfo.state==1">
    </template>
    <com-pop ref="comPop" :awardData="awardData"></com-pop>
  </section>
</template>

<script>
  import {getActInfo, getPackages} from './utils/api'

  export default {
    name: 'coinact',
    components: {
      comPop: () => import('./components/comPop')
    },
    data() {
      return {
        actInfo: null,
        packages: [],
        countdown: {
          time: ''
        },
        awardData: null
      }
    },
    async mounted() {
      await this.getPackages()
      await this.getActInfo()
      GLOBALS.marchSetsPoint('P_H5PT0304', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
    },
    methods: {
      back() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      async getActInfo() {
        let {code, data} = await getActInfo()
        if (code == 200) {
          this.actInfo = data
          if (this.actInfo.popup) {
            let packageBag = this.packages.filter(item => item.bizId == this.actInfo.bizId)[0]
            if (packageBag) {
              this.awardData = {
                name: packageBag.name,
                content: packageBag.content,
                productIcon: packageBag.productIcon,
                isCat: this.packages.length >= 4 && this.packages.slice(-1)[0].bizId == this.actInfo.bizId
              }
              setTimeout(() => {
                GLOBALS.marchSetsPoint('A_H5PT0304003700')
                this.$refs.comPop.showPop()
              }, 1000)
            }
          }
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
      },
      gotopay(item) {
        if (item.buyFlag == 1) {
          localStorage.setItem('originDeffer', window.location.href)
          GLOBALS.marchSetsPoint('A_H5PT0304003699', {
            product_price: item.price,
            product_id: item.bizId,
            product_name: item.name
          })   // 点击任意礼包
          localStorage.setItem('JDD_PARAM', JSON.stringify(item))
          localStorage.setItem('payment', JSON.stringify(item))
          location.href =
            'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
        }
      }
    },
    watch: {
      'countdown.time': function (val) {
        if (!val) {
          this.getActInfo()
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
      position: absolute;
      top: 1.83rem;
      left: 0;
      right: 0;
      z-index: 2;
      text-align: center;
      font-size: .24rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    .back {
      position: absolute;
      top: .2rem;
      left: -.1rem;
      width: .76rem;
      height: .5rem;
      z-index: 2;
    }
    .package1 {
      position: absolute;
      top: 2.3rem;
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
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: .41rem 0 .23rem;
      box-sizing: border-box;
      .item {
        width: 3.74rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        img {
          width: 1.5rem;
          height: 1.5rem;
        }
        &:nth-child(1) {
          width: 2.24rem;
          height: 3rem;
          flex-direction: column;
          justify-content: center;
          img {
            margin-bottom: .16rem;
          }
          .container .content {
            text-align: center;
          }
        }
        .container {
          position: relative;
          width: 2.24rem;
          height: 1.34rem;
          .content {
            font-size: .24rem;
            font-weight: 800;
            color: rgba(255, 255, 255, 1);
            line-height: .3rem;
            display: flex;
            justify-content: center;
          }
          .btn {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 2.24rem;
            height: .9rem;
            background: url("./images/buybtn.png");
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .27rem;
            font-weight: bold;
            color: rgba(195, 87, 0, 1);
            padding-top: .15rem;
            box-sizing: border-box;
            &.buyed {
              background: url("./images/buyed.png");
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .package2 {
      position: absolute;
      top: 6.3rem;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.72rem;
      height: 5.17rem;
      background: url("./images/paybg2.png");
      background-size: 100% 100%;
      z-index: 2;
      padding: .39rem 0 .3rem;
      box-sizing: border-box;
      .item {
        padding-left: .25rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 1.6rem;
          height: 1.6rem;
        }
        .content {
          margin-left: .06rem;
          font-size: .24rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 1);
          line-height: .4rem;
          display: flex;
          justify-content: center;
        }
        .btn {
          width: 2.24rem;
          height: .9rem;
          background: url("./images/buybtn.png");
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .27rem;
          font-weight: bold;
          color: rgba(195, 87, 0, 1);
          padding-top: .15rem;
          box-sizing: border-box;
          &.buyed {
            background: url("./images/buyed.png");
            background-size: 100% 100%;
          }
        }
      }
      .pics {
        width: 6.4rem;
        margin: .16rem auto 0;
        display: flex;
        justify-content: space-around;
        img {
          width: 2rem;
          height: 2.72rem;
        }
      }
    }
  }
</style>
