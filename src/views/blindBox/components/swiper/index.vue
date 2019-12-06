<template>
  <section class="container-swiper">
    <div class="track"
      ref="originTrack"
      :class="showCopyTrack ? '' : 'higher'"
      :style="trackStyles">
      <slot />
    </div>
    <div class="track"
      :class="showCopyTrack ? 'higher' : ''"
      :style="copyTrackStyles"
      ref="copyTrack">
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      currentIndex: 0,
      trackIndex: 0,
      copyTrackIndex: 0,
      trackHeight: 0,
      trackOffset: 0,
      trackCopyOffset: 0,
      showCopyTrack: false,
      slides: [],
      timer: null,
      hideTrackPos: -1 // 默认左滑
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
    // copy trackDom
    initCopyTrackDom () {
      this.$nextTick(() => {
        this.$refs.copyTrack.innerHTML = this.$refs.originTrack.innerHTML
      })
    },
    updateTrackPos (index) {
      if (this.showCopyTrack) {
        this.trackIndex = index
      } else {
        this.copyTrackIndex = index
      }
    },
    // 切换
    add (offset) {
      let slidesLen = this.slides.length
      if (offset > 0) {
        // 初始化左滑轨道位置
        this.hideTrackPos = -1
      } else {
        // 初始化右滑轨道位置
        this.hideTrackPos = slidesLen
      }
      this.updateTrackPos(this.hideTrackPos)
      // 获取当前展示图片的索引值
      const oldIndex = this.showCopyTrack ? this.copyTrackIndex : this.trackIndex
      let index = oldIndex + offset
      while (index < 0) index += slidesLen
      if (((offset > 0 && index === slidesLen) || (offset < 0 && index === slidesLen - 1))) {
        // 极限值（左滑：当前索引为总图片张数， 右滑：当前索引为总图片张数 - 1）切换轨道
        this.showCopyTrack = !this.showCopyTrack
        this.trackIndex += offset
        this.copyTrackIndex += offset
      } else {
        this.updateTrackIndex(index)
      }
      this.currentIndex = index === this.slides.length ? 0 : index
    },
    // 更新偏移位置
    updateOffset () {
      this.$nextTick(() => {
        let ofs = this.copyTrackIndex > 0 ? -1 : 1
        this.trackOffset = this.trackIndex * this.listHeight
        this.trackCopyOffset = this.copyTrackIndex * this.listHeight + ofs
      })
    },
    // 更新轮播位置
    updateTrackIndex (index) {
      if (this.showCopyTrack) {
        this.copyTrackIndex = index
      } else {
        this.trackIndex = index
      }
      this.currentIndex = index
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
    copyTrackStyles () {
      return {
        height: `${this.trackHeight}px`,
        transform: `translate3d(0px, ${-this.trackCopyOffset}px, 0px)`,
        transition: `transform 1000ms ${this.easing}`,
        position: 'absolute'
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
    },
    copyTrackIndex () {
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
  position: relative;
  .track {
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    visibility: hidden;
    &.higher {
      z-index: 2;
      visibility: visible;
    }
  }
}
</style>
