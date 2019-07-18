
<template>
  <div>
    <div class="pop-mask" v-if="isDropDown" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <div class="drop-down-content">
          
            <div class="d-tab">
              <div style="position: absolute;width: 100%;left: 0;top: 0;">
                <ul>
                  <li @click="innerHandleTab(0)" :class="{'active':curIndex == 0}">获取锤子</li>
                  <li @click="innerHandleTab(1)" :class="{'active':curIndex == 1}">有奖排行榜</li>
                </ul>
              </div>
            </div>
          <!-- 获取锤子组件 -->
          <getHammer :rules-explain="rulesExplain" v-if="curIndex == 0" />

          <!-- 排行榜 -->
          <profit v-if="curIndex == 1" />

          <!-- 右下角图标 -->
          <img src="./images/package/profit/icon-back.png" class="icon-back" @click.stop="close">
        </div>
      </div>
    </transition>
    <div class="bottom-wrap" v-if="!isDropDown">
      <div class="tab get-hammer" @click="outHandleTab(0)">
        <div class="hammer_icon"></div>
        <div class="right">
          <div class="main-text">剩余锤子<span>{{remanentNum}}</span></div>
          <div class="btn">获取锤子</div>
        </div>
      </div>
      <div class="tab profit" @click="outHandleTab(1)">
        <div class="hammer_icon"></div>
        <div class="right">
          <div class="main-text">累计锤子<span>{{totalNum}}</span></div>
          <div class="btn">有奖排行榜</div>
        </div>
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
      if (idx) {
        GLOBALS.marchSetsPoint('A_H5PT0075001465')   // H5平台-砸金蛋-点击有奖排行榜
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0075001464')   // H5平台-砸金蛋-点击获取锤子
      }
      this.handleTab(idx)
    },
    handleTab (idx) {
      this.isDropDown = true
      this.curIndex = idx
    },
    async init () {
      const { code, data } = await userInfo()
      if (code === 200) {
        this.remanentNum = data.remanentNum
        this.totalNum = data.totalNum
      }
    },
    close () {
      this.isDropDown = false
      if (this.curIndex) {
        GLOBALS.marchSetsPoint('A_H5PT0075001472')   // H5平台-砸金蛋-有奖排行榜大浮层-点击收起
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0075001469')   // H5平台-砸金蛋-获取锤子大浮层-点击收起
      }
      this.init()
      this.$emit('show-eggs-info')
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