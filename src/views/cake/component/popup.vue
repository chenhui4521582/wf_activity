<template>
  <article class="popup-wrapper">
    <section class="mask"></section>
    <section class="content" :class="`type-${type}`">
      <template v-if="type === 0">

      </template>
    </section>
  </article>
</template>

<script>
import { GetMallProductList } from '../services/api'
import _get from 'lodash.get'
export default {
  name: '',
  components: {

  },
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      productList: []
    }
  },
  mounted () {
    if (this.type === 0) {
      this.getMallProductList()
    }
  },
  methods: {
    async getMallProductList () {
      const res = await GetMallProductList()
      this.productList = _get(res, 'data.mallBizConfigs', [])
    }
  }
}
</script>

<style lang="less" scoped>
.popup-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
</style>
