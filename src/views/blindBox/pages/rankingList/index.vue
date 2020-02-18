<template>
  <article class="wrapper">
    <List />
    <footer class="footer">
      <img @click="toIndex"
        class="open"
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
  },
  mounted () {
     GLOBALS.marchSetsPoint('A_H5PT0225002852')
  },
  methods: {
    toIndex () {
      GLOBALS.marchSetsPoint('A_H5PT0225002853')
      this.$router.push({
        name: 'Index'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  color: #888888;
  font-size: 0.22rem;
  padding-bottom: 2.28rem;
  height: 100vh;
  overflow: scroll;
  background: #eeeeee;
  position: relative;
  overflow: scroll;
  box-sizing: border-box;
  .footer {
    padding: 0.95rem 0 0.52rem;
    background: #eeeeee;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .open {
      margin: 0 auto;
      width: 3.31rem;
      height: 0.81rem;
    }
  }
}
</style>
