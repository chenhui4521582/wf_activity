<template>
  <div class="popup" >
    <div class="mask" v-if="value"></div>
    <transition name="scale">
      <div class="wrap" v-if="value">
        <!-- 活动规则 -->
        <template v-if="popupType == 1">
          <div class="rule">
            <div class="body">
              1.活动期间点击页面下方邀请按钮邀请好友，好友接受邀请后并登录，即可获得4把钥匙；<br>
              2.邀请好友在平台充值任意金额，你可再得6把钥匙；<br>
              3.邀请获得的钥匙可开启宝箱抽奖。有金、银、铜3种宝箱，打开需要的钥匙数量不同，抽中的奖品也不同，钥匙消耗的越多，奖品价值越高。<br>
              4.邀请成功的标准为：安卓用户下载多多玩App并用邀请时填写的手机号登录，即为邀请成功；邀请苹果用户暂不可获得钥匙奖励。<br>
              5.被邀请的用户填写的手机号，需未在平台注册过，才视为新用户，邀请成功后才能获得奖励哦；<br>
              6.若被平台系统检测到：参与活动的用户有非正常邀请行为，平台将不再继续发放活动奖励。情节严重者，平台将取消其参与活动的资格，并扣除相应奖励不予结算；<br>
              7.多多玩游戏平台对本活动具有最终解释权。
            </div>
            <div class="btn" @click="hidePopup">知道了</div>
          </div>
        </template>
        <!-- 钥匙不够 -->
        <template v-if="popupType == 2">
          <div class="exchange-error">
            <div class="body">
              <p>钥匙不足</p>
              <p>银宝箱需要消耗<span>{{currentBox.cost}}</span>把钥匙，才能打开。 你目前有<span>{{keyNum}}</span>把，数量不足。</p>
            </div>
            <div class="btn" @click="openShare">获得更多钥匙</div>
          </div>
        </template>
        <!-- 奖品兑换确认 -->
        <template v-if="popupType == 3">
          <div class="confirm-exchange">
            <div class="body">
              即将消耗<span>{{currentBox.cost}}</span>把钥匙，打开银宝箱。
              确认打开吗？
            </div>
            <div class="btn" @click="openBox">确认</div>
          </div>
        </template>
        <!-- 奖品兑换成功 -->
        <template v-if="popupType == 4">
          <div class="exchange-award">
            <div class="body">
              <div class="award-img">
                <img :src="award.img | filter" alt="">
              </div>
              <div class="award-name">{{award.awardsName}}</div>
              <div class="btn" @click="hidePopup">收下了</div>
              <div class="explain">奖品已发放到你的平台账户中</div>
            </div>
          </div>
        </template>
        <div class="close" :class="{'award': popupType == 4}" @click="hidePopup"></div>
      </div>
    </transition>
  </div>
</template>
<script>
import Utils from './utils'
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'popup',
  props: ['popupType', 'value', 'keyNum', 'currentBox', 'award'],
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
    hidePopup () {
      this.$emit('input', false)
      switch (this.popupType) {
        case 1: 
          GLOBALS.marchSetsPoint('A_H5PT0308003745')
          break
        case 2: 
          GLOBALS.marchSetsPoint('A_H5PT0308003740')
          break
        case 3: 
          GLOBALS.marchSetsPoint('A_H5PT0308003743')
          break
      }
    },
    openShare () {
      this.hidePopup()
      this.$emit('openShare')
      GLOBALS.marchSetsPoint('A_H5PT0308003739')
    },
    openBox () {
      this.hidePopup()
      this.$emit('openBox')
      GLOBALS.marchSetsPoint('A_H5PT0308003742')
    },
    gotoGame(item) {
      window.location.href = item.url
    },
    confirmExchange() {
      this.$emit('confirmExchange')
    }
  },
  watch: {
    value (newValue) {
      if(newValue && [1].indexOf(this.popupType) == -1) {
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
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background: rgba(0,0,0,.7);
  }
  .wrap {
    position: fixed;
    left: 50%;
    top: 45%;
    z-index: 11;
    transform: translate(-50%, -50%);
    .close {
      position: absolute;
      right: 0;
      top: .4rem;
      width: .75rem;
      height: .65rem;
      &.award {
       top: 2.5rem;
       right: .4rem;
      }
    }
    .btn {
      margin: 0 auto;
      width: 2.89rem;
      height: .91rem;
      font-size: .3rem;
      color: #9D0001;
      text-align: center;
      line-height: .89rem;
      font-weight: bold;
      background: url(../img/popup-btn.png) no-repeat center top;
      background-size: 100% 100%;
    }
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
    .rule {
      padding: 1.12rem .6rem 0;
      width: 5.16rem;
      height: 5.5rem;
      background: url(../img/rule-bg.png) no-repeat center top;
      background-size: 100% 100%;
      .body {
        margin-bottom: .2rem;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        font-size: .24rem;
        color: #8E441B;
        font-weight: 600;
        height: 2.9rem;
      }
    }
    .exchange-error {
      padding: .9rem .6rem 0;
      width: 5.16rem;
      height: 5.5rem;
      background: url(../img/exchange-error.png) no-repeat center top;
      background-size: 100% 100%;
      .body {
        margin-bottom: 2.1rem;
        font-size: .24rem;
        color: #8E441B;
        text-align: center;
        font-weight: 600;
        p {
          &:first-child {
            margin-bottom: .1rem;
          }
        }
        span {
          color: #D41E00;
        }
      }
    }
    .confirm-exchange  {
      padding: 1.12rem .6rem 0;
      width: 5.16rem;
      height: 3.4rem;
      background: url(../img/exchange-confirm-bg.png) no-repeat center top;
      background-size: 100% 100%;
      .body {
        margin-bottom: .2rem;
        font-size: .24rem;
        color: #8E441B;
        text-align: center;
        font-weight: 600;
        line-height: .42rem;
        span {
          color: #D41E00;
        }
      }
    }
    .exchange-award {
      .body {
        padding: 3.2rem .6rem 0;
        width: 5.88rem;
        height: 7.6rem;
        background: url(../img/award-bg.png) no-repeat center top;
        background-size: 100% 100%;
        .award-img {
          margin-bottom: .2rem;
          text-align: center;
          height: 1.82rem;
          img {
            width: auto;
            height: 1.82rem;
          }
        }
        .award-name {
          text-align: center;
          margin-bottom: .28rem;
          font-size: .24rem;
          color: #404040;
          font-weight: 600;
        }
        .explain {
          margin-top: .2rem;
          text-align: center;
          font-size: .2rem;
          color: #9B6805;
          span {
            color: #FEF84B;
          }
        }
      }
    }
  }
  .scale-enter-active {
    animation: showAnimation .5s 1;
  }
  @keyframes showAnimation {
    0% {
      transform: translate(-50%, -50%) scale(0) ;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }

  }
}
</style>