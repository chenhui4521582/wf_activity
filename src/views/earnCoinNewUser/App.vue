<template>
  <div class="newUser">
    <!-- 返回按钮 -->
    <div class="back-btn" @click="backHome">
      <img class="inner-img" src="./img/back-icon.png" alt="">
    </div>
    <!-- 规则按钮 -->
    <div class="rule-btn" @click="openRule">
      <img class="inner-img" src="./img/rule-icon.png" alt="">
    </div>
    <!-- 跑马灯 -->
    <slider :list="activitiesInfo.noticeList"/>
    <!-- 内容 -->
    <div class="content">
      <!--任务-->
      <div class="item task">
        <div class="title">
          <img src="./img/title1.png" alt="">
          <!-- 倒计时 -->
          <count-down :time="countdown" @countDownCallback="countDownCallback"/>
        </div>
        <div class="list">

        </div>
      </div>
      <!-- 提现 -->
      <div class="item withdraw">
        <div class="title">
          <img src="./img/title2.png" alt="">
        </div>
        <div class="body">
          <div class="icon">
            <img class="inner-img" src="./img/withdraw-icon.png" alt="">
          </div>
          <div class="text">
            <div class="name">提现说明:</div>
            <div class="desc">满金<span>3000</span>币 即可提现</div>
          </div>
          <div class="btn-wrap">
            <div class="btn award">去领取</div>
            <div class="btn disable">金币不足</div>
            <div class="btn finished">已领取</div>
            
          </div>
        </div>
      </div>
      <!-- 砸蛋 -->
      <div class="item egg">
        <div class="title">
          <img src="./img/title3.png" alt="">
        </div>
        <div class="body">
          <div class="icon">
            <img class="inner-img" src="./img/egg-icon.png" alt="">
          </div>
          <div class="text">
            <p>福利说明： </p>
            <p>玩游戏累计时长可以砸金蛋，</p>
            <p>最高获得5000元现金奖励</p>
            <p>以及手机福利。</p>
          </div>
          <div class="btn-wrap">
            <div class="btn to-finish">去砸蛋</div>
          </div>
        </div>
      </div>
    </div>
    <!-- popup -->
    <popup 
      v-model="showPopup" 
      :popupType="popupType"
      :activitiesInfo="activitiesInfo"
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
    activitiesInfo: {},
    countdown: '',
    showPopup: false,
    popupType: 0
  }),
  components: {
    CountDown,
    Popup,
    Slider
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
.newUser {
  padding: 3.55rem .2rem 0;
  overflow: hidden;
  min-height: 100vh;
  background: url(./img/bg.png) no-repeat center -1.27rem #F19643;
  background-size: 7.2rem auto;
  .back-btn {
    position: fixed;
    left: .18rem;
    top: .34rem;
    z-index: 1;
    width: .78rem;
    height: .78rem;
  }
  .rule-btn {
    position: fixed;
    right: .2rem;
    top: .43rem;
    z-index: 10;
    width: .8rem;
    height: .46rem;
  }
  .content {
    .item {
      margin-bottom: .2rem;
      overflow: hidden;
      background: #fff;
      border-radius: .5rem;
      .title {
        margin-top: .34rem;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
      }
      .body {
        padding: 0 .3rem .3rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .icon {
          margin-right: .1rem;
          width: 1.72rem;
          height: 1.5rem;
        }
        .btn-wrap {
          margin-left: auto;
          .btn {
            width: 1.2rem;
            height: .7rem;
            color: #fff;
            border-radius: .35rem;
            text-align: center;
            line-height: .7rem;
            font-weight: bold;
            font-size: .24rem;
            &.award {
              background: #E42C01;
            }
            &.finished {
              background: #D5D5D5;
            }
            &.disable {
              background: #D5D5D5;
            }
            &.to-finish {
              background: url(./img/to-finish.png) no-repeat center center;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .task {
      .title {
        padding: 0 .3rem 0 .25rem;
        margin-bottom: .1rem;
        img {
          vertical-align: top;
          width: 3.95rem;
          height: .36rem;
        }
      }
      .list {

      }
    }
    .withdraw {
      .title {
        padding: 0 .3rem 0 .25rem;
        margin-bottom: .37rem;
        img {
          vertical-align: top;
          width: 2.89rem;
          height: .35rem;
        }
      }
      .text {
        font-size: .24rem;
        color: #3C3C3C;
        .name {
          margin-bottom: .04rem;
        }
        .desc {
          font-size: .26rem;
          color: #3C3C3C;
          span {
            color: .3rem;
            font-weight: bold;
          }
        }
      }
      .btn-wrap {
        .btn {
          width: ;
        }
      }
    }
    .egg {
      .title {
        padding: 0 .3rem 0 .25rem;
        margin-bottom: .1rem;
        img {
          vertical-align: top;
          width: 4.47rem;
          height: .36rem;
        }
      }
      .text {
        p {
          margin-bottom: .05rem;
          line-height: 1.1;
          color: #3C3C3C;
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
</style>
