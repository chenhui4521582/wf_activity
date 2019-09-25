<template>
  <section class="message">
    <div class="item-move" v-if="lamp.length">
      <ul :class="{'anim':isMove}">
        <li v-for="item in lamp">
          <div>
            <p>恭喜{{item.nickname}}开出</p>
            <p>{{item.awardsName}}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { noticeList } from '../../utils/api'
export default {
  name: 'message',
  data () {
    return {
      ylbScroll: null,
      isMove: false,
      lamp: []
    }
  },
  methods: {
    // 跑马灯滚动
    scroll () {
      this.isMove = true
      setTimeout(() => {
        this.lamp.push(this.lamp[0])
        this.lamp.shift()
        this.isMove = false
      }, 1000)
    },
    async getNoticeList () {
      const { code, data } = await noticeList()
      if (code === 200) {
        this.lamp = data
      }
    },
    init () {
      this.getNoticeList()
      // 导航滚动
      clearInterval(this.ylbScroll)
      this.ylbScroll = setInterval(this.scroll, 2500)
    }
  },
  mounted () {
    this.init()
  },
  destroyed () {
    clearInterval(this.ylbScroll)
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.message {
  position: fixed;
  background:rgba(2,23,112,.42);
  color: #fff;
  font-weight: 400;
  font-size: 0.24rem;
  text-align: center;
  max-width: 2.2rem;
  height: 0.8rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
  padding: 0 0.2rem;
  top: 1.9rem;
  right: 0.26rem;
  z-index: 1;
  .item-move {
    height: 0.8rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    ul {
      width: 100%;
    }
    li {
      height: 0.8rem;
      line-height: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        white-space: nowrap;
      }
    }
  }
  .anim {
    transition: all 1s;
    margin-top: -0.8rem;
  }
}
</style>
