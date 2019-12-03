<template>
  <article class="receive-wrapper">
    <NavBar @back="$router.go(-1)"
      title="领取奖品" />
    <section class="content">
      <div :class="{'bg':!isPostInfo}"
        @click="isReceiveInfo=true"
        class="post-info">
        <p class="no-info"
          v-if="!isPostInfo">请填写收货人信息 ></p>
      </div>
      <p class="total">共<span>{{this.goodsList.length}}件</span>商品</p>
      <Goods v-for="(item,index) in goodsList"
        :key="index"
        :goods="item">
        <p class="goods-time"
          slot="left">获奖时间：{{item.openTime }}</p>
        <div class="receive-price"
          slot="right">
          <p class="receive-price-amount">¥{{item.showAmount}}</p>
          <p>（价值）</p>
        </div>
      </Goods>
    </section>
    <section class="footer">
      <p class="footer__p">温馨提示：满2件奖品发货可包邮哦</p>
      <div @click="confirm"
        :class="isPostInfo?'primary':''"
        class="footer__div">确认</div>
    </section>
    <Dialog :show="show"
      title="温馨提示"
      @onCancel="$router.push({name:'Index'})"
      @onConfirm="show=false"
      cancel="去再开一盒"
      confirm="<p style='color:#FF4141'>支付邮费</p>">
      <p class="tip">
        您领取的奖品不足2件，<br>需要支付<span>8元</span>邮费才能发货哦~
        <br>满2件奖品发货即可包邮！
      </p>
    </Dialog>
    <ReceiveInfo :show="isReceiveInfo"
      v-if="isReceiveInfo"
      :receive="post"
      @onConfirm="updatePostInfo"
      @onClose="isReceiveInfo=false" />
  </article>
</template>

<script>
import NavBar from '../../components/navBar'
import Goods from '../../components/goods'
import Dialog from '../../components/dialog'
import ReceiveInfo from './components/receiveInfo'
import { InventoryList, PostInfo } from '../../apis/user'

export default {
  data () {
    return {
      show: false,
      isReceiveInfo: false,
      goodsList: [],
      post: {}
    }
  },
  async mounted () {
    ({ data: { data: this.goodsList } } = await InventoryList(1));
    ({ data: { data: this.post } } = await PostInfo())
  },
  computed: {
    isPostInfo () {
      if (this.post && this.post.address && this.post.mobile && this.post.name) return true
      return false
    }
  },
  methods: {
    // 更新收货地址
    updatePostInfo (val) {
      this.post = val
      this.isReceiveInfo = false
    },
    // 确认按钮
    confirm () {
      if (!this.isPostInfo) {
        this.$toast.show({
          message: '请填写收货信息',
          duration: 1000
        })
        return
      }
      if (this.goodsList.length < 2) {
        this.show = true
      }
    }
  },
  components: {
    NavBar,
    Goods,
    Dialog,
    ReceiveInfo
  }
}
</script>

<style lang="less" scoped>
.receive-wrapper {
  display: flex;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  .tip {
    padding: 0 0.43rem 0.46rem 0.43rem;
    color: #888888;
    font-size: 0.24rem;
    line-height: 1.6;
    span {
      color: #ff4141;
    }
  }
  .content {
    padding-top: 0.32rem;
    box-sizing: border-box;
    flex: 1;
    background: rgb(238, 238, 238);
    overflow: scroll;
    .post-info {
      width: 6.61rem;
      height: 2.36rem;
      border-radius: 0.16rem;
      background: #fff;
      margin: 0 auto;
      font-size: 0.28rem;
      .no-info {
        padding: 0.3rem;
        color: #fff;
      }
      &.bg {
        background: url("./assets/bg.png") no-repeat;
        background-size: cover;
      }
    }
    .total {
      font-size: 0.24rem;
      color: #999;
      text-align: left;
      padding: 0.3rem 0 0.2rem 0.3rem;
      span {
        color: #d1ac42;
      }
    }
    .goods-time {
      margin-top: 0.09rem;
    }
    .receive-price {
      text-align: center;
      font-size: 0.2rem;
      color: #bbb;
      .receive-price-amount {
        font-size: 0.32rem;
        color: #ff4141;
        font-weight: bold;
        padding-bottom: 0.15rem;
      }
    }
  }
  .footer {
    font-size: 0.24rem;
    color: #eee;
    background: rgb(238, 238, 238);
    .footer__p {
      font-size: 0.2rem;
      color: #bbb;
      padding-top: 0.13rem;
      padding-bottom: 0.13rem;
      padding-left: 0.34rem;
    }
    .footer__div {
      text-align: center;
      line-height: 0.9rem;
      background: rgba(209, 172, 66, 0.5);
      &.primary {
        background: #d1ac42;
      }
    }
  }
}
</style>
