<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
      <!-- <keep-alive> -->
        <router-view/>
      <!-- </keep-alive> -->
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: "thisisroot",
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 200ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  // transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  // transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  // transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  // transform: translate3d(-100%, 0, 0);
}
</style>
