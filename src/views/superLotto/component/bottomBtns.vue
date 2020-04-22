<template>
  <article class="bottom-btns">
    <div class="get-btn" @click="showDropDown()">获取号码</div>
    <div class="random-btn" @click="showPop(15)">
      一键随机所有<br />
      未使用号码
    </div>
    <div class="my-number-btn" @click="showPop(12)">
      我的号码箱
      <span>剩余{{userNumCount|conversion}}个</span>
    </div>
  </article>
</template>

<script>
export default {
  name: 'bottomBtns',
  components: {

  },
  props: {
    userNumCount: {
      type: Number,
      default: 0
    }
  },
  filters: {
    conversion (value) {
      if (value >= 10000) {
        return `${Math.floor(value / 1000) / 10}万`
      } else {
        return value
      }
    }
  },
  methods: {
    showPop (type) {
      if (type === 15 && this.userNumCount < 4) {
        this.$emit('showPop', 10)
        return
      }
      this.$emit('showPop', type)
    },
    showDropDown () {
      this.$emit('showDropDown', 1)
    }
  }
}
</script>

<style lang="less" scoped>
.bottom-btns {
  position: fixed;
  height: 1.4rem;
  width: 100%;
  left: 0;
  bottom: 0;
  background: #ffa200;
  border-radius: 0.2rem 0.2rem 0 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  font-size: 0.3rem;
  font-weight: bold;
  color: #c04102;
  div {
    height: 1.26rem;
    background: no-repeat center center;
    background-size: 100% 100%;
    box-sizing: border-box;
  }
  .get-btn {
    min-width: 1.92rem;
    max-width: 1.92rem;
    background-image: url('../img/orange-btn.png');
    line-height: 1.1rem;
  }
  .random-btn {
    min-width: 2.92rem;
    max-width: 2.92rem;
    line-height: 0.32rem;
    padding-top: 0.24rem;
    background-image: url('../img/orange-long-btn.png');
  }
  .my-number-btn {
    padding-top: 0.32rem;
    padding-left: 0.06rem;
    color: #5861e7;
    min-width: 1.92rem;
    max-width: 1.92rem;
    line-height: 0.32rem;
    background-image: url('../img/blue-btn.png');
    span {
      display: block;
      color: #5862e7;
      line-height: 0.24rem;
      font-size: 0.2rem;
      font-weight: 400;
    }
  }
}
</style>
