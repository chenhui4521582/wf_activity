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
    <main-page v-if="isMainPage" @openPop="openPop"></main-page>
    <rank-page v-if="!isMainPage" @openPop="openPop"></rank-page>
    <div class="bottom-btn-wrapper" :class="{'is-long-screen':isLongScreen}"
      :style="{background:configPageInfo[currentPage].bgColor}">
      <div class="btn-container">
        <div v-for="(item,key,index) in configPageInfo" :key="key+index"
          :class="{'actived':currentPage===key}" @click="currentPage=key">{{item.btnText}}</div>
      </div>
    </div>
    <com-pop v-model="popType"></com-pop>
  </main>
</template>
<script>
// gather-happiness 缩写 gh
import rankPage from './component/rankPage'
import mainPage from './component/mainPage'
import comPop from './component/comPop'
import { myRank } from "./services/api"
import _get from "lodash.get"
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
      popType: 0, // 0:关闭 1:规则,2:攻略,3查看记录
      myRankInfo: {}
    }
  },
  mounted () {
    this.getMyRank()
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
      this.popType = type
    },
    async getMyRank () {
      const res = await myRank()
      this.myRankInfo = _get(res, 'data', {})
    },
    back () {
      if (this.isMainPage) {
        return
      }
      this.currentPage = 'main'
    }
  },
  components: {
    mainPage,
    rankPage,
    comPop
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
