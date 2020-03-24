<template>
  <div class="hf-lotter">
    <!-- 返回 -->
    <div class="back" @click="backHome">
      <img src="../../img/lottery-back-icon.png" alt="">
    </div>
    <!-- 打开规则 -->
    <div class="open-rule" @click="openRule">
      <img src="../../img/lottery-rule-icon.png" alt="">
    </div>
    <!-- 打开抽奖记录 -->
    <div class="open-log" @click="_getLotteryLog">
      <img src="../../img/lottery-log-icon.png" alt="">
    </div>
    <!-- 活动时间 -->
    <div class="active-time">{{activityInfo.beginDate | formatTime('m.d')}} - {{activityInfo.endDate | formatTime('m.d')}}</div>
    <!-- banner -->
    <banner :noticeList="noticeList"/>
    <!-- list -->
    <div class="list">
      <list-info  v-for="(item, index) in list" :info="item" :key="index" @click="goDetail(item)"/>
    </div>
    <!-- popUp -->
    <popup 
      v-model="showPopup" 
      :list="list"
      :popupType="popupType" 
      :log="log" 
    />
  </div>
</template>
<script>
import {getActivityInfo, getLotteryLog, getNoticeList} from '../../services/services'
import _get from 'lodash.get'
import Banner from '../../components/banner'
import popup from '../../components/popup'
import ListInfo from './components/listInfo'
export default {
  name: 'lotteryList',
  data: () => ({
    activityInfo: {},
    showPopup: false,
    popupType: 3,
    list: [],
    log: [],
    noticeList: []
  }),
  components: {
    Banner,
    ListInfo,
    popup
  },
  methods: {
    /** 返回 **/
    backHome() {
      GLOBALS.marchSetsPoint('A_H5PT0264003117')
      window.location.href = "//wap.beeplaying.com/xmWap/"
    },
    /** 打开规则 **/
    openRule() {
      GLOBALS.marchSetsPoint('A_H5PT0264003119')
      this.showPopup = true;
      this.popupType = 1
    },
    /** 打开抽奖记录 **/
    openLotteryLog() {
      GLOBALS.marchSetsPoint('A_H5PT0264003118')
      this.showPopup = true;
      this.popupType = 2
    },
    /** 获取活动信息 **/
    _getActivityInfo() {
      getActivityInfo().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.list = _get(res, 'data.data.productList', [])
          this.activityInfo = _get(res, 'data.data')
        }else {
          this.$toast.show({message})
        }
      })
    },
    /** 获取抽奖记录 **/
    _getLotteryLog() {
      getLotteryLog().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.log = _get(res, 'data.data')
          this.openLotteryLog()
        }else {
          this.$toast.show({message})
        }
      })
    },
    /** 获取轮播数据 **/
    _getNoticeList() {
      getNoticeList().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.noticeList = _get(res, 'data.data', [])
        }
      })
    }
  },
  mounted () {
    this._getNoticeList()
    this._getActivityInfo()
  }
}
</script>
<style scoped lang="less">
img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.hf-lotter {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background: url(../../img/bg.png) no-repeat center top #4831BD;
  background-size: 100% auto;
  .back {
    position: absolute;
    left: 0;
    top: .3rem;
    width: .68rem;
    height: .46rem;
  }
  .open-rule {
    position: absolute;
    right: 0;
    top: .96rem;
    width: 1.1rem;
    height: .46rem;
  }
  .open-log {
    position: absolute;
    right: 0;
    top: .3rem;
    width: 1.1rem;
    height: .46rem;
  }
  .active-time {
    margin-top: 3.2rem;
    color: #FD2357;
    font-size: .24rem;
    text-align: center;
    font-weight:800;
  }
  .list {
    position: absolute;
    padding: 0 .3rem;
    left: 0;
    right: 0;
    top: 4.24rem;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
}
</style>