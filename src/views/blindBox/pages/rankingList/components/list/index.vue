<template>
  <section ref="area"
    class="container">
    <div ref="group">
      <p class="title">以下为抽中明星奖品的部分幸运用户</p>
      <User refs="group"
        v-for="(item, index) in users"
        :info="item"
        :key="index" />
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
import { RankList } from '../../../../apis/rank'

export default {
  components: {
    User
  },
  data () {
    return {
      el: null,
      isLoading: false,
      finished: false,
      page: 0,
      pageSize: 10,
      users: []
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
          this.getUsers()
        }
      }
    },
    removeScroll () {
      this.$refs.area.removeEventListener('touchend', this.onScroll)
    },
    async getUsers () {
      this.isLoading = true
      this.page++
      const data = await RankList({
        page: this.page,
        pageSize: this.pageSize
      })
      if (data.data.data.length === 0) {
        this.finished = true
        this.removeScroll()
      } else {
        this.users.push(...data.data.data)
        this.isLoading = false
      }
    }
  },
  async mounted () {
    this.getUsers()
    this.el = this.$refs.group
    this.$nextTick(() => {
      this.$refs.area.addEventListener('touchend', this.onScroll)
    })
  },
  beforeDestroy () {
    this.removeScroll()
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow: scroll;
  // height: 100%;
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
  line-height: .2rem;
  position: fixed;
  bottom: 1.73rem;
  z-index: 2;
  width: 100%;
  img {
    width: 0.15rem;
    margin-left: 0.1rem;
  }
}
</style>
