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
                1.做每日任务，可领取积分。累计积分至一定数值，可领取到对应话费奖励；活动期内的积分不会每日清零，而是一直累计；每日任务达成的流水第二天会清零。<br />
                2.以下游戏流水计入任务：<br />
                欢乐竞技台球、糖果萌消消、王者弹珠、街机欢乐捕鱼、三国大作战、众神风云、欢乐的小鸟、深海探一探、斗西游、破晓方块消消乐
              </div>
            </template>
            <template v-else-if="type==='coupon'">
              <div class="container">
                <div class="desc" v-html="awardsInfo.desc">
                </div>
                <ul class="info">
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
              </div>
              <div class="btn">
                <img src="./img/cancel-btn.png" alt="" @click="closePop()">
                <img src="./img/use-btn.png" alt="" @click="sure()">
              </div>
            </template>
            <template v-else-if="type==='back'">
              <div class="container">
                <ul class="info">
                  <li>
                    <div class="img-wrapper">
                      <img src="./img/back-icon.png" alt="">
                    </div>
                    <p>x2</p>
                  </li>
                </ul>
                <div class="desc">
                  亲，明日完成<span>签到</span>可获得<span>双倍金叶</span>奖励，<br />千万别忘记哦
                </div>
              </div>
              <div class="btn" @click="sure()">
                <img src="./img/i-know-btn.png" alt="">
              </div>
            </template>
            <template v-else>
              <div class="container">
                <ul class="info">
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
                <div class="desc" v-html="awardsInfo.desc">
                </div>
              </div>
              <div class="btn" @click="sure()">
                <img src="./img/popup-btn.png" alt="">
              </div>
            </template>
          </div>
          <div class="close-icon" v-if="type!=='coupon'" @click="closePop()">
            <img src="../../img/close-icon.png" alt="">
          </div>
        </div>
      </section>
    </transition>
  </article>
</template>

<script>
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
      default: 'rule'
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
        case 'award':
          return '恭喜获得'
        case 'buy':
          return '购买成功'
        case 'coupon':
          return '优惠券赠送'
        case 'give':
          return '超值礼包加赠到账'
        case 'rule':
          return '规则'
        case 'back':
          return '温馨提示'

        default:
          break
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
    sure () {
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
        padding: 0.38rem 0.5rem 0;
        background: url(./img/popup-bg.png) no-repeat center center;
        background-size: 100% 100%;
        box-sizing: border-box;
        position: relative;
        .title {
          font-family: 'Alibaba-PuHuiTi-B';
          text-align: center;
          line-height: 0.36rem;
          color: #ae2808;
          font-size: 0.36rem;
          font-weight: bold;
        }

        &.give {
          padding-top: 0.42rem;
          .title {
            line-height: 0.28rem;
            font-size: 0.28rem;
          }
        }
        &.coupon {
          .container {
            .desc {
              font-size: 0.28rem;
              color: #c6d2fe;
            }
          }
          .btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 4.2rem;
            margin-left: -2.1rem;
            img {
              width: 1.9rem;
              height: 0.72rem;
            }
          }
        }
        &.back {
          .container {
            .info {
              li {
                p {
                  margin: 0.1rem auto 0;
                }
              }
            }
            .desc {
              line-height: 0.3rem;
            }
          }
        }
        .container {
          height: 3.08rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          margin-top: 0.6rem;
          .info {
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
                width: 1.4rem;
                height: 1.4rem;
                background: #1c2458;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                margin: auto;
                img {
                  max-width: 100%;
                  max-height: 100%;
                }
              }
              p {
                margin: 0.24rem auto;
                font-size: 0.3rem;
              }
            }
          }
          .desc {
            font-size: 0.2rem;
            text-align: center;
            color: #0cf1ff;
            line-height: 0.4rem;
            span {
              color: #feec97;
            }
          }
        }
        .btn {
          position: absolute;
          bottom: 0.8rem;
          width: 3.2rem;
          height: 0.72rem;
          left: 50%;
          margin-left: -1.6rem;
        }
        .text {
          padding: 0.8rem 0.3rem 0;
          line-height: 0.36rem;
        }
      }
    }
  }
}
</style>
