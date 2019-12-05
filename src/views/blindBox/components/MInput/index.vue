<template>
  <section @click="onFocus"
    class="input-group">
    <input v-model="value"
      :type="type"
      class="input"
      :placeholder="placeholder" />
  </section>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  watch: {
    value (val) {
      this.$emit('onChange', val)
    }
  },
  mounted () {
    this.value = this.default
  },
  methods: {
    onFocus () {
      Array.from(this.$el.getElementsByClassName('input'))[0].focus()
    }
  },
  props: {
    placeholder: {
      type: String
    },
    default: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style lang="less" scoped>
.input-group {
  background: #f7f7f7;
  border-radius: 0.16rem;
  font-size: 0.24rem;
  line-height: 0.7rem;
  height: 0.7rem;
  input {
    background: #f7f7f7;
    width: 100%;
    height: 100%;
    text-indent: 0.23rem;
  }
}
</style>
