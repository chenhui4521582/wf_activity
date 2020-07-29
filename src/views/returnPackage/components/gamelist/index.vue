<template>
  <article class="gamelist">
    <transition name="mask">
      <section class="pop-wrapper" v-show="isShowPop">
        <div class="mask"></div>
        <div class="content">
          <p class="title">选择你心仪的游戏吧</p>
          <div class="close" @click="closePop">关闭</div>
          <ul>
            <li v-for="item in gamelist" :key="item.type" @click="toGame(item)">
              <img :src="item.img" alt="">
              <p>{{item.name}}</p>
            </li>
          </ul>
        </div>
      </section>
    </transition>
  </article>
</template>

<script>
/* eslint-disable no-undef */
import utils from '@/common/js/utils'
export default {
  name: 'gamelist',
  data () {
    return {
      isShowPop: this.value,
      gamelist: [
        {
          img: require('./img/billiards.png'),
          name: '欢乐竞技台球',
          url: '/billiards',
          type: 2
        },
        {
          img: require('./img/crush.png'),
          name: '糖果萌消消',
          url: '/crush',
          type: 12
        },
        {
          img: require('./img/marbles.png'),
          name: '王者弹珠',
          url: '/Marbles',
          type: 21
        },
        {
          img: require('./img/gofish.png'),
          name: '深海探一探',
          url: '/gofish',
          type: 20
        },
        {
          img: require('./img/fish.png'),
          name: '街机欢乐捕鱼',
          url: '/fish',
          type: 10
        },
        {
          img: require('./img/kingdom2.png'),
          name: '三国大作战',
          url: '/kingdom2',
          type: 13
        },
        {
          img: require('./img/bird.png'),
          name: '欢乐的小鸟',
          url: '/bird',
          type: 26
        },
        {
          img: require('./img/boom.png'),
          name: '疯狂炸弹',
          url: '/boom',
          type: 30
        }
      ]
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  mounted () {

  },
  methods: {
    closePop () {
      this.isShowPop = false
      this.$emit('on-close')
    },
    toGame (item) {
      GLOBALS.jumpOutsideGame(item.url)
    }
  },
  watch: {
    value (val) {
      this.isShowPop = val
    },
    isShowPop (val) {
      this.$emit('input', val)
      if (val) {
        utils.ScrollNoMove()
      } else {
        utils.ScrollMove()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.gamelist {
  .content {
    position: fixed;
    width: 7.2rem;
    bottom: 0;
    left: 0;
    height: 5.78rem;
    background: url('./img/gamelist-bg.png') no-repeat center bottom;
    background-size: 100% 100%;
    z-index: 99;
    .title {
      color: #feee9a;
      font-weight: bold;
      text-align: center;
      font-size: 0.28rem;
      margin-top: 1.2rem;
    }
    .close {
      font-size: 0.3rem;
      position: absolute;
      top: 1.1rem;
      right: 0.3rem;
      color: #fff;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 25%;
        text-align: center;
        margin-top: 0.24rem;
        color: #c9d5ff;
        font-size: 0.2rem;
        img {
          width: 1.2rem;
          height: 1.2rem;
          margin-bottom: 0.1rem;
        }
      }
    }
  }
}
</style>
