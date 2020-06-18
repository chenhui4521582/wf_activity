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
        消耗{{curStageInfo.consumeNum}}颗<br />
        糖豆开始
      </div>
      <div class="quit-btn" @click="openPop(4)">
        <img src="../img/quit-icon.png" alt="">
      </div>
    </section>
  </article>
</template>

<script>
import { lot, quit } from '../services/api'
export default {
  name: 'stage',
  components: {

  },
  data () {
    return {
      selectedHand: '',
      curStage: ''
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
    this.selected = ''
  },
  methods: {
    toggleStage (name) {
      this.curStage = name
      this.selectedHand = ''
    },
    selectHand (hand) {
      this.selectedHand = hand
    },
    async _lot () {
      if (this.selectedHand) {
        const { code, data } = await lot(this.stageInfo[this.curStage].stage)
      }
    },
    openPop (type) {
      this.$emit('open-pop', type)
    },
    async _quit () {
      const { code, data } = await quit(this.stageInfo[this.curStage].stage)
    }
  },
  watch: {
    curStage (val) {
      this.$emit('input', this.stageInfo[val])
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
    width: 7.2rem;
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
    right: 0.2rem;
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
