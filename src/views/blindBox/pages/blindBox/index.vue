<template>
  <main class="blind-box-wrap">
    <current-product-list></current-product-list>
  </main>
</template>

<script>
import Dialog from '../../components/dialog'
import currentProductList from './components/currentProductList'

export default {
  data () {
    return {
      show: false
    }
  },
  components: {
    Dialog, currentProductList
  },
  methods: {
  },
  mounted () {

  }
}
</script>

<style scoped lang="less">
@import "./index.less";
</style>
