<template>
  <article class="popup">
    <transition name="mask">
      <section class="pop-wrapper" v-show="isShowPop">
        <div class="mask"></div>
        <div class="content-wrapper">
          <div class="content" :class="type">
            <div class="title">
              {{title}}
            </div>
            <template v-if="type==='rule'">
              <div class="text">
                1.活动共6天时间，活动期内做任务攒话费红包，攒满100个话费红包即可体现10元话费。<br />
                2.每日任务均不同，次日0点刷新任务，任务奖励限当日领取。<br />
                3.累计登陆活动页面2/4/6天均可获得话费红包。<br />
                4.达到提现资格后，最晚请在活动结束后第二天提现，预期奖励作废。
              </div>
            </template>
            <template v-else-if="type==='history'">
              <div class="container">
                <ul class="head">
                  <li>
                    <div>日期</div>
                    <div>状态</div>
                    <div>红包奖励</div>
                  </li>
                </ul>
                <ul class="list-wrapper">
                  <li v-for="item in historyList">
                    <div>{{item.dateTime}}</div>
                    <div>{{item.businessType|typeTextFilter}}</div>
                    <div>{{item.redPackNum|numberTextFilter(item.businessType)}}</div>
                  </li>
                </ul>
              </div>
            </template>
            <template v-else>
              <div class="container">
                <div class="img-wrapper">
                  <template v-if="type==='redpackage'">
                    <img class="redpackage" src="../../img/award-red-bg.png" alt="">
                  </template>
                  <template v-else>
                    <img class="cashout" src="../../img/award-icon-bg.png" alt="">
                  </template>
                </div>
                <p class="name">{{awardsInfo.name}}</p>
                <p class="desc">
                  {{awardsInfo.desc}}
                </p>
              </div>
              <div class="btn" v-if="type==='redpackage'" @click="sure">
                收下
              </div>
              <div class="btn" v-if="type==='cashout'" @click="sure">
                去冲话费
              </div>
            </template>
          </div>
          <div class="close-icon" @click="closePop()">
            <img src="../../img/close-icon.png" alt="">
          </div>
        </div>
      </section>
    </transition>
  </article>
</template>

<script>
import { changeRecordList } from '../../services/api'
import _get from 'lodash.get'
import utils from '@/common/js/utils'
export default {
  name: '',
  components: {

  },
  data () {
    return {
      isShowPop: this.value,
      historyList: []
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'rule'
    },
    title: {
      type: String,
      default: '活动规则'
    },
    awardsInfo: {
      type: Object,
      default: () => ({})
    }
  },
  filters: {
    typeTextFilter (type) {
      switch (type) {
        case 1:
          return '签到获取'
        case 2:
          return '任务获取'
        case 3:
          return '提现'

        default:
          return ''
      }
    },
    numberTextFilter (number, type) {
      return (type === 3 ? '-' : '') + (number / 10).toFixed(1) + '元'
    }
  },
  mounted () {

  },
  methods: {
    closePop () {
      this.isShowPop = false
      this.$emit('on-close')
    },
    sure () {
      this.isShowPop = false
      this.$emit('on-confirm', this.type)
    },
    async _changeRecordList () {
      const res = await changeRecordList()
      const code = _get(res, 'code', 0)
      const data = _get(res, 'data', 0)
      if (code === 200) {
        this.historyList = data
      }
    }
  },
  watch: {
    value (val) {
      this.isShowPop = val
    },
    isShowPop (val) {
      this.$emit('input', val)
      if (val && this.type !== 'history') {
        utils.ScrollNoMove()
      } else {
        utils.ScrollMove()
      }
    },
    type (val) {
      if (val === 'history') {
        this._changeRecordList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.popup {
  .pop-wrapper {
    .content-wrapper {
      .content {
        height: 5.71rem;
        background: url(../../img/pop-bg.png) no-repeat center center;
        background-size: 100% 100%;
        box-sizing: border-box;
        position: relative;
        padding: 0 0.4rem;
        .title {
          text-align: center;
          font-size: 0.36rem;
          color: #fff;
          height: 0.94rem;
          line-height: 0.94rem;
        }
        .container {
          margin-top: -0.6rem;
          position: relative;
          .img-wrapper {
            width: 4.5rem;
            height: 4.4rem;
            background: url('../../img/award-bg.png') no-repeat center center;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
            .redpackage {
              width: 1.36rem;
              height: 1.83rem;
            }
            .cashout {
              width: 2.36rem;
              height: 2.64rem;
            }
          }
          .name {
            position: absolute;
            bottom: 0.6rem;
            width: 100%;
            text-align: center;
            font-size: 0.36rem;
            color: #b40000;
          }
          .desc {
            position: absolute;
            bottom: 0.3rem;
            width: 100%;
            text-align: center;
            font-size: 0.2rem;
            font-weight: 400;
            color: #fff;
          }
        }
        .btn {
          position: absolute;
          bottom: 0.4rem;
          width: 2.6rem;
          height: 0.68rem;
          left: 50%;
          margin-left: -1.3rem;
          background: #ffb864;
          border-radius: 0.34rem;
          color: #db2923;
          font-size: 0.3rem;
          text-align: center;
          line-height: 0.66rem;
        }
        .text {
          padding: 0.3rem 0 0;
          line-height: 0.46rem;
          font-size: 0.3rem;
          font-weight: 400;
        }
        &.history {
          .container {
            margin-top: 0.4rem;
            height: auto;
            width: 100%;
            ul {
              width: 100%;
              font-size: 0.22rem;
              font-weight: 400;
              li {
                display: flex;
                line-height: 0.6rem;
                text-align: center;
                div:nth-child(1) {
                  flex: 1;
                }
                div:nth-child(2) {
                  width: 1.4rem;
                }
                div:nth-child(3) {
                  width: 1.6rem;
                }
              }
              &.head {
                background: #9f3c2c;
                color: #fff;
                height: 0.6rem;
              }
              &.list-wrapper {
                max-height: 3.4rem;
                overflow-x: hidden;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
                li {
                  background: #ecaca2;
                  color: #67190c;
                  &:nth-child(2n) {
                    background: #d68578;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
