<template>
  <div class="header-wap" v-if="isShowHeader">
    <div class="return-img" @click="returnPage">
      <i class="iconfont icon-return"></i>
    </div>
    <div class="title">{{title}}</div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    isShowHeader () {
      let APP_CHANNEL = localStorage.getItem('APP_CHANNEL') || 'default'
      // let noHeadChannels = ['100000', '100061', '100030', '100070', '100039']
      let noHeadChannels = ['100039']
      if (noHeadChannels.indexOf(APP_CHANNEL) > -1) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    returnPage () {
      this.$router.go(-1)
      this.$emit('on-back')
    }
  }
}
</script>
<style lang="less" scoped>
.header-wap {
  height: 0.9rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  padding: 0 0.3rem;
  color: #000;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  .return-img {
    position: absolute;
    top: 0;
    left: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 1rem;
    height: 0.94rem;
    box-sizing: border-box;
    z-index: 10;
    .iconfont {
      font-size: 0.3rem;
    }
  }
  .title {
    text-align: center;
    font-size: 0.32rem;
    font-weight: bold;
  }
}
</style>

