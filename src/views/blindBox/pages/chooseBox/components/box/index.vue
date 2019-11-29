<template>
  <section class="box-wrapper">
    <div class="box">
      <div class="box__img--box">
        <div :style="trackStyles"
          class="img-wrapper">
          <img v-for="(item,index) in boxes"
            :key="index"
            :src="goods&&index===offsetIndex?item.boxTransparent:item.box">
        </div>
        <img class="box__img--goods"
          v-if="goods"
          :src="goods">
      </div>
      <p v-if="goods">iPhone 11</p>
    </div>
    <p @click="refresh"
      class="refresh"><img src="./assets/refresh.png">换一盒</p>
    <MButton class="choose-button">就选它</MButton>
    <p class="note">盲盒购买后不支持退换，介意请勿拍</p>
    <Side-Bar @use="useCard"
      :user-info="userInfo"
      class="side-bar" />
  </section>
</template>

<script>
import SideBar from '../sideBar'
import MButton from '../../../../components/MButton'
import { boxGroup } from '../../../../config/box'
import { UserInfo } from '../../../../apis/user'

export default {
  data () {
    return {
      offsetIndex: 0,
      offsetWidth: 0,
      activity: 0,
      goods: null,
      boxes: [],
      userInfo: null,
      boxGroup,
      boxLength: boxGroup.length
    }
  },
  async mounted () {
    ({ data: { data: this.userInfo } } = await UserInfo())
    this.activity = this.boxGroup.findIndex(res => res.type === Number(this.$route.params.type))
    this.boxes.push(this.boxGroup[this.activity])
    this.addBox()
    this.offsetWidth = document.getElementsByClassName('box__img--box')[0].clientWidth
  },
  methods: {
    // 使用透视卡
    useCard () {
      this.goods = require('../../assets/goods.png')
    },
    // 换一盒
    refresh () {
      this.addBox()
      this.offsetIndex++
      this.goods = null
      // this.removeBox()
    },
    // 增加一个盒子
    addBox () {
      if (this.activity === (this.boxLength - 1)) this.activity = 0
      else this.activity++
      this.boxes.push(this.boxGroup[this.activity])
    },
    // 删除上一个盒子
    removeBox () {
      this.boxes.shift()
    }
  },
  computed: {
    trackOffset () {
      return this.offsetIndex * this.offsetWidth
    },
    trackStyles () {
      return {
        transform: `translate3d( ${-this.trackOffset}px, 0,0)`,
        transition: `transform 500ms ease`
      }
    }
  },
  components: {
    SideBar,
    MButton
  }
}
</script>

<style lang="less" scoped>
.box-wrapper {
  width: 6.52rem;
  height: 6.58rem;
  padding-top: 1.2rem;
  margin: 0 auto;
  background: url("./assets/shine.png") no-repeat;
  background-size: cover;
  position: relative;
  .choose-button {
    margin: 0 auto;
    margin-top: 0.5rem;
  }
  .note {
    color: #b5b9cb;
    font-size: 0.22rem;
    padding-top: 0.33rem;
    text-align: center;
    font-weight: bold;
  }
  .side-bar {
    position: absolute;
    right: -0.34rem;
    top: 1.34rem;
  }
  .box {
    margin-bottom: 1.2rem;
    font-size: 0.3rem;
    color: #b8bbcb;
    text-align: center;
    &__img--box {
      width: 3.2rem;
      height: 3.72rem;
      display: block;
      margin: 0 auto 0.24rem;
      position: relative;
      overflow: hidden;
      .box__img--goods {
        width: 2.3rem;
        height: 2.3rem;
        position: absolute;
        top: 1.42rem;
        left: 0.45rem;
      }
      .img-wrapper {
        width: 6.4rem;
        height: 3.72rem;
        display: flex;
        img {
          width: 3.2rem;
          height: 3.72rem;
        }
      }
    }
  }
  .refresh {
    font-size: 0.26rem;
    color: #b6b9cb;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 0.32rem;
      height: 0.37rem;
      margin-right: 0.2rem;
    }
  }
}
</style>
