
<template>
  <div>
    <div class="pop-mask" v-if="isDropDown"></div>
    <transition name="fade">
      <div class="drop-down" v-if="isDropDown">
        <div class="drop-down-content">
          <div class="d-tab">
            <ul>
              <li @click="handleTab(0)" :class="{'active':curIndex == 0}">获取锤子</li>
              <li @click="handleTab(1)" :class="{'active':curIndex == 1}">有奖排行榜</li>
            </ul>
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
      <div class="tab get-hammer" @click="handleTab(0)">
        <div class="hammer_icon"></div>
        <div class="right">
          <div class="main-text">剩余锤子<span>{{remanentNum}}</span></div>
          <div class="btn">获取锤子</div>
        </div>
      </div>
      <div class="tab profit" @click="handleTab(1)">
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