<template>
  <article class="wrapper">
    <NavBar :is-back="false"
      title="常见问题Q&A" />
    <Card v-for="(item, index) in list"
      :key="index"
      :index="index+1"
      :info="item" />
  </article>
</template>

<script>
import NavBar from '../../components/navBar'
import Card from './components/card'
import { Faq } from '../../apis/user'

export default {
  data () {
    return {
      list: []
    }
  },
  async mounted () {
    const { data } = await Faq()
    this.list = data.data
  },
  components: {
    NavBar, Card
  }
}
</script>

<style lang="less" scoped>
.wrapper {
}
</style>
