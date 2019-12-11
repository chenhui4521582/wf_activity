<template>
  <section class="box-loading__section">
    <div class="loading__div">
      <slot class="loading-content"><img class="loading__img"
          src="./assets/loading.svg"></slot>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(-50%, -50%, 0) rotate(180deg);
  }
  to {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}

.box-loading__section {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  color: #fff;
  font-size: 16px;
  .loading__div {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading__img {
      width: 1rem;
      height: 1rem;
      position: absolute;
      left: 50%;
      top: 50%;
      animation: rotate 1s linear infinite;
    }
  }
}
</style>
