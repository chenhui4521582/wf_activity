<template>
  <div @click="$emit('confirm')"
    class="button">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.button {
  width: 3rem;
  line-height: 0.8rem;
  border-radius: 0.4rem;
  color: #7b4913;
  font-size: 0.36rem;
  text-align: center;
  background: linear-gradient(90deg, #ffeab5, #dbbd6e);
}
</style>
