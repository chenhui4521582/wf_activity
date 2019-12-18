<template>
  <div class="big"> 
  <div class="snow">   
           <img src="./images/backgroundsnow.png"></div>
    <div class="container">
     
      <!-- <div class="top">
        <span>游戏中心</span>
      </div> -->
      <div class="top">
        <div class="back"><div>返回</div></div>
        <div class="rule" @click="rule"><div>规则</div></div>
        <div class="rank">
          <img src="./images/cup.png"><div>排行榜</div>
        </div>
        <div class="myprize">
          <img src="./images/christmas-present.png" alt=""><div>我的奖励</div>
        </div>
           <div class="active-time">
        <span style="white-space: nowrap;">活动时间：2019年12月25日-2020年1月1日</span>
            </div>
            <div class="main-title">
              <img src="./images/main-title.png" alt="">
            </div>
            <div class="vice-title">
              <img src="./images/vice-title.png" alt="">
            </div>
      </div>
      <game></game>
      <prize @openprize='openprize(arguments)'></prize>
      <bottom></bottom>
      <rule v-show="showRule" :stime='time' @close='close'></rule>
      <lookprize v-show="prizeshow" @closeprize='closeprize'  :num='num'></lookprize>
      
    </div>
    <!-- <div class="bg"> -->
      <!-- <div class="snow"> -->
        <!-- <div class="snow">   
           <img src="./images/backgroundsnow.png"></div> -->
    
      <!-- </div> -->
    <!-- </div> -->
  
     <congratulation v-show="false"></congratulation>
      <sorry1 v-if="false"></sorry1>
      <sorry2 v-if="false"></sorry2>
      <remind v-if='false'></remind>
           </div>
</template>



<script>
import game from './component/game'
import prize from './component/prize'
import bottom from './component/bottom'
import pop from './component/popup'
import rule from './component/rule'
import lookprize from './component/lookprize'
import congratulation from './component/congratulation'
import sorry1 from './component/sorry1' 
import sorry2 from './component/sorry2'
import remind from './component/remind'
export default {
data(){
  return{
    showRule:false,
    prizeshow:true,
    num:'',
    time:'2019年12月25日-2020年1月1日'
  }
},
methods:{
  openprize:function(e){
    this.prizeshow=e[0]
    this.num=e[1]
    console.log(this.prizeshow)
    console.log('父组件num',this.num)

  },
  closeprize:function(e){
    this.prizeshow=e
  },
  close:function(e){
    this.showRule=e
  },
  rule(){
    if(this.showRule==false){
      this.showRule=true
    }else{
      this.showRule=false
    }
  }
},
components:{
  game,
  prize,
  bottom,
  pop,
  rule,
  lookprize,
  congratulation,
  sorry1,
  sorry2,
  remind
  
}
}
</script>

 <style scoped type="less">
 @import '../../common/css/base.css';

 </style>
<style scoped type="less">

.container{
  position: absolute;
  top: 0;
  height: 15rem;
}
.top{
width: 7.2rem;
height: 1.44rem;
}
.big{
  width: 7.2rem;
  height: 15rem;
  background:rgba(237, 36, 55, 1);
}
.snow{
    /* position: absolute;
 
    top: 1.17rem; */
}
.snow img{
    width: 7.2rem;
    height: 8.69rem; 
    /* position: absolute;
    height: -1.17rem; */
}
.top span{
      text-align: center;
    display: block;
    /* position: relative;
    top: 1rem; */
}
.active-time{
  position:absolute;
  top: 0.3rem;
  left: 1.59rem;
  width:3.97rem;
height:0.2rem;
font-size:0.2rem;
font-family:PingFang SC;
/* font-weight:bold; */
color:rgba(255,255,255,1);

}
.main-title{
  position: absolute;
  left: 1.16rem;
  top: 0.59rem;
 /* margin-top: 0.09rem; */
}
.main-title img{
  height: 1.66rem;
  width: 4.73rem;
}
.vice-title{
  position: absolute;
    z-index: 5;
  top: 1.95rem;
  left: 1.65rem;
}
.vice-title img{
  width: 3.55rem;
  height: 0.82rem;
}
.back{
      background: url("./images/left.png");
    background-size: 100% 100%;
    width: 0.98rem;
    height: 0.48rem;
    position: absolute;
    top: 0.16rem;
    display: flex;
    align-items: center;
}
.back div{
  /* width:0.45rem;
height:0.23rem; */
font-size:0.24rem;
font-family:PingFang SC;
font-weight:bold;
color:rgba(255,255,255,1);
/* line-height:0.14rem; */
margin: 0 auto;

}
.rule{
        background: url("./images/left.png");
    background-size: 100% 100%;
    width: 0.98rem;
    height: 0.48rem;
    position: absolute;
    top: 0.88rem;
    display: flex;
    align-items: center;
}
.rule div{
  /* width:46px;
height:23px; */
margin: 0 auto;
font-size:0.24rem;
font-family:PingFang SC;
font-weight:bold;
color:rgba(255,255,255,1);
/* line-height:14px; */
}
.rank{
          background: url("./images/right.png");
    background-size: 100% 100%;
    width: 1.44rem;
    height: 0.49rem;
    position: absolute;
    top: 0.15rem;
    left: 5.76rem;
    display: flex;
    align-items:center;
}
.rank div{
  /* width:0.70rem;
height:0.23rem; */
font-size:0.24rem;
font-family:PingFang SC;
font-weight:bold;
color:rgba(255,255,255,1);
line-height:0.14rem;
position: absolute;
left: 0.49rem;
}
.rank img{
display: flex;
    width: 0.28rem;
    height: 0.27rem;
    position: absolute;
    left: 0.15rem;
   
    top: 50%;
    transform: translateY(-50%);
}
.myprize{
            background: url("./images/right2.png");
display: flex;
    background-size: 100% 100%;
    width: 1.59rem;
    height: 0.49rem;
    position: absolute;
    top: 0.87rem;
    right: 0;
    z-index: 5;
    align-items: center;
}
.myprize img{
  width: 0.25rem;
  height: 0.29rem;
  position: absolute;
  left: 0.16rem;
      top: 50%;
    transform: translateY(-50%);
}
.myprize div{
  /* width:0.94rem; */
/* height:0.23rem; */
font-size:0.24rem;
font-family:PingFang SC;
font-weight:bold;
color:rgba(237,36,55,1);
line-height:0.14rem;
position: absolute;
left: 0.45rem;

}
</style>
<!--<template>
  <div class="slot-machine">
    <div class="container">
      <div class="btns">
        <div class="back" @click="back"></div>
        <div class="openRule" @click="openRule"></div>
      </div>
      <horn :hornList="hornList"></horn>  
      <animation :animationList="animationList" :userInfo="userInfo" @refersh="_getUserInfo"/>
    </div>
    <div class="bg">
      <img src="./images/bg.png" alt="">
    </div>
    <slot-Machine-rule v-model="showRule" :userInfo="userInfo"/>
  </div>
</template>
<script>
// import Services from './services/services'
// import _get from 'lodash.get'
// export default {
//   name: 'slotMachine',
//   data: () => ({
//     userInfo: {
//       beginDate: '',
//       endDate: '',
//       nextStage: '',
//       nextStageRecharge: '',
//       recharge: ''
//     },
//     hornList: [1,2,3,4,5,6],
//     animationList: [],
//     nextStage: 3,
//     showRule: false  
//   }),
//   components: {
//     animation: () => import('./component/animation'),
//     slotMachineRule: () => import('./component/slotMachineRule'),
//     horn: () => import('./component/horn')
//   },
//   methods: {
//     _getUserInfo() {
//       Services.getUserInfo().then(res=> {
//         let {code, data, message} = _get(res, 'data', '')
//         if(code === 200) {
//           this.userInfo = _get(res, 'data.data',[])
//           this.animationList = _get(res, 'data.data.playProgressList',[])
//         }else {
//           this.$toast.show({
//             message: message,
//             duration: 1500
//           });
//         }
//       })
//     },
//     _getHornList() {
//       Services.getHornList().then(res => {
//         let {code, data, message} = _get(res, 'data', '')
//         if(code === 200) {
//           this.hornList = data
//         }else {
//           this.$toast.show({
//             message: message,
//             duration: 1500
//           });
//         }
//         console.log('hornlist的数据',data)
//       })
//     },
//     _runAnimation() {},
//     /** 打开规则 **/
//     openRule() {
//       this.showRule = true
//       GLOBALS.marchSetsPoint('A_H5PT0203002128')
//     },
//     /** 返回 **/
//     back() {
//       history.back(-1)
//       GLOBALS.marchSetsPoint('A_H5PT0203002127')
//     }
//   },
//   mounted () {
//     this._getUserInfo()
//     this._getHornList()
//     GLOBALS.marchSetsPoint('A_H5PT0203002126')
//   }
// }
// </script>

// <style scoped type="less">
// @import '../../common/css/base.css';
// </style>

// <style lang="less" scoped>
// .slot-machine {
//   position: relative;
//   min-height: 100vh;
//   background: #800508;
//   .container {
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     z-index: 2;
//     .btns {
//       position: absolute;
//       left: 0;
//       top: 0;
//       .back {
//         width: .6rem;
//         height: 1.3rem;
//         background: url(./images/back-btn.png) no-repeat center center / 100% 100%;
//       }
//       .openRule {
//         width: .6rem;
//         height: 1.3rem;
//         background: url(./images/rule.png) no-repeat center center / 100% 100%;
//       }
//     }
//   }
//   .bg {
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     z-index: 1;
//     img {
//       vertical-align: top;
//       width: 100%;
//     }
//   }
// }
// </style>
