<template>
  <section class="container activity">
    <ShortSwiper class="container-swiper" />
    <div v-if="userInfo"
      class="content">
      <img :src="userInfo.head | imgUrl"
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
  filters: {
    imgUrl (url) {
      if (!url) return require('./assets/head.png')
      if (url && !url.includes('http')) {
        return '//file.beeplaying.com' + url
      } else {
        return url
      }
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
  &.activity {
    background: url('./assets/bg-activity.png') no-repeat;
    background-size: cover;
  }
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
      color:rgba(255,225,246,1);
      font-weight: bold;
      font-size: 0.3rem;
      padding: 0.21rem 0 0.12rem;
    }
    .id {
      color:rgba(255,225,246,1);
      font-size: 0.24rem;
    }
  }
}
</style>
