<template>
  <div @click="$emit('confirm')"
    class="button"
    :style="buttonStyle"
    :class="breathe?'breathe':''">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    breathe: {
      type: Boolean,
      default: false
    },
    buttonStyle: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes breathe {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.button {
  width: 3.3rem;
  line-height: 0.8rem;
  border-radius: 0.4rem;
  color: #7b4913;
  font-size: 0.36rem;
  text-align: center;
  background: linear-gradient(90deg, #ffeab5, #dbbd6e);
  &.breathe {
    animation: breathe 1s infinite;
  }
}
</style>
