<template>
  <main>
    <div @click="show=true">打的费撒的飞洒</div>
    <Dialog :show="show"
      title="dfsdfsa"
      cancel="cancel"
      confirm="<p style='color:red'>dfsdfsaaf</p>" />
  </main>
</template>

<script>
import Dialog from '../../components/dialog'

export default {
  data () {
    return {
      show: false
    }
  },
  components: {
    Dialog
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
