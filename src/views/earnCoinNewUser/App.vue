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
          <count-down :time="activitiesInfo.countDown" @countDownCallback="countDownCallback"/>
        </div>
        <div class="list-item" v-for="item in activitiesInfo.taskList" :key="item.id">
          <div class="icon">
            <img class="inner-img" :src="item.image | filter" alt="">
          </div>
          <div class="desc">
            <div class="name">
              {{item.remark}}
            </div>
            <div class="remark">
              <font>原得{{item.awards}}</font><span>现得{{item.doubleAwards }}</span> 
            </div>
          </div>
          <div class="btn-wrap">
            <div class="btn to-finish" v-if="item.status == 1" @click="goDetail(item)">去完成</div>
            <div class="btn award" v-if="item.status == 2" @click="goDetail(item)">去领取</div>
            <div class="btn finished" v-if="item.status == 3">已领取</div>
          </div>
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
            <div class="desc">满<span>3000</span>金币 即可提现</div>
          </div>
          <div class="btn-wrap">
            <div class="btn award" v-if="withdraw.status == 2" @click="goWithDraw">去领取</div>
            <div class="btn disable" v-if="withdraw.status == 1" @click="goWithDraw">金币不足</div>
            <div class="btn finished" v-if="withdraw.status == 3">已领取</div>
            <div class="num">{{withdraw.coinNum}}/3000</div>
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
            <div class="btn to-finish" @click="goDutaionActive">去砸蛋</div>
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
  computed: {
    withdraw () {
      return _get(this.activitiesInfo, 'withdraw', {})
    }
  },
  methods: {
    /** 获取活动信息 **/
    _getInfo () {
      Services.getInfo().then(res => {
        const {code, message} = _get(res, 'data')
        if(code == 200) {
          this.countdown = _get(res, 'data.data.countdown', '')
          this.activitiesInfo = _get(res, 'data.data', {})
        }else {
          this.$toast.show({
            message
          })
        }
      })
    },
    openRule () {
      GLOBALS.marchSetsPoint('A_H5PT0321003970')
      this.popupType = 1
      this.showPopup = true
    },
    backHome() {
      GLOBALS.marchSetsPoint('A_H5PT0303000029')
      window.location.href = "//wap.beeplaying.com/earnCoin/"
    },
    goWithDraw () {
      console.log(this.withdraw)
      if(this.withdraw.status == 2) {
        GLOBALS.marchSetsPoint('A_H5PT0303000032')
        window.location.href = 'https://wap.beeplaying.com/earnCoin/#/withdraw'
      }
      if(this.withdraw.status == 1) {
        GLOBALS.marchSetsPoint('A_H5PT0303000033')
      }
    },
    goDetail ({taskId, status, taskName}) {
      if(status == 1) {
        GLOBALS.marchSetsPoint('A_H5PT0303000030', {
          task_id: taskId,
          task_name: taskName
        })
      }
      if(status == 2) {
        GLOBALS.marchSetsPoint('A_H5PT0303000031', {
          task_id: taskId,
          task_name: taskName
        })
      }
      window.location.href = `https://wap.beeplaying.com/earnCoin/#/task/detail?id=${taskId}`
    },
    goDutaionActive () {
      GLOBALS.marchSetsPoint('A_H5PT0303000034')
      window.location.href = 'https://wap.beeplaying.com/activities/duration.html'
    },
    countDownCallback () {
      this._getInfo()
    }
  },
  mounted() {
    this._getInfo()
    GLOBALS.marchSetsPoint('A_H5PT0303000028')
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
        margin-bottom: .4rem;
        height: .4rem;
        justify-content: space-between;
        align-items: baseline;
        img {
          vertical-align: top;
          width: 3.95rem;
          height: .36rem;
        }
      }
      .list-item {
        padding: 0 .3rem;
        margin-bottom: .4rem;
        display: flex;
        justify-self: flex-start;
        align-items: center;
        .icon {
          margin-right: .15rem;
          width: .8rem;
          height: .8rem;
          border-radius: .15rem;
          overflow: hidden;
        }
        .desc {
          .name {
            font-size: .26rem;
            color: #3C3C3C;
          }
          .remark {
            font-size: .24rem;
            color: #3C3C3C;
            font {
              margin-right: .1rem;
              color: #AAAAAA;
              text-decoration: line-through;
            }
            span {
              font-size: .26rem;
              color: #FC3E23;
              font-weight: bold;
            }
          }
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
    .withdraw {
      .title {
        padding: 0 .3rem 0 .25rem;
        margin-bottom: .1rem;
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
          margin-bottom: .05rem;
        }
        .num {
          white-space: nowrap;
          text-align: center;
          color: #FC3E22;
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
}
</style>
