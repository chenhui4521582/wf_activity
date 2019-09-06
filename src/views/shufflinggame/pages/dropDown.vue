
<template>
  <div>
    <div class="pop-mask" v-if="isDropDown" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <div class="drop-down-content">

          <div class="d-tab">
            <div style="position: absolute;width: 100%;left: 0;top: 0;height: 100%">
              <!-- 右下角图标 -->
              <img src="../images/bottom/close.png" class="icon-back" @click.stop="close">
            </div>
          </div>
          <!-- 获取锤子组件 -->
          <getHammer :rules-explain="rulesExplain" v-if="curIndex == 0" />

          <!-- 排行榜 -->
          <profit v-if="curIndex == 1" :is-full="false" />
        </div>
      </div>
    </transition>
    <div class="bottom-wrap" v-if="!isDropDown">
      <div class="tab get-hammer" @click="outHandleTab(0)">
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { userInfo } from '../utils/api'
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
    rulesExplain: {
      type: String,
      default: ''
    },
    data:{
      type: Object,
      default: null
    }
  },
  components: {
    getHammer: () => import('./component/getHammer'),
    profit: () => import('./component/profit')
  },
  mounted () {
    this.init()
  },
  methods: {
    innerHandleTab (idx) {
      if (idx) {
        GLOBALS.marchSetsPoint('A_H5PT0075001466')   // H5平台-砸金蛋-获取锤子大浮层-点击有奖排行榜
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0075001470')   // H5平台-砸金蛋-有奖排行榜大浮层-点击获取锤子
      }
      this.handleTab(idx)
    },
    outHandleTab (idx) {
      GLOBALS.marchSetsPoint('A_H5PT0156001774')//H5平台-翻牌活动-中间区域-获得更多翻牌点点击
      this.handleTab(idx)
    },
    handleTab (idx) {
      this.isDropDown = true
      this.curIndex = idx
    },
    async init () {
      // const { code, data } = await userInfo()
      // if (code === 200) {
        this.remanentNum = this.data.remanentNum
        this.totalNum = this.data.totalNum
      // }
    },
    close () {
      this.isDropDown = false
      GLOBALS.marchSetsPoint('A_H5PT0156001775')//H5平台-翻牌活动-底部弹窗-点击收起点击
      this.init()
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
.fade-enter {
  transform: translateY(100%);
}
.fade-enter-to {
  transform: translateY(0);
}
.fade-leave {
  transform: translateY(0);
}
.fade-leave-to {
  transform: translateY(100%);
}
</style>
