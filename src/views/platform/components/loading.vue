<template lang="html">
<transition>
    <div v-if="show" :class="{'loading-wrap': !smaller}">
        <div class="load-container">
            <div class="loading">
            </div>
        </div>
    </div>
</transition>
</template>

<script>
export default {
  props: {
    smaller: Boolean,
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 15;
}

.load-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  -webkit-border-radius: 10%;
}

.spinner {
  height: 40%;
  width: 40%;
  position: relative;
  margin: 0 auto;
}
.loading {
  /*固定loading*/
  position: fixed;
  top: 50%;
  left: 50%;
  /*垂直水平居中*/
  margin: -20px 0 0 -20px;
  width: 40px;
  height: 40px;
  border: 2px solid;
  border-color: #d73c1e #d73c1e transparent;
  border-radius: 50%;
  box-sizing: border-box;
  /*动画时间1s，线性变化，无限循环*/
  animation: loading 1s linear infinite;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner div {
  width: 10%;
  height: 26%;
  background-color: white;
  position: absolute;
  left: 44.5%;
  top: 37%;
  opacity: 0;
  -webkit-border-radius: 30%;
  -webkit-animation: fade 1s linear infinite;
}

.spinner div.bar1 {
  -webkit-transform: rotate(0deg) translate(0, -142%);
  -webkit-animation-delay: 0s;
}

.spinner div.bar2 {
  -webkit-transform: rotate(30deg) translate(0, -142%);
  -webkit-animation-delay: -0.9167s;
}

.spinner div.bar3 {
  -webkit-transform: rotate(60deg) translate(0, -142%);
  -webkit-animation-delay: -0.833s;
}

.spinner div.bar4 {
  -webkit-transform: rotate(90deg) translate(0, -142%);
  -webkit-animation-delay: -0.75s;
}

.spinner div.bar5 {
  -webkit-transform: rotate(120deg) translate(0, -142%);
  -webkit-animation-delay: -0.667s;
}

.spinner div.bar6 {
  -webkit-transform: rotate(150deg) translate(0, -142%);
  -webkit-animation-delay: -0.5833s;
}

.spinner div.bar7 {
  -webkit-transform: rotate(180deg) translate(0, -142%);
  -webkit-animation-delay: -0.5s;
}

.spinner div.bar8 {
  -webkit-transform: rotate(210deg) translate(0, -142%);
  -webkit-animation-delay: -0.41667s;
}

.spinner div.bar9 {
  -webkit-transform: rotate(240deg) translate(0, -142%);
  -webkit-animation-delay: -0.333s;
}

.spinner div.bar10 {
  -webkit-transform: rotate(270deg) translate(0, -142%);
  -webkit-animation-delay: -0.25s;
}

.spinner div.bar11 {
  -webkit-transform: rotate(300deg) translate(0, -142%);
  -webkit-animation-delay: -0.1667s;
}

.spinner div.bar12 {
  -webkit-transform: rotate(330deg) translate(0, -142%);
  -webkit-animation-delay: -0.0833s;
}

@-webkit-keyframes fade {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 0.25;
  }
}
</style>
