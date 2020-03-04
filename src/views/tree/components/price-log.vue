<template>
  <div class="price-log" v-if="value">
    <div class="mask"></div>
    <div class="close" @click="hideLog"></div>
    <div class="items" >
      <div class="title">
        <img src="../img/my-price-title.png" alt="">
      </div>
      <template v-if="showList">
        <div class="nav">
          <div class="name">
            <img src="../img/price-name.png" alt="">
          </div>
          <div class="time">
            <img src="../img/price-time.png" alt="">
          </div>
        </div>
        <div class="wrap">
          <div class="list" v-for="(item, index) in logList" :key="index">
            <div class="name">
              <span>{{item.awardName}}</span>
            </div>
            <div class="time">{{item.awardDate | formatTime('y-m-d')}}</div>
            <div class="btn" @click="check"></div>
          </div>
        </div>
      </template>
      <div class="no-log" v-else>
        <img src="../img/no-log.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'priceLog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    logList: {
      type: Array,
      default: ()=> []
    }
  },
  data: () => ({
    list: []
  }),
  computed: {
    showList() {
      return this.logList.length
    }
  },
  methods: {
    hideLog() {
      this.$emit('input', false)
    },
    check() {
      window.location.href = '//wap.beeplaying.com/xmWap/#/my/prize'
    }
  }
}
</script>
<style scoped lang="less">

  .price-log{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;

    .mask {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      background: rgba(0,0,0,.7);
    }
    .close {
      position: absolute;
      left: .12rem;
      top: 0;
      z-index: 2;
      width: 1.16rem;
      height: 1.3rem;
      background: url(../img/back.png) no-repeat center center;
      background-size: 100% auto; 
    }
    .items {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 6.92rem;
      height: 9.37rem;
      z-index: 2;
      background: url(../img/log-bg.png) no-repeat center center;
      background-size: 100% 100%; 
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
      }
      .title {
        margin: 1rem 0 0 2.34rem;
        width: 2.3rem;
        height: .74rem;
      }
      
      .nav {
        margin: .92rem 0 .14rem;
        padding-left: 1.33rem;
        display: flex;
        justify-content: flex-start;
        .name {
          margin-right: .83rem;
          width: 1.02rem;
          height: .3rem;
        }
        .time {
          width: 1.02rem;
          height: .3rem;
        }
      }
      .wrap {
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        height: 5.85rem;
        .list {
          margin: 0 0 .15rem .82rem ;
          padding-left: .11rem;
          width: 5.26rem;
          height: 1.02rem;
          background: url(../img/log-list.png) no-repeat center center;
          background-size: 100% 100%; 
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .name {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 1.9rem;
            img {
              width: auto;
              height: .62rem;
            }
            span {
              font-size: .26rem;
              color: #C0622B;
              font-weight: bold;
            }
          }
          .time {
            width: 1.7rem;
            text-align: center;
            font-size: .26rem;
            color: #C0622B;
            font-weight: bold;
          }
          .btn {
            width: 1.47rem;
            height: .74rem;
            background: url(../img/check-btn.png) no-repeat center center;
            background-size: 100% 100%; 
          }
        }
      }
      .no-log {
        margin: 2.74rem 0 0 1.19rem;
        width: 4.89rem;
        height: 2.27rem;
      }
    }
  }
</style>