<template>
  <section class="user">
    <img class="head"
      :src="info.profilePhoto | imgUrl"
      alt="">
    <div class="content">
      <p class="info">
        <span>{{info.nickname}}</span>
        <span>获得了</span>
      </p>
      <p class="name">{{info.awardsName}}</p>
      <p class="time">{{info.createTime}}</p>
    </div>
    <img class="goods"
      :src="info.awardsImage | imgUrl"
      alt="">
  </section>
</template>

<script>
export default {
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
  props: {
    info: {
      type: Object,
      default: {
        profilePhoto: '',
        nickname: '',
        awardsName: '',
        createTime: '',
        awardsImage: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  padding: 0.26rem 0.22rem 0.25rem;
  background: #fff;
  box-sizing: border-box;
  border-radius: 0.16rem;
  margin-bottom: 0.2rem;
  display: flex;
  .head {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .goods {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.08rem;
    margin-top: -0.11rem;
  }
  .content {
    flex: 1;
    padding-right: 0.5rem;
    padding-left: 0.1rem;
    .info {
      color: #af8226;
      font-size: 0.22rem;
      display: flex;
      justify-content: space-between;
    }
    .name {
      font-size: 0.26rem;
      color: #000;
      padding: 0.14rem 0 0.23rem;
    }
    .time {
      color: #888888;
      font-size: 0.2rem;
    }
  }
}
</style>
