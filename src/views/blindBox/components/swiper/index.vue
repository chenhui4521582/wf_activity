<template>
  <section class="container-swiper">
    <div class="track"
      :style="trackStyles">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      trackIndex: 0,
      trackHeight: 0,
      trackOffset: 0,
      slides: [],
      timer: null
    }
  },
  props: {
    easing: {
      type: String,
      default: 'ease'
    },
    autoplaySpeed: {
      type: Number,
      default: 1000
    }
  },
  methods: {
    // 查找子组件
    findChild (cb) {
      const find = (child) => {
        cb.call(this, child)
      }
      this.$children.forEach((child) => {
        find(child)
      })
    },
    // 初始化slides
    initSlides () {
      let slides = []
      let index = 1
      this.findChild(child => {
        slides.push({
          $el: child.$el
        })
        child.index = index++
        child.height = this.listHeight
      })
      this.slides = slides
      const slidesLength = this.slides.length || 0
      this.trackHeight = slidesLength * this.listHeight
    },
    // 切换
    add (offset) {
      // 获取当前展示图片的索引值
      const oldIndex = this.trackIndex
      let index = oldIndex + offset
      this.updateTrackIndex(index)
    },
    // 更新偏移位置
    updateOffset () {
      this.$nextTick(() => {
        this.trackOffset = this.trackIndex * this.listHeight
      })
    },
    // 更新轮播位置
    updateTrackIndex (index) {
      if (this.trackIndex <= this.slides.length - 1) this.trackIndex = index
      else window.clearInterval(this.timer)
    },
    // 自动播放
    setAutoplay () {
      if (this.timer) window.clearInterval(this.timer)
      this.timer = window.setInterval(() => {
        this.add(1)
      }, this.autoplaySpeed)
    }
  },
  beforeDestroy () {
    if (this.timer) window.clearInterval(this.timer)
  },
  computed: {
    trackStyles () {
      const visibleStyle = this.trackIndex === -1 ? 'hidden' : 'visible'
      return {
        height: `${this.trackHeight}px`,
        transform: `translate3d( 0px, ${-this.trackOffset}px,0px)`,
        transition: `transform 1000ms ${this.easing}`,
        visibility: visibleStyle
      }
    },
    listHeight () {
      const computedStyle = document.defaultView.getComputedStyle(this.$el, '')
      return this.$el.style.height || computedStyle ? parseFloat(computedStyle['height']) : null
    }
  },
  watch: {
    trackIndex () {
      this.updateOffset()
    }
  },
  mounted () {
    this.initSlides()
    this.setAutoplay()
  }
}
</script>

<style lang="less" scoped>
.container-swiper {
  overflow: hidden;
  display: block;
  height: 100%;
  .track {
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
