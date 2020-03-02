<template>
  <article>
    <section v-if="isTabBar"
      class="content">
      <div class="bar"
        :class="{'active':index===active}"
        @click="changeBar(item,index)"
        v-for="(item,index) in bar"
        :key="item.name">
        <img v-if="item.markIcon && index!==active"
          :src="item.markIcon"
          class="mark">
        <img :src="index===active?item.activeIcon:item.icon">
        <p>{{item.label}}</p>
      </div>
    </section>
  </article>
</template>

<script>
import { SignInState } from '../../apis/score'

export default {
  data () {
    return {
      active: 0,
      bar: [
        {
          icon: require('./assets/box.png'),
          activeIcon: require('./assets/box-active.png'),
          label: '盲盒',
          name: 'BlindBox'
        },
        {
          icon: require('./assets/sign.png'),
          activeIcon: require('./assets/sign-active.png'),
          markIcon: require('./assets/sign-mark.png'),
          label: '签到',
          name: 'Score'
        },
        {
          icon: require('./assets/my.png'),
          activeIcon: require('./assets/my-active.png'),
          label: '我的',
          name: 'My'
        }
      ]
    }
  },
  async mounted () {
    const { data: { data } } = await SignInState()
    if (data) {
      this.bar = [
        {
          icon: require('./assets/box.png'),
          activeIcon: require('./assets/box-active.png'),
          label: '盲盒',
          name: 'BlindBox'
        },
        {
          icon: require('./assets/score.png'),
          activeIcon: require('./assets/score-active.png'),
          markIcon: require('./assets/score-mark.png'),
          label: '积分',
          name: 'Score'
        },
        {
          icon: require('./assets/my.png'),
          activeIcon: require('./assets/my-active.png'),
          label: '我的',
          name: 'My'
        }
      ]
    }
  },
  methods: {
    /**
     * @des 点击切换导航
     * @param {object} item 点击的导航对象
     * @param {number} index 点击第几个
     * @return {void}
     */
    changeBar (item, index) {
      this.active = index
      if (index === 2) {
        GLOBALS.marchSetsPoint('A_H5PT0225002545') // H5平台-盲盒页面-底部我的导航栏点击
      } else if (index === 0) {
        GLOBALS.marchSetsPoint('A_H5PT0225002546') // H5平台-盲盒页面-底部盲盒导航栏点击
      } else if (index === 1) {
        GLOBALS.marchSetsPoint('A_H5PT0225002937') // H5平台-盲盒页面-底部积分/签到点击
      }
      this.$router.push({ name: item.name })
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler ({ name }) {
        this.active = this.bar.findIndex(item => item.name === name)
      }
    }
  },
  computed: {
    isTabBar () {
      return this.active !== -1
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 1.1rem;
  background: #494b58;
  border-radius: 0.2rem 0.2rem 0 0;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  .bar {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.24rem;
    color: #9699aa;
    font-weight: bold;
    position: relative;
    .mark {
      width: 0.86rem;
      position: absolute;
      height: 0.47rem;
      top: -0.3rem;
      left: 50%;
    }
    &.active {
      color: #e2c87e;
    }
    img {
      width: 0.6rem;
      height: 0.6rem;
      margin-bottom: 0.02rem;
    }
  }
}
</style>
