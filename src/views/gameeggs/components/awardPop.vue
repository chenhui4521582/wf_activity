<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent :class="{type1:type==1,type2:type==2,type3:type==3,type4:type==4}"></div>
    <div class="bonus-success" :class="{type1:type==1,type2:type==2,type3:type==3,type4:type==4}">
      <div class="container">
        <scroll :data="awardsname" v-if="type==1">
          <div v-html="awardsname" style="line-height: .3rem"></div>
        </scroll>
        <template v-if="type==2">
          <div class="info">砸蛋还差{{awardsname}}个锤子</div>
          <img src="../images/chuizi.png" alt="">
          <div class="btn btn_more" @click="close(0)">获取更多锤子</div>
          <div class="btn btn_see" @click="gotoact">去活动页看看</div>
        </template>
        <template v-if="type==3">
          <div class="btn btn_more" @click="gotoact">去砸蛋</div>
          <div class="btn btn_see"  @click="close(0)">获取更多锤子</div>
        </template>
        <template v-if="type==4">
          <div class="info">活动已结束</div>
          <div class="info1">累计锤子排行榜已放榜</div>
          <div class="btn btn_more" @click="gotoact">去查看排名及奖励</div>
        </template>
      </div>
      <div class="close" @click="close(1)"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import scroll from './scroll'
  export default {
    data() {
      return {
      }
    },
    props:{
      type:{
        type: Number,
        default:0//1.活动规则 2.砸金蛋还差锤子 3.砸金蛋需要去活动页 4.砸金蛋结束
      },
      awardsname:{
        type:String,
        default: ''
      },
      gametype:{
        type:Number,
        default:0
      }
    },
    components:{scroll},
    methods: {
      close(flag) {
        if(this.type==4){
          GLOBALS.marchSetsPoint('A_H5PT0075001500',{
            from_project_id:this.gametype
          })
          this.$emit('closeview',0)
        }else{
          if(this.type==2){
            if(flag){
              GLOBALS.marchSetsPoint('A_H5PT0075001494',{
                from_project_id:this.gametype
              })
            }else{
              GLOBALS.marchSetsPoint('A_H5PT0075001493',{
                from_project_id:this.gametype
              })
            }
          }
          if(this.type==3){
            if(flag){
              GLOBALS.marchSetsPoint('A_H5PT0075001497',{
                from_project_id:this.gametype
              })
            }else{
              GLOBALS.marchSetsPoint('A_H5PT0075001496',{
                from_project_id:this.gametype
              })
            }
          }
          this.$emit('close')
        }
      },
      gotoact(){
        if(this.type==2){
          GLOBALS.marchSetsPoint('A_H5PT0075001492',{
            from_project_id:this.gametype
          })
        }
        if(this.type==3){
          GLOBALS.marchSetsPoint('A_H5PT0075001495',{
            from_project_id:this.gametype
          })
        }
        if(this.type==4){
          GLOBALS.marchSetsPoint('A_H5PT0075001499',{
            from_project_id:this.gametype
          })
        }
        this.$emit('gotoact')
      }
    },
    mounted() {
      if(this.type==2){
        GLOBALS.marchSetsPoint('A_H5PT0075001491',{
          from_project_id:this.gametype
        })
      }
      if(this.type==3){
        GLOBALS.marchSetsPoint('A_H5PT0075001495',{
          from_project_id:this.gametype
        })
      }
      if(this.type==4){
        GLOBALS.marchSetsPoint('A_H5PT0075001498',{
          from_project_id:this.gametype
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .pop-window {
    position: relative;
    z-index: 11;
    width: 100%;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    .pop-close {
      width: 0.68rem;
      height: 0.68rem;
      position: absolute;
      right: -0.34rem;
      top: -0.34rem;
    }
  }

  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    z-index: 10;
    &.type4{
      background: transparent;
    }
  }
  /* 坚屏模式 */
  @media only screen and (orientation: portrait) {
    .bonus-success {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 4.91rem;
      height:5.54rem;
    }
  }
  /* 横屏模式 */
  @media screen and (orientation: landscape) {
    .bonus-success {
      position: fixed;
      top: 8%;
      left: 50%;
      transform: translateX(-50%);
      width: 4.91rem;
      height:5.54rem;
    }
  }
  .bonus-success {
    &.type1{
      background: url("../images/rulepop.png");
      background-size: 100% 100%;
      box-sizing: border-box;
      .container{
        position: absolute;
        top:.96rem;
        left:.47rem;
        bottom:.47rem;
        right:.47rem;
        overflow: hidden;
      }
    }
    &.type2{
      background: url("../images/lesschuzpop.png");
      background-size: 100% 100%;
      .container{
        position: absolute;
        top:.26rem;
        left:0;
        right: 0;
        bottom:.52rem;
        margin: auto;
        text-align: center;
        .info{
          font-size:.4rem;
          margin-bottom: .42rem;
        }
        img{
          width: 1.88rem;
          height: 1.88rem;
          margin-bottom: .53rem;
        }
      }
    }
    &.type3{
      background: url("../images/actpop.png");
      background-size: 100% 100%;
      .container{
        padding-top: 3.48rem;
      }
    }
    &.type4{
      background: url("../images/actendpop.png");
      background-size: 100% 100%;
      .container{
        position: absolute;
        top:.85rem;
        left:0;
        right: 0;
        bottom:.52rem;
        margin: auto;
        text-align: center;
        .info{
          color:rgba(33,107,13,1);
          margin-bottom: 2.16rem;
        }
        .info1{
          color:rgba(128,58,7,1);
          margin-bottom: .41rem;
        }
      }
    }
    z-index: 11;
    .btn{
      font-size:.3rem;
      width:2.9rem;
      height:.68rem;
      line-height:.68rem;
      text-align: center;
      background:rgba(236,129,16,1);
      border-radius:.34rem;
      margin: auto;
      &.btn_more{
        background:rgba(229,86,0,1);
      }
      &.btn_see{
        margin-top: .18rem;
        background:rgba(236,129,16,1);
      }
    }
    .close {
      position: absolute;
      width:.6rem;
      height: .6rem;
      background: url("../images/close.png");
      background-size: 100% 100%;
      left: 0;
      right: 0;
      margin: auto;
      bottom: -.8rem;
    }
  }
</style>
