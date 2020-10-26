<template>
  <transition name="scalc">
    <article class="pop-up-wrapper" v-show="type">
      <section class="mask"></section>
      <section class="content-wrapper" :class="`type-${type}`" ref="group">
        <div class="content">
          <div class="title" v-if="title">
            {{title}}
          </div>
          <div class="container">
            <template v-if="type===1">
              <div class="img-wrapper">
                <img :src="require(`../img/gift/${awardsInfo[0].awardsType}.png`)" alt="">
              </div>
              <p class="name">{{awardsInfo[0].awardsDesc}}</p>
              <p class="desc">继续前进</p>
            </template>
            <template v-if="type===2">
              <ul class="gift-list">
                <li class="gift-item" v-for="(item,index) in awardsInfo" :key="`gift-${index}`">
                  <div class="img-wrapper">
                    <img :src="require(`../img/gift/${item.awardsType}.png`)" alt="">
                  </div>
                  <p class="name">{{item.awardsDesc}}</p>
                </li>
              </ul>
            </template>
            <template v-if="type===3">
              <div class="img-wrapper">
                <img src="../img/sad-icon.png" alt="">
              </div>
              <p class="name">什么也没有<br />再接再厉</p>
            </template>
            <template v-if="type===4">
              <div class="img-wrapper">
                <img :src="require(`../img/gift/${awardsInfo[0].awardsType}.png`)" alt="">
              </div>
              <p class="name">{{awardsInfo[0].awardsDesc}}</p>
            </template>
            <template v-if="type===5">
              <p class="sub-title">昨天排行{{awardsInfo[0].myRank}}名，获得</p>
              <div class="img-wrapper">
                <img :src="require(`../img/gift/${awardsInfo[0].awardsType}.png`)" alt="">
              </div>
              <p class="name">{{awardsInfo[0].awardsName}}</p>
              <p class="desc">收下继续打榜！</p>
            </template>
            <template v-if="type===6">
              <p class="desc" v-if="!awardList||!awardList.length" style="margin-top:2rem">这里空空如也
              </p>
              <div v-else>
                <ul>
                  <li class="table-title">
                    <div>时间</div>
                    <div>点数</div>
                    <div>事件</div>
                  </li>
                </ul>
                <ul class="table-content">
                  <li v-for="(item,index) in awardList" :key="index">
                    <div>{{item.createTime}}</div>
                    <div>{{item.num||'-'}}</div>
                    <div>{{item.eventName}}</div>
                  </li>
                </ul>
                <p class="desc">仅展示近50次投掷记录</p>
              </div>
            </template>
            <template v-if="type===7">
              <div class="gamelist">
                <img :src="require(`../img/games/${index}.png`)" alt=""
                  v-for="(item,index) in games" class="game" @click="gotogame(item)">
              </div>
              <div class="gogames" @click="gotoindex">更多游戏>></div>
            </template>
          </div>
        </div>
        <div class="close-icon" @click="closePop()"></div>
      </section>
    </article>
  </transition>
</template>

<script>
import { betRecord } from '../services/api'
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
      }]
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
    awardsInfo: {
      type: Array,
      default: () => ([])
    },
    currentStage: {
      type: Number,
      default: 0
    }

  },
  computed: {
    title () {
      switch (this.type) {
        case 1:
        case 2:
          return '恭喜获得'
        case 3:
          return '糟糕'
        case 4:
          return ''
        case 5:
          return '恭喜'
        case 6:
          return '历史记录'
        case 7:
          return '大家都在玩'
      }
    }
  },
  mounted () {
  },
  methods: {
    closePop () {
      this.type = 0
    },
    gotogame ({ url, id }) {
      GLOBALS.jumpOutsideGame(url)
    },
    gotoindex () {
      window.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
    },
    async getBetRecord () {
      const res = await betRecord(this.currentStage)
      const { code, data } = res
      if (code === 200) {
        this.awardList = data
      }
    }
  },
  watch: {
    value (val) {
      this.type = val
      if (val === 6) {
        this.getBetRecord()
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
    width: 5.78rem;
    position: fixed;
    margin: 0 auto;
    z-index: 1;
    box-sizing: border-box;
    font-size: 0.3rem;
    left: 50%;
    top: 50%;
    margin-top: -2.66rem;
    margin-left: -2.89rem;
    .content {
      border-radius: 0.2rem;
      height: 5.34rem;
      background: #feda89;
      text-align: center;
      .title {
        height: 0.9rem;
        font-size: 0.48rem;
        line-height: 0.84rem;
        color: #ffeec8;
        text-align: center;
        background: url(../img/pop-title-bg.png) #f27d27 no-repeat center center;
        background-size: 4.9rem 0.54rem;
        border-radius: 0.2rem 0.2rem 0 0;
        font-weight: bold;
        position: relative;
      }
      .container {
        height: calc(~'100%' - 0.9rem);
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding-top: 0.76rem;
        color: #d85c02;
        .sub-title {
          color: #d85c02;
          font-size: 0.3rem;
          font-weight: 500;
        }
        .name {
          margin-top: 0.3rem;
          font-size: 0.36rem;
          color: #d85c02;
          font-weight: bold;
        }
        .desc {
          margin-top: 0.4rem;
          font-size: 0.3rem;
          color: #9b6c05;
          font-weight: 400;
        }
        .img-wrapper {
          height: 1.5rem;
          img {
            max-height: 100%;
          }
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
    &.type-2 {
      height: 6rem;
      margin-top: -4.4rem;
      .content {
        height: 6rem;
        .container {
          padding-top: 0.12rem;
          .name {
            margin-top: 0.02rem;
            font-size: 0.36rem;
            color: #d85c02;
            font-weight: bold;
            flex: 1;
            text-align: center;
          }
          .desc {
            margin-top: 0.1rem;
            font-size: 0.22rem;
            color: #9b6c05;
            font-weight: 400;
          }
          .img-wrapper {
            height: 0.76rem;
          }
          .gift-list {
            height: calc(~'100% - 0.3rem');
            overflow-x: hidden;
            overflow-y: scroll;
            .gift-item {
              height: 1.1rem;
              box-sizing: border-box;
              background: #fff4da;
              display: flex;
              align-items: center;
              width: 4.8rem;
              margin: 0.12rem auto;
              border-radius: 0.1rem;
            }
          }
        }
      }
    }
    &.type-3 {
      .content {
        .container {
          padding-top: 0.68rem;
          .img-wrapper {
            height: 1.92rem;
          }
          .name {
            margin-top: 0.1rem;
            font-weight: 500;
          }
        }
      }
    }
    &.type-4 {
      height: 9.52rem;
      width: 7.2rem;
      margin-top: -5.76rem;
      margin-left: -3.6rem;
      .content {
        height: 9.52rem;
        background: url(../img/big-box-pop-bg.png) no-repeat -0.7rem center;
        background-size: auto 9.52rem;
        .container {
          padding-top: 4rem;
        }
      }
      .close-icon {
        margin-top: -0.2rem;
      }
    }
    &.type-5 {
      .content {
        .container {
          padding-top: 0.26rem;
          .sub-title {
            margin-bottom: 0.2rem;
          }
        }
      }
    }
    &.type-6 {
      height: 6.06rem;
      margin-top: -3.2rem;
      .content {
        height: 6.06rem;
        .container {
          padding: 0.32rem 0.18rem 0;
          ul {
            li {
              color: #666;
              font-size: 0.22rem;
              display: flex;
              flex-wrap: nowrap;
              align-items: center;
              justify-content: space-between;
              line-height: 0.5rem;
              text-align: center;
              background: #fefdfb;
              span {
                text-decoration: underline;
              }
              div:nth-child(1) {
                width: 1.7rem;
                line-height: 0.3rem;
              }
              div:nth-child(2) {
                width: 1.46rem;
              }
              div:nth-child(3) {
                flex: 1;
              }
              &:nth-child(2n) {
                background: #ffe6b3;
              }
              &.table-title {
                background: #bc5604;
                color: #fff;
                border-radius: 0.1rem 0.1rem 0 0;
                div:nth-child(2) {
                  border-left: 0.01rem solid #f5a361;
                  border-right: 0.01rem solid #f5a361;
                }
              }
            }
            &.table-content {
              height: 3.66rem;
              overflow-x: hidden;
              overflow-y: scroll;
            }
          }
          .desc {
            margin-top: 0.1rem;
          }
        }
      }
    }
    &.type-7 {
      .content {
        height: 5.74rem;
        .container {
          padding: 0 0.5rem;
          .gamelist {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .game {
              margin-top: 0.26rem;
              width: 1.24rem;
              height: 1.69rem;
            }
          }
          .gogames {
            margin-top: 0.24rem;
            font-size: 0.3rem;
            color: #bb6738;
            font-weight: bold;
            text-align: center;
            padding-bottom: 0.1rem;
          }
        }
      }
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
