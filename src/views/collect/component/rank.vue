<template >
  <!-- 除了未上榜时打开 -->
  <div class="mask" v-if="!rankNumber==0">
    <div class="rank-bg">
      <div class="rank-title">
        <img src="../images/rank/title.png" alt />
      </div>
      <div class="rank-inner-container">
        <div class="rank-inner-container-bg">
          <!-- 中间图片 -->
          <img :src="`${require(`../images/rank/${this.rankNumber}/img.png`)}`" />
          <!-- 奖品文字介绍 -->

          <div class="prize-text">
            <!-- 当发榜奖励为1个时 -->
            <template v-if="rankNumber==1||rankNumber==2||rankNumber==4">
              <div class="prize-text-container">
                <span style="color:#FF8314;font-size:0.24rem;font-weight:400">1000</span>
                {{rankNumber|prizetext}}
              </div>
            </template>
            <!-- 当发榜奖励为2个时 -->

            <template v-if="rankNumber==3">
              <div class="prize-text-container">
                <div style="position: relative;
    top: 0.05rem;">
                  <span style="color:#FF8314;font-size:0.24rem;font-weight:400">1000</span>
                  {{rankNumber|prizetext}}
                  <br />
                </div>
                <div>
                  <span
                    style="  color: #D42E27;
                font-size:0.24rem;
                font-weight:400;"
                  >+</span>
                  <span style="color:#FF8314;font-size:0.24rem;font-weight:400">500元</span>京东卡
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="rank-inner-bottom">
          <!-- 切换底部容器 -->
          <div class="rank-inner-bottom-change">
            <div>
              恭喜您排名
              <span style="color:#FEEC21;font-size:0.24rem">5000</span>名，获得以上奖励
            </div>
            <div @click="gorank">
              <img src="../images/rank/button.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="congra-close" @click="closerank">
      <img src="../images/comPop/close.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      closeRank: false,
      opensecondpage:true,
      color:'#FAD6A9'
    };
  },
  methods: {
      gorank(){
          this.$emit('gosecondpage',this.opensecondpage,this.closeRank,this.color)
      },    
    closerank() {
      this.$emit("closerank", this.closeRank);
      console.log(this.closeRank);
      console.log(this.rankNumber);
    }
  },
  props: {
    rankNumber: {
      type: Number,
      default: 0
    }
  },
  //   判断发榜传过来的数值 确定奖品名称
  filters: {
    //   判断金叶和京东卡都存在时
    prizetext_again(value) {
      if (value == 3) {
        return "京东卡";
      }
    },

    prizetext(value) {
      switch (value) {
        case 1:
          return "福气值";
          break;
        case 2:
          return "金叶";
          break;
        case 3:
          return "金叶";
          break;
        case 4:
          return "京东卡";
      }
    }
  }
};
</script>
<style lang="less">
.rank-bg {
  background: url("../images/rank/bc.png");
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
      background: url("../images/rank/innerbg.png");
      background-size: 100% 100%;
      width: 2.3rem;
      height: 2.3rem;
      display: flex;
      justify-content: center;
      position: relative;
      flex-direction: column;
      align-items: center;
      img {
        width: 1.4rem;
        height: 1.4rem;
        position: relative;
        // top: -0.1rem;
      }
      .prize-text {
        color: #d42e27;
        font-size: 0.24rem;
        font-weight: 400;
        position: relative;
        top: 0.14rem;
        text-align: center;
        height: 0.55rem;
        display: flex;
        align-items: center;
        .prize-text-container {
          //  height: 0.55rem;
        }
      }
    }
    .rank-inner-bottom {
      .rank-inner-bottom-change {
        div:first-child {
          font-size: 0.24rem;
          font-family: FZZhengHeiS-EB-GB;
          font-weight: 400;
          color: rgba(255, 246, 223, 1);
          margin-top: 0.3rem;
        }
        div:last-child {
          display: flex;
          justify-content: center;
          margin-top: 0.1rem;

          img {
            width: 3.29rem;
            height: 0.98rem;
          }
        }
      }
    }
  }
}
</style>
