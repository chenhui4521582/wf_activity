<template>
  <article class="wrapper">
    <NavBar @back="$router.go(-1)"
      title="我的奖品" />
    <TabBar class="container" />
  </article>
</template>

<script>
import NavBar from '../../components/navBar'
import TabBar from './components/tabBar'

export default {
  components: {
    NavBar,
    TabBar
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .container {
    flex: 1;
  }
}
</style>
