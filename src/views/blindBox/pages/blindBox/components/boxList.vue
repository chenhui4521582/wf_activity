<template>
  <section class="box-list-wrapper">
    <section class="box-list-container">
      <ul
        class="box-list"
        :class="{ 'all-has-shelf': isRefresh }"
        v-for="(items, key) in boxList"
        :key="'list' + key"
        :style="{ zIndex: 3 - key }"
      >
        <li
          class="box-item"
          v-for="(item, index) in items"
          :key="'item' + index"
          :class="{ 'shake-rotate': hasShake(item.state) }"
          @click="toDetail(item)"
        >
          <box-info
            :class="{ 'has-shelf': hasShelf(item) }"
            :info="item"
          ></box-info>
          <div class="old-box-image box-drop" v-if="item.state === 3">
            <img :src="item.extend.oldColor | boxImage(item.state)" alt="" />
            <div class="awards-info">
              <p class="other-people">用户{{ item.extend.nickname }}正在购买</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <article class="botton-wrapper">
      <section class="btn-container">
        <div class="money-buy" @click="buyOne">{{
          isOpenBox ? "立即开盒" : "15元开一次"
        }}</div>
        <div class="change-btn" @click="changeAll">换一批</div>
      </section>
      <section v-if="!isOpenBox" class="btn-container">
        <div class="leaf-buy" v-if="userInfo.leafsPay" @click="leafsBuy">使用金叶子购买</div>
        <p class="buy-tip">购买成功后，即可任意选盒开奖</p>
      </section>
      <!-- 非年货节按钮 begin-->
      <!-- <section class="btn-container">
        <m-button @confirm="buyOne">{{
          isOpenBox ? "立即开盒" : "15元开一次"
        }}</m-button>
        <div class="change-btn" @click="changeAll">换一批</div>
      </section>
      <section v-if="!isOpenBox" class="btn-container">
        <m-button :button-style="buttonStyle" @confirm="leafsBuy">使用金叶子购买</m-button>
        <p class="buy-tip">购买成功后，即可任意选盒开奖</p>
      </section> -->
      <!-- 非年货节按钮 end -->
    </article>
    <Dialog
      :show="isShowPop"
      title="支付完成"
      :close="true"
      @onClose="closePop()"
    >
      <p class="pop-content">
        您已付款成功，选一个盲盒吧
      </p>
      <section class="pop-btn-wrapper" slot="footer">
        <div class="confirm" @click="closePop(1)">
          好的
        </div>
        <div class="cancel" @click="closePop(2)">
          不选了，随机开一个
        </div>
      </section>
    </Dialog>
    <TipDialog v-if="showTip" source="index" :show="showTip" @close="showTip=false"/>
    <VirtualDialog :show="isVirtual"
      v-if="isVirtual"
      source="index"
      @close="isVirtual = false"
      @updateUserInfo="getUserInfo" />
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { BoxList, ChangeAll, PayPoint } from '../../../apis/box';
import { UserInfo, Popup } from '../../../apis/user';
import MButton from '../../../components/MButton';
import { Pay } from '../../../utils';
import Dialog from '../../../components/dialog';
import BoxInfo from './boxInfo';
import { boxGroup } from '../../../config/box';
import TipDialog from './tip-dialog'
import VirtualDialog from '../../../components/virtual-dialog'

export default {
  name: '',
  components: {
    MButton,
    Dialog,
    BoxInfo,
    TipDialog,
    VirtualDialog
  },
  data () {
    return {
      buttonStyle: {
        background: 'linear-gradient(90deg,#A3A9C0,#646B84)',
        color: '#fff',
        fontSize: '0.34rem'
      },
      isVirtual: false,
      // 用户当天是否第一次进入页面
      isFirstIn: true,
      showTip: false,
      isChange: false,
      box: [],
      userInfo: {},
      isShowPop: false,
      isShake: false,
      isHasShelf: false,
      isRefresh: false,
      refreshTimer: null,
      boxTimer: null
    }
  },
  filters: {
    boxImage (color, state) {
      let type = '';
      switch (state) {
        case 4:
          type = 'boxTransparent';
          break
        default:
          type = 'box';
          break
      }
      let index = boxGroup.findIndex(res => res.type === Number(color))
      return boxGroup[index][type]
    }
  },
  computed: {
    // 是否可以开盒
    isOpenBox () {
      return this.userInfo.openBoxTimes
    },
    boxList () {
      let len = this.box.length
      let n = 4 // 假设每行显示4个
      let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1)
      let res = []
      for (let i = 0; i < lineNum; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
        let temp = this.box.slice(i * n, i * n + n)
        res.push(temp)
      }
      return res
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await this.getBoxInfo()
      await this.getUserInfo()
      await this.loopBox()
      if (!sessionStorage.blindBoxFirstTime) {
        sessionStorage.blindBoxFirstTime = true
        this.isRefresh = true
        this.isChange = true
        this.refreshTimer = setTimeout(() => {
          this.isRefresh = false
          this.isChange = false
          clearTimeout(this.refreshTimer)
        }, 1000)
      }
      this.$emit('load')
    },
    // 用户点击被透视的盒子是否弹窗
    async isPopup () {
      ({data: {data: this.isFirstIn}} = await Popup(1))
    },
    // 使用金叶子购买
    leafsBuy () {
      GLOBALS.marchSetsPoint('A_H5PT0225002683')
      this.isVirtual = true
    },
    // 获取盒子信息
    async getBoxInfo () {
      const res = await BoxList()
      const { data } = res.data
      this.$set(this, 'box', data || [])
    },
    loopBox () {
      clearTimeout(this.boxTimer)
      this.boxTimer = setTimeout(async () => {
        await this.getBoxInfo()
        this.loopBox()
      }, 3000)
    },
    // 换一批
    async changeAll () {
      if (this.isChange) return
      this.isChange = true
      const res = await ChangeAll()
      const { data } = res.data
      this.box = data || []
      this.loopBox()
      this.isRefresh = true
      this.refreshTimer = setTimeout(() => {
        this.isRefresh = false
        this.isChange = false
        clearTimeout(this.refreshTimer)
      }, 1000)
      GLOBALS.marchSetsPoint('A_H5PT0225002540') // H5平台-盲盒页面-换一批点击
    },
    // 获取用户活动信息
    async getUserInfo () {
      const res = await UserInfo()
      const { data } = res.data
      this.userInfo = data || {}
      if (this.userInfo.openBoxTimes) {
        this.isShowPop = true
        GLOBALS.marchSetsPoint('A_H5PT0225002547') // H5平台-盲盒页面-购买盲盒支付成功弹窗加载完成
      }
    },
    async toDetail (item) {
      // this.isShake = false
      // 透视状态下点击盒子
      if (item.state === 2) {
        await this.isPopup()
        if (this.isFirstIn) {
          this.showTip = true
        } else {
          this.$toast.show({
            message: '该盒子正在被透视，请选择其他盒子',
            duration: 2000
          })
        }
        GLOBALS.marchSetsPoint('A_H5PT0225002686', {
          awards_id: item.sort
        })
      } else if (item.state === 3) {
        // 别人正在购买
        return
      } else {
        if (this.userInfo.openBoxTimes) {
          this.$router.push(
            `/openBox/${item.color}?sort=${item.sort}${
              item.state === 4 ? '&isTransparent=true' : ''
            }`
          )
        } else {
          this.$router.push(
            `/chooseBox/${item.color}?sort=${item.sort}${
              item.state === 4
                ? `&awardsName=${item.extend.awardsName}&awardsImage=${item.extend.awardsImage}`
                : ''
            }`
          )
        }
        GLOBALS.marchSetsPoint('A_H5PT0225002542', {
          awards_id: item.sort
        }) // H5平台-盲盒页面-点击选择盲盒(不计入假状态的盒子点击)
      }
    },
    async buyOne () {
      if (this.userInfo && this.userInfo.openBoxTimes) {
        GLOBALS.marchSetsPoint('A_H5PT0225002547') // H5平台-盲盒页面-购买盲盒支付成功弹窗加载完成
        this.isShowPop = true
      } else {
        const {
          data: { data: payInfo }
        } = await PayPoint(1)
        Pay.toPay({ payInfo })
        GLOBALS.marchSetsPoint('A_H5PT0225002539') // H5平台-盲盒页面-开一次按钮点击(点击购买)
      }
    },
    closePop (type) {
      this.isShowPop = false
      switch (type) {
        case 1:
          this.isShake = true
          GLOBALS.marchSetsPoint('A_H5PT0225002548') // H5平台-盲盒页面-购买盲盒支付成功弹窗-好的点击
          break;
        case 2:
          let canBuyBoxArr = this.box.filter(
            item => item.state === 1 || item === 4
          )
          let selectedItem =
            canBuyBoxArr[Math.floor(Math.random() * canBuyBoxArr.length)]
          this.toDetail(selectedItem)
          GLOBALS.marchSetsPoint('A_H5PT0225002549') // H5平台-盲盒页面-购买盲盒支付成功弹窗-随机开点击
          break;
        default:
          GLOBALS.marchSetsPoint('A_H5PT0225002550') // H5平台-盲盒页面-购买盲盒支付成功弹窗-关闭点击
          break;
      }
    },
    hasShake (state) {
      return (state === 1 || state === 4) && this.isShake
    },
    hasShelf (item) {
      return item.state === 3
    },
    clearTimer () {
      clearTimeout(this.refreshTimer)
      clearInterval(this.boxTimer)
    }
  },
  destroyed () {
    this.clearTimer()
  }
}
</script>

<style lang="less" scoped>
@import "../index.less";
.box-list-wrapper {
  position: relative;
  left: 0;
  top: 0;
  margin-top: -0.32rem;
  z-index: 99;
  // background: #f0ead1;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  .button-wrapper {
    flex: 1;
  }
  .box-list-container {
    background: #f0ead1;
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 0.18rem;
      background: #f4d6b0 url(../assets/list-bottom-bg.png) no-repeat center
        center / 100% 100%;
      font-size: 0;
    }
  }
  .box-list {
    background: url(../assets/list-bg.png) no-repeat center bottom / 100%
      0.96rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0.04rem 0 0.2rem;
    position: relative;
    .box-info {
      background: url(../assets/box-shadow.png) no-repeat center ~"0.4rem" / 100%
        1.12rem;
    }
    &.all-has-shelf:after {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      background: url(../assets/long-shelf.png) no-repeat center center / 98%
        1.2rem;
    }
    .gold-buy {
      margin-top: 0.15rem;
    }
    .box-item {
      min-width: 1.8rem;
      text-align: center;
      position: relative;
      // .has-shelf::after {
      //   content: "";
      //   position: absolute;
      //   display: block;
      //   width: 100%;
      //   height: 100%;
      //   top: 0;
      //   background: url(../assets/shelf.png) no-repeat center center / 90%
      //     1.2rem;
      // }
      .old-box-image {
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -0.73rem;
        height: 1.7rem;
        width: 1.46rem;
        background: url(../assets/box-shadow.png) no-repeat center ~"0.4rem" / 100%
          1.12rem;
        img {
          width: 100%;
          height: 100%;
        }

        .awards-info {
          position: absolute;
          top: 0.6rem;
          left: 0;
          width: 100%;
          text-align: center;
          .other-people {
            margin: 0.2rem 0 0;
            color: #2a2d3c;
            background: #fff;
            border-radius: 0.13rem;
            font-size: 0.18rem;
            padding: 0.1rem;
            word-break: break-all;
          }
        }
      }
    }
  }
  .btn-container {
    position: relative;
    background: #f4d6b0;
    padding: 0.16rem;
    .money-buy {
      margin: 0 auto;
      width: 3.07rem;
      line-height: 0.78rem;
      color: #F5DBBB;
      font-size: 0.36rem;
      text-align: center;
      background: url('../assets/button1.png') no-repeat;
      background-size: 100% 100%;
    }
    .leaf-buy {
      margin: 0 auto;
      width: 3.07rem;
      line-height: 0.78rem;
      color: #F4D6B0;
      font-size: 0.3rem;
      text-align: center;
      background: url('../assets/button2.png') no-repeat;
      background-size: 100% 100%;
    }
    .buy-tip {
      color: #7b4913;
      font-size: 0.24rem;
      text-align: center;
      padding-top: 0.33rem;
    }
    .button {
      margin: auto;
    }
    .change-btn {
      position: absolute;
      top: calc(~"50%" - 0.21rem);
      right: 0.36rem;
      width: 1.14rem;
      box-sizing: border-box;
      color: #DD1914;
      border: 0.02rem solid #DD1914;
      line-height: 0.42rem;
      text-align: center;
      border-radius: 0.22rem;
      font-size: 0.24rem;
    }
  }

  .pop-content {
    font-size: 0.24rem;
    font-weight: bold;
    color: #1a1e28;
    line-height: 0.36rem;
    text-align: center;
    padding: 0 0.44rem 0.2rem;
  }
  .pop-btn-wrapper {
    padding: 0.2rem 0;
    .confirm {
      width: 4.1rem;
      height: 0.7rem;
      line-height: 0.7rem;
      background: #d1ac42;
      border-radius: 0.16rem;
      margin: auto;
      color: #fff;
      font-size: 0.24rem;
      font-weight: bold;
      border: #d1ac42 solid 0.02rem;
    }
    .cancel {
      width: 4.1rem;
      height: 0.7rem;
      line-height: 0.7rem;
      background: #fff;
      border-radius: 0.16rem;
      margin: 0.3rem auto 0;
      color: #d1ac42;
      font-size: 0.24rem;
      font-weight: bold;
      border: #d1ac42 solid 0.02rem;
    }
  }
}
</style>
