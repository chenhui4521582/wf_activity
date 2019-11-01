<template>
  <div class="get-hammer">
    <h4 class="s-title"><em></em>玩游戏,领福袋券</h4>
    <div class="g-package">
      <div class="g-package-container g2">
        <hit-percent :detail-data="pUserInfo" @refresh="getUserInfo" @detailData="detailData"></hit-percent>
      </div>
      <div class="g-package-info">
        <ul>
          <li>已支持金叶：{{pUserInfo&&pUserInfo.totalBetting | filterPrice}}</li>
          <li>累计福袋券：{{pUserInfo&&pUserInfo.totalNum }}张</li>
        </ul>
      </div>
    </div>
    <template v-if="taskProgressInfoData">
      <div class="s-title"><em></em>做每日任务，送福袋券</div>
      <div class="g-package">
        <div class="g-package-tasks">
          <img :src="`${require(`../../../images/bottom/quan.png`)}`" alt="" class="item">
          <div class="item">
            <div class="item_item">每天完成{{taskProgressInfoData.totalNum}}个任务,送一张福袋券</div>
            <div class="item_item">每天仅完成一次</div>
          </div>
          <div class="item">
            <div class="btn" v-if="taskProgressInfoData.state==0" @click="gotocomplete">去完成</div>
            <div class="btn btn-receive" v-else-if="taskProgressInfoData.state==1" @click="gain">领取</div>
            <div class="btn btn-gained" v-else>已完成</div>
            <div class="info1">{{taskProgressInfoData.finishNum}}/{{taskProgressInfoData.totalNum}}</div>
          </div>
        </div>
      </div>
    </template>
    <div class="s-title" v-if="leaguePacksListArr&&leaguePacksListArr.length"><em></em>购买礼包得福袋券</div>
    <div class="g-package g-package-packages">
      <ul>
        <li v-for="(item,index) in leaguePacksListArr" @click="gotopay(item,index)" class="li-package">
          <span class="item-text">{{item.content.split('+')[0]}}+{{item.content.split('+')[1]}}</span>
          <a href="javascript:" class="btn-price">￥{{item.price}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {showLeaguePacksList, taskProgressInfo, taskReceive} from '../../../utils/api'

  export default {
    data() {
      return {
        leaguePacksListArr: [],
        taskProgressInfoData: null,
        pUserInfo: null
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
      this.taskProgressInfo()
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
      gotopay(item,index) {
        localStorage.setItem('originDeffer', window.location.href)
        GLOBALS.marchSetsPoint(index?'A_H5PT0209002211':'A_H5PT0209002210', {recharge_rmb: item.price, product_id: item.bizId}) //礼包点击
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        if (window.linkUrl.getBackUrlFlag(this.channel) == 'bdWap' && this.channel != '100001') { // 好看、全民小视频
          location.href = 'https://wap.beeplaying.com/payment/#/bdPayment'
        } else {
          location.href = 'https://wap.beeplaying.com/payment/#/payment'
        }
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
      async getUserInfo() {
        this.$emit('getUserInfo')
      },
      async gain() {
        GLOBALS.marchSetsPoint('A_H5PT0209002209',{
          task_name:`每天完成${this.taskProgressInfoData.totalNum}个任务,送一张福袋券`,
          task_id:0
        })//H5平台-双十一超值福袋活动-做每日任务送福袋-奖励领取按钮点击
        const {code, data} = await taskReceive()
        if (code === 200) {
          this.$toast.show({
            message: '领取成功',
            duration: 2000
          })
          this.taskProgressInfo()
          this.$emit('getUserInfo')
        }
      },
      gotocomplete() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
      },
      detailData(val) {
        this.pUserInfo = val
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../../common/css/base.css';

  .get-hammer {
    padding: 0 0.38rem 0;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: .76rem;
    bottom: 0;
    overflow-y: scroll;
    background: rgba(93, 96, 254, 1);
    .s-title {
      font-size: 0.24rem;
      color: rgba(238, 238, 255, 1);
      display: flex;
      align-items: center;
      margin-bottom: 0.12rem;
      font-weight: bold;
      margin-top: .2rem;
      em {
        display: inline-block;
        width: 0.12rem;
        height: 0.12rem;
        border-radius: 50%;
        background: rgba(238, 238, 255, 1);
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
    &:not(.g-package-packages) {
      background: rgba(56, 8, 177, 1);
    }
    border-radius: .15rem;
    margin-top: .13rem;
    .g-package-container {
      background: rgba(241, 241, 255, 1);
      border-radius: .15rem .15rem 0 0;
      &.g1 {
        height: 2.94rem;
      }
      &.g2 {
        height: 2.24rem;
      }
    }
    .g-package-info {
      ul {
        list-style: none;
        margin: 0;
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
    ul {
      display: flex;
      justify-content: center;
    }
    li {
      width: 3.23rem;
      height: 2.62rem;
      text-align: center;
      position: relative;
      &.li-package {
        &:nth-child(1) {
          background: url("../../../images/package1.png");
          background-size: 100% 100%;
        }
        &:nth-child(2) {
          background: url("../../../images/package2.png");
          background-size: 100% 100%;
        }
      }
    }
    .img {
      width: 1.35rem;
      height: 1.14rem;
      position: relative;
      top: .12rem;
    }
    .item-text {
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(154, 86, 25, 1);
      line-height: 0.26rem;
      position: absolute;
      top: 1.55rem;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
    }
    .btn-price {
      display: block;
      height: .5rem;
      line-height: .55rem;
      font-size: 0.36rem;
      color: #ecf4ff;
      font-weight: bold;
      text-align: center;
      margin: 0 auto;
      position: absolute;
      bottom: 0.17rem;
      left: .1rem;
      right: 1.3rem;
    }
    .g-package-tasks {
      width: 6.46rem;
      height: 1.17rem;
      background: rgba(241, 241, 255, 1);
      border-radius: .1rem;
      display: flex;
      align-items: center;
      padding: .1rem;
      box-sizing: border-box;
      .item {
        &:nth-child(1) {
          width: .96rem;
          height: .98rem
        }
        &:nth-child(2) {
          font-size: .24rem;
          font-weight: bold;
          color: rgba(56, 8, 177, 1);
          margin-right: .44rem;
          .item_item:nth-child(2) {
            margin-top: .14rem;
            font-size: .18rem;
            color: rgba(93, 96, 254, 1);
          }
        }
        &:nth-child(3) {
          .btn {
            width: 1.25rem;
            height: .5rem;
            line-height: .5rem;
            text-align: center;
            background: rgba(255, 127, 50, 1);
            border-radius: .25rem;
            font-size: .24rem;
            font-weight: bold;
            color: rgba(241, 241, 255, 1);
            margin-top: .1rem;
            &.btn-receive {
              background: #E50B5D;
            }
            &.btn-gained {
              background: #5D60FE;
            }
          }
          .info1 {
            margin-top: .04rem;
            font-size: .18rem;
            font-weight: bold;
            color: rgba(93, 96, 254, 1);
            text-align: center;
          }
        }
      }
    }
  }

</style>
