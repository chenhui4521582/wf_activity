<template>
  <div class="buy-btn">
    <div class="cut-and-add">
      我要参与
      <div class="button-cut base-button" @click.stop="cutClick">-</div>
      <div class="input-warp">
        <input type="number" v-model.number="inputValue">
      </div>
      <div class="button-add base-button" @click.stop="addClick">+</div>
      <div class="max-num">
        <div class="btn" @click="max">最大</div>
        次
      </div>
    </div>
    <div class="buy">去夺宝</div>
  </div>
</template>
<script>
export default {
  name: 'buyBtn',
  data: () =>({
    inputValue: 1
  }),
  methods: {
    cutClick() {
      if(this.inputValue <= 1) {
        return false
      }
      this.inputValue = this.inputValue-1
    },
    addClick() {
      if(this.inputValue >= 60) {
        return false
      }
      this.inputValue = this.inputValue+1
    },
    max() {
      this.inputValue = 60
    }
  }
}
</script>
<style lang="less" scoped>
.buy-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: .9rem;
  background: #fff;
  .cut-and-add {
    padding-left: .24rem;
    height: .9rem;
    display: flex;
    align-items: center;
    color: #888888;
    .base-button {
      height: .3rem;
      width: .3rem;
      background-color: #FF4141;
      text-align: center;
      line-height: .27rem;
      color: #fff;
      border-radius: .08rem;
      &.button-cut {
        line-height: .27rem;
        margin-left: .1rem;
      }
    }
    .input-warp {
      width: .6rem;
      height: .3rem;
      background-color: #F7F7F7;
      border-radius: .08rem;
      overflow: hidden;
      margin: 0 .1rem;
      input {
        display: block;
        width: 100%;
        height: .3rem;
        line-height: .3rem;
        font-size: .22rem;
        text-align: center;
        background-color: #F7F7F7;
        color: #e8382b;
        border: none;
      }
    }
  }
  .max-num {
    display: flex;
    align-items: center;
    .btn {
      margin: 0 .1rem;
      padding: 0 .1rem;
      height: .28rem;
      text-align: center;
      line-height: .28rem;
      text-align: center;
      font-size: .2rem;
      color: #fff;
      border-radius:.06rem;
      background: #FFBC00;
    }
  }
  .buy {
    position: absolute;
    right: 0;
    top: 0;
    width: 3rem;
    height: .9rem;
    line-height: .9rem;
    color: #fff;
    background: #FF4141;
    font-size: .24rem;
    text-align: center;
  }
}
</style>