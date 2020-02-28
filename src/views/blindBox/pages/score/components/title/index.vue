<template>
  <section class="title">
    <div class="content">
      <span class="line"></span>
      {{title}}
    </div>
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    padding: .3rem .2rem;
    font-size: .32rem;
    line-height: .3rem;
    color: #1B1F29;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .content {
      display: flex;
      align-items: end;
    }
    .line {
      display: inline-block;
      width: .05rem;
      height: .3rem;
      background: #FF4141;
      border-radius: .03rem;
      margin-right: .13rem;
    }
  }
</style>
