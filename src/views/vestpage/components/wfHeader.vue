<template>
  <div class="header-wap" :style="{backgroundColor: bgColor}">
    <div class="return-img" @click="returnPage" v-if="showBack">
      <i class="iconfont icon-return"></i>
    </div>
    <slot>
      <div class="title">{{title}}</div>
    </slot>
  </div>
</template>
<script>
export default {
  name: "wfHeader",
  props: {
    title: {
      type: String,
      default: ""
    },
    customize: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: '#FFFFFF'
    },
    showBack: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({

  }),
  methods: {
    returnPage () {
      if (this.customize) {
        this.$emit("on-click")
      } else {
        this.$router.go(-1)
        this.$emit("on-back")
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.header-wap {
  height: 100*.01rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  padding: 0 30*.01rem;
  color: #202020;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .return-img {
    position: absolute;
    top: 0;
    left: 30*.01rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100*.01rem;
    height: 94*.01rem;
    box-sizing: border-box;
    z-index: 10;
    .iconfont {
      font-size: 30*.01rem;
    }
  }
  .title {
    text-align: center;
    font-size: 32*.01rem;
    font-weight: bold;
  }
}
</style>

