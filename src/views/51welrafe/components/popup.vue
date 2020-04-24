

<template>
  <div class="popup" v-if="value">
    <div class="mask"></div>
    <div class="wrap">
      <!-- 活动规则 -->
      <template v-if="popupType == 1">
        <div class="rule bg1">
          <div class="title">
            <img src="../img/title9.png" alt="">
          </div>
          <div class="body">
            <h5>1、活动时间：5月1日- 5月5日 </h5>
            <h5>2、收集图章</h5> 
            通过消耗流水、充值、购买活动礼包可获得图章，在斗地主、麻将、跑得快、枪火英雄、套圈、天天飞机大战中消耗金叶不计入活动；
            <h5>3、图章兑换奖励</h5>
            奖励需一定数量的图章进行兑换，且兑换不限次数；
            <h5>4、 累计排行榜</h5>
            活动5天内，累计图章最多的玩家，前15名获得奖励；<br> 
            5、图章注意及时领取并兑换奖品，活动结束（5月5日24点后）图章自动作废清零，不予补偿。 <br> 
            6、如有问题，请联系在线客服。
          </div>
        </div>
      </template>
      <!-- 活动攻略 -->
      <template v-if="popupType == 2">
        <div class="strategy bg1">
          <div class="title">
            <img src="../img/title8.png" alt="">
          </div>
          <div class="body">
            <img src="../img/strategy.png" alt="">
          </div>
        </div>
      </template>
      <!-- 大家都在玩 -->
      <template v-if="popupType == 3">
        <div class="game-list bg1">
          <div class="title">
            <img src="../img/title1.png" alt="">
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
      <!-- 图章收集记录 -->
      <template v-if="popupType == 4">
        <div class="seal-log bg2">
          <div class="title">
            <img src="../img/title12.png" alt="">
          </div>
          <div class="body">
            <div class="total">
              累计获得图章：100个
            </div>
            <div class="seal-wrap">
              <div class="nav">
                <div class="time">日期</div>
                <div class="num">获得数</div>
              </div>
              <div class="list">
                <div class="item" v-for="(item, index) in sealLog" :key="index">
                  <div class="time"></div>
                  <div class="num"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- 图章兑换成功 -->
      <template v-if="popupType == 5">
        <div class="exchange-seal bg2">
          <div class="title">
            <img src="../img/title10.png" alt="">
          </div>
          <div class="body">
            <div class="award-img">
              <img src="../img/seal-award-img.png" alt="">
            </div>
            <div class="award-name">兑奖图章 x{{sealNum}}</div>
            <div class="explain">记得兑换奖品哟~</div>
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
  props: ['popupType', 'value', 'sealLog', 'sealNum'],
  data: () => ({
    gameList: [
      {img: require('../img/0.png'), url: `//wap.beeplaying.com/crush/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '糖果萌消消乐'},
      {img: require('../img/3.png'), url: `//wap.beeplaying.com/fish/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '街机欢乐捕鱼'},
      {img: require('../img/2.png'), url: `//wap.beeplaying.com/billiards/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '欢乐竞技台球'},
      {img: require('../img/4.png'), url: `//wap.beeplaying.com/kingdom2/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '三国大作战'},
      {img: require('../img/1.png'), url: `//wap.beeplaying.com/square/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '众神风云'},
      {img: require('../img/5.png'), url: `//wap.beeplaying.com/Marbles/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '王者弹珠'},
    ]
  }),
  computed: {
    currentTree() {
      return require(`../img/tree${this.treeInfo.currTreeGrade}.png`)
    },
    proveTree() {
      return require(`../img/tree${this.treeInfo.treeGrade}.png`)
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
    gotoPay(index) {
      let channel = localStorage.getItem('APP_CHANNEL')
      let originDeffer = `//wap.beeplaying.com/activities/tree.html?channel=${channel}&blindBox=true`
      localStorage.setItem('payment', JSON.stringify(this.cardList[index]))
      localStorage.setItem('originDeffer', originDeffer)
      switch(index) {
        case 0 :
          GLOBALS.marchSetsPoint('A_H5PT0244002828')
          break;
        case 1 :
          GLOBALS.marchSetsPoint('A_H5PT0244002829')
          break;
      }
      window.location.href="//wap.beeplaying.com/xmWap/#/payment/paymentlist"
    },
    openTask() {
      this.$emit('input', false)
      this.$emit('openTask')
    },
    tryAgen() {
      this.$emit('input', false)
      this.$emit('tryAgen')
    },
    checkLog() {
      this.$emit('input', false)
      this.$emit('refresh', false)
      this.$emit('checkLog')
    }
  },
  watch: {
    value (newValue) {
      if(newValue) {
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
      bottom: -.41rem;
      transform: translate(-50%, 0);
      width: .92rem;
      height: .92rem;
      background: url(../img/closed.png) no-repeat center center;
      background-size: 100% 100%;
    }
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
    .bg1 {
      overflow: hidden;
      background: url(../img/popupBg1.png) no-repeat center top;
      background-size: 100% 100%;
      width: 6.48rem;
      height: 10.23rem;
    }
    .bg2 {
      overflow: hidden;
      background: url(../img/popupBg2.png) no-repeat center top;
      background-size: 100% 100%;
      width: 6.48rem;
      height: 9.33rem;
    }
    .rule {
      .title {
        margin: 2.5rem auto .72rem;
        width: 1.61rem;
        height: .41rem;
      }
      .body {
        padding: 0 1rem;
        color: #EAD9FF;
        h5 {
          color: #fff;
        }
      }
    }
    .strategy {
      .title {
        margin: 2.5rem auto .48rem;
        width: 2.78rem;
        height: .5rem;
      }
      .body {
        margin: 0 auto;
        width: 4.32rem;
        height: 5.57rem;
      }
    }
    .game-list {
      .title {
        margin: 2.5rem auto .8rem;
        width: 1.89rem;
        height: .44rem;
      }
      .body {
        padding: 0 .86rem 0 .97rem;
        .list {
          margin-bottom: .15rem;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .item {
            margin: 0 .1rem .1rem 0;
            padding: .15rem .1rem;
            width: 1.45rem;
            height: 1.99rem;
            background: url(../img/game-list-bg.png) no-repeat center top;
            background-size: 100% 100%;
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
          font-size: .24rem;
          font-weight: bold;
          color: #D6BFFA;
        }
      }
    }
    .seal-log {
      .title {
        margin: 2.5rem auto .68rem;
        width: 2.26rem;
        height: .47rem;
      }
      .total {
        margin: 0 auto .2rem;
        width: 4.4rem;
        height: .55rem;
        line-height: .55rem;
        text-align: center;
        color: #FEF84B;
        background: url(../img/total-bg.png) no-repeat center top;
        background-size: 100% 100%;
      }
      .seal-wrap {
        margin: 0 auto;
        overflow: hidden;
        width: 4.4rem;
        height: 3.65rem;
        background:linear-gradient(0deg,rgba(93,34,188,1) 0%,rgba(93,36,184,1) 100%);
        border-radius: .4rem;
        .nav {
          margin: .3rem 0;
          .time, .num{
            width: 50%;
            height: .26rem;
            line-height: .26rem;
            border-right: 1px solid #AE85EF;
            text-align: center;
            color: #fff;
          }
          .num {
            border: none
          }
        }
        .list {
          overflow-x: hidden;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          .item {
            margin-bottom: .2rem;
            display: flex;
            justify-content: flex-start;
            .time, .num{
              width: 50%;
              text-align: center;
              color: #fff;
            }
          }
        }
      }
    }
    .exchange-seal {
      .title {
        margin: 2.5rem auto .85rem;
        width: 1.53rem;
        height: .42rem;
      }
      .body {
        .award-img {
          margin: 0 auto .4rem;
          padding: .38rem .47rem .3rem;
          width: 2.7rem;
          height: 2.5rem;
          background: url(../img/seal-award-bg.png) no-repeat center center;
          background-size: 100% 100%;
        }
        .award-name {
          text-align: center;
          margin-bottom: .7rem;
          font-size: .3rem;
          color: #FEF84B;
          font-weight: bold;
        }
        .explain {
          text-align: center;
          color: #D6BFFA;
        }
      }
    }
  }
}
</style>