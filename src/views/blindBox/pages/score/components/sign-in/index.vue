<template>
  <section>
    <ul class="sign">
      <li v-for="(item, index) in signInInfo.list"
        :key="index"
        :class="{'active': item.state}"
        class="time-line">
        <img class="icon"
          :src="item.state ? require('./assets/sign-in.png') : require('./assets/unsign.png')"
          alt="">
        <p class="time">{{(signInInfo.thisDay === index + 1) ? '今': item.day}}天</p>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  props: {
    signInInfo: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.sign {
  display: flex;
  background: linear-gradient(90deg, #fbd890, #f7e5c2);
  padding: 0.28rem 0 0.2rem;
  .time-line {
    position: relative;
    text-align: center;
    font-size: 0.18rem;
    color: #7b4913;
    padding-right: 0.4rem;
    .icon {
      width: 0.5rem;
    }
    .time {
      padding-top: 0.13rem;
    }
    &::after {
      content: "";
      width: 0.4rem;
      height: 1px;
      background: #6b6e80;
      position: absolute;
      top: 0.25rem;
      right: 0rem;
    }
    &:last-child {
      padding-right: 0;
      &::after {
        display: none;
      }
    }
    &.active::after {
      content: "";
      width: 0.4rem;
      height: 1px;
      background: #eb8967;
      position: absolute;
      top: 0.25rem;
      right: 0rem;
    }
  }
}
</style>
