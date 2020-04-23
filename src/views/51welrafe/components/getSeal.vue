<template>
  <div class="get-seal">
    <my-seal 
      :userInfo="userInfo" 
      :current="1" 
      @openSealLog="openSealLog"
    />
    <!-- 玩游戏集图章 -->
    <div class="play-game">
      <div class="title">累计支持金叶</div>
      <Progress :list="betProgress" :status="1" />
    </div>
    <!-- 充值领图章 -->
    <div class="pay">
      <div class="title">累计充值</div>
      <Progress :list="rechargeProgress" :status="2" />
    </div>
    <!-- 买礼包 -->
    <div class="buy-card">
      
    </div>
  </div>
</template>
<script>
import MySeal from './mySeal'
import Progress from './progress'
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'getSeal',
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    betProgress: {},
    rechargeProgress: {},
    cardList: []
  }),
  components: {
    MySeal,
    Progress
  },
  methods: {
    openSealLog () {

    },
    /** 获取-用户任务进度 **/
    _getUserProgress () {
      Services.getUserProgress().then(res => {
        const {code} = _get(res, 'data')
        if(code == 200) {
          this.betProgress = _get(res, 'data.data.betProgress', {})
          console.log(res.data.data)
          this.rechargeProgress = _get(res, 'data.data.rechargeProgress', {})
        }
      })
    },
    /** 获取礼包列表 **/
    _getCardList () {
      Services.getCardList().then(res => {

      })
    }
  },
  mounted () {
    this._getUserProgress()
  }
}
</script>
<style lang="less" scoped>
.get-seal {
  padding: 0 .3rem;
  background: url(../img/content-bg.png) no-repeat center top;
  background-size: 100% auto;
  .play-game {
    .title {
      color: #5737F2;
      font-weight:bold;
      text-align: center;
    }
    padding-top: 1.4rem;
    height: 8rem;
  }
  .pay {
    height: 6.8rem;
    .title {
      color: #5737F2;
      font-weight:bold;
      text-align: center;
    }
  }
  .buy-card {
    height: 4.9rem;
  }
}
</style>