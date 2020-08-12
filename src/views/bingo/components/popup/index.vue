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
            <template v-if="type==='warning'">
              <div class="text">
                <p>
                  清空目前所有已购买礼包
                </p>
                <p>
                  的状态，可以重新购买，并继续
                </p>
                <p>
                  完成bingo领取奖励哟～
                </p>
              </div>
            </template>
            <template v-else-if="type==='end'">
              <div class="text">
                <p>
                  很抱歉,
                </p>
                <p>
                  该活动本期已结束了,
                </p>
                <p>
                  去看看其他活动吧~
                </p>
              </div>
            </template>
            <template v-else>
              <div class="container">
                <ul class="top">
                  <li v-for="(item,index) in awardsInfo.list">
                    <div class="img-wrapper">
                      <template v-if="item.nofilter">
                        <img :src="item.img" alt="">
                      </template>
                      <template v-else>
                        <img :src="item.img|filter" alt="">
                      </template>
                    </div>
                    <p>{{item.name}}</p>
                  </li>
                </ul>
                <div class="bottom" v-html="awardsInfo.desc">
                </div>
              </div>
            </template>
            <div class="btn-wrapper" :class="{'two-btn':showCancel}">
              <button class="cancel" @click="cancel()" v-if="showCancel">取消</button>
              <button @click="confirm()">{{confirmText}}</button>
            </div>
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
/* eslint-disable no-undef */
import utils from '@/common/js/utils'
export default {
  name: '',
  components: {

  },
  data () {
    return {
      isShowPop: this.value
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'award'
    },
    awardsInfo: {
      type: Object,
      default: () => ({
        list: [],
        desc: ''
      })
    }
  },
  computed: {
    title () {
      switch (this.type) {
        case 'warning':
          return '友情提示'
        case 'end':
          return '活动提示'

        default:
          return '恭喜获得'
      }
    },
    showCancel () {
      return this.type === 'warning'
    },
    confirmText () {
      switch (this.type) {
        case 'warning':
          return '再来一次'
        case 'end':
          return '返回游戏大厅'

        default:
          return '收下'
      }
    }
  },
  mounted () {

  },
  methods: {
    closePop () {
      this.isShowPop = false
      this.$emit('on-close')
    },
    cancel () {
      this.isShowPop = false
      this.$emit('on-cancel')
    },
    confirm () {
      this.isShowPop = false
      this.$emit('on-confirm')
    }
  },
  watch: {
    value (val) {
      this.isShowPop = val
    },
    isShowPop (val) {
      this.$emit('input', val)
      if (val) {
        utils.ScrollNoMove()
      } else {
        utils.ScrollMove()
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
        height: 6.12rem;
        padding: 0 0.5rem;
        background: url(./img/popup-bg.png) no-repeat center center;
        background-size: 100% 100%;
        box-sizing: border-box;
        position: relative;
        &.end {
          .text {
            padding-top: 0.5rem;
            font-size: 0.36rem;
            line-height: 0.56rem;
          }
        }
        .title {
          height: 1.14rem;
          line-height: 1.14rem;
          text-align: center;
          font-size: 0.36rem;
          margin-bottom: 0.2rem;
        }
        .container {
          height: 3.08rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          .top {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 100%;
            li {
              margin: 0 0.1rem;
              flex: 1;
              white-space: nowrap;
              .img-wrapper {
                width: 1.6rem;
                height: 1.6rem;
                background: #111551;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                margin: auto;
                img {
                  width: 84%;
                  height: auto;
                }
              }
              p {
                margin: 0.24rem auto;
                font-size: 0.3rem;
              }
            }
          }
          .bottom {
            font-size: 0.2rem;
            text-align: center;
            color: #0cf1ff;
            line-height: 0.4rem;
          }
        }
        .btn-wrapper {
          position: absolute;
          bottom: 0.8rem;
          width: 100%;
          left: 50%;
          margin-left: -50%;
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            height: 0.72rem;
            width: 3.2rem;
            background: #ffee4b;
            color: #a84401;
            border-radius: 0.36rem;
            font-size: 0.28rem;
            font-weight: 800;
            margin: 0 0.26rem;
          }
          &.two-btn {
            button {
              width: 2rem;
            }
            .cancel {
              background: #f6722a;
              color: #fff;
            }
          }
        }
        .text {
          padding: 0.8rem 0.3rem 0;
          line-height: 0.36rem;
          text-align: center;
          font-size: 0.28rem;
          line-height: 0.4rem;
        }
      }
    }
  }
}
</style>
