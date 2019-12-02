<template>
  <section class="current-product-list">
    <p>
      <span>本期明星产品</span>
      <router-link to="/allProducts">更多奖品>></router-link>
    </p>
    <ul class="product-list">
      <li v-for="(item,index) in products"
        :key="`product-${index}`">
        <img :src="item.awardsImage|imgFilter"
          alt="">
        <span>{{item.awardsName}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { awardsList } from '../../../apis/products'
export default {
  name: '',
  components: {

  },
  data () {
    return {
      products: []
    }
  },
  mounted () {
    this.getProductInfo()
  },
  methods: {
    async getProductInfo () {
      const res = await awardsList()
      const { data } = res.data
      this.products = data && data.slice(0, 4) || []
    }
  }
}
</script>

<style lang="less" scoped>
.current-product-list {
  padding: 0.32rem;
  color: #fff;
  font-size: 0.24rem;
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;
    a {
      color: #fee994;
    }
  }
  ul {
    display: flex;
    align-items: center;
    margin: 0 -0.16rem;
    li {
      flex: 1;
      height: 1.12rem;
      background: #6e7588;
      border-radius: 0.1rem;
      margin: 0 0.16rem;
      font-size: 0.18rem;
      position: relative;
      overflow: hidden;
      text-align: center;
      padding-top: 0.04rem;
      box-sizing: border-box;
      img {
        max-height: 100%;
        max-width: 100%;
      }
      span {
        position: absolute;
        width: 100%;
        text-align: center;
        bottom: 0;
        left: 0;
        height: 0.3rem;
        line-height: 0.3rem;
        background: #f2db8f;
        color: #2a2e3a;
      }
    }
  }
}
</style>
