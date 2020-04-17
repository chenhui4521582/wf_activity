<template>
  <div class="cut-and-add">
    <div class="button-cut base-button" @click="cutClick">-</div>
    <div class="input-warp">
      <p> {{inputValue}}</p>
    </div>
    <div class="button-add base-button" @click="addClick">+</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inputValue: this.value
    }
  },
  props: {
    value: {
      type: [Number, String],
      default: 1
    },
    storeMax: {
      type: Number,
      default: 0
    },
    limitNumber: {
      type: Number,
      default: 1
    }
  },
  watch: {
    value (val) {
      this.inputValue = val
    },
    inputValue (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    cutClick () {
      if (this.inputValue <= 1) { return }
      this.inputValue--
    },
    addClick () {
      if (this.limitNumber && this.inputValue === this.limitNumber) {
        this.$Toast(`该商品每人限购${this.limitNumber}次哟`)
      } else {
        this.inputValue++
      }
    },
    handleInput (event) {
      if (this.limitNumber && this.limitNumber <= this.storeMax && parseInt(event.target.value) > this.limitNumber) {
        this.$Toast(`该商品每人限购${this.limitNumber}次哟`)
        this.inputValue = this.limitNumber
      } else if (parseInt(event.target.value) > this.storeMax) {
        this.inputValue = this.storeMax
      }
    }
  }
}
</script>
<style lang="less" scoped>
.cut-and-add {
  height: 0.3rem;
  display: flex;
  .base-button {
    height: 0.3rem;
    width: 0.3rem;
    background-color: #ff4141;
    text-align: center;
    line-height: 0.3rem;
    color: #fff;
    border-radius: 0.08rem;
    &.button-cut {
      line-height: 0.28rem;
    }
  }

  .input-warp {
    margin: 0 0.1rem;
    width: 0.6rem;
    height: 0.3rem;
    border-radius: 0.08rem;
    background-color: #f4f4f4;
    p {
      padding: 0;
      vertical-align: top;
      width: 100%;
      height: 0.3rem;
      line-height: .3rem;
      text-align: center;
      font-size: 0.22rem;
      color: #e8382b;
      border: none;
      background-color: #f4f4f4;
    }
  }
}
</style>


