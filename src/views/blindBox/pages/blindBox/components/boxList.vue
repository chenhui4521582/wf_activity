<template>
  <section class="box-list-wrapper">
    <section class="box-list-container">
      <ul class="box-list"
        :class="{'all-has-shelf':firstTime}"
        v-for="(items,key) in boxList"
        :key="'list'+key"
        :style="{zIndex:3-key}">
        <li class="box-item"
          v-for="(item,index) in items"
          :key="'item'+index"
          :class="{'shake-rotate':hasShake(item.state)}"
          @click="toDetail(item)">
          <box-info :class="{'has-shelf':hasShelf(item)}"
            :info="item"></box-info>
          <div class="old-box-image box-drop"
            v-if="item.state===3">
            <img :src="item.extend.oldColor|boxImage(item.state)"
              alt="">
            <div class="awards-info">
              <p class="other-people">用户{{item.extend.nickname}}正在购买</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="btn-container">
      <m-button @confirm="buyOne">{{userInfo.openBoxTimes?'立即开盒':'15元开一次'}}</m-button>
      <div class="change-btn"
        @click="changeAll">换一批</div>
    </section>
    <Dialog :show="isShowPop"
      title="支付完成"
      :close="true"
      @onClose="closePop()">
      <p class="pop-content">
        您已付款成功，选一个盲盒吧
      </p>
      <section class="pop-btn-wrapper"
        slot="footer">
        <div class="confirm"
          @click="closePop(1)">
          好的
        </div>
        <div class="cancel"
          @click="closePop(2)">
          不选了，随机开一个
        </div>
      </section>
    </Dialog>
  </section>
</template>

<script>
import { BoxList, ChangeAll, PayPoint } from '../../../apis/box'
import { UserInfo } from '../../../apis/user'
import MButton from '../../../components/MButton'
import { Pay } from '../../../utils'
import Dialog from '../../../components/dialog'
import BoxInfo from './boxInfo'
import { boxGroup } from '../../../config/box'
export default {
  name: '',
  components: {
    MButton, Dialog, BoxInfo
  },
  data () {
    return {
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
      let type = ''
      switch (state) {
        case 4:
          type = 'boxTransparent'
          break
        default:
          type = 'box'
          break
      }
      let index = boxGroup.findIndex(res => res.type === Number(color))
      return boxGroup[index][type]
    }
  },
  computed: {
    boxList () {
      let len = this.box.length
      let n = 4 // 假设每行显示4个
      let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
      let res = []
      for (let i = 0; i < lineNum; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
        let temp = this.box.slice(i * n, i * n + n)
        res.push(temp)
      }
      return res
    },
    firstTime () {
      return !sessionStorage.blindBoxFirstTime || this.isRefresh
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await this.getBoxInfo()
      await this.getUserInfo()
      this.loopBox()
      sessionStorage.blindBoxFirstTime = true
    },
    // 获取盒子信息
    async getBoxInfo () {
      const res = await BoxList()
      const { data } = res.data
      console.log('透视', res.data.data.filter(item => item.state === 2).length)
      console.log('购买', res.data.data.filter(item => item.state === 3).length)
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
      const res = await ChangeAll()
      const { data } = res.data
      this.box = data || []
      this.loopBox()
      this.isRefresh = true
      this.refreshTimer = setTimeout(() => {
        this.isRefresh = false
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
        GLOBALS.marchSetsPoint("A_H5PT0225002547") // H5平台-盲盒页面-购买盲盒支付成功弹窗加载完成
      }
    },
    async toDetail (item) {
      this.isShake = false
      if (item.state === 2) {
        return
      }
      if (this.userInfo.openBoxTimes) {
        this.$router.push(`/openBox/${item.color}?sort=${item.sort}${item.state === 4 ? '&isTransparent=true' : ''}`)
      } else {
        this.$router.push(`/chooseBox/${item.color}?sort=${item.sort}${item.state === 4 ? `&awardsName=${item.extend.awardsName}&awardsImage=${item.extend.awardsImage}` : ''}`)
      }
      GLOBALS.marchSetsPoint("A_H5PT0225002542", {
        awards_id: item.sort
      }) // H5平台-盲盒页面-点击选择盲盒(不计入假状态的盒子点击)
    },
    async buyOne () {
      if (this.userInfo && this.userInfo.openBoxTimes) {
        GLOBALS.marchSetsPoint("A_H5PT0225002547") // H5平台-盲盒页面-购买盲盒支付成功弹窗加载完成
        this.isShowPop = true
      } else {
        const { data: { data: payInfo } } = await PayPoint(1)
        Pay.toPay({ payInfo })
        GLOBALS.marchSetsPoint('A_H5PT0225002539') // H5平台-盲盒页面-开一次按钮点击(点击购买)
      }
    },
    closePop (type) {
      this.isShowPop = false
      switch (type) {
        case 1:
          this.isShake = true
          GLOBALS.marchSetsPoint("A_H5PT0225002548") // H5平台-盲盒页面-购买盲盒支付成功弹窗-好的点击
          break
        case 2:
          let canBuyBoxArr = this.box.filter(item => item.state === 1 || item === 4)
          let selectedItem = canBuyBoxArr[Math.floor((Math.random() * canBuyBoxArr.length))]
          this.toDetail(selectedItem)
          GLOBALS.marchSetsPoint("A_H5PT0225002549") // H5平台-盲盒页面-购买盲盒支付成功弹窗-随机开点击
          break
        default:
          GLOBALS.marchSetsPoint("A_H5PT0225002550") // H5平台-盲盒页面-购买盲盒支付成功弹窗-关闭点击
          break
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
  margin-top: -0.32rem;
  z-index: 1;
  overflow: hidden;
  .box-list-container {
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 0.18rem;
      background: #1b1f29 url(../assets/list-bottom-bg.png) no-repeat center
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

    .box-item {
      min-width: 1.8rem;
      text-align: center;
      background: url(../assets/box-shadow.png) no-repeat center ~"0.4rem" / 100%
        1.12rem;
      position: relative;
      .has-shelf::after {
        content: "";
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        background: url(../assets/shelf.png) no-repeat center center / 90%
          1.2rem;
      }
      .old-box-image {
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -0.73rem;
        height: 1.7rem;
        width: 1.46rem;
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
            color: #fff;
            font-size: 0.18rem;
          }
        }
      }
    }
  }
  .btn-container {
    position: relative;
    background: #1b1f29;
    padding: 0.16rem;
    .button {
      margin: auto;
    }
    .change-btn {
      position: absolute;
      top: calc(~"50%" - 0.21rem);
      right: 0.36rem;
      width: 1.14rem;
      box-sizing: border-box;
      color: #fff;
      border: 0.02rem solid #fff;
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
