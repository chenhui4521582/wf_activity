<template>
  <div class="second-bc">
    <div class="second-top">
      <div class="second-back">
        <img @click="back" src="../images/back.png" />
        <div class="top-text">
          <span>前30名上榜有奖</span>
        </div>
      </div>
    </div>
    <div class="topthree">
      <div class="top-two">
        <div class="headpic-two">
          <img src="../images/second/testheadpic.png" alt />
        </div>
        <div class="name">
          <span  v-if="list.length>1">{{list[1].name||'还未上榜'}}</span>
        </div>
        <div class="prize-text">
          <span
            style="font-size:0.18rem;font-weight:bold;color:rgba(255,230,0,1);text-center:center;display:block"
          >10000元</span>
          <span
            style="font-size:0.18rem;font-weight:bold;color:#F8E49B;text-center:center;display:block;"
          >京东券</span>
          <span
            style="font-size:0.18rem;font-weight:bold;color:rgba(255,230,0,1);text-center:center;display:block;"
          >+</span>
          <span style="font-size:0.18rem;font-weight:bold;text-center:center;display:block;white-space: nowrap;">
            <span style="color:#FFE600">300万</span>
            <span style="color:#FFF7A7">金叶</span>
          </span>
        </div>
        <img src="../images/second/toptwo&three.png" alt />
        <img class="two" src="../images/second/2.png" />
        <img class="prize" src="../images/second/prize.png" alt />
      </div>
      <div class="top-one">
        <div class="headpic-one">
          <img src="../images/second/testheadpic.png" alt />
        </div>
        <div class="name-one">
          <span>{{list[0].name||'还未上榜'}}</span>
        </div>
        <div class="prize-text1">
          <span
            style="font-size:0.18rem;font-weight:bold;color:rgba(255,230,0,1);text-center:center;display:block"
          >15000元</span>
          <span
            style="font-size:0.18rem;font-weight:bold;color:#F8E49B;text-center:center;display:block;"
          >京东券</span>
          <span
            style="font-size:0.18rem;font-weight:bold;color:rgba(255,230,0,1);text-center:center;display:block;"
          >+</span>
          <span style="font-size:0.18rem;font-weight:bold;text-center:center;display:block;white-space: nowrap;">
            <span style="color:#FFE600">500万</span>
            <span style="color:#FFF7A7">金叶</span>
          </span>
        </div>
        <img src="../images/second/topone.png" alt />
        <img class="one" src="../images/second/1.png" alt />
        <img class="prize" src="../images/second/prize.png" alt />
      </div>
      <div class="top-three">
        <div class="headpic-three">
          <img src="../images/second/testheadpic.png" alt />
        </div>
        <div class="name" >
          <span v-if="list.length>2">{{list[2].name||'还未上榜'}}</span>
        </div>
        <div class="prize-text">
          <span
            style="font-size:0.18rem;font-weight:bold;color:rgba(255,230,0,1);text-center:center;display:block"
          >10000元</span>
          <span
            style="font-size:0.18rem;font-weight:bold;color:#F8E49B;text-center:center;display:block;"
          >京东券</span>
          <span
            style="font-size:0.18rem;font-weight:bold;color:rgba(255,230,0,1);text-center:center;display:block;"
          >+</span>
          <span style="font-size:0.18rem;font-weight:bold;text-center:center;display:block;white-space: nowrap;">
            <span style="color:#FFE600">300万</span>
            <span style="color:#FFF7A7">金叶</span>
          </span>
        </div>
        <img src="../images/second/toptwo&three.png" alt />
        <img class="three" src="../images/second/3.png" alt />
        <img class="prize" src="../images/second/prize.png" alt />
      </div>
    </div>
    <div class="second-lowermiddle">
      <div class="information">
        <span>当前距离30名还差500福气</span>
      </div>
      <div class="lower-middle-onerow">
        <div>
          <span>我的排名</span>
          <span>暂未上榜</span>
        </div>
        <div>
          <span>累计福气值</span>
          <span>1000</span>
        </div>
        <div>
          <img @click="openplay" src="../images/second/fuqi.png" />
        </div>
      </div>
      <div class="lower-middle-text">
        <span>排名</span>
        <span>玩家昵称</span>
        <span>累计福气值</span>
        <span>当前奖励</span>
      </div>
    </div>
    <div class="rank">
      <div class="list" v-for="(i,index) in behindTreeData " >
        <span
          style="font-size:0.24rem;font-weight:bold;color:rgba(255,224,199,1);width:0.8rem;text-align:center;"
        >{{i.rank}}</span>
        <span
          style="font-size:0.20rem;font-weight:bold;color:rgba(255,224,199,1) ;text-align:center;position:relative;left:-0.1rem;overflow:hidden;text-overflow:ellipsis;width:1rem;white-space:nowrap;"
        >{{i.name}}</span>
        <span
          style="font-size:0.20rem;font-weight:bold;color:rgba(255,224,199,1);width:1.2rem;text-align:center;position: relative;
    overflow:hidden;text-overflow:ellipsis"
        >{{i.num}}</span>
        <span
          style="font-size:0.20rem;font-weight:bold;color:rgba(255,224,199,1);text-align:center;overflow:hidden;text-overflow:ellipsis"
        >{{i.prize.split('+')[0]}}+<br/>{{i.prize.split('+')[1]}}</span>
      </div>

<!-- 点击展示 -->
          <div class="list" v-if="!isOpen" >
        <img @click.stop="closeOpenProfit" src="../images/second/clickshow.png" alt />



      </div>
      <div class="list"  v-if="isOpen" v-for="(i,index) in otherData" >
        <span
          style="font-size:0.24rem;font-weight:bold;color:rgba(255,224,199,1);width:0.8rem;text-align:center;"
        >{{i.rank}}</span>
        <span
          style="font-size:0.20rem;font-weight:bold;color:rgba(255,224,199,1) ;text-align:center;position:relative;left:-0.1rem;width:1rem;white-space:nowrap;overflow:hidden;"
        >{{i.name}}</span>
        <span
          style="font-size:0.20rem;font-weight:bold;color:rgba(255,224,199,1);width:1.2rem;text-align:center;position: relative;
overflow:hidden;text-overflow:ellipsis"
        >{{i.num}}</span>
        <span
          style="font-size:0.20rem;font-weight:bold;color:rgba(255,224,199,1);text-align:center;overflow:hidden;text-overflow:ellipsis"
        >{{i.prize.split('+')[0]}}+<br/>{{i.prize.split('+')[1]}}</span>
      </div>


  
      <div class="list" v-for="(i,index) in lastTwoData " >
        <span
          style="font-size:0.24rem;font-weight:bold;color:rgba(255,224,199,1);width:0.8rem;text-align:center;"
        >{{i.rank}}</span>
        <span
          style="font-size:0.20rem;font-weight:bold;color:rgba(255,224,199,1) ;text-align:center;position:relative;left:-0.1rem;overflow:hidden;text-overflow:ellipsis;width:1rem;white-space:nowrap;"
        >{{i.name}}</span>
        <span
          style="font-size:0.20rem;font-weight:bold;color:rgba(255,224,199,1);width:1.2rem;text-align:center;position: relative;
   overflow:hidden;text-overflow:ellipsis"
        >{{i.num}}</span>
        <span
          style="font-size:0.20rem;font-weight:bold;color:rgba(255,224,199,1);text-align:center;overflow:hidden;text-overflow:ellipsis"
        >{{i.prize.split('+')[0]}}+<br/>{{i.prize.split('+')[1]}}</span>
      </div>
    </div>
    <div class="bottom" :style="{background:this.color}">
      <div @click="second_change">
        <img src="../images/second/change.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        openPlay:true,
      isOpen: true,
      isChange: false,
      transmitcolor: "#AA0210",
      behindTreeData:[],
      otherData:[],
      lastTwoData:[],
      list:[
          {rank:'1',name:'tom',num:'561321',prize:'1000万金叶+500京东卡'},
          {rank:'2',name:'阿桑的sfds风格的发生的',num:'56132',prize:'1000万金叶+500京东卡'},
          {rank:'3',name:'sdfsdf',num:'561324',prize:'1000万金叶+500京东卡'},
          {rank:'4',name:'dfg dg',num:'56132',prize:'1000万金叶+500京东卡'},
          {rank:'5',name:'第三方士大夫士大夫',num:'561324',prize:'1000万金叶+500京东卡'},
          {rank:'6',name:'士大夫士大夫',num:'5613243',prize:'1000万金叶+500京东卡'},
          {rank:'7',name:'士大夫请问',num:'56132',prize:'1000万金叶+500京东卡'},
          {rank:'8',name:'破i破i破',num:'561',prize:'1000万金叶+500京东卡'},
          {rank:'9',name:'1',num:'561',prize:'1000万金叶+500京东卡'},
          {rank:'10',name:'2',num:'56',prize:'1000万金叶+500京东卡'},
          {rank:'11',name:'3',num:'5',prize:'1000万金叶+500京东卡'},
          {rank:'12',name:'14',num:'1',prize:'1000万金叶+500京东卡'},
          ]
    };
  },
  props: ["color"],
  mounted(){
      this.getRankList()
  },
  methods: {
      openplay(){
          this.$emit('openplay',this.openPlay)
          console.log(this.openPlay)
      },
      back(){
        this.$emit('back',this.isChange,this.transmitcolor)
      },
    closeOpenProfit() {
      this.isOpen = true;
    },
    second_change() {
      // this.color='#AA0210'
      this.$emit("receive", this.isChange, this.transmitcolor);
    },
    async getRankList(){
      
        // console.log('otherData',this.otherData)
        if(this.list.length >5){
            this.lastTwoData = this.list.slice(5,8)
        console.log('lastTwoData',this.lastTwoData)
        if(this.list.length >8){
            this.isOpen = false
            this.lastTwoData = this.list.slice(this.list.length - 2)
             console.log('lastTwoData',this.lastTwoData)
            this.otherData = this.list.slice(5,this.list.length - 2)
                 console.log('otherData',this.otherData)
        }
        
       
        } 
         this.behindTreeData= this.list.slice(3,5)
          console.log('behind',this.behindTreeData)
        
    }
  }
  
};
</script>
<style scoped lang='less'>
* {
  padding: 0;
  margin: 0;
}
.second-bc {
  background: url("../images/second/second-bc.png");
  background-size: 100% 100%;
  width: 7.2rem;
  height: 11.37rem;
  //    z-index: 5;
  position: absolute;
  top: 0;
  .second-top {
    img {
      position: relative;
      width: 1.03rem;
      height: 1.29rem;
      top: -0.1rem;
    }
    .top-text {
      display: flex;
      font-size: 0.2rem;
      font-family: FZZhengHeiS-EB-GB;
      font-weight: 400;
      color: #ffe300;
      justify-content: center;
      position: relative;
      top: -0.4rem;
      // line-height:0.93rem;
    }
  }
  .topthree {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    height: 4.3rem;
    width: 90%;
    text-align: center;
    margin: 0 auto;
    position: relative;
    top: -0.7rem;

    .top-one {
      position: relative;
      .prize-text1 {
        position: absolute;
        top: 1.9rem;
        width: 1rem;
        left: 0.3rem;

        span {
          //   display: block;
          height: 0.2rem;
        }
      }
      .prize {
        width: 0.38rem;
        height: 0.38rem;
        position: absolute;
        top: 0.15r;
        top: 1.88rem;
        right: 1.17rem;
      }
      .name-one {
        background: url("../images/second/namebackground.png");
        background-size: 100% 100%;
        width: 1.29rem;
        height: 0.38rem;
        position: absolute;

        top: 1.3rem;
        display: flex;
        left: 0.17rem;
        justify-content: center;
        align-items: center;
        span {
          text-align: center;
          width: 0.8rem;
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #fff7a7;
          // height: 0.35rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      img {
        width: 1.71rem;
        height: 3.42rem;
      }
      .headpic-one {
        width: 1.33rem;
        height: 1.33rem;
        position: absolute;
        border-radius: 50%;
        left: 0.15rem;
        top: 0.15rem;
        img {
          width: 1.33rem;
          height: 1.33rem;
          border-radius: 50%;
        }
      }
      .one {
        width: 0.53rem;
        position: absolute;
        height: 0.53rem;
        right: 0.64rem;
        top: -0.15rem;
      }
    }
    .top-two,
    .top-three {
      position: relative;
      .prize-text {
        position: absolute;
        top: 1.66rem;
        width: 1rem;
        left: 0.3rem;

        span {
          //   display: block;
          height: 0.2rem;
        }
      }
      .prize {
        width: 0.38rem;
        height: 0.38rem;

        position: absolute;
        top: 1.65rem;
        right: 1.05rem;
      }
      .name {
        background: url("../images/second/namebackground.png");
        background-size: 100% 100%;
        width: 1.29rem;
        height: 0.38rem;
        position: absolute;
        top: 1.2rem;
        left: 0.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          text-align: center;
          width: 0.8rem;
          font-size: 0.16rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #fff7a7;
          // display: flex;
          // justify-content: center;
          // align-items: center;
          // height: 0.35rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: keep-all;
        }
      }
      img {
        width: 1.57rem;
        height: 3.08rem;
      }
      .headpic-two,
      .headpic-three {
        width: 1.21rem;
        position: absolute;
        height: 1.21rem;
        border-radius: 50%;
        top: 0.13rem;
        left: 0.15rem;
        img {
          width: 1.21rem;
          height: 1.21rem;
          border-radius: 50%;
        }
      }
      .two,
      .three {
        width: 0.48rem;
        height: 0.48rem;
        /* position: relative; */
        position: absolute;
        right: 0.6rem;
        /* top: -1rem; */
        top: -0.1rem;
      }
    }
  }
  .second-lowermiddle {
    position: relative;
    .information {
      background: url("../images/second/information.png");
      background-size: 100% 100%;
      width: 2.67rem;
      height: 0.66rem;
      position: absolute;
      top: -0.7rem;
      left: 2rem;
      span {
        font-size: 0.2rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        position: absolute;
        width: 2.65rem;
        text-align: center;
        height: 0.5rem;
        line-height: 0.5rem;
      }
    }
    .lower-middle-onerow {
      display: flex;
      // align-items: flex-end;
      width: 80%;
      justify-content: space-around;
      margin: 0 auto;
      text-align: center;
      height: 0.6rem;
      position: relative;
      top: -0.04rem;
      div:nth-child(1),
      :nth-child(2) {
        justify-content: center;
        display: block;
        align-items: center;
        width: 1.7rem;
        span:first-child {
          font-size: 0.2rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        span:last-child {
          font-size: 0.22rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffdb48;
        }
        span {
          display: block;
        }
      }
      div:nth-child(3) {
        // width: 2rem;
        position: relative;
        top: -0.35rem;
        img {
          width: 2.37rem;
          height: 1.03rem;
        }
      }
    }
    .lower-middle-text {
      display: flex;
      width: 90%;
      justify-content: space-around;
      margin: 0 auto;

      position: relative;
      top: 0.2rem;
      span {
        font-size: 0.24rem;
        font-weight: bold;
        color: rgba(255, 241, 230, 1);
      }
    }
  }
}
.rank {
  width: 85%;
  margin: 0 auto;
  position: relative;
  top: 0.2rem;
  height: 3rem;
  overflow-x: hidden;

  .list {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 0.6rem;
    align-items: center;
    img {
      width: 2.64rem;
      height: 0.46rem;
      margin: 0 auto;
    }
  }
}
</style>