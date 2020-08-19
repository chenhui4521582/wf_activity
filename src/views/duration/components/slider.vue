<template>
  <div class="slider">
    <swiper v-if="showNotice" :options="options">
      <swiper-slide v-for="(item,index) in list" :key="index">
        {{item.nickname}}获得<br>
        {{item.awardsName}}
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'slider',
  data: () => ({
    list: [],
    options: {
      autoplay: {
        disableOnInteraction: false,
        delay: 2000
      },
      direction : 'vertical',
      loop: true,
      slidesPerView: '2',
      height: 80,
      spaceBetween : 10
    }
  }),
  components: {
    swiper, swiperSlide
  },
  computed: {
    showNotice () {
      return  this.list.length
    }
  },
  methods: {
    _getNotice () {
      Services.getNotice().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.list = data
        }
      })
    }
  },
  mounted () {
    this._getNotice()
  }
}
</script>
<style scoped lang="less">
.slider {
  position: fixed;
  right: 0.2rem;
  top: 1.45rem;
  z-index: 10;
  height: 80px;
  width: 1.7rem;
  overflow: hidden;
  .swiper-slide {
    height: 35px;
    color: #fff;
    width: 100%;
    text-align: center;
    background: rgba(0,0,0,.5);
    border-radius: .3rem;
    font-size: .22rem;
    white-space: nowrap;
    line-height: 1.1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>