<template>
  <main id="app">
    <router-view></router-view>
  </main>
</template>

<script>

export default {
  data () {
    return {
      openTimer: null,
      transTimer: null
    }
  },
  components: {
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style scoped lang="less">
@import "../../common/css/base.css";
</style>
