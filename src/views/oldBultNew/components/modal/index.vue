<template>
  <article v-show="show"
    class="mask">
    <transition name="bounce">
      <section v-if="show"
        class="content"
        :style="layout">
        <img @click.self="$emit('onClose')"
          class="close"
          src="./assets/close.png"
          alt="关闭">
        <slot />
      </section>
    </transition>
  </article>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    layout: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.bounce-enter-active {
  animation: bounce 0.3s;
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
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
  width: 4.7rem;
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
}
</style>
