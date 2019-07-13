
<template>
  <div class="drop-down" v-if="isDropDown">
    <div class="pop-mask" @click.stop="close"></div>
    <transition name="fade">
      <div class="drop-down-content">
        <div class="d-tab">
          <ul>
            <li @click="handleTab(0)" :class="{'active':curIndex == 0}">获取锤子</li>
            <li @click="handleTab(1)" :class="{'active':curIndex == 1}">有奖排行榜</li>
          </ul>
        </div>
        <!-- 获取锤子组件 -->
        <getHammer v-if="curIndex == 0" />
        
        <!-- 排行榜 -->
        <profit v-if="curIndex == 1" />

        <!-- 右下角图标 -->
        <img src="./images/package/profit/icon-back.png" class="icon-back" @click.stop="close">
      </div>
    </transition>
  </div>
  <div class="bottom-wrap" v-else>
    <div @click="handleTab(0)">
      <div></div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div @click="handleTab(1)">
      <div></div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      curIndex: 0,
      isDropDown: false
    }
  },
  props: {

  },
  components: {
    getHammer: () => import('./component/getHammer'),
    profit: () => import('./component/profit')
  },
  mounted () {

  },
  methods: {
    handleTab (idx) {
      this.isDropDown = true
      this.curIndex = idx
    },
    close () {
      this.isDropDown = false
    }
  }
}
</script>
<style lang="less" scoped>
@import "./css/dropDown.less";
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
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