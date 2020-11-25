<template>
  <section class="message" v-if="lamp.length">
    <div class="item-move">
      <ul :class="{'anim':isMove}">
        <li v-for="item in lamp">
          <div>
            <p>用户{{item.nickname}}获得{{item.awardsName}}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { noticeList } from '../utils/api'
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
        this.lamp = [{
          nickname: 'XXXXX',
          awardsName: '888元幸运大奖'
        }, {
          nickname: 'XXXXX',
          awardsName: '888元幸运大奖'
        }, {
          nickname: 'XXXXX',
          awardsName: '888元幸运大奖'
        }, {
          nickname: 'XXXXX',
          awardsName: '888元幸运大奖'
        }]
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
  position: absolute;
  background: rgba(26, 53, 8, 0.6);
  color: #fff;
  font-weight: 400;
  font-size: 0.24rem;
  text-align: center;
  width: 2.36rem;
  height: 0.88rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
  padding: 0 0.2rem;
  top: 9rem;
  left: 0.2rem;
  z-index: 2;
  .item-move {
    height: 0.88rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    ul {
      width: 100%;
    }
    li {
      height: 0.88rem;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        /*white-space: nowrap;*/
      }
    }
  }
  .anim {
    transition: all 1s;
    margin-top: -0.88rem;
  }
}
</style>
