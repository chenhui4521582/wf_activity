<template>
  <div class="popup" v-if="value">
    <div class="mask"></div>
    <div class="center">
      <!-- 领取红星弹框 -->
      <template v-if="popupStatus == 1">
        <div class="title">恭喜获得</div>
        <div class="love-icon">
          <img src="./img/love-icon1.png" alt="">
        </div>
        <div class="love-num">X{{love.number}}</div>
        <div class="love-explain" v-if="love.lottery">甜心越多，红包越大哦！</div>
        <div class="love-explain" v-else>
          <p>还差{{love.lackNum}}颗甜心，</p>
          <p>2月18日就可抽红包大奖啦！</p>
        </div>
      </template>
      <!-- 领取红包弹框 -->
      <template v-if="popupStatus == 2">
        <div class="title">恭喜获得红包</div>
        <div class="award-icon">
          <img src="./img/huafei-icon.png" alt="" v-if="award.awardsType == 'hfj'">
          <img src="./img/leaf-icon.png" alt="" v-if="award.awardsType == 'jyz'">
          <img src="./img/card-icon.png" alt="" v-if="award.awardsType == 'yhq'">
        </div>
        <div class="award-num">
          {{award.awardsName}}
        </div>
        <div class="award-explain">
          奖励可到“我的”页面查看
        </div>
      </template>
      <!-- 抽奖当天，红星是否够提示弹框 -->
      <template v-if="popupStatus == 3">
        <div class="title">恭喜你</div>
        <div class="has-title ok" v-if="sweetHeartNum >= 30">
          <p>当前累计甜心 {{sweetHeartNum}} 颗 </p>
          <p>今日可抽红包！</p>
        </div>
        <div class="has-title no" v-if="sweetHeartNum < 30">
          <p>当前累计甜心 {{sweetHeartNum}} 颗</p>
          <p>还差{{30 - sweetHeartNum}} 颗今日可抽红包！</p>
        </div>
        <div class="has-icon">
          <img src="./img/award-icon.png" alt="">
        </div>
        <div class="has-explain ok" v-if="sweetHeartNum >= 30">
          <p>完成任务或购买限定礼盒可得更多甜心，</p>
          <p>抽更大红包~</p>
        </div>
        <div class="has-explain no" v-if="sweetHeartNum < 30">
          <p>完成任务或购买限定礼盒可得甜心哟~</p>
        </div>
        <div class="has-btn ok" v-if="sweetHeartNum >= 30" @click="hidePopup"></div>
        <div class="has-btn no" v-if="sweetHeartNum < 30" @click="hidePopup"></div>
      </template>
      <!-- 更多游戏弹框 -->
      <template v-if="popupStatus == 4">
        <div class="title">大家都在玩</div>
        <ul class="game-list">
          <li v-for="(item, index) in gameList" :key="index" @click="gotoGame(item)">
            <img :src="item.img" alt="">
          </li>
        </ul>
        <div class="game-btn" @click="moreGame"></div>
        <p class="game-explain">甜心部分游戏消耗金叶不计入活动，</p>
        <p class="game-explain"> 详见规则越多，红包越大哦！</p>
      </template>
      <div class="close" @click="hidePopup"></div>
    </div>
  </div>
</template>
<script>
import utils from './components/utils'
export default {
  name: 'popup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    award: {
      type: Object
    },
    popupStatus: {
      default: 1
    },
    sweetHeartNum: {
      default: 0
    },
    love: {
      type: Object
    }
  },
  data: ()=> ({
    gameList: [
      {img: require('./img/0.png'), url: '//wap.beeplaying.com/crush/', name: '糖果萌消消乐'},
      {img: require('./img/3.png'), url: '//wap.beeplaying.com/fish/', name: '街机欢乐捕鱼'},
      {img: require('./img/2.png'), url: '//wap.beeplaying.com/billiards/', name: '欢乐竞技台球'},
      {img: require('./img/4.png'), url: '//wap.beeplaying.com/kingdom2/', name: '三国大作战'},
      {img: require('./img/1.png'), url: '//wap.beeplaying.com/square/', name: '众神风云'},
      {img: require('./img/5.png'), url: '//wap.beeplaying.com/Marbles/', name: '王者弹珠'},
    ]
  }),
  methods: {
    hidePopup () {
      this.$emit('input', false)
    },
    gotoGame(item) {
      window.location.href = item.url
    },
    moreGame() {
      window.location.href = '//wap.beeplaying.com/xmWap/#/'
    }
  },
  watch: {
    value(newValue){
      if(newValue) {
        utils.ScrollNoMove()
      }else {
        utils.ScrollMove()
      }
    }
  }
}
</script>
<style scoped lang="less">
  .popup {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 10;
    .mask {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 1;
      background: rgba(0,0,0,.7)
    }
    .center {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%);
      z-index: 2;
      width: 5.1rem;
      height: 9.88rem;
      background: url(./img/popup-bg.png) no-repeat center top;
      background-size: 100% 100%;
      .title {
        margin: 2.72rem auto .5rem;
        text-align: center;
        font-size: .24rem;
        color:#FDB887;
        text-align: center;
      }
      .game-list {
        display: flex;
        justify-content: flex-start;
        padding: 0 0 0 .43rem;
        flex-wrap: wrap;
        li {
          position: relative;
          margin: 0 .24rem .17rem 0;
          width: 1.24rem;
          height: 1.7rem;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
          .name {
            position: absolute;
            bottom:  0;
            left: 0;
            width: 100%;
            text-align: center;
            color: #fff;
            font-size: .2rem;
            white-space: nowrap;
          }
        }
      }
      .game-btn {
        margin: 0 auto .1rem;
        width: 2.54rem;
        height: .82rem;
        background: url(./img/more-game.png) no-repeat center top;
        background-size: 100% 100%;
      }
      .game-explain {
        text-align: center;
        margin-bottom: .1rem;
        font-size: .22rem;
        color: #fff;
      }
      .has-title {
        font-size: .4rem;
        text-align: center;
        color: #fff;
        p {
          margin-bottom: .1rem;
        }
      }
      .has-icon {
        margin: .2rem auto;
        width: 2.3rem;
        height: 2.3rem;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
      .has-explain {
        font-size: .22rem;
        color: #FFFFFF;
        text-align: center;
        p {
          margin-bottom: .1rem;
        }
      }
      .has-btn {
        margin: 0 auto;
        width: 2.55rem;
        height: .83rem;
        background: url(./img/enter-btn.png) no-repeat center top;
        background-size: 100% 100%;
        &.ok {
          margin: .1rem auto 0
        }
        &.no {
          margin: .4rem auto 0
        }
      }
      .love-icon {
        margin: 2rem auto .26rem;
        width: 1.96rem;
        height: 1.72rem;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
      .love-num {
        margin-bottom: .3rem;
        font-size: .44rem;
        color: #fff;
        text-align: center;
      }
      .love-explain {
        font-size: .24rem;
        color: #fff;
        text-align: center;
        p {
          margin-bottom: .1rem;
        }
      }
      .award-icon {
        margin: 2rem auto 0;
        width: 2.3rem;
        height: 2.3rem;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
      .award-num {
        margin-bottom: .5rem;
        font-size: .44rem;
        color: #fff;
        text-align: center;
      }
      .award-explain {
        font-size: .24rem;
        color: #fff;
        text-align: center;
      }
      .close {
        position: absolute;
        bottom: -.45rem;
        left: 50%;
        transform: translate(-50%, 0);
        width: .5rem;
        height: .5rem;
        background: url(./img/calose-btn.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
</style>