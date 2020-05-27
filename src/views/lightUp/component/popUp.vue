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
            <template v-if="type===0">
              <div class="locked">
                <img src="../img/locked.png" alt=""><br />
                <p>待解锁</p>
                <p>完成上一层后才能解锁哦</p>
              </div>
            </template>
            <template v-if="type===1">
              <p class="text">
                活动时间：{{info.beginDate}}-{{info.endDate}}<br />
                活动介绍：<br />
                1、活动期间，玩家通过在游戏中消耗指定额度的金叶子来点亮灯盏，获得奖励。<br />
                2、活动共设置4层关卡，玩家需按照顺序进行调整，如果通关全部4层，玩家会返回第一层循环挑战。<br />
                3、活动结束后按照点亮的灯盏排名，前100名获得奖励<span class="red-text">（至少完成4层关卡的人才可上榜）</span><br />
                4、 排行榜内若点亮灯盏数量一致则先完成的玩家排名靠前。<br />
                5、获得的所有奖励请及时领取，逾期将视为放弃奖励。<br />
                6、排行榜在活动结束后会展示一天。
              </p>
            </template>
            <template v-if="type===2">
              <template v-if="awardList&&awardList.length">
                <ul class="award-list">
                  <li class="list-head">
                    <div>时间</div>
                    <div>来源</div>
                    <div>奖励</div>
                  </li>
                  <li v-for="(item,index) in awardList" :key="index">
                    <div>{{item.createDate}}</div>
                    <div>{{item.level|levelFilter}}</div>
                    <div>{{item.awardsName}}</div>
                  </li>
                </ul>
              </template>
              <template v-else>
                <div class="empty">
                  <img src="../img/empty.png" alt=""><br />
                  <p>这里空空如也<br />您还有没有奖励</p>
                </div>
              </template>
            </template>
            <template v-if="type===3 || type===4 || type===5">
              <p v-if="type===3">
                去游戏中消耗达到{{awardInfo.amount|conversion}}金叶即可完成点亮
              </p>
              <p class="red-text">
                <template v-if="type===3">
                  可获得
                </template>
                <template v-if="type===4">
                  {{awardInfo.finishNum===awardInfo.totalNum?`成功点亮${awardInfo.totalNum}盏灯`:''}}
                </template>
                <template v-if="type===5">
                  <template v-if="awardInfo.myRank">
                    当前排名第{{awardInfo.myRank}}名<br>
                  </template>
                  <template v-else>
                    已点亮{{awardInfo.thisFinishNum}}盏灯<br>
                  </template>
                  获得
                </template>
              </p>
              <div>
                <img src="../img/hfq-icon.png" alt=""><br />
                <span>{{awardInfo.awardsName}}</span>
              </div>
              <template v-if="type===3">
                <div class="btn" @click="closePop(true)">
                  立即完成
                </div>
              </template>
              <template v-else>
                <div class="btn" @click="closePop()">
                  立即收下
                </div>
              </template>
              <p class="desc">
                <template v-if="type===3">
                  （除套圈，枪火英雄，麻将，斗地主）
                </template>
                <template v-else>
                  继续和猩猩一起愉快点灯吧~
                </template>
              </p>
            </template>
            <template v-if="type===6">
              <img src="../img/sad-icon.png" alt="">
              <p>
                你未上榜<br />
                下次继续加油
              </p>
              <div class="btn" @click="closePop()">
                我知道了
              </div>
            </template>
            <template v-else-if="type===7">
              <div class="gamelist">
                <img :src="require(`../img/games/${index}.png`)" alt=""
                  v-for="(item,index) in games" class="game" @click="gotogame(item)">
              </div>
              <div class="gogames" @click="gotoindex">去玩更多游戏>></div>
            </template>
          </div>
        </section>
        <div class="close-icon" @click="closePop()"></div>
      </section>
    </article>
  </transition>
</template>

<script>
import { userAwards } from '../services/api'
import _get from 'lodash.get'
export default {
  name: 'popUp',
  components: {

  },
  data () {
    return {
      type: this.value,
      awardList: [],
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
      }],
    }
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
    awardInfo: {
      type: Object,
      default: () => ({})
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
          return '点灯任务'
        case 4:
          return this.awardInfo.finishNum === this.awardInfo.totalNum ? '恭喜您' : '恭喜获得'
        case 5:
          return '恭喜您'
        case 6:
          return '排行榜已放榜'
        case 7:
          return '大家都在玩'
        default:
          return ''
      }
    }
  },
  filters: {
    levelFilter (val) {
      switch (val) {
        case 1:
          return '第一层'
        case 2:
          return '第二层'
        case 3:
          return '第三层'
        case 4:
          return '第四层'

      }
    },
    conversion (value) {
      if (value >= 10000) {
        return `${Math.floor(value / 100) / 100}万`
      } else {
        return value
      }
    }
  },
  mounted () {
  },
  methods: {
    closePop (isSure) {
      switch (this.type) {
        case 0:
        case 4:
        case 5:
          isSure = true
          break

        default:
          break
      }
      this.$emit('close', isSure)
    },
    gotogame ({ url, id }) {
      GLOBALS.jumpOutsideGame(url)
    },
    gotoindex () {
      window.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
    },
    async _userAwards () {
      const res = await userAwards()
      this.awardList = _get(res, 'data', [])
    }
  },
  watch: {
    value (val) {
      this.type = val
      if (this.type === 2) {
        this._userAwards()
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
    width: 5.34rem;
    position: relative;
    margin: 0 auto;
    z-index: 1;
    box-sizing: border-box;
    font-size: 0.24rem;
    .content {
      margin-top: 1.4rem;
      border-radius: 0.16rem;
      height: 5.96rem;
      background: #4353c8;
      .title {
        height: 0.88rem;
        font-size: 0.36rem;
        line-height: 0.88rem;
        color: #fff;
        text-align: center;
        background: #0d2e90;
        border-radius: 0.16rem 0.16rem 0 0;
        font-weight: bold;
        position: relative;
        img {
          height: 0.3rem;
          &.back {
            width: 0.56rem;
            height: 0.56rem;
            position: absolute;
            left: 0.2rem;
            top: 0.16rem;
          }
        }
      }
      .container {
        height: calc(~'100%' - 0.9rem);
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 0 0.34rem;
        color: #fff;
        .click-span {
          text-decoration: underline;
          color: #0d7cd2;
        }
        .btn {
          margin: 0.1rem auto 0;
          color: #a04f33;
          font-size: 0.3rem;
          font-weight: 400;
          text-align: center;
          width: 2.76rem;
          height: 0.66rem;
          line-height: 0.66rem;
          background: #ffc834;
          border-radius: 0.34rem;
        }
      }
    }
    .red-text {
      font-weight: bold;
      color: #ffad77;
    }
    &.type-0 {
      .content {
        background: none;
        height: auto;
        margin-top: 2.4rem;
        .title {
          background: none;
        }
        .locked {
          img {
            width: 1.38rem;
            height: 1.78rem;
            margin-bottom: 0.2rem;
          }
          text-align: center;
          font-size: 0.3rem;
          font-weight: bold;
          color: #b6bfff;
          line-height: 0.5rem;
        }
      }
    }
    &.type-1 {
      .text {
        margin: 0.18rem auto;
      }
    }
    &.type-2 {
      .content .container {
        .empty {
          text-align: center;
          color: #0d2e90;
          font-size: 0.3rem;
          line-height: 0.24rem;
          img {
            width: 1.26rem;
            height: 1.26rem;
            margin: 1rem auto 0.22rem;
          }
        }
      }
      .award-list {
        margin: 0.28rem auto;
        border-radius: 0.1rem;
        background: #fff;
        li {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 0.36rem;
          line-height: 0.36rem;
          font-size: 0.22rem;
          color: #666;
          div:nth-child(1) {
            min-width: 1.62rem;
          }
          div:nth-child(2) {
            min-width: 1.26rem;
          }
          div:nth-child(3) {
            min-width: 1.88rem;
          }
          &:nth-child(2n-1) {
            background: #d3e6ff;
          }
          &.list-head {
            color: #fff;
            background: #0d2e90;
            border-bottom: 0.03rem solid #000;
            padding: 0.02rem 0;
            border-radius: 0.1rem 0.1rem 0 0;
            div:nth-child(2) {
              border-left: #fff solid 0.02rem;
              border-right: #fff solid 0.02rem;
            }
          }
        }
      }
    }
    &.type-3,
    &.type-4,
    &.type-5 {
      font-size: 0.24rem;
      color: #fff;
      text-align: center;
      .container {
        margin-top: 0.26rem;
        .red-text {
          font-size: 0.3rem;
          min-height: 0.6rem;
          line-height: 0.6rem;
        }
        img {
          width: 2.56rem;
          height: 1.48rem;
        }
        .btn {
          margin-top: 0.34rem;
          margin-bottom: 0.34rem;
        }
        .desc {
          font-size: 0.18rem;
          color: #09226c;
        }
      }
    }
    &.type-5 {
      .container {
        .red-text {
          line-height: 0.5rem;
        }
      }
    }
    &.type-6 {
      text-align: center;
      img {
        width: 1.5rem;
        height: 1.6rem;
        margin-top: 0.7rem;
      }
      p {
        color: #649fef;
        font-size: 0.3rem;
        font-weight: bold;
        line-height: 0.4rem;
        margin-bottom: 0.4rem;
      }
    }
    &.type-7 {
      .gamelist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .game {
          margin-top: 0.4rem;
          width: 1.24rem;
          height: 1.69rem;
        }
      }
      .gogames {
        margin-top: 0.24rem;
        font-size: 0.3rem;
        color: #ffe1bd;
        font-weight: bold;
        text-align: center;
        padding-bottom: 0.1rem;
      }
    }
  }
  .close-icon {
    width: 0.6rem;
    height: 0.6rem;
    background: url('../img/close.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0.4rem auto;
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
