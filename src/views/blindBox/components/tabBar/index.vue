<template>
  <article>
    <section v-if="isTabBar"
      class="content">
      <div class="bar"
        @click="changeBar(item,index)"
        v-for="(item,index) in bar"
        :key="item.name">
        <img :src="index===active?item.activeIcon:item.icon">
        <p>{{item.label}}</p>
      </div>
    </section>
  </article>
</template>

<script>
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
  .bar {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.24rem;
    color: #9699aa;
    font-weight: bold;
    img {
      width: 0.6rem;
      height: 0.6rem;
      margin-bottom: 0.02rem;
    }
  }
}
</style>
