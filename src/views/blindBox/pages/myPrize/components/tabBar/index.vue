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
    <section class="container">
      <div class="bar"
        v-for="(item,index) in tabBar"
        @click="changeTab(item,index)"
        :key="item.label">
        <span class="bar__span"
          :class="{'active':index===active}">
          {{item.label}}
        </span>
      </div>
    </section>
    <section class="content">
      <div v-if="this.goodsList && this.goodsList.length > 0"
        class="total">
        <p>共<span>{{this.goodsList.length}}件</span>商品</p>
        <p></p>
        <p v-if="this.active === 0 && this.goodsList && this.goodsList.length > 0" class="free-shipping">领取奖品满2件即可包邮哦~</p>
        </div>
      <section v-if="this.goodsList && this.goodsList.length > 0">
        <Goods v-for="(item,index) in goodsList"
          :key="index"
          :goods="item">
          <div slot="left">
            <p class="goods-time">开盒时间：{{item.openTime}}</p>
            <p class="goods-time"
              v-if="item.sendTime">发货时间：{{item.sendTime}}</p>
          </div>
          <div @click="handelList[active].handle(item)"
            class="button"
            :class="handelList[active].buttonType"
            slot="right">{{handelList[active].buttonText}}</div>
        </Goods>
      </section>
      <Default v-if="this.goodsList && this.goodsList.length === 0"
        :title="`您没有${tabBar[active].label}的盲盒奖品哦~`"
        @onConfirm="toIndex" />
    </section>
    <section @click="toOnlineService" class="service">
      <img src="./assets/service.png" alt="">
      <p>客服</p>
    </section>
  </article>
</template>

<script>
import Goods from '../../../../components/goods'
import Default from '../../../../components/default'
import { sendStatusMapper } from '../../../../config/enum'
import { InventoryList } from '../../../../apis/user'
import Dialog from '../../../../components/dialog'

export default {
  data () {
    return {
      show: false,
      active: 0,
      goodsList: null,
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
    this.getTabGoods()
  },
  methods: {
    /**
     * @des 切换tab
     */
    changeTab (item, index) {
      this.goodsList = null
      this.active = index
      if (index === 0) GLOBALS.marchSetsPoint('A_H5PT0225002572')
      if (index === 1) GLOBALS.marchSetsPoint('A_H5PT0225002573')
      if (index === 2) GLOBALS.marchSetsPoint('A_H5PT0225002574')
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
    Dialog
  }
}
</script>

<style lang="less" scoped>
.myprize-wrapper {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  .service {
    width: 0.75rem;
    height: 0.63rem;
    border-top-left-radius: 0.32rem;
    border-bottom-left-radius: 0.32rem;
    background: #2A2D3C;
    color: #D9C58E;
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
        color: #999999;
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
