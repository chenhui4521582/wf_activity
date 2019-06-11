<template>
  <div class="bill-shop">
    <base-header title="话费券商城" :accountBalance="accountBalance"></base-header>
    <!-- 我的话费券 -->
    <div class="phone-nav">
      <div class="nav-item bill-left">
        我的话费券：<span>{{ accountBalance }}</span>
      </div>
      <div class="nav-item award-right">
        <div class="item-box" @click="goMyAward">查看我的奖品<img src="../images/arrow-right.png" class="award-arrow"></div>
      </div>
    </div>
    <!-- 分类tab切换 -->
    <div class="tab-warp" v-if="tabList&&tabList.length>0">
      <div class="item-tab" v-for="(tab,index) in tabList" :key="index" :class="{'active': selectedIndex == index}" @click="getNewList(tab,index)">{{tab}}</div>
    </div>
    <!-- 列表页面 -->
    <div class="sp-items" v-if="rewardList.length>0&&rewardList[selectedIndex].items">
      <scroll :data="rewardList[selectedIndex].items">
        <ul v-if="rewardList[selectedIndex].items">
          <!-- :class="{buyone:item.limitPerPersonDay==1,nosurplus:item.allUsersTodayAvailableQuota ==0,buyover:item.currentUserTodayAvailableQuota ==0}" -->
          <li v-for="(item,index) in rewardList[selectedIndex].items" @click="goDetail(item,$event)" :class="{'buyone':buyone(item.productList),'tehui':item.productList[0].phyAwardsId === 232,'nosurplus':nosurplus(item.productList),'buyover':buyover(item.productList)}" :key="index">
            <template v-if="item.productList.length>0">
              <div class="pic-box">
                <img :src="item.productList[0].picture | filter">
              </div>
              <p class="sp-info">{{item.productList[0].name}}</p>
              <a href="javascript:" class="btn">{{item.productList[0].purchasePrice}}元话费券获取</a>
            </template>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>
<script>
import baseHeader from '../components/baseHeader/baseHeader'
import scroll from '../../../components/scroll/scroll.vue'
import { billList } from '../utils/api'
import { getUrlParam, marchSetsPoint } from '../utils/common'
import { fail } from 'assert'
export default {
  name: 'index',
  components: { baseHeader, scroll },
  data () {
    return {
      accountBalance: 0,
      rewardList: [],
      selectedIndex: 0
    }
  },
  mounted () {
    this.pageInit()
  },
  computed: {
    tabList () {
      if (this.rewardList.length > 0) {
        return this.rewardList.map(item => {
          return item.name
        })
      }
    }
  },
  methods: {
    // 页面初始化获取列表
    async pageInit () {
      const { data, code } = await billList()
      if (code === 200) {
        this.rewardList = data.categoryList
        this.accountBalance = data.accountBalance
        await marchSetsPoint('P_H5PT0035', {
          residual_phone: this.accountBalance
        })
      }
    },
    // 查看我的奖品
    async goMyAward () {
      switch (getUrlParam('from')) {
        case 'bdWap':
          parent.location.href = 'https://wap.beeplay123.com/bdWap/#/personal?openMyWard=1'
          break
        case 'jsWap':
          parent.location.href = 'https://wap.beeplay123.com/bdWap/#/personal?openMyWard=1'
          break
        case 'miniWap':
          parent.location.href = 'https://wap.beeplay123.com/miniWap/#/personal?openMyWard=1'
          break
        default:
          parent.location.href = 'https://wap.beeplay123.com/wap/home/#/personal?openMyWard=1'
      }
    },
    // 标题切换
    getNewList (item, index) {
      switch (index) {
        case 0:
          marchSetsPoint('A_H5PT0035000634', {
            residual_phone: this.accountBalance
          })// H5平台-话费券商城-好物推荐
          break
        case 1:
          marchSetsPoint('A_H5PT0035000636', {
            residual_phone: this.accountBalance
          })// H5平台-话费券商城-手机数码
          break
        case 2:
          marchSetsPoint('A_H5PT0035000635', {
            residual_phone: this.accountBalance
          })// H5平台-话费券商城-虚拟卡券
          break
        default:
          break
      }
      this.selectedIndex = index
    },
    // 打开详情
    async goDetail (data, e) {
      if (!e._constructed) {
        return
      }
      localStorage.BILL_DETAILS = JSON.stringify(data.productList)
      await marchSetsPoint('A_H5PT0035001264', {
        awards_name: data.phyAwardsTypeName,
        residual_phone: this.accountBalance,
        product_id: data.productList[0].phyAwardsType
      })
      this.$router.push({
        name: 'detail',
        query: {
          ...this.$route.query,
          accountBalance: this.accountBalance
        }
      })
    },
    // 每日限购一次
    buyone (list) {
      if (list.length > 1) {
        return false
      }
      if (list.length === 1 && list[0].limitPerPersonDay === 1) {
        return true
      }
    },
    // 缺货
    nosurplus (list) {
      let number = 0
      list.forEach(item => {
        if (item['allUsersTodayAvailableQuota'] !== 0) {
          number++
        }
      })
      return number === 0
    },
    // 今日已经购完
    buyover (list) {
      let number = 0
      list.forEach(item => {
        if (item['currentUserTodayAvailableQuota'] === 0) {
          number++
        }
      })
      return number === list.length
    }
  }
}
</script>
<style lang="less" scoped>
a {
  text-decoration: none;
  color: #fff;
}
.bill-shop {
  height: 100%;
  min-height: 100vh;
  background: #0f1726;
  padding: 0 0.3rem;
  color: #fff;
  font-size: 0.24rem;
}
.phone-nav {
  display: flex;
  height: 1rem;
  width: 100%;
  .nav-item {
    flex: 1;
    position: relative;
  }
  .bill-left {
    line-height: 1rem;
    span {
      font-size: 0.32rem;
      font-weight: 500;
    }
  }
  .item-box {
    position: absolute;
    right: 0;
    top: 0.15rem;
    box-sizing: border-box;
    width: 2.34rem;
    height: 0.7rem;
    background-color: #346acc;
    border-radius: 0.35rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.24rem;
    .award-arrow {
      width: 0.3rem;
      height: 0.3rem;
    }
  }
}
.tab-warp {
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(15, 23, 38, 1);
  border: 0.02rem solid rgba(30, 46, 76, 1);
  border-radius: 0.08rem;
  .item-tab {
    height: 0.56rem;
    line-height: 0.56rem;
    flex: 1;
    font-size: 0.26rem;
    font-weight: bold;
    &.active {
      background: rgba(20, 31, 51, 1);
      border-radius: 0.08rem;
      color: #e39b25;
    }
  }
}
.content-list {
  position: absolute;
  top: 2.9rem;
  bottom: 0.2rem;
  left: 0;
}
.sp-items {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0.2rem;
  top: 2.9rem;
  overflow-y: scroll;
  &.active {
    top: 2.1rem;
  }
  ul {
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .sp-info {
    max-width: 100%;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
    padding-bottom: 0.1rem;
    &.surplus {
      font-size: 0.22rem;
      font-weight: 400;
      color: rgba(135, 146, 165, 1);
      padding-top: 0.1rem;
      padding-bottom: 0;
    }
  }
  li {
    flex: 0 0 47.727%;
    height: 3.25rem;
    background: rgba(20, 31, 51, 1);
    border-radius: 0.08rem;
    margin-bottom: 0.28rem;
    text-align: center;
    font-size: 0.3rem;
    max-width: 47.727%;
    position: relative;
    .pic-box {
      width: 1.6rem;
      height: 1.6rem;
      margin: 0 auto;
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
      }
    }
    .btn {
      display: block;
      width: 2.55rem;
      height: 0.44rem;
      line-height: 0.48rem;
      border: 0.02rem solid rgba(255, 255, 255, 1);
      border-radius: 0.22rem;
      margin: 0.17rem auto 0;
      font-size: 0.22rem;
      font-weight: 400;
    }
    &.buyone:before {
      content: "";
      position: absolute;
      left: 0;
      width: 0.98rem;
      height: 0.96rem;
      background: url("../images/buyone.png") no-repeat;
      background-size: 100% 100%;
    }
    &.tehui:before {
      content: "";
      position: absolute;
      left: 0;
      width: 0.84rem;
      height: 0.36rem;
      background: url("../images/tehui_icon.png") no-repeat;
      background-size: 100% 100%;
    }
    &.buyover:before {
      content: "";
      position: absolute;
      left: 0;
      width: 0.98rem;
      height: 0.96rem;
      background: url("../images/buyover.png") no-repeat;
      background-size: 100% 100%;
    }
    &.nosurplus:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 1.05rem;
      height: 1.06rem;
      background: url("../images/quehuo.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>

