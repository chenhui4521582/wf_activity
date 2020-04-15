<template>
  <section class="com_pop" :style="{zIndex:isShowPop?101:99}">
    <div class="pop-mask" v-if="isShowPop&&awardData" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&awardData">
        <div :class="getClassName('wrap')">
          <div class="title_bg">
            <div class="title_txt">
              恭喜你
            </div>
          </div>
          <div :class="getClassName('main')">
            <div :class="getClassName('container_compop')">
              <p>成功领取<i>{{awardData.awardsName}}元</i>{{getAwardName(awardData.awardsType)}}
              </p>
              <div class="prize_info_item">
                <div class="prize_info_img">
                  <img :src="`${require(`../images/comPop/${awardData.awardsType}.png`)}`" alt="">
                </div>
                <div class="prize_info_name">
                  <div class="prize_info_name_item" v-if="awardData.awardsType">
                    {{getAwardName(awardData.awardsType)}}
                  </div>
                  <div class="prize_info_name_item" v-if="awardData.awardsName">
                    {{awardData.awardsName}}
                  </div>
                </div>
              </div>
              <div class="btnred" @click="close(awardData)">收下</div>
            </div>
            <div class="footer"></div>
          </div>
          <div class="close" @click="close">
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'prizePop',
    data() {
      return {
        isShowPop: true,
      }
    },
    props: {
      awardData: {
        type: Object,
        default: null
      },
      bestname: {
        type: Array,
        default: []
      }
    },
    methods: {
      getClassName(name) {
        return `${name} flag${this.popType}`
      },
      getAwardName(awardType) {
        switch (awardType) {
          case 'jyz':
            return '金叶子'
            break
          case 'yg':
            return '鱼干'
            break
          case 'jdk':
            return '京东券'
            break
          case 'hfq':
            return '话费券'
            break
          case 'yhq':
            return '优惠券'
            break
        }
      },
      async showPop() {
        this.isShowPop = true
      },
      close() {
        this.$emit('close')
        this.isShowPop = false
      },
      move(e) {
        e.preventDefault()
      }
    },
    watch: {
      isShowPop(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.move, {passive: false})
        } else {
          document.body.style.overflow = null
          document.removeEventListener('touchmove', this.move, {passive: false})
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    left: 50%;
    top: 2.5rem;
    margin-left: -2.75rem;
    &.flag7 {
      top: .5rem;
    }
    .pop-mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.55);
    }
    .pop {
      position: relative;
      z-index: 10;
      .wrap {
        margin: 0 auto;
        box-sizing: border-box;
        .title_bg {
          width: 5.51rem;
          height: .93rem;
          background: rgba(139, 24, 36, 1);
          border-radius: .2rem .2rem 0 0;
          position: relative;
          .title_txt {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            font-size: .36rem;
            font-weight: bold;
            color: rgba(243, 226, 200, 1);
            text-align: center;
            line-height: .93rem;
          }
        }
        .main {
          width: 5.51rem;
          height: 5.72rem;
          background: rgba(243, 226, 200, 1);
          border-radius: 0 0 .2rem .2rem;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: .3rem .3rem 0;
          box-sizing: border-box;
          .container_compop {
            .btnred {
              width: 3rem;
              height: .8rem;
              font-size: .36rem;
              background: rgba(255, 52, 52, 1);
              color: rgba(255, 252, 247, 1);
              line-height: .8rem;
              text-align: center;
              border-radius: .4rem;
              margin: 0 auto;
            }
            p {
              font-size: .36rem;
              font-weight: bold;
              color: rgba(169, 92, 23, 1);
              margin: .6rem 0;
              text-align: center;
              i {
                color: #FF3434;
              }
            }
            .prize_info_item {
              width: 1.22rem;
              margin: 0 auto .7rem;
              .prize_info_img {
                height: 1.15rem;
                background: rgba(254, 253, 251, 1);
                border-radius: .2rem .2rem 0 0;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  width: 80%;
                  margin: auto;
                }
              }
              .prize_info_name {
                height: .65rem;
                background: rgba(255, 127, 50, 1);
                border-radius: 0 0 .2rem .2rem;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding: .1rem 0;
                box-sizing: border-box;
                .prize_info_name_item {
                  font-size: .22rem;
                  font-weight: 800;
                  text-align: center;
                  &:nth-child(2) {
                    color: #FFF500;
                  }
                }
              }
            }
          }
        }
        .close {
          width: .6rem;
          height: .6rem;
          background: url("../images/comPop/close.png") no-repeat center
            center / 100% 100%;
          position: absolute;
          bottom: -1rem;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
    }
    .scalc-enter-active {
      animation: fadeAnimation 0.3s ease-in-out;
    }
    @keyframes fadeAnimation {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  }
</style>
