<template>
  <article class="wrapper">
    <NavBar @back="$router.go(-1)"
      title="开盒记录" />
    <Record class="container" />
  </article>
</template>

<script>
import NavBar from '../../components/navBar'
import Record from './components/record'

export default {
  components: {
    NavBar,
    Record
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
    overflow: scroll;
  }
}
</style>
