<template>
  <div class="cut-and-add">
    <div class="button-cut base-button" @click="cutClick">-</div>
    <div class="input-warp">
      <input type="number" @input="handleInput" v-model.number="inputValue">
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
      default: 0
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
    width: 0.6rem;
    height: 0.3rem;
    background-color: #f4f4f4;
    border-radius: 0.08rem;
    overflow: hidden;
    margin: 0 0.1rem;
    input {
      display: block;
      width: 100%;
      height: 0.3rem;
      line-height: 0.3rem;
      font-size: 0.22rem;
      text-align: center;
      background-color: #f4f4f4;
      color: #e8382b;
      border: none;
    }
  }
}
</style>


