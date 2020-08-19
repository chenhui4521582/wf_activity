<template>
  <div class="popup" v-if="value">
    <div class="mask"></div>
    <div class="wrap">
      <!-- 活动规则 -->
      <template v-if="popupType == 1">
        <div class="rule bg2">
          <div class="title">
            <div class="left"></div>
            <div class="title-text">温馨提示</div>
            <div class="right"></div>
          </div>
          <div class="body">
            活动时间：{{activitiesInfo.beginDate | formatTime('m-d')}} - {{activitiesInfo.endDate | formatTime('m@d@h')}}<br>
            砸蛋方式：当前累计游戏时长满足每颗彩蛋的时长条件。<br>
            游戏时长说明：在平台内进入任意游戏即开始统计时长，离开游戏统计时长结束。在平台页面浏览不计入游戏时长。<br>
            奖励说明：奖励分为固定奖励和神秘奖励。固定奖励数额为页面呈现数额，神秘奖励最高可开出五百万金币奖励（约等于5000元）。<br>
            奖励领取说明：满足彩蛋领取条件后，点击对应的彩蛋即可领取奖励。奖励领取截止时间：{{activitiesInfo.endDate | formatTime('m@d@h')}}，请及时领取奖励。<br>
            活动期间一经发现作弊等违法、违规情形，立即取消活动参与资格和领奖资格，且活动中已获取奖励将全部收回。<br>
            在法律允许范围内，游戏赚平台将享有本活动解释权。<br>
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
      <!-- 当前还不能领取奖励 -->
      <template v-if="popupType == 3">
        <div class="get-fail bg1">
          <div class="title">
            <div class="left"></div>
            <div class="title-text">温馨提示</div>
            <div class="right"></div>
          </div>
          <div class="body">
            <p>距离领取奖励还需</p>
            <p class="time">{{itemDuration}}<span>分钟</span></p>
          </div>
          <div class="go-game" @click="gotoTask">去玩游戏</div>
        </div>
      </template>
      <!-- 获取奖励 -->
      <template v-if="popupType == 4">
        <div class="award bg3">
          <div class="title">
            <div class="left"></div>
            <div class="title-text">恭喜获得</div>
            <div class="right"></div>
          </div>
          <div class="body">
            <div class="award-img">
              <img src="../img/coin-icon.png" alt="">
            </div>
            <p class="num">{{awardNum}}金币（≈{{awardNum / 10000}}元）</p>
          </div>
          <div class="go-game" @click="hidePopup">收下啦</div>
        </div>
      </template>
      <!-- 我的奖励 -->
      <template v-if="popupType == 5">
        <div class="my-award bg2">
          <div class="title">
            <div class="left"></div>
            <div class="title-text">我的奖励</div>
            <div class="right"></div>
          </div>
          <div class="body">
            <div class="list-nav">
              <div class="item">获取时间</div>
              <div class="item">游戏时长</div>
              <div class="item">金币数量</div>
            </div>
            <div class="list">
              <div class="items" v-for="(item, index) in awardLog" :key="index">
                <div class="item">
                  <p>{{item.receiveTime | format('y-m-d')}}</p>
                  <p>{{item.receiveTime | format('h:m:s')}}</p>
                </div>
                <div class="item">{{item.duration}}</div>
                <div class="item">+{{item.coinNum}}</div>
              </div>
            </div>
          </div>
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
          return `${hour}-${minite}-${second}`
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
      background: url(../img/closed.png) no-repeat center center;
      background-size: .28rem .28rem;
      &.type4 {
        top: 1.75rem;
      }
    }
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
    .bg1 {
      overflow: hidden;
      background: url(../img/popup1-bg.png) no-repeat center top;
      background-size: 100% 100%;
      width: 4.9rem;
      height: 3.7rem;
    }
    .bg2 {
      overflow: hidden;
      background: url(../img/popup2-bg.png) no-repeat center top;
      background-size: 100% 100%;
      width: 4.9rem;
      height: 5.2rem;
    }
    .bg3 {
      overflow: hidden;
      background: url(../img/popup3-bg.png) no-repeat center top;
      background-size: 100% 100%;
      width: 4.9rem;
      height: 6.74rem;
    }
    .title {
      margin: .45rem auto .2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .left {
        width: .52rem;
        height: .03rem;
        background: url(../img/title.png) no-repeat center top;
        background-size: 100% 100%;
      }
      .title-text {
        margin: 0 .1rem;
        font-size: .4rem;
        color: #C2312A;
        font-weight: bold;
      }
      .right {
        width: .52rem;
        height: .03rem;
        background: url(../img/title.png) no-repeat center top;
        background-size: 100% 100%;
        transform: rotate(180deg);
      }
    }
    .rule {
      .body {
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 0 .4rem;
        height: 3.7rem;
        color: #EAD9FF;
        font-size: .24rem;
        color: #C85501;
        font-weight:bold;
      }
    }
    .active-end {
      .body {
        margin: .4rem 0;
        text-align: center;
        font-size: .24rem;
        font-weight:bold;
        color: #C85501;
      }
      .back-home {
        margin: 0 auto;
        width: 2.76rem;
        height: .96rem;
        font-size: .3rem;
        color: #FFFFFF;
        text-align: center;
        line-height: .88rem;
        font-weight:800;
        background: url(../img/btn.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .get-fail {
      .body {
        margin-bottom: .2rem;
        font-size: .24rem;
        color: #C85501;
        text-align: center;
        font-weight:bold;
        p {
          margin-bottom: .18rem;
        }
        .time {
          display: flex;
          justify-content: center;
          align-items: baseline;
          color: #753F39;
          font-size: .36rem;
          span {
            font-size: .24rem;
          }
        }
      }
      .go-game {
        margin: 0 auto;
        width: 2.76rem;
        height: .96rem;
        font-size: .3rem;
        color: #FFFFFF;
        text-align: center;
        line-height: .88rem;
        font-weight:800;
        background: url(../img/btn.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .award {
      .title {
        margin: 2rem auto .2rem;
      }
      .body {
        .award-img {
          margin: 0 auto .2rem;
          width: 1.88rem;
          height: 1.88rem;
        }
        .num {
          margin-bottom: .2rem;
          text-align: center;
          font-weight:bold;
          font-size: .24rem;
          color: #C85501;
        }
      }
      .go-game {
        margin: 0 auto;
        width: 2.76rem;
        height: .96rem;
        font-size: .3rem;
        color: #FFFFFF;
        text-align: center;
        line-height: .88rem;
        font-weight:800;
        background: url(../img/btn.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .my-award {
      .body {
        padding: 0 .36rem;
        .list-nav {
          margin-bottom: .2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .item {
            flex-shrink: 0;
            text-align: center;
            width: 33.33%;
            font-size: .24rem;
            color: #C85601;
            font-weight: bold;
          }
        }
        .list {
          overflow-x: hidden;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          height: 3.1rem;
          .items {
            margin-bottom: .2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .item {
              flex-shrink: 0;
              text-align: center;
              width: 33.33%;
              font-size: .22rem;
              color: #91623F;
              font-weight: bold;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>