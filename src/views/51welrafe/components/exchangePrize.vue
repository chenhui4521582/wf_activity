<template>
  <div class="exchange-prize">
    <my-seal 
      :userInfo="userInfo" 
      :currentIndex="2" 
      @openAwardLog="_getExchangeLog"
    />
    <div class="prize-list" >
      <div class="item" 
        v-for="(item, index) in awardsList" 
        :key="index" 
        @click="openConfirmExchange(item)"
      >
        <div class="item-img">
          <img class="" :src="awardsImg[item.awardsTypeStr]" alt="">
        </div>
        <div class="item-name">{{item.awardsName}}</div>
        <div class="exchange-num">
          <div class="icon">
            <img src="../img/seal-icon.png" alt="">
          </div>
          x{{item.consumePropNum}}
        </div>
        <div class="btn"></div>
      </div>
    </div>
    <popup 
      v-model="showPopup" 
      :popupType="popupType"
      :awardLog="awardLog"
      :awardsInfo="awardsInfo"
      :consumePropNum="consumePropNum"
      :awardsImg="awardsImg"
      @confirmExchange="_exchange"
    />
  </div>
</template>
<script>
import Popup from './popup'
import MySeal from './mySeal'
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'exchangePrize',
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    },
    awardsList: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    prizeList: [],
    awardsImg: {
      jyz: require('../img/leaf-icon.png'),
      hfq: require('../img/hf-icon.png'),
      jdk: require('../img/jd-icon.png'),
      yhq: require('../img/copon-icon.png')
    },
    awardLog: [],
    awardsInfo: {},
    popupType: 0,
    showPopup: false,
    consumePropNum: 0
  }),
  components: {
    MySeal,
    Popup
  },
  methods: {
    /** 获取兑换列表 **/
    _getExchangeLog() {
      Services.getExchangeLog().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.awardLog = _get(res, 'data.data', [])
          this.showPopup = true
          this.popupType = 6
        } 
      })
    },
    /** 打开确认兑换弹框 **/
    openConfirmExchange (item) {
      this.sort = item.sort
      this.consumePropNum = item.consumePropNum
      this.showPopup = true
      this.popupType = 7
      GLOBALS.marchSetsPoint('A_H5PT0278003327', {
        awards_id:  item.sort,
        awards_name: item.awardsName
      })
      GLOBALS.marchSetsPoint('A_H5PT0278003328')
    },
    /** 兑换 **/
    _exchange () {
      if(this.lock) {
        return false
      }
      this.lock = true
      Services.exchange(this.sort).then(res => {
        this.lock = false
        const {code, data, message} = _get(res, 'data')
        if(code == 200) { 
          this.awardsInfo = _get(res, 'data.data.awardsInfo')
          this.showPopup = true
          this.popupType = 8
          this.$emit('refrshUserInfo')
          GLOBALS.marchSetsPoint('A_H5PT0278003329')
        }else {
          this.$toast.show({ message })
        }
      }).catch(erro => {
        this.lock = false
      })
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0278003326')
  }
}
</script>
<style lang="less" scoped>
.exchange-prize {
  padding: 0 .3rem;
  background: url(../img/content2-bg.png) no-repeat center top;
  background-size: 100% auto;
  .prize-list {
    padding: 2.05rem .15rem 0;
    height: 7.2rem;
    .item {
      position: relative;
      float: left;
      width: 1.57rem;
      height: 2.42rem;
      .item-img {
        position: absolute;
        width: 1.57rem;
        height: 1.32rem;
        background: url(../img/award-bg.png) no-repeat center top;
        background-size: 100% 100%;
        img {
          position: absolute;
          left: .19rem;
          top: -.05rem;
          display: block;
          width: 1.18rem;
          height: 1.18rem;
          &.coupon {
            margin: -.13rem auto 0;
          }
        }
      }
      .item-name {
        position: absolute;
        top: .88rem;
        left: 0;
        width: 100%;
        height: .36rem;
        text-align: center;
        font-size: .2rem;
        color: #fff;
      }
      .exchange-num {
        position: absolute;
        top: 1.23rem;
        left: 0;
        width: 100%;
        height: .48rem;
        background: url(../img/exchange-num.png) no-repeat center center;
        background-size: 1.31rem .48rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          margin-right: .06rem;
          width: .26rem;
          height: .22rem;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }
        color: #FFEF51;
      }
      .btn {
        position: absolute;
        top: 1.58rem;
        left: .05rem;
        width: 1.49rem;
        height: .84rem;
        background: url(../img/exchange-btn.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>