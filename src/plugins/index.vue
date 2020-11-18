<template>
  <transition name="fadeIn">
    <div class="alertBox" v-show="show">
      <div class="alert-mask" v-show="isShowMask"></div>
      <div class="box" :class="{oneline:isOneLine}" v-show="show">
        {{message}}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      Timeout: null
    }
  },
  props: {
    show: { // 是否显示此toast
      default: false
    },
    message: { // 提醒文字
      default: '加载中'
    },
    isShowMask: { // 是否显示遮罩层
      default: false
    },
    duration: { // 显示时间
      type: Number,
      default: 3000
    },
    isOneLine: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.box {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 0 0.3rem;
  min-width: 1.5rem;
  /*height: .7rem;*/
  line-height: 0.4rem;
  border-radius: 0.1rem;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  color: #fff;
  font-size: .16rem;
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.oneline {
  white-space: nowrap;
}
.alert-mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 4999;
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.3s;
}
.fadeIn-enter,
.fadeIn-leave-active {
  opacity: 0;
}
</style>
