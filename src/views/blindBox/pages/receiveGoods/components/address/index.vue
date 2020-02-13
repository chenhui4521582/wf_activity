<template>
  <section class="address">
    <div class="receivecity"
      @click="showCity">
      <p v-html="address"></p>
      <span></span>
      <img src="../../assets/arrow.png"
        alt="">
    </div>
    <div v-if="show"
      class="canton">
      <p class="title">
        <span></span>
        <span>请选择</span>
        <img @click="close"
          src="./assets/close.png"
          alt="">
      </p>
      <p class="choose">
        <span v-for="(item,index) in chooseCity"
          @click="handleChoose(index, item)"
          :key="item.id">{{item.name}}</span>
        <span v-if="chooseCity.length > 0 && chooseCity.length !== 3"
          class="active">请选择{{chooseTip}}</span>
      </p>
      <p class="tip">选择{{chooseTip}}</p>
      <ul class="city">
        <li v-for="item in city"
          :key="item.id"
          @click="setCity(item)"
          class="city__li">
          {{item.name}}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { GetProvince, GetCity, GetArea } from '../../../../apis/user'

export default {
  data () {
    return {
      canGetProvincetonCode: null,
      show: false,
      city: [],
      chooseCity: [],
      throttle: false
    }
  },
  async mounted () {

  },
  methods: {
    // 点击省市区获取下级数据
    async setCity (item) {
      if (this.throttle) return
      this.throttle = true
      this.chooseCity.push(item)
      await this.getCityData(this.chooseCity.length, item.code)
    },
    // 获取省市区列表数据
    async getCityData (length, code) {
      if (length === 3) {
        const placeId = this.chooseCity[2].id
        this.$emit('setPlaceId', {
          placeId,
          provinceName: this.chooseCity[0].name,
          cityName: this.chooseCity[1].name,
          areaName: this.chooseCity[2].name
        })
        this.chooseCity = []
        this.show = false
      }
      if (length === 0) {
        ({ data: { data: this.city } } = await GetProvince())
      }
      if (length === 1) {
        ({ data: { data: this.city } } = await GetCity(code))
      }
      if (length === 2) {
        ({ data: { data: this.city } } = await GetArea(code))
      }
      this.throttle = false
    },
    // 关闭省市区弹窗
    close () {
      this.chooseCity = []
      this.show = false
    },
    // 点击已选省市区
    async handleChoose (index, item) {
      if (index === 0) {
        this.chooseCity = []
        await this.getCityData(index)
      }
      if (index === 1) {
        this.chooseCity = [this.chooseCity[0]]
        await this.getCityData(index, this.chooseCity[0].code)
      }
    },
    // 点击选择城市
    async showCity () {
      ({ data: { data: this.city } } = await GetProvince())
      this.show = true
    }
  },
  props: {
    default: {
      type: Object,
      default: {
        provinceName: null,
        cityName: null,
        areaName: null
      }
    }
  },
  computed: {
    address () {
      if (this.default.areaName) return `<p>${this.default.provinceName}</p><p>${this.default.cityName}</p><p>${this.default.areaName}</p>`
      return '请选择省市区'
    },
    chooseTip () {
      if (this.chooseCity.length === 0) return '省份/地区'
      if (this.chooseCity.length === 1) return '市'
      if (this.chooseCity.length === 2) return '区/县'
    }
  }
}
</script>

<style lang="less" scoped>
.address {
  padding: 0.1rem 0;
  display: flex;
  .receivecity {
    width: 100%;
    padding-left: 0.23rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.5;
    text-align: left;
    img {
      width: 0.12rem;
    }
  }
  .canton {
    width: 100vw;
    height: 60vh;
    box-sizing: border-box;
    overflow: scroll;
    background: #fff;
    border-top-left-radius: 0.32rem;
    border-top-right-radius: 0.32rem;
    padding: 0.2rem 0.3rem;
    position: fixed;
    bottom: 0;
    left: 0;
    .title {
      display: flex;
      padding-bottom: 0.4rem;
      justify-content: space-between;
      color: #666;
      font-size: 0.28rem;
      img {
        width: 0.25rem;
        height: 0.25rem;
      }
    }
    .choose {
      display: flex;
      font-size: 0.28rem;
      color: #333;
      padding-bottom: 0.58rem;
      span {
        padding-right: 0.4rem;
        &.active {
          color: #ff3333;
        }
      }
    }
    .tip {
      text-align: left;
      color: #999999;
      font-size: 0.2rem;
    }
    .city {
      overflow: scroll;
      .city__li {
        padding-top: 0.32rem;
        font-size: 0.28rem;
        color: #333;
        text-align: left;
      }
    }
  }
}
</style>
