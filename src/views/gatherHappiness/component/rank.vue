<template >
  <!-- 除了未上榜时打开 -->
  <article class="mask">
    <section class="rank-bg" :class="{noprize:!awardsType}">
      <div class="rank-title">
        <img src="../img/rank/title.png" alt />
      </div>
      <div class="rank-inner-container">
        <div class="rank-inner-container-bg">
          <!-- 中间图片 -->
          <img class="award-img" :class="`award-img-${awardsType}`"
            :src="`${require(`../img/rank/${awardsType}.png`)}`" />
          <!-- 奖品文字介绍 -->
          <div class="prize-text" v-if="awardsType">
            <div class="prize-text-container" :class="{'award-text-3':awardsType===3}">
              <p v-for="(item,key) in awardsText" :key="key">
                {{key?'+':''}}<em>{{item.number}}</em>{{item.text}}</p>
            </div>
          </div>
        </div>
        <div class="rank-inner-bottom">
          <!-- 切换底部容器 -->
          <div class="rank-inner-bottom-change">
            <template v-if="awardsType">
              <p>
                <span>恭喜您排名<em class="number">{{myRankInfo.myRank}}</em>名，获得以上奖励</span>
              </p>
              <div @click="toRankPage">
                <img src="../img/rank/button.png" alt />
              </div>
            </template>
            <template v-else>
              <p><span>您暂<em>未上榜</em>,下次继续加油哟~</span></p>
              <div @click="close">
                <div class="noprize-button">我知道啦</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
    <!-- <div class="congra-close" @click="close">
      <img src="../img/comPop/close.png" alt />
    </div> -->
  </article>
</template>
<script>
/* eslint-disable no-undef */
export default {
  data () {
    return {
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0234002738') // H5平台-集福气赢大奖页-活动发榜弹窗加载完成
  },
  methods: {
    toRankPage () {
      this.$emit('close')
      this.$emit('toRankPage')
    },
    close () {
      this.$emit('close')
    }
  },
  computed: {
    currentAwards () {
      return this.myRankInfo.currentAwards || ''
    },
    awardsType () {
      let type = 0
      if (!this.myRankInfo.myRank) {
        return 0
      }
      if (this.currentAwards.includes('京东') && this.currentAwards.includes('金叶')) {
        type = 3
      } else if (this.currentAwards.includes('京东')) {
        type = 4
      } else if (this.currentAwards.includes('金叶')) {
        type = 2
      } else if (this.currentAwards.includes('福气')) {
        type = 1
      }
      return type
    },
    awardsText () {
      let arr = []
      switch (this.awardsType) {
        case 1:
          arr.push({ number: this.currentAwards.split('福气')[0], text: '福气值' })
          break
        case 2:
          arr.push({ number: this.currentAwards.split('金叶')[0], text: '金叶' })

          break
        case 3:
          arr.push(
            { number: this.currentAwards.split('+')[1].split('金叶')[0], text: '金叶' },
            { number: this.currentAwards.split('京东')[0], text: '京东卡' },
          )

          break
        case 4:
          arr.push({ number: this.currentAwards.split('京东卡')[0], text: '京东卡' })

          break

        default:
          break
      }
      return arr
    }
  },
  props: {
    myRankInfo: {
      type: Object,
      default: {}
    }
  }
}
</script>
<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
}
.congra-close {
  position: absolute;
  //   top: 11.43rem;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  img {
    width: 0.52rem;
    height: 0.52rem;
  }
}
.rank-bg {
  background: url("../img/rank/light-bg.png");
  background-size: 100% 100%;
  width: 6.46rem;
  height: 9.72rem;
  margin: 0 auto;
  .rank-title {
    display: flex;
    position: absolute;
    top: 2.91rem;
    width: 6.46rem;
    justify-content: center;
    img {
      width: 2.37rem;
      height: 0.38rem;
    }
  }
  .rank-inner-container {
    position: absolute;
    top: 4rem;
    margin: 0 auto;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    left: 1.24rem;
    width: 4.74rem;
    flex-direction: column;
    align-items: center;

    .rank-inner-container-bg {
      background: url("../img/rank/innerbg.png");
      background-size: 100% 100%;
      position: relative;
      width: 2.3rem;
      height: 2.3rem;
      box-sizing: border-box;
      .award-img {
        width: 1.4rem;
        height: 1.4rem;
        display: block;
        margin: 0.2rem auto 0;
      }
      .award-img-0 {
        width: 1.72rem;
        height: 1.85rem;
      }
      .prize-text {
        color: #d42e27;
        font-size: 0.24rem;
        font-weight: bold;
        text-align: center;
        margin-top: 0.14rem;
        position: absolute;
        width: 100%;
        bottom: 0;
        .prize-text-container {
          font-size: 0.24rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          height: 0.56rem;
          p {
            width: 100%;
          }
          em {
            color: #ff8314;
            font-style: normal;
          }
          &.award-text-3 {
            font-size: 0.22rem;
            line-height: 0.28rem;
          }
        }
      }
    }
    .rank-inner-bottom {
      .rank-inner-bottom-change {
        p {
          font-size: 0.24rem;
          color: #fff6df;
          margin-top: 0.3rem;
          font-weight: bold;
          em {
            color: #feec21;
            font-style: normal;
          }
        }
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 0.1rem;
          width: 3.29rem;
          height: 0.98rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  &.noprize {
    background-image: url("../img/rank/default-bg.png");
    .rank-inner-container {
      .rank-inner-container-bg {
        background: none;
        padding-top: 0.3rem;
      }
      .rank-inner-bottom {
        .rank-inner-bottom-change {
          p {
            em {
              color: #920006;
            }
          }
          .noprize-button {
            width: 2.8rem;
            height: 0.7rem;
            background: rgba(255, 219, 72, 1);
            border-radius: 0.35rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.26rem;
            font-weight: 800;
            color: rgba(170, 0, 0, 1);
          }
        }
      }
    }
  }
}
</style>
