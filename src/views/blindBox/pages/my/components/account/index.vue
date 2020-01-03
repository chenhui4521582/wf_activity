<template>
  <section class="container">
    <ShortSwiper class="container-swiper" />
    <div v-if="userInfo"
      class="content">
      <img :src="userInfo.head | imgFilter || require('./assets/head.png')"
        alt="头像">
      <span class="name">{{userInfo.nickname}}</span>
      <span class="id">ID:{{userInfo.userId}}</span>
    </div>
  </section>
</template>

<script>
import ShortSwiper from '../../../../components/shortSwiper'

export default {
  data () {
    return {
      userInfo: null
    }
  },
  async mounted () {
    let r = await this.axios.post('//uic-api.beeplaying.com/uic/api/user/login/transInfo')
    const userInfo = r.data.data || r.data
    localStorage.setItem('user_Info', JSON.stringify(userInfo))
    this.userInfo = JSON.parse(localStorage.getItem('user_Info'))
  },
  components: {
    ShortSwiper
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 2.99rem;
  background: url("./assets/bg.png") no-repeat;
  background-size: cover;
  padding-left: 0.23rem;
  position: relative;
  .container-swiper {
    position: absolute;
    left: 0.23rem;
    top: 0.12rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 1.02rem;
      height: 1.02rem;
      border-radius: 50%;
      margin-top: 0.24rem;
    }
    .name {
      color: #ffe3b2;
      font-weight: bold;
      font-size: 0.3rem;
      padding: 0.21rem 0 0.12rem;
    }
    .id {
      color: #ffe3b2;
      font-size: 0.24rem;
    }
  }
}
</style>
