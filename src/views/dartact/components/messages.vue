<template>
  <section class="message" v-if="lamp.length">
    <div class="item-move">
      <ul :class="{'anim':isMove}">
        <li v-for="(item,index) in lamp" :class="{last:lamp.length==index+1}">
          <div>
            <p>用户{{item.nickname}}获得{{item.awardsName}}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import {noticeList} from '../utils/api'

  export default {
    name: 'message',
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
      async getNoticeList() {
        const {code, data} = await noticeList()
        if (code === 200) {
          this.lamp = data
        }
      },
      init() {
        this.getNoticeList()
        // 导航滚动
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
    color: #F0DBA8;
    font-weight: 400;
    font-size: 0.28rem;
    text-align: center;
    width: 6.4rem;
    height: 2.6rem;
    border-radius: 0.4rem;
    box-sizing: border-box;
    padding: 0 0.2rem;
    top: 12.7rem;
    left: 0.37rem;
    z-index: 2;
    .item-move {
      height: 2.6rem;
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
      ul {
        width: 100%;
      }
      li {
        height: 0.65rem;
        display: flex;
        justify-content: center;
        align-items: center;
        &:not(.last) {
          border-bottom: 1px solid #873E14;
        }
        p {
          /*white-space: nowrap;*/
        }
      }
    }
    .anim {
      transition: all 1s;
      margin-top: -0.65rem;
    }
  }
</style>
