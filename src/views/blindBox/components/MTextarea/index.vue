<template>
  <section @click="onFocus"
    class="input-group">
    <textarea v-model="value"
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
    }
  }
}
</script>

<style lang="less" scoped>
.input-group {
  background: #f7f7f7;
  border-radius: 0.16rem;
  font-size: 0.24rem;
  height: 11rem;
  padding: 0.23rem;
  textarea {
    background: #f7f7f7;
    width: 100%;
    height: 100%;
  }
}
</style>
