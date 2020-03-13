<template>
  <div class="share" ref="share">
    <div class="closed"></div>
    <div class="icon">
      <img src="./img/watch-icon.png" alt="">
    </div>
    <div class="text" ref="text">
      <p>关注公众号</p>
      <p>跟踪发货信息</p>
    </div>
  </div>
</template>
<script>
import Velocity from 'velocity-animate'
export default {
  name: 'share',
  data: () => ({
    open: false,
    show: true
  }),
  methods: {
    animation () {
      let shareEle = this.$refs.share
      let textEle = this.$refs.text
      Velocity(shareEle,{
        right: 0
      },{
        duration: 1000,
        delay: 2000,
        complete: () => {
          textEle.classList.add('active')
        }
      })
      Velocity(textEle,{
        width: 100
      }, {
        duration: 1000,
        delay: 3000,
        complete: () => {
          if(this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(()=> {
            shareEle.style=""
            textEle.style=""
            textEle.classList.remove('active')
          }, 4000)
        }
      })
    }
  },
  mounted() {
    this.animation()
  }
}
</script>
<style lang="less" scoped>
.share {
  position: fixed;
  right: .3rem;
  bottom: 1.69rem;
  z-index: 99;
  display: flex;
  justify-self: start;
  min-width: .56rem;
  min-height: .56rem;
  .icon {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: .56rem;
    height: .56rem;
    border-radius: 50%;
    background: #D1AC42;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
  .text {
    box-sizing: border-box;
    overflow: hidden;
    padding-top: .07rem;
    margin-left: .28rem;
    
    width: 0;
    height: .56rem;
    font-size: .18rem;
    color: #fff;
    background: #D1AC42;
    white-space: nowrap;
    &.active {
      padding-left: .28rem;
    }
  }
  .closed {
    position: absolute;
    width: .18rem;
    height: .18rem;
    right: 0;
    top: -.2rem;
    background: url(./img/closed.png) no-repeat center center;
    background-size: 100% 100%;
  }
}
</style>
