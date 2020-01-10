<template>
  <div class="mask" v-if="popNumber==2&&closePop">
    <div class="bg">
      <div class="congra2-title">
        <img src="../images/congratulation/title.png" alt />
      </div>
      <div class="congra2-bc2">
        <div class="congra2-top-text">
          <span>您获得</span>
          <span>56456456福气值</span>
        </div>
        <div class="congra2-img">
            <img src="../images/congratulation/fudai.png" alt="">
        </div>
        <div class="congra2-bottom-text">
            <span>
                <span>福气值已累计</span><span style="color:#FEEC21;font-size:0.24rem">10000</span><span>,今日游戏消耗金叶的</span><span style="color:#FEEC21;font-size:0.24rem">1%</span><span>将在明天返利！</span>
            </span>
        </div>
        <div class="congra2-bottom-button">
                <div @click="goplay">
                <img src="../images/congratulation/goplay.png" alt />
              </div>
              <div @click='congra_back' >
                <img src="../images/congratulation/continue.png" alt />
              </div>
        </div>
      </div>
    </div>

    <div class="congra-close" @click="congra_back">
      <img src="../images/comPop/close.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      closePop: true,
      openplay:true
    };
  },
  methods: {
      goplay(){
            this.$emit('goplay',this.openplay)
            this.closePop=false
          console.log(this.openPlay)
      },
    congra_back() {
      this.$emit("congra_back", this.close);
      this.closePop = false;
      console.log(this.closePop);
    }
  },
  props: {
    popNumber: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style lang="less">
.bg {
  background: url("../images/congratulation/bc2.png") !important;
  background-size: 100% 100% !important;
  width: 6.46rem;
  height: 10.12rem;
  margin: 0 auto;

  .congra2-title {
    position: relative;
    top: 2.95rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 100%;
    img {
      width: 0.77rem;
      height: 0.38rem;
    }
  }
}
.congra2-bc2 {
  background: url("../images/congratulation/light.png");
  background-size: 100% 100%;
  width: 4.74rem;
  height: 4.82rem;
  margin: 0 auto;
  position: relative;
  top: 2.61rem;

  .congra2-top-text {
    display: grid;
    text-align: center;
    position: relative;
    top: 0.6rem;
    span:first-child {
      color: #fff6df;
      font-size: 0.3rem;
        
    }
    span:last-child {
      color: #feec21;
      font-size: 0.3rem;
      // display: block;
     
    }
  }
  .congra2-img{
          display: flex;
    justify-content: center;
    position: relative;
    top: 0.6rem;
      img{
           width: 1.66rem;
            height: 1.7rem;
      }
  }
  .congra2-bottom-text{
      font-size: 0.24rem;
      color: #fff6df;
      width: 80%;
    margin: 0 auto;
    position: relative;
    top: 0.7rem;
      span:first-child{
              display: inline-block;
    text-align: center;
      }
  }
}
.congra2-bottom-button{
    position: relative;
    top: 0.65rem;
    div{
        display: flex;
    justify-content: center;    
    }
    img{
         width: 3.28rem;
            height: 0.98rem;   
    }
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
</style>