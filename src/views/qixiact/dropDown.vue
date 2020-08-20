<template>
  <div>
    <div class="pop-mask" v-if="curIndex" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="curIndex">
        <div class="drop-down-content" :style="$moduleConfig.superLotto.dropDown.inner.bg">
          <div class="bottom-wrap top" :style="$moduleConfig.superLotto.dropDown.out.bg">
          </div>
          <!-- 获取幸运币组件 -->
          <getHammer v-if="curIndex === 1" :actInfoData="actInfoData" @refresh="refresh" @showPop="showPop" />
          <!-- 右下角图标 -->
          <img src="./images/close.png" class="icon-back" @click.stop="close">
        </div>
      </div>
    </transition>
    <!--<div class="bottom-wrap" v-if="!curIndex" :style="$moduleConfig.superLotto.dropDown.out.bg" @click="outHandleTab">-->
    <!--</div>-->
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      curIndex: this.value,
      remanentNum: 0
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    actInfoData: {
      type: Object,
      default: null
    },
    endDate: {
      type: String,
      default: ''
    }
  },
  components: {
    getHammer: () => import('./components/getHammer'),
  },
  methods: {
    innerHandleTab (idx) {
      this.handleTab(idx + 1)
    },
    outHandleTab () {
      this.curIndex=1
    },
    handleTab (idx) {
      this.curIndex = idx
    },
    close () {
      this.curIndex = 0
    },
    refresh (data) {
      this.$emit('refresh', data)
    },
    showPop (type, data) {
      this.$emit('showPop', type, data)
    }
  },
  watch: {
    value (val) {
      this.curIndex = val
    },
    curIndex (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="less" scoped>
.bottom-wrap {
  position: fixed;
  left: 0;
  width: 100vw;
  display: flex;
  padding: 0.2rem 0.2rem 0.16rem;
  box-sizing: border-box;
  &:not(.top){
    bottom: 0;
  }
  &:before{
    content: '获取助力值';
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 3.57rem;
    height: .43rem;
    font-size:.4rem;
    font-weight:bold;
    color:rgba(3,65,100,1);
    text-align: center;
  }
}

.drop-down {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 2;
}

.pop-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.drop-down-content {
  width: 100%;
  height: 100%;
  max-height: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  font-size: 0.2rem;
  z-index: 12;
  .d-tab {
    overflow-y: hidden;
    width: 100%;
    position: relative;
    z-index: 15;
    ul {
      display: flex;
      li {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.3rem;
        font-weight: bold;
      }
    }
  }
}

.icon-back {
  width: 0.8rem;
  height: 0.8rem;
  position: fixed;
  right: 0.16rem;
  bottom: 0.8rem;
  z-index: 10;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
