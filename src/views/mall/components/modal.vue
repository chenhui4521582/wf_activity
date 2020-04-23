<template>
  <div class="modal-warp" v-show="show">
    <transition name="mask">
      <div class="modal-mask" v-show="show"></div>
    </transition>
    <div class="modal-content" :class="{'showWidth':isWidth}">
      <div class="header">
        <span>{{title}}</span>
      </div>
      <div class="content" :class="{'line': type==2}">
        <slot></slot>
      </div>
      <div class="footer-warp" v-if="type == 1 && buttonShow">
        <slot name="footer">
          <wf-button v-if="saveButtonShow" :long=true @click="save">{{saveText}}</wf-button>
        </slot>
      </div>
      <div class="btns" v-if="type == 2 && buttonShow">
        <slot name="footer">
          <div class="btn cancel" v-if="closeButtonShow" @click="close">{{closeText}}</div>
          <div class="btn confirm" v-if="saveButtonShow" @click="save">{{saveText}}</div>
        </slot>
      </div>
      <slot name="other"></slot>
      <div class="close-icon" v-if="type == 1 && closeIconShow" @click="closeModal"><i
          class="iconfont icon-close"></i></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  data () {
    return {
      show: this.value
    }
  },
  props: {
    isWidth: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    type: {
      default: 1
    },
    title: {
      type: String,
      default: '我是标题'
    },
    closeText: {
      type: String,
      default: '取消'
    },
    closeIconShow: {
      type: Boolean,
      default: true
    },
    closeButtonShow: {
      type: Boolean,
      default: true
    },
    saveText: {
      type: String,
      default: '确认'
    },
    saveButtonShow: {
      type: Boolean,
      default: true
    },
    buttonShow: {
      type: Boolean,
      default: true
    },
    buttonOptions: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    closeModal () {
      this.show = false
      this.$emit('on-close')
    },
    // 关闭弹框
    close () {
      this.show = false
      this.$emit('on-close')
    },
    // 确认按钮
    save () {
      this.$emit('on-save')
    },
    ScrollNoMove () {
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', this.move, { passive: false })
    },
    ScrollMove () {
      document.body.style.overflow = null
      document.removeEventListener('touchmove', this.move, { passive: false })
    }
  },
  watch: {
    value (newValue) {
      this.show = newValue
    }
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.modal-warp {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
}
.modal-mask {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}
.modal-content {
  position: absolute;
  width: 4.7rem;
  &.showWidth {
    width: 6rem;
  }
  min-height: 2rem;
  z-index: 2;
  background-color: #ffffff;
  border-radius: 0.32rem;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;

  &.showWidth {
    width: 6rem;
  }

  .header {
    margin-top: 0.36rem;
    height: 0.4rem;
    width: 100%;
    position: relative;
    font-size: 0.28rem;
    font-weight: bold;
    color: #000000;
    line-height: 0.4rem;
    text-align: center;
  }
  .content {
    padding: 0.08rem 0.3rem 0.23rem;
    &.line {
      border-bottom: 1px solid #eee;
    }
  }
  .footer-warp {
    margin-bottom: 0.3rem;
    height: 0.7rem;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 0 0.3rem;
  }
  .btns {
    height: 0.9rem;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: center;
    .btn {
      margin: 0 0.1rem;
      width: 100%;
      height: 0.9rem;
      line-height: 0.9rem;
      font-size: 0.24rem;
    }
    .cannel {
      color: #000000;
    }
    .confirm {
      color: #ff4141;
    }
  }
  .close-icon {
    position: absolute;
    height: 0.4rem;
    width: 0.4rem;
    top: 0.15rem;
    right: 0.2rem;
    text-align: center;
    line-height: 0.4rem;
    i {
      font-size: 0.18rem;
      color: #888888;
    }
  }
}
// 动画
.mask-enter {
  opacity: 0;
}
.mask-enter-active {
  transition: opacity 0.3s;
}
.mask-leave-to {
  opacity: 0;
}
.mask-leave-active {
  transition: opacity 0.3s;
}
</style>


