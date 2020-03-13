<template>
  <article class="wrapper">
    <NavBar @back="$router.go(-1)"
      title="常见问题Q&A" />
      <Card />
  </article>
</template>

<script>
import NavBar from '../../components/navBar'
import Card from './components/card'

export default {
  mounted () {

  },
  components: {
    NavBar, Card
  }
}
</script>

<style lang="less" scoped>
.wrapper {

}
</style>
