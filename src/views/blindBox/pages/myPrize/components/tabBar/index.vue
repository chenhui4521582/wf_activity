<template>
  <article class="myprize-wrapper">
    <Dialog :show="show"
      title="温馨提示"
      @onConfirm="onConfirm"
      confirm="我知道了">
      <p v-if="this.active===1"
        class="tip">
        领取成功后，预计1-2个工作日发货,请您耐心等待，并确保通话畅通若超时未发货，请及时联系<span @click="toOnlineService">在线客服</span>
      </p>
      <p class="tip"
        v-if="this.active===2">您的运单号为：{{orderNumber}} <span v-clipboard:success="copySuccess"
          v-clipboard:copy="orderNumber">复制</span></p>
    </Dialog>
    <Dialog :show="isExchange"
      title="换积分"
      cancel="取消"
      @onCancel="onCancel"
      @onConfirm="onExchange"
      :confirm="`<p style='color:#FF4141'>立即兑换</p>`">
      <p class="score-content">
        积分可以在<span class="score-center"
          @click="goScore">积分中心</span>兑换盲盒<br>
        优惠券，透视卡，包邮卡等奖品。<br>
        此奖品可兑换<span class="score-count">{{score}}</span>积分。
      </p>
      <p class="score-tip"><span class="icon">!</span> 兑换后,奖品将无法领取,请谨慎操作</p>
    </Dialog>
    <section class="container">
      <div class="bar"
        v-for="(item,index) in tabBar"
        @click="changeTab(index)"
        :key="item.label">
        <span class="bar__span"
          :class="{'active':index===active}">
          {{item.label}}
        </span>
      </div>
    </section>
    <section class="content">
      <p v-if="!isFollow"
        class="wechat">
        <span>
          关注公众号 及时跟踪物流
        </span>
        <span @click="follow">
          点击关注>
        </span>
      </p>
      <div v-if="this.goodsList && this.goodsList.length > 0"
        class="total">
        <p>共<span>{{this.goodsList.length}}件</span>商品</p>
        <p></p>
        <p v-if="this.active === 0 && this.goodsList && this.goodsList.length > 0"
          class="free-shipping">温馨提示: 领取奖品满2件即可包邮哦~</p>
      </div>
      <section v-if="this.goodsList && this.goodsList.length > 0">
        <Goods @viewProduct="viewProduct"
          v-for="(item,index) in goodsList"
          :key="index"
          :isPrice="active!==3"
          :goods="item">
          <div slot="left">
            <p class="goods-time">开盒时间：{{item.openTime}}</p>
            <p class="goods-time"
              v-if="item.sendTime">发货时间：{{item.sendTime}}</p>
          </div>
          <section slot="right">
            <div v-if="handelList[active]"
              @click="handelList[active].handle(item)"
              class="button"
              :class="handelList[active].buttonType">{{handelList[active].buttonText}}
            </div>
            <p class="score"
              @click="getScore(item.id)"
              v-if="active===0">换积分</p>
            <img v-if="active===3"
              class="recover"
              src="./assets/recover.png"
              alt="">
            <p v-if="active===3"
              class="score">{{item.remark}}</p>
          </section>
        </Goods>
      </section>
      <Default v-if="this.goodsList && this.goodsList.length === 0"
        :title="`您没有${tabBar[active].label}的盲盒奖品哦~`"
        @onConfirm="toIndex" />
    </section>
    <section @click="toOnlineService"
      class="service">
      <img src="./assets/service.png"
        alt="">
      <p>客服</p>
    </section>
    <ProductDialog :goods-detail="productDetail"
      v-if="showProduct"
      @close="showProduct=false"
      :show="showProduct" />
  </article>
</template>

<script>
import Goods from '../../../../components/goods'
import Default from '../../../../components/default'
import { sendStatusMapper } from '../../../../config/enum'
import { InventoryList } from '../../../../apis/user'
import { Recycle, CalcScore } from '../../../../apis/box'
import Dialog from '../../../../components/dialog'
import ProductDialog from '../../../../components/productDialog'
import { WechatUrl, isFollowWechat } from '../../../../global'

export default {
  data () {
    return {
      show: false,
      score: null,
      isFollow: false,
      isExchange: false,
      showProduct: false,
      productDetail: null,
      active: 0,
      id: null,
      goodsList: {
        awardsName: null,
        showAmount: null,
        remark: null
      },
      tabBar: sendStatusMapper,
      orderNumber: null,
      handelList: [
        {
          buttonType: 'button-primary',
          buttonText: '立即领取',
          handle: item => {
            GLOBALS.marchSetsPoint('A_H5PT0225002575', {
              awards_id: item.awardsName
            })
            this.$router.push({ name: 'ReceiveGoods' })
          }
        },
        {
          buttonType: 'button-ghost',
          buttonText: '待发货',
          handle: () => {
            GLOBALS.marchSetsPoint('A_H5PT0225002597')
            this.show = true
            GLOBALS.marchSetsPoint('A_H5PT0225002576')
          }
        },
        {
          buttonType: 'button-primary',
          buttonText: '立即查看',
          handle: item => {
            GLOBALS.marchSetsPoint('A_H5PT0225002579')
            this.orderNumber = item.remark
            this.show = true
            GLOBALS.marchSetsPoint('A_H5PT0225002699')
          }
        }
      ]
    }
  },
  mounted () {
    const active = Number(this.$route.query.active)
    if (active === 0 || active) this.active = active
    if (active === 3) GLOBALS.marchSetsPoint('A_H5PT0225002962')
    this.getTabGoods()
    new Promise(resolve => {
      resolve(isFollowWechat())
    }).then(resolve => {
      this.isFollow = resolve
    })
  },
  methods: {
    // 关注公众号
    follow () {
      // location.href = WechatUrl
      this.$router.push({
        name: 'bindwechat'
      })
    },
    // 查看商品详情弹窗
    viewProduct (val) {
      if (!val.awardsId) return
      this.productDetail = val
      this.showProduct = true
    },
    // 积分中心
    goScore () {
      this.$router.push({
        name: 'Score'
      })
    },
    // 换积分
    async getScore (id) {
      this.id = id
      GLOBALS.marchSetsPoint('A_H5PT0225002958')
      await CalcScore(this.id);
      ({ data: { data: this.score } } = await CalcScore(this.id))
      GLOBALS.marchSetsPoint('A_H5PT0225002959')
      this.isExchange = true
    },
    /**
     * @des 切换tab
     */
    changeTab (index) {
      this.goodsList = null
      this.active = index
      if (index === 0) GLOBALS.marchSetsPoint('A_H5PT0225002572')
      if (index === 1) GLOBALS.marchSetsPoint('A_H5PT0225002573')
      if (index === 2) GLOBALS.marchSetsPoint('A_H5PT0225002574')
      if (index === 3) GLOBALS.marchSetsPoint('A_H5PT0225002962')
      this.getTabGoods()
    },
    // 复制成功
    copySuccess () {
      this.$toast.show({
        message: '单号已复制',
        duration: 1000
      })
      GLOBALS.marchSetsPoint('A_H5PT0225002700')
    },
    // 获取相应tab下的数据
    async getTabGoods () {
      ({ data: { data: this.goodsList } } = await InventoryList(this.tabBar[this.active].value))
    },
    // 我知道了点击
    onConfirm () {
      GLOBALS.marchSetsPoint('A_H5PT0225002578')
      this.show = false
    },
    onCancel () {
      GLOBALS.marchSetsPoint('A_H5PT0225002961')
      this.isExchange = false
    },
    // 立即兑换
    async onExchange () {
      GLOBALS.marchSetsPoint('A_H5PT0225002960')
      await Recycle(this.id)
      this.isExchange = false
      this.$score.show({
        message: `+${this.score}积分`,
        duration: 2000
      })
      this.changeTab(3)
    },
    // 去抽盲盒
    toIndex () {
      const addressIndex = this.active
      GLOBALS.marchSetsPoint('A_H5PT0225002580', {
        source_address: addressIndex
      })
      this.$router.push({ name: 'Index' })
    },
    // 在线客服
    toOnlineService () {
      GLOBALS.marchSetsPoint('A_H5PT0225002577')
      location.href = 'https://wap.beeplaying.com/xmWap/#/my/customerService'
    }
  },
  components: {
    Default,
    Goods,
    Dialog,
    ProductDialog
  }
}
</script>

<style lang="less" scoped>
.myprize-wrapper {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  .recover {
    width: 1.03rem;
    margin: 0 auto;
    margin-top: -0.35rem;
    display: block;
  }
  .score-content {
    color: #888888;
    font-size: 0.24rem;
    line-height: 1.4;
    text-align: center;
    padding-bottom: 0.36rem;
    .score-center {
      color: #d0ab40;
    }
    .score-count {
      color: #ff2828;
      font-size: 0.3rem;
    }
  }
  .score-tip {
    color: #ff2828;
    font-size: 0.2rem;
    padding-bottom: 0.3rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      width: 0.18rem;
      height: 0.18rem;
      border: 1px solid #ff2828;
      border-radius: 50%;
      margin-right: 0.02rem;
    }
  }
  .score {
    padding-top: 0.22rem;
    color: #ff2828;
    font-size: 0.24rem;
    text-align: center;
  }
  .service {
    width: 0.75rem;
    height: 0.63rem;
    border-top-left-radius: 0.32rem;
    border-bottom-left-radius: 0.32rem;
    background: #2a2d3c;
    color: #d9c58e;
    font-size: 0.2rem;
    padding-left: 0.1rem;
    position: fixed;
    right: 0;
    top: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    img {
      width: 0.3rem;
      // margin-bottom:
    }
  }
  .tip {
    padding: 0 0.43rem 0.46rem 0.43rem;
    color: #888888;
    font-size: 0.24rem;
    line-height: 1.5;
    span {
      color: #5186ca;
      border-bottom: 1px solid #5186ca;
    }
  }
  .content {
    flex: 1;
    padding-top: 0.31rem;
    background: rgb(238, 238, 238);
    overflow: scroll;
    .wechat {
      display: flex;
      justify-content: space-between;
      padding: 0 0.2rem;
      box-sizing: border-box;
      background: #fddfdf;
      color: #ff4141;
      font-size: 0.24rem;
      border-radius: 0.16rem;
      width: 6.8rem;
      line-height: 0.6rem;
      margin: 0 auto 0.3rem;
      span:last-child {
        color: #ff7800;
      }
    }
    .button {
      width: 1.27rem;
      height: 0.52rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.26rem;
      font-size: 0.24rem;
      text-align: center;
      &.button-primary {
        background: #d1ac42;
        color: #fff;
      }
      &.button-ghost {
        color: #d1ac42;
        border: 0.02rem solid #d1ac42;
      }
    }
    .notice {
      box-sizing: border-box;
      width: 6.8rem;
      line-height: 0.6rem;
      border-radius: 0.16rem;
      background: #fddfdf;
      font-size: 0.24rem;
      margin: 0 auto 0.2rem;
      display: flex;
      padding: 0 0.2rem;
      justify-content: space-between;
      align-items: center;
      color: #ff4141;
      .view-notice {
        color: #ff7800;
      }
    }
    .total {
      font-size: 0.24rem;
      color: #999;
      text-align: left;
      padding: 0.1rem 0.3rem 0.2rem 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .free-shipping {
        font-size: 0.2rem;
        color: #ff3d3d;
      }
      span {
        color: #d1ac42;
      }
    }
    .goods-time {
      margin-top: 0.09rem;
    }
  }
  .container {
    font-size: 0.24rem;
    color: #333;
    text-align: center;
    display: flex;
    .bar {
      flex: 1;
      padding: 0.16rem 0 0.2rem;
      &__span {
        position: relative;
        &.active {
          color: #d1ac42;
          &::after {
            content: "";
            width: 100%;
            height: 0.04rem;
            background: #d1ac42;
            border-radius: 0.02rem;
            bottom: -0.24rem;
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
}
</style>
