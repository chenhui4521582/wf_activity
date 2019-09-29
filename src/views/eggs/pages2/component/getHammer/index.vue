<template>
  <div class="get-hammer">
    <h4 class="s-title"><em></em>购买礼包得钥匙</h4>
    <span class="info">礼包可不限次购买，重复获取钥匙</span>
    <div class="g-package">
      <div class="g-package-container g1">
        <ul>
          <li v-for="item in leaguePacksListArr" @click="gotopay(item)">
            <span class="item-text">{{item.content.split('+')[0]}}<br />+{{item.content.split('+')[1]}}</span>
            <a href="javascript:" class="btn-price">￥{{item.price}}</a>
          </li>
        </ul>
      </div>
      <div class="g-package-info">
        <ul>
          <li>已购买礼包：{{pUserInfo.rechargeTime}}次</li>
          <li>累计钥匙：{{pUserInfo.rechargeReturnNum}}把</li>
        </ul>
      </div>
    </div>
    <h4 class="s-title"><em></em>玩游戏得钥匙</h4>
    <span class="info">{{rulesExplain}}</span>
    <div class="g-package">
      <div class="g-package-container g2">
        <hit-percent :detail-data="pUserInfo"></hit-percent>
      </div>
      <div class="g-package-info">
        <ul>
          <li>已支持金叶：{{pUserInfo.gameBetting | filterPrice}}</li>
          <li>累计钥匙：{{pUserInfo.gameReturnNum }}把</li>
        </ul>
      </div>
    </div>
    <div class="gamelist" style="display: flex">
      <div class="item" v-for="item in gamelist" @click="gotogame(item)" style="width: 2.2rem">
        <img :src="item.images" alt="" style="width: 100%">
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { showLeaguePacksList, userInfo } from '../../../utils/api'
export default {
  data () {
    return {
      leaguePacksListArr: [],
      pUserInfo: {},
      gamelist:[{
        images:`${require('./images/tangguo.png')}`,
        url:'/crush'
      },{
        images:`${require('./images/zhuoqiu.png')}`,
        url:'/billiards'
      },{
        images:`${require('./images/sanguo.png')}`,
        url:'/kingdom2'
      }]
    }
  },
  props: {
    rulesExplain: {
      type: String,
      default: ''
    }
  },
  computed: {
    channel () {
      return localStorage.getItem('APP_CHANNEL') || ''
    }
  },
  components: {
    hitPercent: () => import('./component/hitPercent/hitPercent.vue')
  },
  mounted () {
    this.getShowLeaguePacksList()
    this.getUserInfo()
  },
  filters: {
    filterPrice: function (value) {
      if (value) {
        return value > 10000 ? value / 10000 + '万' : value
      } else {
        return 0
      }
    }
  },
  methods: {
    gotopay (item) {
      // localStorage.setItem('payment', JSON.stringify(item))
      localStorage.setItem('originDeffer', window.location.href)
      GLOBALS.marchSetsPoint('A_H5PT0075001467', { recharge_rmb: item.price, product_id: item.bizId })   // H5平台-砸金蛋-获取钥匙大浮层-点击任意礼包
      localStorage.setItem('JDD_PARAM', JSON.stringify(item))
      // if (window.linkUrl.getBackUrlFlag(this.channel) === 'xmWap'){
      //   location.href = 'https://wap.beeplaying.com/xmWap/#/payment/paymentlist'
      // } else if (window.linkUrl.getBackUrlFlag(this.channel) == 'bdWap' && this.channel != '100001') { // 好看、全民小视频
      //   location.href = 'https://wap.beeplaying.com/payment/#/bdPayment'
      // } else {
      //   location.href = 'https://wap.beeplaying.com/payment/#/payment'
      // }
      if (window.linkUrl.getBackUrlFlag(this.channel) == 'bdWap' && this.channel != '100001') { // 好看、全民小视频
        location.href = 'https://wap.beeplaying.com/payment/#/bdPayment'
      } else {
        location.href = 'https://wap.beeplaying.com/payment/#/payment'
      }
    },
    async getShowLeaguePacksList () {
      const { code, data } = await showLeaguePacksList()
      if (code === 200) {
        this.leaguePacksListArr = data.leaguePacksList
      }
    },
    async getUserInfo () {
      const { code, data } = await userInfo()
      if (code === 200) {
        this.pUserInfo = data
      }
    },
    isGoBDPayment () {
      return window.linkUrl.getBackUrlFlag(this.channel) == 'bdWap'
    },
    gotogame(item){
      GLOBALS.jumpOutsideGame(item.url)
    }
  }
}
</script>
<style lang="less" scoped>
.get-hammer {
  padding: 1.24rem 0.38rem 0;
    height: calc(100%);
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
  .s-title {
    font-size: 0.24rem;
    color: #c07002;
    display: flex;
    align-items: center;
    margin-bottom: 0.12rem;
    em {
      display: inline-block;
      width: 0.12rem;
      height: 0.12rem;
      border-radius: 50%;
      background: #e2812a;
      margin-right: 0.05rem;
    }
  }
  .info {
    color: #c07002;
    padding-left: 0.17rem;
    line-height: 0.28rem;
  }
}
.g-package {
  width: 100%;
  background: #fec041;
  margin-bottom: 0.26rem;
  border-radius:.15rem;
  .g-package-container {
    background: #fffaf1;
    margin-top: 0.19rem;
    border-radius:.15rem .15rem 0 0;
    &.g1 {
      height: 2.94rem;
    }
    &.g2 {
      height: 2.24rem;
    }
    ul {
      display: flex;
      justify-content: center;
      padding-top: 0.21rem;
      justify-content: center;
    }
    li {
      width: 1.79rem;
      height: 2.48rem;
      text-align: center;
      position: relative;
      &:nth-child(1) {
        background: url(../../images/package/i-288.png) no-repeat center top;
        background-size: 100% 100%;
      }
      &:nth-child(2) {
        background: url(../../images/package/i-888.png) no-repeat center top;
        background-size: 100% 100%;
        margin: 0 0.26rem;
      }
      &:nth-child(3) {
        background: url(../../images/package/i-1888.png) no-repeat center top;
        background-size: 100% 100%;
      }
    }
    .item-text {
      font-size: 0.2rem;
      color: #9a5619;
      line-height: 0.26rem;
      position: relative;
      top: 1.38rem;
    }
    .btn-price {
      display: block;
      width: 0.96rem;
      height: 0.39rem;
      line-height: 0.39rem;
      background: #ff7f32;
      border-radius: 0.2rem;
      font-size: 0.24rem;
      color: #ecf4ff;
      font-weight: bold;
      text-align: center;
      margin: 0 auto;
      position: absolute;
      bottom: 0.17rem;
      left: 50%;
      margin-left: -0.48rem;
    }
  }
}
.g-package-info {
  ul {
    display: flex;
    align-items: center;
    height: 0.52rem;
    text-align: left;
    li {
      flex: 1;
      height: 0.52rem;
      line-height: 0.52rem;
      position: relative;
      font-size: 0.24rem;
      color: #944d00;
      text-indent: 0.27rem;
      &:nth-child(1):before {
        content: "";
        width: 1px;
        height: 0.33rem;
        background: rgba(178, 112, 20, 1);
        position: absolute;
        right: 0;
        top: 0.1rem;
      }
    }
  }
}
</style>
