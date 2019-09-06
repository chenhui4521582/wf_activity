<template>
  <div class="modal-warp">
    <transition name="mask">
      <div class="modal-mask"></div>
    </transition>
    <!--<img src="./images/shine.png" alt="" class="shine">-->
    <div class="modal-content">
      <div class="content">
        <div class="img">
          <img :src="awards.awardsImage|filter" alt="" v-if="!awardsImage">
          <img :src="awardsImage" alt="" v-else>
        </div>
        <p v-if="awards.awardsNum&&awards.awardsNum>1" class="award-name">{{awards.awardsName}}x{{awards.awardsNum}}</p>
        <p v-else class="award-name">{{awards.awardsName}}</p>
      </div>
      <div class="footer-warp">
        <div class="btn" @click="close(0)">{{btnName}}</div>
        <div class="info">{{info}}</div>
      </div>
      <div class="close" @click="close(1)"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'taskAwardPop',
  data () {
    return {
    }
  },
  props: {
    awards: {
      type: Object,
      default: {}
    },
    btnName: {
      default: '朕收下啦'
    },
    info: {
      default: '完成每日任务，领更多红包'
    },
    awardsImage: {
      default: ''
    }
  },
  methods: {
    // 关闭弹框
    close (flag) {
      this.$emit('close', !!flag)//true 关闭按钮
    },
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}

.modal-mask {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
}
.modal-content {
  position: fixed;
  width: 5.3 * 0.9rem;
  height: 5.8 * 0.9rem;
  z-index: 10;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: url("./images/bg.png") no-repeat;
  background-size: 100% 100%;
}

.shine {
  position: fixed;
  top: 4rem;
  left: 50%;
  z-index: 10;
  width: 130%;
  animation: rotate 2s linear infinite;
}
.content {
  height: 1.92 * 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 1.43 * 0.9rem 0 0.74 * 0.9rem;
  .img {
    width: 1.48 * 0.9rem;
    height: 1.48 * 0.9rem;
    background: rgba(34, 36, 51, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
    }
  }
  .award-name {
    font-size: 0.36 * 0.9rem;
    font-weight: bold;
    color: rgba(235, 66, 61, 1);
  }
}

.footer-warp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .btn {
    width: 3.36 * 0.9rem;
    height: 0.76 * 0.9rem;
    line-height: 0.76 * 0.9rem;
    background: url("./images/btn.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 0.23 * 0.9rem;
    text-align: center;
    font-size: 0.3 * 0.9rem;
    font-weight: bold;
    color: rgba(187, 45, 1, 1);
  }
  .info {
    font-size: 0.26 * 0.9rem;
    font-weight: 500;
    color: rgba(255, 239, 224, 1);
  }
}

.close {
  position: absolute;
  bottom: -1 * 0.9rem;
  left: 0;
  right: 0;
  margin: auto;
  width: 0.6 * 0.9rem;
  height: 0.6 * 0.9rem;
  background: url("./images/close.png") no-repeat;
  background-size: 100% 100%;
  z-index: 11;
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

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>


