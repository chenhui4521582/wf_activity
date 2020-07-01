<template>

  <article class="stage-wrapper" v-if="curStage"
    :style="{backgroundImage:`url(${curStageInfo.bg})`}">
    <nav>
      <ul>
        <li v-for="(item,name) in stageInfo" @click="toggleStage(name)"><img
            :src="curStage === name?item.selectedIcon:item.defaultIcon" alt=""></li>
      </ul>
    </nav>
    <h4 class="module-title">当前次数{{curStageInfo.round}}/8</h4>
    <p class="desc">最高奖励可翻256倍！</p>
    <section class="award-text">
      <img src="../img/error-text.png" alt="">
      <img src="../img/success-text.png" alt="">
      <img src="../img/quit-text.png" alt="">
    </section>
    <p class="bet-num">当前奖励{{curStageInfo.betNum}}个糖豆</p>
    <section class="hand-wrapper">
      <section class="hand-content left" @click="selectHand('left')">
        <div class="hand-btn" :class="selectedHand?'':'scale'">
          <img v-show="selectedHand==='left'" class="hand-btn"
            src="../img/left-hand-btn-selected.png" alt="">
          <img v-show="selectedHand!=='left'" class="hand-btn" src="../img/left-hand-btn.png"
            alt="">
        </div>
        <img class="hand" :class="selectedHand==='left'?'selected':''" src="../img/left-hand.png"
          alt="">
      </section>
      <section class="hand-content right" @click="selectHand('right')">
        <img class="hand" :class="selectedHand==='right'?'selected':''" src="../img/right-hand.png"
          alt="">
        <div class="hand-btn" :class="selectedHand?'':'scale'">
          <img v-show="selectedHand!=='right'" class="hand-btn" src="../img/right-hand-btn.png"
            alt="">
          <img v-show="selectedHand==='right'" class="hand-btn"
            src="../img/right-hand-btn-selected.png" alt="">
        </div>
      </section>
    </section>
    <section>
      <div class="cost-btn" :style="{backgroundImage:`url(${curStageInfo.btn})`}" @click="_lot()">
        <template v-if="curStageInfo.round===1">
          消耗{{curStageInfo.consumeNum}}颗<br />
          糖豆开始
        </template>
        <template v-else>
          继续翻倍
        </template>
      </div>
      <div v-if="curStageInfo.round!==1" class="quit-btn" @click="openPop(4)">
        <img src="../img/quit-icon.png" alt="">
      </div>
    </section>
  </article>
</template>

<script>
/* eslint-disable no-undef */
import { lot, quit } from '../services/api'
export default {
  name: 'stage',
  components: {

  },
  data () {
    return {
      selectedHand: '',
      curStage: '',
      clicked: false
    }
  },
  computed: {
    stageConfigList () {
      return this.info.stageConfigList
    },
    stageInfo () {
      let info = {
        'stage-3': {
          defaultIcon: require('../img/stage-3-icon.png'),
          selectedIcon: require('../img/stage-3-icon-selected.png'),
          bg: require('../img/stage-3-bg.png'),
          btn: require('../img/stage-3-btn.png')
        },
        'stage-2': {
          defaultIcon: require('../img/stage-2-icon.png'),
          selectedIcon: require('../img/stage-2-icon-selected.png'),
          bg: require('../img/stage-2-bg.png'),
          btn: require('../img/stage-2-btn.png')
        },
        'stage-1': {
          defaultIcon: require('../img/stage-1-icon.png'),
          selectedIcon: require('../img/stage-1-icon-selected.png'),
          bg: require('../img/stage-1-bg.png'),
          btn: require('../img/stage-1-btn.png')
        }
      }
      if (this.stageConfigList && this.stageConfigList.length) {
        for (let index = 0; index < this.stageConfigList.length; index++) {
          const item = this.stageConfigList[index]
          info[`stage-${item.stage}`] = { ...info[`stage-${item.stage}`], ...item }
        }
      }
      return info
    },
    curStageInfo () {
      return this.stageInfo[this.curStage]
    }
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    this.curStage = `stage-${this.info.curStage}`
    this.selectedHand = ''
  },
  methods: {
    toggleStage (name) {
      this.curStage = name
      this.selectedHand = ''
      GLOBALS.marchSetsPoint('A_H5PT0301003584', { level: this.curStage }) // H5平台-疯狂翻倍活动-场次按钮点击
    },
    selectHand (hand) {
      this.selectedHand = hand
    },
    async _lot () {
      GLOBALS.marchSetsPoint('A_H5PT0301003585', { level: this.curStage }) // H5平台-疯狂翻倍活动-开始按钮点击
      if (!this.selectedHand) {
        this.$toast.show({
          message: '请选择一只手',
          duration: 2000,
          isOneLine: true
        })
      } else if (this.info.totalNum < this.curStageInfo.consumeNum && this.curStageInfo.round === 1) {
        this.openPop(6)
      } else if (!this.clicked) {
        this.clicked = true
        const { code, data } = await lot(this.stageInfo[this.curStage].stage)
        if (code === 200) {
          this.selectedHand = ''
          if (data.flag) {
            this.openPop(9, {
              betNum: data.awardNum
            })
          } else {
            this.openPop(5, {
              betNum: data.awardNum
            })
          }
          this.clicked = false
          this.$emit('change-activity-info')
        }
      }
    },
    openPop (type, item) {
      switch (type) {
        case 4:
          GLOBALS.marchSetsPoint('A_H5PT0301003599') // H5平台-疯狂翻倍活动-请留步退出弹窗加载完成
          break
        case 5:
          GLOBALS.marchSetsPoint('A_H5PT0301003597') // H5平台-疯狂翻倍活动-翻倍失败弹窗加载完成
          break
        case 6:
          GLOBALS.marchSetsPoint('A_H5PT0301003601') // H5平台-疯狂翻倍活动-糖豆不足弹窗加载完成
          break
        case 9:
          GLOBALS.marchSetsPoint('A_H5PT0301003595') // H5平台-疯狂翻倍活动-翻倍成功弹窗加载完成
          break

        default:
          break
      }
      this.$emit('open-pop', type, item)
    },
    async _quit () {
      const { code, message } = await quit(this.stageInfo[this.curStage].stage)
      if (code === 200) {
        this.$emit('change-activity-info')
        this.$toast.show({
          message: '已退出翻倍',
          duration: 1000,
          isOneLine: true
        })
      } else {
        this.$toast.show({
          message: message,
          duration: 1000,
          isOneLine: true
        })
      }
    }

  },
  watch: {
    curStage (val) {
      this.$emit('input', this.stageInfo[val])
    },
    curStageInfo (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.stage-wrapper {
  height: 7.84rem;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 6.76rem 7.38rem;
  margin-top: -0.18rem;
  position: relative;
  text-align: center;
  nav {
    position: absolute;
    top: 0;
    left: -1px;
    ul {
      li {
        width: 0.88rem;
        height: 1.36rem;
        margin-top: 0.14rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .desc {
    font-size: 0.36rem;
    color: #fff;
    font-weight: 800;
    margin-top: 0.4rem;
  }
  .award-text {
    display: flex;
    justify-content: center;
    font-size: 0;
    img {
      height: 0.64rem;
      margin-left: 0.2rem;
      margin-top: 0.1rem;
      &:nth-child(2) {
        height: 0.74rem;
        margin-top: 0.06rem;
      }
    }
  }
  .bet-num {
    color: #fff;
    font-size: 0.28rem;
    font-weight: bold;
    margin-top: 0.16rem;
  }
  .hand-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 0.54rem;
    .hand-content {
      display: flex;
      margin: 0 0.56rem;
      position: relative;
      .hand-btn {
        width: 0.8rem;
      }
      div.hand-btn {
        position: absolute;
        bottom: 0.9rem;
        &.scale {
          animation: scale 800ms infinite;
        }
      }
      .hand {
        height: 3.3rem;
        transition: all 0.2s;
      }
      &.left {
        div.hand-btn {
          left: -0.4rem;
        }
        .hand.selected {
          transform: scale(1.1) translate3D(2px, -8px, 0);
        }
      }
      &.right {
        div.hand-btn {
          right: -0.4rem;
        }
        .hand.selected {
          transform: scale(1.1) translate3D(-2px, -8px, 0);
        }
      }
    }
  }
  .quit-btn {
    width: 1.5rem;
    height: 0.8rem;
    position: absolute;
    bottom: 0.1rem;
    left: 76%;
    font-size: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>
