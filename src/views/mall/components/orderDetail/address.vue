<template>
  <section class="address">
    <template v-if="isEmptyObject(info)">
      <p class="empty-address " @click="toAddAddress">
        <img src="./imgs/orange-add-icon.png" alt="">
        <span>添加地址</span>
      </p>
    </template>
    <template v-else>
      <div @click="toEditAddress">
        <p class="name address-item">
          <span class="label">收件人</span><span>{{info.receiverName}}</span>
        </p>
        <div class="detail address-item">
          <p>
            <span class="label">收货地址</span>
            <span v-if="locked">{{info.receiveAddress}}</span>
            <span v-else>{{info.province}} {{info.city}} {{info.area}}
              {{info.receiverAddress}}</span>
          </p>
          <span class="icon">
            <i class="iconfont icon-next" v-if="!locked"></i>
          </span>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: 'order-address',
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    locked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isEmptyObject (object) {
      if (object instanceof Object) {
        return !Object.keys(object).length
      } else {
        console.error('传入的值非对象')
        return false
      }
    },
    toAddAddress () {
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/address/add'
    },
    toEditAddress () {
      let {name} = this.$route
      if(name != 'orderDetail') {
        location.replace(`https://wap.beeplaying.com/xmWap/#/address/list?from=${encodeURIComponent('/activities/mall.html#/comfirmorder')}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.address {
  padding: 0.2rem;
  background: #fff;
  border-radius: 0.16rem;
  margin-bottom: 0.2rem;
  .empty-address {
    border: 0.01rem dashed #888;
    box-sizing: border-box;
    border-radius: 0.1rem;
    height: 0.8rem;
    line-height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff7800;
    font-size: 0.2rem;
    img {
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.05rem;
    }
  }
  .address-item {
    display: flex;
    font-size: 0.24rem;
    color: #000;
    line-height: 0.3rem;
    .label {
      color: #888;
      min-width: 1.22rem;
    }
  }
  .icon {
    min-width: 0.3rem;
  }
  .iconfont {
    font-size: 0.2rem;
    color: #888;
  }
  .detail {
    margin-top: 0.1rem;
    justify-content: space-between;
    p {
      display: flex;
    }
  }
}
</style>
