<template>
  <section class="box-wrapper">
    <div class="box">
      <div :class="{'on-change':isOnChange}" class="box__img--box">
        <div class="img-wrapper">
          <img :src="awardsImage? box && box.boxTransparent:box &&box.box">
        </div>
        <img class="box__img--goods" v-if="awardsImage" :src="awardsImage | imgFilter">
      </div>
      <p v-if="awardsName">{{awardsName | textFilter}}</p>
    </div>
    <p @click="refresh" class="refresh"><img src="./assets/refresh.png">换一盒</p>
    <MButton :breathe="userInfo&&userInfo.openBoxTimes?true:false" @confirm="onConfirm"
      class="choose-button">{{buttonText}}</MButton>
    <MButton :button-style="buttonStyle" @confirm="leafsBuy" v-if="!isOpen && userInfo && userInfo.leafsPay" class="gold-buy">使用金叶子购买
    </MButton>
    <VirtualDialog :show="isVirtual" source="detail" v-if="isVirtual" @close="isVirtual = false"
      @updateUserInfo="updateUserInfo" />
    <Side-Bar @use="useCard" :user-info="userInfo" class="side-bar" />
  </section>
</template>

<script>
import SideBar from '../sideBar'
import MButton from '../../../../components/MButton'
import VirtualDialog from '../../../../components/virtual-dialog'
import { boxGroup } from '../../../../config/box'
import { UserInfo } from '../../../../apis/user'
import { Operation, ChangeOne, PayPoint } from '../../../../apis/box'
import { Pay } from '../../../../utils'

export default {
  data () {
    return {
      isOnChange: false,
      box: null,
      userInfo: null,
      sort: null,
      type: null,
      boxGroup,
      buttonStyle: {
        background: 'linear-gradient(90deg,#A3A9C0,#646B84)',
        color: '#fff',
        fontSize: '0.34rem'
      },
      isVirtual: false,
      awardsImage: null,
      awardsName: null,
      isTransparent: false
    }
  },
  async mounted () {
    if (this.$route.query.awardsImage) {
      this.awardsImage = this.$route.query.awardsImage
      this.isTransparent = true
    }
    if (this.$route.query.awardsName) this.awardsName = this.$route.query.awardsName
    this.type = Number(this.$route.params.type)
    this.box = this.boxGroup.find(res => res.type === this.type)
    this.sort = Number(this.$route.query.sort)
    await this.updateUserInfo()
  },
  computed: {
    isOpen () {
      return this.userInfo && this.userInfo.openBoxTimes
    },
    buttonText () {
      if (this.isOpen) return '立即开盒'
      return '开一盒试试'
    }
  },
  methods: {
    // 更新用户信息
    async updateUserInfo () {
      ({ data: { data: this.userInfo } } = await UserInfo())
      if (this.userInfo && this.userInfo.openBoxTimes) {
        this.openBox()
      }
    },
    // 使用金叶子购买
    leafsBuy () {
      GLOBALS.marchSetsPoint('A_H5PT0225002685')
      this.isVirtual = true
    },
    // 使用透视卡
    useCard () {
      if (this.isTransparent) {
        this.$toast.show({
          message: '该盒子已经透视过了',
          duration: 3000
        })
        return
      }
      if (this.userInfo.transparentTimes) {
        this.transparent()
        GLOBALS.marchSetsPoint('A_H5PT0225002559') // H5平台-盲盒页面-选盲盒页面-透视卡弹窗-使用点击(有透视卡)
      } else {
        this.payTransparent()
        GLOBALS.marchSetsPoint('A_H5PT0225002558') // H5平台-盲盒页面-选盲盒页面-透视卡弹窗-购买点击(无透视卡)
      }
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
        GLOBALS.marchSetsPoint('A_H5PT0225002552')
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
      this.$loading.show({
        render (h) {
          return h('div', '正在为您挑选……')
        }
      })
      const { data: { data } } = await ChangeOne()
      this.$loading.hide()
      this.isOnChange = true
      this.sort = data.sort
      this.type = data.newColor
      setTimeout(() => {
        this.isTransparent = false
        this.awardsImage = null
        this.awardsName = null
        this.box = this.boxGroup.find(res => res.type === this.type)
        this.isOnChange = false
      }, 700)
      GLOBALS.marchSetsPoint('A_H5PT0225002553') // H5平台-盲盒页面-选盲盒页面-换一盒点击
    }
  },
  components: {
    SideBar,
    MButton,
    VirtualDialog
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
  position: relative;
  z-index: 2;
  .choose-button {
    margin: 0 auto;
    margin-top: 0.5rem;
  }
  .gold-buy {
    margin: 0 auto;
    margin-top: 0.2rem;
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
      transition: all 0.7s;
      &.on-change {
        opacity: 0;
      }
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
