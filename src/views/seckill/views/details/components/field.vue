<template>
  <div class="cut-and-add">
    <div class="button-cut base-button">-</div>
    <div class="input-warp">
      {{inputValue}}
    </div>
    <div class="button-add base-button">+</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inputValue: 1,
    }
  }
}
</script>
<style lang="less" scoped>
.cut-and-add {
  height: .3rem;
  display: flex;
  .base-button {
    height: .3rem;
    width: .3rem;
    background-color: #FF4141;
    text-align: center;
    line-height: .3rem;
    color: #fff;
    border-radius: .08rem;
    &.button-cut {
      line-height: .28rem;
    }
  }

  .input-warp {
    width: .6rem;
    height: .3rem;
    background-color: #f4f4f4;
    border-radius: .08rem;
    overflow: hidden;
    margin: 0 .1rem;
    color: #e8382b;
    line-height: .3rem;
    font-size: .22rem;
    text-align: center;
  }
}
</style>


