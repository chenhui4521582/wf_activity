<template>
  <div class="my-log" v-show="isLog">
    <div class="mask"></div>
    <div class="container">
      <div class="header">
        福气记录
        <div class="closed" @click="hideLog"></div>
      </div>
      <div class="content">
        <div class="header">
          <div class="time">时间</div>
          <div class="line"></div>
          <div class="num">福气值</div>
        </div>
        <div class="scroll" ref="scroll">
          <ul>
            <li>
              <div class="time">2019.3.29</div>
              <div class="num">80</div>
            </li>
            <li>
              <div class="time">2019.3.29</div>
              <div class="num">80</div>
            </li>
            <li>
              <div class="time">2019.3.29</div>
              <div class="num">80</div>
            </li>
            <li>
              <div class="time">2019.3.29</div>
              <div class="num">80</div>
            </li>
            <li>
              <div class="time">2019.3.29</div>
              <div class="num">80</div>
            </li>
            <li>
              <div class="time">2019.3.29</div>
              <div class="num">80</div>
            </li>
            <li>
              <div class="time">2019.3.29</div>
              <div class="num">80</div>
            </li>
            <li>
              <div class="time">2019.3.29</div>
              <div class="num">80</div>
            </li>
            <li>
              <div class="time">2019.3.29</div>
              <div class="num">80</div>
            </li>
            <li>
              <div class="time">2019.3.29</div>
              <div class="num">80</div>
            </li>
            <li>
              <div class="time">2019.3.29</div>
              <div class="num">80</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
	name: 'blessing-log',
    props: {
	  isLog: {
	    type: Boolean,
        default: true
      }
    },
    updated () {
	  let element = this.$refs.scroll
      this.scroll = new BScroll(element)
    },
    methods: {
	  hideLog () {
	    this.$emit('hideLog', 'log')
      }
    }
  }
</script>

<style scoped lang="less">
.my-log{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    .mask {
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.54);
    }
    .container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5.97rem;
      height: 7rem;
      background:rgba(39,45,159,1);
      border-radius:12px;
      transform: translate(-50%, -50%);
      z-index: 10;
      color: #fff;
      overflow: hidden;
      .header {
        background: #506BE4;
        position: relative;
        text-align: center;
        height: .69rem;
        line-height: .69rem;
        color: #0A1194;
        font-size: .4rem;
        .closed {
          position: absolute;
          width: .48rem;
          height: .48rem;
          right: .22rem;
          top: .1rem;
          background: url("../images/closed.png") no-repeat center center / 100% 100%;
        }
      }
      .content {
        padding: 0 .36rem;
        box-sizing: border-box;
        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          color:#fff;
          height: .98rem;
          border-bottom: 1px solid #506BE4;
          background:none;
          .time,.num {
            flex: 1;
            font-size: .4rem;
            color: #fff;
            text-align: center;
          }
          .line {
            width:1px;
            height:.22rem;
            background:rgba(255,255,255,1);
          }
        }
        .scroll {
          height: 5.3rem;
          overflow: hidden;
          width: 100%;
          li {
            display: flex;
            height: .9rem;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #506BE4;
            .time,.num{
              flex: 1;
              text-align: center;
              font-size: .4rem;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
