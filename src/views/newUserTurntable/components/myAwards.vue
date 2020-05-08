<template>
  <section class="my-awards" @click.prevent="" v-if="show">
    <div class="top-btn-wrap">
      <div class="btn left back" @click="show=false">返回</div>
    </div>
    <p class="awards-title">
      我的话费
    </p>
    <p class="envelope-rmb">{{info.newUserInfo.envelopeRmb}}<span>元</span></p>
    <div class="get-now-btn" @click="convert">马上提取</div>
    <p class="sub-title">
      <template v-if="info.state===1">
        满{{info.convertConsumeRmb}}元可以提取话费
      </template>
      <template v-if="info.state===2">
        提示：最晚提取时间为{{info.newUserInfo.convertEndDate}}<br />
        逾期奖励将会失效
      </template>
    </p>
    <div class="awards-history-wrapper">
      <ul class="nav-title">
        <li v-for="item in navArr" :class="[`type-${item}`,{selected:currentType===item}]"
          @click="_envelopeRecord(item)">
        </li>
      </ul>
      <template v-if="currentType === 4">
        <ul class="list type-4">
          <li class="list-title">
            <div>领取日期</div>
            <div>领取额度</div>
          </li>
        </ul>
        <ul class="list type-4 content">
          <li v-for="(item) in list">
            <div>{{item.createTime}}</div>
            <div>{{item.envelopeRmb}}元</div>
          </li>
        </ul>
      </template>
      <template v-if="currentType === 5">
        <ul class="list type-5">
          <li class="list-title">
            <div>提取日期</div>
            <div>提取额度</div>
            <div>提取状态</div>
          </li>
        </ul>
        <ul class="list type-5 content">
          <li v-for="(item) in list">
            <div>{{item.createTime}}</div>
            <div>{{item.envelopeRmb}}元</div>
            <div class="to-my-prize" @click="toMyPrize()">查看状态></div>
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { envelopeRecord } from '../services/api'
import _get from 'lodash.get'
export default {
  name: '',
  components: {

  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      show: this.value,
      navArr: [4, 5],
      currentType: 4,
      list: []
    }
  },
  mounted () {
    this._envelopeRecord(4)
  },
  methods: {
    async _envelopeRecord (type) {
      this.currentType = type
      const res = await envelopeRecord(this.currentType)
      const data = _get(res, 'data', null)
      if (data) {
        this.list = data
      }
      console.log(data)
    },
    toMyPrize () {
      WapCall.openGame('/xmWap/#/my/prize')
    },
    convert () {
      this.$emit('convert', 1)
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.bgWithFull(@url) {
  background: url(@url) no-repeat center center;
  background-size: 100% 100%;
}
.my-awards {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #b52fe1 url('../img/detail-bg.png') no-repeat center ~'-1.2rem';
  background-size: 100%;
  .top-btn-wrap {
    margin-top: 0.52rem;
    .back {
      width: 0.94rem;
    }
  }
  p {
    text-align: center;
  }
  .awards-title {
    margin-top: 1.12rem;
    color: #6c6c6c;
    font-size: 0.3rem;
    height: 0.36rem;
  }
  .envelope-rmb {
    margin-top: 0.24rem;
    color: #ed2d07;
    font-size: 0.72rem;
    font-weight: bold;
    height: 0.9rem;
    span {
      font-size: 0.36rem;
    }
  }
  .get-now-btn {
    width: 5.4rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: url('../img/get-now-btn.png') no-repeat center center;
    background-size: 100% 100%;
    color: #fa321e;
    font-size: 0.3rem;
    font-weight: bold;
    text-align: center;
    margin: 0.7rem auto 0;
  }
  .sub-title {
    height: 0.6rem;
    font-size: 0.24rem;
    font-weight: bold;
    color: #ffbdae;
    margin-top: 0.24rem;
  }
  .awards-history-wrapper {
    position: absolute;
    top: 6.5rem;
    left: 0.3rem;
    bottom: 0.5rem;
    right: 0.3rem;
    border-radius: 0.3rem;
    overflow: hidden;
    .nav-title {
      display: flex;
      li {
        flex: 1;
        height: 0.9rem;
        &.type-4,
        &.type-5 {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 1.2rem 0.28rem;
          background-color: #b43994;
          &.selected {
            position: relative;
            background-color: #f86364;
            &::after {
              content: '';
              display: block;
              position: absolute;
              width: 0.4rem;
              height: 0.18rem;
              bottom: -0.16rem;
              left: 50%;
              margin-left: -0.2rem;
              .bgWithFull('../img/selected-arrow-icon.png');
            }
          }
        }
        &.type-4 {
          background-image: url('../img/type-4.png');
          &.selected {
            background-image: url('../img/type-4-selected.png');
          }
        }
        &.type-5 {
          background-image: url('../img/type-5.png');
          &.selected {
            background-image: url('../img/type-5-selected.png');
          }
        }
      }
    }
    .list {
      li {
        display: flex;
        height: 0.9rem;
        align-items: center;
        text-align: center;
        background: #f9ebfb;
        color: #15002b;
        font-size: 0.24rem;
      }
      .list-title {
        font-weight: bold;
      }
      &.type-4 {
        div {
          flex: 1;
        }
      }
      &.type-5 {
        div:nth-child(1) {
          flex: 2;
        }
        div:nth-child(2) {
          flex: 1;
        }
        div:nth-child(3) {
          flex: 1;
        }
        .to-my-prize {
          color: #ff5a00;
        }
      }
      &.content {
        height: calc(~'100%' - 1.8rem);
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        li:nth-child(2n-1) {
          background: #fef2ff;
        }
      }
    }
  }
}
</style>
