<template>
  <div class="details">
    <user-info :userInfo="userInfo" />
    <goods-msg :lotteryStatus="lotteryStatus" />
    <current-lottery :lotteryStatus="lotteryStatus"/>
    <provUser :lotteryStatus="lotteryStatus"/>
    <BuyBtn :lotteryStatus="lotteryStatus"/>
  </div>
</template>
<script>
import UserInfo from './components/userInfo'
import GoodsMsg from './components/goodsMsg'
import CurrentLottery from './components/currentLottery'
import ProvUser from './components/provUser'
import BuyBtn from './components/buyBtn'
export default {
  name: 'LotteryDetails',
  data: ()=>({
    userInfo: {
      leaf: 9999,
      phone: 9999,
      lotteryCard: 9999
    }
  }),
  components: {
    UserInfo,
    GoodsMsg,
    CurrentLottery,
    ProvUser,
    BuyBtn
  },
  computed: {
    lotteryStatus() {
      /** 
       * 场次状态
       * 1：
       * 2：
       * 3：
       * 4：
      **/
      return 1
    }
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