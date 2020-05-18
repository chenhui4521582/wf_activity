<template>
  <div class="scratch">
    <!-- 返回 -->
    <div class="back-btn" @click="backHome">
      <img class="inner-img" src="./img/back-icon.png" alt="">
    </div>
    <!-- 规则 -->
    <div class="rule-btn" @click="openRule">
      <img class="inner-img" src="./img/rule-icon.png" alt="">
    </div>
    <!-- 攻略 -->
    <div class="strategy-btn">
      <img class="inner-img" src="./img/strategy-icon.png" alt="">
    </div>
    <!-- 奖励明细 -->
    <div class="prize-btn">
      <img class="inner-img" src="./img/price-icon.png" alt="">
    </div>
    <!-- content -->
    <div class="content">
      <div class="scratch-item" v-for="(item, index) in stageConfigList" :key="index">
        <img class="inner-img" :src="item.img" alt="">
        <div class="check-prize">查看奖励</div>
        <div class="btns">
          <div class="one">
            <div class="text">消耗{{item.consumeNum || 0}}个游戏币</div>
            <div class="explain">获得1个随机中级奖励</div>
          </div>
          <div class="ten">
            <div class="text">消耗{{item.consumeNum * 10}}个游戏币</div>
            <div class="explain">获得10个随机中级奖励</div>
          </div>
        </div>
        <div class="total">剩余{{userInfo.totalNum || 0}}个游戏币</div>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      <div class="get-coin" @click="openDialog(1)">
        <p>获取游戏币</p>
        <p>剩余{{userInfo.totalNum || 0}}个</p>
      </div>
      <div class="ranking" @click="openDialog(2)">
        有奖排行榜
      </div>
    </div>
    <!-- rule -->
    <rule v-model="showRule" :info="info"/>
    <!-- recomend -->
    <recommend v-model="showRecommend" />
    <!-- dialog -->
    <down-popup v-model="showDownPopup" />
  </div>
</template>
<script>
import Recommend from './components/recommend'
import DownPopup from './components/downPopup'
import Rule from './components/rule'
import Services from '../../services/services'
import utils from '../../components/utils'
import _get from 'lodash.get'
export default {
  name: 'scratch',
  data: ()=>({
    currentIndex: 0,
    info: {},
    showRule: false,
    showRecommend: false,
    showDownPopup: null
  }),
  components: {
    Rule,
    Recommend,
    DownPopup
  },
  computed: {
    userInfo () {
      return _get(this.info, 'userInfo', {})
    },
    stageConfigList () {
      let stageConfigList = _get(this.info, 'stageConfigList', [])
      stageConfigList.forEach((item, index) => {
        item.img = require(`./img/item${index}.png`)
      })
      return stageConfigList
    }
  },
  methods: {
    handleNavClick (index, item) {
      this.currentIndex = index
      this.resetParams()
      GLOBALS.marchSetsPoint('A_H5PT0282003393', {
        awards_name: item.name
      })
    },
    /** 获取活动信息 **/
    _getInfo () {
      Services.activityInfo().then(res => {
        const {code, data, message} = res
        if(code == 200) {
          this.info = _get(res, 'data', {})
        }
      })
    },
    /** 返回首页 **/
    backHome () {
      window.location.href = "//wap.beeplaying.com/xmWap/"
    },
    /** 打开规则 **/
    openRule () {
      this.showRule = true
    },
    /** 打开更多游戏 **/
    openRecommend () {
      this.showRecommend = true
    },
    openDialog (index) {
      this.showDownPopup = index
    },
    jump () {
      window.location.href = 'https://wj.qq.com/s2/5837168/9470/'
    },
    goRanking () {
      this.$router.push({
        name: 'ranking'
      })
    }
  },
  mounted() {
    this._getInfo()
  }
}
</script>
<style lang="less" scoped>
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.scratch {
  min-height: 100vh;
  padding: 1.68rem 0 1.2rem;
  overflow: hidden;
  position: relative;
  background: url(./img/bg.png) no-repeat center top;
  background-size: 100% auto;
  .content {
    .scratch-item {
      position: relative;
      margin: 0 auto .12rem;
      width: 6.34rem;
      height: 4.73rem;
      .check-prize {
        position: absolute;
        left: .14rem;
        top: 1.05rem;
        width: .25rem;
        height: .95rem;
        text-align: center;
        font-size: .24rem;
        color: #F85665;
        font-weight: bold;
        line-height: .25rem;
      }
      .btns {
        position: absolute;
        left: .57rem;
        top: 2.9rem;
        width: 5.3rem;
        display: flex;
        justify-content: space-between;
        .text {
            width: 2.47rem;
            height: .87rem;
            text-align: center;
            font-size: .28rem;
            font-weight: bold;
            line-height: .78rem;
            color: #fff;
          }
        .explain {
          font-size: .18rem;
          text-align: center;
        }
        .one {
          .text {
            background: url(./img/blur-btn.png) no-repeat center center;
            background-size: 100% 100%;
          }
        }
        .ten {
          .text {
            background: url(./img/red-btn.png) no-repeat center center;
            background-size: 100% 100%;
          }
        }
      }
      .total {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        color: #fff;
        font-size: .24rem;
        height: .5rem;
        line-height: .5rem;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: .05rem .3rem 0;
    height: 1.1rem;
    border-radius: .16rem .16rem 0 0;
    background: #4353C8;
    border-top: .06rem solid #000;
    .get-coin {
      width: 3.08rem;
      height: .92rem;
      text-align: center;
      color: #000;
      font-size: .3rem;
      background: url(./img/yellow-btn.png) no-repeat center top;
      background-size: 100% auto;
      display: flex;
      justify-content: center;
      flex-direction: column;
      p {
        width: 100%;
        line-height: .3rem;
        &:first-child {
          font-weight: bold;
          color: #000;
          font-size: .3rem;
          font-weight: bold;
        }
        &:last-child {
          color: #000;
          font-size: .18rem;
        }
      }
    }
    .ranking {
      width: 3.08rem;
      height: .92rem;
      line-height: .86rem;
      text-align: center;
      color: #000;
      font-size: .3rem;
      font-weight: bold;
      background: url(./img/white-btn.png) no-repeat center top;
      background-size: 100% auto;
    }
  }
  .back-btn {
    position: absolute;
    left: .08rem;
    top: .16rem;
    width: .56rem;
    height: .62rem;
  }
  .rule-btn {
    position: absolute;
    right: 0.12rem;
    top: .16rem;
    width: .56rem;
    height: 1.05rem;
  }
  .strategy-btn {
    position: absolute;
    left: 0.08rem;
    top: .83rem;
    width: .56rem;
    height: 1.35rem;
  }
  .prize-btn {
    position: absolute;
    right: 0.12rem;
    top: 1.24rem;
    width: .56rem;
    height: 1.35rem;
  }
}
</style>