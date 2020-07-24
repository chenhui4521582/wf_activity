<template>
  <article class="welcome">
    <transition name="mask">
      <section class="pop-wrapper" v-show="isShowPop">
        <div class="mask"></div>
        <div class="content-wrapper">
          <div class="content">
            <img src="./img/welcome-bg.png" alt="">
            <div class="btn" @click="closePop()">
              <img src="./img/open-btn.png" alt="">
            </div>
          </div>
        </div>
      </section>
    </transition>
  </article>
</template>

<script>
export default {
  name: '',
  components: {
  },
  data () {
    return {
      isShowPop: false
    }
  },
  methods: {
    openPop () {
      this.isShowPop = true
    },
    closePop () {
      this.isShowPop = false
    }
  }
}
</script>

<style lang="less" scoped>
.welcome {
  .pop-wrapper {
    .content-wrapper {
      .content {
        width: 5.6rem;
        position: relative;
        .btn {
          position: absolute;
          width: 4.8rem;
          height: 0.86rem;
          bottom: 0.4rem;
          left: 50%;
          margin-left: -2.4rem;
        }
      }
    }
  }
}
</style>
