<template>
  <section class="sign">
    <ul>
      <li v-for="item in signInVo" :key="'sign-'+item.day" :class="`status-${item.status}`"
        @click="toggleTips(item)">
        <p>第{{item.day}}天</p>
        <div class="icon-wrapper"><img :src="item.status|imgGet" alt=""></div>
        <p class="award-name">{{item.awardName}}</p>
        <div class="tips"
          v-if="showTips===item.day&&(item.awardName.includes('彩虹糖果')||item.awardName.includes('聚宝盆'))">
          <template v-if="item.awardName.includes('彩虹糖果')">
            糖果萌消消道具<br />
            可以兑换收益加成的buff
          </template>
          <template v-if="item.awardName.includes('聚宝盆')">
            街机欢乐捕鱼道具<br />
            有大概率获得高额金叶子
          </template>
        </div>
      </li>
    </ul>
    <div class="btn" :class="`btn-type-${btnType}`" @click="_sign()">
      <template v-if="btnType===1">
        <img src="./img/sign-btn.png" alt="">
      </template>
      <template v-if="btnType===2">
        <img src="./img/use-btn.png" alt="">
        <span>立即使用彩虹糖果</span>
      </template>
      <template v-if="btnType===3">
        <img src="./img/use-btn.png" alt="">
        <span>立即使用聚宝盆</span>
      </template>
      <template v-if="btnType===4">
        <img src="./img/signed-btn.png" alt="">
        <span>今日已领{{currentDayInfo.awardName}}</span>
      </template>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { sign } from '../../services/api'
import _get from 'lodash.get'
export default {
  name: 'sign',
  components: {

  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      signInVo: [],
      showTips: 0,
      awardInfo: {}
    }
  },
  computed: {
    currentDayInfo () {
      let index = this.signInVo.findIndex(item => item.curDay)
      return this.signInVo[index] || {}
    },
    btnType () {
      switch (this.currentDayInfo.status) {
        case 1:
          return 1
        case 2:
          if (this.currentDayInfo.awardName.includes('彩虹糖果')) {
            return 2
          }
          if (this.currentDayInfo.awardName.includes('聚宝盆')) {
            return 3
          }
          return 4
      }
    }
  },
  filters: {
    imgGet (status) {
      switch (status) {
        case 2:
          return require('./img/signed.png')
        case 3:
          return require('./img/overtime.png')

        default:
          return require('./img/locked.png')
      }
    }
  },
  mounted () {
  },
  methods: {
    async _sign () {
      switch (this.btnType) {
        case 1:
          const res = await sign()
          const code = _get(res, 'code', 0)
          const data = _get(res, 'data', 0)
          if (code === 200) {
            this.signInVo = data.signInRsps
            this.awardInfo = {
              list: [{
                img: data.awardRsp.awardImg,
                name: data.awardRsp.awardName
              }],
              desc: this.getAwardDesc(data.awardRsp.awardName)
            }
            this.$emit('show-pop', 'award', this.awardInfo)
          }
          break
        case 2:
          GLOBALS.jumpOutsideGame('/crush')
          break
        case 3:
          GLOBALS.jumpOutsideGame('/fish')

          break
        case 4:

          break

        default:
          break
      }
    },
    gotogame ({ url, id }) {
      GLOBALS.jumpOutsideGame(url)
    },
    getAwardDesc (name) {
      if (name.includes('彩虹糖果')) {
        return '可在糖果萌消消-糖果小店中查看'
      }
      if (name.includes('聚宝盆')) {
        return '可在街机欢乐捕鱼-海港渔村中查看'
      }
      return ''
    },
    toggleTips (item) {
      if (this.showTips === item.day) {
        this.showTips = 0
      } else {
        this.showTips = item.day
      }
    }
  },
  watch: {
    info (info) {
      this.signInVo = this.info.signInVo
    }
  }
}
</script>

<style lang="less" scoped>
.sign {
  width: 6.68rem;
  height: 4.4rem;
  box-sizing: border-box;
  margin: auto;
  background: url('./img/sign-bg.png') no-repeat center center;
  background-size: 100% 100%;
  padding-top: 1.4rem;
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    li {
      color: #c9d5ff;
      font-size: 0.24rem;
      line-height: 0.26rem;
      margin: 0 0.12rem;
      white-space: nowrap;
      position: relative;
      &.status-2 {
        color: rgba(201, 213, 255, 0.6);
        .icon-wrapper {
          background: #849be9;
        }
      }
      &.status-3 {
        color: rgba(201, 213, 255, 0.6);
      }
      .icon-wrapper {
        background: #1f2961;
        width: 0.68rem;
        height: 0.68rem;
        padding: 0.1rem 0.1rem 0;
        box-sizing: border-box;
        border-radius: 0.16rem;
        margin: 0.2rem auto;
      }
      .award-name {
        font-size: 0.2rem;
      }
      .tips {
        position: absolute;
        width: 2rem;
        height: 0.56rem;
        background: url('./img/tips-bg.png') no-repeat center center;
        background-size: 100% 100%;
        left: 50%;
        margin-left: -1rem;
        bottom: 1.6rem;
        color: #21378a;
        font-size: 0.18rem;
        text-align: center;
        line-height: 0.2rem;
        padding-top: 0.04rem;
      }
    }
  }
  .btn {
    width: 4.8rem;
    height: 0.86rem;
    position: relative;
    margin: 0.2rem auto 0;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
      font-size: 0;
    }
    span {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      line-height: 0.84rem;
      font-size: 0.3rem;
      font-weight: bold;
      color: #1f2961;
    }
    &.btn-type-2,
    &.btn-type-3 {
      span {
        color: #ab2303;
      }
    }
  }
}
</style>
