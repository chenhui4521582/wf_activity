<template>
  <article>
    <NavBar title="积分中心"  @back="$router.go(-1)" />
    <MyScore />
  </article>
</template>

<script>
import NavBar from '../../components/navBar'
import MyScore from './components/my-score'

export default {
  components: {
    NavBar,
    MyScore
  }
}
</script>

<style lang="less" scoped>
</style>
