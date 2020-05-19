<template>
   <div class="popup" v-if="value">
    <div class="mask"></div>
    <div class="center">
      <div class="title">{{title}}</div>
      <div class="wrap" :class="{scratch: popupStatus == 3}">
        <!-- 攻略 + 奖励 -->
        <div class="bet-award" v-if="popupStatus == 1">
          <div class="nav">
            <div class="item" :class="{active: currentIndex == 1}" @click="handleClick(1)">攻略</div>
            <div class="item" :class="{active: currentIndex == 2}" @click="handleClick(2)">奖励</div>
          </div>
          <!-- strategy -->
          <div class="strategy" v-if="currentIndex == 1">
            <div class="item">
              <div class="key">步骤一</div>
              <div class="value">
                <div class="t">获得游戏币:</div>
                <div class="c">
                   活动期间在指定游戏中消耗金叶子，购买充值礼包，完成每日任务可以获得游戏币
                </div>
              </div>
            </div>
            <div class="item">
              <div class="key">步骤二</div>
              <div class="value">
                <div class="t">奖励获取：</div>
                <div class="c">
                  玩家可以使用一定数量游戏币刮不同种类的刮刮卡，刮刮卡可以100%刮出奖励。刮刮卡等级越高，刮出的奖励越好 
                  <p><a @click="handleClick(2)">查看奖励</a></p>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="key">步骤三</div>
              <div class="value">
                <div class="t">上榜赢大奖：</div>
                <div class="c">
                  玩家每天获得的瓜分券数量会计入排行榜，最高可得价值35000元大奖
                </div>
              </div>
            </div>
          </div>
          <!-- award -->
          <div class="award" v-if="currentIndex == 2">
            <div class="item" v-for="(item, index) in betAwards" :key="index">
              <div class="item-title">{{awardTitle(item.stage)}}（每次刮奖必中下列奖励之一）</div>
              <div class="level-item" v-for="(levelItem, levelIndex) in item.levelList" :key="levelIndex">
                <div class="key">{{levelName(levelItem.level)}}</div>
                <div class="award-item">
                  <div class="value" 
                    v-for="(awardItem, awardIndex) in levelItem.awardList" 
                    :key="awardIndex"
                  >
                    {{awardItem.awardsName}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 中奖纪录 -->
        <div class="award-log" v-if="this.popupStatus == 2 && this.log.length">
          <div class="nav">
            <div class="item">摇奖时间</div>
            <div class="item">刮刮乐类型</div>
            <div class="item">摇得奖励</div>
          </div>
          <div class="log">
            <div class="items" v-for="(item, index) in log" :key="index">
              <div class="item">{{item.createTime}}</div>
              <div class="item">{{item.awardsName}}</div>
              <div class="item">{{awardTitle(item.stage)}}</div>
            </div>
          </div>
        </div>
        <div class="log-empty" v-if="this.popupStatus == 2 && !this.log.length">
          <img class="inner-img" src="../img/empty.png" alt="">
        </div>
        <!-- 刮奖 -->
        <div class="scratch" v-if="this.popupStatus == 3">
          <div class="tips" v-if="showTips">
            <p>亲爱的玩家</p>
            <p>您确定消耗50个游戏币来 </p>
            <p>刮取10个奖励么</p>
            <div class="btns">
              <div class="confirm" @click="hideTips">确定</div>
              <div class="cancel" @click="hide">取消</div>
            </div>
          </div>
          <vue-scratch-card 
            :element-id="'scratchCard'" 
            :ratio=".3"
            :move-radius="50"
            :cover-img="coverImg" 
            :start-callback="getAward"
          >
            <div class="card-center" slot="result">
              <div class="box" v-for="(item, index) in boxArr" :key="index">
                <div class="name">{{item.name}}</div>
                <div class="img">
                  <img class="inner-img" :src="item.img" alt="">
                </div>
                <div class="times">{{item.times}}个</div>
              </div>
              <div class="open" @click="openAward">开启</div>
            </div>
        </vue-scratch-card>
        </div>
        <!-- 奖品列表 -->
        <div class="award-list" v-if="this.popupStatus == 4">
          <div class="items">
            <template v-for="(item, index) in awardList">
              <div class="item" :key="index">
                <div class="name">{{item.name}}</div>
                <div class="img">
                  <img v-if="item.awardsType == 'jdk'" class="inner-img" src="../img/award3.png" alt="">
                  <img v-if="item.awardsType == 'hfq'" class="inner-img" src="../img/award1.png" alt="">
                  <img v-if="item.awardsType == 'jyz'" class="inner-img" src="../img/award2.png" alt="">
                </div>
                <div class="times">{{item.awardsName}}</div>
              </div>
              <div class="line" :key="index" v-if="index % 3 == 2"></div>
            </template>
          </div>
          <div class="receive" @click="hide">收下</div>
        </div>
        <!-- 去玩游戏 -->
        <div class="play-game" v-if="this.popupStatus == 5">
          <div class="list">
            <div class="item" v-for="(item, index) in gameList" :key="index" @click="gotoGame(item)">
              <img class="inner-img" :src="item.img" alt="">
            </div>
          </div>
          <div class="more" @click="moreGame">查看更多游戏>></div>
        </div>
      </div>
      <div class="closed" v-if="showClose" @click="hide"></div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import ScratchCard from 'vue-scratch-card0'
Vue.use(ScratchCard)
export default {
  name: 'popup',
  props: ['value', 'title', 'popupStatus', 'guideInfo', 'betAwards', 'betIndex', 'log', 'scratch', 'awardList', 'boxArr'],
  data: () => ({
    currentIndex: 1,
    showTips: false,
    showClose: true,
    gameList: [
      {img: require('../img/0.png'), url: `//wap.beeplaying.com/crush/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '糖果萌消消乐'},
      {img: require('../img/3.png'), url: `//wap.beeplaying.com/fish/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '街机欢乐捕鱼'},
      {img: require('../img/2.png'), url: `//wap.beeplaying.com/billiards/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '欢乐竞技台球'},
      {img: require('../img/4.png'), url: `//wap.beeplaying.com/kingdom2/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '三国大作战'},
      {img: require('../img/1.png'), url: `//wap.beeplaying.com/square/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '众神风云'},
      {img: require('../img/5.png'), url: `//wap.beeplaying.com/Marbles/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '王者弹珠'},
    ],
  }),
  computed: {
    coverImg () {
      if(this.scratch.times == 10) {
        return require('../img/cover.png')
      }
      return require('../img/cover1.png')
    },
    showBox () {
      return this.boxArr.length
    }
  },
  methods: {
    awardTitle (stage) {
      switch (stage) {
        case 1:
          return '普通刮刮乐'
          break
        case 2: 
          return '中级刮刮乐'
          break
        case 3: 
          return '超级刮刮乐'
          break
      }
    },
    levelName (level) {
      switch (level) {
        case 1:
          return '特等奖'
          break
        case 2: 
          return '一等奖'
          break
        case 3: 
          return '二等奖'
          break
      }
    },
    handleClick (index) {
      this.currentIndex = index
    },
    getAward () {
      this.$emit('getAward')
      this.showClose = false
    },
    hide() {
      this.$emit('input', false)
      this.showClose = true
      this.currentIndex = 2
    },
    openAward () {
      this.$emit('openAward')
    },
    hideTips () {
      this.showTips = false
    },
    moreGame() {
      window.location.href = '//wap.beeplaying.com/xmWap/#/'
    },
    gotoGame(item) {
      window.location.href = item.url
    },
  },
  watch: {
    betIndex (value) {
      this.currentIndex = value
    },
    scratch (value) {
      if(value.times == 10) {
        this.showTips = true
      }else {
        this.showTips = false
      }
    }
  }
}
</script>
<style scoped lang="less">
*{
  box-sizing: border-box;
}
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.popup{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0,0,0,.7)
  }
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5.89rem;
    z-index: 2;
    background: #649FEF;
    border-radius: .2rem;
    border:3px solid #000;
    transform: translate(-50%, -50%);
    .title {
      overflow: hidden;
      height: .93rem;
      line-height: .93rem;
      text-align: center;
      font-size: .36rem;
      color: #fff;
      border-bottom:3px solid #000;
      background: #0150E1;
      border-radius: .1rem .1rem 0 0;
    }
    .wrap {
      margin-top:.32rem;
      padding: 0 .2rem;
      min-height: 4.6rem;
      color: #fff;
      line-height: .4rem;
      font-size: .24rem;
      border-radius: 0 0 .1rem .1rem;
      &.scratch{
        padding: .2rem;
        min-height: 3.3rem;
        margin-top: 0;
        background: #fff;
      }
      .bet-award {
        height: 6.85rem;
        .nav {
          margin-bottom: .2rem;
          display: flex;
          justify-content: center;
          .item {
            margin-right: .13rem;
            width: 2.05rem;
            height: .62rem;
            line-height: .62rem;
            text-align: center;
            color: #710C0C;
            font-size: .3rem;
            background: #FFD972;
            border-radius: .3rem;
            &.active {
              background: #fff;
              color: #0150E1;
            }
          }
        }
        .strategy {
          .item {
            margin-bottom: .2rem;
            display: flex;
            justify-content: flex-start;
            border-radius: .2rem;
            border: 3px solid #000;
            color: #fff;
            .key {
              padding: 0 .2rem;
              flex-shrink: 0;
              width: .7rem;
              font-size: .36rem;
              font-weight: bold;
              color: #0150E1;
              background: #fff;
              border-radius: .1rem 0 0 .1rem;
              display: flex;
              align-items: center;
            }
            .value {
              background: #0150E1;
              padding: .14rem .1rem .14rem .2rem;
              border-radius: 0 .1rem .1rem 0;
              .t {
                font-size: .24rem;
                font-weight: bold;
                line-height: .33rem;
              }
              .c {
                font-size: .2rem;
                line-height: .33rem;
                a {
                  color: #FFCB3E;
                  text-decoration: underline;
                }
              }
            }
          }
        }
        .award {
          overflow-x: hidden;
          overflow-y: scroll;
          height: 5.7rem;
          -webkit-overflow-scrolling: touch;
          .item {
            margin-bottom: .2rem;
            border: 3px solid #000;
            border-radius: .2rem;
            background: #fff;
            &:last-child {
              margin-bottom: 0;
            }
            &:nth-child(1) {
              .item-title {
                background: #F59037;
              }
            }
            &:nth-child(2) {
              .item-title {
                background: #EB4141;
              }
            }
            &:nth-child(3) {
              .item-title {
                background: #D1AB36;
              }
            }
            .item-title {
              padding-left: .3rem;
              height: .65rem;
              line-height: .55rem;
              color: #fff;
              border-radius: .1rem .1rem 0 0;
              
              border-bottom: 3px solid #000;
            }
            .level-item {
              display: flex;
              justify-content: center;
              border-bottom: 1px solid #D3E6FF;
              font-size: .22rem;
              color: #666666;
              &:last-child {
                border: none
              }
              .key {
                width: 50%;
                min-height: .5rem;
                border-right: 1px solid #D3E6FF;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .award-item {
                width: 50%;
                .value {
                  min-height: .5rem;
                  border-bottom: 1px solid #D3E6FF;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  &:last-child {
                    border: none
                  }
                }
              }
            }
          }
        }
      }
      .award-log {
        height: 4.22rem;
        border: 3px solid #000;
        border-radius: .1rem;
        .nav {
          display: flex;
          justify-content: flex-start;
          height: .42rem;
          border-bottom: 3px solid #000;
          border-radius: .05rem;
          background: #0150E1;
          .item {
            text-align: center;
            line-height: .35rem;
            font-size: .22rem;
            border-right: 1px solid #fff;
            color: #fff;
            &:nth-child(1) {
              width: 30%;
            }
            &:nth-child(2) {
              width: 35%;
            }
            &:nth-child(3) {
              width: 35%;
              border-right: none;
            }
          }
        }
        .log {
          overflow-x: hidden;
          overflow-y: scroll;
          height: 3.65rem;
          -webkit-overflow-scrolling: touch;
          .items {
            display: flex;
            justify-content: flex-start;
            background: #fff;
            white-space: nowrap;
            &:nth-child(odd) {
              background: #D3E6FF;
            }
            .item {
              text-align: center;
              line-height: .5rem;
              font-size: .22rem;
              color: #666666;
              &:nth-child(1) {
                width: 30%;
              }
              &:nth-child(2) {
                width: 35%;
              }
              &:nth-child(3) {
                width: 35%;
              }
            }
          }
        }
      }
      .log-empty {
        padding-top: 1.5rem;
        margin: 0 auto;
        width: 1.27rem;
      }
      .scratch {
        position: relative;
        .scratchCard {
          width: 100%;
        }
        .card-center {
          position: relative;
          color: #000;
          padding-top: .1rem;
          min-height: 2.9rem;
          border-radius: .1rem;
          border: 3px solid #000;
          display: flex;
          justify-content: space-around;
          background: #D3EAFF;
          .box {
            text-align: center;
            .name {
              color: #0150E1;
              font-size: .3rem;
              font-weight: bold;
            }
            .img {
              margin: .1rem 0;
              width: 1.31rem;
              height: 1.17rem;
            }
            .times {
              font-size: .24rem;
              color: #F42424;
            }
          }
          .open {
            position: absolute;
            z-index: 6;
            left: 50%;
            bottom: -.45rem;
            width: 2.83rem;
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            font-size: .36rem;
            color: #fff;
            background: #F42424;
            transform: translate(-50%, 0);
            border-radius: .4rem;
          }
        }
        .tips {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 3;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          font-size: .3rem;
          color: #fff;
          .btns {
            margin-top: .2rem;
            display: flex;
            justify-content: center;
            .confirm,.cancel {
              width: 1.88rem;
              height: .62rem;
              text-align: center;
              line-height: .62rem;
              font-size: .3rem;
              font-weight: bold;
              border-radius: .3rem;
            }
            .confirm {
              margin-right: .3rem;
              color: #fff;
              background: #F42424;
            }
            .cancel {
              background: #fff;
              color: #F42424;
            }
          }
        }
      }
      .award-list {
        position: relative;
        min-height: 4.6rem;
        padding-bottom: 1.2rem;
        .items {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .item {
            text-align: center;
            .name {
              font-weight: bold;
              font-size: .3rem;
              color: #0045C4;
            }
            .img {
              width: 1.64rem;
              height: .96rem;
            }
            .times {
              font-size: .2rem;
              color: #FFFFFF;
            }
          }
          .line {
            margin: .2rem 0;
            width: 100%;
            height: 1px;
            background: #4686FC;
          }
        }
        .receive {
          position: absolute;
          left: 50%;
          bottom: .2rem;
          margin-left: -1.42rem;
          width: 2.83rem;
          height: .8rem;
          background: #fff;
          line-height: .8rem;
          text-align: center;
          border-radius: .4rem;
          color: #F42424;
          font-size: .36rem;
        }
      }
      .play-game {
        height: 5.62rem;
        .list {
          margin-bottom: .15rem;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          .item {
            margin: 0 0 .3rem 0;
            width: 1.45rem;
            height: 1.99rem;
          }
        }
        .more {
          margin-top: .15rem;
          text-align: center;
          font-size: .36rem;
          color: #fff;
        }
      }
    }
  }
  .closed {
    position: absolute;
    left: 50%;
    bottom: -.93rem;
    z-index: 3;
    width: .6rem;
    height: .6rem;
    background: url(../img/close.png) no-repeat center center;
    background-size: 100% auto;
    transform: translate(-50%, 0);
  }
}
</style>