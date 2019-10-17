<template>
  <div id="app" class="turn-wrap">
    <div class="top">
      <span>限时福利 </span>剩余<em>6</em>天<em>23</em>小时<em>45</em>分
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    'rule': () => import('./components/rule.vue'),
    'turnpop': () => import('./components/turnpop')
  },
  mounted () {
  }
}
</script>
<style lang="less">
.bg-paved(@url) {
  background: url(@url) no-repeat center / 100% 100%;
}
.turn-wrap {
  .top {
    background: ;
  }
}
</style>
