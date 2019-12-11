<template>
  <article class="receive-wrapper">
    <NavBar @back="$router.push({name:'MyPrize'})" title="领取奖品" />
    <section class="content" v-if="isLoad">
      <div :class="{'bg':!isPostInfo}" @click="editPostInfo" class="post-info">
        <p class="no-info" v-if="!isPostInfo">请填写收货人信息 <img src="./assets/arrow-white.png"></p>
        <div v-else class="edit-info">
          <img class="icon" src="./assets/icon.png">
          <div class="edit-info__div">
            <p class="name">{{post.name}}</p>
            <p class="mobile">{{post.mobile}}</p>
            <p class="address">{{post.address}}</p>
          </div>
          <img class="arrow" src="./assets/arrow.png">
        </div>
      </div>
      <p class="total">共<span>{{this.goodsList.length}}件</span>商品</p>
      <Goods v-for="(item,index) in goodsList" :key="index" :goods="item">
        <p class="goods-time" slot="left">获奖时间：{{item.openTime }}</p>
        <div class="receive-price" slot="right">
          <p class="receive-price-amount">¥{{item.showAmount}}</p>
          <p>（价值）</p>
        </div>
      </Goods>
    </section>
    <section class="footer">
      <p class="footer__p">温馨提示：满2件奖品发货可包邮哦</p>
      <div @click="confirm" :class="isPostInfo?'primary':''" class="footer__div">确认</div>
    </section>
    <Dialog :show="show" :close="true" @onClose="onClose" title="温馨提示" @onCancel="toIndex" @onConfirm="onPay" cancel="去再开一盒" confirm="<p style='color:#FF4141'>支付邮费</p>">
      <p class="tip">
        您领取的奖品不足2件，<br>需要支付<span>8元</span>邮费才能发货哦~
        <br>满2件奖品发货即可包邮！
      </p>
    </Dialog>
    <ReceiveInfo :show="isReceiveInfo" v-if="isReceiveInfo" :receive="post" @onConfirm="updatePostInfo" @onClose="isReceiveInfo=false" />
  </article>
</template>

<script>
import NavBar from '../../components/navBar'
import Goods from '../../components/goods'
import Dialog from '../../components/dialog'
import ReceiveInfo from './components/receiveInfo'
import { InventoryList, PostInfo } from '../../apis/user'
import { Receiver, PayPoint } from '../../apis/box'
import { Pay } from '../../utils/index'

export default {
  data () {
    return {
      isLoad: false,
      show: false,
      isReceiveInfo: false,
      goodsList: [],
      post: {}
    }
  },
  async mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0225002581');
    ({ data: { data: this.goodsList } } = await InventoryList(1));
    ({ data: { data: this.post } } = await PostInfo())
    if (this.$route.query.type === 'success' && this.post.singlePostTimes) {
      await Receiver()
      this.receiveSuccess()
    }
    this.isLoad = true
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
      this.post = Object.assign({}, val)
      this.isReceiveInfo = false
    },
    // 填写收货人信息
    editPostInfo () {
      if (this.isPostInfo) GLOBALS.marchSetsPoint('A_H5PT0225002585')
      else GLOBALS.marchSetsPoint('A_H5PT0225002582')
      this.isReceiveInfo = true
      GLOBALS.marchSetsPoint('A_H5PT0225002583')
    },
    // 关闭按钮点击
    onClose () {
      GLOBALS.marchSetsPoint('A_H5PT0225002590')
      this.show = false
    },
    // 再开一盒
    toIndex () {
      GLOBALS.marchSetsPoint('A_H5PT0225002589')
      this.$router.push({ name: 'Index' })
    },
    // 支付邮费
    async onPay () {
      GLOBALS.marchSetsPoint('A_H5PT0225002588')
      this.show = false
      const { data: { data: payInfo } } = await PayPoint(3)
      Pay.toPay({ payInfo, originDeffer: '/activities/blindBox.html#/receiveGoods?type=success' })
    },
    // 确认按钮
    async confirm () {
      GLOBALS.marchSetsPoint('A_H5PT0225002586')
      if (!this.isPostInfo) {
        this.$toast.show({
          message: '请填写收货信息',
          duration: 1000
        })
        return
      }
      if (!this.goodsList.length) return
      if (this.goodsList.length < 2 && !this.post.singlePostTimes) {
        GLOBALS.marchSetsPoint('A_H5PT0225002587')
        this.show = true
        return
      }
      await Receiver()
      this.receiveSuccess()
    },
    // 领取成功
    receiveSuccess () {
      this.$toast.show({
        message: '领取成功',
        duration: 2000
      })
      setTimeout(() => {
        this.$router.push({
          name: 'MyPrize',
          query: {
            active: 1
          }
        })
      }, 2000)
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
        display: flex;
        align-items: center;
        img {
          width: 0.1rem;
          margin-left: 0.17rem;
        }
      }
      .edit-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem 0.3rem 0 0.4rem;
        font-size: 0.24rem;
        color: #000;
        text-align: left;
        .icon {
          width: 0.75rem;
        }
        .arrow {
          width: 0.15rem;
        }
        &__div {
          padding: 0 0.4rem 0 0.5rem;
          flex: 1;
          .name {
            font-size: 0.28rem;
            padding-bottom: 0.18rem;
          }
          .mobile {
            font-size: 0.28rem;
            padding-bottom: 0.18rem;
            color: #888;
          }
          .address {
            line-height: 1.5;
          }
        }
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
