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
  }
}
</script>
