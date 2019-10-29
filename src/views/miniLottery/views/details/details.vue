<template>
  <div class="details">
    <Header title="夺宝详情"/>
    <user-info :userInfo="userInfo" :details="details"/>
    <goods-msg :details="details" :isAwards="isAwards" @refresh="refresh"/>
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
            data.countDown = 0
          }else {
            this.isAwards = false
          }
          this.details = data
          GLOBALS.marchSetsPoint('A_H5PT0202002083', {
            task_id: data.currentPeriodStatus,
            task_name: data.currentPeriodStatus
          })
        }
      })
    },
    refresh() {
      this.isAwards = true
    },

    init() {
      this._getUserInfo()
      this._getDetails()
      if(this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setInterval(()=> {
        this._getDetails()
      }, 3000)
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>
<style lang="less" scoped>
  .details{
    box-sizing: border-box;
    min-height: 100vh;
    padding: .9rem .24rem 1.1rem;
    background: #F7F7F7;
  }
</style>