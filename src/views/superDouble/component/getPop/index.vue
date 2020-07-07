<template>
  <div class="get-pop-wrapper">
    <div class="mask"></div>
    <div class="get-pop-container">
      <div class="cost-btn" @click="close">
        {{btnText}}
      </div>
      <div class="get-pop">
        <template v-if="taskProgressInfoData">
          <template v-for="(tItem,tIndex) in titleArr">
            <h4 class="s-title"><em></em>{{tItem}}</h4>
            <template v-if="tIndex===0">
              <span class="info">
                在游戏中（欢乐竞技台球，街机欢乐捕鱼，糖果萌消消，三国大作战，欢乐的小鸟，深海探一探，王者弹珠，众神风云 ，福满多，斗西游）消耗金叶可获得对应数量的糖豆
              </span>
              <div class="g-package">
                <div class="g-package-container g2">
                  <hit-percent :type="1" :gameBetting="taskProgressInfoData.gameProgress.gameBetting" :hbItems="taskProgressInfoData.gameProgress.progressList" :countTime="countTime" @refresh="refresh" @open-pop="openPop"></hit-percent>
                </div>
                <div class="g-package-info">
                  <ul class="li0">
                    <li>
                      <span>已支持金叶:
                        {{taskProgressInfoData.gameProgress.gameBetting | conversion}}</span>
                    </li>
                    <li>
                      <span>累计糖豆:
                        {{taskProgressInfoData.gameProgress.receiveNum }}个</span>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <template v-else-if="tIndex===1">
              <div class="task_container" v-for="(item,index) in taskProgressInfoData.taskProgress">
                <div class="item">
                  <p v-if="index==0">今日完成{{item.totalNum}}个每日任务, 送1个糖豆</p>
                  <p v-else-if="index==1">今日充值10元, 送1个糖豆</p>
                </div>
                <div class="item">
                  <div class="btn btn_complete" v-if="item.state==0" @click="gotocomplete(item,index)">
                    去完成</div>
                  <div class="btn btn-receive" v-else-if="item.state==1" @click="gain(item,index)">
                    领取
                  </div>
                  <div class="btn btn-gained" v-else>已完成</div>
                  <div class="btn_progress">
                    {{item.finishNum>item.totalNum?item.totalNum:item.finishNum}}/{{item.totalNum}}
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="g-package">
                <div class="g-package-container g2">
                  <hit-percent :type="2" :gameBetting="taskProgressInfoData.rechargeProgress.gameBetting" :hbItems="taskProgressInfoData.rechargeProgress.progressList" :countTime="countTime" @refresh="refresh" @open-pop="openPop"></hit-percent>
                </div>
                <div class="g-package-info">
                  <ul class="li0">
                    <li>
                      <span>今日累计充值:
                        {{taskProgressInfoData.rechargeProgress.gameBetting | conversion}}</span>
                    </li>
                    <li>
                      <span>累计糖豆:
                        {{taskProgressInfoData.rechargeProgress.receiveNum }}个</span>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
/* eslint-disable no-undef */
import { userProgress, taskReceive } from '../../services/api'

export default {
  data () {
    return {
      titleArr: ['玩游戏得糖豆', '每日任务送糖豆', '每日充值送糖豆'],
      mallBizConfigs: [],
      pUserInfo: {},
      taskProgressInfoData: null,
      popType: 0,
      awardData: null,
      btnText: '>>点击收起<<'
    }
  },
  props: {
    countTime: {
      type: Number,
      default: 0
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
    this.taskProgressInfo()
  },
  methods: {
    async taskProgressInfo () {
      const { code, data } = await userProgress()
      if (code === 200) {
        this.taskProgressInfoData = data
      }
    },
    gotocomplete (item, index) {
      GLOBALS.marchSetsPoint('A_H5PT0301003591', {
        task_id: index + 1,
        task_name: index === 0 ? `今日完成${item.totalNum}个每日任务给1个糖豆` : `充值任意金额，送1个糖豆`
      }) // H5平台-疯狂翻倍活动-每日任务去完成点击
      if (index === 0) {
        if (window.linkUrl.getBackUrlFlag(localStorage.getItem('APP_CHANNEL')) === 'xmWap') {
          location.href = 'https://wap.beeplaying.com/xmWap/#/task'
        } else {
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', '', true, '#/taskview')
        }
      } else {
        localStorage.setItem('paymentIsBack', true)
        location.href = '/xmWap/#/payment'
      }
    },
    async gain (item, index) {
      GLOBALS.marchSetsPoint('A_H5PT0301003592', {
        task_id: index + 1,
        task_name: index === 0 ? `今日完成${item.totalNum}个每日任务给1个糖豆` : `充值任意金额，送1个糖豆`
      })   // H5平台-超级大赢家活动-每日任务领取点击
      const { code, data } = await taskReceive(index + 1)
      if (code === 200) {
        this.openPop(11, data)
        this.refresh()
      }
    },
    refresh () {
      this.taskProgressInfo()
      this.$emit('refresh')
    },
    close () {
      this.$emit('on-close')
    },
    openPop (type, data) {
      let awardInfo = null
      if (data) {
        awardInfo = {
          name: data + '个糖豆',
          desc: 'tg',
          img: require('../../img/crush-icon.png')
        }
      }
      this.$emit('open-pop', type, awardInfo)
    }
  }
}
</script>
<style lang="less" scoped>
.get-pop-wrapper {
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
  .get-pop-container {
    background: #1469c8;
    border-radius: 0.32rem 0.32rem 0 0;
    border: 0.08rem solid #ba95ff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 4rem;
    .cost-btn {
      top: -0.64rem;
      bottom: auto;
      background-image: url(../../img/yellow-btn-bg.png);
    }
  }
}
.get-pop {
  box-sizing: border-box;
  position: absolute;
  left: 0.2rem;
  top: 0.8rem;
  bottom: 0.2rem;
  right: 0.2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  font-size: 0.24rem;
  .s-title {
    font-size: 0.24rem;
    font-weight: bold;
    color: #b2fff8;
    display: flex;
    align-items: center;
    margin-bottom: 0.12rem;
    em {
      display: inline-block;
      width: 0.12rem;
      height: 0.12rem;
      background: #b2fff8;
      border-radius: 50%;
      margin-right: 0.05rem;
    }
  }
  .info {
    font-size: 0.2rem;
    font-weight: 400;
    color: #b2fff8;
    padding-left: 0.17rem;
    line-height: 0.28rem;
  }
}

.g-package {
  width: 100%;
  background: #2ee6ff;
  margin-bottom: 0.2rem;
  border-radius: 0.15rem;
  .g-package-container {
    background: #fff;
    margin-top: 0.19rem;
    border-radius: 0.15rem 0.15rem 0 0;
    font-size: 0;
    &.g1 {
      height: 2.94rem;
    }
    &.g2 {
      height: 2.24rem;
    }
    ul {
      display: flex;
      justify-content: center;
      padding-top: 0.21rem;
      justify-content: center;
    }
    li {
      width: 1.79rem;
      height: 2.48rem;
      text-align: center;
      position: relative;
      background: rgba(234, 181, 155, 1);
      border-radius: 0.1rem;
      margin-left: 0.26rem;
      padding-top: 0.1rem;
      box-sizing: border-box;
      &:nth-child(1) {
        margin-left: 0;
      }
      img {
        width: 1.28rem;
        height: 1.26rem;
      }
    }
    .item-text {
      font-size: 0.2rem;
      color: #9a5619;
      line-height: 0.26rem;
      position: relative;
      font-weight: 500;
      .content {
        font-weight: bold;
        em {
          display: inline-block;
          font-size: 0.18rem;
          width: 0.24rem;
          height: 0.24rem;
          line-height: 0.24rem;
          text-align: center;
          border-radius: 50%;
          color: #fff;
          font-style: normal;
        }
      }
    }
    .btn-price {
      display: block;
      width: 0.96rem;
      height: 0.39rem;
      line-height: 0.39rem;
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
      color: #003e5c;
      flex: 1;
      .line {
        width: 1px;
        height: 0.33rem;
        position: absolute;
        left: 0;
        top: 0.1rem;
      }
      &:not(:first-child) {
        border-left: #ffa200 1px solid;
      }
    }
    &.li0 {
      justify-content: center;
      padding: 0.1rem 0;
      box-sizing: border-box;
      color: #003e5c;
    }
  }
}

.task_container {
  height: 1.06rem;
  background: #fff;
  box-shadow: 0px 5px 9px 0px rgba(79, 33, 26, 0.13);
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.32rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
  .item {
    font-size: 0.3rem;
    p {
      font-weight: bold;
      color: #666;
      i {
        margin-top: 0.13rem;
        font-size: 0.2rem;
        color: #f2374a;
        display: block;
      }
    }
    .btn {
      font-size: 0.24rem;
      width: 1rem;
      height: 0.46rem;
      line-height: 0.46rem;
      text-align: center;
      border-radius: 0.23rem;
      color: rgba(255, 255, 255, 1);
      font-weight: bold;
      &.btn_complete {
        background: #f89f2c;
      }
      &.btn-receive {
        background: #ff4330;
      }
      &.btn-gained {
        background: #979797;
      }
    }
    .btn_progress {
      line-height: 0.3rem;
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      text-align: center;
    }
  }
}
</style>
