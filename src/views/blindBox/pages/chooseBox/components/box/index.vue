<template>
  <section class="box-wrapper">
    <div class="box">
      <div class="box__img--box">
        <div class="img-wrapper">
          <img :src="awardsImage? box && box.boxTransparent:box &&box.box">
        </div>
        <img class="box__img--goods"
          v-if="awardsImage"
          :src="awardsImage | imgFilter">
      </div>
      <p v-if="awardsName">{{awardsName}}</p>
    </div>
    <p @click="refresh"
      class="refresh"><img src="./assets/refresh.png">换一盒</p>
    <MButton :breathe="userInfo&&userInfo.openBoxTimes?true:false"
      @confirm="onConfirm"
      class="choose-button">{{buttonText}}</MButton>
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
import { Operation, ChangeOne, PayPoint } from '../../../../apis/box'
import { Pay } from '../../../../utils'

export default {
  data () {
    return {
      box: null,
      userInfo: null,
      sort: null,
      type: null,
      boxGroup,
      awardsImage: null,
      awardsName: null,
      isTransparent: false
    }
  },
  async mounted () {
    ({ data: { data: this.userInfo } } = await UserInfo())
    this.type = Number(this.$route.params.type)
    this.box = this.boxGroup.find(res => res.type === this.type)
    this.sort = Number(this.$route.query.sort)
    Pay.clearPayInfo()
  },
  computed: {
    buttonText () {
      if (this.userInfo && this.userInfo.openBoxTimes) return '立即开盒'
      return '15元开盒'
    }
  },
  methods: {
    // 使用透视卡
    useCard () {
      if (this.isTransparent) {
        this.$toast.show({
          message: '该盒子已经透视过了',
          duration: 3000
        })
        return
      }
      if (this.userInfo.transparentTimes) this.transparent()
      else this.payTransparent()
    },
    // 有透视次数，直接透视
    async transparent () {
      this.$loading.show({
        render (h) {
          return h('div', '正在为您透视……')
        }
      })
      this.isTransparent = true
      let { data: { data } } = await Operation({
        category: 2,
        sort: this.sort
      })
      this.userInfo.transparentTimes = this.userInfo.transparentTimes - 1
      this.awardsName = data.awardsName
      this.awardsImage = data.awardsImage
      this.$loading.hide()
    },
    // 无透视次数 购买
    async payTransparent () {
      const { data: { data: payInfo } } = await PayPoint(2)
      Pay.toPay({ payInfo })
    },
    // 点击按钮
    async onConfirm () {
      if (this.userInfo && this.userInfo.openBoxTimes) {
        this.openBox()
      } else {
        const { data: { data: payInfo } } = await PayPoint(1)
        Pay.toPay({ payInfo })
      }
    },
    // 开盒
    openBox () {
      this.$router.push({
        name: 'OpenBox',
        params: {
          type: this.type
        },
        query: {
          sort: this.sort,
          isTransparent: this.isTransparent
        }
      })
    },
    // 换一盒
    async refresh () {
      this.isTransparent = false
      this.awardsImage = null
      this.awardsName = null
      this.$loading.show({
        render (h) {
          return h('div', '正在为您挑选……')
        }
      })
      const { data: { data } } = await ChangeOne(this.sort)
      this.$loading.hide()
      this.sort = data.sort
      this.type = data.newColor
      this.box = this.boxGroup.find(res => res.type === this.type)
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
  box-sizing: border-box;
  height: 6.58rem;
  padding-top: 1.2rem;
  padding-left: 0.34rem;
  padding-right: 0.34rem;
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
    right: 0;
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
