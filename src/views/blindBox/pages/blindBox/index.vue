<template>
  <main class="blind-box-wrap">
    <current-product-list></current-product-list>
    <box-list></box-list>
  </main>
</template>

<script>
import Dialog from '../../components/dialog'
import currentProductList from './components/currentProductList'
import boxList from './components/boxList'

export default {
  data () {
    return {
      show: false
    }
  },
  components: {
    Dialog, currentProductList, boxList
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
