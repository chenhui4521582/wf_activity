<template>
  <div class="game">

    <div class="game_img">
       <div class="light"><img src="../images/runhorse.png"></div>
       <div class="mask"><img src="../images/mask.png"></div>
      <div class="already">
        <div class="already_text">已消耗游戏币</div>
        <div class="line1"></div>
        <div class="num1">2000</div>
      </div>
      <div class="now">
        <div class="now_text">当前可用游戏币</div>
        <div class="line2"></div>
        <div class="num2">200</div>
      </div>
      <div class="click" @click="gotowave">
        <img src="../images/click.png" alt />
      </div>
      <div class="prize_information">奖励说明</div>
      <div class="prize_consume">
        <div  class="pop" v-show="show">
          <div class="pop_inner">
            <div class="pop_inner1">
              <div v-for="(i,key) in list" :key="key">
              <img :src="imgsrc"><span>{{i.text}}</span>
            </div>
            </div>

          </div>
        </div>
        <div class="prize_consume_bg">
          <img src="../images/gamecoin.png" alt />

          <div class="text">消耗500个游戏币</div>
          <img src="../images/upward.png" @click="up"/>
        </div>
      </div>
      <div class="info">单次消耗游戏币越多,越容易中大奖呦</div>
    </div>
  </div>
</template>
<script>
import { METHODS } from 'http';
export default {
  data() {
    return {
      show:false,
      imgsrc: require(`../images/pop-gamecoin.png`),
      list:[
        {text:'消耗500个游戏币'},{text:'消耗200个游戏币'},{text:'消耗50个游戏币'},{text:'消耗1个游戏币'}
      ]
    };

  },
  methods:{
    up(){
      if(this.show==false){
        this.show=true;
      }else{
        this.show=false;
      }
    },
    gotowave(){
      this.$emit('gotowave','500')
    }
  }
};
</script>
<style lang="less" scoped>
.game {
  position: absolute;
  top: 2.21rem;
  left: 0.1rem;
}
.game_img {
  width: 7.09rem;
  height: 6.4rem;
  background: url("../images/game.png");
  background-size: 100% 100%;
}
.prize_information {
  position: absolute;
  left: 3rem;
  top: 5.69rem;
  color: #dd6300;
  // width:1.17rem;
  height: 0.29rem;
  font-size: 0.3rem;
  font-family: PingFang SC;
  font-weight: 800;
  color: rgba(221, 99, 0, 1);
  line-height: 0.32rem;
}
.click {
  position: absolute;
  top: 4.58rem;
  right: 0.86rem;
}
.click img {
  width: 2.38rem;
  height: 0.83rem;
}
.prize_consume {
  position: absolute;
  width: 2.9rem;
  height: 0.54rem;
  top: 4.69rem;
  left: 0.55rem;
}
.prize_consume_bg {
  width: 2.9rem;
  height: 0.54rem;
  background: url("../images/consume.png");
  background-size: 100% 100%;
}
.prize_consume_bg img:first-child {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: 0.07rem;
  left: 0.07rem;
}
.prize_consume_bg img:last-child {
  width: 0.48rem;
  height: 0.48rem;
  position: absolute;
  top: 0.02rem;
  // bottom: 0.03rem;
  left: 2.4rem;
}
.info {
  position: absolute;
  top: 5.26rem;
  left: 0.31rem;
  // width: 3.39rem;
  height: 0.21rem;
  font-size: 0.2rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 126, 0, 1);
  line-height: 0.14rem;
}
.text {
  position: absolute;
  left: 0.57rem;
  top: 0.17rem;
  display: flex;
  align-items: center;
  // width:1.69rem;
  height: 0.22rem;
  font-size: 0.22rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 0.14rem;
}
.already {
  width: 2.72rem;
  height: 0.34rem;
  background: rgba(221, 99, 0, 1);
  border: 1px solid rgba(255, 229, 8, 1);
  box-shadow: 0rem 0rem 0.05rem 0rem rgba(221, 99, 0, 0.99);
  border-radius: 0.17rem;
  position: absolute;
  top: 4.15rem;
  left: 0.67rem;
}
.already_text {
  // width: 1.29rem;
  height: 0.22rem;
  font-size: 0.22rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 233, 130, 1);
  position: absolute;
  left: 0.21rem;
  line-height: 0.34rem;
}
.line1 {
  position: absolute;
  left: 1.58rem;
  width: 0.01rem;
  height: 0.34rem;
  background: rgba(247,179,77,1);
  border-radius: 0.17rem;
}
.num1 {
  width: 0.51rem;
  height: 0.17rem;
  font-size: 0.22rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 233, 130, 1);
  line-height: 0.34rem;
  position: absolute;
  left: 1.85rem;
}
.now{
  position: absolute;
  top: 4.15rem;
  left:3.65rem;
  width:2.72rem;
height:0.34rem;
background:rgba(242,55,74,1);
border:0.01rem solid rgba(255, 228, 8, 1);
box-shadow:0px 0px 0.05rem 0px rgba(242,55,74,0.99);
border-radius:0.17rem;
}
.now_text{
  // width:1.50rem;
height:0.22rem;
font-size:0.22rem;
font-family:PingFang SC;
font-weight:bold;
color:rgba(255,252,175,1);
line-height: 0.34rem;
position: absolute;
left: 0.22rem;
}
.line2{
width:0.01rem;
height:0.34rem;
background:rgba(248,108,112,1);
border-radius:0.17rem;
position: absolute;
left: 1.81rem;
}
.num2{
width:0.38rem;
height:0.17rem;
font-size:0.22rem;
font-family:PingFang SC;
font-weight:bold;
color:rgba(255,252,175,1);
line-height:0.34rem;
position: absolute;
left: 2.02rem;
}
.light{
      position: absolute;
    top: 1.37rem;

    left: 50%;
    transform: translateX(-50%);
}
.light img{
  width: 5.72rem;
  height: 2.58rem;
}
.mask{
  position: absolute;
  top: 1.78rem;
   left: 50%;
    transform: translateX(-50%);
}
.mask img{
  width: 5.85rem;
  height: 1.73rem;
}
.pop{
  background: url("../images/pop.png");
  background-size: 100% 100%;
  width: 2.71rem;
  height: 3.01rem;
  position: absolute;
  top: -2.97rem;
  left: 0.12rem;
  z-index: 5;
}
.pop_inner{
width: 2.3rem;
    height: 2.5rem;
    align-items: center;
    // display: flex;
    align-items: center;
    position: absolute;
    top: 0.15rem;

    margin: 0 auto;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
}
.pop_inner1{
  // height: 0.24rem;
  width: 100% !important;

font-size:0.22rem;
font-family:PingFang SC;
font-weight:bold;
color:rgba(255,255,255,1);
// line-height:14px;
}
.pop_inner1 div{
    border-bottom: 1px solid #FA7481;
    padding-top: 0.12rem;
    padding-bottom: 0.1rem;
    height: 0.4rem;

    display: flex;
    align-items: center;
}
.pop_inner1 img{
  width: 0.24rem;
  height: 0.24rem;
  position: absolute;
  left: 0.1rem;
}
.pop_inner span{
  position: absolute;
    white-space: nowrap;
    /* width: 0.24rem; */
    height: 0.24rem;
    left: 0.45rem;
}
.pop_inner1 div:last-child{
  border-bottom: 0px;
}
</style>
