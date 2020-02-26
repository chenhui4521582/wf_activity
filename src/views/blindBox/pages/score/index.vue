<template>
  <article class="main">
    <NavBar style="background:#fff"
      title="积分中心"
      @back="$router.go(-1)" />
    <MyScore @viewGoods="setPosition"
      @update="update"
      v-if="scoreInfo"
      :scoreInfo="scoreInfo" />
    <swiper v-if="banners"
      :options="options">
      <swiper-slide v-for="(item,index) in banners"
        :key="index">
        <section @click="detail(item)"
          class="content">
          <img class="banner"
            :src="item.image | imgFilter"
            alt="" />
        </section>
      </swiper-slide>
    </swiper>
    <AddScore :addScoreList="addScoreList" />
    <ExchangeScore ref="shop"
      @update="update"
      :score="score"
      :awardsList="awardsList" />
  </article>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { Index, Banner } from '../../apis/score'
import AddScore from './components/add-score'
import NavBar from '../../components/navBar'
import MyScore from './components/my-score'
import ExchangeScore from './components/exchange-score'

export default {
  data () {
    return {
      options: {
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        watchOverflow: true,
        speed: 300
      },
      banners: null,
      scoreInfo: null,
      addScoreList: [],
      awardsList: [],
      score: null
    }
  },
  methods: {
    async init () {
      ({ data: { data: this.scoreInfo } } = await Index())
      this.addScoreList = this.scoreInfo.addScoreList
      this.score = this.scoreInfo.score
      this.awardsList = this.scoreInfo.awardsList;
      ({ data: { data: this.banners } } = await Banner())
    },
    setPosition () {
      const shop = this.$refs.shop
      const { top } = shop.$el.getBoundingClientRect()
      document.documentElement.scrollTop = top
    },
    update () {
      this.init()
    }
  },
  async mounted () {
    await this.init()
    if (this.$route.query.position) {
      this.setPosition()
    }
  },
  components: {
    NavBar,
    MyScore,
    swiper,
    swiperSlide,
    AddScore,
    ExchangeScore
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #eeeeee;
  padding-bottom: 1.1rem;
}
.content {
  border-radius: 0.6rem;
  width: 6.72rem;
  margin: 0 auto;
  margin-top: 0.14rem;
  img {
    width: 100%;
    border-radius: 0.6rem;
  }
}
</style>
