<template>
  <div class="profit-recommend">
    <div class="mask" v-show="value" @click="hide"></div>
    <transition name="slide1">
      <div class="recommend-box" v-show="value">
        <div class="recommend-center">
          <div class="title">
            快用大神们的攻略来试试吧
          </div>
          <div class="recommend-list">
            <ul>
              <li
                @click="goGame(item)"
                v-for="(item, index) in games"
                :key="index"
                class="games"
              >
                <img :src="item.img" alt="" />
                <div class="text">
                  <div class="name">
                    {{ item.name }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="recommend-closed" @click="hide">
            关闭
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    games: [
      {img: require('../img/0.png'), url: `//wap.beeplaying.com/crush/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '糖果萌消消乐'},
      {img: require('../img/2.png'), url: `//wap.beeplaying.com/billiards/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '欢乐竞技台球'},
      {img: require('../img/4.png'), url: `//wap.beeplaying.com/kingdom2/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '三国大作战'},
      {img: require('../img/5.png'), url: `//wap.beeplaying.com/Marbles/?channel=${localStorage.getItem('APP_CHANNEL')}&time=${new Date().getTime()}`, name: '王者弹珠'},
    ]
  }),
  methods: {
    goGame( item ) {
      if (item.url) {
        window.location.href = item.url
      }
    },
    hide(btn) {
      this.$emit('input', false)
    },
    show() {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.profit-recommend {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: center;
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 14;
  }
  .recommend-box {
    position: fixed;
    width: 100%;
    right: 0;
    left: 0;
    bottom: 0;
    background: #fff;
    z-index: 15;
    border-radius: .32rem .32rem 0 0;
    .recommend-center {
      .title {
        overflow: hidden;
        margin: .3rem 0 .6rem;
        color: #000;
        font-size: .28rem;
        font-weight: bold;
      }
      .games {
          img {
            width: .8rem;
            height: .8rem;
          }
      }
      .recommend-list {
        position: relative;
        margin: 0 22px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            position: relative;
            overflow: hidden;
            padding-bottom: .11rem;
            .text {
              .name {
                font-size: .24rem;
                color: #888888;
                white-space: nowrap;
              }
            }
          }
        }
      }
      .recommend-closed {
        margin-top: .3rem;
        overflow: hidden;
        width: 100%;
        height: .9rem;
        line-height: .9rem;
        font-size: .24rem;
        color: #FF4141;
        text-align: center;
        background: #F0F0F0;
      }
    }
    &.slide1-enter,
    .slide1-leave {
      bottom: -100%;
    }
    &.slide1-enter-active,
    .slide1-leave-active {
      transition: all 0.5s ease-in-out;
    }
  }
}
</style>
