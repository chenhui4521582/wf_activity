<template>
  <div class="good-msg">
    <div class="goods">
      <div class="lottery-id">第44期</div>
      <!-- 状态：0 进行中，1结束，2流拍, 3 未开始-->
      <div class="lottery-status" v-if="status == 0">
        夺宝进行中<span class="ani_dot">...</span>
      </div>
      <div class="lottery-no" v-else-if="status == 3">
        夺宝未开始
      </div>
      <div class="lottery-end" v-else>
        夺宝已结束
      </div>
      <div class="img">
        <img :src="details.picture | filter" alt="">
      </div>
      <div class="rule iconfont icon-question" @click="openRule"></div>
      <!-- 结束状态 是否中间图标 -->
      <div class="award-status" v-if="status == 1">
        <img src="../img/lottery-yes.png" alt="" v-if="isMe">
        <img src="../img/lottery-no.png" alt="" v-else>
      </div>
    </div>
    <!-- 进行中才有倒计时 -->
    <div class="count-down" v-if="!isAwards && status == 0">
      <span class="icon"></span>
      <span>夺宝剩余 {{countdownTime}}</span>
    </div>  
    <!-- 未开始倒计时 -->
    <div class="count-down no" v-if="!isAwards && status == 3">
      <span class="icon"></span>
      <span>{{countdownTime}}开始夺宝</span>
    </div>  
    <div class="goods-name">
      <div class="name">
        奖品：{{details.title}}
      </div>
      <div class="purchased">
        已抢 <span>{{details.participantsNumber || 0}}</span> 次
      </div>
    </div>
    <Modal title="规则说明" v-model="ruleModal" type="2" :saveText="'知道了'" :closeButtonShow=false @on-save="hideRule">
      <div class="center">
        福利夺宝是为感谢广大玩家一直以来对我们的支持和厚爱推出的回馈送福利活动。<br>
        每次夺宝投入都会获得给“夺宝码”（在夺宝记录中查看）。<br>
        每期夺宝码从100001起递增，每投入1次，号码递增1位，达到开奖条件后，系统会从已产生的夺宝码中随机抽取1给成为本期“幸运码”，持有者获得当期奖励！<br>
        投入越多，中奖机会越大！夺宝抽奖绝对公平公正。<br>
        夺宝开奖方式分为3种：<br>
        1、【满人次开奖】每期达到指定次数
        即可开奖；<br>
        2、【定时开奖】达到指定的开奖时间
        即可开奖：届时，若本期未达到最低的
        夺宝次数，则本期奖品流
      </div>
    </Modal>
  </div>
</template>
<script>
import _get from 'lodash.get'
export default {
  name: 'goodsMsg',
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
  data: ()=> ({
    countdownTime: '00小时00分00秒',
    ruleModal: false
  }),
  computed: {
    status() {
      return _get(this.details, 'currentPeriodStatus')
    },
    isMe() {
      return _get(this.details, 'lastPeriodInfo.winnerIsCurrentUser', false)
    }
  },
  methods: {
    countDown (date) {
      if (!date) return false
      date = date / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
          this.sendAward()
        }
        let day = Math.floor(date / 86400)
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        if (day > 0) {
          this.countdownTime = `${day}天${countHour}小时${countMinute}分${countSecond}秒`
        } else {
          this.countdownTime = `${countHour}小时${countMinute}分${countSecond}秒`
        }
      }, 1000)
    },
    sendAward() {
      if(this.status == 0) {
        this.$emit('sendAward')
      }
    },
    openRule() {
      this.ruleModal = true
    },
    hideRule() {
      this.ruleModal = false
    }
  },
  mounted() {
    
  },
  watch: {
    details: {
      handler(value) {
        if(value.countDown) {
          this.countDown(value.countDown)
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.good-msg {
  overflow: hidden;
  background: #fff;
  border-radius: .16rem;
  .goods {
    padding: .47rem 0 .36rem;
    position: relative;
    background: #FCFCFC;
    .lottery-id {
      position: absolute;
      top: .18rem;
      left: .18rem;
      width: .8rem;
      height: .3rem;
      line-height: .3rem;
      font-size: .2rem;
      color: #FFFFFF;
      background: #BBBBBB;
      border-radius: .06rem;
      text-align: center;
    }
    .lottery-status {
      position: absolute;
      top: .57rem;
      left: .18rem;
      color: #FF4141;
      font-size: .24rem;
    }
    .lottery-end {
      position: absolute;
      top: .57rem;
      left: .18rem;
      color: #FF7800;
      font-size: .24rem;
    }
    .lottery-no {
      position: absolute;
      top: .57rem;
      left: .18rem;
      color: #BBBBBB;
      font-size: .24rem;
    }
    .rule {
      position: absolute;
      top: .18rem;
      right: .15rem;
      color: #BBBBBB;
      font-size: .24rem;
    }
    .img {
      margin: 0 auto;
      width: 2.59rem;
      height: 1.93rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .award-status {
      overflow: hidden;
      position: absolute;
      right: 0;
      top: 1.6rem;
      width: 1.76rem;
      height: 1.42rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
  }
  .count-down {
    padding-left: .2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: .6rem;
    color: #fff;
    font-size: .24rem;
    background: #FF7800;
    .icon {
      margin-right: .1rem;
      width: .3rem;
      height: .3rem;
      background: url(../img/countdown-icon.png) no-repeat center center / 100% 100%;
    }
    &.no {
      color: #FF7800;
      background: #FFF7E0;
      .icon {
        background: url(../img/warning-icon.png) no-repeat center center / .28rem .28rem; 
      }
    }
  }
  .goods-name {
    padding: 0 .2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: .9rem;
    font-size: .24rem;
    background: #fff;
    .name {
      font-size: .32rem;
      color: #000000;
      font-weight:bold;
    }
    .purchased {
      font-size: .24rem;
      color: #888888;
      line-height: 1.2;
      span {
        color: #FF4141;
      }
    }
  }
}
.center {
  font-size: .24rem;
  color: #888;
  line-height: .36rem;
}
.ani_dot {
  font-family: simsun;    
}
:root .ani_dot {
    display: inline-block;
    width: .5em;
    vertical-align: bottom;
    overflow: hidden;
}
@-webkit-keyframes dot {
    0% { width: 0; margin-right: 1.5em; }
    33% { width: .5em; margin-right: 1em; }
    66% { width: 1em; margin-right: .5em; }
    100% { width: 1.5em; margin-right: 0;}
}
.ani_dot {
    -webkit-animation: dot 3s infinite step-start;
}

@keyframes dot {
    0% { width: 0; margin-right: .9em; }
    33% { width: .3em; margin-right: .6em; }
    66% { width: .6em; margin-right: .3em; }
    100% { width: .7em; margin-right: 0;}
}
</style>