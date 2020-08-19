<template>
  <div class="duration">
    <!-- 返回按钮 -->
    <div class="back-btn" @click="backHome">
      <img src="./img/back-icon.png" alt="">
    </div>
    <!-- 规则按钮 -->
    <div class="rule-btn" @click="openRule">
      <img src="./img/rule-icon.png" alt="">
    </div>
    <!-- 我的奖品按钮 -->
    <div class="my-prize-btn" @click="_getMyAward">
      <img src="./img/my-prize-btn.png" alt="">
    </div>
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="my-game-time">
        <p class="name">我的游戏时长</p>
        <p class="time"><span>{{myDuration}}</span>分钟</p>
      </div>
      <div class="line"></div>
      <div class="next-prize-time">
        <p class="name">距离下级奖励</p>
        <p class="time" v-if="activitiesInfo.state == 1 && nextDuration == 0">恭喜您已完成全部任务</p>
        <p class="time" v-else><span>{{nextDuration}}</span>分钟</p>
      </div>
    </div>
    <!-- 跑马灯 -->
    <slider />
    <!-- 倒计时 -->
    <count-down :time="countdown" @countDownCallback="countDownCallback"/>
    <!-- 内容 -->
    <div class="content">
      <div class="item" 
        :class="{'active': item.status == 1 }" 
        v-for="(item, index) in activitiesInfo.levelList" 
        :key="index"
        @click="_itemReceive(item)"
      >
        <!-- 12号蛋 -->
        <template v-if="item.level == 12">
          <img class="active-img" v-if="item.status == 2" src="./img/egg4-active.png" alt="">
          <img class="img" v-else src="./img/egg4.png" alt="">
        </template>
        <!-- 8号蛋 -->
        <template v-else-if="item.level == 8">
          <img class="active-img" v-if="item.status == 2 " src="./img/egg3-active.png" alt="">
          <img class="img" v-else src="./img/egg3.png" alt="">
        </template>
        <!-- 4号蛋 -->
        <template v-else-if="item.level == 4">
          <img class="active-img" v-if="item.status == 2 " src="./img/egg2-active.png" alt="">
          <img class="img" v-else src="./img/egg2.png" alt="">
        </template>
        <!-- 普通蛋 -->
        <template v-else>
          <img class="active-img" v-if="item.status == 2 " src="./img/egg1-active.png" alt="">
          <img class="img" v-else src="./img/egg1.png" alt="">
        </template>
        <!-- 奖品数量 -->
        <div class="award-num" v-if="[4, 8, 12].indexOf(item.level) == -1">
          <img src="./img/coin-icon2.png" alt="">
          +{{item.awardsNum}}
        </div>
        <!-- 游戏时间 -->
        <div class="duration-time" :class="{'end': item.status == 2}">{{item.durationDesc}}</div>
        <!-- 当前位置 -->
        <div class="current-position" v-if="item.level == currentItem">
          <img src="./img/current-position.png" alt="">
          <div class="text">
            当前位置
          </div>
        </div>
        <!-- 奖品提示 -->
        <div class="award-tips" v-if="item.status == 0 && [4, 8].indexOf(item.level) > -1">
          <img src="./img/coin-icon3.png" alt="">
          <img src="./img/phone-icon.png" alt="">
        </div>
        <!-- 点击提示 -->
        <div class="click-tips" v-if="item.status == 1 && [4, 8].indexOf(item.level) > -1">
          <img src="./img/tips.png" alt="">
        </div>
      </div>
    </div>
    <!-- 领取按钮 -->
    <div class="btns">
      <div class="get-btn" v-if="isBatchReceive" @click="_batchReceive">一键领取</div>
      <div class="get-disable" v-else>一键领取</div>
    </div>
    <!-- popup -->
    <popup 
      v-model="showPopup" 
      :popupType="popupType"
      :activitiesInfo="activitiesInfo"
      :awardNum="awardNum"
      :itemDuration="itemDuration"
      :awardLog="awardLog"
    />
  </div>
</template>
<script>
import CountDown from './components/countDown'
import Popup from './components/popup'
import Slider from './components/slider'
import Services from './services/services'
import utils from './components/utils'
import _get from 'lodash.get'
import services from '../diceact/services/services'
export default {
  name: 'duration',
  data: ()=>({
    currentIndex: 1,
    activitiesInfo: {},
    countdown: '',
    showPopup: false,
    popupType: 0,
    awardNum: 0,
    itemDuration: 0,
    awardLog: []
  }),
  components: {
    CountDown,
    Popup,
    Slider
  },
  computed: {
    myDuration () {
      let duration = _get(this.activitiesInfo, 'duration')
      if(duration) {
        return parseInt(duration / 60)  
      }
      return 0
    },
    nextDuration () {
      let nextDuration = _get(this.activitiesInfo, 'nextAwardDuration')
      if(nextDuration) {
        return parseInt(nextDuration / 60)
      }
      return 0
    },
    currentItem () {
      let current = 0
      let list = _get(this.activitiesInfo, 'levelList', [])
      list && list.forEach(item => {
        if(item.status == 1) {
          current = item.level
        }
      })
      return current
    },
    isBatchReceive () {
      let list = _get(this.activitiesInfo, 'levelList', [])
      return list && list.find(item => {
        return item.status == 1
      })
    }
  },
  methods: {
    /** 获取活动信息 **/
    _getInfo () {
      Services.getInfo().then(res => {
        const {code} = _get(res, 'data')
        if(code == 200) {
          this.countdown = _get(res, 'data.data.countdown', '')
          this.activitiesInfo = _get(res, 'data.data', {})
          if(this.activitiesInfo.state == 2) {
            this.showPopup = true
            this.popupType = 2
          }
        }
      })
    },
    /** 一键领取 **/
    _batchReceive () {
      if(this.batchLock) return false
      this.batchLock = true
      Services.batchReceive().then(res => {
         const {code} = _get(res, 'data')
         if(code == 200) {
            this.$toast.show({
                message: `奖励领取成功`
            },() => {
              this._getInfo()
              this.batchLock = false
              GLOBALS.marchSetsPoint('A_H5PT0321003967')
            })
         }else {
           this.batchLock = false
         }
      }).catch(error => {
        this.batchLock = false
      })
    },
    /** 领取奖励 **/
    _itemReceive (item) {
      GLOBALS.marchSetsPoint('A_H5PT0321003968')
      if(item.status == 0) {
        let minute = parseInt(this.activitiesInfo.duration / 60) * 60
        let needTime = item.duration - minute
        this.itemDuration = `${needTime / 60}`
        this.popupType = 3
        this.showPopup = true
        return false
      }
      if([4, 8, 12].indexOf(item.level) == -1) return
      Services.itemReceive(item.level).then(res => {
        const {code, data} = _get(res, 'data')
        if(code == 200) {
          this.awardNum = data
          this.popupType = 4
          this.showPopup = true
          this._getInfo()
        }
        
      })
    },
    /** 获取我的奖品 **/
    _getMyAward () {
      Services.getMyAward().then(res => {
        const {code, data} = _get(res, 'data')
        if(code == 200) {
          this.awardLog = data
          this.popupType = 5
          this.showPopup = true
        }
        GLOBALS.marchSetsPoint('A_H5PT0321003969')
      })
    },
    openRule () {
      GLOBALS.marchSetsPoint('A_H5PT0321003970')
      this.popupType = 1
      this.showPopup = true
    },
    backHome() {
      window.location.href = "//wap.beeplaying.com/earnCoin/"
    },
    countDownCallback() {
      this.activitiesInfo.state = 2
    }
  },
  mounted() {
    this._getInfo()
    GLOBALS.marchSetsPoint('P_H5PT0321') 
  }
}
</script>
<style lang="less">
@import url('../../common/css/base.less');
@import url('../../../static/iconfont/iconfont.css');
* {
  box-sizing: border-box;
}
.duration {
  box-sizing: border-box;
  padding-bottom: 1.3rem;
  position: relative;
  overflow: hidden;
  height: 12.79rem;
  background: url(./img/bg.png) no-repeat center top #E7B049;
  background-size: 7.2rem auto;
  .back-btn {
    position: absolute;
    left: .2rem;
    top: 1.39rem;
    width: .72rem;
    height: .72rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
  .rule-btn {
    position: absolute;
    left: .2rem;
    top: 2.34rem;
    width: .72rem;
    height: .72rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
  .my-prize-btn {
    position: absolute;
    left: .2rem;
    top: 3.26rem;
    width: .72rem;
    height: .94rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
  .user-info {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 10;
    padding-bottom: .2rem;
    height: 1rem;
    background: url(./img/user-info-bg.png) no-repeat center top;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .my-game-time {
      flex: 1;
    }
    .next-prize-time {
      flex: 1;
    }
    .line {
      width: 1px;
      height: .56rem;
      background: #BA964F;
    }
    .name {
      font-weight: 800;
      text-align: center;
      font-size: .22rem;
      color: #8F4B16;
    }
    .time {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .2rem;
      font-weight: 800;
      color: #FF3300;
      span {
        font-size: .3rem;
      }
    }
  }
  .content {
    .item {
      position: absolute;
      width: 1.04rem;
      height: .9rem;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      img {
        position: relative;
        z-index: 3;
      }
      &.active {
        .current-position img {
          animation: currentAnimation .8s infinite;
        }
        &:nth-child(1) {
          .img {
            animation: imgAnimation 2s infinite;
          }
        }
        &:nth-child(2) {
          .img {
            animation: imgAnimation 2s infinite 1s;
          }
        }
        &:nth-child(3) {
          .img {
            animation: imgAnimation 2s infinite 2s;
          }
        }
        &:nth-child(4) {
          .img {
            animation: imgAnimation 2s infinite 1.5s;
          }
        }
        &:nth-child(5) {
          .img {
            animation: imgAnimation 2s infinite .18s;
          }
        }
        &:nth-child(6) {
          .img {
            animation: imgAnimation 2s infinite 2s;
          }
        }
        &:nth-child(7) {
          .img {
            animation: imgAnimation 2s infinite 1.9s;
          }
        }
        &:nth-child(8) {
          .img {
            animation: imgAnimation 2s infinite 1.3s;
          }
        }
        &:nth-child(9) {
          .img {
            animation: imgAnimation 2s infinite 1.1s;
          }
        }
        &:nth-child(10) {
          .img {
            animation: imgAnimation 2s infinite 1s;
          }
        }
        &:nth-child(11) {
          .img {
            animation: imgAnimation 2s infinite 1.5s;
          }
        }
        &:nth-child(12) {
          .img {
            animation: imgAnimation 2s infinite 2s;
          }
        }
      }
      .award-num {
        position: absolute;
        left: 50%;
        top: -.3rem;
        z-index: 2;
        transform: translate(-50%, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #BC1200;
        font-size: .2rem;
        font-weight: bold;
        img {
          margin-right: .05rem;
          width: .26rem;
          height: .26rem;
        }
      }
      .duration-time {
        position: absolute;
        left: 50%;
        bottom: 0;
        z-index: 3;
        transform: translate(-50%, 0);
        padding: 0 .08rem;
        font-size: .2rem;
        color: #9A5115;
        white-space: nowrap;
        font-weight: bold;
        text-align: center;
        border-radius: .15rem;
        background: #FFED8A;
        &.end {
          color: #DF9A62;
        }
      }
      .current-position {
        position: absolute;
        left: 50%;
        bottom: -.22rem;
        z-index: 2;
        transform: translate(-50%, 0);
        width: 1.62rem;
        height: .9rem;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
        .text {
          position: absolute;
          left: 0;
          bottom: -.1rem;
          width: 100%;
          text-align: center;
          font-size: .18rem;
          font-weight: bold;
          color: #FFF000;
        }
      }
      .active-img {
        width: 1.04rem;
        height: .8rem;
      }
      .img {
        width: 1.04rem;
        height: .9rem;
      }
      .award-tips {
        position: absolute;
        left: -.1rem;
        top: -.8rem;
        width: .94rem;
        height: 1.06rem;
        img {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          &:first-child {
            opacity: 1;
            animation: awardAnimation 4s infinite;
          }
          &:last-child {
            opacity: 0;
            animation: awardAnimation1 4s infinite;
          }
        }
      }
      .click-tips {
        position: absolute;
        width: .84rem;
        height: .76rem;
        right: -0.35rem;
        top: -0.55rem;
        z-index: 4;
        animation: clickAnimation 1.5s infinite;
        
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:nth-child(1) {
        left: 2.45rem;
        top: 9.23rem;
      }
      &:nth-child(2) {
        left: 4.16rem;
        top: 8.95rem;
      }
      &:nth-child(3) {
        left: 5.67rem;
        top: 7.9rem;
      }
      &:nth-child(4) {
        width: 1.34rem;
        height: 1.16rem;
        left: 4.26rem;
        top: 6.89rem;
        .current-position {
          bottom: -.4rem;
          width: 2rem;
          height: auto;
        }
        .active-img {
          width: 1.34rem;
          height: 1.04rem;
        }
        .img {
          width: 1.34rem;
          height: 1.16rem;
        }
      }
      &:nth-child(5) {
        left: 2.83rem;
        top: 7.1rem;
      }
      &:nth-child(6) {
        left: 1.05rem;
        top: 7.1rem;
      }
      &:nth-child(7) {
        left: .32rem;
        top: 5.56rem;
      }
      &:nth-child(8) {
        left: 1.74rem;
        top: 4.47rem;
        width: 1.34rem;
        height: 1.16rem;
        .current-position {
          bottom: -.4rem;
          width: 2rem;
          height: auto;
        }
        .active-img {
          width: 1.34rem;
          height: 1.16rem;
        }
        .img {
          width: 1.34rem;
          height: 1.16rem;
        }
      }
      &:nth-child(9) {
        left: 3.75rem;
        top: 5.2rem;
      }
      &:nth-child(10) {
        left: 5.53rem;
        top: 5.1rem;
      }
      &:nth-child(11) {
        top: 3.81rem;
        left: 4.54rem;
      }
      &:nth-child(12) {
        left: 2.82rem;
        top: 2.83rem;
        width: 1.42rem;
        height: 1.34rem;
        .duration-time {
          font-size: .32rem;
        }
        .active-img {
          width: 1.42rem;
          height: 1.1rem;
        }
        .img {
          width: 1.42rem;
          height: 1.34rem;
        }
        .current-position {
          bottom: -.4rem;
          width: 2.3rem;
          height: auto;
        }
      }
    }
  }
  .btns {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    padding-top: .12rem;
    width: 100%;
    height: 1.3rem;
    background: #fff;
    border-radius: .2rem .2rem 0 0;
    .get-btn {
      font-size: .3rem;
      font-weight: bold;
      color: #fff;
      text-align: center;
      height: 1.14rem;
      line-height: 1rem;
      background: url(./img/btn-get.png) no-repeat center top;
      background-size: 100% 100%;
    }
    .get-disable {
      font-size: .3rem;
      font-weight: bold;
      color: #fff;
      text-align: center;
      height: 1.14rem;
      line-height: 1rem;
      background: url(./img/btn-disable.png) no-repeat center top;
      background-size: 100% 100%;
    }
  }
}

@keyframes imgAnimation {
  0% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(-10deg);
  }
  20% {
    transform: rotate(10deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  30% {
    transform: rotate(5deg);
  }
  35% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(0);
  }
}
@keyframes currentAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: .6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes clickAnimation {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -.1rem);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes awardAnimation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes awardAnimation1 {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
