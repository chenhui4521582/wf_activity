<template>
  <section class="box-info">
    <img class="box-image" :src="info.color | boxImage(info.state)" alt="" />
    <div class="awards-info" v-if="info.state !== 1">
      <template v-if="info.state === 4">
        <img
          class="awards-image"
          :src="info.extend.awardsImage | imgFilter"
          alt=""
        />
        <p class="awards-name">{{ info.extend.awardsName }}</p>
        <section class="downTime-wrapper" v-if="isShow">
          {{ info.extend.expireSecond }}s
        </section>
      </template>
      <template v-else-if="info.state === 2">
        <p class="other-people">用户{{ info.extend.nickname }}正在透视</p>
      </template>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { boxGroup } from '../../../config/box';
export default {
  name: 'boxInfo',
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  filters: {
    boxImage (color, state) {
      let type = '';
      switch (state) {
        case 2:
        case 4:
          type = 'boxTransparent';
          break
        default:
          type = 'box';
          break
      }
      let index = boxGroup.findIndex(res => res.type === Number(color))
      return boxGroup[index][type]
    }
  },
  data () {
    return {
      isShow: false, // 控制显示结束或还未结束显示的内容
      timer: null
    }
  },

  mounted () {
    // 每一秒执行一次
    if (
      this.info.state === 4 &&
      this.info.extend &&
      this.info.extend.expireSecond &&
      this.info.extend.expireSecond > 0
    ) {
      this.isShow = true
      this.timer = setInterval(() => {
        this.info.extend.expireSecond--
        if (this.info.extend.expireSecond <= 0) {
          this.info.extend.expireSecond = 0
          this.isShow = false
          this.clearTimer()
          this.info.state = 1
          this.info.extend = null
        }
      }, 1000)
    }
  },
  methods: {
    clearTimer () {
      clearInterval(this.timer)
    }
  },
  destroyed () {
    this.clearTimer()
  }
}
</script>

<style lang="less" scoped>
.downTime-wrapper {
  font-size: 0.2rem;
  font-weight: bold;
  color: #fff;
  background: #ff1520;
  border-radius: 0.13rem;
  position: absolute;
  padding: 0.02rem 0.04rem;
  right: 0.1rem;
  top: -0.1rem;
}
.box-info {
  .box-image {
    height: 1.7rem;
    width: 1.46rem;
  }
  .awards-info {
    position: absolute;
    top: 0.6rem;
    left: 0;
    width: 100%;
    text-align: center;
    .awards-image {
      height: 0.96rem;
    }
    .awards-name {
      position: relative;
      white-space: nowrap;
      width: min-content;
      background: #fff;
      line-height: 0.26rem;
      border-radius: 0.13rem;
      color: #2a2d3c;
      font-weight: bold;
      font-size: 0.18rem;
      margin: -0.1rem auto 0;
      padding: 0 0.1rem;
      z-index: 1;
    }
    .other-people {
      margin: 0.2rem 0.14rem 0;
      color: #2a2d3c;
      background: #fff;
      border-radius: 0.13rem;
      font-size: 0.18rem;
      padding: 0.1rem;
    }
  }
}
</style>
