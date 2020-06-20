<template>
  <transition name="scalc">
    <article class="pop-up-wrapper">
      <section class="mask"></section>
      <section class="content-wrapper" :class="`type-${type}`">
        <section class="content">
          <div class="title">
            {{title}}
          </div>
          <div class="container">
            <template v-if="type===1">
              <p class="rule-text">
                <span>活动时间: {{info.beginDate}} 至 {{info.endDate}}</span><br />
                1、活动期间，玩家可以使用一定数量的糖豆来进行左右手押宝；<br />
                如果押中，则当前押宝糖豆数量翻倍；<br />
                如果押错，则当前押宝糖豆数量减半；<br />
                中途退出押宝，则可直接获得当前糖豆奖励。<br />
                2、每次押宝都有8次翻倍机会，全部猜中最多可以将押宝糖豆数量翻256倍。翻倍过程中当糖豆数量小于初始翻倍数量时，游戏退出；当8次翻倍机会用尽时，游戏退出。<br />
                3、本次活动分为初级、中级、高级场，级别越高，翻倍获得糖豆越多。<br />
                4、糖豆可以通过通过游戏充值获得。<br />
                5、活动期间内，玩家在指定游戏中消耗金叶子数量达到一定值即可领取活动糖豆。<br />
                <span>（金叶消耗计入活动的游戏包括：欢乐竞技台球，街机欢乐捕鱼，糖果萌消消，三国大作战，欢乐的小鸟，深海探一探，王者弹珠，众神风云，福满多，斗西游，飞机大作战）</span><br />
                6、活动期间所获得的糖豆可在“欢乐兑换专区”兑换丰厚奖励。<br />
                7、活动设有糖豆排行榜（根据游戏消耗、游戏充值和每日任务所得糖豆排行）有奖排行榜仅限前30名玩家进榜，排行榜单会展示一天，榜首玩家可获得35000元大奖。<br />
                8、排行榜糖豆数量一致时，先到达的排名靠前。<br />
                如有其他问题，请联系在线客服进行咨询。<br />
                注意：<br />
                活动结束后，未使用的糖豆将清零，请及时兑换奖励。
              </p>
            </template>
            <template v-if="type===2">
              <ul>
                <li>
                  <div>时间</div>
                  <div>奖励来源</div>
                  <div>奖励</div>
                </li>
                <li v-for="(item,index) in awardList" :key="index">
                  <div>{{item.createTime}}</div>
                  <div>{{item.source}}</div>
                  <div>{{item.awardsName}}</div>
                </li>
              </ul>
              <p v-if="!awardList||!awardList.length">这里空空如也</p>
            </template>
            <template v-if="type===3">
              <p class="rule-desc">（根据游戏金叶消耗、游戏充值和每日任务所得糖豆排行）</p>
              <p>活动结束时间: {{info.endDate}}</p>
              <ul class="rank-list">
                <li>
                  <div>名次</div>
                  <div>用户id</div>
                  <div>累计糖豆+时间</div>
                  <div>奖励</div>
                </li>
                <li v-for="(item,index) in rankList" :key="index">
                  <div><span :class="`rank-${item.rank}`">{{item.rank}}</span></div>
                  <div>{{item.nickname|| '暂无昵称'}}</div>
                  <div>
                    {{item.totalNum}}<br />
                    {{item.updateTime}}
                  </div>
                  <div>{{item.awardsName.split('+')[0]}}<br />+{{item.awardsName.split('+')[1]}}
                  </div>
                </li>
              </ul>
              <ul class="my-rank-info">
                <li>
                  <div>我的排名</div>
                  <div>累计糖豆</div>
                  <div>奖励</div>
                </li>
                <li>
                  <div>{{rankInfo.myRank?rankInfo.myRank:'30+'}}</div>
                  <div>{{rankInfo.totalNum}}</div>
                  <div>
                    <template v-if="rankInfo.currentAwards&&rankInfo.currentAwards.includes('+')">
                      {{rankInfo.currentAwards.split('+')[0]}}<br />+{{rankInfo.currentAwards.split('+')[1]}}
                    </template>
                    <template v-else>
                      {{rankInfo.currentAwards}}
                    </template>
                  </div>
                </li>
              </ul>
            </template>
            <template v-if="type===4||type===5||type===6||type===7">
              <p class="message">
                <template v-if="type===4">
                  确定立即退出吗？<br />
                  退出将不会在此基础上翻倍哦
                </template>
                <template v-if="type===5">
                  很遗憾，本次翻倍失败
                </template>
                <template v-if="type===6">
                  当前糖豆不足{{curStageInfo.consumeNum}}个<br />
                  无法进行翻倍
                </template>
                <template v-if="type===7">
                  很遗憾，当前可兑换糖豆不足<br />
                </template>
              </p>
              <div class="status-img">
                <img src="../img/error-icon.png" alt="">
              </div>
              <p class="desc">
                <template v-if="type===4">
                  当前奖励{{curStageInfo.betNum}}个糖豆
                </template>
                <template v-if="type===5">
                  当前奖励{{awardInfo.betNum}}个糖豆
                </template>
                <template v-if="type===6">
                  快去游戏中消耗金叶获取糖豆吧
                </template>
              </p>
            </template>
            <template v-else-if="type===8">
              <div class="gamelist">
                <img :src="require(`../img/games/${index}.png`)" alt=""
                  v-for="(item,index) in games" class="game" @click="gotogame(item)">
              </div>
            </template>
            <template v-if="type===9||type===10||type===11">
              <div class="light-img">
                <img src="../img/light-bg.png" alt="">
              </div>
              <p class="message">
                <template v-if="type===9">
                  恭喜您，奖励翻倍成功！！！
                </template>
                <template v-if="type===10">
                  {{awardInfo.name}}
                </template>
                <template v-if="type===11">
                  领取{{awardInfo.name}}
                </template>
              </p>
              <div class="status-img">
                <template v-if="type===9">
                  <img src="../img/success-icon.png" alt="">
                </template>
                <template v-if="type===10 || type===11">
                  <img v-if="awardInfo.desc==='tg'" :class="awardInfo.desc" :src="awardInfo.img"
                    alt="">
                  <img v-else :class="awardInfo.desc" :src="awardInfo.img|filter" alt="">
                </template>
              </div>
              <p class="desc">
                <template v-if="type===9">
                  当前奖励{{awardInfo.betNum||0}}个糖豆
                </template>
                <template v-if="type===10">
                  确认使用{{awardInfo.cost}}个糖豆兑换吗？
                </template>
              </p>
            </template>
          </div>
          <div class="btn" v-if="btnText" @click="handleClick">{{btnText}}</div>
        </section>
        <div class="close-icon" v-if="info.state===1" :class="btnText?'':'no-btn'"
          @click="closePop"></div>
      </section>
    </article>
  </transition>
</template>

<script>
/* eslint-disable no-undef */
import { userAwards, rankList, myRank } from '../services/api'
import _get from 'lodash.get'
export default {
  name: '',
  components: {

  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    info: {
      type: Object,
      default: () => ({})
    },
    curStageInfo: {
      type: Object,
      default: () => ({})
    },
    awardInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      type: this.value,
      awardList: [],
      rankInfo: [],
      rankList: [],
      games: [{
        id: 12,
        url: '/crush'
      }, {
        id: 2, url: '/billiards'
      }, {
        id: 10, url: '/fish'
      }, {
        id: 13, url: '/kingdom2'
      }, {
        id: 18, url: '/square'
      }, {
        id: 21, url: '/Marbles'
      }]
    }
  },
  computed: {
    title () {
      switch (this.type) {
        case 1:
          return '活动规则'
        case 2:
          return '我的奖励'
        case 3:
          return '排行榜'
        case 4:
          return '请留步'
        case 5:
        case 6:
        case 7:
          return '很遗憾'
        case 8:
          return '热门游戏推荐'
        case 9:
        case 11:
        case 13:
          return '恭喜您'
        case 10:
          return '确认兑换'

        default:
          return ''
      }
    },
    btnText () {
      switch (this.type) {
        case 4:
          return '退出并领取'
        case 5:
        case 7:
        case 9:
          return '知道了'
        case 6:
          return '立即去玩'
        case 8:
          return '返回大厅'
        case 10:
          return '立即兑换'
        case 11:
        case 13:
          return '收下了'

        default:
          return ''
      }
    }
  },
  methods: {
    async _userAwards () {
      const res = await userAwards()
      this.awardList = _get(res, 'data', [])
    },
    async _rankList () {
      const res = await rankList()
      this.rankInfo = _get(res, 'data', {})
      this.rankList = _get(res, 'data.rankList', [])
    },
    async _myRank () {
      const { code, data } = await myRank()
      if (code === 200 && data.popup) {
        let message = ""
        if (data.myRank >= 1 && data.myRank <= 30) {
          message = '奖励已发放请注意查收'
        } else {
          message = '您未上榜，下次继续加油哦'
        }
        this.$toast.show({
          message: message,
          duration: 3000,
          isOneLine: true
        })
      }
    },
    handleClick () {
      this.$emit('callback', this.type)
      this.closePop()
    },
    gotogame ({ url, id }) {
      GLOBALS.marchSetsPoint('A_H5PT0301003606', {
        target_project_id: id
      }) // H5平台-疯狂翻倍活动-热门游戏推荐弹窗-游戏点击
      GLOBALS.jumpOutsideGame(url)
    },
    closePop () {
      if (this.info.state === 1) {
        this.type = 0
      } else {
        this.type = 3
      }
    }
  },
  watch: {
    value (val) {
      this.type = val
      if (this.type === 2) {
        this._userAwards()
      } else if (this.type === 3) {
        this._rankList()
        this.info.state !== 1 && this._myRank()
      }
    },
    type (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.pop-up-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 9;
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .content-wrapper {
    width: 6.46rem;
    position: relative;
    margin: 0 auto;
    z-index: 1;
    box-sizing: border-box;
    font-size: 0.24rem;
    text-align: center;
    .content {
      margin-top: 1rem;
      width: 6.46rem;
      height: 7.24rem;
      background-image: url(../img/pop-up-bg.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      box-sizing: border-box;
      padding-top: 0.82rem;
      position: relative;
      .title {
        color: #003e5c;
        font-size: 0.36rem;
        font-weight: bold;
        height: 0.88rem;
        line-height: 0.88rem;
      }
      .container {
        width: 4.7rem;
        height: 4.54rem;
        margin: 0.3rem auto 0.4rem;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        font-size: 0.24rem;
        font-weight: 500;
        color: #b2fff8;
      }
      .btn {
        width: 3.44rem;
        height: 1.14rem;
        background: url(../img/yellow-btn-bg.png) no-repeat;
        background-size: 100% 100%;
        font-size: 0.34rem;
        font-weight: bold;
        color: #003e5c;
        line-height: 1.18rem;
        position: absolute;
        bottom: -0.26rem;
        left: 50%;
        margin-left: -1.72rem;
      }
    }
    &.type-1 {
      .rule-text {
        text-align: left;
        span {
          color: #ffdc4e;
          font-weight: 800;
        }
      }
    }
    &.type-2 {
      font-weight: 800;
      ul {
        li {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          line-height: 0.5rem;

          div:nth-child(1) {
            flex: 25%;
            line-height: 0.3rem;
          }
          div:nth-child(2) {
            flex: 35%;
          }
          div:nth-child(3) {
            flex: 40%;
          }
          &:first-child {
            font-size: 0.28rem;
          }
        }
      }
      p {
        color: #ffdc4e;
        line-height: 3.8rem;
        font-size: 0.36rem;
      }
    }
    &.type-3 {
      .content {
        width: 6.46rem;
        height: 7.84rem;
        background-image: url(../img/pop-up-bg-large.png);
        position: relative;
        .container {
          width: 6rem;
          height: 4.2rem;
          p {
            color: #ffdc4e;
            font-weight: 800;
            margin-bottom: 0.1rem;
            line-height: 0.3rem;
          }
          .rule-desc {
            margin-bottom: 0;
            font-weight: normal;
            font-size: 0.2rem;
          }
          ul.rank-list {
            li {
              display: flex;
              flex-wrap: nowrap;
              align-items: center;
              justify-content: space-between;
              div {
                text-align: center;
                margin: 0.1rem;
                &:nth-child(1) {
                  width: 0.5rem;
                  span {
                    display: inline-block;
                    width: 0.42rem;
                    height: 0.42rem;
                    border-radius: 50%;
                    line-height: 0.42rem;
                  }
                  .rank-1 {
                    background: #fe5a5f;
                    color: #003e5c;
                  }
                  .rank-2 {
                    background: #11deb5;
                    color: #003e5c;
                  }
                  .rank-3 {
                    background: #ffdc4e;
                    color: #003e5c;
                  }
                }
                &:nth-child(2) {
                  width: 0.9rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                &:nth-child(3) {
                  width: 1.6rem;
                }
                &:nth-child(4) {
                  flex: 1;
                }
              }
            }
          }
          .my-rank-info {
            position: absolute;
            bottom: 0.44rem;
            left: 0.21rem;
            width: 6rem;
            background: #2ee6ff;
            color: #003e5c;
            padding: 0.14rem 0;
            border-radius: 0 0 0.1rem 0.1rem;
            li {
              display: flex;
              align-items: center;
              justify-content: space-around;
              line-height: 0.3rem;
              div {
                flex: 1;
              }
              &:first-child {
                font-weight: 800;
              }
            }
          }
        }
      }
    }
    &.type-4,
    &.type-5,
    &.type-6,
    &.type-7,
    &.type-9,
    &.type-10,
    &.type-11 {
      .light-img {
        width: 5.66rem;
        height: 5.76rem;
        position: absolute;
        top: 60%;
        left: 50%;
        margin-left: -2.83rem;
        margin-top: -2.88rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .message {
        position: relative;
        font-size: 0.36rem;
        height: 1rem;
      }
      .status-img {
        position: relative;
        width: 2.92rem;
        height: 1.86rem;
        margin: 0.4rem auto 0.26rem;
        font-size: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .desc {
        position: relative;
        font-size: 0.28rem;
      }
    }
    &.type-8 {
      .gamelist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .game {
          margin: 0.1rem auto 0.3rem;
          width: 1.24rem;
          height: 1.69rem;
        }
      }
    }
    &.type-9 {
      .status-img {
        img {
          width: 2.16rem;
          height: 1.54rem;
        }
      }
    }
    &.type-10,
    &.type-11 {
      .status-img {
        img {
          &.hfq,
          &.jdk {
            width: 2.56rem;
            height: 1.48rem;
          }
          &.jyz {
            width: 1.8rem;
            height: 1.38rem;
          }
          &.sw {
            width: auto;
            height: auto;
            max-width: 2.56rem;
            max-height: 1.8rem;
          }
          &.tg {
            width: 1.6rem;
            height: 1.56rem;
          }
        }
      }
    }
  }
  .close-icon {
    width: 0.6rem;
    height: 0.6rem;
    background: url('../img/close-icon.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0.84rem auto;
    &.no-btn {
      margin-top: 0.26rem;
    }
  }
}
.scalc-enter-active {
  animation: fadeAnimation 0.3s ease-in-out;
}
@keyframes fadeAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
