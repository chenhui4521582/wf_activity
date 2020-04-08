<template>
  <div class="product-list">
    <Header title="话费券当钱花"/>
    <div class="banner">
      <img src="./img/banner.png" alt="">
    </div>
    <div class="nav">

    </div>
    <div class="list">
      <list-item />
    </div>
  </div>
</template>
<script>
import ListItem from './components/listItem'
export default {
  name: 'productList',
  data: () => ({
    nav: ['']
  }),
  components: {
    ListItem
  }
}
</script>
<style lang="less" scoped>
img {
  width: 100%;
  height: 100%;
  vertical-align: top;
}
</style>