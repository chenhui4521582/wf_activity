<template>
  <main id="app">
    <router-view></router-view>
  </main>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {

  },
  async mounted () {

  },
  watch: {
    $route (to, from) {
      /* 路由发生变化修改页面title */
      if (to.meta.title) {
        document.title = to.meta.title
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../common/css/base.css";
</style>
