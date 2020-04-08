<template>
  <div>
    <div class="pop-mask" v-if="isDropDown" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <div class="drop-down-content">
          <div class="d-tab">
            <div style="position: absolute;width: 100%;left: 0;top: 0;">
              <ul>
                <li class="main-text">喂鱼干 瓜分千元猫币</li>
              </ul>
            </div>
          </div>
          <!-- 排行榜 -->
          <profit :is-full="false" :endDate="endDate" @showPop="showPop" :actInfoData="actInfoData"
            :countTime="countTime" />

          <!-- 右下角图标 -->
          <img src="./imgs/hide.png" class="icon-back" @click.stop="close">
        </div>
      </div>
    </transition>
    <div class="bottom-wrap" v-if="!isDropDown">
      <div class="tab profit" @click="outHandleTab(1)">
        <div class="right">
          <img src="./imgs/decoration.png" alt="">
          <div class="main-text"><span>喂鱼干 瓜分千元猫币</span></div>
          <div class="btn">
            猫币可兑换话费卡、京东卡等丰厚奖励
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      curIndex: 0,
      isDropDown: false,
      remanentNum: 0,
      totalNum: 0
    }
  },
  props: {
    countTime: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    },
    myInfo: {
      type: Object,
      default: null
    },
    actInfoData: {
      type: Object,
      default: null
    }
  },
  components: {
    profit: () => import('./component/profit')
  },
  methods: {
    innerHandleTab (idx) {
      this.handleTab(idx)
    },
    outHandleTab (idx) {
      GLOBALS.marchSetsPoint('A_H5PT0252003000', { role_level: this.actInfoData.catLevel })   // H5平台-元宵活动-底部有奖排行点击
      this.$emit('handleTab', idx)
    },
    handleTab (idx) {
      this.isDropDown = true
      this.curIndex = idx
    },
    close () {
      this.isDropDown = false
    },
    showPop (data) {
      console.log(data)
      this.$emit('showPop', data)
    }
  }
}
</script>
<style lang="less" scoped>
@import "./css/dropDown.less";

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.main-text {
  &::before {
    content: ">>>";
    display: inline-block;
  }
  &::after {
    content: "<<<";
    display: inline-block;
  }
}
.bottom-wrap {
  .main-text::before {
    margin: 0 0.24rem;
    animation: sway 2s infinite;
  }
  .main-text::after {
    animation: swayDeff 2s infinite;
    margin: 0 0.24rem;
  }
}
@keyframes sway {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  20% {
    transform: translate3d(-0.2rem, 0, 0) scale(1.2);
  }
  40% {
    transform: translate3d(0.2rem, 0, 0) scale(1.2);
  }
  60% {
    transform: translate3d(-0.1rem, 0, 0) scale(0.9);
  }
  80% {
    transform: translate3d(0.1rem, 0, 0) scale(0.9);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
}
@keyframes swayDeff {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  20% {
    transform: translate3d(0.2rem, 0, 0) scale(1.2);
  }
  40% {
    transform: translate3d(-0.2rem, 0, 0) scale(1.2);
  }
  60% {
    transform: translate3d(0.1rem, 0, 0) scale(0.9);
  }
  80% {
    transform: translate3d(-0.1rem, 0, 0) scale(0.9);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
}
</style>
