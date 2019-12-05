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
.blind-box-wrap {
  background: #1b1f29;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 1.2rem;
  .main-wrapper {
    background: #f0ead1;
  }
}

div,
section {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
