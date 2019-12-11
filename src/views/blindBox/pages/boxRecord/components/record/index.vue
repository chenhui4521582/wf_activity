<template>
  <article class="wrapper-record">
    <section v-if="goodsList && goodsList.length > 0">
      <Goods v-for="(item,index) in goodsList"
        :key="index"
        :goods="item">
        <p class="goods-time"
          slot="left">开盒时间：{{item.openTime }}</p>
      </Goods>
    </section>
    <Default @onConfirm="onConfirm"
      v-if="goodsList && goodsList.length === 0" />
  </article>
</template>

<script>
import Goods from '../../../../components/goods'
import Default from '../../../../components/default'
import { OpenList } from '../../../../apis/user'

export default {
  data () {
    return {
      goodsList: null
    }
  },
  methods: {
    onConfirm () {
      GLOBALS.marchSetsPoint('A_H5PT0225002592')
      this.$router.push({
        name: 'Index'
      })
    }
  },
  async mounted () {
    ({ data: { data: this.goodsList } } = await OpenList())
  },
  components: {
    Goods,
    Default
  }
}
</script>

<style lang="less" scoped>
.wrapper-record {
  padding-top: 0.31rem;
  background: rgb(238, 238, 238);
  .goods-time {
    margin-top: 0.09rem;
  }
}
</style>
