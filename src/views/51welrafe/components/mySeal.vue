<template>
  <div class="my-seal">
    <div class="seal">
      当前拥有图章：
      <div class="seal-num">
        <div class="icon">
          <img src="../img/seal-icon.png" alt="">
        </div>
        <div class="num">{{userInfo.remnantNum}}</div>
      </div>
    </div>
    <div class="exchange-log" v-if="currentIndex == 1" @click="openSealLog">
      图章记录
    </div>
    <div class="exchange-log" v-if="currentIndex == 2" @click="openAwardLog">
      兑奖记录
    </div>
  </div>
</template>
<script>
export default {
  name: 'mySeal',
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    openSealLog() {
      this.$emit('openSealLog')
    },
    openAwardLog() {
      this.$emit('openAwardLog')
    }
  }
}
</script>
<style lang="less" scoped>
.my-seal {
  padding: 0 .3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .seal {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #1934C6;
    font-weight: bold;
  }
  .seal-num {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.32rem;
    height: .55rem;
    background: url(../img/num-bg.png) no-repeat center center;
    background-size: 100% 100%;
    .icon {
      margin-right: .05rem;
      width: .3rem;
      height: .26rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .num {
      color: #fff;
      font-weight: normal;
    }
  }
  .exchange-log {
    font-size: .24rem;
    text-decoration: underline;
    color: #E43D81;
    font-weight: bold;
  }
}
</style>