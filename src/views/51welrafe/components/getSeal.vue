<template>
  <div class="get-seal">
    <my-seal
      :userInfo="userInfo"
      :currentIndex="1"
      @openSealLog="_getSealLog"
    />
    <!-- 玩游戏集图章 -->
    <div class="play-game">
      <div class="title">累计支持金叶</div>
      <Progress
        :list="betProgress"
        :status="1"
        :probeType="3"
        @openPopup="openPopup"
        @taskFinish="_getProgress"
      />
    </div>
    <!-- 充值领图章 -->
    <div class="pay">
      <div class="title">累计充值</div>
      <Progress
        :list="rechargeProgress"
        :status="2"
        :probeType="3"
        @openPopup="openPopup"
        @taskFinish="_getProgress"
      />
    </div>
    <!-- 购买礼包 -->
    <CardList :list="cardList"/>
    <!-- Popup -->
    <popup
      v-model="showPopup"
      :popupType="popupType"
      :userInfo="userInfo"
      :sealNum="sealNum"
      :sealLog="sealLog"
    />
  </div>
</template>
<script>
import CardList from './cardList'
import Popup from './popup'
import MySeal from './mySeal'
import Progress from './progress'
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'getSeal',
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    },
    bagBatchId:{
      type: String,
      default: ''
    }
  },
  data: () => ({
    betProgress: {},
    rechargeProgress: {},
    cardList: [],
    sealLog: [],
    sealNum: 0,
    showPopup: false,
    popupType: 5,
  }),
  components: {
    MySeal,
    Progress,
    Popup,
    CardList
  },
  methods: {
    /** 获取图章记录 **/
    _getSealLog () {
      Services.getUserPropLog().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.sealLog = _get(res, 'data.data', [])
          this.showPopup = true
          this.popupType = 4
        }
      })
    },

    /** 获取-用户任务进度 **/
    _getUserProgress () {
      Services.getUserProgress().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.betProgress = _get(res, 'data.data.betProgress', {})
          this.rechargeProgress = _get(res, 'data.data.rechargeProgress', {})
        }
      })
    },
    /** 获取礼包列表 **/
    _getCardList (id) {
      console.log(id)
      Services.getCardList(id).then(res => {
        const {code, data, message} = _get(res, 'data')
        if (code == 200) {
          this.cardList = _get(res, 'data.data.mallBizConfigs')
        }
      })
    },
    /** 进度条任务领取 **/
    _getProgress (params) {
      if(this.lock) {
        return false
      }
      this.lock = true
      Services.getProgress(params).then(res => {
        this.lock = false
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.sealNum = _get(res, 'data.data')
          this.showPopup = true
          this.popupType = 5
          /** 重新拉取 用户信息 跟 进度信息 **/
          this._getUserProgress()
          this.$emit('refrshUserInfo')
        }else {
          this.$toast.show({ message })
        }
      }).catch(error => {
        this.lock = false
      })
    },
    openPopup (status) {
      if(status == 1) {
        this.showPopup = true
        this.popupType = 3
      }
      if(status == 2) {
        window.location.href = '//wap.beeplaying.com/xmWap/#/payment'
      }
    }
  },
  mounted () {
    this._getUserProgress()
    GLOBALS.marchSetsPoint('A_H5PT0278003324')
  },
  watch:{
    bagBatchId(val){
      val&&this._getCardList(val)
    }
  }
}
</script>
<style lang="less" scoped>
.get-seal {
  background: url(../img/content-bg.png) no-repeat center top;
  background-size: 100% auto;
  .play-game {
    .title {
      color: #5737F2;
      font-weight:bold;
      text-align: center;
    }
    padding-top: 1.4rem;
    height: 8rem;
  }
  .pay {
    height: 6.8rem;
    .title {
      color: #5737F2;
      font-weight:bold;
      text-align: center;
    }
  }
}
</style>
