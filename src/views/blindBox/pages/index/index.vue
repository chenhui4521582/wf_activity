<template>
  <article>
    <router-view></router-view>
    <TabBar />
    <share />
  </article>
</template>

<script>
import TabBar from '../../components/tabBar'
import Share from '../../components/share/share'
export default {
  components: {
    TabBar,
    Share
  },
  mounted () {
  }
}
</script>
