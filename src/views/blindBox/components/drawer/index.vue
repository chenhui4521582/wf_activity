<template>
  <main>
    <article class="mask"
      v-if="show">
    </article>
    <transition name="fade">
      <section class="content"
        v-if="show">
        <img v-if="close"
          @click="$emit('onClose')"
          class="close"
          src="./assets/close.png"
          alt="关闭">
        <div v-if="title">
          <slot name='header'>
            <div class="title">{{title}}</div>
          </slot>
        </div>
        <slot />
        <slot name='footer'>
          <div class="footer">
            <div class="button"
              v-if="cancel"
              v-html="cancel"
              @click="$emit('onCancel')">{{cancel}}</div>
            <div class="button"
              :style="{width:cancel?'50%':'100%'}"
              v-if="confirm"
              v-html="confirm"
              @click="$emit('onConfirm')"></div>
          </div>
        </slot>
      </section>
    </transition>
  </main>
</template>

<script>
export default {
  props: {
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
    confirm: {
      type: String
    },
    cancel: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.4s;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(100%);
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
  align-items: flex-end;
}
.content {
  width: 100%;
  background: #fff;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9999;
  .close {
    position: absolute;
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
      content: "";
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
