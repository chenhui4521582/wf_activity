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
    buyone: {
      type: Boolean,
      default: false
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
      if (this.buyone && this.inputValue == this.buyone) {
        this.$toast.show({
          message: `该商品每人限购${this.buyone}次哟`,
          duration: 2000
        })
      } else {
        this.inputValue++
      }
    },
    handleInput (event) {
      if (parseInt(event.target.value) > this.storeMax) {
        this.inputValue = this.storeMax
      }
    }
  }
}
</script>
<style lang="less" scoped>
.cut-and-add {
  height: 0.38rem;
  display: flex;
  .base-button {
    height: 0.38rem;
    width: 0.38rem;
    background-color: #253756;
    text-align: center;
    line-height: 0.38rem;
    font-size: 0.32rem;
    flex: 0 0.38rem;
    color: #ffffff;
  }
  .input-warp {
    width: 0.54rem;
    height: 0.38rem;
    background-color: #0f1726;
    border-radius: 0.08rem;
    font-size: 0.2rem;
    overflow: hidden;
    margin: 0 0.1rem;
    input {
      width: 100%;
      height: 0.38rem;
      text-align: center;
      padding: 0.06rem;
      box-sizing: border-box;
      background-color: #0f1726;
      color: #ffffff;
      border: none;
      outline: -webkit-focus-ring-color auto 0;
    }
  }
}
</style>


