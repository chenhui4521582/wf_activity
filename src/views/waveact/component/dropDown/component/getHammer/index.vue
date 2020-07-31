<template>
  <div class="get-hammer">
    <div class="title_next">
      <h4 class="s-title nomargin"><em></em>玩游戏得游戏币</h4>
      <div class="next_info" v-if="pUserInfo.nextLeafs">下一梯度解锁需支持金叶：<i>{{(pUserInfo.nextLeafs-pUserInfo.gameBetting)| filterPrice}}</i></div>
    </div>
    <div class="s-title-side">参与活动的游戏：糖果萌消消、欢乐竞技台球、街机欢乐捕鱼、三国大作战、众神风云、福满多、斗西游、深海探一探、欢乐的小鸟、炸弹人</div>
    <div class="g-package">
      <div class="g-package-container g2">
        <hit-percent :detail-data="myInfo" @gameinfo="getGameInfo" @refresh="refresh" @showPop="$emit('showPop',4)"></hit-percent>
      </div>
      <div class="g-package-info">
        <ul>
          <li>已消耗金叶：{{pUserInfo.gameBetting | filterPrice}}</li>
          <li>累计获得：{{pUserInfo.receiveNum| filterPrice}}个币</li>
        </ul>
      </div>
    </div>
    <h4 class="s-title"><em></em>超值礼包额外加赠</h4>
    <div class="leaguePacks">
      <ul>
        <li v-for="item in leaguePacksListArr" @click="gotopay(item)">
          <span class="item-text">{{item.content.split('+')[0]}}<br/>
            <span class="item_info"><i>赠</i>{{item.content.split('+')[1]}}</span>
          </span>
          <a href="javascript:" class="btn-price">￥{{item.price}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Services from '../../../../services/services'

  export default {
    data() {
      return {
        leaguePacksListArr: [],
        pUserInfo: {},
        taskProgressInfoData: null,
      }
    },
    props: {
      rulesExplain: {
        type: String,
        default: ''
      },
      myInfo: {
        type: Object,
        default: null
      },
      actInfo: {
        type: Object,
        default: null
      }
    },
    computed: {
      channel() {
        return localStorage.getItem('APP_CHANNEL') || ''
      }
    },
    components: {
      hitPercent: () => import('./component/hitPercent/hitPercent.vue')
    },
    mounted() {
      this.getShowLeaguePacksList()
      // this.taskProgressInfo()
    },
    filters: {
      filterPrice: function (value) {
        if (value) {
          return value > 10000 ? value / 10000 + '万' : value
        } else {
          return 0
        }
      }
    },
    methods: {
      gotopay(item) {
        localStorage.setItem('originDeffer', window.location.href)
        GLOBALS.marchSetsPoint('A_H5PT0229002673', {
          recharge_rmb: item.price,
          product_id: item.bizId,
          product_name: item.content
        })   // HH5平台-双旦活动页-获得抽奖机会页-超值礼包-礼包点击
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
      async getShowLeaguePacksList() {
        const {code, data} = (await Services.showLeaguePacksList(this.actInfo.bagBatchId)).data
        if (code === 200) {
          this.leaguePacksListArr = data.mallBizConfigs
        }
      },
      isGoBDPayment() {
        return window.linkUrl.getBackUrlFlag(this.channel) == 'bdWap'
      },
      async taskProgressInfo() {
        const {code, data} = (await Services.taskProgressInfo()).data
        if (code === 200) {
          this.taskProgressInfoData = data
        }
      },
      gotocomplete() {
        GLOBALS.marchSetsPoint('A_H5PT0229002672', {
          task_id: this.taskProgressInfoData.totalNum,
          task_name: `每天完成${this.taskProgressInfoData.totalNum}个每日任务可以获得一个游戏币`
        })   // H5平台-双旦活动页-获得抽奖机会页-玩游戏-领取奖励点击
        if (window.linkUrl.getBackUrlFlag(localStorage.getItem('APP_CHANNEL')) == 'xmWap') {
          location.href = 'https://wap.beeplaying.com/xmWap/#/task'
        } else {
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', '', true, '#/taskview')
        }
      },
      async gain() {
        const {code, data} = (await Services.taskReceive()).data
        if (code === 200) {
          this.taskProgressInfo()
          this.refresh(data)
        }
      },
      getGameInfo(data) {
        this.pUserInfo = data
      },
      getGameInfo(data) {
        this.pUserInfo = data
      },
      refresh(num) {
        this.$emit('refresh', num)
      }
    }
  }
</script>
<style lang="less" scoped>
  .get-hammer {
    padding: 1rem 0.38rem 0;
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
      color:rgba(219,90,54,1);
      display: flex;
      align-items: center;
      &:not(.nomargin){
        margin-bottom: 0.12rem;
      }
      em {
        display: inline-block;
        width: 0.12rem;
        height: 0.12rem;
        border-radius: 50%;
        background: rgba(219,90,54,1);
        margin-right: 0.05rem;
      }
    }
    .info {
      color: #c07002;
      padding-left: 0.17rem;
      line-height: 0.28rem;
    }
    .title_next{
      display: flex;
      justify-content: space-between;
      margin-bottom: .2rem;
      .next_info{
        font-size:.2rem;
        font-weight:bold;
        color:rgba(132,12,0,1);
        padding:.1rem;
        background:rgba(244,176,52,1);
        border-radius:.15rem;
        display: flex;
        align-items: center;
        i{
          color: #FEFDFB;
        }
      }
    }
    .s-title-side{
      font-size:.18rem;
      font-weight:400;
      color:rgba(188,107,76,1);
      margin-bottom: .2rem;
    }
  }

  .g-package {
    width: 100%;
    margin-bottom: 0.32rem;
    border-radius: .15rem;
    .g-package-container {
      background: rgba(254, 253, 251, 1);
      margin-top: 0.19rem;
      &.g1 {
        height: 2.48rem;
      }
      &.g2 {
        height: 2.4rem;
        border-radius: .15rem .15rem 0 0;
      }
    }
  }

  .g-package-info {
    ul {
      display: flex;
      align-items: center;
      height: 0.52rem;
      text-align: left;
      background: #BC6B4C;
      border-radius: 0 0 .15rem .15rem;
      li {
        flex: 1;
        height: 0.52rem;
        line-height: 0.52rem;
        position: relative;
        font-size: 0.24rem;
        font-weight: bold;
        color: rgba(241, 241, 255, 1);
        text-indent: 0.27rem;
        &:nth-child(1):before {
          content: "";
          width: 1px;
          height: 0.33rem;
          background: rgba(241, 241, 255, 1);
          position: absolute;
          right: 0;
          top: 0.1rem;
        }
      }
    }
  }

  .task_container {
    height: 1.18rem;
    background: rgba(254, 253, 251, 1);
    box-shadow: 0px 5px 9px 0px rgba(79, 33, 26, 0.13);
    border-radius: .1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 0.32rem;
    .item {
      font-size: .24rem;
      p {
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        i {
          margin-top: .13rem;
          font-size: .2rem;
          color: #f2374a;
          display: block;
        }
      }
      .btn {
        width: 1rem;
        height: .46rem;
        line-height: .46rem;
        text-align: center;
        border-radius: .23rem;
        color: rgba(255, 255, 255, 1);
        font-weight: bold;
        &.btn_complete {
          background: rgba(15, 140, 62, 1);
        }
        &.btn-receive {
          background: rgba(242, 55, 74, 1);
        }
        &.btn-gained {
          background: rgba(153, 153, 153, 1);
        }
      }
      .btn_progress {
        margin-top: .1rem;
        font-size: .18rem;
        color: rgba(242, 55, 74, 1);
        text-align: center;
      }
    }
  }

  .leaguePacks {
    margin-top: .2rem;
    ul {
      display: flex;
      justify-content: space-between;
    }
    li {
      width: 1.99rem;
      height: 2.48rem;
      text-align: center;
      position: relative;
      background: rgba(254, 253, 251, 1);
      box-shadow: 0px 5px 9px 0px rgba(79, 33, 26, 0.13);
      border-radius: .1rem;
      &:nth-child(1):before {
        content: '';
        position: absolute;
        top: .08rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 1.48rem;
        height: 1.4rem;
        background: url(./images/i-288.png) no-repeat center top;
        background-size: 100% 100%;
      }
      &:nth-child(2):before {
        content: '';
        position: absolute;
        top: .08rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 1.48rem;
        height: 1.4rem;
        background: url(./images/i-888.png) no-repeat center top;
        background-size: 100% 100%;
        margin: 0 0.26rem;
      }
      &:nth-child(3):before {
        content: '';
        position: absolute;
        top: .08rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 1.48rem;
        height: 1.4rem;
        background: url(./images/i-1888.png) no-repeat center top;
        background-size: 100% 100%;
      }
    }
    .item-text {
      font-size: 0.24rem;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
      line-height: 0.3rem;
      position: relative;
      top: 1.35rem;
      .item_info {
        margin-top: .05rem;
        width: .28rem;
        height: .28rem;
        font-size: .2rem;
        font-weight: 500;
        color: rgba(255, 28, 28, 1);
        i {
          display: inline-block;
          margin-right: .05rem;
          width: .28rem;
          height: .28rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 1);
          line-height: .28rem;
          background: rgba(255, 28, 28, 1);
          border-radius: 50%;
        }
      }
    }
    .btn-price {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: .49rem;
      font-size: 0.36rem;
      color: #ecf4ff;
      font-weight: 800;
      text-align: center;
      line-height: .49rem;
      border-radius: 0 0 .1rem .1rem;
      background: rgba(255, 127, 50, 1);
    }
  }
</style>
