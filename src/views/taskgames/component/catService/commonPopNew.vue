<template>
  <div class="pop-window">
    <div class="pop-mask-new" @touchmove.prevent></div>
    <div class="receive-pop" ref="receive-pop">
      <p><i @click="close"></i>{{title}}</p>
      <div class="slot" ref="slot" style="position: relative;font-size:0.2rem;line-height:0.3rem;">
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
  top: 1.7rem;
  transform: translateX(-50%);
  width: 80%;
  background: #0f1726;
  text-align: center;
  z-index: 11;
  p:first-child {
    height: 0.68rem;
    line-height: 0.68rem;
    background: #141f33;
    font-size: 0.22rem;
    position: relative;
    text-align: center;
    i {
      width: 0.34rem;
      height: 0.68rem;
      position: absolute;
      right: 0;
      top: 0;
      &::after {
        content: "";
        display: inline-block;
        width: 0.18rem;
        height: 0.68rem;
        font-size: 0;
        vertical-align: top;
        background: url(../../images/close-small.png) no-repeat;
        background-size: 100%;
        background-position-y: center;
      }
    }
  }
  p:nth-of-type(2) {
    padding: 0.6rem 0 0.94rem;
    font-size: 0.2rem;
    i {
      color: #ffd338;
    }
  }
  div.btn-wrap {
    margin: 0.34rem auto;
    display: flex;
    align-content: center;
    justify-content: center;
    .btn {
      max-width: 2rem;
      height: 0.5rem !important;
      line-height: 0.5rem;
      font-size: 0.2rem;
      font-weight: bold;
      border-radius: 0.1rem;
      margin: 0 0.1rem;
      padding: 0 0.2rem;
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
<style scoped>
.pop-window >>> .mt28 {
  margin-top: 0.28rem;
}
</style>
