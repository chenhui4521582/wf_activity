<template>
  <div class="popup" v-if="value">
    <div class="mask"></div>
    <div class="wrap">
      <!-- 活动规则 -->
      <template v-if="popupStatus == 1">
        <div class="rule bg1">
          <div class="title">
            <img src="../img/title-rule.png" alt="">
          </div>
          <div class="body">
            <span class="yellow">1、活动时间：{{activitiesInfo.beginDate | formatTime('m-d')}}-{{activitiesInfo.endDate | formatTime('m-d')}}</span><br>
            <span class="yellow">2、玩游戏消耗金叶或充值可获得火力值，</span>1万流水或单笔充值每满10元=1火力值以下游戏支持1万流水或单笔充值每满10元=1火力值以下游戏支持金叶计入活动：欢乐竞技台球，街机欢乐捕鱼，糖果萌消消，三国大作战，欢乐的小鸟，深海探一探，王者弹珠，众神风云 ，福满多<br>
            3、达到 <span class="yellow underline">200</span> 火力值可加入阵营，参与火力PK<br>
            <span class="yellow">4、参与PK即可瓜分5000元话费</span><br>
            每个队伍都有5000元话费奖励，只要加入阵营，活动结束后根据个人贡献值瓜分5000元话费（贡献值=个人火力值/全队火力值）；<br>
            <span class="yellow">5、瓜分终极奖池</span><br>
            最终PK获胜队伍获得80%奖池奖励，惜败队伍获得20%奖励，根据玩家的贡献值进行瓜分；奖池奖励=两队火力值总和<span class="yellow">*0.05</span>元京东券获胜队玩家瓜分=奖池奖励*个人贡献值<br>
            6、若最终两队火力值相同，则先达成火力值的队伍视为获胜队。
          </div>
        </div>
      </template>
      <!-- 活动攻略 -->
      <template v-if="popupStatus == 2">
        <div class="strategy bg1">
          <div class="title">
            <img src="../img/pk-strategy.png" alt="">
          </div>
          <div class="body">
            <div class="item">
              <img src="../img/rank1.png" alt="">
              PK赛期间，玩家可通过游戏支持金叶或充值获得火力值；
            </div>
            <div class="item">
              <img src="../img/rank2.png" alt="">
              当火力值达到200时，玩家可随机加入红蓝任一队伍，参与两队对决，并瓜分5000元话费；
            </div>
            <div class="item">
              <img src="../img/rank3.png" alt="">
              最终火力值领先的队伍获胜，并获得终极奖池80%大奖！队员在队伍的贡献值越高，奖励越多。
            </div>
            <div class="bottom">
              大神，期待你的对决！
            </div>
          </div>
        </div>
      </template>
      <!-- 大家都在玩 -->
      <template v-if="popupStatus == 3">
        <div class="game-list bg1">
          <div class="title">
            <img src="../img/play-game-title.png" alt="">
          </div>
          <div class="body">
            <div class="list">
              <div class="item" v-for="(item, index) in gameList" :key="index" @click="gotoGame(item)">
                <img :src="item.img" alt="">
              </div>
            </div>
            <div class="more" @click="moreGame">更多游戏>></div>
            <div class="explain">部分游戏支持金叶不计入活动，详见规则</div>
          </div>
        </div>
      </template>
      <!-- 可以加入队伍 -->
      <template v-if="popupStatus == 4">
        <div class="join-yes bg2">
          <div class="body">
            <div class="join-btn" @click="joinTeam">
              <img src="../img/join-btn1.png" alt="">
            </div>
            <div class="hand">
              <img src="../img/hand.png" alt="">
            </div>
            <div class="explain">
              <p>系统将为您随机匹配队伍~ </p>
              <p>祝您好运！</p>
            </div>
          </div>
        </div>
      </template>
      <!-- 不能加入队伍 -->
      <template v-if="popupStatus == 5">
        <div class="join-no bg2">
          <div class="title">
            <img src="../img/join-no.png" alt="">
          </div>
          <div class="body">
            <div class="explain">
              <p>当前您的火力值为<span>{{this.activitiesInfo.userExp}}</span>，</p>
              <p>达到<span>20</span>即可参与对决哦！</p>
            </div>
            <div class="play-game" @click="openPopup(3)">
              <img src="../img/play-game.png" alt="">
            </div>
            <div class="pay" @click="gotpay">
              <img src="../img/pay.png" alt="">
            </div>
          </div>
        </div>
      </template>
      <!-- 加入红队 -->
      <template v-if="popupStatus == 6">
        <div class="join-red bg2">
          <div class="body">
            <div class="title">
              <img src="../img/title-join-red.png" alt="">
            </div>
            <div class="red-team">
              <img src="../img/red-icon.png" alt="">
            </div>
            <div class="explain">
              <p>对决已开始！ </p>
              <p>火力值越多瓜分奖励越多~</p>
            </div>
          </div>
        </div>
      </template>
      <!-- 加入蓝队 -->
      <template v-if="popupStatus == 7">
        <div class="join-blue bg2">
           <div class="body">
            <div class="title">
              <img src="../img/title-join-blue.png" alt="">
            </div>
            <div class="blue-team">
              <img src="../img/blue-icon.png" alt="">
            </div>
            <div class="explain">
              <p>对决已开始！ </p>
              <p>火力值越多瓜分奖励越多~</p>
            </div>
          </div>
        </div>
      </template>
      <!-- 得到的火力值 -->
      <template v-if="popupStatus == 8">
        <div class="get-hot bg2">
          <div class="body">
            <div class="title">
              <img src="../img/get-hot-title.png" alt="">
            </div>
            <div class="hot-num">
              <img src="../img/hot-icon.png" alt="">
              x{{this.activitiesInfo.addExp}}
            </div>
          </div>
        </div>
      </template>
      <!-- pk成功 -->
      <template v-if="popupStatus == 9">
        <div class="pk-success bg2">
          <div class="body">
            <div class="title">
              <img src="../img/title-success.png" alt="">
            </div>
            <div class="explain">
              <p>恭喜对决获胜，牛人如你！</p>
              <p>您的贡献值<span>{{this.award.userGroupExpRate}}</span>，获得如下奖励：</p>
            </div>
            <div class="award">
              <div class="item" v-for="(item, index) in awards" :key="index">
                <img v-if="item.img == 'jdk'" src="../img/jd-icon.png" alt="">
                <img v-if="item.img == 'hfq'" src="../img/hf-icon.png" alt="">
                <p>{{item.name}}</p>
              </div>
            </div>
            <div class="explain">
              <p>奖励将自动发放到您的帐户</p>
            </div>
          </div>
        </div>
      </template>
      <!-- pk失败 -->
      <template v-if="popupStatus == 10">
         <div class="pk-success bg2">
          <div class="body">
            <div class="title">
              <img src="../img/title-error.png" alt="">
            </div>
            <div class="explain">
              <p>胜败乃兵家常事，下次再接再厉！</p>
              <p>您的贡献值<span>{{this.award.userGroupExpRate}}</span>，获得如下奖励：</p>
            </div>
            <div class="award">
              <div class="item" v-for="(item, index) in awards" :key="index">
                <img v-if="item.img == 'jdk'" src="../img/jd-icon.png" alt="">
                <img v-if="item.img == 'hfq'" src="../img/hf-icon.png" alt="">
                <p>{{item.name}}</p>
              </div>
            </div>
            <div class="explain">
              <p>奖励将自动发放到您的帐户</p>
            </div>
          </div>
        </div>
      </template>
      <!-- 奖励结算中 -->
      <template v-if="popupStatus == 11">
        <div class="award-count bg2">
          <div class="title">
            <img src="../img/count-title.png" alt="">
          </div>
          <div class="body">
            <div class="explain1">
              <p>系统正在拼命结算奖励，</p>
              <p> 请您耐心等候。</p>
            </div>
            <div class="explain">
              <p>结算后奖励将自动发放至您的帐户。 </p>
            </div>
          </div>
        </div>
      </template>
      <!-- 获取火力值 -->
      <template v-if="popupStatus == 12">
        <div class="gain-hot bg2">
          <div class="body">
            <div class="play-game" @click="openPopup(3)">
              <img src="../img/play-game.png" alt="">
            </div>
            <div class="pay" @click="gotpay">
              <img src="../img/pay.png" alt="">
            </div>
          </div>
        </div>
      </template>
      <div class="close" @click="hidePopup"></div>
    </div>
  </div>
</template>
<script>
import Utils from './utils'
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'popup',
  props: ['popupStatus', 'value', 'activitiesInfo', 'award'],
  data: () => ({
    gameList: [
      {img: require('../img/0.png'), url: `//wap.beeplaying.com/crush/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '糖果萌消消乐'},
      {img: require('../img/3.png'), url: `//wap.beeplaying.com/fish/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '街机欢乐捕鱼'},
      {img: require('../img/2.png'), url: `//wap.beeplaying.com/billiards/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '欢乐竞技台球'},
      {img: require('../img/4.png'), url: `//wap.beeplaying.com/kingdom2/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '三国大作战'},
      {img: require('../img/1.png'), url: `//wap.beeplaying.com/square/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '众神风云'},
      {img: require('../img/5.png'), url: `//wap.beeplaying.com/Marbles/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '王者弹珠'},
    ],
    awardsImg: {
      hfq: require('../img/hf-icon.png'),
      jdk: require('../img/jd-icon.png'),
    }
  }),
  computed: {
    awards () {
      if(this.award) {
        let teamPrize = {
          img: this.award.groupAwardName.split(';')[1],
          name: this.award.groupAwardName.split(';')[0]
        }
        let myPrize = {
          img: this.award.poolAwardName.split(';')[1],
          name: this.award.poolAwardName.split(';')[0]
        }
        return [teamPrize, myPrize]
      }
      return []
    }
  },
  methods: {
    hidePopup() {
      this.$emit('input', false)
    },
    moreGame() {
      window.location.href = '//wap.beeplaying.com/xmWap/#/'
    },
    gotoGame(item) {
      window.location.href = item.url
    },
    openPopup(status) {
      this.$emit('openPopup', status)
    },
    gotpay() {
      window.location.href = '//wap.beeplaying.com/xmWap/#/payment'
      GLOBALS.marchSetsPoint('A_H5PT0296003531')
    },
    joinTeam () {
      this.$emit('joinTeam')
    }
  },
  watch: {
    value (newValue) {
      if(newValue && [1].indexOf(this.popupStatus) == -1) {
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
      left: 50%;
      bottom: -.76rem;
      transform: translate(-50%, 0);
      width: .48rem;
      height: .48rem;
      background: url(../img/close.png) no-repeat center center;
      background-size: 100% 100%;
    }
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
    .bg1 {
      overflow: hidden;
      width: 5.27rem;
      height: 9.17rem;
      background: url(../img/popup1.png) no-repeat center top;
      background-size: 100% 100%;
    }
    .bg2 {
      overflow: hidden;
      width: 5.27rem;
      height: 7.48rem;
      background: url(../img/popup2.png) no-repeat center top;
      background-size: 100% 100%;
    }
    .rule {
      line-height: .32rem;
      .title {
        margin: 3.4rem auto .3rem;
        width: 1.93rem;
        height: .31rem;
      }
      .body {
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 0 .4rem;
        height: 4.7rem;
        line-height: .42rem;
        color: #1AC3FB;
        font-size: .24rem;
        .yellow {
          color: #FFF156;
        }
        .underline {
          text-decoration: underline;
        }
      }
    }
    .game-list {
      .title {
        margin: 3.44rem auto .3rem;
        width: 2.39rem;
        height: .31rem;
      }
      .body {
        padding: 0 .44rem 0 .6rem;
        .list {
          margin-bottom: .15rem;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .item {
            margin: 0 .16rem .15rem 0;
            width: 1.24rem;
            height: 1.6rem;
          }
        }
        .more {
          margin-bottom: .15rem;
          text-align: center;
          font-size: .3rem;
          font-weight: bold;
          color: #FEF84B;
        }
        .explain {
          text-align: center;
          font-size: .22rem;
          color: #1AC3FB;
        }
      }
    }
    .join-yes {
      overflow: hidden;
      .body {
        position: relative;
        overflow: hidden;
        margin: 2.93rem auto 0;
        width: 4.92rem;
        height: 4.37rem;
        background: url(../img/join-bg.png) no-repeat center center;
        background-size: 100% 100%;
        .join-btn {
          margin: .92rem auto .64rem;
          width: 3.86rem;
          height: 1.93rem;
        }
        .explain {
          margin: 0 auto;
          width: 2.6rem;
          white-space: nowrap;
          text-align: center;
          font-size: .22rem;
          color: #1AC3FB;
        }
        .hand {
          position: absolute;
          left: 3.47rem;
          top: 2.09rem;
          z-index: 1;
          width: .95rem;
          height: 1.16rem;
          animation: hand infinite 1s;
        }
      }
    }
    .join-no {
      .title {
        margin: 3.44rem auto .2rem;
        width: 3.76rem;
        height: .31rem;
      }
      .body {
        .explain {
          text-align: center;
          font-size: .26rem;
          color: #1AC3FB;
          span {
            text-decoration: underline;
            color: #FFCE09;
          }
        }
        .play-game {
          margin: 0 auto;
          width: 3.26rem;
          height: 1.33rem;
        }
        .pay {
          margin: 0 auto;
          width: 3.26rem;
          height: 1.33rem;
        }
      }
    }
    .join-red {
      .body {
        overflow: hidden;
        margin: 3rem auto 0;
        width: 4.04rem;
        height: 4.1rem;
        background: url(../img/linght.png) no-repeat center center;
        background-size: 100% 100%;
        .title {
          margin: .44rem auto .87rem;
          width: 2.86rem;
          height: .31rem;
        }
        .explain {
          text-align: center;
          font-size: .26rem;
          color: #1AC3FB;
        }
        .red-team {
          margin: 0 auto 1rem;
          left: 1rem;
          top: .98rem;
          width: 2.67rem;
          height: .74rem;
        }
      }
    }
    .join-blue {
     .body {
        overflow: hidden;
        margin: 3rem auto 0;
        width: 4.04rem;
        height: 4.1rem;
        background: url(../img/linght.png) no-repeat center center;
        background-size: 100% 100%;
        .title {
          margin: .44rem auto .87rem;
          width: 2.86rem;
          height: .31rem;
        }
        .explain {
          text-align: center;
          font-size: .26rem;
          color: #1AC3FB;
        }
        .blue-team {
          margin: 0 auto 1rem;
          left: 1rem;
          top: .98rem;
          width: 2.67rem;
          height: .74rem;
        }
      }
    }
    .get-hot {
     .body {
       overflow: hidden;
        margin: 2.94rem auto 0;
        width: 4.04rem;
        height: 4.1rem;
        background: url(../img/linght.png) no-repeat center center;
        background-size: 100% 100%;
        .title {
          margin: .45rem auto .7rem;
          width: 2.39rem;
          height: .31rem;
        }
        .hot-num {
          margin: 0 auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .72rem;
          font-weight: 800;
          color: #FFE719;
          img {
            margin-right: .1rem;
            width: .69rem;
            height: .79rem;
          }
        }
      }
    }
    .pk-success {
      .title {
        margin: 3.44rem auto .2rem;
        width: 1.53rem;
        height: .31rem;
      }
     .body {
        .explain {
          text-align: center;
          font-size: .26rem;
          color: #1AC3FB;
          span {
            color: #FFD009;
          }
        }
        .award {
          margin: .33rem auto ;
          padding: 0 .5rem;
          display: flex;
          justify-content: space-between;
          .item {
            img {
              width: 1.87rem;
              height: 1.09rem;
            }
            p {
              text-align: center;
              font-size: .26rem;
              color: #fff;
            }
          }
        }
      }
    }
    .pk-error {
      .title {
        margin: 3.44rem auto .2rem;
        width: 1.53rem;
        height: .31rem;
      }
     .body {
        .explain {
          text-align: center;
          font-size: .26rem;
          color: #1AC3FB;
        }
        .award {
          margin: .33rem auto ;
          padding: 0 .5rem;
          display: flex;
          justify-content: center;
          
        }
      }
    }
    .award-count {
      .title {
        margin: 3.44rem auto .2rem;
        width: 2.41rem;
        height: .31rem;
      }
     .body {
        .explain1 {
          margin: 1rem 0;
          text-align: center;
          font-size: .26rem;
          color: #1AC3FB;
          line-height: .5rem;
        }
        .explain {
          text-align: center;
          font-size: .22rem;
          color: #1AC3FB;
        }
      }
    }
    .strategy {
      .title {
        margin: 3.44rem auto .2rem;
        width: 2.92rem;
        height: .31rem;
      }
     .body {
        padding: .26rem .5rem 0;
        .item {
          margin-bottom: .3rem;
          display: flex;
          justify-content: flex-start;
          font-size: .26rem;
          color: #1AC3FB;
          line-height: .42rem;
          img {
            margin-right: .15rem;
            width: .34rem;
            height: .41rem;
          }
        }
        .bottom {
          font-size: .22rem;
          color: #1AC3FB;
          text-align: center;
        }
      }
    }
    .gain-hot {
      .body {
        margin: 3.7rem auto .2rem;
        .play-game {
          margin: 0 auto;
          width: 3.26rem;
          height: 1.33rem;
        }
        .pay {
          margin: 0 auto;
          width: 3.26rem;
          height: 1.33rem;
        }
      }
    }
  }
}
@keyframes hand {
  0% {
    left: 3.47rem;
    top: 2.09rem;
  }
  50% {
    left: 3.27rem;
    top: 1.89rem;
  }
  100% {
    left: 3.47rem;
    top: 2.09rem;
  }
}
</style>