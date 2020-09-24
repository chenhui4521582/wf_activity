<template>
  <div class="valuepackages" v-if="actInfo&&actInfo.state==1">
    <p class="back" @click="back">返回</p>
    <p class="rule" @click="showRule">规则</p>
    <div class="container">
      <div class="item" v-for="item in packages" @click="gotopay(item)"
        :style="{ backgroundImage: `url(${getBackground(item)||''})`}">
      </div>
    </div>
    <rule v-if="isShowRule" :actInfo="actInfo" @close="isShowRule=false"></rule>
  </div>
</template>
<script>
import { getActInfo, getPackages } from './utils/api'

export default {
  data () {
    return {
      actInfo: null,
      packages: [],
      isShowRule: false
    }
  },
  components: {
    rule: () => import('./components/rule')
  },
  methods: {
    back () {
      GLOBALS.marchSetsPoint('A_H5PT0295003519')
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
    },
    showRule () {
      GLOBALS.marchSetsPoint('A_H5PT0295003520')
      this.isShowRule = true
    },
    getBackground (item) {
      return `${item.productIcon.includes('//') ? item.productIcon : '//file.beeplaying.com' + item.productIcon}`
    },
    async getActInfo () {
      let { code, data } = await getActInfo()
      if (code == 200) {
        this.actInfo = data
        if (data.state == 1) {
          this.getPackages()
        }
      }
    },
    async getPackages () {
      let { code, data } = await getPackages()
      if (code == 200) {
        this.packages = data.mallBizConfigs
      }
    },
    gotopay (item) {
      localStorage.setItem('originDeffer', window.location.href)
      GLOBALS.marchSetsPoint('A_H5PT0295003518', { product_price: item.price, product_id: item.productId, product_name: item.name })
      localStorage.setItem('JDD_PARAM', JSON.stringify(item))
      localStorage.setItem('payment', JSON.stringify(item))
      location.href =
        'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
    },
  },
  mounted () {
    GLOBALS.marchSetsPoint('P_H5PT0295', {
      source_address: GLOBALS.getUrlParam('from') || ''
    })

    this.getActInfo()
  }
}
</script>
<style lang="less">
@import '../../common/css/base.css';

.valuepackages {
  min-height: 100vh;
  position: relative;
  background: #fc685c;
  padding-top: 2.3rem;
  padding-bottom: 0.6rem;
  box-sizing: border-box;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 3.88rem;
    background: url('./images/top.png');
    background-size: 100% 100%;
  }
  .back,
  .rule {
    position: absolute;
    top: 0.3rem;
    width: 0.8rem;
    height: 0.4rem;
    background: #7182ff;
    color: #fff;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.22rem;
  }
  .back {
    left: 0;
    border-radius: 0 0.2rem 0.2rem 0;
  }
  .rule {
    right: 0;
    border-radius: 0.2rem 0 0 0.2rem;
  }
  .container {
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    width: 6.72rem;
    max-height: 9.94rem;
    background: #fff;
    padding: 0.2rem 0.26rem;
    box-sizing: border-box;
    box-shadow: 0.02rem 0.05rem 0.05rem 0 rgba(149, 11, 0, 0.29);
    border-radius: 0.46rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .item {
      display: inline-block;
      width: 3rem;
      height: 2.31rem;
      border-radius: 0.26rem;
      box-sizing: border-box;
      margin-top: 0.2rem;
      background-size: 100% 100%;
      border: 1px solid #f16d59;
      &:nth-child(2n + 1) {
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
