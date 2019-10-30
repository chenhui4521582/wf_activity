<template>
  <section class="rule" :style="{zIndex:isShowPop?101:1}" :class="{pop2:from==2}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap" :class="{current3:currentIndex==2}">
          <div class="main">
            <template v-if="currentIndex==0">
              <div class="title">如何喂猫？</div>
              <div class="title1">1.点击鱼干按钮</div>
              <img src="../pages/images/pop/slide/1-1.png" alt="" style="width: 1.68rem;height: 1.7rem">
              <div class="title1">2.选择喂养量</div>
              <img src="../pages/images/pop/slide/1-2.png" alt="" style="width: 3.2rem;height: 1.64rem">
              <div class="title1">3.点击喂养</div>
              <p>Tips：游戏中每消耗1000金叶可自动获得1g鱼干哦~</p>
            </template>
            <template v-else-if="currentIndex==1">
              <div class="title">如何逗猫？</div>
              <div class="title1">1.点击招财猫</div>
              <img src="../pages/images/pop/slide/2-1.png" alt="" style="width: 2rem;height: 1.74rem">
              <div class="title1">2.选择互动方式</div>
              <img src="../pages/images/pop/slide/2-2.png" alt="" style="width: 2.96rem;height: 1.76rem">
              <div class="title1">3.完成互动</div>
            </template>
            <template v-else>
              <div class="title">如何达到好感度100？</div>
              <p>1、喂食1次可增加25点好感度，冷却时间1小时，1小时内重复喂养不增加好感度；</p>
              <p>2、逗猫可以增加好感度，三个动作冷却时间10分钟，10分钟内重复互动不增加好感度；</p>
              <p>3、常回来逗逗你的小猫，好感度就能迅速达到100啦~</p>
            </template>
          </div>
        </div>
        <div class="close-icon" @click="close"></div>
        <div class="bottom">
          <div class="btn" @click="gotocat"></div>
          <div class="dot">
            <div class="pre" @click="arrowclick(true)"></div>
            <div class="dotItem">
              <div class="dot_item" v-for="(item,index) in 3" :class="{selected:currentIndex==index}"></div>
            </div>
            <div class="post" @click="arrowclick(false)"></div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "rule",
  data () {
    return {
      isShowPop: false,
      currentIndex:0
    };
  },
  props: {
    ruleMain: {
      type: String,
      default: ""
    },
    from: {
      type: String,
      default: "0"
    },
    task:{
      type:Object,
      default:()=>{}
    }
  },
  methods: {
    showPop (flag=0) {
      this.currentIndex=flag
      this.isShowPop = true
    },
    gotocat(){
      GLOBALS.marchSetsPoint('A_H5PT0201002062',{
        task_id:this.task.taskId,
        task_name:this.task.taskName
      })//H5平台-撸猫活动-任务攻略具体弹窗-去完成按钮点击
      location.href= `https://wap.beeplaying.com/petcat?channel=${localStorage.getItem('APP_CHANNEL')}`
    },
    arrowclick(isleft){
      if(isleft){
        GLOBALS.marchSetsPoint('A_H5PT0201002063',{
          task_id:this.task.taskId,
          task_name:this.task.taskName
        })//H5平台-撸猫活动-任务攻略具体弹窗-左箭头点击
        this.currentIndex=this.currentIndex-1
      }else{
        GLOBALS.marchSetsPoint('A_H5PT0201002064',{
          task_id:this.task.taskId,
          task_name:this.task.taskName
        })//H5平台-撸猫活动-任务攻略具体弹窗-右箭头点击
        this.currentIndex=this.currentIndex+1
      }
    },
    close(){
      this.isShowPop = false
      this.$emit('close')
    }
  },
  watch:{
    currentIndex(val){
      console.log(val)
      if(val<0){
        val=0
        this.currentIndex=val
      }
      if(val>2){
        val=2
        this.currentIndex=val
      }
    },
    isShowPop(val){
      val&&GLOBALS.marchSetsPoint('A_H5PT0201002061',{
        task_id:this.task.taskId,
        task_name:this.task.taskName
      })//H5平台-撸猫活动-任务攻略具体弹窗加载完成
    }
  },
  mounted(){

  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.rule {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -3rem;
  margin-top: -4.2rem;
  img {
    &.ruleicon{
      position: fixed;
      width: 0.78rem;
      height: 0.5rem;
      right: 0;
      top: .25rem;
    }
    &.profit{
      position: fixed;
      width: 3.3rem;
      height: .9rem;
      bottom: .11rem;
      &.profit1{
        left: .18rem;
      }
      &.profit2{
        right: .18rem;
      }
    }
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
      width: 6rem;
      height: 8.4rem;
      background: url("../pages/images/rule/bg.png") no-repeat center center /
        100% 100%;
      margin: 0 auto;
      box-sizing: border-box;
      padding: .6rem .4rem;
      .main {
        font-size: 0.2rem;
        letter-spacing: 0.02rem;
        font-weight: bold;
        color:rgba(196,94,19,1);
        .title{
          font-size:.36rem;
          color:rgba(155,66,1,1);
          text-align: center;
          margin-bottom:.1rem;
        }
        .title1{
          margin-top:.1rem;
          margin-bottom:.1rem;
          text-align: left;
          font-weight:500;
          color:rgba(155,66,1,1);
        }
        .time{
          font-weight:400;
          color:rgba(196,94,19,1);
        }

        p {
          line-height: 0.32rem;
          font-weight:400;
          color:rgba(196,94,19,1);
          text-align: left;
          i{
            color: #005AFF;
          }
        }
      }
      &.current3{
        padding:.8rem .5rem;
        p{
          line-height: .5rem;
        }
      }
    }

    .close-icon {
      width: 0.9rem;
      height: 0.8rem;
      background: url("../pages/images/common/close.png") no-repeat center
        center / 100% 100%;
      position: absolute;
      top: .58rem;
      right: 0;
    }
    .bottom{
      width: 3rem;
      position: absolute;
      top: 6.43rem;
      bottom:.49rem;
      left: 0;
      right: 0;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .btn{
        width: 100%;
        height: .9rem;
        background: url("../pages/images/pop/slide/gotocomplete.png") no-repeat center
          center / 100% 100%;
        margin-bottom: .1rem;
      }
      .dot{
        display: flex;
        justify-content: center;
        align-items: center;
        .pre{
          width: .48rem;
          height: .48rem;
          background: url("../pages/images/pop/slide/leftarrow.png") no-repeat center
            center / 100% 100%;
          margin-right: .15rem;
        }
        .dotItem{
          display: flex;
          width: 1.2rem;
          justify-content: space-between;
          .dot_item{
            width:.2rem;
            height:.2rem;
            background:rgba(153,153,153,1);
            border-radius:50%;
            &.selected{
              background:#FFAB43
            }
          }
        }
        .post{
          width: .48rem;
          height: .48rem;
          background: url("../pages/images/pop/slide/rightarrow.png") no-repeat center
            center / 100% 100%;
          margin-left: .15rem;
        }
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
