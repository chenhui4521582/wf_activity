<template>
  <div class="master-pk">
    <!-- 返回按钮 -->
    <div class="back-btn" @click="backHome">
      <img class="inner-img" src="./img/back-icon.png" alt="">
    </div>
    <!-- 规则按钮 -->
    <div class="rule-btn" @click="openPopup(1)">
      <img class="inner-img" src="./img/rule-icon.png" alt="">
    </div>
    <!-- 倒计时 -->
    <count-down v-if="activitiesInfo.state == 1" :time="countdown" @countDownCallback="countDownCallback"/>
    <!-- 活动结束 -->
    <div class="activities-end" v-else>
      <img class="inner-img" src="./img/ac-end.png" alt="">
    </div>
    <!-- 奖池 -->
    <div class="prize">
      <div class="red item">加入任一队伍即可瓜分5000元话费，玩家贡献值越高，奖励越多</div>
      <div class="blue item">获胜队赢80%奖池奖励，惜败队获20%。队员贡献值越高，奖励越多</div>
      <div class="jeckpot">
        奖池已累计 <span>{{activitiesInfo.awardPool || 0}}</span> 元京东券
        <img class="jeckpot-icon" src="./img/jeckpot-icon.png" alt="">
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="ranking" :class="{'join': isJoin}">
      <div class="total">
        <div class="item red">
          <p class="title">红队</p>
          <p class="hot-num">火力值<img src="./img/hot-icon.png" alt="">：<span>{{activitiesInfo.redExp}}</span></p>
          <p class="hot-people">火力人数：<span>{{activitiesInfo.redUserNum}}</span></p>
          <div class="lead" v-if="activitiesInfo.redExp > activitiesInfo.blueExp">
            <img class="inner-img" src="./img/leader.png" alt="">
          </div>
        </div>
        <div class="item blue">
          <p class="title">红队</p>
          <p class="hot-num">火力值<img src="./img/hot-icon.png" alt="">：<span>{{activitiesInfo.blueExp}}</span></p>
          <p class="hot-people">火力人数：<span>{{activitiesInfo.blueUserNum}}</span></p>
          <div class="lead" v-if="activitiesInfo.blueExp > activitiesInfo.redExp">
            <img class="inner-img" src="./img/leader.png" alt="">
          </div>
        </div>
      </div>
      <div class="explain">
        ·因人数火爆，优先展示各队伍贡献值前10名选手
      </div>
      <!-- banner -->
      <slider :list="sliderList"/>
      <div class="rank">
        <div class="nav">
          <div class="item name">昵称</div>
          <div class="item hot">火力值</div>
          <div class="item people">贡献值</div>
        </div>
        <div class="list">
          <!-- 没有加入 -->
          <template v-if="!isJoin">
            <img class="join" src="./img/join.png" alt="">
          </template>
          <!-- 加入 -->
          <template v-else >
            <div class="item" v-for="(item, index) in rank" :key="index">
              <div class="name">
                <img v-if="index == 0" src="./img/rank1.png" alt="">
                <img v-if="index == 1" src="./img/rank2.png" alt="">
                <img v-if="index == 2" src="./img/rank3.png" alt="">
                {{item.nickName}}
              </div>
              <div class="hot">{{item.exp}}</div>
              <div class="people">{{item.expRate}}</div>
            </div>
          </template>
        </div>
        <div class="switch-btn" v-if="isJoin">
          <img v-if="currentIndex == 1" class="inner-img" src="./img/switch-red.png" alt="" @click="handleClick(2)">
          <img v-if="currentIndex == 2" class="inner-img" src="./img/switch-blue.png" alt="" @click="handleClick(1)">
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="footer" :class="{'end': this.activitiesInfo.state != 1}">
      <div class="team">
        <div class="title">我的队伍</div>
        <div class="join-btn" v-if="!isJoin" @click="handleJoin">
          <img class="inner-img" src="./img/join-btn.png" alt="">
        </div>
        <div class="num" v-if="isJoin == 1">红队</div>
        <div class="num" v-if="isJoin == 2">蓝队</div>
      </div>
      <div class="hot-num">
        <div class="title">累计火力值</div>
        <div class="num">{{activitiesInfo.userExp}}</div>
      </div>
      <div class="contribution">
        <div class="title">贡献值</div>
        <div class="num">{{activitiesInfo.userExpRate}}</div>
      </div>
      <div class="get-hot" v-if="this.activitiesInfo.state == 1" @click="openPopup(12)">
        <div class="title">我要火力值</div>
        <div class="num">>></div>
      </div>
      <div class="get-hot" v-else>
        <div class="title">我要火力值</div>
        <div class="num">>></div>
      </div>
    </div>
    <!-- popup -->
    <popup 
      v-model="showPopup" 
      :popupStatus="popupStatus"
      :activitiesInfo="activitiesInfo"
      :award="award"
      @openPopup="openPopup"
      @joinTeam="_joinTeam"
    />
  </div>
</template>
<script>
import CountDown from './components/countDown'
import Slider from './components/slider'
import Popup from './components/popup'
import Services from './services/services'
import utils from './components/utils'
import _get from 'lodash.get'
export default {
  name: 'masterPK',
  data: ()=>({
    activitiesInfo: {},
    countdown: '',
    showPopup: false,
    popupStatus: 0,
    sliderList: [],
    rank: [],
    currentIndex: null,
    award: {}
  }),
  components: {
    CountDown,
    Slider,
    Popup
  },
  computed: {
    isJoin () {
      if(this.activitiesInfo && this.activitiesInfo.userGroup == 0) {
        return false
      }
      return this.activitiesInfo.userGroup
    }
  },
  methods: {
    /** 获取活动信息 **/
    _getInfo () {
      Services.getInfo().then(res => {
        const {code} = _get(res, 'data')
        if(code == 200) {
          this.activitiesInfo = _get(res, 'data.data', {})
          this.countdown = _get(res, 'data.data.countdown', 0)
          this.sliderList = _get(res, 'data.data.msg', [])
          const userGroup = _get(res, 'data.data.userGroup', 0)
          this.currentIndex = userGroup
          
          if(_get(res, 'data.data.state', 0) == 2) {
            if(_get(res, 'data.data.tipFlog')  == 1) {
              this._getAward() 
              return false
            }
            this.openPopup(11)
          }
          if(_get(res, 'data.data.addExp') != 0) {
            this.openPopup(8)
          }
          if(userGroup != 0) {
            this._getRank(userGroup)
          }
        }
      })
    },
    /** 加入队伍点击 **/
    handleJoin () {
      if(this.activitiesInfo.userExp < 20) {
        this.openPopup(5)
      }else{
        this.openPopup(4)
      }
    },
    /** 加入队伍 **/
    _joinTeam () {
      Services.joinTeam().then(res => {
        // res = {
        //   data: {"code":200,"data":{"groupType":2},"message":null}
        // }
        const {code, message} = _get(res, 'data')
        if(code == 200) {
          const userGroup = _get(res, 'data.data.groupType', 0)
          this.activitiesInfo.userGroup = userGroup
          if(userGroup == 1) {
            this.openPopup(6)
          }
          if(userGroup == 2) {
            this.openPopup(7)
          }
          this._getRank(userGroup)
        } else {
          this.$toast.show({ message })
        }
      })
    },
    /** 获取列表 **/
    _getRank (userGroup) {
      Services.getRank(userGroup).then(res => {
        const {code, message} = _get(res, 'data')
        if(code == 200) {
          this.rank = _get(res, 'data.data', [])
        } else {
          this.$toast.show({ message })
        }
      })
    },
    /** 获取奖品 **/
    _getAward () {
      Services.getAward().then(res => {
        const {code, message} = _get(res, 'data')
        if(code == 200) {
          this.award = _get(res, 'data.data', {})
          if(this.award.isKO == 1) {
            this.openPopup(9)
          }
          if(this.award.isKO == 0) {
            this.openPopup(10)
          }
        } else {
          this.$toast.show({ message })
        }
      })
    },
    handleClick (index) {
      this.currentIndex = index
      this.rank = []
      this._getRank(index)
    },
    openPopup (status) {
      this.showPopup = true
      this.popupStatus = status
    },
    backHome() {
      window.location.href = "//wap.beeplaying.com/xmWap/"
      GLOBALS.marchSetsPoint('A_H5PT0278003318')
    },
    countDownCallback() {
      this.activitiesInfo.state = 2
    },
    endTime() {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      return new Date(`${y}/${m}/${d}`).getTime()
    }
  },
  mounted() {
    this._getInfo()
    let endTime = this.endTime()
    let cacheTime = localStorage.getItem('maskterPk')
    /** 假如缓存时间小于当前时间, 打开弹框更新缓存**/
    if (cacheTime) {
      if(endTime != cacheTime){
        localStorage.setItem('maskterPk', `${this.endTime()}`)
        this.openPopup(2)
      }
    } else {
      localStorage.setItem('maskterPk', `${this.endTime()}`)
      this.openPopup(2)
    }
  }
}
</script>
<style lang="less">
@import url('../../common/css/base.less');
@import url('../../../static/iconfont/iconfont.css');
* {
  box-sizing: border-box;
}
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.master-pk {
  padding: 1.93rem 0 1.3rem;
  min-height: 100vh;
  background: url(./img/top-bg.png) no-repeat center top #120C40;
  background-size: 100% 3.1rem;
  .back-btn {
    position: absolute;
    left: 0;
    top: .17rem;
    width: .78rem;
    height: .56rem;
  }
  .rule-btn {
    position: absolute;
    top: .97rem;
    left: 0;
    width: .78rem;
    height: .56rem;
  }
  .activities-end {
    margin: 0 auto .13rem;
    height: .54rem;
    width: 3.77rem;
  }
  .prize {
    position: relative;
    margin: 0 auto .15rem; 
    padding: .97rem .24rem;
    display: flex;
    justify-content: space-between;
    width: 6.64rem;
    height: 3.83rem;
    background: url(./img/banner-bg.png) no-repeat center center;
    background-size: 100% 100%;
    .item {
      padding: .66rem .2rem 0;
      width: 3rem;
      height: 1.8rem;
      font-size: .22rem;
      &.red {
        color: #FFEBEE;
        background: url(./img/prize-blue.png) no-repeat center center;
        background-size: 100% 100%;
      }
      &.blue {
        color: #E1E2FF;
        background: url(./img/prize-red.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .jeckpot {
      position: absolute;
      bottom: .08rem;
      left: .88rem;
      width: 4.89rem;
      height: 1.09rem;
      background: url(./img/jeckpot-bg.png) no-repeat center center;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .22rem;
      color: #A4152E;
      font-weight: bold;
      span {
        color: #201FF1;
        font-size: .26rem;
      }
      .jeckpot-icon {
        margin-left: .2rem;
        width: .33rem;
        height: .33rem;
      }
    }
  }
  .ranking {
    position: relative;
    margin: 0 auto;
    padding-top: 2.8rem;
    width: 6.87rem;
    height: 6.6rem;
    background: url(./img/ranking-bg2.png) no-repeat center top;
    background-size: 100% 6.6rem;
    &.join {
      height: 9.6rem;
      background: url(./img/ranking-bg1.png) no-repeat center top;
      background-size: 100% 9.6rem;
      .list {
        height: 4.7rem;
      }
    }
    .total {
      position: absolute;
      top: -.31rem;
      left: .21rem;
      padding-top: 1.43rem;
      width: 6.4rem;
      height: 3.3rem;
      background: url(./img/total-bg.png) no-repeat center top;
      background-size: 100% 100%;
      display: flex;
      .item {
        position: relative;
        width: 50%;
        color: #FFFFFF;
        font-size: .22rem;
        span {
          color: #FFF113;
          font-weight: bold;
        }
        .title {
          margin-bottom: .2rem;
          text-indent: .73rem;
          font-size: .28rem;
          font-weight:800;
        }
        .hot-num {
          margin-bottom: .1rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          white-space: nowrap;
          img {
            width: .22rem;
            height: .26rem;
          }
        }
        .hot-people {
          white-space: nowrap;
        }
        .lead {
          position: absolute;
          top: -.5rem;
          width: .77rem;
          height: .83rem;
        }
        &.red {
          padding-left: .29rem;
          .lead {
            left: .5rem;
          }
        }
        &.blue {
          padding-left: .8rem;
          .lead {
            left: 1rem;
          }
        }
      }
    }
    .explain {
      text-align: center;
      color: #1AC3FB;
      font-size: .22rem;
    }
    .rank {
      position: relative;
      margin: 0 auto;
      width: 5.56rem;
      .nav {
        height: .44rem;
        display: flex;
        justify-content: center;
        border-radius: .22rem;
        background: #C8032A;
        .item {
          flex: 1;
          text-align: center;
          font-size: .24rem;
          color: #fff;
          line-height: .44rem;
        }
        .name {
          flex: 0 0 2.3rem;
        }
      }
      .list {
        margin-top: .1rem;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          >div {
            flex: 1;
            height: .6rem;
            line-height: .6rem;
            text-align: center;
            font-size: .24rem;
            color: #61A8FF;
          }
          &:nth-child(1) {
            color: #E10A50;
          }
          &:nth-child(2) {
            color: #D6B73E;
          }
          &:nth-child(3) {
            color: #2FE0E3;
          }
          .name {
            flex: 0 0 2.3rem;
            position: relative;
            padding-left: .4rem;
            text-align: left;
            img {
              position: absolute;
              top: .05rem;
              left: 0;
              width: .34rem;
              height: .41rem;
            }
          }
        }
      }
      .switch-btn {
        position: absolute;
        right: -.1rem;
        top: 1.75rem;
        width: 1.18rem;
        height: 1.18rem;
      }
      .join {
        margin: .55rem auto;
        display: block; 
        width: 3.36rem;
        height: .54rem;
      }

    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 1.2rem;
    background: url(./img/footer-bg.png) no-repeat center center;
    background-size: 100% 100%;
    &.end {
      background: url(./img/footer-bg1.png) no-repeat center center;
      background-size: 100% 100%;
    }
    >div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      height: .8rem;
      border-right: 1px solid #650216;
      .title {
        font-size: .24rem;
        color: #893400;
        font-weight:800;
      }
      .num {
        font-size: .26rem;
        color: #D00022;
        font-weight:bold;
      }
    }
    .team {
      width: 1.74rem;
      .join-btn {
        margin: .05rem auto 0;
        width: 1.42rem;
        height: .53rem;
      }
    }
    .hot-num {
      width: 2.08rem;
    }
    .contribution {
      width: 1.2rem;
      border-right: none
    }
    .get-hot {
      width: 2.2rem;
      text-align: center;
      border-right: none;
      justify-content: center;
      .title {
        color: #fff;
      }
      .num {
        color: #fff;
      }
    }
  }
}

</style>
