<template>
  <div class="base-header">
    <div class="return-next" @click="goHistory" v-if="!isMiniWap"> <img src="../../images/newback.png" alt=""></div>
    <span v-if="!isMiniWap">{{title}}</span>
  </div>
</template>
<script>
import { getUrlParam } from "../../utils/common"
export default {
  name: 'baseHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    accountBalance: {
      default: 0
    }
  },
  computed: {
    isMiniWap () {
      return getUrlParam('from') === 'miniWap'
    }
  },
  methods: {
    goHistory () {
      GLOBALS.marchSetsPoint('A_H5PT0035000632', {
        residual_phone: this.accountBalance
      })
      history.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.base-header {
  height: 0.8rem;
  width: 100%;
  position: relative;
  text-align: center;
  font-size: 0.32rem;
  line-height: 0.8rem;
  color: #ffffff;
  font-weight: 500;
  .return-next {
    position: absolute;
    height: 0.8rem;
    width: 0.8rem;
    top: 0;
    text-align: left;
    img {
      width: 0.3rem;
    }
  }
}
</style>


