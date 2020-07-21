<template>
  <section class="coinact">
    <div class="coinact_bg">
      <img src="./images/back.png" alt="" class="back" @click="back">
      <img src="./images/rule.png" alt="" class="rule" @click="back">
      <div class="time">活动时间:10/11 23:59:50-10/12 23:59:50</div>
      <div class="total_gain">
        <div class="item">累计获得：<i>000/300金币</i></div>
        <div class="item">每支持10000金叶=1个金币（部分游戏不计入）</div>
      </div>
      <div class="coin_stage">
        <div class="item">3</div>
        <div class="item">下一达成阶段</div>
      </div>
      <div class="coin_list">
        <div class="coin_left">
          <div class="item" v-for="item in list"
               :class="{gray:item.status==2,complete:item.status==0,receive:item.status==1}">
            <div class="price">{{item.price}}元</div>
            <div class="status">{{status[item.status]}}元</div>
          </div>
        </div>
        <div class="coin_percent" v-for="(item,index) in list" :class="{gray:item.status==0}">{{index+1}}</div>
        <div class="coin_right">
          <div class="item" v-for="item in list"
               :class="{gray:item.status==2,complete:item.status==0,receive:item.status==1}">
            <div class="price">{{item.price}}元</div>
            <div class="status">{{status[item.status]}}元</div>
          </div>
        </div>
      </div>
    </div>
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
        awardData: null,
        status: ["去完成", "未领取", "已领取"],
        list: [{
          price: 1,
          status: 0
        }, {
          price: 11,
          status: 1
        }, {
          price: 111,
          status: 2
        }, {
          price: 1,
          status: 0
        }, {
          price: 1,
          status: 0
        }, {
          price: 1,
          status: 0
        }]
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

  .coinact {
    min-height: 100vh;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2.28rem;
      background: url("./images/bgline.png");
      background-size: 100% 100%;
      z-index: 1;
    }
    .coinact_bg {
      position: relative;
      left: 0;
      right: 0;
      height: 14.86rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
    }
    .time {
      position: absolute;
      top: 3.84rem;
      left: 0;
      right: 0;
      z-index: 2;
      text-align: center;
      font-size: .2rem;
      font-weight: 400;
      color: rgba(171, 74, 32, 1);
    }
    .back, .rule {
      position: absolute;
      top: .2rem;
      left: .16rem;
      width: .66rem;
      height: .66rem;
      z-index: 2;
      &.rule {
        top: 1.06rem;
      }
    }
    .total_gain {
      position: absolute;
      top: 4.25rem;
      height: 1rem;
      left: .5rem;
      width: 4.3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .item {
        font-size: .18rem;
        font-weight: 400;
        color: rgba(160, 83, 13, 1);
        text-align: center;
        &:nth-child(1) {
          font-size: .32rem;
          font-weight: bold;
          color: rgba(156, 47, 13, 1);
          margin-bottom: .15rem;
          i {
            color: rgba(255, 0, 0, 1);
          }
        }
      }
    }
    .coin_stage {
      position: absolute;
      top: 4.25rem;
      height: 1rem;
      right: .5rem;
      width: 1.71rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .item {
        font-size: .18rem;
        font-weight: 400;
        color: rgba(232, 198, 255, 1);
        text-align: center;
        &:nth-child(1) {
          font-size: .48rem;
          font-weight: bold;
          color: rgba(255, 253, 250, 1);
          margin-bottom: .13rem;
          line-height: 1;
        }
      }
    }
    .coin_list{
      display: flex;
      justify-content: space-between;
      .coin_left{
        .item{
          width: 2.41rem;
          height: 1.39rem;
          background: url("./images/left.png");
          background-size: 100% 100%;
          font-size:.36rem;
          font-weight:bold;
          color:rgba(254,240,91,1);
          .status{
            width:1.04rem;
            height:.44rem;
            line-height:.44rem;
            text-align: center;
            background:rgba(110,26,173,1);
            border-radius:.22rem;
            font-size:.24rem;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
          &.receive{
            .status{
              background:rgba(255,240,225,1);
              color:rgba(207,54,54,1);
            }
          }
          &.gray{
            background: url("./images/l_gray.png");
            background: 100% 100%;
            color:rgba(232,232,232,1);
            .status{
              background:rgba(110,108,108,1);
            }
          }
        }
      }
    }
  }
</style>
