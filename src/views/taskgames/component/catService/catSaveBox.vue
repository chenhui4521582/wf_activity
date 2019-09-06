<template>
  <section>
    <div class="entrance-header-item" @click="showPop=true">
      <img class="entrance-header-img" src="../../images/cat_supply/biaoxianbox.png">
      <div class="entrance-header-text">保险箱</div>
    </div>
    <!-- <common-pop v-if="showPop" @close="showPop = false"></common-pop> -->
  </section>
</template>

<script>
export default {
  name: '',
  components: {
    commonPop: () => import('../commonPop')
  },
  data () {
    return {
      showPop: false
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.entrance-header-item {
  font-size: 0.16rem;
  font-weight: 400;
  color: rgba(239, 196, 90, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 0.6rem;
  .entrance-header-img {
    width: 0.4rem;
    height: 0.4rem;
  }
  &:nth-child(3) {
    color: rgba(88, 114, 163, 1);
  }
}
</style>
