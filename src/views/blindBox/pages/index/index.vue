<template>
  <article>
    <router-view></router-view>
    <TabBar />
  </article>
</template>

<script>
import TabBar from '../../components/tabBar'

export default {
  components: {
    TabBar
  }
}
</script>
