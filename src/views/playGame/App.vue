<template>
  <div class="play-game">
    <div class="title">
      <img src="./images/title-text.png" alt="">
    </div>
    <div class="back-btn" @click="back"></div>
    <div class="rule-btn" @click="openRule"></div>
    <div class="game-info">
      <div class="game-img">
        <img v-if="userInfo.gameIcon" :src="userInfo.gameIcon | filter" alt="">
      </div>
      <div class="explain">
        玩2局糖果夺宝即可瓜分
      </div>
      <div class="progress" v-if="!isFinished">
        <div class="body">
          <div class="bg" :style="{'width': countWidth}"></div>
        </div>
        <div class="progress-text">{{userInfo.myGameTimes}}/{{userInfo.gameTimes}}</div>
      </div>
      <div class="finished" v-else>
        已完成
      </div>
    </div>
    <div class="btns" v-if="!isApply" >
      <div class="play-btn" v-if="!isFinished" @click="playGame">去玩游戏</div>
      <div class="go-apply" v-else @click="_goApplay">参与瓜分</div>
    </div>
    <div class="apply" v-else>
      <p>恭喜您成功参与瓜分</p>
      奖励于次日0点发放
    </div>
    <div class="people">
      已经有{{userInfo.divideNum}}人参与瓜分
    </div>
    <div class="rule" v-if="showRule">
      <div class="mask"></div>
      <div class="center">
        <div class="rule-title">活动规则</div>
        <div class="body">
          1. 活动时间：{{time}} ,00：00-24：00<br>
          2. 参与方式：进入活动页面完成指定任务即可参与瓜分<br>
          3. 奖励发放：参与瓜分成功后，次日登陆即可领取瓜分奖励，<br>
          4. 超过24小时不领取瓜分奖励，则视为放弃奖励<br>
          5. 如有其他疑问，请点击咨询客服。活动最终解释权归平台所有。
        </div>
        <div class="close" @click="hidRule"></div>
      </div>
    </div>
  </div>
</template>

<script>
import _get from 'lodash.get'
export default {
  name: 'playGame',
  data: () => ({
    showRule: false,
    userInfo: {}
  }),
  computed: {
    isFinished() {
      return this.userInfo.myGameTimes >= this.userInfo.gameTimes
    },
    isApply() {
      return this.userInfo.apply
    },
    countWidth() {
      let width = this.userInfo.myGameTimes / this.userInfo.gameTimes * 100
      if(width> 100) {
        return '100%'
      }
      return  width + '%'
    }
  },
  methods: {
    openRule() {
      this.showRule = true
      GLOBALS.marchSetsPoint('A_H5PT0227002603')
    },
    hidRule() {
      this.showRule = false
    },
    back() {
      window.history.back()
    },
    playGame() {
      if(this.userInfo.gameUrl){
        GLOBALS.marchSetsPoint('A_H5PT0227002601')
        let APP_CHANNEL = localStorage.getItem('APP_CHANNEL')
        let time = new Date().getTime()
        window.location.href = `${this.userInfo.gameUrl}?channel=${APP_CHANNEL}&time=${time}`
      }
    },
    _getUserInfo() {
      let url = '//ops-api.beeplaying.com/ops/api/play-game-jackpot/user-info'
      this.axios.post(url).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.userInfo = _get(res, 'data.data')
          if(this.userInfo.apply) {
            GLOBALS.marchSetsPoint('A_H5PT0227002604')
          }
        }
      })
    },
    _goApplay() {
      let url = '//ops-api.beeplaying.com/ops/api/play-game-jackpot/apply'
      this.axios.post(url).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this._getUserInfo()
        }
      })
      GLOBALS.marchSetsPoint('A_H5PT0227002602')
    },
    localTime() {
      var date=new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      this.time = `${year}/${month}/${day}`
    }
  },
  mounted () {
    this._getUserInfo()
    this.localTime()
    GLOBALS.marchSetsPoint('P_H5PT0227')
  }
}
</script>
<style lang="less" scoped>
@import '../../common/css/base.css';
.play-game {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background: url(./images/bg.png) no-repeat center top / 100% auto #FDC9A7;
  .title {
    margin: .26rem auto 0;
    width: 5.27rem;
    height: 1.91rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
  .game-info {
    margin-top: .81rem;
    .game-img {
      margin:0 auto .35rem;
      width: 1.2rem;
      height: 1.2rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .explain {
      margin-bottom: .25rem;
      text-align: center;
      font-size: .36rem;
      color: #A25A32;
      font-weight:bold;
    }
    .progress {
      .body {
        position: relative;
        margin: 0 auto .2rem;
        width: 3.42rem;
        height: .22rem;
        border:2px solid #A25A32;
        border-radius: .22rem;
        .bg {
          width: 0%;
          height: 100%;
          background: #A25A32;
        }
      }
      .progress-text{
        margin-bottom: 2.41rem;
        text-align: center;
        font-size: .3rem;
        color: #A25A32;
        font-weight:bold;
      }
    }
    .finished {
      margin:.7rem 0 2rem;
      text-align: center;
      font-size: .36rem;
      color: #999999;
      font-weight:bold;
    }
  }
  .btns{
    margin: 0 auto .57rem;
    width: 3.72rem;
    height: 1.15rem;
    background: url(./images/btn.png) no-repeat center top / 100% 100%;
    text-align: center;
    font-size: .36rem;
    color: #A25A32;
    font-weight:bold;
    line-height: .9rem;
  }
  .apply {
    margin-bottom:.57rem;
    height: 1.15rem;
    text-align: center;
    font-size: .36rem;
    color: #A25A32;
    font-weight:bold;
    color: #FFE294;
    font-size: .24rem;
    p {
      line-height: 1;
      margin-bottom: .17rem;
      font-size: .4rem;
    }
  }
  .people {
    margin: 0 auto;
    width:3.93rem;
    height: .44rem;
    background:rgba(141,18,11,1);
    border-radius: .22rem;
    text-align: center;
    font-size: .24rem;
    color: #FFE497;
    line-height: .44rem;
  }
  .back-btn {
    position: absolute;
    left: 0;
    top: .14rem;
    width: .82rem;
    height: .5rem;
    background: url(./images/back.png) no-repeat center top / 100% 100%;
  }
  .rule-btn {
    position: absolute;
    left: 0;
    top: .79rem;
    width: .82rem;
    height: .5rem;
    background: url(./images/rule.png) no-repeat center top / 100% 100%;
  }
}
.rule {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 2;
    background: rgba(0,0,0,.5)
  }
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    width: 5.11rem;
    height: 6.39rem;
    
    .rule-title {
      height: .98rem;
      background: #C36F44;
      font-size: .36rem;
      color: #FDD5BA;
      font-weight: bold;
      text-align: center;
      line-height: .98rem;
      border-radius: .16rem .16rem 0 0;
    }
    .body {
      box-sizing: border-box;
      padding: .37rem .45rem;
      height: 5.4rem;
      background: #FDD5BA;
      font-size: .26rem;
      color:#C36F44;
      line-height: .44rem;
      border-radius: 0 0 .16rem .16rem;
    }
    .close {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translate(-50%, 0);
      width: .6rem;
      height: .6rem;
       background: url(./images/close.png) no-repeat center top / 100% 100%;
    }
  }
}
</style>
