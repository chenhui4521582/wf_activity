<template>
  <article class="wrapper">
    <Dialog :show="show"
      title="温馨提示"
      @onConfirm="show=false"
      confirm="我知道了">
      <p v-if="this.active===1"
        class="tip">
        领取成功后，预计1-2个工作日
        发货,请您耐心等待，并确保通话畅通
        若超时未发货，请及时联系<span @click="toOnlineService">在线客服</span>
      </p>
      <p class="tip"
        v-if="this.active===2">您的运单号为：446564646</p>
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
      <p v-if="this.goodsList && this.goodsList.length > 0"
        class="total">共<span>{{this.goodsList.length}}件</span>商品</p>
      <section v-if="this.goodsList && this.goodsList.length > 0">
        <Goods v-for="(item,index) in goodsList"
          :key="index"
          :goods="item">
          <div slot="left">
            <p class="goods-time">开盒时间：{{item.openTime}}</p>
            <p class="goods-time"
              v-if="item.sendTime">发货时间：{{item.sendTime}}</p>
          </div>
          <div @click="handelList[active].handle"
            class="button"
            :class="handelList[active].buttonType"
            slot="right">{{handelList[active].buttonText}}</div>
        </Goods>
      </section>
      <Default v-if="this.goodsList && this.goodsList.length === 0"
        :title="`您没有${tabBar[active].label}的盲盒奖品哦~`"
        @onConfirm="$router.push({name:'Index'})" />
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
      handelList: [
        {
          buttonType: 'button-primary',
          buttonText: '立即领取',
          handle: () => {
            this.$router.push({ name: 'Index' })
          }
        },
        {
          buttonType: 'button-ghost',
          buttonText: '待发货',
          handle: () => {
            this.show = true
          }
        },
        {
          buttonType: 'button-primary',
          buttonText: '立即查看',
          handle: () => {
            this.show = true
          }
        }
      ]
    }
  },
  mounted () {
    this.getTabGoods()
  },
  methods: {
    /**
     * @des 切换tab
     */
    changeTab (item, index) {
      this.active = index
      this.getTabGoods()
    },
    // 获取相应tab下的数据
    async getTabGoods () {
      ({ data: { data: this.goodsList } } = await InventoryList(this.tabBar[this.active].value))
    },
    // 在线客服
    toOnlineService () {
      let channelFlag = window.linkUrl.getBackUrlFlag(GLOBALS.channel)
      let url
      switch (channelFlag) {
        case 'bdWap':
          url = `https://wap.beeplaying.com/${channelFlag}/#/problem?tab=contact_personal&channel=${GLOBALS.channel}`
          break
        case 'xmWap':
          url = `https://wap.beeplaying.com/${channelFlag}/#/my/customerService?channel=${GLOBALS.channel}`
          break
        default:
          url = `https://wap.beeplaying.com/${channelFlag}/home/#/problem?tab=contact_personal&channel=${GLOBALS.channel}`
          break
      }
      location.href = url
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
.wrapper {
  display: flex;
  flex-direction: column;
  .tip {
    padding: 0 0.43rem 0.46rem 0.43rem;
    color: #888888;
    font-size: 0.24rem;
    line-height: 1.5;
    span {
      color: #5186ca;
    }
  }
  .content {
    flex: 1;
    padding-top: 0.31rem;
    background: rgb(238, 238, 238);
    overflow: scroll;
    .button {
      width: 1.27rem;
      line-height: 0.52rem;
      border-radius: 0.26rem;
      font-size: 0.24rem;
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
      padding: 0.1rem 0 0.2rem 0.3rem;
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
