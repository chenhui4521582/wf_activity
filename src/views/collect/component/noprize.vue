<template >
  <div class="mask" v-if='rankNumber==0&&show'>
    <div class="noprize-bg">
      <div class="noprize-title">
        <img src="../img/rank/title.png" alt="">
      </div>
      <div class="noprize-container">
        <img src="../img/rank/0/img.png" alt="">
        <div class="noprize-text">您暂<span
            style="color:#920006;font-size:0.24rem;font-weight:400">未上榜</span>,下次继续加油哟~
        </div>
        <div class="noprize-button" @click="closenoprize">
          <span>我知道啦</span>
        </div>
      </div>
    </div>

    <div class="congra-close" @click="closenoprize">
      <img src="../img/comPop/close.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: true
    }
  },
  methods: {
    closenoprize () {
      this.show = false
      console.log(this.show, this.rankNumber)
    }
  },
  props: {
    rankNumber: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="less">
.noprize-bg {
  background: url("../img/rank/0/bc.png");
  background-size: 100% 100%;
  width: 6.46rem;
  height: 9.72rem;
  margin: 0 auto;
  .noprize-title {
    display: flex;
    position: absolute;
    top: 2.8rem;
    width: 6.46rem;
    justify-content: center;
    img {
      width: 2.37rem;
      height: 0.38rem;
    }
  }
  .noprize-container {
    display: flex;
    justify-content: center;
    position: relative;
    top: 3.4rem;
    height: 4.5rem;
    img {
      width: 1.73rem;
      height: 1.85rem;
      position: absolute;
      top: 0.84rem;
    }
    .noprize-text {
      position: absolute;
      top: 3.14rem;
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(255, 246, 223, 1);
    }
    .noprize-button {
      width: 2.8rem;
      height: 0.7rem;
      background: rgba(255, 219, 72, 1);
      border-radius: 0.35rem;
      position: absolute;
      display: flex;
      top: 3.67rem;
      justify-content: center;
      align-items: center;
      span {
        //     width:103px;
        // height:0.3rem;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.26rem;
        font-family: PingFang SC;
        font-weight: 800;
        color: rgba(170, 0, 0, 1);
        // line-height:29px;
        // text-shadow:0rem 1rem 0rem rgba(255,240,178,1);
      }
    }
  }
}
</style>