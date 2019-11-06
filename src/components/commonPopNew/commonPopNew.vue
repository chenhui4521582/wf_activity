<template>
  <div class="pop-window">
    <div class="pop-mask-new" @touchmove.prevent></div>
    <div class="receive-pop" ref="receive-pop">
      <p><i @click="close" v-if="isShowClose"></i>{{title}}</p>
      <div class="slot" ref="slot" style="position: relative">
        <slot></slot>
      </div>
      <div class="btn-wrap" v-if="isShowBtn">
        <div v-if="cancelBtn" class="btn cancelBtn" @click="onCancel" v-html="cancelBtn" ref="cancelBtn"></div>
        <div class="btn besure" :class="{actived:!count}" @click="besure" v-html="!count?btnName:beforeBtnName" ref="besure"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import API from '../../api'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    btnName: {
      type: String,
      default: '确认'
    },
    cancelBtn: {
      type: String,
      default: ''
    },
    isShowBtn: {
      type: Boolean,
      default: true
    },
    isShowClose: {
      type: Boolean,
      default: true
    },
    isActived: {
      type: Boolean,
      default: false
    },
    countNumber: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      convert: [],
      showReceivePop: false,
      awardsName: '',
      timer: null,
      count: 0
    }
  },
  computed: {
    beforeBtnName () {
      return `${this.btnName}(${this.count}s)`
    }
  },
  methods: {
    close (val) {
      if (this.count) {
        return
      }
      if (val == 'back') {
        this.$emit('close', true)
      } else {
        this.$emit('close', false)
      }
    },
    besure () {
      if (this.count) {
        return
      }
      this.$emit('besure')
    },
    getComputedStyle (ele, attr) {
      return window.getComputedStyle(ele, null)[attr]
    }
  },
  mounted () {
    if (this.countNumber) {
      this.count = this.countNumber
      this.timer = window.setInterval(() => {
        this.count--
        if (this.count <= 0) {
          this.count = 0
          window.clearInterval(this.timer)
        }
      }, 1000)
    }
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.pop-mask-new {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  z-index: 10;
}
.pop-window {
  z-index: 13;
}
.receive-pop {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -63%);
  width: 80%;
  min-height: 4rem;
  background: #0f1726;
  text-align: center;
  z-index: 11;
  border-radius: 0.12rem;
  overflow: hidden;
  p:first-child {
    height: 0.26rem;
    line-height: 0.26rem;
    background: #141f33;
    font-size: 0.26rem;
    padding: 0.3rem;
    color: #fff;
    i {
      float: right;
      width: 0.4rem;
      height: 0.26rem;
      &::after {
        content: "";
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        font-size: 0;
        vertical-align: top;
        background: url(./img/close-small.png) no-repeat;
        background-size: 100%;
      }
    }
  }
  p:nth-of-type(2) {
    padding: 0.7rem 0 1.1rem;
    font-size: 0.24rem;
    i {
      color: #ffd338;
    }
  }
  div.btn-wrap {
    margin: 0.2rem auto 0.64rem;
    display: flex;
    align-content: center;
    justify-content: center;
    .btn {
      width: 2.4rem;
      height: 0.6rem !important;
      line-height: 0.6rem;
      font-size: 0.28rem;
      font-weight: bold;
      border-radius: 0.08rem;
      margin: 0 0.1rem;
    }
    .cancelBtn {
      background-color: #2b3a55;
      color: #62779c;
    }
    .besure {
      background: #494949;
      color: #a4a4a4;
      &.actived {
        color: #fff;
        background: #ee6f0b;
      }
    }
  }
}
</style>
