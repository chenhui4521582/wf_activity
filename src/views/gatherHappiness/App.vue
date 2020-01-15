<template>
  <!-- gather-happiness 缩写 gh -->
  <main class="gather-happiness" :style="{background:configPageInfo[currentPage].bgColor}">
    <section class="top-btn-wrapper">
      <div class="left-btn-container">
        <img src="./img/back.png" alt class="back" @click="back()" />
      </div>
      <div class="right-btn-container" v-if="isMainPage">
        <img src="./img/rule.png" class="rule" @click="openPop(1)" />
        <img src="./img/guide-icon.png" class="guide" @click="openPop(2)" />
      </div>
    </section>
    <main-page v-if="isMainPage" :activityInfo="activityInfo" @openPop="openPop"></main-page>
    <rank-page v-if="!isMainPage" :activityInfo="activityInfo"></rank-page>
    <div class="bottom-btn-wrapper" :class="{'is-long-screen':isLongScreen}"
      :style="{background:configPageInfo[currentPage].bgColor}">
      <div class="btn-container">
        <div v-for="(item,key,index) in configPageInfo" :key="key+index"
          :class="{'actived':currentPage===key}" @click="tabClick(key)">{{item.btnText}}</div>
      </div>
    </div>
    <com-pop v-model="popType"></com-pop>
    <congratulation :activityInfo="activityInfo" v-if="activityInfo.incrBlessing"
      @openGamePop="openGamePop"></congratulation>
    <game-pop v-if="isGamePopOpen" @close="closeGamePop"></game-pop>
    <rank @close='closeRank' v-if="isRankPopOpen" :myRankInfo='myRankInfo'
      @toRankPage='currentPage="rank"'></rank>
  </main>
</template>
<script>
/* eslint-disable no-undef */
// gather-happiness 缩写 gh
import { activityInfo, myRank } from './services/api'
import _get from 'lodash.get'
import rankPage from './component/rankPage'
import mainPage from './component/mainPage'
import comPop from './component/comPop'
import congratulation from './component/congratulation'
import gamePop from './component/gamePop'
import rank from './component/rank'
export default {
  data () {
    return {
      currentPage: 'main',
      configPageInfo: {
        main: {
          btnText: '每日返利',
          bgColor: '#AA0310'
        },
        rank: {
          btnText: '福气排行榜',
          bgColor: '#FAD6A9'
        }
      },
      popType: 0, // 0:关闭 1:规则,2:攻略,3:查看记录,4:返利记录
      myRankInfo: {},
      isGamePopOpen: false,
      activityInfo: {},
      isRankPopOpen: false
    }
  },
  mounted () {
    localStorage.removeItem('originDeffer')
    this.getActivityInfo()
  },
  computed: {
    isLongScreen () {
      return screen.height / screen.width > 2
    },
    isMainPage () {
      return this.currentPage === 'main'
    }
  },
  methods: {
    /** 打开弹窗
     */
    openPop (type) {
      switch (type) {
        case 1:
          GLOBALS.marchSetsPoint('A_H5PT0234002723') // H5平台-集福气赢大奖页-规则按钮点击
          break
        case 2:
          GLOBALS.marchSetsPoint('A_H5PT0234002724') // H5平台-集福气赢大奖页-攻略按钮点击
          break
        case 3:
          GLOBALS.marchSetsPoint('A_H5PT0234002725') // H5平台-集福气赢大奖页-福气记录按钮点击
          break
        case 4:
          GLOBALS.marchSetsPoint('A_H5PT0234002727') // H5平台-集福气赢大奖页-领每日返利按钮点击
          break

        default:
          break
      }
      this.popType = type
    },
    async getActivityInfo () {
      const res = await activityInfo()
      this.activityInfo = _get(res, 'data', {})
      if (this.activityInfo.state === 2) {
        this.getMyRank()
      }
      GLOBALS.marchSetsPoint('P_H5PT0234', { source_address: GLOBALS.getUrlParam('from') }) // H5平台-集福气赢大奖-页面加载完成
    },
    async getMyRank () {
      const res = await myRank()
      this.myRankInfo = _get(res, 'data', {})
      const code = _get(res, 'code', 0)
      if (code === 200) {
        this.isRankPopOpen = this.myRankInfo.popup
      }
    },
    tabClick (key) {
      this.currentPage = key
      switch (key) {
        case 'main':
          GLOBALS.marchSetsPoint('A_H5PT0234002728') // H5平台-集福气赢大奖页-每日返利TAB点击
          break
        case 'rank':
          GLOBALS.marchSetsPoint('A_H5PT0234002729') // H5平台-集福气赢大奖页-福气排行榜TAB点击
          break

        default:
          break
      }
    },
    back () {
      GLOBALS.marchSetsPoint('A_H5PT02340027') // H5平台-集福气赢大奖页-返回按钮点击
      if (this.isMainPage) {
        this.$nextTick(() => {
          history.go(-1)
        })
      } else {
        this.currentPage = 'main'
      }
    },
    openGamePop () {
      this.isGamePopOpen = true
      GLOBALS.marchSetsPoint('A_H5PT0234002735') // H5平台-集福气赢大奖页-大家都在玩弹窗加载完成
    },
    closeGamePop () {
      this.isGamePopOpen = false
    },
    closeRank () {
      this.isRankPopOpen = false
    }
  },
  components: {
    mainPage,
    rankPage,
    comPop,
    congratulation,
    gamePop,
    rank
  }
}
</script>
<style lang='less'>
* {
  padding: 0;
  margin: 0;
}
.gather-happiness {
  min-height: 100vh;
}
.top-btn-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  font-size: 0;
  img {
    display: block;
    width: 0.94rem;
    height: 1.28rem;
    margin-top: -0.2rem;
  }
  .back {
    width: 1.02rem;
  }
  .rule {
    position: relative;
    z-index: 1;
  }
}
.bottom-btn-wrapper {
  height: 1.2rem;
  background: rgba(170, 3, 16, 1);
  box-shadow: 10rem -28rem 16rem 0px rgba(170, 14, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5.66rem;
    box-sizing: border-box;
    overflow: hidden;
    margin: auto;
    div {
      flex: 1;
      text-align: center;
      color: #aa0310;
      background: #fff6d2;
      height: 0.7rem;
      line-height: 0.74rem;
      font-size: 0.34rem;
      transition: all 0.2s;
      border: 0.02rem solid #fff6d2;
      &:first-child {
        border-right: none;
        border-top-left-radius: 0.36rem;
        border-bottom-left-radius: 0.36rem;
      }
      &:last-child {
        border-left: none;
        border-top-right-radius: 0.36rem;
        border-bottom-right-radius: 0.36rem;
      }
    }
    .actived {
      color: #fff6d2;
      background: #aa0310;
    }
  }
  &.is-long-screen {
    bottom: 1rem;
  }
}
</style>
