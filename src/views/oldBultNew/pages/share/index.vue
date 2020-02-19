<template>
  <main class="main">
    <input v-model="phone"
      class="phone"
      placeholder="输入手机号赚20元话费"
      type="number"
      oninput="if(value.length>11)value=value.slice(0,11)">
    <img @click="receive"
      class="button"
      src="./assets/button.png"
      alt="">
    <Modal :show="show"
      @onClose="show=false">
      <section v-if="isNew" class="dialog">
        <p class="title">恭喜你<br>获得20元话费礼包</p>
        <img class="gift"
          src="./assets/gift.png"
          alt="">
        <div class="confirm">立即下载多多玩APP</div>
      </section>
      <section v-else class="dialog">
        <p class="title tip">温馨提示</p>
        <p class="content">
          你已经是我们的老朋友了<br>
          立即去多多玩APP 邀请用户返利吧
        </p>
        <div class="confirm">立即下载多多玩APP</div>
      </section>
    </Modal>
  </main>
</template>

<script>
import Modal from '../../components/modal'

export default {
  data () {
    return {
      phone: null,
      show: false,
      isNew: null
    }
  },
  components: {
    Modal
  },
  methods: {
    receive () {
      const phoneRegex = /^[1][3-9]\d{9}$/
      if (!phoneRegex.test(this.phone)) {
        this.$toast.show({
          message: '请填写正确手机号',
          duration: 1000
        })
        return
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 100vh;
  background: url("./assets/bg.png") no-repeat;
  background-size: 100% 100%;
  .phone {
    width: 4.8rem;
    line-height: 0.9rem;
    border-radius: 0.2rem;
    font-size: 0.24rem;
    padding-left: 0.27rem;
    border: none;
  }
  .button {
    width: 4.8rem;
    display: block;
    margin: 0.6rem auto 0;
  }
  .dialog {
    padding-bottom: 0.4rem;
    .title {
      padding: 0.42rem 0 0.35rem;
      font-weight: bold;
      font-size: 0.28rem;
      color: #000;
      text-align: center;
      line-height: 1.6;
      &.tip {
        padding: .34rem 0 .2rem;
      }
    }
    .content {
      font-size: .24rem;
      line-height: 1.5;
      text-align: center;
      padding-bottom: .3rem;
    }
    .gift {
      width: 2.56rem;
      display: block;
      margin: 0 auto 0.43rem;
    }
    .confirm {
      width: 3.9rem;
      line-height: 0.7rem;
      background: #ff4141;
      font-size: 0.24rem;
      color: #fff;
      text-align: center;
      border-radius: 0.16rem;
      margin: 0 auto;
    }
  }
}
</style>
