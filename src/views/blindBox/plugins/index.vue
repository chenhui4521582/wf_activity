<template>
  <transition name="fadeIn">
    <div class="scoreBox"
      v-show="show">
      <div class="alert-mask"
        v-show="isShowMask"></div>
      <div class="box"
        v-show="show">
        <img class="icon" src="./assets/icon.png" alt="">
        <span>{{message}}</span>
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
    }
  },
  mounted () {
  },
  watch: {
    show (val) {
      if (val) {
        clearTimeout(this.Timeout)
        this.Timeout = setTimeout(() => {
          clearTimeout(this.Timeout)
          this.show = false
        }, this.duration || 3000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 0.42rem 0.56rem;
  border-radius: 0.16rem;
  transform: translate(-50%, -50%);
  background: url("./assets/bg.png");
  background-size: 100% 100%;
  text-align: center;
  color: #7b4913;
  font-size: 0.3rem;
  z-index: 5000;
  display: flex;
  align-items: center;
  .icon {
    width: 0.35rem;
    margin-right: 0.07rem;
  }
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
