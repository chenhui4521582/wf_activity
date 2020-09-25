<template>
  <div class="popup" v-if="value">
    <div class="mask"></div>
    <div class="wrap">
      <!-- 活动规则 -->
      <template v-if="popupType == 1">
        <div class="rule bg2">
          <div class="body">
            <p>1.福利一中限时任务翻倍，指平台内所有的任务，包括高额奖励、充值超返，但不包含福利礼包以及金蛋奖励。</p>
            <p>2.福利一计时在点击开始时计时，限时为一个小时</p>
            <p>3.福利二无门槛福利只能提现一次</p>
            <p>4.在法律允许范围内，游戏赚平台将享有本活动解释权</p>
          </div>
        </div>
      </template>
      <!-- 活动结束 -->
      <template v-if="popupType == 2">
        <div class="active-end bg1">
          <div class="title">
            <div class="left"></div>
            <div class="title-text">温馨提示</div>
            <div class="right"></div>
          </div>
          <div class="body">
            活动已经结束
          </div>
          <div class="back-home" @click="goback">返回首页</div>
        </div>
      </template>
      <div class="close" :class="{'type4': popupType == 4}" @click="hidePopup"></div>
    </div>
  </div>
</template>
<script>
import Utils from './utils'
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'popup',
  props: ['popupType', 'value', 'awardLog', 'activitiesInfo', 'awardNum', 'itemDuration'],
  filters: {
    format (timestamp, type) {
      if(!timestamp) return
      var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
      }
      var myDate = timestamp ? new Date(timestamp): new Date();
      var year = myDate.getFullYear();
      var month = zero(myDate.getMonth() + 1);
      var day = zero(myDate.getDate());
      var hour = zero(myDate.getHours());
      var minite = zero(myDate.getMinutes());
      var second = zero(myDate.getSeconds());
      switch (type) {
        case 'y-m-d' :
          return `${year}-${month}-${day}`
          break;
        case 'h:m:s' :
          return `${hour}:${minite}:${second}`
          break; 
      }
    }
  },
  computed: {
    showSealLog () {
      return this.sealLog.length
    },
    showAwardLog () {
      return this.awardLog.length
    },
    oneAward () {
      return this.rankingAward.length == 1
    },
    showAddIcon () {
      return this.rankingAward.length > 1
    }
  },
  methods: {
    hidePopup() {
      this.$emit('input', false)
    },
    gotoTask(item) {
      GLOBALS.marchSetsPoint('A_H5PT0321003971') 
      window.location.href = 'https://wap.beeplaying.com/earnCoin/#/task?taskCurrent=1'
    },
    confirmExchange() {
      this.$emit('confirmExchange')
    },
    goback () {
      window.location.href = "//wap.beeplaying.com/earnCoin/"
    }
  },
  watch: {
    value (newValue) {
      if(newValue && [1, 5].indexOf(this.popupType) == -1) {
        Utils.ScrollNoMove()
      }else {
        Utils.ScrollMove()
      }
    }
  }
}
</script>
<style scoped lang="less">
.popup {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background: rgba(0,0,0,.7);
  }
  .wrap {
    position: absolute;
    left: 50%;
    top: 45%;
    z-index: 2;
    transform: translate(-50%, -50%);
    .close {
      position: absolute;
      right: .22rem;
      top: .22rem;
      width: .4rem;
      height: .4rem;
      &.type4 {
        top: 1.75rem;
      }
    }
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
    .bg2 {
      overflow: hidden;
      background: url(../img/popup2-bg.png) no-repeat center top;
      background-size: 100% 100%;
      width: 4.9rem;
      height: 5.2rem;
    }
    .rule {
      .body {
        margin-top: 1.24rem;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 0 .4rem;
        height: 3.7rem;
        font-size: .24rem;
        color: #fff;
        font-weight:bold;
        p {
          margin-bottom: .2rem;
        }
      }
    }
  }
}
</style>