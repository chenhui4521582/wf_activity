<template>
  <section class="box-list-wrapper">
    <section class="box-list-container">
      <ul class="box-list"
        v-for="(items,key) in boxList"
        :key="'list'+key">
        <li class="box-item"
          :class="{'shake-rotate':isShake}"
          v-for="(item,index) in items"
          :key="'item'+index"
          @click="toDetail(item)">
          <img class="box-image"
            :src="item.color|boxImage(item.state)"
            alt="">
          <div class="awards-info"
            v-if="item.extend">
            <template v-if="item.state===5">
              <img :src="item.extend"
                alt="">
            </template>
            <template v-else>
              <p>用户{{item.extend.nickname}}{{item.state===3?'购买成功':'正在透视'}}</p>
            </template>
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
import { boxGroup } from '../../../config/box'
import { BoxList, ChangeAll, Lock, PayPoint } from '../../../apis/box'
import { UserInfo } from '../../../apis/user'
import MButton from '../../../components/MButton'
import { Pay } from '../../../utils'
import Dialog from '../../../components/dialog'
export default {
  name: '',
  components: {
    MButton, Dialog
  },
  data () {
    return {
      box: [],
      userInfo: {},
      countTimer: null,
      isShowPop: true,
      isShake: false
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
    }
  },
  filters: {
    boxImage (color, state) {
      let type = ''
      switch (state) {
        case 5:
          type = 'boxTransparent'
          break;
        default:
          type = 'box'
          break;
      }
      let index = boxGroup.findIndex(res => res.type === Number(color))
      return boxGroup[index][type]
    }
  },
  mounted () {
    this.getBoxInfo()
    Pay.clearPayInfo()
  },
  methods: {
    // 获取盒子信息
    async getBoxInfo () {
      const res = await BoxList()
      const { data } = res.data
      this.box = data || []
    },
    // 换一批
    async changeAll () {
      const res = await ChangeAll()
      const { data } = res.data
      this.box = data || []
    },
    // 获取用户活动信息
    async getUserInfo () {
      const res = await UserInfo()
      const { data } = res.data
      this.box = data || {}
    },
    async toDetail (item) {
      this.isShake = false
      const res = await Lock(item.sort)
      const { code } = res.data
      if (code === 200) {
        if (this.userInfo.openBoxTimes) {
          this.$router.push(`/openBox/${item.color}?sort=${item.sort}`)
        } else {
          this.$router.push(`/chooseBox/${item.color}?sort=${item.sort}&isTransparent=${item.state === 5}`)
        }
      }
    },
    async buyOne () {
      if (this.userInfo && this.userInfo.openBoxTimes) {
        this.isShowPop = true
      } else {
        const { data: { data: payInfo } } = await PayPoint(1)
        Pay.toPay({ payInfo })
      }
    },
    closePop (type) {
      this.isShowPop = false
      switch (type) {
        case 1:
          this.isShake = true
          break;

        default:
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../index.less";
.box-list-wrapper {
  margin-top: -0.32rem;
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
    .box-item {
      min-width: 1.8rem;
      text-align: center;
      background: url(../assets/box-shadow.png) no-repeat center ~"0.4rem" / 100%
        1.12rem;
      position: relative;
      .box-image {
        height: 1.7rem;
        width: 1.46rem;
      }
      .awards-info {
        position: absolute;
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
