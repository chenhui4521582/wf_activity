<template>
  <section class="duction-price">
    <p class="label">话费券抵扣</p>
    <p class="value" @click="toggleCost()">
      <span>可用{{cost}}元话费券抵用{{cost}}元</span>
      <span v-if="cost" class="radio" :class="inputValue?'selected':''"></span>
    </p>
  </section>
</template>

<script>
export default {
  name: 'ductionPrice',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    cost: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      inputValue: this.value
    }
  },
  methods: {
    toggleCost () {
      this.inputValue = !this.inputValue
    }
  },
  watch: {
    value (val) {
      this.inputValue = val
    },
    inputValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.duction-price {
  padding: 0.2rem;
  background: #fff;
  border-radius: 0.16rem;
  margin-bottom: 0.2rem;
  font-size: 0.24rem;
  line-height: 0.36rem;
  display: flex;
  justify-content: space-between;
  .label {
    color: #888;
  }
  .value {
    color: #5186ca;
    display: flex;
    align-items: center;
    .radio {
      width: 0.3rem;
      height: 0.3rem;
      background: url("./imgs/normal.png") no-repeat center center;
      background-size: 100% 100%;
      margin-left: 0.12rem;
      &.selected {
        background-image: url("./imgs/selected.png");
      }
    }
  }
}
</style>
