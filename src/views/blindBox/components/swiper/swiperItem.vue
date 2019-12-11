<template>
  <div :style="styles"
    class="swiper-item">
    <slot />
  </div>
</template>

<script>
export default {
  data () {
    return {
      height: 'auto'
    }
  },
  computed: {
    styles () {
      return {
        height: `${this.height}px`
      }
    }
  },
  watch: {
    width (val) {
      if (val) {
        this.$nextTick(() => {
          this.$parent.initCopyTrackDom()
        })
      }
    },
    height (val) {
      if (val) {
        this.$nextTick(() => {
          this.$parent.initCopyTrackDom()
        })
      }
    }
  }
}
</script>
