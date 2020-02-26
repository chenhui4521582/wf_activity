<template>
  <article>
    <section class="wrapper">
      <div @click="showRule"
        class="float left">
        积分攻略
      </div>
      <div @click="scoreRecord"
        class="float right">
        兑换记录
      </div>
      <p class="title">我的积分</p>
      <p class="count">
        <img src="./assets/score.png"
          alt="">{{score}}
      </p>
      <p v-if="signInInfo && signInInfo.todayState"
        class="tip">已连续签到 <span v-if="signInInfo"
          class="score-count">{{signInInfo.consecutiveDay }}</span> 天，连续签到得更多积分</p>
      <p v-else
        class="tip">连续签到得更多积分</p>
      <SignIn @update="update"
        v-if="signInInfo && isOpen"
        :signInInfo="signInInfo" />
    </section>
    <Rule @viewGoods="$emit('viewGoods')"
      @close="isRule=false"
      :show="isRule" />
    <img :src="arrow"
      @click="handleArrow"
      class="arrow">
  </article>
</template>

<script>
import SignIn from '../sign-in'
import Rule from '../rule'

export default {
  data () {
    return {
      isRule: false,
      isOpen: true,
      score: null,
      signInInfo: null
    }
  },
  props: ['scoreInfo'],
  components: {
    SignIn,
    Rule
  },
  watch: {
    scoreInfo: {
      deep: true,
      handler () {
        this.init()
      }
    }
  },
  methods: {
    showRule () {
      this.isRule = true
    },
    scoreRecord () {
      this.$router.push({
        name: 'ScoreDetail',
        query: {
          active: 1
        }
      })
    },
    handleArrow () {
      this.isOpen = !this.isOpen
    },
    async init () {
      ({ score: this.score, signInInfo: this.signInInfo } = this.scoreInfo)
    },
    update () {
      this.$emit('update')
    }
  },
  computed: {
    arrow () {
      if (this.isOpen) return require('./assets/close.png')
      return require('./assets/open.png')
    }
  },
  mounted () {
    this.init()
    this.isOpen = !this.signInInfo.todayState
    this.$eventBus.$on('showRule', () => {
      this.isRule = true
    })
  }
}
</script>

<style lang="less" scoped>
.arrow {
  width: 1rem;
  display: block;
  margin: 0 auto;
  height: 0.3rem;
}
.wrapper {
  background: url("./assets/bg.png") no-repeat 100% 100%;
  padding-bottom: 0.2rem;
  position: relative;
  .float {
    width: 1.2rem;
    line-height: 0.44rem;
    text-align: center;
    font-size: 0.22rem;
    color: #fff;
    position: absolute;
    top: 0.3rem;
    &.left {
      background: rgba(255, 255, 255, 0.4);
      border-radius: 0 0.22rem 0.22rem 0;
      left: 0;
    }
    &.right {
      background: rgba(222, 192, 114, 0.6);
      border-radius: 0.22rem 0 0 0.22rem;
      right: 0;
    }
  }
  .record {
    position: absolute;
    top: 0.3rem;
    right: 0;
  }
  .title {
    padding: 0.31rem 0 0.23rem;
    text-align: center;
    font-size: 0.28rem;
    color: #fff;
  }
  .count {
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-size: 0.6rem;
    color: #fde9b3;
    font-weight: bold;
    img {
      width: 0.37rem;
      margin-right: 0.1rem;
    }
  }
  .tip {
    padding: 0.25rem 0 0.2rem;
    text-align: center;
    color: #fff;
    font-size: 0.2rem;
    .score-count {
      font-size: 0.28rem;
      color: #eb8967;
      font-weight: bold;
    }
  }
}
</style>
