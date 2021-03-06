<template>
  <transition :name="animationName">
    <article @click="$emit('mask')" v-if="show" class="mask">
      <section class="content" :style="layout">
        <img v-if="close" @click.self="$emit('onClose')" class="close" src="./assets/close.png"
          alt="关闭">
        <slot name='header'>
          <div class="title" :style="titleStyle">{{title}}</div>
        </slot>
        <slot />
        <slot name='footer'>
          <div v-if="cancel || confirm" class="footer">
            <div class="button" v-if="cancel" v-html="cancel" @click="$emit('onCancel')"></div>
            <div class="button" :style="{width:cancel?'50%':'100%'}" v-if="confirm" v-html="confirm"
              @click="$emit('onConfirm')"></div>
          </div>
        </slot>
      </section>
    </article>
  </transition>
</template>

<script>
export default {
  props: {
    animationName: {
      type: String,
      default: 'fade'
    },
    close: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    title: {
      type: String
    },
    layout: {
      type: Object
    },
    confirm: {
      type: String
    },
    cancel: {
      type: String
    },
    titleStyle: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.scalc-leave-active {
  transform-origin: 0.8rem calc(~'100% - 4rem') 0;
  animation: scalcAnimation 0.5s ease-in-out;
}
.scalc-enter-active {
  transform-origin: 0.8rem calc(~'100% - 4rem') 0;
  animation: scalcAnimation 0.5s ease-in-out reverse;
}
@keyframes scalcAnimation {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
.mask {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  width: 4.72rem;
  border-radius: 0.32rem;
  background: #fff;
  text-align: center;
  position: relative;
  z-index: 999;
  box-sizing: border-box;
  .close {
    position: absolute;
    z-index: 99999;
    top: 0.26rem;
    right: 0.2rem;
    width: 0.18rem;
  }
  .title {
    font-size: 0.28rem;
    color: #000;
    font-weight: bold;
    padding: 0.39rem 0;
  }
  .footer {
    position: relative;
    font-size: 0.24rem;
    line-height: 0.9rem;
    display: flex;
    &::before {
      content: '';
      width: 200%;
      height: 1px;
      background: #eeeeee;
      transform: scale(0.5);
      position: absolute;
      top: 0;
      left: -50%;
    }
    .button {
      flex: 1;
    }
  }
}
</style>
