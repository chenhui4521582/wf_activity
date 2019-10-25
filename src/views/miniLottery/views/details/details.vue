<template>
  <div class="details">
    <user-info :userInfo="userInfo"/>
    <goods-msg :details="details" :isAwards="isAwards" @sendAward="sendAward"/>
    <current-lottery :details="details" :isAwards="isAwards"/>
    <prov-user :details="details" :isAwards="isAwards"/>
    <goods-desc :details="details"/>
    <buy-btn :details="details" :isAwards="isAwards" @refresh="_getDetails"/>
  </div>
</template>
<script>
import Services from '../../services/services'
import _get from 'lodash.get'
import UserInfo from './components/userInfo'
import GoodsMsg from './components/goodsMsg'
import CurrentLottery from './components/currentLottery'
import ProvUser from './components/provUser'
import BuyBtn from './components/buyBtn'
import GoodsDesc from './components/goodsDescription'
export default {
  name: 'LotteryDetails',
  data: ()=>({
    userInfo: {},
    details: {},
    isAwards: false
  }),
  components: {
    UserInfo,
    GoodsMsg,
    CurrentLottery,
    ProvUser,
    BuyBtn,
    GoodsDesc
  },
  methods: {
    /** 获取用户信息 **/
    _getUserInfo() {
      Services.getUserInfo().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code === 200) {
          this.userInfo = data
        }
      })
    },
    _getDetails() {
      let {periodId, smallTreasureId} = this.$route.query
      Services.getDetails({periodId, smallTreasureId}).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code === 200) {
          let status = _get(res, 'data.data.currentPeriodStatus')
          let countDown = _get(res, 'data.data.countDown')
          if(status == 0 && countDown < 0) {
            this.isAwards = true
          }
          this.details = data
        }
      })
    },
    sendAward() {
      this.isAwards = true
    },
    init() {
      this._getUserInfo()
      this._getDetails()
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="less" scoped>
  .details{
    min-height: 100vh;
    padding: 0 .24rem;
    background: #F7F7F7;
  }
</style>