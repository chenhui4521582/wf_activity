<template>
  <article class="wrapper-record">
    <Goods v-for="(item,index) in goodsList"
      :key="index"
      :goods="item">
      <p class="goods-time"
        slot="left">开盒时间：{{item.time}}</p>
    </Goods>
  </article>
</template>

<script>
import Goods from '../../../../components/goods'

export default {
  data () {
    return {
      goodsList: [
        {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        },
        {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        }, {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        }, {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        }, {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        }, {
          name: 'iphone11手机',
          count: 1,
          time: '2019.11.18',
          img: ''
        }
      ]
    }
  },
  components: {
    Goods
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
