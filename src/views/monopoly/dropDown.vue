<template>
  <div>
    <div class="pop-mask" v-if="curIndex" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="curIndex">
        <div class="drop-down-content" :style="$moduleConfig.monopoly.dropDown.inner.bg">
          <div class="d-tab" :style="$moduleConfig.monopoly.dropDown.inner.tabBg">
            <ul style="height: 100%">
              <li @click="innerHandleTab(index)"
                v-for="(item,index) in $moduleConfig.monopoly.dropDown.inner.tabs.btnText"
                :style="$moduleConfig.monopoly.dropDown.inner.tabs[curIndex - 1 === index?'activeStyle':'btnDefaultStyle']">
                {{item}}
              </li>
            </ul>
          </div>
          <!-- 获取幸运币组件 -->
          <getHammer v-if="curIndex === 1" @refresh="refresh" @showPop="showPop" />

          <!-- 排行榜 -->
          <profit v-if="curIndex === 2" :is-full="false" :endDate="endDate" />

          <!-- 右下角图标 -->
          <img src="./img/hide.png" class="icon-back" @click.stop="close">
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      curIndex: this.value,
      remanentNum: 0,
      totalNum: 0
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    toDayUserCouponNum: {
      type: Number,
      default: 0
    },
    endDate: {
      type: String,
      default: ''
    }
  },
  components: {
    getHammer: () => import('./component/getHammer'),
    profit: () => import('./component/profit')
  },
  methods: {
    innerHandleTab (idx) {
      this.handleTab(idx + 1)
    },
    outHandleTab (idx) {
      this.handleTab(idx)
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
  bottom: 0;
  width: 100vw;
  display: flex;
  padding: 0.2rem 0.2rem 0.16rem;
  box-sizing: border-box;
  .tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.22rem;
    font-weight: bold;
    color: #ffecdd;
    .hammer_icon {
      margin-right: 0.4rem;
    }
    .right {
      text-align: center;
      .main-text {
        line-height: 0.35rem;
        span {
          color: #ca1139;
        }
      }
      .btn {
        font-size: 0.22rem;
        width: 1.44rem;
        white-space: nowrap;
        height: 0.44rem;
        line-height: 0.44rem;
        border-radius: 0.22rem;
        &.hasMainTxt {
          margin: 0.12rem auto 0;
        }
      }
    }
  }
  .line {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 1px;
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
  height: 98%;
  max-height: 98%;
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
