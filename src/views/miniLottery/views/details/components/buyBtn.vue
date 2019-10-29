<template>
  <div class="buy-btn" v-if="!isAwards && (status == 0 || status == 3)">
    <div class="cut-and-add">
      我要参与
      <div class="button-cut base-button" @click.stop="cutClick">-</div>
      <div class="input-warp">
        <input type="number" v-model.number="inputValue">
      </div>
      <div class="button-add base-button" @click.stop="addClick">+</div>
      <div class="max-num">
        <div class="btn" @click="buyMax">最大</div>
        次
      </div>
    </div>
    <div class="buy" @click="submit" v-if="status == 0">
      <P><span>{{details.cardAmount * inputValue}}  </span>夺宝卡</P>
      <P>去夺宝</P>
    </div>
    <div class="buy disable" v-if="status == 3">去夺宝</div>
    <Modal v-model="modal.show" 
      :title="modal.title"  
      :type="2" 
      :saveText="modal.saveText" 
      :closeButtonShow=false 
      @on-save="hide"
    >
      <div class="message" v-html="modal.message"></div>
    </Modal>
  </div>
  <div class="lottery-btn" v-else-if="status == 1" @click="getAward">领取奖品</div>  
  <div class="pass-btn" v-else-if="status == 2" @click="next">前往新一期夺宝</div>
</template>
<script>
import Services from '../../../services/services'
import _get from 'lodash.get'
export default {
  name: 'buyBtn',
  props: {
    details: {
      type: Object,
      default: ()=> ({})
    },
    isAwards: {
      type: Boolean,
      default: false
    }
  },
  data: () =>({
    inputValue: 1,
    bettingCodes: [],
    modal: {
      show: false,
      status: 0,
      title: '温馨提示',
      saveText: '知道了',
      message: ''
    }
  }),
  computed: {
    status() {
      let status = _get(this.details, 'currentPeriodStatus')
      let isme = _get(this.details, 'lastPeriodInfo.winnerIsCurrentUser', false)
      if(status == 1 && isme) {
        return 1
      }
      if(status == 1 && !isme) {
        return 2
      }
      return status
    },
    max() {
      return _get(this.details, 'currentUserInfo.allowBuyNumber', 0)
    }
  },
  methods: {
    cutClick() {
      if(this.inputValue <= 1) {
        return false
      }
      this.inputValue = this.inputValue-1
    },
    addClick() {
      if(this.inputValue >= this.max) {
        return false
      }
      this.inputValue = this.inputValue+1
    },
    buyMax() {
      this.inputValue = this.max || 1
    },
    hide() {
      let {status} = this.modal
      if(status == 1) {
        let APP_CHANNEL = localStorage.getItem('APP_CHANNEL')
        if(['100069','100070','100073','100075','100080'].includes(APP_CHANNEL)) {
          parent.location.href = `https://wap.beeplaying.com/xmWap/#/mall?channel=${localStorage.getItem('APP_CHANNEL')}`
        }else {
          parent.location.href = `https://wap.beeplaying.com/activities/billshop.html#/?from=bdWap&channel=${localStorage.getItem('APP_CHANNEL')}`
        }
        GLOBALS.marchSetsPoint('A_H5PT0202002100', {
          task_id: this.details.currentPeriodStatus,
          task_name: this.details.currentPeriodStatus
        })
      } else {
        this.modal.show = false
      }
    },
    submit() {
      if(this.lock) return false
      this.lock = true
      let {periodId, smallTreasureId} = this.$route.query
      let params = {
        count: this.inputValue,
        periodId,
        smallTreasureId
      }
      Services.getLottery(params).then(res=> {
        this.lock = false
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.modal = {
            show: true,
            status: 0,
            message: `您的${data.length}次夺宝次数参与成功`,
            title: '温馨提示',
            saveText: '知道了'
          }
          this.$emit('refresh')
          this.inputValue = 1
          GLOBALS.marchSetsPoint('A_H5PT0202002087', {
            task_id: this.details.currentPeriodStatus,
            task_name: this.details.currentPeriodStatus
          })
        } else if (code == 105) {
            this.modal = {
            show: true,
            status: 0,
            message: '本期夺宝参与次数已达到上限<br>把机会让给其他人吧',
            title: '温馨提示',
            saveText: '知道了'
          }
          GLOBALS.marchSetsPoint('A_H5PT0202002096', {
            task_id: this.details.currentPeriodStatus,
            task_name: this.details.currentPeriodStatus
          })
        } else if (code == 106) {
          this.modal = {
            show: true,
            status: 1,
            message: '您的夺宝卡不足',
            title: '温馨提示',
            saveText: '去兑换夺宝卡'
          }
          GLOBALS.marchSetsPoint('A_H5PT0202002099', {
            task_id: this.details.currentPeriodStatus,
            task_name: this.details.currentPeriodStatus
          })
        }
        else {
          this.modal = {
            show: true,
            status: 0,
            message: message,
            title: '温馨提示',
            saveText: '知道了'
          }
        }
      }).catch(res=> {
        this.lock = false
      })
    },
    getAward() {
      let APP_CHANNEL = localStorage.getItem('APP_CHANNEL')
      let ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')
      if(['100069','100070','100073','100075','100080'].includes(APP_CHANNEL)) {
        parent.location.href = `https://wap.beeplaying.com/xmWap/#/my/prize?channel=${APP_CHANNEL}&token=${ACCESS_TOKEN}`
      }else {
        parent.location.href = `https://wap.beeplaying.com/bdWap/#/schedule?channel=${APP_CHANNEL}&token=${ACCESS_TOKEN}`
      }
      GLOBALS.marchSetsPoint('A_H5PT0202002095', {
        task_id: this.details.currentPeriodStatus,
        task_name: this.details.currentPeriodStatus
      })
    },
    next() {
      let {nextPeriodId, nextSmallTreasureId} = this.details
      let status = _get(this.details, 'currentPeriodStatus')
      let isme = _get(this.details, 'lastPeriodInfo.winnerIsCurrentUser', false)
      if(nextPeriodId && nextSmallTreasureId) {
        this.$router.push({
          name: 'details',
          query: {
            periodId: nextPeriodId,
            smallTreasureId: nextSmallTreasureId
          }
        })
        this.$emit('refresh')
        if(status == 1 && !isme) {
          GLOBALS.marchSetsPoint('A_H5PT0202002093', {
            task_id: this.details.currentPeriodStatus,
            task_name: this.details.currentPeriodStatus
          })
        }
        if(status == 2) {
          GLOBALS.marchSetsPoint('A_H5PT0202002094', {
            task_id: this.details.currentPeriodStatus,
            task_name: this.details.currentPeriodStatus
          })
        }
      }else {
        this.$router.push({
          name: 'index'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.buy-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: .9rem;
  background: #fff;
  .cut-and-add {
    padding-left: .24rem;
    height: .9rem;
    display: flex;
    align-items: center;
    color: #888888;
    .base-button {
      height: .3rem;
      width: .3rem;
      background-color: #FF4141;
      text-align: center;
      line-height: .27rem;
      color: #fff;
      border-radius: .08rem;
      &.button-cut {
        line-height: .27rem;
        margin-left: .1rem;
      }
    }
    .input-warp {
      width: .6rem;
      height: .3rem;
      background-color: #F7F7F7;
      border-radius: .08rem;
      overflow: hidden;
      margin: 0 .1rem;
      input {
        display: block;
        width: 100%;
        height: .3rem;
        line-height: .3rem;
        font-size: .22rem;
        text-align: center;
        background-color: #F7F7F7;
        color: #e8382b;
        border: none;
      }
    }
  }
  .max-num {
    display: flex;
    align-items: center;
    .btn {
      margin: 0 .1rem;
      padding: 0 .1rem;
      height: .3rem;
      text-align: center;
      line-height: .3rem;
      text-align: center;
      font-size: .2rem;
      color: #fff;
      border-radius:.06rem;
      background: #FFBC00;
    }
  }
  .buy {
    position: absolute;
    right: 0;
    top: 0;
    width: 3rem;
    height: .9rem;
    line-height: .9rem;
    color: #fff;
    background: #FF4141;
    font-size: .24rem;
    text-align: center;
    &.disable {
      opacity:0.4;
    }
    p {
      height: .3rem;
      line-height: .3rem;
      span {
        color: #F7FF00;
      }
      &:first-child {
        margin-top: .15rem;
      }
    }
  }
}
.lottery-btn,.pass-btn{
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  height: .9rem;
  line-height: .9rem;
  background: #FF4141;
  font-size: .24rem;
  color: #fff;
  text-align: center;
}
.message {
  text-align: center;
  font-size: .24rem;
  color: #888888;
  line-height: .4rem;
}
</style>