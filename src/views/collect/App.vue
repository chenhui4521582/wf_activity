<template>
  <div class="big" :style="{background:this.color}">
    <div class="bc" v-if="!isChange">
      <div class="top">
        <div class="firstrow">
          <div class="back">
            <img src="./images/back.png" alt />
          </div>
          <div @click="rule(0)" class="rule">
            <img src="./images/rule.png" />
          </div>
        </div>
        <div class="secondrow">
          <img @click='gonglue(1)' src="./images/gl.png" />
        </div>
      </div>
      <div class="middle">
        <img class="here" src="./images/iamhere.png" />
        <img class="fl" src="./images/fl.png" alt />

        <div class="control">
          <div class="progess">
            <img src="./images/light.png" />
          </div>
          <div class="text">
            <span>福气值1000/10000</span>
          </div>
        </div>

        <div class="tomorrow">
          <span>明日返利：66666金叶</span>
        </div>
        <div class="today">
          <span>（明日返利=今日总消耗金叶*返利比）</span>
        </div>
      </div>
      <div class="lower-middle">
        <div class="look">
          <a href="javascript:" @click.stop="record(2)">福气记录</a>
        </div>
        <div class="button">
          <div class="button-firstrow">
            <img src="./images/chongzhi.png" alt />
          </div>
          <div class="button-secondrow">
            <img @click="draw(3)" src="./images/fanli.png" alt />
          </div>
        </div>
      </div>
      <div class="bottom" :style="{background:this.color}">
        <div @click="change">
          <img src="./images/change.png" />
        </div>
      </div>
    </div>

    <secondPage
      v-show="isChange"
      :color="color"
      @receive="receive(arguments)"
      @back="back(arguments)" @openplay='openplay'
    ></secondPage>
    <comPop @close="close" v-if="comPop" :popType="popType"></comPop>
    <congratulation @congra_back='congra_back' :popNumber='popNumber'></congratulation>
    <congratulation2 :popNumber='popNumber' @goplay='goplay'></congratulation2>
    <everyoneplay v-if="openPlay" @closeplay='closeplay'></everyoneplay >
    <rank @closerank='closerank' v-if="openRank" :rankNumber='rankNumber' @gosecondpage='gosecondpage(arguments)'></rank>
    <!-- 没有上榜的组件 -->
    <noprize :rankNumber='rankNumber'></noprize>
  </div>
</template>
<script>
import Services from './services/services'
import secondPage from "./component/secondPage";
import comPop from "./component/comPop";
import congratulation from './component/congratulation';
import congratulation2 from './component/congratulation2'
import everyoneplay from './component/everyoneplay'
import rank from './component/rank'
import noprize from './component/noprize'
export default {
  data() {
    return {
      openRank:true,
      isChange: false,
      color: "#AA0210",
      comPop: false,
      congratulation:false,
      popType: "", //0规则,1攻略,2查看记录,3领取每日返利
      popNumber:'',
      openPlay:false,
      rankNumber:'',
    };
  },
  created() {
    // popNumber 1弹恭喜1  2弹恭喜2
    
    // rankNumber  0未上榜 1福气值 2金叶 3金叶+京东卡 4 京东卡 
  Services.getDetail().then(res=>{
    this.details=res.data
    console.log('活动信息',this.details)
  })
      this.popNumber=2
      this.rankNumber=5
  },
  filters:{
     number:function(value){
       if(value>10000){
            return Math.floor(value / 10000 )+ '万'
       }
     }             
  },
  methods: {
    gosecondpage(e){
      this.isChange=e[0]
      this.openRank=e[1]
      this.color=e[2]

    },
    goplay(e){
      this.openPlay=e
    },
    closerank(e){
      this.openRank=e
    },
    closeplay(e){
      this.openPlay=e
    },
    openplay(e){
      this.openPlay=e
      console.log(this.openPlay)
    },
    congra_back(e){
      this.congratulation=e
    },
    draw(type){
      this.popType=type;
      this.comPop=true;
    },
    record(type){
      this.popType=type;
      this.comPop=true;
      console.log('查看下标',this.popType)
    },
    gonglue(type){
      this.popType = type;
      this.comPop=true;
    },
    rule(type) {
      (this.comPop = true), (this.popType = type);
      console.log('规则下标',this.popType)
      console.log('查看关闭发榜',this.openRank)
    },
    close(e) {
      this.comPop = e;

    },
    back(e) {
      (this.isChange = e[0]), (this.color = e[1]);
      console.log("查看", this.isChange, this.color,this.openPlay);
    },
    receive(e) {
      (this.isChange = e[0]), (this.color = e[1]);
      console.log("查看", this.isChange, this.color);
    },
    change() {
      if (this.isChange == true) {
        this.isChange = false;
        this.color = "#AA0210";
      } else {
        this.isChange = true;
        this.color = "#FAD6A9";
      }
    }
  },
  components: {
    secondPage,
    comPop,
    congratulation,
    congratulation2,
    everyoneplay,
    rank,
    noprize
  }
};
</script>
<style lang='less'>
* {
  padding: 0;
  margin: 0;
}
.big {
  height: 100vh;
}
.bc {
  background: url("./images/background.png");
  background-size: 100% 100%;
  width: 7.2rem;
  height: 11.37rem;
  position: relative;
}
.firstrow {
  position: relative;
  top: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  top: -0.1rem;
  .back {
    width: 1.02rem;
    height: 1.28rem;
    img {
      width: 1.02rem;
      height: 1.28rem;
    }
  }
  .rule {
    img {
      width: 0.94rem;
      height: 1.28rem;
    }
  }
}
.secondrow {
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: -0.7rem;
  img {
    width: 0.94rem;
    height: 1.28rem;
  }
}
.middle {
  position: absolute;
  top: 5.9rem;
  height: 1.7rem;
  .here {
    width: 1.22rem;
    height: 0.94rem;
    position: absolute;
    top: -0.6rem;
    left: 0.2rem;
    animation: move 5s infinite;
  }
  @keyframes move {
    0% {
      left: 0%;
    }
    30% {
      left: 5%;
    }
    50% {
      left: 0;
    }
    80% {
      left: -5%;
    }
    100% {
      left: 0%;
    }
  }
  .fl {
    width: 7.05rem;
    height: 1.7rem;
  }
  .control {
    position: absolute;
    top: 0.56rem;
    left: 1.7rem;
    /* position: relative; */
    width: 3.6rem;
    display: flex;
  }
  .progess {
    width: 1.26rem;
    height: 0.32rem;
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#ffdb48),
      to(#fe1919)
    );
    background: linear-gradient(90deg, #ffdb48 0%, #fe1919 100%);
    border-radius: 0.16rem;

    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    img {
      height: 1.34rem;
      position: absolute;
      right: -0.4rem;
    }
  }
  .text {
    font-size: 0.22rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #8c0e0e;
    position: absolute;
    //  top: 0.56rem;
    /* left: 3.3rem; */
    right: 0.05rem;
  }

  .tomorrow {
    font-size: 0.2rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fff7d4;
    position: absolute;
    top: 0.93rem;
    left: 2.5rem;
    height: 0.36rem;
    line-height: 0.36rem;
  }
  .today {
    text-align: center;
    width: 100%;
    font-size: 0.2rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #0c555e;
    position: absolute;
    /* bottom: 0; */
    bottom: 0.06rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
}
.lower-middle {
  position: absolute;
  top: 7.87rem;
  width: 100%;
  .look {
    width: 95%;
    height: 0.25rem;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    top: -0.2rem;
  }
  a {
    font-size: 0.22rem;
    font-family: PingFang SC;
    font-weight: bold;
    text-decoration: underline;
    color: rgba(255, 246, 210, 1);
  }
  .button {
    position: relative;
    top: -0.3rem;
    .button-firstrow {
      width: 100%;
      height: 1.09rem;
      display: flex;
      justify-content: center;
    }
    .button-secondrow {
      width: 100%;
      height: 1.09rem;
      justify-content: center;
      display: flex;
    }
    img {
      width: 3.29rem;
      height: 1.09rem;
    }
  }
}
.bottom {
  width: 7.2rem;
  height: 1.2rem;
  background: rgba(170, 3, 16, 1);
  box-shadow: 10rem -28rem 16rem 0px rgba(170, 14, 0, 0.35);
  display: flex;

  align-items: center;
  /* margin: 0 auto; */
  justify-content: center;
  position: fixed;
  bottom: 0;
  z-index: 5;
  div {
    // height: 1.2rem;
    display: flex;
    align-items: center;
  }
}
.bottom img {
  width: 5.66rem;
  height: 0.7rem;
}
</style>

