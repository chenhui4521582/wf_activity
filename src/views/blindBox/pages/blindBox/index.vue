<template>
  <main class="blind-box-wrap">
    <current-product-list></current-product-list>
    <div class="main-wrapper">
      <horn-and-more></horn-and-more>
      <box-list></box-list>
    </div>
  </main>
</template>

<script>
/* eslint-disable no-undef */
import currentProductList from './components/currentProductList'
import hornAndMore from './components/hornAndMore'
import boxList from './components/boxList'

export default {
  data () {
    return {
      show: false
    }
  },
  components: {
    currentProductList, hornAndMore, boxList
  },
  methods: {
  },
  mounted () {
    GLOBALS.marchSetsPoint('P_H5PT0225', {
      source_address: GLOBALS.getUrlParam('from') || null
    }) // H5平台-盲盒页面加载完成
  }
}
</script>

<style scoped lang="less">
.blind-box-wrap {
  background: #1b1f29;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  .main-wrapper {
    // background: #f0ead1;
    display: flex;
    flex: 1;
    flex-direction: column;
  }
}

div,
section {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
