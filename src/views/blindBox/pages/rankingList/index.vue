<template>
  <article class="wrapper">
    <List />
    <footer class="footer">
      <img @click="$router.push({
        name: 'Index'
      })" class="open"
        src="./assets/open.png"
        alt="">
    </footer>
  </article>
</template>

<script>
import List from './components/list'

export default {
  components: {
    List
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  color: #888888;
  font-size: 0.22rem;
  padding-bottom: 1.73rem;
  height: 100vh;
  overflow: scroll;
  background: #eeeeee;
  position: relative;
  overflow: scroll;
  box-sizing: border-box;
  .footer {
    padding: .4rem 0 .52rem;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .open {
      margin: 0 auto;
      width: 3.31rem;
      height: .81rem;
    }
  }
}
</style>
