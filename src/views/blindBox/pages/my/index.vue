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
  },
  mounted () {
    GLOBALS.marchSetsPoint("A_H5PT0225002567") // H5平台-盲盒页面-我的页面加载完成
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 100vh;
  background: rgb(238, 238, 238);
}
</style>
