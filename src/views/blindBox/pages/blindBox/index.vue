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

  }
}
</script>

<style scoped lang="less">
@import "./index.less";
.main-wrapper {
  background: #f0ead1;
}
</style>
