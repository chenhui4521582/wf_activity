<template>
  <section class="message" v-if="lamp.length">
    <div class="item-move">
      <ul :class="{'anim':isMove}">
        <li v-for="item in lamp">
          <div>
            恭喜{{item.nickname}}抽中了{{item.awardsName}}
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'message',
    props: {
      hornList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        ylbScroll: null,
        isMove: false,
        lamp: []
      }
    },
    methods: {
      // 跑马灯滚动
      scroll() {
        this.isMove = true
        setTimeout(() => {
          this.lamp.push(this.lamp[0])
          this.lamp.shift()
          this.isMove = false
        }, 1000)
      },
      init() {
        this.lamp = this.hornList
        clearInterval(this.ylbScroll)
        this.ylbScroll = setInterval(this.scroll, 2500)
      }
    },
    mounted() {
      this.init()
    },
    destroyed() {
      clearInterval(this.ylbScroll)
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .message {
    position: absolute;
    top: .9rem;
    left: 2rem;
    width: 4rem;
    overflow: hidden;
    color: rgba(255, 255, 255, 1);
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.22rem;
    .item-move {
      height: 0.8rem;
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
      ul {
        width: 100%;
      }
      li {
        display: flex;
        align-items: center;
      }
      p {
        i {
          color: #F5A86E;
        }
      }
    }
    .anim {
      transition: all 1s;
      margin-top: -0.8rem;
    }
  }
</style>
