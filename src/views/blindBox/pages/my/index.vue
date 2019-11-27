<template>
  <article class="wrapper">
    <Account />
    <RowGroup />
  </article>
</template>

<script>
import Account from './components/account'
import RowGroup from './components/rowGroup'

export default {
  components: {
    RowGroup,
    Account
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 100vh;
  background: rgb(238, 238, 238);
}
</style>
