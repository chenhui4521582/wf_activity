<template>
  <transition name="fade">
    <article class="get-dice" v-if="isShowGetDice">
      <header>获得骰子</header>
      <section class="get-dice-container" v-if="taskProgressInfoData">
        <template v-for="(itemtitle,indextitle) in titleArr">
          <h4 class="s-title">
            <span class="white-dot"></span>
            <span>{{itemtitle}} </span>
            <span class="next" v-if="indextitle==0">
              下一梯度解锁需支持金叶：<i>{{taskProgressInfoData.gameProgress.diffNextProgress| conversion}}</i>
            </span>
          </h4>
          <template v-if="indextitle==0">
            <span class="info">
              流水计入活动的游戏包括：欢乐竞技台球、街机欢乐捕鱼、糖果萌消消、三国大作战、欢乐的小鸟、深海探一探、王者弹珠、众神风云、福满多、斗西游、天使之战。
            </span>
            <div class="g-package">
              <div class="g-package-container g2">
                <hit-percent :gameBetting="taskProgressInfoData.gameProgress.gameBetting"
                  :hbItems="taskProgressInfoData.gameProgress.progressList" @refresh="refresh"
                  @show-pop="showPop"></hit-percent>
              </div>
              <div class="g-package-info">
                <ul class="li0">
                  <li>
                    <span>今日获得骰子数：{{taskProgressInfoData.gameProgress.receiveNum }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="g-package">
              <div class="g-package-container g1">
                <ul>
                  <li v-for="(item,index) in mallBizConfigs" :key="`package${index}`"
                    @click="gotopay(item)">
                    <img :src="item.icon|filter" alt="">
                    <div class="item-text">
                      {{item.content.split('+')[0]}}<br />
                      <span class="content">
                        <img src="./img/give-icon.png"
                          style="min-width:0.24rem;max-width:0.24rem;height:0.24rem;margin-bottom:0.04rem">
                        {{item.content.split('+')[1]}}
                      </span>
                    </div>
                    <a href="javascript:" class="btn-price">￥{{item.price}}</a>
                    <p class="limit-tag" v-if="item.dailyLimitPerUser===1">每日限购一次</p>
                  </li>
                </ul>
              </div>
              <div class="g-package-info">
                <ul class="li0">
                  <li>今日获得骰子数: {{taskProgressInfoData.buyProgress.returnNum }}</li>
                </ul>
              </div>
            </div>
          </template>
        </template>
      </section>
      <div class="back-btn" @click="closeGetDice()"></div>
    </article>
  </transition>
</template>
<script type="text/javascript">
import { userProgress, getMallProductListByType } from '../../services/api'

export default {
  data () {
    return {
      titleArr: ['玩游戏得随机号码(每日重置)', '超值礼包额外加赠'],
      mallBizConfigs: [],
      pUserInfo: {},
      taskProgressInfoData: null,
      popType: 0,
      awardData: null,
      isShowGetDice: false
    }
  },
  filters: {
    conversion (value) {
      if (value >= 10000) {
        return `${Math.floor(value / 1000) / 10}万`
      } else {
        return value || 0
      }
    }
  },
  components: {
    hitPercent: () => import('./component/hitPercent/hitPercent.vue')
  },
  mounted () {

  },
  methods: {
    gotopay (item) {
      if (item.dailyLimitPerUser && !item.buyFlag) {
        this.$toast.show({
          message: '今日您已购买过该商品哦',
          duration: 2000,
          isOneLine: true
        })
        return
      }
      localStorage.setItem('originDeffer', window.location.href)
      localStorage.setItem('JDD_PARAM', JSON.stringify(item))
      localStorage.setItem('payment', JSON.stringify(item))
      location.href =
        'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
    },
    async getShowLeaguePacksList () {
      const { code, data } = await getMallProductListByType()
      if (code === 200) {
        this.mallBizConfigs = data.mallBizConfigs
      }
    },
    async taskProgressInfo () {
      const { code, data } = await userProgress()
      if (code === 200) {
        this.taskProgressInfoData = data
      }
    },
    refresh (data) {
      this.taskProgressInfo()
      this.$emit('refresh')
    },
    showPop (type, data) {
      this.$emit('show-pop', type, data)
    },
    showGetDice () {
      this.taskProgressInfo()
      this.getShowLeaguePacksList()
      this.isShowGetDice = true
      GLOBALS.marchSetsPoint('A_H5PT0345004350') // H5平台-欢乐大富翁-获得骰子页面加载完成
    },
    closeGetDice () {
      this.isShowGetDice = false
    }
  }
}
</script>
<style lang="less" scoped>
.get-dice {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  z-index: 6;
  background: rgba(0, 0, 0, 0.7);
  header {
    background: #1f4896;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    color: #b1ccff;
    font-size: 0.36rem;
    border-radius: 0.28rem 0.28rem 0 0;
    margin-top: 0.38rem;
    font-weight: 500;
  }
  .get-dice-container {
    position: absolute;
    top: 1.18rem;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0.3rem 0.38rem;
    background: #5075bc;
    .s-title {
      font-size: 0.24rem;
      font-weight: bold;
      color: #fff;
      margin-bottom: 0.12rem;
      display: flex;
      align-items: center;
      line-height: 0.4rem;
      span {
        display: block;
        white-space: nowrap;
      }
      .white-dot {
        width: 0.12rem;
        height: 0.12rem;
        background: #fff;
        border-radius: 50%;
        margin-right: 0.06rem;
      }
      .next {
        width: 3.04rem;
        height: 0.4rem;
        background: #1f4896;
        border-radius: 2rem;
        font-size: 0.18rem;
        text-align: center;
        line-height: 0.4rem;
        margin-left: 0.14rem;
        i {
          color: #fff94b;
          font-style: normal;
        }
      }
    }
    .info {
      font-size: 0.24rem;
      font-weight: 400;
      color: #fff;
      padding-left: 0.17rem;
      line-height: 0.32rem;
    }
    .g-package {
      width: 100%;
      background: #4a88ff;
      margin-bottom: 0.2rem;
      border-radius: 0.15rem;
      .g-package-container {
        background: #fff;
        margin-top: 0.19rem;
        border-radius: 0.15rem 0.15rem 0 0;
        font-size: 0;
        &.g1 {
          height: 7.26rem;
          ul {
            display: flex;
            padding-top: 0.2rem;
            flex-wrap: wrap;
            li {
              width: 1.79rem;
              height: 2.48rem;
              text-align: center;
              position: relative;
              background: #e6efff;
              border-radius: 0.1rem;
              margin-left: 0.26rem;
              margin-bottom: 0.26rem;
              box-sizing: border-box;
              img {
                width: 1.28rem;
                height: 1.26rem;
              }

              .item-text {
                font-size: 0.2rem;
                color: #9f6027;
                line-height: 0.26rem;
                position: relative;
                font-weight: 500;
                .content {
                  font-weight: bold;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #e74615;
                }
              }
              .btn-price {
                display: block;
                width: 0.96rem;
                height: 0.4rem;
                line-height: 0.4rem;
                background: #e74615;
                border-radius: 0.2rem;
                font-size: 0.24rem;
                color: #ecf4ff;
                font-weight: bold;
                text-align: center;
                position: absolute;
                bottom: 0.14rem;
                left: 0;
                right: 0;
                margin: auto;
                text-decoration: none;
              }
              .limit-tag {
                position: absolute;
                top: 0;
                right: 0;
                width: 1.66rem;
                height: 0.36rem;
                background: #ff881f;
                border-radius: 0 0.1rem 0 0.2rem;
                font-size: 0.24rem;
                text-align: center;
                color: #fff;
                line-height: 0.36rem;
              }
              &:nth-child(1) {
                width: 5.9rem;
                height: 1.34rem;
                margin: 0 auto 0.24rem;
                display: flex;
                box-sizing: border-box;
                padding: 0.12rem 0 0.2rem 0.28rem;
                img {
                  width: 0.98rem;
                  height: 1.02rem;
                }
                .item-text {
                  font-size: 0.36rem;
                  margin-top: 0.2rem;
                  margin-left: 0.3rem;
                  line-height: 0.4rem;
                  .content {
                    font-size: 0.24rem;
                    justify-content: flex-start;
                  }
                }
                .btn-price {
                  bottom: 0.36rem;
                  right: 0.42rem;
                  left: auto;
                }
              }
            }
          }
        }
        &.g2 {
          height: 2.24rem;
        }
      }
    }

    .g-package-info {
      ul {
        display: flex;
        align-items: center;
        height: 0.52rem;
        text-align: left;
        li {
          position: relative;
          font-size: 0.24rem;
          font-weight: bold;
          text-indent: 0.27rem;
          color: #fff;
          flex: 1;
          .line {
            width: 1px;
            height: 0.33rem;
            position: absolute;
            left: 0;
            top: 0.1rem;
          }
        }
        &.li0 {
          justify-content: center;
          padding: 0.1rem 0;
          box-sizing: border-box;
          text-align: center;
        }
      }
    }
  }
  .back-btn {
    width: 0.8rem;
    height: 0.8rem;
    background: url(./img/back.png) no-repeat center center;
    background-size: 100% 100%;
    position: fixed;
    bottom: 1.28rem;
    right: 0.1rem;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  top: 100vh !important;
  opacity: 0;
}
</style>
