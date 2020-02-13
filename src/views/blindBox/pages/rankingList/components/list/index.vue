<template>
  <section ref="area"
    class="container">
    <div ref="group">
      <p class="title">以下是在盲盒抽中明星奖品的用户</p>
      <User refs="group"
        v-for="item in users"
        :key="item" />
      <p v-if="!isLoading && !finished"
        class="load">向上滑动加载更多<img src="./assets/up.png"
          alt=""></p>
      <p class="load"
        v-if="isLoading || finished">{{loading}}</p>
    </div>
  </section>
</template>

<script>
import User from '../user'

export default {
  components: {
    User
  },
  data () {
    return {
      el: null,
      isLoading: false,
      finished: false,
      users: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    loading () {
      if (this.finished) return '已经到底啦'
      return '加载中...'
    }
  },
  methods: {
    // 滚动到底部触发事件
    onScroll () {
      let bottom = this.el.getBoundingClientRect().bottom
      if (bottom - this.$refs.area.offsetHeight < 10) {
        if (!this.isLoading) {
          this.isLoading = true
          console.log(1)
          setTimeout(() => {
            this.users.push(11)
            this.users.push(21)
            this.users.push(31)
            this.isLoading = false
            // this.finished = true
          }, 1000)
        }
      }
    },

  },
  mounted () {
    this.el = this.$refs.group
    this.$nextTick(() => {
      this.$refs.area.addEventListener('touchend', this.onScroll)
    })
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: scroll;
  height: 100%;
}
.title {
  padding-top: 0.32rem;
  padding-bottom: 0.3rem;
  text-align: center;
}
.load {
  color: #888888;
  font-size: 0.22rem;
  padding-top: 0.1rem;
  text-align: center;
  img {
    width: 0.15rem;
    margin-left: 0.1rem;
  }
}
</style>
