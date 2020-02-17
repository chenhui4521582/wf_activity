<template>
  <div class="get-hammer">
    <template v-if="taskProgressInfoData">
      <h4 class="s-title"><em></em>每日任务送幸运币（每日重置）</h4>
      <div class="task_container" v-for="(item,index) in taskProgressInfoData.taskProgress">
        <div class="item">
          <p v-if="index==0">每天完成{{item.totalNum}}个每日任务给1个币</p>
          <p v-else-if="index==1">累计充值{{item.totalNum}}元给1个币</p>
        </div>
        <div class="item">
          <div class="btn btn_complete" v-if="item.state==0" @click="gotocomplete(item,index)">去完成</div>
          <div class="btn btn-receive" v-else-if="item.state==1" @click="gain(item,index)">领取</div>
          <div class="btn btn-gained" v-else>已完成</div>
          <div class="btn_progress">{{item.finishNum>item.totalNum?item.totalNum:item.finishNum}}/{{item.totalNum}}
          </div>
        </div>
      </div>
      <h4 class="s-title"><em></em>玩游戏得幸运币</h4>
      <span class="info">在游戏中(除套圈，枪火英雄，麻将、斗地主、生肖大作战、飞机大战及跑得快)消耗金叶可以获得对应数量的幸运币</span>
      <div class="g-package">
        <div class="g-package-container g2">
          <hit-percent :gameBetting="taskProgressInfoData.gameProgress.gameBetting"
                       :hbItems="taskProgressInfoData.gameProgress.progressList" :countTime="countTime"
                       @refresh="refresh" @showPop="showPop"></hit-percent>
        </div>
        <div class="g-package-info">
          <ul>
            <li><span>已支持金叶：{{taskProgressInfoData.gameProgress.gameBetting | filterPrice}}</span></li>
            <li>获得幸运币：{{taskProgressInfoData.gameProgress.receiveNum }}个</li>
          </ul>
        </div>
      </div>
      <h4 class="s-title"><em></em>超值礼包额外加赠</h4>
      <div class="g-package">
        <div class="g-package-container g1">
          <ul>
            <li v-for="(item,index) in leaguePacksListArr" @click="gotopay(item)">
              <img :src="require(`../../imgs/package${index+1}.png`)" alt="">
              <div
                class="item-text">{{item.content.split('+')[0]}}<br/>+{{item.content.split('+')[1]}}
              </div>
              <a href="javascript:" class="btn-price">￥{{item.price}}</a>
            </li>
          </ul>
        </div>
        <div class="g-package-info">
          <ul>
            <li>已购买礼包：{{taskProgressInfoData.buyProgress.buyTime}}次</li>
            <li>获得幸运币：{{taskProgressInfoData.buyProgress.returnNum}}个</li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>
<script type="text/javascript">
  import {showLeaguePacksList, taskProgressInfo, taskReceive} from '../../utils/api'

  export default {
    data() {
      return {
        leaguePacksListArr: [],
        pUserInfo: {},
        taskProgressInfoData: null,
        popType: 0,
        awardData: null
      }
    },
    props: {
      countTime: {
        type: Number,
        default: 0
      }
    },
    components: {
      hitPercent: () => import('./component/hitPercent/hitPercent.vue'),
    },
    mounted() {
      this.taskProgressInfo()
      this.getShowLeaguePacksList()
    },
    methods: {
      gotopay(item) {
        localStorage.setItem('originDeffer', window.location.href)
        GLOBALS.marchSetsPoint('A_H5PT0245002846', {
          recharge_rmb: item.price,
          product_id: item.bizId,
          awards_name: item.name
        })   // H5平台-砸金蛋-获取幸运币大浮层-点击任意礼包
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
      async getShowLeaguePacksList() {
        const {code, data} = await showLeaguePacksList()
        if (code === 200) {
          this.leaguePacksListArr = data.leaguePacksList
        }
      },
      async taskProgressInfo() {
        const {code, data} = await taskProgressInfo()
        if (code === 200) {
          this.taskProgressInfoData = data
        }
      },
      gotocomplete(item, index) {
        GLOBALS.marchSetsPoint('A_H5PT0245002844', {
          task_id: index + 1,
          task_name: index == 0 ? `每天完成${item.totalNum}个每日任务给1个币` : `累计充值${item.totalNum}元给1个币`
        })   // H5平台-元宵活动-获取幸运币-每日任务去完成点击
        if (index == 0) {
          if (window.linkUrl.getBackUrlFlag(localStorage.getItem('APP_CHANNEL')) == 'xmWap') {
            location.href = 'https://wap.beeplaying.com/xmWap/#/task'
          } else {
            location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', '', true, '#/taskview')
          }
        } else {
          location.href = 'https://wap.beeplaying.com/xmWap/#/payment'
        }
      },
      async gain(item, index) {
        // GLOBALS.marchSetsPoint('A_H5PT0240002796', {
        //   task_id: index + 1,
        //   task_name: index == 0 ? `每天完成${item.totalNum}个每日任务给1个币` : `累计充值${item.totalNum}元给1个币`
        // })   // H5平台-元宵活动-获取幸运币-每日任务奖励领取点击
        const {code, data} = await taskReceive({sort: index + 1})
        if (code === 200) {
          this.refresh(data)
        }
      },
      refresh(num) {
        this.taskProgressInfo()
        this.$emit('refresh', num)
      },
      showPop(data) {
        this.$emit('showPop', data)
      }
    }
  }
</script>
<style lang="less" scoped>
  .get-hammer {
    padding: 1.24rem 0.38rem 0;
    height: calc(100%);
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
    .s-title {
      font-size: 0.24rem;
      font-weight: bold;
      color: rgba(115, 56, 12, 1);
      display: flex;
      align-items: center;
      margin-bottom: 0.12rem;
      em {
        display: inline-block;
        width: 0.12rem;
        height: 0.12rem;
        background: rgba(90, 44, 10, 1);
        border-radius: 50%;
        margin-right: 0.05rem;
      }
    }
    .info {
      font-size: .2rem;
      font-weight: 400;
      color: rgba(93, 43, 25, 1);
      padding-left: 0.17rem;
      line-height: 0.28rem;
    }
  }

  .g-package {
    width: 100%;
    background: #73380C;
    margin-bottom: 0.2rem;
    border-radius: .15rem;
    .g-package-container {
      background: #FFE9D9;
      margin-top: 0.19rem;
      border-radius: .15rem .15rem 0 0;
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
        border-radius: .1rem;
        margin-left: .26rem;
        padding-top: .1rem;
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
      }
      .btn-price {
        display: block;
        width: 0.96rem;
        height: 0.39rem;
        line-height: 0.39rem;
        background: #E74615;
        border-radius: 0.2rem;
        font-size: 0.24rem;
        color: #ecf4ff;
        font-weight: bold;
        text-align: center;
        position: absolute;
        bottom: 0.1rem;
        left: 0;
        right: 0;
        margin: auto;
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
        flex: 1;
        height: 0.52rem;
        line-height: 0.52rem;
        position: relative;
        font-size: 0.24rem;
        font-weight: bold;
        color: rgba(228, 169, 125, 1);
        text-indent: 0.27rem;
        &:nth-child(2):before {
          content: "";
          width: 1px;
          height: 0.33rem;
          background: rgba(178, 112, 20, 1);
          position: absolute;
          left: 0;
          top: 0.1rem;
        }
      }
    }
  }

  .task_container {
    height: 1.06rem;
    background: rgba(255, 233, 217, 1);
    box-shadow: 0px 5px 9px 0px rgba(79, 33, 26, 0.13);
    border-radius: .2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.32rem;
    padding: 0 .3rem;
    box-sizing: border-box;
    .item {
      font-size: .3rem;
      p {
        font-weight: bold;
        color: rgba(153, 61, 25, 1);
        i {
          margin-top: .13rem;
          font-size: .2rem;
          color: #f2374a;
          display: block;
        }
      }
      .btn {
        font-size: .24rem;
        width: 1rem;
        height: .46rem;
        line-height: .46rem;
        text-align: center;
        border-radius: .23rem;
        color: rgba(255, 255, 255, 1);
        font-weight: bold;
        &.btn_complete {
          background: #b76f55;
        }
        &.btn-receive {
          background: rgba(231, 70, 21, 1);
        }
        &.btn-gained {
          background: rgba(151, 151, 151, 1);
        }
      }
      .btn_progress {
        margin-top: .1rem;
        font-size: .2rem;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-align: center;
      }
    }
  }
</style>
