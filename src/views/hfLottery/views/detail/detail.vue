<template>
  <div class="detail">
    <Header title="商品详情" class="header"/>
    <div class="content">
      <goods-info :info="info"/>
      <specifications :info="info" />
      <div class="good-quality">
        <span>保障</span>
        <span>正品保障·全国联保·售后无忧</span>
      </div>
      <goods-descript :info="info" />
    </div>
    <buy-btn 
      :info="info"
      @getLottery="openLotteryComfirm"
    />
    <popup 
      v-model="showPopup" 
      :popupType="popupType" 
      :awards="awards"
      :info="info"
      @lottery="_getLottery"
      @lotteryContinue="openLotteryComfirm" 
    />
  </div>
</template>
<script>
import GoodsInfo from './components/goodsInfo'
import GoodsDescript from './components/goodsDescription'
import Specifications from './components/specifications'
import BuyBtn from './components/buyBtn'
import Popup from '../../components/popup'
import { getGoodsDetail, getLottery } from '../../services/services'
import _get from 'lodash.get'
export default {
  name: 'detail',
  data: () => ({
    showPopup: false,
    popupType: 0,
    awards: {
      img: '',
      name: '',
      win: false,
      phAwardsType: ''
    },
    info: {}
  }),
  components: {
    GoodsInfo,
    GoodsDescript,
    BuyBtn,
    Specifications,
    Popup
  },
  methods: {
    /** 抽奖确认弹框 **/
    openLotteryComfirm() {
      this.showPopup = true
      this.popupType = 4
    },
    /** 抽奖 **/
    _getLottery() {
      if(this.lock ) return
      this.lock = true
      getLottery({productId: this.info.id}).then(res=> {
        this.lock = false
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.awards.img = _get(res, 'data.data.picture', '')
          this.awards.name = _get(res, 'data.data.name', '')
          this.awards.win = _get(res, 'data.data.win', false)
          this.awards.phAwardsType = _get(res, 'data.data.phAwardsType', '')
          this.popupType = 3
          this.showPopup = true
          this._getGoodsDetail()
        }else {
          this.$toast.show({
            message
          })
        }
      }).catch(error=> {
        this.lock = false
        this.showPopup = true
        this.popupType = 3
      })
    },
    /** 获取详情 **/
    _getGoodsDetail () {
      let {id} = this.$route.query
      getGoodsDetail({productId: id}).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.info = _get(res, 'data.data', {})
        }
      })
    }
  },
  mounted() {
    this._getGoodsDetail()
  }
}
</script>
<style lang="less" scoped>
.detail {
  padding: .9rem .24rem;
  min-height: 100vh;
  background: #EFEFEF;  
  .header {
    background: #fff;
  }
  .good-quality {
    padding: 0 .2rem;
    margin-bottom: .2rem;
    height: .9rem;
    border-radius: .16rem;
    background: #fff;
    display: flex;
    align-items: center;
    span {
      font-size: .24rem;
      &:first-child {
        margin-right: .25rem;
        color: #888888;
      }
      &:last-child {
        color: #0D0D0D;
        font-weight: bold;
      }
    }
  }
}
</style>